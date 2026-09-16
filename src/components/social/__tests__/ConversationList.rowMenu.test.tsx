// The rail's per-row menu, its Pinned group, and what a mute does and does
// not quieten.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { ConversationList, type ConversationItem } from '../ConversationList';

const onSelect = vi.fn();
const onTogglePin = vi.fn();
const onToggleMute = vi.fn();
const onMarkUnread = vi.fn();

beforeEach(() => {
  onSelect.mockClear();
  onTogglePin.mockClear();
  onToggleMute.mockClear();
  onMarkUnread.mockClear();
});

const items: ConversationItem[] = [
  {
    channel: 'general',
    kind: 'channel',
    name: 'general',
    peers: [],
    lastMessageAt: '2026-09-16T10:00:00',
  },
  {
    channel: 'dm:alice',
    peers: [{ userId: 'u-alice', displayName: 'Alice Chen' }],
    lastMessageAt: '2026-09-16T09:00:00',
  },
];

function openMenu(channel: string) {
  fireEvent.click(screen.getByTestId(`conversation-row-menu-${channel}`));
  return within(screen.getByTestId(`conversation-row-menu-${channel}-panel`));
}

describe('ConversationList row menu', () => {
  it('offers only the actions whose handlers were given', () => {
    render(<ConversationList items={items} onSelect={onSelect} onTogglePin={onTogglePin} />);
    const menu = openMenu('general');
    expect(menu.getByTestId('conversation-row-menu-general-pin')).toBeInTheDocument();
    expect(menu.queryByTestId('conversation-row-menu-general-mute')).toBeNull();
    expect(menu.queryByTestId('conversation-row-menu-general-unread')).toBeNull();
  });

  it('renders no menu at all when no handler is given', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    expect(screen.queryByTestId('conversation-row-menu-general')).toBeNull();
  });

  it('asks for the state the row is NOT in', () => {
    const pinnedMuted: ConversationItem[] = [{ ...items[0], pinned: true, muted: true }];
    render(
      <ConversationList
        items={pinnedMuted}
        onSelect={onSelect}
        onTogglePin={onTogglePin}
        onToggleMute={onToggleMute}
      />,
    );
    const menu = openMenu('general');
    expect(menu.getByTestId('conversation-row-menu-general-pin')).toHaveTextContent('Unpin');
    expect(menu.getByTestId('conversation-row-menu-general-mute')).toHaveTextContent('Unmute');

    fireEvent.click(menu.getByTestId('conversation-row-menu-general-pin'));
    expect(onTogglePin).toHaveBeenCalledWith('general', false);
  });

  it('pins and mutes from an unpinned, unmuted row', () => {
    render(
      <ConversationList
        items={items}
        onSelect={onSelect}
        onTogglePin={onTogglePin}
        onToggleMute={onToggleMute}
      />,
    );
    fireEvent.click(openMenu('dm:alice').getByTestId('conversation-row-menu-dm:alice-pin'));
    expect(onTogglePin).toHaveBeenCalledWith('dm:alice', true);

    fireEvent.click(openMenu('dm:alice').getByTestId('conversation-row-menu-dm:alice-mute'));
    expect(onToggleMute).toHaveBeenCalledWith('dm:alice', true);
  });

  it('hides "Mark as unread" on a row that already is', () => {
    const withUnread: ConversationItem[] = [items[0], { ...items[1], unreadCount: 4 }];
    render(
      <ConversationList
        items={withUnread}
        onSelect={onSelect}
        onTogglePin={onTogglePin}
        onMarkUnread={onMarkUnread}
      />,
    );

    // The read row offers it, and it reaches the host.
    const readRowMenu = openMenu('general');
    fireEvent.click(readRowMenu.getByTestId('conversation-row-menu-general-unread'));
    expect(onMarkUnread).toHaveBeenCalledWith('general');

    // The unread row keeps its other actions and loses only this one.
    const unreadRowMenu = openMenu('dm:alice');
    expect(unreadRowMenu.queryByTestId('conversation-row-menu-dm:alice-unread')).toBeNull();
    expect(unreadRowMenu.getByTestId('conversation-row-menu-dm:alice-pin')).toBeInTheDocument();
  });

  // A ⋯ that opens on nothing is a promise of actions there are none of.
  it('renders no menu when every action has been filtered out of a row', () => {
    const withUnread: ConversationItem[] = [{ ...items[1], unreadCount: 4 }];
    render(<ConversationList items={withUnread} onSelect={onSelect} onMarkUnread={onMarkUnread} />);
    expect(screen.queryByTestId('conversation-row-menu-dm:alice')).toBeNull();
  });

  it('opening the menu does not open the conversation', () => {
    render(<ConversationList items={items} onSelect={onSelect} onTogglePin={onTogglePin} />);
    fireEvent.click(screen.getByTestId('conversation-row-menu-general'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('keeps one tab stop across the rows: only the cursor row\'s trigger is tabbable', () => {
    render(
      <ConversationList
        items={items}
        activeChannel="dm:alice"
        onSelect={onSelect}
        onTogglePin={onTogglePin}
      />,
    );
    expect(screen.getByTestId('conversation-row-menu-dm:alice')).toHaveAttribute('tabindex', '0');
    expect(screen.getByTestId('conversation-row-menu-general')).toHaveAttribute('tabindex', '-1');
  });
});

describe('ConversationList pinned group', () => {
  it('puts every pinned row, of any kind, in one group above the rest', () => {
    const pinned: ConversationItem[] = [
      { ...items[0] },
      { ...items[1], pinned: true },
      {
        channel: 'oldest',
        kind: 'channel',
        name: 'oldest',
        peers: [],
        lastMessageAt: '2026-09-15T08:00:00',
        pinned: true,
      },
    ];
    render(<ConversationList items={pinned} grouped onSelect={onSelect} />);

    const sections = screen.getAllByTestId('conversation-section');
    expect(sections[0]).toHaveTextContent('Pinned');

    const pinnedList = screen.getByRole('list', { name: 'Pinned' });
    const pinnedRows = within(pinnedList).getAllByTestId('conversation-row');
    // Recency still orders them among themselves.
    expect(pinnedRows.map((r) => r.getAttribute('data-channel'))).toEqual(['dm:alice', 'oldest']);

    // The unpinned channel keeps its own group, below.
    const channelRows = within(screen.getByRole('list', { name: 'Channels' })).getAllByTestId('conversation-row');
    expect(channelRows.map((r) => r.getAttribute('data-channel'))).toEqual(['general']);

    // And the pin says so on the row itself.
    expect(within(pinnedRows[0]).getByTestId('conversation-pinned')).toHaveAttribute('title', 'Pinned');
  });

  it('shows no Pinned heading when nothing is pinned', () => {
    render(<ConversationList items={items} grouped onSelect={onSelect} />);
    expect(screen.queryByRole('list', { name: 'Pinned' })).toBeNull();
  });
});

describe('ConversationList muted rows', () => {
  it('keeps the unread count but drops its accent, and says it is muted', () => {
    const muted: ConversationItem[] = [{ ...items[0], muted: true, unreadCount: 7 }];
    render(<ConversationList items={muted} onSelect={onSelect} />);

    const badge = screen.getByTestId('conversation-unread');
    expect(badge).toHaveTextContent('7');
    expect(badge).toHaveAttribute('data-muted', 'true');
    expect(badge.className).not.toContain('bg-primary');
    expect(screen.getByTestId('conversation-muted')).toHaveAttribute('title', 'Muted');
  });

  it('still marks a mention at full strength — a mute is not a gag', () => {
    const muted: ConversationItem[] = [{ ...items[0], muted: true, unreadCount: 7, mentioned: true }];
    render(<ConversationList items={muted} onSelect={onSelect} />);

    const mention = screen.getByTestId('conversation-mention');
    expect(mention.className).toContain('bg-danger');
    expect(mention.className).toContain('text-white');
  });

  it('leaves an unmuted badge on the accent', () => {
    const loud: ConversationItem[] = [{ ...items[0], unreadCount: 7 }];
    render(<ConversationList items={loud} onSelect={onSelect} />);
    const badge = screen.getByTestId('conversation-unread');
    expect(badge).toHaveAttribute('data-muted', 'false');
    expect(badge.className).toContain('bg-primary');
  });
});
