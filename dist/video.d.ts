import { ButtonHTMLAttributes } from 'react';
import { CSSProperties } from 'react';
import { JSX } from 'react/jsx-runtime';
import { MutableRefObject } from 'react';
import { ReactNode } from 'react';
import { Ref } from 'react';
import { SVGProps } from 'react';

export declare function AutoplayGate({ chipLabel, chipClassName, wrapperClassName, onPlayStateChange, ...streamProps }: AutoplayGateProps): JSX.Element;

export declare interface AutoplayGateProps extends StreamVideoProps {
    /** Chip label. Default: "Tap to unmute". */
    chipLabel?: string;
    /** Override the chip's Tailwind classes. */
    chipClassName?: string;
    /** Wrapper class for the relatively-positioned container. */
    wrapperClassName?: string;
}

export declare function CallControls({ mode, isMuted, isCameraOn, isScreenSharing, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onEndCall, onAddParticipant, availableParticipants, currentParticipantIds, className, }: CallControlsProps): JSX.Element;

export declare type CallControlsMode = 'audio' | 'video';

export declare interface CallControlsProps {
    mode: CallControlsMode;
    isMuted?: boolean;
    isCameraOn?: boolean;
    isScreenSharing?: boolean;
    onToggleMute?: () => void;
    onToggleCamera?: () => void;
    onToggleScreenShare?: () => void;
    onUpgradeToVideo?: () => void;
    onEndCall?: () => void;
    /** When provided, shows the "add participant" button + picker popover. */
    onAddParticipant?: (participantId: string) => void;
    /**
     * People who can still be added. Participants already in the call
     * should be filtered out by the caller — or pass `currentParticipantIds`
     * and let CallControls dedupe.
     */
    availableParticipants?: CallStripParticipant[];
    /** Optional explicit set of ids already in the call to dedupe against. */
    currentParticipantIds?: ReadonlyArray<string>;
    className?: string;
}

export declare function CallingStatusPill({ show, label }: CallingStatusPillProps): JSX.Element | null;

export declare interface CallingStatusPillProps {
    /** Show/hide gate — the parent decides ringing semantics. */
    show: boolean;
    /** Label for the callee(s). E.g. "Alice", "Alice & Bob", "3 people". */
    label: string;
}

export declare type CallMode = 'audio' | 'video';

export declare function CallParticipantStrip({ participants, localFallback, maxVisible, avatarSize, testId, className, style, }: CallParticipantStripProps): JSX.Element;

export declare interface CallParticipantStripProps {
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

/**
 * Slack-Huddles-style "someone started a hangout" banner. Lightweight,
 * inline (not modal), low-friction: click "Join" to enter the call,
 * click dismiss to ignore. No system-level ringing.
 *
 * Pure presentational — the consumer mounts it (typically near the top of
 * the app shell or inside a notifications stack) and wires `onJoin` /
 * `onDismiss` to actual behavior (joining the lobby, declining the invite).
 *
 * Auto-dismisses after `autoExpireSec` seconds (default 30) to avoid
 * stale-banner spam if the call is over by the time the recipient looks.
 */
export declare function CallStartedBanner({ callerName, callerAvatarUrl, context, mode, onJoin, onDismiss, autoExpireSec, className, style, }: CallStartedBannerProps): JSX.Element | null;

export declare type CallStartedBannerMode = 'started' | 'calling';

export declare interface CallStartedBannerProps {
    /** Display name of the user who started / is making the call. */
    callerName: string;
    /** Optional avatar URL — falls back to an initial-circle. */
    callerAvatarUrl?: string;
    /** Optional channel / room context shown under the caller name
     * (e.g. "in #general", "in this document"). */
    context?: string;
    /**
     * Copy framing:
     *   - 'started' (default) — "Name started a call". Use for broadcast /
     *     ambient hangouts where multiple people might be invited.
     *   - 'calling'           — "Name is calling you". Use for direct 1:1
     *     calls where the recipient is specifically targeted.
     */
    mode?: CallStartedBannerMode;
    /** Click handler for the "Join" action. */
    onJoin?: () => void;
    /** Click handler for the dismiss / decline action. Banner self-hides
     * via the autoExpireSec timeout if not provided. */
    onDismiss?: () => void;
    /** Auto-expire after this many seconds. Set to 0 to disable. Default 30. */
    autoExpireSec?: number;
    /** Escape hatches. */
    className?: string;
    style?: CSSProperties;
}

export declare function CallStatsOverlay({ stats, position, testId, className, style, }: CallStatsOverlayProps): JSX.Element | null;

export declare type CallStatsOverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export declare interface CallStatsOverlayProps {
    /** When undefined or empty (no fields set), the overlay renders nothing. */
    stats?: CallStatsOverlayStats;
    /** Corner to dock the overlay against its positioned parent. */
    position?: CallStatsOverlayPosition;
    /** Stable data-testid (e2e hook). Defaults to `call-stats-overlay`. */
    testId?: string;
    className?: string;
    style?: CSSProperties;
}

export declare interface CallStatsOverlayStats {
    networkQuality?: NetworkQuality;
    bitrateKbps?: number;
    latencyMs?: number;
    packetLossPct?: number;
}

export declare interface CallStripParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isSpeaking?: boolean;
}

