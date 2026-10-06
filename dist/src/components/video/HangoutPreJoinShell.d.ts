import { type ReactNode } from 'react';
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
export interface PreJoinLocalIdentity {
    /** Display name shown on the avatar tile when the camera is off. */
    displayName: string;
    /** Optional avatar image URL. Falls back to initials if absent. */
    avatarSrc?: string;
}
export interface HangoutPreJoinShellProps {
    /** Channel display name — the title of the one heading block. */
    channelName: string;
    /** Small uppercase line above the title — "Before you go live". */
    eyebrow?: string;
    /** When set, the camera-off preview renders a Meet/Teams-style identity
     *  tile (avatar + display name) instead of the bare "Camera off" text.
     *  Backward-compatible — omitted = legacy text fallback, so existing
     *  consumers that don't pass identity are unaffected. */
    localIdentity?: PreJoinLocalIdentity;
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
    /** Rendered under the camera stage, above the Join controls. Intended
     *  for <MediaEffectsTray> so users can pick filters / background / face
     *  FX before joining. Omitted = rendering is unchanged. */
    effectsSlot?: ReactNode;
    /** Contents of the Device settings panel — typically a
     *  <DeviceSettingsPanel>. Given = the stage bar gets a gear. The shell
     *  never enumerates devices itself; it only opens and closes the panel. */
    devicesSlot?: ReactNode;
    /** Controlled device panel. Uncontrolled (own state, closed) when omitted. */
    devicesOpen?: boolean;
    onToggleDevices?: (next: boolean) => void;
    /** A row under the primary button — Teams' "Other join options". */
    secondaryActions?: ReactNode;
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
    /** Replace the auto-computed "N people are in this call" subtitle. */
    subtitleOverride?: string;
    className?: string;
    'data-testid'?: string;
}
/** MediaIcons carries no gear, and this shell is the only caller that wants one. */
export default function HangoutPreJoinShell({ channelName, eyebrow, localIdentity, previewStream, permission, permissionMessage, audioEnabled, videoEnabled, onToggleAudio, onToggleVideo, onRetryPermission, participants, readyState, readyLoading, effectsSlot, devicesSlot, devicesOpen, onToggleDevices, secondaryActions, onJoin, onCancel, joinLabel, joinDisabled, subtitleOverride, className, 'data-testid': testId, }: HangoutPreJoinShellProps): import("react").JSX.Element;
//# sourceMappingURL=HangoutPreJoinShell.d.ts.map