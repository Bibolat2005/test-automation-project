# prompts for working with the project

## AI Assistant that I used 
I used Chat GPT, model is GPT-6.1 sol easy
## Running tests
How do I run this Playwright project on Windows? Explain which commands I need to install dependencies, install Chromium and run the tests with a visible browser.

## Checking results
How can I check whether the tests passed? Explain how to open the HTML report and find screenshots and error details for a failed test.

## Project structure
Explain the difference between the tests, pages, fixtures and data folders in this project. Use a simple example from the login test.

## Independent tests
How can I make sure each test runs independently? Explain how to create separate test accounts and avoid relying on another test running first.

## Testing checkout
What should a purchase test check besides adding a product to the cart? Explain how to verify the quantity, prices and final order confirmation.

## Debugging a failure
My purchase test shows “Payment was successful”, but the order confirmation does not appear. How can I find out whether the problem is in the test or the website?

## Address validation
The invoice request returns HTTP 422 because the billing state does not match the country. How should the test handle the website's automatic address lookup?

## Reviewing assertions
Check whether these tests contain meaningful assertions. Explain what each assertion proves and point out any checks that could pass without verifying the expected result.