export declare function CallWidget({ state, mode, participants, localParticipant, callerName, duration, isMuted, isCameraOn, isScreenSharing, onAnswer, onDecline, onEndCall, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onAddParticipant, availableParticipants, onMinimize, onExpand, layoutComponent, callStats, minimized, position, contained, draggable, className, style, dataAttrs, }: CallWidgetProps): JSX.Element | null;

export declare type CallWidgetMode = PersistedWidgetMode | 'fullscreen';

export declare interface CallWidgetParticipant extends CallStripParticipant {
    videoStream?: MediaStream | null;
}

export declare interface CallWidgetProps {
    state: CallWidgetState;
    mode: CallMode;
    participants: CallWidgetParticipant[];
    localParticipant?: CallWidgetParticipant;
    callerName?: string;
    duration?: number;
    isMuted?: boolean;
    isCameraOn?: boolean;
    isScreenSharing?: boolean;
    onAnswer?: () => void;
    onDecline?: () => void;
    onEndCall?: () => void;
    onToggleMute?: () => void;
    onToggleCamera?: () => void;
    onToggleScreenShare?: () => void;
    onUpgradeToVideo?: () => void;
    onAddParticipant?: (participantId: string) => void;
    /** List of people available to add to the call */
    availableParticipants?: CallWidgetParticipant[];
    onMinimize?: () => void;
    onExpand?: () => void;
    minimized?: boolean;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** When true, uses absolute positioning within a relative parent instead of fixed to viewport */
    contained?: boolean;
    draggable?: boolean;
    /**
     * Optional render slot that replaces the default video area (local fullscreen
     * + single remote PiP). When provided, the widget renders this node in the
     * video area while preserving its own header, controls, drag/minimize, and
     * call-state machine. Use for multi-person hangout layouts (pair with
     * `HangoutLayout` from the same module).
     *
     * Absent → the widget renders today's single-PiP layout (backwards compatible).
     */
    layoutComponent?: ReactNode;
    /**
     * Optional diagnostics stats. When provided (and at least one field is
     * set), CallWidget renders a `<CallStatsOverlay>` inside the video area.
     */
    callStats?: CallStatsOverlayStats;
    className?: string;
    style?: CSSProperties;
    /** Arbitrary `data-*` attributes to spread onto the root element.
     *  Lets callers (e.g. HangoutOverlay) attach e2e-friendly testids and
     *  lobby/callId metadata without an extra wrapper div that would
     *  conflict with the widget's own `position: fixed` placement. */
    dataAttrs?: Record<string, string | number | undefined>;
}

export declare type CallWidgetState = 'idle' | 'ringing' | 'connecting' | 'active' | 'ended';

export declare interface CaptionLine {
    id: string;
    speakerId: string;
    speakerName?: string;
    text: string;
    /** ISO timestamp of caption emission. Used for fade-out + ordering. */
    at: string;
    /** True if the caption is still being updated (interim) vs final. */
    interim?: boolean;
}

export declare function CircularIconToggle({ on, iconOn, iconOff, 'aria-label': ariaLabel, offTone, size, disabled, className, ...rest }: CircularIconToggleProps): JSX.Element;

