import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NodeGraph } from './NodeGraph';
import type { GraphEdge, GraphNode } from './types';

// Static data, deterministic layouts: the same story renders the same picture
// every time, which is what makes the layout controls meaningful.

const NODES: GraphNode[] = [
  { id: 'q', label: 'kubernetes experts', sublabel: '6 people', group: 'center' },
  { id: 'grace', label: 'Grace Hopper', sublabel: 'Staff engineer', group: 'kubernetes', weight: 0.9 },
  { id: 'bob', label: 'Bob Martinez', sublabel: 'SRE', group: 'kubernetes', weight: 0.7 },
  { id: 'nora', label: 'Nora DaSilva', sublabel: 'Platform', group: 'helm', weight: 0.6 },
  { id: 'hank', label: 'Hank Anderson', sublabel: 'Backend', group: 'helm', weight: 0.4 },
  { id: 'ada', label: 'Ada Lovelace', sublabel: 'Networking', group: 'istio', weight: 0.5 },
  { id: 'lin', label: 'Lin Wei', sublabel: 'Networking', group: 'istio', weight: 0.3 },
];
const EDGES: GraphEdge[] = NODES.slice(1).map((n) => ({ from: 'q', to: n.id, label: n.group, weight: n.weight }));

const meta: Meta<typeof NodeGraph> = {
  title: 'Graph/NodeGraph',
  component: NodeGraph,
  tags: ['autodocs'],
  args: { nodes: NODES, edges: EDGES, height: 320 },
  argTypes: { layout: { control: 'radio', options: ['radial', 'grid', 'force'] } },
  decorators: [(Story) => <div className="max-w-[560px] p-4"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Radial: Story = { args: { layout: 'radial' } };
export const Grid: Story = { args: { layout: 'grid' } };
export const Force: Story = { args: { layout: 'force' } };

export const Selectable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>('grace');
    return <NodeGraph {...args} selectedId={selected} onSelect={(n) => setSelected(n.id)} />;
  },
};

export const ServiceMap: Story = {
  args: {
    layout: 'force',
    nodes: [
      { id: 'gw', label: 'gateway', group: 'edge', weight: 3 },
      { id: 'api', label: 'platform-api', group: 'service', weight: 2 },
      { id: 'lvs', label: 'lvs', group: 'service', weight: 2 },
      { id: 'ddb', label: 'ddb-local', group: 'store', weight: 1 },
      { id: 'redis', label: 'redis', group: 'store', weight: 1 },
    ],
    edges: [
      { from: 'gw', to: 'api' }, { from: 'gw', to: 'lvs' }, { from: 'api', to: 'ddb' },
      { from: 'api', to: 'redis' }, { from: 'lvs', to: 'redis' }, { from: 'gw', to: 'redis' },
    ],
  },
};
