import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Shared/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 64, 'aria-label': 'Progress' },
};

export const LabelledRatio: Story = {
  args: { value: 3, max: 8, label: 'Steps completed' },
};

export const Percentage: Story = {
  args: { value: 38, label: 'Upload', showRatio: false, color: 'var(--color-success)' },
};

export const Small: Story = {
  args: { value: 80, size: 'sm', 'aria-label': 'p' },
};

/** Turns green only once every item is done. */
export const CompletesInAnotherTone: Story = {
  args: { value: 3, max: 5 },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <ProgressBar value={3} max={5} label="3 / 5 done" showRatio={false} completeTone="success" />
      <ProgressBar value={5} max={5} label="5 / 5 done" showRatio={false} completeTone="success" />
    </div>
  ),
};
