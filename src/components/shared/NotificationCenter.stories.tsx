import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationCenter, type NotificationItem } from './NotificationCenter';

const meta = {
  title: 'Shared/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    onItemClick: (item: NotificationItem) => console.log('clicked:', item.id),
    onMarkAllRead: () => console.log('mark all read'),
    onClearAll: () => console.log('clear all'),
  },
} satisfies Meta<typeof NotificationCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Date.now();
const sampleItems: NotificationItem[] = [
  {
    id: '1',
    title: 'Alice commented on your document',
    body: '"This looks great, just a few minor tweaks needed."',
    timestamp: now - 2 * 60_000,
    read: false,
    icon: '💬',
    category: 'comments',
  },
  {
    id: '2',
    title: 'Pipeline "deploy-prod" completed',
    body: 'All 12 steps passed successfully.',
    timestamp: now - 15 * 60_000,
    read: false,
    icon: '✅',
    category: 'pipelines',
  },
  {
    id: '3',
    title: 'Bob invited you to "Q3 Planning"',
    timestamp: now - 2 * 3_600_000,
    read: true,
    icon: '📅',
  },
  {
    id: '4',
    title: 'System maintenance tonight at 2 AM',
    body: 'Expected downtime: 30 minutes.',
    timestamp: now - 5 * 3_600_000,
    read: true,
    icon: '⚙️',
  },
];

export const Empty: Story = {
  args: { items: [] },
};

export const WithUnread: Story = {
  args: { items: sampleItems },
};

export const AllRead: Story = {
  args: { items: sampleItems.map(i => ({ ...i, read: true })) },
};

export const SingleUnread: Story = {
  args: {
    items: [sampleItems[0]],
    onClearAll: undefined,
  },
};
