import { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { InlinePopover, popoverBounds, POPOVER_BOUNDARY_ATTR } from '../InlinePopover';

// A conversation pane beside a page marks itself `data-uic-popover-boundary`.
// A `bottom-end` menu from a control near the pane's LEFT edge (a narrow tab
// bar's "More ▾") used to hang its panel left, over the page's content column.
// It now stays inside the pane: its left edge no further left than the pane's.

const PANE_LEFT = 1000;
const PANE_RIGHT = 1400;
const PANEL_W = 220;

function stubGeometry(anchorLeft: number) {
  const real = Element.prototype.getBoundingClientRect;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const el = this as HTMLElement;
    if (el.hasAttribute?.(POPOVER_BOUNDARY_ATTR)) {
      return { top: 0, bottom: 800, left: PANE_LEFT, right: PANE_RIGHT, width: PANE_RIGHT - PANE_LEFT, height: 800, x: PANE_LEFT, y: 0, toJSON: () => ({}) } as DOMRect;
    }
    if (this instanceof HTMLButtonElement && el.textContent === 'More') {
      return { top: 100, bottom: 124, left: anchorLeft, right: anchorLeft + 50, width: 50, height: 24, x: anchorLeft, y: 100, toJSON: () => ({}) } as DOMRect;
    }
    if (el.dataset?.testid === 'inline-popover') {
      // bottom-end: the panel's right edge at the trigger's right edge.
      const right = anchorLeft + 50;
      return { top: 130, bottom: 250, left: right - PANEL_W, right, width: PANEL_W, height: 120, x: right - PANEL_W, y: 130, toJSON: () => ({}) } as DOMRect;
    }
    return real.call(this);
  });
}

function Pane({ bounded = true }: { bounded?: boolean }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <section {...(bounded ? { [POPOVER_BOUNDARY_ATTR]: '' } : {})}>
      <button ref={ref}>More</button>
      <InlinePopover trigger={ref} open onClose={() => {}} placement="bottom-end" aria-label="menu"><p>rows</p></InlinePopover>
    </section>
  );
}

afterEach(() => vi.restoreAllMocks());

describe('InlinePopover — boundary surfaces', () => {
  it('keeps a bottom-end panel from a trigger near the pane\'s left edge inside the pane', () => {
    window.innerWidth = 1440;
    stubGeometry(PANE_LEFT + 40);
    render(<Pane />);
    expect(screen.getByTestId('inline-popover').style.left).toBe(`${PANE_LEFT + 8}px`);
  });

  it('leaves an unbounded panel where the viewport allows', () => {
    window.innerWidth = 1440;
    stubGeometry(PANE_LEFT + 40);
    render(<Pane bounded={false} />);
    // Fits on screen: no correction, the anchor-derived bottom-end transform stays.
    expect(screen.getByTestId('inline-popover').style.transform).toBe('translateX(-100%)');
  });

  it('popoverBounds reads the nearest boundary ancestor, else the viewport', () => {
    expect(popoverBounds(null, 1280)).toEqual({ left: 0, right: 1280 });
    const host = document.createElement('div');
    host.setAttribute(POPOVER_BOUNDARY_ATTR, '');
    host.getBoundingClientRect = () => ({ left: 900, right: 1300, width: 400 } as DOMRect);
    const child = document.createElement('button');
    host.appendChild(child);
    expect(popoverBounds(child, 1280)).toEqual({ left: 900, right: 1280 });
  });
});
