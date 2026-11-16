import { test } from '../fixtures/test';
import { users, PASSWORD } from '../test-data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user can log in @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard, PASSWORD);
    await inventoryPage.expectLoaded();
  });

  test('locked-out user sees an error', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut, PASSWORD);
    await loginPage.expectError('Sorry, this user has been locked out.');
  });

  test('wrong password is rejected', async ({ loginPage }) => {
    await loginPage.login(users.standard, 'wrong_password');
    await loginPage.expectError('Username and password do not match');
  });

  const requiredFieldCases = [
    { user: '', pass: PASSWORD, message: 'Username is required' },
    { user: users.standard, pass: '', message: 'Password is required' },
  ];
  for (const c of requiredFieldCases) {
    test(`validation: ${c.message}`, async ({ loginPage }) => {
      await loginPage.login(c.user, c.pass);
      await loginPage.expectError(c.message);
    });
  }
});
