import { renderHook, act } from '@testing-library/react';
import { usePresence } from '../usePresence';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const CHANNEL = 'channel-1';
const DISPLAY_NAME = 'Alice';

const USER_A = { clientId: 'c1', status: 'online', metadata: { displayName: 'Alice' } };
const USER_B = { clientId: 'c2', status: 'online', metadata: { displayName: 'Bob' } };

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function makeWs() {
  let _handler: ((msg: GatewayMessage) => void) | null = null;
  const sendMessage = vi.fn();
  return {
    sendMessage,
    onMessage: (handler: (msg: GatewayMessage) => void) => {
      _handler = handler;
      return () => { _handler = null; };
    },
    trigger: (msg: GatewayMessage) => { _handler?.(msg); },
  };
}

function presenceMsg(action: string, extra: Record<string, unknown> = {}) {
  return { type: 'presence', action, ...extra } as unknown as GatewayMessage;
}

function defaultOpts(ws: ReturnType<typeof makeWs>) {
  return {
    sendMessage: ws.sendMessage,
    onMessage: ws.onMessage,
    currentChannel: CHANNEL,
    connectionState: 'connected' as const,
    displayName: DISPLAY_NAME,
  };
}

// ---------------------------------------------------------------------------
// Subscribe / unsubscribe lifecycle
// ---------------------------------------------------------------------------

describe('subscribe lifecycle', () => {
  it('sends subscribe + set(online) when connected with a channel', () => {
    const ws = makeWs();
    renderHook(() => usePresence(defaultOpts(ws)));

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'presence', action: 'subscribe', channel: CHANNEL }),
    );
    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'presence', action: 'set', status: 'online' }),
    );
  });

  it('does not subscribe when connectionState is not connected', () => {
    const ws = makeWs();
    renderHook(() =>
      usePresence({ ...defaultOpts(ws), connectionState: 'disconnected' }),
    );
    expect(ws.sendMessage).not.toHaveBeenCalled();
  });

  it('does not subscribe when currentChannel is empty', () => {
    const ws = makeWs();
    renderHook(() =>
      usePresence({ ...defaultOpts(ws), currentChannel: '' }),
    );
    expect(ws.sendMessage).not.toHaveBeenCalled();
  });

  it('sends unsubscribe and clears users on channel change', () => {
    const ws = makeWs();
    // Seed a user via subscribed event
    const { result, rerender } = renderHook(
      ({ channel }: { channel: string }) =>
        usePresence({ ...defaultOpts(ws), currentChannel: channel }),
      { initialProps: { channel: CHANNEL } },
    );

    act(() => {
      ws.trigger(presenceMsg('subscribed', { presence: [USER_A] }));
    });
    expect(result.current.users).toHaveLength(1);

    ws.sendMessage.mockClear();
    act(() => { rerender({ channel: 'channel-2' }); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'unsubscribe', channel: CHANNEL }),
    );
    expect(result.current.users).toHaveLength(0);
  });

  it('fires heartbeat every 30 seconds', () => {
    const ws = makeWs();
    renderHook(() => usePresence(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { vi.advanceTimersByTime(30_001); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'presence', action: 'heartbeat' }),
    );
  });
});

// ---------------------------------------------------------------------------
// Incoming presence messages
// ---------------------------------------------------------------------------

describe('presence WS messages', () => {
  it('subscribed: populates user list from server', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));

    act(() => {
      ws.trigger(presenceMsg('subscribed', { presence: [USER_A, USER_B] }));
    });

    expect(result.current.users).toHaveLength(2);
    expect(result.current.users.map((u) => u.clientId)).toContain('c1');
    expect(result.current.users.map((u) => u.clientId)).toContain('c2');
  });

  it('update: adds a new user to the list', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));

    act(() => {
      ws.trigger(presenceMsg('update', {
        presence: { clientId: 'c3', status: 'online', metadata: {} },
      }));
    });

    expect(result.current.users.some((u) => u.clientId === 'c3')).toBe(true);
  });

  it('update: updates existing user status', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));

    act(() => { ws.trigger(presenceMsg('subscribed', { presence: [USER_A] })); });
    act(() => {
      ws.trigger(presenceMsg('update', {
        presence: { clientId: 'c1', status: 'typing', metadata: {} },
      }));
    });

    const alice = result.current.users.find((u) => u.clientId === 'c1');
    expect(alice?.status).toBe('typing');
    expect(result.current.users).toHaveLength(1); // no duplicate
  });

  it('offline: removes a user from the list', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));

    act(() => { ws.trigger(presenceMsg('subscribed', { presence: [USER_A, USER_B] })); });
    act(() => { ws.trigger({ type: 'presence', action: 'offline', clientId: 'c1' } as unknown as GatewayMessage); });

    expect(result.current.users.some((u) => u.clientId === 'c1')).toBe(false);
    expect(result.current.users).toHaveLength(1);
  });

  it('ignores non-presence WS message types', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));

    act(() => {
      ws.trigger({ type: 'chat', action: 'update' } as unknown as GatewayMessage);
    });

    expect(result.current.users).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// setTyping
// ---------------------------------------------------------------------------

describe('setTyping', () => {
  it('setTyping(true) sends typing status', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { result.current.setTyping(true); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'set', status: 'typing' }),
    );
  });

  it('setTyping(true) auto-clears to online after 2000ms', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { result.current.setTyping(true); });
    act(() => { vi.advanceTimersByTime(2001); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'set', status: 'online' }),
    );
  });

  it('setTyping(false) sends online status and cancels pending timer', () => {
    const ws = makeWs();
    const { result } = renderHook(() => usePresence(defaultOpts(ws)));

    act(() => { result.current.setTyping(true); });
    ws.sendMessage.mockClear();
    act(() => { result.current.setTyping(false); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'set', status: 'online' }),
    );

    // Timer should be cancelled — no extra call after 2s
    ws.sendMessage.mockClear();
    act(() => { vi.advanceTimersByTime(2001); });
    expect(ws.sendMessage).not.toHaveBeenCalled();
  });
});
