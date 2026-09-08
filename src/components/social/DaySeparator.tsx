import { cn } from '../../lib/cn';
import { dayLabel, fullDateLabel } from './dayBoundary';

export interface DaySeparatorProps {
    /** ISO timestamp of the first message of the day this separator opens. */
    timestamp: string;
    /** Injectable clock, so "Today" is testable. */
    now?: Date;
    tone?: 'light' | 'dark';
    className?: string;
}

/**
 * The line between one day of a transcript and the next.
 *
 * `role="separator"` rather than a heading: it divides the flow, it is not a
 * section title you would navigate to, and a transcript with forty headings in
 * it makes a screen reader's heading list useless. The accessible name carries
 * the FULL date even though the visible text says "Today" — see
 * `fullDateLabel`.
 *
 * The rule is horizontal and decorative, so it is drawn with borders on the
 * flex children rather than an <hr>: an <hr> is itself a separator, and two
 * nested separators is one announcement too many.
 */
export function DaySeparator({ timestamp, now, tone = 'light', className }: DaySeparatorProps) {
    const label = dayLabel(timestamp, now);
    // An unparseable timestamp yields no label, and a rule with nothing on it
    // is a horizontal line that means nothing. Render nothing instead.
    if (!label) return null;
    const dark = tone === 'dark';
    return (
        <div
            role="separator"
            aria-label={fullDateLabel(timestamp)}
            data-testid="chat-day-separator"
            data-day-label={label}
            className={cn('flex items-center gap-2 py-2 select-none', className)}
        >
            <span aria-hidden="true" className={cn('h-px grow', dark ? 'bg-white/15' : 'bg-border')} />
            <span
                aria-hidden="true"
                className={cn(
                    'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide',
                    dark ? 'bg-white/10 text-white/60' : 'bg-surface-inset text-text-tertiary',
                )}
            >
                {label}
            </span>
            <span aria-hidden="true" className={cn('h-px grow', dark ? 'bg-white/15' : 'bg-border')} />
        </div>
    );
}

export default DaySeparator;
