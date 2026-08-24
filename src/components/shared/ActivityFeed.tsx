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

const ROW_OPACITIES = [1, 0.5, 0.18] as const;

interface ActivityRowProps {
  item: ActivityFeedItem;
  opacity: number;
  dotColor: string;
}

function ActivityRow({ item, opacity, dotColor }: ActivityRowProps) {
  const truncSubject =
    item.subject.length > 30 ? item.subject.slice(0, 28) + '…' : item.subject;

  return (
    <div
      className="uc-activity-row flex items-center gap-1.5 py-[3.5px] overflow-hidden min-w-0 transition-[opacity] duration-[380ms] ease-in-out"
      style={{ opacity }}
    >
      {/* Type dot — color is dynamic per-entity, keep inline */}
      <span
        className="w-[5px] h-[5px] rounded-full shrink-0"
        style={{ background: dotColor }}
      />

      {/* Mini avatar */}
      <Avatar name={item.actor} size={17} />

      {/* "Alex C. merged" */}
      <span className="text-[11px] text-text-primary font-medium shrink-0">
        {shortName(item.actor)}
      </span>
      <span className="text-[11px] text-text-tertiary shrink-0">{item.action}</span>

      {/* Ticket badge */}
      {item.ticketId && (
        <span className="text-[10px] font-bold font-mono text-primary-fg bg-primary-bg border border-primary-border rounded-[3px] px-[5px] py-px shrink-0 tracking-[0.01em] whitespace-nowrap">
          {item.ticketId}
        </span>
      )}

      {/* Subject */}
      <span
        className="text-[11px] text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0"
        title={item.subject}
      >
        {truncSubject}
      </span>

      {/* Timestamp */}
      {item.timeLabel && (
        <span className="text-[10px] text-code-subtle shrink-0 whitespace-nowrap">
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
      <div className={cn('flex-1 flex items-center', className)}>
        <span className="text-[11px] text-border">No recent activity</span>
      </div>
    );
  }

  return (
    <div className={cn('flex-1 flex flex-col overflow-hidden', className)}>
      {visible.map((item, i) => (
        <ActivityRow
          key={item.id}
          item={item}
          opacity={ROW_OPACITIES[i] ?? 0.1}
          dotColor={palette[item.kind ?? ''] ?? 'var(--color-text-tertiary)'}
        />
      ))}
    </div>
  );
}

export default ActivityFeed;
