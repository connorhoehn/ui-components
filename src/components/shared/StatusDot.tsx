// StatusDot — colored status indicator dot, optionally with a label.
//
// Renders just the dot when no label is provided; otherwise renders a flex row
// with the dot followed by a small secondary-text label.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type StatusDotSize = 'xs' | 'sm' | 'md';

const DOT_SIZE: Record<StatusDotSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
};

export interface StatusDotProps {
  /** Dot color. Defaults to var(--color-text-tertiary). */
  color?: string;
  pulse?: boolean;
  size?: StatusDotSize;
  label?: ReactNode;
  className?: string;
  style?: CSSProperties;
  title?: string;
  'data-testid'?: string;
  'aria-label'?: string;
}

export function StatusDot({
  color,
  pulse = false,
  size = 'sm',
  label,
  className,
  style,
  title,
  'data-testid': testId,
  'aria-label': ariaLabel,
}: StatusDotProps) {
  const dotColor = color ?? 'var(--color-text-tertiary)';
  const dot = (
    <span
      aria-hidden={label != null ? true : undefined}
      aria-label={label == null ? ariaLabel : undefined}
      className={cn(
        'inline-block rounded-full shrink-0',
        DOT_SIZE[size],
        pulse && 'animate-pulse',
      )}
      style={{ background: dotColor }}
    />
  );

  if (label == null) {
    return (
      <span
        data-testid={testId}
        title={title}
        className={cn('inline-flex items-center', className)}
        style={style}
      >
        {dot}
      </span>
    );
  }

  return (
    <span
      data-testid={testId}
      title={title}
      aria-label={ariaLabel}
      className={cn('inline-flex items-center', className)}
      style={style}
    >
      {dot}
      <span className="ml-1.5 text-[11px] text-[var(--color-text-secondary)]">
        {label}
      </span>
    </span>
  );
}

export default StatusDot;
