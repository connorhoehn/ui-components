import { renderHook, act } from '@testing-library/react';
import { useChat } from '../useChat';
import type { UseChatOptions } from '../useChat';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Test helper
// ---------------------------------------------------------------------------

function makeOptions(overrides: Partial<UseChatOptions> = {}): UseChatOptions & {
  triggerMessage: (msg: GatewayMessage) => void;
  sentMessages: Record<string, unknown>[];
} {
  const sentMessages: Record<string, unknown>[] = [];
  let _handler: ((msg: GatewayMessage) => void) | null = null;

  return {
    sendMessage: (msg) => { sentMessages.push(msg); },
    onMessage: (handler) => {
      _handler = handler;
      return () => { _handler = null; };
    },
    currentChannel: 'general',
    connectionState: 'connected',
    displayName: 'Alice',
    triggerMessage: (msg) => { _handler?.(msg); },
    sentMessages,
    ...overrides,
  };
}

const TS = '2024-01-01T00:00:00.000Z';

// ---------------------------------------------------------------------------
// Subscribe lifecycle
// ---------------------------------------------------------------------------

describe('subscribe / join lifecycle', () => {
  it('sends chat join when connected with a channel', () => {
    const opts = makeOptions();
    renderHook(() => useChat(opts));
    expect(opts.sentMessages).toContainEqual(
      expect.objectContaining({ service: 'chat', action: 'join', channel: 'general' }),
    );
  });

  it('does not send join when disconnected', () => {
    const opts = makeOptions({ connectionState: 'disconnected' });
    renderHook(() => useChat(opts));
    expect(opts.sentMessages).not.toContainEqual(
      expect.objectContaining({ action: 'join' }),
    );
  });

  it('sends leave and clears messages when channel changes', () => {
    let currentChannel = 'general';
    const opts = makeOptions({ currentChannel });
    const { result, rerender } = renderHook(() =>
      useChat({ ...opts, currentChannel }),
    );

    // Add a message so we can verify it's cleared
    act(() => {
      opts.triggerMessage({
        type: 'chat',
        action: 'message',
        channel: 'general',
        message: { clientId: 'c1', message: 'hello', timestamp: TS },
      } as unknown as GatewayMessage);
    });
    expect(result.current.messages).toHaveLength(1);

    currentChannel = 'support';
    rerender();

    expect(opts.sentMessages).toContainEqual(
      expect.objectContaining({ action: 'leave', channel: 'general' }),
    );
    expect(result.current.messages).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// History loading
// ---------------------------------------------------------------------------

describe('chat history', () => {
  it('populates messages from history response', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useChat(opts));

    act(() => {
      opts.triggerMessage({
        type: 'chat',
        action: 'history',
        channel: 'general',
        messages: [
          { clientId: 'c1', message: 'Hi', timestamp: TS, metadata: { displayName: 'Bob' } },
          { clientId: 'c2', message: 'Hello', timestamp: TS },
        ],
      } as unknown as GatewayMessage);
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].content).toBe('Hi');
    expect(result.current.messages[0].displayName).toBe('Bob');
    expect(result.current.messages[1].displayName).toBeUndefined();
  });

  it('ignores history for a different channel', () => {
    const opts = makeOptions({ currentChannel: 'general' });
    const { result } = renderHook(() => useChat(opts));

    act(() => {
      opts.triggerMessage({
        type: 'chat',
        action: 'history',
        channel: 'support',
        messages: [{ clientId: 'c1', message: 'Wrong channel', timestamp: TS }],
      } as unknown as GatewayMessage);
    });

    expect(result.current.messages).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Incoming real-time messages
// ---------------------------------------------------------------------------

describe('incoming chat messages', () => {
  it('appends an incoming message to the list', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useChat(opts));

    act(() => {
      opts.triggerMessage({
        type: 'chat',
        action: 'message',
        channel: 'general',
        message: { id: 'm1', clientId: 'c1', message: 'Hey', timestamp: TS, channel: 'general' },
      } as unknown as GatewayMessage);
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('Hey');
    expect(result.current.messages[0].id).toBe('m1');
  });

  it('deduplicates by server message id', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useChat(opts));

    const msg = {
      type: 'chat',
      action: 'message',
      channel: 'general',
      message: { id: 'dup', clientId: 'c1', message: 'Dupe', timestamp: TS, channel: 'general' },
    } as unknown as GatewayMessage;

    act(() => { opts.triggerMessage(msg); });
    act(() => { opts.triggerMessage(msg); });

    expect(result.current.messages).toHaveLength(1);
  });

  it('ignores a message event with no message payload', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useChat(opts));

    act(() => {
      opts.triggerMessage({
        type: 'chat',
        action: 'message',
        channel: 'general',
      } as unknown as GatewayMessage);
    });

    expect(result.current.messages).toHaveLength(0);
  });

  it('ignores messages for a different channel', () => {
    const opts = makeOptions({ currentChannel: 'general' });
    const { result } = renderHook(() => useChat(opts));

    act(() => {
      opts.triggerMessage({
        type: 'chat',
        action: 'message',
        channel: 'support',
        message: { clientId: 'c1', message: 'Irrelevant', timestamp: TS, channel: 'support' },
      } as unknown as GatewayMessage);
    });

    expect(result.current.messages).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// send()
// ---------------------------------------------------------------------------

describe('send', () => {
  it('sends a chat message over the wire', () => {
    const opts = makeOptions();
    const { result } = renderHook(() => useChat(opts));

    act(() => { result.current.send('Hello world'); });

    expect(opts.sentMessages).toContainEqual(
      expect.objectContaining({
        service: 'chat',
        action: 'send',
        channel: 'general',
        message: 'Hello world',
        metadata: { displayName: 'Alice' },
      }),
    );
  });

  it('send is a stable callback reference', () => {
    const opts = makeOptions();
    const { result, rerender } = renderHook(() => useChat(opts));
    const first = result.current.send;
    rerender();
    expect(result.current.send).toBe(first);
  });
});
