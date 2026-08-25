// `usePosts.error` is written by the initial load, by `loadMore` AND by every
// mutation, so a caller cannot use it to tell "this room has no posts" from
// "we never managed to read this room". `loadError` carries only the reads.

import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePosts } from '../usePosts';

const BASE = 'http://api';

beforeEach(() => {
  vi.stubEnv('VITE_PLATFORM_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

/** Routes by URL + method — never by call index, StrictMode doubles the mount. */
function stubFetch(handler: (url: string, init?: RequestInit) => { ok: boolean; status: number; body: unknown }) {
  const fetchMock = vi.fn((url: string, init?: RequestInit) => {
    const r = handler(url, init);
    return Promise.resolve({ ok: r.ok, status: r.status, json: () => Promise.resolve(r.body) });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const noop = () => () => {};

function mount() {
  return renderHook(() => usePosts({ idToken: 'tok', roomId: 'r1', onMessage: noop }));
}

describe('usePosts load vs mutation failure', () => {
  it('sets loadError when the initial fetch fails', async () => {
    stubFetch(() => ({ ok: false, status: 503, body: {} }));
    const { result } = mount();

    await waitFor(() => expect(result.current.loadError).toMatch(/503/));
    expect(result.current.error).toMatch(/503/);
  });

  it('leaves loadError null when only a createPost fails', async () => {
    stubFetch((url, init) => {
      if (init?.method === 'POST') return { ok: false, status: 500, body: {} };
      return { ok: true, status: 200, body: { posts: [] } };
    });
    const { result } = mount();
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await expect(result.current.createPost('hello')).rejects.toThrow();
    });

    expect(result.current.error).toMatch(/Failed to create post/);
    // The READ succeeded. Nothing about this write says otherwise.
    expect(result.current.loadError).toBeNull();
  });

  it('leaves loadError null when only a deletePost fails', async () => {
    stubFetch((url, init) => {
      if (init?.method === 'DELETE') return { ok: false, status: 403, body: {} };
      return { ok: true, status: 200, body: { posts: [] } };
    });
    const { result } = mount();
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await expect(result.current.deletePost('p1')).rejects.toThrow();
    });

    expect(result.current.error).toMatch(/Failed to delete post/);
    expect(result.current.loadError).toBeNull();
  });

  it('clears loadError once a later load succeeds', async () => {
    let fail = true;
    stubFetch(() => (fail
      ? { ok: false, status: 503, body: {} }
      : { ok: true, status: 200, body: { posts: [], lastKey: undefined } }));

    const { result, rerender } = renderHook(
      ({ token }: { token: string }) => usePosts({ idToken: token, roomId: 'r1', onMessage: noop }),
      { initialProps: { token: 'tok' } },
    );
    await waitFor(() => expect(result.current.loadError).toMatch(/503/));

    fail = false;
    rerender({ token: 'tok-2' });
    await waitFor(() => expect(result.current.loadError).toBeNull());
  });
});
