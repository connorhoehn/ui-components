import { renderHook, act } from '@testing-library/react';
import { useYjsDoc } from '../useYjsDoc';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Hoisted mock state (must precede vi.mock — vi.hoisted runs first)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refs = vi.hoisted(() => ({ last: null as any, all: [] as any[] }));

vi.mock('../../providers/GatewayProvider', () => ({
  GatewayProvider: class {
    doc: unknown;
    channel: string;
    applySnapshot = vi.fn();
    applyRemoteUpdate = vi.fn();
    applyAwarenessUpdate = vi.fn();
    destroy = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _handlers = new Map<string, ((...a: any[]) => void)[]>();

    constructor(doc: unknown, channel: string, _send: unknown) {
      this.doc = doc;
      this.channel = channel;
      refs.last = this;
      refs.all.push(this);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event: string, fn: (...a: any[]) => void) {
      if (!this._handlers.has(event)) this._handlers.set(event, []);
      this._handlers.get(event)!.push(fn);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(event: string, fn: (...a: any[]) => void) {
      const arr = this._handlers.get(event) ?? [];
      const i = arr.indexOf(fn);
      if (i >= 0) arr.splice(i, 1);
    }
    fire(event: string) {
      this._handlers.get(event)?.forEach(fn => fn());
    }
  },
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeWs() {
  return { sendMessage: vi.fn() };
}

function makeMessageBus() {
  const handlers: ((msg: GatewayMessage) => void)[] = [];
  return {
    onMessage: (handler: (msg: GatewayMessage) => void) => {
      handlers.push(handler);
      return () => {
        const i = handlers.indexOf(handler);
        if (i >= 0) handlers.splice(i, 1);
      };
    },
    trigger: (msg: GatewayMessage) => handlers.forEach(h => h(msg)),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function opts(ws: any, bus: ReturnType<typeof makeMessageBus>, overrides: Record<string, unknown> = {}) {
  return { documentId: 'doc-1', ws, onMessage: bus.onMessage, ...overrides };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useYjsDoc', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    refs.all.length = 0;
    refs.last = null;
  });
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

  it('sends crdt:subscribe on mount', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    renderHook(() => useYjsDoc(opts(ws, bus)));
    expect(ws.sendMessage).toHaveBeenCalledWith({
      service: 'crdt', action: 'subscribe', channel: 'doc:doc-1',
    });
  });

  it('sends crdt:unsubscribe on unmount and destroys the provider', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    const { unmount } = renderHook(() => useYjsDoc(opts(ws, bus)));
    const provider = refs.last;
    ws.sendMessage.mockClear();
    unmount();
    expect(ws.sendMessage).toHaveBeenCalledWith({
      service: 'crdt', action: 'unsubscribe', channel: 'doc:doc-1',
    });
    expect(provider.destroy).toHaveBeenCalled();
  });

  it('exposes non-null ydoc and provider after mount', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    const { result } = renderHook(() => useYjsDoc(opts(ws, bus)));
    expect(result.current.ydoc).not.toBeNull();
    expect(result.current.provider).not.toBeNull();
  });

  it('synced starts as false', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    const { result } = renderHook(() => useYjsDoc(opts(ws, bus)));
    expect(result.current.synced).toBe(false);
  });

  it('synced becomes true when provider fires synced event', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    const { result } = renderHook(() => useYjsDoc(opts(ws, bus)));
    act(() => { refs.last.fire('synced'); });
    expect(result.current.synced).toBe(true);
  });

  it('crdt:snapshot calls provider.applySnapshot for matching channel', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    renderHook(() => useYjsDoc(opts(ws, bus)));
    act(() => {
      bus.trigger({ type: 'crdt:snapshot', channel: 'doc:doc-1', snapshot: 'snap-b64' } as unknown as GatewayMessage);
    });
    expect(refs.last.applySnapshot).toHaveBeenCalledWith('snap-b64');
  });

  it('crdt:snapshot ignores a different channel', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    renderHook(() => useYjsDoc(opts(ws, bus)));
    act(() => {
      bus.trigger({ type: 'crdt:snapshot', channel: 'doc:other', snapshot: 'snap-b64' } as unknown as GatewayMessage);
    });
    expect(refs.last.applySnapshot).not.toHaveBeenCalled();
  });

  it('crdt:update calls provider.applyRemoteUpdate for matching channel', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    renderHook(() => useYjsDoc(opts(ws, bus)));
    act(() => {
      bus.trigger({ type: 'crdt:update', channel: 'doc:doc-1', update: 'upd-b64' } as unknown as GatewayMessage);
    });
    expect(refs.last.applyRemoteUpdate).toHaveBeenCalledWith('upd-b64');
  });

  it('crdt:awareness (updates array) calls applyAwarenessUpdate for each entry', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    renderHook(() => useYjsDoc(opts(ws, bus)));
    act(() => {
      bus.trigger({
        type: 'crdt:awareness', channel: 'doc:doc-1',
        updates: [{ clientId: 'c1', update: 'aw1' }, { clientId: 'c2', update: 'aw2' }],
      } as unknown as GatewayMessage);
    });
    expect(refs.last.applyAwarenessUpdate).toHaveBeenCalledTimes(2);
    expect(refs.last.applyAwarenessUpdate).toHaveBeenCalledWith('aw1');
    expect(refs.last.applyAwarenessUpdate).toHaveBeenCalledWith('aw2');
  });

  it('session message triggers re-subscribe on the current channel', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    renderHook(() => useYjsDoc(opts(ws, bus)));
    ws.sendMessage.mockClear();
    act(() => {
      bus.trigger({ type: 'session', sessionToken: 'tok', clientId: 'c1', restored: false } as unknown as GatewayMessage);
    });
    expect(ws.sendMessage).toHaveBeenCalledWith({
      service: 'crdt', action: 'subscribe', channel: 'doc:doc-1',
    });
  });

  it('documentId change unsubscribes old channel and subscribes new', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    let docId = 'doc-1';
    const { rerender } = renderHook(() => useYjsDoc(opts(ws, bus, { documentId: docId })));
    ws.sendMessage.mockClear();

    docId = 'doc-2';
    rerender();

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'unsubscribe', channel: 'doc:doc-1' }),
    );
    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'subscribe', channel: 'doc:doc-2' }),
    );
  });

  it('documentId change creates a fresh provider', () => {
    const ws = makeWs();
    const bus = makeMessageBus();
    let docId = 'doc-1';
    const { rerender } = renderHook(() => useYjsDoc(opts(ws, bus, { documentId: docId })));
    // `refs.all` is an append-only construction log, and the suite runs under
    // StrictMode, so the mount effect legitimately builds a provider, tears it
    // down, and builds another. Assert on the LIVE provider instead of the
    // total, which is what "a fresh provider" actually means.
    const first = refs.last;
    expect(first.channel).toBe('doc:doc-1');

    docId = 'doc-2';
    rerender();

    expect(refs.last).not.toBe(first);
    expect(refs.last.channel).toBe('doc:doc-2');
    // …and the old one is torn down rather than left subscribed.
    expect(first.destroy).toHaveBeenCalled();
  });
});
