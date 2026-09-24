import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypedNodeCanvas, type TypedCanvasEdge, type TypedCanvasNode } from './TypedNodeCanvas';
import { FileKindMark } from '../shared/FileKindMark';

type TierData = { level?: string; title: string; count?: number; blurb: string; items?: string[]; browse: string };
type TierNode = TypedCanvasNode<'tier' | 'library', TierData>;

const NODES: TierNode[] = [
  { id: 'L0', kind: 'tier', label: 'Run notes, 304', data: { level: 'L0', title: 'Run notes', count: 304, blurb: 'Experiences from agent runs', items: ['Tests collide in parallel', 'Skipping a test hid a bug'], browse: 'Browse notes' } },
  { id: 'L1', kind: 'tier', label: 'Patterns, 22', data: { level: 'L1', title: 'Patterns', count: 22, blurb: 'Related notes combined', items: ['CI failures share a port'], browse: 'Browse patterns' } },
  { id: 'L2', kind: 'tier', label: 'Guides and findings, 11', data: { level: 'L2', title: 'Guides & findings', count: 11, blurb: 'Reusable knowledge', items: ['Troubleshoot a flaky CI test'], browse: 'Browse guides' } },
  { id: 'lib', kind: 'library', label: 'Library, 7 linked items', x: 848, y: 300, data: { title: 'Library', blurb: '7 linked items', browse: 'Open Library' } },
];

const EDGES: TypedCanvasEdge[] = [
  { id: 'c1', from: 'L0', to: 'L1', label: 'Compact', detail: '13 notes → 4 patterns · 3h ago', marker: { label: 'Compaction L0 to L1, completed 3 hours ago' } },
  { id: 'c2', from: 'L1', to: 'L2', label: 'Compact', tone: 'warning', detail: '3 patterns → 3 guides · 12h ago', marker: { label: 'Compaction L1 to L2, behind', tone: 'warning' } },
  { id: 'p', from: 'L2', to: 'lib', label: 'Publish' },
];

function TierCard({ node, selected }: { node: TierNode; selected: boolean }) {
  const d = node.data;
  return (
    <div className={`flex flex-col gap-2 rounded-lg border bg-surface p-4 ${selected ? 'border-primary' : 'border-border'}`}>
      {d.level && <span className="w-fit rounded bg-neutral-bg px-1.5 py-0.5 text-[11px] font-semibold text-text-secondary">{d.level}</span>}
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[15px] font-semibold text-text-primary">{d.title}</span>
        {d.count !== undefined && <span className="text-[13px] tabular-nums text-text-secondary">{d.count}</span>}
      </div>
      <span className="text-[12px] text-text-secondary">{d.blurb}</span>
      {d.items?.map((item) => (
        <span key={item} className="flex items-center gap-2 text-[12px] text-text-primary"><FileKindMark kind="page" size="sm" variant="plain" />{item}</span>
      ))}
      <a href={`#${node.id}`} className="text-[13px] font-medium text-primary no-underline hover:underline">{d.browse} →</a>
    </div>
  );
}

function Live(props: { listFallback?: boolean; reduced?: boolean }) {
  const [selected, setSelected] = useState<string | null>('c1');
  return (
    <TypedNodeCanvas
      aria-label="Distillation tier graph"
      className="h-[520px] rounded-lg border border-border bg-surface-panel"
      nodes={NODES}
      edges={props.reduced ? EDGES : EDGES.map((e) => (e.id === 'c1' ? { ...e, animated: true } : e))}
      renderNode={(node, { selected: isSelected }) => <TierCard node={node} selected={isSelected} />}
      selectedId={selected}
      onSelectNode={setSelected}
      onSelectEdge={setSelected}
      caption="Run notes → patterns → reusable guides. Open an item to inspect its sources."
      listFallback={props.listFallback}
      nodeWidth={232}
      columnGap={176}
    />
  );
}

const meta: Meta<typeof TypedNodeCanvas> = {
  title: 'Graph/TypedNodeCanvas',
  component: TypedNodeCanvas,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof TypedNodeCanvas>;

/** The Activity tier graph (mockup): three tiers and the Library, a running compaction animated. */
export const TierGraph: Story = { render: () => <div className="w-[1100px]"><Live /></div> };

/** The same graph as its list equivalent. */
export const ListFallback: Story = { render: () => <div className="w-[420px] rounded-lg border border-border bg-surface"><Live listFallback /></div> };

/** No moving dot — what a reader with reduced motion sees. */
export const Static: Story = { render: () => <div className="w-[1100px]"><Live reduced /></div> };

export const Empty: Story = {
  render: () => <TypedNodeCanvas nodes={[]} edges={[]} renderNode={() => null} emptyLabel="No lineage recorded for this item" />,
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="w-[1100px] bg-surface p-4">
      <Live />
    </div>
  ),
};
