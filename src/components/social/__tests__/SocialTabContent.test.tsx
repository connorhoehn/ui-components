// Two wrong answers rendered with total confidence in the chat sidebar:
//
//  * the Groups section header passed a hard-coded `count={0}`, so it read "0"
//    no matter how many groups were listed directly underneath it;
//  * an unread room's label used `text-surface-hover` — a SURFACE token — so
//    the rooms with something new in them were painted in the sidebar's own
//    background colour and were the only unreadable rows in the list.

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { RoomItem } from '../../../hooks/useRooms';

vi.mock('../../../hooks/useGroups', () => ({
  useGroups: () => ({
    groups: [],
    createGroup: vi.fn(), deleteGroup: vi.fn(), joinGroup: vi.fn(),
    leaveGroup: vi.fn(), inviteUser: vi.fn(), acceptInvite: vi.fn(),
    loadMembers: vi.fn(), members: [], loading: false, error: null,
  }),
}));
vi.mock('../../../hooks/useFriends', () => ({
  useFriends: () => ({
    followers: [], following: [], friends: [],
    follow: vi.fn(), unfollow: vi.fn(), loading: false, error: null,
  }),
}));
vi.mock('../../../hooks/usePosts', () => ({
  usePosts: () => ({
    posts: [], createPost: vi.fn(), editPost: vi.fn(), deletePost: vi.fn(),
    getUserPosts: vi.fn(), loading: false, mutating: false, error: null,
    hasMore: false, loadMore: vi.fn(),
  }),
}));

import SocialTabContent from '../SocialTabContent';

function room(over: Partial<RoomItem> = {}): RoomItem {
  return {
    roomId: 'r1',
    name: 'general',
    type: 'standalone',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...over,
  } as RoomItem;
}

/** Registers the WS handler so a test can push a `social:post` event. */
function makeOnMessage() {
  const handlers: ((m: Record<string, unknown>) => void)[] = [];
  const onMessage = (h: (m: never) => void) => {
    handlers.push(h as (m: Record<string, unknown>) => void);
    return () => {
      const i = handlers.indexOf(h as (m: Record<string, unknown>) => void);
      if (i >= 0) handlers.splice(i, 1);
    };
  };
  // Fan out to every live handler — StrictMode mounts the effect twice, and
  // the second mount's handler is the one still registered.
  const emit = (msg: Record<string, unknown>) => handlers.forEach(h => h(msg));
  return { onMessage: onMessage as never, emit };
}

function renderTab(rooms: RoomItem[], onMessage: never) {
  render(
    <SocialTabContent
      userId="alice"
      displayName="Ada Lovelace"
      userEmail="ada@example.com"
      connectionState="connected"
      idToken="tok"
      rooms={rooms}
      createRoom={vi.fn().mockResolvedValue(undefined)}
      createDM={vi.fn().mockResolvedValue(undefined)}
      createGroupRoom={vi.fn().mockResolvedValue(undefined)}
      roomsLoading={false}
      handleRoomSelect={vi.fn()}
      activeRoomId={null}
      activityEvents={[]}
      onMessage={onMessage}
    />,
  );
}

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('SocialTabContent sidebar headers', () => {
  it('does not print a made-up item count for the Groups section', () => {
    const { onMessage } = makeOnMessage();
    renderTab([room(), room({ roomId: 'r2', name: 'random' })], onMessage);

    const groupsHeader = screen.getByText('Groups').closest('button')!;
    // Channels genuinely knows its count and still shows it...
    const channelsHeader = screen.getByText('Channels').closest('button')!;
    expect(channelsHeader).toHaveTextContent('2');
    // ...Groups does not, so it shows nothing rather than "0".
    expect(groupsHeader.textContent).not.toMatch(/\d/);
  });
});

describe('SocialTabContent unread rooms', () => {
  it('paints an unread room label in a text colour, not a surface colour', async () => {
    const { onMessage, emit } = makeOnMessage();
    renderTab([room()], onMessage);

    const { act } = await import('@testing-library/react');
    act(() => {
      emit({ type: 'social:post', payload: { roomId: 'r1' } });
    });

    const row = screen.getByText('general').closest('button')!;
    expect(row.className).not.toMatch(/text-surface-hover/);
    expect(row.className).toMatch(/text-text-primary/);
    // ...and the unread badge itself renders.
    expect(row).toHaveTextContent('1');
  });
});
