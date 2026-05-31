// src/integrations/realtime-modules/ReconnectingShim.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReconnectingShim } from './ReconnectingShim';

const SampleBody = () => (
  <div className="rounded border border-slate-200 bg-white p-4 text-sm text-slate-700">
    <div className="mb-2 font-semibold">Chat panel</div>
    <ul className="space-y-1 text-slate-600">
      <li>Alice: hey 👋</li>
      <li>Bob: morning</li>
      <li>Carol: ☕</li>
    </ul>
  </div>
);

const meta = {
  title: 'Integrations/ReconnectingShim',
  component: ReconnectingShim,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Single visual contract for the four connection lifecycle states. ' +
          'Wraps a real-time surface (chat, presence, uploads) and renders a ' +
          'skeleton while connecting, dims + banners while reconnecting, an ' +
          'empty-state with retry while disconnected, and children unchanged ' +
          'while connected.',
      },
    },
  },
} satisfies Meta<typeof ReconnectingShim>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connecting: Story = {
  args: {
    connectionState: 'connecting',
    children: <SampleBody />,
  },
};

export const Reconnecting: Story = {
  args: {
    connectionState: 'reconnecting',
    children: <SampleBody />,
    reconnectingLabel: 'Reconnecting…',
  },
};

export const Disconnected: Story = {
  args: {
    connectionState: 'disconnected',
    children: <SampleBody />,
    onRetry: () => alert('reconnect()'),
  },
};

export const DisconnectedNoRetry: Story = {
  name: 'Disconnected (no retry button)',
  args: {
    connectionState: 'disconnected',
    children: <SampleBody />,
  },
};

export const Connected: Story = {
  args: {
    connectionState: 'connected',
    children: <SampleBody />,
  },
};

export const Idle: Story = {
  args: {
    connectionState: 'idle',
    children: <SampleBody />,
  },
};
