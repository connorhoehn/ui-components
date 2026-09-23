import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PipelinesListView } from './PipelinesListView';
import type { PipelinesGroupBy, PipelinesListEntry } from './catalog';
import { FilterChip } from '../../shared/FilterChip';
import { SectionLabel } from '../../shared/SectionLabel';
import { FloatingComposerDock } from '../../doc-editor/FloatingComposerDock';
import { RichChatComposer, type ComposerMode } from '../../social/RichChatComposer';

/** A fixed clock so "29m ago" is the same in every render and screenshot. */
const NOW = Date.parse('2026-09-23T12:00:00Z');
const ago = (ms: number) => new Date(NOW - ms).toISOString();

const rollup = (
  id: string,
  lastRunStatus: 'completed' | 'failed' | 'running',
  lastRunAt: string,
  failedOfRecent = 0,
  recentCount = 5,
) => ({
  pipelineId: id,
  lastRunId: `${id}-run-1`,
  lastRunAt,
  lastRunStatus,
  recent: Array.from({ length: recentCount }, (_, i) => ({
    runId: `${id}-run-${i + 1}`,
    status: i === 0 ? lastRunStatus : i < failedOfRecent + (lastRunStatus === 'failed' ? 0 : 1) && i > 0 ? ('failed' as const) : ('completed' as const),
    startedAt: lastRunAt,
  })),
  failedOfRecent,
  runningCount: lastRunStatus === 'running' ? 1 : 0,
  updatedAt: lastRunAt,
});

export const ENTRIES: PipelinesListEntry[] = [
  {
    id: 'document-agent-edit',
    name: 'Document agent edit',
    description: 'Edit a document from an instruction',
    route: ['/doc', 'Read', 'Plan', 'Approval', 'Suggestions'],
    kind: 'document',
    status: 'published',
    readOnly: true,
    rollup: rollup('document-agent-edit', 'completed', ago(5 * 60_000)),
  },
  { id: 'document-transform', name: 'Document transform', description: 'Transform a document into a new format', kind: 'document', status: 'draft', rollup: null },
  { id: 'document-suggestion-review', name: 'Document suggestion review', description: 'Review proposed changes before applying them', kind: 'document', status: 'draft', rollup: null },
  {
    id: 'presentation-edit',
    name: 'Presentation edit',
    description: 'Edit a presentation from a request',
    route: ['/deck', 'Read', 'Plan', 'Approval', 'Apply'],
    kind: 'presentation',
    status: 'published',
    rollup: rollup('presentation-edit', 'completed', ago(29 * 60_000), 1),
  },
  { id: 'diagram-from-description', name: 'Diagram from a description', description: 'Turn a description into a diagram', kind: 'diagram', status: 'draft', rollup: null },
  {
    id: 'agent-loop',
    name: 'Agent loop',
    description: 'Run an agent on a work item',
    route: ['/agent', 'Plan', 'Devbox', 'Review'],
    kind: 'agent',
    status: 'published',
    rollup: rollup('agent-loop', 'failed', ago(10 * 3_600_000), 1, 3),
  },
  { id: 'zz-scratch', name: 'ZZ scratch live output test', description: 'Test live output', kind: 'experiment', status: 'draft', rollup: null },
  { id: 'recording-finalize', name: 'Recording finalize', description: 'Prepare a completed recording', kind: 'recording', status: 'published', rollup: null },
  { id: 'call-transcription', name: 'Call transcription', description: 'Transcribe a recorded call', kind: 'call', status: 'published', rollup: null },
  { id: 'thread-summary', name: 'Thread summary', description: 'Summarise a conversation', kind: 'conversation', status: 'published', rollup: null },
  { id: 'image-variants', name: 'Image variants', description: 'Generate variants of an image', kind: 'media', status: 'draft', rollup: null },
  { id: 'nightly-cleanup', name: 'Nightly cleanup', description: 'Archive stale runs', kind: 'workflow', status: 'published', rollup: null },
];

const HEADER_MENU = [
  { items: [{ label: 'Metrics' }, { label: 'Dead letters' }, { label: 'All runs' }] },
  { items: [{ label: 'Import JSON' }] },
];

