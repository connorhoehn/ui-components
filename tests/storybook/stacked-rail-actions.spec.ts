// StackedRail chrome budget at the Org rail's 220px (railWidth="xs") —
// measured in a real browser against the `Shared/StackedRail` Documents story.
//
// The fault this stops (fixed in 2.407.36): always-visible heading chrome ate
// the label. A group's ⋯ + presence + count left ~100px, so "WORKSPACE DRAFTS"
// read "WORKSPACE DRA…" and a folded "AUTH MIGRATION" with presence read
// "AUTH MIGRA…"; the caption read "DOCUM… 187" beside three 28px buttons.
// Now:
//
//   - a group's actions wait for hover / keyboard focus (or a current group),
//     presence and the count stay put, and the label reads whole until hover;
//   - the caption's count sits right after its title, and more than one
//     caption action folds into one ⋯ below 240px, so "DOCUMENTS 187" reads
//     whole with all three actions a click away.
//
// Run: `npm run test:e2e:storybook` (starts Storybook on :6006, or reuses one).

import { test, expect, type Page } from '@playwright/test';

const STORY = '/iframe.html?id=shared-stackedrail--documents&viewMode=story';

async function label(page: Page, groupId: string) {
  return page.evaluate((id) => {
    const el = document.querySelector(`[data-testid="stacked-rail-group-${id}-header-label"]`) as HTMLElement;
    return { width: Math.round(el.getBoundingClientRect().width), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, ellipsized: el.scrollWidth > el.clientWidth };
  }, groupId);
}

/** A heading's actions slot is out when it takes layout width (hidden it is `sr-only`: 1px, clipped). */
async function revealed(page: Page, groupId: string) {
  const box = await page.getByTestId(`stacked-rail-group-${groupId}-actions`).boundingBox();
  return (box?.width ?? 0) > 1;
}

async function caption(page: Page) {
  return page.evaluate(() => {
    const el = document.querySelector('[data-testid="stacked-rail-title"]') as HTMLElement;
    const count = document.querySelector('[data-testid="stacked-rail-count"]') as HTMLElement;
    return {
      width: Math.round(el.getBoundingClientRect().width),
      ellipsized: el.scrollWidth > el.clientWidth,
      countText: count.textContent,
      // The count follows the title (one flex gap), not pushed to the far edge.
      countGap: Math.round(count.getBoundingClientRect().left - el.getBoundingClientRect().right),
      railRight: Math.round((document.querySelector('[data-testid="story-stacked"]') as HTMLElement).getBoundingClientRect().right),
    };
  });
}

test('StackedRail at 220px: labels read whole until hover; actions reveal on hover/focus; presence stays', async ({ page }) => {
  await page.goto(STORY);
  await page.getByTestId('stacked-rail-row-day-one').waitFor();
  await page.mouse.move(0, 0);
  const rail = await page.getByTestId('story-stacked').boundingBox();
  expect(rail?.width).toBe(220);

  const drafts = await label(page, 'drafts');
  const auth = await label(page, 'auth');
  console.log('labels at rest', JSON.stringify({ drafts, auth }));
  expect(drafts.ellipsized, 'WORKSPACE DRAFTS ellipsized at rest').toBe(false);
  expect(auth.ellipsized, 'AUTH MIGRATION ellipsized at rest').toBe(false);
  expect(drafts.width).toBeGreaterThanOrEqual(120);

  // The ⋯ waits; presence and the count do not.
  expect(await revealed(page, 'drafts')).toBe(false);
  expect(await revealed(page, 'auth')).toBe(false);
  await expect(page.getByTestId('stacked-rail-group-drafts-trailing')).toBeVisible();
  await expect(page.getByTestId('stacked-rail-group-auth-trailing')).toBeVisible();
  await expect(page.getByTestId('stacked-rail-group-drafts-count')).toBeVisible();
  // The current group (Onboarding lives in Confluence) keeps its action out.
  await expect(page.getByRole('button', { name: 'Pull Confluence · Platform' })).toBeVisible();

  // Hover reveals the ⋯ (the label may then ellipsize).
  await page.getByTestId('stacked-rail-group-drafts-header').hover();
  await expect.poll(() => revealed(page, 'drafts')).toBe(true);
  await expect(page.getByTestId('story-drafts-menu')).toBeVisible();
  console.log('drafts label on hover', JSON.stringify(await label(page, 'drafts')));
  await expect(page.getByTestId('stacked-rail-group-drafts-trailing')).toBeVisible();

  // Keyboard: focusing the heading reveals it, and Tab reaches it.
  await page.mouse.move(0, 0);
  await expect.poll(() => revealed(page, 'drafts')).toBe(false);
  await page.getByTestId('stacked-rail-group-auth-header').focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab'); // a keyboard-modality focus on the heading
  await expect(page.getByTestId('stacked-rail-group-auth-header')).toBeFocused();
  expect(await revealed(page, 'auth')).toBe(true);
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('story-auth-menu')).toBeFocused();
  expect(await revealed(page, 'auth')).toBe(true);
  // A mouse click on a heading does not pin them (focus-visible, not focus).
  await page.getByTestId('stacked-rail-group-drafts-header').click();
  await page.mouse.move(0, 0);
  await expect.poll(() => revealed(page, 'drafts')).toBe(false);
  await page.getByTestId('stacked-rail-group-drafts-header').click(); // reopen
});

test('StackedRail at 220px: the caption reads "DOCUMENTS 187" whole with its three actions in one ⋯', async ({ page }) => {
  await page.goto(STORY);
  await page.getByTestId('stacked-rail-row-day-one').waitFor();
  const c = await caption(page);
  console.log('caption', JSON.stringify(c));
  expect(c.ellipsized, 'caption ellipsized').toBe(false);
  expect(c.countText).toBe('187');
  expect(c.countGap).toBeLessThanOrEqual(8);
  const more = page.getByTestId('stacked-rail-actions-menu');
  await expect(more).toBeVisible();
  const box = await more.boundingBox();
  expect(Math.round((box?.x ?? 0) + (box?.width ?? 0))).toBeLessThanOrEqual(c.railRight);
  await more.click();
  for (const name of ['New document', 'Import', 'Refresh']) await expect(page.getByRole('menuitem', { name })).toBeVisible();
});
