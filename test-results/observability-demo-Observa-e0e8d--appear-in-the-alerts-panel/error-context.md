# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: observability-demo.spec.ts >> Observability Demo >> alerts appear in the alerts panel
- Location: tests/e2e/observability-demo.spec.ts:27:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('High Error Rate', { exact: true })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText('High Error Rate', { exact: true })

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Observability Demo', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/demo/observability-shell');
  6  |   });
  7  | 
  8  |   test('page renders with heading', async ({ page }) => {
  9  |     await expect(page.getByRole('heading', { name: 'Observability Dashboard' })).toBeVisible();
  10 |   });
  11 | 
  12 |   test('KPI cards are visible with initial values', async ({ page }) => {
  13 |     await expect(page.getByText('Latency P99', { exact: true }).first()).toBeVisible();
  14 |     await expect(page.getByText('Error Rate', { exact: true }).first()).toBeVisible();
  15 |     await expect(page.getByText('Requests/sec', { exact: true }).first()).toBeVisible();
  16 |     await expect(page.getByText('Active Nodes', { exact: true }).first()).toBeVisible();
  17 |     // Initial values
  18 |     await expect(page.getByText('1,240')).toBeVisible();
  19 |     await expect(page.getByText('12/12')).toBeVisible();
  20 |   });
  21 | 
  22 |   test('simulation starts and metric values update', async ({ page }) => {
  23 |     // After simulation fires, the Latency P99 value becomes "2,450"
  24 |     await expect(page.getByText('2,450')).toBeVisible({ timeout: 15000 });
  25 |   });
  26 | 
  27 |   test('alerts appear in the alerts panel', async ({ page }) => {
  28 |     // Wait for the "High Error Rate" alert title (exact match in the alert card)
> 29 |     await expect(page.getByText('High Error Rate', { exact: true })).toBeVisible({ timeout: 15000 });
     |                                                                      ^ Error: expect(locator).toBeVisible() failed
  30 |   });
  31 | 
  32 |   test('node health grid shows status changes', async ({ page }) => {
  33 |     await expect(page.getByText('Node Health', { exact: true }).first()).toBeVisible();
  34 |     // All 6 nodes should be visible
  35 |     await expect(page.getByText('API Gateway')).toBeVisible();
  36 |     await expect(page.getByText('Worker Pool 1')).toBeVisible();
  37 |     await expect(page.getByText('Redis Primary')).toBeVisible();
  38 |     await expect(page.getByText('Postgres', { exact: true })).toBeVisible();
  39 | 
  40 |     // Wait for "Memory utilization at 92%" which appears when worker-pool-3 degrades
  41 |     await expect(page.getByText('Memory utilization at 92%')).toBeVisible({ timeout: 20000 });
  42 |   });
  43 | });
  44 | 
```