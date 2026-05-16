import { renderHook, act, waitFor } from '@testing-library/react';
import { useDocumentItems } from '../useDocumentItems';
import type { GatewayMessage } from '../../types/gateway';
import type { TaskItem } from '../../types/document';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';
const DOC_ID = 'doc-1';
const SEC_ID = 'sec-A';
const TOKEN = 'tok-1';

beforeEach(() => { vi.stubEnv('VITE_SOCIAL_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

function makeWs() {
  let handler: ((msg: GatewayMessage) => void) | null = null;
  const sendMessage = vi.fn();
  const onMessage = vi.fn((h: (msg: GatewayMessage) => void) => {
    handler = h;
    return () => { handler = null; };
  });
  const emit = (msg: Partial<GatewayMessage> & { type: string }) =>
    handler?.(msg as GatewayMessage);
  return { sendMessage, onMessage, emit };
}

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok, status, json: () => Promise.resolve(body),
  } as unknown as Response);
}

const BASE_OPTS = {
  documentId: DOC_ID,
  sectionIds: [SEC_ID],
  idToken: TOKEN,
  connectionState: 'connected',
};

const RAW_ITEM = { itemId: 'item-1', text: 'Buy milk', status: 'open', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '' };
const TASK_ITEM: TaskItem = { id: 'item-1', text: 'Buy milk', status: 'pending', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '' };

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts with empty items and settles loading false after fetch', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    expect(result.current.items).toEqual({});
    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});

// ---------------------------------------------------------------------------
// Initial fetch
// ---------------------------------------------------------------------------

describe('initial fetch', () => {
  it('populates items by sectionId on success', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [RAW_ITEM] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items[SEC_ID]).toHaveLength(1);
    expect(result.current.items[SEC_ID][0].id).toBe('item-1');
    expect(result.current.items[SEC_ID][0].status).toBe('pending');
  });

  it('sends Authorization header in fetch', async () => {
    const ws = makeWs();
    const fetchMock = stubFetch({ items: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain(`/api/documents/${DOC_ID}/sections/${SEC_ID}/items`);
    expect((init.headers as Record<string, string>).Authorization).toBe(`Bearer ${TOKEN}`);
  });

  it('skips fetch when idToken is null', async () => {
    const ws = makeWs();
    const fetchMock = stubFetch({ items: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws, idToken: null }));
    await new Promise((r) => setTimeout(r, 20));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('handles a failed section fetch gracefully (empty array)', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({}, false, 500));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.items[SEC_ID]).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// WebSocket: section:item:created
// ---------------------------------------------------------------------------

describe('WS section:item:created', () => {
  it('appends the new item to the correct section', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => ws.emit({
      type: 'social:post',
      payload: { type: 'section:item:created', documentId: DOC_ID, sectionId: SEC_ID, item: RAW_ITEM },
    }));

    expect(result.current.items[SEC_ID]).toHaveLength(1);
    expect(result.current.items[SEC_ID][0].text).toBe('Buy milk');
  });

  it('deduplicates items with the same id', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [RAW_ITEM] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => ws.emit({
      type: 'social:post',
      payload: { type: 'section:item:created', documentId: DOC_ID, sectionId: SEC_ID, item: RAW_ITEM },
    }));

    expect(result.current.items[SEC_ID]).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// WebSocket: section:item:updated
// ---------------------------------------------------------------------------

describe('WS section:item:updated', () => {
  it('merges updates into the matching item', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [RAW_ITEM] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => ws.emit({
      type: 'social:post',
      payload: { type: 'section:item:updated', documentId: DOC_ID, sectionId: SEC_ID, itemId: 'item-1', updates: { text: 'Buy oat milk' } },
    }));

    expect(result.current.items[SEC_ID][0].text).toBe('Buy oat milk');
  });
});

// ---------------------------------------------------------------------------
// WebSocket: section:item:deleted
// ---------------------------------------------------------------------------

