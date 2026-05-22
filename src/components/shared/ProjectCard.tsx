// ProjectCard — card surface for a project summary.
//
// Renders a button-style card with a color-coded top accent border, a title/id
// header, an embedded ActivityFeed ticker, and a footer with AvatarGroup +
// presence dot. Entirely data-prop driven — no domain types.

import type { CSSProperties } from 'react';
import { AvatarGroup } from './Avatar';
import type { ActivityFeedItem } from './ActivityFeed';
import { ActivityFeed } from './ActivityFeed';

// ─── Status color palette (generic) ──────────────────────────────────────────

export interface StatusColors {
  bg: string;
  border: string;
  text: string;
  accent: string;
}

const DEFAULT_STATUS_COLORS: Record<string, StatusColors> = {
  active:      { bg: '#f0fdf4', border: '#86efac', text: '#166534', accent: '#16a34a' },
  in_progress: { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af', accent: '#3b82f6' },
  completed:   { bg: '#f0fdf4', border: '#86efac', text: '#166534', accent: '#16a34a' },
  archived:    { bg: '#f9fafb', border: '#d1d5db', text: '#6b7280', accent: '#9ca3af' },
  planning:    { bg: '#fefce8', border: '#fde047', text: '#713f12', accent: '#eab308' },
  paused:      { bg: '#fff7ed', border: '#fdba74', text: '#9a3412', accent: '#f97316' },
};

const FALLBACK_COLORS: StatusColors = {
  bg: '#f3f4f6', border: '#d1d5db', text: '#374151', accent: '#6b7280',
};

// ─── StatusChip ───────────────────────────────────────────────────────────────

interface StatusChipProps {
  status: string;
  colors: StatusColors;
}

function StatusChip({ status, colors }: StatusChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 9px',
        borderRadius: 9999,
        fontSize: 10,
        fontWeight: 700,
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: colors.accent }} />
      {status.replace(/_/g, ' ')}
    </span>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ProjectCardProps {
  /** Primary display name. */
  name: string;
  /** Optional monospace slug shown below the name (e.g. "proj-k8s"). */
  id?: string;
  /**
   * Status key used for accent color. Built-in keys: active, in_progress,
   * completed, archived, planning, paused. Supply `statusColors` to extend.
   */
  status?: string;
  /** Override or extend the built-in status → color map. */
  statusColors?: Record<string, StatusColors>;
  /** Names used for AvatarGroup in the footer. */
  contributorNames?: string[];
  /** Total contributor count — used to compute the "+N more" overflow label. */
  contributorCount?: number;
  /** Activity ticker items. */
  activityItems?: ActivityFeedItem[];
  /**
   * Color of the presence dot in the footer (e.g. '#22c55e' for green).
   * Default: '#d1d5db' (grey = unknown).
   */
  presenceDotColor?: string;
  /** Human-readable "last active" label shown next to the presence dot. */
  activityLabel?: string;
  /** Index used to stagger the activity rotation offset. */
  cardIndex?: number;
  /** Click handler. */
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  /** Minimum card height (default: 190). */
  minHeight?: number;
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

export function ProjectCard({
  name,
  id,
  status,
  statusColors,
  contributorNames = [],
  contributorCount,
  activityItems = [],
  presenceDotColor = '#d1d5db',
  activityLabel = '',
  cardIndex = 0,
  onClick,
  className,
  style,
  minHeight = 190,
}: ProjectCardProps) {
  const palette = { ...DEFAULT_STATUS_COLORS, ...statusColors };
  const rawStatus = (status ?? 'unknown').toLowerCase().replace(/ /g, '_');
  const colors = palette[rawStatus] ?? FALLBACK_COLORS;

  const overflow =
    contributorCount !== undefined
      ? Math.max(0, contributorCount - contributorNames.length)
      : 0;

  // Stagger: 8 offsets × 525 ms spread across one rotation cycle.
  const staggerMs = (cardIndex % 8) * 525;

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        background: '#fff',
        border: '1.5px solid #e5e7eb',
        borderTop: `3px solid ${colors.accent}`,
        borderRadius: 10,
        padding: '14px 16px 12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'box-shadow 0.15s, transform 0.1s',
        minHeight,
        width: '100%',
        textAlign: 'left',
        font: 'inherit',
        color: 'inherit',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        el.style.transform = 'translateY(-1px)';
        el.style.borderColor = colors.border;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.transform = 'none';
        el.style.borderColor = '#e5e7eb';
      }}
    >
      {/* Title + status chip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: '0 0 3px',
              fontSize: 13.5,
              fontWeight: 700,
              color: '#111827',
              lineHeight: 1.35,
            }}
          >
            {name}
          </h3>
          {id && (
            <span
              style={{
                fontSize: 10,
                fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
                color: '#9ca3af',
                letterSpacing: '0.02em',
              }}
            >
              {id}
            </span>
          )}
        </div>
        {status && <StatusChip status={status} colors={colors} />}
      </div>

      {/* Activity ticker */}
      <ActivityFeed items={activityItems} staggerMs={staggerMs} />

      {/* Footer: avatars + presence */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: '1px solid #f3f4f6',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {contributorNames.length > 0 ? (
            <AvatarGroup names={contributorNames} maxVisible={5} size={24} />
          ) : (
            <span style={{ fontSize: 12, color: '#9ca3af' }}>
              <strong style={{ color: '#374151' }}>{contributorCount ?? 0}</strong> contributors
            </span>
          )}
          {contributorNames.length > 0 && overflow > 0 && (
            <span style={{ fontSize: 11, color: '#9ca3af' }}>+{overflow} more</span>
          )}
        </div>

        {activityLabel && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: presenceDotColor,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' }}>
              {activityLabel}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

export default ProjectCard;
