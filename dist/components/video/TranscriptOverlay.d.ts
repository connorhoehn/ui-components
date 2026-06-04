export interface CaptionLine {
    id: string;
    speakerId: string;
    speakerName?: string;
    text: string;
    /** ISO timestamp of caption emission. Used for fade-out + ordering. */
    at: string;
    /** True if the caption is still being updated (interim) vs final. */
    interim?: boolean;
}
export interface TranscriptOverlayProps {
    lines: CaptionLine[];
    /** How many recent lines to show simultaneously. Default 3. */
    maxLines?: number;
    /** Fade-out duration ms. Default 8000. */
    fadeAfterMs?: number;
    className?: string;
}
export declare function TranscriptOverlay({ lines, maxLines, fadeAfterMs, className, }: TranscriptOverlayProps): import("react/jsx-runtime").JSX.Element | null;
export default TranscriptOverlay;
//# sourceMappingURL=TranscriptOverlay.d.ts.map