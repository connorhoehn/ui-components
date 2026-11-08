import { PageHeader, ExampleBlock } from '../../../shared';
import { AdminDashboardPage } from '@connorhoehn/ui-components/identity';
import { mockStats, mockPools } from '../mock-data';

export default function DashboardDemo() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Overview page showing system statistics (total pools, users, applications, active sessions) and a quick-access pool list. Entry point for the identity admin UI."
        importPath="import { AdminDashboardPage } from '@connorhoehn/ui-components/identity'"
      />

      <ExampleBlock
        id="dashboard-default"
        title="Default"
        description="Dashboard with stats cards and pool list. Click 'Manage' to navigate to a pool."
        code={`<AdminDashboardPage
  stats={{ totalPools: 3, totalUsers: 127, totalApplications: 5, activeSessions: 42 }}
  pools={pools}
  onNavigate={(path) => { ... }}
/>`}
      >
        <AdminDashboardPage
          stats={mockStats}
          pools={mockPools}
          onNavigate={(path) => console.log('[DashboardDemo] Navigate:', path)}
        />
      </ExampleBlock>
    </div>
  );
}
