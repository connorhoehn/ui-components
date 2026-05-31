import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserMenu } from './UserMenu';

const meta = {
  title: 'Shared/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: {
    user: { name: 'Alice Johnson', email: 'alice@example.com' },
    items: [
      { label: 'Profile', onClick: noop },
      { label: 'Settings', onClick: noop },
      { label: 'Sign out', onClick: noop, separator: true, danger: true },
    ],
  },
};

export const WithAvatarUrl: Story = {
  args: {
    user: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatarUrl: 'https://i.pravatar.cc/64?img=8',
    },
    items: [
      { label: 'Profile', onClick: noop },
      { label: 'Sign out', onClick: noop, separator: true, danger: true },
    ],
  },
};

export const MinimalItems: Story = {
  args: {
    user: { name: 'Carol', email: 'carol@example.com' },
    items: [{ label: 'Sign out', onClick: noop, danger: true }],
  },
};
