// Every tone's text ink (`--color-{tone}-fg`) must read at WCAG AA (4.5:1)
// on the page surface and on its own soft background, in both themes.
// 2.515.12: the light success, warning, danger and caution inks were the
// fill colours (#16a34a 3.30:1, #d97706 3.19:1, #dc2626 4.41:1 on its -bg,
// #ea580c 3.56:1); they are now the 700 steps.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(__dirname, '../../styles.css'), 'utf8');
function blockBody(marker: string): string {
  const open = css.indexOf('{', css.indexOf(marker));
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error(`unbalanced block: ${marker}`);
}
function token(body: string, name: string): string {
  const m = body.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{6})\\b`));
  if (!m?.[1]) throw new Error(`${name} is not a 6-digit hex in this block`);
  return m[1].toLowerCase();
}

function luminance(hex: string): number {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * ch[0]! + 0.7152 * ch[1]! + 0.0722 * ch[2]!;
}
function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const TONES = ['neutral', 'success', 'warning', 'danger', 'info', 'caution', 'accent'];

describe('tone ink contrast', () => {
  const themes = [['light', blockBody('@theme')], ['dark', blockBody('[data-theme="dark"]')]] as const;
  for (const [name, body] of themes) {
    for (const tone of TONES) {
      it(`${name}: --color-${tone}-fg is 4.5:1 on the surface and on --color-${tone}-bg`, () => {
        const fg = token(body, `--color-${tone}-fg`);
        expect(contrastRatio(fg, token(body, '--color-surface'))).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(fg, token(body, `--color-${tone}-bg`))).toBeGreaterThanOrEqual(4.5);
      });
    }
  }
  it('the light warning ink is #b45309 (was #d97706, 3.07:1 on its background)', () => {
    expect(token(blockBody('@theme'), '--color-warning-fg')).toBe('#b45309');
  });
});
