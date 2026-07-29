import { test, expect } from '@playwright/test';

test.describe('Lead Capture Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should show validation errors on empty submission', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /Send Technical Request/i });
    await submitButton.click();

    await expect(page.locator('form [role="alert"]')).toBeVisible();
    await expect(page.locator('form [role="alert"]')).toContainText(/Missing or invalid fields/i);
  });

  test('should embed Turnstile and fail closed without a verified token', async ({ page }) => {
    const widget = page.locator('.cf-turnstile');
    await expect(widget).toHaveAttribute('data-sitekey', '0x4AAAAAAEAl-DGJqphLw0Wv');
    await expect(widget).toHaveAttribute('data-action', 'turnstile-spin-v2');
    await expect(widget).toHaveAttribute('data-appearance', 'always');
    await expect(page.locator('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')).toHaveCount(1);

    await page.getByPlaceholder(/Enter name/i).fill('Test User');
    await page.getByPlaceholder(/email@company.com/i).fill('test@example.com');
    await page.getByPlaceholder(/98765 43210/i).fill('9876543210');
    await page.getByPlaceholder(/Enter project city/i).fill('Mumbai');
    await page.locator('select[name="scope"]').selectOption('Acoustic Windows');
    await page.getByPlaceholder(/Briefly describe dimensions/i).fill('This is a test technical requirement for E2E validation. Needs to be at least 10 chars.');
    const submitButton = page.getByRole('button', { name: /Send Technical Request/i });
    await submitButton.click();

    await expect(page.locator('form [role="alert"]')).toContainText(/human verification/i);
    await expect(page.getByText(/Submission Successful/i)).toHaveCount(0);
  });

  test('country code picker should search country-level codes', async ({ page }) => {
    await page.getByRole('button', { name: /Country code/i }).click();
    await page.getByPlaceholder(/Search country/i).fill('United States');

    const unitedStatesOption = page.getByRole('option', { name: /United States \+1/i });
    await expect(unitedStatesOption).toBeVisible();
    await expect(page.getByRole('option', { name: /\+1313 United States/i })).toHaveCount(0);

    await unitedStatesOption.click();
    await expect(page.getByRole('button', { name: /Country code/i })).toContainText('+1');

    await page.getByRole('button', { name: /Country code/i }).click();
    await page.getByPlaceholder(/Search country/i).fill('919876543210');
    await expect(page.getByRole('option', { name: /India \+91/i })).toBeVisible();
  });
});
