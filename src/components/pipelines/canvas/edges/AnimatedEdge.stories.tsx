// src/components/pipelines/canvas/edges/AnimatedEdge.stories.tsx
//
// Visual demo for AnimatedEdge payload/volume semantics (NODE-VISUALS-AUDIT
// §3.4). AnimatedEdge needs a live React Flow instance (EdgeLabelRenderer
// portals into the flow's label layer), so the story mounts a small
// non-interactive <ReactFlow> with default nodes and one edge per variant —
// no PipelineCanvas / editor context required.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactFlow, ReactFlowProvider, Position } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AnimatedEdge from './AnimatedEdge';
import type { AnimatedEdgeData } from './AnimatedEdge';

const edgeTypes = { animated: AnimatedEdge };

interface Variant {
  label: string;
  data: AnimatedEdgeData;
}

const variants: Variant[] = [
  { label: 'default (back-compat)', data: {} },
  { label: 'active', data: { state: 'active' } },
  { label: 'traversed-success', data: { state: 'traversed-success' } },
  { label: 'traversed-failure', data: { state: 'traversed-failure' } },
  { label: 'image / idle', data: { payload: 'image' } },
  { label: 'image / active (packet)', data: { payload: 'image', state: 'active' } },
  { label: 'control / idle (dotted)', data: { payload: 'control' } },
  { label: 'volume ×4', data: { volume: 4 } },
  { label: 'image + volume ×8 (width capped)', data: { payload: 'image', volume: 8, state: 'active' } },
  { label: 'branch label + volume', data: { label: 'true', volume: 3 } },
];

const ROW_H = 90;

function makeFlow(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  variants.forEach((v, i) => {
    const y = i * ROW_H;
    nodes.push(
      {
        id: `src-${i}`,
        position: { x: 0, y },
        data: { label: v.label },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: 'default',
        draggable: false,
        style: { width: 220, fontSize: 11 },
      },
      {
        id: `dst-${i}`,
        position: { x: 420, y },
        data: { label: '→' },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: 'default',
        draggable: false,
        style: { width: 60, fontSize: 11 },
      },
    );
    edges.push({
      id: `e-${i}`,
      source: `src-${i}`,
      target: `dst-${i}`,
      type: 'animated',
      data: v.data as Record<string, unknown>,
    });
  });
  return { nodes, edges };
}

function PayloadGallery() {
  const { nodes, edges } = makeFlow();
  return (
    <div className="h-[960px] w-full border border-border rounded-md">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          zoomOnScroll={false}
          panOnDrag={false}
          proOptions={{ hideAttribution: true }}
        />
      </ReactFlowProvider>
    </div>
  );
}

const meta: Meta<typeof PayloadGallery> = {
  title: 'Pipelines/Canvas/AnimatedEdge',
  component: PayloadGallery,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PayloadGallery>;

export const PayloadVariants: Story = {};
