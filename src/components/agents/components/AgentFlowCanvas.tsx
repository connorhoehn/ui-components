import { cn } from '../../../lib/cn';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo } from 'react';
import type { AgentDefinition } from '../../../types/agents';

interface AgentFlowCanvasProps {
  agents: AgentDefinition[];
  edges?: { from: string; to: string }[];
  onAgentClick?: (agentId: string) => void;
  className?: string;
}

function layoutAgents(agents: AgentDefinition[], edgeDefs: { from: string; to: string }[]): Node[] {
  const outDegree = new Map<string, number>();
  const inDegree = new Map<string, number>();
  for (const a of agents) {
    outDegree.set(a.id, 0);
    inDegree.set(a.id, 0);
  }
  for (const e of edgeDefs) {
    outDegree.set(e.from, (outDegree.get(e.from) ?? 0) + 1);
    inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1);
  }

  const roots = agents.filter((a) => (inDegree.get(a.id) ?? 0) === 0);
  const middles = agents.filter((a) => (inDegree.get(a.id) ?? 0) > 0 && (outDegree.get(a.id) ?? 0) > 0);
  const leaves = agents.filter((a) => (outDegree.get(a.id) ?? 0) === 0 && (inDegree.get(a.id) ?? 0) > 0);

  const layers = [roots, middles, leaves].filter((l) => l.length > 0);

  const nodes: Node[] = [];
  const colSpacing = 300;
  const rowSpacing = 120;

  for (let col = 0; col < layers.length; col++) {
    const layer = layers[col];
    const totalHeight = (layer.length - 1) * rowSpacing;
    const startY = -totalHeight / 2;

    for (let row = 0; row < layer.length; row++) {
      const agent = layer[row];
      nodes.push({
        id: agent.id,
        position: { x: col * colSpacing, y: startY + row * rowSpacing },
        data: { label: agent.name },
        type: 'default',
        style: {
          background: agent.status === 'offline' ? '#fef2f2' : agent.status === 'degraded' ? '#fffbeb' : '#f0fdf4',
          border: `2px solid ${agent.status === 'offline' ? '#fecaca' : agent.status === 'degraded' ? '#fed7aa' : '#86efac'}`,
          borderRadius: 8,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 500,
          width: 180,
        },
      });
    }
  }

  return nodes;
}

function buildEdges(edgeDefs: { from: string; to: string }[], agents: AgentDefinition[]): Edge[] {
  const agentIds = new Set(agents.map((a) => a.id));
  return edgeDefs
    .filter((e) => agentIds.has(e.from) && agentIds.has(e.to))
    .map((e, i) => {
      const fromAgent = agents.find((a) => a.id === e.from);
      const isA2A = fromAgent?.protocol === 'a2a';
      return {
        id: `edge-${i}`,
        source: e.from,
        target: e.to,
        animated: isA2A,
        style: { stroke: isA2A ? '#3b82f6' : '#94a3b8', strokeWidth: isA2A ? 2 : 1.5 },
        label: isA2A ? 'A2A' : undefined,
        labelStyle: { fontSize: 10, fill: '#64748b', fontWeight: 500 },
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: isA2A ? '#3b82f6' : '#94a3b8' },
      };
    });
}

export function AgentFlowCanvas({
  agents,
  edges: edgeDefs = [],
  onAgentClick,
  className,
}: AgentFlowCanvasProps) {
  const nodes = useMemo(() => layoutAgents(agents, edgeDefs), [agents, edgeDefs]);
  const edges = useMemo(() => buildEdges(edgeDefs, agents), [edgeDefs, agents]);

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    onAgentClick?.(node.id);
  };

  return (
    <div className={cn('w-full h-[500px]', className)}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} color="#e2e8f0" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
