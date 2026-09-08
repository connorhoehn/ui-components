// dayBoundary — where one day of a transcript ends and the next begins.
//
// A chat row shows HH:MM and nothing else (see `formatChatTime` in
// MessageRow). That is right for a thread you read in one sitting and wrong
// for every other thread: `08:35` sitting directly above `03:30` reads as
// out-of-order, because the only thing separating them — a date — is not on
// screen anywhere. The reader has no way to tell a reply four minutes later
// from a reply four days later.
//
// The boundary is computed in the reader's LOCAL calendar day, not in UTC and
// not by subtracting 24 hours. Two messages 40 minutes apart across local
// midnight are on different days and must be separated; two messages 20 hours
// apart inside one long day must not be.

/** Local calendar day of an ISO timestamp, as `YYYY-MM-DD`. Empty when unparseable. */
export function dayKeyOf(isoString: string): string {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    const yyyy = d.getFullYear().toString().padStart(4, '0');
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

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
export function isNewDay(current: string, previous?: string): boolean {
    const key = dayKeyOf(current);
    if (!key) return false;
    if (previous === undefined) return true;
    const prevKey = dayKeyOf(previous);
    if (!prevKey) return false;
    return key !== prevKey;
}

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
export function dayLabel(isoString: string, now: Date = new Date()): string {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    const startOfLocalDay = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
    // Whole local days between the two dates. Computed from the two local
    // midnights, so a DST shift inside the interval cannot round it off by one.
    const days = Math.round((startOfLocalDay(now) - startOfLocalDay(d)) / 86_400_000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days > 1 && days < 7) {
        return d.toLocaleDateString(undefined, { weekday: 'long' });
    }
    // Future timestamps (clock skew between a sender and this reader) fall
    // through to the explicit date rather than to "in 3 days" — a date is
    // never wrong, and a relative phrase about the future would be a claim
    // about the reader's clock that this component is in no position to make.
    const sameYear = d.getFullYear() === now.getFullYear();
    return d.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        ...(sameYear ? {} : { year: 'numeric' }),
    });
}

/**
 * The unabbreviated date, for the separator's accessible name and for the
 * `title` on a row's HH:MM.
 *
 * "Today" is a fine thing to READ and a poor thing to be told by a screen
 * reader hours later in a saved transcript, so the announced name always
 * carries the real date as well.
 */
export function fullDateLabel(isoString: string): string {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/** Full local date AND time — the `title` of a row's truncated HH:MM. */
export function fullTimestampLabel(isoString: string): string {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString(undefined, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
