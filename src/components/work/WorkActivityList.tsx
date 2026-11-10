// WorkActivityList — a work item's history, newest first: status changes,
// agent runs, estimates and comments, each one line with who, what and when.
//
// Static on purpose. ActivityFeed is a rotating ticker for a dashboard; an
// item's history has to be readable top to bottom, and a line that slides
// away while you read it is not a record. Each event may link somewhere (the
// run, the PR); the host decides where.
//
// Honest by construction: an event with an unparseable time shows no time
// rather than "just now", and events are sorted here, so a host that passes
// them in fetch order cannot show a history out of order.
//
// Compact by default (since the compact-activity release), because a raw dump
// of every recorded event is never the right default:
//   - consecutive events with the same kind, text and actor collapse into one
//     row with a count ("Worker heartbeat ×7"), dated by the newest of the run;
//   - events the host marks low-signal (heartbeats, progress pings) are hidden
//     until the reader asks for "Show all events";
//   - only the first `limit` rows (5) show, with a "Show N more" button;
//   - a relative time identical to the row above is not repeated.
// Each behaviour has an opt-out prop (`group={false}`, `limit={null}`,
// `defaultShowAll`, `repeatTimes`).

import { useState, type ReactNode } from 'react';
import { DetailSection } from '../shared/DetailSection';
import { StatusDot } from '../shared/StatusDot';
import { MetaLine } from '../shared/MetaLine';
import { Button } from '../ui/Button';
import VisuallyHidden from '../shared/VisuallyHidden';
import { relativeAgo } from '../pipelines/list/catalog';
import { safeHref } from '../../lib/safeHref';

export type WorkActivityKind = 'status' | 'run' | 'estimate' | 'comment' | 'system';

export interface WorkActivityEvent {
  id: string;
  kind: WorkActivityKind;
  /** ISO time, epoch ms, or Date. */
  at: string | number | Date;
  /** "Status changed from Open to In progress". Already worded by the host. */
  text: string;
  /** Who did it; absent for machine events. */
  actor?: string | null;
  /** A short trailing fact — "$0.18", "failed", "PR #42". */
  detail?: ReactNode;
  /** Opens the thing the event is about (a run, a PR). */
  onOpen?: () => void;
  href?: string;
  openLabel?: string;
  /** Low-signal (a heartbeat, a progress ping): hidden until "Show all events". */
  lowSignal?: boolean;
}

export interface WorkActivityListProps {
  title?: string;
  events: WorkActivityEvent[];
  /** Clock for relative times (ms since epoch). Default Date.now(). */
  now?: number;
  emptyLabel?: string;
  loading?: boolean;
  /** Shown instead of the list when the history could not be read. */
  error?: string | null;
  first?: boolean;
  className?: string;
  'data-testid'?: string;
  /**
   * Collapse consecutive events that share a key into one row with a count.
   * Default true; the key is kind + text + actor. Pass a function to choose
   * the key, or `false` to list every event.
   */
  group?: boolean | ((event: WorkActivityEvent) => string);
  /** Marks low-signal events in addition to each event's own `lowSignal` flag. */
  isLowSignal?: (event: WorkActivityEvent) => boolean;
  /** Start with low-signal events shown. Default false. */
  defaultShowAll?: boolean;
  /** Rows shown before "Show N more" (after grouping). Default 5; `null` shows every row. */
  limit?: number | null;
  /** Print a relative time even when it equals the row above. Default false. */
  repeatTimes?: boolean;
}

interface ActivityRow { event: WorkActivityEvent; count: number }

/** Group consecutive events by key; the newest event of a run represents it. */
function groupWorkActivity(
  sorted: readonly WorkActivityEvent[],
  key: false | ((event: WorkActivityEvent) => string),
): ActivityRow[] {
  const rows: ActivityRow[] = [];
  let lastKey: string | undefined;
  for (const event of sorted) {
    const k = key ? key(event) : undefined;
    const prev = rows[rows.length - 1];
    if (k !== undefined && prev && k === lastKey) prev.count += 1;
    else rows.push({ event, count: 1 });
    lastKey = k;
  }
  return rows;
}

const defaultKey = (e: WorkActivityEvent) => `${e.kind}\u0000${e.text}\u0000${e.actor ?? ''}`;

const KIND_COLOR: Record<WorkActivityKind, string> = {
  status: 'var(--color-info)',
  run: 'var(--color-primary)',
  estimate: 'var(--color-warning)',
  comment: 'var(--color-text-tertiary)',
  system: 'var(--color-text-tertiary)',
};

function timeOf(v: string | number | Date): number {
  const t = v instanceof Date ? v.getTime() : typeof v === 'number' ? v : Date.parse(v);
  return Number.isFinite(t) ? t : Number.NaN;
}

