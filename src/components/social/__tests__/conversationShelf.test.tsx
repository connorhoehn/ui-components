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
