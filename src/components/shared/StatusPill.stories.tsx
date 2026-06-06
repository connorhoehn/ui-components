import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusPill } from './StatusPill';

const meta = {
  title: 'Shared/StatusPill',
  component: StatusPill,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    state: {
      control: 'radio',
      options: ['success', 'error', 'warning', 'info', 'neutral', 'pending'],
    },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof StatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { state: 'success', label: 'Completed' },
};

export const Error: Story = {
  args: { state: 'error', label: 'Failed' },
};

export const Warning: Story = {
  args: { state: 'warning', label: '10 warnings' },
};

export const Info: Story = {
  args: { state: 'info', label: 'Info' },
};

export const Neutral: Story = {
  args: { state: 'neutral', label: 'Idle' },
};

export const Pending: Story = {
  args: { state: 'pending', label: 'Running…' },
};

export const Small: Story = {
  args: { state: 'success', label: 'Saved', size: 'sm' },
};

export const WithIcon: Story = {
  args: {
    state: 'success',
    label: 'Published',
    icon: <span>✓</span>,
  },
};

export const AllStates: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusPill state="success" label="Completed" />
      <StatusPill state="error" label="Failed" />
      <StatusPill state="warning" label="10 warnings" />
      <StatusPill state="info" label="Info" />
      <StatusPill state="neutral" label="Idle" />
      <StatusPill state="pending" label="Running…" />
    </div>
  ),
};

export const AllStatesSm: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusPill state="success" label="v3 · Published" size="sm" />
      <StatusPill state="warning" label="10 warnings" size="sm" />
      <StatusPill state="pending" label="Running…" size="sm" />
    </div>
  ),
};
