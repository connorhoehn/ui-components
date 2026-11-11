// The camera-off dock tile follows the theme (the raised dark surface in dark
// mode, not the light grey), and its white name clears WCAG AA over the light
// tile, the dark tile and a white video frame.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CallTileRow } from '../CallTileRow';

afterEach(cleanup);

const css = readFileSync(resolve(__dirname, '../../../styles.css'), 'utf8');

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** `black/alpha` composited over a background. */
function scrim(bg: [number, number, number], alpha: number): [number, number, number] {
  return bg.map((c) => Math.round(c * (1 - alpha))) as [number, number, number];
}

function token(block: string, name: string): string {
  const m = new RegExp(`--${name}:\\s*([^;]+);`).exec(block);
  if (!m) throw new Error(`no --${name}`);
  return m[1]!.trim();
}

const lightBlock = css.slice(css.indexOf('@theme {'), css.indexOf('[data-theme="dark"] {'));
const darkStart = css.indexOf('[data-theme="dark"] {');
const darkBlock = css.slice(darkStart, css.indexOf('}', darkStart));

describe('camera-off dock tile', () => {
  it('re-points the tile token at the dark raised surface in dark mode', () => {
    expect(token(lightBlock, 'color-video-tile-off')).toBe('#b0b6bd');
    expect(token(darkBlock, 'color-video-tile-off')).toBe('var(--color-surface-emphasis)');
    expect(token(darkBlock, 'color-surface-emphasis')).toBe('#334155');
  });

  it('the white name clears 4.5:1 on its scrim over light, dark and white frames', () => {
    const white: [number, number, number] = [255, 255, 255];
    for (const bg of ['#b0b6bd', '#334155', '#ffffff']) {
      expect(contrast(white, scrim(hexToRgb(bg), 0.75))).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('the tile paints the token and its name strip is solid black/75 behind the whole text line', () => {
    render(
      <CallTileRow
        variant="dock"
        participants={[]}
        localParticipant={{ id: 'me', displayName: 'Alice Chen', isLocal: true, cameraOff: true }}
        tileWidth={176}
        tileHeight={88}
      />,
    );
    const tile = screen.getByTestId('call-tile-me');
    expect(tile.className).toContain('bg-video-tile-off');
    const label = tile.querySelector('[data-tile-label]')!;
    expect(label.className).toContain('from-black/75');
    expect(label.className).toContain('from-65%');
    expect(label).toHaveTextContent('You');
  });
});
