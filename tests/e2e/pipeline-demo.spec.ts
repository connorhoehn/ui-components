import { test, expect } from '@playwright/test';

test.describe('Pipeline Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/pipeline-editor');
  });

  // The editor lives inside the docs shell, whose sidebar repeats several of
  // these words ("Condition", "Action", …). Scope every lookup to the editor
  // region so an unscoped getByText doesn't trip strict mode.
  const editor = (page: import('@playwright/test').Page) =>
    page.getByTestId('docs-shell-main');

  test('page renders with pipeline heading', async ({ page }) => {
    await expect(page.getByText('Content Moderation')).toBeVisible();
  });

  test('node palette shows node types', async ({ page }) => {
    // The palette is the editor's own <aside>, grouped by category
    // (SOURCES / LANGUAGE / DATA / FLOW / OUTPUTS / HUMAN).
    const palette = editor(page).locator('aside').first();
    await expect(palette.getByText('Trigger', { exact: true })).toBeVisible();
    await expect(palette.getByText('LLM', { exact: true })).toBeVisible();
    await expect(palette.getByText('Condition', { exact: true })).toBeVisible();
    await expect(palette.getByText('Action', { exact: true })).toBeVisible();
  });

  // "Runs" is a tab (role=tab), not a button — it was a button before the
  // editor's Config/Runs pane split.
  test('simulation starts and events appear in runs tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'Runs' }).click();
    await expect(editor(page).getByText('step.started').first()).toBeVisible({
      timeout: 10000,
    });
  });

  test('step events accumulate in runs tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'Runs' }).click();
    const started = editor(page).getByText('step.started');
    await expect(started.first()).toBeVisible({ timeout: 10000 });
    await expect
      .poll(() => started.count(), { timeout: 15000 })
      .toBeGreaterThan(1);
  });

  test('step completion events appear in runs tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'Runs' }).click();
    await expect(editor(page).getByText('step.completed').first()).toBeVisible({
      timeout: 15000,
    });
  });
});
