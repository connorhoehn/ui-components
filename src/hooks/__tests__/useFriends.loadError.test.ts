// `useFriends.error` is written by the three list loads AND by follow/unfollow,
// so it cannot answer "are these empty lists trustworthy?". A refused follow is
// not evidence that the graph failed to load — and callers key their
// failure-vs-emptiness state off exactly that question.

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFriends } from '../useFriends';

const BASE = 'http://social-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/** Routes by URL + method, not by call index — StrictMode doubles the mount. */
function stubFetch(handler: (url: string, init?: RequestInit) => { ok: boolean; status: number; body: unknown }) {
  vi.stubGlobal('fetch', vi.fn((url: string, init?: RequestInit) => {
    const r = handler(url, init);
    return Promise.resolve({ ok: r.ok, status: r.status, json: () => Promise.resolve(r.body) });
  }));
}

const LISTS_OK = (url: string) => {
  if (/followers$/.test(url)) return { ok: true, status: 200, body: { followers: [] } };
  if (/following$/.test(url)) return { ok: true, status: 200, body: { following: [] } };
  return { ok: true, status: 200, body: { friends: [] } };
};

describe('useFriends load vs mutation failure', () => {
  it('sets loadError when the list fetches fail', async () => {
    stubFetch(() => ({ ok: false, status: 500, body: {} }));
    const { result } = renderHook(() => useFriends({ idToken: 'tok' }));

    await waitFor(() => expect(result.current.loadError).toMatch(/500/));
    expect(result.current.error).toMatch(/500/);
  });

  it('leaves loadError null when only a follow fails', async () => {
    stubFetch((url, init) => {
      if (init?.method === 'POST') return { ok: false, status: 403, body: {} };
      return LISTS_OK(url);
    });
    const { result } = renderHook(() => useFriends({ idToken: 'tok' }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await expect(result.current.follow('u2')).rejects.toThrow();
    });

    expect(result.current.error).toMatch(/Failed to follow/);
    // The three lists loaded fine. `friends: []` is a fact, not an unknown.
    expect(result.current.loadError).toBeNull();
  });

  it('leaves loadError null when only an unfollow fails', async () => {
    stubFetch((url, init) => {
      if (init?.method === 'DELETE') return { ok: false, status: 500, body: {} };
      return LISTS_OK(url);
    });
    const { result } = renderHook(() => useFriends({ idToken: 'tok' }));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await expect(result.current.unfollow('u2')).rejects.toThrow();
    });

    expect(result.current.error).toMatch(/Failed to unfollow/);
    expect(result.current.loadError).toBeNull();
  });
});
