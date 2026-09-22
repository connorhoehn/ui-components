import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import { Button } from '../ui/Button';

const meta = {
  title: 'Shared/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { open: true, onClose: () => {}, title: 'Run details', children: null },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Run details"
          subtitle="run_8f3a · 2m 14s"
          footer={<Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>}
        >
          <p className="text-sm text-text-secondary">
            Drawer body — closes on Escape or backdrop click.
          </p>
        </Drawer>
      </div>
    );
  },
};

/** The same chrome, docked in the layout: no portal, no backdrop. */
export const Docked: Story = {
  args: { open: true, onClose: () => {}, children: null },
  render: () => (
    <div className="flex h-64 items-stretch border border-border">
      <div className="flex-1 p-4 text-sm text-text-secondary">
        Page content. The panel is a column beside it, not over it — this text
        reflows rather than being covered.
      </div>
      <Drawer open docked width={320} onClose={() => {}} title="My Mentions">
        <p className="text-sm text-text-secondary">Docked body.</p>
      </Drawer>
    </div>
  ),
};

