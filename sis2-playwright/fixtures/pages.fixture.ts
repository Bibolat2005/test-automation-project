import { test as base } from '@playwright/test';
import { createUser, User } from '../data/user.factory';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ResetPasswordPage } from '../pages/reset-password.page';
type Fixtures = { registerPage: RegisterPage; loginPage: LoginPage; productPage: ProductPage;
 cartPage: CartPage; checkoutPage: CheckoutPage; resetPasswordPage: ResetPasswordPage;
 newUser: User; customer: User; authenticatedCustomer: User };
export const test = base.extend<Fixtures>({
 registerPage: async ({page}, use) => { await use(new RegisterPage(page)); },
 loginPage: async ({page}, use) => { await use(new LoginPage(page)); },
 productPage: async ({page}, use) => { await use(new ProductPage(page)); },
 cartPage: async ({page}, use) => { await use(new CartPage(page)); },
 checkoutPage: async ({page}, use) => { await use(new CheckoutPage(page)); },
 resetPasswordPage: async ({page}, use) => { await use(new ResetPasswordPage(page)); },
 newUser: async ({}, use) => { await use(createUser()); },
 customer: async ({registerPage,newUser}, use) => {
   await registerPage.open(); await registerPage.register(newUser);
   await registerPage.expectCreated(); await use(newUser);
 },
 authenticatedCustomer: async ({customer,loginPage}, use) => {
   await loginPage.signIn(customer); await loginPage.expectSignedIn(); await use(customer);
 },
});
export { expect } from '@playwright/test';
