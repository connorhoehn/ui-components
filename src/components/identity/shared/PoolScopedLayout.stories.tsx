import type { Meta, StoryObj } from '@storybook/react-vite';
import { PoolScopedLayout } from './PoolScopedLayout';
import { Card } from '../../ui/Card';

const panel = (text: string) => (
  <Card padding="md">
    <p className="m-0 text-sm text-text-secondary">{text}</p>
  </Card>
);

const meta = {
  title: 'Identity/Shared/PoolScopedLayout',
  component: PoolScopedLayout,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    poolId: 'pool-7f3a2c',
    poolName: 'Northwind Employees',
    onNavigate: (path: string) => console.log('navigate', path),
    onBack: () => console.log('back to pools'),
    children: panel('Pool-scoped content renders here.'),
  },
} satisfies Meta<typeof PoolScopedLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Users tab — breadcrumb reads Pools / <name> / Users. */
export const Users: Story = {
  args: {
    activeSection: 'users',
    children: panel('User list for this pool.'),
  },
};

export const Groups: Story = {
  args: {
    activeSection: 'groups',
    children: panel('Group list for this pool.'),
  },
};

export const Mfa: Story = {
  args: {
    activeSection: 'mfa',
    children: panel('MFA adoption for this pool.'),
  },
};

/**
 * No `activeSection`: the breadcrumb stops at the pool name and no tab is
 * selected — the state a pool overview route lands in.
 */
export const NoSectionSelected: Story = {};
