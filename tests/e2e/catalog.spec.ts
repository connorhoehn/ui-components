import { test, expect } from '@playwright/test';

test.describe('Demo Catalog', () => {
  test('page loads with title "Component Demos"', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Component Demos' })).toBeVisible();
  });

  test('demo cards are rendered', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('a[href^="/pages/"], a[href^="/components/"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('category filter chips are shown', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pages', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Components', exact: true })).toBeVisible();
  });

  test('clicking a category filters the grid', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('a[href^="/pages/"], a[href^="/components/"]');
    const allCount = await cards.count();
    await page.getByRole('button', { name: 'Pages', exact: true }).click();
    const filteredCount = await cards.count();
    expect(filteredCount).toBeLessThan(allCount);
    // Click All to restore
    await page.getByRole('button', { name: 'All' }).click();
    await expect(cards).toHaveCount(allCount);
  });

  test('clicking a demo card navigates to the demo page', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href="/pages/pipeline-editor"]').click();
    await expect(page).toHaveURL(/\/pages\/pipeline-editor/);
  });
});
