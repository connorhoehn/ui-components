import type { CSSProperties } from 'react';
import { StatusDot } from '@connorhoehnslalom/ui-components/shared';
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
        <span className="absolute top-[-4px] left-[-4px] w-[10px] h-[10px] rounded-full bg-[#ef4444] border-1 border-surface z-[1]"
        />
      )}
      <div style={headerStyle}>
        <span className="text-[14px] leading-[1] shrink-0">{icon}</span>
        <span className="flex-[1] min-w-0 text-[12px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {subtitle}
        </span>
        <StatusDot
          size="sm"
          color={pausedAtBreakpoint ? '#d97706' : tokens.dot}
        />
      </div>
      {body && (
        <div className="py-2 px-[10px] text-[12px] leading-[1.4] text-text-secondary">
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
  const BOX_CLS =
    'flex items-center justify-center py-[10px] px-[18px] rounded-lg ' +
    'font-semibold text-[13px] font-[inherit] whitespace-nowrap';
  return (
    <div className="flex items-center gap-0 flex-wrap justify-center">
      <div className="flex flex-col gap-2 items-center">
        <div className={`${BOX_CLS} bg-info-bg border-2 border-info text-[#1e40af]`}>
          PipelineCanvas
        </div>
        <div className="text-[11px] text-[#64748b]">React Flow wrapper</div>
      </div>
      <svg className="shrink-0" width="48" height="24">
        <path d="M4 12 H38 M34 7 L40 12 L34 17" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
      <div className="flex flex-col gap-2">
        <div className={`${BOX_CLS} bg-success-bg border-[1.5px] border-success text-[#166534]`}>
          BaseNode
        </div>
        <div className={`${BOX_CLS} bg-[#fef3c7] border-[1.5px] border-[#f59e0b] text-[#92400e]`}>
          AnimatedEdge
        </div>
      </div>
      <div className="flex flex-col gap-4 ml-8">
        <div className="flex items-center gap-2">
          <div className={`${BOX_CLS} bg-surface-hover border-[1.5px] border-[#64748b] text-[#334155]`}>
            NodePalette
          </div>
          <span className="text-[11px] text-[#64748b]">drag to canvas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`${BOX_CLS} bg-surface-hover border-[1.5px] border-[#64748b] text-[#334155]`}>
            CanvasToolbar
          </div>
          <span className="text-[11px] text-[#64748b]">canvas actions</span>
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
    <svg className="max-w-160" width="100%" height="200" viewBox="0 0 640 200">
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
      <text className="text-[10px] font-semibold fill-text-secondary font-[inherit]" x="463" y="82" textAnchor="middle">true</text>
      <path d="M490 78 C530 78, 520 78, 560 78" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4" />

      <rect x="440" y="108" width="46" height="20" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text className="text-[10px] font-semibold fill-text-secondary font-[inherit]" x="463" y="122" textAnchor="middle">false</text>
      <path d="M490 118 C530 118, 520 118, 560 118" fill="none" stroke="#dc2626" strokeWidth="2" />

      <text className="text-[11px] fill-[#64748b] font-[inherit]" x="440" y="50">Branch labels:</text>
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
    <div className="relative w-full h-90 overflow-hidden">
      {/* SVG connections */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none"
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
      <div className="absolute left-130 top-32 py-[2px] px-2 rounded-[999px] text-[10px] font-semibold bg-surface text-text-secondary border border-border shadow-[0_1px_2px_rgba(15,_23,_42,_0.06)]"
      >
        true
      </div>
      <div className="absolute left-130 top-[218px] py-[2px] px-2 rounded-[999px] text-[10px] font-semibold bg-surface text-text-secondary border border-border shadow-[0_1px_2px_rgba(15,_23,_42,_0.06)]"
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
    <div className="w-55 border border-border rounded-lg bg-white font-[inherit] overflow-hidden"
    >
      <div className="py-[10px] px-3 border-b border-border">
        <input className="w-full box-border border border-border-field rounded-md py-[6px] px-[10px] text-[13px] font-[inherit] bg-[#f9fafb] text-text-primary"
          readOnly
          placeholder="Search nodes..."
        />
      </div>
      <div className="py-2 px-0">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="pt-2 px-[14px] pb-1 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary"
            >
              {cat.name}
            </div>
            {cat.items.map((item) => (
              <div className="h-11 my-[2px] mx-2 py-[6px] px-[10px] flex items-center gap-[10px] rounded-md cursor-grab"
                key={item.label}
              >
                <span className="text-[18px] w-[22px] text-center shrink-0">
                  {item.icon}
                </span>
                <div className="flex-[1] min-w-0">
                  <div className="text-[13px] font-semibold text-text-primary">{item.label}</div>
                  <div className="text-[11px] text-[#64748b]">{item.desc}</div>
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
    <div className="flex gap-[6px] items-center">
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
      <span className="text-[12px] text-text-tertiary ml-2">Auto-arrange | Fit view</span>
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
        importPath="import { BaseNode, AnimatedEdge, NodePalette, PipelineCanvas } from '@connorhoehnslalom/ui-components/pipelines'"
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
import { BaseNode, AnimatedEdge, NodePalette, PipelineCanvas } from '@connorhoehnslalom/ui-components/pipelines';`}
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
        code={`import { BaseNode } from '@connorhoehnslalom/ui-components/pipelines';

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
        <div className="flex flex-wrap gap-4 items-start">
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
          <div className="flex flex-wrap gap-4 items-start mb-6">
            <div className="text-center">
              <MiniNode icon="⬜" subtitle="Idle" state="idle" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">gray, 1px solid</div>
            </div>
            <div className="text-center">
              <MiniNode icon="⏳" subtitle="Pending" state="pending" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">blue, 1px dashed</div>
            </div>
            <div className="text-center">
              <MiniNode icon="▶" subtitle="Running" state="running" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">blue, 2px solid</div>
            </div>
            <div className="text-center">
              <MiniNode icon="⏸" subtitle="Awaiting" state="awaiting" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">amber, 2px solid</div>
            </div>
            <div className="text-center">
              <MiniNode icon="✓" subtitle="Completed" state="completed" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">green, 1px solid</div>
            </div>
            <div className="text-center">
              <MiniNode icon="✗" subtitle="Failed" state="failed" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">red, 2px solid</div>
            </div>
            <div className="text-center">
              <MiniNode icon="⤳" subtitle="Skipped" state="skipped" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">gray, dashed, 50%</div>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <div className="text-[13px] font-semibold text-[#334155] mb-3">Breakpoint variants</div>
            <div className="flex gap-4 items-start">
              <div className="text-center">
                <MiniNode icon="🎯" subtitle="With Breakpoint" state="idle" hasBreakpoint />
                <div className="text-[11px] text-[#64748b] mt-[6px]">hasBreakpoint (red dot)</div>
              </div>
              <div className="text-center">
                <MiniNode icon="🎯" subtitle="Paused at BP" state="running" pausedAtBreakpoint hasBreakpoint />
                <div className="text-[11px] text-[#64748b] mt-[6px]">pausedAtBreakpoint (amber glow)</div>
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
        code={`import { BaseNode } from '@connorhoehnslalom/ui-components/pipelines';
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
        <div className="flex flex-wrap gap-5 items-start">
          <div className="text-center">
            <MiniNode
              icon={'λ'}
              subtitle="processOrder"
              state="completed"
              body="Runtime: Node.js 20 | Memory: 512MB"
            />
            <div className="text-[11px] text-[#64748b] mt-[6px]">Lambda Node</div>
          </div>
          <div className="text-center">
            <MiniNode
              icon={'↗'}
              subtitle="HTTP Request"
              state="running"
              body="POST api.stripe.com/charges"
            />
            <div className="text-[11px] text-[#64748b] mt-[6px]">HTTP Request Node</div>
          </div>
          <div className="text-center">
            <MiniNode
              icon={'🔀'}
              subtitle="Payment Valid?"
              state="awaiting"
              body="amount > 0 && !expired"
            />
            <div className="text-[11px] text-[#64748b] mt-[6px]">Decision Node</div>
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
        code={`import { AnimatedEdge } from '@connorhoehnslalom/ui-components/pipelines';

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
        code={`import { NodePalette } from '@connorhoehnslalom/ui-components/pipelines';

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
        code={`import { CanvasToolbar } from '@connorhoehnslalom/ui-components/pipelines';
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
          <div className="mt-3 text-[12px] text-[#64748b]">
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
} from '@connorhoehnslalom/ui-components/pipelines';

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
        code={`import { BaseNode } from '@connorhoehnslalom/ui-components/pipelines';
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
          <div className="flex flex-wrap gap-4 items-start">
            <div className="text-center">
              <MiniNode icon={'⚙'} subtitle="ProcessPayment" state="completed" body="arn:aws:lambda:..." />
              <div className="text-[11px] text-[#64748b] mt-[6px]">Task</div>
            </div>
            <div className="text-center">
              <MiniNode icon={'🔀'} subtitle="IsAmountValid?" state="running" body="3 branches" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">Choice</div>
            </div>
            <div className="text-center">
              <MiniNode icon={'≡'} subtitle="FanOutWorkers" state="pending" body="4 parallel branches" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">Parallel</div>
            </div>
            <div className="text-center">
              <MiniNode icon={'⏱'} subtitle="CooldownPeriod" state="awaiting" body="Wait: 30s" />
              <div className="text-[11px] text-[#64748b] mt-[6px]">Wait</div>
            </div>
          </div>
          <div className="mt-4 py-3 px-[14px] bg-surface-hover rounded-md text-[12px] text-text-secondary leading-[1.5]">
            Each Step Functions state type maps naturally to a BaseNode wrapper. The execution state
            (idle/pending/running/completed/failed) can be driven by CloudWatch Events or the
            Step Functions execution history API, giving you a live visualization of running state machines.
          </div>
        </div>
      </ExampleBlock>

      {/* ----------------------------------------------------------------- */}
      {/* PROPS REFERENCE */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-10" id="props">
        <h3 className="text-[18px] font-semibold mt-0 mr-0 mb-6 ml-0 text-text-primary">
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
