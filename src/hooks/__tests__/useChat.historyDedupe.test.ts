// The `chat/history` branch mapped its rows without carrying `id` across.
//
// `id` is the ONLY key the `chat/message` branch dedupes on, so every replayed
// message came back un-dedupable. On reconnect the gateway replays the last 100
// AND broadcasts anything that lands during the join, so a message present in
// both arrived twice — and `ChatPanel` rendered it twice, with the header count
// one too high.

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useChat } from '../useChat';
import type { UseChatOptions } from '../useChat';
import type { GatewayMessage } from '../../types/gateway';

const TS = '2026-02-01T00:00:00.000Z';

function makeHarness() {
  // StrictMode remounts the effect, so more than one handler can be live at
  // once; fan out to all of them rather than keeping only the latest.
  const handlers = new Set<(msg: GatewayMessage) => void>();
  const base = {
    sendMessage: vi.fn(),
    onMessage: (h: (msg: GatewayMessage) => void) => {
      handlers.add(h);
      return () => { handlers.delete(h); };
    },
    displayName: 'Alice',
    currentChannel: 'general',
    connectionState: 'connected' as const,
  };
  return { emit: (msg: GatewayMessage) => handlers.forEach(h => h(msg)), base };
}

function history(rows: Array<{ id?: string; message: string }>): GatewayMessage {
  return {
    type: 'chat',
    action: 'history',
    channel: 'general',
    messages: rows.map(r => ({
      id: r.id,
      clientId: 'c1',
      message: r.message,
      timestamp: TS,
      metadata: { displayName: 'Bob' },
    })),
  } as unknown as GatewayMessage;
}

function live(id: string, message: string): GatewayMessage {
  return {
    type: 'chat',
    action: 'message',
    channel: 'general',
    message: { id, clientId: 'c1', message, timestamp: TS, channel: 'general' },
  } as unknown as GatewayMessage;
}

describe('useChat history / live-echo dedupe', () => {
  it('carries the server id across from history rows', () => {
    const { emit, base } = makeHarness();
    const { result } = renderHook(() => useChat(base as UseChatOptions));

    act(() => emit(history([{ id: 'm1', message: 'hello' }])));

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].id).toBe('m1');
  });

  it('does not render a message twice when it arrives in history and live', () => {
    const { emit, base } = makeHarness();
    const { result } = renderHook(() => useChat(base as UseChatOptions));

    act(() => emit(history([{ id: 'm1', message: 'hello' }, { id: 'm2', message: 'there' }])));
    // The gateway broadcasts m2 again — it landed during the join window.
    act(() => emit(live('m2', 'there')));

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages.filter(m => m.content === 'there')).toHaveLength(1);
  });

  it('still appends a genuinely new message after history', () => {
    const { emit, base } = makeHarness();
    const { result } = renderHook(() => useChat(base as UseChatOptions));

    act(() => emit(history([{ id: 'm1', message: 'hello' }])));
    act(() => emit(live('m2', 'brand new')));

    expect(result.current.messages.map(m => m.content)).toEqual(['hello', 'brand new']);
  });

  it('leaves id undefined when the server omits it, and still appends', () => {
    const { emit, base } = makeHarness();
    const { result } = renderHook(() => useChat(base as UseChatOptions));

    act(() => emit(history([{ message: 'legacy row' }])));
    act(() => emit(live('m9', 'new one')));

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].id).toBeUndefined();
  });
});
