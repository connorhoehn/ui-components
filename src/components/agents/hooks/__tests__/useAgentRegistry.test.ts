import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useAgentRegistry } from '../useAgentRegistry';
import { fixtureAgents } from '../../fixtures/agentsFixture';
import type { AgentDefinition } from '../../../../types/agents';

const REMOTE: AgentDefinition[] = [
  {
    id: 'remote-1',
    name: 'Remote One',
    status: 'healthy',
    protocol: 'a2a',
    model: 'claude-sonnet-4-6',
    tools: [],
    guardrails: [],
    endpoint: 'https://example/remote-1',
  },
  {
    id: 'remote-2',
    name: 'Remote Two',
    status: 'degraded',
    protocol: 'direct',
    model: 'claude-haiku-4-5',
    tools: [],
    guardrails: [],
    endpoint: 'https://example/remote-2',
  },
];

function mockFetchOk(body: unknown) {
  const fn = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
  } as unknown as Response);
  vi.stubGlobal('fetch', fn);
  return fn;
}

function mockFetchHttp(status: number) {
  const fn = vi.fn().mockResolvedValue({
    ok: false,
    status,
    json: () => Promise.resolve({}),
  } as unknown as Response);
  vi.stubGlobal('fetch', fn);
  return fn;
}

const flush = () => act(async () => { await Promise.resolve(); });

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('useAgentRegistry', () => {
  it('falls back to the local fixture when no baseUrl is given', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useAgentRegistry());

    await flush();

    expect(result.current.agents).toEqual(fixtureAgents);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fetches agents from baseUrl/agents when given', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    const { result } = renderHook(() =>
      useAgentRegistry({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    await flush();

    expect(fetchMock).toHaveBeenCalledWith('http://api/agents');
    expect(result.current.agents).toEqual(REMOTE);
  });

  it('records an error message when the fetch fails with a non-ok status', async () => {
    mockFetchHttp(500);
    const { result } = renderHook(() =>
      useAgentRegistry({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    await flush();

    expect(result.current.error).toBe('HTTP 500');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.agents).toEqual(fixtureAgents);
  });

  it('records a network error message when fetch rejects', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('network down')),
    );
    const { result } = renderHook(() =>
      useAgentRegistry({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    await flush();

    expect(result.current.error).toBe('network down');
  });

  it('skips fetching entirely when enabled=false', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    renderHook(() =>
      useAgentRegistry({
        baseUrl: 'http://api',
        enabled: false,
        pollIntervalMs: 0,
      }),
    );

    await flush();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('repolls on the configured interval', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    renderHook(() =>
      useAgentRegistry({ baseUrl: 'http://api', pollIntervalMs: 1000 }),
    );

    await flush();
    // The absolute count after mount is a StrictMode artifact (mount effects
    // run twice). The property under test is the cadence, so assert the delta.
    const afterMount = fetchMock.mock.calls.length;

    await act(async () => {
      vi.advanceTimersByTime(1001);
      await Promise.resolve();
    });
    expect(fetchMock.mock.calls.length).toBe(afterMount + 1);
  });

  it('clears the polling interval on unmount', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    const { unmount } = renderHook(() =>
      useAgentRegistry({ baseUrl: 'http://api', pollIntervalMs: 1000 }),
    );

    await flush();
    unmount();
    // Absolute count is a StrictMode artifact; what matters is that no further
    // fetch happens once the interval is torn down.
    const atUnmount = fetchMock.mock.calls.length;

    await act(async () => {
      vi.advanceTimersByTime(5000);
      await Promise.resolve();
    });
    expect(fetchMock.mock.calls.length).toBe(atUnmount);
  });

  it('refresh() triggers an extra fetch on demand', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    const { result } = renderHook(() =>
      useAgentRegistry({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    // Absolute count after mount is a StrictMode artifact; refresh() must add
    // exactly one fetch on top of whatever mount did.
    const afterMount = fetchMock.mock.calls.length;

    await act(async () => {
      result.current.refresh();
      await Promise.resolve();
    });
    expect(fetchMock.mock.calls.length).toBe(afterMount + 1);
  });

  it('exposes getAgent and status counters over the fixture', () => {
    const { result } = renderHook(() => useAgentRegistry());

    const healthy = fixtureAgents.filter((a) => a.status === 'healthy').length;
    const degraded = fixtureAgents.filter((a) => a.status === 'degraded').length;
    const offline = fixtureAgents.filter((a) => a.status === 'offline').length;

    expect(result.current.healthyCount).toBe(healthy);
    expect(result.current.degradedCount).toBe(degraded);
    expect(result.current.offlineCount).toBe(offline);
    expect(result.current.getAgent(fixtureAgents[0].id)).toEqual(fixtureAgents[0]);
    expect(result.current.getAgent('nope')).toBeUndefined();
  });
});
