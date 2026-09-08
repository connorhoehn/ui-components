// GoLiveButton — the smallest honest way to START a broadcast on purpose.
//
// ## The gap this fills
//
// Broadcasting is currently a SIDE EFFECT. Someone starts a call, LVS happens
// to publish that call's channel, and anyone else in the room may or may not
// be offered a Watch button depending on whether the manifest had started by
// the time they looked. Nobody ever DECIDED to broadcast, the audience was
// never told one was coming, and the only route to a mass audience is "start a
// call and hope somebody presses Watch".
//
// That is not a missing button — it is a missing product decision (is a
// broadcast a distinct thing you schedule, or is every call implicitly
// watchable?). This component deliberately does NOT answer it. It is the
// minimum that makes the intent expressible: one control that says out loud
// what is about to happen, so the decision can be evaluated against something
// real instead of a description.
//
// ## Why the announcement is not optional
//
// `onGoLive` is expected to do two things and the second is the point: start
// the broadcast, and TELL the channel. A broadcast nobody is told about has
// the same audience as no broadcast — which is precisely the state this
// exists to leave. The host owns both halves because only the host knows how
// its channel is addressed; the button owns the wording and the promise.
//
// ## Off by default, at the call site
//
// This ships inert. Hosts gate it behind their own flag rather than the
// component defaulting itself on, because "should a room offer this at all"
// is the open question — and a component that decides that for the product
// has answered it by shipping.

import { cn } from '../../lib/cn';

export interface GoLiveButtonProps {
  /**
   * Already broadcasting. The control stops being an action and becomes a
   * status: a second "Go live" over a live broadcast is an offer to start
   * something that is already running.
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
   * Ends it. Omitted while the product has not decided whether "stop
   * broadcasting" is distinct from "leave the call" — with no handler the
   * live state is a label, which is the truthful shape for now.
   */
  onEndBroadcast?: () => void;
  /**
   * Watchers, when known. Same contract as StreamStage: `null`/omitted is
   * "nobody measured", a numeric 0 is a measured empty house. A broadcaster
   * is the one person for whom the honest 0 is worth the discouragement — it
   * is the difference between "nobody came" and "the counter is broken".
   */
  viewerCount?: number | null;
  /** Replaces the resting wording, e.g. "Broadcast this room". */
  label?: string;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

const WHAT_IT_DOES = 'Start broadcasting this room and tell everyone in the channel';

const PILL =
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ' +
  'border-none transition-colors disabled:cursor-not-allowed disabled:opacity-50';

export function GoLiveButton({
  live = false,
  starting = false,
  onGoLive,
  onEndBroadcast,
  viewerCount,
  label,
  disabled,
  className,
  'data-testid': testId = 'go-live',
}: GoLiveButtonProps) {
  if (live) {
    return (
      <div
        data-testid={testId}
        data-live="true"
        className={cn('inline-flex items-center gap-2', className)}
      >
        {/* Announced, not merely repainted. Pressing "Go live" REPLACES the
            button with this pill, so a screen-reader user loses the element
            they were on and, without a live region, is told nothing about
            what happened. `role="status"` reads the new state out. */}
        <span
          data-testid={`${testId}-status`}
          role="status"
          className={cn(PILL, 'bg-danger text-white')}
        >
          {/* A dot that is present whether or not the animation CSS is — the
              consuming app has no Tailwind build of its own and only gets the
              classes this library's source used. */}
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
          You are live
        </span>
        {/* A measured zero is shown, not swallowed. See the prop docs: the
            broadcaster is the one person who needs to know the difference
            between an empty room and a broken counter. */}
        {typeof viewerCount === 'number' && Number.isFinite(viewerCount) && viewerCount >= 0 && (
          <span data-testid={`${testId}-viewers`} className="text-xs text-text-tertiary">
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
    );
  }

  return (
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
      title={WHAT_IT_DOES}
      aria-label={
        starting ? 'Going live…' : `${label ?? 'Go live'} — ${WHAT_IT_DOES.toLowerCase()}`
      }
      className={cn(PILL, 'cursor-pointer bg-danger text-white hover:opacity-90', className)}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
      {starting ? 'Going live…' : (label ?? 'Go live')}
    </button>
  );
}

export default GoLiveButton;
