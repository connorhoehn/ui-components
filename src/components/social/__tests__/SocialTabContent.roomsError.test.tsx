// `roomsError` reached only the nested `RoomList`, which is rendered with
// `rooms={[]}` and only while the "Add channel" form is open.
//
// So a failed `GET /api/rooms` painted the sidebar as "Channels 0 / No channels
// yet" and "Direct Messages 0 / No conversations yet" — the app telling a user
// with twenty channels that they belong to none, on the strength of a request
// that never succeeded. Nothing on screen suggested retrying.

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { RoomItem } from '../../../hooks/useRooms';

vi.mock('../../../hooks/useGroups', () => ({
  useGroups: () => ({
    groups: [],
    createGroup: vi.fn(), deleteGroup: vi.fn(), joinGroup: vi.fn(),
    leaveGroup: vi.fn(), inviteUser: vi.fn(), acceptInvite: vi.fn(),
    loadMembers: vi.fn(), members: [], loading: false, error: null,
    loadError: null, loaded: true, refresh: vi.fn(),
  }),
}));
vi.mock('../../../hooks/useFriends', () => ({
  useFriends: () => ({
    followers: [], following: [], friends: [],
    follow: vi.fn(), unfollow: vi.fn(), loading: false, error: null, loadError: null,
  }),
}));
vi.mock('../../../hooks/usePosts', () => ({
  usePosts: () => ({
    posts: [], createPost: vi.fn(), editPost: vi.fn(), deletePost: vi.fn(),
    getUserPosts: vi.fn(), loading: false, mutating: false, error: null,
    loadError: null, hasMore: false, loadMore: vi.fn(),
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

function renderTab(over: { rooms?: RoomItem[]; roomsError?: string | null; roomsLoading?: boolean } = {}) {
  render(
    <SocialTabContent
      userId="alice"
      displayName="Ada Lovelace"
      userEmail="ada@example.com"
      connectionState="connected"
      idToken="tok"
      rooms={over.rooms ?? []}
      createRoom={vi.fn().mockResolvedValue(undefined)}
      createDM={vi.fn().mockResolvedValue(undefined)}
      createGroupRoom={vi.fn().mockResolvedValue(undefined)}
      roomsLoading={over.roomsLoading ?? false}
      roomsError={over.roomsError ?? null}
      handleRoomSelect={vi.fn()}
      activeRoomId={null}
      activityEvents={[]}
      onMessage={(() => () => {}) as never}
    />,
  );
}

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('SocialTabContent — rooms load failure', () => {
  it('does not claim the user has no channels when the rooms fetch failed', () => {
    renderTab({ roomsError: 'Failed to load rooms (503)' });

    expect(screen.getByTestId('channels-error')).toHaveTextContent(/Couldn.t load channels/);
    expect(screen.queryByText('No channels yet')).toBeNull();
  });

  it('does not claim the user has no conversations when the rooms fetch failed', () => {
    renderTab({ roomsError: 'Failed to load rooms (503)' });

    expect(screen.getByTestId('dms-error')).toHaveTextContent(/Couldn.t load conversations/);
    expect(screen.queryByText('No conversations yet')).toBeNull();
  });

  it('prints no section count it never read', () => {
    renderTab({ roomsError: 'Failed to load rooms (503)' });

    const channels = screen.getByText('Channels').closest('button')!;
    const dms = screen.getByText('Direct Messages').closest('button')!;
    expect(channels.textContent).not.toMatch(/\d/);
    expect(dms.textContent).not.toMatch(/\d/);
  });

  it('still shows the genuine empty states when the fetch succeeded and returned nothing', () => {
    renderTab({ rooms: [], roomsError: null });

    expect(screen.getByText('No channels yet')).toBeInTheDocument();
    expect(screen.getByText('No conversations yet')).toBeInTheDocument();
    expect(screen.queryByTestId('channels-error')).toBeNull();
    expect(screen.queryByTestId('dms-error')).toBeNull();
  });

  it('keeps showing the rooms it has even if a later refresh errored', () => {
    renderTab({ rooms: [room()], roomsError: 'Failed to load rooms (500)' });

    expect(screen.getByText('general')).toBeInTheDocument();
    expect(screen.queryByTestId('channels-error')).toBeNull();
  });
});
