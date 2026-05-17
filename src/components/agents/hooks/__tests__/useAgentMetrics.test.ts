import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useAgentMetrics } from '../useAgentMetrics';
import { fixtureMetrics } from '../../fixtures/agentsFixture';
import type { AgentMetrics } from '../../../../types/agents';

const REMOTE: AgentMetrics[] = [
  {
    agentId: 'a',
    invocationsTotal: 100,
    invocationsLast24h: 10,
    errorsLast24h: 1,
    avgLatencyMs: 200,
    p99LatencyMs: 500,
    tokensInLast24h: 1000,
    tokensOutLast24h: 500,
    guardrailBlocksLast24h: 0,
    asOf: '2026-05-08T15:00:00Z',
  },
  {
    agentId: 'b',
    invocationsTotal: 200,
    invocationsLast24h: 20,
    errorsLast24h: 3,
    avgLatencyMs: 400,
    p99LatencyMs: 900,
    tokensInLast24h: 2000,
    tokensOutLast24h: 1000,
    guardrailBlocksLast24h: 1,
    asOf: '2026-05-08T15:00:00Z',
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

const flush = () => act(async () => { await Promise.resolve(); });

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('useAgentMetrics', () => {
  it('falls back to the fixture when no baseUrl is given', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useAgentMetrics());

    await flush();

    expect(result.current.metrics).toEqual(fixtureMetrics);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('hits /agents/metrics when no agentId is provided', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    renderHook(() =>
      useAgentMetrics({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    await flush();

    expect(fetchMock).toHaveBeenCalledWith('http://api/agents/metrics');
  });

  it('hits /agents/:id/metrics when agentId is provided', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    renderHook(() =>
      useAgentMetrics({
        baseUrl: 'http://api',
        agentId: 'orgiq-search',
        pollIntervalMs: 0,
      }),
    );

    await flush();
    await flush();

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api/agents/orgiq-search/metrics',
    );
  });

  it('records HTTP errors and stays in a stable state', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: () => Promise.resolve({}),
      } as unknown as Response),
    );
    const { result } = renderHook(() =>
      useAgentMetrics({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    await flush();

    expect(result.current.error).toBe('HTTP 503');
    expect(result.current.isLoading).toBe(false);
  });

  it('records rejection messages from fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('boom')),
    );
    const { result } = renderHook(() =>
      useAgentMetrics({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    await flush();

    expect(result.current.error).toBe('boom');
  });

  it('repolls on the configured interval', async () => {
    const fetchMock = mockFetchOk(REMOTE);
    renderHook(() =>
      useAgentMetrics({ baseUrl: 'http://api', pollIntervalMs: 2000 }),
    );

    await flush();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(2001);
      await Promise.resolve();
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('exposes per-agent lookup and rolled-up totals over the fixture', () => {
    const { result } = renderHook(() => useAgentMetrics());

    const expectedInvocations = fixtureMetrics.reduce(
      (s, m) => s + m.invocationsLast24h,
      0,
    );
    const expectedErrors = fixtureMetrics.reduce(
      (s, m) => s + m.errorsLast24h,
      0,
    );
    const expectedAvg = Math.round(
      fixtureMetrics.reduce((s, m) => s + m.avgLatencyMs, 0) /
        fixtureMetrics.length,
    );

    expect(result.current.totalInvocations24h).toBe(expectedInvocations);
    expect(result.current.totalErrors24h).toBe(expectedErrors);
    expect(result.current.avgLatencyMs).toBe(expectedAvg);
    expect(result.current.getMetricsForAgent(fixtureMetrics[0].agentId)).toEqual(
      fixtureMetrics[0],
    );
    expect(result.current.getMetricsForAgent('missing')).toBeUndefined();
  });

  it('avgLatencyMs is 0 when there are no metrics', async () => {
    const fetchMock = mockFetchOk([]);
    const { result } = renderHook(() =>
      useAgentMetrics({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await flush();
    await flush();

    expect(fetchMock).toHaveBeenCalled();
    expect(result.current.metrics).toEqual([]);
    expect(result.current.avgLatencyMs).toBe(0);
    expect(result.current.totalInvocations24h).toBe(0);
    expect(result.current.totalErrors24h).toBe(0);
  });
});
