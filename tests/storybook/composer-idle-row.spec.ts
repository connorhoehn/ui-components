// Composer idle-row alignment gate — measured in a real browser, against the
// ContextComposer stories, in BOTH contexts and BOTH themes.
//
// The bug this exists to stop (fixed in 2.407.12, and at least once before in
// 2.384.4): the one-line idle row of a docked ContextComposer
// (`data-collapsed="true"`) bottom-aligned its children (`items-end`) with
// per-child bottom offsets tuned for a 2rem input. The docked card's input is
// a 2.5rem box (`.uic-composer-docked-input`), so the "Write a message…"
// placeholder's centre sat 4px above the mode pill's and 2px above Send's.
// Unit tests cannot see layout; this spec reads bounding boxes and computed
// styles out of Storybook and asserts:
//
//   - the mode pill, the placeholder's line, the context chip (document) and
//     Send share one vertical centre (±1px), which is the row's centre (±1px);
//   - the placeholder has the typed text's font-size / line-height / family;
//   - typing the first character moves the text line by 0px: the line box and
//     its offset inside the editor's text box are the same before and after.
//
// Run: `npm run test:e2e:storybook` (starts Storybook on :6006, or reuses one).

import { test, expect, type Page, type Locator } from '@playwright/test';

type Box = { top: number; height: number; centre: number };

const STORIES = [
  { context: 'conversation', id: 'social-contextcomposer--conversation', chip: false },
  { context: 'document', id: 'social-contextcomposer--document', chip: true },
] as const;
const THEMES = ['light', 'dark'] as const;

async function box(locator: Locator): Promise<Box> {
  const b = await locator.boundingBox();
  if (!b) throw new Error('not rendered');
  return { top: b.y, height: b.height, centre: b.y + b.height / 2 };
}

/** The placeholder is a zero-height `::before` float on the empty paragraph,
 *  so its line is the paragraph's first line box: same top, the pseudo's own
 *  line-height. Also returns the pseudo's and the paragraph's text styles. */
async function placeholderLine(page: Page, rowSelector: string) {
  return page.evaluate((sel) => {
    const row = document.querySelector(sel)!;
    const pm = row.querySelector('.ProseMirror') as HTMLElement;
    const p = pm.querySelector('p') as HTMLElement;
    const before = getComputedStyle(p, '::before');
    const own = getComputedStyle(p);
    const top = p.getBoundingClientRect().top;
    const lineHeight = parseFloat(before.lineHeight);
    return {
      empty: p.classList.contains('is-empty'),
      placeholder: p.getAttribute('data-placeholder'),
      top,
      centre: top + lineHeight / 2,
      offsetInBox: top - pm.getBoundingClientRect().top,
      pseudo: { fontSize: before.fontSize, lineHeight: before.lineHeight, fontFamily: before.fontFamily },
      text: { fontSize: own.fontSize, lineHeight: own.lineHeight, fontFamily: own.fontFamily },
    };
  }, rowSelector);
}

/** The typed text's line: the paragraph's line box and the glyph run's centre. */
async function typedLine(page: Page, rowSelector: string) {
  return page.evaluate((sel) => {
    const row = document.querySelector(sel)!;
    const pm = row.querySelector('.ProseMirror') as HTMLElement;
    const p = pm.querySelector('p') as HTMLElement;
    const own = getComputedStyle(p);
    const range = document.createRange();
    range.selectNodeContents(p);
    const glyphs = range.getBoundingClientRect();
    const top = p.getBoundingClientRect().top;
    return {
      top,
      centre: top + parseFloat(own.lineHeight) / 2,
      glyphCentre: glyphs.top + glyphs.height / 2,
      offsetInBox: top - pm.getBoundingClientRect().top,
      text: { fontSize: own.fontSize, lineHeight: own.lineHeight, fontFamily: own.fontFamily },
    };
  }, rowSelector);
}

for (const story of STORIES) {
  for (const theme of THEMES) {
    test(`${story.context} · ${theme}: the idle row is one centred line and typing does not move the text`, async ({ page }) => {
      await page.setViewportSize({ width: 1400, height: 900 });
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
      const panel = `[data-testid="composer-${theme}-idle"]`;
      const row = `${panel} [data-collapsed]`;
      await page.waitForSelector(`${row}[data-collapsed="true"] .ProseMirror p.is-empty`);
      // Fonts settle the line boxes; measure after they load.
      await page.evaluate(() => document.fonts.ready);

      const card = await box(page.locator(row));
      const pill = await box(page.locator(`${row} [data-testid$="-mode-pill"]`));
      const send = await box(page.locator(`${row} [data-testid$="-send"]`));
      const text = await placeholderLine(page, row);
      const centres: Record<string, number> = { row: card.centre, pill: pill.centre, placeholder: text.centre, send: send.centre };
      if (story.chip) centres.chip = (await box(page.locator(`${row} [data-testid$="-references"]`))).centre;
      test.info().annotations.push({ type: 'centres', description: JSON.stringify(centres) });

      expect(text.empty).toBe(true);
      expect(text.placeholder).toBeTruthy();
      expect(card.height).toBe(42);
      for (const [name, centre] of Object.entries(centres)) {
        expect(Math.abs(centre - card.centre), `${name} centre ${centre} vs row ${card.centre}`).toBeLessThanOrEqual(1);
        expect(Math.abs(centre - text.centre), `${name} centre ${centre} vs placeholder ${text.centre}`).toBeLessThanOrEqual(1);
      }
      // The placeholder is written in the typed text's type.
      expect(text.pseudo).toEqual(text.text);

      // Focus: the card expands; the empty line still shows the placeholder.
      await page.locator(`${row} .ProseMirror`).click();
      await page.waitForSelector(`${row}[data-collapsed="false"]`);
      const focused = await placeholderLine(page, row);
      expect(focused.empty).toBe(true);
      expect(focused.pseudo).toEqual(text.pseudo);

      // Type one character: the line does not move, in the page or in the box.
      await page.keyboard.type('W');
      await page.waitForSelector(`${row} .ProseMirror p:not(.is-empty)`);
      const typed = await typedLine(page, row);
      expect(typed.text).toEqual(text.pseudo);
      expect(typed.top - focused.top).toBe(0);
      expect(typed.centre - focused.centre).toBe(0);
      expect(typed.offsetInBox - focused.offsetInBox).toBe(0);
      // Idle → typed: the line sits at the same place in its text box.
      expect(typed.offsetInBox - text.offsetInBox).toBe(0);
      // And the glyphs are centred on that line.
      expect(Math.abs(typed.glyphCentre - typed.centre)).toBeLessThanOrEqual(1);
    });
  }
}
