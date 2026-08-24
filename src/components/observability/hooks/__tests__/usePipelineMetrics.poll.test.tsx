// The metrics poll cadence is what /observability/metrics' "Refresh" selector
// controls. Until v2.93.0 that selector wrote panel-local state nobody read,
// so the hook always polled at its hard-coded 10s regardless — "Refresh: Off"
// kept hammering the API and "Refresh: 5s" stayed at 10s.
//
// These drive the REAL hook against a stubbed fetch (mocking the hook would
// only assert the mock) with fake timers, counting requests over wall time.

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ReactNode } from 'react';
import { IdentityProvider } from '../../../../contexts/IdentityContext';
import { usePipelineMetrics } from '../usePipelineMetrics';

function wrapper({ children }: { children: ReactNode }) {
  return (
    <IdentityProvider
      value={{
        userId: 'u1',
        displayName: 'U',
        userEmail: null,
        idToken: null,
        onSignOut: () => {},
      }}
    >
      {children}
    </IdentityProvider>
  );
}

function stubFetch() {
  const fn = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({ source: 'stub', runsStarted: 1 }),
    }),
  );
  vi.stubGlobal('fetch', fn);
  return fn;
}

// Let queued microtasks (the in-flight fetch + its `.finally` that chains the
// next timer) settle before we inspect or advance again.
async function flush() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('usePipelineMetrics poll cadence', () => {
  it('polls at the default 10s cadence when no interval is given', async () => {
    const fetchSpy = stubFetch();
    renderHook(() => usePipelineMetrics(), { wrapper });
    await flush();
    expect(fetchSpy).toHaveBeenCalledTimes(1); // initial fetch

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('honours a shorter host-supplied cadence', async () => {
    const fetchSpy = stubFetch();
    renderHook(() => usePipelineMetrics({ pollIntervalMs: 5_000 }), { wrapper });
    await flush();
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_000);
    });
    // Against the bug (hard-coded 10s) this is still 1.
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('stops polling after the initial fetch when the cadence is off (null)', async () => {
    const fetchSpy = stubFetch();
    renderHook(() => usePipelineMetrics({ pollIntervalMs: null }), { wrapper });
    await flush();
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });
    // "Refresh: Off" must mean off. Against the bug this is 7.
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
