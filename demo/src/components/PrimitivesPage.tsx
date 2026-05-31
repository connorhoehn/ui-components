import React from 'react';
import {
  ExampleBlock,
  PropsTable,
  PageHeader,
  useRegisterToc,
} from '../shared';
import type { TocItem } from '../shared';
import {
  StatCard,
  FilterChip,
  Spinner,
  Avatar,
  AvatarGroup,
  StatusDot,
  ProgressBar,
  SearchInput,
  SegmentedControl,
  InlineAlert,
  EntityCell,
  CardHeader,
  Button,
} from '@connorhoehnslalom/ui-components/shared';

const tocItems: TocItem[] = [
  { id: 'stat-card', label: 'StatCard', level: 2 },
  { id: 'spinner', label: 'Spinner', level: 2 },
  { id: 'progress-bar', label: 'ProgressBar', level: 2 },
  { id: 'status-dot', label: 'StatusDot', level: 2 },
  { id: 'filter-chip', label: 'FilterChip', level: 2 },
  { id: 'avatar', label: 'Avatar & AvatarGroup', level: 2 },
  { id: 'search-input', label: 'SearchInput', level: 2 },
  { id: 'segmented-control', label: 'SegmentedControl', level: 2 },
  { id: 'inline-alert', label: 'InlineAlert', level: 2 },
  { id: 'entity-cell', label: 'EntityCell', level: 2 },
  { id: 'card-header', label: 'CardHeader', level: 2 },
  { id: 'props', label: 'API Reference', level: 2 },
];

const TEAM = ['Alice Chen', 'Bobby Knox', 'Carmen Diaz', 'Devon Lee', 'Erin Pope', 'Fai Wong'];

const SAMPLE_COL = 'flex flex-col items-center gap-1.5';
const SAMPLE_CAPTION = 'text-[11px] text-slate-500';
const SAMPLE_LABEL = 'flex items-center gap-2';

