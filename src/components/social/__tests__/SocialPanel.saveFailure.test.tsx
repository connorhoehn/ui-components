// A rejected profile save used to be indistinguishable from an accepted one.
//
// `useSocialProfile.updateProfile` caught its own error and resolved, and
// `ProfileCard.handleSave` closed the editor in a `finally`. So a 500 dismissed
// the form, the card repainted from the SERVER's unchanged profile, and the
// user read their old bio back believing it was the one they had just written.
// Two halves to the fix: the hook rethrows, and the editor stays open with a
// message when it does.
//
// Mount-count independent: every assertion is on rendered text or on which
// arguments a mock was called with, never on a call index.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseSocialProfileReturn } from '../../../hooks/useSocialProfile';
import type { UseFriendsReturn } from '../../../hooks/useFriends';

const useSocialProfileMock = vi.fn<() => UseSocialProfileReturn>();
const useFriendsMock = vi.fn<() => UseFriendsReturn>();

vi.mock('../../../hooks/useSocialProfile', () => ({
  useSocialProfile: () => useSocialProfileMock(),
}));
vi.mock('../../../hooks/useFriends', () => ({
  useFriends: () => useFriendsMock(),
}));

import { SocialPanel } from '../SocialPanel';

function makeProfile(over: Partial<UseSocialProfileReturn> = {}): UseSocialProfileReturn {
  return {
    profile: {
      userId: 'u1',
      displayName: 'Ada',
      bio: 'builder',
      visibility: 'public',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    },
    loading: false,
    error: null,
    updateProfile: vi.fn().mockResolvedValue(undefined),
    viewProfile: vi.fn().mockResolvedValue(null),
    ...over,
  };
}

function makeFriends(over: Partial<UseFriendsReturn> = {}): UseFriendsReturn {
  return {
    followers: [],
    following: [],
    friends: [],
    follow: vi.fn().mockResolvedValue(undefined),
    unfollow: vi.fn().mockResolvedValue(undefined),
    loading: false,
    error: null,
    ...over,
  };
}

beforeEach(() => {
  useSocialProfileMock.mockReset();
  useFriendsMock.mockReset();
  useFriendsMock.mockReturnValue(makeFriends());
});

async function openEditorAndSave(hook: UseSocialProfileReturn) {
  useSocialProfileMock.mockReturnValue(hook);
  render(<SocialPanel idToken="t" onMessage={vi.fn()} />);
  fireEvent.click(await screen.findByRole('button', { name: /Edit profile/i }));
  const bio = await screen.findByDisplayValue('builder');
  fireEvent.change(bio, { target: { value: 'rewritten bio' } });
  fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));
  return bio;
}

describe('SocialPanel — failed profile save', () => {
  it('keeps the editor open, keeps the typed text, and says why', async () => {
    const bio = await openEditorAndSave(
      makeProfile({
        updateProfile: vi.fn().mockRejectedValue(new Error('Failed to update profile (500)')),
      }),
    );

    const alert = await screen.findByTestId('profile-save-error');
    expect(alert).toHaveTextContent(/500/);
    // Still in the editor — the "Save Changes" button only exists there.
    expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
    // ...and the user's words are still in the box, not thrown away.
    expect((bio as HTMLTextAreaElement).value).toBe('rewritten bio');
  });

  it('closes the editor on a save the server accepted', async () => {
    await openEditorAndSave(makeProfile());

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Edit profile/i })).toBeInTheDocument(),
    );
    expect(screen.queryByTestId('profile-save-error')).toBeNull();
  });
});

describe('SocialPanel — failed profile load', () => {
  it('reports the failure instead of rendering an empty card', () => {
    useSocialProfileMock.mockReturnValue(
      makeProfile({ profile: null, error: 'Failed to load profile (503)' }),
    );
    render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    expect(screen.getByTestId('social-panel-error')).toHaveTextContent(/503/);
  });
});
