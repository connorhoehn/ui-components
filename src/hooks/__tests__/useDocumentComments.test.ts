import { renderHook, act, waitFor } from '@testing-library/react';
import { useDocumentComments } from '../useDocumentComments';
import type { GatewayMessage } from '../../types/gateway';
import { SOCIAL_API_URL } from '../../utils/socialApi';

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

// ---------------------------------------------------------------------------
// Transport seam: baseUrl / commentsPath / fetcher
// ---------------------------------------------------------------------------

function okResponse(body: unknown): Response {
  return { ok: true, status: 200, json: () => Promise.resolve(body) } as unknown as Response;
}

function headersOf(init: RequestInit | undefined): Record<string, string> {
  return (init?.headers ?? {}) as Record<string, string>;
}

describe('default transport (unchanged)', () => {
  it('GETs the build-time base with only the bearer header', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchMock).toHaveBeenCalledWith(`${SOCIAL_API_URL}/api/documents/${DOC_ID}/comments`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  });

  it('POSTs the same body and headers as before for a section comment', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce(okResponse({ comment: RAW_COMMENT }));
    await act(async () => { await result.current.addComment('s1', 'Hi', 'p1'); });

    const [url, init] = callWith(fetchMock, 'POST');
    expect(url).toBe(`${SOCIAL_API_URL}/api/documents/${DOC_ID}/comments`);
    expect(init.headers).toEqual({ 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` });
    expect(init.body).toBe(JSON.stringify({ sectionId: 's1', text: 'Hi', parentCommentId: 'p1' }));
  });

  it('baseUrl overrides the build-time base', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocumentComments({ ...defaultOpts(ws), baseUrl: 'https://bff.example' }),
    );
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock.mock.calls[0][0]).toBe(`https://bff.example/api/documents/${DOC_ID}/comments`);
  });
});

describe('host transport (fetcher + commentsPath)', () => {
  const path = (id: string, commentId?: string) =>
    `/api/host/comments${commentId ? `/${commentId}` : ''}?id=${encodeURIComponent(id)}`;

  function setup(extra: Record<string, unknown> = {}) {
    const globalFetch = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', globalFetch);
    const fetcher = vi.fn().mockResolvedValue(okResponse({ comments: [RAW_COMMENT] }));
    const ws = makeWs();
    const hook = renderHook(() =>
      useDocumentComments({
        ...defaultOpts(ws),
        idToken: null,
        // Inline functions on purpose: a new identity each render must not refetch.
        fetcher: (input: string, init: RequestInit) => fetcher(input, init),
        commentsPath: (id: string, commentId?: string) => path(id, commentId),
        ...extra,
      }),
    );
    return { ...hook, fetcher, globalFetch };
  }

  it('loads with no idToken, through the fetcher, with no Authorization header', async () => {
    const { result, fetcher, globalFetch } = setup();
    await waitFor(() => expect(result.current.comments['s1']).toHaveLength(1));

    expect(globalFetch).not.toHaveBeenCalled();
    const [url, init] = fetcher.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`/api/host/comments?id=${DOC_ID}`);
    expect(init.method).toBe('GET');
    expect(headersOf(init).Authorization).toBeUndefined();
  });

  it('does not refetch on re-render with new inline transport functions', async () => {
    const { result, fetcher, rerender } = setup();
    await waitFor(() => expect(result.current.loading).toBe(false));
    const calls = fetcher.mock.calls.length;
    rerender();
    rerender();
    expect(fetcher.mock.calls.length).toBe(calls);
  });

  it('ignores idToken for headers when a fetcher is supplied', async () => {
    const { result, fetcher } = setup({ idToken: TOKEN });
    await waitFor(() => expect(result.current.loading).toBe(false));
    fetcher.mockResolvedValueOnce(okResponse({ comment: { ...RAW_COMMENT, id: 'c9', commentId: 'c9' } }));
    await act(async () => { await result.current.addComment('s1', 'x'); });
    const [, init] = callWith(fetcher, 'POST');
    expect(headersOf(init)).toEqual({ 'Content-Type': 'application/json' });
    expect(fetcher.mock.calls.every((c) => headersOf(c[1] as RequestInit).Authorization === undefined)).toBe(true);
  });

  it('reply goes through the fetcher at the collection path', async () => {
    const { result, fetcher } = setup();
    await waitFor(() => expect(result.current.comments['s1']).toHaveLength(1));
    const REPLY = { ...RAW_COMMENT, id: 'c2', commentId: 'c2', text: 'Re', parentCommentId: 'c1' };
    fetcher.mockResolvedValueOnce(okResponse({ comment: REPLY }));

    await act(async () => { await result.current.addComment('s1', 'Re', 'c1'); });

    const [url, init] = callWith(fetcher, 'POST');
    expect(url).toBe(`/api/host/comments?id=${DOC_ID}`);
    expect(JSON.parse(init.body as string)).toEqual({ sectionId: 's1', text: 'Re', parentCommentId: 'c1' });
    expect(headersOf(init).Authorization).toBeUndefined();
    expect(result.current.comments['s1'][0].replies[0].id).toBe('c2');
  });

  it('resolve and unresolve PATCH the per-comment path through the fetcher', async () => {
    const { result, fetcher } = setup();
    await waitFor(() => expect(result.current.comments['s1']).toHaveLength(1));

    fetcher.mockResolvedValueOnce(okResponse({ comment: { resolvedBy: 'u1', resolvedAt: 't' } }));
    await act(async () => { await result.current.resolveThread('s1', 'c1'); });
    expect(result.current.comments['s1'][0].resolved).toBe(true);

    fetcher.mockResolvedValueOnce(okResponse({ comment: {} }));
    await act(async () => { await result.current.unresolveThread('s1', 'c1'); });
    expect(result.current.comments['s1'][0].resolved).toBe(false);

    const patches = fetcher.mock.calls.filter((c) => (c[1] as RequestInit).method === 'PATCH');
    expect(patches.map((c) => c[0])).toEqual([
      `/api/host/comments/c1?id=${DOC_ID}`,
      `/api/host/comments/c1?id=${DOC_ID}`,
    ]);
    expect(patches.map((c) => JSON.parse((c[1] as RequestInit).body as string))).toEqual([
      { resolved: true },
      { resolved: false },
    ]);
    expect(patches.every((c) => headersOf(c[1] as RequestInit).Authorization === undefined)).toBe(true);
  });

  it('prefixes commentsPath with an explicit baseUrl only', async () => {
    const { result, fetcher } = setup({ baseUrl: 'https://bff.example' });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetcher.mock.calls[0][0]).toBe(`https://bff.example/api/host/comments?id=${DOC_ID}`);
  });
});

