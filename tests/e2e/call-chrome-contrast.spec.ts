// Call-chrome legibility gate — measured in a real browser, in BOTH themes.
//
// The bug this exists to stop (fixed in 2.111.0): the call widget was
// painted with `bg-surface-inverse`, a token that CORRECTLY flips with the
// theme, while every child was hardcoded white (`text-white`,
// `text-white/60`, `bg-white/10`). In light mode the surface resolved to
// #0f172a and everything read fine; with `data-theme="dark"` set before
// joining, the same surface resolved to #f8fafc and the entire widget
// became white-on-white — title, timer, tab labels, chat body, close ✕ and
// every control icon invisible. The fix is the theme-INVARIANT
// `--color-call-chrome` family (see src/styles.css).
//
// Unit tests cannot see colour, which is exactly how this class of bug has
// shipped here repeatedly. So this spec renders the real page, reads the
// COMPUTED colours out of the browser, composites every translucent layer,
// and asserts WCAG contrast:
//
//   - text            ≥ 4.5:1  (WCAG 1.4.3, normal-size text)
//   - icons / glyphs  ≥ 3.0:1  (WCAG 1.4.11, non-text contrast)
//
// It also asserts the chrome actually PAINTS an opaque background — a
// transparent card would let the page show through and make any contrast
// number meaningless.

import { test, expect, type Page } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SHOTS =
  process.env.CALL_CHROME_SHOT_DIR ??
  join(process.cwd(), 'test-results', 'call-chrome-contrast');

const DEMO = '[data-testid="call-widget-dock-demo"]';

interface Reading {
  ratio: number;
  fg: string;
  bg: string;
  opaque: boolean;
}

/**
 * Reads an element's rendered text colour and the colour actually behind
 * it, then returns the WCAG contrast ratio.
 *
 * Both halves matter. The foreground is usually translucent
 * (`text-white/60` → rgba(255,255,255,0.6)) so it must be composited over
 * its backdrop before its luminance means anything; and the backdrop is a
 * STACK — a `bg-white/15` tab pill over the `bg-call-chrome` card — so we
 * walk ancestors until something opaque stops us and composite downwards.
 */
async function readContrast(page: Page, selector: string): Promise<Reading> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) throw new Error(`no element matched ${sel}`);

    // Colours are composited by a 1×1 canvas rather than a hand-rolled
    // parser. Tailwind v4 emits `color-mix(in oklab, …)` for every
    // `/opacity` utility, which Chrome serializes as
    // `oklab(0.99 0.00 0.00 / 0.6)` — a regex over `rgba(…)` silently
    // reads that as fully transparent and every element then "matches"
    // its own background at a perfect 1.00:1. Painting through the
    // browser's own colour pipeline is exact for any syntax it can emit,
    // and does the alpha compositing for free.
    const cv = document.createElement('canvas');
    cv.width = cv.height = 1;
    const ctx = cv.getContext('2d', { willReadFrequently: true })!;
    const px = () => {
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return [d[0]!, d[1]!, d[2]!, d[3]! / 255] as [number, number, number, number];
    };
    const alphaOf = (c: string) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
      return px()[3];
    };
    /** Paint `layers` bottom-up over an opaque `base`, return the result. */
    const flatten = (
      layers: string[],
      base: [number, number, number],
    ): [number, number, number] => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
      ctx.fillRect(0, 0, 1, 1);
      for (const c of layers) {
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
      }
      const [r, g, b] = px();
      return [r, g, b];
    };
    const lum = (c: [number, number, number]) => {
      const f = (v: number) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
    };
    const hex = (c: [number, number, number]) =>
      '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

    // Backdrop stack, nearest-first, stopping at the first opaque layer.
    const stack: string[] = [];
    let opaque = false;
    for (let node: HTMLElement | null = el; node; node = node.parentElement) {
      const c = getComputedStyle(node).backgroundColor;
      const a = alphaOf(c);
      if (a > 0) {
        stack.push(c);
        if (a >= 1) {
          opaque = true;
          break;
        }
      }
    }
    // Composite bottom-up. The base only matters when nothing opaque was
    // found, which `opaque` reports so the assertion can fail loudly.
    stack.reverse();
    const bg = flatten(stack, [255, 255, 255]);
    const fg = flatten([...stack, getComputedStyle(el).color], [255, 255, 255]);
    const [l1, l2] = [lum(fg), lum(bg)];
    const ratio =
      (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return { ratio, fg: hex(fg), bg: hex(bg), opaque };
  }, selector);
}