export declare interface CircularIconToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /** Whether the underlying feature (mic / cam / share) is currently on. */
    on: boolean;
    /** Icon rendered when `on === true`. */
    iconOn: ReactNode;
    /** Icon rendered when `on === false`. */
    iconOff: ReactNode;
    /** Required for screen readers — describes the toggle target
     *  ("Microphone", "Camera"). The component derives the on/off state
     *  via aria-pressed. */
    'aria-label': string;
    /** Tone when in the OFF state. Defaults to 'danger' (red soft) to
     *  match the Google Meet convention. */
    offTone?: CircularIconToggleTone;
    size?: CircularIconToggleSize;
}

export declare type CircularIconToggleSize = 'sm' | 'md' | 'lg';

export declare type CircularIconToggleTone = 'neutral' | 'danger';

export declare function ExpandableCallWidget({ title, subtitle, children, controls, defaultMode, onModeChange, persistKey, apiRef, defaultCorner, expandable, zIndex, className, }: ExpandableCallWidgetProps): JSX.Element;

export declare interface ExpandableCallWidgetHandle {
    mode: CallWidgetMode;
    setMode: (m: CallWidgetMode) => void;
}

export declare interface ExpandableCallWidgetProps {
    /** Header label (left side of chrome). */
    title?: ReactNode;
    /** Optional status line shown under the title (e.g. "0:36 • 3 in call"). */
    subtitle?: ReactNode;
    /** Body — typically `<HangoutLayout fillParent participants={…}/>`. */
    children: ReactNode;
    /** Optional controls strip rendered below the body. Stays inside the
     *  widget chrome in mini mode (compact); spans full width in docked
     *  and fullscreen modes. */
    controls?: ReactNode;
    /** Initial mode. Persisted modes override this once `persistKey` is
     *  set and storage has a prior value. Default: 'mini'. */
    defaultMode?: PersistedWidgetMode;
    /** Fires after every settled mode change (programmatic or via UI). */
    onModeChange?: (mode: CallWidgetMode) => void;
    /** localStorage key for `{mode,x,y,width,height}`. Omit to opt out
     *  (state lives only in memory). */
    persistKey?: string;
    /** Imperative handle — `apiRef.current.setMode('fullscreen')`. */
    apiRef?: Ref<ExpandableCallWidgetHandle>;
    /** Initial corner-snap for mini mode (only used if no persisted
     *  position exists). Default 'bottom-right'. */
    defaultCorner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Hide the expand affordances (useful for read-only viewers). */
    expandable?: boolean;
    /** z-index for the floating modes. Default 9999. */
    zIndex?: number;
    /** Class on the root. */
    className?: string;
}

export declare function gridCols(count: number): number;

export declare function HangoutGrid({ participants, localParticipant, activeSpeakerId, onParticipantClick, fillParent, pipWidth, className, style, }: HangoutGridProps): JSX.Element;

export declare interface HangoutGridProps {
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

export declare function HangoutLayout({ participants, localParticipant, mode, activeSpeakerId, speakerHysteresisMs, spotlightContent, onParticipantClick, fillParent, pipWidth, filmstripTileWidth, className, style, }: HangoutLayoutProps): JSX.Element;

export declare interface HangoutLayoutParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    /** Pre-rendered video element — typically `<video ref={…} autoPlay playsInline />`. */
    videoElement?: ReactNode;
    /** Pre-rendered screen-share video element. When ANY participant supplies
     *  this, `<HangoutLayout>` auto-flips to spotlight mode and
     *  `<HangoutSpotlight>` promotes this element into the main slot (the
     *  sharer's camera tile stays visible in the filmstrip). An explicit
     *  `spotlightContent` prop on `<HangoutLayout>` still wins. */
    screenElement?: ReactNode;
}

