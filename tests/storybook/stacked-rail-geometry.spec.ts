// StackedRail geometry gate — measured in a real browser against the
// `Shared/StackedRail` Documents story, which draws the rail beside a
// RailNavList at the same 220px width.
//
// The faults this exists to stop (fixed in 2.407.32): the collapsible group
// heading's caret sat a padding step right of the rows' text (the header button
// padded inside a padded row), rows with a caret slot added the slot on top of
// an 18px/level indent (so each level stepped ~34px), and a non-collapsible
// caption ("VIEWS") sat left of the collapsible captions' labels. One gutter
// model now serves headings and rows alike:
//
//   - a caret sits in the text column of a leaf at the same level (±1px);
//   - its label is one 18px step further in — where its children's text is;
//   - every caption's label (collapsible or not) shares one x (±1px);
//   - each nesting level adds exactly 18px to a leaf's text x;
//   - a level-0 leaf's text x is RailNavList's (same 10px row inset);
//   - every row is RailNavList's row height.
//
// Run: `npm run test:e2e:storybook` (starts Storybook on :6006, or reuses one).

import { test, expect, type Page } from '@playwright/test';

const STORY = '/iframe.html?id=shared-stackedrail--documents&viewMode=story';
const STEP = 18;

type Geometry = Awaited<ReturnType<typeof measure>>;

/** x positions relative to each rail's own left edge. */
async function measure(page: Page) {
  return page.evaluate(() => {
    const stacked = document.querySelector('[data-testid="story-stacked"]') as HTMLElement;
    const navList = document.querySelector('[data-testid="story-rail-nav-list"]') as HTMLElement;
    const x0 = stacked.getBoundingClientRect().left;
    const nx0 = navList.getBoundingClientRect().left;
    const rel = (el: Element | null, origin = x0) => {
      if (!el) throw new Error('missing element');
      return Math.round((el.getBoundingClientRect().left - origin) * 10) / 10;
    };
    const row = (id: string) => stacked.querySelector(`[data-testid="stacked-rail-row-${id}"]`) as HTMLElement;
    const rowText = (id: string) => rel(row(id).querySelector('span[title]'));
    const rowCaret = (id: string) => rel(row(id).querySelector('svg'));
    const header = (id: string) => stacked.querySelector(`[data-testid="stacked-rail-group-${id}-header"]`) as HTMLElement;
    const headerLabel = (id: string) => {
      const el = [...header(id).querySelectorAll('span')].find((s) => s.children.length === 0 && s.textContent && !s.hasAttribute('aria-label'));
      return rel(el ?? null);
    };
    const height = (el: Element) => Math.round(el.getBoundingClientRect().height * 10) / 10;
    return {
      confluenceCaret: rel(header('confluence').querySelector('svg')),
      confluenceLabel: headerLabel('confluence'),
      viewsLabel: headerLabel('views'),
      activityLabel: headerLabel('activity'),
      // level 0: a leaf (Runbooks) and a parent (Engineering handbook)
      leaf0: rowText('runbooks'),
      viewsLeaf0: rowText('all'),
      parent0Caret: rowCaret('handbook'),
      parent0Text: rowText('handbook'),
      // level 1: a leaf (On-call) and a parent (Onboarding)
      leaf1: rowText('oncall'),
      parent1Caret: rowCaret('onboarding'),
      parent1Text: rowText('onboarding'),
      // level 2: a leaf (Day one)
      leaf2: rowText('day-one'),
      navListText: rel(navList.querySelector('[data-testid="rail-nav-list-item-all"] span[title]'), nx0),
      navListRowHeight: height(navList.querySelector('[data-testid="rail-nav-list-item-all"]')!),
      rowHeights: ['all', 'handbook', 'onboarding', 'day-one', 'oncall', 'runbooks'].map((id) => height(row(id))),
    };
  });
}

const near = (actual: number, expected: number, label: string) =>
  expect(Math.abs(actual - expected), `${label}: ${actual} vs ${expected}`).toBeLessThanOrEqual(1);

test('StackedRail: one caret/text column model for captions and rows, 18px per level', async ({ page }) => {
  await page.goto(STORY);
  await page.getByTestId('stacked-rail-row-day-one').waitFor();
  const g: Geometry = await measure(page);
  console.log('stacked-rail geometry', JSON.stringify(g));

  // A level-0 leaf sits exactly where a RailNavList row's text does.
  near(g.leaf0, g.navListText, 'level-0 leaf text vs RailNavList text');
  near(g.viewsLeaf0, g.navListText, 'Views leaf text vs RailNavList text');

  // A collapsible caption's caret is in the text column of the rows under it.
  near(g.confluenceCaret, g.leaf0, 'caption caret vs level-0 leaf text');
  // One caption x for the whole rail: Views/Activity (no caret) == Confluence's label.
  near(g.viewsLabel, g.confluenceLabel, 'VIEWS caption vs collapsible caption label');
  near(g.activityLabel, g.confluenceLabel, 'Activity caption vs collapsible caption label');
  near(g.confluenceLabel - g.confluenceCaret, STEP, 'caption label − caret');

  // A row's caret sits in its level's leaf text column…
  near(g.parent0Caret, g.leaf0, 'level-0 caret vs level-0 leaf text');
  near(g.parent1Caret, g.leaf1, 'level-1 caret vs level-1 leaf text');
  // …its label one step in, where its children's text starts.
  near(g.parent0Text, g.leaf1, 'level-0 parent label vs level-1 leaf text');
  near(g.parent1Text, g.leaf2, 'level-1 parent label vs level-2 leaf text');

  // Each nesting level adds exactly one 18px step.
  near(g.leaf1 - g.leaf0, STEP, 'level 1 − level 0');
  near(g.leaf2 - g.leaf1, STEP, 'level 2 − level 1');
  near(g.parent1Caret - g.parent0Caret, STEP, 'caret step');

  // Row height unchanged: RailNavList's 32px.
  expect(g.navListRowHeight).toBe(32);
  for (const h of g.rowHeights) expect(h).toBe(g.navListRowHeight);
});
