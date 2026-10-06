export interface CaptionLine {
    id: string;
    speakerId: string;
    speakerName?: string;
    text: string;
    /** ISO timestamp of caption emission. Seeds the linger timer for lines
     *  that never update again. */
    at: string;
    /** True if the caption is still being updated (interim) vs final.
     *  Omitted/false = final: final text always replaces the displayed text;
     *  interim text is subject to the stable-transcription shrink filter. */
    interim?: boolean;
}
export interface TranscriptOverlayProps {
    lines: CaptionLine[];
    /** How many recent lines to show simultaneously. Default 4. */
    maxLines?: number;
    /**
     * Fade window ms: opacity ramps from 1 toward the 0.35 floor over this
     * span of no-update time. Default = REMOVE_AFTER_MS (3000), so a quiet
     * line fades all the way out and is then removed.
     */
    fadeAfterMs?: number;
    /**
     * "Now" in ms since epoch, used as the reference point for each line's
     * since-last-update opacity. Defaults to `Date.now()` — exposed for
     * deterministic tests and stories. When provided, the internal live-fade
     * interval is disabled, so the render is a pure function of props (plus
     * the per-line displayed-text memory).
     *
     * Without it, any fixture built from fixed ISO timestamps is arbitrarily
     * old by the time it renders, so every line has aged past the 3s linger
     * window and nothing renders at all. Pass the same epoch the fixture
     * timestamps were written against and the ramp is reproducible.
     */
    now?: number;
    className?: string;
}
/** A line is dropped from display this long after its LAST update. */
export declare const REMOVE_AFTER_MS = 3000;
/** Interim text only replaces the displayed text when it is longer than
 *  this fraction of what is currently shown (anti shrink-flicker). */
export declare const STABLE_TRANSCRIPTION_FACTOR = 0.85;
export declare function TranscriptOverlay({ lines, maxLines, fadeAfterMs, now: nowProp, className, }: TranscriptOverlayProps): import("react").JSX.Element | null;
export default TranscriptOverlay;
//# sourceMappingURL=TranscriptOverlay.d.ts.map