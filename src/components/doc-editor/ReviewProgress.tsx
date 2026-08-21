// frontend/src/components/doc-editor/ReviewProgress.tsx
//
// Simple progress bar showing section review progress.

import { cn } from '../../lib/cn';

interface ReviewProgressProps {
  current: number;
  total: number;
}

export default function ReviewProgress({ current, total }: ReviewProgressProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={cn('mb-4')}>
      <div className={cn('text-[13px] text-text-secondary mb-1 flex justify-between')}>
        <span>{current} of {total} sections reviewed</span>
        <span>{pct}%</span>
      </div>
      <div className={cn('h-2 bg-surface-emphasis rounded overflow-hidden')}>
        <div
          className={cn('h-full bg-info rounded transition-[width] duration-300 ease-in-out')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
