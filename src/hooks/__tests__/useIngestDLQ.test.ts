import { renderHook, act, waitFor } from '@testing-library/react';
import { useIngestDLQ } from '../useIngestDLQ';
import type { DLQEntryRow } from '../useIngestDLQ';

// ---------------------------------------------------------------------------
// Mock IdentityContext
// ---------------------------------------------------------------------------

const TOKEN = 'tok-1';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: TOKEN,
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

const DLQ_ENTRY: DLQEntryRow = {
  id: 'dlq-1',
  envelope: { id: 'env-1', body: {} },
  lastError: 'Connection refused',
  failedAtMs: 1700000000000,
  totalAttempts: 3,
};

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches DLQ entries on mount', async () => {
    vi.stubGlobal('fetch', stubFetch({ items: [DLQ_ENTRY] }));
    const { result } = renderHook(() => useIngestDLQ());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0].id).toBe('dlq-1');
    expect(result.current.error).toBeNull();
  });

  it('sets descriptive error on 503 (DLQ not initialized)', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const { result } = renderHook(() => useIngestDLQ());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/not initialized/i);
    expect(result.current.entries).toHaveLength(0);
  });

  it('sets generic error for non-503 failures', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 500));
    const { result } = renderHook(() => useIngestDLQ());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/500/);
  });
});

// ---------------------------------------------------------------------------
// replay
// ---------------------------------------------------------------------------

describe('replay', () => {
  it('POSTs to the replay endpoint and refreshes state', async () => {
    const fetchMock = stubFetch({ items: [DLQ_ENTRY] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestDLQ());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ items: [] }) } as unknown as Response);

    await act(async () => { await result.current.replay('dlq-1'); });

    const replayCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(replayCall[0]).toContain('/api/ingest/dlq/dlq-1/replay');
    expect(replayCall[1].method).toBe('POST');
    expect(result.current.entries).toHaveLength(0);
  });

  it('throws on failure', async () => {
    const fetchMock = stubFetch({ items: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestDLQ());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.replay('dlq-1')).rejects.toThrow(/404/);
    });
  });
});

// ---------------------------------------------------------------------------
// drop
// ---------------------------------------------------------------------------

describe('drop', () => {
  it('DELETEs the entry and refreshes state', async () => {
    const fetchMock = stubFetch({ items: [DLQ_ENTRY] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestDLQ());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ items: [] }) } as unknown as Response);

    await act(async () => { await result.current.drop('dlq-1'); });

    const dropCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(dropCall[0]).toContain('/api/ingest/dlq/dlq-1');
    expect(dropCall[1].method).toBe('DELETE');
    expect(result.current.entries).toHaveLength(0);
  });

  it('throws on failure', async () => {
    const fetchMock = stubFetch({ items: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestDLQ());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.drop('dlq-1')).rejects.toThrow(/422/);
    });
  });
});
