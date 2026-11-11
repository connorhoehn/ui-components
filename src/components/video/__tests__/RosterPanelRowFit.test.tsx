// A roster row gives the name priority: a "View only" chip folds to its eye
// before the name is cut, "(you)" is never dropped, a cut name shows in full
// as a tooltip, and nothing paints under the row's ⋯ button.

import { render, screen, fireEvent, act, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RosterPanel, type RosterParticipant } from '../RosterPanel';

const ALICE: RosterParticipant = { id: 'a', displayName: 'Alice Chen', isLocal: true, access: 'view-only' };
const BOB: RosterParticipant = { id: 'b', displayName: 'Bob Martinez', access: 'view-only' };

/**
 * Lay a row out. `room` is the name block's width with the full chip; folding
 * the chip to its eye (72px → 16px) gives the block 56px more. The name's own
 * text is `nameWidth` wide, and it is cut when the block is narrower than the
 * text plus "(you)".
 */
function layout({ room, nameWidth }: { room: number; nameWidth: number }) {
  const folded = (el: HTMLElement) => el.closest('button')?.getAttribute('data-access-badge') === 'icon';
  const blockWidth = (el: HTMLElement) => room + (folded(el) ? 56 : 0);
  const youWidth = (el: HTMLElement) => (el.closest('[data-testid="roster-name"]')?.querySelector('[data-testid="roster-you"]') ? 34 : 0);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.tagName === 'BUTTON') return 256;
    if (this.dataset.testid === 'roster-name') return blockWidth(this);
    if (this.classList.contains('truncate')) return Math.min(nameWidth, blockWidth(this) - youWidth(this));
    return 0;
  });
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.classList.contains('truncate')) return nameWidth;
    return 0;
  });
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.dataset.testid === 'roster-you') return 30;
    if (this.querySelector('[data-testid="roster-access"]')) return folded(this) ? 16 : 72;
    return 0;
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('RosterPanel — row fit', () => {
  it('folds the View only chip to its eye when the label would cut the name, and keeps "(you)"', () => {
    layout({ room: 60, nameWidth: 70 });
    render(<RosterPanel participants={[ALICE]} rowMenu={() => [{ items: [{ label: 'Allow publishing', onSelect: () => {} }] }]} />);
    const row = screen.getByTestId('roster-row');
    const button = row.querySelector('button')!;
    expect(button).toHaveAttribute('data-access-badge', 'icon');
    const badge = within(row).getByTestId('roster-access');
    expect(badge).toHaveAttribute('role', 'img');
    expect(badge).toHaveAccessibleName('View only');
    expect(within(row).getByTestId('roster-you')).toHaveTextContent('(you)');
    // The row button still says who, and that they are view-only.
    expect(button).toHaveAccessibleName(/Alice Chen\s*\(you\)\s*View only/);
  });

  it('keeps the label when the name has room for it', () => {
    layout({ room: 200, nameWidth: 70 });
    render(<RosterPanel participants={[BOB]} />);
    expect(screen.getByTestId('roster-row').querySelector('button')).toHaveAttribute('data-access-badge', 'label');
    expect(screen.getByTestId('roster-access')).toHaveTextContent('View only');
  });

  it('does not flip back while unfolding would cut the name again', () => {
    // Folded the block is 60 + 56 = 116 wide; the name (100) + "(you)" (34) does
    // not fit even then, so it stays folded rather than oscillating.
    layout({ room: 60, nameWidth: 100 });
    render(<RosterPanel participants={[ALICE]} />);
    expect(screen.getByTestId('roster-row').querySelector('button')).toHaveAttribute('data-access-badge', 'icon');
  });

  it('accessBadge="label" never folds; accessBadge="icon" always does', () => {
    layout({ room: 40, nameWidth: 120 });
    const { unmount } = render(<RosterPanel participants={[BOB]} accessBadge="label" />);
    expect(screen.getByTestId('roster-access')).toHaveTextContent('View only');
    unmount();
    layout({ room: 400, nameWidth: 60 });
    render(<RosterPanel participants={[BOB]} accessBadge="icon" />);
    expect(screen.getByTestId('roster-access')).toHaveAttribute('role', 'img');
  });

  it('a cut name shows in full as a tooltip on hover', () => {
    layout({ room: 20, nameWidth: 140 });
    vi.useFakeTimers();
    render(<RosterPanel participants={[{ id: 'c', displayName: 'Bartholomew Featherstonehaugh-Smythe' }]} onParticipantClick={() => {}} />);
    const name = screen.getByText('Bartholomew Featherstonehaugh-Smythe');
    expect(name.className).toContain('truncate');
    fireEvent.mouseEnter(name.parentElement!);
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Bartholomew Featherstonehaugh-Smythe');
  });

  it('the row button clips its content and draws an inset focus ring; the ⋯ button sits after it, never under it', () => {
    layout({ room: 60, nameWidth: 70 });
    render(<RosterPanel participants={[BOB]} onParticipantClick={() => {}} rowMenu={() => [{ items: [{ label: 'Make view-only', onSelect: () => {} }] }]} />);
    const row = screen.getByTestId('roster-row');
    const button = row.querySelector('button')!;
    expect(button.className).toContain('overflow-hidden');
    expect(button.className).toContain('min-w-0');
    expect(button.className).toMatch(/focus-visible:-outline-offset-2/);
    const menu = within(row).getByTestId('roster-row-menu');
    expect(menu.className).toContain('shrink-0');
    expect(button.compareDocumentPosition(menu) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(button.contains(menu)).toBe(false);
  });

  it('folds when the label squeezed the name block to nothing', () => {
    layout({ room: 0, nameWidth: 80 });
    render(<RosterPanel participants={[ALICE]} />);
    expect(screen.getByTestId('roster-row').querySelector('button')).toHaveAttribute('data-access-badge', 'icon');
  });

  it('a participant without an access standing renders no chip and no badge marker', () => {
    layout({ room: 60, nameWidth: 70 });
    render(<RosterPanel participants={[{ id: 'd', displayName: 'Dee' }]} />);
    expect(screen.queryByTestId('roster-access')).toBeNull();
    expect(screen.getByTestId('roster-row').querySelector('button')).not.toHaveAttribute('data-access-badge');
  });
});
