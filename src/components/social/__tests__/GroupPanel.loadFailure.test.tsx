// `useGroups` returns an `error` that GroupPanel never destructured, so a
// failed groups load rendered as "No groups yet — Create a group or join a
// public one": an outage told to the user as a fact about their memberships.
// The full-size body had no `loading` branch at all either, so that same copy
// flashed up during every ordinary fetch.
//
// `createGroupRoom` was the other silent path: awaited with no `catch`, so a
// rejection produced an unhandled promise rejection and nothing on screen.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseGroupsReturn, GroupItem } from '../../../hooks/useGroups';
import type { RoomItem } from '../../../hooks/useRooms';

const useGroupsMock = vi.fn<() => UseGroupsReturn>();
vi.mock('../../../hooks/useGroups', () => ({ useGroups: () => useGroupsMock() }));

import { GroupPanel } from '../GroupPanel';

function tokenFor(sub: string): string {
  return `h.${btoa(JSON.stringify({ sub }))}.s`;
}

function makeGroup(over: Partial<GroupItem> = {}): GroupItem {
  return {
    groupId: 'g1',
    name: 'Platform',
    ownerId: 'alice',
    visibility: 'public',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...over,
  } as GroupItem;
}

function makeGroups(over: Partial<UseGroupsReturn> = {}): UseGroupsReturn {
  return {
    groups: [],
    createGroup: vi.fn().mockResolvedValue(undefined),
    deleteGroup: vi.fn().mockResolvedValue(undefined),
    joinGroup: vi.fn().mockResolvedValue(undefined),
    leaveGroup: vi.fn().mockResolvedValue(undefined),
    inviteUser: vi.fn().mockResolvedValue(undefined),
    acceptInvite: vi.fn().mockResolvedValue(undefined),
    loadMembers: vi.fn().mockResolvedValue(undefined),
    members: [],
    loading: false,
    error: null,
    // The load-state trio the reworked hook now owns. `error` above is the
    // pre-existing mutation error and is deliberately kept separate: a failed
    // "create group" must not render as a failed list load.
    loaded: true,
    loadError: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

function renderPanel(
  hook: UseGroupsReturn,
  over: Partial<Parameters<typeof GroupPanel>[0]> = {},
) {
  useGroupsMock.mockReturnValue(hook);
  render(
    <GroupPanel
      idToken={tokenFor('alice')}
      rooms={[] as RoomItem[]}
      createGroupRoom={vi.fn().mockResolvedValue(undefined)}
      roomsLoading={false}
      {...over}
    />,
  );
}

beforeEach(() => useGroupsMock.mockReset());

describe('GroupPanel — failed groups load', () => {
  it('full-size: reports the failure instead of "No groups yet"', () => {
    // `loadError`, not `error`. The hook keeps them apart on purpose: `error`
    // is a failed mutation (create/invite/delete), and writing that into the
    // list's failure branch would blank a list that had loaded perfectly well.
    renderPanel(makeGroups({ loaded: true, loadError: 'Failed to load groups (503)' }));

    expect(screen.queryByText('No groups yet')).toBeNull();
    expect(screen.getByRole('alert')).toHaveTextContent(/Couldn’t load groups/);
    expect(screen.getByText(/503/)).toBeInTheDocument();
  });

  it('compact: reports the failure instead of "No groups yet"', () => {
    renderPanel(makeGroups({ loaded: true, loadError: 'Failed to load groups (503)' }), { compact: true });

    expect(screen.queryByText('No groups yet')).toBeNull();
    expect(screen.getByRole('alert')).toHaveTextContent(/503/);
  });

  it('full-size: shows a loading line rather than the empty state while fetching', () => {
    // Pending == not yet loaded and no load error, which is what the panel
    // derives `listPending` from. `loading` alone is the mutation flag.
    renderPanel(makeGroups({ loaded: false, loadError: null }));

    expect(screen.getByText('Loading groups…')).toBeInTheDocument();
    expect(screen.queryByText('No groups yet')).toBeNull();
  });

  it('still says "No groups yet" when the load succeeded and there are none', () => {
    renderPanel(makeGroups());

    expect(screen.getByText('No groups yet')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

describe('GroupPanel — failed group-room create', () => {
  it('full-size: keeps the form open and says why', async () => {
    const group = makeGroup();
    renderPanel(makeGroups({ groups: [group] }), {
      createGroupRoom: vi.fn().mockRejectedValue(new Error('Room limit reached')),
    });

    fireEvent.click(screen.getByRole('button', { name: /Select group Platform/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Create Room' }));
    fireEvent.change(screen.getByPlaceholderText('Room name'), { target: { value: 'builds' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Room' }));

    expect(await screen.findByTestId('group-room-error')).toHaveTextContent('Room limit reached');
    expect((screen.getByPlaceholderText('Room name') as HTMLInputElement).value).toBe('builds');
  });

  it('compact: keeps the form open and says why', async () => {
    const group = makeGroup();
    renderPanel(makeGroups({ groups: [group] }), {
      compact: true,
      createGroupRoom: vi.fn().mockRejectedValue(new Error('Room limit reached')),
    });

    fireEvent.click(screen.getByRole('button', { name: /Platform/ }));
    fireEvent.click(screen.getByRole('button', { name: '+ Room' }));
    fireEvent.change(screen.getByPlaceholderText('Room name'), { target: { value: 'builds' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(await screen.findByTestId('compact-group-room-error')).toHaveTextContent('Room limit reached');
    expect((screen.getByPlaceholderText('Room name') as HTMLInputElement).value).toBe('builds');
  });
});
