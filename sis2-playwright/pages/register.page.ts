import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import { User } from '../data/user.factory';
import { fillAddress } from './address.form';
export class RegisterPage extends BasePage {
  async open() { await this.page.goto('/auth/register', { waitUntil: 'domcontentloaded' }); }
  async register(u: User) {
    const fields = { 'first-name': u.firstName, 'last-name': u.lastName, dob: u.dob,
      phone: u.phone, email: u.email, password: u.password };
    for (const [id, value] of Object.entries(fields)) await this.page.getByTestId(id).fill(value);
    await fillAddress(this.page, u);
    await this.page.getByTestId('register-submit').click();
  }
  async expectCreated() { await expect(this.page).toHaveURL(/\/auth\/login$/); }
}
