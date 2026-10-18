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