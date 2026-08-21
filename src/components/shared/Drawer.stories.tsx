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
