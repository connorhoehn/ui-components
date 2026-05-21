// StatCard — metric display card.
//
// Renders a labeled value tile (e.g. "Active Users · 1,284"). Variants:
//   - accent: tinted primary background + left accent border.
//   - danger: tinted danger background + left danger border.
//   - hint:   tiny italic helper text below the value.
//   - to:     wraps the card in an anchor.
//   - mono:   renders the value in a monospace font (good for counts/IDs).

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  accent?: boolean;
  danger?: boolean;
  hint?: ReactNode;
  to?: string;
  mono?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export function StatCard({
  label,
  value,
  accent = false,
  danger = false,
  hint,
  to,
  mono = false,
  className,
  style,
  'data-testid': testId,
}: StatCardProps) {
  const baseClasses = cn(
    'block rounded-lg border p-3 no-underline transition-colors',
    !accent && !danger && 'bg-[var(--color-surface)] border-[var(--color-border)]',
    accent && 'bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]',
    danger && 'bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]',
    className,
  );

  const content = (
    <>
      <div className="text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
        {label}
      </div>
      <div
        className={cn(
          'mt-1 text-[24px] font-bold leading-tight text-[var(--color-text-primary)]',
          mono && 'font-mono',
        )}
      >
        {value}
      </div>
      {hint != null && (
        <div className="mt-1 text-[11px] italic text-[var(--color-text-tertiary)]">
          {hint}
        </div>
      )}
    </>
  );

  if (to) {
    return (
      <a href={to} data-testid={testId} className={baseClasses} style={style}>
        {content}
      </a>
    );
  }

  return (
    <div data-testid={testId} className={baseClasses} style={style}>
      {content}
    </div>
  );
}

export default StatCard;
