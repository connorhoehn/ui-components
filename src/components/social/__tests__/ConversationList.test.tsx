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

  it('shows name, truncated preview and absolute HH:MM time', () => {
    render(<ConversationList items={items} onSelect={onSelect} />);
    const alice = screen.getAllByTestId('conversation-row')[0];
    expect(alice).toHaveTextContent('Alice Chen');
    expect(alice).toHaveTextContent('See you at standup');
    expect(screen.getByTestId('conversation-time')).toHaveTextContent('14:05');
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
