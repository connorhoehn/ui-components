import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlinePopover } from './InlinePopover';

const meta = {
  title: 'Shared/InlinePopover',
  component: InlinePopover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof InlinePopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { trigger: { current: null }, open: false, onClose: () => {}, children: null },
  render: () => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    return (
      <div className="p-16">
        <button
          ref={ref}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-border bg-surface-panel px-3 py-1.5 text-sm text-text-primary hover:bg-surface-hover"
        >
          Toggle popover
        </button>
        <InlinePopover trigger={ref} open={open} onClose={() => setOpen(false)}>
          <div className="p-3 text-sm text-text-secondary w-56">
            Dismisses on outside click, Escape, or tab-out.
          </div>
        </InlinePopover>
      </div>
    );
  },
};
