// `setMessages([])` used to live in the cleanup of the join effect, whose deps
// include `connectionState` — so it ran on every DISCONNECT as well as on a
// channel change. A two-second network blip therefore wiped the entire
// transcript, and `ChatPanel` fell back to "Chat (0) / No messages yet",
// telling the user the channel was empty until the server replayed history.
//
// The messages are still true while the socket is down. Only a channel switch
// invalidates them.

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useChat } from '../useChat';
import type { UseChatOptions } from '../useChat';
import type { ConnectionState, GatewayMessage } from '../../types/gateway';

const TS = '2026-01-01T00:00:00.000Z';

function makeHarness() {
  const sent: Record<string, unknown>[] = [];
  // StrictMode remounts the effect, so more than one handler can be live;
  // fan out to all of them rather than keeping only the latest.
  const handlers = new Set<(msg: GatewayMessage) => void>();
  const base = {
    sendMessage: (msg: Record<string, unknown>) => { sent.push(msg); },
    onMessage: (h: (msg: GatewayMessage) => void) => {
      handlers.add(h);
      return () => { handlers.delete(h); };
    },
    displayName: 'Alice',
  };
  const emit = (msg: GatewayMessage) => handlers.forEach(h => h(msg));
  return { sent, emit, base };
}

function chatMessage(channel: string, content: string): GatewayMessage {
  return {
    type: 'chat',
    action: 'message',
    channel,
    message: { id: content, clientId: 'c1', message: content, timestamp: TS },
  } as unknown as GatewayMessage;
}

describe('useChat across a reconnect', () => {
  it('keeps the transcript when the socket drops and comes back', () => {
    const { emit, base } = makeHarness();
    let connectionState: ConnectionState = 'connected';

    const { result, rerender } = renderHook(() =>
      useChat({ ...base, currentChannel: 'general', connectionState } as UseChatOptions),
    );

    act(() => emit(chatMessage('general', 'hello')));
    expect(result.current.messages).toHaveLength(1);

    // Blip.
    connectionState = 'disconnected';
    rerender();
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('hello');

    // Back.
    connectionState = 'connected';
    rerender();
    expect(result.current.messages).toHaveLength(1);
  });

  it('re-sends join on reconnect', () => {
    const { sent, base } = makeHarness();
    let connectionState: ConnectionState = 'connected';

    const { rerender } = renderHook(() =>
      useChat({ ...base, currentChannel: 'general', connectionState } as UseChatOptions),
    );

    const joinsBefore = sent.filter(m => m.action === 'join').length;
    connectionState = 'disconnected';
    rerender();
    connectionState = 'connected';
    rerender();

    // Delta, not an absolute count — StrictMode doubles the mount.
    expect(sent.filter(m => m.action === 'join').length).toBeGreaterThan(joinsBefore);
  });

  it('still clears the transcript when the channel changes', () => {
    const { emit, base } = makeHarness();
    let currentChannel = 'general';

    const { result, rerender } = renderHook(() =>
      useChat({ ...base, currentChannel, connectionState: 'connected' } as UseChatOptions),
    );

    act(() => emit(chatMessage('general', 'hello')));
    expect(result.current.messages).toHaveLength(1);

    currentChannel = 'support';
    rerender();

    expect(result.current.messages).toHaveLength(0);
  });
});
