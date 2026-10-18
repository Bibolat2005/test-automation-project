import { test } from '../fixtures/pages.fixture';
// Includes registration, login, cart, payment and invoice creation.
test.describe.configure({ timeout: 180000 });
test('TC04 - buy two Combination Pliers and complete checkout', async ({authenticatedCustomer,productPage,cartPage,checkoutPage}) => {
  await productPage.openNamed('Combination Pliers');
  const product = await productPage.details();
  await productPage.addToCart(2);
  await productPage.openCart();
  await cartPage.expectItem(product.name, 2, product.price);
  await cartPage.proceed();
  await checkoutPage.continueAsCustomer();
  await checkoutPage.enterAddress(authenticatedCustomer);
  await checkoutPage.completePurchase();
  await checkoutPage.expectOrderConfirmed();
});
