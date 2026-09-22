import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineMenu } from './InlineMenu';

const meta = {
  title: 'Shared/InlineMenu',
  component: InlineMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof InlineMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No portal, no focus trap — the panel is CSS-anchored (`position:
 *  absolute`) inside the `position: relative` wrapper the trigger lives
 *  in, and simply unmounts on close. Compare to `InlinePopover`, which
 *  portals and traps focus for panels that need to escape a clipping
 *  ancestor. */
export const Interactive: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    return (
      <div className="relative p-16">
        <button
          ref={ref}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-border bg-surface-panel px-3 py-1.5 text-sm text-text-primary hover:bg-surface-hover"
        >
          Toggle menu
        </button>
        <InlineMenu open={open} onClose={() => setOpen(false)} trigger={ref}>
          <div className="p-3 text-sm text-text-secondary w-56">
            Dismisses on outside click or Escape. Renders in place — no
            portal, no focus trap.
          </div>
        </InlineMenu>
      </div>
    );
  },
};

/** `role="menu"` for a panel whose children are all `menuitem`s. */
export const AsMenu: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    return (
      <div className="relative p-16">
        <button
          ref={ref}
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-border bg-surface-panel px-3 py-1.5 text-sm text-text-primary hover:bg-surface-hover"
        >
          Actions
        </button>
        <InlineMenu
          open={open}
          onClose={() => setOpen(false)}
          trigger={ref}
          role="menu"
          aria-label="Actions"
          className="p-1"
        >
          <div role="menuitem" className="rounded px-2 py-1.5 hover:bg-surface-hover cursor-pointer">
            Rename
          </div>
          <div role="menuitem" className="rounded px-2 py-1.5 hover:bg-surface-hover cursor-pointer">
            Duplicate
          </div>
          <div role="menuitem" className="rounded px-2 py-1.5 text-danger-fg hover:bg-danger-bg cursor-pointer">
            Delete
          </div>
        </InlineMenu>
      </div>
    );
  },
};
