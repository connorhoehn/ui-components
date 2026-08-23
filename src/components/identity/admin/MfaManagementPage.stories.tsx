import type { Meta, StoryObj } from '@storybook/react-vite';
import { MfaManagementPage } from './MfaManagementPage';

const USERS = [
  { userId: 'u-001', email: 'dana@northwind.example', mfaEnabled: true, deviceCount: 2 },
  { userId: 'u-002', email: 'raul@northwind.example', mfaEnabled: true, deviceCount: 1 },
  { userId: 'u-003', email: 'mei@northwind.example', mfaEnabled: false, deviceCount: 0 },
  { userId: 'u-004', email: 'omar@northwind.example', mfaEnabled: false, deviceCount: 0 },
  { userId: 'u-005', email: 'sofia@northwind.example', mfaEnabled: true, deviceCount: 3 },
];

const POOLS = [
  { poolId: 'pool-7f3a2c', poolName: 'Northwind Employees', userCount: 812 },
  { poolId: 'pool-3b7e10', poolName: 'Northwind Customers', userCount: 441 },
  { poolId: 'pool-c04d99', poolName: 'Partner Portal', userCount: 31 },
];

const meta = {
  title: 'Identity/Admin/MfaManagementPage',
  component: MfaManagementPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    metrics: { totalUsers: 5, mfaEnabled: 3, mfaDisabled: 2, adoptionRate: 60 },
    users: USERS,
    pools: POOLS,
    onRefresh: () => console.log('refresh'),
  },
} satisfies Meta<typeof MfaManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Adoption metrics, the pool filter, and per-user MFA status. */
export const Default: Story = {};

/** Nobody has enrolled yet — the state that makes the metric worth showing. */
export const ZeroAdoption: Story = {
  args: {
    metrics: { totalUsers: 5, mfaEnabled: 0, mfaDisabled: 5, adoptionRate: 0 },
    users: USERS.map((u) => ({ ...u, mfaEnabled: false, deviceCount: 0 })),
  },
};

/** Enforcement complete. */
export const FullAdoption: Story = {
  args: {
    metrics: { totalUsers: 5, mfaEnabled: 5, mfaDisabled: 0, adoptionRate: 100 },
    users: USERS.map((u) => ({ ...u, mfaEnabled: true, deviceCount: u.deviceCount || 1 })),
  },
};

/**
 * Every data prop is optional, so the page must render with none of them —
 * the shape it lands in before the first fetch resolves.
 */
export const NoDataYet: Story = {
  args: { metrics: undefined, users: undefined, pools: undefined, loading: true },
};
