import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PipelinesListView, toGroupedRows } from '../list/PipelinesListView';
import { groupEntries, matchesQuery, relativeAgo, statusPillFor, type PipelinesListEntry } from '../list/catalog';
import { FloatingComposerDock } from '../../doc-editor/FloatingComposerDock';

const NOW = Date.parse('2026-09-23T12:00:00Z');
const ago = (ms: number) => new Date(NOW - ms).toISOString();

const rollup = (id: string, lastRunStatus: 'completed' | 'failed' | 'running', lastRunAt: string, failedOfRecent = 0, count = 5) => ({
  pipelineId: id,
  lastRunId: `${id}-run`,
  lastRunAt,
  lastRunStatus,
  recent: Array.from({ length: count }, (_, i) => ({ runId: `${id}-${i}`, status: 'completed' as const, startedAt: lastRunAt })),
  failedOfRecent,
  runningCount: lastRunStatus === 'running' ? 1 : 0,
  updatedAt: lastRunAt,
});

const ENTRIES: PipelinesListEntry[] = [
  { id: 'doc', name: 'Document agent edit', description: 'Edit a document', route: ['/doc', 'Read', 'Plan'], kind: 'document', status: 'published', rollup: rollup('doc', 'completed', ago(60_000)) },
  { id: 'deck', name: 'Presentation edit', description: 'Edit a deck', kind: 'presentation', status: 'published', rollup: rollup('deck', 'completed', ago(29 * 60_000), 1) },
  { id: 'agent', name: 'Agent loop', description: 'Run an agent', kind: 'agent', status: 'published', rollup: rollup('agent', 'failed', ago(10 * 3_600_000), 1, 3) },
  { id: 'scratch', name: 'ZZ scratch', description: 'Test live output', kind: 'experiment', status: 'draft', rollup: null },
  { id: 'call', name: 'Call transcription', route: ['/call', 'Transcribe'], kind: 'call', status: 'published', rollup: null },
  { id: 'legacy', name: 'Legacy thing', status: 'archived' },
];

const baseProps = {
  entries: ENTRIES,
  query: '',
  onQueryChange: () => {},
  groupBy: 'worktype' as const,
  onGroupByChange: () => {},
  onOpen: () => {},
  now: NOW,
};

afterEach(cleanup);

describe('catalog helpers', () => {
  it('groups by work type in the vocabulary order, dropping empty groups, and infers the type from the kind', () => {
    const { groups, groupOf } = groupEntries(ENTRIES, 'worktype');
    expect(groups.map((g) => [g.id, g.count])).toEqual([
      ['documents', 2],
      ['agents', 2],
      ['conversations', 1],
      ['other', 1],
    ]);
    expect(groupOf.get('legacy')).toBe('other');
    expect(groupOf.get('call')).toBe('conversations');
  });

  it('groups by status and kind, and "none" is one group', () => {
    expect(groupEntries(ENTRIES, 'status').groups.map((g) => g.id)).toEqual(['published', 'draft', 'archived']);
    expect(groupEntries(ENTRIES, 'kind').groups.map((g) => g.id)).toEqual(['document', 'presentation', 'agent', 'experiment', 'call', 'workflow']);
    expect(groupEntries(ENTRIES, 'none').groups).toEqual([{ id: 'all', title: 'All pipelines', count: 6 }]);
  });

  it('derives the pill: failed → danger with time, partial failures → warning "n of m failed", running → info, else the definition status', () => {
    expect(statusPillFor(ENTRIES[2], NOW)).toEqual({ tone: 'danger', label: 'Failed', meta: '10h ago' });
    expect(statusPillFor(ENTRIES[1], NOW)).toEqual({ tone: 'warning', label: '1 of 5 failed', meta: '29m ago' });
    expect(statusPillFor(ENTRIES[0], NOW)).toEqual({ tone: 'success', label: 'Published' });
    expect(statusPillFor(ENTRIES[3], NOW)).toEqual({ tone: 'neutral', label: 'Draft' });
    expect(statusPillFor(ENTRIES[5], NOW)).toEqual({ tone: 'neutral', label: 'Archived' });
    expect(statusPillFor({ ...ENTRIES[0], rollup: rollup('doc', 'running', ago(5_000)) }, NOW)).toEqual({ tone: 'info', label: 'Running', meta: 'just now' });
  });

  it('formats relative time', () => {
    expect(relativeAgo(ago(10_000), NOW)).toBe('just now');
    expect(relativeAgo(ago(29 * 60_000), NOW)).toBe('29m ago');
    expect(relativeAgo(ago(10 * 3_600_000), NOW)).toBe('10h ago');
    expect(relativeAgo(ago(3 * 86_400_000), NOW)).toBe('3d ago');
    expect(relativeAgo(undefined, NOW)).toBeUndefined();
    expect(relativeAgo('not a date', NOW)).toBeUndefined();
  });

  it('matches the query against name, description, route and tags, case-insensitively', () => {
    expect(matchesQuery(ENTRIES[0], 'DOCUMENT')).toBe(true);
    expect(matchesQuery(ENTRIES[0], 'read → plan')).toBe(true);
    expect(matchesQuery(ENTRIES[0], 'deck')).toBe(false);
    expect(matchesQuery({ ...ENTRIES[3], tags: ['smoke'] }, 'smoke')).toBe(true);
  });
});

