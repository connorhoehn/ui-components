// The `source` discriminator on useAgentMetrics.
//
// Same shape as `useAgentRegistry.source.test.ts` — and the same reason. The
// hook seeds state with `fixtureMetrics` and KEEPS them when there is no
// baseUrl or when the first fetch fails, so `AgentsDashboardPage` renders
// "Invocations (24h): 22,290" and an average latency that look exactly like a
// live fleet's. `error` alone was not enough: the numbers next to it were
// still fabricated, and nothing in the return value said so.

import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useAgentMetrics } from '../useAgentMetrics';

afterEach(() => vi.unstubAllGlobals());

describe('useAgentMetrics source', () => {
  it('reports fixture data as fixture when no baseUrl is configured', () => {
    const { result } = renderHook(() => useAgentMetrics());
    expect(result.current.source).toBe('fixture');
    expect(result.current.metrics.length).toBeGreaterThan(0);
  });

  it('reports remote once a fetch succeeds', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, status: 200, json: async () => [],
    }));

    const { result } = renderHook(() =>
      useAgentMetrics({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await waitFor(() => expect(result.current.source).toBe('remote'));
  });

  it('stays `fixture` when the fetch fails, so the UI can flag the numbers as synthetic', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));

    const { result } = renderHook(() =>
      useAgentMetrics({ baseUrl: 'http://api', pollIntervalMs: 0 }),
    );

    await waitFor(() => expect(result.current.error).toBe('boom'));
    expect(result.current.source).toBe('fixture');
    // The fabricated rows are still there — which is why the tag has to be.
    expect(result.current.totalInvocations24h).toBeGreaterThan(0);
  });

  it('does not let a superseded request overwrite the current agent’s metrics', async () => {
    const pending = new Map<string, ((body: unknown) => void)[]>();
    vi.stubGlobal('fetch', vi.fn((url: string) =>
      new Promise((resolve) => {
        const queue = pending.get(url) ?? [];
        queue.push((body) => resolve({ ok: true, status: 200, json: async () => body } as Response));
        pending.set(url, queue);
      }),
    ));
    const settle = (url: string, body: unknown) => {
      const queue = pending.get(url) ?? [];
      pending.set(url, []);
      queue.forEach((r) => r(body));
    };

    const row = (agentId: string) => ({
      agentId,
      invocationsTotal: 1, invocationsLast24h: 1, errorsLast24h: 0,
      avgLatencyMs: 1, p99LatencyMs: 1, tokensInLast24h: 1,
      tokensOutLast24h: 1, guardrailBlocksLast24h: 0, asOf: 'now',
    });

    const { result, rerender } = renderHook(
      ({ agentId }) => useAgentMetrics({ baseUrl: 'http://api', agentId, pollIntervalMs: 0 }),
      { initialProps: { agentId: 'agent-a' } },
    );

    rerender({ agentId: 'agent-b' });

    // B answers, then A's slower request lands. Without the request-id guard
    // the detail page for agent B showed agent A's invocation counts.
    settle('http://api/agents/agent-b/metrics', [row('agent-b')]);
    await waitFor(() => expect(result.current.metrics[0]?.agentId).toBe('agent-b'));

    settle('http://api/agents/agent-a/metrics', [row('agent-a')]);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.metrics.map((m) => m.agentId)).toEqual(['agent-b']);
  });
});
