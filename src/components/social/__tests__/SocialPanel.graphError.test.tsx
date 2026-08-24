// Regression: a social-graph load that FAILS must not look like "you follow
// nobody".
//
// `useFriends` fetched followers/following/friends with `.then(r => r.json())`
// and never checked `res.ok`. A 401/500 whose body still parses as JSON
// produced `{ followers: undefined }` → `?? []`, so the three tabs rendered
// empty with `error` null. SocialPanel then compounded it by not destructuring
// `error` at all, so there was no banner and no retry — the user was told they
// had no followers when the request had failed.

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../../hooks/useSocialProfile', () => ({
  useSocialProfile: () => ({
    profile: { id: 'u1', userId: 'u1', displayName: 'Ada', bio: '', avatarUrl: null, visibility: 'public' },
    loading: false,
    error: null,
    updateProfile: vi.fn(),
    viewProfile: vi.fn(),
  }),
}));

import { SocialPanel } from '../SocialPanel';

const BASE = 'http://social-api';

/**
 * Answers the three social-graph endpoints. `status` 200 returns empty lists;
 * anything else returns a JSON error body — the exact shape that used to slip
 * through, since it parses fine.
 */
function stubGraph(status: number) {
  vi.stubGlobal('fetch', vi.fn((url: string) => Promise.resolve({
    ok: status === 200,
    status,
    // A distinct Error/body per call — reusing one rejected instance across
    // three parallel fetches can hide which of them actually failed.
    json: () => Promise.resolve(
      status === 200
        ? { followers: [], following: [], friends: [] }
        : { error: `boom for ${url}` },
    ),
  })));
}

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('SocialPanel — failed social-graph load', () => {
  it('shows an error banner when the graph endpoints answer 500', async () => {
    stubGraph(500);
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    const alert = await screen.findByTestId('social-panel-error');
    expect(alert).toHaveTextContent(/500/);
  });

  it('shows an error banner when the graph endpoints answer 401', async () => {
    stubGraph(401);
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    const alert = await screen.findByTestId('social-panel-error');
    expect(alert).toHaveTextContent(/401/);
  });

  it('shows no banner when the graph is genuinely empty', async () => {
    stubGraph(200);
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    // Let the three fetches settle before asserting the absence.
    await waitFor(() => {
      expect(screen.getByText('Ada')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('social-panel-error')).toBeNull();
  });
});
