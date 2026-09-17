import { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { InlinePopover } from '../InlinePopover';

// A popover opened from a control near the FOOT of the screen has no room
// below it. Sliding it up until it fits lands it on top of the trigger — the
// composer's "Share a document" button opened a panel over the composer.
// Putting it on the other side of the anchor is what a reader expects.
//
// jsdom measures everything as 0×0, so these tests supply the two rects the
// decision is actually made from: the trigger's, and the panel's.

const VIEWPORT_H = 900;
const PANEL_H = 240;

function stubGeometry(anchorTop: number) {
  const real = Element.prototype.getBoundingClientRect;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    if (this instanceof HTMLButtonElement) {
      return { top: anchorTop, bottom: anchorTop + 24, left: 100, right: 140, width: 40, height: 24, x: 100, y: anchorTop, toJSON: () => ({}) } as DOMRect;
    }
    if ((this as HTMLElement).dataset?.testid === 'inline-popover') {
      // Where bottom-start would have put it: just under the trigger.
      const top = anchorTop + 24 + 6;
      return { top, bottom: top + PANEL_H, left: 100, right: 480, width: 380, height: PANEL_H, x: 100, y: top, toJSON: () => ({}) } as DOMRect;
    }
    return real.call(this);
  });
}

function Host() {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      <button ref={btnRef}>anchor</button>
      <InlinePopover trigger={btnRef} open onClose={() => {}} aria-label="panel">
        <p>body</p>
      </InlinePopover>
    </div>
  );
}

afterEach(() => vi.restoreAllMocks());

describe('InlinePopover — no room below', () => {
  it('flips above the trigger rather than sliding over it', () => {
    // Trigger 60px off the bottom: the panel cannot fit under it, and there is
    // plenty of room above.
    const anchorTop = VIEWPORT_H - 60;
    window.innerHeight = VIEWPORT_H;
    stubGeometry(anchorTop);
    render(<Host />);
    const panel = screen.getByTestId('inline-popover');
    // Its bottom edge sits on the trigger's top edge, less the offset.
    expect(panel.style.top).toBe(`${anchorTop - 6 - PANEL_H}px`);
  });

  it('still slides when neither side has room', () => {
    // Trigger near the TOP: flipping would put the panel off the top of the
    // screen, which is not an improvement on covering the trigger.
    window.innerHeight = 300;
    stubGeometry(40);
    render(<Host />);
    const panel = screen.getByTestId('inline-popover');
    // Slid to sit against the bottom margin — overlapping the trigger, which
    // is the honest outcome when there is nowhere else to be. NOT flipped to a
    // negative top, which would put it off the screen entirely.
    const top = parseFloat(panel.style.top);
    expect(top).toBeGreaterThanOrEqual(8);
    expect(top + PANEL_H).toBeLessThanOrEqual(300 - 8);
  });

  it('leaves a panel alone when it fits below', () => {
    window.innerHeight = VIEWPORT_H;
    stubGeometry(100);
    render(<Host />);
    const panel = screen.getByTestId('inline-popover');
    // Untouched by the correction pass: still where bottom-start put it.
    expect(panel.style.top).toBe(`${100 + 24 + 6}px`);
  });
});
