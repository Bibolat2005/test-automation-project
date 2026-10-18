import { expect, Page } from '@playwright/test';
import { User } from '../data/user.factory';

// The demo backend validates city/state against this same postcode lookup.
// Let the application populate them; do not race it with manual fill() calls.
export async function fillAddress(page: Page, user: User) {
  const country = page.getByTestId('country');
  // Reset through visible options while the lookup inputs are empty.
  // This guarantees a new lookup even when checkout has the same saved address.
  await page.getByTestId('postal_code').clear();
  await page.getByTestId('house_number').clear();
  await country.selectOption(user.country === 'US' ? 'CA' : 'US');
  await page.getByTestId('postal_code').fill(user.postalCode);
  await page.getByTestId('house_number').fill(user.houseNumber);
  const [response] = await Promise.all([
    page.waitForResponse(r => {
      const url = new URL(r.url());
      return r.request().method() === 'GET' && url.pathname === '/postcode-lookup'
        && url.searchParams.get('country') === user.country
        && url.searchParams.get('postcode') === user.postalCode
        && url.searchParams.get('house_number') === user.houseNumber;
    }, { timeout: 30000 }),
    country.selectOption(user.country),
  ]);
  expect(response.status(), `Postcode lookup failed: ${await response.text()}`).toBe(200);
  const address = await response.json();
  for (const field of ['street', 'city', 'state'] as const) {
    expect(typeof address[field], `Lookup must return ${field}`).toBe('string');
    expect(address[field].length, `Lookup must return a nonempty ${field}`).toBeGreaterThan(0);
    await expect(page.getByTestId(field)).toHaveValue(address[field]);
  }
  await expect(country).toHaveValue(user.country);
  await expect(page.getByTestId('postal_code')).toHaveValue(user.postalCode);
  await expect(page.getByTestId('house_number')).toHaveValue(user.houseNumber);
}
