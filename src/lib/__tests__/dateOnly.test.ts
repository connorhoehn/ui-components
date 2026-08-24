import { parseIsoDateLocal, startOfLocalDay, isBeforeToday, localDateKey } from '../dateOnly';

// These assertions only discriminate at a non-zero UTC offset, so the zone is
// pinned rather than inherited from the runner. Node re-reads `process.env.TZ`
// on every Date/Intl operation, so setting it here is enough — but it is
// process-wide, so it must be restored.
const ORIGINAL_TZ = process.env.TZ;

describe('dateOnly (pinned to America/Los_Angeles, UTC-7/8)', () => {
  beforeAll(() => {
    process.env.TZ = 'America/Los_Angeles';
  });
  afterAll(() => {
    if (ORIGINAL_TZ === undefined) delete process.env.TZ;
    else process.env.TZ = ORIGINAL_TZ;
  });

  it('anchors a date-only string at LOCAL midnight, not UTC midnight', () => {
    // `new Date('2026-08-16')` is 2026-08-16T00:00:00Z === Aug 15 17:00 PDT,
    // so the old code reported day 15.
    const d = parseIsoDateLocal('2026-08-16')!;
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(7); // August
    expect(d.getDate()).toBe(16);
    expect(d.getHours()).toBe(0);
    expect(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })).toBe(
      'Aug 16',
    );
    // Proof this is the discriminating case: the naive parse really does differ.
    expect(new Date('2026-08-16').getDate()).toBe(15);
  });

  it('leaves a string with a time component as a real instant', () => {
    const d = parseIsoDateLocal('2026-08-16T00:00:00Z')!;
    expect(d.getTime()).toBe(Date.parse('2026-08-16T00:00:00Z'));
  });

  it('returns null for unparseable and overflowing dates', () => {
    expect(parseIsoDateLocal('')).toBeNull();
    expect(parseIsoDateLocal(undefined)).toBeNull();
    expect(parseIsoDateLocal('not a date')).toBeNull();
    expect(parseIsoDateLocal('2026-02-30')).toBeNull(); // would roll to Mar 2
    expect(parseIsoDateLocal('2026-13-01')).toBeNull();
  });

  it('keeps two-digit-looking years in the right century', () => {
    expect(parseIsoDateLocal('0099-08-16')!.getFullYear()).toBe(99);
  });

  it('does not call a task due today overdue', () => {
    const now = new Date(2026, 7, 16, 9, 30); // Aug 16, 09:30 local
    expect(isBeforeToday('2026-08-16', now)).toBe(false);
    expect(isBeforeToday('2026-08-15', now)).toBe(true);
    expect(isBeforeToday('2026-08-17', now)).toBe(false);
  });

  it('treats an unreadable date as not overdue', () => {
    expect(isBeforeToday('sometime next week', new Date(2026, 7, 16))).toBe(false);
    expect(isBeforeToday(undefined, new Date(2026, 7, 16))).toBe(false);
  });

  it('startOfLocalDay strips the time without moving the calendar day', () => {
    const d = startOfLocalDay(new Date(2026, 7, 16, 23, 59, 59, 999));
    expect(d.getDate()).toBe(16);
    expect(d.getHours()).toBe(0);
    expect(d.getMilliseconds()).toBe(0);
  });

  it('localDateKey gives the viewer calendar day, not the UTC one', () => {
    // 2026-08-17T02:00:00Z is 7pm on Aug 16 in Los Angeles.
    const iso = '2026-08-17T02:00:00Z';
    expect(localDateKey(iso)).toBe('2026-08-16');
    // The bug it replaces: a raw slice reports a day the viewer has not reached.
    expect(iso.slice(0, 10)).toBe('2026-08-17');
    expect(new Date(iso).toISOString().slice(0, 10)).toBe('2026-08-17');
  });

  it('localDateKey round-trips a date-only string', () => {
    expect(localDateKey('2026-08-16')).toBe('2026-08-16');
  });
});
