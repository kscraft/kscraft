import { test, expect } from '@playwright/test';

test.describe('Kiran Slido Craft E2E', () => {
  test('homepage loads and has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Kiran Slido Craft/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText(/Soundproof Windows/i);
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Legacy/);
  });

  test('dedicated search page works', async ({ page }) => {
    await page.goto('/search');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Search Architectural Systems/i);
    const searchInput = page.getByPlaceholder(/Search specifications/i);
    await searchInput.pressSequentially('ISRO', { delay: 100 });
    await expect(page.getByText(/ISRO Gaganyaan Mission/i)).toBeVisible({ timeout: 10000 });
  });

  test('contact form drafts email', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: /Send Technical Request/i }).click();
    await expect(page.locator('form [role="alert"]')).toContainText(/Missing or invalid fields/i);
  });
});
