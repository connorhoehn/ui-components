import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChannelHeader } from './ChannelHeader';
import { Button } from '../ui/Button';

const meta = {
  title: 'Shared/ChannelHeader',
  component: ChannelHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ChannelHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: 'general',
    memberCount: 24,
  },
};

export const WithDescription: Story = {
  args: {
    name: 'engineering',
    memberCount: 8,
    description: 'Engineering team discussion channel',
  },
};

export const WithOnlineIndicator: Story = {
  args: {
    name: 'Alice Johnson',
    online: true,
    description: 'Direct message',
  },
};

export const Offline: Story = {
  args: {
    name: 'Bob Smith',
    online: false,
    memberCount: 1,
  },
};

export const WithActions: Story = {
  args: {
    name: 'product',
    memberCount: 15,
    description: 'Product roadmap discussions',
    actions: (
      <>
        <Button variant="ghost" size="sm">Search</Button>
        <Button variant="secondary" size="sm">Settings</Button>
      </>
    ),
  },
};
