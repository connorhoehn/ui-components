import type { Meta, StoryObj } from '@storybook/react-vite';
import ConnectionPill from './ConnectionPill';

const meta = {
  title: 'Shared/ConnectionPill',
  component: ConnectionPill,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    state: {
      control: 'radio',
      options: ['idle', 'connecting', 'connected', 'reconnecting', 'disconnected'],
    },
    compact: { control: 'boolean' },
    withLabel: { control: 'boolean' },
  },
} satisfies Meta<typeof ConnectionPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = { args: { state: 'idle' } };
export const Connecting: Story = { args: { state: 'connecting' } };
export const Connected: Story = { args: { state: 'connected' } };
export const Reconnecting: Story = { args: { state: 'reconnecting' } };
export const Disconnected: Story = { args: { state: 'disconnected' } };

export const Compact: Story = {
  args: { state: 'connected', compact: true },
};

export const CustomLabels: Story = {
  args: {
    state: 'disconnected',
    labels: { disconnected: 'Offline' },
  },
};

export const AllStates: Story = {
  args: { state: 'connected' },
  render: () => (
    <div className="flex flex-col gap-3">
      <ConnectionPill state="idle" />
      <ConnectionPill state="connecting" />
      <ConnectionPill state="connected" />
      <ConnectionPill state="reconnecting" />
      <ConnectionPill state="disconnected" />
    </div>
  ),
};

/** `tone="code"` for the pill in terminal / debugger chrome. A wrapper
 *  `className` could not do this: the colours live on the dot and label,
 *  which the caller never sees. */
export const CodeTone: Story = {
  args: { state: 'connected', tone: 'code' },
  render: () => (
    <div className="flex flex-col gap-3 bg-code-bg p-4 rounded">
      <ConnectionPill tone="code" state="idle" />
      <ConnectionPill tone="code" state="connecting" />
      <ConnectionPill tone="code" state="connected" />
      <ConnectionPill tone="code" state="reconnecting" />
      <ConnectionPill tone="code" state="disconnected" />
    </div>
  ),
};
