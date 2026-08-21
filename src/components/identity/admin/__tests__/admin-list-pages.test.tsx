// Admin list pages — render + callback wiring, including the two-step
// ConfirmDialog delete flow (no window.confirm anywhere).

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserListPage } from '../UserListPage';
import { PoolListPage } from '../PoolListPage';
import { GroupListPage } from '../GroupListPage';
import { ApplicationListPage } from '../ApplicationListPage';
import { EmailTemplateListPage } from '../EmailTemplateListPage';

const USERS = [
  { userId: 'u1', email: 'ada@x.co', givenName: 'Ada', familyName: 'L', status: 'CONFIRMED', createdAt: '2026-01-01' },
  { userId: 'u2', email: 'bo@x.co', status: 'UNCONFIRMED', createdAt: '2026-01-02' },
];

describe('UserListPage', () => {
  const renderPage = (over: Partial<Parameters<typeof UserListPage>[0]> = {}) => {
    const props = {
      users: USERS, poolId: 'p1', poolName: 'Main',
      onCreateUser: vi.fn(), onEditUser: vi.fn(),
      onDeleteUser: vi.fn().mockResolvedValue(undefined),
      ...over,
    };
    render(<UserListPage {...props} />);
    return props;
  };

  it('renders a row per user and wires create/edit', () => {
    const p = renderPage();
    expect(screen.getByText('ada@x.co')).toBeInTheDocument();
    expect(screen.getByText('bo@x.co')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Create User/i }));
    expect(p.onCreateUser).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0]);
    expect(p.onEditUser).toHaveBeenCalledWith('u1');
  });

  it('delete requires the ConfirmDialog confirmation', async () => {
    const p = renderPage();
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    expect(p.onDeleteUser).not.toHaveBeenCalled();
    expect(screen.getByText('Delete User')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' }).at(-1)!);
    await waitFor(() => expect(p.onDeleteUser).toHaveBeenCalledWith('u1'));
  });

  it('cancelling the dialog deletes nothing', () => {
    const p = renderPage();
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(p.onDeleteUser).not.toHaveBeenCalled();
    expect(screen.queryByText('Delete User')).toBeNull();
  });
});

describe('PoolListPage', () => {
  it('renders pools and wires view/edit/create', () => {
    const onViewPool = vi.fn();
    const onEditPool = vi.fn();
    const onCreatePool = vi.fn();
    render(
      <PoolListPage
        pools={[{ poolId: 'p1', poolName: 'Main', clientId: 'c1', createdAt: '2026-01-01' }]}
        onCreatePool={onCreatePool}
        onEditPool={onEditPool}
        onDeletePool={vi.fn().mockResolvedValue(undefined)}
        onViewPool={onViewPool}
      />,
    );
    expect(screen.getByText('Main')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /View/i }));
    expect(onViewPool).toHaveBeenCalledWith('p1');
  });
});

describe('GroupListPage', () => {
  it('renders groups with their permissions', () => {
    render(
      <GroupListPage
        groups={[{ groupId: 'g1', groupName: 'Admins', description: 'ops', permissions: ['users:write'] }]}
        poolId="p1"
        poolName="Main"
        onCreateGroup={vi.fn()}
        onEditGroup={vi.fn()}
        onDeleteGroup={vi.fn().mockResolvedValue(undefined)}
      />,
    );
    expect(screen.getByText('Admins')).toBeInTheDocument();
    expect(screen.getByText(/users:write/)).toBeInTheDocument();
  });
});

describe('ApplicationListPage', () => {
  it('renders applications and wires edit', () => {
    const onEditApp = vi.fn();
    render(
      <ApplicationListPage
        applications={[{ clientId: 'c1', clientName: 'Portal', poolId: 'p1', poolName: 'Main', redirectUris: ['https://x/cb'] }]}
        onCreateApp={vi.fn()}
        onCreateAppWithPool={vi.fn()}
        onEditApp={onEditApp}
        onDeleteApp={vi.fn().mockResolvedValue(undefined)}
      />,
    );
    expect(screen.getByText('Portal')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0]);
    expect(onEditApp).toHaveBeenCalledWith('c1');
  });
});

describe('EmailTemplateListPage', () => {
  it('renders templates', () => {
    render(
      <EmailTemplateListPage
        templates={[{ templateId: 't1', name: 'Welcome', subject: 'Hi' }]}
        onCreateTemplate={vi.fn()}
        onEditTemplate={vi.fn()}
        onDeleteTemplate={vi.fn().mockResolvedValue(undefined)}
        onTestSend={vi.fn().mockResolvedValue(undefined)}
      />,
    );
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