export function WorkActivityList({
  title = 'Activity', events, now, emptyLabel = 'Nothing has happened on this item yet', loading = false,
  error, first, className, 'data-testid': testId = 'work-activity-list',
  group = true, isLowSignal, defaultShowAll = false, limit = 5, repeatTimes = false,
}: WorkActivityListProps) {
  const clock = now ?? Date.now();
  const [showAll, setShowAll] = useState(defaultShowAll);
  const [expanded, setExpanded] = useState(false);
  // Newest first; an unparseable time sorts last rather than first.
  const sorted = [...events].sort((a, b) => {
    const ta = timeOf(a.at), tb = timeOf(b.at);
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });

  const low = (e: WorkActivityEvent) => Boolean(e.lowSignal || isLowSignal?.(e));
  const lowCount = sorted.filter(low).length;
  const shown = showAll ? sorted : sorted.filter((e) => !low(e));
  const rows = groupWorkActivity(shown, group === false ? false : group === true ? defaultKey : group);
  const cap = limit == null || expanded ? rows.length : Math.max(0, limit);
  const visible = rows.slice(0, cap);
  const moreCount = rows.length - visible.length;

  const controls = (moreCount > 0 || lowCount > 0) ? (
    <div className="flex flex-wrap items-center gap-3" data-testid={`${testId}-controls`}>
      {moreCount > 0 && (
        <Button variant="link" size="sm" className="text-[12px]" onClick={() => setExpanded(true)} data-testid={`${testId}-more`}>
          Show {moreCount} more
        </Button>
      )}
      {lowCount > 0 && (
        <Button
          variant="link" size="sm" className="text-[12px]" aria-pressed={showAll}
          onClick={() => setShowAll((v) => !v)} data-testid={`${testId}-show-all`}
        >
          {showAll ? 'Hide routine events' : `Show all events (${lowCount} routine hidden)`}
        </Button>
      )}
    </div>
  ) : null;

  let previousAgo: string | undefined;
  const list = visible.length === 0 ? (
    <p className="m-0 text-[13px] text-text-tertiary">Only routine events so far</p>
  ) : (
    <ol className="m-0 flex list-none flex-col gap-3 p-0" aria-label={title}>
      {visible.map(({ event: e, count }) => {
        const t = timeOf(e.at);
        const iso = Number.isNaN(t) ? undefined : new Date(t).toISOString();
        const ago = iso ? relativeAgo(iso, clock) : undefined;
        const showTime = Boolean(ago && (repeatTimes || ago !== previousAgo));
        previousAgo = ago;
        return (
          <li
            key={e.id} className="flex items-start gap-2.5" data-testid={`work-activity-${e.id}`} data-kind={e.kind}
            data-activity-count={count > 1 ? count : undefined}
          >
            <StatusDot color={KIND_COLOR[e.kind]} size="sm" className="mt-1.5 shrink-0" aria-label={e.kind} />
            <div className="min-w-0 flex-1">
              <p className="m-0 text-[13px] leading-snug text-text-primary">
                {e.text}
                {count > 1 && (
                  <>
                    <span aria-hidden="true" className="ml-1.5 text-[12px] font-medium tabular-nums text-text-secondary">×{count}</span>
                    <VisuallyHidden>{`, ${count} times`}</VisuallyHidden>
                  </>
                )}
              </p>
              <MetaLine
                size="sm"
                items={[
                  e.actor ? <span key="a">{e.actor}</span> : null,
                  showTime ? <time key="t" dateTime={iso}>{ago}</time> : null,
                  e.detail ?? null,
                  e.href ? (
                    <a key="l" href={safeHref(e.href) ?? undefined} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      {e.openLabel ?? 'Open'}
                    </a>
                  ) : e.onOpen ? (
                    <Button key="o" variant="link" size="sm" onClick={e.onOpen} className="text-[12px]">
                      {e.openLabel ?? 'Open'}
                    </Button>
                  ) : null,
                ]}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );

  let body: ReactNode;
  if (error) body = <p className="m-0 text-[13px] text-danger" role="alert">{error}</p>;
  else if (loading) body = <p className="m-0 text-[13px] text-text-tertiary">Loading activity…</p>;
  else if (sorted.length === 0) body = <p className="m-0 text-[13px] text-text-tertiary">{emptyLabel}</p>;
  else body = <div className="flex flex-col gap-2">{list}{controls}</div>;

  return (
    <DetailSection title={title} first={first} className={className} data-testid={testId}>
      {body}
    </DetailSection>
  );
}

export default WorkActivityList;