export declare interface HangoutLayoutProps {
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

export declare type HangoutMode = 'auto' | 'spotlight';

export declare type HangoutPhase = 'idle' | 'joining' | 'joined' | 'reconnecting' | 'ended' | 'failed';

export declare function HangoutPreJoinShell({ channelName, localIdentity, previewStream, permission, permissionMessage, audioEnabled, videoEnabled, onToggleAudio, onToggleVideo, onRetryPermission, participants, readyState, readyLoading, onJoin, onCancel, joinLabel, joinDisabled, subtitleOverride, className, 'data-testid': testId, }: HangoutPreJoinShellProps): JSX.Element;

export declare interface HangoutPreJoinShellProps {
    /** Channel display name surfaced at the top of the shell. */
    channelName: string;
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

export declare function HangoutRoomHeader({ channelName, subtitle, recording, elapsedLabel, phase, actions, className, 'data-testid': testId, }: HangoutRoomHeaderProps): JSX.Element;

export declare interface HangoutRoomHeaderProps {
    channelName: string;
    subtitle?: ReactNode;
    recording?: HangoutRoomHeaderRecording;
    elapsedLabel?: string;
    phase?: HangoutPhase;
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface HangoutRoomHeaderRecording {
    /** Whether recording is armed for this room. When false, no pill is rendered. */
    armed: boolean;
    /** Whether the recording is actively writing (someone is publishing). */
    active: boolean;
}

export declare function HangoutSpotlight({ participants, localParticipant, spotlightContent, activeSpeakerId, speakerHysteresisMs, onParticipantClick, fillParent, filmstripTileWidth, className, style, }: HangoutSpotlightProps): JSX.Element;

export declare interface HangoutSpotlightProps {
    /** Remote participants. Caller should NOT include the local user here. */
    participants: HangoutLayoutParticipant[];
    /** The local user — always renders in the filmstrip in spotlight mode. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** Content for the main slot — typically a screen-share `<video>`. When
     *  provided, takes priority over the active-speaker tile. */
    spotlightContent?: ReactNode;
    /** Active speaker id — drives spotlight slot via stabilized hysteresis. */
    activeSpeakerId?: string | null;
    /** Hysteresis window (ms) before the spotlight slot swaps. 0 = immediate. */
    speakerHysteresisMs?: number;
    /** Click handler per filmstrip tile. */
    onParticipantClick?: (id: string) => void;
    /** Fill parent dimensions instead of letting the spotlight slot drive
     *  height via aspect-video. Used in docked + fullscreen widget modes. */
    fillParent?: boolean;
    /** Filmstrip tile width (px). Default 128 (Tailwind w-32). Larger for
     *  docked/fullscreen so small thumbs don't dominate a wide canvas. */
    filmstripTileWidth?: number;
    className?: string;
    style?: CSSProperties;
}

export declare interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
}

export declare function MediaControlsBar({ audioOn, videoOn, screenSharing, onToggleAudio, onToggleVideo, onToggleScreenShare, onLeave, audioDisabled, videoDisabled, screenShareDisabled, extras, leaveLabel, size, className, 'data-testid': testId, }: MediaControlsBarProps): JSX.Element;

export declare interface MediaControlsBarProps {
    audioOn: boolean;
    videoOn: boolean;
    screenSharing?: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    /** When omitted, the screen-share toggle is not rendered. */
    onToggleScreenShare?: () => void;
    /** Required — leaves the call. Per the locked contract, leave lives here. */
    onLeave: () => void;
    audioDisabled?: boolean;
    videoDisabled?: boolean;
    screenShareDisabled?: boolean;
    /** Slot rendered between the screen-share toggle and the Leave button.
     *  Use for raise-hand, captions, chat-open, settings, etc. */
    extras?: ReactNode;
    /** Override the Leave button's accessible label. Default: "Leave call". */
    leaveLabel?: string;
    /** Size of each control. Defaults to 'md'. */
    size?: CircularIconToggleSize;
    className?: string;
    'data-testid'?: string;
}

export declare function MicIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MicOffIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MoreHorizontalIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MuteWhileTalkingToast({ show, label, }: MuteWhileTalkingToastProps): JSX.Element | null;

export declare interface MuteWhileTalkingToastProps {
    show: boolean;
    /** Optional label override. */
    label?: string;
}

export declare type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';

export declare function NetworkQualityBadge({ quality, style }: NetworkQualityBadgeProps): JSX.Element;

export declare interface NetworkQualityBadgeProps {
    quality: NetworkQuality;
    style?: CSSProperties;
}

export declare interface Participant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isSpeaking?: boolean;
    isMuted?: boolean;
    isLocal?: boolean;
    videoElement?: ReactNode;
}

/**
 * Single-participant tile used in `VideoGrid` and `HangoutLayout`. Pure
 * presentational — no media wiring, no signaling — caller owns the `<video>`
 * element via `videoElement` and the speaking/mute booleans.
 *
 * The speaking border is intentionally just a border (no reflow): per industry
 * convention (Meet/Teams/Zoom), reflowing tiles on speaker change is jarring;
 * a green border is the agreed-on cue.
 */
export declare function ParticipantTile({ id, displayName, avatarUrl, isSpeaking, isMuted, isLocal, isSpotlight, videoElement, onClick, fillParent, className, style, }: ParticipantTileProps): JSX.Element;

export declare interface ParticipantTileProps {
    /** Unique identifier for keying / pin actions. */
    id: string;
    /** Name shown in the bottom badge. */
    displayName: string;
    /** Optional avatar URL — used as fallback when no videoElement is provided. */
    avatarUrl?: string;
    /** Whether to render with a speaking-indicator green border + corner dot. */
    isSpeaking?: boolean;
    /** Whether to overlay a muted-mic glyph in the badge. */
    isMuted?: boolean;
    /** Whether this tile represents the local user — replaces the displayName label with "You". */
    isLocal?: boolean;
    /** When true, applies the "main / spotlight" emphasis style (larger border, taller aspect). */
    isSpotlight?: boolean;
    /** A pre-rendered media element (a `<video>` typically) — the consumer manages srcObject. */
    videoElement?: ReactNode;
    /** Click handler — used by HangoutLayout for pin / spotlight selection. */
    onClick?: () => void;
    /** When true, the tile fills its parent (`w-full h-full`) instead of
     *  enforcing its own `aspect-video`. Used by ExpandableCallWidget's
     *  docked + fullscreen modes where the parent owns dimensions. */
    fillParent?: boolean;
    /** Escape hatches. */
    className?: string;
    style?: CSSProperties;
}

/**
 * useActiveSpeaker — detects the loudest currently-speaking participant
 * via Web Audio API analysis of each MediaStream.
 *
 * Wave 7 refactor: previously created one `AudioContext` per
 * participant, which (a) Chrome warns about past 6 contexts and (b)
 * hits a hard browser limit around 25. Now uses a SINGLE shared
 * AudioContext + per-participant `MediaStreamAudioSourceNode →
 * AnalyserNode`. Drops N contexts → 1 with no semantic change.
 */
declare interface ParticipantWithStreams {
    participantId: string;
    streams: MediaStream[];
}

export declare type PersistedWidgetMode = 'mini' | 'docked';

export declare interface PersistedWidgetState {
    mode: PersistedWidgetMode;
    x: number;
    y: number;
    width: number;
    height: number;
}

export declare function PhoneOffIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function PiPButton({ getVideoElement, className, title, }: PiPButtonProps): JSX.Element;

export declare interface PiPButtonProps {
    /** Callback to obtain the `<video>` element to enter PiP with. */
    getVideoElement: () => HTMLVideoElement | null;
    className?: string;
    title?: string;
}

export declare type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

declare interface PreJoinLocalIdentity {
    /** Display name shown on the avatar tile when the camera is off. */
    displayName: string;
    /** Optional avatar image URL. Falls back to initials if absent. */
    avatarSrc?: string;
}

export declare type PreJoinPermission = 'pending' | 'granted' | 'denied' | 'blocked' | 'no-device' | 'unavailable';

export declare type PreJoinReadyState = 'empty' | 'pending' | 'ready';

export declare interface PreJoinRosterEntry {
    participantId: string;
    /** True when this participant's transport is DTLS-connected and they're
     *  consumable. False = they're publishing but still mid-handshake. */
    ready: boolean;
    /** Optional display name override. Falls back to participantId.slice(0, 8). */
    displayName?: string;
    /** Optional kinds list (e.g. ['audio', 'video']). Currently informational. */
    kinds?: string[];
}

export declare interface Reaction {
    id: string;
    emoji: string;
    userId?: string;
    displayName?: string;
}

export declare function ReactionOverlay({ reactions, style }: ReactionOverlayProps): JSX.Element;

export declare interface ReactionOverlayProps {
    reactions: Reaction[];
    style?: CSSProperties;
}

export declare function ReactionPicker({ onReact, emojis, style }: ReactionPickerProps): JSX.Element;

export declare interface ReactionPickerProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    style?: CSSProperties;
}

