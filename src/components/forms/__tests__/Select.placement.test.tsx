// Select popup placement (2.515.3): as wide as its trigger (longer options may
// widen it, never past the viewport gutters), flips above when there is no room
// below, honours the host's `--shell-collaboration-floor`, and sits on the
// popover z-index token.
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Select } from '../Select';

const OPTS = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Bravo' }];

function rect(partial: Partial<DOMRect>): DOMRect {
  const r = { x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, ...partial };
  return { ...r, toJSON: () => r } as DOMRect;
}

function openAt(box: Partial<DOMRect>) {
  render(<Select aria-label="Letter" options={OPTS} defaultValue="a" />);
  const trigger = screen.getByRole('combobox', { name: 'Letter' });
  vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(rect(box));
  act(() => { fireEvent.click(trigger); });
  return screen.getByRole('listbox');
}

beforeEach(() => {
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
  vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(120);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.documentElement.style.removeProperty('--shell-collaboration-floor');
});

describe('Select popup placement', () => {
  it('is at least as wide as a narrow trigger, not the old 160px floor', () => {
    const box = openAt({ left: 250, right: 370, top: 100, bottom: 136, width: 120, height: 36 });
    expect(box.style.minWidth).toBe('120px');
    expect(box.style.width).toBe('max-content');
  });

  it('is capped at the viewport less its gutters and stays inside them', () => {
    const box = openAt({ left: 8, right: 382, top: 100, bottom: 136, width: 374, height: 36 });
    expect(box.style.maxWidth).toBe('374px');
    expect(Number.parseFloat(box.style.left)).toBeGreaterThanOrEqual(8);
  });

  it('right-aligns instead of overhanging when a wider popup would pass the edge', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(200);
    const box = openAt({ left: 300, right: 380, top: 100, bottom: 136, width: 80, height: 36 });
    expect(Number.parseFloat(box.style.left)).toBe(390 - 200 - 8);
  });

  it('opens below when there is room', () => {
    const box = openAt({ left: 20, right: 140, top: 100, bottom: 136, width: 120, height: 36 });
    expect(Number.parseFloat(box.style.top)).toBe(140);
  });

  it('flips above when there is no room below', () => {
    const box = openAt({ left: 20, right: 140, top: 740, bottom: 776, width: 120, height: 36 });
    expect(Number.parseFloat(box.style.top)).toBe(740 - 4 - 120);
  });

  it('treats the shell collaboration floor as the bottom edge', () => {
    document.documentElement.style.setProperty('--shell-collaboration-floor', '200px');
    const box = openAt({ left: 20, right: 140, top: 560, bottom: 596, width: 120, height: 36 });
    // 800 - 200 floor leaves 600; 596 + gaps leaves no room for 120px.
    expect(Number.parseFloat(box.style.top)).toBe(560 - 4 - 120);
  });

  it('renders on the popover z-index token', () => {
    const box = openAt({ left: 20, right: 140, top: 100, bottom: 136, width: 120, height: 36 });
    expect(box.className).toContain('z-[var(--ui-z-popover,10100)]');
  });
});
