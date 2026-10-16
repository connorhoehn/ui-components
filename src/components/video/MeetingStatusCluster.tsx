// MeetingStatusCluster — the left end of the meeting bar: meeting options
// (shield), the recording chip, and the elapsed time. Owns its one-second
// tick when given `startedAt`; a host that already counts passes `elapsedMs`.

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { T } from '../shared/Text';
import { IconButton } from '../ui/IconButton';
import { formatCallElapsed } from './CallDock';
import { MeetingShieldIcon } from './MeetingIcons';
import { RecordingChip, type RecordingChipState } from './RecordingChip';

export interface MeetingStatusClusterProps {
  /** Meeting title, when the bar carries it (the reference puts it in the window title). */
  title?: ReactNode;
  recording?: RecordingChipState;
  /** Epoch ms or ISO; the cluster ticks once a second. */
  startedAt?: number | string | null;
  /** Controlled elapsed time; wins over `startedAt`. */
  elapsedMs?: number | null;
  /** Shows the shield button (meeting options / lobby). */
  onOpenOptions?: () => void;
  optionsLabel?: string;
  className?: string;
  'data-testid'?: string;
}

function useTick(startedAt: number | string | null | undefined, enabled: boolean): number | null {
  const start = startedAt === null || startedAt === undefined ? null : typeof startedAt === 'number' ? startedAt : Date.parse(startedAt);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!enabled || start === null || !Number.isFinite(start)) return undefined;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [enabled, start]);
  return start === null || !Number.isFinite(start) ? null : Math.max(0, now - start);
}

export function MeetingStatusCluster({
  title,
  recording,
  startedAt,
  elapsedMs,
  onOpenOptions,
  optionsLabel = 'Meeting options',
  className,
  'data-testid': testId = 'meeting-status',
}: MeetingStatusClusterProps) {
  const ticked = useTick(startedAt, elapsedMs === undefined);
  const elapsed = elapsedMs !== undefined ? elapsedMs : ticked;
  return (
    <div className={cn('flex min-w-0 items-center gap-3', className)} data-testid={testId}>
      {onOpenOptions && (
        <IconButton aria-label={optionsLabel} title={optionsLabel} variant="ghost" size="sm" onClick={onOpenOptions} data-testid={`${testId}-options`}>
          <MeetingShieldIcon size={18} />
        </IconButton>
      )}
      {recording && <RecordingChip armed={recording.armed} active={recording.active} data-testid={`${testId}-recording`} />}
      {elapsed !== null && (
        <T size="base" tone="primary" tabular data-testid={`${testId}-elapsed`} aria-label={`Meeting time ${formatCallElapsed(elapsed)}`}>
          {formatCallElapsed(elapsed)}
        </T>
      )}
      {title && <T size="sm" weight="semibold" className="truncate">{title}</T>}
    </div>
  );
}
