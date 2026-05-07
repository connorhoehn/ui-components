// All entity types for the identity domain

export interface IdentityUser {
  userId: string;
  poolId: string;
  email: string;
  givenName?: string;
  familyName?: string;
  nickname?: string;
  picture?: string;
  website?: string;
  status: 'CONFIRMED' | 'UNCONFIRMED' | 'FORCE_CHANGE_PASSWORD' | 'ARCHIVED' | 'COMPROMISED' | 'UNKNOWN';
  emailVerified?: boolean;
  mfaEnabled: boolean;
  groups: string[];
  customAttributes: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export interface IdentityPool {
  poolId: string;
  poolName: string;
  clientId: string;
  customAttributes: Record<string, string>;
  settings: PoolSettings;
  createdAt: string;
}

export interface PoolSettings {
  passwordPolicy?: PasswordPolicy;
  mfaConfiguration: 'OFF' | 'OPTIONAL' | 'REQUIRED';
  accountRecovery?: { email: boolean; sms: boolean };
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
}

export interface IdentityClient {
  clientId: string;
  clientName: string;
  clientSecret?: string;
  poolId: string;
  poolName?: string;
  redirectUris: string[];
  postLogoutRedirectUris?: string[];
  grantTypes: string[];
  responseTypes?: string[];
  scope?: string;
}

export interface IdentityGroup {
  groupId: string;
  poolId: string;
  groupName: string;
  description?: string;
  permissions: string[];
  members?: string[];
}

export interface MfaDevice {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  isVerified: boolean;
  createdAt: string;
  lastUsed?: string;
}

export interface MfaSetupResult {
  deviceId: string;
  qrCode: string;
  secret: string;
  backupCodes: string[];
}

export interface EmailTemplate {
  templateId: string;
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  variables: string[];
}

export interface AuditRecord {
  timestamp: number;
  actor: AuditActor;
  entityType: string;
  entityId: string;
  operation: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}

export interface AuditActor {
  type: 'admin' | 'user' | 'system';
  email?: string;
  userId?: string;
  reason?: string;
}

export interface PoolStats {
  userCount: number;
  poolId: string;
  poolName: string;
}

export interface SetupStatus {
  hasUserPools: boolean;
  poolCount: number;
  hasClients: boolean;
  clientCount: number;
  hasAdminUser: boolean;
  totalUsers: number;
  adminEmails: string[];
  firstPoolId?: string;
  smtpConfigured: boolean;
  smtpHost?: string;
  smtpPort?: string;
  smtpFrom?: string;
  issuer: string;
  externalIssuer?: string;
  issuerIsCustom: boolean;
  issuerConfigured: boolean;
  wellKnownUrl?: string;
  firstClientId?: string;
}

export interface DiagnosticsInfo {
  node: Record<string, unknown>;
  cluster: Record<string, unknown>;
  resources: Record<string, unknown>;
}

export interface RateInfo {
  [key: string]: unknown;
}

export interface DlqEntry {
  id: string;
  payload: unknown;
  error: string;
  failedAt: string;
  retryCount: number;
}

export interface MfaMetrics {
  totalUsers: number;
  mfaEnabled: number;
  mfaDisabled: number;
  adoptionRate: number;
}

// Input types for mutations
export interface CreatePoolInput {
  poolName: string;
  customAttributes?: Record<string, string>;
  settings?: Partial<PoolSettings>;
}

export interface UpdatePoolInput {
  poolName?: string;
  customAttributes?: Record<string, string>;
  settings?: Partial<PoolSettings>;
}

export interface CreateUserInput {
  email: string;
  password?: string;
  givenName?: string;
  familyName?: string;
  nickname?: string;
  customAttributes?: Record<string, unknown>;
}

export interface UpdateUserInput {
  email?: string;
  givenName?: string;
  familyName?: string;
  nickname?: string;
  picture?: string;
  website?: string;
  customAttributes?: Record<string, unknown>;
}

export interface CreateClientInput {
  clientName: string;
  poolId: string;
  redirectUris: string[];
  postLogoutRedirectUris?: string[];
  grantTypes?: string[];
  responseTypes?: string[];
  scope?: string;
}

export interface UpdateClientInput {
  clientName?: string;
  redirectUris?: string[];
  postLogoutRedirectUris?: string[];
  grantTypes?: string[];
  responseTypes?: string[];
  scope?: string;
}

export interface CreateGroupInput {
  groupName: string;
  description?: string;
  permissions?: string[];
}

export interface UpdateGroupInput {
  groupName?: string;
  description?: string;
  permissions?: string[];
}

export interface CreateEmailTemplateInput {
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  variables?: string[];
}

export interface UpdateEmailTemplateInput {
  name?: string;
  subject?: string;
  htmlBody?: string;
  textBody?: string;
  variables?: string[];
}

export interface AuditQueryParams {
  entityType?: string;
  entityId?: string;
  fromTime?: number;
  toTime?: number;
  limit?: number;
  cursor?: string;
}

export interface CreateClientWithPoolInput {
  clientName: string;
  poolName: string;
  redirectUris: string[];
  grantTypes?: string[];
}
