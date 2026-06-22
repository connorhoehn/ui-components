import { CSSProperties, ReactNode } from 'react';
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
    style?: CSSProperties;
}
/**
 * Static N-way grid: 1 / 2×2 / 3×3 / 4×4 column count based on participant
 * count. Tiles do NOT reflow on speaker change — speaking is indicated via
 * border highlight on the tile only (see ParticipantTile). For an
 * active-speaker-aware spotlight layout, use `HangoutLayout` instead.
 */
export declare function VideoGrid({ participants, style }: VideoGridProps): import("react").JSX.Element;
//# sourceMappingURL=VideoGrid.d.ts.map