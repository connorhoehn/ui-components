import { renderHook, act, waitFor } from '@testing-library/react';
import { useDocumentComments } from '../useDocumentComments';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';
const TOKEN = 'tok-1';
const DOC_ID = 'doc-abc';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
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

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

/**
 * The suite runs under React StrictMode, so mount effects fire twice and the
 * mutation's fetch is no longer at a fixed index. Select the call we actually
 * mean by its method (and optionally a URL fragment) instead of by position.
 */
function callWith(
  fetchMock: { mock: { calls: unknown[][] } },
  method: string,
  urlPart?: string,
): [string, RequestInit] {
  const call = fetchMock.mock.calls.find(
    (c) =>
      (c[1] as RequestInit | undefined)?.method === method &&
      (urlPart === undefined || String(c[0]).includes(urlPart)),
  );
  if (!call) {
    throw new Error(
      `no fetch call with method ${method}` +
        (urlPart ? ` and url containing ${urlPart}` : ''),
    );
  }
  return call as [string, RequestInit];
}

function defaultOpts(ws: ReturnType<typeof makeWs>) {
  return {
    documentId: DOC_ID,
    idToken: TOKEN,
    sendMessage: ws.sendMessage,
    onMessage: ws.onMessage,
    connectionState: 'connected' as const,
  };
}

const RAW_COMMENT = {
  id: 'c1',
  commentId: 'c1',
  text: 'Hello',
  userId: 'u1',
  displayName: 'Alice',
  sectionId: 's1',
  resolved: false,
  parentCommentId: null,
  createdAt: '2024-01-01T00:00:00.000Z',
};

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches comments for the document and populates state', async () => {
    vi.stubGlobal('fetch', stubFetch({ comments: [RAW_COMMENT] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.comments['s1']).toHaveLength(1);
    expect(result.current.comments['s1'][0].id).toBe('c1');
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    renderHook(() => useDocumentComments({ ...defaultOpts(ws), idToken: null }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('clears loading even when fetch fails', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.comments).toEqual({});
  });

  it('nests replies under parent comments in the tree', async () => {
    const REPLY = {
      ...RAW_COMMENT,
      id: 'c2',
      commentId: 'c2',
      text: 'Reply',
      parentCommentId: 'c1',
    };
    vi.stubGlobal('fetch', stubFetch({ comments: [RAW_COMMENT, REPLY] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const roots = result.current.comments['s1'];
    expect(roots).toHaveLength(1);
    expect(roots[0].replies).toHaveLength(1);
    expect(roots[0].replies[0].id).toBe('c2');
  });
});

// ---------------------------------------------------------------------------
// WS events
// ---------------------------------------------------------------------------

describe('WS comment events', () => {
  it('doc:comment_added: adds the comment to the correct section', async () => {
    vi.stubGlobal('fetch', stubFetch({ comments: [] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'doc:comment_added',
        payload: { documentId: DOC_ID, comment: RAW_COMMENT },
      } as unknown as GatewayMessage);
    });

    expect(result.current.comments['s1']).toHaveLength(1);
    expect(result.current.comments['s1'][0].text).toBe('Hello');
  });

  it('doc:comment_added: ignores events for a different document', async () => {
    vi.stubGlobal('fetch', stubFetch({ comments: [] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'doc:comment_added',
        payload: { documentId: 'other-doc', comment: RAW_COMMENT },
      } as unknown as GatewayMessage);
    });

    expect(result.current.comments['s1']).toBeUndefined();
  });

  it('doc:comment_added: does not duplicate an already-present comment', async () => {
    vi.stubGlobal('fetch', stubFetch({ comments: [RAW_COMMENT] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'doc:comment_added',
        payload: { documentId: DOC_ID, comment: RAW_COMMENT },
      } as unknown as GatewayMessage);
    });

    expect(result.current.comments['s1']).toHaveLength(1);
  });

  it('doc:comment_resolved: marks the comment resolved', async () => {
    vi.stubGlobal('fetch', stubFetch({ comments: [RAW_COMMENT] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'doc:comment_resolved',
        payload: {
          documentId: DOC_ID,
          commentId: 'c1',
          resolved: true,
          resolvedBy: 'u2',
          resolvedAt: '2024-01-02T00:00:00.000Z',
        },
      } as unknown as GatewayMessage);
    });

    const comment = result.current.comments['s1'][0];
    expect(comment.resolved).toBe(true);
    expect(comment.resolvedBy).toBe('u2');
  });

  it('doc:comment_deleted: removes the matching comment', async () => {
    vi.stubGlobal('fetch', stubFetch({ comments: [RAW_COMMENT] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'doc:comment_deleted',
        payload: { documentId: DOC_ID, commentId: 'c1' },
      } as unknown as GatewayMessage);
    });

    expect(result.current.comments['s1']).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// addComment
// ---------------------------------------------------------------------------

describe('addComment', () => {
  it('POSTs to the correct URL and optimistically adds the comment', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ comment: RAW_COMMENT }),
    } as unknown as Response);

    await act(async () => {
      await result.current.addComment('s1', 'Hello');
    });

    const [url, init] = callWith(fetchMock, 'POST');
    expect(url).toContain(`/api/documents/${DOC_ID}/comments`);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toMatchObject({ sectionId: 's1', text: 'Hello' });
    expect(result.current.comments['s1']).toHaveLength(1);
  });

  it('throws on HTTP error', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: false, status: 422, json: () => Promise.resolve({}),
    } as unknown as Response);

    await act(async () => {
      await expect(result.current.addComment('s1', 'fail')).rejects.toThrow(/422/);
    });
  });

  it('is a no-op when idToken is null', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocumentComments({ ...defaultOpts(ws), idToken: null }),
    );

    await act(async () => { await result.current.addComment('s1', 'x'); });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// resolveThread / unresolveThread
// ---------------------------------------------------------------------------

describe('resolveThread', () => {
  it('PATCHes resolved:true and updates state optimistically', async () => {
    const fetchMock = stubFetch({ comments: [RAW_COMMENT] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve({ comment: { resolvedBy: 'u1', resolvedAt: '2024-01-02T00:00:00.000Z' } }),
    } as unknown as Response);

    await act(async () => { await result.current.resolveThread('s1', 'c1'); });

    expect(result.current.comments['s1'][0].resolved).toBe(true);
    const [url, init] = callWith(fetchMock, 'PATCH');
    expect(url).toContain(`/api/documents/${DOC_ID}/comments/c1`);
    expect(JSON.parse(init.body as string)).toEqual({ resolved: true });
  });
});

describe('unresolveThread', () => {
  it('PATCHes resolved:false and clears resolve metadata', async () => {
    const resolvedComment = { ...RAW_COMMENT, resolved: true, resolvedBy: 'u1', resolvedAt: '2024-01-02T00:00:00.000Z' };
    const fetchMock = stubFetch({ comments: [resolvedComment] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve({ comment: {} }),
    } as unknown as Response);

    await act(async () => { await result.current.unresolveThread('s1', 'c1'); });

    expect(result.current.comments['s1'][0].resolved).toBe(false);
    expect(result.current.comments['s1'][0].resolvedBy).toBeUndefined();
  });
});
