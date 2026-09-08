// GoLiveButton — the smallest honest way to START a broadcast on purpose.
//
// ## The gap this fills
//
// Broadcasting used to be a SIDE EFFECT. Someone starts a call, LVS happens
// to publish that call's channel, and anyone else in the room may or may not
// be offered a Watch button depending on whether the manifest had started by
// the time they looked. Nobody ever DECIDED to broadcast, the audience was
// never told one was coming, and the only route to a mass audience was "start
// a call and hope somebody presses Watch".
//
// This is the control that makes the intent expressible: one place that says
// out loud what is about to happen, reports honestly on the gap between
// pressing it and being watchable, and admits when it did not work.
//
// ## Why the announcement is not optional
//
// `onGoLive` is expected to do two things and the second is the point: start
// the broadcast, and TELL the channel. A broadcast nobody is told about has
// the same audience as no broadcast — which is precisely the state this
// exists to leave. The host owns both halves because only the host knows how
// its channel is addressed; the button owns the wording and the promise, and
// `channelName` lets it name the audience rather than gesturing at it.
//
// ## Three states, not two — and the third is where this used to lie
//
// "On a call" and "being watched" are DIFFERENT facts and they fail
// separately. The call can be up while LVS has published nothing, in which
// case the broadcaster is talking to an empty room that cannot even be
// entered. A pill that says "You are live" in that state is the broadcaster's
// version of a Watch button over a stream that does not exist, so
// `streamReady` keeps the two apart:
//
//   undefined — nobody checked. Resting behaviour, no claim either way.
//   true      — a viewer could watch right now.
//   false     — the call is up and NOTHING is being broadcast.
//
// ## What it does not own
//
// How to STOP. Ending a broadcast may or may not be distinct from leaving the
// call, and only the host knows: it supplies `onEndBroadcast` when it has a
// real handler, or `endHint` when the stop control lives somewhere else (a
// call window's hang-up, say). Rendering an End button that is wired to
// nothing would be worse than saying where the real one is.

import { cn } from '../../lib/cn';

export interface GoLiveButtonProps {
  /**
   * Actually broadcasting — media flowing, not "a session exists". The
   * control stops being an action and becomes a status: a second "Go live"
   * over a live broadcast is an offer to start something already running.
   *
   * Hosts must NOT pass a merely-open session here. A call that is still
   * negotiating belongs in `starting`, and one that failed belongs in
   * `error` — both used to arrive as `live`, which is how a broadcast that
   * never came up reported itself as on air.
   */
  live?: boolean;
  /** Between the click and the broadcast actually being up. */
  starting?: boolean;
  /**
   * Start the broadcast AND announce it to the channel. See the header — the
   * announcement is the half that makes it a broadcast rather than a call.
   */
  onGoLive?: () => void;
  /**
   * Ends it, when the host has a handler that really does. Omit it and the
   * live state carries `endHint` instead — a label that says where the stop
   * control is beats a button that is wired to nothing.
   */
  onEndBroadcast?: () => void;
  /**
   * Watchers, when known. Same contract as StreamStage: `null`/omitted is
   * "nobody measured", a numeric 0 is a measured empty house. A broadcaster
   * is the one person for whom the honest 0 is worth the discouragement — it
   * is the difference between "nobody came" and "the counter is broken".
   */
  viewerCount?: number | null;
  /**
   * Is anything actually reaching an audience? See the header. `undefined`
   * means nobody checked; `false` is the state where the call is up and the
   * stream is not, which this control must never render as "You are live".
   */
  streamReady?: boolean;
  /**
   * Who gets told, named — e.g. `#design`. The social consequence of the
   * press is the half people underestimate, and "the channel" is vaguer than
   * the product can afford to be about a message it is going to post.
   */
  channelName?: string;
  /**
   * Why the last attempt did not work, in words the person can act on. Shown
   * as a live-region alert beside the resting button, because a failure that
   * only reverts the button reads as "the click did nothing".
   */
  error?: string | null;
  /** Where the stop control is, when this component does not own one. */
  endHint?: string;
  /** Replaces the resting wording, e.g. "Broadcast this room". */
  label?: string;
  disabled?: boolean;
  /** On the wrapper — the control now has a hint line under it. */
  className?: string;
  'data-testid'?: string;
}

function whatItDoes(channelName?: string): string {
  return `Start broadcasting this room and tell everyone in ${channelName ?? 'the channel'}`;
}

