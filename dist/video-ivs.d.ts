import { RefObject } from 'react';

/**
 * Shared types for embeddable hangout components.
 * Used by useHangoutEmbed, VideoGridEmbed, ParticipantTileEmbed.
 */
export declare interface HangoutParticipant {
    participantId: string;
    userId: string;
    isLocal: boolean;
    streams: MediaStream[];
    isSpeaking: boolean;
    screenStream?: MediaStream;
}

export declare function useHangoutEmbed({ stageToken, userId, participantId, }: UseHangoutEmbedOptions): UseHangoutEmbedReturn;

export declare interface UseHangoutEmbedOptions {
    /** IVS RealTime Stage participant token (from CreateParticipantToken API). */
    stageToken: string;
    /** Current user's identifier (displayed in participant list). */
    userId: string;
    /** Participant ID returned by the join API. */
    participantId: string;
}

export declare interface UseHangoutEmbedReturn {
    /** Ref to attach to a <video> element for local camera preview. */
    localVideoRef: RefObject<HTMLVideoElement | null>;
    /** All participants (including local user). */
    participants: HangoutParticipant[];
    /** True once the Stage has been successfully joined. */
    isJoined: boolean;
    /** Error message if join or media acquisition failed. */
    error: string | null;
    /** Whether the local user is sharing their screen. */
    isScreenSharing: boolean;
    /** Toggle audio mute. */
    toggleMute: (muted: boolean) => void;
    /** Toggle camera on/off. */
    toggleCamera: (enabled: boolean) => void;
    /** Start sharing screen. */
    startScreenShare: () => Promise<void>;
    /** Stop sharing screen. */
    stopScreenShare: () => void;
    /** Leave the stage and clean up. */
    leave: () => void;
}

export { }
