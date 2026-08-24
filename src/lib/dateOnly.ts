// src/lib/dateOnly.ts
//
// Date-only string handling.
//
// `TaskItem.dueDate`, every `field(..., 'date')` in doc-types, and anything
// backed by `<Input type="date">` carry a BARE calendar date: "2026-08-16",
// no time and no zone. The ECMAScript spec says a date-only form is parsed as
// **UTC midnight**, but `toLocaleDateString()` / `getDate()` render in the
// **local** zone — so `new Date('2026-08-16').toLocaleDateString()` prints
// "Aug 15" for every user west of Greenwich. Same trap in the other direction:
// comparing that UTC-midnight Date against a *local* midnight "today" marks a
// task due today as overdue a full day early.
//
// Neither failure throws; both render a confident, wrong date. Route every
// date-only parse through here.

/** Bare `YYYY-MM-DD` — no `T`, no offset. */
const DATE_ONLY_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parse an ISO date string into a `Date` on the viewer's clock.
 *
 * A date-only string is anchored at LOCAL midnight of that calendar day (not
 * UTC midnight), so `getDate()` and `toLocaleDateString()` report the day the
 * author typed. Strings that carry a time component are a real instant and are
 * handed to `new Date()` unchanged. Returns `null` when unparseable, so callers
 * can fall back to showing the raw string rather than "Invalid Date".
 */
export function parseIsoDateLocal(iso: string | null | undefined): Date | null {
  if (typeof iso !== 'string') return null;
  const trimmed = iso.trim();
  if (trimmed === '') return null;

  const m = DATE_ONLY_RE.exec(trimmed);
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    const d = new Date(year, month - 1, day);
    // `new Date(99, ...)` means 1999; the four-digit regex allows year 0099.
    d.setFullYear(year, month - 1, day);
    // Rejects overflow ("2026-02-30" would roll to Mar 2).
    if (d.getMonth() !== month - 1 || d.getDate() !== day) return null;
    return d;
  }

  const d = new Date(trimmed);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Midnight on the viewer's clock for `ref` (defaults to now). */
export function startOfLocalDay(ref: Date = new Date()): Date {
  const d = new Date(ref.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * True when `iso` names a calendar day strictly before today on the viewer's
 * clock. Both sides are local midnight, so a task due *today* is never overdue.
 * Unparseable input is not overdue — an unreadable date is not evidence of
 * lateness.
 */
export function isBeforeToday(
  iso: string | null | undefined,
  now: Date = new Date(),
): boolean {
  const d = parseIsoDateLocal(iso);
  if (!d) return false;
  return startOfLocalDay(d).getTime() < startOfLocalDay(now).getTime();
}

/**
 * `YYYY-MM-DD` for the viewer's calendar day.
 *
 * Note this is NOT `toISOString().slice(0, 10)` and not `isoString.slice(0, 10)`
 * — both of those give the UTC day, which for a 7pm US/Pacific event is
 * tomorrow's date.
 */
export function localDateKey(value: Date | string): string {
  const d = typeof value === 'string' ? parseIsoDateLocal(value) : value;
  if (!d || Number.isNaN(d.getTime())) {
    return typeof value === 'string' ? value.slice(0, 10) : '';
  }
  const y = String(d.getFullYear()).padStart(4, '0');
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
