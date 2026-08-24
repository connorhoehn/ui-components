// Regression (null-conflation): "No pending approvals" must not be what a
// downed approvals API looks like.
//
// `tryDashboard` returned `null` for a 404 — meaning "this deployment has no
// approvals endpoint, use mock mode" — and ALSO from its catch-all for any
// error whose message lacked the literal 'Dashboard fetch failed'. A server
// that is simply down throws `TypeError: Failed to fetch`, which landed in
// that catch-all. The caller then set no error and left the map empty, so the
// page rendered its EmptyState: an approver was told nobody was waiting on
// them while runs sat blocked on approval. The page's own error banner and
// Retry button were unreachable for the single most common failure.
//
// Driven against a stubbed global `fetch` — the hook's own classification is
// what's under test.

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../context/EventStreamContext', () => ({
  useEventStream: () => undefined,
  useEventStreamContext: () => ({
    subscribeToAll: () => () => {},
    subscribeToApprovals: () => () => {},
    subscribe: () => () => {},
  }),
}));

vi.mock('../../persistence/pipelineStorage', () => ({
  loadPipeline: () => null,
}));

vi.mock('../../context/PipelineRunsContext', () => ({
  usePipelineRuns: () => ({ runs: {}, resolveApproval: vi.fn() }),
}));

import { usePendingApprovalsState } from '../usePendingApprovals';

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('usePendingApprovalsState — endpoint absent vs. request failed', () => {
  it('stays quiet (mock mode) when the endpoint answers 404', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 404, statusText: 'Not Found',
      json: () => Promise.resolve({}),
    })));

    const { result } = renderHook(() => usePendingApprovalsState());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // 404 = "no such endpoint here" — genuinely nothing to report.
    expect(result.current.error).toBeNull();
    expect(result.current.approvals).toEqual([]);
  });

  it('stays quiet when an SPA-fallback host returns index.html (non-JSON)', async () => {
    // The backendless demo: unknown /api/* path → index.html, HTTP 200.
    // Must remain mock mode, not an outage banner.
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true, status: 200, statusText: 'OK',
      json: () => Promise.reject(new SyntaxError('Unexpected token < in JSON')),
    })));

    const { result } = renderHook(() => usePendingApprovalsState());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeNull();
  });

  it('SURFACES an error when the request fails at the transport', async () => {
    // Fresh Error per call — `mockRejectedValue` reuses one instance.
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Failed to fetch'))));

    const { result } = renderHook(() => usePendingApprovalsState());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // The load-bearing assertion: this must NOT look like "no approvals".
    expect(result.current.error).not.toBeNull();
    expect(result.current.approvals).toEqual([]);
  });

  it('SURFACES an error on a 500', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 500, statusText: 'Server Error',
      json: () => Promise.resolve({}),
    })));

    const { result } = renderHook(() => usePendingApprovalsState());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeNull();
  });

  it('retry() re-issues the fetch and clears the error when the server returns', async () => {
    let attempt = 0;
    vi.stubGlobal('fetch', vi.fn(() => {
      attempt += 1;
      if (attempt === 1) return Promise.reject(new Error('Failed to fetch'));
      return Promise.resolve({
        ok: true, status: 200, statusText: 'OK',
        json: () => Promise.resolve({ approvals: [] }),
      });
    }));

    const { result } = renderHook(() => usePendingApprovalsState());
    await waitFor(() => expect(result.current.error).not.toBeNull());

    act(() => result.current.retry());
    await waitFor(() => expect(result.current.error).toBeNull());
    expect(attempt).toBe(2);
  });
});
