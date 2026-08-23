import type { Meta, StoryObj } from '@storybook/react-vite';
import { IdentityAdminLayout } from './IdentityAdminLayout';
import { Card } from '../../ui/Card';
import { PageSection } from '../../ui/PageSection';

const SamplePage = (
  <PageSection title="Dashboard">
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {[
        { label: 'User Pools', value: 3 },
        { label: 'Applications', value: 7 },
        { label: 'Total Users', value: 1284 },
      ].map((s) => (
        <Card key={s.label} padding="md">
          <div className="text-2xl font-bold text-info-fg mb-1">{s.value}</div>
          <div className="text-sm text-text-secondary">{s.label}</div>
        </Card>
      ))}
    </div>
  </PageSection>
);

const meta = {
  title: 'Identity/Shared/IdentityAdminLayout',
  component: IdentityAdminLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    children: SamplePage,
    onNavigate: (path: string) => console.log('navigate', path),
  },
} satisfies Meta<typeof IdentityAdminLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The collapsed chrome, rendered directly via `defaultSidebarOpen` — what a
 * host shows when it restores the user's saved preference on mount. The prop
 * is initial-only, so the header toggle still reopens the sidebar.
 */
export const SidebarCollapsed: Story = {
  args: {
    activePath: '/identity/admin',
    adminEmail: 'ops@northwind.example',
    onLogout: () => console.log('logout'),
    defaultSidebarOpen: false,
  },
};

/**
 * The full admin chrome. The header toggle collapses the sidebar; pass
 * `defaultSidebarOpen={false}` to start there instead.
 */
export const Default: Story = {
  args: {
    activePath: '/identity/admin',
    adminEmail: 'ops@northwind.example',
    onLogout: () => console.log('logout'),
  },
};

/** A deeper section selected — `activePath` drives the `aria-current` rail. */
export const AuditSelected: Story = {
  args: {
    activePath: '/identity/admin/audit',
    adminEmail: 'ops@northwind.example',
    onLogout: () => console.log('logout'),
    children: (
      <PageSection title="Audit">
        <Card padding="md">
          <p className="m-0 text-sm text-text-secondary">Audit log goes here.</p>
        </Card>
      </PageSection>
    ),
  },
};

/**
 * Embedded in a host that owns its own session UI: no email, no logout, so
 * the header keeps only the sidebar toggle.
 */
export const WithoutSessionControls: Story = {
  args: { activePath: '/identity/admin/pools' },
};
