import { renderHook, act, waitFor } from '@testing-library/react';
import { useSourceSloMetrics } from '../useSourceSloMetrics';
import type { SourceSloMetrics } from '../useSourceSloMetrics';

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
  useOptionalIdentityContext: () => ({
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
  // Restore real timers here rather than at the end of the polling test: if
  // that test fails mid-body the fake clock leaks and every later waitFor hangs.
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const METRICS: SourceSloMetrics = {
  sourceId: 'src-1',
  window: '1h',
  bucketSizeMs: 60_000,
  latencyP95: [{ at: '2024-01-01T00:00:00.000Z', value: 120 }],
  errorRate: [{ at: '2024-01-01T00:00:00.000Z', value: 0.02 }],
  queueDepth: [{ at: '2024-01-01T00:00:00.000Z', value: 5 }],
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
  it('fetches metrics for the given sourceId and window', async () => {
    vi.stubGlobal('fetch', stubFetch(METRICS));
    const { result } = renderHook(() => useSourceSloMetrics('src-1', '1h'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.metrics).not.toBeNull();
    expect(result.current.metrics!.sourceId).toBe('src-1');
    expect(result.current.metrics!.latencyP95).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('includes the window param in the URL', async () => {
    const fetchMock = stubFetch(METRICS);
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useSourceSloMetrics('src-1', '6h'));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('/api/ingest/sources/src-1/metrics?window=6h');
  });

  it('skips the fetch when sourceId is undefined', () => {
    const fetchMock = stubFetch(METRICS);
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useSourceSloMetrics(undefined));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const { result } = renderHook(() => useSourceSloMetrics('src-1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/503/);
    expect(result.current.metrics).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Polling
// ---------------------------------------------------------------------------

describe('polling', () => {
  it('re-fetches every 30 seconds', async () => {
    vi.useFakeTimers();
    const fetchMock = stubFetch(METRICS);
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useSourceSloMetrics('src-1'));

    await act(async () => { await Promise.resolve(); });
    // The absolute count after mount is a StrictMode artifact (mount effects
    // run twice). The property under test is the cadence, so assert the delta.
    const afterMount = fetchMock.mock.calls.length;

    await act(async () => {
      vi.advanceTimersByTime(30_001);
      await Promise.resolve();
    });

    expect(fetchMock.mock.calls.length).toBe(afterMount + 1);
  });
});

// ---------------------------------------------------------------------------
// refresh
// ---------------------------------------------------------------------------

describe('refresh', () => {
  it('re-fetches on demand', async () => {
    const fetchMock = stubFetch(METRICS);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useSourceSloMetrics('src-1'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const beforeCount = fetchMock.mock.calls.length;
    await act(async () => { await result.current.refresh(); });

    expect(fetchMock).toHaveBeenCalledTimes(beforeCount + 1);
  });
});
