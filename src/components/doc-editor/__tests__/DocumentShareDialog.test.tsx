// The share surface renders an answer someone else computed. It is not a
// permissions engine, and the tests hold it to that: every change is reported
// out, nothing is decided here.

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentShareDialog } from '../DocumentShareDialog';

afterEach(cleanup);

const people = [
  { userId: 'u1', displayName: 'Eve Thompson', role: 'owner' as const },
  { userId: 'u2', displayName: 'Ana Ruiz', role: 'editor' as const },
];

const open = (props: Record<string, unknown> = {}) =>
  render(<DocumentShareDialog open onClose={vi.fn()} people={people} {...props} />);

describe('DocumentShareDialog', () => {
  it('lists everyone with access', () => {
    open();
    expect(screen.getAllByTestId('document-share-dialog-person')).toHaveLength(2);
    expect(screen.getByText('Ana Ruiz')).toBeInTheDocument();
  });

  // A document with no owner is a document nobody is responsible for, so the
  // owner's role is stated rather than offered.
  it('does not offer to demote the owner', () => {
    open({ onChangeRole: vi.fn() });
    const selects = screen.getAllByTestId('document-share-dialog-role');
    expect(selects).toHaveLength(1);
    expect(screen.getByTestId('document-share-dialog-role-static')).toHaveTextContent('Owner');
  });

  it('reports a role change rather than applying one', () => {
    const onChangeRole = vi.fn();
    open({ onChangeRole });
    fireEvent.change(screen.getByTestId('document-share-dialog-role'), { target: { value: 'viewer' } });
    expect(onChangeRole).toHaveBeenCalledWith('u2', 'viewer');
  });

  it('names the org in the general-access wording', () => {
    open({ orgName: 'Acme', generalAccess: 'org-view', onChangeGeneralAccess: vi.fn() });
    expect(screen.getByTestId('document-share-dialog-general-access')).toHaveValue('org-view');
    expect(screen.getByText('Anyone at Acme can view')).toBeInTheDocument();
  });

  // Without a handler the control still shows the state — it just cannot be
  // used to pretend a change happened.
  it('shows general access read-only when the host cannot change it', () => {
    open();
    expect(screen.getByTestId('document-share-dialog-general-access')).toBeDisabled();
  });

  it('invites on Enter and clears the field', () => {
    const onInvite = vi.fn();
    open({ onInvite });
    const input = screen.getByTestId('document-share-dialog-invite-input');
    fireEvent.change(input, { target: { value: 'bo@acme.test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onInvite).toHaveBeenCalledWith('bo@acme.test');
    expect(input).toHaveValue('');
  });

  it('refuses to invite nothing', () => {
    const onInvite = vi.fn();
    open({ onInvite });
    fireEvent.click(screen.getByTestId('document-share-dialog-invite'));
    expect(onInvite).not.toHaveBeenCalled();
  });
});
