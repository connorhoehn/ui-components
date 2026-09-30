import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationBell } from './NotificationBell';
import type { NotificationItem } from './NotificationCenter';

const meta = {
  title: 'Shared/NotificationBell',
  component: NotificationBell,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    items: [],
    onItemClick: (item: NotificationItem) => console.log('clicked:', item.id),
    onMarkAllRead: () => console.log('mark all read'),
    onClearAll: () => console.log('clear all'),
  },
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Date.now();
const threeUnread: NotificationItem[] = [
  { id: 'n1', title: 'Alice mentioned you in #design', body: '"Can you review the header?"', timestamp: now - 3 * 60_000, icon: '💬', category: 'Social' },
  { id: 'n2', title: 'Pipeline "deploy-prod" completed', body: 'All 9 steps passed.', timestamp: now - 20 * 60_000, icon: '✅', category: 'Pipelines' },
  { id: 'n3', title: 'Bob invited you to a call', timestamp: now - 45 * 60_000, icon: '📞', category: 'Social' },
  { id: 'n4', title: 'Maintenance tonight at 2 AM', timestamp: now - 4 * 3_600_000, read: true, icon: '⚙️' },
];

const many: NotificationItem[] = Array.from({ length: 120 }, (_, i) => ({
  id: `m${i}`,
  title: `Update ${i + 1}`,
  timestamp: now - i * 5 * 60_000,
}));

export const Empty: Story = { args: { items: [] } };

export const ThreeUnread: Story = { args: { items: threeUnread } };

export const HundredTwentyUnread: Story = {
  name: '120 unread',
  args: { items: many },
};

export const HeaderSize: Story = {
  name: 'Header size (sm, 28px)',
  args: { items: threeUnread, size: 'sm' },
};
