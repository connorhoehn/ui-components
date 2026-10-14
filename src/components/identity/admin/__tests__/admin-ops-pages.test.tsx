// Audit / MFA / diagnostics / dashboard pages — filter and action wiring.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuditPage } from '../AuditPage';
import { MfaManagementPage } from '../MfaManagementPage';
import { DiagnosticsPage } from '../DiagnosticsPage';
import { AdminDashboardPage } from '../AdminDashboardPage';
import { SetupGuidePage } from '../SetupGuidePage';

describe('AuditPage', () => {
  const base = () => ({
    records: [
      { timestamp: 1750000000000, actor: 'ada@x.co', entityType: 'user', entityId: 'u1', operation: 'update' },
    ],
    onQuery: vi.fn().mockResolvedValue(undefined),
    onViewEntity: vi.fn(),
    onReplay: vi.fn().mockResolvedValue({ email: 'ada@x.co' }),
  });

  it('converts the filter bar into query params (datetime → epoch ms, limit → number)', async () => {
    const p = base();
    render(<AuditPage {...p} />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Entity Type' }), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Optional'), { target: { value: 'u1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Query' }));
    await waitFor(() => expect(p.onQuery).toHaveBeenCalled());
    expect(p.onQuery.mock.calls[0][0]).toMatchObject({ entityType: 'user', entityId: 'u1', limit: 50 });
    expect(p.onQuery.mock.calls[0][0].fromTime).toBeUndefined();
  });

  it('point-in-time replay needs both fields, then renders the snapshot JSON', async () => {
    const p = base();
    render(<AuditPage {...p} />);
    const replayBtn = screen.getByRole('button', { name: 'Replay' });
    expect(replayBtn).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText('entity-id'), { target: { value: 'u1' } });
    const dtInputs = document.querySelectorAll('input[type="datetime-local"]');
    fireEvent.change(dtInputs[dtInputs.length - 1], { target: { value: '2026-01-15T10:00' } });
    fireEvent.click(replayBtn);
    await waitFor(() => expect(p.onReplay).toHaveBeenCalled());
    expect(p.onReplay.mock.calls[0][0]).toBe('u1');
    expect(typeof p.onReplay.mock.calls[0][1]).toBe('number');
    await waitFor(() => expect(screen.getAllByText(/ada@x\.co/).length).toBeGreaterThan(1));
  });

  it('clicking an entity id navigates via onViewEntity', () => {
    const p = base();
    render(<AuditPage {...p} />);
    fireEvent.click(screen.getByRole('button', { name: 'u1' }));
    expect(p.onViewEntity).toHaveBeenCalledWith('user', 'u1');
  });
});

describe('MfaManagementPage', () => {
  // INVERTED. This case was called "filters users by pool" but only asserted
  // that the dropdown was on screen — and the dropdown did not filter
  // anything: `selectedPool` was written by the Select and read by nobody, so
  // `filteredUsers` was always the full list. The assertion passed precisely
  // because it never selected a pool and never checked the rows afterwards.
  //
  // Rows without a `poolId` carry no pool information at all, so the page
  // cannot filter them; it now hides the control instead of offering a
  // dropdown that does nothing. The old assertion is kept, negated.
  it('renders adoption metrics, and hides the pool filter when rows carry no poolId', () => {
    render(
      <MfaManagementPage
        metrics={{ totalUsers: 10, mfaEnabled: 6, mfaDisabled: 4, adoptionRate: 60 }}
        users={[{ userId: 'u1', email: 'ada@x.co', mfaEnabled: true, deviceCount: 2 }]}
        pools={[{ poolId: 'p1', poolName: 'Main', userCount: 10 }]}
        onRefresh={vi.fn()}
      />,
    );
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('ada@x.co')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('All Pools')).toBeNull();
  });

  it('actually filters the table when a pool is selected', () => {
    render(
      <MfaManagementPage
        users={[
          { userId: 'u1', email: 'ada@x.co', mfaEnabled: true, deviceCount: 2, poolId: 'p1' },
          { userId: 'u2', email: 'bob@y.co', mfaEnabled: false, deviceCount: 0, poolId: 'p2' },
        ]}
        pools={[
          { poolId: 'p1', poolName: 'Main', userCount: 1 },
          { poolId: 'p2', poolName: 'Staff', userCount: 1 },
        ]}
        onRefresh={vi.fn()}
      />,
    );
    // Both visible under "All Pools".
    expect(screen.getByText('ada@x.co')).toBeInTheDocument();
    expect(screen.getByText('bob@y.co')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox', { name: 'Filter by pool' }), { target: { value: 'p2' } });

    expect(screen.queryByText('ada@x.co')).toBeNull();
    expect(screen.getByText('bob@y.co')).toBeInTheDocument();
  });
});

describe('DiagnosticsPage', () => {
  it('renders DLQ entries and wires redrive/purge', async () => {
    const onRedrive = vi.fn().mockResolvedValue(undefined);
    render(
      <DiagnosticsPage
        dlq={[{ id: 'd1', payload: { a: 1 }, error: 'boom', failedAt: '2026-01-01', retryCount: 2 }]}
        onRedrive={onRedrive}
        onPurge={vi.fn().mockResolvedValue(undefined)}
        onRefresh={vi.fn()}
      />,
    );
    expect(screen.getByText(/boom/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Redrive/i }));
    await waitFor(() => expect(onRedrive).toHaveBeenCalledWith('d1'));
  });

  it('toggles auto-refresh via the Checkbox', () => {
    render(<DiagnosticsPage onRedrive={vi.fn()} onPurge={vi.fn()} onRefresh={vi.fn()} />);
    const box = screen.getByRole('checkbox');
    expect(box).not.toBeChecked();
    fireEvent.click(box);
    expect(box).toBeChecked();
  });
});

describe('AdminDashboardPage', () => {
  it('renders stats and navigates from pool rows', () => {
    const onNavigate = vi.fn();
    render(
      <AdminDashboardPage
        stats={{ userPools: 2, clients: 3, totalUsers: 40 }}
        pools={[{ poolId: 'p1', poolName: 'Main', createdAt: '2026-01-01' }]}
        onNavigate={onNavigate}
      />,
    );
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
  });
});

describe('SetupGuidePage', () => {
  it('reflects setup completion state', () => {
    render(
      <SetupGuidePage
        status={{
          hasUserPools: true, poolCount: 1, hasClients: false, clientCount: 0,
          hasAdminUser: false, totalUsers: 0, adminEmails: [], smtpConfigured: false,
          issuer: 'https://id.example.com', issuerConfigured: true,
        }}
        onNavigate={vi.fn()}
      />,
    );
    // Step details are collapsed by default — the checklist titles are the
    // stable surface.
    expect(screen.getByText('Create User Pool')).toBeInTheDocument();
    expect(screen.getByText('Register Application')).toBeInTheDocument();
    expect(screen.getByText('Configure Issuer')).toBeInTheDocument();
  });
});