describe('toGroupedRows', () => {
  it('builds one row per entry with a kind mark, a text pill, description at rest and route on hover', () => {
    const { groups, rows } = toGroupedRows(ENTRIES, 'worktype', { now: NOW });
    expect(groups.map((g) => g.title)).toEqual(['Documents & presentations', 'Agents & experiments', 'Conversations & media', 'Other']);
    const doc = rows.find((r) => r.id === 'doc')!;
    expect(doc.groupId).toBe('documents');
    expect(doc.subline).toBe('Edit a document');
    expect(doc.hoverSubline).toBe('/doc → Read → Plan');
    // No description: the route is the resting line, nothing swaps in on hover.
    const call = rows.find((r) => r.id === 'call')!;
    expect(call.subline).toBe('/call → Transcribe');
    expect(call.hoverSubline).toBeUndefined();
  });

  it('adds "View run" only on a row with a failed or partly failed last run, and only with onViewRun', () => {
    const onViewRun = vi.fn();
    const { rows } = toGroupedRows(ENTRIES, 'none', { now: NOW, onViewRun });
    expect(rows.find((r) => r.id === 'agent')!.trailing).toBeDefined();
    expect(rows.find((r) => r.id === 'deck')!.trailing).toBeDefined();
    expect(rows.find((r) => r.id === 'doc')!.trailing).toBeUndefined();
    const { rows: without } = toGroupedRows(ENTRIES, 'none', { now: NOW });
    expect(without.find((r) => r.id === 'agent')!.trailing).toBeUndefined();
  });
});

