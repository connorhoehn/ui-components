import { renderHook, act } from '@testing-library/react';
import { useApiHealth, normalizeApiHealth } from '../useApiHealth';
import { setApiBaseUrl } from '../../lib/apiBaseUrl';

// 2.359.0: the origin comes from the option or getApiBaseUrl() — never from
// this library's own build-time env — and both /health shapes are understood.

afterEach(() => {
  setApiBaseUrl(null);
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function mockFetch(body: unknown, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({ status, json: () => Promise.resolve(body) } as unknown as Response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('where it polls', () => {
  it('uses the baseUrl option', async () => {
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    renderHook(() => useApiHealth({ baseUrl: 'https://consumer.example' }));
    await act(async () => {});
    expect(fetchMock).toHaveBeenCalledWith('https://consumer.example/health');
  });

  it('falls back to setApiBaseUrl', async () => {
    setApiBaseUrl('https://booted.example');
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    renderHook(() => useApiHealth());
    await act(async () => {});
    expect(fetchMock).toHaveBeenCalledWith('https://booted.example/health');
  });

  it('still takes a bare poll interval', async () => {
    vi.useFakeTimers();
    setApiBaseUrl('https://booted.example');
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    renderHook(() => useApiHealth(1000));
    await act(async () => {});
    const mounted = fetchMock.mock.calls.length;
    await act(async () => { vi.advanceTimersByTime(1000); });
    // One more poll per live interval (StrictMode may mount twice, and
    // retires the first run's interval).
    expect(fetchMock.mock.calls.length).toBe(mounted + 1);
  });
});

describe('the v2 /health shape', () => {
  it('reads healthy + an array of checks', () => {
    expect(normalizeApiHealth({ status: 'healthy', checks: [{ name: 'dynamo', ok: true, durationMs: 4 }] }))
      .toEqual({ status: 'ok', checks: { dynamo: { status: 'ok', latencyMs: 4 } } });
  });

  it('reports the failing check by name instead of "unknown"', async () => {
    mockFetch({ status: 'degraded', checks: [{ name: 'dynamo', ok: true }, { name: 'redis', ok: false, error: 'ECONNREFUSED' }] }, 503);
    const { result } = renderHook(() => useApiHealth({ baseUrl: 'http://api' }));
    await act(async () => {});
    expect(result.current.status).toBe('degraded');
    expect(result.current.failing).toEqual(['redis']);
    expect(result.current.checks.redis).toEqual({ status: 'error', error: 'ECONNREFUSED' });
  });

  it('refuses a body that is neither shape', () => {
    expect(normalizeApiHealth({ status: 'weird' })).toBeNull();
    expect(normalizeApiHealth(null)).toBeNull();
  });
});

describe('coming back', () => {
  it('polls at once when the tab becomes visible or the network returns', async () => {
    const fetchMock = mockFetch({ status: 'ok', checks: {} });
    const { unmount } = renderHook(() => useApiHealth({ baseUrl: 'http://api', pollMs: 60_000 }));
    await act(async () => {});
    const mounted = fetchMock.mock.calls.length;
    await act(async () => { document.dispatchEvent(new Event('visibilitychange')); });
    await act(async () => { window.dispatchEvent(new Event('online')); });
    expect(fetchMock.mock.calls.length).toBe(mounted + 2);
    unmount();
    await act(async () => { window.dispatchEvent(new Event('online')); });
    expect(fetchMock.mock.calls.length).toBe(mounted + 2);
  });
});
