import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: 1,
  timeout: 90000,

  expect: {
    timeout: 15000,
  },

  reporter: isCI
    ? [
        ['list'],
        ['blob'],
        ['junit', { outputFile: 'reports/junit.xml' }],
      ]
    : [
        ['list'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
      ],

  use: {
    baseURL:
      process.env.BASE_URL ||
      'https://practicesoftwaretesting.com',

    testIdAttribute: 'data-test',

    trace: isCI
      ? (process.env.CI_TRACE === 'on' ? 'on' : 'on-first-retry')
      : 'retain-on-failure',

    screenshot: isCI ? 'only-on-failure' : 'on',
    video: 'retain-on-failure',

    ...(process.env.PW_PROXY
      ? { proxy: { server: process.env.PW_PROXY } }
      : {}),

    ignoreHTTPSErrors:
      process.env.PW_IGNORE_HTTPS_ERRORS === '1',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});