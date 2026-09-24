import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeyValue } from './KeyValue';

const meta = {
  title: 'Shared/KeyValue',
  component: KeyValue,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
  args: {
    items: [
      { label: 'Input', value: '13 run notes' },
      { label: 'Output', value: '4 patterns' },
      { label: 'Duration', value: '2 min' },
      { label: 'Cost', value: '$0.0039' },
    ],
  },
} satisfies Meta<typeof KeyValue>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The run inspector's facts (Activity mockup). */
export const Row: Story = {};

export const Stack: Story = { args: { layout: 'stack' } };

export const Grid: Story = { args: { layout: 'grid' } };

export const MonoWithTooltip: Story = {
  args: {
    items: [
      { label: 'Job id', value: 'cmp-2026-09-24-0007-l1', mono: true, title: 'cmp-2026-09-24-0007-l1' },
      { label: 'Digest', value: '9f3c2a7be01d44c8a2d1f0e3b7c6a5d4', mono: true, title: '9f3c2a7be01d44c8a2d1f0e3b7c6a5d4' },
      { label: 'Model', value: 'amazon.nova-pro-v1:0', mono: true },
    ],
    labelWidth: 'w-16',
  },
};

export const Dark: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-surface p-4">
      <KeyValue {...args} />
    </div>
  ),
};