/**
 * Stamps `data-theme` on <html> BEFORE the app boots — the reported bug
 * needed the attribute set at join time, and a post-hoc toggle would not
 * reproduce a component that reads the theme once at mount.
 *
 * The obvious one-liner does not work: Playwright runs init scripts at
 * document-start, when `document.documentElement` is still null, so
 * `document.documentElement.dataset.theme = …` throws and the script dies
 * with no visible error — the page then renders in the DEFAULT theme and
 * the "dark" half of this suite quietly becomes a duplicate of the light
 * half. Hence the observer, and the assertion in beforeEach.
 */
async function applyTheme(page: Page, theme: string) {
  await page.addInitScript((t) => {
    const apply = () => {
      if (!document.documentElement) return false;
      document.documentElement.setAttribute('data-theme', t as string);
      return true;
    };
    if (!apply()) {
      const obs = new MutationObserver(() => {
        if (apply()) obs.disconnect();
      });
      obs.observe(document, { childList: true, subtree: true });
    }
  }, theme);
}

/** `kind` picks the WCAG floor: text 4.5:1, graphical 3:1. */
const PROBES: { name: string; selector: string; kind: 'text' | 'icon' }[] = [
  { name: 'widget title', selector: `${DEMO} [data-testid="call-widget-title"]`, kind: 'text' },
  { name: 'call timer', selector: `${DEMO} [data-testid="call-timer"]`, kind: 'text' },
  { name: 'tab label (active)', selector: `${DEMO} [data-testid="call-side-panel-tab-chat"]`, kind: 'text' },
  { name: 'tab label (idle) — People', selector: `${DEMO} [data-testid="call-side-panel-tab-people"]`, kind: 'text' },
  { name: 'tab label (idle) — Captions', selector: `${DEMO} [data-testid="call-side-panel-tab-captions"]`, kind: 'text' },
  { name: 'panel close ×', selector: `${DEMO} [data-testid="call-side-panel-close"]`, kind: 'text' },
  { name: 'chat message body', selector: `${DEMO} [data-testid="call-chat-panel"] p, ${DEMO} [data-testid="call-side-panel"] .text-sm`, kind: 'text' },
  { name: 'mic icon', selector: `${DEMO} [data-testid="mute-button"]`, kind: 'icon' },
  { name: 'camera icon', selector: `${DEMO} [data-testid="camera-button"]`, kind: 'icon' },
  { name: 'screen-share icon', selector: `${DEMO} [data-testid="screenshare-button"]`, kind: 'icon' },
  { name: 'chat dock toggle', selector: `${DEMO} [data-testid="call-chat-open"]`, kind: 'icon' },
  { name: 'people dock toggle', selector: `${DEMO} [data-testid="call-people-open"]`, kind: 'icon' },
  { name: 'captions dock toggle', selector: `${DEMO} [data-testid="captions-toggle"]`, kind: 'icon' },
];

const FLOOR = { text: 4.5, icon: 3 } as const;

