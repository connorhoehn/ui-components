import { renderHook, act } from '@testing-library/react';
import { useCursors } from '../useCursors';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function defaultOpts(ws: ReturnType<typeof makeWs>, overrides: Partial<Parameters<typeof useCursors>[0]> = {}) {
  return {
    sendMessage: ws.sendMessage,
    onMessage: ws.onMessage,
    currentChannel: 'chan-1',
    connectionState: 'connected' as const,
    clientId: 'client-me',
    displayName: 'Alice',
    ...overrides,
  };
}

function cursorMsg(action: string, extra: Record<string, unknown> = {}): GatewayMessage {
  return { type: 'cursor', action, ...extra } as unknown as GatewayMessage;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useCursors', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

  // ---- Subscribe / unsubscribe -------------------------------------------

  it('sends cursor:subscribe on connect with channel and default mode', () => {
    const ws = makeWs();
    renderHook(() => useCursors(defaultOpts(ws)));
    expect(ws.sendMessage).toHaveBeenCalledWith({
      service: 'cursor',
      action: 'subscribe',
      channel: 'chan-1',
      mode: 'freeform',
    });
  });

  it('does not subscribe when not connected', () => {
    const ws = makeWs();
    renderHook(() => useCursors(defaultOpts(ws, { connectionState: 'disconnected' })));
    expect(ws.sendMessage).not.toHaveBeenCalled();
  });

  it('sends cursor:unsubscribe on unmount', () => {
    const ws = makeWs();
    const { unmount } = renderHook(() => useCursors(defaultOpts(ws)));
    ws.sendMessage.mockClear();
    unmount();
    expect(ws.sendMessage).toHaveBeenCalledWith(expect.objectContaining({
      service: 'cursor',
      action: 'unsubscribe',
      channel: 'chan-1',
    }));
  });

  it('starts with empty cursors and activeMode freeform', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));
    expect(result.current.cursors.size).toBe(0);
    expect(result.current.activeMode).toBe('freeform');
  });

  // ---- Inbound: cursor:subscribed ----------------------------------------

  it('populates cursors from cursor:subscribed message', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));

    act(() => {
      ws.trigger(cursorMsg('subscribed', {
        cursors: [
          { clientId: 'c1', position: { x: 1, y: 2 }, metadata: {} },
          { clientId: 'c2', position: { x: 3, y: 4 }, metadata: {} },
        ],
      }));
    });

    expect(result.current.cursors.size).toBe(2);
    expect(result.current.cursors.has('c1')).toBe(true);
  });

  it('filters own clientId from cursor:subscribed list', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));

    act(() => {
      ws.trigger(cursorMsg('subscribed', {
        cursors: [
          { clientId: 'client-me', position: { x: 0, y: 0 }, metadata: {} },
          { clientId: 'other', position: { x: 5, y: 5 }, metadata: {} },
        ],
      }));
    });

    expect(result.current.cursors.size).toBe(1);
    expect(result.current.cursors.has('other')).toBe(true);
    expect(result.current.cursors.has('client-me')).toBe(false);
  });

  // ---- Inbound: cursor:update / cursor:remove ----------------------------

  it('adds/updates cursor on cursor:update event', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));

    act(() => {
      ws.trigger(cursorMsg('update', {
        cursor: { clientId: 'remote-1', position: { x: 10, y: 20 }, metadata: {} },
      }));
    });

    expect(result.current.cursors.has('remote-1')).toBe(true);
    expect(result.current.cursors.get('remote-1')?.position).toEqual({ x: 10, y: 20 });
  });

  it('skips cursor:update for own clientId', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));

    act(() => {
      ws.trigger(cursorMsg('update', {
        cursor: { clientId: 'client-me', position: { x: 99, y: 99 }, metadata: {} },
      }));
    });

    expect(result.current.cursors.has('client-me')).toBe(false);
  });

  it('removes cursor on cursor:remove event', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));

    act(() => {
      ws.trigger(cursorMsg('update', {
        cursor: { clientId: 'to-remove', position: { x: 1, y: 1 }, metadata: {} },
      }));
    });
    expect(result.current.cursors.has('to-remove')).toBe(true);

    act(() => {
      ws.trigger(cursorMsg('remove', { clientId: 'to-remove' }));
    });
    expect(result.current.cursors.has('to-remove')).toBe(false);
  });

  // ---- switchMode --------------------------------------------------------

  it('switchMode updates activeMode and clears cursors', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));

    // Add a cursor first
    act(() => {
      ws.trigger(cursorMsg('update', { cursor: { clientId: 'c1', position: {}, metadata: {} } }));
    });
    expect(result.current.cursors.size).toBe(1);

    act(() => { result.current.switchMode('table'); });
    expect(result.current.activeMode).toBe('table');
    expect(result.current.cursors.size).toBe(0);
  });

  it('switchMode sends unsubscribe before changing mode', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { result.current.switchMode('canvas'); });

    expect(ws.sendMessage).toHaveBeenCalledWith(expect.objectContaining({
      service: 'cursor',
      action: 'unsubscribe',
    }));
  });

  // ---- sendFreeformUpdate -----------------------------------------------

  it('sendFreeformUpdate sends cursor:update with position', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { result.current.sendFreeformUpdate(42, 99); });

    expect(ws.sendMessage).toHaveBeenCalledWith(expect.objectContaining({
      service: 'cursor',
      action: 'update',
      channel: 'chan-1',
      position: { x: 42, y: 99 },
    }));
  });

  it('sendFreeformUpdate throttles: second call within 50ms is dropped', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => {
      result.current.sendFreeformUpdate(1, 1);
      result.current.sendFreeformUpdate(2, 2); // within throttle window
    });

    // Only one update should have been sent
    const updateCalls = ws.sendMessage.mock.calls.filter(
      (c) => (c[0] as Record<string, unknown>).action === 'update',
    );
    expect(updateCalls).toHaveLength(1);
    expect(updateCalls[0][0]).toMatchObject({ position: { x: 1, y: 1 } });
  });

  it('sendFreeformUpdate allows call after throttle window expires', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { result.current.sendFreeformUpdate(1, 1); });
    act(() => { vi.advanceTimersByTime(60); }); // past 50ms throttle
    act(() => { result.current.sendFreeformUpdate(2, 2); });

    const updateCalls = ws.sendMessage.mock.calls.filter(
      (c) => (c[0] as Record<string, unknown>).action === 'update',
    );
    expect(updateCalls).toHaveLength(2);
  });

  // ---- sendTableUpdate --------------------------------------------------

  it('sendTableUpdate sends cursor:update with row/col', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCursors(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { result.current.sendTableUpdate(3, 5); });

    expect(ws.sendMessage).toHaveBeenCalledWith(expect.objectContaining({
      service: 'cursor',
      action: 'update',
      position: { row: 3, col: 5 },
    }));
  });
});
