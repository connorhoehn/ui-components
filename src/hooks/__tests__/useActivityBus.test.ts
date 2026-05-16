import { renderHook, act } from '@testing-library/react';
import { useActivityBus } from '../useActivityBus';
import type { UseActivityBusOptions } from '../useActivityBus';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

function makeOptions(overrides: Partial<UseActivityBusOptions> = {}): UseActivityBusOptions & {
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
    connectionState: 'disconnected',
    userId: 'user-1',
    displayName: 'Alice',
    color: '#ff0000',
    maxItems: 100,
    triggerMessage: (msg) => { _handler?.(msg); },
    sentMessages,
    ...overrides,
  };
}

const NOW = '2024-01-01T00:00:00.000Z';

// ---------------------------------------------------------------------------
// isLive / subscribe / unsubscribe
// ---------------------------------------------------------------------------

describe('isLive and subscribe lifecycle', () => {
  it('isLive is false when disconnected', () => {
    const opts = makeOptions({ connectionState: 'disconnected' });
    const { result } = renderHook(() => useActivityBus(opts));
    expect(result.current.isLive).toBe(false);
  });

  it('isLive becomes true and sends subscribe + getHistory when connected', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));
    expect(result.current.isLive).toBe(true);
    expect(opts.sentMessages).toContainEqual(
      expect.objectContaining({ service: 'activity', action: 'subscribe' }),
    );
    expect(opts.sentMessages).toContainEqual(
      expect.objectContaining({ service: 'activity', action: 'getHistory' }),
    );
  });

  it('sends unsubscribe and sets isLive false when connectionState changes to disconnected', () => {
    let connectionState: 'connected' | 'disconnected' = 'connected';
    const opts = makeOptions({ connectionState });

    const { result, rerender } = renderHook(() =>
      useActivityBus({ ...opts, connectionState }),
    );
    expect(result.current.isLive).toBe(true);

    connectionState = 'disconnected';
    rerender();

    expect(result.current.isLive).toBe(false);
    expect(opts.sentMessages).toContainEqual(
      expect.objectContaining({ service: 'activity', action: 'unsubscribe' }),
    );
  });
});

// ---------------------------------------------------------------------------
// Remote activity:event messages
// ---------------------------------------------------------------------------

