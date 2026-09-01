import type { ReactNode } from 'react';
export interface RosterParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    isScreenSharing?: boolean;
    handRaised?: boolean;
}
export interface RosterPanelProps {
    participants: RosterParticipant[];
    activeSpeakerId?: string | null;
    /** Click handler per row — e.g. promote to spotlight. */
    onParticipantClick?: (id: string) => void;
    /** Total-participants count shown in header. Defaults to participants.length. */
    count?: number;
    /** Optional header — e.g. "In this call". Default "Participants". */
    title?: string;
    /** Optional footer — e.g. an "+ Add" button. */
    footer?: ReactNode;
    /** 'dark' renders on black call chrome (the shipped token palette is
     *  light-only, so the default is a white slab inside the dark call
     *  widget — 2026-08-25 audit P0-3). */
    tone?: 'light' | 'dark';
    className?: string;
}
export declare function RosterPanel({ participants, activeSpeakerId, onParticipantClick, count, title, footer, tone, className, }: RosterPanelProps): import("react").JSX.Element;
export default RosterPanel;
//# sourceMappingURL=RosterPanel.d.ts.map