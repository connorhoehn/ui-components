import { renderHook, act } from '@testing-library/react';
import { useWebSocket } from '../useWebSocket';
import type { GatewayConfig } from '../../types/gateway';

// ---------------------------------------------------------------------------
// MockWebSocket
// ---------------------------------------------------------------------------

class MockWebSocket {
  static CONNECTING = 0; static OPEN = 1; static CLOSING = 2; static CLOSED = 3;
  static instances: MockWebSocket[] = [];

  readyState = MockWebSocket.CONNECTING;
  onopen: ((ev: Event) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onclose: ((ev: CloseEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  send = vi.fn();
  close = vi.fn().mockImplementation(() => { this.readyState = MockWebSocket.CLOSED; });

  constructor(public url: string, public protocols?: string | string[]) {
    MockWebSocket.instances.push(this);
  }

  open() { this.readyState = MockWebSocket.OPEN; this.onopen?.(new Event('open')); }
  receive(data: unknown) {
    const raw = typeof data === 'string' ? data : JSON.stringify(data);
    this.onmessage?.(new MessageEvent('message', { data: raw }));
  }
  serverClose() { this.readyState = MockWebSocket.CLOSED; this.onclose?.(new CloseEvent('close')); }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CONFIG: GatewayConfig = { wsUrl: 'ws://gw', cognitoToken: 'ct', defaultChannel: 'default' };

function opts(overrides: Partial<Parameters<typeof useWebSocket>[0]> = {}) {
  return { config: CONFIG, ...overrides };
}

function ws() { return MockWebSocket.instances[MockWebSocket.instances.length - 1]; }

/**
 * `MockWebSocket.instances` is an append-only log of every socket ever
 * constructed, so its length is not "how many connections exist" — the suite
 * runs under StrictMode, where the mount effect runs twice and the first
 * pass's socket is legitimately created and then closed by its cleanup.
 *
 * What the hook actually owes callers is that it never leaves a *live*
 * connection dangling, so assert on the open ones. This holds under a single
 * mount too, which is why it is the right expectation rather than a doubled
 * instance count.
 */
function liveSockets() {
  return MockWebSocket.instances.filter((s) => s.readyState !== MockWebSocket.CLOSED);
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  MockWebSocket.instances = [];
  vi.stubGlobal('WebSocket', MockWebSocket);
  sessionStorage.clear();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  sessionStorage.clear();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('creates a WebSocket on mount and enters connecting', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    // Exactly one socket is live, and every socket a discarded mount pass
    // opened was closed by its cleanup.
    expect(liveSockets()).toHaveLength(1);
    expect(liveSockets()[0]).toBe(ws());
    expect(result.current.connectionState).toBe('connecting');
  });

  it('reads sessionToken and clientId from sessionStorage', () => {
    sessionStorage.setItem('ws_session_token', 'stored-tok');
    sessionStorage.setItem('ws_client_id', 'stored-cid');
    const { result } = renderHook(() => useWebSocket(opts()));
    expect(result.current.sessionToken).toBe('stored-tok');
    expect(result.current.clientId).toBe('stored-cid');
  });
});

describe('connection', () => {
  it('transitions to connected on open', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { ws().open(); });
    expect(result.current.connectionState).toBe('connected');
  });

  it('includes stored sessionToken in the WebSocket URL', () => {
    sessionStorage.setItem('ws_session_token', 'stored-tok');
    renderHook(() => useWebSocket(opts()));
    expect(ws().url).toContain('sessionToken=stored-tok');
  });

  it('passes cognitoToken as a subprotocol', () => {
    renderHook(() => useWebSocket(opts()));
    expect(ws().protocols as string[]).toContain('ct');
  });
});

describe('session message', () => {
  it('updates sessionToken, clientId, and sessionStorage', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => {
      ws().open();
      ws().receive({ type: 'session', sessionToken: 'new-tok', clientId: 'cid-1', restored: false });
    });
    expect(result.current.sessionToken).toBe('new-tok');
    expect(result.current.clientId).toBe('cid-1');
    expect(sessionStorage.getItem('ws_session_token')).toBe('new-tok');
    expect(sessionStorage.getItem('ws_client_id')).toBe('cid-1');
  });
});

