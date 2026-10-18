import { test } from '../fixtures/pages.fixture';
test('TC01 - register a unique customer and verify the account by signing in', async ({registerPage,loginPage,newUser}) => {
  await registerPage.open();
  await registerPage.register(newUser);
  await registerPage.expectCreated();
  await loginPage.signIn(newUser);
  await loginPage.expectSignedIn();
});
