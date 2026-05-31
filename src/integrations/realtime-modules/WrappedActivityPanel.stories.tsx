// src/integrations/realtime-modules/WrappedActivityPanel.stories.tsx
//
// Demonstrates WrappedActivityPanel wired to a mocked useActivity() hook
// return from realtime-modules. Shows empty + populated + multi-kind feeds.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedActivityPanel } from './WrappedActivityPanel';
import type { RMUseActivityReturn, RMActivityEvent } from './types';

const noop = () => {};
const past = (minAgo: number) =>
  new Date(Date.now() - minAgo * 60_000).toISOString();

const baseActivity: RMUseActivityReturn = {
  events: [],
  loadHistory: noop,
};

const populatedEvents: RMActivityEvent[] = [
  {
    eventType: 'user.joined',
    detail: { channel: 'general' },
    timestamp: past(1),
    userId: 'u-alice',
    displayName: 'Alice',
  },
  {
    eventType: 'message.sent',
    detail: { preview: 'Pushed the migration script…' },
    timestamp: past(3),
    userId: 'u-bob',
    displayName: 'Bob',
  },
  {
    eventType: 'reaction.added',
    detail: { emoji: '🎉' },
    timestamp: past(5),
    userId: 'u-carol',
    displayName: 'Carol',
  },
  {
    eventType: 'document.edited',
    detail: { docTitle: 'Sprint plan' },
    timestamp: past(9),
    userId: 'u-dave',
    displayName: 'Dave',
  },
  {
    eventType: 'user.left',
    detail: { channel: 'general' },
    timestamp: past(14),
    userId: 'u-eve',
    displayName: 'Eve',
  },
];

const meta = {
  title: 'Integrations/WrappedActivityPanel',
  component: WrappedActivityPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'ActivityFeed pre-wired to a `useActivity()` hook return from realtime-modules. ' +
          'Calls `adaptActivityEvents()` internally so callers do not have to remap ' +
          '`RMActivityEvent` → `ActivityFeedItem`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '12rem', maxWidth: '32rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WrappedActivityPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  name: 'Empty (no events)',
  args: {
    activity: baseActivity,
    visibleCount: 5,
  },
};

export const Populated: Story = {
  args: {
    activity: { ...baseActivity, events: populatedEvents },
    visibleCount: 5,
  },
};

export const RotatingSubset: Story = {
  name: 'Rotating (3 visible, 2s rotation)',
  args: {
    activity: { ...baseActivity, events: populatedEvents },
    visibleCount: 3,
    rotateMs: 2000,
    staggerMs: 250,
  },
};

export const CapabilityDenied: Story = {
  name: 'Capability denied (degraded → empty)',
  args: {
    activity: { ...baseActivity, events: [] },
    visibleCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the activity capability is disabled gateway-side, the hook ' +
          'returns an empty `events` array; the panel renders nothing and ' +
          'consumers can hide the section entirely.',
      },
    },
  },
};
