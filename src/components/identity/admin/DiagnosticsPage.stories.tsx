import type { Meta, StoryObj } from '@storybook/react-vite';
import { DiagnosticsPage } from './DiagnosticsPage';

const DIAGNOSTICS = {
  node: { id: 'idp-1', region: 'us-east-1', uptimeSeconds: 412_887 },
  version: '2.72.0',
  storage: { driver: 'dynamodb', table: 'identity-events', healthy: true },
  oidc: { issuer: 'https://id.northwind.example', jwksKeys: 2, activeSessions: 318 },
};

const RATES = {
  'login:global': { limit: 100, remaining: 87, windowSeconds: 60 },
  'login:per-ip': { limit: 10, remaining: 10, windowSeconds: 60 },
  'mfa:verify': { limit: 5, remaining: 2, windowSeconds: 300 },
  'token:refresh': { limit: 200, remaining: 199, windowSeconds: 60 },
};

const DLQ = [
  {
    id: 'dlq-9a21',
    payload: { type: 'email.send', templateId: 'tpl-welcome', to: 'raul@northwind.example' },
    error: 'SMTP 550: relay access denied',
    failedAt: '2026-08-20T13:41:02Z',
    retryCount: 3,
  },
  {
    id: 'dlq-4c88',
    payload: { type: 'user.sync', userId: 'u-014' },
    error: 'ConditionalCheckFailedException',
    failedAt: '2026-08-20T09:17:44Z',
    retryCount: 1,
  },
];

const meta = {
  title: 'Identity/Admin/DiagnosticsPage',
  component: DiagnosticsPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    diagnostics: DIAGNOSTICS,
    rates: RATES,
    dlq: DLQ,
    onRedrive: () => Promise.resolve(),
    onPurge: () => Promise.resolve(),
    onRefresh: () => console.log('refresh'),
  },
} satisfies Meta<typeof DiagnosticsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Node info, rate-limiter counters, and two messages parked in the DLQ. */
export const Default: Story = {};

/** The healthy steady state: nothing in the dead-letter queue. */
export const EmptyDlq: Story = {
  args: { dlq: [] },
};

/** No rate-limiter data reported — the table falls back to a message. */
export const NoRateData: Story = {
  args: { rates: {}, dlq: [] },
};

/**
 * Every data prop is optional; this is what the page renders before the
 * first fetch resolves.
 */
export const NoDataYet: Story = {
  args: { diagnostics: undefined, rates: undefined, dlq: undefined, loading: true },
};
