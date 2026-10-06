import type { CSSProperties, ReactNode } from 'react';
import type { HangoutLayoutParticipant, HangoutMode } from './HangoutLayoutTypes';
export type { HangoutLayoutParticipant, HangoutMode } from './HangoutLayoutTypes';
export interface HangoutLayoutProps {
    /** Remote participants (callers should NOT include the local user here). */
    participants: HangoutLayoutParticipant[];
    /** The local user. Rendered as a tile in the grid at N≥3 (per Meet/Teams
     * convention) or as a small PiP overlay at N≤2. Pass null/undefined to
     * suppress entirely. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** 'auto' = grid view; 'spotlight' = main slot + filmstrip. Spotlight is
     * forced on whenever `spotlightContent` is non-null regardless of mode. */
    mode?: HangoutMode;
    /** Active speaker id — drives the spotlight slot (in spotlight mode) and
     * the green-border highlight (in any mode). Hysteresis is applied
     * internally (default 750ms) so brief speech bursts don't flicker the
     * main slot. */
    activeSpeakerId?: string | null;
    /** Override the hysteresis window (ms) before the spotlight slot swaps.
     * 0 disables hysteresis (immediate swap). Default 750. */
    speakerHysteresisMs?: number;
    /** Content for the spotlight main slot — typically a `<video>` for a
     * shared screen, or a `<ParticipantTile>` clone. When provided, the
     * layout switches to spotlight regardless of `mode`. */
    spotlightContent?: ReactNode;
    /** Attribution label for `spotlightContent` — see HangoutSpotlight. */
    spotlightContentLabel?: string;
    /** Click handler per tile (e.g. pin / promote to spotlight). */
    onParticipantClick?: (id: string) => void;
    /** Fill parent dimensions — propagates down through grid/spotlight/tile
     *  so the layout adapts to docked/fullscreen containers instead of
     *  enforcing aspect-video against an unsized parent. */
    fillParent?: boolean;
    /** Local-PiP width (grid mode) — defaults to 96 for mini, override for
     *  larger widget modes. */
    pipWidth?: number;
    /** Filmstrip tile width (spotlight mode) — defaults to 128 for mini. */
    filmstripTileWidth?: number;
    className?: string;
    style?: CSSProperties;
}
export declare function HangoutLayout({ participants, localParticipant, mode, activeSpeakerId, speakerHysteresisMs, spotlightContent, spotlightContentLabel, onParticipantClick, fillParent, pipWidth, filmstripTileWidth, className, style, }: HangoutLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=HangoutLayout.d.ts.map