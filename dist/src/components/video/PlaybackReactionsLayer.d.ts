export interface TimedReaction {
    id: string;
    emoji: string;
    /** Milliseconds from the start of the recording. */
    offsetMs: number;
    displayName?: string;
}
export interface PlaybackReactionsLayerProps {
    reactions: TimedReaction[];
    /** Current playhead position in ms (player timeupdate). */
    currentTimeMs: number;
    className?: string;
}
export declare function PlaybackReactionsLayer({ reactions, currentTimeMs, className, }: PlaybackReactionsLayerProps): import("react").JSX.Element;
//# sourceMappingURL=PlaybackReactionsLayer.d.ts.map