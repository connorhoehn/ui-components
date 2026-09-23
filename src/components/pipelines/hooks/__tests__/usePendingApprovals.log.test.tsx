// The console line behind the approvals error banner is the only place the
// technical detail (URL + status) survives — the banner itself is sanitized.
// It used to name `/api/observability/dashboard?include=pendingApprovals`,
// a URL this hook has never fetched, which sent whoever read the console to
// the wrong endpoint. It must name the URL actually fetched
// (`/api/pipelines/approvals`) and the status it answered with — or say that
// it answered nothing when the request failed at the transport.

import { renderHook, waitFor } from '@testing-library/react';
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

const firstArgs = () => vi.mocked(console.error).mock.calls.map((call: unknown[]) => String(call[0]));

describe('usePendingApprovalsState — the console line names the real URL and status', () => {
  it('on a 500: `/api/pipelines/approvals answered 500`', async () => {
    const fetchMock = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve({
      ok: false, status: 500, statusText: 'Server Error',
      json: () => Promise.resolve({}),
    }));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => usePendingApprovalsState());
    await waitFor(() => expect(result.current.error).not.toBeNull());

    // The hook fetched the URL the line names — not the dashboard.
    expect(fetchMock.mock.calls[0]?.[0]).toBe('/api/pipelines/approvals');
    const line = firstArgs().find((s) => s.includes('/api/pipelines/approvals answered 500'));
    expect(line).toBeDefined();
    expect(firstArgs().some((s) => s.includes('/api/observability/dashboard'))).toBe(false);
  });

  it('on a rejected fetch (network): `answered nothing (request failed)`', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Failed to fetch'))));

    const { result } = renderHook(() => usePendingApprovalsState());
    await waitFor(() => expect(result.current.error).not.toBeNull());

    const line = firstArgs().find((s) => s.includes('/api/pipelines/approvals answered nothing (request failed)'));
    expect(line).toBeDefined();
    expect(firstArgs().some((s) => s.includes('/api/observability/dashboard'))).toBe(false);
  });
});
