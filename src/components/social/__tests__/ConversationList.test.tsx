import { render, screen, fireEvent } from '@testing-library/react';
import { ConversationList, type ConversationItem } from '../ConversationList';

const onSelect = vi.fn();
beforeEach(() => onSelect.mockClear());

const items: ConversationItem[] = [
  {
    channel: 'dm:alice',
    peers: [{ userId: 'u-alice', displayName: 'Alice Chen', online: true }],
    lastMessagePreview: 'See you at standup',
    // Local-time ISO (no Z) so the HH:MM assertion is timezone-proof.
    lastMessageAt: '2026-08-25T14:05:00',
    unreadCount: 3,
  },
  {
    channel: 'dm:bob',
    peers: [{ userId: 'u-bob', displayName: 'Bob Martinez', online: false }],
    lastMessagePreview: 'thanks!',
  },
  {
    channel: 'group:launch',
    peers: [
      { userId: 'u-grace', displayName: 'Grace Wilson' },
      { userId: 'u-dan', displayName: 'Dan Okafor' },
      { userId: 'u-eve', displayName: 'Eve Larsen' },
    ],
    lastMessagePreview: 'shipping tonight',
  },
];

describe('ConversationList', () => {
  it('renders a row per conversation with data-channel and fires onSelect', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const rows = screen.getAllByTestId('conversation-row');
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute('data-channel', 'dm:alice');

    fireEvent.click(rows[1]);
    expect(onSelect).toHaveBeenCalledWith('dm:bob');
  });

  it('shows name, truncated preview and the clock time when the row is from today', () => {
    // The clock is pinned to the fixture's own day: a rail stamp is relative
    // to when it is READ, so a real "today" has to be arranged.
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 25, 18, 0, 0));
    try {
      render(<ConversationList items={items} onSelect={onSelect} />);
      const alice = screen.getAllByTestId('conversation-row')[0];
      expect(alice).toHaveTextContent('Alice Chen');
      expect(alice).toHaveTextContent('See you at standup');
      expect(screen.getByTestId('conversation-time')).toHaveTextContent('14:05');
    } finally {
      vi.useRealTimers();
    }
  });

  it('says which day an older row means instead of a bare hour', () => {
    // A rail row has no day separator above it, so `14:05` on a conversation
    // nobody has touched since August reads as this afternoon.
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 26, 9, 0, 0));
    try {
      render(<ConversationList items={items} onSelect={onSelect} />);
      const stamp = screen.getByTestId('conversation-time');
      expect(stamp).toHaveTextContent('Yesterday');
      // Machine-readable, and the exact moment is one hover away.
      expect(stamp.tagName).toBe('TIME');
      expect(stamp).toHaveAttribute('datetime', '2026-08-25T14:05:00');
      expect(stamp.getAttribute('title')).toContain('2026');
    } finally {
      vi.useRealTimers();
    }
  });

  it('renders the unread badge only for rows with unreadCount > 0', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const badges = screen.getAllByTestId('conversation-unread');
    expect(badges).toHaveLength(1);
    expect(badges[0]).toHaveTextContent('3');
  });

  it('caps the unread badge at 99+', () => {
    render(
      <ConversationList
        items={[{ ...items[0], unreadCount: 250 }]}
        onSelect={onSelect}
      />,
    );
    expect(screen.getByTestId('conversation-unread')).toHaveTextContent('99+');
  });

  it('marks the active channel row', () => {
    render(<ConversationList items={items} activeChannel="dm:bob" onSelect={onSelect} />);
    const rows = screen.getAllByTestId('conversation-row');
    expect(rows[1]).toHaveAttribute('data-active', 'true');
    expect(rows[1]).toHaveAttribute('aria-current', 'true');
    expect(rows[0]).toHaveAttribute('data-active', 'false');
  });

  it('shows a presence dot only when online is defined on a 1:1 peer', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const rows = screen.getAllByTestId('conversation-row');
    expect(rows[0].querySelector('[data-testid="presence-online"]')).not.toBeNull();
    expect(rows[1].querySelector('[data-testid="presence-offline"]')).not.toBeNull();
    // Group row: stacked avatars, no dot.
    expect(rows[2].querySelector('[data-testid^="presence-"]')).toBeNull();
  });

  it('lists every peer name for a group conversation', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const group = screen.getAllByTestId('conversation-row')[2];
    expect(group).toHaveTextContent('Grace Wilson, Dan Okafor, Eve Larsen');
  });

  it('renders the empty state with the default and custom labels', () => {
    const { unmount } = render(<ConversationList items={[]} onSelect={onSelect} />);
    expect(screen.getByTestId('conversation-empty')).toHaveTextContent('No conversations yet');
    unmount();
    render(<ConversationList items={[]} onSelect={onSelect} emptyLabel="Nothing here" />);
    expect(screen.getByTestId('conversation-empty')).toHaveTextContent('Nothing here');
  });

  it('renders the "+ New chat" affordance only when onNewChat is set', () => {
    const onNewChat = vi.fn();
    const { unmount } = render(<ConversationList items={items} onSelect={onSelect} />);
    expect(screen.queryByTestId('conversation-new-chat')).toBeNull();
    unmount();
    render(<ConversationList items={items} onSelect={onSelect} onNewChat={onNewChat} />);
    fireEvent.click(screen.getByTestId('conversation-new-chat'));
    expect(onNewChat).toHaveBeenCalledTimes(1);
  });

  it('dark tone swaps row text onto white/alpha classes', () => {
    render(<ConversationList items={items} onSelect={onSelect} tone="dark" data-testid="dm-list" />);
    const root = screen.getByTestId('dm-list');
    expect(root.querySelector('.text-white')).not.toBeNull();
  });
});