const PILL =
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ' +
  'border-none transition-colors disabled:cursor-not-allowed disabled:opacity-50';

const HINT = 'text-xs text-text-tertiary';

export function GoLiveButton({
  live = false,
  starting = false,
  onGoLive,
  onEndBroadcast,
  viewerCount,
  streamReady,
  channelName,
  error,
  endHint,
  label,
  disabled,
  className,
  'data-testid': testId = 'go-live',
}: GoLiveButtonProps) {
  if (live) {
    // The call is up and nothing is going out. Said plainly, because the
    // broadcaster is the only person who can do anything about it and the
    // audience side of this failure is silent — a viewer just sees no invite.
    const dark = streamReady === false;
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <div
          data-testid={testId}
          data-live="true"
          data-stream={streamReady === undefined ? 'unknown' : streamReady ? 'ready' : 'pending'}
          className="inline-flex items-center gap-2"
        >
          {/* Announced, not merely repainted. Pressing "Go live" REPLACES the
              button with this pill, so a screen-reader user loses the element
              they were on and, without a live region, is told nothing about
              what happened. `role="status"` reads the new state out. */}
          <span
            data-testid={`${testId}-status`}
            role="status"
            className={cn(PILL, dark ? 'bg-warning-bg text-warning-fg' : 'bg-danger text-white')}
          >
            {/* A dot that is present whether or not the animation CSS is — the
                consuming app has no Tailwind build of its own and only gets the
                classes this library's source used. */}
            <span
              aria-hidden
              className={cn('h-1.5 w-1.5 rounded-full', dark ? 'bg-warning-fg' : 'bg-white')}
            />
            {dark ? 'On the call — no stream yet' : 'You are live'}
          </span>
          {/* A measured zero is shown, not swallowed. See the prop docs: the
              broadcaster is the one person who needs to know the difference
              between an empty room and a broken counter. Never beside the
              "no stream yet" pill, where a 0 would be read as an audience
              verdict rather than the absence of anything to watch. */}
          {!dark
            && typeof viewerCount === 'number'
            && Number.isFinite(viewerCount)
            && viewerCount >= 0 && (
            <span data-testid={`${testId}-viewers`} className={HINT}>
              {viewerCount} watching
            </span>
          )}
          {onEndBroadcast && (
            <button
              type="button"
              data-testid={`${testId}-end`}
              onClick={onEndBroadcast}
              className={cn(PILL, 'cursor-pointer bg-surface-panel text-text-secondary hover:bg-surface-hover')}
            >
              End broadcast
            </button>
          )}
        </div>
        {(dark || (!onEndBroadcast && endHint)) && (
          <span data-testid={`${testId}-hint`} className={HINT}>
            {dark
              ? 'Nobody can watch yet — the stream has not started.'
              : endHint}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <button
        type="button"
        data-testid={testId}
        data-live="false"
        disabled={disabled || starting}
        onClick={onGoLive}
        // Said in full, because the click has two consequences and one of them
        // is public. "Go live" alone reads as a preview toggle; a control that
        // posts to a channel has to admit it before it is pressed, not after.
        //
        // In the accessible name as well as the tooltip: a `title` is not
        // announced by every screen reader, and a touch user never sees one at
        // all — so the half of this control's meaning that matters most was
        // reaching only the people who hover. The visible text leads, so
        // "press Go live" still works as a spoken instruction.
        title={whatItDoes(channelName)}
        aria-label={
          starting
            ? 'Going live…'
            : `${label ?? 'Go live'} — ${whatItDoes(channelName).toLowerCase()}`
        }
        className={cn(PILL, 'cursor-pointer bg-danger text-white hover:opacity-90')}
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
        {starting ? 'Going live…' : (label ?? 'Go live')}
      </button>
      {/* The cost, before the click, in the same place for everyone — not only
          for people who hover long enough to read a tooltip. */}
      <span data-testid={`${testId}-hint`} className={HINT}>
        {starting
          ? 'Connecting — this takes a few seconds.'
          : `Starts a broadcast in ${channelName ?? 'this channel'} and tells everyone there.`}
      </span>
      {/* A failure that only reverts the button reads as "the click did
          nothing", which is the one thing it definitely did not do. */}
      {error && (
        <span data-testid={`${testId}-error`} role="alert" className="text-xs text-danger-fg">
          {error}
        </span>
      )}
    </div>
  );
}

export default GoLiveButton;
