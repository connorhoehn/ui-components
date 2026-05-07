import { test, expect } from '@playwright/test';

test.describe('Observability Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/observability-shell');
  });

  test('page renders with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Observability Dashboard' })).toBeVisible();
  });

  test('KPI cards are visible with initial values', async ({ page }) => {
    await expect(page.getByText('Latency P99', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Error Rate', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Requests/sec', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Active Nodes', { exact: true }).first()).toBeVisible();
    // Initial values
    await expect(page.getByText('1,240')).toBeVisible();
    await expect(page.getByText('12/12')).toBeVisible();
  });

  test('simulation starts and metric values update', async ({ page }) => {
    // After simulation fires, the Latency P99 value becomes "2,450"
    await expect(page.getByText('2,450')).toBeVisible({ timeout: 15000 });
  });

  test('alerts appear in the alerts panel', async ({ page }) => {
    // Wait for the "High Error Rate" alert title (exact match in the alert card)
    await expect(page.getByText('High Error Rate', { exact: true })).toBeVisible({ timeout: 15000 });
  });

  test('node health grid shows status changes', async ({ page }) => {
    await expect(page.getByText('Node Health', { exact: true }).first()).toBeVisible();
    // All 6 nodes should be visible
    await expect(page.getByText('API Gateway')).toBeVisible();
    await expect(page.getByText('Worker Pool 1')).toBeVisible();
    await expect(page.getByText('Redis Primary')).toBeVisible();
    await expect(page.getByText('Postgres', { exact: true })).toBeVisible();

    // Wait for "Memory utilization at 92%" which appears when worker-pool-3 degrades
    await expect(page.getByText('Memory utilization at 92%')).toBeVisible({ timeout: 20000 });
  });
});