export declare function ReconnectingBanner({ show, label }: ReconnectingBannerProps): JSX.Element | null;

export declare interface ReconnectingBannerProps {
    show: boolean;
    /** Optional label override. Default: "Reconnecting…". */
    label?: string;
}

export declare function RecordingList({ recordings, selectedId, onSelect, loading, emptyState, renderActions, className, }: RecordingListProps): JSX.Element;

export declare interface RecordingListItem {
    id: string;
    startIso: string;
    endIso: string;
    durationSec: number;
    participantCount?: number;
    thumbnailUrl?: string;
    /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
    label?: string;
    /** Defaults to 'ready'. Forwarded to RecordingRow. */
    status?: RecordingStatus;
}

export declare interface RecordingListProps {
    recordings: RecordingListItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    loading?: boolean;
    emptyState?: ReactNode;
    /** Render a per-row actions slot (e.g. download/share buttons). */
    renderActions?: (item: RecordingListItem) => ReactNode;
    className?: string;
}

export declare function RecordingPlayer({ playlistUrl, poster, autoPlay, muted, onLoadedMetadata, onTimeUpdate, onError, hideDownload, className, }: RecordingPlayerProps): JSX.Element;

export declare interface RecordingPlayerProps {
    playlistUrl: string | null;
    poster?: string;
    autoPlay?: boolean;
    muted?: boolean;
    onLoadedMetadata?: (durationSec: number) => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    onError?: (err: Error) => void;
    /** Hide the download button (private channels). Default false. */
    hideDownload?: boolean;
    className?: string;
}

