import { renderHook, act } from '@testing-library/react';
import { useReactions } from '../useReactions';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const CHANNEL = 'channel-1';

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

function reactionMsg(channel: string, emoji = '👍') {
  return {
    type: 'reaction',
    action: 'reaction_received',
    data: { channel, emoji, timestamp: '2024-01-01T00:00:00.000Z' },
  } as unknown as GatewayMessage;
}

// ---------------------------------------------------------------------------
// Subscribe / unsubscribe lifecycle
// ---------------------------------------------------------------------------

describe('subscribe lifecycle', () => {
  it('sends subscribe when connected with a channel', () => {
    const { sendMessage, onMessage } = makeWs();
    renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: CHANNEL, connectionState: 'connected' }),
    );

    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'reaction', action: 'subscribe', channel: CHANNEL }),
    );
  });

  it('does not subscribe when not connected', () => {
    const { sendMessage, onMessage } = makeWs();
    renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: CHANNEL, connectionState: 'disconnected' }),
    );

    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('does not subscribe when currentChannel is empty string', () => {
    const { sendMessage, onMessage } = makeWs();
    renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: '', connectionState: 'connected' }),
    );

    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('sends unsubscribe and clears reactions on channel change', () => {
    const { sendMessage, onMessage, trigger } = makeWs();
    const { rerender } = renderHook(
      ({ channel }: { channel: string }) =>
        useReactions({ sendMessage, onMessage, currentChannel: channel, connectionState: 'connected' }),
      { initialProps: { channel: CHANNEL } },
    );

    // Inject a reaction so we can verify it gets cleared
    act(() => { trigger(reactionMsg(CHANNEL)); });
    sendMessage.mockClear();

    act(() => { rerender({ channel: 'channel-2' }); });

    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'unsubscribe', channel: CHANNEL }),
    );
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'subscribe', channel: 'channel-2' }),
    );
  });
});

// ---------------------------------------------------------------------------
// Incoming reaction_received messages
// ---------------------------------------------------------------------------

describe('reaction_received WS event', () => {
  it('adds an ephemeral reaction with x/y in 10-90 range', () => {
    const { sendMessage, onMessage, trigger } = makeWs();
    const { result } = renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: CHANNEL, connectionState: 'connected' }),
    );

    act(() => { trigger(reactionMsg(CHANNEL, '🎉')); });

    expect(result.current.activeReactions).toHaveLength(1);
    const r = result.current.activeReactions[0];
    expect(r.emoji).toBe('🎉');
    expect(r.x).toBeGreaterThanOrEqual(10);
    expect(r.x).toBeLessThanOrEqual(90);
    expect(r.y).toBeGreaterThanOrEqual(10);
    expect(r.y).toBeLessThanOrEqual(90);
    expect(r.id).toBeTruthy();
  });

  it('ignores reaction_received for a different channel', () => {
    const { sendMessage, onMessage, trigger } = makeWs();
    const { result } = renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: CHANNEL, connectionState: 'connected' }),
    );

    act(() => { trigger(reactionMsg('other-channel')); });

    expect(result.current.activeReactions).toHaveLength(0);
  });

  it('auto-removes the reaction after 2500ms', () => {
    const { sendMessage, onMessage, trigger } = makeWs();
    const { result } = renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: CHANNEL, connectionState: 'connected' }),
    );

    act(() => { trigger(reactionMsg(CHANNEL)); });
    expect(result.current.activeReactions).toHaveLength(1);

    act(() => { vi.advanceTimersByTime(2501); });

    expect(result.current.activeReactions).toHaveLength(0);
  });

  it('accumulates multiple reactions', () => {
    const { sendMessage, onMessage, trigger } = makeWs();
    const { result } = renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: CHANNEL, connectionState: 'connected' }),
    );

    act(() => {
      trigger(reactionMsg(CHANNEL, '👍'));
      trigger(reactionMsg(CHANNEL, '❤️'));
    });

    expect(result.current.activeReactions).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// react()
// ---------------------------------------------------------------------------

describe('react()', () => {
  it('sends correct service/action/channel/emoji', () => {
    const { sendMessage, onMessage } = makeWs();
    const { result } = renderHook(() =>
      useReactions({ sendMessage, onMessage, currentChannel: CHANNEL, connectionState: 'connected' }),
    );
    sendMessage.mockClear();

    act(() => { result.current.react('🚀'); });

    expect(sendMessage).toHaveBeenCalledWith({
      service: 'reaction',
      action: 'send',
      channel: CHANNEL,
      emoji: '🚀',
    });
  });

  it('uses current channel via ref after channel prop change', () => {
    const { sendMessage, onMessage } = makeWs();
    const { result, rerender } = renderHook(
      ({ channel }: { channel: string }) =>
        useReactions({ sendMessage, onMessage, currentChannel: channel, connectionState: 'connected' }),
      { initialProps: { channel: CHANNEL } },
    );

    act(() => { rerender({ channel: 'channel-2' }); });
    sendMessage.mockClear();

    act(() => { result.current.react('⭐'); });

    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ channel: 'channel-2', emoji: '⭐' }),
    );
  });
});
