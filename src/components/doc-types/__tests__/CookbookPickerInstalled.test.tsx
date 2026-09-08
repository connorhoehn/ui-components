// The gallery must know what the host already has.
//
// Measured before this existed: the Document Types page offered "Add this
// type" for all fourteen cookbooks including the three already installed, and
// clicking one produced a SECOND type with the same name, icon and field
// count — indistinguishable from the first in the type list, in the create
// dialog, and on every document's type chip.

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookbookPicker } from '../cookbooks/CookbookPicker';

const P = { idPrefix: 'p', cardPrefix: 'c' } as const;

describe('CookbookPicker installed state', () => {
  it('offers every cookbook when the host declares nothing installed', () => {
    // The default, and the new-document dialog's case: you are starting a
    // document, not installing a type, so every cookbook is a valid choice
    // however many you have already used.
    render(<CookbookPicker onPick={vi.fn()} {...P} />);
    expect(screen.getByTestId('c-use-meeting-notes')).toBeTruthy();
    expect(screen.queryByTestId('c-installed-meeting-notes')).toBeNull();
  });

  it('marks an installed cookbook and withdraws its Add button', () => {
    render(<CookbookPicker onPick={vi.fn()} installedNames={['Meeting Notes']} {...P} />);
    expect(screen.queryByTestId('c-use-meeting-notes')).toBeNull();
    expect(screen.getByTestId('c-installed-meeting-notes')).toBeTruthy();
    // The others are untouched.
    expect(screen.getByTestId('c-use-bug-report')).toBeTruthy();
  });

  it('matches names case- and whitespace-insensitively', () => {
    // The host's stored name came from a text field a person typed into; the
    // cookbook's is a literal.
    render(<CookbookPicker onPick={vi.fn()} installedNames={['  meeting NOTES ']} {...P} />);
    expect(screen.getByTestId('c-installed-meeting-notes')).toBeTruthy();
  });

  it('cannot install a duplicate even by clicking', async () => {
    const onPick = vi.fn();
    render(<CookbookPicker onPick={onPick} installedNames={['Meeting Notes']} {...P} />);
    await userEvent.click(screen.getByTestId('c-installed-meeting-notes'));
    expect(onPick).not.toHaveBeenCalled();
  });

  it('offers the way TO the existing one rather than a silent refusal', async () => {
    const onOpenInstalled = vi.fn();
    render(
      <CookbookPicker
        onPick={vi.fn()}
        installedNames={['Meeting Notes']}
        onOpenInstalled={onOpenInstalled}
        {...P}
      />,
    );
    const btn = screen.getByTestId('c-installed-meeting-notes');
    expect(btn.textContent).toContain('Open');
    await userEvent.click(btn);
    expect(onOpenInstalled).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Meeting Notes' }),
    );
  });

  it('says only "Added" when the host offers nowhere to go', () => {
    // Disabling without an alternative is still better than offering a
    // duplicate, but the label must not promise a destination.
    render(<CookbookPicker onPick={vi.fn()} installedNames={['Meeting Notes']} {...P} />);
    const btn = screen.getByTestId('c-installed-meeting-notes') as HTMLButtonElement;
    expect(btn.textContent).toBe('Added');
    expect(btn.disabled).toBe(true);
  });
});
