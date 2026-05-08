import { AdminDashboardPage } from '@connorhoehn/ui-components/identity';
import { mockStats, mockPools } from '../mock-data';

export default function DashboardDemo() {
  return (
    <AdminDashboardPage
      stats={mockStats}
      pools={mockPools}
      onNavigate={(path) => console.log('[DashboardDemo] Navigate:', path)}
    />
  );
}
