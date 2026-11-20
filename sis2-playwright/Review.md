# Review of AI Assistance

## What AI helped with

I used ChatGPT to help prepare the Playwright tests, explain the project structure and show me how to run the tests on Windows.

The first version needed corrections. I ran it on my computer and shared the error messages and screenshots for debugging.

## Problems found and changes made

### 1. PowerShell blocked npm

The node command worked, but PowerShell blocked npm.ps1 because script execution was disabled.

I used npm.cmd and npx.cmd instead. This allowed me to run the project without changing the Windows execution policy.

### 2. TypeScript configuration warning

VS Code showed a warning about the old moduleResolution setting.

The module and moduleResolution settings were both changed to Node16. This removed the need to use the older node resolution option.

### 3. The purchase test failed

My first full run had six passed tests and one failed test. The purchase test could not find the final order confirmation.

The screenshot showed “Payment was successful”, but the page still had a Confirm button. This meant that payment validation had finished, but the order had not been confirmed.

The checkout code was updated to wait for the Confirm button and check the server response when creating the order. The purchase timeout was also increased because this test includes registration, login and the full checkout process.

### 4. The server rejected the address

The next run showed the actual server error: HTTP 422. The billing state did not match the selected country.

The test was manually entering Almaty while the website was also filling in the address through its postcode lookup. Depending on timing, the manually entered values could overwrite the values expected by the server.

The address code was changed in both registration and checkout. It now waits for the postcode lookup and checks that the address fields match its response. It no longer enters a different city or state manually.

## Why these changes were needed

Increasing the timeout alone could not fix an invalid address. Reading the server response made the real problem visible.

The final checks were kept: the server must create the order successfully, and the website must show an invoice number. The test was not changed to pass just because it displayed “Payment was successful”.

## What I learned

A failed test does not always mean that a locator is wrong or that more waiting time is needed. The screenshot and server response can explain what actually happened.

I also learned that automatic form updates need to be considered when writing tests. Manually filling a field can conflict with values loaded by the application.



## CI pipeline review

I also used AI assistance while adding GitHub Actions to the project. I applied the changes in VS Code and checked the results in the Actions logs.

### Unsupported Ubuntu version

The first pipeline failed while installing Chromium. The runner used Ubuntu 26.04, which was not supported by the project's Playwright version.

The Ubuntu report job now uses ubuntu-24.04 instead of ubuntu-latest.

### Cloudflare verification

Some tests passed locally but failed on GitHub-hosted runners. The traces showed that registration returned HTTP 201, while the login and password reset pages returned HTTP 403.

The screenshots showed Cloudflare security verification instead of the expected forms. This explained why Playwright could not find the email field.

I moved the browser jobs to Windows self-hosted runners. I kept the checks for successful login, order creation and invoice confirmation.

### Windows script execution

The secret check originally ran through PowerShell. Windows blocked the generated script because script execution was disabled.

The check now runs through cmd and Node.js. It checks that TEST_PASSWORD exists without printing the password.

### Report merging

The Ubuntu merge job inherited the Windows cmd shell and failed with "cmd: command not found".

I added an explicit bash shell to the merge job. The browser jobs continue to use cmd.

### Action download timeout

One job failed before the tests started because the runner could not download actions/upload-artifact from GitHub within the timeout.

This was a setup failure, so changing the test assertions would not have fixed it.
