/** Local calendar day of an ISO timestamp, as `YYYY-MM-DD`. Empty when unparseable. */
export declare function dayKeyOf(isoString: string): string;
/**
 * Does a separator belong BETWEEN these two messages?
 *
 * `previous` is undefined for the first message in the list, which does get a
 * separator: the top of a transcript is a day boundary too, and without one
 * the oldest visible block is the only one on screen whose date is unstated.
 *
 * An unparseable timestamp never opens a new day. A malformed row is a data
 * problem; inventing a date heading for it would turn it into a reading
 * problem for every message under it.
 */
export declare function isNewDay(current: string, previous?: string): boolean;
/**
 * How the boundary calls itself: `Today`, `Yesterday`, a weekday inside the
 * last week, and an explicit date beyond that.
 *
 * "Today"/"Yesterday" are the words people actually use, and a bare weekday is
 * unambiguous for six days and actively misleading on the seventh — "Monday"
 * a week and a day ago is the wrong Monday — so the window stops at six.
 *
 * `now` is injectable because the whole point of this function is that it
 * changes answer at midnight, which is not something a test can wait for.
 */
export declare function dayLabel(isoString: string, now?: Date): string;
/**
 * The unabbreviated date, for the separator's accessible name and for the
 * `title` on a row's HH:MM.
 *
 * "Today" is a fine thing to READ and a poor thing to be told by a screen
 * reader hours later in a saved transcript, so the announced name always
 * carries the real date as well.
 */
export declare function fullDateLabel(isoString: string): string;
/** Full local date AND time — the `title` of a row's truncated HH:MM. */
export declare function fullTimestampLabel(isoString: string): string;
/**
 * How a conversation LIST row stamps itself.
 *
 * A transcript row can show a bare `21:52` because a day separator sits above
 * it. An inbox row has no such context: the same `21:52` beside a channel
 * nobody has touched since Sunday reads as tonight, and — when the hour is
 * later than the current one — as the future. The stamp has to say which day
 * it means, in the width of a rail.
 *
 * So: the time for today, the word for yesterday, a short weekday inside the
 * week, and a numeric date beyond it. Same shape Teams and Slack use in their
 * rails, and the same six-day window as `dayLabel` — "Mon" a week and a day
 * ago is the wrong Monday. Pair it with `fullTimestampLabel` as the `title`
 * so the exact moment is one hover away.
 *
 * The activity feed stamps its rows the same way and for the same reason, so
 * this is the one copy of the rule rather than one per list.
 *
 * `now` is injectable for the same reason it is on `dayLabel`: the answer
 * changes at midnight and a test cannot wait for it.
 */
export declare function conversationStamp(isoString: string, now?: Date): string;
//# sourceMappingURL=dayBoundary.d.ts.map