import { renderHook, act } from '@testing-library/react';
import { useApiHealth } from '../useApiHealth';

// ---------------------------------------------------------------------------
// Setup: stub VITE_SOCIAL_API_URL and mock fetch
// ---------------------------------------------------------------------------

const BASE = 'http://test-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

function mockFetch(body: unknown, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function mockFetchNetworkError() {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('network error')));
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts as unknown before the first fetch resolves', () => {
    mockFetch({ status: 'ok', checks: {} });
    const { result } = renderHook(() => useApiHealth(30_000));
    // Before the microtask resolves
    expect(result.current.status).toBe('unknown');
    expect(result.current.failing).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Successful responses
// ---------------------------------------------------------------------------

describe('ok response', () => {
  it('sets status to ok with no failing checks', async () => {
    mockFetch({
      status: 'ok',
      checks: { dynamo: { status: 'ok' }, redis: { status: 'ok' } },
    });
    const { result } = renderHook(() => useApiHealth(30_000));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.status).toBe('ok');
    expect(result.current.failing).toEqual([]);
    expect(result.current.checks.dynamo.status).toBe('ok');
  });
});

describe('degraded response', () => {
  it('sets status to degraded and lists failing checks', async () => {
    mockFetch(
      {
        status: 'degraded',
        checks: {
          dynamo: { status: 'ok' },
          redis: { status: 'error', error: 'timeout' },
        },
      },
      503,
    );
    const { result } = renderHook(() => useApiHealth(30_000));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.status).toBe('degraded');
    expect(result.current.failing).toContain('redis');
    expect(result.current.failing).not.toContain('dynamo');
  });
});

// ---------------------------------------------------------------------------
// Error cases
// ---------------------------------------------------------------------------

describe('network failure', () => {
  it('sets status to degraded with failing=["network"] on fetch error', async () => {
    mockFetchNetworkError();
    const { result } = renderHook(() => useApiHealth(30_000));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.status).toBe('degraded');
    expect(result.current.failing).toEqual(['network']);
  });
});

describe('unparseable body', () => {
  it('sets status to degraded with failing=["unknown"] when body is invalid', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(null),
    } as unknown as Response));
    const { result } = renderHook(() => useApiHealth(30_000));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.status).toBe('degraded');
    expect(result.current.failing).toEqual(['unknown']);
  });
});

// ---------------------------------------------------------------------------
// No baseUrl — skip polling
// ---------------------------------------------------------------------------

describe('missing VITE_SOCIAL_API_URL', () => {
  it('stays unknown and never calls fetch when baseUrl is empty', async () => {
    vi.unstubAllEnvs(); // remove the BASE stub
    const fetchMock = mockFetch({ status: 'ok' });
    const { result } = renderHook(() => useApiHealth(30_000));

    await act(async () => { await Promise.resolve(); });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.status).toBe('unknown');
  });
});

// ---------------------------------------------------------------------------
// Polling interval
// ---------------------------------------------------------------------------

describe('polling', () => {
  // These assert on the DELTA, not the absolute call count. The suite runs
  // under StrictMode, so the mount effect runs twice and the immediate tick
  // fires once per pass — that total is a StrictMode artefact. The cadence
  // ("one interval elapsing adds exactly one poll", "unmounting adds none") is
  // the actual contract, and it reads the same either way.
  it('polls again after pollMs elapses', async () => {
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    renderHook(() => useApiHealth(5_000));

    // First tick (immediate)
    await act(async () => { await Promise.resolve(); });
    const afterMount = fetchMock.mock.calls.length;
    expect(afterMount).toBeGreaterThan(0);

    // Advance the clock past the poll interval
    await act(async () => {
      vi.advanceTimersByTime(5_001);
      await Promise.resolve();
    });
    expect(fetchMock).toHaveBeenCalledTimes(afterMount + 1);
  });

  it('clears the interval on unmount', async () => {
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    const { unmount } = renderHook(() => useApiHealth(5_000));

    await act(async () => { await Promise.resolve(); });
    const afterMount = fetchMock.mock.calls.length;
    expect(afterMount).toBeGreaterThan(0);

    unmount();

    await act(async () => {
      vi.advanceTimersByTime(10_000);
      await Promise.resolve();
    });
    // Should NOT have polled after unmount
    expect(fetchMock).toHaveBeenCalledTimes(afterMount);
  });
});

// ---------------------------------------------------------------------------
// Stale-response rejection across effect runs
// ---------------------------------------------------------------------------

describe('superseded effect runs', () => {
  it('ignores an in-flight response from a previous effect run', async () => {
    // The cancellation flag used to be a `useRef`, which is SHARED across
    // effect runs: the old cleanup set it true and the new run immediately set
    // it false again, resurrecting the cancellation. The first run's still-open
    // /health response then landed and overwrote the live one, so the
    // "Backend services degraded" banner could settle on a reading the hook
    // had already superseded. Changing pollMs re-runs the effect; so does any
    // double-mount (StrictMode, <Activity> re-show, Suspense retry).
    const resolvers: ((r: Response) => void)[] = [];
    const fetchMock = vi.fn(
      () => new Promise<Response>((resolve) => { resolvers.push(resolve); }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result, rerender } = renderHook(({ ms }) => useApiHealth(ms), {
      initialProps: { ms: 5_000 },
    });
    const staleCount = resolvers.length;
    expect(staleCount).toBeGreaterThan(0);

    // Re-run the effect with a new cadence; the previous run's fetch is still open.
    rerender({ ms: 7_000 });
    expect(resolvers.length).toBeGreaterThan(staleCount);

    const json = (body: unknown) =>
      ({ status: 200, json: () => Promise.resolve(body) }) as unknown as Response;

    // The CURRENT run answers first: healthy.
    await act(async () => {
      resolvers[resolvers.length - 1](json({ status: 'ok', checks: {} }));
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.status).toBe('ok');

    // Now the superseded run's response lands, reporting degraded. It must be
    // dropped — its effect run was cancelled.
    await act(async () => {
      resolvers[0](json({ status: 'degraded', checks: { redis: { status: 'error' } } }));
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.status).toBe('ok');
    expect(result.current.failing).toEqual([]);
  });
});
