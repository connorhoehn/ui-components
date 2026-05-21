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
} from '@connorhoehn/ui-components/shared';

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

export default function PrimitivesPage() {
  useRegisterToc(tocItems);

  // FilterChip state
  const [filters, setFilters] = React.useState<Record<string, boolean>>({
    all: true,
    open: false,
    closed: false,
    archived: false,
  });
  const toggle = (key: string) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  // SearchInput state
  const [query, setQuery] = React.useState('');

  // SegmentedControl state
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <PageHeader
        title="Primitives"
        description="Small atomic UI primitives: stat tiles, spinners, progress bars, status dots, filter chips, avatars, search inputs, segmented controls, inline alerts, entity cells, and card headers."
        importPath="import { StatCard, FilterChip, Spinner, Avatar, ProgressBar } from '@connorhoehn/ui-components/shared'"
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
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
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Spinner size="sm" />
            <span style={{ fontSize: 11, color: '#64748b' }}>sm</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Spinner size="md" />
            <span style={{ fontSize: 11, color: '#64748b' }}>md</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Spinner size="lg" />
            <span style={{ fontSize: 11, color: '#64748b' }}>lg</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Spinner size="md" color="#16a34a" />
            <span style={{ fontSize: 11, color: '#64748b' }}>custom</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusDot size="xs" color="#16a34a" />
              <span style={{ fontSize: 11, color: '#64748b' }}>xs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusDot size="sm" color="#d97706" />
              <span style={{ fontSize: 11, color: '#64748b' }}>sm</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusDot size="md" color="#dc2626" />
              <span style={{ fontSize: 11, color: '#64748b' }}>md</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Avatar name="Alice Chen" size={36} />
            <Avatar name="Bobby Knox" size={36} />
            <Avatar name="Carmen Diaz" size={36} />
            <Avatar name="Devon Lee" size={36} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 6 }}>
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
        <div style={{ maxWidth: 360 }}>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search projects…"
          />
          {query && (
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <SegmentedControl
            value={view}
            onChange={(v) => setView(v as 'grid' | 'list')}
            options={[
              { label: 'Grid', value: 'grid' },
              { label: 'List', value: 'list' },
            ]}
          />
          <div style={{ fontSize: 12, color: '#64748b' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480 }}>
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
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            overflow: 'hidden',
            background: '#fff',
            maxWidth: 420,
          }}
        >
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9' }}>
            <EntityCell label="orgiq-search" id="agent_01HXR4K7TQ8YN3PXF1KQVZ9R2A" />
          </div>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9' }}>
            <EntityCell
              label="orgiq-supervisor"
              id="agent_01HXR4K7TQ8YN3PXF1KQVZ9R2B"
              href="#supervisor"
            />
          </div>
          <div style={{ padding: '10px 14px' }}>
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
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: 16,
            background: '#fff',
            maxWidth: 480,
          }}
        >
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
      <div id="props" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>
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
