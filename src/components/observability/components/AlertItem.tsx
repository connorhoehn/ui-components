// AlertItem — single alert row used inside <AlertList>.
//
// Renders severity-tinted background, left-border accent, title + description
// + timestamp. Resolved alerts dim themselves with a "Resolved" chip.
// Composes the shared <StatusDot> + <Chip> primitives — no inline styles.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import StatusDot from '../../shared/StatusDot';
import Chip from '../../shared/Chip';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface AlertItemProps {
  severity: AlertSeverity;
  title: ReactNode;
  description?: ReactNode;
  /** Pre-formatted timestamp string (e.g. "10:48:21"). */
  timestamp?: ReactNode;
  /** When true, dims the row and shows a Resolved chip next to the title. */
  resolved?: boolean;
  /** Optional right-aligned action slot (button, menu). */
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const SEVERITY_DOT: Record<AlertSeverity, string> = {
  critical: 'var(--color-danger)',
  warning: 'var(--color-warning)',
  info: 'var(--color-info)',
};

const SEVERITY_BG: Record<AlertSeverity, string> = {
  critical: 'bg-[var(--color-danger-bg)]',
  warning: 'bg-[var(--color-warning-bg)]',
  info: 'bg-[var(--color-info-bg)]',
};

const SEVERITY_BORDER: Record<AlertSeverity, string> = {
  critical: 'border-l-[var(--color-danger)]',
  warning: 'border-l-[var(--color-warning)]',
  info: 'border-l-[var(--color-info)]',
};

export function AlertItem({
  severity,
  title,
  description,
  timestamp,
  resolved = false,
  action,
  className,
  style,
  'data-testid': testId = `alert-${severity}`,
}: AlertItemProps) {
  return (
    <div
      role="listitem"
      data-testid={testId}
      data-resolved={resolved || undefined}
      className={cn(
        'rounded-md px-3 py-2.5 border-l-[3px] transition-opacity duration-300',
        resolved
          ? 'bg-[var(--color-surface-subtle,#f8fafc)] border-l-[var(--color-text-tertiary)] opacity-70'
          : cn(SEVERITY_BG[severity], SEVERITY_BORDER[severity]),
        className,
      )}
      style={style}
    >
      <div className="flex items-center gap-1.5">
        <StatusDot
          size="xs"
          color={resolved ? 'var(--color-text-tertiary)' : SEVERITY_DOT[severity]}
          aria-label={resolved ? 'Resolved' : severity}
        />
        <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">
          {title}
        </span>
        {resolved && (
          <Chip tone="success" size="xs" className="ml-1">
            Resolved
          </Chip>
        )}
        {timestamp != null && (
          <span className="ml-auto text-[10px] text-[var(--color-text-tertiary)]">
            {timestamp}
          </span>
        )}
        {action && <span className="ml-1 shrink-0">{action}</span>}
      </div>
      {description != null && (
        <div className="mt-1 text-[11px] leading-snug text-[var(--color-text-secondary)]">
          {description}
        </div>
      )}
    </div>
  );
}

export default AlertItem;
