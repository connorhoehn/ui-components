// The rail's ORDER and its KEYBOARD, which are the same problem seen twice.
//
// Measured on a real dev account before this existed: the rail carried 43
// rows, 42 of them abandoned test rooms, the single conversation with a
// message in it sorted BELOW all of them, and — because every row was its own
// tab stop — that row was the 90th of 120 tab stops on the page.

import { render, screen, fireEvent } from '@testing-library/react';
import { ConversationList, type ConversationItem } from '../ConversationList';

const onSelect = vi.fn();
beforeEach(() => onSelect.mockClear());

const room = (name: string, at?: string): ConversationItem => ({
  channel: `room:${name}`,
  kind: 'channel',
  name,
  peers: [],
  lastMessageAt: at,
});
const dm = (who: string, at?: string): ConversationItem => ({
  channel: `chat:dm:me:${who}`,
  peers: [{ userId: who, displayName: who }],
  lastMessageAt: at,
});

function rowChannels() {
  return screen.getAllByTestId('conversation-row').map((r) => r.getAttribute('data-channel'));
}

describe('ConversationList ordering', () => {
  it('sorts most-recent-first and sinks conversations nobody has used', () => {
    render(
      <ConversationList
        items={[
          room('probe1'),
          room('probe2'),
          room('general', '2026-09-01T09:00:00'),
          room('standup', '2026-09-07T09:00:00'),
        ]}
        onSelect={onSelect}
      />,
    );
    expect(rowChannels()).toEqual([
      'room:standup', 'room:general', 'room:probe1', 'room:probe2',
    ]);
  });

  it('keeps the caller order when sortByRecency is off', () => {
    render(
      <ConversationList
        items={[room('a', '2026-09-01T09:00:00'), room('b', '2026-09-07T09:00:00')]}
        sortByRecency={false}
        onSelect={onSelect}
      />,
    );
    expect(rowChannels()).toEqual(['room:a', 'room:b']);
  });

  it('puts a brand-new DM above forty dead rooms with dms-first', () => {
    const rooms = Array.from({ length: 40 }, (_, i) => room(`probe${i}`));
    render(
      <ConversationList
        items={[...rooms, dm('carol', '2026-09-08T04:27:00')]}
        grouped
        sectionOrder="dms-first"
        onSelect={onSelect}
      />,
    );
    // The whole point: first row, not the 41st.
    expect(rowChannels()[0]).toBe('chat:dm:me:carol');
  });

  it('still leads with channels by default, so existing callers are untouched', () => {
    render(
      <ConversationList items={[dm('carol', '2026-09-08T04:27:00'), room('general')]} grouped onSelect={onSelect} />,
    );
    expect(rowChannels()[0]).toBe('room:general');
  });

  it('names each group on its own list, where a screen reader will find it', () => {
    render(
      <ConversationList items={[dm('carol'), room('general')]} grouped onSelect={onSelect} />,
    );
    // Previously ONE <ul aria-label="Conversations"> with aria-hidden
    // headings, so the boundary between a room and a person was carried by
    // nothing an assistive technology could read.
    expect(screen.getByRole('list', { name: 'Channels' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Direct messages' })).toBeInTheDocument();
  });
});

describe('ConversationList keyboard', () => {
  const items = [dm('a', '2026-09-08T03:00:00'), dm('b', '2026-09-08T02:00:00'), dm('c', '2026-09-08T01:00:00')];

  it('is ONE tab stop, not one per row', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const rows = screen.getAllByTestId('conversation-row');
    expect(rows.filter((r) => r.getAttribute('tabindex') === '0')).toHaveLength(1);
    expect(rows.filter((r) => r.getAttribute('tabindex') === '-1')).toHaveLength(2);
  });

  it('starts the cursor on the OPEN conversation, not at the top', () => {
    render(<ConversationList items={items} activeChannel="chat:dm:me:c" onSelect={onSelect} />);
    const rows = screen.getAllByTestId('conversation-row');
    expect(rows[2]).toHaveAttribute('tabindex', '0');
  });

  it('moves with ArrowDown / ArrowUp / Home / End and activates with Enter', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const rows = () => screen.getAllByTestId('conversation-row');
    rows()[0].focus();

    fireEvent.keyDown(rows()[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(rows()[1]);

    fireEvent.keyDown(rows()[1], { key: 'End' });
    expect(document.activeElement).toBe(rows()[2]);

    fireEvent.keyDown(rows()[2], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(rows()[1]);

    fireEvent.keyDown(rows()[1], { key: 'Home' });
    expect(document.activeElement).toBe(rows()[0]);

    // The rows stay real buttons, so activation is still Enter/Space and the
    // browser gives us click for free.
    fireEvent.click(rows()[0]);
    expect(onSelect).toHaveBeenCalledWith('chat:dm:me:a');
  });

  it('does not run off either end', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const rows = () => screen.getAllByTestId('conversation-row');
    rows()[0].focus();
    fireEvent.keyDown(rows()[0], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(rows()[0]);
    fireEvent.keyDown(rows()[0], { key: 'End' });
    fireEvent.keyDown(rows()[2], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(rows()[2]);
  });

  it('leaves keys it does not own alone', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const rows = screen.getAllByTestId('conversation-row');
    rows[0].focus();
    const e = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true, cancelable: true });
    rows[0].dispatchEvent(e);
    expect(e.defaultPrevented).toBe(false);
  });
});

describe('ConversationList roving cursor does not arm a stale focus request', () => {
  // Regression, found in the browser: ArrowDown on the LAST row set a pending
  // focus request that no re-render ever consumed (the cursor had not moved,
  // so setState was a no-op), and the request then fired on the next
  // unrelated render — focus jumped into the rail while the user was
  // reacting to a message.
  it('leaves focus alone when a re-render follows a no-op move', () => {
    const items = [
      { channel: 'a', peers: [{ userId: 'a', displayName: 'A' }] },
      { channel: 'b', peers: [{ userId: 'b', displayName: 'B' }] },
    ];
    const { rerender } = render(<ConversationList items={items} onSelect={onSelect} />);
    const rows = () => screen.getAllByTestId('conversation-row');
    rows()[1].focus();
    fireEvent.keyDown(rows()[1], { key: 'ArrowDown' }); // already at the end
    fireEvent.keyDown(rows()[1], { key: 'ArrowDown' });

    // Something else on the page takes focus, then the list re-renders for an
    // unrelated reason.
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.focus();
    rerender(<ConversationList items={items} activeChannel="a" onSelect={onSelect} />);

    expect(document.activeElement).toBe(outside);
    outside.remove();
  });
});
