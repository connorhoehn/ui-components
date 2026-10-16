// RaisedHandBadge — the hand a participant has raised, with their place in
// the queue when the host tracks one ("✋ 2"). Sits in a tile's name chip, a
// roster row, or a breakout member list. Renders nothing when not raised.

import { cn } from '../../lib/cn';
import { MeetingHandIcon } from './MeetingIcons';

export interface RaisedHandBadgeProps {
  /** `true`, or the 1-based queue position. Falsy renders nothing. */
  raised: boolean | number | null | undefined;
  /** `chip` (default): accent pill for light surfaces. `overlay`: for a dark video tile. */
  tone?: 'chip' | 'overlay';
  size?: 'sm' | 'md';
  className?: string;
  'data-testid'?: string;
}

export function raisedHandLabel(raised: boolean | number | null | undefined): string | null {
  if (!raised) return null;
  return typeof raised === 'number' ? `Hand raised, ${ordinal(raised)} in line` : 'Hand raised';
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

export function RaisedHandBadge({ raised, tone = 'chip', size = 'sm', className, 'data-testid': testId = 'raised-hand-badge' }: RaisedHandBadgeProps) {
  const label = raisedHandLabel(raised);
  if (!label) return null;
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      data-testid={testId}
      data-hand-position={typeof raised === 'number' ? raised : undefined}
      className={cn(
        'inline-flex shrink-0 items-center gap-0.5 rounded-full font-semibold leading-none tabular-nums',
        size === 'sm' ? 'h-4 px-1 text-[10px]' : 'h-5 px-1.5 text-xs',
        tone === 'chip' ? 'bg-warning-bg text-warning-fg' : 'bg-warning text-white',
        className,
      )}
    >
      <MeetingHandIcon size={size === 'sm' ? 11 : 13} />
      {typeof raised === 'number' && <span>{raised}</span>}
    </span>
  );
}
