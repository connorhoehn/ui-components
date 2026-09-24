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

import type { ReactNode } from 'react';
import { DetailSection } from '../shared/DetailSection';
import { StatusDot } from '../shared/StatusDot';
import { MetaLine } from '../shared/MetaLine';
import { Button } from '../ui/Button';
import { relativeAgo } from '../pipelines/list/catalog';

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
}

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
}: WorkActivityListProps) {
  const clock = now ?? Date.now();
  // Newest first; an unparseable time sorts last rather than first.
  const sorted = [...events].sort((a, b) => {
    const ta = timeOf(a.at), tb = timeOf(b.at);
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });

  let body: ReactNode;
  if (error) body = <p className="m-0 text-[13px] text-danger" role="alert">{error}</p>;
  else if (loading) body = <p className="m-0 text-[13px] text-text-tertiary">Loading activity…</p>;
  else if (sorted.length === 0) body = <p className="m-0 text-[13px] text-text-tertiary">{emptyLabel}</p>;
  else {
    body = (
      <ol className="m-0 flex list-none flex-col gap-3 p-0" aria-label={title}>
        {sorted.map((e) => {
          const t = timeOf(e.at);
          const iso = Number.isNaN(t) ? undefined : new Date(t).toISOString();
          const ago = iso ? relativeAgo(iso, clock) : undefined;
          return (
            <li key={e.id} className="flex items-start gap-2.5" data-testid={`work-activity-${e.id}`} data-kind={e.kind}>
              <StatusDot color={KIND_COLOR[e.kind]} size="sm" className="mt-1.5 shrink-0" aria-label={e.kind} />
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[13px] leading-snug text-text-primary">{e.text}</p>
                <MetaLine
                  size="sm"
                  items={[
                    e.actor ? <span key="a">{e.actor}</span> : null,
                    ago && iso ? <time key="t" dateTime={iso}>{ago}</time> : null,
                    e.detail ?? null,
                    e.href ? (
                      <a key="l" href={e.href} target="_blank" rel="noreferrer" className="text-primary hover:underline">
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
  }

  return (
    <DetailSection title={title} first={first} className={className} data-testid={testId}>
      {body}
    </DetailSection>
  );
}

export default WorkActivityList;
