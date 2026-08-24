// Regression: a group invite that FAILS must not look like one that worked.
//
// `useGroups.inviteUser` caught its own failure, wrote it to `error`, and
// resolved normally. GroupPanel never destructured `error`, and both invite
// forms cleared the user-id field (and the compact one closed itself) right
// after the bare `await`. A 403/500 invite therefore produced exactly the same
// pixels as a successful one: empty field, form gone, no message, and the user
// believing someone had been invited who had not.
//
// Note on the mocking: `inviteUser` is exercised through the real hook against
// a stubbed `fetch`, not by mocking the hook. Mocking `useGroups` to reject
// would only test GroupPanel's new catch and would pass against the bug.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GroupPanel } from '../GroupPanel';

const BASE = 'http://social-api';
// GroupPanel derives currentUserId from the JWT payload; owner-ness is what
// gates the invite form onto the screen.
const TOKEN = `h.${btoa(JSON.stringify({ sub: 'u1' }))}.s`;
const GROUP = {
  groupId: 'g1', name: 'Team', visibility: 'public' as const,
  ownerId: 'u1', createdAt: new Date().toISOString(),
};

/** POST /api/groups succeeds; members load empty; the invite POST answers `inviteStatus`. */
function stubApi(inviteStatus: number) {
  vi.stubGlobal('fetch', vi.fn((url: string, init?: RequestInit) => {
    if (url.endsWith('/api/groups') && init?.method === 'POST') {
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(GROUP) });
    }
    if (url.includes('/invite')) {
      return Promise.resolve({ ok: inviteStatus === 200, status: inviteStatus, json: () => Promise.resolve({}) });
    }
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ members: [] }) });
  }));
}

/** Create a group, select it, and return the invite input. */
async function openInviteForm() {
  render(
    <GroupPanel idToken={TOKEN} rooms={[]} createGroupRoom={vi.fn()} roomsLoading={false} />,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Create Group' }));
  fireEvent.change(screen.getByPlaceholderText('Group name'), { target: { value: 'Team' } });
  fireEvent.submit(screen.getByPlaceholderText('Group name').closest('form')!);

  fireEvent.click(await screen.findByRole('button', { name: /Select group Team/ }));
  return screen.findByPlaceholderText('User ID to invite');
}

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('GroupPanel — failed invite', () => {
  it('reports the failure and keeps the typed id so the invite can be retried', async () => {
    stubApi(500);
    const input = await openInviteForm();

    fireEvent.change(input, { target: { value: 'u2' } });
    fireEvent.submit(input.closest('form')!);

    expect(await screen.findByTestId('invite-error')).toHaveTextContent(/500/);
    // The field must NOT clear — clearing is the "it worked" signal.
    expect((input as HTMLInputElement).value).toBe('u2');
  });

  it('clears the field and shows no error when the invite succeeds', async () => {
    stubApi(200);
    const input = await openInviteForm();

    fireEvent.change(input, { target: { value: 'u2' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('');
    });
    expect(screen.queryByTestId('invite-error')).toBeNull();
  });
});
