import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserListPage } from './UserListPage';

const USERS = [
  { userId: 'u-001', email: 'dana@northwind.example', givenName: 'Dana', familyName: 'Okafor', status: 'CONFIRMED', createdAt: '2026-01-14' },
  { userId: 'u-002', email: 'raul@northwind.example', givenName: 'Raul', familyName: 'Mendez', status: 'UNCONFIRMED', createdAt: '2026-02-02' },
  { userId: 'u-003', email: 'mei@northwind.example', givenName: 'Mei', familyName: 'Tan', status: 'FORCE_CHANGE_PASSWORD', createdAt: '2026-03-21' },
  { userId: 'u-004', email: 'omar@northwind.example', givenName: 'Omar', status: 'DISABLED', createdAt: '2026-04-08' },
  { userId: 'u-005', email: 'sofia@northwind.example', status: 'CONFIRMED', createdAt: '2026-05-30' },
];

const meta = {
  title: 'Identity/Admin/UserListPage',
  component: UserListPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    users: USERS,
    poolId: 'pool-7f3a2c',
    poolName: 'Northwind Employees',
    onCreateUser: () => console.log('create user'),
    onEditUser: (id: string) => console.log('edit', id),
    onDeleteUser: () => Promise.resolve(),
  },
} satisfies Meta<typeof UserListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A spread of lifecycle states, so every StatusBadge tone appears at once —
 * including users with partial or missing names.
 */
export const MixedStatuses: Story = {};

/** Every user confirmed — the steady state for a mature pool. */
export const AllConfirmed: Story = {
  args: { users: USERS.filter((u) => u.status === 'CONFIRMED') },
};

export const Empty: Story = {
  args: { users: [] },
};

export const Loading: Story = {
  args: { users: [], loading: true },
};
