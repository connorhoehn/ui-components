import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from './Chip';

const meta = {
  title: 'Shared/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Neutral' },
};

export const SoftSuccess: Story = {
  args: { tone: 'success', children: 'Active' },
};

export const SoftDanger: Story = {
  args: { tone: 'danger', children: 'Failed' },
};

export const SolidInfo: Story = {
  args: { tone: 'info', solid: true, children: 'Info' },
};

export const Tiny: Story = {
  args: { tone: 'warning', size: 'xs', children: 'beta' },
};

export const MonoCount: Story = {
  name: 'Mono (count chip)',
  args: { tone: 'purple', mono: true, children: '0x1F' },
};