export declare function RecordingRow({ id, startIso, durationSec, participantCount, thumbnailUrl, label, status, selected, onClick, actions, className, }: RecordingRowProps): JSX.Element;

export declare interface RecordingRowProps {
    id: string;
    startIso: string;
    endIso?: string;
    durationSec: number;
    participantCount?: number;
    thumbnailUrl?: string;
    /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
    label?: string;
    /** Defaults to 'ready'. 'processing' shows a spinner badge; 'failed' shows an error badge. */
    status?: RecordingStatus;
    selected?: boolean;
    onClick?: (id: string) => void;
    /** Slot rendered in the row footer (e.g. a download or share button). */
    actions?: ReactNode;
    className?: string;
}

export declare type RecordingStatus = 'ready' | 'processing' | 'failed';

export declare function RemoteTileSlot({ stream, displayName, cameraOn, avatarSize, }: RemoteTileSlotProps): JSX.Element;

export declare interface RemoteTileSlotProps {
    stream: MediaStream | undefined;
    displayName: string;
    /** Camera enabled by sender. False → show avatar even if a stream exists. */
    cameraOn: boolean;
    /** Avatar size when fallback renders. Default 96. */
    avatarSize?: number;
}

export declare function RosterPanel({ participants, activeSpeakerId, onParticipantClick, count, title, footer, className, }: RosterPanelProps): JSX.Element;

export declare interface RosterPanelProps {
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

export declare interface RosterParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    isScreenSharing?: boolean;
    handRaised?: boolean;
}

export declare function ScreenShareIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function ScreenShareOffIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function StatsCard({ metrics, style }: StatsCardProps): JSX.Element;

export declare interface StatsCardProps {
    metrics: StreamMetrics | null;
    style?: CSSProperties;
}

export declare function StatusStrip({ phase, bitrateBps, viewerCount, duration, style }: StatusStripProps): JSX.Element;

export declare interface StatusStripProps {
    phase: PlayerPhase | 'live' | 'reconnecting';
    bitrateBps?: number;
    viewerCount?: number;
    duration?: number;
    style?: CSSProperties;
}

/**
 * Companion utility: returns true when the stream has at least one
 * paintable video track (live + enabled + not muted). Pair with
 * useTrackStateBump in the same component so the boolean re-derives on
 * every track transition.
 */