describe('activity:event messages', () => {
  it('appends an incoming activity:event to events', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    act(() => {
      opts.triggerMessage({
        type: 'activity:event',
        payload: {
          id: 'evt-1',
          eventType: 'document:created',
          detail: { docId: 'doc-1' },
          timestamp: NOW,
          userId: 'user-2',
          displayName: 'Bob',
        },
      } as unknown as GatewayMessage);
    });

    expect(result.current.events).toHaveLength(1);
    expect(result.current.events[0].eventType).toBe('document:created');
    expect(result.current.events[0].source).toBe('remote');
  });

  it('prepends new events (most-recent first)', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    const fire = (id: string, eventType: string, ts: string) =>
      act(() => {
        opts.triggerMessage({
          type: 'activity:event',
          payload: { id, eventType, detail: {}, timestamp: ts },
        } as unknown as GatewayMessage);
      });

    fire('e1', 'a', '2024-01-01T00:00:01.000Z');
    fire('e2', 'b', '2024-01-01T00:00:02.000Z');

    expect(result.current.events[0].eventType).toBe('b');
    expect(result.current.events[1].eventType).toBe('a');
  });

  it('deduplicates a remote echo of a recent local event', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    // Publish optimistic local event
    act(() => { result.current.publish('doc:updated', {}); });
    const localTs = result.current.events[0].timestamp;

    // Simulate server echo arriving within dedup window
    act(() => {
      opts.triggerMessage({
        type: 'activity:event',
        payload: {
          id: 'echo-1',
          eventType: 'doc:updated',
          detail: {},
          timestamp: localTs,
        },
      } as unknown as GatewayMessage);
    });

    // Should still be 1 event (the local one), not 2
    expect(result.current.events).toHaveLength(1);
    expect(result.current.events[0].source).toBe('local');
  });

  it('does not deduplicate an event with a different eventType', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    act(() => { result.current.publish('doc:updated', {}); });
    const localTs = result.current.events[0].timestamp;

    act(() => {
      opts.triggerMessage({
        type: 'activity:event',
        payload: {
          id: 'evt-diff',
          eventType: 'doc:deleted',
          detail: {},
          timestamp: localTs,
        },
      } as unknown as GatewayMessage);
    });

    expect(result.current.events).toHaveLength(2);
  });

  it('caps events to maxItems', () => {
    const opts = makeOptions({ connectionState: 'connected', maxItems: 3 });
    const { result } = renderHook(() => useActivityBus(opts));

    for (let i = 0; i < 5; i++) {
      act(() => {
        opts.triggerMessage({
          type: 'activity:event',
          payload: {
            id: `e${i}`,
            eventType: 'ping',
            detail: {},
            timestamp: new Date(Date.now() + i * 1000).toISOString(),
          },
        } as unknown as GatewayMessage);
      });
    }

    expect(result.current.events).toHaveLength(3);
  });

  it('ignores activity:event with no payload', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    act(() => {
      opts.triggerMessage({ type: 'activity:event' } as unknown as GatewayMessage);
    });

    expect(result.current.events).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// History hydration
// ---------------------------------------------------------------------------

describe('activity history hydration', () => {
  it('hydrates events from activity history response', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    act(() => {
      opts.triggerMessage({
        type: 'activity',
        action: 'history',
        events: [
          { eventType: 'doc:created', detail: {}, timestamp: NOW, userId: 'u1', displayName: 'Alice' },
          { eventType: 'doc:updated', detail: {}, timestamp: NOW, userId: 'u2', displayName: 'Bob' },
        ],
      } as unknown as GatewayMessage);
    });

    expect(result.current.events).toHaveLength(2);
    expect(result.current.events[0].source).toBe('remote');
  });

  it('skips hydration if events already exist', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    // Add one event first
    act(() => {
      opts.triggerMessage({
        type: 'activity:event',
        payload: { id: 'x', eventType: 'ping', detail: {}, timestamp: NOW },
      } as unknown as GatewayMessage);
    });

    // History should be ignored
    act(() => {
      opts.triggerMessage({
        type: 'activity',
        action: 'history',
        events: [
          { eventType: 'old:event', detail: {}, timestamp: NOW },
        ],
      } as unknown as GatewayMessage);
    });

    expect(result.current.events).toHaveLength(1);
    expect(result.current.events[0].eventType).toBe('ping');
  });

  it('ignores history with empty events array', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    act(() => {
      opts.triggerMessage({
        type: 'activity',
        action: 'history',
        events: [],
      } as unknown as GatewayMessage);
    });

    expect(result.current.events).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// publish
// ---------------------------------------------------------------------------

describe('publish', () => {
  it('optimistically adds a local event immediately', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    act(() => { result.current.publish('button:clicked', { button: 'save' }); });

    expect(result.current.events).toHaveLength(1);
    const ev = result.current.events[0];
    expect(ev.eventType).toBe('button:clicked');
    expect(ev.detail).toEqual({ button: 'save' });
    expect(ev.source).toBe('local');
    expect(ev.userId).toBe('user-1');
    expect(ev.displayName).toBe('Alice');
    expect(ev.color).toBe('#ff0000');
  });

  it('sends a publish message over the wire', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result } = renderHook(() => useActivityBus(opts));

    act(() => { result.current.publish('test:event', { x: 1 }); });

    expect(opts.sentMessages).toContainEqual(
      expect.objectContaining({
        service: 'activity',
        action: 'publish',
        event: { eventType: 'test:event', detail: { x: 1 } },
      }),
    );
  });

  it('publish is a stable callback reference', () => {
    const opts = makeOptions({ connectionState: 'connected' });
    const { result, rerender } = renderHook(() => useActivityBus(opts));
    const first = result.current.publish;
    rerender();
    expect(result.current.publish).toBe(first);
  });
});
