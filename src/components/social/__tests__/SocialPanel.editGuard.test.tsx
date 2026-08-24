// Editing your own profile used to be impossible in practice.
//
// ProfileCard seeds four form fields from the `user` prop and had an effect
// resetting them keyed on `[user]` — the OBJECT. `publicProfileToUserProfile`
// builds a fresh object every call, so the effect fired on essentially every
// parent render and overwrote all four fields with the server's values,
// wiping whatever had been typed mid-edit. Now keyed on `user.id`, so
// switching profiles still resets but an in-progress edit survives.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const profile = {
  id: 'u1', userId: 'u1', displayName: 'Ada', bio: 'builder',
  avatarUrl: null, visibility: 'public',
};

const updateProfile = vi.fn().mockResolvedValue(undefined);
vi.mock('../../../hooks/useSocialProfile', () => ({
  useSocialProfile: () => ({
    // A NEW object each call — the condition that triggered the bug.
    profile: { ...profile },
    loading: false,
    error: null,
    updateProfile,
    viewProfile: vi.fn(),
  }),
}));

import { SocialPanel } from '../SocialPanel';

describe('SocialPanel profile editing', () => {
  it('keeps typed input across re-renders that hand it a new user object', async () => {
    const { rerender } = render(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    // The card shows a read view until Edit is pressed.
    fireEvent.click(await screen.findByRole('button', { name: /Edit/i }));
    const name = await screen.findByDisplayValue('Ada');
    fireEvent.change(name, { target: { value: 'Ada Lovelace' } });
    expect((name as HTMLInputElement).value).toBe('Ada Lovelace');

    // Parent re-renders — the hook hands back an equal-but-new profile object.
    rerender(<SocialPanel idToken="t" onMessage={vi.fn()} />);
    rerender(<SocialPanel idToken="t" onMessage={vi.fn()} />);

    await waitFor(() =>
      expect((screen.getByDisplayValue('Ada Lovelace') as HTMLInputElement).value)
        .toBe('Ada Lovelace'),
    );
  });
});
