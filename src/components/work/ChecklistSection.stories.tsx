import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChecklistSection, type ChecklistItem } from './ChecklistSection';

const ITEMS: ChecklistItem[] = [
  { id: 'c1', text: 'Route metrics through the collector', done: false },
  { id: 'c2', text: 'Verify dashboard and alert parity', done: false },
  { id: 'c3', text: 'Keep a rollback path during migration', done: false },
];

function Live({ initial }: { initial: ChecklistItem[] }) {
  const [items, setItems] = useState(initial);
  return (
    <div className="max-w-[640px]">
      <ChecklistSection
        first
        items={items}
        onToggle={(id, done) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, done } : x)))}
        onAdd={(text) => setItems((xs) => [...xs, { id: `c${Date.now()}`, text, done: false }])}
        onEdit={(id, text) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, text } : x)))}
        onRemove={(id) => setItems((xs) => xs.filter((x) => x.id !== id))}
        onMove={(id, to) => setItems((xs) => {
          const next = xs.filter((x) => x.id !== id);
          next.splice(to, 0, xs.find((x) => x.id === id)!);
          return next;
        })}
      />
    </div>
  );
}

const meta = {
  title: 'Work/ChecklistSection',
  component: ChecklistSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ChecklistSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { items: ITEMS }, render: () => <Live initial={ITEMS} /> };
export const Empty: Story = { args: { items: [] }, render: () => <Live initial={[]} /> };
export const PendingItem: Story = {
  args: {
    first: true,
    items: [{ ...ITEMS[0], done: true }, { ...ITEMS[1], pending: true }, ITEMS[2]],
    onToggle: () => {}, onRemove: () => {},
  },
  decorators: [(S) => <div className="max-w-[640px]"><S /></div>],
};
export const ReadOnly: Story = {
  args: { first: true, items: ITEMS, onToggle: () => {}, readOnlyReason: 'An agent run is editing these criteria' },
  decorators: [(S) => <div className="max-w-[640px]"><S /></div>],
};
export const Dark: Story = {
  args: { items: ITEMS },
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <Live initial={ITEMS} />
    </div>
  ),
};
