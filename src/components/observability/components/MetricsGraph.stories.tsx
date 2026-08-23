import type { Meta, StoryObj } from '@storybook/react-vite';
import MetricsGraph from './MetricsGraph';
import { toneVar } from '../../shared/tones';

const wave = (n: number, phase: number, amp: number, base: number): number[] =>
  Array.from({ length: n }, (_, i) => base + Math.round(Math.sin((i + phase) / 3) * amp));

const meta = {
  title: 'Observability/MetricsGraph',
  component: MetricsGraph,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { title: 'Runs per minute', data: wave(30, 0, 8, 20) },
  decorators: [
    (Story) => (
      <div className="w-[560px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricsGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Bare `data` array — the single-series shorthand. */
export const SingleSeries: Story = {};

export const WithYLabel: Story = { args: { yLabel: 'runs/min' } };

/** Explicit `series` wins over `data`; colours come from the tone scale. */
export const MultiSeries: Story = {
  args: {
    title: 'Cluster CPU by node',
    yLabel: '%',
    data: undefined,
    series: [
      { label: 'node-0', data: wave(30, 0, 10, 35), color: toneVar('info') },
      { label: 'node-1', data: wave(30, 4, 14, 48), color: toneVar('warning') },
      { label: 'node-2', data: wave(30, 9, 6, 22), color: toneVar('success') },
    ],
  },
};

/** No samples in the window. */
export const NoData: Story = { args: { data: [], series: undefined } };
