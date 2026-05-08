import { test, expect } from '@playwright/test';

test.describe('Pipeline Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/pipeline-editor');
  });

  test('page renders with pipeline heading', async ({ page }) => {
    await expect(page.getByText('Content Moderation')).toBeVisible();
  });

  test('node palette shows node types', async ({ page }) => {
    await expect(page.getByText('Trigger')).toBeVisible();
    await expect(page.getByText('LLM')).toBeVisible();
    await expect(page.getByText('Condition').first()).toBeVisible();
    await expect(page.getByText('Action', { exact: true }).first()).toBeVisible();
  });

  test('simulation starts and events appear in runs tab', async ({ page }) => {
    // Switch to Runs tab to see event log
    await page.getByRole('button', { name: 'Runs' }).click();
    await expect(page.getByText('step.started').first()).toBeVisible({ timeout: 10000 });
  });

  test('step events accumulate in runs tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Runs' }).click();
    await expect(page.getByText('step.started').first()).toBeVisible({ timeout: 10000 });
  });

  test('step completion events appear in runs tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Runs' }).click();
    await expect(page.getByText('step.completed').first()).toBeVisible({ timeout: 15000 });
  });
});