export declare function streamHasUsableVideo(stream: MediaStream | undefined | null): boolean;

export declare interface StreamMetrics {
    bitrateBps: number;
    fps: number;
    resolution: {
        width: number;
        height: number;
    };
    packetsLost: number;
    jitter?: number;
}

export declare function StreamVideo({ stream, muted, videoRef, className, onPlayStateChange, }: StreamVideoProps): JSX.Element;

export declare type StreamVideoPlayState = 'playing' | 'paused-by-autoplay' | 'ended';

export declare interface StreamVideoProps {
    stream: MediaStream;
    muted?: boolean;
    /** Optional external ref. Lets callers reach the underlying <video>
     *  for OS-level Picture-in-Picture. */
    videoRef?: MutableRefObject<HTMLVideoElement | null>;
    /** Tailwind class overrides. Defaults to `h-full w-full object-cover`. */
    className?: string;
    /** Notifies on playback state transitions. Fires `paused-by-autoplay`
     *  when the browser rejects autoplay with `NotAllowedError`. */
    onPlayStateChange?: (state: StreamVideoPlayState) => void;
}

export declare function SummaryPanel({ status, markdown, renderMarkdown, title, errorMessage, pendingMessage, idleState, className, }: SummaryPanelProps): JSX.Element;

export declare interface SummaryPanelProps {
    status: TranscriptStatus;
    /** The raw markdown returned by GET /api/recordings/:id/summary. */
    markdown?: string | null;
    /** Caller-provided renderer. If omitted, the markdown is rendered as
     *  a <pre>-wrapped code block — readable but not pretty. */
    renderMarkdown?: (md: string) => ReactNode;
    /** Optional title above the panel. Defaults to "Summary". */
    title?: string;
    errorMessage?: string;
    pendingMessage?: string;
    idleState?: ReactNode;
    className?: string;
}

export declare function TranscriptOverlay({ lines, maxLines, fadeAfterMs, className, }: TranscriptOverlayProps): JSX.Element | null;

export declare interface TranscriptOverlayProps {
    lines: CaptionLine[];
    /** How many recent lines to show simultaneously. Default 3. */
    maxLines?: number;
    /** Fade-out duration ms. Default 8000. */
    fadeAfterMs?: number;
    className?: string;
}

export declare function TranscriptPanel({ status, segments, currentTimeMs, onSeek, title, errorMessage, pendingMessage, idleState, className, }: TranscriptPanelProps): JSX.Element;

export declare interface TranscriptPanelProps {
    status: TranscriptStatus;
    segments?: TranscriptSegment[];
    /** Current playback position in milliseconds; used to highlight the
     *  active segment. Pass null/undefined to disable highlighting. */
    currentTimeMs?: number | null;
    /** When provided, clicking a segment seeks the player to that time. */
    onSeek?: (timeMs: number) => void;
    /** Optional title above the panel. Defaults to "Transcript". */
    title?: string;
    /** Surface the failure message when status === 'failed'. */
    errorMessage?: string;
    /** When status is processing/pending, surface what phase. */
    pendingMessage?: string;
    /** Render-prop slot for the empty/idle state. */
    idleState?: ReactNode;
    className?: string;
}

export declare interface TranscriptSegment {
    startMs: number;
    endMs: number;
    speakerId: string;
    speakerLabel: string;
    text: string;
    avgLogprob?: number;
    noSpeechProb?: number;
}

export declare type TranscriptStatus = 'idle' | 'pending' | 'processing' | 'ready' | 'failed';

export declare function useActiveSpeaker({ participants, threshold, smoothingTimeConstant, pollIntervalMs, }: UseActiveSpeakerOptions): {
    activeSpeakerId: string | null;
};

declare interface UseActiveSpeakerOptions {
    participants: ParticipantWithStreams[];
    threshold?: number;
    smoothingTimeConstant?: number;
    pollIntervalMs?: number;
}

export declare function useCallWidgetPersistence({ persistKey, defaults, debounceMs, }: UseCallWidgetPersistenceOptions): {
    state: PersistedWidgetState;
    setState: (next: Partial<PersistedWidgetState>) => void;
};

