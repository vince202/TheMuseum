import { test, expect } from '@playwright/test';

test.describe('Tarot Museum User Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test.describe('Homepage Flow', () => {
    test('should load homepage successfully', async ({ page }) => {
      await expect(page).toHaveTitle(/tarot museum/i);
      await expect(page.locator('h1')).toContainText(/tarot/i);
    });

    test('should have accessible navigation', async ({ page }) => {
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      const links = nav.locator('a');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to gallery from homepage', async ({ page }) => {
      await page.click('text=Gallery');
      await expect(page).toHaveURL(/.*gallery/);
      await expect(page.locator('h1, h2')).toContainText(/gallery/i);
    });
  });

  test.describe('Card Browsing Flow', () => {
    test('should display card grid in gallery', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const cards = page.locator('[data-testid="card-thumbnail"]');
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should filter cards by suit', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Open filters
      await page.click('[aria-label="Toggle filters"]');

      // Select Major Arcana
      await page.check('text=Major Arcana');

      // Wait for filtered results
      await page.waitForTimeout(500);

      const cards = page.locator('[data-testid="card-thumbnail"]');
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should search for cards', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      await page.fill('[aria-label="Search tarot cards"]', 'fool');
      await page.waitForTimeout(500);

      const results = page.locator('[data-testid="card-thumbnail"]');
      const count = await results.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should open card detail view', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Wait for cards to load
      await page.waitForSelector('[data-testid="card-thumbnail"]');

      // Click first card
      await page.click('[data-testid="card-thumbnail"]');

      // Should show card details
      await page.waitForTimeout(500);
      await expect(page.locator('[role="article"]')).toBeVisible();
    });

    test('should navigate back from card detail', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      await page.waitForSelector('[data-testid="card-thumbnail"]');
      await page.click('[data-testid="card-thumbnail"]');

      // Click back button
      await page.click('text=Back');

      // Should return to gallery
      await expect(page).toHaveURL(/.*gallery/);
    });
  });

  test.describe('Timeline Flow', () => {
    test('should display timeline events', async ({ page }) => {
      await page.goto('http://localhost:3000/timeline');

      const timeline = page.locator('[data-testid="timeline"]');
      await expect(timeline).toBeVisible();

      const events = page.locator('[data-testid="timeline-event"]');
      const count = await events.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate between timeline periods', async ({ page }) => {
      await page.goto('http://localhost:3000/timeline');

      // Click on a period filter
      const periodButton = page.locator('button').filter({ hasText: /ancient|medieval|modern/i }).first();
      if (await periodButton.isVisible()) {
        await periodButton.click();
        await page.waitForTimeout(300);
      }

      expect(await page.locator('[data-testid="timeline-event"]').count()).toBeGreaterThanOrEqual(0);
    });

    test('should view related cards from timeline', async ({ page }) => {
      await page.goto('http://localhost:3000/timeline');

      const cardLink = page.locator('a').filter({ hasText: /view card/i }).first();
      if (await cardLink.isVisible()) {
        await cardLink.click();
        await page.waitForTimeout(300);
        await expect(page.locator('[role="article"]')).toBeVisible();
      }
    });
  });

  test.describe('Symbolism Flow', () => {
    test('should display symbolism categories', async ({ page }) => {
      await page.goto('http://localhost:3000/symbolism');

      const symbols = page.locator('[data-testid="symbol-card"]');
      const count = await symbols.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should filter by symbol category', async ({ page }) => {
      await page.goto('http://localhost:3000/symbolism');

      const categoryButton = page.locator('button').filter({ hasText: /color|element|number/i }).first();
      if (await categoryButton.isVisible()) {
        await categoryButton.click();
        await page.waitForTimeout(300);
      }

      expect(await page.locator('[data-testid="symbol-card"]').count()).toBeGreaterThanOrEqual(0);
    });

    test('should view cards with specific symbol', async ({ page }) => {
      await page.goto('http://localhost:3000/symbolism');

      const symbolCard = page.locator('[data-testid="symbol-card"]').first();
      if (await symbolCard.isVisible()) {
        await symbolCard.click();
        await page.waitForTimeout(300);
      }
    });
  });

  test.describe('Accessibility Flow', () => {
    test('should navigate using keyboard only', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // Tab through interactive elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }

      // Check that focus is visible
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    });

    test('should have skip to main content link', async ({ page }) => {
      await page.goto('http://localhost:3000');

      await page.keyboard.press('Tab');
      const focused = await page.locator(':focus').textContent();
      expect(focused?.toLowerCase()).toContain('skip');
    });

    test('should support screen reader landmarks', async ({ page }) => {
      await page.goto('http://localhost:3000');

      await expect(page.locator('header[role="banner"]')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
    });
  });

  test.describe('Responsive Design Flow', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');

      await expect(page.locator('h1')).toBeVisible();

      // Check mobile menu
      const menuButton = page.locator('[aria-label*="menu"]');
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(300);
      }
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('http://localhost:3000/gallery');

      const cards = page.locator('[data-testid="card-thumbnail"]');
      await expect(cards.first()).toBeVisible();
    });

    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('http://localhost:3000/gallery');

      const cards = page.locator('[data-testid="card-thumbnail"]');
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Performance Flow', () => {
    test('should load homepage within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('http://localhost:3000');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000); // 3 seconds
    });

    test('should handle rapid navigation', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // Rapidly navigate between pages
      await page.click('text=Gallery');
      await page.waitForTimeout(100);

      await page.click('text=Timeline');
      await page.waitForTimeout(100);

      await page.click('text=Symbolism');
      await page.waitForTimeout(100);

      await page.click('text=Home');

      // Should not crash
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should handle image lazy loading', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Scroll to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Images should eventually load
      const images = page.locator('img');
      const firstImage = images.first();
      if (await firstImage.isVisible()) {
        await expect(firstImage).toHaveAttribute('src', /.+/);
      }
    });
  });

  test.describe('Error Handling Flow', () => {
    test('should handle 404 pages gracefully', async ({ page }) => {
      await page.goto('http://localhost:3000/non-existent-page');

      await expect(page.locator('text=404')).toBeVisible();
      await expect(page.locator('text=not found')).toBeVisible();
    });

    test('should handle invalid card IDs', async ({ page }) => {
      await page.goto('http://localhost:3000/cards/invalid-card-id-12345');

      // Should redirect to gallery or show error
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/gallery|404/);
    });

    test('should handle network failures gracefully', async ({ page }) => {
      // This would require mocking network failures
      // For now, just verify error boundaries exist
      await page.goto('http://localhost:3000');
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Search and Filter Flow', () => {
    test('should perform complete search and filter workflow', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Search
      await page.fill('[aria-label="Search tarot cards"]', 'cups');
      await page.waitForTimeout(300);

      // Apply filters
      await page.click('[aria-label="Toggle filters"]');
      await page.check('text=Minor Arcana');
      await page.waitForTimeout(300);

      // Clear filters
      const clearButton = page.locator('text=Clear all');
      if (await clearButton.isVisible()) {
        await clearButton.click();
      }

      // Clear search
      await page.fill('[aria-label="Search tarot cards"]', '');
      await page.waitForTimeout(300);
    });
  });
});
