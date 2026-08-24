export const mockPools = [
  { poolId: 'pool-acme-prod', poolName: 'Acme Production', clientId: 'acme-web-app', createdAt: '2025-11-15T08:00:00Z' },
  { poolId: 'pool-internal', poolName: 'Internal Staff', clientId: 'internal-dashboard', createdAt: '2025-12-01T14:30:00Z' },
  { poolId: 'pool-partner-api', poolName: 'Partner API', clientId: 'partner-service', createdAt: '2026-01-20T10:00:00Z' },
];

export const mockUsers = [
  { userId: 'usr-001', email: 'alice@acme.com', givenName: 'Alice', familyName: 'Chen', status: 'CONFIRMED', createdAt: '2025-11-20T09:00:00Z' },
  { userId: 'usr-002', email: 'bob@acme.com', givenName: 'Bob', familyName: 'Martinez', status: 'CONFIRMED', createdAt: '2025-11-22T11:00:00Z' },
  { userId: 'usr-003', email: 'carol@acme.com', givenName: 'Carol', familyName: 'Williams', status: 'UNCONFIRMED', createdAt: '2025-12-01T15:00:00Z' },
  { userId: 'usr-004', email: 'dave@acme.com', givenName: 'Dave', familyName: 'Johnson', status: 'FORCE_CHANGE_PASSWORD', createdAt: '2025-12-05T08:30:00Z' },
  { userId: 'usr-005', email: 'eve@acme.com', givenName: 'Eve', familyName: 'Park', status: 'CONFIRMED', createdAt: '2025-12-10T16:00:00Z' },
  { userId: 'usr-006', email: 'frank@internal.co', givenName: 'Frank', familyName: 'Lee', status: 'CONFIRMED', createdAt: '2025-12-15T09:00:00Z' },
  { userId: 'usr-007', email: 'grace@internal.co', givenName: 'Grace', familyName: 'Nguyen', status: 'CONFIRMED', createdAt: '2026-01-05T10:00:00Z' },
  { userId: 'usr-008', email: 'henry@internal.co', givenName: 'Henry', familyName: 'Taylor', status: 'DISABLED', createdAt: '2026-01-10T12:00:00Z' },
  { userId: 'usr-009', email: 'iris@partner.io', givenName: 'Iris', familyName: 'Kim', status: 'CONFIRMED', createdAt: '2026-01-25T14:00:00Z' },
  { userId: 'usr-010', email: 'jack@partner.io', givenName: 'Jack', familyName: 'Anderson', status: 'CONFIRMED', createdAt: '2026-02-01T11:00:00Z' },
];

export const mockGroups = [
  { groupId: 'grp-admins', groupName: 'Admins', description: 'Full system administrators', permissions: ['admin:*', 'users:*', 'pools:*'] },
  { groupId: 'grp-editors', groupName: 'Editors', description: 'Content editors with limited access', permissions: ['users:read', 'users:update'] },
  { groupId: 'grp-viewers', groupName: 'Viewers', description: 'Read-only access', permissions: ['users:read', 'pools:read'] },
  { groupId: 'grp-api', groupName: 'API Users', description: 'Machine accounts for API access', permissions: ['api:read', 'api:write'] },
];

export const mockClients = [
  { clientId: 'acme-web-app', clientName: 'Acme Web Application', poolId: 'pool-acme-prod', poolName: 'Acme Production', redirectUris: ['https://app.acme.com/callback', 'http://localhost:3000/callback'] },
  { clientId: 'internal-dashboard', clientName: 'Internal Dashboard', poolId: 'pool-internal', poolName: 'Internal Staff', redirectUris: ['https://dashboard.internal.co/auth'] },
  { clientId: 'partner-service', clientName: 'Partner API Service', poolId: 'pool-partner-api', poolName: 'Partner API', redirectUris: ['https://api.partner.io/oauth/callback'] },
  { clientId: 'mobile-app', clientName: 'Acme Mobile', poolId: 'pool-acme-prod', poolName: 'Acme Production', redirectUris: ['acme://auth/callback'] },
  { clientId: 'dev-local', clientName: 'Local Development', poolId: 'pool-acme-prod', poolName: 'Acme Production', redirectUris: ['http://localhost:3000/callback', 'http://localhost:5173/callback'] },
];

