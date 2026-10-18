import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import { User } from '../data/user.factory';
import { fillAddress } from './address.form';
export class CheckoutPage extends BasePage {
  async continueAsCustomer() { await this.page.getByTestId('proceed-2').click(); }
  async enterAddress(u: User) {
    await fillAddress(this.page, u);
    await this.page.getByTestId('proceed-3').click();
  }
  async completePurchase() {
    await this.page.getByTestId('payment-method').selectOption({ label: 'Cash on Delivery' });
    await this.page.getByTestId('finish').click();
    await expect(this.page.getByTestId('payment-success-message')).toHaveText('Payment was successful');
    const confirm = this.page.getByRole('button', { name: 'Confirm', exact: true });
    await expect(confirm).toBeVisible();
    await expect(confirm).toBeEnabled();
    const [response] = await Promise.all([
      this.page.waitForResponse(r =>
        new URL(r.url()).pathname === '/invoices' && r.request().method() === 'POST',
        { timeout: 45000 }),
      confirm.click(),
    ]);
    expect(response.status(), `Order creation response: ${await response.text()}`).toBe(201);
  }
  async expectOrderConfirmed() {
    await expect(this.page.getByText(/^Thanks for your order! Your invoice number is INV-\d+\.$/)).toBeVisible({ timeout: 30000 });
  }
}
