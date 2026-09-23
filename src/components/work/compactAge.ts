// compactAge — the explorer's quiet right-hand age on a file row: "now",
// "6m", "6h", "1d", "3w", then a short date. The Documents folders view puts
// one on every document row ("Planning sync transcript  6h"); a full "6 hours
// ago" would eat the title's width on a 300px rail forty times over.
//
// Honest by construction: an unparseable or missing timestamp gives
// `undefined` (draw nothing), never "0m"; a timestamp in the future — clock
// skew between a replica and the browser — reads "now" rather than a
// negative age.

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export function formatCompactAge(
  value: string | number | Date | null | undefined,
  now: number = Date.now(),
): string | undefined {
  if (value == null || value === '') return undefined;
  const t = value instanceof Date ? value.getTime() : typeof value === 'number' ? value : Date.parse(value);
  if (!Number.isFinite(t)) return undefined;
  const age = Math.max(0, now - t);
  if (age < MINUTE) return 'now';
  if (age < HOUR) return `${Math.floor(age / MINUTE)}m`;
  if (age < DAY) return `${Math.floor(age / HOUR)}h`;
  if (age < WEEK) return `${Math.floor(age / DAY)}d`;
  if (age < 5 * WEEK) return `${Math.floor(age / WEEK)}w`;
  const d = new Date(t);
  const sameYear = d.getFullYear() === new Date(now).getFullYear();
  return d.toLocaleDateString('en-US', sameYear ? { month: 'short', day: 'numeric' } : { month: 'short', year: 'numeric' });
}

export default formatCompactAge;
