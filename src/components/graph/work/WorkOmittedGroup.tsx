import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import InlineAlert from '../../shared/InlineAlert';
import { WorkStatus } from './WorkStatus';
import type { WorkActivityOmitted, WorkGraphNodeData } from './types';

const KIND_LABEL: Partial<Record<WorkGraphNodeData['kind'], string>> = {
  run: 'Run', agent: 'Agent', document: 'Document', change: 'Revision', conversation: 'Chat',
  meeting: 'Meeting', transcript: 'Transcript', terminal: 'Workspace', project: 'Project', task: 'Work item',
};

function clock(value: string, timezone?: string): string {
  const at = new Date(value);
  if (Number.isNaN(at.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', ...(timezone ? { timeZone: timezone } : {}) }).format(at);
  } catch {
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(at);
  }
}

export interface WorkOmittedGroupProps {
  omitted: WorkActivityOmitted;
  /** The graph's timezone, for the item times. */
  timezone?: string;
  className?: string;
}

/**
 * The work a capped snapshot held back (realtime-examples NFR #221): collapsed
 * it is one card, "N more earlier"; expanded it lists what the host has paged
 * in so far, newest first, with a control for the next page. The host owns the
 * fetch — this renders the count, the items and the paging state it is given.
 */
export function WorkOmittedGroup({ omitted, timezone, className }: WorkOmittedGroupProps) {
  const { count, expanded, items, loading, error, hasMore, onExpand, onCollapse, onLoadMore } = omitted;
  const countLabel = count.toLocaleString();
  if (!expanded) {
    return <div className={cn('flex items-center gap-2 rounded-xl border border-dashed border-border bg-surface/90 px-3 py-1.5 shadow-sm', className)} data-testid="work-omitted-group" data-expanded="false">
      <span className="text-[12px] font-semibold text-text-secondary">{countLabel} more earlier</span>
      <Button size="sm" variant="link" aria-expanded={false} aria-label={`Show ${countLabel} earlier items held back from the graph`} onClick={onExpand}>Show</Button>
    </div>;
  }
  const remaining = Math.max(0, count - items.length);
  return <section aria-label={`${countLabel} earlier items`} className={cn('flex max-h-full w-[min(22rem,calc(100vw-2rem))] min-h-0 flex-col rounded-xl border border-dashed border-border bg-surface shadow-md', className)} data-testid="work-omitted-group" data-expanded="true">
    <header className="flex items-center justify-between gap-2 border-b border-border-subtle px-3 py-1.5">
      <span className="min-w-0 truncate text-[12px] font-semibold text-text-secondary">{countLabel} more earlier · newest first</span>
      <Button size="sm" variant="link" aria-expanded onClick={onCollapse}>Collapse</Button>
    </header>
    <ul className="min-h-0 flex-1 divide-y divide-border-subtle overflow-auto" data-testid="work-omitted-items">
      {items.map((item) => <li key={item.id} className="flex items-center gap-2 px-3 py-1.5" data-work-omitted-item={item.id}>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium text-text-primary" title={item.title}>{item.locked ? 'Restricted work item' : item.title.trim() || 'Untitled work item'}</span>
          <span className="block text-[12px] text-text-tertiary">{KIND_LABEL[item.kind] ?? item.kind} · {clock(item.updatedAt, timezone)}</span>
        </span>
        <WorkStatus status={item.status} className="shrink-0 text-[12px]" />
      </li>)}
      {items.length === 0 && !loading && !error && <li className="px-3 py-2 text-xs text-text-tertiary">Nothing to show yet.</li>}
    </ul>
    {error && <InlineAlert tone="error" className="mx-2 my-1 text-[12px]">{error}</InlineAlert>}
    <footer className="flex items-center justify-between gap-2 border-t border-border-subtle px-3 py-1.5 text-[12px] text-text-tertiary">
      <span>{items.length.toLocaleString()} of {countLabel} shown</span>
      {(hasMore || loading) && <Button size="sm" variant="secondary" disabled={loading} onClick={onLoadMore}>{loading ? 'Loading…' : `Load ${Math.min(remaining, omitted.pageSize ?? 25).toLocaleString()} more`}</Button>}
    </footer>
  </section>;
}
