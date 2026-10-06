import type { DeviceOption, MediaPermission } from '../../components/video/DeviceToggleSelect';
/** Mirror of RM `ConversationCallPhase`. */
export type RMConversationCallPhase = 'idle' | 'calling' | 'ringing' | 'connecting' | 'live' | 'reconnecting' | 'ended' | 'failed';
/** Mirror of RM `ConversationCallParticipant`. */
export interface RMConversationCallParticipant {
    id: string;
    userId: string;
    displayName: string;
    avatarUrl?: string;
    isLocal: boolean;
    state: 'in-call' | 'reconnecting' | 'ringing' | 'declined' | 'busy';
    audioOn: boolean;
    cameraOn: boolean;
    screenSharing: boolean;
    participantId: string | null;
    stream: MediaStream | null;
    screenStream: MediaStream | null;
}
/** Mirror of RM `DevicePreferences`. */
export interface RMDevicePreferences {
    microphoneId?: string;
    cameraId?: string;
    speakerId?: string;
}
/**
 * The slice of RM `useConversationCall()`'s result the dock reads — pass the
 * hook's result as-is.
 */
export interface RMConversationCallSource {
    phase: RMConversationCallPhase;
    call: {
        participants: RMConversationCallParticipant[];
        participantCount: number;
    } | null;
    error: {
        message: string;
    } | null;
    callingTo: string | null;
    elapsedMs: number | null;
    activeSpeakerId: string | null;
    self: {
        audioOn: boolean;
        cameraOn: boolean;
        screenSharing: boolean;
    };
    devices: {
        prefs: RMDevicePreferences;
        set(next: RMDevicePreferences): void;
        list: {
            microphones: DeviceOption[];
            cameras: DeviceOption[];
            speakers: DeviceOption[];
            permission: {
                microphone: MediaPermission;
                camera: MediaPermission;
            };
        };
    };
    toggleMic(): void;
    toggleCamera(): void;
    toggleScreenShare(): void;
    leave(): void | Promise<void>;
    rejoin(): void | Promise<void>;
}
/** Mirror of RM `IncomingConversationCall` — one entry of `useIncomingConversationCalls().rings`. */
export interface RMIncomingConversationCall {
    callId: string;
    callerName: string;
    /** `knock` = someone outside a call you are in asks to be let in. */
    kind: 'invite' | 'knock';
    audioOnly: boolean;
}
//# sourceMappingURL=conversationCallTypes.d.ts.map