import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WorkListView, toWorkListRows, type WorkListGroup, type WorkListItem, type WorkListViewProps } from '../WorkListView';

const LAYLA = { id: 'lh', name: 'Layla Hassan' };
const ELI = { id: 'eg', name: 'Eli Garcia' };

const GROUPS: WorkListGroup[] = [
  { id: 'next', title: 'Next up', emptyLabel: 'Nothing up next' },
  { id: 'progress', title: 'In progress' },
  { id: 'review', title: 'In review', emptyLabel: 'Nothing waiting for review' },
  { id: 'done', title: 'Done', defaultOpen: false },
];

const ITEMS: WorkListItem[] = [
  { id: 's4', groupId: 'next', title: 'Decommission legacy StatsD bridge', points: 5, owner: LAYLA },
  { id: 's5', groupId: 'next', title: 'Set SLO alert thresholds', points: 5, owner: ELI },
  { id: 'b1', groupId: 'next', title: 'Fix dropped span exports', owner: ELI, chips: [{ label: 'Bug', tone: 'danger' }] },
  { id: 'u1', groupId: 'next', title: 'Write the runbook' },
  { id: 's2', groupId: 'progress', title: 'Span-metrics connector', owner: LAYLA, signal: { state: 'running', label: 'Agent running' } },
  { id: 'd1', groupId: 'done', title: 'Collector fleet rollout', points: 8, owner: ELI, done: true },
];

function renderView(props: Partial<WorkListViewProps> = {}) {
  return render(<WorkListView groups={GROUPS} items={ITEMS} query="" onQueryChange={() => {}} {...props} />);
}

afterEach(cleanup);
beforeEach(() => window.localStorage.clear());

