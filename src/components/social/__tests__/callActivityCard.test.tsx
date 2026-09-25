import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { CallActivityCard, describeNotRecorded, describeParticipants, formatCallDuration, formatElapsed } from '../CallActivityCard';

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

describe('CallActivityCard — live clock and pulse', () => {
  it('formats a running clock', () => {
    expect(formatElapsed(5_000)).toBe('0:05');
    expect(formatElapsed(3 * 60_000 + 12_000)).toBe('3:12');
    expect(formatElapsed(62 * 60_000 + 3_000)).toBe('1:02:03');
  });

  it('pulses and counts up from when it started, on the reader\'s clock', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-09-25T10:00:05Z'));
      render(<CallActivityCard callId="c1" live startedAt="2026-09-25T10:00:00Z" participants={[HANK]} />);
      expect(screen.getByTestId('call-activity-card-pulse')).toBeInTheDocument();
      expect(screen.getByTestId('call-activity-card-live')).toHaveTextContent('Live · 0:05');
      act(() => { vi.advanceTimersByTime(3_000); });
      expect(screen.getByTestId('call-activity-card-live')).toHaveTextContent('Live · 0:08');
    } finally {
      vi.useRealTimers();
    }
  });

  it('says only "Live" when it does not know when the call began', () => {
    render(<CallActivityCard callId="c1" live participants={[HANK]} />);
    expect(screen.getByTestId('call-activity-card-live')).toHaveTextContent(/^Live$/);
  });

  // The swell is the part that moves; the dot is the part that means "live".
  it('keeps the still dot and gates the swell on motion-safe', () => {
    render(<CallActivityCard callId="c1" live participants={[HANK]} />);
    const pulse = screen.getByTestId('call-activity-card-pulse');
    expect(pulse.querySelector('.motion-safe\\:animate-ping')).not.toBeNull();
    expect(pulse.querySelectorAll('.bg-success').length).toBe(2);
  });
});

describe('CallActivityCard — missed', () => {
  it('reads as a missed call, with no roster, clock or way in', () => {
    render(<CallActivityCard callId="c1" live startedBy="Hank Anderson" outcome="cancelled" onJoin={vi.fn()} participants={[HANK]} />);
    expect(screen.getByText('Missed call')).toBeInTheDocument();
    expect(screen.getByText('Hank Anderson called')).toBeInTheDocument();
    expect(screen.queryByTestId('call-activity-card-join')).toBeNull();
    expect(screen.queryByTestId('call-activity-card-pulse')).toBeNull();
    expect(screen.queryByTestId('call-activity-card-participants')).toBeNull();
    expect(screen.getByTestId('call-activity-card')).toHaveAttribute('data-outcome', 'cancelled');
  });

  it('distinguishes no answer from a decline', () => {
    const { rerender } = render(<CallActivityCard callId="c1" outcome="no-answer" />);
    expect(screen.getByText('No answer')).toBeInTheDocument();
    rerender(<CallActivityCard callId="c1" outcome="declined" />);
    expect(screen.getByText('Declined')).toBeInTheDocument();
  });
});

describe('CallActivityCard — ended', () => {
  it('becomes a record: who started it and how long it took', () => {
    render(
      <CallActivityCard callId="c1" startedBy="Hank Anderson" durationMs={12 * 60_000 + 4_000}
        participants={[HANK, BOB]} />,
    );
    expect(screen.getByText('Call ended · 12m 4s')).toBeInTheDocument();
    expect(screen.getByText('Hank Anderson started the call')).toBeInTheDocument();
    expect(screen.queryByTestId('call-activity-card-pulse')).toBeNull();
    expect(screen.queryByTestId('call-activity-card-live')).toBeNull();
  });

  // The two cards in the bug report: calls long over, stored with a duration
  // and no `startedAt`, must read as ended — never as a clock at zero.
  it('reads a stored record with no start time as ended', () => {
    render(<CallActivityCard callId="c1" startedBy="Hank Anderson" durationMs={24_000} participants={[BOB]} />);
    expect(screen.getByText('Call ended · 24s')).toBeInTheDocument();
    expect(screen.getByTestId('call-activity-card')).not.toHaveAttribute('data-live');
  });

  it('says so when nobody joined', () => {
    render(<CallActivityCard callId="c1" startedBy="Hank Anderson" durationMs={5_000} />);
    expect(screen.getByText('Hank Anderson started the call · Nobody joined')).toBeInTheDocument();
  });

  it('links the recording once there is one', () => {
    const onOpenRecording = vi.fn();
    render(<CallActivityCard callId="c1" durationMs={5_000} recordingId="rec-9" onOpenRecording={onOpenRecording} />);
    fireEvent.click(screen.getByTestId('call-activity-card-recording'));
    expect(onOpenRecording).toHaveBeenCalledWith('rec-9');
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
    expect(screen.getByText('Video call ended')).toBeInTheDocument();
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

describe('describeNotRecorded', () => {
  it('names the room and who can fix it', () => {
    expect(describeNotRecorded('room-setting-off', 'room:design'))
      .toBe('Not recorded — recording is off for #design; a room admin can turn it on under Manage #design.');
  });

  it('still explains the room rule when the lobby is unknown', () => {
    expect(describeNotRecorded('room-setting-off')).toMatch(/^Not recorded — recording is off for this room/);
  });

  it('tells both people what to turn on for a DM', () => {
    expect(describeNotRecorded('dm-not-opted-in:u2', 'dm:u1:u2'))
      .toBe("Not recorded — both people must turn on 'Record my DM calls' in their profile.");
  });

  it('falls back to the plain statement for a code it does not know', () => {
    expect(describeNotRecorded('something-new')).toBe('Not recorded.');
    expect(describeNotRecorded(undefined)).toBe('Not recorded.');
  });
});

describe('CallActivityCard — recording note', () => {
  it('says why an ended call was not recorded', () => {
    render(<CallActivityCard callId="c" recorded={false} notRecordedReason="room-setting-off" lobbyName="room:design" />);
    expect(screen.getByTestId('call-activity-card-not-recorded')).toHaveTextContent('recording is off for #design');
  });

  it('says nothing when the record does not say', () => {
    render(<CallActivityCard callId="c" />);
    expect(screen.queryByTestId('call-activity-card-not-recorded')).not.toBeInTheDocument();
  });

  // The recording announces itself as its own card when it lands.
  it('says nothing when the call was recorded', () => {
    render(<CallActivityCard callId="c" recorded />);
    expect(screen.queryByTestId('call-activity-card-not-recorded')).not.toBeInTheDocument();
  });

  // Live, the chip in the call chrome owns this statement.
  it('holds the note while the call is still going', () => {
    render(<CallActivityCard callId="c" live recorded={false} notRecordedReason="dm-not-opted-in:u2" />);
    expect(screen.queryByTestId('call-activity-card-not-recorded')).not.toBeInTheDocument();
  });
});
