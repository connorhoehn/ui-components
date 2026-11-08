// Row controls outside the row's button (2.509.0), measured in a real browser
// against `Shared/GroupedList` RowActions and `Work/ActionRowList`
// TrailingControls. Each story draws the same rows at 960px and 390px.
//
// The fault this stops: Studio's Overview nested Approve / Request changes
// inside ActionRowList's row button (invalid, unreachable to a screen reader),
// and on a 390px Work column the GroupedList row's end-of-row buttons squeezed
// the title to a few characters. Now the controls are siblings of the row's
// button: at the row's end when wide, on their own line under the title when
// the row is narrower than 35rem — the title keeps the row's width.
//
// Run: `npm run test:e2e:storybook` (starts Storybook on :6006, or reuses one).

import { test, expect, type Page } from '@playwright/test';

async function geometry(page: Page, rowSel: string, openSel: string, controlsSel: string) {
  return page.evaluate(
    ([r, o, c]) => {
      const row = document.querySelector(r) as HTMLElement;
      const open = document.querySelector(o) as HTMLElement;
      const controls = document.querySelector(c) as HTMLElement;
      const title = open.querySelector('span.truncate') as HTMLElement;
      const box = (el: HTMLElement) => el.getBoundingClientRect();
      return {
        nested: !!document.querySelector('button button, a button'),
        rowWidth: Math.round(box(row).width),
        titleWidth: Math.round(box(title).width),
        titleEllipsized: title.scrollWidth > title.clientWidth,
        titleLeft: Math.round(box(title).left),
        controlsLeft: Math.round(box(controls.firstElementChild as HTMLElement).left),
        controlsTop: Math.round(box(controls).top),
        titleBottom: Math.round(box(title).bottom),
        sameLine: Math.abs(box(controls).top + box(controls).height / 2 - (box(open).top + box(open).height / 2)) < 4,
      };
    },
    [rowSel, openSel, controlsSel] as const,
  );
}

test('GroupedList actions: row end when wide, under the title at 390px', async ({ page }) => {
  await page.goto('/iframe.html?id=shared-groupedlist--row-actions&viewMode=story');
  await page.getByTestId('narrow-row-storyboard').waitFor();
  const wide = await geometry(page, '[data-testid="wide-row-storyboard"]', '[data-testid="wide-row-open-storyboard"]', '[data-testid="wide-row-controls-storyboard"]');
  const narrow = await geometry(page, '[data-testid="narrow-row-storyboard"]', '[data-testid="narrow-row-open-storyboard"]', '[data-testid="narrow-row-controls-storyboard"]');
  console.log('grouped-list', JSON.stringify({ wide, narrow }));
  expect(wide.nested).toBe(false);
  expect(wide.sameLine, 'wide: actions on the title line').toBe(true);
  expect(narrow.sameLine, 'narrow: actions wrapped').toBe(false);
  expect(narrow.controlsTop).toBeGreaterThanOrEqual(narrow.titleBottom - 1);
  // Aligned with the title, and the title keeps most of the row.
  expect(Math.abs(narrow.controlsLeft - narrow.titleLeft)).toBeLessThanOrEqual(2);
  expect(narrow.titleWidth).toBeGreaterThan(narrow.rowWidth * 0.5);

  // Tab from the row lands on its first action; clicking it opens nothing.
  await page.getByTestId('narrow-row-open-storyboard').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('approve-storyboard').nth(1)).toBeFocused();
});

test('ActionRowList trailing: row end when wide, under the title at 390px', async ({ page }) => {
  await page.goto('/iframe.html?id=work-actionrowlist--trailing-controls&viewMode=story');
  await page.getByTestId('narrow-row-storyboard').waitFor();
  const wide = await geometry(page, '[data-testid="wide-row-storyboard"]', '[data-testid="wide-open-storyboard"]', '[data-testid="wide-trailing-storyboard"]');
  const narrow = await geometry(page, '[data-testid="narrow-row-storyboard"]', '[data-testid="narrow-open-storyboard"]', '[data-testid="narrow-trailing-storyboard"]');
  console.log('action-row-list', JSON.stringify({ wide, narrow }));
  expect(wide.nested).toBe(false);
  expect(wide.sameLine).toBe(true);
  expect(narrow.sameLine).toBe(false);
  expect(narrow.controlsTop).toBeGreaterThanOrEqual(narrow.titleBottom - 1);
  expect(Math.abs(narrow.controlsLeft - narrow.titleLeft)).toBeLessThanOrEqual(2);
  expect(narrow.titleWidth).toBeGreaterThan(narrow.rowWidth * 0.5);
  const metrics = await page.evaluate(() => {
    const title = document.querySelector('[data-testid="wide-open-storyboard"] span.truncate') as HTMLElement;
    const desc = document.querySelector('[data-testid="wide-open-storyboard"] [data-testid="action-row-description"]') as HTMLElement;
    const cs = getComputedStyle(title);
    return { size: cs.fontSize, weight: cs.fontWeight, desc: getComputedStyle(desc).fontSize };
  });
  expect(metrics).toEqual({ size: '15px', weight: '600', desc: '13px' });

  await page.getByTestId('narrow-open-storyboard').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('approve-storyboard').nth(1)).toBeFocused();
});
