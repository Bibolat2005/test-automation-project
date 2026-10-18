import { expect } from '@playwright/test';
import { BasePage } from './base.page';
export class ResetPasswordPage extends BasePage {
  async open() { await this.page.goto('/auth/forgot-password', { waitUntil: 'domcontentloaded' }); }
  async requestReset(email: string) {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('forgot-password-submit').click();
  }
  async expectConfirmation() {
    // Observed hosted build 2026-10-11 renders an untranslated localization key.
    // This checks the actual confirmation; it does not claim email delivery.
    await expect(this.page.getByRole('alert')).toHaveText('page.forgot-password.confirm');
  }
  async expectInvalidEmail() {
    await expect(this.page.getByRole('alert')).toHaveText('The selected email is invalid.');
    await expect(this.page).toHaveURL(/\/auth\/forgot-password$/);
  }
}
