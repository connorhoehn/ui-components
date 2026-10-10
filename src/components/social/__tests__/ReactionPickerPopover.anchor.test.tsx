// The picker used to compute DOCUMENT-space coordinates
// (`rect.top + window.scrollY`) and then apply them with `position: absolute`,
// which resolves against the nearest positioned ancestor — and `ReactionsBar`,
// the one shipped caller, wraps it in a `relative inline-flex` div. On a feed
// scrolled a few screens down, the picker landed a full scroll-offset below
// the message it belonged to, usually outside the viewport entirely.
//
// Viewport coordinates paired with `position: fixed` is the combination that
// holds regardless of what the caller wraps it in.

import { useRef } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { ReactionPickerPopover } from '../ReactionPickerPopover';

const SCROLL_Y = 500;
const SCROLL_X = 40;

/** Trigger rect in VIEWPORT coordinates, as getBoundingClientRect reports. */
let triggerRect = { top: 100, left: 60 };

function Harness() {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <div className="relative inline-flex">
      <button ref={ref} type="button">+</button>
      <ReactionPickerPopover open onSelect={vi.fn()} onClose={vi.fn()} triggerRef={ref} />
    </div>
  );
}

beforeEach(() => {
  triggerRect = { top: 100, left: 60 };
  Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true });
  Object.defineProperty(window, 'scrollY', { value: SCROLL_Y, configurable: true });
  Object.defineProperty(window, 'scrollX', { value: SCROLL_X, configurable: true });
  vi.spyOn(HTMLButtonElement.prototype, 'getBoundingClientRect').mockImplementation(
    () => ({ ...triggerRect, right: 0, bottom: 0, width: 24, height: 24, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect,
  );
});

afterEach(() => vi.restoreAllMocks());

describe('ReactionPickerPopover anchoring on a scrolled page', () => {
  it('positions in viewport space, not one scroll-offset away from its trigger', () => {
    render(<Harness />);
    const popover = screen.getByTestId('reaction-picker-popover');

    // `fixed` + viewport coords. The old code produced `absolute` with
    // top = 100 + 500 - 12 = 588px inside a relatively-positioned wrapper.
    expect(popover.style.position).toBe('fixed');
    expect(popover.style.top).toBe('88px');
    expect(popover.style.left).toBe('60px');
  });

  it('flips below a first-row trigger and stays within a narrow viewport', () => {
    Object.defineProperty(window, 'innerWidth', { value: 280, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true });
    vi.spyOn(HTMLDivElement.prototype, 'getBoundingClientRect').mockReturnValue({ top: 0, left: 0, right: 288, bottom: 320, width: 288, height: 320, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
    vi.mocked(HTMLButtonElement.prototype.getBoundingClientRect).mockReturnValue({ top: 20, bottom: 44, left: 250, right: 274, width: 24, height: 24, x: 250, y: 20, toJSON: () => ({}) } as DOMRect);
    render(<Harness />);
    const popover = screen.getByTestId('reaction-picker-popover');
    expect(popover.style.top).toBe('50px');
    expect(popover.style.left).toBe('8px');
    expect(popover.style.maxWidth).toBe('264px');
    expect(popover.style.transform).toBe('');
    expect(popover.parentElement).toBe(document.body);
  });

  it('re-measures while open so it does not drift when the page scrolls', () => {
    render(<Harness />);
    const popover = screen.getByTestId('reaction-picker-popover');
    expect(popover.style.top).toBe('88px');

    // The page scrolls; the trigger moves up the viewport with it.
    triggerRect = { top: 30, left: 60 };
    act(() => {
      fireEvent.scroll(document);
    });

    expect(popover.style.top).toBe('18px'); // 30 - 12, still above the 8px floor
  });
});
