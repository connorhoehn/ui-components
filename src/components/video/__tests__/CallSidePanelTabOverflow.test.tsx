// The side panel's tab row never cuts a tab at the ✕: tabs that do not fit
// move into a "More ▾" menu, the selected tab always stays in the row.

import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CallSidePanel, type CallSidePanelTab } from '../CallSidePanel';

const TABS: CallSidePanelTab[] = [
  { id: 'chat', label: 'Chat', content: <p>chat body</p> },
  { id: 'people', label: 'People', content: <p>people body</p> },
  { id: 'devices', label: 'Devices', content: <p>devices body</p> },
  { id: 'captions', label: 'Captions', content: <p>captions body</p> },
];

/** A rail `room` px wide; each tab 8px per letter + 24px padding; More 56px. */
function layout(room: number) {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
    return this.dataset.testid === 'call-side-panel-rail' ? room : 0;
  });
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.dataset.measureMore !== undefined) return 56;
    const label = this.dataset.label;
    return label ? label.length * 8 + 24 : 0;
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function tabNames(): string[] {
  return within(screen.getByRole('tablist')).getAllByRole('tab').map((t) => t.textContent ?? '');
}

describe('CallSidePanel — tabs that do not fit', () => {
  it('with room for every tab there is no More menu', () => {
    layout(400);
    render(<CallSidePanel tabs={TABS} activeTab="chat" onTabChange={() => {}} />);
    expect(tabNames()).toEqual(['Chat', 'People', 'Devices', 'Captions']);
    expect(screen.queryByTestId('call-side-panel-more')).toBeNull();
  });

  it('folds the tabs past the room into More, named for what it holds', () => {
    // Chat 56 + People 72 + Devices 80 + Captions 88 + gaps 12 = 308 > 240.
    layout(240);
    const onTabChange = vi.fn();
    render(<CallSidePanel tabs={TABS} activeTab="chat" onTabChange={onTabChange} />);
    expect(tabNames()).toEqual(['Chat', 'People']);
    const more = screen.getByTestId('call-side-panel-more');
    expect(more).toHaveAccessibleName('More sections: Devices, Captions');
    expect(screen.getByTestId('call-side-panel-rail')).toHaveAttribute('data-tabs-hidden', '2');
    fireEvent.click(more);
    fireEvent.click(screen.getByTestId('call-side-panel-tab-captions'));
    expect(onTabChange).toHaveBeenCalledWith('captions');
  });

  it('the selected tab always stays in the row, even when it is the last one', () => {
    layout(240);
    render(<CallSidePanel tabs={TABS} activeTab="captions" onTabChange={() => {}} />);
    const names = tabNames();
    expect(names).toContain('Captions');
    expect(within(screen.getByRole('tablist')).getByRole('tab', { selected: true })).toHaveTextContent('Captions');
    expect(screen.getByTestId('call-side-panel-more')).toBeInTheDocument();
  });

  it('every label appears once on the page (the measuring copy adds no text)', () => {
    layout(240);
    render(<CallSidePanel tabs={TABS} activeTab="chat" onTabChange={() => {}} />);
    expect(screen.getAllByText('Chat')).toHaveLength(1);
    expect(screen.queryAllByText('Captions')).toHaveLength(0); // folded into the closed menu
    expect(screen.getByTestId('call-side-panel-rail-measure')).toHaveAttribute('aria-hidden', 'true');
  });

  it('the ✕ is never part of the rail', () => {
    layout(240);
    render(<CallSidePanel tabs={TABS} activeTab="chat" onTabChange={() => {}} />);
    expect(screen.getByTestId('call-side-panel-rail').contains(screen.getByTestId('call-side-panel-close'))).toBe(false);
  });
});
