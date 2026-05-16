import { renderHook, act } from '@testing-library/react';
import * as Y from 'yjs';
import { toBase64 } from 'lib0/buffer';
import { useVersionHistory } from '../useVersionHistory';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const CHANNEL = 'doc-ch1';

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

function defaultOpts(ws: ReturnType<typeof makeWs>) {
  return {
    channel: CHANNEL,
    sendMessage: ws.sendMessage,
    onMessage: ws.onMessage,
  };
}

function crdtMsg(action: string, extra: Record<string, unknown> = {}) {
  return { type: 'crdt', action, channel: CHANNEL, ...extra } as unknown as GatewayMessage;
}

/** Build a minimal Y.Doc state update string (base64 encoded). */
function buildYDocUpdate(): string {
  const doc = new Y.Doc();
  const arr = doc.getArray('sections');
  const section = new Y.Map<unknown>();
  section.set('id', 's1');
  section.set('type', 'tasks');
  section.set('title', 'My Tasks');
  arr.push([section]);
  const update = Y.encodeStateAsUpdate(doc);
  doc.destroy();
  return toBase64(update);
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts with empty versions, loading:false, null preview', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));
    expect(result.current.versions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.previewDoc).toBeNull();
    expect(result.current.previewTimestamp).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// fetchVersions
// ---------------------------------------------------------------------------

describe('fetchVersions', () => {
  it('sends listSnapshots and sets loading:true', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.fetchVersions(); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'crdt', action: 'listSnapshots', channel: CHANNEL }),
    );
    expect(result.current.loading).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// WS: snapshotList
// ---------------------------------------------------------------------------

describe('snapshotList WS event', () => {
  it('populates versions and clears loading', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.fetchVersions(); });
    act(() => {
      ws.trigger(crdtMsg('snapshotList', {
        snapshots: [
          { timestamp: 1000, age: 0, name: 'v1', author: 'Alice', type: 'manual' },
          { timestamp: 2000, age: 1, type: 'auto' },
        ],
      }));
    });

    expect(result.current.versions).toHaveLength(2);
    expect(result.current.versions[0].name).toBe('v1');
    expect(result.current.loading).toBe(false);
  });

  it('ignores snapshotList for a different channel', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => {
      ws.trigger({
        type: 'crdt',
        action: 'snapshotList',
        channel: 'other-channel',
        snapshots: [{ timestamp: 999, age: 0 }],
      } as unknown as GatewayMessage);
    });

    expect(result.current.versions).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// previewVersion / clearPreview
// ---------------------------------------------------------------------------

describe('previewVersion', () => {
  it('sends getSnapshotAtVersion and sets previewTimestamp', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.previewVersion(1000); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'getSnapshotAtVersion', timestamp: 1000 }),
    );
    expect(result.current.previewTimestamp).toBe(1000);
  });

  it('populates previewDoc when a snapshot WS event arrives', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.previewVersion(1000); });
    act(() => {
      ws.trigger(crdtMsg('snapshot', { version: true, update: buildYDocUpdate() }));
    });

    expect(result.current.previewDoc).not.toBeNull();
  });

  it('clears previewDoc and previewTimestamp on clearPreview', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.previewVersion(1000); });
    act(() => {
      ws.trigger(crdtMsg('snapshot', { version: true, update: buildYDocUpdate() }));
    });
    act(() => { result.current.clearPreview(); });

    expect(result.current.previewDoc).toBeNull();
    expect(result.current.previewTimestamp).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// restoreVersion
// ---------------------------------------------------------------------------

describe('restoreVersion', () => {
  it('sends restoreSnapshot message', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.restoreVersion(2000); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'restoreSnapshot', timestamp: 2000 }),
    );
  });
});

// ---------------------------------------------------------------------------
// saveVersion
// ---------------------------------------------------------------------------

describe('saveVersion', () => {
  it('sends saveVersion message with name', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.saveVersion('Release 1.0'); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'saveVersion', name: 'Release 1.0' }),
    );
  });

  it('refreshes version list after versionSaved event', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.saveVersion('v2'); });
    ws.sendMessage.mockClear();
    act(() => { ws.trigger(crdtMsg('versionSaved')); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'listSnapshots' }),
    );
    expect(result.current.loading).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// compareVersion / clearCompare
// ---------------------------------------------------------------------------

describe('compareVersion', () => {
  it('sends getSnapshotAtVersion and sets compareTimestamp', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.compareVersion(3000); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'getSnapshotAtVersion', timestamp: 3000 }),
    );
    expect(result.current.compareTimestamp).toBe(3000);
  });

  it('routes the snapshot WS response to compareSections (not previewDoc)', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.compareVersion(3000); });
    act(() => {
      ws.trigger(crdtMsg('snapshot', { version: true, update: buildYDocUpdate() }));
    });

    expect(result.current.compareSections).not.toBeNull();
    expect(result.current.previewDoc).toBeNull(); // should NOT be set for compare
  });

  it('clears compareSections and compareTimestamp on clearCompare', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.compareVersion(3000); });
    act(() => {
      ws.trigger(crdtMsg('snapshot', { version: true, update: buildYDocUpdate() }));
    });
    act(() => { result.current.clearCompare(); });

    expect(result.current.compareSections).toBeNull();
    expect(result.current.compareTimestamp).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// extractSections
// ---------------------------------------------------------------------------

describe('extractSections', () => {
  it('extracts section metadata from a Y.Doc', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    const doc = new Y.Doc();
    const arr = doc.getArray('sections');
    const s = new Y.Map<unknown>();
    s.set('id', 'sec1');
    s.set('type', 'tasks');
    s.set('title', 'Tasks Section');
    arr.push([s]);

    const sections = result.current.extractSections(doc);
    expect(sections).toHaveLength(1);
    expect(sections[0].id).toBe('sec1');
    expect(sections[0].title).toBe('Tasks Section');
    doc.destroy();
  });

  it('returns [] for a doc with no sections', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));
    const doc = new Y.Doc();
    expect(result.current.extractSections(doc)).toEqual([]);
    doc.destroy();
  });
});

// ---------------------------------------------------------------------------
// error handling
// ---------------------------------------------------------------------------

describe('error handling', () => {
  it('clears loading on crdt error message', () => {
    const ws = makeWs();
    const { result } = renderHook(() => useVersionHistory(defaultOpts(ws)));

    act(() => { result.current.fetchVersions(); });
    expect(result.current.loading).toBe(true);

    act(() => {
      ws.trigger({ type: 'error', service: 'crdt' } as unknown as GatewayMessage);
    });

    expect(result.current.loading).toBe(false);
  });
});
