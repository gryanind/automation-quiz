import { loginValid } from "./login.spec";
import { test, expect } from '@playwright/test';
var randomstring = require("randomstring");

const productName = [
    'kopi',
    'matras',
    'sepatu'
]

test('test Search Product', async ({ page }) => {
  const index = randomstring.generate({
    length: 1,
    charset: '012'
  })
  await loginValid(page);

  await page.getByRole('link', { name: 'Jualan apa sekarang ?' }).click();
  await expect(page).toHaveURL('https://staging.evermosa2z.com/search');

  await page.getByPlaceholder('Cari Produk di Evermos…').fill(productName[index]);
  await page.getByPlaceholder('Cari Produk di Evermos…').press('Enter');
  await expect(page).toHaveURL('https://staging.evermosa2z.com/browse?text='+productName[index]+'&orderBy=0&navSource=search_result');
  await expect(page.getByRole('link', { name: 'Filter' })).toBeVisible();
});