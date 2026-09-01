/** Resume-dialog participant shape. Independent of any hangout-internal
 *  type so callers can pass thin {id,name} objects without dragging in
 *  PresenceUser / SfuParticipant. */
export interface ResumeCallParticipant {
    /** Stable identifier — used as React key + safeDisplayName fallback. */
    userId: string;
    /** Pre-resolved display name. Caller MUST pass safeDisplayName output
     *  so a raw UUID never reaches the dialog. */
    name: string;
    /** Optional avatar URL — Avatar falls back to initials when absent. */
    avatarUrl?: string;
}
export interface ResumeCallDialogProps {
    /** Visibility — when false the modal is unmounted entirely. */
    open: boolean;
    /** Backdrop click / Esc / Dismiss button → caller decides whether to
     *  hide (typically yes) and whether to remember the dismissal. */
    onClose: () => void;
    /** Reconnect button. May be async; the dialog spins while pending
     *  IF `loading` is also true (the caller controls that state). */
    onReconnect: () => void | Promise<void>;
    /** Display name of the user who originally started the call. Pass
     *  safeDisplayName output — must never be a raw UUID. */
    callerName: string;
    /** Human-readable lobby name shown in the dialog subtitle. */
    lobbyName: string;
    /** Elapsed ms at MOUNT time. The dialog re-derives the displayed
     *  duration from a per-second tick so the parent never has to re-
     *  render to advance the clock. Pass `Date.now() - call.startedAtMs`
     *  (or just `call.durationMs` from the API). */
    elapsedMs: number;
    /** Other participants currently in the call (excludes self). When
     *  empty the dialog still renders — the prompt becomes
     *  "you were in a call" with no chip row — but the parent should
     *  generally not show the dialog with zero participants (see
     *  useActiveCallResume's filter). */
    participants: ResumeCallParticipant[];
    /** True while a reconnect attempt is in flight. Disables the buttons
     *  and replaces the Reconnect label with "Reconnecting…". */
    loading?: boolean;
}
export declare function ResumeCallDialog({ open, onClose, onReconnect, callerName, lobbyName, elapsedMs, participants, loading, }: ResumeCallDialogProps): import("react").JSX.Element;
export default ResumeCallDialog;
//# sourceMappingURL=ResumeCallDialog.d.ts.map