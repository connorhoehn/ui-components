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
  it('polls again after pollMs elapses', async () => {
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    renderHook(() => useApiHealth(5_000));

    // First tick (immediate)
    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Advance the clock past the poll interval
    await act(async () => {
      vi.advanceTimersByTime(5_001);
      await Promise.resolve();
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('clears the interval on unmount', async () => {
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    const { unmount } = renderHook(() => useApiHealth(5_000));

    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    unmount();

    await act(async () => {
      vi.advanceTimersByTime(10_000);
      await Promise.resolve();
    });
    // Should NOT have polled after unmount
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
