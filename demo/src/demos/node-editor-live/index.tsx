import { useEffect, useState, useCallback, useMemo } from 'react';
import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';
import { deploymentTimeline } from './simulation';
import { DeploymentLog } from './DeploymentLog';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type NodeStatus = 'idle' | 'running' | 'completed' | 'failed';

interface WorkflowNode {
  id: string;
  label: string;
  icon: string;
  kind: 'trigger' | 'task' | 'approval';
  x: number;
  y: number;
}

interface WorkflowEdge {
  from: string;
  to: string;
}

// ---------------------------------------------------------------------------
// Workflow graph definition
// ---------------------------------------------------------------------------

const workflowNodes: WorkflowNode[] = [
  { id: 'push-main', label: 'Push to main', icon: '⬆', kind: 'trigger', x: 60, y: 40 },
  { id: 'run-tests', label: 'Run Tests', icon: '🧪', kind: 'task', x: 280, y: 40 },
  { id: 'build-docker', label: 'Build Docker', icon: '🐳', kind: 'task', x: 500, y: 40 },
  { id: 'security-scan', label: 'Security Scan', icon: '🔒', kind: 'task', x: 720, y: 40 },
  { id: 'deploy-staging', label: 'Deploy Staging', icon: '🚀', kind: 'task', x: 60, y: 200 },
  { id: 'integration-tests', label: 'Integration Tests', icon: '🔗', kind: 'task', x: 280, y: 200 },
  { id: 'approval-gate', label: 'Approval Gate', icon: '✋', kind: 'approval', x: 500, y: 200 },
  { id: 'deploy-prod', label: 'Deploy Production', icon: '🌐', kind: 'task', x: 720, y: 200 },
  { id: 'health-check', label: 'Health Check', icon: '💚', kind: 'task', x: 500, y: 360 },
  { id: 'notify-team', label: 'Notify Team', icon: '📣', kind: 'task', x: 720, y: 360 },
];

const workflowEdges: WorkflowEdge[] = [
  { from: 'push-main', to: 'run-tests' },
  { from: 'run-tests', to: 'build-docker' },
  { from: 'build-docker', to: 'security-scan' },
  { from: 'security-scan', to: 'deploy-staging' },
  { from: 'deploy-staging', to: 'integration-tests' },
  { from: 'integration-tests', to: 'approval-gate' },
  { from: 'approval-gate', to: 'deploy-prod' },
  { from: 'deploy-prod', to: 'health-check' },
  { from: 'health-check', to: 'notify-team' },
];

// ---------------------------------------------------------------------------
// Helper: compute bezier edge path between two nodes
// ---------------------------------------------------------------------------

const NODE_WIDTH = 180;
const NODE_HEIGHT = 64;

function computeEdgePath(from: WorkflowNode, to: WorkflowNode): string {
  const x1 = from.x + NODE_WIDTH;
  const y1 = from.y + NODE_HEIGHT / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_HEIGHT / 2;

  // If we need to go left-to-right on a new row, come out of the bottom-right
  // and into top-left. Otherwise standard horizontal bezier.
  if (to.y > from.y + NODE_HEIGHT) {
    // Going to next row — exit bottom, enter top
    const exitX = from.x + NODE_WIDTH / 2;
    const exitY = from.y + NODE_HEIGHT;
    const enterX = to.x + NODE_WIDTH / 2;
    const enterY = to.y;
    const cpOffset = (enterY - exitY) * 0.5;
    return `M ${exitX} ${exitY} C ${exitX} ${exitY + cpOffset}, ${enterX} ${enterY - cpOffset}, ${enterX} ${enterY}`;
  }

  if (to.x < from.x) {
    // Wrapping to next row (left)
    const exitX = from.x + NODE_WIDTH / 2;
    const exitY = from.y + NODE_HEIGHT;
    const enterX = to.x + NODE_WIDTH / 2;
    const enterY = to.y;
    const cpOffset = Math.abs(enterY - exitY) * 0.6;
    return `M ${exitX} ${exitY} C ${exitX} ${exitY + cpOffset}, ${enterX} ${enterY - cpOffset}, ${enterX} ${enterY}`;
  }

  // Normal horizontal connection
  const cpX = (x2 - x1) * 0.4;
  return `M ${x1} ${y1} C ${x1 + cpX} ${y1}, ${x2 - cpX} ${y2}, ${x2} ${y2}`;
}

