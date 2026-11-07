// Every name-derived avatar fill must carry its initials at WCAG AA for
// normal text (4.5:1). The Storymaker Studio audit measured white on the old
// orange at 2.8:1 on 16px initials. The fill and the initials are literal
// colours, not theme tokens, so one ratio holds in light and dark; the test
// still renders under both `data-theme` values to prove nothing theme-driven
// leaks into the pair.

import { render } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Avatar, AVATAR_PALETTE, nameToColor, readableAvatarForeground } from '../Avatar';

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const ch = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
function rgbToHex(rgb: string): string {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(rgb);
  if (!m) return rgb;
  return '#' + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, '0')).join('');
}

afterEach(() => document.documentElement.removeAttribute('data-theme'));

describe('Avatar palette contrast', () => {
  it('has eight distinct entries', () => {
    expect(new Set(AVATAR_PALETTE).size).toBe(AVATAR_PALETTE.length);
    expect(AVATAR_PALETTE.length).toBeGreaterThanOrEqual(8);
  });

  it.each(AVATAR_PALETTE.map((c) => [c]))('white initials on %s meet 4.5:1', (fill) => {
    expect(contrast(fill, '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });

  it.each(AVATAR_PALETTE.map((c) => [c]))('autoContrast keeps white on %s', (fill) => {
    expect(readableAvatarForeground(fill)).toBe('#fff');
  });

  it.each(['light', 'dark'])('a rendered avatar paints a passing pair in the %s theme', (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    // Names chosen to land on several different palette entries.
    const names = Array.from({ length: 40 }, (_, i) => `Person ${i}`);
    const seen = new Set<string>();
    for (const name of names) {
      const { container, unmount } = render(<Avatar name={name} size={40} />);
      const el = container.firstElementChild as HTMLElement;
      const bg = rgbToHex(el.style.background || el.style.backgroundColor);
      const fg = rgbToHex(el.style.color);
      expect(bg).toBe(nameToColor(name));
      expect(contrast(bg, fg === '#fff' ? '#ffffff' : fg)).toBeGreaterThanOrEqual(4.5);
      seen.add(bg);
      unmount();
    }
    expect(seen.size).toBeGreaterThan(4);
  });
});
