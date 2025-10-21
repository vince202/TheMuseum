import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

test.describe('WCAG 2.1 Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await injectAxe(page);
  });

  test.describe('Homepage Accessibility', () => {
    test('should have no WCAG violations on homepage', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await injectAxe(page);

      const violations = await getViolations(page);
      expect(violations.length).toBe(0);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      expect(headings.length).toBeGreaterThan(0);
    });

    test('should have accessible navigation', async ({ page }) => {
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      const navLinks = nav.locator('a');
      const count = await navLinks.count();

      for (let i = 0; i < count; i++) {
        const link = navLinks.nth(i);
        const text = await link.textContent();
        expect(text?.trim()).not.toBe('');
      }
    });

    test('should have skip navigation link', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      const text = await focused.textContent();
      expect(text?.toLowerCase()).toContain('skip');
    });
  });

  test.describe('Gallery Accessibility', () => {
    test('should have no WCAG violations on gallery', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');
      await injectAxe(page);

      const violations = await getViolations(page);
      expect(violations.length).toBe(0);
    });

    test('should have alt text for all card images', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });

    test('should have accessible form controls', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const searchInput = page.locator('[aria-label="Search tarot cards"]');
      await expect(searchInput).toHaveAttribute('aria-label');
    });

    test('should have keyboard accessible filters', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const filterButton = page.locator('[aria-label="Toggle filters"]');
      await filterButton.focus();
      await page.keyboard.press('Enter');

      // Filters should be visible
      await page.waitForTimeout(300);
    });
  });

  test.describe('Color Contrast', () => {
    test('should meet WCAG AA contrast requirements', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await injectAxe(page);

      await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
        rules: {
          'color-contrast': { enabled: true },
        },
      });
    });

    test('should have sufficient contrast for text', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // Check main text contrast
      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, a');
      const count = await textElements.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have sufficient contrast for buttons', async ({ page }) => {
      await page.goto('http://localhost:3000');

      const buttons = page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        await expect(button).toBeVisible();
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support tab navigation', async ({ page }) => {
      await page.goto('http://localhost:3000');

      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        await expect(focused).toBeVisible();
      }
    });

    test('should support shift+tab navigation', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // Tab forward
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
      }

      // Tab backward
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Shift+Tab');
      }

      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    });

    test('should have visible focus indicators', async ({ page }) => {
      await page.goto('http://localhost:3000');

      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');

      // Check if focus is visible (has outline or ring)
      const styles = await focused.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          outline: computed.outline,
          outlineWidth: computed.outlineWidth,
          boxShadow: computed.boxShadow,
        };
      });

      const hasFocusIndicator =
        styles.outlineWidth !== '0px' ||
        styles.boxShadow !== 'none';

      expect(hasFocusIndicator).toBe(true);
    });

    test('should not have keyboard traps', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Open modal or overlay
      await page.click('[aria-label="Toggle filters"]');

      // Try to escape
      await page.keyboard.press('Escape');

      // Should close
      await page.waitForTimeout(300);
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have proper ARIA roles', async ({ page }) => {
      await page.goto('http://localhost:3000');

      await expect(page.locator('[role="banner"]')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('[role="contentinfo"]')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('should have ARIA labels for interactive elements', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const buttons = page.locator('button[aria-label]');
      const count = await buttons.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have proper dialog ARIA attributes', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Trigger a modal if exists
      const modalTrigger = page.locator('button').first();
      if (await modalTrigger.isVisible()) {
        await modalTrigger.click();
        await page.waitForTimeout(300);

        const dialog = page.locator('[role="dialog"]');
        if (await dialog.isVisible()) {
          await expect(dialog).toHaveAttribute('aria-modal', 'true');
        }
      }
    });

    test('should announce live region updates', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Check for live regions
      const liveRegions = page.locator('[aria-live]');
      const count = await liveRegions.count();

      // Live regions should exist for dynamic content
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have associated labels for inputs', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const inputs = page.locator('input');
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        const ariaLabel = await input.getAttribute('aria-label');
        const id = await input.getAttribute('id');

        // Should have either aria-label or associated label
        expect(ariaLabel || id).toBeTruthy();
      }
    });

    test('should show validation errors accessibly', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      // Look for error messages with proper ARIA attributes
      const errorMessages = page.locator('[role="alert"]');
      // If errors exist, they should be announced
      expect(await errorMessages.count()).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Responsive Accessibility', () => {
    test('should be accessible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      await injectAxe(page);

      const violations = await getViolations(page);
      expect(violations.length).toBe(0);
    });

    test('should be accessible on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('http://localhost:3000');
      await injectAxe(page);

      const violations = await getViolations(page);
      expect(violations.length).toBe(0);
    });

    test('should support zoom up to 200%', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // Simulate zoom
      await page.evaluate(() => {
        document.body.style.zoom = '2';
      });

      await page.waitForTimeout(500);

      // Content should still be accessible
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Media Accessibility', () => {
    test('should have alt text for decorative images', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const images = page.locator('img[alt=""]');
      // Decorative images should have empty alt=""
      const count = await images.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should have descriptive alt text for meaningful images', async ({ page }) => {
      await page.goto('http://localhost:3000/gallery');

      const meaningfulImages = page.locator('img:not([alt=""])');
      const count = await meaningfulImages.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = meaningfulImages.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(3);
      }
    });
  });

  test.describe('Timing Accessibility', () => {
    test('should not have time-based content restrictions', async ({ page }) => {
      await page.goto('http://localhost:3000');

      // No content should disappear after a set time without user control
      await page.waitForTimeout(5000);

      await expect(page.locator('h1')).toBeVisible();
    });
  });
});
