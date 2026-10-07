import type { CSSProperties } from 'react';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';
export interface HangoutGridProps {
    /** Remote participants. Caller should NOT include the local user here. */
    participants: HangoutLayoutParticipant[];
    /** The local user. Placed in-grid at N≥2, as PiP at N=1, solo at N=0,
     *  or omitted entirely if null/undefined. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** Active speaker id — drives the green-border highlight (no reflow). */
    activeSpeakerId?: string | null;
    /** Click handler per tile (e.g. pin / promote to spotlight). */
    onParticipantClick?: (id: string) => void;
    /** Fill parent dimensions instead of letting tiles drive height via
     *  aspect-video. Used in docked + fullscreen widget modes where the
     *  outer container owns dimensions. */
    fillParent?: boolean;
    /** Local-PiP width (px) — defaults to 96 (small widget). Larger sizes
     *  for docked (128) and fullscreen (192). */
    pipWidth?: number;
    className?: string;
    style?: CSSProperties;
}
export declare function HangoutGrid({ participants, localParticipant, activeSpeakerId, onParticipantClick, fillParent, pipWidth, className, style, }: HangoutGridProps): import("react").JSX.Element;
export declare function gridCols(count: number): number;
//# sourceMappingURL=HangoutGrid.d.ts.map