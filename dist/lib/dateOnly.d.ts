/**
 * Parse an ISO date string into a `Date` on the viewer's clock.
 *
 * A date-only string is anchored at LOCAL midnight of that calendar day (not
 * UTC midnight), so `getDate()` and `toLocaleDateString()` report the day the
 * author typed. Strings that carry a time component are a real instant and are
 * handed to `new Date()` unchanged. Returns `null` when unparseable, so callers
 * can fall back to showing the raw string rather than "Invalid Date".
 */
export declare function parseIsoDateLocal(iso: string | null | undefined): Date | null;
/** Midnight on the viewer's clock for `ref` (defaults to now). */
export declare function startOfLocalDay(ref?: Date): Date;
/**
 * True when `iso` names a calendar day strictly before today on the viewer's
 * clock. Both sides are local midnight, so a task due *today* is never overdue.
 * Unparseable input is not overdue — an unreadable date is not evidence of
 * lateness.
 */
export declare function isBeforeToday(iso: string | null | undefined, now?: Date): boolean;
/**
 * `YYYY-MM-DD` for the viewer's calendar day.
 *
 * Note this is NOT `toISOString().slice(0, 10)` and not `isoString.slice(0, 10)`
 * — both of those give the UTC day, which for a 7pm US/Pacific event is
 * tomorrow's date.
 */
export declare function localDateKey(value: Date | string): string;
//# sourceMappingURL=dateOnly.d.ts.map