import { ButtonHTMLAttributes } from 'react';
import { CSSProperties } from 'react';
import { JSX } from 'react';
import { MutableRefObject } from 'react';
import { ReactNode } from 'react';
import { Ref } from 'react';
import { RefObject } from 'react';
import { SVGProps } from 'react';

export declare type AnyCallWidgetMode = CallWidgetMode | LegacyCallWidgetMode;

export declare function AudioPlayer({ src, autoPlay, onFirstPlay, onEnded, durationHint, size, className, 'data-testid': testId }: AudioPlayerProps): JSX.Element;

export declare interface AudioPlayerProps {
    src: string;
    autoPlay?: boolean;
    /** Fires once, the first time playback starts — "mark as listened". */
    onFirstPlay?: () => void;
    onEnded?: () => void;
    /** Length to show before metadata arrives, in seconds. */
    durationHint?: number;
    /** `sm` fits a table row. */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}

export declare function AuthedAudio({ src, getAuthToken, onFirstPlay, eager, className, 'data-testid': testId }: AuthedAudioProps): JSX.Element;

export declare interface AuthedAudioProps {
    src: string;
    getAuthToken: () => string | null | Promise<string | null>;
    /** Fires once, when playback first starts — "mark as listened". */
    onFirstPlay?: () => void;
    /** Fetch immediately rather than on the Play click. */
    eager?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function AutoplayGate({ chipLabel, chipClassName, wrapperClassName, onPlayStateChange, ...streamProps }: AutoplayGateProps): JSX.Element;

export declare interface AutoplayGateProps extends StreamVideoProps {
    /** Chip label. Default: "Tap to unmute". */
    chipLabel?: string;
    /** Override the chip's Tailwind classes. */
    chipClassName?: string;
    /** Wrapper class for the relatively-positioned container. */
    wrapperClassName?: string;
}

/** Card width with the dock closed. */
export declare const CALL_CARD_WIDTH = "w-[380px]";

/**
 * dataTransfer key the widget stamps on a dock drag.
 *
 * A custom type rather than `text/plain` on purpose, in both directions: an
 * ordinary text drop target (a comment box, a rich-text editor) must not
 * mistake a dragged call for pasted text, and a dock slot must be able to
 * accept-or-reject during `dragover` — where the only thing a browser
 * exposes is `dataTransfer.types`, never the payload itself.
 */
export declare const CALL_DOCK_DRAG_TYPE = "application/x-call-dock";

/** The single height both columns take when the dock is open. */
export declare const CALL_DOCK_ROW_HEIGHT = "h-[480px]";

/** Video-column width with the dock open — it GROWS, it is not pinned. */
export declare const CALL_STAGE_DOCKED_WIDTH = "w-[480px]";

export declare function CallControls({ mode, density, isMuted, isCameraOn, isScreenSharing, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onEndCall, onAddParticipant, availableParticipants, currentParticipantIds, onOpenAddParticipant, extras, className, }: CallControlsProps): JSX.Element;

/**
 * How much of the control set the surface has room for.
 *
 *   'full'     every wired control sits in the row (default — unchanged).
 *   'compact'  only the controls needed to STAY in the call stay in the
 *              row (mute, camera, end) plus the caller's `extras`; the
 *              rest move into the "More" menu.
 *
 * A 320px widget docked beside a document was rendering the same nine-icon
 * row as a fullscreen stage, which is what made it read as "duplicated and
 * way off". Compact thins the row without REMOVING anything: a control the
 * caller wired but the user cannot reach is a regression, not a
 * simplification, so everything demoted is still one click away.
 */
export declare type CallControlsDensity = 'full' | 'compact';

export declare type CallControlsMode = 'audio' | 'video';

export declare interface CallControlsProps {
    mode: CallControlsMode;
    /** Row density. Defaults to 'full' — see {@link CallControlsDensity}. */
    density?: CallControlsDensity;
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
    /** Consumer-owned "add people" flow. When set, the add-participant
     *  button calls this instead of toggling the built-in inline picker —
     *  for hosts that already have their own invite surface (a modal over
     *  the presence roster, say) and just want the button in the row,
     *  looking like every other control. */
    onOpenAddParticipant?: () => void;
    /** Slot rendered IN the control row, between add-participant and the
     *  End button — camera effects, captions, raise-hand. Same contract
     *  as MediaControlsBar's `extras`: extra controls belong in the row,
     *  not floating in their own strip above it. */
    extras?: ReactNode;
    className?: string;
}

/** JSON written under {@link CALL_DOCK_DRAG_TYPE}. */
export declare interface CallDockDragPayload {
    /** The call being moved, when the host stamped `data-call-id` via `dataAttrs`. */
    callId?: string;
    /** Slot the widget is leaving, or null when it was floating free. */
    fromDockId: string | null;
}

/** A place in the page that can hold the call. */
export declare interface CallDockTarget {
    id: string;
    label: string;
}

export declare function CallingStatusPill({ show, label }: CallingStatusPillProps): JSX.Element | null;

export declare interface CallingStatusPillProps {
    /** Show/hide gate — the parent decides ringing semantics. */
    show: boolean;
    /** Label for the callee(s). E.g. "Alice", "Alice & Bob", "3 people". */
    label: string;
}

export declare type CallMode = 'audio' | 'video';

export declare function CallNoticePill({ show, tone, message, actions, className, 'data-testid': testId }: CallNoticePillProps): JSX.Element | null;

export declare interface CallNoticePillProps {
    show: boolean;
    tone?: 'warning' | 'error' | 'info';
    /** The one sentence. */
    message: ReactNode;
    /** Small buttons, rendered inline after the message. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

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

export declare function CallSettingsDialog({ open, onClose, previewStream, initialTab, devicesContent, effectsContent, peopleContent, chatContent, showPreview, title, className, }: CallSettingsDialogProps): JSX.Element;

export declare interface CallSettingsDialogProps {
    open: boolean;
    /** Backdrop click, Escape and the ✕ button all fire this. */
    onClose: () => void;
    /** Live self-preview stream — rendered muted, mirrored, autoplaying.
     *  Pass null for the "Camera off" empty state. */
    previewStream: MediaStream | null;
    /** Tab shown each time the dialog opens. Ignored (falls back to the
     *  first available tab) when that tab's slot is missing. */
    initialTab?: CallSettingsTab;
    /** "Devices" tab body — e.g. a <DeviceSettingsPanel/> wired to the
     *  consumer's device preferences. Omit to hide the tab. */
    devicesContent?: ReactNode;
    /** "Effects" tab body — e.g. a <MediaEffectsTray/> wired to the
     *  consumer's effects engine. Omit to hide the tab. */
    effectsContent?: ReactNode;
    /** "People" tab body — e.g. an <InviteCandidateList/> wired to the
     *  consumer's roster + invite call. Omit to hide the tab. */
    peopleContent?: ReactNode;
    /** "Chat" tab body — e.g. a chat panel wired to the call's channel.
     *  Omit to hide the tab. */
    chatContent?: ReactNode;
    /**
     * Show the small live self-preview on the left. Default true.
     *
     * Pass false when the tab body brings its own (larger) preview — which
     * is exactly what <MediaEffectsPreviewPanel> does. Two self-views side
     * by side, one live and one draft, is the confusing arrangement the
     * preview-before-publish work exists to remove.
     */
    showPreview?: boolean;
    /** Dialog heading. Defaults to "Call settings". */
    title?: string;
    className?: string;
}

export declare type CallSettingsTab = 'devices' | 'effects' | 'people' | 'chat';

export declare function CallSidePanel({ tabs, activeTab, onTabChange, mode, open, onClose, title, children, widthClassName, className, 'data-testid': testId, }: CallSidePanelProps): JSX.Element | null;

export declare function callSidePanelBodyTestId(tab: CallSidePanelTab): string;

/** How the dock rendered itself for the host widget's display mode. */
export declare type CallSidePanelPlacement = 'docked' | 'overlay';

/**
 * Which placement the dock takes for a given widget display mode.
 *
 * 'mini' is the only mode that cannot afford a column: at 320px a docked
 * panel would leave the video ~0px wide, so the dock covers the stage
 * instead (Meet/Teams narrow-window behaviour).
 */
export declare function callSidePanelPlacement(mode: CallWidgetMode): CallSidePanelPlacement;

export declare interface CallSidePanelProps {
    /** Destinations available in the dock. Supplying this switches the
     *  component to the tabbed API; `open`/`title`/`children` are ignored. */
    tabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onTabChange?: (id: string | null) => void;
    /** Host widget's display mode — decides docked vs overlay placement.
     *  Defaults to 'window' (docked). */
    mode?: CallWidgetMode;
    /** @deprecated Use `tabs` + `activeTab`. Kept working as a one-tab dock. */
    open?: boolean;
    /** The header ✕ fires this. The consumer owns the open/closed state.
     *  In the tabbed API this fires alongside `onTabChange(null)`. */
    onClose?: () => void;
    /** @deprecated Use `tabs`. Header text, e.g. "Chat". */
    title?: string;
    /** @deprecated Use `tabs`. Panel body. */
    children?: ReactNode;
    /** Width utility for the docked column. Defaults to `w-80`. Ignored in
     *  'overlay' placement, which is always full-bleed. */
    widthClassName?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface CallSidePanelTab {
    /** Stable id. 'chat' | 'people' | 'captions' get canonical testids and
     *  default icons; any other id works and falls back to derived ones. */
    id: string;
    /** Header text and toggle-button accessible name, e.g. "Chat". */
    label: string;
    /** Panel body — rendered inside a `min-h-0 flex-1 overflow-y-auto` slot. */
    content: ReactNode;
    /** Toggle-button glyph. Defaults by id for the three well-known tabs. */
    icon?: ReactNode;
    /** Unread/attention count rendered as a badge on the toggle button. */
    badgeCount?: number;
    /** Disable just this destination (e.g. captions still warming up). */
    disabled?: boolean;
    /** Override the derived toggle-button testid. */
    toggleTestId?: string;
    /** Override the derived tab-body testid. */
    panelTestId?: string;
}

/**
 * Icon toggles for the dock's destinations. Rendered automatically by
 * <CallWidget> and <ExpandableCallWidget> into their control rows when
 * `sidePanelTabs` is supplied — a consumer never positions these by hand.
 * Exported for hosts that build their own control bar.
 */
export declare function CallSidePanelToggles({ tabs, activeTab, onTabChange, disabled, className, 'data-testid': testId, }: CallSidePanelTogglesProps): JSX.Element | null;

export declare interface CallSidePanelTogglesProps {
    tabs: CallSidePanelTab[];
    /** Currently open destination, or null/undefined when the dock is closed. */
    activeTab?: string | null;
    /** Fires with the next destination id, or null when the active button
     *  is clicked again (click-to-close, like Meet's chat button). */
    onTabChange?: (id: string | null) => void;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function callSidePanelToggleTestId(tab: CallSidePanelTab): string;

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
export declare function CallStartedBanner({ callerName, callerAvatarUrl, context, mode, media, onJoin, onDismiss, autoExpireSec, className, style, }: CallStartedBannerProps): JSX.Element | null;

/** What the caller asked for. Not the same axis as `mode` (who is being
 *  addressed) — this is what answering will actually turn on. */
export declare type CallStartedBannerMedia = 'audio' | 'video';

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
    /**
     * What the caller invited you to. Renders as "Audio call" / "Video call"
     * on the banner's second line, so answering is an informed choice rather
     * than a surprise: a person who accepts an audio call should not find
     * their camera live. Omit when the invite carries no media intent — the
     * banner then says nothing about it rather than guessing.
     */
    media?: CallStartedBannerMedia;
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
    /**
     * Extra positioning / sizing classes. Prefer this over `style` — it is
     * composed after the `position` classes through `cn()`, so a caller class
     * wins (e.g. `top-8` overriding `top-2`), and inline styles are banned in
     * demos and stories.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
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

export declare function CallWidget({ state, mode, participants, localParticipant, callerName, duration, isMuted, isCameraOn, isScreenSharing, onAnswer, onDecline, onEndCall, onToggleMute, onToggleCamera, onToggleScreenShare, onUpgradeToVideo, onAddParticipant, availableParticipants, controlsExtras, onOpenAddParticipant, onMinimize, onExpand, layoutComponent, callStats, displayMode, minimized: minimizedProp, sidePanelTabs, activeSidePanelTab, onSidePanelTabChange, sidePanelWidthClassName, dockTargets, activeDockId, onDockTo, position, contained, draggable, className, style, dataAttrs, }: CallWidgetProps): JSX.Element | null;

/** Canonical display mode for any call surface. */
export declare type CallWidgetMode = 'mini' | 'window' | 'fullscreen';

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
    /** Slot rendered IN the control row (between add-participant and End)
     *  — the collapsed-widget counterpart to MediaControlsBar's `extras`.
     *  Lets a consumer add one action (effects, captions, settings)
     *  without forking the chrome, so the docked and expanded widgets can
     *  offer the SAME affordance in the same place. */
    controlsExtras?: ReactNode;
    /** Consumer-owned "add people" flow — see CallControls. Renders the
     *  add-participant button inline with the other controls (which is
     *  where it belongs visually) while the consumer owns the picker. */
    onOpenAddParticipant?: () => void;
    /** List of people available to add to the call */
    availableParticipants?: CallWidgetParticipant[];
    onMinimize?: () => void;
    onExpand?: () => void;
    /**
     * Canonical display mode for the widget chrome.
     *
     *   'mini'        collapsed pill (what `minimized` used to mean)
     *   'window'      the normal 320px widget
     *   'fullscreen'  same chrome as 'window'; <CallWidget> has no
     *                 viewport-filling stage of its own, so this renders
     *                 the full chrome and stamps `data-call-widget-mode`
     *                 for a host that supplies the stage.
     *
     * NOTE the prop is `displayMode`, not `mode`: `mode` on this component
     * has always meant the CALL mode ('audio' | 'video'), an orthogonal
     * axis, and renaming it would be the breaking change this API exists
     * to avoid. <ExpandableCallWidget> — which has no such collision —
     * spells the same vocabulary `defaultMode`/`setMode`.
     *
     * Wins over `minimized` when both are supplied (dev-only warn).
     */
    displayMode?: CallWidgetMode;
    /**
     * @deprecated Use `displayMode`. Maps as
     * `minimized === true → 'mini'`, `minimized === false → 'window'`.
     * Still fully supported; `displayMode` takes precedence if both are set.
     */
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
    /**
     * Destinations for the docked side panel (chat / people / captions).
     *
     * Supplying this gives the widget a side-panel REGION that is part of
     * the widget — not a detached floating window. The toggle buttons are
     * rendered automatically into the control row (ahead of
     * `controlsExtras`), and because the panel lives inside the widget's
     * own transformed root it travels with the widget when dragged.
     *
     * Per-mode behaviour:
     *   'window' / 'fullscreen'  the card WIDENS — the stage has no slack to
     *                            give up, so Meet's split becomes a grow
     *                            here: the stage column itself goes to
     *                            `CALL_STAGE_DOCKED_WIDTH` and the dock is
     *                            added beside it. Both columns take one
     *                            height (`CALL_DOCK_ROW_HEIGHT`), the stage
     *                            and the panel body absorbing the slack, so
     *                            the card has no dead bands in it.
     *   'mini'                   the collapsed pill has no video stage to
     *                            dock beside; the dock and its toggles are
     *                            not rendered. Expand to reach chat, which
     *                            is what Meet's PiP and Slack's huddle bar
     *                            both do.
     */
    sidePanelTabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeSidePanelTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onSidePanelTabChange?: (id: string | null) => void;
    /** Width utility for the docked column. Defaults to `w-80`. */
    sidePanelWidthClassName?: string;
    /**
     * Places in the page the call can be moved INTO (see "Page docking"
     * above). Supplying a non-empty list turns on the dock affordances: a
     * drag grip in the header, and a "Move to…" menu beside the window
     * controls.
     *
     * Absent or empty → the widget is exactly the floating card it has
     * always been. Nothing about the free-drag changes.
     */
    dockTargets?: CallDockTarget[];
    /**
     * The slot currently holding the call, or null while it floats. When
     * set, the widget stops free-dragging: it is part of the page's layout
     * now, and an offset transform would shove it back out of the slot it
     * was just dropped into. Pop out to get the floating card back.
     */
    activeDockId?: string | null;
    /** Fires with the destination slot id, or null to pop back out. */
    onDockTo?: (id: string | null) => void;
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
    /** ISO timestamp of caption emission. Seeds the linger timer for lines
     *  that never update again. */
    at: string;
    /** True if the caption is still being updated (interim) vs final.
     *  Omitted/false = final: final text always replaces the displayed text;
     *  interim text is subject to the stable-transcription shrink filter. */
    interim?: boolean;
}

/** CC / captions glyph — the live-captions affordance. */
export declare function CaptionsIcon({ size, ...rest }: IconProps): JSX.Element;

/** Chat bubble glyph — the in-call chat affordance. Pair with
 *  CircularIconToggle in a controls `extras` slot to open a chat side
 *  panel (CallSidePanel) or the settings dialog's Chat tab. */
export declare function ChatBubbleIcon({ size, ...rest }: IconProps): JSX.Element;

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

export declare interface DevicePreferences {
    microphoneId?: string;
    cameraId?: string;
    speakerId?: string;
}

export declare function DeviceSettingsPanel({ value, onChange, showCamera, children, 'data-testid': testId, }: DeviceSettingsPanelProps): JSX.Element;

export declare interface DeviceSettingsPanelProps {
    value: DevicePreferences;
    onChange: (next: DevicePreferences) => void;
    /** Hide the camera row for an audio-only call. */
    showCamera?: boolean;
    /** Extra rows the host wants under the pickers (a level meter, a note). */
    children?: ReactNode;
    'data-testid'?: string;
}

export declare function EmbeddedCallPanel({ title, subtitle, durationSeconds, live, recording, onPopOut, popOutLabel, children, controls, stage, className, 'data-testid': testId, }: EmbeddedCallPanelProps): JSX.Element;

export declare interface EmbeddedCallPanelProps {
    /** What this call is — a room name, "Alice & Bob", a channel. */
    title: ReactNode;
    /** "3 in call", "Live" — the second thing worth knowing. */
    subtitle?: ReactNode;
    durationSeconds?: number;
    /** Shows the live dot. Default true — an embedded call that is not live is not shown. */
    live?: boolean;
    /**
     * Whether this call records. `armed` = it will (a room with recording on, a
     * DM both people opted into) but nothing is written yet; `active` = writing
     * now. Omitted or neither → no chip, which is the "not recorded" statement.
     */
    recording?: RecordingChipState;
    /** Take the call back out into its floating window. Omitted → no button. */
    onPopOut?: () => void;
    popOutLabel?: string;
    /** The tile area: HangoutLayout / CallParticipantStrip / a stream player. Fills a 16:9 stage. */
    children: ReactNode;
    /** MediaControlsBar or equivalent, rendered under the stage. */
    controls?: ReactNode;
    /** Stage aspect. `video` keeps 16:9; `audio` is a short strip for an audio-only call. */
    stage?: 'video' | 'audio';
    className?: string;
    'data-testid'?: string;
}

export declare function ExpandableCallWidget({ title, subtitle, durationSeconds, children, controls, defaultMode: defaultModeProp, inline, onModeChange, persistKey, apiRef, defaultCorner, expandable, sidePanelTabs, activeSidePanelTab, onSidePanelTabChange, zIndex, className, 'data-testid': rootTestId, }: ExpandableCallWidgetProps): JSX.Element;

export declare interface ExpandableCallWidgetHandle {
    /** Always canonical — 'window', never 'docked'. */
    mode: CallWidgetMode;
    /** Accepts either dialect; normalizes to canonical. */
    setMode: (m: AnyCallWidgetMode) => void;
}

export declare interface ExpandableCallWidgetProps {
    /** Header label (left side of chrome). */
    title?: ReactNode;
    /** Optional status line shown under the title (e.g. "0:36 • 3 in call"). */
    subtitle?: ReactNode;
    /** Elapsed call time in seconds. When set, a monospace timer
     *  (data-testid="call-timer") renders after the subtitle — the same
     *  affordance CallWidget's collapsed chrome exposes, so e2e journeys
     *  can read the duration in either mode. */
    durationSeconds?: number;
    /** Body — typically `<HangoutLayout fillParent participants={…}/>`. */
    children: ReactNode;
    /** Optional controls strip rendered below the body. Stays inside the
     *  widget chrome in mini mode (compact); spans full width in window
     *  and fullscreen modes. */
    controls?: ReactNode;
    /** Initial mode. Persisted modes override this once `persistKey` is
     *  set and storage has a prior value. Default: 'mini'.
     *
     *  The pre-2.106 spelling `'docked'` is accepted and normalized to
     *  `'window'`.
     *  @see CallWidgetMode */
    defaultMode?: PersistedWidgetMode | 'docked';
    /**
     * The widget is living INSIDE a container — a document's gutter, a panel —
     * rather than floating over the page.
     *
     * Every mode below is `position: fixed` with a pixel width, which is right
     * for a window and wrong for a slot: re-parented into a 280px column the
     * widget kept its fixed positioning and its own width, so it floated over
     * the page it was supposedly docked into and was clipped by the column it
     * overflowed. Inline drops the positioning and fills the container, and the
     * host owns the geometry.
     */
    inline?: boolean;
    /** Fires after every settled mode change (programmatic or via UI).
     *  Emits the CANONICAL vocabulary — 'window' where builds before
     *  2.106 emitted 'docked'. */
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
    /**
     * Destinations for the docked side panel (chat / people / captions).
     *
     * The panel is part of the widget, not a sibling floating window: it
     * renders inside the same positioned root, so it moves, resizes and
     * closes with the call. Its toggle buttons are appended to the controls
     * strip automatically — the host positions nothing.
     *
     * Per-mode behaviour (see ./CallSidePanel for the full rationale):
     *   'window' / 'fullscreen'  SPLIT — the stage keeps `flex-1` and the
     *                            dock takes a right-edge column (w-80, or
     *                            w-96 in fullscreen). This is the Google
     *                            Meet / Zoom / Teams layout.
     *   'mini'                   OVERLAY — a full-bleed sheet on top of the
     *                            320px stage. Splitting a mini widget would
     *                            leave the video ~0px wide; Meet and Teams
     *                            both switch to a covering sheet at this
     *                            size instead.
     */
    sidePanelTabs?: CallSidePanelTab[];
    /** The single open destination, or null when the dock is closed. */
    activeSidePanelTab?: string | null;
    /** Fires with the next id, or null when the dock should close. */
    onSidePanelTabChange?: (id: string | null) => void;
    /** z-index for the floating modes. Default 9999. */
    zIndex?: number;
    /** Class on the root. */
    className?: string;
    /** Root testid. Defaults to 'expandable-call-widget' so tests (and the
     *  demo harness) can scope to THIS widget — `data-call-widget-mode` is
     *  also stamped by <CallWidget>, so it is not a unique handle. */
    'data-testid'?: string;
}

export declare function formatAudioTime(seconds: number): string;

export declare function GoLiveButton({ live, starting, onGoLive, onEndBroadcast, viewerCount, streamReady, connection, channelName, error, endHint, label, disabled, className, 'data-testid': testId, }: GoLiveButtonProps): JSX.Element;

export declare interface GoLiveButtonProps {
    /**
     * Actually broadcasting — media flowing, not "a session exists". The
     * control stops being an action and becomes a status: a second "Go live"
     * over a live broadcast is an offer to start something already running.
     *
     * Hosts must NOT pass a merely-open session here. A call that is still
     * negotiating belongs in `starting`, and one that failed belongs in
     * `error` — both used to arrive as `live`, which is how a broadcast that
     * never came up reported itself as on air.
     */
    live?: boolean;
    /** Between the click and the broadcast actually being up. */
    starting?: boolean;
    /**
     * Start the broadcast AND announce it to the channel. See the header — the
     * announcement is the half that makes it a broadcast rather than a call.
     */
    onGoLive?: () => void;
    /**
     * Ends it, when the host has a handler that really does. Omit it and the
     * live state carries `endHint` instead — a label that says where the stop
     * control is beats a button that is wired to nothing.
     */
    onEndBroadcast?: () => void;
    /**
     * Watchers, when known. Same contract as StreamStage: `null`/omitted is
     * "nobody measured", a numeric 0 is a measured empty house. A broadcaster
     * is the one person for whom the honest 0 is worth the discouragement — it
     * is the difference between "nobody came" and "the counter is broken".
     */
    viewerCount?: number | null;
    /**
     * Is anything actually reaching an audience? See the header. `undefined`
     * means nobody checked; `false` is the state where the call is up and the
     * stream is not, which this control must never render as "You are live".
     */
    streamReady?: boolean;
    /**
     * The broadcaster's OWN connection, while live.
     *
     * `streamReady` answers "did this broadcast ever reach anybody" and it
     * latches: hosts derive it from a session record that stops being re-asked
     * once it is true. So it catches a broadcast that never came up and is
     * silent about one that stops halfway — which is the failure the person
     * presenting is least able to notice on their own, because their own
     * preview keeps playing from their own camera.
     *
     * Observed: a broadcaster whose network dropped mid-broadcast was shown
     * "You are live · 1 watching" for the full 30s the drop lasted, while the
     * audience was already being told the stream had stopped responding.
     *
     *   'online'   — nothing is wrong, or nobody is watching the connection.
     *   'unstable' — the transport is retrying. Media may not be going out.
     *   'offline'  — the transport is down. Nothing is going out.
     *
     * Anything but `online` retires the confident pill. The claim "you are
     * live" is a claim about OTHER PEOPLE, and it must not outlive the
     * connection that would carry it to them.
     */
    connection?: 'online' | 'unstable' | 'offline';
    /**
     * Who gets told, named — e.g. `#design`. The social consequence of the
     * press is the half people underestimate, and "the channel" is vaguer than
     * the product can afford to be about a message it is going to post.
     */
    channelName?: string;
    /**
     * Why the last attempt did not work, in words the person can act on. Shown
     * as a live-region alert beside the resting button, because a failure that
     * only reverts the button reads as "the click did nothing".
     */
    error?: string | null;
    /** Where the stop control is, when this component does not own one. */
    endHint?: string;
    /** Replaces the resting wording, e.g. "Broadcast this room". */
    label?: string;
    disabled?: boolean;
    /** On the wrapper — the control now has a hint line under it. */
    className?: string;
    'data-testid'?: string;
}

export declare function gridCols(count: number): number;

/**
 * The safety gate, hoisted out of the component so it can be asserted on
 * directly. Every selection handler in this panel is wrapped in it.
 *
 * Outside a preview session the wrapped callback is a no-op — a click
 * cannot reach the controller, and therefore cannot reach peers. The
 * `disabled` attribute on the chips is the SECOND layer, not this one;
 * disabling is a rendering detail a refactor can drop, whereas this
 * refuses to run.
 */
export declare function guardedSelection<A extends unknown[]>(previewActive: boolean, fn: (...args: A) => void): (...args: A) => void;

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

export declare function HangoutLayout({ participants, localParticipant, mode, activeSpeakerId, speakerHysteresisMs, spotlightContent, spotlightContentLabel, onParticipantClick, fillParent, pipWidth, filmstripTileWidth, className, style, }: HangoutLayoutProps): JSX.Element;

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
    /** Attribution label for `spotlightContent` — see HangoutSpotlight. */
    spotlightContentLabel?: string;
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

export declare function HangoutPreJoinShell({ channelName, localIdentity, previewStream, permission, permissionMessage, audioEnabled, videoEnabled, onToggleAudio, onToggleVideo, onRetryPermission, participants, readyState, readyLoading, effectsSlot, onJoin, onCancel, joinLabel, joinDisabled, subtitleOverride, className, 'data-testid': testId, }: HangoutPreJoinShellProps): JSX.Element;

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
    /** Rendered in the green room between the camera preview (with its
     *  mic/cam pre-flight toggles) and the Join controls. Intended for
     *  <MediaEffectsTray> so users can pick filters / background / face FX
     *  before joining. Omitted = rendering is unchanged. */
    effectsSlot?: ReactNode;
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

/** Same two states as RecordingChip; kept as a named alias for existing consumers. */
export declare type HangoutRoomHeaderRecording = RecordingChipState;

export declare function HangoutSpotlight({ participants, localParticipant, spotlightContent, spotlightContentLabel, activeSpeakerId, speakerHysteresisMs, onParticipantClick, fillParent, filmstripTileWidth, className, style, }: HangoutSpotlightProps): JSX.Element;

export declare interface HangoutSpotlightProps {
    /** Remote participants. Caller should NOT include the local user here. */
    participants: HangoutLayoutParticipant[];
    /** The local user — always renders in the filmstrip in spotlight mode. */
    localParticipant?: HangoutLayoutParticipant | null;
    /** Content for the main slot — typically a screen-share `<video>`. When
     *  provided, takes priority over the active-speaker tile. */
    spotlightContent?: ReactNode;
    /** Attribution label for `spotlightContent` — WHO is sharing. Without
     *  it the spotlight falls back to the active speaker's name, which is
     *  wrong whenever the person talking isn't the person sharing (F5). */
    spotlightContentLabel?: string;
    /** Active speaker id — drives spotlight slot via stabilized hysteresis. */
    activeSpeakerId?: string | null;
    /**
     * Hysteresis window (ms) before the spotlight slot swaps to a new
     * `activeSpeakerId`. Default 750.
     *
     * In a real call you WANT the delay — it stops the spotlight flickering on
     * coughs, laughs, and one-word interjections.
     *
     * Pass `0` when you need the rendered output to match the props you just
     * handed in, with no timers involved:
     *  - **Tests** — otherwise a change to `activeSpeakerId` needs fake timers
     *    plus an `act()`-wrapped `advanceTimersByTime` before any assertion.
     *  - **Storybook / demos** — changing the `activeSpeakerId` control would
     *    otherwise appear to do nothing for three quarters of a second, and a
     *    visual-regression snapshot could catch either state.
     */
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

export declare interface HlsFailure {
    kind: HlsFailureKind;
    /** HTTP status behind it, when there was one. */
    status: number | null;
    /**
     * The developer's account — hls.js's type/details, the missing-peer hint.
     * For a console, a `data-` attribute or a bug report. NEVER for a viewer;
     * that is what `error` is, and the two are deliberately different strings.
     */
    detail: string;
    /**
     * Whether attaching the same URL again could plausibly succeed. False for a
     * browser that cannot play HLS — a "Try again" there is a button that can
     * never work, which is worse than no button.
     */
    retryable: boolean;
}

/**
 * What KIND of thing went wrong, in terms a viewer's sentence can be built
 * from. hls.js's own vocabulary (`networkError`, `manifestLoadError`) is a
 * developer's, and it was reaching the screen: a room whose broadcast was not
 * producing rendered "HLS error: networkError" over the video — jargon, and
 * wrong, because the network was fine and there was simply nothing to play.
 *
 * The distinction that matters is the one the SERVER already makes and the
 * player was throwing away: a 503 saying "no active producers" is not a
 * network failure and not a bug, it is an empty channel.
 */
export declare type HlsFailureKind = 
/** The server answered, and its answer was that nothing is being broadcast. */
'no-broadcast'
/** The playlist could not be fetched at all — DNS, offline, CORS, timeout. */
| 'network'
/** The server answered, and its answer was that IT is broken. */
| 'server'
/** Bytes arrived and could not be decoded. */
| 'media'
/** This browser cannot play the stream at all. Retrying can never help. */
| 'unsupported' | 'other';

/** The viewer's sentence for a failure. Exported so a host can re-word it. */
export declare function hlsFailureText(failure: HlsFailure | null | undefined): string | null;

/**
 * What the player is actually doing. Distinct states because they call for
 * different words on screen and, more importantly, because "buffering",
 * "stalled" and "over" were previously indistinguishable to a viewer — all
 * three were a still frame under a LIVE badge.
 */
export declare type HlsPhase = 
/** No source attached. */
'idle'
/** Source attached, no frame produced yet. */
| 'connecting'
/** Frames are advancing. */
| 'playing'
/** Was playing, briefly out of data. Normal at a live edge. */
| 'buffering'
/** Out of data long enough that something is wrong. */
| 'stalled'
/** Unplayable. `error` carries the wording. */
| 'error';

export declare interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
}

/**
 * `null`/`undefined` mean nobody measured; a numeric 0 means somebody did and
 * the answer was nobody. Negative is nonsense from a broken source, and is
 * treated as unmeasured rather than shown.
 */
export declare function isKnownViewerCount(count: number | null | undefined): count is number;

/**
 * @deprecated Pre-2.106 spelling. 'docked' is now 'window'; everything
 * that accepts a mode still takes this union, but emits {@link CallWidgetMode}.
 */
export declare type LegacyCallWidgetMode = 'mini' | 'docked' | 'fullscreen';

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

export declare interface MediaEffectsBackgroundOption {
    id: string;
    label: string;
    /** Thumbnail + replacement image URL, rendered as the chip's preview. */
    url: string;
}

export declare interface MediaEffectsFilterOption {
    id: string;
    label: string;
}

export declare function MediaEffectsPreviewPanel({ previewActive, previewStream, isDirty, onApply, onCancel, filters, activeFilterId, onSelectFilter, backgrounds, backgroundMode, activeBackgroundUrl, onSelectBackground, faceSprites, activeFaceSpriteId, onSelectFaceSprite, disabled, title, applyLabel, className, 'data-testid': testId, }: MediaEffectsPreviewPanelProps): JSX.Element;

export declare interface MediaEffectsPreviewPanelProps extends Pick<MediaEffectsTrayProps, 'filters' | 'activeFilterId' | 'onSelectFilter' | 'backgrounds' | 'backgroundMode' | 'activeBackgroundUrl' | 'onSelectBackground' | 'faceSprites' | 'activeFaceSpriteId' | 'onSelectFaceSprite'> {
    /**
     * True while a preview session is open — i.e. the controller has a
     * non-null `draft` and its setters write that draft instead of the
     * live pipeline. When false the panel renders read-only and NO
     * selection callback fires, so nothing can reach peers.
     */
    previewActive: boolean;
    /**
     * The draft self-view (built from the controller's `previewTrack`).
     * Never published. Pass null for the camera-off / warming-up state.
     */
    previewStream: MediaStream | null;
    /** Draft differs from live. Gates Apply. */
    isDirty: boolean;
    /** Commit the draft — the only thing that changes what peers see. */
    onApply: () => void;
    /** Discard the draft and dismiss. Live stays untouched. */
    onCancel: () => void;
    /** Extra dimming on top of `previewActive`, e.g. while the engine warms. */
    disabled?: boolean;
    /** Panel heading. Defaults to "Video effects" (Teams' wording). */
    title?: string;
    /** Label for the commit button. Defaults to "Apply". */
    applyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function MediaEffectsTray({ filters, activeFilterId, onSelectFilter, backgrounds, backgroundMode, activeBackgroundUrl, onSelectBackground, faceSprites, activeFaceSpriteId, onSelectFaceSprite, disabled, compact, className, 'data-testid': testId, }: MediaEffectsTrayProps): JSX.Element;

export declare interface MediaEffectsTrayProps {
    filters: MediaEffectsFilterOption[];
    /** 'none' = no filter active. */
    activeFilterId: string;
    onSelectFilter: (id: string) => void;
    backgrounds: MediaEffectsBackgroundOption[];
    backgroundMode: 'none' | 'blur' | 'image';
    /** Only meaningful when backgroundMode === 'image'. */
    activeBackgroundUrl: string | null;
    /** ('none', null) | ('blur', null) | ('image', url) */
    onSelectBackground: (mode: 'none' | 'blur' | 'image', url: string | null) => void;
    faceSprites: MediaEffectsFilterOption[];
    /** null = no sprite active. */
    activeFaceSpriteId: string | null;
    onSelectFaceSprite: (id: string | null) => void;
    /** Dims every chip and blocks clicks — e.g. while the engine loads. */
    disabled?: boolean;
    /** Compact = tighter paddings for popover placement. */
    compact?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function MicIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MicOffIcon({ size, ...rest }: IconProps): JSX.Element;

/**
 * Map the legacy `minimized` boolean onto the canonical vocabulary.
 *
 *   minimized === true   → 'mini'
 *   minimized === false  → 'window'
 *
 * There is no legacy boolean for 'fullscreen' — <CallWidget> never had
 * one, which is exactly why the new prop exists.
 */
export declare function modeFromMinimized(minimized: boolean): CallWidgetMode;

export declare function MoreHorizontalIcon({ size, ...rest }: IconProps): JSX.Element;

export declare function MuteWhileTalkingToast({ show, label, }: MuteWhileTalkingToastProps): JSX.Element | null;

export declare interface MuteWhileTalkingToastProps {
    show: boolean;
    /** Optional label override. */
    label?: string;
}

export declare type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';

export declare function NetworkQualityBadge({ quality, className, style }: NetworkQualityBadgeProps): JSX.Element;

export declare interface NetworkQualityBadgeProps {
    quality: NetworkQuality;
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * the badge is normally docked into a corner of the video stage, and with
     * no className seam callers had to reach for an inline style (banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
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

export declare function PauseIcon({ size, ...rest }: IconProps): JSX.Element;

/**
 * Modes that survive a reload. Canonical vocabulary ('window', not the
 * pre-2.106 'docked') — see ./callWidgetMode. The value written to
 * localStorage keeps the LEGACY spelling so a rollback to an older build
 * still reads back the window state it wrote; the translation happens at
 * the storage boundary only.
 */
export declare type PersistedWidgetMode = 'mini' | 'window';

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

export declare function PlaybackReactionsLayer({ reactions, currentTimeMs, className, }: PlaybackReactionsLayerProps): JSX.Element;

export declare interface PlaybackReactionsLayerProps {
    reactions: TimedReaction[];
    /** Current playhead position in ms (player timeupdate). */
    currentTimeMs: number;
    className?: string;
}

export declare type PlayerPhase = 'idle' | 'connecting' | 'buffering' | 'playing' | 'error';

export declare function PlayIcon({ size, ...rest }: IconProps): JSX.Element;

/** Arrow leaving a box: "take this out of here" (pop out of a dock). */
export declare function PopOutIcon({ size, ...rest }: IconProps): JSX.Element;

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

/** Testid-safe name for a reaction emoji: 'heart', 'thumbs-up', … for the
 *  default set, hyphen-joined hex codepoints for anything else. Exported so
 *  consumers can build `reaction-option-${reactionEmojiName(e)}` selectors. */
export declare function reactionEmojiName(emoji: string): string;

export declare function ReactionOverlay({ reactions, className, style }: ReactionOverlayProps): JSX.Element;

export declare interface ReactionOverlayProps {
    reactions: Reaction[];
    /**
     * Positioning / sizing classes from the caller. Prefer this over `style`:
     * the overlay is `absolute inset-0` by default, and callers wanting to
     * scope it to a sub-region had no seam but an inline style (banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function ReactionPicker({ onReact, emojis, className, style }: ReactionPickerProps): JSX.Element;

/**
 * Icon trigger + popover pairing of ReactionPicker, sized to sit in a call
 * control row next to CallControls' 36px round buttons.
 *
 * The popover is positioned `absolute` against the wrapper — NEVER
 * `position: fixed` — because CallWidget applies a CSS transform to its
 * root, which makes transformed ancestors the containing block for fixed
 * children. Absolute-in-relative keeps the popover anchored to the button
 * in both the docked and expanded layouts.
 */
export declare function ReactionPickerButton({ onReact, emojis, closeOnReact, align, disabled, className, }: ReactionPickerButtonProps): JSX.Element;

export declare interface ReactionPickerButtonProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    /** Close the popover after an emoji is picked. Default true. */
    closeOnReact?: boolean;
    /** Horizontal anchoring of the popover relative to the trigger. Default
     *  'center'. Use 'right' when the button sits near the widget's right
     *  edge (docked CallWidget) so the row doesn't overflow the clip rect. */
    align?: 'center' | 'left' | 'right';
    /** Dims the trigger and blocks opening — e.g. while the send path
     *  is unavailable. */
    disabled?: boolean;
    className?: string;
}

export declare interface ReactionPickerProps {
    onReact: (emoji: string) => void;
    emojis?: string[];
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * the picker is usually floated over a call stage, which previously
     * required an inline style (banned in demos and stories). Composed
     * through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function ReconnectingBanner({ show, label }: ReconnectingBannerProps): JSX.Element | null;

export declare interface ReconnectingBannerProps {
    show: boolean;
    /** Optional label override. Default: "Reconnecting…". */
    label?: string;
}

export declare const RECORDING_CHIP_TITLES: {
    readonly active: "Recording — saved to /recordings when the call ends";
    readonly armed: "Recording armed — will start once the call is under way";
};

export declare function RecordingChip({ armed, active, titles, className, 'data-testid': testId, }: RecordingChipProps): JSX.Element | null;

export declare interface RecordingChipProps extends RecordingChipState {
    /** Overrides the default hover copy for each state. */
    titles?: Partial<Record<'armed' | 'active', string>>;
    className?: string;
    'data-testid'?: string;
}

export declare interface RecordingChipState {
    /** Recording is on for this call — it will record, or is recording. */
    armed: boolean;
    /** Bytes are being written right now. Implies armed. */
    active: boolean;
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

export declare function RosterPanel({ participants, activeSpeakerId, onParticipantClick, count, title, footer, tone, className, }: RosterPanelProps): JSX.Element;

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
    /** 'dark' renders on black call chrome (the shipped token palette is
     *  light-only, so the default is a white slab inside the dark call
     *  widget — 2026-08-25 audit P0-3). */
    tone?: 'light' | 'dark';
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

/** Sparkles / magic-wand glyph — the media-effects affordance. Pair with
 *  CircularIconToggle in MediaControlsBar's `extras` slot to open a
 *  MediaEffectsTray. */
export declare function SparklesIcon({ size, ...rest }: IconProps): JSX.Element;

/**
 * Whether the LIVE badge may be lit.
 *
 * The badge is the caller's claim ANDed with what the player managed to do —
 * on the HLS path a caller typically knows only that it composed a playlist
 * URL, which is string concatenation, not a broadcast. `buffering` counts: a
 * momentary rebuffer at the live edge is still live. `stalled` does NOT: a
 * frame that has not moved in eight seconds is a picture of the past, and
 * calling it live is the most confident lie this component can tell.
 *
 * `idle` counts because the caller's claim is all anyone has yet and nothing
 * contradicts it; once the grace period turns that into `not-started`, the
 * badge goes out.
 */
export declare function stagePhaseIsLive(phase: StreamStagePhase): boolean;

/**
 * Whether the stage is showing a picture the viewer can trust as CURRENT.
 * Everything else — connecting, buffering, stalled, error, empty — wants some
 * words over it rather than a bare frame.
 */
export declare function stagePhaseIsShowingLiveMedia(phase: StreamStagePhase): boolean;

export declare function StatsCard({ metrics, className, style }: StatsCardProps): JSX.Element;

export declare interface StatsCardProps {
    metrics: StreamMetrics | null;
    /**
     * Sizing / positioning classes from the caller. Prefer this over `style`:
     * the card has no intrinsic width, so every consumer was wrapping it in a
     * `<div>` purely to size it — inline styles are banned in demos and
     * stories. Applied to BOTH the empty and populated states, and composed
     * through `cn()` so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function StatusStrip({ phase, bitrateBps, viewerCount, duration, className, style }: StatusStripProps): JSX.Element;

export declare interface StatusStripProps {
    phase: PlayerPhase | 'live' | 'reconnecting';
    bitrateBps?: number;
    viewerCount?: number;
    duration?: number;
    /**
     * Sizing / positioning classes from the caller. Prefer this over `style`:
     * overlaying the strip on a player or widening it previously needed a
     * wrapper `<div>`, because inline styles are banned in demos and stories.
     * Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}

export declare function StreamAudioOnly({ name, avatarUrl, level, active, muted, hint, className, 'data-testid': testId, }: StreamAudioOnlyProps): JSX.Element;

export declare interface StreamAudioOnlyProps {
    /** Who is talking. Renders an avatar and a name when known. */
    name?: string;
    /** Profile image for the speaker; falls back to initials. */
    avatarUrl?: string;
    /**
     * Measured loudness, 0..1, or null when it cannot be measured. Null is not
     * silence — see the file header.
     */
    level?: number | null;
    /** Whether audio is actually reaching the viewer (playing AND not muted). */
    active?: boolean;
    /** Muted gets its own wording: the fix is one click away and worth naming. */
    muted?: boolean;
    /** Replaces the default explanation line. */
    hint?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface StreamChatMessage {
    id: string;
    /** Who sent it. */
    displayName: string;
    /** The message body. */
    content: string;
    /** ISO timestamp, rendered as HH:MM. */
    timestamp?: string;
}

export declare function StreamChatTicker({ messages, visibleCount, rotateMs, window: windowSize, className, 'data-testid': testId, }: StreamChatTickerProps): JSX.Element | null;

export declare interface StreamChatTickerProps {
    messages: readonly StreamChatMessage[];
    /** How many messages are on screen at once. */
    visibleCount?: number;
    /** Rotation interval in ms. 0 disables rotation and pins the newest. */
    rotateMs?: number;
    /**
     * How many recent messages the ticker may cycle through.
     *
     * Without a cap, a long call's history keeps growing and the rotation takes
     * minutes to come back around to anything current — a "live" ticker showing
     * a message from twenty minutes ago is worse than showing none.
     */
    window?: number;
    className?: string;
    'data-testid'?: string;
}

/**
 * Companion utility: returns true when the stream has at least one
 * paintable video track (live + enabled + not muted). Pair with
 * useTrackStateBump in the same component so the boolean re-derives on
 * every track transition.
 */
export declare function streamHasUsableVideo(stream: MediaStream | undefined | null): boolean;

/**
 * A stream with audio and no usable picture.
 *
 * NOT the same as a stream with nothing in it: a MediaStream with no tracks at
 * all is a failure, and putting a friendly "Audio only" card over it would be
 * the same category of lie as the black rectangle it replaced. Exported
 * because a host that already knows its publisher's shape can pass `audioOnly`
 * directly instead of re-deriving this.
 */
export declare function streamIsAudioOnly(stream: MediaStream | null | undefined): boolean;

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

export declare function StreamStage({ stream, playlistUrl, onPlaybackError, onRetry, title, viewerCount, live, audioOnly: audioOnlyProp, speakerName, speakerAvatarUrl, notStartedLabel, endedLabel, stallAfterMs, chatMessages, chatVisibleCount, chatRotateMs, muted: mutedInitial, allowFullscreen, showLatency, controls, placeholder, className, 'data-testid': testId, }: StreamStageProps): JSX.Element;

export declare type StreamStagePhase = 
/** No source yet, still inside the grace period. A normal pre-broadcast state. */
'idle'
/** No source, and long enough that promising one would be a lie. */
| 'not-started'
/** Had a source; it went away. The opposite message from `not-started`. */
| 'ended'
/** Source attached, no frame yet. */
| 'connecting'
/** Frames advancing. */
| 'playing'
/** Briefly out of data. Still live. */
| 'buffering'
/** Out of data long enough that the picture is a lie about the present. */
| 'stalled'
/** Unplayable. */
| 'error';

export declare function streamStagePhase({ hasStream, hasPlaylist, hadSource, graceExpired, streamHasTracks, hls, }: StreamStagePhaseInput): StreamStagePhase;

export declare interface StreamStagePhaseInput {
    hasStream: boolean;
    /**
     * Whether that MediaStream actually carries anything. `null` means the
     * caller could not tell (a stand-in object, a stream without `getTracks`).
     *
     * WHEP hands over a stream BEFORE its tracks arrive — `addtrack` fires
     * later — so an empty one is a subscription still being set up, or one that
     * never will be. Either way it is not a picture, and calling it `playing`
     * puts a LIVE badge over a black rectangle: the realtime spelling of the
     * same lie the HLS path had.
     */
    streamHasTracks?: boolean | null;
    hasPlaylist: boolean;
    /** Whether this mount has EVER held a source. Distinguishes ended from not-started. */
    hadSource: boolean;
    /** Whether the stage has waited longer than it is willing to promise. */
    graceExpired: boolean;
    /**
     * What the HLS player reports. `phase` is preferred; `error`/`loading` are
     * the fallback so a caller (or a test double) that only has the old two-flag
     * shape still resolves to the same answer.
     */
    hls?: {
        phase?: HlsPhase;
        error?: string | null;
        loading?: boolean;
    };
}

export declare interface StreamStageProps {
    /**
     * The live stream, realtime transport. Null renders the placeholder — a
     * stage with no stream is the normal state before a broadcast starts, not
     * an error.
     */
    stream?: MediaStream | null;
    /**
     * The live stream, near-realtime transport: an HLS playlist URL, typically
     * from `useLVSLiveHls`. Used when `stream` is absent.
     */
    playlistUrl?: string | null;
    /** Surfaced when HLS cannot play — an unsupported browser, a dead playlist. */
    onPlaybackError?: (err: Error) => void;
    /**
     * Called by the "Try again" control, in addition to the stage's own retry.
     * Use it when recovery needs something the stage cannot do — re-issuing a
     * signed playlist URL, re-subscribing over WHEP.
     *
     * It is also the ONLY thing that can offer a way back from `ended`: there is
     * no playlist left to re-attach there, so the stage's own retry could not
     * succeed and no button is drawn without this.
     */
    onRetry?: () => void;
    /** Replaces the default wording once a stream has failed to start. */
    notStartedLabel?: string;
    /**
     * Shown when a stream that WAS playing goes away — the broadcaster hung up.
     *
     * A distinct state from "not started". Both render an empty stage, but the
     * placeholder tells the audience to keep waiting, which is the wrong thing
     * to say about something that is over.
     */
    endedLabel?: ReactNode;
    /** How long to wait before saying so. Default 10s. */
    stallAfterMs?: number;
    /** Name of the stream or call, shown top-left. */
    title?: string;
    /**
     * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not.
     *
     * `null`/omitted and `0` are DIFFERENT claims and this component keeps them
     * apart: null renders no badge at all ("nobody has told us"), and a numeric
     * 0 renders "0 watching" ("somebody counted, and the answer was nobody").
     *
     * They were collapsed once — 0 was suppressed as if it were unknown — and
     * that is the wrong way round for this codebase specifically. Viewer count
     * here was STRUCTURALLY zero for a long time (the tracker had no callers at
     * all, so every channel reported an empty house), and a visible "0 watching"
     * is the only thing that distinguishes a working counter from a missing
     * one. Suppressing the zero hides exactly the failure worth catching.
     *
     * So a caller must never turn "not told" into 0 to satisfy the type. Omit
     * the prop instead — see WrappedStreamStage, which spreads it conditionally.
     */
    viewerCount?: number | null;
    /**
     * The caller's claim that this should be live. It is ANDed with what the
     * player actually managed to do, so on the HLS path a claim alone will not
     * light the badge — a composed playlist URL is not a broadcast.
     */
    live?: boolean;
    /**
     * Force the audio-only presentation on or off. Omitted, the stage works it
     * out: no usable video track on the realtime path, `videoWidth === 0` on
     * the HLS path.
     */
    audioOnly?: boolean;
    /** Who is broadcasting. Gives an audio-only stream a face and a name. */
    speakerName?: string;
    speakerAvatarUrl?: string;
    /**
     * Chat to rotate over the video. Empty or omitted renders no ticker at all,
     * so a silent stream is not carrying an empty chat frame.
     */
    chatMessages?: readonly StreamChatMessage[];
    /** Forwarded to the ticker. */
    chatVisibleCount?: number;
    chatRotateMs?: number;
    /**
     * Whether the stream starts muted. Default true, and effectively mandatory:
     * browsers refuse to autoplay audible media, so an unmuted stage would not
     * start at all. The viewer can unmute from the stage itself.
     */
    muted?: boolean;
    /** Offer a fullscreen control. Default true; hidden where the API is absent. */
    allowFullscreen?: boolean;
    /**
     * Show how far behind the live edge HLS playback is. Default true. HLS runs
     * seconds behind by construction, and a viewer who does not know that reads
     * the delay as a frozen stream.
     */
    showLatency?: boolean;
    /** Controls rendered bottom-right, e.g. leave / mute / fullscreen. */
    controls?: ReactNode;
    /** Shown centred when there is no stream. */
    placeholder?: ReactNode;
    className?: string;
    'data-testid'?: string;
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

export declare function SummaryPanel({ status, markdown, renderMarkdown, title, errorMessage, errorDetail, pendingMessage, idleState, className, }: SummaryPanelProps): JSX.Element;

export declare interface SummaryPanelProps {
    status: TranscriptStatus;
    /** The raw markdown returned by GET /api/recordings/:id/summary. */
    markdown?: string | null;
    /** Caller-provided renderer. If omitted, the markdown is rendered as
     *  a <pre>-wrapped code block — readable but not pretty. */
    renderMarkdown?: (md: string) => ReactNode;
    /** Optional title above the panel. Defaults to "Summary". */
    title?: string;
    /** Written for a person — see TranscriptPanel.errorMessage. */
    errorMessage?: string;
    /** The raw internal text behind it, shown behind a disclosure. */
    errorDetail?: string | null;
    pendingMessage?: string;
    idleState?: ReactNode;
    className?: string;
}

export declare interface TimedReaction {
    id: string;
    emoji: string;
    /** Milliseconds from the start of the recording. */
    offsetMs: number;
    displayName?: string;
}

/** Normalize either dialect to the canonical vocabulary. */
export declare function toCanonicalMode(mode: AnyCallWidgetMode): CallWidgetMode;

/** Canonical → the pre-2.106 spelling, for back-compat surfaces. */
export declare function toLegacyMode(mode: CallWidgetMode): LegacyCallWidgetMode;

export declare function TranscriptOverlay({ lines, maxLines, fadeAfterMs, now: nowProp, className, }: TranscriptOverlayProps): JSX.Element | null;

export declare interface TranscriptOverlayProps {
    lines: CaptionLine[];
    /** How many recent lines to show simultaneously. Default 4. */
    maxLines?: number;
    /**
     * Fade window ms: opacity ramps from 1 toward the 0.35 floor over this
     * span of no-update time. Default = REMOVE_AFTER_MS (3000), so a quiet
     * line fades all the way out and is then removed.
     */
    fadeAfterMs?: number;
    /**
     * "Now" in ms since epoch, used as the reference point for each line's
     * since-last-update opacity. Defaults to `Date.now()` — exposed for
     * deterministic tests and stories. When provided, the internal live-fade
     * interval is disabled, so the render is a pure function of props (plus
     * the per-line displayed-text memory).
     *
     * Without it, any fixture built from fixed ISO timestamps is arbitrarily
     * old by the time it renders, so every line has aged past the 3s linger
     * window and nothing renders at all. Pass the same epoch the fixture
     * timestamps were written against and the ramp is reproducible.
     */
    now?: number;
    className?: string;
}

export declare function TranscriptPanel({ status, segments, currentTimeMs, onSeek, title, errorMessage, errorDetail, pendingMessage, idleState, className, }: TranscriptPanelProps): JSX.Element;

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
    /** Surface the failure message when status === 'failed'. Write it for a
     *  person: this panel is on a page end users open, so queue names and
     *  transport-library prefixes belong in `errorDetail`, not here. */
    errorMessage?: string;
    /** The raw internal text behind `errorMessage`, revealed behind a
     *  "Show technical details" disclosure. Omit when there is nothing more
     *  to show than the message itself. */
    errorDetail?: string | null;
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

export declare function useAudioLevel(stream: MediaStream | null | undefined): number | null;

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

export declare function useHlsSource(videoRef: RefObject<HTMLVideoElement | null>, playlistUrl: string | null | undefined, opts?: UseHlsSourceOptions): UseHlsSourceState;

export declare interface UseHlsSourceOptions {
    /**
     * Tune for a live edge rather than a recording.
     *
     * A live viewer wants to be near the broadcast, and a large back buffer on a
     * stream someone leaves open for an hour is memory spent on video nobody
     * will scrub back to. VOD wants the opposite — keep what was downloaded so
     * seeking backwards is instant.
     */
    live?: boolean;
    /**
     * How long playback may fail to advance before it is called STALLED rather
     * than buffering. Short enough that a viewer is not lied to for long, long
     * enough that an ordinary rebuffer at the live edge is not an alarm.
     */
    stalledAfterMs?: number;
    onError?: (err: Error) => void;
}

export declare interface UseHlsSourceState {
    /**
     * What to SHOW a viewer when playback failed, or null. Plain language, no
     * hls.js vocabulary, no status codes — see `failure.detail` for those.
     */
    error: string | null;
    /** The same failure, classified, for logging and for deciding on a retry. */
    failure: HlsFailure | null;
    /** True between attach and first data. Equivalent to `phase === 'connecting'`. */
    loading: boolean;
    /** The whole truth; prefer this over the two booleans above. */
    phase: HlsPhase;
    /**
     * Whether the media has audio but no picture. `null` until the element has
     * metadata — "not known yet" is not "there is video", and rendering an
     * audio-only card over a video stream is its own lie.
     */
    audioOnly: boolean | null;
    /**
     * Seconds behind the live edge, or null when it cannot be measured. HLS runs
     * seconds behind by construction; a viewer who is not told that concludes
     * the stream is frozen.
     */
    latencySec: number | null;
    /** Seek to the live edge. No-op when there is no source. */
    seekToLive: () => void;
    /** Tear the source down and attach it again from scratch. */
    retry: () => void;
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

/** Add-a-person. Lives here rather than inside CallControls' private
 *  icon map so the docked and expanded call chromes can both render the
 *  same "add people" affordance. */
export declare function UserPlusIcon({ size, ...rest }: IconProps): JSX.Element;

/** Roster glyph (two people, no "+") — the People destination in the
 *  call side-panel dock. Distinct from UserPlusIcon, which means "invite
 *  someone new" rather than "show who is here". */
export declare function UsersIcon({ size, ...rest }: IconProps): JSX.Element;

/**
 * Debounce activeSpeakerId so the spotlight slot only swaps after the new
 * speaker has been talking for at least `hysteresisMs`. Without this,
 * every cough, laugh, or short interjection causes flicker.
 *
 * `hysteresisMs <= 0` bypasses the timer entirely and commits the new id on
 * the next effect flush — the escape hatch tests and stories use so the
 * rendered output tracks the props synchronously.
 */
export declare function useStableActiveSpeaker(activeSpeakerId: string | null | undefined, hysteresisMs: number): string | null;

export declare function useTrackStateBump(stream: MediaStream | undefined | null, participantLabel: string): number;

/**
 * Static N-way grid: 1 / 2×2 / 3×3 / 4×4 column count based on participant
 * count. Tiles do NOT reflow on speaker change — speaking is indicated via
 * border highlight on the tile only (see ParticipantTile). For an
 * active-speaker-aware spotlight layout, use `HangoutLayout` instead.
 */
export declare function VideoGrid({ participants, className, style }: VideoGridProps): JSX.Element;

export declare interface VideoGridProps {
    participants: Participant[];
    /**
     * Sizing / spacing classes from the caller. Prefer this over `style`:
     * callers only ever needed `style` to constrain the grid's width, which
     * forced a wrapper `<div>` on every consumer (inline styles are banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
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

export declare function ViewerCount({ count, className, style, 'data-testid': testId, }: ViewerCountProps): JSX.Element | null;

export declare interface ViewerCountProps {
    /**
     * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not —
     * the badge then renders nothing rather than claiming an audience of zero.
     */
    count?: number | null;
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * callers overlaying the badge on a player had no className seam, so they
     * were forced into an inline style.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function VoicemailRecorder({ open, onClose, recipientName, getStream, onSend, maxSeconds, 'data-testid': testId }: VoicemailRecorderProps): JSX.Element;

export declare interface VoicemailRecorderProps {
    open: boolean;
    onClose: () => void;
    /** Who the message is for — the title. */
    recipientName: string;
    /** Microphone access, with whatever device preference the host applies. */
    getStream: () => Promise<MediaStream>;
    /** Deliver the message. Reject to keep the dialog open with the error shown. */
    onSend: (blob: Blob, durationMs: number, mimeType: string) => Promise<void>;
    maxSeconds?: number;
    'data-testid'?: string;
}

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}
