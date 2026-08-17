// frontend/src/components/shared/SkeletonCard.tsx
//
// Shimmer placeholder used while content loads. Uses the skeleton-shimmer
// keyframe defined in src/styles.css.

import { cn } from '../../lib/cn';

export interface SkeletonCardProps {
  width?: number | string;
  height?: number | string;
}

function SkeletonCard({ width = '100%', height = 64 }: SkeletonCardProps) {
  return (
    <div
      data-testid="skeleton-card"
      className={cn(
        'rounded-lg bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover',
        'bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]',
      )}
      style={{ width, height }}
    />
  );
}

export default SkeletonCard;
