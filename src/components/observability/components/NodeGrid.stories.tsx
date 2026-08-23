import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import NodeGrid from './NodeGrid';
import type { NodeSummary } from './NodeGridTile';

function history(seed: number): number[] {
  const out: number[] = [];
  let v = seed;
  for (let i = 0; i < 24; i++) {
    v = (v * 9301 + 49297) % 233280;
    out.push(Math.abs(v % 40) + 5);
  }
  return out;
}

const healthy: NodeSummary[] = [
  {
    id: 'node-0', status: 'healthy', role: 'worker', region: 'us-east-1',
    cpu: 12, memoryMb: 340, connections: 12, activeRuns: 2, cpuHistory: history(1),
  },
  {
    id: 'node-1', status: 'healthy', role: 'worker', region: 'us-east-1',
    cpu: 8, memoryMb: 280, connections: 15, activeRuns: 1, cpuHistory: history(7),
  },
  {
    id: 'node-2', status: 'healthy', role: 'coordinator', region: 'eu-west-1',
    cpu: 19, memoryMb: 395, connections: 9, activeRuns: 0, cpuHistory: history(13),
  },
];

const meta = {
  title: 'Observability/NodeGrid',
  component: NodeGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { nodes: healthy },
} satisfies Meta<typeof NodeGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllHealthy: Story = {};

/** The status border is the whole point of the tile — one of each. */
export const MixedStatus: Story = {
  args: {
    nodes: [
      healthy[0],
      { ...healthy[1], status: 'degraded', cpu: 87, memoryMb: 1810 },
      { ...healthy[2], status: 'dead', cpu: 0, memoryMb: 0, connections: 0, activeRuns: 0 },
      {
        id: 'node-3', status: 'idle', role: 'worker', region: 'eu-west-1',
        cpu: 1, memoryMb: 120, connections: 0, activeRuns: 0, cpuHistory: history(21),
      },
    ],
  },
};

/** Selection is host-owned; NodeGrid only reports the clicked id. */
export const Selectable: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState<string | undefined>('node-1');
    return <NodeGrid {...args} selectedId={selectedId} onSelect={setSelectedId} />;
  },
};

/** Nothing has joined the cluster yet. */
export const NoNodes: Story = { args: { nodes: [] } };
