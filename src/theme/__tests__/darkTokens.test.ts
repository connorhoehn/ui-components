// Dark palette contract — the shipped token CSS must carry a
// [data-theme="dark"] override block so consumers flipping
// `data-theme="dark"` on the document root (or any subtree wrapper) get a
// real dark palette instead of an inert toggle.
//
// Three layers of assertion:
//   1. Source contract: src/styles.css contains the block, after @theme,
//      covering every color token @theme defines (minus the deliberately
//      theme-invariant --color-code-* / --color-video-* families).
//   2. Consistency: the CSS values mirror the darkTheme preset in
//      src/theme/presets.ts (single-source-of-truth direction).
//   3. Behavior: in jsdom, a subtree with data-theme="dark" resolves token
//      custom properties to the dark values while the rest of the document
//      keeps the light ones. (jsdom's getComputedStyle DOES cascade and
//      inherit custom properties from injected stylesheets — verified — so
//      this is a real cascade test, not a raw-text fallback.)
//   4. Built artifact: dist/ui-components.css (the "./styles.css" export)
//      carries the block. dist/ is committed, so a release without a fresh
//      build fails here.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { darkTheme } from '../presets';

const srcCss = readFileSync(resolve(__dirname, '../../styles.css'), 'utf8');

/** Extract the body of the first block opened by `marker` (brace-matched). */
function blockBody(css: string, marker: string): string {
  const start = css.indexOf(marker);
  if (start === -1) throw new Error(`marker not found: ${marker}`);
  const open = css.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error(`unbalanced block: ${marker}`);
}

function tokenNames(body: string): Set<string> {
  return new Set([...body.matchAll(/(--color-[a-z0-9-]+)\s*:/g)].map((m) => m[1]!));
}

function tokenValue(body: string, name: string): string | undefined {
  const m = body.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
  return m?.[1]?.trim();
}

const themeBody = blockBody(srcCss, '@theme');
const darkBody = blockBody(srcCss, '[data-theme="dark"]');

describe('dark token block — source contract (src/styles.css)', () => {
  it('defines a [data-theme="dark"] override block after the @theme block', () => {
    expect(srcCss.indexOf('[data-theme="dark"]')).toBeGreaterThan(srcCss.indexOf('@theme'));
  });

  it('overrides key tokens with dark values', () => {
    expect(tokenValue(darkBody, '--color-surface')).toBe('#1e293b');
    expect(tokenValue(darkBody, '--color-surface-panel')).toBe('#0f172a');
    expect(tokenValue(darkBody, '--color-text-primary')).toBe('#f1f5f9');
    expect(tokenValue(darkBody, '--color-border')).toBe('#334155');
    expect(tokenValue(darkBody, '--color-primary')).toBe('#8b91ff');
    // Inverse pair flips in dark mode.
    expect(tokenValue(darkBody, '--color-surface-inverse')).toBe('#f8fafc');
    expect(tokenValue(darkBody, '--color-text-inverse')).toBe('#0f172a');
    // Tone-scale pairs: dark bg tint + light fg.
    expect(tokenValue(darkBody, '--color-success-bg')).toBe('#064e3b');
    expect(tokenValue(darkBody, '--color-success-fg')).toBe('#6ee7b7');
    // Native form controls follow.
    expect(darkBody).toContain('color-scheme: dark');
  });

  it('covers EVERY @theme color token except the theme-invariant families', () => {
    const invariant = (name: string) =>
      name.startsWith('--color-code-') || name.startsWith('--color-video-');
    const light = [...tokenNames(themeBody)].filter((n) => !invariant(n));
    const dark = tokenNames(darkBody);
    const missing = light.filter((n) => !dark.has(n));
    expect(missing).toEqual([]);
    // And the dark block introduces no tokens the light theme lacks.
    const lightSet = tokenNames(themeBody);
    const extra = [...dark].filter((n) => !lightSet.has(n));
    expect(extra).toEqual([]);
  });

  it('does not touch the light values in @theme', () => {
    expect(tokenValue(themeBody, '--color-surface')).toBe('#ffffff');
    expect(tokenValue(themeBody, '--color-text-primary')).toBe('#0f172a');
    expect(tokenValue(themeBody, '--color-primary')).toBe('#646cff');
  });
});

