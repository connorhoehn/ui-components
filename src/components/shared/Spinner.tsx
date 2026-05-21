// Spinner — rotating loading indicator.
//
// Uses Tailwind's built-in `animate-spin` (available globally via styles.css).
// The visible arc is the top border; the rest of the ring is transparent.

import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: 'w-[14px] h-[14px]',
  md: 'w-[20px] h-[20px]',
  lg: 'w-[28px] h-[28px]',
};

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Arc color. Defaults to var(--color-primary). */
  color?: string;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function Spinner({
  size = 'md',
  color,
  className,
  style,
  'aria-label': ariaLabel = 'Loading',
  'data-testid': testId,
}: SpinnerProps) {
  const arcColor = color ?? 'var(--color-primary)';
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      data-testid={testId}
      className={cn(
        'inline-block rounded-full border-2 border-transparent animate-spin',
        SIZE_CLASSES[size],
        className,
      )}
      style={{ borderTopColor: arcColor, ...style }}
    />
  );
}

export default Spinner;
