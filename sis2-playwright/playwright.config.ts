import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: true, forbidOnly: true,
  retries: 0, workers: 2, timeout: 90000, expect: { timeout: 15000 },
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'https://practicesoftwaretesting.com', testIdAttribute: 'data-test',
    trace: 'retain-on-failure', screenshot: 'on', video: 'retain-on-failure',
    // Optional network settings for managed environments; unset on ordinary laptops.
    ...(process.env.PW_PROXY ? { proxy: { server: process.env.PW_PROXY } } : {}),
    ignoreHTTPSErrors: process.env.PW_IGNORE_HTTPS_ERRORS === '1',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
