import { test, expect } from '@playwright/test';

test.describe('Shared Components Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/shared-components');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.getByText('Shared Components')).toBeVisible();
  });

  test('all component sections are visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Modal' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Toast Notifications' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Banner' })).toBeVisible();
  });

  test('modal: click Open Basic Modal then close with Escape', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Basic Modal' }).click();
    await expect(page.getByText('This is a basic modal')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByText('This is a basic modal')).not.toBeVisible();
  });

  test('toast: click toast trigger and toast appears', async ({ page }) => {
    await page.getByRole('button', { name: 'Success Toast' }).click();
    await expect(page.getByText('File saved successfully.')).toBeVisible({ timeout: 3000 });
  });

  test('banner: variants are shown', async ({ page }) => {
    await expect(page.getByText('Payment failed')).toBeVisible();
    await expect(page.getByText('Your storage is almost full')).toBeVisible();
  });

  test('banner: dismiss hides a banner', async ({ page }) => {
    const dismissButtons = page.getByLabel('Dismiss');
    await expect(dismissButtons.first()).toBeVisible();
    await dismissButtons.first().click();
    await expect(page.getByText('Payment failed')).not.toBeVisible();
  });
});