describe('document-wide and anchored comments', () => {
  const DOC_COMMENT = { ...RAW_COMMENT, id: 'd1', commentId: 'd1', sectionId: undefined, scope: 'document' };

  it('addDocumentComment POSTs scope:document with no sectionId', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce(okResponse({ comment: DOC_COMMENT }));
    await act(async () => { await result.current.addDocumentComment('Overall'); });

    const [, init] = callWith(fetchMock, 'POST');
    expect(JSON.parse(init.body as string)).toEqual({ text: 'Overall', scope: 'document' });
    expect(result.current.documentComments.map((c) => c.id)).toEqual(['d1']);
    expect(result.current.comments['__document']).toBe(result.current.documentComments);
  });

  it('a reply to a document-wide comment omits sectionId and scope, and nests under it', async () => {
    const REPLY = { ...RAW_COMMENT, id: 'd2', commentId: 'd2', sectionId: undefined, parentCommentId: 'd1' };
    const fetchMock = stubFetch({ comments: [DOC_COMMENT] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.documentComments).toHaveLength(1));

    fetchMock.mockResolvedValueOnce(okResponse({ comment: REPLY }));
    await act(async () => { await result.current.addComment('__document', 'Re', 'd1'); });

    const [, init] = callWith(fetchMock, 'POST');
    expect(JSON.parse(init.body as string)).toEqual({ text: 'Re', parentCommentId: 'd1' });
    expect(result.current.documentComments[0].replies.map((c) => c.id)).toEqual(['d2']);
  });

  it('passes an anchor through and does not mark it document-scoped', async () => {
    const fetchMock = stubFetch({ comments: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentComments(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const anchor = { v: 1, key: 'body', start: 'AA==', end: 'AQ==', quote: 'hello' };
    fetchMock.mockResolvedValueOnce(okResponse({ comment: { ...RAW_COMMENT, id: 'a1', commentId: 'a1', sectionId: undefined, anchor } }));
    await act(async () => { await result.current.addComment('', 'On this', null, { anchor }); });

    const [, init] = callWith(fetchMock, 'POST');
    expect(JSON.parse(init.body as string)).toEqual({ text: 'On this', anchor });
  });
});
