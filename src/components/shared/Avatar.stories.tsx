import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Alice Johnson', size: 40 },
};

export const SingleWord: Story = {
  args: { name: 'Connor', size: 40 },
};

export const SmallSize: Story = {
  args: { name: 'Bob Smith', size: 24 },
};

export const LargeSize: Story = {
  args: { name: 'Carol White', size: 64 },
};

export const CustomColor: Story = {
  args: { name: 'Dave Lee', size: 40, color: '#a855f7' },
};

export const Group: StoryObj = {
  render: () => (
    <AvatarGroup
      names={['Alice Johnson', 'Bob Smith', 'Carol White', 'Dave Lee', 'Eve Davis', 'Frank Miller']}
      maxVisible={4}
      size={36}
    />
  ),
};

export const GroupSmall: StoryObj = {
  render: () => (
    <AvatarGroup
      names={['Alice Johnson', 'Bob Smith', 'Carol White']}
      size={28}
    />
  ),
};
