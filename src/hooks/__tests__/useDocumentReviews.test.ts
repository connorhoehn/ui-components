import { renderHook, act, waitFor } from '@testing-library/react';
import { useDocumentReviews } from '../useDocumentReviews';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';
const TOKEN = 'tok-1';
const DOC_ID = 'doc-xyz';

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

function defaultOpts(ws: ReturnType<typeof makeWs>) {
  return {
    documentId: DOC_ID,
    idToken: TOKEN,
    sendMessage: ws.sendMessage,
    onMessage: ws.onMessage,
    connectionState: 'connected' as const,
  };
}

const RAW_REVIEW = {
  sectionId: 's1',
  userId: 'u1',
  displayName: 'Alice',
  status: 'approved',
  comment: 'LGTM',
  createdAt: '2024-01-01T00:00:00.000Z',
};

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches reviews for the document and groups by sectionId', async () => {
    vi.stubGlobal('fetch', stubFetch({ reviews: [RAW_REVIEW] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.sectionReviews['s1']).toHaveLength(1);
    expect(result.current.sectionReviews['s1'][0].status).toBe('approved');
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = stubFetch({ reviews: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    renderHook(() => useDocumentReviews({ ...defaultOpts(ws), idToken: null }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('clears loading even on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.sectionReviews).toEqual({});
  });

  it('groups reviews from multiple sections correctly', async () => {
    const review2 = { ...RAW_REVIEW, sectionId: 's2', userId: 'u2' };
    vi.stubGlobal('fetch', stubFetch({ reviews: [RAW_REVIEW, review2] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.sectionReviews['s1']).toHaveLength(1);
    expect(result.current.sectionReviews['s2']).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// WS events
// ---------------------------------------------------------------------------

describe('WS social:post / section:review events', () => {
  it('adds a new review from a WS event', async () => {
    vi.stubGlobal('fetch', stubFetch({ reviews: [] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'social:post',
        payload: {
          documentId: DOC_ID,
          type: 'section:review',
          sectionId: 's1',
          review: { userId: 'u1', status: 'approved', displayName: 'Alice', createdAt: '2024-01-01T00:00:00.000Z' },
        },
      } as unknown as GatewayMessage);
    });

    expect(result.current.sectionReviews['s1']).toHaveLength(1);
  });

  it('replaces an existing review by the same user', async () => {
    vi.stubGlobal('fetch', stubFetch({ reviews: [RAW_REVIEW] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'social:post',
        payload: {
          documentId: DOC_ID,
          type: 'section:review',
          sectionId: 's1',
          review: { userId: 'u1', status: 'rejected', displayName: 'Alice', createdAt: '2024-01-02T00:00:00.000Z' },
        },
      } as unknown as GatewayMessage);
    });

    const reviews = result.current.sectionReviews['s1'];
    expect(reviews).toHaveLength(1); // no duplicate
    expect(reviews[0].status).toBe('rejected');
  });

  it('ignores events for a different document', async () => {
    vi.stubGlobal('fetch', stubFetch({ reviews: [] }));
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      ws.trigger({
        type: 'social:post',
        payload: {
          documentId: 'other-doc',
          type: 'section:review',
          sectionId: 's1',
          review: { userId: 'u99', status: 'approved' },
        },
      } as unknown as GatewayMessage);
    });

    expect(result.current.sectionReviews['s1']).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// reviewSection
// ---------------------------------------------------------------------------

describe('reviewSection', () => {
  it('POSTs to the correct URL and optimistically updates state', async () => {
    const fetchMock = stubFetch({ reviews: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const newReview = { userId: 'u1', status: 'approved', displayName: 'Alice', createdAt: '2024-01-01T00:00:00.000Z' };
    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve({ review: newReview }),
    } as unknown as Response);

    await act(async () => { await result.current.reviewSection('s1', 'approved', 'LGTM'); });

    const [url, init] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain(`/api/documents/${DOC_ID}/sections/s1/reviews`);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toMatchObject({ status: 'approved', comment: 'LGTM' });
    expect(result.current.sectionReviews['s1'][0].status).toBe('approved');
  });

  it('throws on HTTP error', async () => {
    const fetchMock = stubFetch({ reviews: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() => useDocumentReviews(defaultOpts(ws)));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.reviewSection('s1', 'approved')).rejects.toThrow(/422/);
    });
  });

  it('is a no-op when idToken is null', async () => {
    const fetchMock = stubFetch({ reviews: [] });
    vi.stubGlobal('fetch', fetchMock);
    const ws = makeWs();
    const { result } = renderHook(() =>
      useDocumentReviews({ ...defaultOpts(ws), idToken: null }),
    );

    await act(async () => { await result.current.reviewSection('s1', 'approved'); });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
