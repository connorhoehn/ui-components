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

/** `variant="compact"` — no grid, axes or legend, one `tone` per bar from
 *  the shared Tone scale. For a metrics tile's small multi-category bar,
 *  not a full chart card. */
export const BarCompact: Story = {
  args: { series: SERIES },
  render: () => (
    <div className="flex gap-6">
      <div className="w-40">
        <BarChart
          data={[
            { name: 'In', value: 1240, tone: 'accent' },
            { name: 'Out', value: 980, tone: 'success' },
          ]}
          xKey="name"
          yKey="value"
          variant="compact"
        />
      </div>
      <div className="w-40">
        <BarChart
          data={[
            { name: 'Started', value: 24, tone: 'accent' },
            { name: 'Completed', value: 20, tone: 'success' },
            { name: 'Failed', value: 2, tone: 'danger' },
            { name: 'Active', value: 2, tone: 'info' },
          ]}
          xKey="name"
          yKey="value"
          variant="compact"
          showValues
        />
      </div>
    </div>
  ),
};
