// src/integrations/realtime-modules/WrappedNotificationCenter.stories.tsx
//
// Demonstrates WrappedNotificationCenter wired to a mocked useNotifications()
// hook return from realtime-modules. Shows empty, unread, and all-read states.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedNotificationCenter } from './WrappedNotificationCenter';
import type { RMUseNotificationsReturn } from './types';

const now = Date.now();

const noop = () => {};

const baseHook: RMUseNotificationsReturn = {
  notifications: [],
  unreadCount: 0,
  markAsRead: noop,
  markAllRead: noop,
  remove: noop,
  clearAll: noop,
};

const sampleNotifications: RMUseNotificationsReturn['notifications'] = [
  {
    id: 'n1',
    type: 'chat',
    title: 'Alice mentioned you',
    body: '"Hey, can you review this?"',
    timestamp: new Date(now - 3 * 60_000).toISOString(),
    read: false,
    channel: 'general',
    payload: { icon: '💬' },
  },
  {
    id: 'n2',
    type: 'pipeline',
    title: 'Pipeline "deploy-prod" completed',
    body: 'All 9 steps passed.',
    timestamp: new Date(now - 20 * 60_000).toISOString(),
    read: false,
    payload: { icon: '✅' },
  },
  {
    id: 'n3',
    type: 'system',
    title: 'Maintenance tonight at 2 AM',
    body: 'Expected downtime: 30 minutes.',
    timestamp: new Date(now - 4 * 3_600_000).toISOString(),
    read: true,
    payload: { icon: '⚙️' },
  },
];

const meta = {
  title: 'Integrations/WrappedNotificationCenter',
  component: WrappedNotificationCenter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'NotificationCenter pre-wired to a `useNotifications()` hook return from realtime-modules. ' +
          'Pass the hook result as `notifications`; field adaptation (type→category, payload.icon) is handled internally.',
      },
    },
  },
} satisfies Meta<typeof WrappedNotificationCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    notifications: { ...baseHook, notifications: [], unreadCount: 0 },
  },
};

export const WithUnread: Story = {
  args: {
    notifications: {
      ...baseHook,
      notifications: sampleNotifications,
      unreadCount: 2,
    },
  },
};

export const AllRead: Story = {
  args: {
    notifications: {
      ...baseHook,
      notifications: sampleNotifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    },
  },
};

export const SingleUnread: Story = {
  args: {
    notifications: {
      ...baseHook,
      notifications: [sampleNotifications[0]],
      unreadCount: 1,
    },
  },
};
