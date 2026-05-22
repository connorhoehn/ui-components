// src/integrations/realtime-modules/WrappedPresencePanel.stories.tsx
//
// Demonstrates WrappedPresencePanel wired to a mocked usePresence() hook
// return from realtime-modules. Shows empty, 5-user, and typing states.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedPresencePanel } from './WrappedPresencePanel';
import type { RMUsePresenceReturn } from './types';

const now = new Date().toISOString();
const noop = () => {};

const basePresence: RMUsePresenceReturn = {
  roster: [],
  setStatus: noop,
  updateMetadata: noop,
};

const fiveUsers: RMUsePresenceReturn['roster'] = [
  {
    clientId: 'client-alice-001',
    status: 'online',
    metadata: { displayName: 'Alice', email: 'alice@example.com' },
    channels: ['general'],
    nodeId: 'node-1',
    timestamp: now,
    lastSeen: now,
    lastHeartbeat: Date.now(),
  },
  {
    clientId: 'client-bob-002',
    status: 'online',
    metadata: { displayName: 'Bob', email: 'bob@example.com', isTyping: true },
    channels: ['general'],
    nodeId: 'node-1',
    timestamp: now,
    lastSeen: now,
    lastHeartbeat: Date.now(),
  },
  {
    clientId: 'client-carol-003',
    status: 'away',
    metadata: { displayName: 'Carol', email: 'carol@example.com' },
    channels: ['general'],
    nodeId: 'node-2',
    timestamp: now,
    lastSeen: now,
    lastHeartbeat: Date.now(),
  },
  {
    clientId: 'client-dave-004',
    status: 'busy',
    metadata: { displayName: 'Dave', email: 'dave@example.com' },
    channels: ['general'],
    nodeId: 'node-2',
    timestamp: now,
    lastSeen: now,
    lastHeartbeat: Date.now(),
  },
  {
    clientId: 'client-eve-005',
    status: 'offline',
    metadata: { displayName: 'Eve', email: 'eve@example.com' },
    channels: [],
    nodeId: 'node-3',
    timestamp: now,
    lastSeen: now,
    lastHeartbeat: Date.now(),
  },
];

const meta = {
  title: 'Integrations/WrappedPresencePanel',
  component: WrappedPresencePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'PresencePanel pre-wired to a `usePresence()` hook return from realtime-modules. ' +
          'Maps `clientId`/`metadata.displayName`/`status` to the inner PresencePanel user shape. ' +
          'Pass `currentClientId` to mark the local user with a "(you)" label.',
      },
    },
  },
} satisfies Meta<typeof WrappedPresencePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    presence: basePresence,
    currentClientId: null,
  },
};

export const FiveUsers: Story = {
  name: '5 users (mixed statuses)',
  args: {
    presence: { ...basePresence, roster: fiveUsers },
    currentClientId: 'client-alice-001',
  },
};

export const WithTyping: Story = {
  name: 'With typing user (Bob)',
  args: {
    presence: { ...basePresence, roster: fiveUsers },
    currentClientId: 'client-carol-003',
  },
};

export const NoCurrentUser: Story = {
  name: 'No local clientId (observer view)',
  args: {
    presence: { ...basePresence, roster: fiveUsers },
    currentClientId: null,
  },
};