// ---------------------------------------------------------------------------
// Edge component
// ---------------------------------------------------------------------------

function EdgePath({ edge, fromStatus, toStatus }: {
  edge: WorkflowEdge;
  fromStatus: NodeStatus;
  toStatus: NodeStatus;
}) {
  const from = workflowNodes.find((n) => n.id === edge.from)!;
  const to = workflowNodes.find((n) => n.id === edge.to)!;
  const d = computeEdgePath(from, to);

  const isFlowing = fromStatus === 'completed' && (toStatus === 'running' || toStatus === 'completed');
  const isActive = fromStatus === 'running' || toStatus === 'running';

  let strokeColor = '#cbd5e1';
  if (isFlowing) strokeColor = '#3b82f6';
  else if (fromStatus === 'completed' && toStatus === 'completed') strokeColor = '#10b981';

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeDasharray={isFlowing || isActive ? '6 4' : 'none'}
        opacity={fromStatus === 'idle' && toStatus === 'idle' ? 0.4 : 1}
        style={{
          animation: isFlowing ? 'dashFlow 0.8s linear infinite' : 'none',
        }}
      />
      {/* Arrowhead */}
      <circle
        cx={to.x + (to.y > from.y + NODE_HEIGHT || to.x < from.x ? NODE_WIDTH / 2 : 0)}
        cy={to.y + (to.y > from.y + NODE_HEIGHT || to.x < from.x ? 0 : NODE_HEIGHT / 2)}
        r={3}
        fill={strokeColor}
      />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Node component
// ---------------------------------------------------------------------------

function WorkflowNodeCard({ node, status, streamTokens }: {
  node: WorkflowNode;
  status: NodeStatus;
  streamTokens: string[];
}) {
  const borderColor = {
    idle: '#e2e8f0',
    running: '#f59e0b',
    completed: '#10b981',
    failed: '#ef4444',
  }[status];

  const dotColor = {
    idle: '#94a3b8',
    running: '#f59e0b',
    completed: '#10b981',
    failed: '#ef4444',
  }[status];

  const kindBadgeColor = {
    trigger: '#8b5cf6',
    task: '#3b82f6',
    approval: '#f59e0b',
  }[node.kind];

  return (
    <div style={{
      position: 'absolute',
      left: node.x,
      top: node.y,
      width: NODE_WIDTH,
      background: '#ffffff',
      borderRadius: 8,
      border: `2px solid ${borderColor}`,
      boxShadow: status === 'running'
        ? `0 0 12px ${borderColor}40`
        : '0 1px 3px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
      }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: dotColor,
          flexShrink: 0,
          animation: status === 'running' ? 'pulse 1.2s ease-in-out infinite' : 'none',
        }} />
        <span style={{ fontSize: 14, flexShrink: 0 }}>{node.icon}</span>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#1e293b',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {node.label}
        </span>
      </div>
      {/* Kind badge */}
      <div style={{ padding: '0 12px 6px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          fontSize: 9,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: kindBadgeColor,
          background: `${kindBadgeColor}15`,
          padding: '2px 6px',
          borderRadius: 3,
        }}>
          {node.kind}
        </span>
        {status !== 'idle' && (
          <span style={{ fontSize: 9, color: dotColor, fontWeight: 500 }}>{status}</span>
        )}
      </div>
      {/* Stream tokens */}
      {status === 'running' && streamTokens.length > 0 && (
        <div style={{
          padding: '4px 12px 6px',
          borderTop: '1px solid #f1f5f9',
          maxHeight: 44,
          overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 9,
            color: '#64748b',
            lineHeight: '13px',
          }}>
            {streamTokens.slice(-3).map((token, i) => (
              <div key={i} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {token}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main canvas (inner component that consumes WebSocket context)
// ---------------------------------------------------------------------------

function WorkflowCanvas() {
  const { onMessage } = useWebSocketContext();
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus>>(() => {
    const initial: Record<string, NodeStatus> = {};
    workflowNodes.forEach((n) => { initial[n.id] = 'idle'; });
    return initial;
  });
  const [streamTokens, setStreamTokens] = useState<Record<string, string[]>>({});
  const [workflowStatus, setWorkflowStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'workflow') return;
      const action = msg.action as string;
      const nodeId = msg.nodeId as string | undefined;

      if (action === 'run.started') {
        // Reset everything
        const reset: Record<string, NodeStatus> = {};
        workflowNodes.forEach((n) => { reset[n.id] = 'idle'; });
        setNodeStatuses(reset);
        setStreamTokens({});
        setWorkflowStatus('running');
      } else if (action === 'run.completed') {
        setWorkflowStatus('completed');
      } else if (action === 'step.started' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'running' }));
      } else if (action === 'step.completed' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'completed' }));
      } else if (action === 'step.failed' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'failed' }));
      } else if (action === 'stream' && nodeId) {
        const token = msg.token as string;
        setStreamTokens((prev) => ({
          ...prev,
          [nodeId]: [...(prev[nodeId] ?? []), token],
        }));
      }
    });
    return unsubscribe;
  }, [onMessage]);

  const statusLabel = useMemo(() => {
    if (workflowStatus === 'idle') return 'Idle';
    if (workflowStatus === 'completed') return 'Complete';
    return 'Deploying...';
  }, [workflowStatus]);

  const statusDotColor = useMemo(() => {
    if (workflowStatus === 'idle') return '#94a3b8';
    if (workflowStatus === 'completed') return '#10b981';
    return '#f59e0b';
  }, [workflowStatus]);

  const handleDeploy = useCallback(() => {
    // The SimulatedProvider handles playback — this is a visual-only trigger.
    // In a real app this would send a message to the server.
  }, []);

  // Compute SVG viewBox to fit all nodes
  const svgWidth = Math.max(...workflowNodes.map((n) => n.x + NODE_WIDTH)) + 60;
  const svgHeight = Math.max(...workflowNodes.map((n) => n.y + NODE_HEIGHT + 80)) + 40;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#f8fafc',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        background: '#0f172a',
        gap: 16,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>⚙</span>
          <h1 style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 700,
            color: '#f1f5f9',
            letterSpacing: '-0.01em',
          }}>
            CI/CD Deployment Workflow
          </h1>
        </div>

        <button
          onClick={handleDeploy}
          style={{
            marginLeft: 24,
            padding: '6px 16px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Deploy
        </button>

        {/* Status indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginLeft: 'auto',
        }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: statusDotColor,
            animation: workflowStatus === 'running' ? 'pulse 1.2s ease-in-out infinite' : 'none',
          }} />
          <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Canvas */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          position: 'relative',
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}>
          {/* SVG edges layer */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, width: svgWidth, height: svgHeight, pointerEvents: 'none' }}
          >
            {workflowEdges.map((edge) => (
              <EdgePath
                key={`${edge.from}-${edge.to}`}
                edge={edge}
                fromStatus={nodeStatuses[edge.from]}
                toStatus={nodeStatuses[edge.to]}
              />
            ))}
          </svg>
          {/* Node cards layer */}
          {workflowNodes.map((node) => (
            <WorkflowNodeCard
              key={node.id}
              node={node}
              status={nodeStatuses[node.id]}
              streamTokens={streamTokens[node.id] ?? []}
            />
          ))}
          {/* Spacer to ensure scroll area covers all nodes */}
          <div style={{ width: svgWidth, height: svgHeight, pointerEvents: 'none' }} />
        </div>

        {/* Right panel — Deployment Log */}
        <div style={{
          width: 280,
          borderLeft: '1px solid #e2e8f0',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <DeploymentLog />
        </div>
      </div>

      {/* CSS keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes dashFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page export (wraps canvas in SimulatedProvider)
// ---------------------------------------------------------------------------

export default function NodeEditorLiveDemo() {
  return (
    <SimulatedProvider timeline={deploymentTimeline} autoPlay>
      <WorkflowCanvas />
    </SimulatedProvider>
  );
}