export declare interface UseCallWidgetPersistenceOptions {
    /** localStorage key. When undefined, the hook is a no-op (state lives
     *  only in memory) — useful for tests and for ephemeral consumers. */
    persistKey: string | undefined;
    /** Defaults written if no key exists yet (or storage is empty). */
    defaults: PersistedWidgetState;
    /** Debounce window for writes. Default 200ms. */
    debounceMs?: number;
}

export declare function useMuteWhileTalking({ localStream, isMuted, threshold, triggerMs, cooldownMs, }: UseMuteWhileTalkingOptions): boolean;

declare interface UseMuteWhileTalkingOptions {
    localStream: MediaStream | null;
    isMuted: boolean;
    /** dB threshold for "talking". Default -45 — well above ambient. */
    threshold?: number;
    /** Sustained talking duration (ms) before the toast fires. Default 1500. */
    triggerMs?: number;
    /** Cool-down between toast fires (ms). Default 6000. */
    cooldownMs?: number;
}

/**
 * Debounce activeSpeakerId so the spotlight slot only swaps after the new
 * speaker has been talking for at least `hysteresisMs`. Without this,
 * every cough, laugh, or short interjection causes flicker.
 */
export declare function useStableActiveSpeaker(activeSpeakerId: string | null | undefined, hysteresisMs: number): string | null;

export declare function useTrackStateBump(stream: MediaStream | undefined | null, participantLabel: string): number;

/**
 * Static N-way grid: 1 / 2×2 / 3×3 / 4×4 column count based on participant
 * count. Tiles do NOT reflow on speaker change — speaking is indicated via
 * border highlight on the tile only (see ParticipantTile). For an
 * active-speaker-aware spotlight layout, use `HangoutLayout` instead.
 */
export declare function VideoGrid({ participants, style }: VideoGridProps): JSX.Element;

export declare interface VideoGridProps {
    participants: Participant[];
    style?: CSSProperties;
}

export declare function VideoIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function VideoOffIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function VideoPlayer({ src, stream, autoPlay, muted, loop, controls, poster, phase: controlledPhase, className, style, onPhaseChange, onTimeUpdate, }: VideoPlayerProps): JSX.Element;

export declare function VideoPlayerModal({ onClose, sources, title, subtitle, autoPlay, muted, hideDownload, header, footer, className, }: VideoPlayerModalProps): JSX.Element;

export declare interface VideoPlayerModalProps {
    /** Required — backdrop click + Escape both fire this. */
    onClose: () => void;
    /** One or more media URLs. The first plays first; multiple ⇒ segment switcher. */
    sources: VideoPlayerSource[];
    /** Optional small title shown in the modal header (e.g. channel name). */
    title?: string;
    /** Optional subtitle shown under the title (e.g. start time + duration). */
    subtitle?: string;
    /** Auto-play the first source on mount. Default true. */
    autoPlay?: boolean;
    /** Start muted (useful when autoPlay is on — many browsers require it). Default false. */
    muted?: boolean;
    /** Hide the per-source Download link in the footer. Default false. */
    hideDownload?: boolean;
    /** Render extra content in the header (right side, before the close button). */
    header?: ReactNode;
    /** Render extra content in the footer (right side). */
    footer?: ReactNode;
    className?: string;
}

export declare interface VideoPlayerProps {
    src?: string;
    /**
     * MediaStream source for WebRTC playback (WHEP, RTCPeerConnection.ontrack,
     * getUserMedia, etc.). When set, attached to the underlying <video>'s
     * `srcObject`. Takes precedence over `src` if both are supplied. Pass
     * `null` to clear.
     */
    stream?: MediaStream | null;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    poster?: string;
    phase?: PlayerPhase;
    className?: string;
    style?: CSSProperties;
    onPhaseChange?: (phase: PlayerPhase) => void;
    onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export declare interface VideoPlayerSource {
    /** Direct media URL (mp4 / webm / etc) served with Range support. */
    url: string;
    /** Optional human label for the segment switcher (e.g. "Segment 1"). */
    label?: string;
    /** Optional size in bytes — shown next to the label when present. */
    sizeBytes?: number;
}

export declare function ViewerCount({ count, style }: ViewerCountProps): JSX.Element;

export declare interface ViewerCountProps {
    count: number;
    style?: CSSProperties;
}

export { }