// One list, three kinds — because the server already models them as one thing.
describe('ConversationList — channels alongside DMs and groups', () => {
  const items = [
    { channel: 'general', kind: 'channel' as const, name: 'general', peers: [] },
    { channel: 'dm-1', peers: [{ userId: 'u1', displayName: 'Nora DaSilva', online: true }] },
    {
      channel: 'grp-1',
      peers: [
        { userId: 'u2', displayName: 'Sam Ruiz' },
        { userId: 'u3', displayName: 'Bea Okonjo' },
      ],
    },
  ];

  it('identifies a channel by name and a #, not by its members', () => {
    render(<ConversationList items={items} onSelect={() => {}} />);
    expect(screen.getByText('general')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-channel-glyph')).toBeInTheDocument();
  });

  // #general does not want forty stacked avatars, and its identity survives
  // everyone leaving.
  it('renders no avatars for a channel', () => {
    render(<ConversationList items={[items[0]]} onSelect={() => {}} />);
    expect(screen.queryByText('ND')).toBeNull();
  });

  it('still renders DMs and groups the way it always did', () => {
    render(<ConversationList items={items} onSelect={() => {}} />);
    expect(screen.getByText('Nora DaSilva')).toBeInTheDocument();
    expect(screen.getByText('Sam Ruiz, Bea Okonjo')).toBeInTheDocument();
  });

  it('selects a channel by its channel id', () => {
    const onSelect = vi.fn();
    render(<ConversationList items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('general'));
    expect(onSelect).toHaveBeenCalledWith('general');
  });

  // A mislabelled row should stay readable rather than render blank.
  it('falls back to the channel id when a channel has no name', () => {
    render(
      <ConversationList
        items={[{ channel: 'random', kind: 'channel', peers: [] }]}
        onSelect={() => {}}
      />,
    );
    expect(screen.getByText('random')).toBeInTheDocument();
  });
});

// A call in progress is the one signal in this list that expires. Until it
// existed, a call was invisible from the rail — the thread only posted a card
// once the call had ENDED, so the only way to find one in progress was to
// already be looking at the conversation it was in.
describe('a live call', () => {
  const item = (over: Record<string, unknown> = {}) => ({
    channel: 'room:design',
    kind: 'channel' as const,
    name: 'design',
    peers: [],
    ...over,
  });

  it('is not claimed unless it is happening', () => {
    render(<ConversationList items={[item()]} onSelect={vi.fn()} />);
    expect(screen.queryByTestId('conversation-live')).toBeNull();
  });

  it('marks the conversation carrying it', () => {
    render(<ConversationList items={[item({ live: true })]} onSelect={vi.fn()} />);
    expect(screen.getByTestId('conversation-live')).toHaveTextContent('Live');
  });

  it('names itself for a screen reader rather than relying on a red dot', () => {
    render(<ConversationList items={[item({ live: true })]} onSelect={vi.fn()} />);
    expect(screen.getByLabelText('Call in progress')).toBeInTheDocument();
  });

  // Three different facts, none of which replaces another.
  it('sits alongside unread and mention badges', () => {
    render(<ConversationList items={[item({ live: true, mentioned: true, unreadCount: 3 })]} onSelect={vi.fn()} />);
    expect(screen.getByTestId('conversation-live')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-mention')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-unread')).toHaveTextContent('3');
  });

  it('marks only the conversation that has one', () => {
    render(<ConversationList items={[
      item({ channel: 'room:a', name: 'a' }),
      item({ channel: 'room:b', name: 'b', live: true }),
    ]} onSelect={vi.fn()} />);
    expect(screen.getAllByTestId('conversation-live')).toHaveLength(1);
  });
});

// Top-k: a rail past a handful of rows is read, not scanned.
describe('ConversationList maxVisible', () => {
  const many: ConversationItem[] = Array.from({ length: 7 }, (_, i) => ({
    channel: `chat:dm:me:p${i}`,
    peers: [{ userId: `p${i}`, displayName: `Person ${i}` }],
    lastMessageAt: new Date(2026, 0, 1 + i).toISOString(),
  }));

  it('shows the most recent rows and folds the rest behind one button', () => {
    render(<ConversationList items={many} onSelect={onSelect} maxVisible={3} />);
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(3);
    // Recency first: the newest three, not the first three in the array.
    expect(screen.getByText('Person 6')).toBeInTheDocument();
    expect(screen.queryByText('Person 0')).toBeNull();
    const more = screen.getByTestId('conversation-show-more');
    expect(more).toHaveTextContent('Show 4 more');
    fireEvent.click(more);
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(7);
    expect(more).toHaveTextContent('Show less');
    fireEvent.click(more);
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(3);
  });

  it('keeps the open conversation visible even when it is old', () => {
    render(
      <ConversationList items={many} onSelect={onSelect} maxVisible={3} activeChannel="chat:dm:me:p0" />,
    );
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(3);
    expect(screen.getByText('Person 0')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-show-more')).toHaveTextContent('Show 4 more');
  });

  it('renders no button when the list fits', () => {
    render(<ConversationList items={many.slice(0, 3)} onSelect={onSelect} maxVisible={3} />);
    expect(screen.queryByTestId('conversation-show-more')).toBeNull();
  });

  it('caps each group on its own when grouped', () => {
    const withChannels: ConversationItem[] = [
      ...many,
      ...['general', 'random', 'dev'].map((name) => ({ channel: `chat:${name}`, kind: 'channel' as const, name, peers: [] })),
    ];
    render(<ConversationList items={withChannels} onSelect={onSelect} grouped maxVisible={2} />);
    expect(screen.getAllByTestId('conversation-row')).toHaveLength(4);
    expect(screen.getAllByTestId('conversation-show-more')).toHaveLength(2);
  });
});