describe('dark token block — mirrors the darkTheme preset', () => {
  it('agrees with src/theme/presets.ts on the shared tokens', () => {
    expect(tokenValue(darkBody, '--color-primary')).toBe(darkTheme.primary);
    expect(tokenValue(darkBody, '--color-text-primary')).toBe(darkTheme.textPrimary);
    expect(tokenValue(darkBody, '--color-text-secondary')).toBe(darkTheme.textSecondary);
    expect(tokenValue(darkBody, '--color-surface')).toBe(darkTheme.surface);
    expect(tokenValue(darkBody, '--color-surface-panel')).toBe(darkTheme.background);
    expect(tokenValue(darkBody, '--color-border')).toBe(darkTheme.border);
    expect(tokenValue(darkBody, '--color-danger')).toBe(darkTheme.danger);
    expect(tokenValue(darkBody, '--color-success')).toBe(darkTheme.success);
    expect(tokenValue(darkBody, '--color-warning')).toBe(darkTheme.warning);
    expect(tokenValue(darkBody, '--color-info')).toBe(darkTheme.info);
    expect(tokenValue(darkBody, '--color-danger-bg')).toBe(darkTheme.dangerLight);
    expect(tokenValue(darkBody, '--color-success-bg')).toBe(darkTheme.successLight);
    expect(tokenValue(darkBody, '--color-warning-bg')).toBe(darkTheme.warningLight);
    expect(tokenValue(darkBody, '--color-info-bg')).toBe(darkTheme.infoLight);
  });
});

describe('dark token block — jsdom cascade (subtree scoping)', () => {
  it('a data-theme="dark" subtree resolves dark values; the rest stays light', () => {
    // Inject a light :root baseline (stand-in for the @theme output, which
    // jsdom cannot parse) plus the REAL dark block from styles.css.
    const style = document.createElement('style');
    style.textContent = `
      :root { --color-surface: #ffffff; --color-text-primary: #0f172a; }
      ${`[data-theme="dark"] {${darkBody}}`}
    `;
    document.head.appendChild(style);

    const light = document.createElement('div');
    const dark = document.createElement('div');
    dark.setAttribute('data-theme', 'dark');
    const darkChild = document.createElement('span');
    dark.appendChild(darkChild);
    document.body.append(light, dark);

    try {
      expect(getComputedStyle(light).getPropertyValue('--color-surface').trim()).toBe('#ffffff');
      // The wrapper itself flips…
      expect(getComputedStyle(dark).getPropertyValue('--color-surface').trim()).toBe('#1e293b');
      // …and custom properties inherit, so descendants follow.
      expect(getComputedStyle(darkChild).getPropertyValue('--color-surface').trim()).toBe('#1e293b');
      expect(getComputedStyle(darkChild).getPropertyValue('--color-text-primary').trim()).toBe('#f1f5f9');
    } finally {
      style.remove();
      light.remove();
      dark.remove();
    }
  });
});

describe('dark token block — built artifact (dist/ui-components.css)', () => {
  // dist/ is committed; the "./styles.css" export resolves to this file, so
  // this is what consumers actually load. A release that edits src/styles.css
  // without `npm run build` fails here.
  const distCss = readFileSync(resolve(__dirname, '../../../dist/ui-components.css'), 'utf8');

  it('ships the [data-theme="dark"] block with the dark values', () => {
    // Lightning CSS drops the attribute quotes when minifying.
    const marker = distCss.includes('[data-theme=dark]') ? '[data-theme=dark]' : '[data-theme="dark"]';
    expect(distCss).toContain(marker);
    const distDark = blockBody(distCss, marker);
    expect(tokenValue(distDark, '--color-surface')).toBe('#1e293b');
    expect(tokenValue(distDark, '--color-text-primary')).toBe('#f1f5f9');
    expect(tokenValue(distDark, '--color-primary')).toBe('#8b91ff');
  });
});
