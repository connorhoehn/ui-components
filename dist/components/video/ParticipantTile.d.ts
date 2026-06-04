import type { CSSProperties, ReactNode } from 'react';
export interface ParticipantTileProps {
    /** Unique identifier for keying / pin actions. */
    id: string;
    /** Name shown in the bottom badge. */
    displayName: string;
    /** Optional avatar URL — used as fallback when no videoElement is provided. */
    avatarUrl?: string;
    /** Whether to render with a speaking-indicator green border + corner dot. */
    isSpeaking?: boolean;
    /** Whether to overlay a muted-mic glyph in the badge. */
    isMuted?: boolean;
    /** Whether this tile represents the local user — replaces the displayName label with "You". */
    isLocal?: boolean;
    /** When true, applies the "main / spotlight" emphasis style (larger border, taller aspect). */
    isSpotlight?: boolean;
    /** A pre-rendered media element (a `<video>` typically) — the consumer manages srcObject. */
    videoElement?: ReactNode;
    /** Click handler — used by HangoutLayout for pin / spotlight selection. */
    onClick?: () => void;
    /** Escape hatches. */
    className?: string;
    style?: CSSProperties;
}
/**
 * Single-participant tile used in `VideoGrid` and `HangoutLayout`. Pure
 * presentational — no media wiring, no signaling — caller owns the `<video>`
 * element via `videoElement` and the speaking/mute booleans.
 *
 * The speaking border is intentionally just a border (no reflow): per industry
 * convention (Meet/Teams/Zoom), reflowing tiles on speaker change is jarring;
 * a green border is the agreed-on cue.
 */
export declare function ParticipantTile({ id, displayName, avatarUrl, isSpeaking, isMuted, isLocal, isSpotlight, videoElement, onClick, className, style, }: ParticipantTileProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ParticipantTile.d.ts.map