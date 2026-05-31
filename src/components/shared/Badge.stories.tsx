import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Shared/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CountAccent: Story = {
  args: { variant: 'count', value: 3, color: 'accent' },
};

export const CountClamped: Story = {
  name: 'Count (clamps at 99+)',
  args: { variant: 'count', value: 142, color: 'danger' },
};

export const CountSuccess: Story = {
  args: { variant: 'count', value: 7, color: 'success' },
};

export const Dot: Story = {
  args: { variant: 'dot', color: 'success', 'aria-label': 'online' },
};

export const PulseDanger: Story = {
  name: 'Pulse (danger / live)',
  args: { variant: 'pulse', color: 'danger', 'aria-label': 'live' },
};

export const PulseMuted: Story = {
  args: { variant: 'pulse', color: 'muted' },
};
