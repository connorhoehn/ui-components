// src/integrations/realtime-modules/WrappedWorkGraph.stories.tsx
//
// WrappedWorkGraph fed a mocked useWorkGraph() return: the list with its
// inspector, a partial graph, an error with Retry, and the injected canvas.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedWorkGraph } from './WrappedWorkGraph';
import type { RMUseWorkGraphReturn, RMWorkGraphNode } from './types';
import { WorkGraph } from '../../components/graph/work/WorkGraph';

const at = '2026-11-08T09:00:00Z';
const node = (id: string, kind: RMWorkGraphNode['kind'], title: string, status: RMWorkGraphNode['status']): RMWorkGraphNode => ({
  id, kind, title, status, disclosure: 'details', startedAt: at, updatedAt: at, capabilities: ['view-run'],
});

const ready: RMUseWorkGraphReturn = {
  graph: {
    nodes: Object.fromEntries([
      node('show', 'project', 'The Little Shop of Almost Fixed', 'running'),
      node('draw-toby', 'run', 'Draw Toby (4 × 4 sheet)', 'waiting'),
      node('mesh-mina', 'run', 'Mesh Mina (Meshy)', 'running'),
      node('ep1', 'document', 'Episode 01 outline', 'completed'),
    ].map((n) => [n.id, n])),
    edges: {
      e1: { id: 'e1', fromId: 'draw-toby', toId: 'show', relation: 'works-on', status: 'waiting', disclosure: 'details', updatedAt: at, capabilities: [] },
      e2: { id: 'e2', fromId: 'mesh-mina', toId: 'show', relation: 'works-on', status: 'running', disclosure: 'details', updatedAt: at, capabilities: [] },
    },
    sources: { pipeline: { source: 'pipeline', health: 'available', checkedAt: at } },
    status: 'ready',
    scope: { personId: 'show:little-shop', day: '2026-11-08', timezone: 'UTC' },
  },
  status: 'ready',
  error: null,
  retry: () => {},
};

const meta = {
  title: 'Integrations/WrappedWorkGraph',
  component: WrappedWorkGraph,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof WrappedWorkGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default: the accessible list and the inspector, no React Flow. */
export const List: Story = { args: { workGraph: ready, heading: 'Show work' } };

export const Partial: Story = {
  args: {
    workGraph: {
      ...ready,
      status: 'partial',
      graph: { ...ready.graph, status: 'partial', sources: { pipeline: { source: 'local-compute', health: 'delayed', checkedAt: at, message: 'The local worker has not reported for 2 minutes.' } } },
    },
  },
};

export const Error: Story = { args: { workGraph: { ...ready, status: 'error', error: 'snapshot-unavailable' } } };

export const Loading: Story = { args: { workGraph: { ...ready, status: 'loading' } } };

/** The canvas injected from `/graph`. */
export const Canvas: Story = { args: { workGraph: ready, canvas: WorkGraph } };
