// ui-components/src/components/video/AudioLevelMeter.tsx
//
// A microphone's live input level as a row of bar segments — the "Input
// level ▮▮▮▮▮▮▯▯▯▯" in call settings. Unlike `DotMeter` (a quota: neutral
// until nearly spent, then a warning), a level is good when it is high, so
// lit segments are the success colour and nothing turns red. The segments
// are 6 × 14 bars rather than DotMeter's 5px dots because a level is read at
// a glance from across the panel while you speak.

import { cn } from '../../lib/cn';

export interface AudioLevelMeterProps {
  /** 0..1. Values outside the range are clamped. */
  level: number;
  /** Number of segments. Default 10. */
  segments?: number;
  /** Accessible name. Default `Input level`. */
  label?: string;
  /** Dim every segment (microphone off or blocked). */
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function AudioLevelMeter({
  level,
  segments = 10,
  label = 'Input level',
  disabled = false,
  className,
  'data-testid': testId = 'audio-level-meter',
}: AudioLevelMeterProps) {
  const safe = Number.isFinite(level) ? Math.min(1, Math.max(0, level)) : 0;
  const lit = disabled ? 0 : Math.round(safe * segments);
  const percent = Math.round(safe * 100);
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={disabled ? 0 : percent}
      data-testid={testId}
      data-lit={lit}
      className={cn('inline-flex items-center gap-[3px]', className)}
    >
      {Array.from({ length: segments }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            'h-3.5 w-1.5 rounded-[2px] transition-colors duration-75',
            i < lit ? 'bg-success' : 'bg-border',
          )}
        />
      ))}
    </div>
  );
}

export default AudioLevelMeter;
