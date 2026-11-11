// The narrow batch (2.518.0), measured at a phone's width (390 x 844) against
// the `Checks/Narrow batch` stories. Unit tests cannot see where a line wraps,
// how high a sheet is or whether a clamp holds; this reads bounding boxes.
//
// Run: `npm run test:e2e:storybook` (starts Storybook, or reuses one on
// STORYBOOK_PORT).

import { test, expect, type Page } from '@playwright/test';

const PHONE = { width: 390, height: 844 };
const story = (page: Page, id: string) => page.goto(`/iframe.html?id=checks-narrow-batch--${id}&viewMode=story`);

test.describe('narrow batch at 390', () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize(PHONE); });

  test('stats line: no visible line starts or ends with "•", and the bar is drawn', async ({ page }) => {
    await story(page, 'stats-line');
    const strip = page.getByTestId('narrow-stats');
    await expect(strip).toBeVisible();
    const layout = await strip.evaluate((frame) => {
      const f = frame.getBoundingClientRect();
      const box = (el: Element) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, mid: (r.top + r.bottom) / 2 }; };
      const clusters = Array.from(frame.querySelectorAll('[data-testid="stat-strip-cluster"]')).map(box);
      const seps = Array.from(frame.querySelectorAll('[data-testid="stat-strip-separator"]')).map(box);
      const bar = frame.querySelector('[data-testid="stat-strip-progress"]');
      return { frame: { left: f.left, right: f.right }, clusters, seps, bar: bar ? box(bar) : null };
    });
    // Lines: the clusters sit on more than one line at this width.
    const lines = new Set(layout.clusters.map((c) => Math.round(c.top)));
    expect(lines.size).toBeGreaterThan(1);
    for (const sep of layout.seps) {
      const visible = sep.right > layout.frame.left + 1;
      if (!visible) continue;
      const sameLine = (c: { top: number; bottom: number }) => c.top < sep.bottom && c.bottom > sep.top;
      // A visible separator has a cluster before AND after it on its own line.
      expect(layout.clusters.some((c) => sameLine(c) && c.right <= sep.left + 1)).toBe(true);
      expect(layout.clusters.some((c) => sameLine(c) && c.left >= sep.right - 1)).toBe(true);
    }
    expect(layout.bar).not.toBeNull();
    expect(layout.bar!.left).toBeGreaterThanOrEqual(layout.frame.left - 0.5);
    expect(layout.bar!.right).toBeLessThanOrEqual(layout.frame.right + 0.5);
  });

  test('composer: Workflow is one tap from the idle row, and the keyboard opens it', async ({ page }) => {
    await story(page, 'composer-idle');
    const root = page.getByTestId('narrow-composer');
    await expect(root).toHaveAttribute('data-collapsed', 'true');
    const trigger = page.getByRole('button', { name: 'Workflow' });
    await expect(trigger).toBeVisible();
    const box = (await trigger.boundingBox())!;
    expect(box.x + box.width).toBeLessThanOrEqual(PHONE.width);
    await trigger.click();
    await expect(page.getByText('Unblock this item')).toBeVisible();
    await page.keyboard.press('Escape');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText('Presentation deck')).toBeVisible();
    await page.getByText('Unblock this item').click();
    await expect(root).toHaveAttribute('data-collapsed', 'false');
  });

  test('voice confirmation: a sheet above the footer, at most 45% high, the page above readable and scrollable', async ({ page }) => {
    await story(page, 'voice-sheet');
    const sheet = page.getByTestId('voice-dock-pending');
    await expect(sheet).toBeVisible();
    await expect(sheet).toHaveAttribute('data-placement', 'sheet');
    const s = (await sheet.boundingBox())!;
    const footer = (await page.getByTestId('narrow-footer').boundingBox())!;
    expect(s.y + s.height).toBeLessThanOrEqual(footer.y + 0.5);
    expect(s.height).toBeLessThanOrEqual(PHONE.height * 0.45 + 1);
    expect(s.x).toBeGreaterThanOrEqual(7.5);
    expect(s.x + s.width).toBeLessThanOrEqual(PHONE.width - 7.5);
    // The top of the page is clear of the sheet.
    const first = (await page.getByTestId('narrow-page-line-0').boundingBox())!;
    expect(first.y + first.height).toBeLessThanOrEqual(s.y);
    // The page scrolls under it, and a press on the page does not cancel it.
    const pageBox = page.getByTestId('narrow-page');
    await page.mouse.move(195, 120);
    await page.mouse.wheel(0, 400);
    await expect.poll(() => pageBox.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    await page.getByTestId('narrow-page-line-3').click();
    await expect(sheet).toBeVisible();
  });

  test('table: a long decision title wraps to two lines, then clamps; focus shows the whole title', async ({ page }) => {
    await story(page, 'table-two-lines');
    const link = page.getByRole('link', { name: /Cutover order/ });
    await expect(link).toBeVisible();
    const metrics = await link.evaluate((a) => {
      const box = a.parentElement!;
      const lh = parseFloat(getComputedStyle(box).lineHeight);
      return { height: box.getBoundingClientRect().height, lh, cut: box.scrollHeight > box.clientHeight + 1 };
    });
    expect(metrics.height).toBeGreaterThan(metrics.lh * 1.5);
    expect(metrics.height).toBeLessThanOrEqual(metrics.lh * 2 + 1);
    expect(metrics.cut).toBe(true);
    await link.focus();
    await expect(page.getByRole('tooltip')).toContainText('riskiest two first while the shim is still warm');
    // A title that fits shows no tooltip.
    await page.getByRole('link', { name: 'Judge model for canary evaluation' }).focus();
    await expect(page.getByRole('tooltip')).toHaveCount(0);
  });
});
