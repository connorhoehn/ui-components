// Docked side panel — the layout contract, measured in a real browser.
//
// jsdom computes no layout, so the unit tests can only assert the classes
// that produce equal column heights. This spec asserts the heights
// themselves against the static example on /components/call-widget: the
// video column and the panel column must end at the same y, or the card
// shows the dead dark band under the controls that shipped in 2.107.

import { test, expect } from '@playwright/test';

const DEMO = '[data-testid="call-widget-dock-demo"]';

test.describe('call widget — docked side panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/call-widget');
    await page.locator(DEMO).scrollIntoViewIfNeeded();
    await expect(page.locator(`${DEMO} [data-testid="call-side-panel"]`)).toBeVisible();
  });

  test('the two columns are height-matched with the chat tab open', async ({ page }) => {
    const box = async (sel: string) => {
      const b = await page.locator(`${DEMO} ${sel}`).boundingBox();
      if (!b) throw new Error(`no box for ${sel}`);
      return b;
    };

    const stage = await box('[data-testid="call-widget-stage-column"]');
    const panel = await box('[data-testid="call-side-panel"]');

    expect(Math.round(stage.height)).toBe(Math.round(panel.height));
    expect(Math.round(stage.y + stage.height)).toBe(Math.round(panel.y + panel.height));

    // The stage column's CONTENT reaches the bottom too — an empty band
    // under the control row is the bug, and a stretched-but-empty column
    // would still pass a box-height check on its own.
    const controls = await box('[data-testid="call-timer"]');
    const stageBottom = stage.y + stage.height;
    expect(stageBottom - (controls.y + controls.height)).toBeLessThan(90);
  });

  test('the panel keeps its height when a different destination is open', async ({ page }) => {
    await page.locator(`${DEMO} [data-testid="call-people-open"]`).click();
    const stage = await page.locator(`${DEMO} [data-testid="call-widget-stage-column"]`).boundingBox();
    const panel = await page.locator(`${DEMO} [data-testid="call-side-panel"]`).boundingBox();
    expect(Math.round(stage!.height)).toBe(Math.round(panel!.height));
  });

  test('the dock contributes exactly one "Chat" header', async ({ page }) => {
    const labels = page.locator(DEMO).getByText(/^\s*Chat\b/);
    await expect(labels).toHaveCount(1);
  });

  test('the whole card still fits a 1280x800 laptop screen', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const card = await page.locator(`${DEMO} [data-testid="call-widget"] > div`).boundingBox();
    expect(card!.width + 32).toBeLessThanOrEqual(1280);
    expect(card!.height + 32).toBeLessThanOrEqual(800);
  });
});
