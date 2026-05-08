import { MfaManagementPage } from '@connorhoehn/ui-components/identity';
import { mockMfaMetrics, mockMfaUsers, mockPools } from '../mock-data';

export default function MfaDemo() {
  return (
    <MfaManagementPage
      metrics={mockMfaMetrics}
      users={mockMfaUsers}
      pools={mockPools.map((p) => ({ poolId: p.poolId, poolName: p.poolName, userCount: 4 }))}
      onRefresh={() => console.log('[MfaDemo] Refresh')}
    />
  );
}
