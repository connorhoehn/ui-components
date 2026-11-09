import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ConfirmButton } from './ConfirmButton';
import { GroupedList } from './GroupedList';

const meta = {
  title: 'Shared/ConfirmButton',
  component: ConfirmButton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ConfirmButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/** Press it: the question and its two answers take the button's place. */
export const Default: Story = {
  args: { label: 'Regenerate', question: 'Replace the current picture?', confirmLabel: 'Regenerate', onConfirm: noop },
};

export const Destructive: Story = {
  args: { label: 'Cancel run', question: 'Cancel this run?', confirmLabel: 'Cancel run', cancelLabel: 'Keep it', tone: 'destructive', onConfirm: noop },
};

/** A confirm that returns a promise stays busy until it settles. */
export const Busy: Story = {
  args: { label: 'Cancel run', question: 'Cancel this run?', tone: 'destructive', onConfirm: () => new Promise((resolve) => setTimeout(resolve, 1500)) },
};

/** The row's own decision stays in the row — no modal hides the list. */
export const InARow: Story = {
  args: Default.args,
  render: () => {
    const [cancelled, setCancelled] = useState<string[]>([]);
    const rows = ['Draw Toby', 'Generate Tatter'].map((title, i) => ({
      id: String(i),
      groupId: 'running',
      title,
      subline: cancelled.includes(String(i)) ? 'Cancelled' : 'Running',
      actions: (
        <ConfirmButton
          label="Cancel"
          question="Cancel this run?"
          confirmLabel="Cancel run"
          cancelLabel="Keep"
          tone="destructive"
          onConfirm={() => setCancelled((c) => [...c, String(i)])}
          data-testid={`cancel-${i}`}
        />
      ),
    }));
    return (
      <div className="w-[720px]">
        <GroupedList size="md" trailingLayout="columns" groups={[{ id: 'running', title: 'Running' }]} rows={rows} onOpenRow={noop} />
      </div>
    );
  },
};
