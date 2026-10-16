// BreakoutRoomBanner — what a participant sees while in a breakout room:
// which room, the time left, the organizer's latest announcement, and a way
// back to the main meeting (when the organizer allows it).

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';
import { T } from '../shared/Text';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { formatCallElapsed } from './CallDock';
import { MeetingRoomsIcon } from './MeetingIcons';

export interface BreakoutRoomBannerProps {
  roomName: string;
  /** ISO end of the breakout timer, or null for none. */
  endsAt?: string | null;
  announcement?: { message: string; fromDisplayName: string } | null;
  onDismissAnnouncement?: () => void;
  /** Omit when returning is not allowed. */
  onReturnToMain?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function useCountdown(endsAt: string | null | undefined): number | null {
  const end = endsAt ? Date.parse(endsAt) : NaN;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!Number.isFinite(end)) return undefined;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [end]);
  return Number.isFinite(end) ? Math.max(0, end - now) : null;
}

export function BreakoutRoomBanner({
  roomName,
  endsAt,
  announcement,
  onDismissAnnouncement,
  onReturnToMain,
  className,
  'data-testid': testId = 'breakout-banner',
}: BreakoutRoomBannerProps) {
  const left = useCountdown(endsAt);
  const urgent = left !== null && left <= 60_000;
  return (
    <div
      role="region"
      aria-label={`Breakout room: ${roomName}`}
      data-testid={testId}
      className={cn('flex flex-col gap-1 border-b border-border bg-info-bg px-4 py-2 text-info-fg', className)}
    >
      <div className="flex items-center gap-3">
        <MeetingRoomsIcon size={18} />
        <T size="sm" weight="semibold" tone="inherit" className="min-w-0 truncate">You're in {roomName}</T>
        {left !== null && (
          <T
            size="sm"
            tone="inherit"
            tabular
            data-testid={`${testId}-countdown`}
            data-urgent={urgent ? 'true' : undefined}
            className={cn(urgent && 'font-semibold text-danger')}
          >
            {formatCallElapsed(left)} left
          </T>
        )}
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
            <span className="font-semibold">{announcement.fromDisplayName}:</span> {announcement.message}
          </T>
          {onDismissAnnouncement && (
            <IconButton aria-label="Dismiss announcement" variant="ghost" size="sm" onClick={onDismissAnnouncement} data-testid={`${testId}-announcement-dismiss`}>
              <span aria-hidden className="text-base leading-none">×</span>
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
}
