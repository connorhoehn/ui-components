// CallActivityCard — a call, as it appears inside a conversation.
//
// The sibling of DocumentActivityCard, and it exists for the same reason: a
// call that happens in a channel used to leave NO trace in the thread. You
// could not tell from the conversation that a call had happened, who was in
// it, or — while it was still going — that there was one to join. The
// recordings tab answers some of that afterwards; the thread is where people
// actually look.
//
// ## Why one component for two states
//
// A call is the only thing in a conversation that changes what it MEANS while
// you are looking at it. Live, it is an invitation: the useful facts are who
// is in it and how to get in. Over, it is a record: who was there and how long
// it took, and the way in must be gone, because a Join button on a call that
// ended is a promise the product cannot keep.
//
// Two components would mean the thread swapping one row for another as the
// call ends — a jump exactly when someone is reading it. One component that
// changes state keeps its place in the transcript, which is also what the
// scroll position expects.
//
// ## Why a live card ticks and pulses
//
// The card used to look the same live and ended — "Call · 24s" both times —
// and a reader could not tell from the thread whether there was a call to
// join RIGHT NOW. That is the one question a live card exists to answer, so
// it answers it three ways: a pulsing dot (still for people who asked for
// reduced motion), "Live · 3:12" counting up, and the people in it. Once the
// call ends the same row says "Call ended · 24s" with who was there; the
// pulse, the clock and the way in all go, because a Join on a finished call
// is a promise the product cannot keep.
//
// The clock is `startedAt` measured on the reader's own clock, so ten open
// tabs agree with each other to the second without any of them being told.

import { useEffect, useState } from 'react';
import { PresenceAvatars } from '../shared/PresenceAvatars';
import { cn } from '../../lib/cn';

/** How an invite that never became a call ended. */
export type CallOutcome = 'cancelled' | 'declined' | 'no-answer';

