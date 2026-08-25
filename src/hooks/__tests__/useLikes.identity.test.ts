// Two things `useLikes` got wrong that `usePosts` and `useComments` had
// already been fixed for:
//
//  1. It hard-coded `setIsLiked(false)` after loading, with the comment "server
//     does not return current user's like status" — but the server DOES return
//     the who-liked list. So every reload showed an unfilled heart on posts you
//     had liked, and clicking it POSTed a second like and bumped the count.
//  2. It never reset its state or cancelled its request when `postId` changed,
//     so pointing a mounted like button at a new post left the PREVIOUS post's
//     count and "Liked by …" list on screen — permanently if the new fetch
//     failed.
//
// Mount-count independent: fetch mocks are matched by URL, never by index.

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLikes } from '../useLikes';
import type { GatewayMessage } from '../../types/gateway';

const BASE = 'http://api';
const ROOM = 'room-1';

function tokenFor(sub: string): string {
  return `h.${btoa(JSON.stringify({ sub }))}.s`;
}

const NOOP_ON_MESSAGE = (_h: (m: GatewayMessage) => void) => () => {};

/** fetch stub that answers per-post from a table keyed on the post id. */
function mockLikesByPost(table: Record<string, { count: number; users: { userId: string }[] } | 'error'>) {
  const mock = vi.fn((url: string) => {
    const match = /\/posts\/([^/]+)\/likes/.exec(url);
    const entry = match ? table[match[1]] : undefined;
    if (!entry || entry === 'error') {
      return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) } as unknown as Response);
    }
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(entry) } as unknown as Response);
  });
  vi.stubGlobal('fetch', mock);
  return mock;
}

beforeEach(() => vi.stubEnv('VITE_PLATFORM_API_URL', BASE));
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('useLikes — the viewer\'s own like', () => {
  it('is derived from the who-liked list the server already sends', async () => {
    mockLikesByPost({ 'post-1': { count: 3, users: [{ userId: 'bob' }, { userId: 'alice' }] } });

    const { result } = renderHook(() =>
      useLikes({ idToken: tokenFor('alice'), roomId: ROOM, postId: 'post-1', onMessage: NOOP_ON_MESSAGE }),
    );
    await act(async () => { await Promise.resolve(); });

    expect(result.current.likeCount).toBe(3);
    expect(result.current.isLiked).toBe(true);
  });

  it('stays false when the viewer is not among the reactors', async () => {
    mockLikesByPost({ 'post-1': { count: 1, users: [{ userId: 'bob' }] } });

    const { result } = renderHook(() =>
      useLikes({ idToken: tokenFor('alice'), roomId: ROOM, postId: 'post-1', onMessage: NOOP_ON_MESSAGE }),
    );
    await act(async () => { await Promise.resolve(); });

    expect(result.current.isLiked).toBe(false);
  });
});

describe('useLikes — switching postId', () => {
  it('does not leave the previous post\'s count on screen when the next load fails', async () => {
    mockLikesByPost({
      'post-1': { count: 7, users: [{ userId: 'alice' }] },
      'post-2': 'error',
    });

    const { result, rerender } = renderHook(
      ({ postId }: { postId: string }) =>
        useLikes({ idToken: tokenFor('alice'), roomId: ROOM, postId, onMessage: NOOP_ON_MESSAGE }),
      { initialProps: { postId: 'post-1' } },
    );
    await act(async () => { await Promise.resolve(); });
    expect(result.current.likeCount).toBe(7);
    expect(result.current.isLiked).toBe(true);

    rerender({ postId: 'post-2' });
    await act(async () => { await Promise.resolve(); });

    expect(result.current.likeCount).toBe(0);
    expect(result.current.isLiked).toBe(false);
    expect(result.current.whoLiked).toEqual([]);
    expect(result.current.error).toMatch(/500/);
  });

  it('replaces the count rather than blending two posts together', async () => {
    mockLikesByPost({
      'post-1': { count: 7, users: [{ userId: 'alice' }] },
      'post-2': { count: 2, users: [{ userId: 'bob' }] },
    });

    const { result, rerender } = renderHook(
      ({ postId }: { postId: string }) =>
        useLikes({ idToken: tokenFor('alice'), roomId: ROOM, postId, onMessage: NOOP_ON_MESSAGE }),
      { initialProps: { postId: 'post-1' } },
    );
    await act(async () => { await Promise.resolve(); });

    rerender({ postId: 'post-2' });
    await act(async () => { await Promise.resolve(); });

    expect(result.current.likeCount).toBe(2);
    expect(result.current.isLiked).toBe(false);
  });
});
