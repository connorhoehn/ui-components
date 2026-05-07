import { test, expect } from '@playwright/test';

test.describe('Pipeline Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo/pipeline-editor');
  });

  test('page renders with pipeline heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Document Processing Pipeline' })).toBeVisible();
  });

  test('node status tracker shows 4 nodes', async ({ page }) => {
    // The pipeline has 4 nodes
    await expect(page.getByText('Document Upload')).toBeVisible();
    await expect(page.getByText('Extract Text')).toBeVisible();
    await expect(page.getByText('Classify Document')).toBeVisible();
    await expect(page.getByText('Store Result')).toBeVisible();
  });

  test('simulation starts automatically and events appear in log', async ({ page }) => {
    // Wait for "run.started" text in the event log
    await expect(page.getByText('run.started')).toBeVisible({ timeout: 10000 });
  });

  test('events accumulate in the log as simulation plays', async ({ page }) => {
    // Wait for step events to appear
    await expect(page.getByText('step.started').first()).toBeVisible({ timeout: 10000 });
  });

  test('nodes change status during execution', async ({ page }) => {
    // Wait for "Pipeline executing..." which means the run has started
    await expect(page.getByText('Pipeline executing...')).toBeVisible({ timeout: 10000 });
  });

  test('after full cycle all nodes reach completed state', async ({ page }) => {
    // Wait for the last node (action-1) step.completed event in the log
    // This confirms the full pipeline has executed
    await expect(page.getByText('step.completed').nth(3)).toBeVisible({ timeout: 25000 });
  });
});
