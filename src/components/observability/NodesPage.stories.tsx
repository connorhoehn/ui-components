import type { Meta, StoryObj } from '@storybook/react-vite';
import NodesPage, { type NodesPageProps } from './NodesPage';
import type { NodeSummary } from './components/NodeGridTile';

function history(seed: number): number[] {
  const out: number[] = [];
  let v = seed;
  for (let i = 0; i < 24; i++) {
    v = (v * 9301 + 49297) % 233280;
    out.push(Math.abs(v % 40) + 5);
  }
  return out;
}

const nodes: NodeSummary[] = [
  {
    id: 'node-0', status: 'healthy', role: 'coordinator', region: 'us-east-1',
    cpu: 12, memoryMb: 340, connections: 12, activeRuns: 2, cpuHistory: history(1),
  },
  {
    id: 'node-1', status: 'degraded', role: 'worker', region: 'us-east-1',
    cpu: 87, memoryMb: 1810, connections: 41, activeRuns: 6, cpuHistory: history(7),
  },
  {
    id: 'node-2', status: 'dead', role: 'worker', region: 'eu-west-1',
    cpu: 0, memoryMb: 0, connections: 0, activeRuns: 0, cpuHistory: history(13),
  },
  {
    id: 'node-3', status: 'idle', role: 'worker', region: 'eu-west-1',
    cpu: 1, memoryMb: 120, connections: 0, activeRuns: 0, cpuHistory: history(21),
  },
];

const meta = {
  title: 'Observability/Pages/NodesPage',
  component: NodesPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="h-[640px] border border-border rounded-md overflow-hidden">
        <Story />
      </div>
    ),
  ],
  // `NodesPage`'s props parameter is optional (`props: NodesPageProps = {}`),
  // which collapses Storybook's `typeof`-based arg inference to `never` — so
  // the props type is named explicitly here.
} satisfies Meta<NodesPageProps>;

export default meta;
type Story = StoryObj<NodesPageProps>;

/**
 * No `nodes` prop: the page falls back to its own fixture so the route is
 * never blank. The chaos rail on the left writes to the shared local
 * `chaosState` module — nothing leaves the browser.
 */
export const FixtureFallback: Story = {};

/** Host-supplied cluster with one of every status. */
export const MixedStatus: Story = { args: { nodes } };

/**
 * With the three host handlers wired, the detail drawer grows its per-node
 * chaos + transfer sections. Click a tile to open it.
 */
export const WithHostActions: Story = {
  args: {
    nodes,
    onAddLatency: () => {},
    onKillNode: () => {},
    onTransferResource: () => {},
  },
};

/** Every node reporting healthy — the boring, correct state. */
export const AllHealthy: Story = {
  args: { nodes: nodes.map((n) => ({ ...n, status: 'healthy' as const })) },
};

/** Cluster fully down. */
export const NoNodes: Story = { args: { nodes: [] } };
