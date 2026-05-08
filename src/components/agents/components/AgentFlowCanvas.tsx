import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from '@xyflow/react';
import { useMemo } from 'react';
import type { AgentDefinition } from '../../../types/agents';

interface AgentFlowCanvasProps {
  agents: AgentDefinition[];
  edges?: { from: string; to: string }[];
  onAgentClick?: (agentId: string) => void;
  className?: string;
}

function agentToNode(agent: AgentDefinition, index: number): Node {
  const col = index % 3;
  const row = Math.floor(index / 3);

  return {
    id: agent.id,
    position: { x: 80 + col * 280, y: 80 + row * 160 },
    data: {
      label: agent.name,
      status: agent.status,
      protocol: agent.protocol,
      invocations: agent.invocationsLast24h ?? 0,
    },
    type: 'default',
    style: {
      background: agent.status === 'offline' ? '#fef2f2' : agent.status === 'degraded' ? '#fffbeb' : '#f0fdf4',
      border: `1px solid ${agent.status === 'offline' ? '#fecaca' : agent.status === 'degraded' ? '#fed7aa' : '#bbf7d0'}`,
      borderRadius: 8,
      padding: 12,
      fontSize: 12,
      width: 200,
    },
  };
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
        style: { stroke: isA2A ? '#3b82f6' : '#94a3b8', strokeWidth: isA2A ? 2 : 1 },
        label: isA2A ? 'A2A' : undefined,
        labelStyle: { fontSize: 9, fill: '#64748b' },
      };
    });
}

export function AgentFlowCanvas({
  agents,
  edges: edgeDefs = [],
  onAgentClick,
  className,
}: AgentFlowCanvasProps) {
  const nodes = useMemo(() => agents.map(agentToNode), [agents]);
  const edges = useMemo(() => buildEdges(edgeDefs, agents), [edgeDefs, agents]);

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    onAgentClick?.(node.id);
  };

  return (
    <div className={className} style={{ width: '100%', height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} color="#e2e8f0" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
