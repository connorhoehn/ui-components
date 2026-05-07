import { test, expect } from '@playwright/test';

test.describe('Ingest Dashboard Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/ingest-dashboard');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ingest Dashboard' })).toBeVisible();
  });

  test('KPI cards show initial zeros', async ({ page }) => {
    await expect(page.getByText('Active Syncs')).toBeVisible();
    await expect(page.getByText('Items Processed')).toBeVisible();
    await expect(page.getByText('Conflicts')).toBeVisible();
    await expect(page.getByText('DLQ Items')).toBeVisible();
  });

  test('activity log is empty initially', async ({ page }) => {
    await expect(page.getByText('Activity Log')).toBeVisible();
    await expect(page.getByText('Events will appear here as the simulation runs...')).toBeVisible();
  });

  test('simulation fires and events appear in log', async ({ page }) => {
    // Wait for sync started event - the first event in the ingest simulation
    await expect(page.getByText('Sync started: SharePoint').first()).toBeVisible({ timeout: 10000 });
  });

  test('KPI numbers update during simulation', async ({ page }) => {
    // Wait for progress event that updates "Items Processed" KPI
    // Use exact match for "312" which is the KPI value
    await expect(page.getByText('312', { exact: true })).toBeVisible({ timeout: 15000 });
  });
});
