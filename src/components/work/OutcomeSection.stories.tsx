import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OutcomeSection } from './OutcomeSection';

const TEXT = 'Move service metrics to OpenTelemetry without losing dashboard or alert coverage.';

function Live({ initial }: { initial: string | null }) {
  const [v, setV] = useState(initial);
  return (
    <div className="max-w-[640px]">
      <OutcomeSection first value={v} onChange={setV} />
    </div>
  );
}

const meta = {
  title: 'Work/OutcomeSection',
  component: OutcomeSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof OutcomeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: TEXT }, render: () => <Live initial={TEXT} /> };
export const Empty: Story = { args: { value: null }, render: () => <Live initial={null} /> };
export const ReadOnly: Story = {
  args: { value: TEXT, first: true, onChange: () => {}, readOnlyReason: 'This work item is archived' },
  decorators: [(S) => <div className="max-w-[640px]"><S /></div>],
};
export const Pending: Story = {
  args: { value: TEXT, first: true, onChange: () => {}, pending: true },
  decorators: [(S) => <div className="max-w-[640px]"><S /></div>],
};
export const Dark: Story = {
  args: { value: TEXT },
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <Live initial={TEXT} />
    </div>
  ),
};
