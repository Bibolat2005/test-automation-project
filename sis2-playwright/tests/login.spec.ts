import { test } from '../fixtures/pages.fixture';
test('TC02 - valid credentials reach the account page', async ({customer,loginPage}) => {
  await loginPage.open();
  await loginPage.signIn(customer);
  await loginPage.expectSignedIn();
});
test('TC03 - invalid credentials show an error and stay on login', async ({newUser,loginPage}) => {
  await loginPage.open();
  await loginPage.signIn(newUser);
  await loginPage.expectRejected();
});
