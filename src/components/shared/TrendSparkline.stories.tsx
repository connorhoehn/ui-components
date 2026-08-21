import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrendSparkline } from './TrendSparkline';
import { toneVar } from './tones';

const meta = {
  title: 'Shared/TrendSparkline',
  component: TrendSparkline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TrendSparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { points: [3, 5, 4, 8, 6, 9, 11, 10] },
};

export const TonedNoFill: Story = {
  args: {
    points: [9, 7, 8, 5, 6, 4, 3],
    stroke: toneVar('danger'),
    showFill: false,
    width: 160,
    height: 40,
  },
};

export const Empty: Story = {
  args: { points: [] },
};
