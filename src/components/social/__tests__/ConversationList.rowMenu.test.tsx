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

describe('ConversationRail beforeList', () => {
  it('renders between the shelf and the list, and nothing when absent', async () => {
    const { ConversationRail } = await import('../ConversationRail');
    const items = [{ channel: 'general', name: 'general', peers: [] }] as never;
    const { rerender } = render(
      <ConversationRail
        conversations={items}
        shelf={[{ id: 'activity', label: 'Activity' }]}
        onSelect={() => {}}
        beforeList={<div data-testid="tree-slot">tree</div>}
      />,
    );
    const slot = screen.getByTestId('tree-slot');
    const shelf = screen.getByTestId('conversation-rail-shelf');
    const list = screen.getByTestId('conversation-rail-list');
    expect(shelf.compareDocumentPosition(slot) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(slot.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    rerender(<ConversationRail conversations={items} onSelect={() => {}} />);
    expect(screen.queryByTestId('tree-slot')).toBeNull();
  });
});

describe('ConversationList call actions', () => {
  it('offers Call and Video call only when the host can start one', () => {
    const onStartCall = vi.fn();
    render(<ConversationList items={items} activeChannel={null} onSelect={vi.fn()} onStartCall={onStartCall} />);
    const menu = openMenu('general');
    fireEvent.click(menu.getByTestId('conversation-row-menu-general-video-call'));
    expect(onStartCall).toHaveBeenCalledWith('general', 'video');
  });

  it('has no call items without the handler', () => {
    render(<ConversationList items={items} activeChannel={null} onSelect={vi.fn()} onTogglePin={onTogglePin} />);
    const menu = openMenu('general');
    expect(menu.queryByTestId('conversation-row-menu-general-call')).toBeNull();
  });
});

describe('ConversationList row menu — Rename', () => {
  const onRename = vi.fn();
  beforeEach(() => onRename.mockClear());

  it('is absent until a handler says renaming is possible here', () => {
    // Another action so the ⋯ exists at all — a row with no actions has no
    // menu, which is its own (correct) behaviour tested above.
    render(<ConversationList items={items} onSelect={onSelect} onTogglePin={onTogglePin} />);
    expect(openMenu('general').queryByTestId('conversation-row-menu-general-rename')).toBeNull();
  });

  it('hands back the channel to rename', () => {
    render(<ConversationList items={items} onSelect={onSelect} onRename={onRename} />);
    fireEvent.click(openMenu('general').getByTestId('conversation-row-menu-general-rename'));
    expect(onRename).toHaveBeenCalledWith('general');
  });

  it('lets the host refuse it per row', () => {
    // Renaming is a PERMISSION — only a room's owner may — and a menu row that
    // cannot do what it says is worse than an absent one. A DM also has no
    // name of its own: it is named by the people in it.
    render(
      <ConversationList
        items={items}
        onSelect={onSelect}
        onTogglePin={onTogglePin}
        onRename={onRename}
        canRename={(item) => item.kind === 'channel'}
      />,
    );
    expect(openMenu('general').getByTestId('conversation-row-menu-general-rename')).toBeInTheDocument();
    expect(openMenu('dm:alice').queryByTestId('conversation-row-menu-dm:alice-rename')).toBeNull();
  });

  it('offers it alongside the other row actions, not instead of them', () => {
    render(
      <ConversationList
        items={items}
        onSelect={onSelect}
        onTogglePin={onTogglePin}
        onToggleMute={onToggleMute}
        onRename={onRename}
      />,
    );
    const menu = openMenu('general');
    expect(menu.getByTestId('conversation-row-menu-general-pin')).toBeInTheDocument();
    expect(menu.getByTestId('conversation-row-menu-general-mute')).toBeInTheDocument();
    expect(menu.getByTestId('conversation-row-menu-general-rename')).toBeInTheDocument();
  });
});

describe('custom sections — a person filing their own rail', () => {
  const onSetSection = vi.fn();
  beforeEach(() => onSetSection.mockClear());

  const filed: ConversationItem[] = [
    { channel: 'general', kind: 'channel', name: 'general', peers: [], section: 'Work', lastMessageAt: '2026-09-17T10:00:00' },
    { channel: 'random', kind: 'channel', name: 'random', peers: [], section: 'Away from keyboard', lastMessageAt: '2026-09-17T09:00:00' },
    { channel: 'design', kind: 'channel', name: 'design', peers: [], section: 'Work', lastMessageAt: '2026-09-17T08:00:00' },
    { channel: 'dm:alice', peers: [{ userId: 'u-alice', displayName: 'Alice Chen' }], lastMessageAt: '2026-09-17T07:00:00' },
  ];

  const headings = () => screen.queryAllByRole('presentation').map((h) => h.textContent);

  it('gives each heading its own group, in name order', () => {
    // Name order, not recency: a person's own headings are a filing system,
    // and drawers that move around defeat the point of having made one.
    render(<ConversationList items={filed} onSelect={onSelect} />);
    const lists = screen.getAllByRole('list').map((l) => l.getAttribute('aria-label'));
    expect(lists.indexOf('Away from keyboard')).toBeLessThan(lists.indexOf('Work'));
  });

  it('keeps both rows of a section together', () => {
    render(<ConversationList items={filed} onSelect={onSelect} />);
    const work = screen.getByRole('list', { name: 'Work' });
    expect(within(work).getAllByTestId('conversation-row')).toHaveLength(2);
  });

  it('leaves unfiled rows in the default groups', () => {
    render(<ConversationList items={filed} onSelect={onSelect} grouped />);
    const dms = screen.getByRole('list', { name: 'Direct messages' });
    expect(within(dms).getAllByTestId('conversation-row')).toHaveLength(1);
    // …and the filed channels are NOT also listed under Channels.
    expect(screen.queryByRole('list', { name: 'Channels' })).toBeNull();
  });

  it('lets a pin outrank a section', () => {
    // "Keep this in reach" is a stronger statement than "file this under
    // Work", and a pinned row pulled down into a section is a pin that
    // stopped working.
    render(
      <ConversationList
        items={filed.map((i) => (i.channel === 'general' ? { ...i, pinned: true } : i))}
        onSelect={onSelect}
      />,
    );
    const pinned = screen.getByRole('list', { name: 'Pinned' });
    expect(within(pinned).getAllByTestId('conversation-row')).toHaveLength(1);
    expect(within(screen.getByRole('list', { name: 'Work' })).getAllByTestId('conversation-row')).toHaveLength(1);
  });

  it('treats a blank section as no section', () => {
    render(
      <ConversationList
        items={[{ channel: 'general', kind: 'channel', name: 'general', peers: [], section: '   ', lastMessageAt: '2026-09-17T10:00:00' }]}
        onSelect={onSelect}
        grouped
      />,
    );
    expect(screen.getByRole('list', { name: 'Channels' })).toBeInTheDocument();
  });

  it('offers "Move to section…" on any row, and names the one it is in', () => {
    // Filing needs nobody's permission — it is the reader's own arrangement of
    // their own rail — so unlike Rename it is offered on a DM too.
    render(<ConversationList items={filed} onSelect={onSelect} onSetSection={onSetSection} />);
    expect(openMenu('general').getByTestId('conversation-row-menu-general-section')).toHaveTextContent('Move from Work');
    expect(openMenu('dm:alice').getByTestId('conversation-row-menu-dm:alice-section')).toHaveTextContent('Move to section');
  });

  it('hands back the channel to file', () => {
    render(<ConversationList items={filed} onSelect={onSelect} onSetSection={onSetSection} />);
    fireEvent.click(openMenu('general').getByTestId('conversation-row-menu-general-section'));
    expect(onSetSection).toHaveBeenCalledWith('general');
  });
});
