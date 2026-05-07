import { test, expect } from '@playwright/test';

test.describe('Shared Components Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/shared-components');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Shared Components' })).toBeVisible();
  });

  test('all component sections are visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Modal' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Toast Notifications' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Banner' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Charts' })).toBeVisible();
  });

  test('modal: click Open Basic Modal then close with Escape', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Basic Modal' }).click();
    await expect(page.getByText('This is a basic modal')).toBeVisible();

    // Close via Escape key
    await page.keyboard.press('Escape');
    await expect(page.getByText('This is a basic modal')).not.toBeVisible();
  });

  test('toast: click toast trigger and toast appears', async ({ page }) => {
    await page.getByRole('button', { name: 'Success Toast' }).click();
    await expect(page.getByText('File saved successfully.')).toBeVisible({ timeout: 3000 });
  });

  test('banner: all 4 variants are shown', async ({ page }) => {
    // Look for banner text content
    await expect(page.getByText('Payment failed')).toBeVisible();
    await expect(page.getByText('Your storage is almost full')).toBeVisible();
    await expect(page.getByText('Scheduled maintenance')).toBeVisible();
    await expect(page.getByText('Your changes have been saved')).toBeVisible();
  });

  test('banner: dismiss hides a banner', async ({ page }) => {
    // There are 4 dismiss buttons (aria-label="Dismiss")
    const dismissButtons = page.getByLabel('Dismiss');
    await expect(dismissButtons.first()).toBeVisible();

    // Click the first dismiss button (should dismiss the error banner)
    await dismissButtons.first().click();
    // Payment failed text should disappear
    await expect(page.getByText('Payment failed')).not.toBeVisible();
  });

  test('charts: chart containers are rendered', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Line Chart' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stacked Area Chart' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bar Chart' })).toBeVisible();
  });
});
