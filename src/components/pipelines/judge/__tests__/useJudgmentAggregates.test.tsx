import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { JudgmentApiProvider } from '../JudgmentApiContext';
import { useJudgmentAggregates } from '../useJudgmentAggregates';
import type { AggregateRow, JudgmentApi } from '../types';

function wrap(api: JudgmentApi | null) {
  return ({ children }: { children: ReactNode }) =>
    api ? <JudgmentApiProvider value={api}>{children}</JudgmentApiProvider> : <>{children}</>;
}

function makeRow(day: string): AggregateRow {
  return {
    aggregateKey: `pl_1#r1#${day}`,
    pipelineId: 'pl_1',
    rubricId: 'r1',
    dayBucket: day,
    numJudgments: 1,
    numPassed: 1,
    numFailed: 0,
    sumOverallScore: 0.8,
    sumTokensIn: 100,
    sumTokensOut: 20,
    sumCostUsd: 0.001,
    firstJudgedAt: `${day}T00:00:00Z`,
    lastJudgedAt: `${day}T23:00:00Z`,
  };
}

describe('useJudgmentAggregates', () => {
  it('returns empty + no loading when no provider mounted', async () => {
    const { result } = renderHook(() => useJudgmentAggregates({ pipelineId: 'pl_1' }), {
      wrapper: wrap(null),
    });
    expect(result.current.aggregates).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fires fetchAggregates on mount and exposes results', async () => {
    const items = [makeRow('2026-06-01'), makeRow('2026-06-02')];
    const api: JudgmentApi = {
      fetchRawText: vi.fn(),
      fetchAggregates: vi.fn().mockResolvedValue({ items }),
    };
    const { result } = renderHook(() => useJudgmentAggregates({ pipelineId: 'pl_1' }), {
      wrapper: wrap(api),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.aggregates).toEqual(items);
    expect(result.current.error).toBeNull();
    expect(api.fetchAggregates).toHaveBeenCalledWith(expect.objectContaining({ pipelineId: 'pl_1' }));
  });

  it('records an error when both pipelineId and rubricId are absent', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn(),
      fetchAggregates: vi.fn(),
    };
    const { result } = renderHook(() => useJudgmentAggregates({}), { wrapper: wrap(api) });

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.error?.message).toMatch(/one of pipelineId or rubricId/);
    expect(api.fetchAggregates).not.toHaveBeenCalled();
  });

  it('passes since/until/limit through to the fetcher', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn(),
      fetchAggregates: vi.fn().mockResolvedValue({ items: [] }),
    };
    renderHook(
      () =>
        useJudgmentAggregates({
          rubricId: 'rubric.x',
          since: '2026-06-01',
          until: '2026-06-07',
          limit: 7,
        }),
      { wrapper: wrap(api) },
    );

    await waitFor(() =>
      expect(api.fetchAggregates).toHaveBeenCalledWith({
        rubricId: 'rubric.x',
        since: '2026-06-01',
        until: '2026-06-07',
        limit: 7,
      }),
    );
  });

  it('skips fetching when paused=true', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn(),
      fetchAggregates: vi.fn().mockResolvedValue({ items: [] }),
    };
    renderHook(() => useJudgmentAggregates({ pipelineId: 'pl_1', paused: true }), {
      wrapper: wrap(api),
    });
    // No fetch should happen
    await new Promise((r) => setTimeout(r, 10));
    expect(api.fetchAggregates).not.toHaveBeenCalled();
  });

  it('captures a thrown error via the error state', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn(),
      fetchAggregates: vi.fn().mockRejectedValue(new Error('500 internal')),
    };
    const { result } = renderHook(() => useJudgmentAggregates({ pipelineId: 'pl_1' }), {
      wrapper: wrap(api),
    });

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.error?.message).toMatch(/500 internal/);
    expect(result.current.aggregates).toEqual([]);
  });
});
