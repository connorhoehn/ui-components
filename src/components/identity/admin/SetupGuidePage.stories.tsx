import type { Meta, StoryObj } from '@storybook/react-vite';
import { SetupGuidePage } from './SetupGuidePage';

const FRESH = {
  hasUserPools: false,
  poolCount: 0,
  hasClients: false,
  clientCount: 0,
  hasAdminUser: false,
  totalUsers: 0,
  adminEmails: [],
  smtpConfigured: false,
  issuer: 'http://localhost:3000',
  issuerConfigured: false,
};

const PARTIAL = {
  ...FRESH,
  hasUserPools: true,
  poolCount: 1,
  firstPoolId: 'pool-7f3a2c',
  hasClients: true,
  clientCount: 1,
  firstClientId: 'cli-9a21',
  hasAdminUser: true,
  totalUsers: 3,
  adminEmails: ['ops@northwind.example'],
};

const COMPLETE = {
  ...PARTIAL,
  poolCount: 3,
  clientCount: 7,
  totalUsers: 1284,
  adminEmails: ['ops@northwind.example', 'dana@northwind.example'],
  smtpConfigured: true,
  smtpHost: 'smtp.northwind.example',
  issuer: 'https://id.northwind.example',
  issuerConfigured: true,
  wellKnownUrl: 'https://id.northwind.example/.well-known/openid-configuration',
};

const meta = {
  title: 'Identity/Admin/SetupGuidePage',
  component: SetupGuidePage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    status: PARTIAL,
    onNavigate: (path: string) => console.log('navigate', path),
  },
} satisfies Meta<typeof SetupGuidePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Halfway: pool, application and admin user done; SMTP and issuer outstanding. */
export const PartiallyComplete: Story = {};

/** A brand-new deployment — nothing done, every step actionable. */
export const NothingConfigured: Story = {
  args: { status: FRESH },
};

/** Every step satisfied, including a real issuer and discovery document. */
export const FullyConfigured: Story = {
  args: { status: COMPLETE },
};

/**
 * Production issuer and SMTP are set, but no pool exists yet — an ordering
 * the checklist has to tolerate rather than assume away.
 */
export const InfrastructureOnly: Story = {
  args: {
    status: {
      ...FRESH,
      smtpConfigured: true,
      smtpHost: 'smtp.northwind.example',
      issuer: 'https://id.northwind.example',
      issuerConfigured: true,
      wellKnownUrl: 'https://id.northwind.example/.well-known/openid-configuration',
    },
  },
};
