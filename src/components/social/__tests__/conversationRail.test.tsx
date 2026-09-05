import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConversationRail } from '../ConversationRail';
import type { ConversationItem } from '../ConversationList';

afterEach(cleanup);

const channel = (name: string): ConversationItem => ({
  channel: name, kind: 'channel', name, peers: [],
});
const dm = (userId: string, displayName: string): ConversationItem => ({
  channel: `chat:dm:${userId}`, kind: 'dm', peers: [{ userId, displayName }],
});

const CONVERSATIONS = [channel('general'), dm('dev-dave', 'Dave Williams')];
const SHELF = [{ id: 'mentions', label: 'Mentions', icon: '@', count: 3, urgent: true }];

function setup(props: Partial<React.ComponentProps<typeof ConversationRail>> = {}) {
  const onSelect = vi.fn();
  render(
    <ConversationRail
      shelf={SHELF}
      conversations={CONVERSATIONS}
      onSelect={onSelect}
      {...props}
    />,
  );
  return { onSelect };
}

describe('ConversationRail selection', () => {
  it('reports a shelf pick and a conversation pick through the same callback', () => {
    const { onSelect } = setup();

    fireEvent.click(screen.getByTestId('conversation-rail-shelf-mentions'));
    expect(onSelect).toHaveBeenCalledWith({ kind: 'shelf', id: 'mentions' });

    fireEvent.click(screen.getAllByTestId('conversation-row')[0]);
    expect(onSelect).toHaveBeenLastCalledWith({ kind: 'conversation', channel: 'general' });
  });

  // The whole reason this component exists: two highlighted rows and one pane
  // is the failure every hand-wired rail eventually ships.
  it('highlights nothing in the list while the shelf is selected', () => {
    setup({ selected: { kind: 'shelf', id: 'mentions' } });

    expect(screen.getByTestId('conversation-rail-shelf-mentions'))
      .toHaveAttribute('data-active', 'true');
    const list = screen.getByTestId('conversation-rail-list');
    expect(within(list).queryByRole('button', { current: true })).toBeNull();
  });

  it('highlights nothing on the shelf while a conversation is open', () => {
    setup({ selected: { kind: 'conversation', channel: 'general' } });

    expect(screen.getByTestId('conversation-rail-shelf-mentions'))
      .toHaveAttribute('data-active', 'false');
  });

  it('highlights neither when nothing is open', () => {
    setup({ selected: null });
    expect(screen.getByTestId('conversation-rail-shelf-mentions'))
      .toHaveAttribute('data-active', 'false');
    const list = screen.getByTestId('conversation-rail-list');
    expect(within(list).queryByRole('button', { current: true })).toBeNull();
  });
});

describe('ConversationRail composition', () => {
  // An empty strip above the list is chrome that explains nothing.
  it('renders no shelf when there are no fixed destinations', () => {
    setup({ shelf: [] });
    expect(screen.queryByTestId('conversation-rail-shelf')).toBeNull();
  });

  it('groups channels and people by default, unlike the bare list', () => {
    setup();
    expect(screen.getByText('Channels')).toBeInTheDocument();
    expect(screen.getByText('Direct messages')).toBeInTheDocument();
  });

  it('can be flattened for a host that wants one run of rows', () => {
    setup({ grouped: false });
    expect(screen.queryByText('Channels')).toBeNull();
  });

  it('places host chrome above the shelf and below the list', () => {
    setup({ header: <div>Acme workspace</div>, footer: <div>Signed in as Grace</div> });
    const rail = screen.getByTestId('conversation-rail');
    const order = Array.from(rail.children).map((el) => el.getAttribute('data-testid') ?? el.textContent);
    expect(order).toEqual([
      'Acme workspace',
      'conversation-rail-shelf',
      'conversation-rail-list',
      'Signed in as Grace',
    ]);
  });

  it('offers a new chat only when the host can start one', () => {
    setup();
    expect(screen.queryByTestId('conversation-new-chat')).toBeNull();

    cleanup();
    const onNewChat = vi.fn();
    setup({ onNewChat });
    fireEvent.click(screen.getByTestId('conversation-new-chat'));
    expect(onNewChat).toHaveBeenCalled();
  });
});
