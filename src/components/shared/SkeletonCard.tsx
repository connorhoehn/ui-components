// frontend/src/components/shared/SkeletonCard.tsx
//
// Shimmer placeholder used while content loads. Uses the skeleton-shimmer
// keyframe defined in src/styles.css.

import { cn } from '../../lib/cn';

export interface SkeletonCardProps {
  width?: number | string;
  height?: number | string;
  /**
   * Corner shape. 'full' makes a circle/pill — the avatar-placeholder case
   * that used to force pages to hand-roll their own skeleton rect.
   * @default 'lg'
   */
  rounded?: 'md' | 'lg' | 'full';
}

const ROUNDED: Record<NonNullable<SkeletonCardProps['rounded']>, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

function SkeletonCard({ width = '100%', height = 64, rounded = 'lg' }: SkeletonCardProps) {
  return (
    <div
      data-testid="skeleton-card"
      className={cn(
        ROUNDED[rounded],
        'bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover',
        'bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]',
      )}
      style={{ width, height }}
    />
  );
}

export default SkeletonCard;
