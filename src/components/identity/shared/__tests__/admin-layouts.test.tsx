import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IdentityAdminLayout } from '../IdentityAdminLayout';
import { PoolScopedLayout } from '../PoolScopedLayout';

// ---------------------------------------------------------------------------
// IdentityAdminLayout
// ---------------------------------------------------------------------------

describe('IdentityAdminLayout', () => {
  const NAV_LABELS = [
    'Dashboard',
    'Pools',
    'Applications',
    'Email Templates',
    'Audit',
    'Diagnostics',
    'Setup Guide',
  ];

  it('renders all seven nav items', () => {
    render(
      <IdentityAdminLayout onNavigate={() => {}}>
        <div>content</div>
      </IdentityAdminLayout>,
    );
    for (const label of NAV_LABELS) {
      expect(screen.getByRole('button', { name: new RegExp(label) })).toBeInTheDocument();
    }
  });

  it('marks the active nav item with aria-current="page"', () => {
    render(
      <IdentityAdminLayout
        activePath="/identity/admin/audit"
        onNavigate={() => {}}
      >
        <div>content</div>
      </IdentityAdminLayout>,
    );
    const auditBtn = screen.getByRole('button', { name: /Audit/ });
    expect(auditBtn).toHaveAttribute('aria-current', 'page');

    const dashboardBtn = screen.getByRole('button', { name: /Dashboard/ });
    expect(dashboardBtn).not.toHaveAttribute('aria-current');
  });

  it('fires onNavigate with the nav item path when clicked', () => {
    const onNavigate = vi.fn();
    render(
      <IdentityAdminLayout onNavigate={onNavigate}>
        <div>content</div>
      </IdentityAdminLayout>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Pools/ }));
    expect(onNavigate).toHaveBeenCalledWith('/identity/admin/pools');
  });

  it('renders adminEmail when provided', () => {
    render(
      <IdentityAdminLayout adminEmail="admin@example.com" onNavigate={() => {}}>
        <div>content</div>
      </IdentityAdminLayout>,
    );
    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
  });

  it('omits adminEmail when not provided', () => {
    render(
      <IdentityAdminLayout onNavigate={() => {}}>
        <div>content</div>
      </IdentityAdminLayout>,
    );
    // No header span exists for the email
    expect(screen.queryByText('admin@example.com')).not.toBeInTheDocument();
  });

  it('renders Logout only when onLogout is set, and fires it on click', () => {
    const onLogout = vi.fn();
    const { rerender } = render(
      <IdentityAdminLayout onNavigate={() => {}}>
        <div>content</div>
      </IdentityAdminLayout>,
    );
    expect(screen.queryByRole('button', { name: /Logout/ })).not.toBeInTheDocument();

    rerender(
      <IdentityAdminLayout onNavigate={() => {}} onLogout={onLogout}>
        <div>content</div>
      </IdentityAdminLayout>,
    );
    const logoutBtn = screen.getByRole('button', { name: /Logout/ });
    fireEvent.click(logoutBtn);
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('toggle button collapses and reopens the sidebar', () => {
    render(
      <IdentityAdminLayout onNavigate={() => {}}>
        <div>content</div>
      </IdentityAdminLayout>,
    );
    const toggle = screen.getByRole('button', { name: 'Toggle sidebar' });
    const sidebar = screen.getByText('Identity Admin').closest('aside') as HTMLElement;

    // Open by default
    expect(sidebar.className).toContain('w-60');

    fireEvent.click(toggle);
    expect(sidebar.className).toContain('w-0');

    fireEvent.click(toggle);
    expect(sidebar.className).toContain('w-60');
  });

  it('renders children inside main', () => {
    render(
      <IdentityAdminLayout onNavigate={() => {}}>
        <div data-testid="page-content">Hello content</div>
      </IdentityAdminLayout>,
    );
    const main = screen.getByRole('main');
    expect(within(main).getByTestId('page-content')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// PoolScopedLayout
// ---------------------------------------------------------------------------

describe('PoolScopedLayout', () => {
  const DEFAULTS = {
    poolId: 'pool-42',
    poolName: 'Acme Pool',
    onNavigate: () => {},
    onBack: () => {},
  };

  it('renders the pool name in the breadcrumb', () => {
    render(
      <PoolScopedLayout {...DEFAULTS}>
        <div>content</div>
      </PoolScopedLayout>,
    );
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(nav).getByText('Acme Pool')).toBeInTheDocument();
  });

  it('renders the capitalized section label only when activeSection is set', () => {
    const { rerender } = render(
      <PoolScopedLayout {...DEFAULTS}>
        <div>content</div>
      </PoolScopedLayout>,
    );
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(nav).queryByText('Users')).not.toBeInTheDocument();

    rerender(
      <PoolScopedLayout {...DEFAULTS} activeSection="users">
        <div>content</div>
      </PoolScopedLayout>,
    );
    const navAfter = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(navAfter).getByText('Users')).toBeInTheDocument();
  });

  it('renders all three tabs and marks the active one with aria-selected=true', () => {
    render(
      <PoolScopedLayout {...DEFAULTS} activeSection="groups">
        <div>content</div>
      </PoolScopedLayout>,
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    const labels = tabs.map((t) => t.textContent);
    expect(labels).toEqual(['Users', 'Groups', 'MFA']);

    const groupsTab = screen.getByRole('tab', { name: 'Groups' });
    expect(groupsTab).toHaveAttribute('aria-selected', 'true');

    const usersTab = screen.getByRole('tab', { name: 'Users' });
    expect(usersTab).toHaveAttribute('aria-selected', 'false');
  });

  it('fires onNavigate with a pool-scoped path when a tab is clicked', () => {
    const onNavigate = vi.fn();
    render(
      <PoolScopedLayout {...DEFAULTS} onNavigate={onNavigate}>
        <div>content</div>
      </PoolScopedLayout>,
    );
    fireEvent.click(screen.getByRole('tab', { name: 'MFA' }));
    expect(onNavigate).toHaveBeenCalledWith('/identity/admin/pools/pool-42/mfa');
  });

  it('fires onBack when "Back to Pools" is clicked', () => {
    const onBack = vi.fn();
    render(
      <PoolScopedLayout {...DEFAULTS} onBack={onBack}>
        <div>content</div>
      </PoolScopedLayout>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Back to Pools/ }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('fires onBack when the breadcrumb "Pools" link is clicked', () => {
    const onBack = vi.fn();
    render(
      <PoolScopedLayout {...DEFAULTS} onBack={onBack}>
        <div>content</div>
      </PoolScopedLayout>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Navigate to Pools' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders children in the content slot', () => {
    render(
      <PoolScopedLayout {...DEFAULTS}>
        <div data-testid="content">hi</div>
      </PoolScopedLayout>,
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
