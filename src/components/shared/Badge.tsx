// frontend/src/components/shared/Badge.tsx
//
// Badge — small visual indicator. Three variants:
//   - count: numeric pill (auto-clamps to "99+")
//   - dot:   solid colored circle
//   - pulse: solid dot with an animated pulse ring (use for live/active items)
//
// Colors map to a small semantic palette. Tailwind classes only.

import { cn } from '../../lib/cn';
import { TONE_SOFT, TONE_SOLID_BG, type Tone } from './tones';

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

// Badge maps its four colours onto the library tone scale. It used to carry
// its own palette (emerald/rose/blue/slate) which disagreed with Chip's
// (green/red/blue/slate), so the same semantic state rendered in two different
// hues depending on the component. See ./tones.ts.
const BADGE_TONE: Record<BadgeColor, Tone> = {
  accent: 'info',
  success: 'success',
  danger: 'danger',
  muted: 'neutral',
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
          TONE_SOFT[BADGE_TONE[color]],
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
          TONE_SOLID_BG[BADGE_TONE[color]],
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
          cn(TONE_SOLID_BG[BADGE_TONE[color]], 'opacity-60'),
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'relative inline-block w-2.5 h-2.5 rounded-full',
          TONE_SOLID_BG[BADGE_TONE[color]],
        )}
      />
    </span>
  );
}

export default Badge;
