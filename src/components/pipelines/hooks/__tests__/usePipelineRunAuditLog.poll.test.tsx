// REGRESSION — the 5s poll threw away every page "Load more" had fetched.
//
// One effect served two callers: a genuine (pipeline, run, filters) change,
// which should reset to page 1, and the `refreshTick` poll, which should not.
// It reset either way — `setServerItems(page.items)` with no cursor — so a user
// who clicked "Load more" on the Executor Log watched the list grow 50 -> 100
// rows ("100 of 100 shown") and snap back to 50 within five seconds, with the
// scroll position jumping and the Load more button reappearing. Repeating never
// held past 50 rows for more than five seconds.

import { vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { AuditPage, AuditRow } from '../../../../api/pipelineAudit';

const getRunAuditLog = vi.fn();

vi.mock('../../../../api/pipelineAudit', () => ({
  getRunAuditLog: (...args: unknown[]) => getRunAuditLog(...args),
}));

vi.mock('../../context/EventStreamContext', () => ({
  useEventStreamContext: () => ({
    subscribe: () => () => {},
    subscribeToRun: () => () => {},
  }),
}));

import { usePipelineRunAuditLog } from '../usePipelineRunAuditLog';

const row = (n: number): AuditRow => ({
  auditId: `a${n}`,
  timestamp: new Date(Date.UTC(2026, 7, 16, 10, 0, n)).toISOString(),
  action: 'pipeline.step.completed',
  actorUserId: 'system',
  pipelineId: 'pipe-1',
  runId: 'run-1',
});

const pageOf = (from: number, count: number, nextCursor?: string): AuditPage =>
  ({
    items: Array.from({ length: count }, (_, i) => row(from + i)),
    nextCursor,
  }) as AuditPage;

describe('usePipelineRunAuditLog polling', () => {
  beforeEach(() => {
    getRunAuditLog.mockReset();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => vi.useRealTimers());

  it('keeps the appended page across a poll refresh', async () => {
    // Select the response by request shape, not call index — StrictMode mounts
    // the fetch effect twice.
    getRunAuditLog.mockImplementation(
      async (_p: string, _r: string, filters: { cursor?: string; limit?: number } = {}) => {
        if (filters.cursor === 'c1') return pageOf(50, 50, undefined);
        // A reset/refresh fetch: honour the span already loaded.
        return pageOf(0, Math.min(filters.limit ?? 50, 100), 'c1');
      },
    );

    const { result } = renderHook(() =>
      usePipelineRunAuditLog('pipe-1', 'run-1', { pollMs: 5_000 }),
    );

    await waitFor(() => expect(result.current.items).toHaveLength(50));
    expect(result.current.hasMore).toBe(true);

    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.items).toHaveLength(100));

    await act(async () => {
      vi.advanceTimersByTime(5_000);
    });
    // The old poll replaced the list with page 1 only.
    await waitFor(() => expect(result.current.items).toHaveLength(100));

    const refreshRequests = getRunAuditLog.mock.calls
      .map(([, , f]) => f as { cursor?: string; limit?: number } | undefined)
      .filter((f) => !f?.cursor);
    expect(refreshRequests.some((f) => (f?.limit ?? 0) >= 100)).toBe(true);
  });

  it('still resets to page 1 when the filters change', async () => {
    getRunAuditLog.mockImplementation(
      async (_p: string, _r: string, filters: { actions?: string[] } = {}) =>
        filters.actions?.includes('pipeline.run.failed')
          ? pageOf(900, 3, undefined)
          : pageOf(0, 50, 'c1'),
    );

    const { result, rerender } = renderHook(
      ({ actions }: { actions?: string[] }) =>
        usePipelineRunAuditLog('pipe-1', 'run-1', { pollMs: 0, filters: { actions } }),
      { initialProps: {} as { actions?: string[] } },
    );

    await waitFor(() => expect(result.current.items).toHaveLength(50));

    rerender({ actions: ['pipeline.run.failed'] });
    await waitFor(() => expect(result.current.items).toHaveLength(3));
  });
});
