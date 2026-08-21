import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta = {
  title: 'Shared/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Runs today', value: 128 },
};

export const WithDeltaAndSparkline: Story = {
  args: {
    label: 'Events / min',
    value: '4.2k',
    delta: { value: 12, direction: 'up' },
    sparklineData: [3, 4, 3.5, 4.4, 4.0, 4.6, 4.2],
    hint: 'vs previous hour',
  },
};

export const InvertedTone: Story = {
  name: 'Inverted tone (failures down = good)',
  args: {
    label: 'Failed events',
    value: 7,
    danger: true,
    delta: { value: 4, direction: 'down', tone: 'positive', suffix: '' },
  },
};

export const AsLink: Story = {
  args: { label: 'Pending approvals', value: 3, accent: true, to: '#approvals' },
};
