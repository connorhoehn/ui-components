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
// ## Why the duration is only shown when it is over
//
// A running timer in a transcript is noise: the number is stale the instant
// it renders, and the transcript is not a place anyone watches a clock. While
// the call is live the honest and useful statement is who is in it. The
// duration becomes interesting exactly once it is final.

import { PresenceAvatars } from '../shared/PresenceAvatars';
import { cn } from '../../lib/cn';

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

export function CallActivityCard({
  callId,
  startedBy,
  participants = [],
  live = false,
  durationMs,
  audioOnly,
  recorded,
  notRecordedReason,
  lobbyName,
  onJoin,
  className,
  'data-testid': testId = 'call-activity-card',
}: CallActivityCardProps) {
  const duration = !live && typeof durationMs === 'number' ? formatCallDuration(durationMs) : '';
  // "Call" rather than a guess when the record does not say which kind.
  const kindLabel = audioOnly === undefined ? 'Call' : audioOnly ? 'Audio call' : 'Video call';

  const detail = live
    ? describeParticipants(participants, true)
    : [
        startedBy ? `${startedBy} started a call` : 'Call ended',
        duration,
      ].filter(Boolean).join(' · ');

  return (
    <div
      data-testid={testId}
      data-call-id={callId}
      data-live={live ? 'true' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg border px-3 py-2',
        // A live call is the one row in a transcript worth interrupting for.
        live ? 'border-primary bg-primary-bg' : 'border-border bg-surface-inset',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded text-base',
          live ? 'bg-surface' : 'bg-surface',
        )}
      >
        {audioOnly === undefined ? '\u{1F4DE}' : audioOnly ? '\u{1F4DE}' : '\u{1F4F9}'}
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-semibold text-text-primary">
          {live ? `${kindLabel} in progress` : kindLabel}
        </span>
        <span className="truncate text-[11px] text-text-tertiary">{detail}</span>
        {/* Only once the call is over: while it is live the chip in the call
            chrome owns this statement, and a note here would lag it. */}
        {!live && recorded === false && (
          <span className="truncate text-[11px] text-text-tertiary" data-testid={`${testId}-not-recorded`}>
            {describeNotRecorded(notRecordedReason, lobbyName)}
          </span>
        )}
      </span>

      {participants.length > 0 && (
        <span className="shrink-0" data-testid={`${testId}-participants`}>
          <PresenceAvatars
            users={participants.map((p) => ({
              id: p.userId,
              // Never the id — an avatar reading "6e" because the userId began
              // "6ea7c8fd" names someone by their key.
              name: p.displayName ?? 'Someone',
              avatarUrl: p.avatarUrl,
              online: live,
            }))}
            maxVisible={3}
            size={22}
          />
        </span>
      )}

      {live && onJoin && (
        <button
          type="button"
          data-testid={`${testId}-join`}
          onClick={() => onJoin(callId)}
          className="shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90"
        >
          Join
        </button>
      )}
    </div>
  );
}

export default CallActivityCard;
