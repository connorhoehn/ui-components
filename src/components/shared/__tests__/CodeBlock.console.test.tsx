// The `console` theme: a code block inside a permanently-dark panel (the
// pipeline editor's Live output drawer) must stay dark in BOTH app themes.
// `theme="dark"` paints the INVERSE surface, which flips to #f8fafc in dark
// mode — a light slab on the dark console. `console` uses the invariant
// `--color-code-*` family; this pins the classes and the contrast they give.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from '../CodeBlock';

const css = readFileSync(resolve(__dirname, '../../../styles.css'), 'utf8');

function token(name: string): string {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --color-${name} not found`);
  return m[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe('CodeBlock theme="console"', () => {
  it('paints the invariant code surface, not the flipping inverse one', () => {
    render(<CodeBlock code={'{"a": 1}'} language="json" theme="console" data-testid="cb" />);
    const el = screen.getByTestId('cb');
    expect(el.className).toContain('bg-code-bg');
    expect(el.className).toContain('text-code-text');
    expect(el.className).not.toContain('surface-inverse');
    expect(el.innerHTML).not.toMatch(/#[0-9a-f]{6}/i); // syntax colours come from code tokens too
  });

  it('the code family is not re-toned by the dark theme block (invariant)', () => {
    const darkBlocks = css.split('[data-theme="dark"]').slice(1).map((s) => s.slice(0, s.indexOf('}')));
    for (const block of darkBlocks) expect(block).not.toMatch(/--color-code-/);
  });

  it.each(['code-text', 'code-comment', 'code-green', 'code-blue', 'code-mauve', 'code-peach', 'code-yellow'])(
    '%s on code-bg meets WCAG AA (4.5:1)',
    (name) => {
      expect(contrast(token(name), token('code-bg'))).toBeGreaterThanOrEqual(4.5);
    },
  );

  it('the inverse surface in dark mode is the light slab this theme avoids', () => {
    const darkInverse = css.slice(css.indexOf('[data-theme="dark"]')).match(/--color-surface-inverse:\s*(#[0-9a-fA-F]{6})/)![1];
    // Light box on the dark console panel: the bug, measured.
    expect(contrast(darkInverse, token('code-surface'))).toBeGreaterThan(10);
  });
});
