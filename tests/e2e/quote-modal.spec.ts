import { expect, test } from '@playwright/test';

async function expectDialogInsideViewport(page: import('@playwright/test').Page) {
  const dialog = page.getByRole('dialog', { name: 'Get a Specification Quote.' });
  await expect(dialog).toBeVisible();

  const box = await dialog.boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

  const dialogOwnsViewportCenter = await dialog.evaluate((element) => {
    const topmostElement = document.elementFromPoint(
      window.innerWidth / 2,
      window.innerHeight / 2,
    );

    return Boolean(topmostElement && element.contains(topmostElement));
  });
  expect(dialogOwnsViewportCenter).toBe(true);
}

test.describe('Quote modal viewport behavior', () => {
  test('stays viewport-anchored after scrolling on a 720p desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 720));
    await page.getByRole('button', { name: 'Get a Quote' }).click();

    await expectDialogInsideViewport(page);
  });

  test('fits inside a mobile dynamic viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/product/sound-proof-windows');
    const quoteButton = page.getByRole('button', { name: 'Get a Quote' });
    await quoteButton.scrollIntoViewIfNeeded();
    await quoteButton.click();

    await expectDialogInsideViewport(page);
  });

  test('renders above scrolled legal-page content', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/privacy');
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.getByRole('button', { name: 'Get a Quote' }).click();

    await expectDialogInsideViewport(page);
  });
});
