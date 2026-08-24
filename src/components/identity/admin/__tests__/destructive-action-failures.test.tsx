// Failure paths for the identity destructive actions.
//
// Every pre-existing delete test in this folder passes `mockResolvedValue`,
// so the whole rejection path was unexercised — and it was broken in the same
// way in all six components: the state reset lived in `finally`, so a rejected
// mutation closed the dialog exactly like a success, showed no message, and
// left the row in place. An admin's only signal was the row not disappearing,
// which reads as a stale list rather than a refused delete.
//
// These tests assert the two things that make the failure legible: the dialog
// STAYS OPEN, and the server's reason is shown.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserListPage } from '../UserListPage';
import { GroupListPage } from '../GroupListPage';
import { PoolListPage } from '../PoolListPage';
import { ApplicationListPage } from '../ApplicationListPage';
import { EmailTemplateListPage } from '../EmailTemplateListPage';
import { MfaDashboardPage } from '../../auth/MfaDashboardPage';

const BOOM = 'Refused: user is the last remaining administrator';

/** Click the row's Delete button, then the dialog's Confirm. */
async function deleteFirstRow(rowButtonName = 'Delete') {
  fireEvent.click(screen.getAllByRole('button', { name: rowButtonName })[0]);
  fireEvent.click(screen.getByTestId('confirm-dialog-confirm'));
}

