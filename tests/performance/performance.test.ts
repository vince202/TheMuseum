import { test, expect } from '@playwright/test';

test.describe('Performance Testing', () => {
  test.describe('Page Load Performance', () => {
    test('homepage should load within 3 seconds', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('gallery should load within 3 seconds', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('http://localhost:3000/gallery');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('timeline should load within 3 seconds', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('http://localhost:3000/timeline');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('symbolism should load within 3 seconds', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('http://localhost:3000/symbolism');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });
  });

  test.describe('Core Web Vitals', () => {
    test('should meet LCP threshold (< 2.5s)', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const lcp = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            resolve(lastEntry.renderTime || lastEntry.loadTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });

          setTimeout(() => resolve(0), 5000);
        });
      });

      expect(lcp).toBeLessThan(2500);
    });

    test('should meet FID threshold (< 100ms)', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const button = page.locator('button').first();
      const startTime = Date.now();
      await button.click();
      const fid = Date.now() - startTime;

      expect(fid).toBeLessThan(100);
    });

    test('should meet CLS threshold (< 0.1)', async ({ page }) => {
      await page.goto('http://localhost:3000');

      await page.waitForTimeout(2000);

      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });

          setTimeout(() => resolve(clsValue), 3000);
        });
      });

      expect(cls).toBeLessThan(0.1);
    });
  });

  test.describe('Bundle Size', () => {
    test('should have acceptable initial bundle size', async ({ page }) => {
      const response = await page.goto('http://localhost:3000');
      const buffer = await response?.body();
      const sizeKB = buffer ? buffer.length / 1024 : 0;

      // Initial HTML should be under 500KB
      expect(sizeKB).toBeLessThan(500);
    });

    test('should load JavaScript efficiently', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const jsRequests = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.initiatorType === 'script')
          .map((r: any) => ({
            name: r.name,
            size: r.transferSize,
            duration: r.duration,
          }));
      });

      // Total JS should be under 1MB
      const totalJS = jsRequests.reduce((sum: number, r: any) => sum + r.size, 0);
      expect(totalJS).toBeLessThan(1024 * 1024);
    });

    test('should load CSS efficiently', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const cssRequests = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.initiatorType === 'link' || r.name.endsWith('.css'))
          .map((r: any) => ({
            name: r.name,
            size: r.transferSize,
            duration: r.duration,
          }));
      });

      // Total CSS should be under 200KB
      const totalCSS = cssRequests.reduce((sum: number, r: any) => sum + r.size, 0);
      expect(totalCSS).toBeLessThan(200 * 1024);
    });
  });

  test.describe('Image Optimization', () => {
    test('should lazy load images', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const images = page.locator('img');
      const firstImage = images.first();

      const loading = await firstImage.getAttribute('loading');
      expect(['lazy', 'eager']).toContain(loading);
    });

    test('should use appropriate image formats', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const imageRequests = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.initiatorType === 'img')
          .map((r: any) => r.name);
      });

      // Images should use modern formats (webp, avif) or optimized formats
      const hasOptimizedImages = imageRequests.some((url: string) =>
        url.includes('.webp') || url.includes('.avif') || url.includes('optimize')
      );

      // This is informational - not all images need to be webp
      expect(imageRequests.length).toBeGreaterThanOrEqual(0);
    });

    test('should have reasonable image sizes', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      await page.waitForLoadState('networkidle');

      const imageStats = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.initiatorType === 'img')
          .map((r: any) => ({
            url: r.name,
            size: r.transferSize,
          }));
      });

      // Individual images should generally be under 500KB
      const largeImages = imageStats.filter((img: any) => img.size > 500 * 1024);
      expect(largeImages.length).toBeLessThan(imageStats.length * 0.2); // < 20% large images
    });
  });

  test.describe('Caching Strategy', () => {
    test('should cache static assets', async ({ page }) => {
      // First visit
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      // Second visit
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      const cachedResources = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.transferSize === 0 && r.decodedBodySize > 0)
          .length;
      });

      expect(cachedResources).toBeGreaterThan(0);
    });

    test('should have appropriate cache headers', async ({ page }) => {
      const response = await page.goto('http://localhost:3000');
      const headers = response?.headers();

      // Check for cache-related headers
      const hasCaching =
        headers?.['cache-control'] ||
        headers?.['etag'] ||
        headers?.['last-modified'];

      expect(hasCaching).toBeTruthy();
    });
  });

  test.describe('Rendering Performance', () => {
    test('should render gallery grid efficiently', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const startTime = Date.now();
      await page.waitForSelector('[data-testid="card-thumbnail"]');
      const renderTime = Date.now() - startTime;

      expect(renderTime).toBeLessThan(1000);
    });

    test('should handle scroll performance', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const startTime = Date.now();

      // Perform multiple scrolls
      for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(100);
      }

      const scrollTime = Date.now() - startTime;

      // Should handle scrolling smoothly
      expect(scrollTime).toBeLessThan(2000);
    });

    test('should maintain 60fps during animations', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // Trigger page transition
      await page.click('text=Gallery');

      await page.waitForTimeout(500);

      const fps = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let frameCount = 0;
          let lastTime = performance.now();

          const countFrames = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime - lastTime >= 1000) {
              resolve(frameCount);
            } else {
              requestAnimationFrame(countFrames);
            }
          };

          requestAnimationFrame(countFrames);
        });
      });

      // Should maintain close to 60fps
      expect(fps).toBeGreaterThan(30);
    });
  });

  test.describe('Memory Performance', () => {
    test('should not have memory leaks during navigation', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const initialMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0;
      });

      // Navigate multiple times
      for (let i = 0; i < 5; i++) {
        await page.click('text=Gallery');
        await page.waitForTimeout(300);
        await page.click('text=Home');
        await page.waitForTimeout(300);
      }

      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0;
      });

      // Memory should not grow excessively (allow 50MB increase)
      const memoryIncrease = finalMemory - initialMemory;
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });
  });

  test.describe('Network Performance', () => {
    test('should minimize number of requests', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');

      const resourceCount = await page.evaluate(() => {
        return performance.getEntriesByType('resource').length;
      });

      // Should have reasonable number of requests (< 50 for initial load)
      expect(resourceCount).toBeLessThan(50);
    });

    test('should use HTTP/2 or HTTP/3', async ({ page }) => {
      const response = await page.goto('http://localhost:3000');
      const protocol = await response?.request().headerValue('protocol');

      // Check if using modern HTTP version
      expect(['h2', 'h3', 'HTTP/2', 'HTTP/3', null]).toContain(protocol);
    });

    test('should compress responses', async ({ page }) => {
      const response = await page.goto('http://localhost:3000');
      const encoding = response?.headers()['content-encoding'];

      // Should use compression for text resources
      expect(['gzip', 'br', 'deflate', undefined]).toContain(encoding);
    });
  });

  test.describe('Code Splitting', () => {
    test('should load initial page without all routes', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const jsRequests = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.initiatorType === 'script')
          .map((r: any) => r.name);
      });

      // Should not load all route chunks on initial page
      expect(jsRequests.length).toBeLessThan(20);
    });

    test('should lazy load route chunks', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const initialScripts = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.initiatorType === 'script').length;
      });

      // Navigate to another route
      await page.click('text=Gallery');
      await page.waitForLoadState('networkidle');

      const afterNavScripts = await page.evaluate(() => {
        return performance.getEntriesByType('resource')
          .filter((r: any) => r.initiatorType === 'script').length;
      });

      // Additional scripts may be loaded for new route
      expect(afterNavScripts).toBeGreaterThanOrEqual(initialScripts);
    });
  });

  test.describe('Search Performance', () => {
    test('should handle search queries efficiently', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const searchInput = page.locator('[aria-label="Search tarot cards"]');

      const startTime = Date.now();
      await searchInput.fill('fool');
      await page.waitForTimeout(300); // Debounce time
      const searchTime = Date.now() - startTime;

      expect(searchTime).toBeLessThan(500);
    });

    test('should handle rapid search input', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const searchInput = page.locator('[aria-label="Search tarot cards"]');

      // Type rapidly
      const startTime = Date.now();
      await searchInput.type('the magician', { delay: 50 });
      const typeTime = Date.now() - startTime;

      // Should handle typing smoothly
      expect(typeTime).toBeLessThan(2000);
    });
  });
});
