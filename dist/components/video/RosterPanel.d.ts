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
    className?: string;
}
export declare function RosterPanel({ participants, activeSpeakerId, onParticipantClick, count, title, footer, className, }: RosterPanelProps): import("react").JSX.Element;
export default RosterPanel;
//# sourceMappingURL=RosterPanel.d.ts.map