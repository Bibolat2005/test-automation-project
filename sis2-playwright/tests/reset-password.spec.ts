import { test } from '../fixtures/pages.fixture';
test('TC06 - known customer receives password-reset confirmation', async ({customer,resetPasswordPage}) => {
  await resetPasswordPage.open();
  await resetPasswordPage.requestReset(customer.email);
  await resetPasswordPage.expectConfirmation();
});
test('TC07 - unregistered email is rejected by password reset', async ({resetPasswordPage,newUser}) => {
  await resetPasswordPage.open();
  await resetPasswordPage.requestReset(newUser.email);
  await resetPasswordPage.expectInvalidEmail();
});
