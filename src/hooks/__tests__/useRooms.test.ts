import { renderHook, act, waitFor } from '@testing-library/react';
import { useRooms } from '../useRooms';
import type { RoomItem, RoomMemberItem } from '../useRooms';
import type { GatewayMessage } from '../../types/gateway';

// Stable toast mock — must not create a new fn() on every render or the
// useEffect dependency array sees a new reference each cycle → infinite loop.
const mockToast = vi.fn();
vi.mock('../../components/shared/ToastProvider', () => ({
  useToast: () => ({ toast: mockToast }),
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://api';
const TOKEN = 'tok-1';

const ROOM: RoomItem = {
  roomId: 'r1',
  channelId: 'ch1',
  name: 'General',
  type: 'standalone',
  ownerId: 'u1',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const MEMBER: RoomMemberItem = {
  roomId: 'r1',
  userId: 'u2',
  displayName: 'Bob',
  joinedAt: '2024-01-02T00:00:00.000Z',
};

beforeEach(() => {
  vi.stubEnv('VITE_PLATFORM_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function makeOnMessage() {
  let _handler: ((msg: GatewayMessage) => void) | null = null;
  return {
    onMessage: (handler: (msg: GatewayMessage) => void) => {
      _handler = handler;
      return () => { _handler = null; };
    },
    trigger: (msg: GatewayMessage) => { _handler?.(msg); },
  };
}

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

/**
 * The suite runs under React StrictMode, so mount effects fire twice and the
 * mutation's fetch is no longer at a fixed index. Select the call we actually
 * mean by its method (and optionally a URL fragment) instead of by position.
 */
function callWith(
  fetchMock: { mock: { calls: unknown[][] } },
  method: string,
  urlPart?: string,
): [string, RequestInit] {
  const call = fetchMock.mock.calls.find(
    (c) =>
      (c[1] as RequestInit | undefined)?.method === method &&
      (urlPart === undefined || String(c[0]).includes(urlPart)),
  );
  if (!call) {
    throw new Error(
      `no fetch call with method ${method}` +
        (urlPart ? ` and url containing ${urlPart}` : ''),
    );
  }
  return call as [string, RequestInit];
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches rooms and populates state', async () => {
    vi.stubGlobal('fetch', stubFetch({ rooms: [ROOM] }));
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.rooms).toHaveLength(1);
    expect(result.current.rooms[0].name).toBe('General');
    expect(result.current.error).toBeNull();
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = stubFetch({ rooms: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { onMessage } = makeOnMessage();
    renderHook(() => useRooms({ idToken: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/503/);
  });
});

// ---------------------------------------------------------------------------
// WS member events (no-op path only — active-room path covered by integration)
// ---------------------------------------------------------------------------

describe('WS member events', () => {
  it('ignores social:member_joined when no active room is set', async () => {
    vi.stubGlobal('fetch', stubFetch({ rooms: [] }));
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      trigger({
        type: 'social:member_joined',
        payload: { roomId: 'r1', userId: 'u2' },
      } as unknown as GatewayMessage);
    });

    // activeRoomRef.current is null — event should be ignored
    expect(result.current.members).toHaveLength(0);
  });

  it('ignores social:member_left when no active room is set', async () => {
    vi.stubGlobal('fetch', stubFetch({ rooms: [] }));
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      trigger({
        type: 'social:member_left',
        payload: { roomId: 'r1', userId: 'u2' },
      } as unknown as GatewayMessage);
    });

    expect(result.current.members).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// createRoom
// ---------------------------------------------------------------------------

describe('createRoom', () => {
  it('POSTs and prepends the new room', async () => {
    const fetchMock = stubFetch({ rooms: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200, json: () => Promise.resolve(ROOM),
    } as unknown as Response);

    await act(async () => { await result.current.createRoom('General'); });

    expect(result.current.rooms[0].name).toBe('General');
    const postCall = callWith(fetchMock, 'POST');
    expect(postCall[1].method).toBe('POST');
    expect(JSON.parse(postCall[1].body as string)).toEqual({ name: 'General' });
  });

  it('sets error and re-throws on failure', async () => {
    const fetchMock = stubFetch({ rooms: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.createRoom('x')).rejects.toThrow(/422/);
    });
    expect(result.current.error).toMatch(/422/);
  });
});

// ---------------------------------------------------------------------------
// leaveRoom
// ---------------------------------------------------------------------------

describe('leaveRoom', () => {
  it('DELETEs and removes room from list', async () => {
    const fetchMock = stubFetch({ rooms: [ROOM] });
    vi.stubGlobal('fetch', fetchMock);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.leaveRoom('r1'); });

    expect(result.current.rooms).toHaveLength(0);
    const leaveCall = callWith(fetchMock, 'DELETE');
    expect(leaveCall[0]).toContain('/api/rooms/r1/leave');
    expect(leaveCall[1].method).toBe('DELETE');
  });

  it('sets error on failure', async () => {
    const fetchMock = stubFetch({ rooms: [ROOM] });
    vi.stubGlobal('fetch', fetchMock);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.leaveRoom('r1'); });

    expect(result.current.error).toMatch(/404/);
    expect(result.current.rooms).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// loadMembers
// ---------------------------------------------------------------------------

describe('loadMembers', () => {
  it('fetches and sets the members list', async () => {
    const fetchMock = stubFetch({ rooms: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: TOKEN, onMessage }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200, json: () => Promise.resolve({ members: [MEMBER] }),
    } as unknown as Response);

    await act(async () => { await result.current.loadMembers('r1'); });

    expect(result.current.members).toHaveLength(1);
    expect(result.current.members[0].userId).toBe('u2');
  });

  it('is a no-op when idToken is null', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useRooms({ idToken: null, onMessage }));

    act(() => { void result.current.loadMembers('r1'); });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