const rowMenu = (entry: PipelinesListEntry) => [
  { items: [{ label: 'Open' }, { label: 'Run', description: entry.status === 'draft' ? 'Publish first' : undefined }] },
  { items: [{ label: 'Duplicate' }, { label: 'Export JSON' }] },
  { items: [{ label: entry.status === 'archived' ? 'Unarchive' : 'Archive' }, { label: 'Delete', danger: true }] },
];

function Filters({ status, onToggle }: { status: Set<string>; onToggle: (k: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <SectionLabel as="div">Status</SectionLabel>
      <div className="flex flex-wrap gap-1.5">
        {['draft', 'published', 'archived'].map((s) => (
          <FilterChip key={s} size="sm" active={status.has(s)} onClick={() => onToggle(s)}>
            {s[0].toUpperCase() + s.slice(1)}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

/** The mockup's docked composer: `✦ Agent ▾`, `⌥2`, an "All pipelines" reference, "Draft only ▾", "Create draft →". */
function Dock() {
  const [mode, setMode] = useState<ComposerMode>('agent');
  return (
    <FloatingComposerDock
      composer={
        <RichChatComposer
          onSend={() => {}}
          mode={mode}
          onModeChange={setMode}
          modeControl="menu"
          modeShortcuts
          backdropTone="none"
          disabledModes={['terminal']}
          modeUnavailableReasons={{ terminal: 'Start an agent task first' }}
          references={[{ id: 'scope', label: 'All pipelines', icon: '📄' }]}
          placeholder="Describe the pipeline to draft…"
          submitLabel={{ agent: 'Create draft' }}
          sendOptions={[{ id: 'draft', label: 'Draft only' }, { id: 'draft-and-run', label: 'Create and run' }]}
          onSendOption={() => {}}
        />
      }
    />
  );
}

function Page({ entries = ENTRIES, loading = false, error = null as string | null, withFooter = true, current = 'document-agent-edit', frame = 'none' as 'card' | 'none' }) {
  const [query, setQuery] = useState('');
  const [groupBy, setGroupBy] = useState<PipelinesGroupBy>('worktype');
  const [status, setStatus] = useState<Set<string>>(new Set());
  const visible = status.size ? entries.filter((e) => status.has(e.status)) : entries;
  return (
    <div className="h-[900px] w-[1560px] bg-workspace p-6">
      <PipelinesListView
        entries={visible}
        loading={loading}
        error={error}
        onRetry={() => {}}
        query={query}
        onQueryChange={setQuery}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        filters={
          <Filters
            status={status}
            onToggle={(k) =>
              setStatus((prev) => {
                const next = new Set(prev);
                if (next.has(k)) next.delete(k);
                else next.add(k);
                return next;
              })
            }
          />
        }
        activeFilterCount={status.size}
        onClearFilters={() => setStatus(new Set())}
        headerMenu={HEADER_MENU}
        onTemplates={() => {}}
        onStartBlank={() => {}}
        currentId={current}
        onOpen={() => {}}
        onRun={() => {}}
        onViewRun={() => {}}
        rowMenu={rowMenu}
        now={NOW}
        frame={frame}
        footer={withFooter ? <Dock /> : undefined}
      />
    </div>
  );
}

const meta = {
  title: 'Pipelines/List/PipelinesListView',
  component: PipelinesListView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PipelinesListView>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  entries: ENTRIES,
  query: '',
  onQueryChange: () => {},
  groupBy: 'worktype' as const,
  onGroupByChange: () => {},
  onOpen: () => {},
};

/** The mockup: twelve pipelines in three groups, the docked agent composer below. */
export const Directory: Story = { args: baseArgs, render: () => <Page /> };

/** The mockup's card: toolbar and groups inside one border + radius; header and composer outside it. */
export const Framed: Story = { args: { ...baseArgs, frame: 'card' }, render: () => <Page frame="card" /> };

/** Without a composer: the list takes the whole column. */
export const NoFooter: Story = { args: baseArgs, render: () => <Page withFooter={false} current={null as unknown as string} /> };

export const Empty: Story = { args: { ...baseArgs, entries: [] }, render: () => <Page entries={[]} /> };

export const Loading: Story = { args: { ...baseArgs, entries: [], loading: true }, render: () => <Page entries={[]} loading /> };

export const LoadError: Story = {
  args: { ...baseArgs, error: 'Could not reach the platform' },
  render: () => <Page error="Could not reach the platform (503). Showing the cached list." />,
};
