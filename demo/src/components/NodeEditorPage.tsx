import type { CSSProperties } from 'react';
import { ExampleBlock, PropsTable, PageHeader, useRegisterToc } from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'overview', label: 'Overview', level: 2 },
  { id: 'base-node', label: 'BaseNode', level: 2 },
  { id: 'node-states', label: 'Execution States', level: 2 },
  { id: 'custom-nodes', label: 'Creating Custom Nodes', level: 2 },
  { id: 'animated-edge', label: 'AnimatedEdge', level: 2 },
  { id: 'node-palette', label: 'NodePalette', level: 2 },
  { id: 'canvas-toolbar', label: 'CanvasToolbar', level: 2 },
  { id: 'full-example', label: 'Complete Example', level: 2 },
  { id: 'step-functions', label: 'Use Case: Step Functions', level: 2 },
  { id: 'props', label: 'Props Reference', level: 2 },
];

// ---------------------------------------------------------------------------
// Shared styles for node previews
// ---------------------------------------------------------------------------

type StateKey = 'idle' | 'pending' | 'running' | 'awaiting' | 'completed' | 'failed' | 'skipped';

interface StateToken {
  border: string;
  background: string;
  opacity: number;
  dot: string;
}

const STATE_TOKENS: Record<StateKey, StateToken> = {
  idle:      { border: '1px solid #94a3b8', background: '#ffffff', opacity: 1, dot: '#94a3b8' },
  pending:   { border: '1px dashed #2563eb', background: '#eff6ff', opacity: 1, dot: '#2563eb' },
  running:   { border: '2px solid #2563eb', background: '#eff6ff', opacity: 1, dot: '#2563eb' },
  awaiting:  { border: '2px solid #f59e0b', background: '#fffbeb', opacity: 1, dot: '#f59e0b' },
  completed: { border: '1px solid #16a34a', background: '#f0fdf4', opacity: 1, dot: '#16a34a' },
  failed:    { border: '2px solid #dc2626', background: '#fef2f2', opacity: 1, dot: '#dc2626' },
  skipped:   { border: '1px dashed #94a3b8', background: '#f9fafb', opacity: 0.5, dot: '#94a3b8' },
};

function MiniNode({
  icon,
  subtitle,
  state,
  body,
  hasBreakpoint,
  pausedAtBreakpoint,
}: {
  icon: string;
  subtitle: string;
  state: StateKey;
  body?: string;
  hasBreakpoint?: boolean;
  pausedAtBreakpoint?: boolean;
}) {
  const tokens = STATE_TOKENS[state];
  const cardStyle: CSSProperties = {
    width: 200,
    borderRadius: 8,
    border: pausedAtBreakpoint ? '2px solid #d97706' : tokens.border,
    background: pausedAtBreakpoint ? '#fffbeb' : tokens.background,
    opacity: tokens.opacity,
    boxShadow: pausedAtBreakpoint
      ? '0 0 0 3px rgba(217, 119, 6, 0.25), 0 1px 2px rgba(15, 23, 42, 0.06)'
      : '0 1px 2px rgba(15, 23, 42, 0.06)',
    position: 'relative',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };
  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: 28,
    padding: '0 10px',
    borderBottom: body ? '1px solid #e2e8f0' : 'none',
  };
  return (
    <div style={cardStyle}>
      {hasBreakpoint && (
        <span
          style={{
            position: 'absolute',
            top: -4,
            left: -4,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#ef4444',
            border: '1.5px solid #ffffff',
            zIndex: 1,
          }}
        />
      )}
      <div style={headerStyle}>
        <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: 12,
            fontWeight: 600,
            color: '#0f172a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {subtitle}
        </span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: pausedAtBreakpoint ? '#d97706' : tokens.dot,
            flexShrink: 0,
          }}
        />
      </div>
      {body && (
        <div style={{ padding: '8px 10px', fontSize: 12, lineHeight: 1.4, color: '#475569' }}>
          {body}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Architecture diagram
// ---------------------------------------------------------------------------

function ArchitectureDiagram() {
  const boxStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 18px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ ...boxStyle, background: '#eff6ff', border: '2px solid #2563eb', color: '#1e40af' }}>
          PipelineCanvas
        </div>
        <div style={{ fontSize: 11, color: '#64748b' }}>React Flow wrapper</div>
      </div>
      <svg width="48" height="24" style={{ flexShrink: 0 }}>
        <path d="M4 12 H38 M34 7 L40 12 L34 17" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ ...boxStyle, background: '#f0fdf4', border: '1.5px solid #16a34a', color: '#166534' }}>
          BaseNode
        </div>
        <div style={{ ...boxStyle, background: '#fef3c7', border: '1.5px solid #f59e0b', color: '#92400e' }}>
          AnimatedEdge
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginLeft: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ ...boxStyle, background: '#f1f5f9', border: '1.5px solid #64748b', color: '#334155' }}>
            NodePalette
          </div>
          <span style={{ fontSize: 11, color: '#64748b' }}>drag to canvas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ ...boxStyle, background: '#f1f5f9', border: '1.5px solid #64748b', color: '#334155' }}>
            CanvasToolbar
          </div>
          <span style={{ fontSize: 11, color: '#64748b' }}>canvas actions</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Edge preview (SVG)
