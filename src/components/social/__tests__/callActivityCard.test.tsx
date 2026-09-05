import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CallActivityCard, describeParticipants, formatCallDuration } from '../CallActivityCard';

afterEach(cleanup);

const p = (userId: string, displayName?: string) => ({ userId, displayName });
const HANK = p('u1', 'Hank Anderson');
const BOB = p('u2', 'Bob Martinez');

describe('formatCallDuration', () => {
  it('reads like a transcript, not a stopwatch', () => {
    expect(formatCallDuration(43_000)).toBe('43s');
    expect(formatCallDuration(12 * 60_000 + 4_000)).toBe('12m 4s');
    expect(formatCallDuration(15 * 60_000)).toBe('15m');
    expect(formatCallDuration(65 * 60_000)).toBe('1h 5m');
    expect(formatCallDuration(60 * 60_000)).toBe('1h');
  });

  it('renders nothing for a duration it cannot trust', () => {
    expect(formatCallDuration(NaN)).toBe('');
    expect(formatCallDuration(-1)).toBe('');
  });
});

describe('describeParticipants', () => {
  it('agrees with itself about tense and number', () => {
    expect(describeParticipants([HANK], true)).toBe('Hank Anderson is in the call');
    expect(describeParticipants([HANK], false)).toBe('Hank Anderson was in the call');
    expect(describeParticipants([HANK, BOB], true)).toBe('Hank Anderson and Bob Martinez are in the call');
    expect(describeParticipants([HANK, BOB], false)).toBe('Hank Anderson and Bob Martinez were in the call');
  });

  // The faces render everyone, so the sentence has to count everyone.
  it('counts the people it cannot name', () => {
    expect(describeParticipants([HANK, p('anon')], true))
      .toBe('Hank Anderson and 1 other are in the call');
    expect(describeParticipants([HANK, BOB, p('a'), p('b')], true))
      .toBe('Hank Anderson, Bob Martinez and 2 others are in the call');
  });

  it('never prints a userId where a person should be', () => {
    expect(describeParticipants([p('dev-e2e-uo0cpk')], true)).toBe('Someone is in the call');
    expect(describeParticipants([p('a'), p('b'), p('c')], false)).toBe('3 people were in the call');
  });

  it('says an empty call is empty, in the right tense', () => {
    expect(describeParticipants([], true)).toBe('Nobody has joined yet');
    expect(describeParticipants([], false)).toBe('Nobody joined');
  });
});

describe('CallActivityCard — live', () => {
  it('offers a way in and says who is already there', () => {
    const onJoin = vi.fn();
    render(<CallActivityCard callId="c1" live audioOnly={false} participants={[HANK, BOB]} onJoin={onJoin} />);

    expect(screen.getByText('Video call in progress')).toBeInTheDocument();
    expect(screen.getByText('Hank Anderson and Bob Martinez are in the call')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('call-activity-card-join'));
    expect(onJoin).toHaveBeenCalledWith('c1');
  });

  // A running timer in a transcript is stale the instant it renders.
  it('does not show a duration while the call is still going', () => {
    render(<CallActivityCard callId="c1" live durationMs={90_000} participants={[HANK]} />);
    expect(screen.queryByText(/1m 30s/)).toBeNull();
  });

  // A greyed Join is a promise the product will not keep.
  it('omits the way in when the viewer cannot join', () => {
    render(<CallActivityCard callId="c1" live participants={[HANK]} />);
    expect(screen.queryByTestId('call-activity-card-join')).toBeNull();
  });

  it('says audio when the call had no camera', () => {
    render(<CallActivityCard callId="c1" live audioOnly participants={[HANK]} />);
    expect(screen.getByText('Audio call in progress')).toBeInTheDocument();
  });

  // The invite frame does not carry the call kind, so a server-written record
  // genuinely cannot tell. "Video call" would be a confident guess.
  it('just says "Call" when nobody knows which kind it was', () => {
    render(<CallActivityCard callId="c1" live participants={[HANK]} />);
    expect(screen.getByText('Call in progress')).toBeInTheDocument();
  });
});

