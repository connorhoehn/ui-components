import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkedItemsSection, type LinkedItem, type LinkableDocument } from './LinkedItemsSection';

const ITEMS: LinkedItem[] = [
  { id: 'd1', title: 'Collector fleet rollout', kind: 'page', status: { label: 'Completed', tone: 'success' }, onOpen: () => {} },
  { id: 'd2', title: 'ADR: tail-sampling policy', kind: 'page', status: { label: 'Approved', tone: 'success' }, onOpen: () => {} },
];
const DOCS: LinkableDocument[] = [
  { id: 'd3', title: 'StatsD traffic inventory', kind: 'page' },
  { id: 'd4', title: 'Retention review', kind: 'presentation' },
  { id: 'd5', title: 'Migration architecture', kind: 'diagram' },
];
const search = (q: string) =>
  new Promise<LinkableDocument[]>((r) => setTimeout(() => r(DOCS.filter((d) => d.title.toLowerCase().includes(q.toLowerCase()))), 200));

function Live({ initial }: { initial: LinkedItem[] }) {
  const [items, setItems] = useState(initial);
  const withRemove = items.map((i) => ({ ...i, onRemove: () => setItems((xs) => xs.filter((x) => x.id !== i.id)) }));
  return (
    <div className="max-w-[640px]">
      <LinkedItemsSection
        first
        items={withRemove}
        onSearchDocuments={search}
        onAdd={(doc, relation) => setItems((xs) => [...xs, {
          id: doc.id, title: doc.title, kind: doc.kind, relation: relation === 'decided-by' ? 'Decided by' : 'Depends on', status: null, onOpen: () => {},
        }])}
      />
    </div>
  );
}

const meta = {
  title: 'Work/LinkedItemsSection',
  component: LinkedItemsSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof LinkedItemsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The mockup's two rows, each with the linked document's own status. */
export const Default: Story = { args: { items: ITEMS }, render: () => <Live initial={ITEMS} /> };

/** A link whose status is unknown shows no pill — not a placeholder. */
export const MixedStatus: Story = {
  args: {
    first: true,
    items: [
      { ...ITEMS[0], relation: 'Depends on' },
      { ...ITEMS[1], relation: 'Decided by' },
      { id: 'd6', title: 'Legacy StatsD notes', kind: 'transcript', relation: 'Depends on', status: null },
    ],
  },
  decorators: [(S) => <div className="max-w-[640px]"><S /></div>],
};
export const Empty: Story = { args: { items: [] }, render: () => <Live initial={[]} /> };
export const Dark: Story = {
  args: { items: ITEMS },
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <Live initial={ITEMS} />
    </div>
  ),
};