export default function PrimitivesPage() {
  useRegisterToc(tocItems);

  const [filters, setFilters] = React.useState<Record<string, boolean>>({
    all: true,
    open: false,
    closed: false,
    archived: false,
  });
  const toggle = (key: string) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const [query, setQuery] = React.useState('');

  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className="max-w-[960px] mx-auto">
      <PageHeader
        title="Primitives"
        description="Small atomic UI primitives: stat tiles, spinners, progress bars, status dots, filter chips, avatars, search inputs, segmented controls, inline alerts, entity cells, and card headers."
        importPath="import { StatCard, FilterChip, Spinner, Avatar, ProgressBar } from '@connorhoehnslalom/ui-components/shared'"
      />

      {/* ─── StatCard ─────────────────────────────────────────────────── */}
      <ExampleBlock
        id="stat-card"
        title="StatCard"
        description="A labeled metric tile for dashboards. Supports neutral, accent (primary tint), and danger variants, plus an optional helper hint below the value."
        code={`<StatCard label="Active Users" value="1,284" />
<StatCard label="Open Tickets" value="42" accent />
<StatCard label="Failures" value="7" danger />
<StatCard
  label="Avg Latency"
  value="120ms"
  hint="rolling 24h"
/>`}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          <StatCard label="Active Users" value="1,284" />
          <StatCard label="Open Tickets" value="42" accent />
          <StatCard label="Failures" value="7" danger />
          <StatCard label="Avg Latency" value="120ms" hint="rolling 24h" />
        </div>
      </ExampleBlock>

      {/* ─── Spinner ──────────────────────────────────────────────────── */}
      <ExampleBlock
        id="spinner"
        title="Spinner"
        description="Rotating loading indicator. Three sizes: sm (14px), md (20px, default), and lg (28px). Customize the arc color via the color prop."
        code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="md" color="#16a34a" />`}
      >
        <div className="flex gap-7 items-center">
          <div className={SAMPLE_COL}>
            <Spinner size="sm" />
            <span className={SAMPLE_CAPTION}>sm</span>
          </div>
          <div className={SAMPLE_COL}>
            <Spinner size="md" />
            <span className={SAMPLE_CAPTION}>md</span>
          </div>
          <div className={SAMPLE_COL}>
            <Spinner size="lg" />
            <span className={SAMPLE_CAPTION}>lg</span>
          </div>
          <div className={SAMPLE_COL}>
            <Spinner size="md" color="#16a34a" />
            <span className={SAMPLE_CAPTION}>custom</span>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── ProgressBar ──────────────────────────────────────────────── */}
      <ExampleBlock
        id="progress-bar"
        title="ProgressBar"
        description="Horizontal progress indicator with an optional label row. Customize the fill color for semantic meaning (e.g. green for success, amber for warning)."
        code={`<ProgressBar value={25} label="Uploading" showRatio={false} />
<ProgressBar value={66} label="Indexing" color="#f59e0b" showRatio={false} />
<ProgressBar value={100} label="Complete" color="#16a34a" showRatio={false} />`}
      >
        <div className="flex flex-col gap-4 max-w-[420px]">
          <ProgressBar value={25} label="Uploading" showRatio={false} />
          <ProgressBar value={66} label="Indexing" color="#f59e0b" showRatio={false} />
          <ProgressBar value={100} label="Complete" color="#16a34a" showRatio={false} />
          <ProgressBar value={42} max={100} label="Storage" />
        </div>
      </ExampleBlock>

      {/* ─── StatusDot ────────────────────────────────────────────────── */}
      <ExampleBlock
        id="status-dot"
        title="StatusDot"
        description="Colored status indicator dot, optionally accompanied by a label. Use pulse for live/active states (deployments in progress, listening connections, etc.)."
        code={`<StatusDot size="xs" color="#16a34a" />
<StatusDot size="sm" color="#d97706" />
<StatusDot size="md" color="#dc2626" />

<StatusDot color="#16a34a" label="Online" />
<StatusDot color="#dc2626" pulse label="Live" />`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-[18px] items-center">
            <div className={SAMPLE_LABEL}>
              <StatusDot size="xs" color="#16a34a" />
              <span className={SAMPLE_CAPTION}>xs</span>
            </div>
            <div className={SAMPLE_LABEL}>
              <StatusDot size="sm" color="#d97706" />
              <span className={SAMPLE_CAPTION}>sm</span>
            </div>
            <div className={SAMPLE_LABEL}>
              <StatusDot size="md" color="#dc2626" />
              <span className={SAMPLE_CAPTION}>md</span>
            </div>
          </div>
          <div className="flex gap-[18px] items-center">
            <StatusDot color="#16a34a" label="Online" />
            <StatusDot color="#64748b" label="Idle" />
            <StatusDot color="#dc2626" pulse label="Live" />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── FilterChip ───────────────────────────────────────────────── */}
      <ExampleBlock
        id="filter-chip"
        title="FilterChip"
        description="Toggleable filter chip for faceted search and list filtering. Controlled by an active boolean and an onClick toggle handler. Supports an optional colored dot prefix."
        code={`const [filters, setFilters] = useState({ all: true, open: false });

<FilterChip active={filters.all} onClick={() => toggle('all')}>
  All
</FilterChip>
<FilterChip active={filters.open} onClick={() => toggle('open')}>
  Open
</FilterChip>
<FilterChip active onClick={fn} color="#16a34a" dot>
  Production
</FilterChip>`}
      >
        <div className="flex flex-wrap gap-2 items-center">
          <FilterChip active={filters.all} onClick={() => toggle('all')}>All</FilterChip>
          <FilterChip active={filters.open} onClick={() => toggle('open')}>Open</FilterChip>
          <FilterChip active={filters.closed} onClick={() => toggle('closed')}>Closed</FilterChip>
          <FilterChip active={filters.archived} onClick={() => toggle('archived')}>Archived</FilterChip>
          <FilterChip active onClick={() => undefined} color="#16a34a" dot>Production</FilterChip>
          <FilterChip active={false} onClick={() => undefined} color="#9333ea" dot>Staging</FilterChip>
        </div>
      </ExampleBlock>

      {/* ─── Avatar ───────────────────────────────────────────────────── */}
      <ExampleBlock
        id="avatar"
        title="Avatar & AvatarGroup"
        description="Initial-based avatars with auto-generated colors derived from the name. AvatarGroup stacks multiple avatars with overlap and overflows beyond maxVisible into a +N indicator."
        code={`<Avatar name="Alice Chen" size={36} />
<Avatar name="Bobby Knox" size={36} />
<Avatar name="Carmen Diaz" size={36} />

<AvatarGroup
  names={['Alice Chen', 'Bobby Knox', 'Carmen Diaz', 'Devon Lee', 'Erin Pope', 'Fai Wong']}
  maxVisible={4}
  size={32}
/>`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Avatar name="Alice Chen" size={36} />
            <Avatar name="Bobby Knox" size={36} />
            <Avatar name="Carmen Diaz" size={36} />
            <Avatar name="Devon Lee" size={36} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
              AvatarGroup (maxVisible=4)
            </div>
            <AvatarGroup names={TEAM} maxVisible={4} size={32} />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── SearchInput ──────────────────────────────────────────────── */}
      <ExampleBlock
        id="search-input"
        title="SearchInput"
        description="Text input with a leading magnifier icon and a trailing clear button that appears when the field has content. Fully controlled — pass value and onChange."
        code={`const [query, setQuery] = useState('');

<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search projects…"
/>`}
      >
        <div className="max-w-[360px]">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search projects…"
          />
          {query && (
            <div className="text-xs text-slate-500 mt-2">
              Searching for: <strong>{query}</strong>
            </div>
          )}
        </div>
      </ExampleBlock>

      {/* ─── SegmentedControl ─────────────────────────────────────────── */}
      <ExampleBlock
        id="segmented-control"
        title="SegmentedControl"
        description="A compact two-or-more-option toggle group. Ideal for view-mode switches (grid vs list), unit selectors, or any small mutually-exclusive choice."
        code={`const [view, setView] = useState<'grid' | 'list'>('grid');

<SegmentedControl
  value={view}
  onChange={(v) => setView(v as 'grid' | 'list')}
  options={[
    { label: 'Grid', value: 'grid' },
    { label: 'List', value: 'list' },
  ]}
/>`}
      >
        <div className="flex flex-col gap-3 items-start">
          <SegmentedControl
            value={view}
            onChange={(v) => setView(v as 'grid' | 'list')}
            options={[
              { label: 'Grid', value: 'grid' },
              { label: 'List', value: 'list' },
            ]}
          />
          <div className="text-xs text-slate-500">
            Current view: <strong>{view}</strong>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── InlineAlert ──────────────────────────────────────────────── */}
      <ExampleBlock
        id="inline-alert"
        title="InlineAlert"
        description="Compact contextual message for inline placement next to a form or action. Smaller than Banner — use for transient validation/result messages tied to a single control."
        code={`<InlineAlert tone="error">Sync failed: connection timeout.</InlineAlert>
<InlineAlert tone="success">Settings saved.</InlineAlert>
<InlineAlert tone="info">2 records skipped (duplicates).</InlineAlert>
<InlineAlert tone="warning">API key expires in 3 days.</InlineAlert>`}
      >
        <div className="flex flex-col gap-2.5 max-w-[480px]">
          <InlineAlert tone="error">Sync failed: connection timeout.</InlineAlert>
          <InlineAlert tone="success">Settings saved.</InlineAlert>
          <InlineAlert tone="info">2 records skipped (duplicates).</InlineAlert>
          <InlineAlert tone="warning">API key expires in 3 days.</InlineAlert>
        </div>
      </ExampleBlock>

      {/* ─── EntityCell ───────────────────────────────────────────────── */}
      <ExampleBlock
        id="entity-cell"
        title="EntityCell"
        description="A two-line table cell with a primary label and an optional monospace subline (ID, slug, ARN). Pass href to make the label a link."
        code={`<EntityCell label="orgiq-search" id="agent_01HXR4K..." />
<EntityCell
  label="orgiq-supervisor"
  id="agent_01HXR4K7TQ8YN3PXF1KQVZ9R2A"
  href="/agents/supervisor"
/>`}
      >
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white max-w-[420px]">
          <div className="px-3.5 py-2.5 border-b border-slate-100">
            <EntityCell label="orgiq-search" id="agent_01HXR4K7TQ8YN3PXF1KQVZ9R2A" />
          </div>
          <div className="px-3.5 py-2.5 border-b border-slate-100">
            <EntityCell
              label="orgiq-supervisor"
              id="agent_01HXR4K7TQ8YN3PXF1KQVZ9R2B"
              href="#supervisor"
            />
          </div>
          <div className="px-3.5 py-2.5">
            <EntityCell label="orgiq-news-researcher" id="agent_01HXR4K7TQ8YN3PXF1KQVZ9R2C" />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── CardHeader ───────────────────────────────────────────────── */}
      <ExampleBlock
        id="card-header"
        title="CardHeader"
        description="Reusable header bar for Card-style sections — title + optional subtitle on the left, optional meta slot for badges, and right-aligned action slot for buttons."
        code={`<Card>
  <div style={{ padding: 16 }}>
    <CardHeader
      title="Active Runs"
      subtitle="Past 24 hours"
      action={<Button variant="ghost" size="sm">Refresh</Button>}
    />
  </div>
</Card>`}
      >
        <div className="border border-slate-200 rounded-lg p-4 bg-white max-w-[480px]">
          <CardHeader
            title="Active Runs"
            subtitle="Past 24 hours"
            action={
              <Button variant="ghost" size="sm" onClick={() => undefined}>
                Refresh
              </Button>
            }
          />
        </div>
      </ExampleBlock>

      {/* ─── Props ────────────────────────────────────────────────────── */}
      <div id="props" className="mt-12">
        <h2 className="text-[22px] font-bold text-slate-900 mb-6">
          API Reference
        </h2>

        <PropsTable
          componentName="StatCard"
          props={[
            { name: 'label', type: 'ReactNode', required: true, description: 'Small uppercase label above the value.' },
            { name: 'value', type: 'ReactNode', required: true, description: 'Primary numeric or text value.' },
            { name: 'accent', type: 'boolean', default: 'false', description: 'Primary-tinted background and accent left border.' },
            { name: 'danger', type: 'boolean', default: 'false', description: 'Danger-tinted background and accent left border.' },
            { name: 'hint', type: 'ReactNode', description: 'Tiny italic helper text below the value.' },
            { name: 'to', type: 'string', description: 'If provided, wraps the card in an anchor.' },
            { name: 'mono', type: 'boolean', default: 'false', description: 'Render the value in a monospace font.' },
          ]}
        />

        <PropsTable
          componentName="Spinner"
          props={[
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Pixel size of the spinner.' },
            { name: 'color', type: 'string', description: 'Arc color. Defaults to var(--color-primary).' },
            { name: 'aria-label', type: 'string', default: "'Loading'", description: 'Accessible label announced by screen readers.' },
          ]}
        />

        <PropsTable
          componentName="ProgressBar"
          props={[
            { name: 'value', type: 'number', required: true, description: 'Current progress value.' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
            { name: 'color', type: 'string', description: 'Fill color. Defaults to var(--color-primary).' },
            { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Track height.' },
            { name: 'label', type: 'ReactNode', description: 'Label rendered above the track.' },
            { name: 'showRatio', type: 'boolean', default: 'true', description: 'Show "{value}/{max}" instead of percentage in the label row.' },
          ]}
        />

        <PropsTable
          componentName="StatusDot"
          props={[
            { name: 'color', type: 'string', description: 'Dot color. Defaults to var(--color-text-tertiary).' },
            { name: 'pulse', type: 'boolean', default: 'false', description: 'Animate the dot for active/live states.' },
            { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'sm'", description: 'Pixel size of the dot.' },
            { name: 'label', type: 'ReactNode', description: 'Optional inline label to the right of the dot.' },
          ]}
        />

        <PropsTable
          componentName="FilterChip"
          props={[
            { name: 'active', type: 'boolean', required: true, description: 'Whether the chip is in the active/selected state.' },
            { name: 'onClick', type: '() => void', required: true, description: 'Toggle handler.' },
            { name: 'color', type: 'string', description: 'Color for the active state and optional dot.' },
            { name: 'dot', type: 'boolean', default: 'false', description: 'Show a colored dot before the label.' },
            { name: 'size', type: "'sm' | 'xs'", default: "'sm'", description: 'Chip size.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the chip.' },
          ]}
        />

        <PropsTable
          componentName="Avatar"
          props={[
            { name: 'name', type: 'string', required: true, description: 'Person name. Used to derive initials and color.' },
            { name: 'size', type: 'number', default: '28', description: 'Avatar diameter in pixels.' },
            { name: 'color', type: 'string', description: 'Override the auto-computed color.' },
            { name: 'title', type: 'string', description: 'Native tooltip on hover. Defaults to name.' },
          ]}
        />

        <PropsTable
          componentName="AvatarGroup"
          props={[
            { name: 'names', type: 'string[]', required: true, description: 'Array of names. Each renders an Avatar.' },
            { name: 'maxVisible', type: 'number', default: '5', description: 'Maximum avatars rendered; overflow shown as +N tile.' },
            { name: 'size', type: 'number', default: '28', description: 'Avatar diameter in pixels.' },
          ]}
        />

        <PropsTable
          componentName="SearchInput"
          props={[
            { name: 'value', type: 'string', required: true, description: 'Controlled value.' },
            { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called on every keystroke and when the clear button is pressed.' },
            { name: 'placeholder', type: 'string', default: "'Search…'", description: 'Placeholder text.' },
            { name: 'onClear', type: '() => void', description: 'Called after the value is cleared.' },
            { name: 'autoFocus', type: 'boolean', description: 'Auto-focus on mount.' },
          ]}
        />

        <PropsTable
          componentName="SegmentedControl"
          props={[
            { name: 'options', type: '{ label: string; value: string; icon?: ReactNode }[]', required: true, description: 'List of options to render as segments.' },
            { name: 'value', type: 'string', required: true, description: 'Current selected option value.' },
            { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when a segment is clicked.' },
            { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Segment size.' },
          ]}
        />

        <PropsTable
          componentName="InlineAlert"
          props={[
            { name: 'tone', type: "'error' | 'success' | 'info' | 'warning'", required: true, description: 'Visual tone of the alert.' },
            { name: 'children', type: 'ReactNode', required: true, description: 'Alert message content.' },
            { name: 'onDismiss', type: '() => void', description: 'If provided, renders a dismiss button.' },
          ]}
        />

        <PropsTable
          componentName="EntityCell"
          props={[
            { name: 'label', type: 'string', required: true, description: 'Primary label (the entity name).' },
            { name: 'id', type: 'string', description: 'Optional monospace subline (ID, slug, ARN).' },
            { name: 'href', type: 'string', description: 'If provided, the label becomes a link.' },
            { name: 'mono', type: 'boolean', default: 'false', description: 'Add emphasis monospace tracking to the ID subline.' },
          ]}
        />

        <PropsTable
          componentName="CardHeader"
          props={[
            { name: 'title', type: 'string', required: true, description: 'Header title text.' },
            { name: 'subtitle', type: 'string', description: 'Small text below the title.' },
            { name: 'meta', type: 'ReactNode', description: 'Content rendered immediately to the right of the title (badges, chips).' },
            { name: 'action', type: 'ReactNode', description: 'Right-aligned action slot (buttons, menus).' },
          ]}
        />
      </div>
    </div>
  );
}