export interface CallActivityParticipant {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface CallActivityCardProps {
  callId: string;
  /** Who started it — a display name, never a raw userId. */
  startedBy?: string;
  /**
   * People in the call. While live these are the people to join; once ended
   * they are who was there.
   */
  participants?: readonly CallActivityParticipant[];
  /**
   * Whether the call is still going. This is the card's whole state machine:
   * live offers a way in, ended is a record.
   */
  live?: boolean;
  /** Wall-clock length in ms. Rendered only once the call has ended. */
  durationMs?: number;
  /**
   * When the call started (ISO string or epoch ms). While live, the card
   * counts up from it — "Live · 3:12" — on the reader's clock.
   */
  startedAt?: string | number;
  /**
   * Set when the invite never became a call: the card reads "Missed call",
   * "Declined" or "No answer" instead of a duration, and shows no roster.
   */
  outcome?: CallOutcome;
  /** The recording of this call, once there is one — with `onOpenRecording`, a link to it. */
  recordingId?: string;
  onOpenRecording?: (recordingId: string) => void;
  /**
   * True when the call had no camera, false when it had one — and UNDEFINED
   * when nobody knows.
   *
   * The third state is load-bearing. The invite frame does not carry this, so
   * a server-written record genuinely cannot tell, and defaulting to either
   * one puts a confident "Video call" on a call that may have been audio. An
   * unqualified "Call" is the true statement.
   */
  audioOnly?: boolean;
  /**
   * Whether the call was recorded — and UNDEFINED when the record does not
   * say, in which case the card says nothing about it. Only `false` produces
   * a note: a recording that exists announces itself in the thread as its own
   * card, so "Recorded" here would say it twice.
   */
  recorded?: boolean;
  /**
   * Why it was not recorded, as the platform-api decision code:
   * `room-setting-off`, `dm-not-opted-in:<userIds>`, … See
   * `describeNotRecorded` for the words each one becomes.
   */
  notRecordedReason?: string;
  /** The call's lobby (`room:design`, `dm:a:b`) — names the room in the note. */
  lobbyName?: string;
  /**
   * Joins the call. Ignored once `live` is false — a call that ended has
   * nothing to join, and the button would be a dead control. Omit it when the
   * viewer may not join, rather than rendering it disabled.
   */
  onJoin?: (callId: string) => void;
  className?: string;
  'data-testid'?: string;
}

/** "12m 4s" — the shape a transcript wants, not "00:12:04". */
export function formatCallDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '';
  const total = Math.round(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
  if (m > 0) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  return `${s}s`;
}

/**
 * Names, not ids, and never more than two before it starts counting.
 *
 * Counts EVERY participant, including the ones it cannot name — they are
 * faces in the row beside this sentence, so leaving them out of the sentence
 * makes the two disagree about how many people were there.
 */
export function describeParticipants(
  participants: readonly CallActivityParticipant[],
  live: boolean,
): string {
  const total = participants.length;
  if (total === 0) return live ? 'Nobody has joined yet' : 'Nobody joined';

  const named = (participants.map((p) => p.displayName).filter(Boolean) as string[]).slice(0, 2);
  const rest = total - named.length;
  const others = rest === 1 ? '1 other' : `${rest} others`;

  let subject: string;
  if (named.length === 0) {
    subject = total === 1 ? 'Someone' : `${total} people`;
  } else if (rest > 0) {
    subject = named.length === 1
      ? `${named[0]} and ${others}`
      : `${named[0]}, ${named[1]} and ${others}`;
  } else {
    subject = named.length === 1 ? named[0]! : `${named[0]} and ${named[1]}`;
  }

  const verb = total === 1 ? (live ? 'is' : 'was') : (live ? 'are' : 'were');
  return `${subject} ${verb} in the call`;
}

/**
 * The one-line reason a call was not recorded, in words a person can act on.
 *
 * The codes are platform-api's `recording.reason` vocabulary. Each maps to
 * what the person can DO about it — turn the room setting on, or opt in on
 * their profile — because "not recorded" alone sends them looking for a
 * setting they cannot name. An unknown code still gets the plain statement:
 * saying nothing would read as "recorded", which is the one thing it is not.
 */
export function describeNotRecorded(reason: string | undefined, lobbyName?: string): string {
  const code = reason ?? '';
  if (code === 'room-setting-off') {
    const slug = lobbyName?.startsWith('room:') ? lobbyName.slice('room:'.length) : '';
    return slug
      ? `Not recorded — recording is off for #${slug}; a room admin can turn it on under Manage #${slug}.`
      : 'Not recorded — recording is off for this room; a room admin can turn it on.';
  }
  if (code.startsWith('dm-not-opted-in')) {
    return "Not recorded — both people must turn on 'Record my DM calls' in their profile.";
  }
  return 'Not recorded.';
}

/** "3:12", "1:02:03" — a clock, because this one is running. */
export function formatElapsed(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '0:00';
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  return `${h > 0 ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

function toEpochMs(value: string | number | undefined): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value) {
    const t = Date.parse(value);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}

/**
 * Milliseconds since `startedAt`, re-read every second while `running`.
 * Null when there is no start to count from — the card then says "Live"
 * without a number rather than counting from a made-up zero.
 */
export function useElapsedMs(startedAt: string | number | undefined, running: boolean): number | null {
  const start = toEpochMs(startedAt);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running || start === null) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [running, start]);
  if (start === null) return null;
  return Math.max(0, now - start);
}

/** The headline for an invite that never became a call. */
export function describeOutcome(outcome: CallOutcome): string {
  if (outcome === 'declined') return 'Declined';
  if (outcome === 'no-answer') return 'No answer';
  return 'Missed call';
}

export function CallActivityCard({
  callId,
  startedBy,
  participants = [],
  live = false,
  durationMs,
  startedAt,
  outcome,
  recordingId,
  onOpenRecording,
  audioOnly,
  recorded,
  notRecordedReason,
  lobbyName,
  onJoin,
  className,
  'data-testid': testId = 'call-activity-card',
}: CallActivityCardProps) {
  // A missed call was never live, whatever a stale flag says.
  const isLive = live && !outcome;
  const elapsedMs = useElapsedMs(startedAt, isLive);
  const duration = !isLive && typeof durationMs === 'number' ? formatCallDuration(durationMs) : '';
  // "Call" rather than a guess when the record does not say which kind.
  const kindLabel = audioOnly === undefined ? 'Call' : audioOnly ? 'Audio call' : 'Video call';

  let title: string;
  let detail: string;
  if (outcome) {
    title = describeOutcome(outcome);
    detail = startedBy ? `${startedBy} called` : 'Nobody answered';
  } else if (isLive) {
    title = `${kindLabel} in progress`;
    detail = describeParticipants(participants, true);
  } else {
    title = duration ? `${kindLabel} ended · ${duration}` : `${kindLabel} ended`;
    detail = startedBy
      ? participants.length === 0 ? `${startedBy} started the call · Nobody joined` : `${startedBy} started the call`
      : describeParticipants(participants, false);
  }

  return (
    <div
      data-testid={testId}
      data-call-id={callId}
      data-live={isLive ? 'true' : undefined}
      data-outcome={outcome}
      className={cn(
        'flex items-center gap-3 rounded-lg border px-3 py-2',
        // A live call is the one row in a transcript worth interrupting for.
        isLive ? 'border-primary bg-primary-bg' : 'border-border bg-surface-inset',
        className,
      )}
    >
      <span
        aria-hidden
        className="relative grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base"
      >
        {audioOnly === undefined ? '\u{1F4DE}' : audioOnly ? '\u{1F4DE}' : '\u{1F4F9}'}
        {/* The pulse: a ring that swells out of a solid dot. `motion-safe`
            keeps the dot and drops the swell for anyone who asked the OS
            for reduced motion — a still green dot still says "live". */}
        {isLive && (
          <span
            data-testid={`${testId}-pulse`}
            className="absolute -right-1 -top-1 grid h-3 w-3 place-items-center"
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success ring-2 ring-surface" />
          </span>
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cn('truncate text-[13px] font-semibold', outcome ? 'text-danger' : 'text-text-primary')}>
          {title}
        </span>
        <span className="flex min-w-0 items-center gap-1 text-[11px] text-text-tertiary">
          {isLive && (
            <span
              className="shrink-0 font-semibold text-success"
              data-testid={`${testId}-live`}
              aria-live="off"
            >
              {elapsedMs === null ? 'Live' : `Live · ${formatElapsed(elapsedMs)}`}
            </span>
          )}
          {isLive && <span aria-hidden className="shrink-0">·</span>}
          <span className="truncate">{detail}</span>
        </span>
        {/* Only once the call is over: while it is live the chip in the call
            chrome owns this statement, and a note here would lag it. */}
        {!isLive && !outcome && recorded === false && (
          <span className="truncate text-[11px] text-text-tertiary" data-testid={`${testId}-not-recorded`}>
            {describeNotRecorded(notRecordedReason, lobbyName)}
          </span>
        )}
      </span>

      {!outcome && participants.length > 0 && (
        <span className="shrink-0" data-testid={`${testId}-participants`}>
          <PresenceAvatars
            users={participants.map((p) => ({
              id: p.userId,
              // Never the id — an avatar reading "6e" because the userId began
              // "6ea7c8fd" names someone by their key.
              name: p.displayName ?? 'Someone',
              avatarUrl: p.avatarUrl,
              online: isLive,
            }))}
            maxVisible={3}
            size={22}
          />
        </span>
      )}

      {!isLive && recordingId && onOpenRecording && (
        <button
          data-ui-part=""
          type="button"
          data-testid={`${testId}-recording`}
          onClick={() => onOpenRecording(recordingId)}
          className="shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover"
        >
          Recording
        </button>
      )}

      {isLive && onJoin && (
        <button
          data-ui-part=""
          type="button"
          data-testid={`${testId}-join`}
          onClick={() => onJoin(callId)}
          className="shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-on-primary hover:opacity-90"
        >
          Join
        </button>
      )}
    </div>
  );
}

export default CallActivityCard;
