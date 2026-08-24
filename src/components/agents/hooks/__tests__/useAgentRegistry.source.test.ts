// The `source` discriminator (added 2026-08-23).
//
// This hook seeds state with `fixtureAgents` and KEEPS them when there is no
// baseUrl or when a fetch fails. Without a tag, a consumer cannot distinguish
// a healthy remote registry from synthetic sample data — and a failed fetch
// rendered plausible fake agents alongside an error. `/observability`'s
// usePipelineMetrics already exposed exactly this kind of tag; this matches it.

import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useAgentRegistry } from '../useAgentRegistry';

afterEach(() => vi.unstubAllGlobals());

describe('useAgentRegistry source', () => {
  it('reports fixture data as fixture when no baseUrl is configured', async () => {
    const { result } = renderHook(() => useAgentRegistry());
    expect(result.current.source).toBe('fixture');
    expect(result.current.agents.length).toBeGreaterThan(0);
  });

  it('reports remote once a fetch succeeds', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, status: 200, json: async () => [],
    }));
    const { result } = renderHook(() => useAgentRegistry({ baseUrl: 'https://api.test' }));
    await act(async () => { result.current.refresh(); });
    await waitFor(() => expect(result.current.source).toBe('remote'));
  });

  it('stays `fixture` when the fetch fails, so the UI can flag the data as synthetic', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const { result } = renderHook(() => useAgentRegistry({ baseUrl: 'https://api.test' }));
    await act(async () => { result.current.refresh(); });
    await waitFor(() => expect(result.current.error).toBeTruthy());
    // The agents on screen are still the fixtures — the tag must say so.
    expect(result.current.source).toBe('fixture');
    expect(result.current.agents.length).toBeGreaterThan(0);
  });
});
