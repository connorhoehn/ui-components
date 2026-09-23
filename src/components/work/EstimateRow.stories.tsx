import type { Meta, StoryObj } from '@storybook/react-vite';
import { EstimateRow } from './EstimateRow';

const meta = {
  title: 'Work/EstimateRow',
  component: EstimateRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[390px]"><Story /></div>],
  args: { label: 'Estimated cost', estimate: { kind: 'range', low: 0.03, high: 0.3, unit: 'usd' } },
} satisfies Meta<typeof EstimateRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CostRange: Story = {};
export const DurationRange: Story = {
  args: { label: 'Duration', estimate: { kind: 'range', low: 60_000, high: 360_000, unit: 'ms' } },
};
export const NoPriorRuns: Story = { args: { estimate: { kind: 'none', reason: 'No prior runs' } } };
export const Loading: Story = { args: { estimate: { kind: 'loading' } } };
export const Dark: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-surface p-4">
      <EstimateRow {...args} />
    </div>
  ),
};
