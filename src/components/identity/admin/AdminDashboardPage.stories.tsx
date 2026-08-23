import type { Meta, StoryObj } from '@storybook/react-vite';
import { AdminDashboardPage } from './AdminDashboardPage';

const POOLS = [
  { poolId: 'pool-7f3a2c', poolName: 'Northwind Employees', createdAt: '2026-01-14' },
  { poolId: 'pool-3b7e10', poolName: 'Northwind Customers', createdAt: '2026-02-28' },
  { poolId: 'pool-c04d99', poolName: 'Partner Portal', createdAt: '2026-06-03' },
];

const meta = {
  title: 'Identity/Admin/AdminDashboardPage',
  component: AdminDashboardPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    stats: { userPools: 3, clients: 7, totalUsers: 1284 },
    pools: POOLS,
    onNavigate: (path: string) => console.log('navigate', path),
  },
} satisfies Meta<typeof AdminDashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Stat cards plus the pool list and its quick-action links. */
export const Populated: Story = {};

/**
 * A brand-new deployment: the stats read zero and the pool list falls back to
 * an EmptyState that points at pool creation.
 */
export const FirstRun: Story = {
  args: {
    stats: { userPools: 0, clients: 0, totalUsers: 0 },
    pools: [],
  },
};

/** Initial fetch — stat cards and the pool card render as pulsing skeletons. */
export const Loading: Story = {
  args: {
    stats: { userPools: 0, clients: 0, totalUsers: 0 },
    pools: [],
    loading: true,
  },
};