describe('WorkListView', () => {
  it('groups items by status with counts, the header count and per-group empty labels', () => {
    renderView({ onCreate: () => {}, onCollapse: () => {} });
    expect(screen.getByRole('heading', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByTestId('work-list-count')).toHaveTextContent('6');
    expect(screen.getByTestId('work-list-groups-group-count-next')).toHaveTextContent('4');
    expect(screen.getByTestId('work-list-groups-group-count-progress')).toHaveTextContent('1');
    expect(screen.getByTestId('work-list-groups-group-count-review')).toHaveTextContent('0');
    expect(screen.getByTestId('work-list-groups-group-empty-review')).toHaveTextContent('Nothing waiting for review');
    // Done starts collapsed.
    expect(screen.getByTestId('work-list-groups-group-toggle-done')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'New work item' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collapse work list' })).toBeInTheDocument();
  });

  it('shows no title-row buttons without handlers, and chrome="embedded" hides the title row', () => {
    const { unmount } = renderView();
    expect(screen.queryByRole('button', { name: 'New work item' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Collapse work list' })).not.toBeInTheDocument();
    unmount();
    renderView({ chrome: 'embedded', onCreate: () => {} });
    expect(screen.queryByTestId('work-list-title-row')).not.toBeInTheDocument();
    expect(screen.getByTestId('work-list-toolbar-search')).toBeInTheDocument();
  });

  it('toggles done from the checkbox without opening the row', () => {
    const onToggleDone = vi.fn();
    const onOpenItem = vi.fn();
    renderView({ onToggleDone, onOpenItem });
    fireEvent.click(screen.getByLabelText('Mark Set SLO alert thresholds done'));
    expect(onToggleDone).toHaveBeenCalledWith(expect.objectContaining({ id: 's5' }), true);
    expect(onOpenItem).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('work-list-groups-row-open-s5'));
    expect(onOpenItem).toHaveBeenCalledWith(expect.objectContaining({ id: 's5' }));
  });

  it('disables the checkbox while a done toggle is pending, and omits it without onToggleDone', () => {
    const { unmount } = renderView({
      onToggleDone: () => {},
      items: ITEMS.map((i) => (i.id === 's4' ? { ...i, donePending: true } : i)),
    });
    expect(screen.getByLabelText('Mark Decommission legacy StatsD bridge done')).toBeDisabled();
    unmount();
    renderView();
    expect(screen.queryByLabelText('Mark Decommission legacy StatsD bridge done')).not.toBeInTheDocument();
  });

  it('a row with a signal shows a dot instead of a checkbox, and its label in the meta line', () => {
    renderView({ onToggleDone: () => {} });
    expect(screen.queryByLabelText('Mark Span-metrics connector done')).not.toBeInTheDocument();
    const leading = screen.getByTestId('work-list-groups-row-leading-s2');
    expect(within(leading).getByLabelText('Agent running')).toBeInTheDocument();
    expect(screen.getByTestId('work-list-meta-s2')).toHaveTextContent('Agent running · Layla Hassan');
  });

  it('a signal with onClick is a named button', () => {
    const onClick = vi.fn();
    const onOpenItem = vi.fn();
    renderView({
      onOpenItem,
      items: ITEMS.map((i) => (i.id === 's2' ? { ...i, signal: { state: 'running', label: 'Agent running', onClick } } : i)),
    });
    fireEvent.click(screen.getByRole('button', { name: 'Agent running: Span-metrics connector' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOpenItem).not.toHaveBeenCalled();
  });

  it('builds the meta line: points and owner, chips, and "Unassigned" with no points part', () => {
    renderView();
    expect(screen.getByTestId('work-list-meta-s4')).toHaveTextContent(/^5 pts · Layla Hassan$/);
    expect(screen.getByTestId('work-list-meta-b1')).toHaveTextContent(/^Eli Garcia$/);
    expect(within(screen.getByTestId('work-list-groups-row-meta-b1')).getByText('Bug')).toBeInTheDocument();
    expect(screen.getByTestId('work-list-meta-u1')).toHaveTextContent(/^Unassigned$/);
  });

  it('filters by the query, hides empty groups while searching, and offers a way out when nothing matches', () => {
    const onQueryChange = vi.fn();
    const onClearFilters = vi.fn();
    const { rerender } = renderView({ query: 'slo', onQueryChange, onClearFilters });
    expect(screen.getByText('Set SLO alert thresholds')).toBeInTheDocument();
    expect(screen.queryByText('Decommission legacy StatsD bridge')).not.toBeInTheDocument();
    expect(screen.queryByTestId('work-list-groups-group-review')).not.toBeInTheDocument();
    rerender(<WorkListView groups={GROUPS} items={ITEMS} query="zzz" onQueryChange={onQueryChange} onClearFilters={onClearFilters} />);
    expect(screen.getByTestId('work-list-no-match')).toHaveTextContent('No work matches');
    fireEvent.click(screen.getByRole('button', { name: 'Clear search and filters' }));
    expect(onQueryChange).toHaveBeenCalledWith('');
    expect(onClearFilters).toHaveBeenCalled();
  });

  it('renders loading, empty and error states honestly', () => {
    const onRetry = vi.fn();
    const { unmount } = renderView({ items: [], loading: true });
    expect(screen.getByTestId('work-list-loading')).toHaveTextContent('Loading work…');
    unmount();
    const second = renderView({ items: [], emptyLabel: 'No work planned yet' });
    expect(screen.getByTestId('work-list-empty')).toHaveTextContent('No work planned yet');
    second.unmount();
    renderView({ items: [], error: 'Could not load work', onRetry });
    expect(screen.getByTestId('work-list-error')).toHaveTextContent('Could not load work');
    expect(screen.queryByTestId('work-list-empty')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalled();
  });

  it('passes reorder through (keyboard), and turns it off while a query narrows the list', () => {
    const onReorder = vi.fn();
    const { rerender } = renderView({ onReorder });
    expect(screen.getByTestId('work-list-groups-row-handle-s5')).toHaveAccessibleName('Reorder Set SLO alert thresholds');
    fireEvent.keyDown(screen.getByTestId('work-list-groups-row-open-s5'), { key: 'ArrowUp', altKey: true });
    expect(onReorder).toHaveBeenCalledWith('s5', 'next', 0);
    fireEvent.keyDown(screen.getByTestId('work-list-groups-row-open-s5'), { key: 'ArrowRight', altKey: true });
    expect(onReorder).toHaveBeenLastCalledWith('s5', 'progress', 1);
    onReorder.mockClear();
    rerender(<WorkListView groups={GROUPS} items={ITEMS} query="slo" onQueryChange={() => {}} onReorder={onReorder} />);
    expect(screen.queryByTestId('work-list-groups-row-handle-s5')).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId('work-list-groups-row-open-s5'), { key: 'ArrowUp', altKey: true });
    expect(onReorder).not.toHaveBeenCalled();
  });

  it('renders sort and filter controls only when given', () => {
    const onSortChange = vi.fn();
    const { unmount } = renderView();
    expect(screen.queryByTestId('work-list-toolbar-sort')).not.toBeInTheDocument();
    expect(screen.queryByTestId('work-list-toolbar-filter-trigger')).not.toBeInTheDocument();
    unmount();
    renderView({
      sort: 'priority',
      sortOptions: [
        { value: 'priority', label: 'Priority ↓' },
        { value: 'title', label: 'Title' },
      ],
      onSortChange,
      filters: <span>Owner</span>,
      activeFilterCount: 2,
    });
    fireEvent.change(screen.getByLabelText('Sort work'), { target: { value: 'title' } });
    expect(onSortChange).toHaveBeenCalledWith('title');
    expect(screen.getByTestId('work-list-toolbar-filter-count')).toHaveTextContent('2');
  });
});

describe('toWorkListRows', () => {
  it('maps ids, groups, titles and disabled; no leading without onToggleDone or signal', () => {
    const rows = toWorkListRows([{ id: 'x', groupId: 'g', title: 'X', disabled: true }]);
    expect(rows[0]).toMatchObject({ id: 'x', groupId: 'g', title: 'X', disabled: true });
    expect(rows[0].leading).toBeUndefined();
    expect(rows[0].meta).toBeTruthy();
  });
});
