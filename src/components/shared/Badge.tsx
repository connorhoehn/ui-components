// frontend/src/components/shared/Badge.tsx
//
// Badge — small visual indicator. Three variants:
//   - count: numeric pill (auto-clamps to "99+")
//   - dot:   solid colored circle
//   - pulse: solid dot with an animated pulse ring (use for live/active items)
//
// Colors map to a small semantic palette. Tailwind classes only.

import { cn } from '../../lib/cn';

export type BadgeVariant = 'count' | 'dot' | 'pulse';
export type BadgeColor = 'accent' | 'success' | 'danger' | 'muted';

export interface BadgeProps {
  variant: BadgeVariant;
  /** Required for variant="count". Ignored otherwise. */
  value?: number;
  color?: BadgeColor;
  /** Optional override label for screen readers. */
  'aria-label'?: string;
  className?: string;
  /** Optional testid. */
  'data-testid'?: string;
}

// Background swatches for the count pill.
const COUNT_BG: Record<BadgeColor, string> = {
  accent: 'bg-blue-100 text-blue-700',
  success: 'bg-emerald-100 text-emerald-700',
  danger: 'bg-rose-100 text-rose-700',
  muted: 'bg-slate-200 text-slate-600',
};

// Solid dot colors for variant="dot" / "pulse".
const DOT_BG: Record<BadgeColor, string> = {
  accent: 'bg-blue-500',
  success: 'bg-emerald-500',
  danger: 'bg-rose-500',
  muted: 'bg-slate-400',
};

// Pulse-ring tint (subtle outer halo) for variant="pulse".
const PULSE_RING: Record<BadgeColor, string> = {
  accent: 'bg-blue-400/60',
  success: 'bg-emerald-400/60',
  danger: 'bg-rose-400/60',
  muted: 'bg-slate-400/60',
};

function formatCount(value: number | undefined): string {
  if (value == null || value <= 0) return '0';
  if (value > 99) return '99+';
  return String(Math.trunc(value));
}

export function Badge({
  variant,
  value,
  color = 'accent',
  'aria-label': ariaLabel,
  className,
  'data-testid': testId,
}: BadgeProps) {
  if (variant === 'count') {
    const label = formatCount(value);
    return (
      <span
        data-testid={testId}
        aria-label={ariaLabel ?? `${label} items`}
        className={cn(
          'inline-flex items-center justify-center min-w-[18px] h-[18px]',
          'px-1.5 rounded-full text-[10px] font-semibold leading-none select-none',
          COUNT_BG[color],
          className,
        )}
      >
        {label}
      </span>
    );
  }

  if (variant === 'dot') {
    return (
      <span
        data-testid={testId}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        className={cn(
          'inline-block w-2 h-2 rounded-full shrink-0',
          DOT_BG[color],
          className,
        )}
      />
    );
  }

  // variant === 'pulse'
  return (
    <span
      data-testid={testId}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      className={cn('relative inline-flex w-2.5 h-2.5 shrink-0', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 rounded-full animate-ping',
          PULSE_RING[color],
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'relative inline-block w-2.5 h-2.5 rounded-full',
          DOT_BG[color],
        )}
      />
    </span>
  );
}

export default Badge;
