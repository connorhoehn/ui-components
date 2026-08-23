import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoolListPage } from './PoolListPage';

const POOLS = [
  { poolId: 'pool-7f3a2c', poolName: 'Northwind Employees', clientId: 'cli-9a21', createdAt: '2026-01-14' },
  { poolId: 'pool-3b7e10', poolName: 'Northwind Customers', clientId: 'cli-4c88', createdAt: '2026-02-28' },
  { poolId: 'pool-c04d99', poolName: 'Partner Portal', clientId: 'cli-1f05', createdAt: '2026-06-03' },
];

const meta = {
  title: 'Identity/Admin/PoolListPage',
  component: PoolListPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    pools: POOLS,
    onCreatePool: () => console.log('create pool'),
    onEditPool: (id: string) => console.log('edit', id),
    onViewPool: (id: string) => console.log('view', id),
    onDeletePool: () => Promise.resolve(),
  },
} satisfies Meta<typeof PoolListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sortable table with view / edit / delete per row. */
export const Default: Story = {};

/**
 * Delete never resolves, so the ConfirmDialog stays open in its pending state
 * ("Deleting…", confirm disabled) — press Delete on any row to see it.
 */
export const DeletePending: Story = {
  args: { onDeletePool: () => new Promise<void>(() => {}) },
};

/** No pools yet — EntityTable's Card empty state replaces the table. */
export const Empty: Story = {
  args: { pools: [] },
};

export const Loading: Story = {
  args: { pools: [], loading: true },
};
