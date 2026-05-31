import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Modal from './Modal';

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Harness({ title, footer, children }: { title?: string; footer?: React.ReactNode; children?: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white"
      >
        Open
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} footer={footer}>
        {children}
      </Modal>
    </div>
  );
}

export const Default: Story = {
  args: { open: true, onClose: () => {}, children: <p>Modal body content.</p> },
};

export const WithTitle: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Confirm changes',
    children: <p>You're about to apply these changes to all pipelines.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Confirm changes',
    children: <p>This action cannot be undone.</p>,
    footer: (
      <>
        <button type="button" className="rounded border border-slate-300 px-3 py-1 text-sm">Cancel</button>
        <button type="button" className="rounded bg-rose-600 px-3 py-1 text-sm font-semibold text-white">Delete</button>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: { open: true, onClose: () => {}, children: null },
  render: () => (
    <Harness title="Interactive modal" footer={<button type="button" className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white">OK</button>}>
      <p>Click outside, press Escape, or click OK to close.</p>
    </Harness>
  ),
};
