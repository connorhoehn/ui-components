// The console surface (Agent / Terminal) sets its OWN ink — every text token a
// child can inherit — and that ink reads on the sky it is drawn over, for
// both tones. A near-black page ink inheriting onto a near-black surface was
// the bug (2.377.0): the typed text was invisible on a light app.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(__dirname, '../../../styles.css'), 'utf8');

/** The declarations of the first rule whose selector line is exactly `selector {`. */
function block(selector: string): string {
  const start = css.indexOf(`\n${selector} {`);
  if (start < 0) throw new Error(`no rule ${selector}`);
  return css.slice(start, css.indexOf('\n}', start));
}
const prop = (declarations: string, name: string): string => {
  const m = declarations.match(new RegExp(`${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`${name} not declared`);
  return m[1]!.trim();
};

type RGBA = [number, number, number, number];
function parse(color: string): RGBA {
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (hex) { const n = parseInt(hex[1]!, 16); return [n >> 16, (n >> 8) & 255, n & 255, 1]; }
  const fn = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/);
  if (!fn) throw new Error(`cannot parse ${color}`);
  return [+fn[1]!, +fn[2]!, +fn[3]!, fn[4] === undefined ? 1 : +fn[4]];
}
/** `top` (with alpha) laid over an opaque `under`. */
const over = (top: RGBA, under: RGBA): RGBA => [0, 1, 2].map((i) => Math.round(top[i]! * top[3] + under[i]! * (1 - top[3]))).concat(1) as RGBA;
const luminance = ([r, g, b]: RGBA) => {
  const lin = (v: number) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const contrast = (fg: RGBA, bg: RGBA) => { const a = luminance(fg), b = luminance(bg); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
const stops = (gradient: string) => [...gradient.matchAll(/(#[0-9a-f]{6}|rgba?\([^)]+\))/gi)].map((m) => parse(m[1]!));

const night = block('.uic-chat-console');
const graphite = block('.uic-chat-console[data-backdrop-tone="graphite"]');
const nightGround = stops(prop(block('.uic-particles-ground'), 'background'));
const graphiteGround = stops(prop(block('.uic-particles-ground[data-tone="graphite"]'), 'background'));

const TEXT = ['--color-text-primary', '--color-text-secondary', '--color-text-tertiary', '--color-neutral-fg'] as const;

describe.each([
  ['night', night, nightGround],
  ['graphite', graphite, graphiteGround],
] as const)('console ink on the %s sky', (_tone, declarations, ground) => {
  it('declares every text token itself, so nothing inherits the page ink', () => {
    for (const name of [...TEXT, '--color-text-disabled']) expect(() => prop(declarations, name)).not.toThrow();
  });

  // Both ends of the gradient, bare and under the inset glass a control sits
  // on: the ink has to read everywhere a word can land.
  const surfaces = ground.flatMap((g) => [g, over(parse(prop(declarations, '--color-surface-inset')), g)]);
  it.each(TEXT)('%s reads at 4.5:1 or better on every surface', (name) => {
    const ink = parse(prop(declarations, name));
    for (const surface of surfaces) expect(contrast(ink, surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('disabled ink is dimmer than the rest but still legible (3:1)', () => {
    const disabled = parse(prop(declarations, '--color-text-disabled'));
    const primary = parse(prop(declarations, '--color-text-primary'));
    for (const surface of surfaces) {
      expect(contrast(disabled, surface)).toBeGreaterThanOrEqual(3);
      expect(contrast(disabled, surface)).toBeLessThan(contrast(primary, surface));
    }
  });
});

describe('the console paints its ink, not only its tokens', () => {
  it('sets color and caret-color from its own primary token', () => {
    expect(prop(night, 'color')).toBe('var(--color-text-primary)');
    expect(prop(night, 'caret-color')).toBe('var(--color-text-primary)');
  });
  it('a selection inside the console is the console wash, not the host paper', () => {
    expect(css).toMatch(/\.uic-chat-console \.ProseMirror ::selection \{[^}]*background: var\(--color-surface-emphasis\)/);
  });
});
