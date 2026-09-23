// The ink on a primary fill has to be readable in BOTH themes.
//
// The visual audit measured the composer's enabled "Run agent" button at
// 4.1:1 in light (#ffffff on #646cff) and 2.8:1 in dark (#ffffff on #8b91ff):
// white text on the brand fill failed WCAG AA (4.5:1 for text under 18.66px
// bold) in both, and the dark one was not close. Two things fixed it, and this
// file pins both:
//
//   1. The light primary moved one step darker (#5a61ff), which is the
//      nearest same-hue value that clears 4.5:1 with white.
//   2. A fill carries its own ink token, `--color-on-primary`: white in light,
//      the light theme's text ink in dark, because the dark primary is a
//      pastel and dark ink is what reads on it. `Button variant="primary"`
//      paints `text-on-primary`; nothing paints `text-white` on `bg-primary`.
//
// Computed from the source stylesheet, not from a rendered button: jsdom does
// not paint, and the value that matters is the token pair itself.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(__dirname, '../../styles.css'), 'utf8');
const buttonSrc = readFileSync(resolve(__dirname, '../../components/ui/Button.tsx'), 'utf8');

function blockBody(marker: string): string {
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

function token(body: string, name: string): string {
  const m = body.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{6});`));
  if (!m?.[1]) throw new Error(`${name} is not a 6-digit hex in this block`);
  return m[1].toLowerCase();
}

/** WCAG 2.x relative luminance of a #rrggbb colour. */
function luminance(hex: string): number {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * ch[0]! + 0.7152 * ch[1]! + 0.0722 * ch[2]!;
}

/** WCAG contrast ratio, order-independent. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const AA_TEXT = 4.5;

describe('primary fill contrast — the ink on bg-primary meets WCAG AA in both themes', () => {
  const light = blockBody('@theme');
  const dark = blockBody('[data-theme="dark"]');

  it.each([
    ['light', light],
    ['dark', dark],
  ])('%s: --color-on-primary on --color-primary is at least 4.5:1', (_name, body) => {
    const ratio = contrastRatio(token(body, '--color-on-primary'), token(body, '--color-primary'));
    expect(ratio).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it.each([
    ['light', light],
    ['dark', dark],
  ])('%s: the hover fill keeps the same ink readable', (_name, body) => {
    const ratio = contrastRatio(token(body, '--color-on-primary'), token(body, '--color-primary-hover'));
    expect(ratio).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('the light ink is white and the dark ink is the light theme text colour', () => {
    // Dark mode's primary is a pastel; white on it was 2.8:1. Dark ink on it
    // is 6.4:1. The choice is deliberate and the number is the reason.
    expect(token(light, '--color-on-primary')).toBe('#ffffff');
    expect(token(dark, '--color-on-primary')).toBe(token(light, '--color-text-primary'));
    expect(contrastRatio('#ffffff', token(dark, '--color-primary'))).toBeLessThan(AA_TEXT);
  });

  it('Button variant="primary" paints text-on-primary, never text-white', () => {
    const line = buttonSrc.split('\n').find((l) => /^\s*primary:\s*'/.test(l)) ?? '';
    expect(line).toContain('bg-primary');
    expect(line).toContain('text-on-primary');
    expect(line).not.toContain('text-white');
  });

  it('the light primary is the nearest same-hue step that clears AA with white', () => {
    // The previous value, for the record: it did not.
    expect(contrastRatio('#ffffff', '#646cff')).toBeLessThan(AA_TEXT);
    expect(contrastRatio('#ffffff', token(light, '--color-primary'))).toBeGreaterThanOrEqual(AA_TEXT);
  });
});
