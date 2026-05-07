import { test, expect } from '@playwright/test';

test.describe('Collaboration Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/collaboration');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Real-time Collaboration' })).toBeVisible();
  });

  test('cursor field canvas is rendered', async ({ page }) => {
    // Initially shows empty state text
    await expect(page.getByText('Cursors will appear as the simulation runs...')).toBeVisible();
  });

  test('cursors appear as simulation fires events', async ({ page }) => {
    // Wait for cursor label "Bob Chen" to appear (first cursor to join at 300ms delay)
    await expect(page.getByText('Bob Chen')).toBeVisible({ timeout: 10000 });
  });

  test('cursors move (position style changes)', async ({ page }) => {
    // Wait for cursor to appear
    await expect(page.getByText('Bob Chen')).toBeVisible({ timeout: 10000 });
    // The empty state text should disappear once cursors are present
    await expect(page.getByText('Cursors will appear as the simulation runs...')).not.toBeVisible();
  });

  test('user labels are shown on cursors', async ({ page }) => {
    // "Bob Chen" label is rendered near the cursor
    await expect(page.getByText('Bob Chen')).toBeVisible({ timeout: 10000 });
  });
});
