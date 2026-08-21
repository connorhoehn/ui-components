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

const NODE_WIDTH = 180;
const NODE_HEIGHT = 64;

function computeEdgePath(from: WorkflowNode, to: WorkflowNode): string {
  const x1 = from.x + NODE_WIDTH;
  const y1 = from.y + NODE_HEIGHT / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_HEIGHT / 2;

  if (to.y > from.y + NODE_HEIGHT) {
    const exitX = from.x + NODE_WIDTH / 2;
    const exitY = from.y + NODE_HEIGHT;
    const enterX = to.x + NODE_WIDTH / 2;
    const enterY = to.y;
    const cpOffset = (enterY - exitY) * 0.5;
    return `M ${exitX} ${exitY} C ${exitX} ${exitY + cpOffset}, ${enterX} ${enterY - cpOffset}, ${enterX} ${enterY}`;
  }

  if (to.x < from.x) {
    const exitX = from.x + NODE_WIDTH / 2;
    const exitY = from.y + NODE_HEIGHT;
    const enterX = to.x + NODE_WIDTH / 2;
    const enterY = to.y;
    const cpOffset = Math.abs(enterY - exitY) * 0.6;
    return `M ${exitX} ${exitY} C ${exitX} ${exitY + cpOffset}, ${enterX} ${enterY - cpOffset}, ${enterX} ${enterY}`;
  }

  const cpX = (x2 - x1) * 0.4;
  return `M ${x1} ${y1} C ${x1 + cpX} ${y1}, ${x2 - cpX} ${y2}, ${x2} ${y2}`;
}

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

  let strokeColor = 'var(--color-border-emphasis)';
  if (isFlowing) strokeColor = 'var(--color-info)';
  else if (fromStatus === 'completed' && toStatus === 'completed') strokeColor = 'var(--color-success)';

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeDasharray={isFlowing || isActive ? '6 4' : 'none'}
        opacity={fromStatus === 'idle' && toStatus === 'idle' ? 0.4 : 1}
        className={isFlowing ? 'node-editor-dash-flow' : ''}
      />
      <circle
        cx={to.x + (to.y > from.y + NODE_HEIGHT || to.x < from.x ? NODE_WIDTH / 2 : 0)}
        cy={to.y + (to.y > from.y + NODE_HEIGHT || to.x < from.x ? 0 : NODE_HEIGHT / 2)}
        r={3}
        fill={strokeColor}
      />
    </g>
  );
}

const NODE_BORDER_CLASSES: Record<NodeStatus, string> = {
  idle: 'border-border shadow-sm',
  running: 'border-warning shadow-[0_0_12px_rgba(245,158,11,0.4)]',
  completed: 'border-success shadow-sm',
  failed: 'border-danger shadow-sm',
};

const STATUS_DOT_CLASSES: Record<NodeStatus, string> = {
  idle: 'bg-surface-emphasis',
  running: 'bg-warning animate-pulse',
  completed: 'bg-success',
  failed: 'bg-danger',
};

const STATUS_TEXT_CLASSES: Record<NodeStatus, string> = {
  idle: 'text-text-tertiary',
  running: 'text-warning-fg',
  completed: 'text-success-fg',
  failed: 'text-danger-fg',
};

const KIND_BADGE_CLASSES: Record<WorkflowNode['kind'], string> = {
  trigger: 'text-accent-fg bg-accent/15',
  task: 'text-info-fg bg-info/15',
  approval: 'text-warning-fg bg-warning/15',
};

function WorkflowNodeCard({ node, status, streamTokens }: {
  node: WorkflowNode;
  status: NodeStatus;
  streamTokens: string[];
}) {
  return (
    <div
      className={`absolute bg-white rounded-lg border-2 overflow-hidden transition-all duration-300 ${NODE_BORDER_CLASSES[status]}`}
      style={{ left: node.x, top: node.y, width: NODE_WIDTH }}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT_CLASSES[status]}`} />
        <span className="text-sm shrink-0">{node.icon}</span>
        <span className="text-xs font-semibold text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">
          {node.label}
        </span>
      </div>
      <div className="px-3 pb-1.5 flex items-center gap-1.5">
        <span
          className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${KIND_BADGE_CLASSES[node.kind]}`}
        >
          {node.kind}
        </span>
        {status !== 'idle' && (
          <span className={`text-[9px] font-medium ${STATUS_TEXT_CLASSES[status]}`}>{status}</span>
        )}
      </div>
      {status === 'running' && streamTokens.length > 0 && (
        <div className="px-3 pt-1 pb-1.5 border-t border-border-subtle max-h-11 overflow-hidden">
          <div className="font-mono text-[9px] text-neutral leading-[13px]">
            {streamTokens.slice(-3).map((token, i) => (
              <div key={i} className="whitespace-nowrap overflow-hidden text-ellipsis">
                {token}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const WORKFLOW_STATUS_DOT_CLASSES: Record<'idle' | 'running' | 'completed', string> = {
  idle: 'bg-surface-emphasis',
  running: 'bg-warning animate-pulse',
  completed: 'bg-success',
};

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

  const handleDeploy = useCallback(() => {
    // SimulatedProvider drives playback; this is visual-only.
  }, []);

  const svgWidth = Math.max(...workflowNodes.map((n) => n.x + NODE_WIDTH)) + 60;
  const svgHeight = Math.max(...workflowNodes.map((n) => n.y + NODE_HEIGHT + 80)) + 40;

  return (
    <div className="flex flex-col h-full bg-surface-panel">
      <div className="flex items-center px-5 py-3 bg-surface-inverse gap-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">⚙</span>
          <h1 className="m-0 text-[15px] font-bold text-text-inverse tracking-tight">
            CI/CD Deployment Workflow
          </h1>
        </div>
        <button
          onClick={handleDeploy}
          type="button"
          className="ml-6 px-4 py-1.5 bg-primary text-white border-none rounded-md text-xs font-semibold cursor-pointer hover:bg-primary transition-colors"
        >
          Deploy
        </button>
        <div className="flex items-center gap-1.5 ml-auto">
          <span
            className={`w-2 h-2 rounded-full ${WORKFLOW_STATUS_DOT_CLASSES[workflowStatus]}`}
          />
          <span className="text-text-tertiary text-xs font-medium">{statusLabel}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto relative bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] bg-[size:20px_20px]">
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            style={{ width: svgWidth, height: svgHeight }}
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
          {workflowNodes.map((node) => (
            <WorkflowNodeCard
              key={node.id}
              node={node}
              status={nodeStatuses[node.id]}
              streamTokens={streamTokens[node.id] ?? []}
            />
          ))}
          <div className="pointer-events-none" style={{ width: svgWidth, height: svgHeight }} />
        </div>

        <div className="w-[280px] border-l border-border shrink-0 overflow-hidden">
          <DeploymentLog />
        </div>
      </div>

      <style>{`
        @keyframes dashFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        .node-editor-dash-flow {
          animation: dashFlow 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function NodeEditorLiveDemo() {
  return (
    <SimulatedProvider timeline={deploymentTimeline} autoPlay>
      <WorkflowCanvas />
    </SimulatedProvider>
  );
}
