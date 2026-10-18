# SIS 2 — Playwright Test Automation

All tests are passing and the reports are attached
This project contains seven automated tests for:
https://practicesoftwaretesting.com

The tests cover:
- Customer registration
- Login with valid and invalid credentials
- Buying a product
- Comparing two products
- Password reset with registered and unregistered emails

The project uses TypeScript, Playwright, Page Objects and fixtures. Each test runs independently and creates its own test data when needed.

## How to run

Open a terminal in the sis2-playwright folder and run:

npm ci
npx playwright install chromium
npm test

To watch the tests in the browser:

npm run test:headed

To open the test report:

npm run report

In Windows PowerShell, use npm.cmd and npx.cmd if script execution is blocked.

## Documentation

- Description.md — test cases and expected results
- Prompt.md — AI prompts
- Review.md — problems found and changes made
- evidence/ — screenshots and test results

