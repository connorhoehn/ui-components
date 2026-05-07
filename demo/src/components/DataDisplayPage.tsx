import { ExampleBlock, PropsTable, PageHeader, useRegisterToc } from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'chip-basic', label: 'Chip', level: 2 },
  { id: 'chip-sizes', label: 'Chip Sizes', level: 3 },
  { id: 'chip-count', label: 'Count Badge', level: 3 },
  { id: 'sparkline', label: 'Sparkline', level: 2 },
  { id: 'skeleton', label: 'SkeletonCard', level: 2 },
  { id: 'empty-state', label: 'EmptyState', level: 2 },
  { id: 'event-row', label: 'EventRow', level: 2 },
  { id: 'props', label: 'API Reference', level: 2 },
];

// --- Inline chip rendering helpers ---

const chipColors = {
  blue:   { soft: { bg: 'rgba(37,99,235,0.1)', text: '#2563eb' }, solid: { bg: '#2563eb', text: '#fff' } },
  green:  { soft: { bg: 'rgba(22,163,74,0.1)', text: '#16a34a' }, solid: { bg: '#16a34a', text: '#fff' } },
  amber:  { soft: { bg: 'rgba(217,119,6,0.1)', text: '#d97706' }, solid: { bg: '#d97706', text: '#fff' } },
  red:    { soft: { bg: 'rgba(220,38,38,0.1)', text: '#dc2626' }, solid: { bg: '#dc2626', text: '#fff' } },
  purple: { soft: { bg: 'rgba(147,51,234,0.1)', text: '#9333ea' }, solid: { bg: '#9333ea', text: '#fff' } },
  gray:   { soft: { bg: 'rgba(100,116,139,0.1)', text: '#64748b' }, solid: { bg: '#64748b', text: '#fff' } },
};

type ChipColor = keyof typeof chipColors;

function DemoChip({
  color,
  variant = 'soft',
  size = 'sm',
  mono = false,
  children,
}: {
  color: ChipColor;
  variant?: 'soft' | 'solid';
  size?: 'sm' | 'xs';
  mono?: boolean;
  children: React.ReactNode;
}) {
  const palette = chipColors[color][variant];
  const sizeStyle = size === 'xs'
    ? { padding: '1px 6px', fontSize: 10 }
    : { padding: '4px 10px', fontSize: 12 };
  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: 12,
        fontWeight: 600,
        fontFamily: mono ? 'monospace' : 'inherit',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        background: palette.bg,
        color: palette.text,
        ...sizeStyle,
      }}
    >
      {children}
    </span>
  );
}

// --- Sparkline SVG helper ---

