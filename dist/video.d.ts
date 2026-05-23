import { CSSProperties } from 'react';
import { JSX } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare type CallMode = 'audio' | 'video';

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

export declare function CallWidget({ state, mode, participants, localParticipant, callerName, duration, isMuted, isCameraOn, isScreenSharing, onAnswer, onDecline, onEndCall, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onAddParticipant, availableParticipants, onMinimize, layoutComponent, minimized, position, contained, draggable, className, style, dataAttrs, }: CallWidgetProps): JSX.Element | null;

export declare interface CallWidgetParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isSpeaking?: boolean;
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

/**
 * Multi-person hangout layout with two modes:
 *
 *   - **auto-grid** (`mode="auto"`, no spotlight): N=1 single tile / N=2
 *     50:50 split / N=3-4 2×2 / N=5-9 3×3 / N=10+ paginated 3×3.
 *     Active speaker is indicated by border highlight only — no reflow.
 *
 *   - **spotlight** (`mode="spotlight"` OR `spotlightContent` provided):
 *     a large main slot (active speaker or shared screen) plus a horizontal
 *     filmstrip of the remaining participants along the bottom. Spotlight
 *     swaps obey `speakerHysteresisMs` to prevent flicker.
 *
 * Pure presentational — no media wiring. Caller passes a `videoElement` per
 * participant (typically a `<video>` with srcObject already attached) and the
 * layout decides where to render each one.
 */
export declare function HangoutLayout({ participants, localParticipant, mode, activeSpeakerId, speakerHysteresisMs, spotlightContent, onParticipantClick, className, style, }: HangoutLayoutProps): JSX.Element;

export declare interface HangoutLayoutParticipant {
    id: string;
    displayName: string;
    avatarUrl?: string;
    isMuted?: boolean;
    isLocal?: boolean;
    /** Pre-rendered video element — typically `<video ref={…} autoPlay playsInline />`. */
    videoElement?: ReactNode;
}

export declare interface HangoutLayoutProps {
    /** Remote participants (callers should NOT include the local user here). */
    participants: HangoutLayoutParticipant[];
    /** The local user. Rendered as a tile in the grid at N≥3 (per Meet/Teams convention)
     * or as a small PiP overlay at N≤2. Pass null/undefined to suppress entirely. */
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
    className?: string;
    style?: CSSProperties;
}

export declare type HangoutMode = 'auto' | 'spotlight';

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
export declare function ParticipantTile({ id, displayName, avatarUrl, isSpeaking, isMuted, isLocal, isSpotlight, videoElement, onClick, className, style, }: ParticipantTileProps): JSX.Element;

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

export declare function PiPButton({ getVideoElement, className, title, }: PiPButtonProps): JSX.Element;

export declare interface PiPButtonProps {
    /** Callback to obtain the `<video>` element to enter PiP with. */
    getVideoElement: () => HTMLVideoElement | null;
    className?: string;
    title?: string;
}

export declare type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

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

export declare function RecordingList({ recordings, selectedId, onSelect, loading, emptyState, className, }: RecordingListProps): JSX.Element;

export declare interface RecordingListItem {
    id: string;
    startIso: string;
    endIso: string;
    durationSec: number;
    participantCount?: number;
    thumbnailUrl?: string;
    /** Optional human label — e.g. "Hank & Alice" or "Global hangout". */
    label?: string;
}

export declare interface RecordingListProps {
    recordings: RecordingListItem[];
    selectedId?: string;
    onSelect: (id: string) => void;
    loading?: boolean;
    emptyState?: ReactNode;
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

export declare function TranscriptOverlay({ lines, maxLines, fadeAfterMs, className, }: TranscriptOverlayProps): JSX.Element | null;

export declare interface TranscriptOverlayProps {
    lines: CaptionLine[];
    /** How many recent lines to show simultaneously. Default 3. */
    maxLines?: number;
    /** Fade-out duration ms. Default 8000. */
    fadeAfterMs?: number;
    className?: string;
}

export declare function useActiveSpeaker({ participants, threshold, smoothingTimeConstant, pollIntervalMs, }: UseActiveSpeakerOptions): {
    activeSpeakerId: string | null;
};

declare interface UseActiveSpeakerOptions {
    participants: ParticipantWithStreams[];
    threshold?: number;
    smoothingTimeConstant?: number;
    pollIntervalMs?: number;
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

export declare function VideoPlayer({ src, stream, autoPlay, muted, loop, controls, poster, phase: controlledPhase, className, style, onPhaseChange, onTimeUpdate, }: VideoPlayerProps): JSX.Element;

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

export declare function ViewerCount({ count, style }: ViewerCountProps): JSX.Element;

export declare interface ViewerCountProps {
    count: number;
    style?: CSSProperties;
}

export { }
