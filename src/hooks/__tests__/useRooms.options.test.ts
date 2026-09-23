import { renderHook, act, waitFor } from '@testing-library/react';
import { useRooms } from '../useRooms';
import { setApiBaseUrl } from '../../lib/apiBaseUrl';

// No ToastProvider mock: the hook must run without one (2.359.0).

const noMessages = () => () => {};

afterEach(() => {
  setApiBaseUrl(null);
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  const fetchMock = vi.fn().mockResolvedValue({ ok, status, json: () => Promise.resolve(body) });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('useRooms without the library env or providers', () => {
  it('hydrates from the baseUrl option, with no ToastProvider above it', async () => {
    const fetchMock = stubFetch({ rooms: [] });
    renderHook(() => useRooms({ idToken: 'tok', onMessage: noMessages, baseUrl: 'https://consumer.example' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('https://consumer.example/api/rooms');
  });

  it('falls back to setApiBaseUrl', async () => {
    setApiBaseUrl('https://booted.example');
    const fetchMock = stubFetch({ rooms: [] });
    renderHook(() => useRooms({ idToken: 'tok', onMessage: noMessages }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(fetchMock.mock.calls[0][0]).toBe('https://booted.example/api/rooms');
  });

  it('survives a failed hydrate without a toast provider', async () => {
    stubFetch({}, false, 500);
    const { result } = renderHook(() => useRooms({ idToken: 'tok', onMessage: noMessages, baseUrl: 'http://api' }));
    await waitFor(() => expect(result.current.loadError).toBe('Failed to load rooms (500)'));
  });
});

describe('channelId', () => {
  it('derives room:<slug> for a hydrated room the API sent without one', async () => {
    stubFetch({ rooms: [
      { roomId: 'r1', slug: 'standup', name: 'Standup', type: 'standalone', ownerId: 'u1', createdAt: '2024-01-01T00:00:00.000Z' },
      { roomId: 'r2', name: 'No slug', type: 'standalone', ownerId: 'u1', createdAt: '2024-01-01T00:00:00.000Z' },
      { roomId: 'r3', channelId: 'dm:a:b', name: 'DM', type: 'dm', ownerId: 'u1', createdAt: '2024-01-01T00:00:00.000Z' },
    ] });
    const { result } = renderHook(() => useRooms({ idToken: 'tok', onMessage: noMessages, baseUrl: 'http://api' }));
    await waitFor(() => expect(result.current.rooms).toHaveLength(3));
    expect(result.current.rooms.map((room) => room.channelId)).toEqual(['room:standup', 'r2', 'dm:a:b']);
  });
});

describe('create* resolve with the room', () => {
  it('createRoom returns the created room with its channelId', async () => {
    const fetchMock = stubFetch({ rooms: [] });
    const { result } = renderHook(() => useRooms({ idToken: 'tok', onMessage: noMessages, baseUrl: 'http://api' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    fetchMock.mockResolvedValueOnce({ ok: true, status: 201, json: () => Promise.resolve({ roomId: 'r9', slug: 'retro', name: 'Retro', type: 'standalone', ownerId: 'u1', createdAt: '2024-01-01T00:00:00.000Z' }) });
    let created: unknown;
    await act(async () => { created = await result.current.createRoom('Retro'); });
    expect(created).toMatchObject({ roomId: 'r9', channelId: 'room:retro' });
    expect(result.current.rooms[0].channelId).toBe('room:retro');
  });

  it('createDM rejects instead of silently doing nothing without a token', async () => {
    const { result } = renderHook(() => useRooms({ idToken: null, onMessage: noMessages, baseUrl: 'http://api' }));
    await expect(result.current.createDM('u2')).rejects.toThrow('Social API not configured');
  });
});

describe('joinRoom', () => {
  it('refuses an empty id and encodes a real one', async () => {
    const fetchMock = stubFetch({ rooms: [] });
    const { result } = renderHook(() => useRooms({ idToken: 'tok', onMessage: noMessages, baseUrl: 'http://api' }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    const hydrated = fetchMock.mock.calls.length;
    await act(async () => { await result.current.joinRoom(''); });
    expect(result.current.error).toBe('joinRoom called with empty roomId');
    expect(fetchMock.mock.calls.length).toBe(hydrated);
    await act(async () => { await result.current.joinRoom('a/b'); });
    expect(fetchMock.mock.calls.at(-1)?.[0]).toBe('http://api/api/rooms/a%2Fb/join');
  });
});