// ---------------------------------------------------------------------------

function EdgePreview() {
  const labelStyle: CSSProperties = {
    fontSize: 11,
    fontFamily: 'inherit',
    fill: '#475569',
  };
  return (
    <svg width="100%" height="200" viewBox="0 0 640 200" style={{ maxWidth: 640 }}>
      {/* Default edge */}
      <path d="M40 40 C120 40, 100 40, 140 40" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="160" y="44" style={labelStyle}>default (gray, 1.5px)</text>

      {/* Active edge */}
      <path d="M40 80 C120 80, 100 80, 140 80" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
      </path>
      <text x="160" y="84" style={labelStyle}>active (blue, dashed, animated)</text>

      {/* Traversed-success */}
      <path d="M40 120 C120 120, 100 120, 140 120" fill="none" stroke="#16a34a" strokeWidth="2" />
      <text x="160" y="124" style={labelStyle}>traversed-success (green, 2px)</text>

      {/* Traversed-failure */}
      <path d="M40 160 C120 160, 100 160, 140 160" fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x="160" y="164" style={labelStyle}>traversed-failure (red, 2px)</text>

      {/* Branch label example */}
      <rect x="440" y="68" width="46" height="20" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="463" y="82" textAnchor="middle" style={{ fontSize: 10, fontWeight: 600, fill: '#475569', fontFamily: 'inherit' }}>true</text>
      <path d="M490 78 C530 78, 520 78, 560 78" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />

      <rect x="440" y="108" width="46" height="20" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="463" y="122" textAnchor="middle" style={{ fontSize: 10, fontWeight: 600, fill: '#475569', fontFamily: 'inherit' }}>false</text>
      <path d="M490 118 C530 118, 520 118, 560 118" fill="none" stroke="#dc2626" strokeWidth="2" />

      <text x="440" y="50" style={{ fontSize: 11, fill: '#64748b', fontFamily: 'inherit' }}>Branch labels:</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Mini graph (for full example)
// ---------------------------------------------------------------------------

function MiniGraph() {
  const nodeStyle = (x: number, y: number, state: StateKey): CSSProperties => ({
    position: 'absolute',
    left: x,
    top: y,
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: 360, overflow: 'hidden' }}>
      {/* SVG connections */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        {/* Order Received -> Validate Payment */}
        <path d="M 140 34 C 180 34, 200 94, 240 94" fill="none" stroke="#16a34a" strokeWidth="2" />
        {/* Validate Payment -> Condition */}
        <path d="M 340 94 C 380 94, 360 174, 400 174" fill="none" stroke="#16a34a" strokeWidth="2" />
        {/* Condition -> Ship Order (true) */}
        <path d="M 500 174 C 540 174, 520 94, 560 94" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
        </path>
        {/* Condition -> Cancel Order (false) */}
        <path d="M 500 174 C 540 174, 520 264, 560 264" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      </svg>

      {/* Nodes */}
      <div style={nodeStyle(20, 20, 'completed')}>
        <MiniNode icon="📥" subtitle="Order Received" state="completed" />
      </div>
      <div style={nodeStyle(220, 80, 'completed')}>
        <MiniNode icon="💳" subtitle="Validate Payment" state="completed" />
      </div>
      <div style={nodeStyle(380, 160, 'running')}>
        <MiniNode icon="🔀" subtitle="Condition: Paid?" state="running" />
      </div>
      <div style={nodeStyle(540, 80, 'pending')}>
        <MiniNode icon="📦" subtitle="Ship Order" state="pending" />
      </div>
      <div style={nodeStyle(540, 250, 'idle')}>
        <MiniNode icon="❌" subtitle="Cancel Order" state="idle" />
      </div>

      {/* Branch labels */}
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 128,
          padding: '2px 8px',
          borderRadius: 999,
          fontSize: 10,
          fontWeight: 600,
          background: '#ffffff',
          color: '#475569',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
        }}
      >
        true
      </div>
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 218,
          padding: '2px 8px',
          borderRadius: 999,
          fontSize: 10,
          fontWeight: 600,
          background: '#ffffff',
          color: '#475569',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
        }}
      >
        false
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Palette preview
// ---------------------------------------------------------------------------

