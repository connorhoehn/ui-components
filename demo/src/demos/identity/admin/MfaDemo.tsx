import { PageHeader, ExampleBlock } from '../../../shared';
import { MfaManagementPage } from '@connorhoehnslalom/ui-components/identity';
import { mockMfaMetrics, mockMfaUsers, mockPools } from '../mock-data';

export default function MfaDemo() {
  return (
    <div>
      <PageHeader
        title="MFA Management"
        description="Admin view of MFA adoption across the platform. Shows metrics (enrollment rate, verified devices, backup code usage) and a per-user device table."
        importPath="import { MfaManagementPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="mfa-management"
        title="Default"
        description="Metrics cards with enrollment stats and a user-device table."
        code={`<MfaManagementPage
  metrics={{ enrolledUsers: 89, totalUsers: 127, verifiedDevices: 94, ... }}
  users={mfaUsers}
  pools={pools}
  onRefresh={() => { ... }}
/>`}
      >
        <MfaManagementPage
          metrics={mockMfaMetrics}
          users={mockMfaUsers}
          pools={mockPools.map((p) => ({ poolId: p.poolId, poolName: p.poolName, userCount: 4 }))}
          onRefresh={() => console.log('[MfaDemo] Refresh')}
        />
      </ExampleBlock>
    </div>
  );
}
