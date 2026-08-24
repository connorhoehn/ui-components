// GatewayProvider — awareness lifecycle at teardown.
//
// The regression these pin: a client that closes a document must tell its
// peers it is gone, and it must do so while the channel is still subscribed.
// The awareness sender is debounced by 50ms, so a departure scheduled through
// that debounce arrives after `useYjsDoc` has already unsubscribed (the
// gateway routes crdt messages by subscription and drops it), and never at all
// if the page is unloading. The user-visible result was a ghost participant:
// someone who left the document stayed in everyone else's avatar list.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as Y from 'yjs';
import { Awareness, applyAwarenessUpdate } from 'y-protocols/awareness';
import { fromBase64 } from 'lib0/buffer';
import { GatewayProvider } from '../GatewayProvider';

type Sent = Record<string, unknown>;

function awarenessSends(sends: Sent[]): Sent[] {
  return sends.filter((m) => m.service === 'crdt' && m.action === 'awareness');
}

/** A second client observing the same channel. */
function makePeer() {
  const doc = new Y.Doc();
  const awareness = new Awareness(doc);
  return {
    awareness,
    receive(msg: Sent) {
      applyAwarenessUpdate(awareness, fromBase64(msg.update as string), 'remote');
    },
    knows(clientID: number) {
      return awareness.getStates().has(clientID);
    },
  };
}

describe('GatewayProvider awareness teardown', () => {
  let doc: Y.Doc;
  let sends: Sent[];
  let provider: GatewayProvider;

  beforeEach(() => {
    vi.useFakeTimers();
    doc = new Y.Doc();
    sends = [];
    provider = new GatewayProvider(doc, 'doc:test', (m) => sends.push(m));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('broadcasts the local departure synchronously on destroy()', () => {
    provider.awareness.setLocalState({ user: { displayName: 'Ada' } });
    // Let the join broadcast through the 50ms debounce.
    vi.advanceTimersByTime(60);
    expect(awarenessSends(sends)).toHaveLength(1);

    sends.length = 0;
    provider.destroy();

    // No timer advance: the departure must already be on the wire, because by
    // the time a debounce would fire the channel is unsubscribed.
    expect(awarenessSends(sends)).toHaveLength(1);
    expect(awarenessSends(sends)[0]).toMatchObject({
      service: 'crdt',
      action: 'awareness',
      channel: 'doc:test',
    });
  });

  it('the departure actually removes this client from a peer', () => {
    const peer = makePeer();
    const clientID = provider.awareness.clientID;

    provider.awareness.setLocalState({ user: { displayName: 'Ada' } });
    vi.advanceTimersByTime(60);
    peer.receive(awarenessSends(sends).at(-1)!);
    expect(peer.knows(clientID)).toBe(true);

    sends.length = 0;
    provider.destroy();
    peer.receive(awarenessSends(sends).at(-1)!);

    expect(peer.knows(clientID)).toBe(false);
  });

  it('sends nothing further after destroy, even once timers run', () => {
    provider.awareness.setLocalState({ user: { displayName: 'Ada' } });
    vi.advanceTimersByTime(60);

    provider.destroy();
    const afterDestroy = sends.length;
    vi.advanceTimersByTime(1000);

    expect(sends).toHaveLength(afterDestroy);
  });

  it('is idempotent — a second destroy() is a no-op', () => {
    provider.awareness.setLocalState({ user: { displayName: 'Ada' } });
    vi.advanceTimersByTime(60);

    provider.destroy();
    const afterFirst = sends.length;
    expect(() => provider.destroy()).not.toThrow();

    expect(sends).toHaveLength(afterFirst);
  });

  it('does not broadcast a departure when the local state is already cleared', () => {
    // Awareness seeds `{}` for the local client in its constructor, so the
    // usual case always has something to retract. This covers the other one.
    provider.awareness.setLocalState(null);
    sends.length = 0;

    provider.destroy();

    expect(awarenessSends(sends)).toHaveLength(0);
  });
});
