import { test, expect } from '../fixtures/test';
import { customer } from '../test-data/users';

const products = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];

test.describe('Checkout', () => {
  test('complete purchase end-to-end @smoke', async ({ loggedIn, cartPage, checkoutPage }) => {
    for (const p of products) await loggedIn.addToCart(p);
    await loggedIn.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItems(products);
    await cartPage.checkout();

    await checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);

    const { itemTotal, tax, total } = await checkoutPage.getTotals();
    expect(itemTotal).toBeGreaterThan(0);
    expect(total).toBeCloseTo(itemTotal + tax, 2);

    await checkoutPage.finish();
    await checkoutPage.expectComplete();
  });

  test('checkout requires first name', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(products[0]);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation('', customer.lastName, customer.postalCode);
    await expect(checkoutPage.error).toContainText('First Name is required');
  });
});
