// ComposerSurface never measures wider than its column (2.515.0, UX audit L4):
// jsdom cannot lay out, so the test pins the structure and the stylesheet
// rules that keep the surface's box (padding and starfield) inside its width.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComposerSurface } from '../ComposerSurface';

const css = readFileSync(join(__dirname, '../../../styles/composerSurface.css'), 'utf8');
const block = (selector: string) => {
  const at = css.indexOf(selector);
  expect(at).toBeGreaterThanOrEqual(0);
  return css.slice(at, css.indexOf('}', at));
};

describe('ComposerSurface overflow', () => {
  it('the surface and its content box are min-w-0 flex/grid children', () => {
    render(<ComposerSurface data-testid="s"><p>composer</p></ComposerSurface>);
    const surface = screen.getByTestId('s');
    expect(surface).toHaveClass('uic-composer-surface', 'min-w-0', 'shrink-0');
    expect(surface.firstElementChild).toHaveClass('uic-composer-surface-content');
  });

  it('padding is inside the width (border-box, max-width 100%)', () => {
    const surface = block(':is(.uic-composer-surface, .uic-composer-backdrop) {');
    expect(surface).toMatch(/box-sizing:\s*border-box/);
    expect(surface).toMatch(/max-width:\s*100%/);
    expect(block('.uic-composer-surface-content {')).toMatch(/box-sizing:\s*border-box/);
  });

  it('the starfield layers stay inside the box: no negative inset, no translating transform', () => {
    expect(css).not.toMatch(/inset:\s*-\d/);
    const drift = css.slice(css.indexOf('@keyframes composer-star-drift'), css.indexOf('@media (prefers-reduced-motion'));
    expect(drift).not.toMatch(/transform:/);
  });
});