describe('WS section:item:deleted', () => {
  it('removes the item from the section', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [RAW_ITEM] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => ws.emit({
      type: 'social:post',
      payload: { type: 'section:item:deleted', documentId: DOC_ID, sectionId: SEC_ID, itemId: 'item-1' },
    }));

    expect(result.current.items[SEC_ID]).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// WebSocket: section:item:acked
// ---------------------------------------------------------------------------

describe('WS section:item:acked', () => {
  it('sets status to acked on the matching item', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [RAW_ITEM] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => ws.emit({
      type: 'social:post',
      payload: { type: 'section:item:acked', documentId: DOC_ID, sectionId: SEC_ID, itemId: 'item-1', ackedBy: 'u1' },
    }));

    expect(result.current.items[SEC_ID][0].status).toBe('acked');
    expect(result.current.items[SEC_ID][0].ackedBy).toBe('u1');
  });
});

// ---------------------------------------------------------------------------
// WebSocket: cross-document filtering
// ---------------------------------------------------------------------------

describe('WS cross-document filtering', () => {
  it('ignores events for a different documentId', async () => {
    const ws = makeWs();
    vi.stubGlobal('fetch', stubFetch({ items: [] }));
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => ws.emit({
      type: 'social:post',
      payload: { type: 'section:item:created', documentId: 'doc-other', sectionId: SEC_ID, item: RAW_ITEM },
    }));

    expect(result.current.items[SEC_ID] ?? []).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// addItem
// ---------------------------------------------------------------------------

describe('addItem', () => {
  it('POSTs and appends the returned item', async () => {
    const ws = makeWs();
    const fetchMock = stubFetch({ items: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ item: RAW_ITEM }) } as unknown as Response);
    await act(async () => { await result.current.addItem(SEC_ID, { text: 'Buy milk' }); });

    const postCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(postCall[1].method).toBe('POST');
    expect(result.current.items[SEC_ID]).toHaveLength(1);
  });

  it('throws on non-ok response', async () => {
    const ws = makeWs();
    const fetchMock = stubFetch({ items: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response);
    await expect(act(async () => { await result.current.addItem(SEC_ID, {}); })).rejects.toThrow('422');
  });
});

// ---------------------------------------------------------------------------
// updateItem
// ---------------------------------------------------------------------------

describe('updateItem', () => {
  it('PATCHes and updates the item in state', async () => {
    const ws = makeWs();
    const fetchMock = stubFetch({ items: [RAW_ITEM] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updatedRaw = { ...RAW_ITEM, text: 'Buy oat milk' };
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ item: updatedRaw }) } as unknown as Response);
    await act(async () => { await result.current.updateItem(SEC_ID, 'item-1', { text: 'Buy oat milk' }); });

    const patchCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(patchCall[1].method).toBe('PATCH');
    expect(result.current.items[SEC_ID][0].text).toBe('Buy oat milk');
  });
});

// ---------------------------------------------------------------------------
// removeItem
// ---------------------------------------------------------------------------

describe('removeItem', () => {
  it('DELETEs and removes the item from state', async () => {
    const ws = makeWs();
    const fetchMock = stubFetch({ items: [RAW_ITEM] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.removeItem(SEC_ID, 'item-1'); });

    const deleteCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(deleteCall[1].method).toBe('DELETE');
    expect(result.current.items[SEC_ID]).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// ackItem
// ---------------------------------------------------------------------------

describe('ackItem', () => {
  it('POSTs to /ack and updates item in state', async () => {
    const ws = makeWs();
    const fetchMock = stubFetch({ items: [RAW_ITEM] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useDocumentItems({ ...BASE_OPTS, ...ws }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const ackedRaw = { ...RAW_ITEM, status: 'acked', ackedBy: 'u1' };
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ item: ackedRaw }) } as unknown as Response);
    await act(async () => { await result.current.ackItem(SEC_ID, 'item-1'); });

    const ackCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(ackCall[0]).toContain('/item-1/ack');
    expect(ackCall[1].method).toBe('POST');
    expect(result.current.items[SEC_ID][0].status).toBe('acked');
  });
});
