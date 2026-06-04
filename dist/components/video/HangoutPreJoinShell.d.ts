export type PreJoinPermission = 'pending' | 'granted' | 'denied' | 'blocked' | 'no-device' | 'unavailable';
export type PreJoinReadyState = 'empty' | 'pending' | 'ready';
export interface PreJoinRosterEntry {
    participantId: string;
    /** True when this participant's transport is DTLS-connected and they're
     *  consumable. False = they're publishing but still mid-handshake. */
    ready: boolean;
    /** Optional display name override. Falls back to participantId.slice(0, 8). */
    displayName?: string;
    /** Optional kinds list (e.g. ['audio', 'video']). Currently informational. */
    kinds?: string[];
}
export interface HangoutPreJoinShellProps {
    /** Channel display name surfaced at the top of the shell. */
    channelName: string;
    /** Live MediaStream for the camera preview. Null when not yet acquired
     *  or when permission is anything but 'granted'. */
    previewStream: MediaStream | null;
    permission: PreJoinPermission;
    /** Browser-supplied error message (e.g. "NotAllowedError"). Surfaced
     *  in the permission fallback card when present. */
    permissionMessage?: string | null;
    audioEnabled: boolean;
    videoEnabled: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    /** Optional retry hook surfaced on the permission-fallback card. */
    onRetryPermission?: () => void;
    participants?: PreJoinRosterEntry[];
    readyState?: PreJoinReadyState;
    /** When true, render a small spinner above the roster instead of the
     *  participant list — for the "/ready not yet fetched" phase. */
    readyLoading?: boolean;
    /** Called when the user clicks Join. Carries the pre-flight intent so
     *  the consumer can spawn the publisher in the desired mute state. */
    onJoin: (intent: {
        audio: boolean;
        video: boolean;
    }) => void;
    onCancel: () => void;
    /** Override the Join button label. Default: "Join now" (or "Allow
     *  camera to join" when permission != 'granted'). */
    joinLabel?: string;
    /** Force-disable the Join button even when permission is granted. */
    joinDisabled?: boolean;
    /** Show a custom subtitle in the right-rail. Overrides the auto-
     *  computed "N people are in this call" copy. */
    subtitleOverride?: string;
    className?: string;
    'data-testid'?: string;
}
export default function HangoutPreJoinShell({ channelName, previewStream, permission, permissionMessage, audioEnabled, videoEnabled, onToggleAudio, onToggleVideo, onRetryPermission, participants, readyState, readyLoading, onJoin, onCancel, joinLabel, joinDisabled, subtitleOverride, className, 'data-testid': testId, }: HangoutPreJoinShellProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HangoutPreJoinShell.d.ts.map