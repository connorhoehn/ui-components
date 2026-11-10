// ActivityFeed — rotating ticker of recent activity items.
//
// Shows up to `visibleCount` items at a time, cycling through the full
// `items` array on an interval. Each item displays a colored type-dot,
// a mini Avatar, actor name, action verb, a monospace badge, subject, and timestamp.

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from './Avatar';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActivityKind = 'task' | 'pr' | 'decision' | 'comment' | 'status' | string;

export interface ActivityFeedItem {
  id: string;
  /** Display name of the person who performed the action, e.g. "Alex Chen". */
  actor: string;
  /** Verb phrase, e.g. "completed". */
  action: string;
  /** Jira-style ticket ID badge, e.g. "K8S-182". */
  ticketId?: string;
  /** Short description/title of the work item. */
  subject: string;
  /** Human-readable relative timestamp, e.g. "2m ago". */
  timeLabel?: string;
  /** Controls the type-dot color. */
  kind?: ActivityKind;
}

export interface ActivityFeedProps {
  items: ActivityFeedItem[];
  /** Number of items visible at once (default: 3). */
  visibleCount?: number;
  /** Auto-rotation interval in ms (default: 4200). Set 0 to disable. */
  rotateMs?: number;
  /** Delay before the first rotation fires, for stagger between sibling feeds (ms). */
  staggerMs?: number;
  /** Override dot colors per kind. Merged over the built-in palette. */
  kindColors?: Record<string, string>;
  className?: string;
  /** On the feed's root (since 2.515.10), which also carries `data-activity-feed`. */
  'data-testid'?: string;
  /** Set by `WrappedActivityPanel`: `ticker` or `history` (`data-activity-mode`). */
  'data-activity-mode'?: string;
}

// ─── Default dot palette ──────────────────────────────────────────────────────

const DEFAULT_KIND_COLORS: Record<string, string> = {
  task:     'var(--color-success)',
  pr:       'var(--color-primary)',
  decision: 'var(--color-warning)',
  comment:  'var(--color-text-tertiary)',
  status:   'var(--color-info)',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0] ?? '';
  const lastInit = parts[1]?.[0] ?? '';
  return lastInit ? `${first} ${lastInit}.` : first;
}

// ─── ActivityRow ──────────────────────────────────────────────────────────────

interface ActivityRowProps {
  item: ActivityFeedItem;
  dotColor: string;
}

function ActivityRow({ item, dotColor }: ActivityRowProps) {
  return (
    <div
      className="uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0"
    >
      {/* Type dot — color is dynamic per-entity, keep inline */}
      <span
        className="w-[5px] h-[5px] rounded-full shrink-0"
        style={{ background: dotColor }}
      />

      {/* Mini avatar */}
      <Avatar name={item.actor} size={17} />

      {/* "Alex C. merged" */}
      <span className="text-xs text-text-primary font-medium shrink-0">
        {shortName(item.actor)}
      </span>
      {/* A line that is one sentence (`action: ''`) has no verb to draw. */}
      {item.action !== '' && <span className="text-xs text-text-tertiary shrink-0">{item.action}</span>}

      {/* Ticket badge */}
      {item.ticketId && (
        <span className="text-[10px] font-bold font-mono text-primary-fg bg-primary-bg border border-primary-border rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap">
          {item.ticketId}
        </span>
      )}

      {/* Subject */}
      {/* Truncation is the LAYOUT's job, not this component's.
          
          A hard `slice(0, 28)` cut every subject to the same length whatever
          the row was given: fine in the sidebar panel it was written for, and
          absurd on the stream ticker over a 1052px video, where a viewer read
          "Welcome everyone, thanks for…" — a third of a short sentence, in a
          box with room to spare. The span already carries
          overflow-hidden + text-ellipsis + min-w-0, so CSS truncates to
          whatever width each caller actually has, and `title` still holds the
          whole thing. */}
      <span
        className="text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0"
        title={item.subject}
      >
        {item.subject}
      </span>

      {/* Timestamp */}
      {item.timeLabel && (
        <span className="text-xs text-text-secondary shrink-0 whitespace-nowrap">
          {item.timeLabel}
        </span>
      )}
    </div>
  );
}

// ─── ActivityFeed ─────────────────────────────────────────────────────────────

export function ActivityFeed({
  items,
  visibleCount = 3,
  rotateMs = 4200,
  staggerMs = 0,
  kindColors,
  className,
  'data-testid': testId,
  'data-activity-mode': mode,
}: ActivityFeedProps) {
  const palette = { ...DEFAULT_KIND_COLORS, ...kindColors };

  const [visible, setVisible] = useState<ActivityFeedItem[]>(() =>
    items.slice(0, visibleCount),
  );
  const poolIdxRef = useRef(visibleCount);

  // Reset when items list changes.
  useEffect(() => {
    setVisible(items.slice(0, visibleCount));
    poolIdxRef.current = visibleCount;
  }, [items, visibleCount]);

  // Rotation effect.
  useEffect(() => {
    if (!rotateMs || items.length <= visibleCount) return;
    let interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        if (!items.length) return;
        const nextItem = items[poolIdxRef.current % items.length];
        if (!nextItem) return;
        poolIdxRef.current = (poolIdxRef.current + 1) % items.length;
        setVisible(prev => {
          // Carry the whole previous window forward, not a hard-coded
          // `prev[0]`/`prev[1]`. The two-slot carry capped every rotation at 3
          // rows, so a feed rendered with `visibleCount={5}` showed 5 rows on
          // mount and permanently shrank to 3 on the first tick — two rows just
          // vanished, and nothing in the API said 3 was a ceiling.
          const next: ActivityFeedItem[] = [nextItem, ...prev];
          return next.slice(0, visibleCount);
        });
      }, rotateMs);
    }, staggerMs);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [items, visibleCount, rotateMs, staggerMs]);

  if (visible.length === 0) {
    return (
      <div className={cn('flex-1 flex items-center', className)} data-activity-feed="" data-activity-mode={mode} data-testid={testId}>
        <span className="text-xs text-text-secondary">No recent activity</span>
      </div>
    );
  }

  return (
    <div className={cn('flex-1 flex flex-col overflow-hidden', className)} data-activity-feed="" data-activity-mode={mode} data-testid={testId}>
      {visible.map((item) => (
        <ActivityRow
          key={item.id}
          item={item}
          dotColor={palette[item.kind ?? ''] ?? 'var(--color-text-tertiary)'}
        />
      ))}
    </div>
  );
}

export default ActivityFeed;
