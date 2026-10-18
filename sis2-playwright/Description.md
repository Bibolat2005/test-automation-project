# SIS 2 — Test Automation with Playwright

## What this project does

This project tests the Toolshop website:
https://practicesoftwaretesting.com

I used TypeScript and Playwright to cover the five scenarios from the presentation: registration, login, buying a product, comparing products and resetting a password.

There are seven tests in five files. Login and password reset each have a positive and a negative test.

## Test cases

### TC01 — Register a new customer
File: tests/register.spec.ts

The test fills in the registration form with a new email address. After registration, it signs in with the same account to check that the account was created.

Expected result: registration opens the login page, and the new customer can reach My account.

### TC02 — Login with valid credentials
File: tests/login.spec.ts

The test creates a customer and signs in using the correct email and password.

Expected result: the My account page opens.

### TC03 — Login with invalid credentials
File: tests/login.spec.ts

The test tries to sign in with an email that has not been registered.

Expected result: the website shows “Invalid email or password” and stays on the login page.

### TC04 — Buy a product
File: tests/buy-product.spec.ts

The test signs in, opens Combination Pliers and adds two items to the cart. It checks the product name, quantity and prices. Then it completes the billing address, selects Cash on Delivery and confirms the order.

Expected result: the cart values are correct, the server creates the order, and the website displays an invoice number.

### TC05 — Compare two products
File: tests/compare-products.spec.ts

The test opens Combination Pliers and Pliers separately and reads their names and prices.

Expected result: the names match the selected products, both prices are above zero, and the prices are different.

### TC06 — Reset a password for an existing customer
File: tests/reset-password.spec.ts

The test creates a customer and submits that customer's email on the Forgot Password page.

Expected result: the website shows a confirmation. The current version displays “page.forgot-password.confirm” instead of a normal message.

### TC07 — Reset a password with an unregistered email
File: tests/reset-password.spec.ts

The test submits a new email that does not belong to an account.

Expected result: the website shows “The selected email is invalid.”

## How the project is organised

- tests/ contains the test scenarios.
- pages/ contains the actions and checks for each page.
- fixtures/ prepares the page objects and customers needed by the tests.
- data/ generates new customer details.

Each test runs in a separate browser context. Tests that need an account create their own, so they can run independently.

The address fields use the website's postcode lookup. The tests wait for the address to load instead of entering a different city or state manually.

Details about AI assistance and corrections are included in Prompt.md and Review.md.