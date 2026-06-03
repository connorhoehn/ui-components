import type { CSSProperties } from 'react';
export interface CallStripParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isSpeaking?: boolean;
}
export interface CallParticipantStripProps {
    /** Participants in the call. */
    participants: CallStripParticipant[];
    /**
     * Optional fallback shown when `participants` is empty (e.g. the local
     * user before any remote joins). Rendered as a single Avatar tile.
     */
    localFallback?: CallStripParticipant;
    /** Max avatars to render inline before collapsing into a `+N` indicator. */
    maxVisible?: number;
    /** Avatar diameter in px. Defaults to 36. */
    avatarSize?: number;
    /** Stable data-testid (e2e hook). Defaults to `call-participant-strip`. */
    testId?: string;
    className?: string;
    style?: CSSProperties;
}
export interface CallAvatarProps {
    participant: CallStripParticipant;
    size?: number;
}
export declare function CallAvatar({ participant, size }: CallAvatarProps): import("react/jsx-runtime").JSX.Element;
export declare function CallParticipantStrip({ participants, localFallback, maxVisible, avatarSize, testId, className, style, }: CallParticipantStripProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CallParticipantStrip.d.ts.map