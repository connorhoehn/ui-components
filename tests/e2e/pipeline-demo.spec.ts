// The pipeline-editor demo mounts the library's real PipelineEditorPage, so
// these are assertions about the shipped editor, not about a mockup.
//
// The previous version of this spec targeted a hand-rolled simulation that
// drove fake `step.started` events into a fake runs list. That demo is gone —
// it rendered a picture of the editor in which nothing could be clicked or
// dragged. What is asserted here instead is that the editor actually works:
// the seeded pipeline opens, the palette drags onto the canvas, and selecting
// a node opens its config panel.

import { test, expect, type Page } from '@playwright/test';

// The editor lives inside the docs shell, whose sidebar repeats several node
// words ("Condition", "Transform", …). Scope lookups to the editor region so
// an unscoped getByText doesn't trip strict mode.
const editor = (page: Page) => page.getByTestId('docs-shell-main');

test.describe('Pipeline Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workflows/pipeline-editor');
    // The index route redirects to the seeded pipeline's id.
    await expect(page).toHaveURL(/\/workflows\/pipeline-editor\/[0-9a-f-]{36}$/);
    await expect(editor(page).getByTestId('pipeline-editor')).toBeVisible();
  });

  test('opens the seeded demo pipeline', async ({ page }) => {
    await expect(editor(page).getByTestId('pipeline-name')).toHaveText(
      /Document Summary Pipeline \(Demo\)/,
    );
  });

  test('renders the seeded graph on the canvas', async ({ page }) => {
    // createDemoPipeline seeds a 12-node graph; assert nodes and edges both
    // made it through, since an empty canvas still renders a React Flow root.
    await expect
      .poll(() => editor(page).locator('.react-flow__node').count())
      .toBeGreaterThan(1);
    await expect
      .poll(() => editor(page).locator('.react-flow__edge').count())
      .toBeGreaterThan(0);
  });

  test('fits the whole graph inside the canvas', async ({ page }) => {
    // React Flow's default minZoom (0.5) is not low enough to fit a pipeline
    // this wide in the canvas column, and the flow root is `overflow: hidden`,
    // so a clamped fit silently clips half the graph away.
    const root = editor(page).locator('.react-flow').first();
    const box = await root.boundingBox();
    expect(box).not.toBeNull();

    const nodes = editor(page).locator('.react-flow__node');
    const count = await nodes.count();
    expect(count).toBeGreaterThan(1);

    for (let i = 0; i < count; i++) {
      const n = await nodes.nth(i).boundingBox();
      if (!n || !box) continue;
      expect(n.x).toBeGreaterThanOrEqual(box.x - 1);
      expect(n.x + n.width).toBeLessThanOrEqual(box.x + box.width + 1);
    }
  });

  test('node palette shows node types', async ({ page }) => {
    const palette = editor(page).getByTestId('node-palette');
    await expect(palette.getByTestId('palette-item-trigger')).toBeVisible();
    await expect(palette.getByTestId('palette-item-llm')).toBeVisible();
    await expect(palette.getByTestId('palette-item-condition')).toBeVisible();
  });

  test('palette search filters the node list', async ({ page }) => {
    const palette = editor(page).getByTestId('node-palette');
    await palette.getByTestId('palette-search').fill('condition');
    await expect(palette.getByTestId('palette-item-condition')).toBeVisible();
    await expect(palette.getByTestId('palette-item-llm')).toHaveCount(0);
  });

  test('dragging a palette item onto the canvas adds a node', async ({ page }) => {
    // This is the interaction the mockup could not do at all. The palette uses
    // HTML5 drag-and-drop (dataTransfer), which Chromium drives from real
    // mouse input, so locator.dragTo exercises the same path a user does.
    const canvas = editor(page).locator('.react-flow__pane');
    const nodes = editor(page).locator('.react-flow__node');
    const before = await nodes.count();

    await editor(page).getByTestId('palette-item-transform').dragTo(canvas);

    await expect.poll(() => nodes.count()).toBe(before + 1);
  });

  test('selecting a node opens its config panel', async ({ page }) => {
    // The node tabs only exist once something is selected — before that the
    // right-hand pane is the pipeline-level panel.
    await expect(editor(page).getByRole('tab', { name: 'Config' })).toHaveCount(0);

    await editor(page).locator('.react-flow__node').first().click();

    const tabs = editor(page).getByRole('tablist', { name: 'Node configuration tabs' });
    await expect(tabs.getByRole('tab', { name: 'Config' })).toBeVisible();
    await expect(tabs.getByRole('tab', { name: 'Runs' })).toBeVisible();

    // ...and the panel holds the real config for that node type, not a
    // placeholder: the seeded graph starts at a Trigger.
    await expect(editor(page).getByText('Trigger type')).toBeVisible();
    await expect(editor(page).getByRole('combobox').first()).toBeVisible();
  });

  test('reuses the seeded pipeline instead of reseeding on every visit', async ({
    page,
  }) => {
    const first = page.url();
    await page.goto('/workflows/pipeline-editor');
    await expect(page).toHaveURL(first);
  });
});
