import { test, expect } from '@playwright/test';

test.describe('Demo Catalog', () => {
  test('page loads with title "Component Demos"', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Component Demos' })).toBeVisible();
  });

  test('all 7 demo cards are rendered', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('a[href^="/demo/"]');
    await expect(cards).toHaveCount(7);
  });

  test('category filter chips are shown', async ({ page }) => {
    await page.goto('/');
    const chips = page.getByRole('button');
    // Categories: All, Pipelines, Ingest, Documents, Observability, Social, Collaboration, Shared
    await expect(chips.filter({ hasText: 'All' })).toBeVisible();
    await expect(chips.filter({ hasText: 'Pipelines' })).toBeVisible();
    await expect(chips.filter({ hasText: 'Ingest' })).toBeVisible();
    await expect(chips.filter({ hasText: 'Documents' })).toBeVisible();
    await expect(chips.filter({ hasText: 'Observability' })).toBeVisible();
    await expect(chips.filter({ hasText: 'Social' })).toBeVisible();
    await expect(chips.filter({ hasText: 'Collaboration' })).toBeVisible();
    await expect(chips.filter({ hasText: 'Shared' })).toBeVisible();
  });

  test('clicking a category filters the grid', async ({ page }) => {
    await page.goto('/');
    // Click Pipelines category
    await page.getByRole('button', { name: 'Pipelines' }).click();
    const cards = page.locator('a[href^="/demo/"]');
    await expect(cards).toHaveCount(1);
    // Click All to restore
    await page.getByRole('button', { name: 'All' }).click();
    await expect(cards).toHaveCount(7);
  });

  test('clicking a demo card navigates to the demo page', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href="/demo/pipeline-editor"]').click();
    await expect(page).toHaveURL(/\/demo\/pipeline-editor/);
    await expect(page.getByText('Pipeline Editor')).toBeVisible();
  });

  test('back link returns to catalog', async ({ page }) => {
    await page.goto('/demo/pipeline-editor');
    await page.getByText('All Demos').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Component Demos' })).toBeVisible();
  });
});
