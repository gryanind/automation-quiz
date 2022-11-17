import { test, expect } from '@playwright/test';

// Test Login Invalid
test('test Login Invalid', async ({ page }) => {
  await page.goto('https://staging.evermosa2z.com/login');

  await page.getByPlaceholder('Nomor Telepon Anda').click();
  await page.getByPlaceholder('Nomor Telepon Anda').fill('628123456789');

  await page.getByPlaceholder('Kata Sandi Anda').click();
  await page.getByPlaceholder('Kata Sandi Anda').fill('123123456');

  await page.getByRole('button', { name: 'Masuk' }).click();
  await expect(page.getByText('Nomor Telepon atau Kata Sandi anda salah!')).toBeVisible();

  await page.close();
});

// Test Login Valid
async function loginValid(page) {
  await page.goto('https://staging.evermosa2z.com/login');

  await page.getByPlaceholder('Nomor Telepon Anda').click();
  await page.getByPlaceholder('Nomor Telepon Anda').fill('62252500000');
  await expect(page.getByPlaceholder('Nomor Telepon Anda')).toHaveValue('62252500000');

  await page.getByPlaceholder('Kata Sandi Anda').click();
  await page.getByPlaceholder('Kata Sandi Anda').fill('123123123');
  await expect(page.getByPlaceholder('Kata Sandi Anda')).toHaveValue('123123123');

  await page.getByRole('button', { name: 'Masuk' }).click();
  await expect(page).toHaveURL('https://staging.evermosa2z.com/catalog');
}

// Run Test Login Valid
test('test Login Valid', async ({ page }) => {
    await loginValid(page);

    await page.close();
});

//export function loginValid
module.exports = {loginValid};