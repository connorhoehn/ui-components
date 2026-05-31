// src/integrations/realtime-modules/WrappedConnectionPill.stories.tsx
//
// Demonstrates WrappedConnectionPill wired to a mocked useWebSocket() /
// useGateway() return shape. One story per ConnectionState value.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedConnectionPill } from './WrappedConnectionPill';
import type { RMConnectionState } from './WrappedConnectionPill';

function mockSocket(state: RMConnectionState) {
  return { connectionState: state };
}

const meta = {
  title: 'Integrations/WrappedConnectionPill',
  component: WrappedConnectionPill,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Adapter that takes any object with a `connectionState` field — typically ' +
          '`useWebSocket(...)` or `useGateway()` from realtime-modules — and renders ' +
          'the canonical `<ConnectionPill>`. Use it to expose a uniform connection ' +
          'badge across app shells without manually mapping enum values.',
      },
    },
  },
} satisfies Meta<typeof WrappedConnectionPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  args: { socket: mockSocket('connected') },
};

export const Connecting: Story = {
  args: { socket: mockSocket('connecting') },
};

export const Reconnecting: Story = {
  args: { socket: mockSocket('reconnecting') },
};

export const Disconnected: Story = {
  args: { socket: mockSocket('disconnected') },
};

export const Idle: Story = {
  args: { socket: mockSocket('idle') },
};

export const CompactDotOnly: Story = {
  name: 'Compact (dot only)',
  args: { socket: mockSocket('connected'), compact: true },
};
