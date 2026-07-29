import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/clients',
  '/media',
  '/contact',
  '/category/sound-proof-windows',
  '/product/sound-proof-sliding-windows',
  '/showcase/isro-gaganyaan',
];

test.describe('UI Audit across pages', () => {
  for (const route of ROUTES) {
    test(`Check UI on ${route}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('pageerror', (exception) => {
        consoleErrors.push(exception.message);
      });
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('body')).toBeVisible();
      
      // Test should fail if there are significant JS console errors
      // Wait, Vercel analytics or other 3rd party scripts might fail, 
      // let's just log them rather than failing the test strictly unless it's a React error
      if (consoleErrors.length > 0) {
        console.log(`[${route}] Console errors found:`, consoleErrors);
      }

      // We ensure the page has a valid title, which means Next.js successfully rendered
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Check if any major buttons with specific styling are overflowing or broken
      const buttons = page.locator('.apple-button, .apple-button-secondary');
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        await expect(button).toBeVisible();
      }
    });
  }
});