for (const theme of ['light', 'dark'] as const) {
  test.describe(`call chrome is legible — ${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await applyTheme(page, theme);
      await page.goto('/components/call-widget');
      // The theme must really be on <html> — an init script that silently
      // no-ops turns this whole file into a second copy of the light-mode
      // suite, which is worse than no gate at all.
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await page.locator(DEMO).scrollIntoViewIfNeeded();
      await expect(page.locator(`${DEMO} [data-testid="call-side-panel"]`)).toBeVisible();
    });

    test('every chrome element clears its WCAG floor', async ({ page }) => {
      mkdirSync(SHOTS, { recursive: true });
      await page.locator(DEMO).screenshot({ path: join(SHOTS, `call-widget-${theme}.png`) });

      const failures: string[] = [];
      for (const probe of PROBES) {
        if ((await page.locator(probe.selector).count()) === 0) {
          failures.push(`${probe.name}: no element matched ${probe.selector}`);
          continue;
        }
        const r = await readContrast(page, probe.selector);
        const floor = FLOOR[probe.kind];
        // eslint-disable-next-line no-console
        console.log(
          `[${theme}] ${probe.name.padEnd(28)} ${r.ratio.toFixed(2)}:1  fg=${r.fg} bg=${r.bg}`,
        );
        if (!r.opaque) {
          failures.push(`${probe.name}: nothing opaque paints behind it — chrome surface missing`);
        }
        if (r.ratio < floor) {
          failures.push(
            `${probe.name}: ${r.ratio.toFixed(2)}:1 < ${floor}:1 (fg ${r.fg} on bg ${r.bg})`,
          );
        }
      }
      expect(failures, `contrast failures in ${theme} theme`).toEqual([]);
    });

    test('the expanded window chrome is legible too', async ({ page }) => {
      // The title bar is the one the bug report singled out: it carries
      // the Mini/Window/Fullscreen buttons, so losing it strands the user
      // in the expanded mode with no way back to the dock.
      await page.getByTestId('open-expanded-chrome').click();
      const win = '[data-testid="expandable-call-widget"][data-call-widget-mode="window"]';
      await expect(page.locator(win)).toBeVisible();

      mkdirSync(SHOTS, { recursive: true });
      await page.locator(win).screenshot({ path: join(SHOTS, `call-window-${theme}.png`) });

      const probes: { name: string; selector: string; kind: 'text' | 'icon' }[] = [
        { name: 'window title', selector: `${win} [data-testid="call-widget-window-title"]`, kind: 'text' },
        { name: 'window timer', selector: `${win} [data-testid="call-timer"]`, kind: 'text' },
        { name: 'Mini button', selector: `${win} [data-testid="call-widget-mode-mini"]`, kind: 'icon' },
        { name: 'Window button', selector: `${win} [data-testid="call-widget-mode-window"]`, kind: 'icon' },
        { name: 'Fullscreen button', selector: `${win} [data-testid="call-widget-mode-fullscreen"]`, kind: 'icon' },
        { name: 'window tab label', selector: `${win} [data-testid="call-side-panel-tab-chat"]`, kind: 'text' },
      ];

      const failures: string[] = [];
      for (const probe of probes) {
        const r = await readContrast(page, probe.selector);
        // eslint-disable-next-line no-console
        console.log(
          `[${theme}] ${probe.name.padEnd(28)} ${r.ratio.toFixed(2)}:1  fg=${r.fg} bg=${r.bg}`,
        );
        if (!r.opaque) failures.push(`${probe.name}: nothing opaque paints behind it`);
        if (r.ratio < FLOOR[probe.kind]) {
          failures.push(
            `${probe.name}: ${r.ratio.toFixed(2)}:1 < ${FLOOR[probe.kind]}:1 (fg ${r.fg} on bg ${r.bg})`,
          );
        }
      }
      expect(failures, `expanded-chrome contrast failures in ${theme} theme`).toEqual([]);
    });

    test('the chrome surface itself is the theme-invariant token, not surface-inverse', async ({ page }) => {
      // Belt and braces: the ratio check above would also catch a
      // regression, but this names the cause. `--color-call-chrome` must
      // resolve identically in both themes.
      const { token, card } = await page.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement;
        return {
          token: getComputedStyle(document.documentElement)
            .getPropertyValue('--color-call-chrome')
            .trim(),
          card: getComputedStyle(el).backgroundColor,
        };
      }, `${DEMO} [data-testid="call-widget"] > div`);

      expect(token).toBe('#0f172a');
      expect(card).toBe('rgb(15, 23, 42)');
    });
  });
}

test('the two themes render the chrome identically', async ({ page }) => {
  // The strongest statement of the rule: call chrome is dark in BOTH
  // themes, so its computed surface colour must not depend on the theme.
  const read = async (theme: string) => {
    await applyTheme(page, theme);
    await page.goto('/components/call-widget');
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect(page.locator(`${DEMO} [data-testid="call-side-panel"]`)).toBeVisible();
    return page.evaluate((sel) => {
      const out: Record<string, string> = {};
      for (const id of ['call-widget-title', 'call-timer', 'call-side-panel-tab-chat', 'mute-button']) {
        const el = document.querySelector(`${sel} [data-testid="${id}"]`) as HTMLElement | null;
        if (el) {
          const s = getComputedStyle(el);
          out[id] = `${s.color} / ${s.backgroundColor}`;
        }
      }
      const card = document.querySelector(`${sel} [data-testid="call-widget"] > div`) as HTMLElement;
      out.card = getComputedStyle(card).backgroundColor;
      const panel = document.querySelector(`${sel} [data-testid="call-side-panel"]`) as HTMLElement;
      out.panel = `${getComputedStyle(panel).color} / ${getComputedStyle(panel).backgroundColor}`;
      return out;
    }, DEMO);
  };

  const light = await read('light');
  const dark = await read('dark');
  expect(dark).toEqual(light);
});
