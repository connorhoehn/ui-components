export interface StreamAudioOnlyProps {
    /** Who is talking. Renders an avatar and a name when known. */
    name?: string;
    /** Profile image for the speaker; falls back to initials. */
    avatarUrl?: string;
    /**
     * Measured loudness, 0..1, or null when it cannot be measured. Null is not
     * silence — see the file header.
     */
    level?: number | null;
    /** Whether audio is actually reaching the viewer (playing AND not muted). */
    active?: boolean;
    /** Muted gets its own wording: the fix is one click away and worth naming. */
    muted?: boolean;
    /** Replaces the default explanation line. */
    hint?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function StreamAudioOnly({ name, avatarUrl, level, active, muted, hint, className, 'data-testid': testId, }: StreamAudioOnlyProps): import("react").JSX.Element;
export default StreamAudioOnly;
//# sourceMappingURL=StreamAudioOnly.d.ts.map