function DemoSparkline({
  data,
  width = 80,
  height = 24,
  color = '#2563eb',
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;

  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <polyline fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

// --- Skeleton pulse animation ---

const pulseKeyframes = `
@keyframes demo-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;

function SkeletonRect({ width, height, borderRadius = 6 }: { width: number | string; height: number; borderRadius?: number }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: '#e2e8f0',
        animation: 'demo-pulse 1.8s ease-in-out infinite',
      }}
    />
  );
}

export default function DataDisplayPage() {
  useRegisterToc(tocItems);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <style>{pulseKeyframes}</style>

      <PageHeader
        title="Data Display"
        description="Components for visualizing data, status, and state. Includes semantic chips/badges, inline sparkline charts, loading skeletons, empty-state placeholders, and activity event rows."
        importPath="import { Chip, Sparkline, SkeletonCard, EmptyState, EventRow } from '@your-org/ui-components'"
      />

      {/* ------------------------------------------------------------------ */}
      {/*  CHIP BASIC                                                        */}
      {/* ------------------------------------------------------------------ */}

      <ExampleBlock
        id="chip-basic"
        title="Chip"
        description="Colored pill badges for labeling status, categories, or metadata. Available in soft (tinted background with colored text) and solid (filled background with white text) variants."
        code={`import { Chip } from '@your-org/ui-components';

// Soft variant (default) — light tinted background
<Chip tone="info">Active</Chip>
<Chip tone="success">Healthy</Chip>
<Chip tone="warning">Degraded</Chip>
<Chip tone="danger">Critical</Chip>
<Chip tone="purple">Beta</Chip>
<Chip tone="neutral">Archived</Chip>

// Solid variant — filled background, white text
<Chip tone="info" solid>Active</Chip>
<Chip tone="success" solid>Healthy</Chip>
<Chip tone="danger" solid>Critical</Chip>`}
      >
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              Soft (default)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <DemoChip color="blue">Active</DemoChip>
              <DemoChip color="green">Healthy</DemoChip>
              <DemoChip color="amber">Degraded</DemoChip>
              <DemoChip color="red">Critical</DemoChip>
              <DemoChip color="purple">Beta</DemoChip>
              <DemoChip color="gray">Archived</DemoChip>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              Solid
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <DemoChip color="blue" variant="solid">Active</DemoChip>
              <DemoChip color="green" variant="solid">Healthy</DemoChip>
              <DemoChip color="amber" variant="solid">Degraded</DemoChip>
              <DemoChip color="red" variant="solid">Critical</DemoChip>
              <DemoChip color="purple" variant="solid">Beta</DemoChip>
              <DemoChip color="gray" variant="solid">Archived</DemoChip>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  CHIP SIZES                                                        */}
      {/* ------------------------------------------------------------------ */}

      <ExampleBlock
        id="chip-sizes"
        title="Chip Sizes"
        description="Chips come in two sizes: sm (default, 12px font) and xs (10px font) for compact UIs like tables or dense lists."
        code={`// sm (default)
<Chip tone="info" size="sm">Default size</Chip>

// xs — compact
<Chip tone="info" size="xs">Extra small</Chip>
<Chip tone="success" size="xs">Deployed</Chip>`}
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>sm (default)</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <DemoChip color="blue" size="sm">Default size</DemoChip>
              <DemoChip color="green" size="sm">Success</DemoChip>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>xs</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <DemoChip color="blue" size="xs">Extra small</DemoChip>
              <DemoChip color="green" size="xs">Deployed</DemoChip>
              <DemoChip color="red" size="xs">Failed</DemoChip>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  CHIP COUNT                                                        */}
      {/* ------------------------------------------------------------------ */}

      <ExampleBlock
        id="chip-count"
        title="Count Badge"
        description="Use the mono prop to render numeric badges with a monospace font, ideal for notification counters, unread counts, or numeric indicators."
        code={`// Count badges with monospace font
<Chip tone="info" mono>42</Chip>
<Chip tone="danger" mono solid>3</Chip>
<Chip tone="success" mono>128</Chip>
<Chip tone="purple" mono solid>99+</Chip>`}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <DemoChip color="blue" mono>42</DemoChip>
          <DemoChip color="red" variant="solid" mono>3</DemoChip>
          <DemoChip color="green" mono>128</DemoChip>
          <DemoChip color="purple" variant="solid" mono>99+</DemoChip>
          <DemoChip color="amber" mono>7</DemoChip>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  SPARKLINE                                                         */}
      {/* ------------------------------------------------------------------ */}

      <ExampleBlock
        id="sparkline"
        title="Sparkline"
        description="Minimal inline SVG sparklines for embedding micro-charts in tables, cards, or dashboards. Zero dependencies, renders as a single SVG polyline."
        code={`import { Sparkline } from '@your-org/ui-components';

// Upward trend (green)
<Sparkline data={[4, 6, 5, 8, 7, 12, 11, 15]} width={80} height={24} color="#16a34a" />

// Downward trend (red)
<Sparkline data={[18, 16, 14, 12, 10, 9, 7, 5]} width={80} height={24} color="#dc2626" />

// Flat/stable (gray)
<Sparkline data={[10, 11, 10, 10, 11, 10, 10, 11]} width={80} height={24} color="#64748b" />`}
      >
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>Upward trend</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', display: 'inline-block' }}>
              <DemoSparkline data={[4, 6, 5, 8, 7, 12, 11, 15, 14, 18]} width={80} height={24} color="#16a34a" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>Downward trend</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', display: 'inline-block' }}>
              <DemoSparkline data={[18, 16, 17, 14, 12, 13, 10, 9, 7, 5]} width={80} height={24} color="#dc2626" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>Flat / stable</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', display: 'inline-block' }}>
              <DemoSparkline data={[10, 11, 10, 10, 11, 10, 11, 10, 10, 11]} width={80} height={24} color="#64748b" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>Volatile (purple, wider)</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, padding: '8px 12px', display: 'inline-block' }}>
              <DemoSparkline data={[3, 14, 8, 18, 5, 16, 2, 19, 7, 15, 4, 17]} width={120} height={24} color="#9333ea" />
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  SKELETON                                                          */}
      {/* ------------------------------------------------------------------ */}

      <ExampleBlock
        id="skeleton"
        title="SkeletonCard"
        description="Animated loading placeholders that provide visual feedback while content is being fetched. The pulsing animation communicates that the UI is not frozen."
        code={`import { SkeletonCard } from '@your-org/ui-components';

// Full-width skeleton (default)
<SkeletonCard height={64} />

// Custom width (for partial-width placeholders)
<SkeletonCard height={40} width="80%" />
<SkeletonCard height={24} width="60%" />

// Composing a card skeleton
<div style={{ display: 'flex', gap: 12 }}>
  <SkeletonCard height={48} width={48} />   {/* Avatar */}
  <div>
    <SkeletonCard height={16} width={140} /> {/* Name */}
    <SkeletonCard height={12} width={200} /> {/* Description */}
  </div>
</div>`}
      >
        <div style={{ maxWidth: 420 }}>
          {/* Card-style skeleton */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <SkeletonRect width={44} height={44} borderRadius={22} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
                <SkeletonRect width="60%" height={14} />
                <SkeletonRect width="40%" height={10} />
              </div>
            </div>
            <SkeletonRect width="100%" height={12} />
            <div style={{ marginTop: 8 }} />
            <SkeletonRect width="90%" height={12} />
            <div style={{ marginTop: 8 }} />
            <SkeletonRect width="70%" height={12} />
          </div>
          {/* Row skeletons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <SkeletonRect width={100} height={80} borderRadius={8} />
            <SkeletonRect width={100} height={80} borderRadius={8} />
            <SkeletonRect width={100} height={80} borderRadius={8} />
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  EMPTY STATE                                                       */}
      {/* ------------------------------------------------------------------ */}

      <ExampleBlock
        id="empty-state"
        title="EmptyState"
        description="Centered placeholder shown when a list or view has no content. Includes an icon area, heading, descriptive text, and an optional call-to-action button."
        code={`import { EmptyState } from '@your-org/ui-components';

// Basic empty state
<EmptyState
  icon="📋"
  title="No items yet"
  body="Create your first item to get started."
/>

// With action button
<EmptyState
  icon="🔍"
  title="No results found"
  body="Try adjusting your search or filter criteria."
  actionLabel="Clear filters"
  onAction={() => clearFilters()}
/>`}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {/* Empty state with action */}
          <div style={{ flex: '1 1 260px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 12 }}>
                📋
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#334155', marginBottom: 4 }}>No items yet</div>
              <div style={{ fontSize: 13, color: '#94a3b8', maxWidth: 240, lineHeight: 1.5, marginBottom: 14 }}>
                Create your first item to get started with your project.
              </div>
              <button style={{ padding: '8px 18px', fontSize: 13, fontWeight: 600, background: '#646cff', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                Create Item
              </button>
            </div>
          </div>
          {/* Empty state without action */}
          <div style={{ flex: '1 1 260px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, padding: 24, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 12 }}>
                🔍
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#334155', marginBottom: 4 }}>No results found</div>
              <div style={{ fontSize: 13, color: '#94a3b8', maxWidth: 240, lineHeight: 1.5 }}>
                Try adjusting your search or filter criteria to find what you need.
              </div>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  EVENT ROW                                                         */}
      {/* ------------------------------------------------------------------ */}

      <ExampleBlock
        id="event-row"
        title="EventRow"
        description="Dense list items for activity feeds and event logs. Each row displays a severity indicator (colored dot), a timestamp, an event type label, and a summary description."
        code={`import { EventRow } from '@your-org/ui-components';

<EventRow
  timestamp="09:14:22"
  type="pipeline.run.started"
  summary="ETL pipeline began execution"
  severity="info"
/>

<EventRow
  timestamp="09:14:35"
  type="pipeline.run.failed"
  summary="Transform step threw NullPointerException"
  severity="error"
  selected
  onClick={() => showDetail(event)}
/>`}
      >
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
          {[
            { severity: 'info', color: '#64748b', ts: '09:14:22', type: 'pipeline.run.started', summary: 'ETL pipeline began execution' },
            { severity: 'success', color: '#16a34a', ts: '09:14:28', type: 'pipeline.step.completed', summary: 'Extract step finished (240 records)' },
            { severity: 'error', color: '#dc2626', ts: '09:14:35', type: 'pipeline.run.failed', summary: 'Transform step threw NullPointerException' },
            { severity: 'warning', color: '#d97706', ts: '09:15:01', type: 'pipeline.approval.requested', summary: 'Manual retry requires approval' },
            { severity: 'success', color: '#16a34a', ts: '09:15:12', type: 'pipeline.run.completed', summary: 'Pipeline completed after retry' },
          ].map((event, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                borderBottom: idx < 4 ? '1px solid #f1f5f9' : 'none',
                background: idx === 2 ? '#fef2f2' : 'transparent',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 4, background: event.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', width: 64, flexShrink: 0 }}>{event.ts}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: event.color, flexShrink: 0, minWidth: 180 }}>{event.type}</span>
              <span style={{ fontSize: 13, color: '#334155', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.summary}</span>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  PROPS TABLE                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div id="props" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>API Reference</h2>

        <PropsTable
          componentName="Chip"
          props={[
            { name: 'tone', type: "'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'caution' | 'purple'", default: "'neutral'", description: 'Semantic color of the chip' },
            { name: 'size', type: "'sm' | 'xs'", default: "'sm'", description: 'Size variant. xs is more compact for dense UIs.' },
            { name: 'solid', type: 'boolean', default: 'false', description: 'Solid fill (dark bg + white text) instead of soft tint.' },
            { name: 'mono', type: 'boolean', default: 'false', description: 'Use monospace font. Ideal for numeric count badges.' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Content rendered inside the chip.' },
            { name: 'title', type: 'string', description: 'Native HTML tooltip shown on hover.' },
            { name: 'style', type: 'CSSProperties', description: 'Override or extend the chip styles.' },
          ]}
        />

        <PropsTable
          componentName="Sparkline"
          props={[
            { name: 'data', type: 'number[]', required: true, description: 'Array of numeric data points to plot.' },
            { name: 'width', type: 'number', default: '80', description: 'Width of the SVG element in pixels.' },
            { name: 'height', type: 'number', default: '20', description: 'Height of the SVG element in pixels.' },
            { name: 'color', type: 'string', default: "'#646cff'", description: 'Stroke color of the polyline.' },
          ]}
        />

        <PropsTable
          componentName="SkeletonCard"
          props={[
            { name: 'width', type: 'number | string', default: "'100%'", description: 'Width of the skeleton placeholder.' },
            { name: 'height', type: 'number | string', default: '64', description: 'Height of the skeleton placeholder.' },
          ]}
        />

        <PropsTable
          componentName="EmptyState"
          props={[
            { name: 'icon', type: 'string', description: 'Emoji or character displayed as a large icon above the title.' },
            { name: 'title', type: 'string', required: true, description: 'Heading text describing the empty state.' },
            { name: 'body', type: 'string', description: 'Descriptive text below the heading, max-width 340px.' },
            { name: 'actionLabel', type: 'string', description: 'Label for the optional CTA button.' },
            { name: 'onAction', type: '() => void', description: 'Click handler for the action button. Button only renders when both actionLabel and onAction are provided.' },
            { name: 'testId', type: 'string', default: "'empty-state'", description: 'data-testid for the container element.' },
            { name: 'actionTestId', type: 'string', default: "'empty-state-action'", description: 'data-testid for the action button element.' },
          ]}
        />
      </div>
    </div>
  );
}
