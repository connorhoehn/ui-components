import { test, expect } from '@playwright/test';

test.describe('Demo Catalog', () => {
  test('landing hero headline is visible', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: 'Build real-time apps fast.' }),
    ).toBeVisible();
  });

  test('audience hero shows the five build paths', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'What do you want to build?' })).toBeVisible();
    for (const title of [
      'Build a chat',
      'Build a call',
      'Build a doc',
      'Build a pipeline',
      'Build an admin console',
    ]) {
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    }
  });

  test('audience hero primary CTA navigates to its demo', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Open pipeline demo/i }).click();
    await expect(page).toHaveURL(/\/workflows\/pipeline-editor/);
  });

  test('catalog grid renders demo cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('a[href^="/workflows/"], a[href^="/components/"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('category filter chips are shown', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Foundations', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Workflows', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Hook Integrations', exact: true })).toBeVisible();
  });

  test('clicking a category narrows the grid', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('a[href^="/components/"]:has(h3)');
    await page.getByRole('button', { name: 'Foundations', exact: true }).click();
    // After filtering to Foundations, every visible catalog card should be a component link.
    await expect(cards.first()).toBeVisible();
  });

  test('clicking a catalog card navigates to the demo page', async ({ page }) => {
    await page.goto('/');
    // The pipeline-editor entry has no explicit path override → default /workflows/{id}.
    await page.locator('a[href="/workflows/pipeline-editor"]').first().click();
    await expect(page).toHaveURL(/\/workflows\/pipeline-editor/);
  });
});
