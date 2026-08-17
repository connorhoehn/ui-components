import { useEffect, useState, useRef } from 'react';
import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';
import { pipelineExecutionTimeline } from './simulation';
import {
  mockNodes, mockEdges, nodePalette, nodeTypeIcons, nodeTypeColors,
  type MockNode,
} from './MockPipeline';
import { PipelineEventLog } from './PipelineEventLog';

// ui-components layout / shell
import { AppShell } from '@connorhoehnslalom/ui-components/layout';

// ui-components shared primitives
import {
  PageHeader,
  Tabs,
  StatusPill,
  type StatusPillState,
} from '@connorhoehnslalom/ui-components/shared';

// ui-components UI primitives (Button, Card)
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Form primitives (new Phase 5 — sourced from src via @/* alias → ../src)
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { Textarea } from '@/components/forms/Textarea';

// NodeCard composite (new Phase 5)
import { NodeCard } from '@/components/pipelines/nodes/NodeCard';

type NodeStatus = 'idle' | 'running' | 'completed' | 'failed';

// Map canvas execution statuses → StatusPill semantic states.
const nodeStatusToPillState: Record<NodeStatus, StatusPillState> = {
  idle:      'neutral',
  running:   'pending',
  completed: 'success',
  failed:    'error',
};

// ─────────────────────────────────────────────────────────
// NodePalette
// ─────────────────────────────────────────────────────────

function NodePalette() {
  const [query, setQuery] = useState('');

  return (
    <aside className="w-56 border-r border-border bg-white flex flex-col overflow-hidden shrink-0">
      <div className="px-3 py-2.5 border-b border-slate-100">
        <Input
          type="search"
          placeholder="Search nodes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="sm"
        />
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {nodePalette.map((group) => {
          const filtered = group.items.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase()),
          );
          if (filtered.length === 0) return null;
          return (
            <div key={group.category} className="mb-4">
              <div className="px-3.5 py-1 text-[10px] font-semibold tracking-widest text-neutral uppercase">
                {group.category}
              </div>
              {filtered.map((item) => (
                <div
                  key={item.type}
                  draggable
                  className="flex items-center gap-2.5 mx-1.5 px-3 py-2 rounded-md cursor-grab transition-colors hover:bg-surface-hover"
                >
                  <span
                    className="text-base w-6 text-center shrink-0"
                    aria-hidden="true"
                    style={{ color: nodeTypeColors[item.type] }}
                  >
                    {nodeTypeIcons[item.type]}
                  </span>
                  <span className="flex-1 text-sm font-medium text-slate-800">
                    {item.label}
                  </span>
                  <kbd className="text-[10px] text-text-tertiary bg-surface-hover rounded px-1.5 py-0.5 font-mono">
                    {item.shortcut}
                  </kbd>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="px-3.5 py-2 text-[11px] text-text-tertiary border-t border-slate-100">
        Press 1–8 to insert at center
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────
// PipelineCanvas
// ─────────────────────────────────────────────────────────

function PipelineCanvas() {
  const { onMessage } = useWebSocketContext();
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus>>(() => {
    const initial: Record<string, NodeStatus> = {};
    mockNodes.forEach((n) => { initial[n.id] = 'idle'; });
    return initial;
  });

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'pipeline') return;
      const action = msg.action as string;
      const nodeId = msg.nodeId as string | undefined;

      if (action === 'run.started') {
        setNodeStatuses((prev) => {
          const reset: Record<string, NodeStatus> = {};
          Object.keys(prev).forEach((id) => { reset[id] = 'idle'; });
          return reset;
        });
      } else if (action === 'step.started' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'running' }));
      } else if (action === 'step.completed' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'completed' }));
      } else if (action === 'step.failed' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'failed' }));
      }
    });
    return unsubscribe;
  }, [onMessage]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const scale = 0.85;
  const offsetX = 20;
  const offsetY = 20;

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 overflow-hidden min-h-[500px] bg-[#fafbfc] [background-image:radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]"
    >
      {/* SVG edges — drawing only; SVG stroke attributes are presentation, not style={{}} */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {mockEdges.map((edge) => {
          const source = mockNodes.find((n) => n.id === edge.source);
          const target = mockNodes.find((n) => n.id === edge.target);
          if (!source || !target) return null;

          const sx = (source.x + 80) * scale + offsetX;
          const sy = (source.y + 25) * scale + offsetY;
          const tx = target.x * scale + offsetX;
          const ty = (target.y + 25) * scale + offsetY;
          const mx = (sx + tx) / 2;

          const sourceStatus = nodeStatuses[edge.source];
          const edgeColor = sourceStatus === 'completed' ? '#10b981'
            : sourceStatus === 'running' ? '#f59e0b' : '#cbd5e1';

          return (
            <g key={edge.id}>
              <path
                d={`M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ty}, ${tx} ${ty}`}
                fill="none"
                stroke={edgeColor}
                strokeWidth={2}
                className="transition-[stroke] duration-300 ease-in-out"
              />
              {edge.label && (
                <text
                  x={mx}
                  y={(sy + ty) / 2 - 6}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={10}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes — each rendered as a NodeCard composite */}
      {mockNodes.map((node: MockNode) => {
        const status = nodeStatuses[node.id] ?? 'idle';
        const pillState = nodeStatusToPillState[status];
        const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

        return (
          <div
            key={node.id}
            className="absolute"
            style={{
              left: node.x * scale + offsetX,
              top: node.y * scale + offsetY,
            }}
          >
            <NodeCard
              icon={nodeTypeIcons[node.type] ?? '•'}
              label={node.label}
              subtitle={node.subtitle}
              status={pillState}
              statusLabel={statusLabel}
            />
          </div>
        );
      })}

      {/* Minimap */}
      <Card className="absolute bottom-3 right-3 w-36 h-20 overflow-hidden p-1.5">
        <svg width="100%" height="100%" viewBox="0 0 1200 500">
          {mockNodes.map((node) => (
            <rect
              key={node.id}
              x={node.x}
              y={node.y}
              width={140}
              height={50}
              rx={4}
              fill={nodeTypeColors[node.type] + '30'}
              stroke={nodeTypeColors[node.type]}
              strokeWidth={2}
            />
          ))}
        </svg>
      </Card>

      {/* Zoom controls */}
      <Card className="absolute bottom-3 left-3 flex flex-col overflow-hidden">
        {['+', '−', '⛶', '🔒'].map((icon) => (
          <button
            key={icon}
            type="button"
            aria-label={icon}
            className="w-7 h-7 flex items-center justify-center text-sm text-text-secondary hover:bg-surface-panel border-b border-slate-100 last:border-b-0 transition-colors"
          >
            {icon}
          </button>
        ))}
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// ConfigPanel
// ─────────────────────────────────────────────────────────

const TAB_ITEMS = [
  { id: 'config', label: 'Config' },
  { id: 'runs',   label: 'Runs'   },
];

const NODE_TYPE_OPTIONS = [
  { value: 'trigger',   label: 'Trigger'   },
  { value: 'llm',       label: 'LLM'       },
  { value: 'transform', label: 'Transform' },
  { value: 'condition', label: 'Condition' },
  { value: 'action',    label: 'Action'    },
  { value: 'approval',  label: 'Approval'  },
];

function ConfigPanel() {
  const [tab, setTab] = useState<'config' | 'runs'>('config');
  const [prompt, setPrompt] = useState('');
  const [nodeType, setNodeType] = useState('llm');

  return (
    <aside className="w-72 border-l border-border bg-white flex flex-col shrink-0">
      {/* Tab strip */}
      <div className="px-3 pt-2.5 border-b border-border">
        <Tabs
          items={TAB_ITEMS}
          value={tab}
          onValueChange={(id) => setTab(id as 'config' | 'runs')}
          variant="underline"
          size="sm"
        />
      </div>

      {/* Panel body */}
      <div className="flex-1 overflow-y-auto p-3">
        {tab === 'config' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-neutral">
              Select a node on the canvas to configure it.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-text-secondary">
                Node type
              </label>
              <Select
                options={NODE_TYPE_OPTIONS}
                value={nodeType}
                onChange={(e) => setNodeType(e.target.value)}
                size="sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-text-secondary">
                Label
              </label>
              <Input placeholder="Node label…" size="sm" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-text-secondary">
                System prompt
              </label>
              <Textarea
                placeholder="You are a content moderation assistant…"
                autoResize
                minRows={3}
                maxRows={8}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </div>
        )}

        {tab === 'runs' && (
          <div className="h-full">
            <PipelineEventLog compact />
          </div>
        )}
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────
// PipelineEditorDemo — root
// ─────────────────────────────────────────────────────────

export default function PipelineEditorDemo() {
  return (
    <SimulatedProvider timeline={pipelineExecutionTimeline} autoPlay>
      <AppShell
        header={
          <div className="h-[53px] flex items-center gap-3 px-4 border-b border-border bg-white">
            <button
              type="button"
              className="text-neutral hover:text-slate-800 text-base transition-colors"
              aria-label="Back"
            >
              ←
            </button>
            <span className="text-lg" aria-hidden="true">🛡</span>
            <PageHeader
              title="Content Moderation"
              badge={
                <div className="flex items-center gap-2">
                  <StatusPill state="success" label="Saved" size="sm" />
                  <StatusPill state="info" label="v3 · Published" size="sm" />
                  <StatusPill state="warning" label="10 warnings" size="sm" />
                </div>
              }
              actions={
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">Metrics</Button>
                  <Button variant="secondary" size="sm">Export</Button>
                  <Button variant="ghost" size="sm">Published</Button>
                  <Button variant="primary" size="sm">▶ Run</Button>
                  <Button variant="ghost" size="sm">⋯</Button>
                </div>
              }
            />
          </div>
        }
      >
        <div className="flex overflow-hidden h-[calc(100vh-53px)]">
          <NodePalette />
          <PipelineCanvas />
          <ConfigPanel />
        </div>
      </AppShell>
    </SimulatedProvider>
  );
}
