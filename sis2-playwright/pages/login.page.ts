import { expect } from '@playwright/test';
import { BasePage } from './base.page';
export class LoginPage extends BasePage {
  async open() { await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' }); }
  async signIn(u: { email: string; password: string }) {
    await this.page.getByTestId('email').fill(u.email);
    await this.page.getByTestId('password').fill(u.password);
    await this.page.getByTestId('login-submit').click();
  }
  async expectSignedIn() {
    await expect(this.page).toHaveURL(/\/account$/);
    await expect(this.page.getByTestId('page-title')).toHaveText('My account');
  }
  async expectRejected() {
    await expect(this.page.getByTestId('login-error')).toContainText('Invalid email or password');
    await expect(this.page).toHaveURL(/\/auth\/login$/);
  }
}
