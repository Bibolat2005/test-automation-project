import { expect } from '@playwright/test';
import { BasePage } from './base.page';
export class ProductPage extends BasePage {
  async openNamed(name: string) {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.getByTestId('product-name').filter({ hasText: new RegExp(`^\\s*${name}\\s*$`) }).click();
    await expect(this.page.getByTestId('product-name')).toHaveText(name);
    await expect(this.page.getByTestId('unit-price')).toHaveText(/\d+\.\d{2}/);
  }
  async details() {
    return { name: (await this.page.getByTestId('product-name').innerText()).trim(),
      price: Number((await this.page.getByTestId('unit-price').innerText()).replace(/[^\d.]/g, '')) };
  }
  async addToCart(quantity: number) {
    await this.page.getByTestId('quantity').fill(String(quantity));
    await this.page.getByTestId('add-to-cart').click();
    await expect(this.page.getByTestId('cart-quantity')).toHaveText(String(quantity));
  }
  async openCart() { await this.page.getByTestId('nav-cart').click(); }
}
