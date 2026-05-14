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

  test('should successfully submit a valid inquiry', async ({ page }) => {
    // Fill the form
    await page.getByPlaceholder(/Enter name/i).fill('Test User');
    await page.getByPlaceholder(/email@company.com/i).fill('test@example.com');
    await page.getByPlaceholder(/\+91 98765 43210/i).fill('9876543210');
    await page.getByPlaceholder(/Enter project city/i).fill('Mumbai');
    
    // Select scope from custom dropdown (it's a select or custom component?)
    // Checking ContactClient.tsx, it's a native select:
    // <select name="scope" required ...
    await page.locator('select[name="scope"]').selectOption('Acoustic Windows');
    
    await page.getByPlaceholder(/Briefly describe dimensions/i).fill('This is a test technical requirement for E2E validation. Needs to be at least 10 chars.');

    // We can't easily test the actual submission to R2/Resend without mocking in Playwright
    // but we can check if it triggers the "Processing..." state
    const submitButton = page.getByRole('button', { name: /Send Technical Request/i });
    
    // Intercept the server action or check for success message if we allow it to hit dev endpoint
    // In a real QA environment we might use a mock API
    
    await submitButton.click();
    
    // Since it's a Server Action, we can wait for the success UI
    // home.contact.successTitle is "Submission Successful"
    await expect(page.getByText(/Submission Successful/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Technical inquiry received/i)).toBeVisible();
  });
});
