import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ConversationList, type ConversationItem } from './ConversationList';

// All data static and local — no external avatar URLs; the initials
// fallback carries the look. Times are fixed local-time ISO strings.

/** Tiny inline SVG swatch so the photo path needs no external URL. */
function swatch(color: string): string {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" fill="${encodeURIComponent(color)}"/></svg>`;
}

const ITEMS: ConversationItem[] = [
  {
    channel: 'dm:alice',
    peers: [{ userId: 'u-alice', displayName: 'Alice Chen', online: true, avatarUrl: swatch('seagreen') }],
    lastMessagePreview: 'See you at standup — I moved it to 9:30',
    lastMessageAt: '2026-08-25T14:05:00',
    unreadCount: 3,
  },
  {
    channel: 'dm:bob',
    peers: [{ userId: 'u-bob', displayName: 'Bob Martinez', online: false, color: '#a855f7' }],
    lastMessagePreview: 'thanks!',
    lastMessageAt: '2026-08-25T11:42:00',
  },
  {
    channel: 'group:launch',
    peers: [
      { userId: 'u-grace', displayName: 'Grace Wilson' },
      { userId: 'u-dan', displayName: 'Dan Okafor' },
      { userId: 'u-eve', displayName: 'Eve Larsen' },
    ],
    lastMessagePreview: 'shipping tonight 🚀',
    lastMessageAt: '2026-08-24T22:10:00',
    unreadCount: 120,
  },
  {
    channel: 'dm:frank',
    peers: [{ userId: 'u-frank', displayName: 'Frank Idowu' }],
    lastMessagePreview: 'Sent the doc over',
    lastMessageAt: '2026-08-24T09:15:00',
  },
];

const meta = {
  title: 'Social/ConversationList',
  component: ConversationList,
  tags: ['autodocs'],
  args: {
    items: ITEMS,
    onSelect: () => {},
  },
} satisfies Meta<typeof ConversationList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Light inbox with unread badges, presence dots and a group row. */
export const Inbox: Story = {
  render: (args) => {
    const [active, setActive] = useState<string | null>('dm:alice');
    return (
      <div className="max-w-xs rounded-lg border border-border bg-surface p-2">
        <ConversationList {...args} activeChannel={active} onSelect={setActive} onNewChat={() => {}} />
      </div>
    );
  },
};

/** Dark tone on call chrome — the CallSidePanel / call-settings host. */
export const DarkTone: Story = {
  render: (args) => {
    const [active, setActive] = useState<string | null>('group:launch');
    return (
      <div className="max-w-xs rounded-lg bg-surface-inverse p-2">
        <ConversationList
          {...args}
          tone="dark"
          activeChannel={active}
          onSelect={setActive}
          onNewChat={() => {}}
        />
      </div>
    );
  },
};

/** Empty inbox — default copy plus the "+ New chat" affordance. */
export const Empty: Story = {
  args: { items: [], onNewChat: () => {} },
};

/** Custom empty label, no new-chat affordance. */
export const EmptyCustomLabel: Story = {
  args: { items: [], emptyLabel: 'Start a conversation from the people picker' },
};
