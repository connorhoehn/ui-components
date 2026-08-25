// Three separate ways the rooms hook lied about which room you were in.
//
//  1. `loadMembers` had no request guard. `setActiveRoom` fires it on every
//     switch and the responses are not ordered, so switching A -> B while A's
//     /members call was in flight let A land last and repaint room B's
//     participant list with room A's members.
//  2. `setActiveRoom(null)` cleared `activeRoom` but not `members`, so closing
//     a room left its roster listed beside "Select a room".
//  3. `leaveRoom` dropped the room from `rooms` but left `activeRoom` pointing
//     at it — the room vanished from the sidebar and stayed open in the pane.
//
//  4. …and `error` doubled as the load error, so `RoomList` — which renders
//     "Couldn't load rooms" + Retry off it — blamed the read for a refused
//     create. `loadError` carries the hydrate alone.

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRooms } from '../useRooms';
import type { RoomItem } from '../useRooms';

const mockToast = vi.fn();
vi.mock('../../components/shared/ToastProvider', () => ({
  useToast: () => ({ toast: mockToast }),
}));

const BASE = 'http://api';

const ROOM_A: RoomItem = {
  roomId: 'a', channelId: 'ch-a', name: 'Alpha', type: 'standalone',
  ownerId: 'u1', createdAt: '2026-01-01T00:00:00.000Z',
};
const ROOM_B: RoomItem = { ...ROOM_A, roomId: 'b', channelId: 'ch-b', name: 'Beta' };

beforeEach(() => {
  vi.stubEnv('VITE_PLATFORM_API_URL', BASE);
  mockToast.mockClear();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const noop = () => () => {};

function mount() {
  return renderHook(() => useRooms({ idToken: 'tok', onMessage: noop }));
}

describe('useRooms member-list races', () => {
  it('does not let a superseded room\'s members overwrite the current room\'s', async () => {
    // Room A's /members resolves LAST, as a slow response would. The gates are
    // created up front, not inside `json()`, so releasing them never races the
    // microtask that calls it.
    const gates: Record<string, { promise: Promise<unknown>; release: (v: unknown) => void }> = {};
    for (const id of ['a', 'b']) {
      let release!: (v: unknown) => void;
      const promise = new Promise<unknown>((resolve) => { release = resolve; });
      gates[id] = { promise, release };
    }
    vi.stubGlobal('fetch', vi.fn((url: string) => {
      if (/\/rooms$/.test(url)) {
        return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ rooms: [ROOM_A, ROOM_B] }) });
      }
      const roomId = /\/rooms\/([^/]+)\/members/.exec(url)![1];
      return Promise.resolve({ ok: true, status: 200, json: () => gates[roomId].promise });
    }));

    const { result } = mount();
    await waitFor(() => expect(result.current.rooms).toHaveLength(2));

    act(() => result.current.setActiveRoom(ROOM_A));
    act(() => result.current.setActiveRoom(ROOM_B));

    // B answers first, then the stale A response arrives.
    await act(async () => {
      gates.b.release({ members: [{ roomId: 'b', userId: 'in-beta', joinedAt: 'x' }] });
      await gates.b.promise;
    });
    await act(async () => {
      gates.a.release({ members: [{ roomId: 'a', userId: 'in-alpha', joinedAt: 'x' }] });
      await gates.a.promise;
    });

    expect(result.current.members.map(m => m.userId)).toEqual(['in-beta']);
  });

  it('clears the member list when the active room is closed', async () => {
    vi.stubGlobal('fetch', vi.fn((url: string) => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(
        /\/members$/.test(url)
          ? { members: [{ roomId: 'a', userId: 'in-alpha', joinedAt: 'x' }] }
          : { rooms: [ROOM_A] },
      ),
    })));

    const { result } = mount();
    await waitFor(() => expect(result.current.rooms).toHaveLength(1));

    await act(async () => { result.current.setActiveRoom(ROOM_A); });
    await waitFor(() => expect(result.current.members).toHaveLength(1));

    act(() => result.current.setActiveRoom(null));
    expect(result.current.members).toEqual([]);
  });

  it('drops the active room when you leave the room you are in', async () => {
    vi.stubGlobal('fetch', vi.fn((url: string) => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(
        /\/members$/.test(url)
          ? { members: [{ roomId: 'a', userId: 'in-alpha', joinedAt: 'x' }] }
          : { rooms: [ROOM_A, ROOM_B] },
      ),
    })));

    const { result } = mount();
    await waitFor(() => expect(result.current.rooms).toHaveLength(2));
    await act(async () => { result.current.setActiveRoom(ROOM_A); });
    await waitFor(() => expect(result.current.members).toHaveLength(1));

    await act(async () => { await result.current.leaveRoom('a'); });

    expect(result.current.rooms.map(r => r.roomId)).toEqual(['b']);
    expect(result.current.activeRoom).toBeNull();
    expect(result.current.members).toEqual([]);
  });

  it('leaves a room you are NOT in without closing the one you are', async () => {
    vi.stubGlobal('fetch', vi.fn((url: string) => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(
        /\/members$/.test(url) ? { members: [] } : { rooms: [ROOM_A, ROOM_B] },
      ),
    })));

    const { result } = mount();
    await waitFor(() => expect(result.current.rooms).toHaveLength(2));
    await act(async () => { result.current.setActiveRoom(ROOM_A); });

    await act(async () => { await result.current.leaveRoom('b'); });

    expect(result.current.activeRoom?.roomId).toBe('a');
  });
});

describe('useRooms load vs mutation failure', () => {
  it('sets loadError when the rooms hydrate fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 503, json: () => Promise.resolve({}),
    })));

    const { result } = mount();
    await waitFor(() => expect(result.current.loadError).toMatch(/503/));
  });

  it('leaves loadError null when only createRoom fails', async () => {
    vi.stubGlobal('fetch', vi.fn((url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ rooms: [] }) });
    }));

    const { result } = mount();
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await expect(result.current.createRoom('new')).rejects.toThrow();
    });

    expect(result.current.error).toMatch(/Failed to create room/);
    // The list loaded fine — `RoomList` must not offer to re-fetch it.
    expect(result.current.loadError).toBeNull();
  });
});
