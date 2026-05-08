import { useState } from 'react';
import {
  IdentityAdminLayout,
  AdminDashboardPage,
  PoolListPage,
  UserListPage,
  GroupListPage,
  ApplicationListPage,
  EmailTemplateListPage,
  MfaManagementPage,
  AuditPage,
  SetupGuidePage,
} from '@connorhoehn/ui-components/identity';
import {
  mockStats, mockPools, mockUsers, mockGroups, mockClients,
  mockEmailTemplates, mockMfaMetrics, mockMfaUsers, mockAuditRecords, mockSetupStatus,
} from '../mock-data';

type View = 'dashboard' | 'pools' | 'users' | 'groups' | 'applications' | 'email-templates' | 'audit' | 'mfa' | 'setup';

const PATH_TO_VIEW: Record<string, View> = {
  '/identity/admin': 'dashboard',
  '/identity/admin/pools': 'pools',
  '/identity/admin/applications': 'applications',
  '/identity/admin/email-templates': 'email-templates',
  '/identity/admin/audit': 'audit',
  '/identity/admin/diagnostics': 'dashboard',
  '/identity/admin/setup': 'setup',
};

export default function FullAdminDemo() {
  const [view, setView] = useState<View>('dashboard');
  const [activePath, setActivePath] = useState('/identity/admin');

  const navigate = (path: string) => {
    setActivePath(path);
    setView(PATH_TO_VIEW[path] || 'dashboard');
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <AdminDashboardPage stats={mockStats} pools={mockPools} onNavigate={navigate} />;
      case 'pools':
        return (
          <PoolListPage
            pools={mockPools}
            onCreatePool={() => console.log('Create pool')}
            onEditPool={() => console.log('Edit pool')}
            onDeletePool={async () => {}}
            onViewPool={(id) => { setView('users'); }}
          />
        );
      case 'users':
        return (
          <UserListPage
            users={mockUsers.slice(0, 5)}
            poolId="pool-acme-prod"
            poolName="Acme Production"
            onCreateUser={() => console.log('Create user')}
            onEditUser={() => console.log('Edit user')}
            onDeleteUser={async () => {}}
          />
        );
      case 'groups':
        return (
          <GroupListPage
            groups={mockGroups}
            poolId="pool-acme-prod"
            poolName="Acme Production"
            onCreateGroup={() => console.log('Create group')}
            onEditGroup={() => console.log('Edit group')}
            onDeleteGroup={async () => {}}
          />
        );
      case 'applications':
        return (
          <ApplicationListPage
            applications={mockClients}
            onCreateApp={() => console.log('Create app')}
            onCreateAppWithPool={() => console.log('Create with pool')}
            onEditApp={() => console.log('Edit app')}
            onDeleteApp={async () => {}}
          />
        );
      case 'email-templates':
        return (
          <EmailTemplateListPage
            templates={mockEmailTemplates}
            onCreateTemplate={() => console.log('Create template')}
            onEditTemplate={() => console.log('Edit template')}
            onDeleteTemplate={async () => {}}
            onTestSend={async () => {}}
          />
        );
      case 'mfa':
        return (
          <MfaManagementPage
            metrics={mockMfaMetrics}
            users={mockMfaUsers}
            pools={mockPools.map((p) => ({ poolId: p.poolId, poolName: p.poolName, userCount: 4 }))}
            onRefresh={() => {}}
          />
        );
      case 'audit':
        return (
          <AuditPage
            records={mockAuditRecords}
            onQuery={async () => {}}
            onViewEntity={() => {}}
            onReplay={async () => null}
          />
        );
      case 'setup':
        return <SetupGuidePage status={mockSetupStatus} onNavigate={navigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[800px] border border-gray-200 rounded-lg overflow-hidden">
      <IdentityAdminLayout
        activePath={activePath}
        adminEmail="admin@acme.com"
        onNavigate={navigate}
        onLogout={() => console.log('[FullAdminDemo] Logout')}
      >
        {renderView()}
      </IdentityAdminLayout>
    </div>
  );
}
