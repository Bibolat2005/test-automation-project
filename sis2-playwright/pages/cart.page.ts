import { expect } from '@playwright/test';
import { BasePage } from './base.page';
export class CartPage extends BasePage {
  async expectItem(name: string, quantity: number, unitPrice: number) {
    await expect(this.page.getByTestId('product-title')).toHaveText(name);
    await expect(this.page.getByTestId('product-quantity')).toHaveValue(String(quantity));
    await expect(this.page.getByTestId('product-price')).toHaveText(`$${unitPrice.toFixed(2)}`);
    await expect(this.page.getByTestId('line-price')).toHaveText(`$${(unitPrice * quantity).toFixed(2)}`);
    await expect(this.page.getByTestId('cart-total')).toHaveText(`$${(unitPrice * quantity).toFixed(2)}`);
  }
  async proceed() { await this.page.getByTestId('proceed-1').click(); }
}
