import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusDot } from './StatusDot';

const meta = {
  title: 'Shared/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DotOnly: Story = {
  args: { color: 'var(--color-success)', 'aria-label': 'online' },
};

export const Labelled: Story = {
  args: { color: 'var(--color-success)', label: 'Connected' },
};

export const Pulsing: Story = {
  args: { color: 'var(--color-warning)', pulse: true, label: 'Reconnecting…' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <StatusDot size="xs" label="xs" />
      <StatusDot size="sm" label="sm" />
      <StatusDot size="md" label="md" />
    </div>
  ),
};
