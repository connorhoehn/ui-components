// src/components/pipelines/nodes/NodeCard.tsx
//
// Thin composite: Card + StatusPill header for use in demo/showcase contexts
// where a full React-Flow canvas is not present. NOT a replacement for
// BaseNode.tsx — that is the React Flow node wrapper and handles handles,
// ports, and canvas interaction. NodeCard is for static renderings, palettes,
// and canvas-mock demos.

import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Card } from '../../ui/Card';
import { StatusPill, type StatusPillState } from '../../shared/StatusPill';

export interface NodeCardProps {
  /** Emoji or short string icon for the node type. */
  icon: string;
  label: string;
  subtitle?: string;
  /** Maps to StatusPill state — drives the pill and border accent. */
  status?: StatusPillState;
  /** Status label shown in the pill. Defaults to a capitalized form of status. */
  statusLabel?: string;
  /** Body content slot (preview text, stats, etc.). */
  body?: ReactNode;
  /** Whether the card appears selected (elevated shadow). */
  selected?: boolean;
  /** Accent color for the left border strip (Tailwind bg-* class). */
  accentClass?: string;
  className?: string;
  onClick?: () => void;
}

const STATUS_BORDER: Record<StatusPillState, string> = {
  success:  'border-success',
  error:    'border-danger',
  warning:  'border-warning',
  info:     'border-info',
  neutral:  'border-border-emphasis',
  pending:  'border-accent',
};

export function NodeCard({
  icon,
  label,
  subtitle,
  status = 'neutral',
  statusLabel,
  body,
  selected = false,
  accentClass,
  className,
  onClick,
}: NodeCardProps) {
  const pillLabel = statusLabel ?? (status.charAt(0).toUpperCase() + status.slice(1));
  const borderClass = STATUS_BORDER[status];

  return (
    <Card
      className={cn(
        // `onClick` is optional — the pointer cursor and hover lift only
        // mean something when the caller wired one.
        'relative w-40 transition-shadow duration-200 border-2',
        onClick && 'cursor-pointer',
        borderClass,
        selected && 'shadow-[0_0_0_3px_rgba(99,102,241,0.25)]',
        !selected && 'shadow-sm',
        !selected && onClick && 'hover:shadow-md',
        className,
      )}
      onClick={onClick}
    >
      {/* Left accent strip */}
      {accentClass && (
        <div className={cn('absolute left-0 top-0 bottom-0 w-1 rounded-l-lg', accentClass)} />
      )}

      {/* Header */}
      <div className={cn('flex items-center justify-between gap-2 px-2.5 py-2 border-b border-border-subtle', accentClass && 'pl-3.5')}>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm leading-none shrink-0" aria-hidden="true">{icon}</span>
          <span className="text-xs font-semibold text-text-primary truncate">{label}</span>
        </div>
        <StatusPill state={status} label={pillLabel} size="sm" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="px-2.5 pt-1.5 pb-0 text-[11px] text-neutral truncate">
          {subtitle}
        </div>
      )}

      {/* Body slot */}
      {body && (
        <div className="px-2.5 pb-2 pt-1 text-xs text-text-secondary">
          {body}
        </div>
      )}
    </Card>
  );
}

export default NodeCard;