function PalettePreview() {
  const categories = [
    {
      name: 'COMPUTE',
      items: [
        { icon: 'λ', label: 'Lambda', desc: 'Invoke a function' },
        { icon: '☁', label: 'Fargate', desc: 'Run container task' },
      ],
    },
    {
      name: 'FLOW',
      items: [
        { icon: '⚔', label: 'Choice', desc: 'Branch on condition' },
        { icon: '⏱', label: 'Wait', desc: 'Pause for duration' },
        { icon: '≡', label: 'Parallel', desc: 'Fan out branches' },
      ],
    },
    {
      name: 'DATA',
      items: [
        { icon: '🗃', label: 'DynamoDB', desc: 'Read/write items' },
        { icon: '✉', label: 'SQS', desc: 'Send to queue' },
      ],
    },
  ];

  return (
    <div
      style={{
        width: 220,
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        background: '#ffffff',
        fontFamily: 'inherit',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>
        <input
          readOnly
          placeholder="Search nodes..."
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            padding: '6px 10px',
            fontSize: 13,
            fontFamily: 'inherit',
            background: '#f9fafb',
            color: '#0f172a',
          }}
        />
      </div>
      <div style={{ padding: '8px 0' }}>
        {categories.map((cat) => (
          <div key={cat.name}>
            <div
              style={{
                padding: '8px 14px 4px',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: '#94a3b8',
              }}
            >
              {cat.name}
            </div>
            {cat.items.map((item) => (
              <div
                key={item.label}
                style={{
                  height: 44,
                  margin: '2px 8px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  borderRadius: 6,
                  cursor: 'grab',
                }}
              >
                <span style={{ fontSize: 18, width: 22, textAlign: 'center', flexShrink: 0 }}>
                  {item.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toolbar preview
// ---------------------------------------------------------------------------

function ToolbarPreview() {
  const btnStyle: CSSProperties = {
    width: 32,
    height: 32,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    color: '#64748b',
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'inherit',
    fontSize: 14,
  };
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <button type="button" style={btnStyle} title="Auto-arrange (Shift+A)">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h8M2 8h12M2 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <button type="button" style={btnStyle} title="Fit view">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 8 }}>Auto-arrange | Fit view</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function NodeEditorPage() {
  useRegisterToc(tocItems);

  return (
    <div>
      <PageHeader
        title="Node Editor"
        description="Composable building blocks for node-based workflow editors. Build visual graph UIs for pipelines, state machines, DAGs, or any directed workflow — powered by React Flow."
        importPath="import { BaseNode, AnimatedEdge, NodePalette, PipelineCanvas } from '@connorhoehn/ui-components/pipelines'"
      />

      {/* ----------------------------------------------------------------- */}
      {/* OVERVIEW */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="overview"
        title="Overview"
        description="The Node Editor is a toolkit, not a pre-built solution. It provides a set of composable primitives — nodes, edges, a palette, and toolbar — that you assemble to create domain-specific graph editors. Whether you're building a CI/CD pipeline builder, an AWS Step Functions visualizer, an Airflow DAG editor, or a state machine designer, these building blocks handle the visual layer while you control the data model."
        code={`// The toolkit is composed of four main pieces:
//
// 1. BaseNode — generic visual shell for any node
// 2. AnimatedEdge — state-aware edge with flow animation
// 3. NodePalette — draggable sidebar of available node types
// 4. PipelineCanvas — React Flow wrapper with built-in handlers
//
// You compose them to build your specific editor:
import { BaseNode, AnimatedEdge, NodePalette, PipelineCanvas } from '@connorhoehn/ui-components/pipelines';`}
      >
        <ArchitectureDiagram />
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* BASE NODE */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="base-node"
        title="BaseNode"
        description="The core node component. BaseNode is a state-agnostic visual shell — you pass an icon, subtitle, execution state, and optional body/footer content. It renders a rounded card with colored border, header row, and status indicator. Wrap it to create domain-specific node types for your workflow."
        code={`import { BaseNode } from '@connorhoehn/ui-components/pipelines';

// BaseNode is purely visual — pass icon, subtitle, and state:
<BaseNode icon="🔧" subtitle="Transform Data" state="running" />
<BaseNode icon="✅" subtitle="Approval Gate" state="awaiting" />
<BaseNode icon="🎯" subtitle="Deploy" state="completed" />

// Add body content for extra context:
<BaseNode
  icon="🧠"
  subtitle="Generate Summary"
  state="running"
  body={<span>Model: claude-opus-4 | Tokens: 1,204</span>}
/>`}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
          <MiniNode icon="⚡" subtitle="Trigger" state="idle" />
          <MiniNode icon="🔧" subtitle="Transform Data" state="pending" />
          <MiniNode icon="🧠" subtitle="Generate Summary" state="running" body="Model: claude-opus-4" />
          <MiniNode icon="✅" subtitle="Approval Gate" state="awaiting" />
          <MiniNode icon="🎯" subtitle="Deploy to Prod" state="completed" />
          <MiniNode icon="📡" subtitle="Send Webhook" state="failed" />
          <MiniNode icon="🔔" subtitle="Notify Team" state="skipped" />
        </div>
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* EXECUTION STATES */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="node-states"
        title="Execution States"
        description="Nodes support seven execution states, each with distinct border style, background tint, and status dot color. Additionally, breakpoints and paused-at-breakpoint variants provide debugging affordances."
        code={`type NodeExecutionState =
  | 'idle'       // gray 1px solid — not yet reached
  | 'pending'    // blue 1px dashed — queued, waiting to run
  | 'running'    // blue 2px solid — actively executing
  | 'awaiting'   // amber 2px solid — waiting for external input
  | 'completed'  // green 1px solid — finished successfully
  | 'failed'     // red 2px solid — threw an error
  | 'skipped';   // gray 1px dashed, 50% opacity — bypassed

// Breakpoint variants:
<BaseNode icon="🎯" subtitle="Deploy" state="idle" hasBreakpoint />
<BaseNode icon="🎯" subtitle="Deploy" state="running" pausedAtBreakpoint />`}
      >
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon="⬜" subtitle="Idle" state="idle" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>gray, 1px solid</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon="⏳" subtitle="Pending" state="pending" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>blue, 1px dashed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon="▶" subtitle="Running" state="running" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>blue, 2px solid</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon="⏸" subtitle="Awaiting" state="awaiting" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>amber, 2px solid</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon="✓" subtitle="Completed" state="completed" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>green, 1px solid</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon="✗" subtitle="Failed" state="failed" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>red, 2px solid</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon="⤳" subtitle="Skipped" state="skipped" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>gray, dashed, 50%</div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 12 }}>Breakpoint variants</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ textAlign: 'center' }}>
                <MiniNode icon="🎯" subtitle="With Breakpoint" state="idle" hasBreakpoint />
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>hasBreakpoint (red dot)</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <MiniNode icon="🎯" subtitle="Paused at BP" state="running" pausedAtBreakpoint hasBreakpoint />
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>pausedAtBreakpoint (amber glow)</div>
              </div>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* CUSTOM NODES */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="custom-nodes"
        title="Creating Custom Nodes"
        description="BaseNode is designed to be wrapped. Create domain-specific node components by passing your own icon, subtitle, body, and state. The BaseNode handles all visual state transitions, accessibility, and selection highlighting — you just provide the content."
        code={`import { BaseNode } from '@connorhoehn/ui-components/pipelines';
import { Handle, Position } from '@xyflow/react';

// Example 1: AWS Lambda node
function LambdaNode({ data }) {
  return (
    <BaseNode
      icon="λ"
      subtitle={data.functionName}
      state={data.executionState}
      body={
        <div>
          <div>Runtime: {data.runtime}</div>
          <div>Memory: {data.memoryMB}MB</div>
        </div>
      }
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  );
}

// Example 2: HTTP Request node
function HttpRequestNode({ data }) {
  return (
    <BaseNode
      icon="↗"
      subtitle="HTTP Request"
      state={data.executionState}
      body={
        <div>
          <strong>{data.method}</strong> {data.url}
        </div>
      }
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  );
}

// Example 3: Decision node
function DecisionNode({ data }) {
  return (
    <BaseNode
      icon="🔀"
      subtitle={data.label || 'Decision'}
      state={data.executionState}
      body={<code>{data.condition}</code>}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="true" />
      <Handle type="source" position={Position.Right} id="false" />
    </BaseNode>
  );
}

// Register custom node types with React Flow:
const nodeTypes = {
  lambda: LambdaNode,
  httpRequest: HttpRequestNode,
  decision: DecisionNode,
};`}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <MiniNode
              icon={'λ'}
              subtitle="processOrder"
              state="completed"
              body="Runtime: Node.js 20 | Memory: 512MB"
            />
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Lambda Node</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <MiniNode
              icon={'↗'}
              subtitle="HTTP Request"
              state="running"
              body="POST api.stripe.com/charges"
            />
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>HTTP Request Node</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <MiniNode
              icon={'🔀'}
              subtitle="Payment Valid?"
              state="awaiting"
              body="amount > 0 && !expired"
            />
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Decision Node</div>
          </div>
        </div>
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* ANIMATED EDGE */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="animated-edge"
        title="AnimatedEdge"
        description="A custom React Flow edge supporting four visual states: default (gray), active (blue dashed with flow animation), traversed-success (green), and traversed-failure (red). Edges can also display branch labels rendered as small pills near the source handle."
        code={`import { AnimatedEdge } from '@connorhoehn/ui-components/pipelines';

// Register as the default edge type:
const edgeTypes = { default: AnimatedEdge };

// Edge data controls appearance:
const edges = [
  { id: 'e1', source: 'a', target: 'b', data: { state: 'default' } },
  { id: 'e2', source: 'b', target: 'c', data: { state: 'active' } },
  { id: 'e3', source: 'c', target: 'd', data: { state: 'traversed-success' } },
  { id: 'e4', source: 'c', target: 'e', data: { state: 'traversed-failure' } },
  // Branch labels appear as pills on the edge:
  { id: 'e5', source: 'f', target: 'g', data: { state: 'active', label: 'true' } },
  { id: 'e6', source: 'f', target: 'h', data: { state: 'default', label: 'false' } },
];`}
      >
        <EdgePreview />
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* NODE PALETTE */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="node-palette"
        title="NodePalette"
        description="A categorized, searchable sidebar of draggable node types. Users drag items from the palette onto the canvas. You can customize categories, items, and disable types that can only appear once (e.g., a trigger node). Keyboard shortcuts (1-8) allow quick insertion."
        code={`import { NodePalette } from '@connorhoehn/ui-components/pipelines';

// Basic usage with default categories:
<NodePalette />

// Disable types that are already placed:
<NodePalette disabledTypes={['trigger']} />

// The palette uses the 'application/reactflow' mime type
// for drag-and-drop. Your canvas onDrop handler reads:
const onDrop = (event) => {
  const data = JSON.parse(
    event.dataTransfer.getData('application/reactflow')
  );
  // data.nodeType => 'lambda' | 'httpRequest' | 'decision' | ...
  addNode(data.nodeType, screenToFlowPosition(event));
};`}
      >
        <PalettePreview />
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* CANVAS TOOLBAR */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="canvas-toolbar"
        title="CanvasToolbar"
        description="Floating toolbar buttons for canvas-level actions: auto-arrange (computes a DAG layout and repositions nodes) and fit-view (zooms to show all nodes). The toolbar connects to the canvas via React Flow's fitView and custom setPositions callbacks. Keyboard shortcut: Shift+A for auto-arrange."
        code={`import { CanvasToolbar } from '@connorhoehn/ui-components/pipelines';
import { useReactFlow } from '@xyflow/react';

function MyCanvas() {
  const { fitView } = useReactFlow();

  return (
    <div style={{ position: 'relative' }}>
      <ReactFlow nodes={nodes} edges={edges} ... />
      <CanvasToolbar
        definition={workflowDefinition}
        setPositions={handleSetPositions}
        fitView={fitView}
      />
    </div>
  );
}`}
      >
        <div>
          <ToolbarPreview />
          <div style={{ marginTop: 12, fontSize: 12, color: '#64748b' }}>
            The toolbar renders as absolutely-positioned buttons in the top-right corner of the canvas container.
            Auto-arrange uses a Dagre-based layout algorithm to compute optimal node positions for readability.
          </div>
        </div>
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* FULL EXAMPLE */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="full-example"
        title="Complete Example"
        description="A fully assembled node editor showing an Order Processing Workflow. This demonstrates BaseNode, AnimatedEdge, and branch labels working together. Each node's state reflects its execution progress."
        code={`import { ReactFlowProvider, ReactFlow } from '@xyflow/react';
import {
  BaseNode,
  AnimatedEdge,
  NodePalette,
  CanvasToolbar,
} from '@connorhoehn/ui-components/pipelines';

// 1. Define custom node types by wrapping BaseNode
const nodeTypes = {
  step: StepNode,
  decision: DecisionNode,
};
const edgeTypes = { default: AnimatedEdge };

// 2. Define your workflow graph
const initialNodes = [
  { id: '1', type: 'step', position: { x: 0, y: 100 },
    data: { icon: '📥', subtitle: 'Order Received', state: 'completed' } },
  { id: '2', type: 'step', position: { x: 250, y: 100 },
    data: { icon: '💳', subtitle: 'Validate Payment', state: 'completed' } },
  { id: '3', type: 'decision', position: { x: 500, y: 100 },
    data: { icon: '🔀', subtitle: 'Paid?', state: 'running' } },
  { id: '4', type: 'step', position: { x: 750, y: 40 },
    data: { icon: '📦', subtitle: 'Ship Order', state: 'pending' } },
  { id: '5', type: 'step', position: { x: 750, y: 180 },
    data: { icon: '❌', subtitle: 'Cancel Order', state: 'idle' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', data: { state: 'traversed-success' } },
  { id: 'e2-3', source: '2', target: '3', data: { state: 'traversed-success' } },
  { id: 'e3-4', source: '3', target: '4', data: { state: 'active', label: 'true' } },
  { id: 'e3-5', source: '3', target: '5', data: { state: 'default', label: 'false' } },
];

// 3. Compose the editor
function OrderWorkflowEditor() {
  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', height: 500 }}>
        <NodePalette />
        <div style={{ flex: 1, position: 'relative' }}>
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          />
          <CanvasToolbar
            definition={definition}
            setPositions={setPositions}
            fitView={fitView}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}`}
      >
        <MiniGraph />
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* STEP FUNCTIONS USE CASE */}
      {/* ----------------------------------------------------------------- */}
      <ExampleBlock
        id="step-functions"
        title="Use Case: Step Functions"
        description="These building blocks are well-suited for building an AWS Step Functions visualizer. Map Step Functions state types to custom node wrappers around BaseNode, then register them as React Flow node types."
        code={`import { BaseNode } from '@connorhoehn/ui-components/pipelines';
import { Handle, Position } from '@xyflow/react';

// Map Step Functions state types to custom nodes:

function TaskStateNode({ data }) {
  return (
    <BaseNode
      icon="⚙"
      subtitle={data.stateName}
      state={data.executionState}
      body={<div>Resource: {data.resource}</div>}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
}

function ChoiceStateNode({ data }) {
  return (
    <BaseNode
      icon="🔀"
      subtitle={data.stateName}
      state={data.executionState}
      body={<div>{data.choices.length} branches</div>}
    >
      <Handle type="target" position={Position.Top} />
      {data.choices.map((_, i) => (
        <Handle key={i} type="source" position={Position.Bottom} id={\`choice-\${i}\`} />
      ))}
    </BaseNode>
  );
}

function ParallelStateNode({ data }) {
  return (
    <BaseNode
      icon="≡"
      subtitle={data.stateName}
      state={data.executionState}
      body={<div>{data.branches.length} parallel branches</div>}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
}

function WaitStateNode({ data }) {
  return (
    <BaseNode
      icon="⏱"
      subtitle={data.stateName}
      state={data.executionState}
      body={<div>Wait: {data.seconds}s</div>}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
}

// Register all Step Functions node types:
const nodeTypes = {
  task: TaskStateNode,
  choice: ChoiceStateNode,
  parallel: ParallelStateNode,
  wait: WaitStateNode,
  succeed: SucceedStateNode,
  fail: FailStateNode,
};`}
      >
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon={'⚙'} subtitle="ProcessPayment" state="completed" body="arn:aws:lambda:..." />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Task</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon={'🔀'} subtitle="IsAmountValid?" state="running" body="3 branches" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Choice</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon={'≡'} subtitle="FanOutWorkers" state="pending" body="4 parallel branches" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Parallel</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MiniNode icon={'⏱'} subtitle="CooldownPeriod" state="awaiting" body="Wait: 30s" />
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Wait</div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: '12px 14px', background: '#f1f5f9', borderRadius: 6, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
            Each Step Functions state type maps naturally to a BaseNode wrapper. The execution state
            (idle/pending/running/completed/failed) can be driven by CloudWatch Events or the
            Step Functions execution history API, giving you a live visualization of running state machines.
          </div>
        </div>
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* PROPS REFERENCE */}
      {/* ----------------------------------------------------------------- */}
      <div id="props" style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 24px 0', color: '#0f172a' }}>
          Props Reference
        </h3>

        <PropsTable
          componentName="BaseNode"
          props={[
            { name: 'icon', type: 'string', required: true, description: 'Emoji or single character displayed in the node header.' },
            { name: 'subtitle', type: 'string', description: 'Label text displayed next to the icon in the header row.' },
            { name: 'state', type: 'NodeExecutionState', required: true, description: 'Execution state controlling border color, background tint, and status dot. One of: idle, pending, running, awaiting, completed, failed, skipped.' },
            { name: 'body', type: 'ReactNode', description: 'Optional content rendered below the header. Use for metadata, config previews, or status details.' },
            { name: 'footer', type: 'ReactNode', description: 'Optional footer slot rendered below body with a top border. Useful for expandable content or action buttons.' },
            { name: 'selected', type: 'boolean', default: 'false', description: 'When true, renders a blue selection ring around the card (typically driven by React Flow selection state).' },
            { name: 'onRetry', type: '() => void', description: 'When provided and state is "failed", renders a "Retry from here" pill button. Click event stops propagation.' },
            { name: 'hasBreakpoint', type: 'boolean', default: 'false', description: 'Shows a small red dot in the top-left corner indicating a breakpoint is set on this node.' },
            { name: 'pausedAtBreakpoint', type: 'boolean', default: 'false', description: 'Highlights the card with an amber border and glow, indicating execution is paused at this node.' },
            { name: 'ariaLabel', type: 'string', description: 'Custom accessible name. When omitted, synthesized from subtitle + state (e.g., "Transform Data, state: running").' },
            { name: 'children', type: 'ReactNode', description: 'Slot for React Flow Handle elements. Rendered at the bottom of the card.' },
          ]}
        />

        <PropsTable
          componentName="AnimatedEdge (data)"
          props={[
            { name: 'state', type: 'EdgeState', default: '"default"', description: 'Visual state of the edge. One of: default (gray), active (blue dashed animated), traversed-success (green), traversed-failure (red).' },
            { name: 'label', type: 'string', description: 'Optional branch label displayed as a pill near the source handle (e.g., "true", "false", "error").' },
          ]}
        />

        <PropsTable
          componentName="NodePalette"
          props={[
            { name: 'disabledTypes', type: 'NodeType[]', default: '[]', description: 'Array of node types that should appear greyed out and non-draggable (e.g., types that can only be placed once).' },
          ]}
        />

        <PropsTable
          componentName="CanvasToolbar"
          props={[
            { name: 'definition', type: 'PipelineDefinition | null', required: true, description: 'The current workflow/pipeline definition used by auto-arrange to compute the DAG layout.' },
            { name: 'setPositions', type: '(positions: Array<{id, position}>) => void', required: true, description: 'Callback to update node positions after auto-arrange computes the layout.' },
            { name: 'fitView', type: '(opts?: {padding?, duration?}) => void', required: true, description: 'React Flow fitView function. Called after auto-arrange and when the fit-view button is clicked.' },
          ]}
        />
      </div>
    </div>
  );
}
