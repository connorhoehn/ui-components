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
export declare function DaySeparator({ timestamp, now, tone, className }: DaySeparatorProps): import("react").JSX.Element | null;
export default DaySeparator;
//# sourceMappingURL=DaySeparator.d.ts.map