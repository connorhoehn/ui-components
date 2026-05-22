// ActivityFeed — rotating ticker of recent activity items.
//
// Shows up to `visibleCount` items at a time, cycling through the full
// `items` array on an interval. Each item displays a colored type-dot,
// a mini Avatar, actor name, action verb, a monospace badge, subject, and timestamp.

import { useEffect, useRef, useState } from 'react';
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
  task:     '#10b981',
  pr:       '#6366f1',
  decision: '#f59e0b',
  comment:  '#94a3b8',
  status:   '#3b82f6',
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
      className="uc-activity-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '3.5px 0',
        opacity,
        transition: 'opacity 0.38s ease',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      {/* Type dot */}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: dotColor,
          flexShrink: 0,
        }}
      />

      {/* Mini avatar */}
      <Avatar name={item.actor} size={17} />

      {/* "Alex C. merged" */}
      <span style={{ fontSize: 11, color: '#374151', fontWeight: 500, flexShrink: 0 }}>
        {shortName(item.actor)}
      </span>
      <span style={{ fontSize: 11, color: '#9ca3af', flexShrink: 0 }}>{item.action}</span>

      {/* Ticket badge */}
      {item.ticketId && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
            color: '#4f46e5',
            background: '#eef2ff',
            border: '1px solid #c7d2fe',
            borderRadius: 3,
            padding: '1px 5px',
            flexShrink: 0,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {item.ticketId}
        </span>
      )}

      {/* Subject */}
      <span
        style={{
          fontSize: 11,
          color: '#6b7280',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          minWidth: 0,
        }}
        title={item.subject}
      >
        {truncSubject}
      </span>

      {/* Timestamp */}
      {item.timeLabel && (
        <span style={{ fontSize: 10, color: '#d1d5db', flexShrink: 0, whiteSpace: 'nowrap' }}>
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
          const next: ActivityFeedItem[] = [nextItem];
          if (prev[0]) next.push(prev[0]);
          if (prev[1]) next.push(prev[1]);
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
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }} className={className}>
        <span style={{ fontSize: 11, color: '#e5e7eb' }}>No recent activity</span>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}
    >
      {visible.map((item, i) => (
        <ActivityRow
          key={item.id}
          item={item}
          opacity={ROW_OPACITIES[i] ?? 0.1}
          dotColor={palette[item.kind ?? ''] ?? '#94a3b8'}
        />
      ))}
    </div>
  );
}

export default ActivityFeed;