export const mockMfaMetrics = {
  totalUsers: 10,
  mfaEnabled: 6,
  mfaDisabled: 4,
  adoptionRate: 60,
};

// `poolId` matches the email domain to the pools above. It is what the
// "Filter by pool" control keys off — MfaManagementPage hides that control
// entirely when no row supplies one, so without these the demo renders a
// page that cannot demonstrate its own filter.
export const mockMfaUsers = [
  { userId: 'usr-001', email: 'alice@acme.com', poolId: 'pool-acme-prod', mfaEnabled: true, deviceCount: 2 },
  { userId: 'usr-002', email: 'bob@acme.com', poolId: 'pool-acme-prod', mfaEnabled: true, deviceCount: 1 },
  { userId: 'usr-003', email: 'carol@acme.com', poolId: 'pool-acme-prod', mfaEnabled: false, deviceCount: 0 },
  { userId: 'usr-005', email: 'eve@acme.com', poolId: 'pool-acme-prod', mfaEnabled: true, deviceCount: 1 },
  { userId: 'usr-006', email: 'frank@internal.co', poolId: 'pool-internal', mfaEnabled: true, deviceCount: 1 },
  { userId: 'usr-007', email: 'grace@internal.co', poolId: 'pool-internal', mfaEnabled: true, deviceCount: 2 },
  { userId: 'usr-009', email: 'iris@partner.io', poolId: 'pool-partner-api', mfaEnabled: false, deviceCount: 0 },
  { userId: 'usr-010', email: 'jack@partner.io', poolId: 'pool-partner-api', mfaEnabled: true, deviceCount: 1 },
];

export const mockEmailTemplates = [
  { templateId: 'tpl-welcome', name: 'Welcome Email', subject: 'Welcome to {{appName}}!' },
  { templateId: 'tpl-reset', name: 'Password Reset', subject: 'Reset your {{appName}} password' },
  { templateId: 'tpl-verify', name: 'Email Verification', subject: 'Verify your email address' },
  { templateId: 'tpl-mfa', name: 'MFA Enrolled', subject: 'Multi-factor authentication enabled' },
];

export const mockAuditRecords = [
  { timestamp: Date.now() - 3600000, actor: { email: 'admin@acme.com' }, entityType: 'user', entityId: 'usr-003', operation: 'create' },
  { timestamp: Date.now() - 7200000, actor: { email: 'admin@acme.com' }, entityType: 'pool', entityId: 'pool-partner-api', operation: 'update' },
  { timestamp: Date.now() - 10800000, actor: { email: 'alice@acme.com' }, entityType: 'user', entityId: 'usr-001', operation: 'mfa:enable' },
  { timestamp: Date.now() - 14400000, actor: { system: true }, entityType: 'token', entityId: 'tok-xyz', operation: 'revoke' },
  { timestamp: Date.now() - 18000000, actor: { email: 'admin@acme.com' }, entityType: 'group', entityId: 'grp-editors', operation: 'member:add' },
  { timestamp: Date.now() - 21600000, actor: { email: 'admin@acme.com' }, entityType: 'client', entityId: 'mobile-app', operation: 'create' },
  { timestamp: Date.now() - 86400000, actor: { email: 'bob@acme.com' }, entityType: 'user', entityId: 'usr-002', operation: 'password:change' },
  { timestamp: Date.now() - 172800000, actor: { system: true }, entityType: 'pool', entityId: 'pool-internal', operation: 'key:rotate' },
];

export const mockSetupStatus = {
  hasUserPools: true,
  poolCount: 3,
  hasClients: true,
  clientCount: 5,
  hasAdminUser: true,
  totalUsers: 10,
  adminEmails: ['admin@acme.com'],
  smtpConfigured: true,
  smtpHost: 'smtp.mailgun.org',
  issuer: 'http://localhost:3005',
  issuerConfigured: true,
  wellKnownUrl: 'http://localhost:3005/.well-known/openid-configuration',
  firstPoolId: 'pool-acme-prod',
  firstClientId: 'acme-web-app',
};

export const mockStats = {
  userPools: 3,
  clients: 5,
  totalUsers: 10,
};