describe('error message', () => {
  it('populates lastError on type=error', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => {
      ws().open();
      ws().receive({ type: 'error', error: { code: 'AUTH_EXPIRED', message: 'expired', timestamp: '' } });
    });
    expect(result.current.lastError?.code).toBe('AUTH_EXPIRED');
  });
});

describe('onMessage callback', () => {
  it('forwards arbitrary messages to onMessage prop', () => {
    const onMessage = vi.fn();
    renderHook(() => useWebSocket(opts({ onMessage })));
    act(() => { ws().open(); ws().receive({ type: 'chat.message', text: 'hi' }); });
    expect(onMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'chat.message' }));
  });

  it('silently drops non-JSON frames', () => {
    const onMessage = vi.fn();
    renderHook(() => useWebSocket(opts({ onMessage })));
    act(() => {
      ws().open();
      ws().onmessage?.(new MessageEvent('message', { data: 'not-json' }));
    });
    expect(onMessage).not.toHaveBeenCalled();
  });
});

describe('sendMessage', () => {
  it('JSON-serialises and sends when OPEN', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { ws().open(); });
    act(() => { result.current.sendMessage({ action: 'ping' }); });
    expect(ws().send).toHaveBeenCalledWith(JSON.stringify({ action: 'ping' }));
  });

  it('is a no-op when socket is not yet OPEN', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { result.current.sendMessage({ action: 'ping' }); });
    expect(ws().send).not.toHaveBeenCalled();
  });
});

describe('switchChannel', () => {
  it('updates currentChannel', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { result.current.switchChannel('room:123'); });
    expect(result.current.currentChannel).toBe('room:123');
  });
});

describe('disconnect', () => {
  it('closes socket, sets disconnected, clears sessionStorage', () => {
    sessionStorage.setItem('ws_session_token', 'tok');
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { ws().open(); result.current.disconnect(); });
    expect(result.current.connectionState).toBe('disconnected');
    expect(sessionStorage.getItem('ws_session_token')).toBeNull();
  });
});

describe('reconnect', () => {
  it('creates a fresh socket and reconnects', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { ws().open(); });
    const before = MockWebSocket.instances.length;
    act(() => { result.current.reconnect(); });
    // One *additional* socket, not a fixed total: the mount count is a
    // StrictMode artefact, "reconnect opens exactly one fresh socket" is not.
    expect(MockWebSocket.instances).toHaveLength(before + 1);
    expect(liveSockets()).toHaveLength(1);
    act(() => { ws().open(); });
    expect(result.current.connectionState).toBe('connected');
  });
});

describe('retry on unexpected close', () => {
  it('enters reconnecting state on server close', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { ws().open(); ws().serverClose(); });
    expect(result.current.connectionState).toBe('reconnecting');
  });

  it('creates a new socket after the backoff timer fires', () => {
    renderHook(() => useWebSocket(opts()));
    act(() => { ws().open(); });
    const before = MockWebSocket.instances.length;
    act(() => { ws().serverClose(); });
    act(() => { vi.runAllTimers(); });
    // The backoff timer opens exactly one replacement, however many sockets
    // the mount passes happened to construct.
    expect(MockWebSocket.instances).toHaveLength(before + 1);
  });

  it('sets RECONNECT_EXHAUSTED error after MAX_RETRIES closes', () => {
    const { result } = renderHook(() => useWebSocket(opts()));
    act(() => { ws().open(); }); // retryCount reset to 0

    // Each serverClose increments retryCount; retry sockets are NOT opened so
    // retryCount never resets. After 5 retries retryCount reaches MAX_RETRIES.
    for (let i = 0; i < 5; i++) {
      act(() => { ws().serverClose(); });
      act(() => { vi.runAllTimers(); }); // new socket created in CONNECTING state
    }
    // 6th close: retryCount=5 >= MAX_RETRIES → RECONNECT_EXHAUSTED
    act(() => { ws().serverClose(); });

    expect(result.current.connectionState).toBe('disconnected');
    expect(result.current.lastError?.code).toBe('RECONNECT_EXHAUSTED');
  });
});
