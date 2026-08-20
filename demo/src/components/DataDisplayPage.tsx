import {
  Chip,
  SkeletonCard,
  Sparkline,
  StatusDot,
  toneVar,
  type Tone,
} from '@connorhoehnslalom/ui-components/shared';
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

// The chips, sparklines and skeletons on this page are the LIBRARY'S OWN.
// This page used to demo them with hand-rolled fakes — including a private
// hex palette that duplicated (and disagreed with) the tone scale, which is
// exactly the drift the tones rule exists to prevent. A showcase that renders
// a fake of the component it documents teaches the copy-paster the wrong
// thing twice.

export default function DataDisplayPage() {
  useRegisterToc(tocItems);

  return (
    <div className="max-w-240 mx-auto my-0">

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
          <div className="mb-4">
            <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.05em] mb-2">
              Soft (default)
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Chip tone="info">Active</Chip>
              <Chip tone="success">Healthy</Chip>
              <Chip tone="warning">Degraded</Chip>
              <Chip tone="danger">Critical</Chip>
              <Chip tone="accent">Beta</Chip>
              <Chip tone="neutral">Archived</Chip>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-[0.05em] mb-2">
              Solid
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Chip tone="info" solid>Active</Chip>
              <Chip tone="success" solid>Healthy</Chip>
              <Chip tone="warning" solid>Degraded</Chip>
              <Chip tone="danger" solid>Critical</Chip>
              <Chip tone="accent" solid>Beta</Chip>
              <Chip tone="neutral" solid>Archived</Chip>
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
        <div className="flex gap-6 items-center">
          <div>
            <div className="text-[11px] font-semibold text-[#64748b] mb-[6px]">sm (default)</div>
            <div className="flex gap-[6px]">
              <Chip tone="info" size="sm">Default size</Chip>
              <Chip tone="success" size="sm">Success</Chip>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#64748b] mb-[6px]">xs</div>
            <div className="flex gap-[6px]">
              <Chip tone="info" size="xs">Extra small</Chip>
              <Chip tone="success" size="xs">Deployed</Chip>
              <Chip tone="danger" size="xs">Failed</Chip>
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
        <div className="flex gap-3 items-center">
          <Chip tone="info" mono>42</Chip>
          <Chip tone="danger" solid mono>3</Chip>
          <Chip tone="success" mono>128</Chip>
          <Chip tone="accent" solid mono>99+</Chip>
          <Chip tone="warning" mono>7</Chip>
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
        <div className="flex gap-8 items-end flex-wrap">
          <div>
            <div className="text-[11px] font-semibold text-[#64748b] mb-[6px]">Upward trend</div>
            <div className="bg-surface border border-border rounded-md py-2 px-3 inline-block">
              <Sparkline data={[4, 6, 5, 8, 7, 12, 11, 15, 14, 18]} width={80} height={24} color={toneVar('success')} />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#64748b] mb-[6px]">Downward trend</div>
            <div className="bg-surface border border-border rounded-md py-2 px-3 inline-block">
              <Sparkline data={[18, 16, 17, 14, 12, 13, 10, 9, 7, 5]} width={80} height={24} color={toneVar('danger')} />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#64748b] mb-[6px]">Flat / stable</div>
            <div className="bg-surface border border-border rounded-md py-2 px-3 inline-block">
              <Sparkline data={[10, 11, 10, 10, 11, 10, 11, 10, 10, 11]} width={80} height={24} color={toneVar('neutral')} />
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#64748b] mb-[6px]">Volatile (purple, wider)</div>
            <div className="bg-surface border border-border rounded-md py-2 px-3 inline-block">
              <Sparkline data={[3, 14, 8, 18, 5, 16, 2, 19, 7, 15, 4, 17]} width={120} height={24} color={toneVar('accent')} />
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
        <div className="max-w-105">
          {/* Card-style skeleton */}
          <div className="bg-surface border border-border rounded-lg p-4 mb-3">
            <div className="flex gap-3 mb-[14px]">
              <SkeletonCard width={44} height={44} rounded="full" />
              <div className="flex-[1] flex flex-col gap-2 justify-center">
                <SkeletonCard width="60%" height={14} rounded="md" />
                <SkeletonCard width="40%" height={10} rounded="md" />
              </div>
            </div>
            <SkeletonCard width="100%" height={12} rounded="md" />
            <div className="mt-2" />
            <SkeletonCard width="90%" height={12} rounded="md" />
            <div className="mt-2" />
            <SkeletonCard width="70%" height={12} rounded="md" />
          </div>
          {/* Row skeletons */}
          <div className="flex gap-[10px]">
            <SkeletonCard width={100} height={80} />
            <SkeletonCard width={100} height={80} />
            <SkeletonCard width={100} height={80} />
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
        <div className="flex gap-4 flex-wrap">
          {/* Empty state with action */}
          <div className="flex-[1_1_260px] border border-border rounded-lg bg-surface">
            <div className="flex flex-col items-center justify-center min-h-50 p-6 text-center">
              <div className="w-16 h-16 rounded-[32px] bg-surface-hover flex items-center justify-center text-[28px] mb-3">
                📋
              </div>
              <div className="text-[16px] font-semibold text-[#334155] mb-1">No items yet</div>
              <div className="text-[13px] text-text-tertiary max-w-60 leading-[1.5] mb-[14px]">
                Create your first item to get started with your project.
              </div>
              <button className="py-2 px-[18px] text-[13px] font-semibold bg-primary text-surface border-0 rounded-md cursor-pointer">
                Create Item
              </button>
            </div>
          </div>
          {/* Empty state without action */}
          <div className="flex-[1_1_260px] border border-border rounded-lg bg-surface">
            <div className="flex flex-col items-center justify-center min-h-50 p-6 text-center">
              <div className="w-16 h-16 rounded-[32px] bg-surface-hover flex items-center justify-center text-[28px] mb-3">
                🔍
              </div>
              <div className="text-[16px] font-semibold text-[#334155] mb-1">No results found</div>
              <div className="text-[13px] text-text-tertiary max-w-60 leading-[1.5]">
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
        <div className="border border-border rounded-lg overflow-hidden bg-surface">
          {[
            { severity: 'info', tone: 'neutral' as Tone, ts: '09:14:22', type: 'pipeline.run.started', summary: 'ETL pipeline began execution' },
            { severity: 'success', tone: 'success' as Tone, ts: '09:14:28', type: 'pipeline.step.completed', summary: 'Extract step finished (240 records)' },
            { severity: 'error', tone: 'danger' as Tone, ts: '09:14:35', type: 'pipeline.run.failed', summary: 'Transform step threw NullPointerException' },
            { severity: 'warning', tone: 'warning' as Tone, ts: '09:15:01', type: 'pipeline.approval.requested', summary: 'Manual retry requires approval' },
            { severity: 'success', tone: 'success' as Tone, ts: '09:15:12', type: 'pipeline.run.completed', summary: 'Pipeline completed after retry' },
          ].map((event, idx) => (
            <div className={`flex items-center gap-[10px] py-2 px-3 ${idx < 4 ? 'border-b border-surface-hover' : 'border-b-0'} ${idx === 2 ? 'bg-danger-bg' : 'bg-transparent'}`}
              key={idx}
            >
              <StatusDot size="sm" color={toneVar(event.tone)} />
              <span className="text-[11px] text-text-tertiary font-mono w-16 shrink-0">{event.ts}</span>
              <span className="text-[11px] font-semibold shrink-0 min-w-45" style={{ color: toneVar(event.tone) }}>{event.type}</span>
              <span className="text-[13px] text-[#334155] flex-[1] overflow-hidden text-ellipsis whitespace-nowrap">{event.summary}</span>
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* ------------------------------------------------------------------ */}
      {/*  PROPS TABLE                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="mt-12" id="props">
        <h2 className="text-[22px] font-bold text-text-primary mb-6">API Reference</h2>

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
