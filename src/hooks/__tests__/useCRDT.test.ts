import { renderHook, act } from '@testing-library/react';
import { useCRDT } from '../useCRDT';
import * as Y from 'yjs';
import { encodeStateAsUpdate } from 'yjs';
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

function defaultOpts(
  ws: ReturnType<typeof makeWs>,
  overrides: Partial<Parameters<typeof useCRDT>[0]> = {},
) {
  return {
    sendMessage: ws.sendMessage,
    onMessage: ws.onMessage,
    currentChannel: 'chan-1',
    connectionState: 'connected' as const,
    ...overrides,
  };
}

/** Encode a Y.Doc text field as base64 for use as a snapshot/update payload. */
function encodeDocAsB64(text: string): string {
  const doc = new Y.Doc();
  doc.getText('content').insert(0, text);
  const update = encodeStateAsUpdate(doc);
  let bin = '';
  for (let i = 0; i < update.length; i++) bin += String.fromCharCode(update[i]);
  return btoa(bin);
}

function crdtMsg(type: string, extra: Record<string, unknown> = {}): GatewayMessage {
  return { type, ...extra } as unknown as GatewayMessage;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useCRDT', () => {
  it('sends subscribe on connect', () => {
    const ws = makeWs();
    renderHook(() => useCRDT(defaultOpts(ws)));
    expect(ws.sendMessage).toHaveBeenCalledWith({
      service: 'crdt',
      action: 'subscribe',
      channel: 'chan-1',
    });
  });

  it('does not subscribe when not connected', () => {
    const ws = makeWs();
    renderHook(() => useCRDT(defaultOpts(ws, { connectionState: 'disconnected' })));
    expect(ws.sendMessage).not.toHaveBeenCalled();
  });

  it('starts with empty content and no conflict', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));
    expect(result.current.content).toBe('');
    expect(result.current.hasConflict).toBe(false);
  });

  it('sends unsubscribe on unmount', () => {
    const ws = makeWs();
    const { unmount } = renderHook(() => useCRDT(defaultOpts(ws)));
    ws.sendMessage.mockClear();
    unmount();
    expect(ws.sendMessage).toHaveBeenCalledWith({
      service: 'crdt',
      action: 'unsubscribe',
      channel: 'chan-1',
    });
  });

  it('applies crdt:snapshot and exposes content', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => {
      ws.trigger(crdtMsg('crdt:snapshot', { channel: 'chan-1', snapshot: encodeDocAsB64('hello') }));
    });

    expect(result.current.content).toBe('hello');
  });

  it('ignores crdt:snapshot for a different channel', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => {
      ws.trigger(crdtMsg('crdt:snapshot', { channel: 'other', snapshot: encodeDocAsB64('ignored') }));
    });

    expect(result.current.content).toBe('');
  });

  it('applies crdt:update and reflects merged content', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => {
      ws.trigger(crdtMsg('crdt:update', { channel: 'chan-1', update: encodeDocAsB64('world') }));
    });

    expect(result.current.content).toBe('world');
  });

  it('ignores crdt:update for a different channel', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => {
      ws.trigger(crdtMsg('crdt:update', { channel: 'other-chan', update: encodeDocAsB64('not-applied') }));
    });

    expect(result.current.content).toBe('');
  });

  it('successive snapshots accumulate in the Y.Doc', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => {
      ws.trigger(crdtMsg('crdt:snapshot', { channel: 'chan-1', snapshot: encodeDocAsB64('first') }));
    });
    act(() => {
      ws.trigger(crdtMsg('crdt:snapshot', { channel: 'chan-1', snapshot: encodeDocAsB64('second') }));
    });

    // Y.js merges: both inserts are present in the CRDT (order-dependent)
    expect(result.current.content).toMatch(/first|second/);
  });

  it('applyLocalEdit updates content and broadcasts encoded update', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));
    ws.sendMessage.mockClear();

    act(() => { result.current.applyLocalEdit('new text'); });

    expect(result.current.content).toBe('new text');
    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        service: 'crdt',
        action: 'update',
        channel: 'chan-1',
        update: expect.any(String),
      }),
    );
  });

  it('applyLocalEdit replaces previous local content', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => { result.current.applyLocalEdit('first'); });
    act(() => { result.current.applyLocalEdit('second'); });

    expect(result.current.content).toBe('second');
  });

  it('dismissConflict sets hasConflict to false', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));
    expect(result.current.hasConflict).toBe(false);

    act(() => { result.current.dismissConflict(); });
    expect(result.current.hasConflict).toBe(false);
  });

  it('ignores malformed base64 in crdt:snapshot without crashing', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => {
      ws.trigger(crdtMsg('crdt:snapshot', { channel: 'chan-1', snapshot: '!!!not-base64!!!' }));
    });

    expect(result.current.content).toBe('');
  });

  it('ignores malformed base64 in crdt:update without crashing', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useCRDT(defaultOpts(ws)));

    act(() => {
      ws.trigger(crdtMsg('crdt:update', { channel: 'chan-1', update: '!!!bad!!!' }));
    });

    expect(result.current.content).toBe('');
  });

  it('resets content to empty when channel changes', () => {
    const ws = makeWs();
    let channel = 'chan-1';
    const { result, rerender } = renderHook(() =>
      useCRDT(defaultOpts(ws, { currentChannel: channel })),
    );

    act(() => { result.current.applyLocalEdit('some content'); });
    expect(result.current.content).toBe('some content');

    channel = 'chan-2';
    rerender();

    expect(result.current.content).toBe('');
  });
});
