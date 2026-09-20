// The ⋯ menu must stay reachable no matter how many conversations you belong to.
//
// It renders one row per conversation ("Share to #general", "Share to #design",
// …), and that list is generated from the account rather than authored. On a
// dozen rooms the menu measured 989px inside a 932px viewport: Print, all three
// Exports and Clear Document sat below the fold, with `overflow-hidden` on the
// container so there was not even a scrollbar to say they existed. Every export
// path in the app was unreachable, silently, at an ordinary window height.
//
// jsdom cannot measure that — nothing has a height here. What it CAN pin is the
// mechanism that prevents it: the menu is bounded and scrollable rather than
// clipped, and past a threshold the generated group scrolls IN PLACE so the
// fixed actions below it stay put instead of being pushed off-screen. Those two
// classes are the whole fix; deleting either brings the bug straight back.

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import DocumentHeader from '../DocumentHeader';

afterEach(cleanup);

const baseProps = {
  meta: { id: 'doc-1', title: 'Notes', createdAt: 0, updatedAt: 0 } as never,
  mode: 'edit' as never,
  participants: [],
  onUpdateMeta: () => {},
  onExport: () => {},
  onPrint: () => {},
  onToggleHistory: () => {},
  onClearDocument: () => {},
};

function rooms(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: `share-room-${i}`,
    label: `Share to #room-${i}`,
    onSelect: () => {},
  }));
}

function openMenu() {
  fireEvent.click(screen.getByTitle('More actions'));
}

/** The share destinations live in a "Share to…" flyout now; open it. */
function openShareFlyout() {
  fireEvent.click(screen.getByTestId('document-header-menu-share'));
}

describe('DocumentHeader ⋯ menu bounds', () => {
  it('bounds the whole menu and lets it scroll rather than clipping it', () => {
    render(<DocumentHeader {...baseProps} extraMenuItems={rooms(2)} />);
    openMenu();

    const menu = screen.getByTestId('document-header-print').closest('[role="menu"]') as HTMLElement;
    expect(menu.className).toContain('uic-menu-scroll');
    // The bug was `overflow-hidden`: content past the fold with no scrollbar.
    expect(menu.className).not.toContain('overflow-hidden');
  });

  it('leaves a short extras group unscrolled', () => {
    render(<DocumentHeader {...baseProps} extraMenuItems={rooms(3)} />);
    openMenu();
    openShareFlyout();

    const extras = screen.getByTestId('document-header-menu-extras');
    expect(extras.className || '').not.toContain('uic-menu-group-scroll');
  });

  it('scrolls a long extras group in place so the fixed actions stay put', () => {
    render(<DocumentHeader {...baseProps} extraMenuItems={rooms(12)} />);
    openMenu();
    openShareFlyout();

    const extras = screen.getByTestId('document-header-menu-extras');
    expect(extras.className).toContain('uic-menu-group-scroll');

    // All twelve are still IN the menu — bounding is not truncation.
    expect(screen.getByTestId('document-header-menu-share-room-0')).toBeInTheDocument();
    expect(screen.getByTestId('document-header-menu-share-room-11')).toBeInTheDocument();

    // And the actions that used to fall off the bottom are siblings of the
    // scroll region, not children of it — so they cannot scroll away with it.
    const print = screen.getByTestId('document-header-print');
    const clear = screen.getByTestId('clear-document-btn');
    expect(extras.contains(print)).toBe(false);
    expect(extras.contains(clear)).toBe(false);
    // The destinations are a flyout of their own; Print and Clear stay in
    // the root menu, which the flyout never scrolls away.
    expect(print.closest('[role="menu"]')).not.toBe(extras.closest('[role="menu"]'));
    expect(clear.closest('[role="menu"]')).toBe(print.closest('[role="menu"]'));
  });

  it('renders no extras container at all when there are none', () => {
    render(<DocumentHeader {...baseProps} />);
    openMenu();

    expect(screen.queryByTestId('document-header-menu-extras')).toBeNull();
    expect(screen.getByTestId('document-header-print')).toBeInTheDocument();
  });
});
