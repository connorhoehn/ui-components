import { describe, expect, it } from 'vitest';
import { conversationStamp, dayKeyOf, dayLabel, fullDateLabel, isNewDay } from '../dayBoundary';

// All fixtures are built from LOCAL components so the suite means the same
// thing in every timezone the CI or a laptop happens to be in. A hard-coded
// 'Z' instant would be one day in London and the day before in Los Angeles,
// which is precisely the distinction under test.
function at(y: number, m: number, d: number, hh = 12, mm = 0): string {
    return new Date(y, m - 1, d, hh, mm).toISOString();
}

describe('dayKeyOf', () => {
    it('is the local calendar day, not the UTC one', () => {
        expect(dayKeyOf(at(2026, 3, 14, 23, 59))).toBe('2026-03-14');
        expect(dayKeyOf(at(2026, 3, 15, 0, 1))).toBe('2026-03-15');
    });

    it('is empty for an unparseable timestamp rather than throwing', () => {
        expect(dayKeyOf('not a date')).toBe('');
        expect(dayKeyOf('')).toBe('');
    });
});

describe('isNewDay', () => {
    it('opens a day for the first message in the list', () => {
        expect(isNewDay(at(2026, 3, 14), undefined)).toBe(true);
    });

    it('is false inside one long day', () => {
        // 20 hours apart and still the same day: a plain 24h subtraction
        // would agree here, which is why the next case exists.
        expect(isNewDay(at(2026, 3, 14, 23, 0), at(2026, 3, 14, 3, 0))).toBe(false);
    });

    it('is TRUE across local midnight even 40 minutes apart', () => {
        // The case the whole module exists for: 23:50 → 00:30 reads as
        // out-of-order when both rows print only HH:MM.
        expect(isNewDay(at(2026, 3, 15, 0, 30), at(2026, 3, 14, 23, 50))).toBe(true);
    });

    it('never opens a day off a malformed timestamp', () => {
        // A bad row is a data problem. Inventing a date heading for it would
        // make it a reading problem for every message underneath.
        expect(isNewDay('garbage', at(2026, 3, 14))).toBe(false);
        expect(isNewDay(at(2026, 3, 15), 'garbage')).toBe(false);
    });
});

describe('dayLabel', () => {
    const now = new Date(2026, 8, 8, 10, 0); // Tue 8 Sep 2026, local

    it('says Today and Yesterday', () => {
        expect(dayLabel(at(2026, 9, 8, 2, 0), now)).toBe('Today');
        expect(dayLabel(at(2026, 9, 7, 23, 59), now)).toBe('Yesterday');
    });

    it('uses a bare weekday only inside the last six days', () => {
        const label = dayLabel(at(2026, 9, 3), now); // 5 days back
        expect(label).toBe(new Date(2026, 8, 3).toLocaleDateString(undefined, { weekday: 'long' }));
        expect(label).not.toMatch(/\d/);
    });

    it('spells out the date at seven days, where a bare weekday is the WRONG one', () => {
        // 1 Sep is a Tuesday and so is `now`. "Tuesday" here would name today.
        const label = dayLabel(at(2026, 9, 1), now);
        expect(label).toMatch(/1/);
    });

    it('falls through to a date for a future timestamp instead of guessing', () => {
        const label = dayLabel(at(2026, 9, 11), now);
        expect(label).not.toBe('Today');
        expect(label).toMatch(/11/);
    });

    it('is empty for an unparseable timestamp', () => {
        expect(dayLabel('nope', now)).toBe('');
    });
});

describe('fullDateLabel', () => {
    it('always carries the real date, even when the visible label says Today', () => {
        const iso = at(2026, 9, 8);
        expect(dayLabel(iso, new Date(2026, 8, 8))).toBe('Today');
        expect(fullDateLabel(iso)).toMatch(/2026/);
    });
});

describe('conversationStamp — the stamp on an inbox row', () => {
  // Midday, so "today" has hours on both sides of it.
  const now = new Date(2026, 8, 16, 13, 0, 0); // Wed 16 Sep 2026

  it('shows the clock time for something said today', () => {
    expect(conversationStamp(new Date(2026, 8, 16, 9, 5).toISOString(), now)).toBe('09:05');
  });

  it('still shows the clock time for a stamp LATER today than now', () => {
    // A row can legitimately carry a time in the next hour — a clock skewed by
    // minutes between a sender and this reader. It is still today.
    expect(conversationStamp(new Date(2026, 8, 16, 21, 52).toISOString(), now)).toBe('21:52');
  });

  it('says the word for yesterday rather than an hour', () => {
    // The bug this function exists for: 21:52 yesterday read as tonight, and
    // as a time in the future.
    expect(conversationStamp(new Date(2026, 8, 15, 21, 52).toISOString(), now)).toBe('Yesterday');
  });

  it('names the weekday inside the week', () => {
    expect(conversationStamp(new Date(2026, 8, 13, 21, 52).toISOString(), now)).toBe(
      new Date(2026, 8, 13).toLocaleDateString(undefined, { weekday: 'short' }),
    );
  });

  it('stops naming weekdays at six days, where the name stops being unambiguous', () => {
    // Seven days back is the same weekday as today — "Wed" would be read as
    // this morning.
    const sevenBack = conversationStamp(new Date(2026, 8, 9, 21, 52).toISOString(), now);
    expect(sevenBack).not.toBe('Wed');
    expect(sevenBack).toContain('9');
  });

  it('gives a date beyond the week, and adds the year only when it differs', () => {
    expect(conversationStamp(new Date(2026, 6, 4, 10, 0).toISOString(), now)).toBe(
      new Date(2026, 6, 4).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' }),
    );
    expect(conversationStamp(new Date(2025, 6, 4, 10, 0).toISOString(), now)).toBe(
      new Date(2025, 6, 4).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: '2-digit' }),
    );
  });

  it('sends a stamp from a future DAY to the date, not to a time', () => {
    // A relative phrase about the future would be a claim about the reader's
    // clock. Same reasoning as dayLabel.
    expect(conversationStamp(new Date(2026, 8, 18, 21, 52).toISOString(), now)).toBe(
      new Date(2026, 8, 18).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' }),
    );
  });

  it('crosses local midnight by the calendar, not by subtracting 24 hours', () => {
    // 40 minutes apart, different days.
    const justBefore = new Date(2026, 8, 15, 23, 40).toISOString();
    const justAfter = new Date(2026, 8, 16, 0, 20).toISOString();
    expect(conversationStamp(justBefore, now)).toBe('Yesterday');
    expect(conversationStamp(justAfter, now)).toBe('00:20');
  });

  it('renders nothing for an unparseable stamp rather than "Invalid Date"', () => {
    expect(conversationStamp('not a date', now)).toBe('');
  });
});
