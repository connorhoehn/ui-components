import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ShortcutsHelp from './ShortcutsHelp';
import { Button } from '../ui/Button';

const meta = {
  title: 'Shared/ShortcutsHelp',
  component: ShortcutsHelp,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ShortcutsHelp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { open: true, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>Show shortcuts (?)</Button>
        <ShortcutsHelp open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};
