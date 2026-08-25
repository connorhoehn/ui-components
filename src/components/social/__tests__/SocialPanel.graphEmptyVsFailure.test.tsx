// A follow-graph OUTAGE must not render as a statement about the user's graph.
//
// `SocialPanel` gained an error banner in an earlier pass, but the tabs
// underneath it still said "No followers yet" / "Not following anyone yet" and
// the tab labels still read "Followers (0)" — counts off arrays that nothing
// had ever filled. Next to a banner, the panel was still asserting the fact it
// had just admitted it could not check.
//
// The distinction has to come from `useFriends.loadError`, not `error`: `error`
// is also set by a refused follow/unfollow, and a rejected button click says
// nothing about whether the lists were read.

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

const PEER = { userId: 'u2', displayName: 'Grace', visibility: 'public' as const };

/**
 * Routes by URL, never by call index — StrictMode doubles the mount and the
 * three list fetches race, so positional lookups are meaningless here.
 */
function stubFetch(routes: Array<[RegExp, { ok: boolean; status: number; body: unknown }]>) {
  const fetchMock = vi.fn((url: string) => {
    const hit = routes.find(([re]) => re.test(url));
    const r = hit ? hit[1] : { ok: true, status: 200, body: {} };
    return Promise.resolve({ ok: r.ok, status: r.status, json: () => Promise.resolve(r.body) });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const GRAPH_OK: Array<[RegExp, { ok: boolean; status: number; body: unknown }]> = [
  [/followers$/, { ok: true, status: 200, body: { followers: [] } }],
  [/following$/, { ok: true, status: 200, body: { following: [] } }],
  [/friends$/, { ok: true, status: 200, body: { friends: [] } }],
];

const GRAPH_500: Array<[RegExp, { ok: boolean; status: number; body: unknown }]> = [
  [/followers$/, { ok: false, status: 500, body: { error: 'boom' } }],
  [/following$/, { ok: false, status: 500, body: { error: 'boom' } }],
  [/friends$/, { ok: false, status: 500, body: { error: 'boom' } }],
];

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('SocialPanel connections — failure vs emptiness', () => {
  it('says the connections could not be loaded instead of "No followers yet"', async () => {
    stubFetch(GRAPH_500);
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    expect(await screen.findByTestId('social-graph-error')).toHaveTextContent(
      /Couldn.t load your connections/,
    );
    expect(screen.queryByText('No followers yet')).toBeNull();
  });

  it('does not print a follower count it never read', async () => {
    stubFetch(GRAPH_500);
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    await screen.findByTestId('social-graph-error');
    // Tab labels and the profile card both used to show a fabricated 0.
    expect(screen.getByRole('tab', { name: 'Followers' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: /Followers \(0\)/ })).toBeNull();
    expect(screen.queryByText('0')).toBeNull();
  });

  it('keeps the genuine empty state when the graph loads and is empty', async () => {
    stubFetch(GRAPH_OK);
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('No followers yet')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('social-graph-error')).toBeNull();
    expect(screen.getByRole('tab', { name: 'Followers (0)' })).toBeInTheDocument();
  });

  it('a refused follow does not make the tabs claim the graph failed to load', async () => {
    stubFetch([
      [/followers$/, { ok: true, status: 200, body: { followers: [PEER] } }],
      [/following$/, { ok: true, status: 200, body: { following: [] } }],
      [/friends$/, { ok: true, status: 200, body: { friends: [] } }],
      [/social\/follow\//, { ok: false, status: 403, body: { error: 'nope' } }],
    ]);
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    await screen.findByText('Grace');
    // Switch to a tab that IS legitimately empty, then fail a follow from it.
    fireEvent.click(screen.getByRole('tab', { name: /Friends/ }));
    expect(screen.getByText('No mutual friends yet')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /Followers/ }));
    fireEvent.click(screen.getByRole('button', { name: /Follow/i }));

    await screen.findByTestId('social-panel-error');
    fireEvent.click(screen.getByRole('tab', { name: /Friends/ }));

    // The follow was refused; the LISTS still loaded fine.
    expect(screen.getByText('No mutual friends yet')).toBeInTheDocument();
    expect(screen.queryByTestId('social-graph-error')).toBeNull();
  });
});