describe('PipelinesListView', () => {
  it('renders the header with the count chip, the toolbar, the groups and the rows', () => {
    render(<PipelinesListView {...baseProps} headerMenu={[{ items: [{ label: 'Metrics' }] }]} onTemplates={() => {}} onStartBlank={() => {}} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Pipelines' })).toBeInTheDocument();
    expect(screen.getByTestId('pipelines-list-count')).toHaveTextContent('6');
    expect(screen.getByTestId('pipelines-list-templates')).toHaveTextContent('Templates');
    expect(screen.getByTestId('pipelines-list-start-blank')).toHaveTextContent('Start from blank');
    expect(screen.getByTestId('pipelines-list-more')).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.getByLabelText('Search pipelines')).toHaveAttribute('placeholder', 'Search pipelines…');
    expect(screen.getByLabelText('Group by')).toHaveValue('worktype');
    expect(screen.getByTestId('pipelines-list-groups-group-count-documents')).toHaveTextContent('2');
    expect(screen.getByTestId('pipelines-list-pill-deck')).toHaveTextContent('1 of 5 failed· 29m ago');
    expect(screen.getByTestId('pipelines-list-pill-agent')).toHaveTextContent('Failed· 10h ago');
    expect(screen.getByTestId('pipelines-list-pill-agent')).toHaveAttribute('data-state', 'danger');
    expect(within(screen.getByTestId('pipelines-list-groups-row-icon-agent')).getByTestId('file-kind-mark')).toHaveAttribute('data-kind', 'agent');
    expect(within(screen.getByTestId('pipelines-list-groups-row-icon-call')).getByTestId('file-kind-mark')).toHaveAttribute('data-kind', 'call');
  });

  it('filters by the query in the view and offers to clear when nothing matches', () => {
    const onQueryChange = vi.fn();
    const onClearFilters = vi.fn();
    const { rerender } = render(<PipelinesListView {...baseProps} query="agent" onQueryChange={onQueryChange} />);
    expect(screen.getByText('Agent loop')).toBeInTheDocument();
    expect(screen.queryByText('Presentation edit')).not.toBeInTheDocument();
    expect(screen.getByTestId('pipelines-list-count')).toHaveTextContent('2');
    rerender(<PipelinesListView {...baseProps} query="zzzz" onQueryChange={onQueryChange} activeFilterCount={1} onClearFilters={onClearFilters} />);
    expect(screen.getByTestId('pipelines-list-no-match')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Clear search and filters'));
    expect(onQueryChange).toHaveBeenCalledWith('');
    expect(onClearFilters).toHaveBeenCalled();
  });

  it('shows the loading, empty and error states', () => {
    const { rerender } = render(<PipelinesListView {...baseProps} entries={[]} loading />);
    expect(screen.getByTestId('pipelines-list-loading')).toBeInTheDocument();
    rerender(<PipelinesListView {...baseProps} entries={[]} onStartBlank={() => {}} />);
    expect(screen.getByTestId('pipelines-list-empty')).toHaveTextContent('No pipelines yet');
    rerender(<PipelinesListView {...baseProps} error="Could not reach the platform" onRetry={() => {}} />);
    expect(screen.getByTestId('pipelines-list-error')).toHaveTextContent('Could not reach the platform');
    expect(screen.getByText('Agent loop')).toBeInTheDocument();
  });

  it('opens a row, runs it from the hover action, views its run, and hands the row menu the entry', () => {
    const onOpen = vi.fn();
    const onRun = vi.fn();
    const onViewRun = vi.fn();
    const rowMenu = vi.fn((entry: PipelinesListEntry) => [{ items: [{ label: `Archive ${entry.name}` }] }]);
    render(<PipelinesListView {...baseProps} onOpen={onOpen} onRun={onRun} onViewRun={onViewRun} rowMenu={rowMenu} />);
    fireEvent.click(screen.getByTestId('pipelines-list-groups-row-open-doc'));
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'doc' }));
    fireEvent.click(screen.getByTestId('pipelines-list-run-doc'));
    expect(onRun).toHaveBeenCalledWith(expect.objectContaining({ id: 'doc' }));
    expect(screen.queryByTestId('pipelines-list-run-scratch')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('pipelines-list-view-run-agent'));
    expect(onViewRun).toHaveBeenCalledWith(expect.objectContaining({ id: 'agent' }), 'agent-run');
    fireEvent.click(screen.getByTestId('pipelines-list-groups-row-menu-trigger-agent'));
    expect(screen.getByRole('menuitem', { name: 'Archive Agent loop' })).toBeInTheDocument();
  });

  it('changes the grouping through the select and tints the current row', () => {
    const onGroupByChange = vi.fn();
    render(<PipelinesListView {...baseProps} onGroupByChange={onGroupByChange} currentId="deck" />);
    fireEvent.change(screen.getByLabelText('Group by'), { target: { value: 'status' } });
    expect(onGroupByChange).toHaveBeenCalledWith('status');
    expect(screen.getByTestId('pipelines-list-groups-row-deck')).toHaveAttribute('aria-current', 'true');
  });

  it('renders the Filter popover only with filters, with the active count', () => {
    const { rerender } = render(<PipelinesListView {...baseProps} />);
    expect(screen.queryByTestId('pipelines-list-filter-trigger')).not.toBeInTheDocument();
    rerender(<PipelinesListView {...baseProps} filters={<p>chips</p>} activeFilterCount={2} onClearFilters={() => {}} />);
    expect(screen.getByTestId('pipelines-list-filter-count')).toHaveTextContent('2');
    fireEvent.click(screen.getByTestId('pipelines-list-filter-trigger'));
    expect(screen.getByText('chips')).toBeInTheDocument();
  });

  it('renders the footer slot as a pinned, column-wide dock', () => {
    render(<PipelinesListView {...baseProps} footer={<FloatingComposerDock composer={<textarea aria-label="Instruction" />} />} />);
    const footer = screen.getByTestId('pipelines-list-footer');
    expect(footer.className).toContain('w-full');
    expect(footer.className).toContain('[--dock-inset:0px]');
    const dock = within(footer).getByTestId('floating-composer-dock');
    expect(dock).toHaveAttribute('data-placement', 'pinned');
    expect(dock.className).toContain('w-full');
    expect(dock.className).not.toContain('absolute');
    expect(within(dock).getByLabelText('Instruction')).toBeInTheDocument();
    // The footer is the last child of the view: after the scrolling body, not over it.
    const view = screen.getByTestId('pipelines-list');
    expect(view.lastElementChild).toBe(footer);
  });

  it('renders no footer region without the slot', () => {
    render(<PipelinesListView {...baseProps} />);
    expect(screen.queryByTestId('pipelines-list-footer')).not.toBeInTheDocument();
  });
});
