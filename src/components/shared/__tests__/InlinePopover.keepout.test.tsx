import { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { InlinePopover, popoverFloor } from '../InlinePopover';
import { DropdownMenu } from '../DropdownMenu';

// A pinned composer dock marks itself `data-uic-keepout="bottom"`. A popover
// anchored ABOVE it (a filmstrip row's ⋯) must not open over it: the dock's
// top edge is its floor. And a submenu row's click must reach its action —
// the parent used to close on the mousedown, unmounting the submenu first.

const VIEWPORT_H = 720;
const PANEL_H = 200;
const DOCK_TOP = 540;

function stubGeometry(anchorTop: number) {
  const real = Element.prototype.getBoundingClientRect;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const el = this as HTMLElement;
    if (el.dataset?.uicKeepout === 'bottom') {
      return { top: DOCK_TOP, bottom: VIEWPORT_H, left: 0, right: 800, width: 800, height: VIEWPORT_H - DOCK_TOP, x: 0, y: DOCK_TOP, toJSON: () => ({}) } as DOMRect;
    }
    if (this instanceof HTMLButtonElement && el.textContent === 'anchor') {
      return { top: anchorTop, bottom: anchorTop + 24, left: 100, right: 140, width: 40, height: 24, x: 100, y: anchorTop, toJSON: () => ({}) } as DOMRect;
    }
    if (el.dataset?.testid === 'inline-popover') {
      const top = anchorTop + 24 + 6;
      return { top, bottom: top + PANEL_H, left: 100, right: 300, width: 200, height: PANEL_H, x: 100, y: top, toJSON: () => ({}) } as DOMRect;
    }
    return real.call(this);
  });
}

function Host() {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      <button ref={btnRef}>anchor</button>
      <InlinePopover trigger={btnRef} open onClose={() => {}} aria-label="panel"><p>body</p></InlinePopover>
      <div data-uic-keepout="bottom">dock</div>
    </div>
  );
}

afterEach(() => vi.restoreAllMocks());

describe('InlinePopover — keep-out surfaces', () => {
  it('flips up rather than covering a pinned dock below its anchor', () => {
    window.innerHeight = VIEWPORT_H;
    const anchorTop = 400; // fits above the viewport floor (430..630) but not above the dock (540)
    stubGeometry(anchorTop);
    render(<Host />);
    expect(screen.getByTestId('inline-popover').style.top).toBe(`${anchorTop - 6 - PANEL_H}px`);
  });

  it('ignores a keep-out that is not below the anchor (a menu opened from inside the dock)', () => {
    const anchor = { top: 600, bottom: 624 } as DOMRect;
    const doc = document.implementation.createHTMLDocument('x');
    const dock = doc.createElement('div');
    dock.setAttribute('data-uic-keepout', 'bottom');
    dock.getBoundingClientRect = () => ({ top: DOCK_TOP, bottom: VIEWPORT_H, width: 800, height: 180 } as DOMRect);
    doc.body.appendChild(dock);
    expect(popoverFloor(anchor, VIEWPORT_H, doc)).toBe(VIEWPORT_H);
    expect(popoverFloor({ top: 100, bottom: 124 } as DOMRect, VIEWPORT_H, doc)).toBe(DOCK_TOP);
  });
});

describe('DropdownMenu — submenu rows under a real pointer', () => {
  it('runs a submenu item even though its mousedown lands outside the parent panel', () => {
    const picked = vi.fn();
    function Menu() {
      const [n] = useState(0);
      return (
        <DropdownMenu
          trigger={<span>open {n}</span>}
          triggerLabel="Actions"
          sections={[{ items: [{ label: 'Revise one part', submenu: [{ items: [{ label: 'Bullet 2', onSelect: picked }] }] }] }]}
        />
      );
    }
    render(<Menu />);
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: /Revise one part/ }));
    const row = screen.getByRole('menuitem', { name: 'Bullet 2' });
    fireEvent.mouseDown(row);
    fireEvent.click(row);
    expect(picked).toHaveBeenCalledTimes(1);
  });
});
