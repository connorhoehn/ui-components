/** Thin participant shape — same contract as ResumeCallParticipant:
 *  caller MUST pass safeDisplayName output, never a raw UUID. */
export interface ActiveCallBannerParticipant {
    userId: string;
    name: string;
    avatarUrl?: string;
}
export interface ActiveCallBannerProps {
    /** Visibility — when false nothing renders. */
    open: boolean;
    /** Join button → consumer starts its join flow (may be async; flip
     *  `loading` while pending). */
    onJoin: () => void | Promise<void>;
    /** Dismiss (X / "Not now") → consumer hides and typically remembers
     *  the dismissal for this callId so the banner doesn't re-appear. */
    onDismiss: () => void;
    /** Human-readable lobby label shown in the banner title. */
    lobbyLabel: string;
    /** Elapsed ms at mount — live display advances on a local 1s tick,
     *  so the parent never re-renders to move the clock. 0/absent hides
     *  the duration chip (status replies without startedAt). */
    elapsedMs?: number;
    /** Participants currently in the call. Names pre-resolved. */
    participants: ActiveCallBannerParticipant[];
    /** Overrides the "N in call" count when the caller knows a truer
     *  number than participants.length (e.g. server participantCount
     *  when some names couldn't be resolved). */
    participantCount?: number;
    /** True while the join attempt is in flight. */
    loading?: boolean;
}
export declare function ActiveCallBanner({ open, onJoin, onDismiss, lobbyLabel, elapsedMs, participants, participantCount, loading, }: ActiveCallBannerProps): import("react").JSX.Element | null;
export default ActiveCallBanner;
//# sourceMappingURL=ActiveCallBanner.d.ts.map