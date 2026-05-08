import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export interface ViewerCountProps {
  count: number;
  style?: CSSProperties;
}

export function ViewerCount({ count, style }: ViewerCountProps) {
  const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : `${count}`;

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/70 text-white text-xs font-medium')} style={style}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span>{formatted} watching</span>
    </div>
  );
}
