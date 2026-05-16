import { renderHook, act } from '@testing-library/react';
import { useDocuments } from '../useDocuments';
import type { DocumentInfo } from '../useDocuments';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const DOC_A: DocumentInfo = {
  id: 'd1',
  title: 'Alpha',
  type: 'note',
  status: 'active',
  createdBy: 'u1',
  icon: '📄',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
};

const DOC_B: DocumentInfo = {
  id: 'd2',
  title: 'Beta',
  type: 'note',
  status: 'active',
  createdBy: 'u1',
  icon: '📄',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-03T00:00:00.000Z', // newer than A
};

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

function crdtMsg(action: string, extra: Record<string, unknown> = {}) {
  return { type: 'crdt', action, ...extra } as unknown as GatewayMessage;
}

// ---------------------------------------------------------------------------
// Connect / disconnect lifecycle
// ---------------------------------------------------------------------------

describe('connect / disconnect lifecycle', () => {
  it('sends listDocuments and getDocumentPresence after 100ms on connect', () => {
    const ws = makeWs();
    renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );

    expect(ws.sendMessage).not.toHaveBeenCalled(); // guard: not immediate

    act(() => { vi.advanceTimersByTime(101); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'crdt', action: 'listDocuments' }),
    );
    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'crdt', action: 'getDocumentPresence' }),
    );
  });

  it('does not send when connectionState is disconnected', () => {
    const ws = makeWs();
    renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'disconnected' }),
    );
    act(() => { vi.advanceTimersByTime(200); });
    expect(ws.sendMessage).not.toHaveBeenCalled();
  });

  it('resets documents, presence, and loading on disconnect', () => {
    const ws = makeWs();
    const { result, rerender } = renderHook(
      ({ state }: { state: 'connected' | 'disconnected' }) =>
        useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: state }),
      { initialProps: { state: 'connected' as const } },
    );

    // Populate documents via WS event
    act(() => {
      ws.trigger(crdtMsg('documentList', { documents: [DOC_A] }));
    });
    expect(result.current.documents).toHaveLength(1);

    // Disconnect should reset
    act(() => { rerender({ state: 'disconnected' }); });

    expect(result.current.documents).toHaveLength(0);
    expect(result.current.loading).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// WS document events
// ---------------------------------------------------------------------------

describe('WS crdt messages', () => {
  it('documentList: populates and sorts by updatedAt descending', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );

    act(() => {
      ws.trigger(crdtMsg('documentList', { documents: [DOC_A, DOC_B] }));
    });

    expect(result.current.documents).toHaveLength(2);
    expect(result.current.documents[0].id).toBe('d2'); // Beta is newer
    expect(result.current.loading).toBe(false);
  });

  it('documentCreated: prepends new doc and re-sorts', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );

    act(() => { ws.trigger(crdtMsg('documentList', { documents: [DOC_A] })); });

    const NEW_DOC = { ...DOC_B, updatedAt: '2024-01-04T00:00:00.000Z' };
    act(() => {
      ws.trigger(crdtMsg('documentCreated', { document: NEW_DOC }));
    });

    expect(result.current.documents).toHaveLength(2);
    expect(result.current.documents[0].id).toBe('d2'); // newest first
  });

  it('documentDeleted: removes the matching doc', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );

    act(() => { ws.trigger(crdtMsg('documentList', { documents: [DOC_A, DOC_B] })); });
    act(() => { ws.trigger(crdtMsg('documentDeleted', { documentId: 'd1' })); });

    expect(result.current.documents).toHaveLength(1);
    expect(result.current.documents[0].id).toBe('d2');
  });

  it('documentMetaUpdated: updates matching doc in place', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );

    act(() => { ws.trigger(crdtMsg('documentList', { documents: [DOC_A] })); });
    act(() => {
      ws.trigger(crdtMsg('documentMetaUpdated', {
        documentId: 'd1',
        meta: { title: 'Updated Alpha', updatedAt: '2024-01-05T00:00:00.000Z' },
      }));
    });

    expect(result.current.documents[0].title).toBe('Updated Alpha');
    expect(result.current.documents).toHaveLength(1);
  });

  it('documents:presence: sets presence map and strips doc: prefix', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );

    act(() => {
      ws.trigger({
        type: 'documents:presence',
        documents: [
          { documentId: 'doc:d1', users: [{ userId: 'u1', displayName: 'Alice', color: '#f00' }] },
          { documentId: 'd2', users: [] },
        ],
      } as unknown as GatewayMessage);
    });

    expect(result.current.presence['d1']).toHaveLength(1);
    expect(result.current.presence['d1'][0].displayName).toBe('Alice');
    expect(result.current.presence['d2']).toHaveLength(0);
    expect(result.current.presence['doc:d1']).toBeUndefined(); // prefix stripped
  });
});

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

describe('actions', () => {
  it('createDocument sends correct crdt message', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );
    ws.sendMessage.mockClear();

    act(() => { result.current.createDocument({ title: 'New Doc', type: 'note' }); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'crdt', action: 'createDocument', meta: { title: 'New Doc', type: 'note' } }),
    );
  });

  it('deleteDocument sends correct crdt message', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );
    ws.sendMessage.mockClear();

    act(() => { result.current.deleteDocument('d1'); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'crdt', action: 'deleteDocument', documentId: 'd1' }),
    );
  });

  it('refreshDocuments sends listDocuments', () => {
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocuments({ sendMessage: ws.sendMessage, onMessage: ws.onMessage, connectionState: 'connected' }),
    );
    ws.sendMessage.mockClear();

    act(() => { result.current.refreshDocuments(); });

    expect(ws.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'crdt', action: 'listDocuments' }),
    );
  });
});