describe('destructive actions surface server failures', () => {
  it('UserListPage keeps the dialog open and shows why the delete failed', async () => {
    const onDeleteUser = vi.fn().mockRejectedValue(new Error(BOOM));
    render(
      <UserListPage
        users={[{ userId: 'u1', email: 'ada@x.co', status: 'CONFIRMED', createdAt: '2024-01-01' }]}
        poolId="p1"
        poolName="Main"
        onCreateUser={vi.fn()}
        onEditUser={vi.fn()}
        onDeleteUser={onDeleteUser}
      />,
    );
    await deleteFirstRow();
    await waitFor(() => expect(onDeleteUser).toHaveBeenCalledWith('u1'));

    // The reason is announced, not swallowed.
    await screen.findByRole('alert');
    expect(screen.getByText(BOOM)).toBeInTheDocument();
    // And the confirm dialog is still up, so the admin can retry or cancel.
    expect(screen.getByTestId('confirm-dialog-confirm')).toBeInTheDocument();
    // The row is untouched.
    expect(screen.getByText('ada@x.co')).toBeInTheDocument();
  });

  it('UserListPage still closes the dialog on a successful delete', async () => {
    const onDeleteUser = vi.fn().mockResolvedValue(undefined);
    render(
      <UserListPage
        users={[{ userId: 'u1', email: 'ada@x.co', status: 'CONFIRMED', createdAt: '2024-01-01' }]}
        poolId="p1"
        poolName="Main"
        onCreateUser={vi.fn()}
        onEditUser={vi.fn()}
        onDeleteUser={onDeleteUser}
      />,
    );
    await deleteFirstRow();
    await waitFor(() => expect(screen.queryByTestId('confirm-dialog-confirm')).toBeNull());
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('a stale error does not follow the dialog onto the next row', async () => {
    const onDeleteUser = vi.fn().mockRejectedValue(new Error(BOOM));
    render(
      <UserListPage
        users={[
          { userId: 'u1', email: 'ada@x.co', status: 'CONFIRMED', createdAt: '2024-01-01' },
          { userId: 'u2', email: 'bob@y.co', status: 'CONFIRMED', createdAt: '2024-01-02' },
        ]}
        poolId="p1"
        poolName="Main"
        onCreateUser={vi.fn()}
        onEditUser={vi.fn()}
        onDeleteUser={onDeleteUser}
      />,
    );
    await deleteFirstRow();
    await screen.findByText(BOOM);

    // Dismiss, then open the dialog for a different row.
    fireEvent.click(screen.getByTestId('confirm-dialog-cancel'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1]);
    expect(screen.queryByText(BOOM)).toBeNull();
  });

  it('GroupListPage surfaces a failed delete', async () => {
    const onDeleteGroup = vi.fn().mockRejectedValue(new Error(BOOM));
    render(
      <GroupListPage
        groups={[{ groupId: 'g1', groupName: 'Admins', permissions: [] }]}
        poolId="p1"
        poolName="Main"
        onCreateGroup={vi.fn()}
        onEditGroup={vi.fn()}
        onDeleteGroup={onDeleteGroup}
      />,
    );
    await deleteFirstRow();
    await screen.findByText(BOOM);
    expect(screen.getByTestId('confirm-dialog-confirm')).toBeInTheDocument();
  });

  it('PoolListPage surfaces a failed delete', async () => {
    const onDeletePool = vi.fn().mockRejectedValue(new Error(BOOM));
    render(
      <PoolListPage
        pools={[{ poolId: 'p1', poolName: 'Main', clientId: 'c1', createdAt: '2024-01-01' }]}
        onCreatePool={vi.fn()}
        onEditPool={vi.fn()}
        onDeletePool={onDeletePool}
        onViewPool={vi.fn()}
      />,
    );
    await deleteFirstRow();
    await screen.findByText(BOOM);
    expect(screen.getByTestId('confirm-dialog-confirm')).toBeInTheDocument();
  });

  it('ApplicationListPage surfaces a failed delete', async () => {
    const onDeleteApp = vi.fn().mockRejectedValue(new Error(BOOM));
    render(
      <ApplicationListPage
        applications={[{ clientId: 'c1', clientName: 'Web', poolId: 'p1', redirectUris: [] }]}
        onCreateApp={vi.fn()}
        onCreateAppWithPool={vi.fn()}
        onEditApp={vi.fn()}
        onDeleteApp={onDeleteApp}
      />,
    );
    await deleteFirstRow();
    await screen.findByText(BOOM);
    expect(screen.getByTestId('confirm-dialog-confirm')).toBeInTheDocument();
  });

  it('EmailTemplateListPage surfaces a failed delete', async () => {
    const onDeleteTemplate = vi.fn().mockRejectedValue(new Error(BOOM));
    render(
      <EmailTemplateListPage
        templates={[{ templateId: 't1', name: 'Welcome', subject: 'Hi' }]}
        onCreateTemplate={vi.fn()}
        onEditTemplate={vi.fn()}
        onDeleteTemplate={onDeleteTemplate}
        onTestSend={vi.fn()}
      />,
    );
    await deleteFirstRow();
    await screen.findByText(BOOM);
    expect(screen.getByTestId('confirm-dialog-confirm')).toBeInTheDocument();
  });

  it('EmailTemplateListPage surfaces a failed test send', async () => {
    const onTestSend = vi.fn().mockRejectedValue(new Error('SES rejected the recipient'));
    render(
      <EmailTemplateListPage
        templates={[{ templateId: 't1', name: 'Welcome', subject: 'Hi' }]}
        onCreateTemplate={vi.fn()}
        onEditTemplate={vi.fn()}
        onDeleteTemplate={vi.fn()}
        onTestSend={onTestSend}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Test Send' }));
    fireEvent.change(screen.getByLabelText(/Recipient Email/i), {
      target: { value: 'ops@x.co' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    await screen.findByText('SES rejected the recipient');
  });
});

describe('MfaDashboardPage surfaces device-action failures', () => {
  const device = {
    deviceId: 'd1',
    deviceName: 'Pixel',
    deviceType: 'TOTP',
    isVerified: true,
    createdAt: '2024-01-01',
  };

  it('a failed device removal keeps the dialog open and says why', async () => {
    // The nastiest version of this bug: a user who believes they removed their
    // last MFA device, and did not, thinks MFA is off — until the next sign-in
    // demands the device they think is gone.
    const onRemoveDevice = vi.fn().mockRejectedValue(new Error('Cannot remove your only device'));
    render(
      <MfaDashboardPage
        devices={[device]}
        mfaEnabled
        onAddDevice={vi.fn()}
        onRenameDevice={vi.fn()}
        onRemoveDevice={onRemoveDevice}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    fireEvent.click(screen.getByTestId('confirm-dialog-confirm'));

    await screen.findByText('Cannot remove your only device');
    expect(screen.getByTestId('confirm-dialog-confirm')).toBeInTheDocument();
    expect(screen.getByText('Pixel')).toBeInTheDocument();
  });

  it('a failed rename keeps the rename form open and says why', async () => {
    const onRenameDevice = vi.fn().mockRejectedValue(new Error('Name already in use'));
    render(
      <MfaDashboardPage
        devices={[device]}
        mfaEnabled
        onAddDevice={vi.fn()}
        onRenameDevice={onRenameDevice}
        onRemoveDevice={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Rename' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await screen.findByText('Name already in use');
    // Still editing, so the typed name is not silently discarded.
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('a successful rename closes the form and shows no error', async () => {
    const onRenameDevice = vi.fn().mockResolvedValue(undefined);
    render(
      <MfaDashboardPage
        devices={[device]}
        mfaEnabled
        onAddDevice={vi.fn()}
        onRenameDevice={onRenameDevice}
        onRemoveDevice={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Rename' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(screen.queryByRole('button', { name: 'Save' })).toBeNull());
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
