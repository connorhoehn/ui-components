// Regression: GroupPanel's "No groups yet" was unconditionally true.
//
// `useGroups` had no list loader at all — not a private one, not an exported
// one a host could call — so `groups` only ever contained what the current
// session had just created. A user with twenty groups on the server opened the
// panel and was told they had none, and there was no loading state and no
// error state to contradict it. These tests drive the real hook against a
// stubbed `fetch`; mocking `useGroups` would test only the new JSX and would
// pass against the bug.

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GroupPanel } from '../GroupPanel';

const BASE = 'http://social-api';
const TOKEN = `h.${btoa(JSON.stringify({ sub: 'u1' }))}.s`;

const SERVER_GROUPS = [
  { groupId: 'g1', name: 'Team Alpha', visibility: 'public' as const, ownerId: 'u1', createdAt: '2024-01-01T00:00:00.000Z' },
  { groupId: 'g2', name: 'Team Beta', visibility: 'private' as const, ownerId: 'u9', createdAt: '2024-01-02T00:00:00.000Z' },
];

/** Never-settling GET so the pending state stays observable. */
function stubPendingList() {
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
}

function stubList(groups: typeof SERVER_GROUPS, ok = true, status = ok ? 200 : 500) {
  vi.stubGlobal('fetch', vi.fn((url: string, init?: RequestInit) => {
    if (url.endsWith('/api/groups') && (init?.method ?? 'GET') === 'GET') {
      return Promise.resolve({ ok, status, json: () => Promise.resolve({ groups }) });
    }
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ members: [] }) });
  }));
}

function renderPanel(compact = false) {
  return render(
    <GroupPanel idToken={TOKEN} rooms={[]} createGroupRoom={vi.fn()} roomsLoading={false} compact={compact} />,
  );
}

beforeEach(() => { vi.stubEnv('VITE_SOCIAL_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('GroupPanel — hydrates from the server', () => {
  it('renders the groups the server holds', async () => {
    stubList(SERVER_GROUPS);
    renderPanel();

    expect(await screen.findByText('Team Alpha')).toBeInTheDocument();
    expect(screen.getByText('Team Beta')).toBeInTheDocument();
    expect(screen.queryByText('No groups yet')).toBeNull();
  });

  it('issues GET /api/groups with the bearer token', async () => {
    stubList([]);
    renderPanel();

    // Selected by url+method, not by index: StrictMode double-mounts.
    await waitFor(() => {
      const calls = (globalThis.fetch as unknown as { mock: { calls: [string, RequestInit | undefined][] } }).mock.calls;
      const gets = calls.filter(([url, init]) => url === `${BASE}/api/groups` && (init?.method ?? 'GET') === 'GET');
      expect(gets.length).toBeGreaterThan(0);
      expect((gets[0][1]?.headers as Record<string, string>).Authorization).toBe(`Bearer ${TOKEN}`);
    });
  });

  it('does NOT claim "No groups yet" before the server has answered', () => {
    stubPendingList();
    renderPanel();

    expect(screen.queryByText('No groups yet')).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent(/Loading groups/i);
  });

  it('compact mode also waits for the answer', () => {
    stubPendingList();
    renderPanel(true);

    expect(screen.queryByText('No groups yet')).toBeNull();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows a retry affordance instead of the empty state when the load fails', async () => {
    stubList([], false, 503);
    renderPanel();

    expect(await screen.findByTestId('groups-load-error')).toBeInTheDocument();
    expect(screen.queryByText('No groups yet')).toBeNull();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('still shows the empty state when the server genuinely returns none', async () => {
    stubList([]);
    renderPanel();

    expect(await screen.findByText('No groups yet')).toBeInTheDocument();
  });
});
