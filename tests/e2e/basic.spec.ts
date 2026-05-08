import { test, expect } from '@playwright/test';

test.describe('Kiran Slido Craft E2E', () => {
  test('homepage loads and has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Kiran Slido Craft/);
    await expect(page.getByText(/Engineering Silence/i)).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Legacy/);
  });

  test('specs search filters products', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.getByPlaceholder(/Search specifications/i);
    await searchInput.fill('ISRO');
    await expect(page.getByText(/ISRO Gaganyaan Mission/i)).toBeVisible();
  });

  test('contact form validation works', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: /Send Technical Request/i }).click();
    // Should show validation error or stay on page if native validation is triggered
    // For our custom server action errors:
    await expect(page.getByText(/Missing or invalid fields/i).or(page.locator('input:invalid'))).toBeVisible();
  });
});
