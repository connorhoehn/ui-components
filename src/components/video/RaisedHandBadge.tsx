// RaisedHandBadge — the hand a participant has raised, with their place in
// the queue when the host tracks one ("✋ 2"). Sits in a tile's name chip, a
// roster row, or a breakout member list. Renders nothing when not raised.

import { cn } from '../../lib/cn';
import { T } from '../shared/Text';
import { MeetingHandIcon } from './MeetingIcons';

export interface RaisedHandBadgeProps {
  /** `true`, or the 1-based queue position. Falsy renders nothing. */
  raised: boolean | number | null | undefined;
  /** `chip` (default): warning pill for light surfaces. `overlay`: for a dark video tile. */
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
        'inline-flex shrink-0 items-center gap-0.5 rounded-full leading-none',
        size === 'sm' ? 'h-4 px-1' : 'h-5 px-1.5',
        // Ink, not warning-fg: amber text on its own tint or white on amber is ~3:1 (2.473.0).
        // The tile tone uses the call-chrome ink, dark in both themes, on solid amber.
        tone === 'chip' ? 'bg-warning-bg text-text-primary [&_svg]:text-warning' : 'bg-warning text-call-chrome',
        className,
      )}
    >
      <MeetingHandIcon size={size === 'sm' ? 11 : 13} />
      {typeof raised === 'number' && <T as="span" size="xs" weight="semibold" tone="inherit" tabular className="leading-none">{raised}</T>}
    </span>
  );
}
