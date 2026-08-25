// RoomList drops `useFriends`' error on the floor no more.
//
// `useFriends` returns `friends: []` when the follow-graph fetch fails, and
// the DM picker rendered that as "No mutual friends yet" — the app stating a
// fact about the user's social graph it had never successfully read. A user
// with fifty friends and an expired token was told they had none.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseFriendsReturn, PublicProfile } from '../../../hooks/useFriends';
import type { RoomItem } from '../../../hooks/useRooms';

const useFriendsMock = vi.fn<() => UseFriendsReturn>();
vi.mock('../../../hooks/useFriends', () => ({ useFriends: () => useFriendsMock() }));

import { RoomList } from '../RoomList';

function makeFriends(over: Partial<UseFriendsReturn> = {}): UseFriendsReturn {
  return {
    followers: [],
    following: [],
    friends: [],
    follow: vi.fn().mockResolvedValue(undefined),
    unfollow: vi.fn().mockResolvedValue(undefined),
    loading: false,
    error: null,
    loadError: null,
    ...over,
  };
}

function renderList(over: Partial<Parameters<typeof RoomList>[0]> = {}) {
  render(
    <RoomList
      idToken="tok"
      rooms={[] as RoomItem[]}
      createRoom={vi.fn().mockResolvedValue(undefined)}
      createDM={vi.fn().mockResolvedValue(undefined)}
      loading={false}
      onRoomSelect={vi.fn()}
      {...over}
    />,
  );
}

function openDmPicker() {
  fireEvent.click(screen.getByRole('button', { name: /New DM/i }));
}

beforeEach(() => useFriendsMock.mockReset());

describe('RoomList DM picker — follow-graph failure', () => {
  it('does not claim the user has no friends when the graph failed to load', () => {
    useFriendsMock.mockReturnValue(
      // `loadError`, not `error`: `error` also carries follow/unfollow
      // failures, which say nothing about whether `friends` was ever read.
      makeFriends({ error: 'Failed to load friends (500)', loadError: 'Failed to load friends (500)' }),
    );
    renderList();
    openDmPicker();

    expect(screen.queryByText('No mutual friends yet')).toBeNull();
    expect(screen.getByText(/Couldn't load your friends/)).toBeInTheDocument();
    expect(screen.getByTestId('dm-friends-error')).toHaveTextContent(/500/);
  });

  it('still says "no mutual friends" when the graph loaded and is genuinely empty', () => {
    useFriendsMock.mockReturnValue(makeFriends());
    renderList();
    openDmPicker();

    expect(screen.getByText('No mutual friends yet')).toBeInTheDocument();
    expect(screen.queryByTestId('dm-friends-error')).toBeNull();
  });

  it('shows the friends it does have even if a later refresh errored', () => {
    const friend: PublicProfile = { userId: 'u2', displayName: 'Grace', visibility: 'public' };
    useFriendsMock.mockReturnValue(makeFriends({ friends: [friend], error: 'stale refresh failed' }));
    renderList();
    openDmPicker();

    expect(screen.getByRole('option', { name: 'Grace' })).toBeInTheDocument();
    // The list is usable, so don't shout an error over it.
    expect(screen.queryByTestId('dm-friends-error')).toBeNull();
  });
});
