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
     * The broadcaster's OWN connection, while live.
     *
     * `streamReady` answers "did this broadcast ever reach anybody" and it
     * latches: hosts derive it from a session record that stops being re-asked
     * once it is true. So it catches a broadcast that never came up and is
     * silent about one that stops halfway — which is the failure the person
     * presenting is least able to notice on their own, because their own
     * preview keeps playing from their own camera.
     *
     * Observed: a broadcaster whose network dropped mid-broadcast was shown
     * "You are live · 1 watching" for the full 30s the drop lasted, while the
     * audience was already being told the stream had stopped responding.
     *
     *   'online'   — nothing is wrong, or nobody is watching the connection.
     *   'unstable' — the transport is retrying. Media may not be going out.
     *   'offline'  — the transport is down. Nothing is going out.
     *
     * Anything but `online` retires the confident pill. The claim "you are
     * live" is a claim about OTHER PEOPLE, and it must not outlive the
     * connection that would carry it to them.
     */
    connection?: 'online' | 'unstable' | 'offline';
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
export declare function GoLiveButton({ live, starting, onGoLive, onEndBroadcast, viewerCount, streamReady, connection, channelName, error, endHint, label, disabled, className, 'data-testid': testId, }: GoLiveButtonProps): import("react").JSX.Element;
export default GoLiveButton;
//# sourceMappingURL=GoLiveButton.d.ts.map