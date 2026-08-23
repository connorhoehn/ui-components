import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';

export interface NetworkQualityBadgeProps {
  quality: NetworkQuality;
  /**
   * Positioning / spacing classes from the caller. Prefer this over `style`:
   * the badge is normally docked into a corner of the video stage, and with
   * no className seam callers had to reach for an inline style (banned in
   * demos and stories). Composed through `cn()`, so a caller class wins.
   */
  className?: string;
  /** @deprecated Use `className`. Kept so existing callers keep compiling. */
  style?: CSSProperties;
}

const colors: Record<NetworkQuality, string> = {
  good: 'var(--color-success)',
  medium: 'var(--color-warning)',
  poor: 'var(--color-caution)',
  dead: 'var(--color-danger)',
};

const textColorClasses: Record<NetworkQuality, string> = {
  good: 'text-success-fg',
  medium: 'text-warning-fg',
  poor: 'text-caution-fg',
  dead: 'text-danger-fg',
};

const labels: Record<NetworkQuality, string> = {
  good: 'Good',
  medium: 'Fair',
  poor: 'Poor',
  dead: 'No Connection',
};

export function NetworkQualityBadge({ quality, className, style }: NetworkQualityBadgeProps) {
  const color = colors[quality];
  const bars = quality === 'good' ? 4 : quality === 'medium' ? 3 : quality === 'poor' ? 2 : 1;

  return (
    <div className={cn('inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-black/60 text-white text-[11px] font-medium', className)} style={style}>
      <svg width="14" height="12" viewBox="0 0 14 12">
        {[0, 1, 2, 3].map(i => (
          <rect
            key={i}
            x={i * 4}
            y={12 - (i + 1) * 3}
            width="3"
            height={(i + 1) * 3}
            rx="0.5"
            fill={i < bars ? color : 'rgba(255,255,255,0.2)'}
          />
        ))}
      </svg>
      <span className={textColorClasses[quality]}>{labels[quality]}</span>
    </div>
  );
}
