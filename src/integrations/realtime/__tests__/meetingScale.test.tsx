// Goal G19: the meeting bindings at a real meeting's size — 300 people, 50
// rooms, 100 hands up. Budgets are lenient (a loaded CI box must not flake);
// they catch an accidental quadratic, which would be seconds, not ms.

import { render, screen } from '@testing-library/react';
import { orderRosterByHands } from '../../../components/video/RosterPanel';
import {
  WrappedBreakoutRoomsPanel, adaptBreakoutRooms, meetingRosterProps, withMeetingHands, type RMMeetingSource,
} from '../meeting';

const PEOPLE = Array.from({ length: 300 }, (_, i) => ({ userId: `u${i}`, displayName: `Person ${i}` }));
const HANDS = Array.from({ length: 100 }, (_, i) => ({ userId: `u${(i * 7) % 300}`, displayName: `Person ${(i * 7) % 300}`, raisedAt: `2026-10-16T12:00:${String(i % 60).padStart(2, '0')}Z` }));
const ROOMS = Array.from({ length: 50 }, (_, r) => ({
  id: `r${r}`, name: `Room ${r + 1}`, state: 'open' as const, members: PEOPLE.slice(r * 6, r * 6 + 6).map((p) => p.userId),
}));
const BREAKOUT = { phase: 'open' as const, mode: 'assigned' as const, rooms: ROOMS, returned: [], endsAt: null, announcement: null, settings: { allowReturnToMain: true } };

function timeIt(n: number, fn: () => unknown): number {
  const t0 = performance.now();
  for (let i = 0; i < n; i++) fn();
  return (performance.now() - t0) / n;
}

describe('meeting bindings at scale (300 people, 50 rooms, 100 hands)', () => {
  it('per-render work stays in single milliseconds', () => {
    const roster = PEOPLE.map((p) => ({ id: p.userId, displayName: p.displayName }));
    const source = { hands: HANDS, isOrganizer: true, lowerHand: () => {}, lowerAllHands: () => {} };
    const perRun = {
      adaptBreakoutRooms: timeIt(50, () => adaptBreakoutRooms(BREAKOUT, PEOPLE, HANDS)),
      meetingRosterProps: timeIt(50, () => meetingRosterProps(source, roster)),
      orderRosterByHands: timeIt(50, () => orderRosterByHands(meetingRosterProps(source, roster).participants)),
      withMeetingHands: timeIt(50, () => withMeetingHands(roster, source)),
    };
    for (const [name, ms] of Object.entries(perRun)) expect({ name, under: ms < 25 }).toEqual({ name, under: true });
    // Correctness at size: hands first, in queue order.
    const ordered = orderRosterByHands(meetingRosterProps(source, roster).participants);
    expect(ordered.slice(0, 3).map((p) => p.handRaised)).toEqual([1, 2, 3]);
    expect(ordered.filter((p) => p.handRaised).length).toBe(new Set(HANDS.map((h) => h.userId)).size);
  });

  it('the organizer pane renders 50 rooms and everyone in them', () => {
    const meeting = {
      ready: true, isOrganizer: true, hands: HANDS, myHandPosition: null,
      toggleHand() {}, lowerHand() {}, lowerAllHands() {},
      breakout: BREAKOUT, myRoom: null, state: { announcement: null }, error: null,
      configureBreakouts() {}, assign() {}, autoAssign() {}, openRooms() {}, closeRooms() {}, setTimer() {}, broadcast() {},
      joinRoom() {}, returnToMain() {}, endBreakouts() {}, dismissAnnouncement() {},
    } satisfies RMMeetingSource;
    const t0 = performance.now();
    render(<WrappedBreakoutRoomsPanel meeting={meeting} people={PEOPLE} />);
    const ms = performance.now() - t0;
    expect(screen.getAllByTestId('breakout-room')).toHaveLength(50);
    expect(screen.queryAllByTestId('breakout-unassigned-person')).toHaveLength(0);
    expect(ms).toBeLessThan(5000); // jsdom; a real browser is far faster
  });
});
