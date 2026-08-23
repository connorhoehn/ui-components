import type { Meta, StoryObj } from '@storybook/react-vite';
import MetricCard from './MetricCard';
import { LineChart, type LineSeries } from '../../shared/Chart';
import { toneVar } from '../../shared/tones';

const series: LineSeries[] = [
  {
    label: 'runs/min',
    color: toneVar('info'),
    data: Array.from({ length: 24 }, (_, i) => ({
      x: i,
      y: 18 + Math.round(Math.sin(i / 3) * 7),
    })),
  },
];

const meta = {
  title: 'Observability/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    title: 'Runs per minute',
    timeRange: 'Last 1h',
    children: <LineChart series={series} height={160} />,
  },
  decorators: [
    (Story) => (
      <div className="w-[520px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The card is a frame — any chart (or table) can be its child. */
export const WithChart: Story = {};

/** `timeRange` is optional; omit it for a metric that isn't windowed. */
export const NoTimeRange: Story = { args: { timeRange: undefined } };

/** The maximize affordance only renders when the host wires a handler. */
export const Maximizable: Story = { args: { onMaximize: () => {} } };

/** Non-chart child: the frame doesn't assume its content. */
export const TextContent: Story = {
  args: {
    title: 'Approval latency',
    timeRange: 'Last 24h',
    children: (
      <div className="py-6 text-center text-text-tertiary text-[12px]">
        No approvals recorded in this window
      </div>
    ),
  },
};
