// BreakoutRoomBanner — what a participant sees while in a breakout room:
// which room, the time left, the organizer's latest announcement, and a way
// back to the main meeting (when the organizer allows it).

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { T } from '../shared/Text';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { CloseIcon } from '../ui/Icons';
import { formatCallElapsed } from './CallDock';
import { MeetingRoomsIcon } from './MeetingIcons';

export interface BreakoutRoomBannerProps {
  roomName: string;
  /** ISO end of the breakout timer, or null for none. */
  endsAt?: string | null;
  /** Server clock minus this device's, ms (`useMeeting().clockOffsetMs`). Default 0. */
  clockOffsetMs?: number;
  /**
   * The organizer closed the rooms and `endsAt` is the end of the closing
   * grace (realtime-modules 0.124 `breakout.closing`). The countdown reads
   * "Room closes in 00:30" and is announced once to screen readers.
   */
  closing?: boolean;
  announcement?: { message: string; fromDisplayName: string } | null;
  onDismissAnnouncement?: () => void;
  /** Omit when returning is not allowed. */
  onReturnToMain?: () => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * Milliseconds until `endsAt`, ticking each second. `clockOffsetMs` is the
 * server clock minus this device's (realtime-modules 0.129 `useMeeting`):
 * deadlines are server time, so a device whose clock is off counts from the
 * corrected now (2.469.0).
 */
export function useCountdown(endsAt: string | null | undefined, clockOffsetMs = 0): number | null {
  const end = endsAt ? Date.parse(endsAt) : NaN;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!Number.isFinite(end)) return undefined;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [end]);
  return Number.isFinite(end) ? Math.max(0, end - (now + clockOffsetMs)) : null;
}

export function BreakoutRoomBanner({
  roomName,
  endsAt,
  clockOffsetMs = 0,
  closing = false,
  announcement,
  onDismissAnnouncement,
  onReturnToMain,
  className,
  'data-testid': testId = 'breakout-banner',
}: BreakoutRoomBannerProps) {
  const left = useCountdown(endsAt, clockOffsetMs);
  const urgent = left !== null && (closing || left <= 60_000);
  return (
    <div
      role="region"
      aria-label={`Breakout room: ${roomName}`}
      data-testid={testId}
      className={cn('flex flex-col gap-1 border-b border-border bg-info-bg px-4 py-2 text-info-fg', className)}
    >
      {/* Wraps on a phone: the Return button drops under the room name rather than squeezing it. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <MeetingRoomsIcon size={18} className="shrink-0" />
        <T size="sm" weight="semibold" tone="inherit" className="min-w-0 truncate">You're in {roomName}</T>
        {left !== null && (
          <T
            size="sm"
            tone="inherit"
            tabular
            data-testid={`${testId}-countdown`}
            data-urgent={urgent ? 'true' : undefined}
            data-closing={closing ? 'true' : undefined}
            className={cn(urgent && 'font-semibold text-danger')}
          >
            {closing ? `Room closes in ${formatCallElapsed(left)}` : `${formatCallElapsed(left)} left`}
          </T>
        )}
        <span role="status" aria-live="polite" className="sr-only" data-testid={`${testId}-closing-status`}>
          {closing ? 'The organizer is closing the breakout rooms. You will return to the main meeting shortly.' : ''}
        </span>
        <span className="flex-1" />
        {onReturnToMain && (
          <Button variant="secondary" size="sm" onClick={onReturnToMain} data-testid={`${testId}-return`}>
            Return to main meeting
          </Button>
        )}
      </div>
      {announcement && (
        <div className="flex items-start gap-2" data-testid={`${testId}-announcement`} role="status" aria-live="polite">
          <T size="sm" tone="inherit" className="block min-w-0 flex-1">
            <strong className="font-semibold">{announcement.fromDisplayName}:</strong> {announcement.message}
          </T>
          {onDismissAnnouncement && (
            <IconButton aria-label="Dismiss announcement" variant="ghost" size="sm" icon={<CloseIcon />} onClick={onDismissAnnouncement} data-testid={`${testId}-announcement-dismiss`} />
          )}
        </div>
      )}
    </div>
  );
}
