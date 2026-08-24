import { renderHook, act, waitFor } from '@testing-library/react';
import { useMappingReviewQueue } from '../useMappingReviewQueue';

// ---------------------------------------------------------------------------
// Mock IdentityContext
// ---------------------------------------------------------------------------

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-1',
    userId: 'u1',
    displayName: 'Alice',
    userEmail: 'alice@test.com',
    onSignOut: vi.fn(),
  }),
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://ingest-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

// Backend shape (uses ingestId / filePath that get normalized to itemId / sourcePath)
const BACKEND_ITEM = {
  ingestId: 'i1',
  sourceId: 'src-1',
  filePath: 'reports/q1.pdf',
  status: 'mapping' as const,
  mappedTypeId: 'dt-1',
  mappingConfidence: 0.55,
  mappingMethod: 'llm-match' as const,
  documentId: null,
  pipelineRunId: null,
  attempts: 1,
  error: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

// The suite runs under React StrictMode, so mount effects fire twice and the
// mutation is no longer at a fixed call index. Locate the call we mean by its
// HTTP method rather than by position.
function callWith(
  mock: { mock: { calls: unknown[][] } },
  method: string,
): [string, RequestInit] {
  const call = mock.mock.calls.find(
    (c) => (c[1] as RequestInit | undefined)?.method === method,
  );
  expect(call, `expected a ${method} fetch`).toBeDefined();
  return call as [string, RequestInit];
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches and normalizes items, sets threshold', async () => {
    vi.stubGlobal('fetch', stubFetch({ items: [BACKEND_ITEM], threshold: 0.6 }));
    const { result } = renderHook(() => useMappingReviewQueue());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
    // normalize: ingestId → itemId
    expect(result.current.items[0].itemId).toBe('i1');
    // normalize: filePath → sourcePath
    expect(result.current.items[0].sourcePath).toBe('reports/q1.pdf');
    // normalize: mappedTypeId → documentTypeId
    expect(result.current.items[0].documentTypeId).toBe('dt-1');
    expect(result.current.threshold).toBe(0.6);
    expect(result.current.error).toBeNull();
  });

  it('prefers itemId over ingestId when both present', async () => {
    const item = { ...BACKEND_ITEM, itemId: 'explicit-id' };
    vi.stubGlobal('fetch', stubFetch({ items: [item], threshold: 0.7 }));
    const { result } = renderHook(() => useMappingReviewQueue());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.items[0].itemId).toBe('explicit-id');
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const { result } = renderHook(() => useMappingReviewQueue());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/503/);
    expect(result.current.items).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// remap
// ---------------------------------------------------------------------------

describe('remap', () => {
  it('POSTs to remap endpoint and refreshes state', async () => {
    const fetchMock = stubFetch({ items: [BACKEND_ITEM], threshold: 0.7 });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useMappingReviewQueue());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // remap success + refresh returning empty list
    fetchMock
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ items: [], threshold: 0.7 }) } as unknown as Response);

    await act(async () => { await result.current.remap('i1', 'dt-new'); });

    const remapCall = callWith(fetchMock, 'POST');
    expect(remapCall[0]).toContain('/api/ingest/items/i1/remap');
    expect(remapCall[1].method).toBe('POST');
    expect(JSON.parse(remapCall[1].body as string)).toEqual({ typeId: 'dt-new' });
    expect(result.current.items).toHaveLength(0);
  });

  it('throws on failure', async () => {
    const fetchMock = stubFetch({ items: [], threshold: 0.7 });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useMappingReviewQueue());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.remap('i1', 'dt-new')).rejects.toThrow(/422/);
    });
  });
});

// ---------------------------------------------------------------------------
// skip
// ---------------------------------------------------------------------------

describe('skip', () => {
  it('POSTs to skip endpoint and refreshes state', async () => {
    const fetchMock = stubFetch({ items: [BACKEND_ITEM], threshold: 0.7 });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useMappingReviewQueue());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ items: [], threshold: 0.7 }) } as unknown as Response);

    await act(async () => { await result.current.skip('i1'); });

    const skipCall = callWith(fetchMock, 'POST');
    expect(skipCall[0]).toContain('/api/ingest/items/i1/skip');
    expect(skipCall[1].method).toBe('POST');
    expect(result.current.items).toHaveLength(0);
  });

  it('throws on failure', async () => {
    const fetchMock = stubFetch({ items: [], threshold: 0.7 });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useMappingReviewQueue());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 503, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.skip('i1')).rejects.toThrow(/503/);
    });
  });
});
