import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScoreBarGauge } from './ScoreBarGauge';

const meta = {
  title: 'Shared/ScoreBarGauge',
  component: ScoreBarGauge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ScoreBarGauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AboveThreshold: Story = {
  args: { value: 0.82, threshold: 0.5 },
  render: (args) => <div className="w-64"><ScoreBarGauge {...args} /></div>,
};

export const BelowThreshold: Story = {
  args: { value: 0.31, threshold: 0.5 },
  render: (args) => <div className="w-64"><ScoreBarGauge {...args} /></div>,
};

export const ForcedTone: Story = {
  args: { value: 0.62, tone: 'info', size: 'lg' },
  render: (args) => <div className="w-64"><ScoreBarGauge {...args} /></div>,
};
