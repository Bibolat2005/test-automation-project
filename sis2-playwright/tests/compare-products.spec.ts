import { test, expect } from '../fixtures/pages.fixture';
test('TC05 - Combination Pliers and Pliers are distinct and have different positive prices', async ({productPage}) => {
  await productPage.openNamed('Combination Pliers');
  const first = await productPage.details();
  await productPage.openNamed('Pliers');
  const second = await productPage.details();
  expect(first.name).toBe('Combination Pliers');
  expect(second.name).toBe('Pliers');
  expect(first.name).not.toBe(second.name);
  expect(first.price).toBeGreaterThan(0);
  expect(second.price).toBeGreaterThan(0);
  expect(first.price).not.toBe(second.price);
});
