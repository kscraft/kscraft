import { defineConfig, devices } from '@playwright/test';

const isQualityGate = process.env.QUALITY_GATE === '1';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI || isQualityGate,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI || isQualityGate ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI && !isQualityGate,
    env: {
      SKIP_LEAD_DELIVERY: '1',
    },
  },
});
