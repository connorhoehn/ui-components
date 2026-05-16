import { renderHook, act, waitFor } from '@testing-library/react';
import { useIngestAudit } from '../useIngestAudit';
import type { IngestAuditEntry } from '../useIngestAudit';

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

const ENTRY: IngestAuditEntry = {
  auditId: 'a1',
  createdAt: '2024-01-01T00:00:00.000Z',
  actor: 'system',
  eventType: 'mapping.decided',
  targetType: 'item',
  targetId: 'item-1',
  summary: 'Mapping decided',
  detail: {},
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
  it('fetches audit entries on mount', async () => {
    vi.stubGlobal('fetch', stubFetch({ entries: [ENTRY] }));
    const { result } = renderHook(() => useIngestAudit());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0].auditId).toBe('a1');
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const { result } = renderHook(() => useIngestAudit());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/503/);
  });
});

// ---------------------------------------------------------------------------
// Filter query params
// ---------------------------------------------------------------------------

describe('filter query params', () => {
  it('appends filter params to the URL', async () => {
    const fetchMock = stubFetch({ entries: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIngestAudit({ actor: 'system', limit: 10 }));

    await act(async () => { await Promise.resolve(); });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('actor=system');
    expect(url).toContain('limit=10');
  });

  it('omits query string when no filters are set', async () => {
    const fetchMock = stubFetch({ entries: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIngestAudit());

    await act(async () => { await Promise.resolve(); });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).not.toContain('?');
  });

  it('includes eventType filter when provided', async () => {
    const fetchMock = stubFetch({ entries: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIngestAudit({ eventType: 'source.created' }));

    await act(async () => { await Promise.resolve(); });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('eventType=source.created');
  });
});

// ---------------------------------------------------------------------------
// Polling
// ---------------------------------------------------------------------------

describe('polling', () => {
  it('re-fetches every 30 seconds', async () => {
    vi.useFakeTimers();
    const fetchMock = stubFetch({ entries: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIngestAudit());

    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(30_001);
      await Promise.resolve();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// refresh
// ---------------------------------------------------------------------------

describe('refresh', () => {
  it('re-fetches on demand', async () => {
    const fetchMock = stubFetch({ entries: [ENTRY] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestAudit());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const beforeCount = fetchMock.mock.calls.length;
    await act(async () => { await result.current.refresh(); });

    expect(fetchMock).toHaveBeenCalledTimes(beforeCount + 1);
  });
});
