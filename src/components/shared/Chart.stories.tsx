import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart, StackedAreaChart, BarChart } from './Chart';

const SERIES = [
  { label: 'Completed', data: [4, 7, 6, 11, 9, 14, 12].map((y, x) => ({ x, y })) },
  { label: 'Failed', data: [1, 0, 2, 1, 3, 1, 0].map((y, x) => ({ x, y })) },
];

const meta = {
  title: 'Shared/Chart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  args: { series: SERIES },
};

export const StackedArea: Story = {
  args: { series: SERIES },
  render: () => <StackedAreaChart series={SERIES} />,
};

export const Bar: Story = {
  args: { series: SERIES },
  render: () => (
    <BarChart
      data={[
        { name: 'Mon', count: 12 },
        { name: 'Tue', count: 19 },
        { name: 'Wed', count: 8 },
      ]}
      xKey="name"
      yKey="count"
    />
  ),
};
