import type { CSSProperties, ReactNode } from 'react';
export interface Participant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isSpeaking?: boolean;
    isMuted?: boolean;
    isLocal?: boolean;
    videoElement?: ReactNode;
}
export interface VideoGridProps {
    participants: Participant[];
    /**
     * Sizing / spacing classes from the caller. Prefer this over `style`:
     * callers only ever needed `style` to constrain the grid's width, which
     * forced a wrapper `<div>` on every consumer (inline styles are banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
/**
 * Static N-way grid: 1 / 2×2 / 3×3 / 4×4 column count based on participant
 * count. Tiles do NOT reflow on speaker change — speaking is indicated via
 * border highlight on the tile only (see ParticipantTile). For an
 * active-speaker-aware spotlight layout, use `HangoutLayout` instead.
 */
export declare function VideoGrid({ participants, className, style }: VideoGridProps): import("react").JSX.Element;
//# sourceMappingURL=VideoGrid.d.ts.map