import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConversationShelf } from '../ConversationShelf';
import { ConversationList } from '../ConversationList';

afterEach(cleanup);

describe('ConversationShelf', () => {
  const mentions = { id: 'mentions', label: 'Mentions', icon: '@', count: 3, urgent: true };

  // The whole job of an activity rail: answerable without reading a row.
  it('shows what is waiting without opening anything', () => {
    render(<ConversationShelf items={[mentions]} onSelect={vi.fn()} />);
    expect(screen.getByTestId('conversation-shelf-mentions-count')).toHaveTextContent('3');
  });

  it('shows no badge rather than a zero', () => {
    render(<ConversationShelf items={[{ ...mentions, count: 0 }]} onSelect={vi.fn()} />);
    expect(screen.queryByTestId('conversation-shelf-mentions-count')).toBeNull();
  });

  // An @-mention is not the same kind of pending as "there is traffic".
  it('paints an urgent count differently from an ordinary one', () => {
    const { rerender } = render(<ConversationShelf items={[mentions]} onSelect={vi.fn()} />);
    expect(screen.getByTestId('conversation-shelf-mentions-count').className).toContain('bg-danger');
    rerender(<ConversationShelf items={[{ ...mentions, urgent: false }]} onSelect={vi.fn()} />);
    expect(screen.getByTestId('conversation-shelf-mentions-count').className).toContain('bg-primary');
  });

  it('selects', () => {
    const onSelect = vi.fn();
    render(<ConversationShelf items={[mentions]} onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('conversation-shelf-mentions'));
    expect(onSelect).toHaveBeenCalledWith('mentions');
  });

  it('marks the active destination', () => {
    render(<ConversationShelf items={[mentions]} activeId="mentions" onSelect={vi.fn()} />);
    expect(screen.getByTestId('conversation-shelf-mentions')).toHaveAttribute('data-active', 'true');
  });

  it('renders nothing at all when there is no shelf to draw', () => {
    const { container } = render(<ConversationShelf items={[]} onSelect={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('a mention on a conversation row', () => {
  const row = {
    channel: 'general',
    kind: 'channel' as const,
    name: 'general',
    peers: [],
    unreadCount: 40,
    mentioned: true,
  };

  // "40 unread" and "one of them is about you" are different facts. Collapsing
  // them into one number is how a mention gets lost in a busy channel.
  it('shows the mention marker ALONGSIDE the unread count', () => {
    render(<ConversationList items={[row]} onSelect={vi.fn()} />);
    expect(screen.getByTestId('conversation-mention')).toBeInTheDocument();
    expect(screen.getByTestId('conversation-unread')).toHaveTextContent('40');
  });

  it('shows no marker when nobody named you', () => {
    render(<ConversationList items={[{ ...row, mentioned: false }]} onSelect={vi.fn()} />);
    expect(screen.queryByTestId('conversation-mention')).toBeNull();
  });

  // A glyph needs a name for anyone not looking at it.
  it('names the marker for assistive tech', () => {
    render(<ConversationList items={[row]} onSelect={vi.fn()} />);
    expect(screen.getByLabelText('You were mentioned')).toBeInTheDocument();
  });
});

describe('grouping the rail', () => {
  const rows = [
    { channel: 'general', kind: 'channel' as const, name: 'general', peers: [] },
    { channel: 'chat:dm:a:b', peers: [{ userId: 'b', displayName: 'Bob' }] },
    { channel: 'room:asdf', kind: 'channel' as const, name: 'asdf', peers: [] },
  ];

  const sections = () =>
    screen.queryAllByTestId('conversation-section').map((e) => e.textContent);

  // A flat list mixing channels and people is scannable at four rows and not
  // at forty: they are different kinds of destination and the eye looks for
  // them in different places.
  it('splits channels from direct messages', () => {
    render(<ConversationList items={rows} onSelect={vi.fn()} grouped />);
    expect(sections()).toEqual(['Channels', 'Direct messages']);
  });

  it('puts every row under the right heading', () => {
    render(<ConversationList items={rows} onSelect={vi.fn()} grouped />);
    // One <ul> per group, each NAMED. The visible heading stays aria-hidden
    // because the list beside it already carries the same name — but the
    // boundary itself is now something an assistive technology can read,
    // which it was not when the heading was the only marker and was hidden.
    const channels = screen.getByRole('list', { name: 'Channels' });
    const directs = screen.getByRole('list', { name: 'Direct messages' });
    const channelsOf = (list: HTMLElement) =>
      [...list.querySelectorAll('[data-testid="conversation-row"]')].map((r) =>
        r.getAttribute('data-channel'),
      );
    expect(channelsOf(channels)).toEqual(['general', 'room:asdf']);
    expect(channelsOf(directs)).toEqual(['chat:dm:a:b']);
  });

  // A heading with nothing under it promises content that is not there.
  it('omits a heading whose group is empty', () => {
    render(<ConversationList items={[rows[1]]} onSelect={vi.fn()} grouped />);
    expect(sections()).toEqual(['Direct messages']);
  });

  // Existing callers — a compact sidebar, a call's people list — keep the
  // single run they were designed around.
  it('stays flat by default', () => {
    render(<ConversationList items={rows} onSelect={vi.fn()} />);
    expect(sections()).toEqual([]);
  });

  it('keeps ONE scroll container across the groups', () => {
    // The rule this was protecting is still the rule — a rail that scrolls
    // its channels and its DMs independently is two panes pretending to be
    // one. What changed is that the scroll container is now the wrapper
    // rather than the single <ul>, so each group can carry its own name.
    const { container } = render(<ConversationList items={rows} onSelect={vi.fn()} grouped />);
    const scrollers = [...container.querySelectorAll('*')].filter((el) =>
      el.className && typeof el.className === 'string' && el.className.includes('overflow-y-auto'),
    );
    expect(scrollers).toHaveLength(1);
    for (const list of screen.getAllByRole('list')) {
      expect(scrollers[0].contains(list)).toBe(true);
    }
  });
});