describe('CallActivityCard — ended', () => {
  it('becomes a record: who started it and how long it took', () => {
    render(
      <CallActivityCard callId="c1" startedBy="Hank Anderson" durationMs={12 * 60_000 + 4_000}
        participants={[HANK, BOB]} />,
    );
    expect(screen.getByText('Call')).toBeInTheDocument();
    expect(screen.getByText('Hank Anderson started a call · 12m 4s')).toBeInTheDocument();
  });

  // The whole reason live and ended are one component.
  it('takes the way in away once the call is over', () => {
    render(<CallActivityCard callId="c1" onJoin={vi.fn()} participants={[HANK]} />);
    expect(screen.queryByTestId('call-activity-card-join')).toBeNull();
  });

  it('still shows who was there', () => {
    render(<CallActivityCard callId="c1" participants={[HANK, BOB]} />);
    expect(screen.getByTestId('call-activity-card-participants')).toBeInTheDocument();
  });

  it('names the kind when the record does say', () => {
    render(<CallActivityCard callId="c1" audioOnly={false} participants={[HANK]} />);
    expect(screen.getByText('Video call')).toBeInTheDocument();
  });

  it('marks a live call in the DOM so a transcript can find it', () => {
    const { rerender } = render(<CallActivityCard callId="c1" live participants={[HANK]} />);
    expect(screen.getByTestId('call-activity-card')).toHaveAttribute('data-live', 'true');
    rerender(<CallActivityCard callId="c1" participants={[HANK]} />);
    expect(screen.getByTestId('call-activity-card')).not.toHaveAttribute('data-live');
  });
});

// ---------------------------------------------------------------------------
// The wire shape
// ---------------------------------------------------------------------------

import { callRefFromMetadata } from '../ChatPanel';

describe('callRefFromMetadata', () => {
  it('ignores anything that is not a call event', () => {
    expect(callRefFromMetadata(undefined)).toBeNull();
    expect(callRefFromMetadata({})).toBeNull();
    expect(callRefFromMetadata({ kind: 'document', documentId: 'd1' })).toBeNull();
  });

  // A card with no call can neither be joined nor identified.
  it('refuses a call event that names no call', () => {
    expect(callRefFromMetadata({ kind: 'call' })).toBeNull();
    expect(callRefFromMetadata({ kind: 'call', callId: '' })).toBeNull();
  });

  // A stored message replays forever. Inferring "still going" from a missing
  // field would have the thread advertising a call that ended hours ago.
  it('does not call anything live without positive evidence', () => {
    expect(callRefFromMetadata({ kind: 'call', callId: 'c1' })?.live).toBe(false);
    expect(callRefFromMetadata({ kind: 'call', callId: 'c1', endedAt: '2026-09-05T10:00:00Z' })?.live).toBe(false);
    expect(callRefFromMetadata({ kind: 'call', callId: 'c1', live: 'yes' })?.live).toBe(false);
    expect(callRefFromMetadata({ kind: 'call', callId: 'c1', live: true })?.live).toBe(true);
  });

  it('reads the participants the server stamped', () => {
    const ref = callRefFromMetadata({
      kind: 'call',
      callId: 'c1',
      participants: [{ userId: 'u1', displayName: 'Hank Anderson' }, { userId: 'u2' }],
    });
    expect(ref?.participants).toEqual([
      { userId: 'u1', displayName: 'Hank Anderson' },
      { userId: 'u2', displayName: undefined },
    ]);
  });

  // Metadata crosses the wire; a malformed row must not take the thread down.
  it('drops participant rows that name nobody', () => {
    const ref = callRefFromMetadata({
      kind: 'call',
      callId: 'c1',
      participants: [{ displayName: 'ghost' }, 'nonsense', null, { userId: 'u1' }],
    });
    expect(ref?.participants).toEqual([{ userId: 'u1', displayName: undefined }]);
  });

  it('survives participants being something other than a list', () => {
    expect(callRefFromMetadata({ kind: 'call', callId: 'c1', participants: 'three' })?.participants)
      .toEqual([]);
  });

  it('carries duration and audio-only through', () => {
    const ref = callRefFromMetadata({
      kind: 'call', callId: 'c1', endedAt: 1, durationMs: 90_000, audioOnly: true,
    });
    expect(ref?.durationMs).toBe(90_000);
    expect(ref?.audioOnly).toBe(true);
  });
});
