// src/integrations/realtime-modules/WrappedChatPanel.stories.tsx
//
// Demonstrates WrappedChatPanel wired to mocked useChat() + optional
// usePresence() hook returns from realtime-modules.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedChatPanel } from './WrappedChatPanel';
import type { RMUseChatReturn, RMUsePresenceReturn } from './types';

const now = new Date().toISOString();
const past = (minAgo: number) =>
  new Date(Date.now() - minAgo * 60_000).toISOString();

const noop = () => {};

const baseChat: RMUseChatReturn = {
  messages: [],
  sendMessage: noop,
  loadHistory: noop,
};

const sampleMessages: RMUseChatReturn['messages'] = [
  {
    id: 'm1',
    clientId: 'client-alice',
    channel: 'general',
    message: 'Hey team, morning standup in 5?',
    metadata: { displayName: 'Alice' },
    timestamp: past(12),
  },
  {
    id: 'm2',
    clientId: 'client-bob',
    channel: 'general',
    message: "Works for me, I'll be there",
    metadata: { displayName: 'Bob' },
    timestamp: past(10),
  },
  {
    id: 'm3',
    clientId: 'client-carol',
    channel: 'general',
    message: 'Can we push it 10 minutes? Still on a call',
    metadata: { displayName: 'Carol' },
    timestamp: past(8),
  },
  {
    id: 'm4',
    clientId: 'client-alice',
    channel: 'general',
    message: 'Sure, 10:10 it is',
    metadata: { displayName: 'Alice' },
    timestamp: past(5),
  },
  {
    id: 'm5',
    clientId: 'client-dave',
    channel: 'general',
    message: 'Sounds good!',
    metadata: { displayName: 'Dave' },
    timestamp: past(1),
  },
];

// Presence roster where Carol is currently typing
const presenceWithTyping: RMUsePresenceReturn = {
  roster: [
    {
      clientId: 'client-carol',
      status: 'online',
      metadata: { displayName: 'Carol', isTyping: true },
      channels: ['general'],
      nodeId: 'node-1',
      timestamp: now,
      lastSeen: now,
      lastHeartbeat: Date.now(),
    },
  ],
  setStatus: noop,
  updateMetadata: noop,
};

const meta = {
  title: 'Integrations/WrappedChatPanel',
  component: WrappedChatPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'ChatPanel pre-wired to a `useChat()` hook return from realtime-modules. ' +
          'Handles the `message`→`content` field rename and optionally derives ' +
          'typing indicators from a `usePresence()` roster.',
      },
    },
  },
} satisfies Meta<typeof WrappedChatPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    chat: baseChat,
  },
};

export const WithMessages: Story = {
  args: {
    chat: { ...baseChat, messages: sampleMessages },
  },
};

export const WithTypingFromPresence: Story = {
  name: 'With typing indicator (presence-derived)',
  args: {
    chat: { ...baseChat, messages: sampleMessages },
    presence: presenceWithTyping,
  },
};

export const WithTypingOverride: Story = {
  name: 'With typing indicator (manual override)',
  args: {
    chat: { ...baseChat, messages: sampleMessages },
    typingUsers: ['Alice', 'Bob'],
  },
};

export const Disabled: Story = {
  args: {
    chat: baseChat,
    disabled: true,
  },
};
