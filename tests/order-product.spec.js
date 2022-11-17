import { test, expect } from '@playwright/test';
import { loginValid } from "./login.spec";

test('test', async ({ page }) => {
  await loginValid(page);

  await page.getByRole('link', { name: 'Jualan apa sekarang ?' }).click();

  await page.getByPlaceholder('Cari Produk di Evermos…').fill('kopi');
  await page.getByPlaceholder('Cari Produk di Evermos…').press('Enter');

  await page.getByRole('link', { name: 'Kopi Aren' }).click();
  await page.getByRole('link', { name: 'Beli Sekarang' }).click();
  await expect(page.getByRole('heading', { name: 'Detail Pengiriman' })).toBeVisible();

  await page.locator('a').filter({ hasText: 'Lanjutkan' }).click();
  await expect(page.getByText('Produk berhasil ditambahkan ke keranjang')).toBeVisible();

  await page.getByRole('button', { name: 'Lihat Keranjang' }).click();
  await expect(page.getByRole('heading', { name: 'Keranjang' })).toBeVisible();

  await page.getByRole('link', { name: 'Lanjut ke Checkout' }).click();
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();

  await page.getByRole('link', { name: 'Proses Sekarang' }).click();
  await expect(page.getByText('Lanjutkan Pembayaran?')).toBeVisible();

  await page.getByRole('button', { name: 'Bayar' }).click();
  await expect(page.getByRole('heading', { name: 'Pilih Metode Pembayaran' })).toBeVisible();

  await page.locator('a').filter({ hasText: 'Danamon OnlineInternet Banking & m-Banking' }).click();

  await page.getByRole('button', { name: 'Pay now' }).click();

  await page.getByRole('button', { name: 'Pay' }).click();
  await expect(page.getByText('Payment Success')).toBeVisible();

  await page.getByRole('button', { name: 'Back to merchant website' }).click();
  await expect(page.getByRole('heading', { name: 'Pembayaran Berhasil!' })).toBeVisible();
});