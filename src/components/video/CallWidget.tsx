// src/components/video/CallWidget.tsx
//
// Floating call widget for audio/video calls. Draggable, minimizable,
// with controls for mute, camera, screen share, and participant
// management. Inspired by Teams/Slack/Gmail floating call UIs.
//
// As of the 2026-05 decomposition, the bottom controls bar lives in
// `CallControls.tsx`, the audio-only avatar strip lives in
// `CallParticipantStrip.tsx`, and the optional diagnostics overlay
// lives in `CallStatsOverlay.tsx`. This file owns the composition,
// drag/snap behaviour, ringing/connecting views, and the minimized pill.

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { cn } from '../../lib/cn';
import { onActivationKey } from '../../lib/activationKey';
import { CallAvatar, type CallStripParticipant } from './CallParticipantStrip';
import { CallParticipantStrip } from './CallParticipantStrip';
import { CallControls } from './CallControls';
import { CallStatsOverlay, type CallStatsOverlayStats } from './CallStatsOverlay';
import {
  CallSidePanel,
  CallSidePanelToggles,
  type CallSidePanelTab,
} from './CallSidePanel';
import {
  modeFromMinimized,
  toLegacyMode,
  warnModeConflictOnce,
  type CallWidgetMode,
} from './callWidgetMode';

// ---------------------------------------------------------------------------
// Dimensions
// ---------------------------------------------------------------------------
//
// Sized for a floating widget, not a stage: the whole card has to sit in a
// corner of a 1280×800 laptop screen (the smallest we support) with its
// 16px margin and still leave the app behind it usable. Numbers:
//
//   closed          380px wide — the old 320 made the self-view postage-
//                   stamp sized once anything else was in the row.
//   dock open       480px stage + the dock's own width (320 by default)
//                   → 800px, and 480px tall → 517px with the title bar.
//                   832×549 including margins: fits 1280×800 with room to
//                   spare, and reads as a widget rather than a takeover.
//                   The big layout belongs to <ExpandableCallWidget>.
//
// Exported so a host (and the tests) can assert the contract rather than
// re-deriving these strings.

/** Card width with the dock closed. */
export const CALL_CARD_WIDTH = 'w-[380px]';
/** Video-column width with the dock open — it GROWS, it is not pinned. */
export const CALL_STAGE_DOCKED_WIDTH = 'w-[480px]';
/** The single height both columns take when the dock is open. */
export const CALL_DOCK_ROW_HEIGHT = 'h-[480px]';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CallWidgetState = 'idle' | 'ringing' | 'connecting' | 'active' | 'ended';
export type CallMode = 'audio' | 'video';

// ---------------------------------------------------------------------------
// Page docking ("contextual video")
// ---------------------------------------------------------------------------
//
// The widget can be handed OVER to the page: dropped into a gutter slot so
// the call is embedded in the document being discussed instead of hovering
// above it. This file owns only the SOURCE half of that gesture; the slot
// that accepts the drop lives with the document chrome.

/**
 * dataTransfer key the widget stamps on a dock drag.
 *
 * A custom type rather than `text/plain` on purpose, in both directions: an
 * ordinary text drop target (a comment box, a rich-text editor) must not
 * mistake a dragged call for pasted text, and a dock slot must be able to
 * accept-or-reject during `dragover` — where the only thing a browser
 * exposes is `dataTransfer.types`, never the payload itself.
 */
export const CALL_DOCK_DRAG_TYPE = 'application/x-call-dock';

/** A place in the page that can hold the call. */
export interface CallDockTarget {
  id: string;
  label: string;
}

/** JSON written under {@link CALL_DOCK_DRAG_TYPE}. */
export interface CallDockDragPayload {
  /** The call being moved, when the host stamped `data-call-id` via `dataAttrs`. */
  callId?: string;
  /** Slot the widget is leaving, or null when it was floating free. */
  fromDockId: string | null;
}

export interface CallWidgetParticipant extends CallStripParticipant {
  videoStream?: MediaStream | null;
}

export interface CallWidgetProps {
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
  /**
   * Fires when a free-drag of the widget starts and ends. A page uses it to
   * show the places the call could land — a ghost of a dock along its bottom
   * edge — only while the reader is actually moving the call toward one.
   * The drop itself is the pointer-drag hit-test on `data-call-dock-target`;
   * this is only the cue.
   */
  onDragStateChange?: (dragging: boolean) => void;
  /** Arbitrary `data-*` attributes to spread onto the root element.
   *  Lets callers (e.g. HangoutOverlay) attach e2e-friendly testids and
   *  lobby/callId metadata without an extra wrapper div that would
   *  conflict with the widget's own `position: fixed` placement. */
  dataAttrs?: Record<string, string | number | undefined>;
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// VideoTile — local <video> element bound to a MediaStream.
// ---------------------------------------------------------------------------

function VideoTile({
  stream,
  muted = false,
  className,
}: {
  stream: MediaStream;
  muted?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.srcObject !== stream) {
      el.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted={muted}
      className={cn('w-full h-full object-cover', className)}
    />
  );
}

// ---------------------------------------------------------------------------
// SVG Icons (subset — only those still used by CallWidget itself)
// ---------------------------------------------------------------------------

const icons = {
  phoneEnd: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
      <line x1="22" y1="2" x2="2" y2="22" />
    </svg>
  ),
  phoneAnswer: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  minimize: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
  snapBack: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  // Grip dots — the universal "pick this up" affordance, so the dock drag
  // reads as a drag rather than as decoration in the title bar.
  grip: (
    <svg width="10" height="12" viewBox="0 0 10 16" fill="currentColor" aria-hidden>
      <circle cx="3" cy="3" r="1.3" />
      <circle cx="7" cy="3" r="1.3" />
      <circle cx="3" cy="8" r="1.3" />
      <circle cx="7" cy="8" r="1.3" />
      <circle cx="3" cy="13" r="1.3" />
      <circle cx="7" cy="13" r="1.3" />
    </svg>
  ),
  // A card sliding into a column — "move this into the page".
  dockTo: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="15" y1="4" x2="15" y2="20" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Ringing View
// ---------------------------------------------------------------------------

function RingingView({
  callerName,
  onAnswer,
  onDecline,
}: {
  callerName?: string;
  onAnswer?: () => void;
  onDecline?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-5 px-4" data-testid="call-ringing-view">
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm m-0">
          {callerName || 'Incoming call'}
        </p>
        <p className="text-white/50 text-xs m-0 mt-1">is calling...</p>
      </div>
      {/* Both handlers are optional on CallWidgetProps and neither has a
          fallback: an unguarded Answer/Decline renders a live green/red
          call button that swallows the click while the widget keeps
          ringing. Render each only when the host wired it. */}
      <div className="flex gap-4">
        {onDecline && (
          <button
            data-ui-part=""
            type="button"
            onClick={onDecline}
            className="w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors"
            aria-label="Decline call"
          >
            {icons.phoneEnd}
          </button>
        )}
        {onAnswer && (
          <button
            data-ui-part=""
            type="button"
            onClick={onAnswer}
            className="w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors"
            aria-label="Answer call"
          >
            {icons.phoneAnswer}
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Active Call View
// ---------------------------------------------------------------------------

function ActiveCallContent({
  mode,
  fillHeight = false,
  participants,
  localParticipant,
  duration,
  isMuted,
  isCameraOn,
  isScreenSharing,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onUpgradeToVideo,
  onAddParticipant,
  availableParticipants,
  onOpenAddParticipant,
  controlsExtras,
  onEndCall,
  layoutComponent,
  callStats,
}: Pick<
  CallWidgetProps,
  | 'mode'
  | 'participants'
  | 'localParticipant'
  | 'duration'
  | 'isMuted'
  | 'isCameraOn'
  | 'isScreenSharing'
  | 'onToggleMute'
  | 'onToggleCamera'
  | 'onToggleScreenShare'
  | 'onUpgradeToVideo'
  | 'onAddParticipant'
  | 'availableParticipants'
  | 'controlsExtras'
  | 'onOpenAddParticipant'
  | 'onEndCall'
  | 'layoutComponent'
  | 'callStats'
> & {
  /** Stretch to the parent's height: the video stage becomes the flexible
   *  region and the duration line + control row sit on the bottom edge.
   *  Set when the side-panel dock is open — the dock column has a definite
   *  height, and a stage that keeps its intrinsic 16:9 height leaves a dead
   *  band under the controls beside a full-height chat. */
  fillHeight?: boolean;
}) {
  const showVideo = mode === 'video' && isCameraOn;

  return (
    <div className={cn('flex flex-col', fillHeight && 'h-full min-h-0')}>
      {/* Video area — caller-provided layout takes precedence over the
       * default single-PiP layout. Wrap in the same mx-3/mt-3 container so
       * external layouts don't have to know the widget's outer padding. */}
      {/* A caller-supplied layout wins over `mode`. `mode` describes the
       * CALL — an audio call whose stage is a black rectangle with a name on
       * it is the failure this ordering prevents — but only the caller knows
       * what its own layout renders, and an audio call still needs the
       * overlays (ringing pill, captions, reactions, banners) that live in
       * that tree. So `mode` picks the FALLBACK stage, not whether the
       * caller's stage is allowed to exist. */}
      {layoutComponent && (
        <div className={cn('mx-3 mt-3 rounded-lg overflow-hidden relative', fillHeight && 'min-h-0 flex-1')}>
          {layoutComponent}
          <CallStatsOverlay stats={callStats} position="bottom-left" />
        </div>
      )}
      {!layoutComponent && mode === 'video' && (
        <div
          className={cn(
            'relative bg-black rounded-lg overflow-hidden mx-3 mt-3',
            fillHeight ? 'min-h-0 flex-1' : 'aspect-video',
          )}
        >
          {localParticipant?.videoStream && showVideo ? (
            <VideoTile stream={localParticipant.videoStream} muted />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-video-stage">
              {localParticipant && <CallAvatar participant={localParticipant} size={48} />}
            </div>
          )}
          {/* Remote PiP. Always rendered when there's at least one remote
           * participant — falls back to an Avatar when the videoStream is
           * null/undefined (e.g. peer toggled their camera off via the
           * participant-state cameraOn flag). Before this fix, the PiP
           * tile disappeared entirely, which read as "the peer left" even
           * when they were still in the call with audio only. */}
          {participants.length > 0 && (
            <div className="absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-video-tile">
              {participants[0].videoStream ? (
                <VideoTile stream={participants[0].videoStream} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CallAvatar participant={participants[0]} size={28} />
                </div>
              )}
              {participants[0].isMuted && (
                <div
                  className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-danger/90 flex items-center justify-center text-white"
                  aria-label="Microphone muted"
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
                    <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
                  </svg>
                </div>
              )}
            </div>
          )}
          <CallStatsOverlay stats={callStats} position="bottom-left" />
        </div>
      )}

      {/* Audio-only participant display — the built-in stage for a call with
          no video, used when the caller supplied no layout of its own. */}
      {!layoutComponent && mode === 'audio' && (
        <div className={cn(fillHeight && 'flex min-h-0 flex-1 items-center justify-center')}>
          <CallParticipantStrip
            participants={participants}
            localFallback={localParticipant}
            maxVisible={4}
            avatarSize={36}
          />
        </div>
      )}

      {/* Duration & status */}
      <div className="text-center py-1.5 shrink-0">
        {duration !== undefined && (
          <span
            className="text-white/60 text-xs font-mono"
            data-testid="call-timer"
            data-call-duration={duration}
          >
            {formatDuration(duration)}
          </span>
        )}
        <span className="text-white/40 text-[10px] ml-2">
          {participants.length + 1} in call
        </span>
      </div>

      {/* Controls — extras render IN the row (CallControls `extras`),
          never in their own floating strip: an orphaned single button
          above the row read as a layout bug (operator, 2026-08-25). */}
      <CallControls
        className={fillHeight ? 'shrink-0' : undefined}
        mode={mode}
        isMuted={isMuted}
        isCameraOn={isCameraOn}
        isScreenSharing={isScreenSharing}
        onToggleMute={onToggleMute}
        onToggleCamera={onToggleCamera}
        onToggleScreenShare={onToggleScreenShare}
        onUpgradeToVideo={onUpgradeToVideo}
        onEndCall={onEndCall}
        onAddParticipant={onAddParticipant}
        availableParticipants={availableParticipants}
        onOpenAddParticipant={onOpenAddParticipant}
        currentParticipantIds={participants.map((p) => p.id)}
        extras={controlsExtras}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Minimized Pill
// ---------------------------------------------------------------------------

function MinimizedPill({
  state,
  mode,
  duration,
  isMuted,
  callerName,
  onToggleMute,
  onEndCall,
  onExpand,
}: {
  state: CallWidgetState;
  mode: CallMode;
  duration?: number;
  isMuted?: boolean;
  callerName?: string;
  onToggleMute?: () => void;
  onEndCall?: () => void;
  onExpand?: () => void;
}) {
  return (
    // `onExpand` is optional, and the whole pill was `role="button"
    // tabIndex={0} aria-label="Expand call widget"` with a pointer cursor
    // regardless. A host that drives `minimized` but wired no `onMinimize` —
    // the minimize button a few lines up is already gated on exactly that
    // handler — left the user pinned to a pill that announces itself as the
    // way back to the call and answers neither click nor Enter. Only claim to
    // be a button when there is something behind it.
    <div
      className={cn('flex items-center gap-2 px-3 py-2 select-none', onExpand && 'cursor-pointer')}
      onClick={onExpand}
      role={onExpand ? 'button' : undefined}
      tabIndex={onExpand ? 0 : undefined}
      aria-label={onExpand ? 'Expand call widget' : undefined}
      // Enter *and* Space: this handled Enter only, so Space on the collapsed
      // widget scrolled the page instead of expanding the call.
      onKeyDown={onExpand ? onActivationKey(onExpand) : undefined}
    >
      {/* Active indicator */}
      <span
        className={cn(
          'w-2 h-2 rounded-full shrink-0',
          state === 'active' ? 'bg-success animate-pulse' : 'bg-warning animate-pulse',
        )}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        {state === 'ringing' ? (
          <span className="text-white text-xs font-medium truncate">{callerName || 'Incoming call'}</span>
        ) : (
          <span className="text-white text-xs font-medium">
            {mode === 'video' ? 'Video' : 'Audio'} call
            {duration !== undefined && (
              <span
                className="text-white/50 ml-1.5 font-mono"
                data-testid="call-timer"
                data-call-duration={duration}
              >{formatDuration(duration)}</span>
            )}
          </span>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        {state === 'active' && onToggleMute && (
          <button
            data-ui-part=""
            type="button"
            onClick={onToggleMute}
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors',
              isMuted ? 'bg-danger/20 text-danger-fg' : 'bg-white/10 text-white/70 hover:text-white',
            )}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isMuted ? (
                <>
                  <line x1="2" y1="2" x2="22" y2="22" />
                  <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
                  <path d="M5 10v2a7 7 0 0 0 12 5.29" />
                  <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
                </>
              ) : (
                <>
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </>
              )}
            </svg>
          </button>
        )}
        {/* Same optional-handler shape as the mute button above, which is
            already gated: without `onEndCall` this rendered a red hang-up
            button on the collapsed bar that did nothing. */}
        {onEndCall && (
          <button
            data-ui-part=""
            type="button"
            onClick={onEndCall}
            className="w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center border-none cursor-pointer hover:bg-danger transition-colors"
            aria-label="End call"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
              <line x1="22" y1="2" x2="2" y2="22" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Drag logic
// ---------------------------------------------------------------------------

type SnapCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Finds the dock slot the floating widget is currently over, by area of
 * overlap.
 *
 * Overlap rather than cursor position because the user grabs the widget by its
 * header: with a 288px-tall card the cursor sits well above the box the eye is
 * aiming at, and a cursor hit-test would refuse drops that visually landed
 * dead centre. Whatever the widget covers most is what the user meant.
 */
function findDockUnder(rect: DOMRect): { id: string; el: HTMLElement } | null {
  let best: { id: string; el: HTMLElement; area: number } | null = null;

  for (const el of document.querySelectorAll<HTMLElement>('[data-call-dock-target]')) {
    const id = el.dataset.callDockTarget;
    if (!id) continue;
    const r = el.getBoundingClientRect();
    const w = Math.min(rect.right, r.right) - Math.max(rect.left, r.left);
    const h = Math.min(rect.bottom, r.bottom) - Math.max(rect.top, r.top);
    if (w <= 0 || h <= 0) continue;
    const area = w * h;
    // Ignore a grazing corner: docking is a big, deliberate move and should
    // not fire because the widget was parked slightly overlapping the gutter.
    if (area < r.width * r.height * 0.25) continue;
    if (!best || area > best.area) best = { id, el, area };
  }

  return best ? { id: best.id, el: best.el } : null;
}

/**
 * @param onDockOver Called on every drag frame with the slot currently under
 *   the widget (or null), so the slot can light up mid-drag.
 * @param onDockDrop Called on release over a slot. Returning true means the
 *   drop was taken and the widget should stop free-dragging rather than snap
 *   to a corner.
 */
function useDrag(
  enabled: boolean,
  onDockOver?: (id: string | null) => void,
  onDockDrop?: (id: string) => boolean,
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Shared handle for the 200ms "animation finished" reset, scheduled from
  // both resetOffset and snapToCorner. CallWidget renders null once the call
  // reaches 'ended', so a call ending within 200ms of a snap unmounts the
  // widget while this is still pending.
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endAnimationSoon = useCallback(() => {
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => setIsAnimating(false), 200);
  }, []);
  useEffect(() => () => {
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
  }, []);
  const dragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);
  const dragStartRect = useRef<DOMRect | null>(null);
  const latestDragRect = useRef<DOMRect | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled) return;
      dragStartRect.current = widgetRef.current?.getBoundingClientRect() ?? null;
      latestDragRect.current = dragStartRect.current;
      dragging.current = true;
      setIsDragging(true);
      setIsAnimating(false);
      startPos.current = { x: e.clientX, y: e.clientY };
      startOffset.current = { ...offset };
      e.preventDefault();
    },
    [enabled, offset],
  );

  const resetOffset = useCallback(() => {
    setIsAnimating(true);
    setOffset({ x: 0, y: 0 });
    endAnimationSoon();
  }, [endAnimationSoon]);

  const snapToCorner = useCallback(
    (corner: SnapCorner) => {
      const el = widgetRef.current;
      if (!el) return;

      const container = el.offsetParent as HTMLElement | null;
      const margin = 16;

      let areaW = window.innerWidth;
      let areaH = window.innerHeight;
      if (container) {
        areaW = container.clientWidth;
        areaH = container.clientHeight;
      }

      const rect = el.getBoundingClientRect();
      const containerRect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };

      let targetX: number;
      let targetY: number;

      switch (corner) {
        case 'top-left':
          targetX = margin;
          targetY = margin;
          break;
        case 'top-right':
          targetX = areaW - rect.width - margin;
          targetY = margin;
          break;
        case 'bottom-left':
          targetX = margin;
          targetY = areaH - rect.height - margin;
          break;
        default:
          targetX = areaW - rect.width - margin;
          targetY = areaH - rect.height - margin;
          break;
      }

      const baseX = (rect.left - containerRect.left) - offset.x;
      const baseY = (rect.top - containerRect.top) - offset.y;

      setIsAnimating(true);
      setOffset({ x: targetX - baseX, y: targetY - baseY });
      endAnimationSoon();
    },
    [offset, endAnimationSoon],
  );

  // The listeners below are bound once (deps: [enabled]); read the callbacks
  // through refs so a re-render does not leave the drag calling stale ones.
  const resetOffsetRef = useRef(resetOffset);
  resetOffsetRef.current = resetOffset;
  const onDockOverRef = useRef(onDockOver);
  onDockOverRef.current = onDockOver;
  const onDockDropRef = useRef(onDockDrop);
  onDockDropRef.current = onDockDrop;
  const hoveredDockRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setOffset({
        x: startOffset.current.x + (e.clientX - startPos.current.x),
        y: startOffset.current.y + (e.clientY - startPos.current.y),
      });

      // React may batch the final move and release before painting. Hit-test
      // the intended position, never the previous frame's DOM rectangle.
      const start = dragStartRect.current;
      if (start) {
        latestDragRect.current = new DOMRect(
          start.left + e.clientX - startPos.current.x,
          start.top + e.clientY - startPos.current.y,
          start.width,
          start.height,
        );
      }
      const over = latestDragRect.current ? findDockUnder(latestDragRect.current) : null;
      const id = over?.id ?? null;
      if (id !== hoveredDockRef.current) {
        hoveredDockRef.current = id;
        onDockOverRef.current?.(id);
      }
    };

    const handleMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);

      const el = widgetRef.current;
      if (!el) return;

      // Docking beats corner-snapping: the gutter slot sits near the page edge,
      // so a drop onto it is also "near a corner", and snapping first would
      // yank the widget away from the box the user just aimed at.
      const rect = latestDragRect.current ?? el.getBoundingClientRect();
      const over = findDockUnder(rect);
      if (hoveredDockRef.current !== null) {
        hoveredDockRef.current = null;
        onDockOverRef.current?.(null);
      }
      if (over && onDockDropRef.current?.(over.id)) {
        // The widget is about to be portaled into the slot, where a leftover
        // free-drag offset would push it back out of its own frame.
        resetOffsetRef.current();
        return;
      }

      // Auto-snap if released near a corner (within 80px)
      const container = el.offsetParent as HTMLElement | null;
      const snapThreshold = 80;

      let areaW = window.innerWidth;
      let areaH = window.innerHeight;
      if (container) {
        const cr = container.getBoundingClientRect();
        areaW = cr.width;
        areaH = cr.height;
      }

      const containerRect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };
      const relX = rect.left - containerRect.left;
      const relY = rect.top - containerRect.top;
      const relRight = areaW - (relX + rect.width);
      const relBottom = areaH - (relY + rect.height);

      const nearLeft = relX < snapThreshold;
      const nearRight = relRight < snapThreshold;
      const nearTop = relY < snapThreshold;
      const nearBottom = relBottom < snapThreshold;

      if ((nearTop || nearBottom) && (nearLeft || nearRight) && dragStartRect.current) {
        const start = dragStartRect.current;
        const baseX = start.left - containerRect.left - startOffset.current.x;
        const baseY = start.top - containerRect.top - startOffset.current.y;
        setOffset({
          x: (nearLeft ? 16 : areaW - rect.width - 16) - baseX,
          y: (nearTop ? 16 : areaH - rect.height - 16) - baseY,
        });
        setIsAnimating(true);
        endAnimationSoon();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, endAnimationSoon]);

  const hasMoved = offset.x !== 0 || offset.y !== 0;

  return { offset, handleMouseDown, resetOffset, snapToCorner, isDragging, isAnimating, hasMoved, widgetRef };
}

// ---------------------------------------------------------------------------
// Snap Zones (shown while dragging)
// ---------------------------------------------------------------------------

function SnapZones({
  onSnap,
  contained,
}: {
  onSnap: (corner: SnapCorner) => void;
  contained?: boolean;
}) {
  const corners: { id: SnapCorner; classes: string }[] = [
    { id: 'top-left', classes: 'top-3 left-3' },
    { id: 'top-right', classes: 'top-3 right-3' },
    { id: 'bottom-left', classes: 'bottom-3 left-3' },
    { id: 'bottom-right', classes: 'bottom-3 right-3' },
  ];

  return (
    <div className={cn(contained ? 'absolute z-[49]' : 'fixed z-[10000]', 'inset-0 pointer-events-none')}>
      {corners.map(({ id, classes }) => (
        <div
          key={id}
          className={`absolute ${classes} w-16 h-16 rounded-xl border-2 border-dashed border-white/30 bg-white/5 pointer-events-auto cursor-pointer flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 hover:scale-110`}
          onClick={() => onSnap(id)}
          title={`Snap to ${id.replace('-', ' ')}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function CallWidget({
  state,
  mode,
  participants,
  localParticipant,
  callerName,
  duration,
  isMuted = false,
  isCameraOn = true,
  isScreenSharing = false,
  onAnswer,
  onDecline,
  onEndCall,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onUpgradeToVideo,
  onAddParticipant,
  availableParticipants,
  controlsExtras,
  onOpenAddParticipant,
  onMinimize,
  onExpand,
  layoutComponent,
  callStats,
  displayMode,
  minimized: minimizedProp,
  sidePanelTabs,
  activeSidePanelTab = null,
  onSidePanelTabChange,
  sidePanelWidthClassName = 'w-80',
  dockTargets,
  activeDockId = null,
  onDockTo,
  onDragStateChange,
  position = 'bottom-right',
  contained = false,
  draggable = true,
  className,
  style,
  dataAttrs,
}: CallWidgetProps) {
  // ONE vocabulary from here down. `displayMode` wins over the legacy
  // boolean; the boolean maps `true → 'mini'`, `false → 'window'`, and its
  // historical default (false) is the same 'window' the new prop defaults
  // to — so a caller that passes neither, only the boolean, or only
  // `displayMode` all land on identical chrome.
  if (displayMode !== undefined && minimizedProp !== undefined) {
    warnModeConflictOnce('CallWidget', 'minimized');
  }
  const resolvedMode: CallWidgetMode =
    displayMode ?? modeFromMinimized(minimizedProp ?? false);
  const minimized = resolvedMode === 'mini';

  // The dock is only meaningful once there is a video/audio stage to sit
  // beside: not while ringing/connecting, and never in 'mini' (the pill
  // has no stage — see the `sidePanelTabs` prop doc).
  const dockTabs = sidePanelTabs ?? [];
  const dockAvailable = dockTabs.length > 0 && !minimized && state === 'active';
  const dockOpen = dockAvailable && dockTabs.some((t) => t.id === activeSidePanelTab);

  // PAGE docking — distinct from the side-panel dock above, which is a
  // region INSIDE the widget. This one hands the whole widget to the page.
  // Opt-in: with no `dockTargets` every branch below is dead and the widget
  // is the floating card it has always been.
  const pageDockTargets = dockTargets ?? [];
  const pageDockAvailable = pageDockTargets.length > 0;
  const pageDocked = pageDockAvailable && activeDockId != null;
  // Docked, the PAGE owns where the widget sits. Free-drag would fight the
  // slot it was just dropped into, so it is off until the call pops out.
  const freeDragEnabled = draggable && !pageDocked;

  // The call this widget is showing, when the host stamped one. `dataAttrs`
  // is already where hosts put lobby/call metadata, so the drop side gets an
  // identity without a second prop that could disagree with it.
  const rawCallId = dataAttrs?.['data-call-id'];
  const dockCallId = rawCallId == null || rawCallId === '' ? undefined : String(rawCallId);

  const handleDockDragStart = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      // jsdom (and a synthetic dispatch) can hand us an event with no
      // dataTransfer at all; a dock drag that cannot carry its payload is
      // better dropped than thrown.
      const dt = e.dataTransfer;
      if (!dt) return;
      const payload: CallDockDragPayload = {
        callId: dockCallId,
        fromDockId: activeDockId ?? null,
      };
      dt.setData(CALL_DOCK_DRAG_TYPE, JSON.stringify(payload));
      dt.effectAllowed = 'move';
    },
    [dockCallId, activeDockId],
  );

  // Light up whichever slot the widget is currently covering. The slots are
  // elsewhere in the tree (this widget is portaled), so the flag is written to
  // the DOM directly and read back by a `data-[pointer-over=true]` variant.
  const handleDockOver = useCallback((id: string | null) => {
    for (const el of document.querySelectorAll<HTMLElement>('[data-call-dock-target]')) {
      if (id && el.dataset.callDockTarget === id) el.dataset.pointerOver = 'true';
      else delete el.dataset.pointerOver;
    }
  }, []);

  const handlePointerDock = useCallback(
    (id: string) => {
      if (!onDockTo) return false;
      onDockTo(id);
      return true;
    },
    [onDockTo],
  );

  const { offset, handleMouseDown, resetOffset, snapToCorner, isDragging, isAnimating, hasMoved, widgetRef } =
    useDrag(freeDragEnabled, handleDockOver, handlePointerDock);
  // Tell the page. Held in a ref so a host passing a fresh arrow function
  // each render does not re-fire the cue on every render of the widget.
  const onDragStateChangeRef = useRef(onDragStateChange);
  onDragStateChangeRef.current = onDragStateChange;
  useEffect(() => {
    onDragStateChangeRef.current?.(isDragging);
  }, [isDragging]);

  // Filter undefined values so `data-x="undefined"` never leaks.
  const extraDataAttrs: Record<string, string | number> = {};
  if (dataAttrs) {
    for (const [k, v] of Object.entries(dataAttrs)) {
      if (v !== undefined && v !== null && v !== '') extraDataAttrs[k] = v;
    }
  }

  const positionClasses = useMemo(() => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  }, [position]);

  if (state === 'idle' || state === 'ended') return null;

  const expandedBody = (
    <>
      {state === 'ringing' && (
        <RingingView
          callerName={callerName}
          onAnswer={onAnswer}
          onDecline={onDecline}
        />
      )}

      {state === 'connecting' && (
        <div
          className="flex flex-col items-center gap-3 py-6 px-4"
          data-testid="call-connecting-view"
        >
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
          <span className="text-white/60 text-xs">Connecting...</span>
        </div>
      )}

      {state === 'active' && (
        <ActiveCallContent
          mode={mode}
          fillHeight={dockOpen}
          participants={participants}
          localParticipant={localParticipant}
          duration={duration}
          isMuted={isMuted}
          isCameraOn={isCameraOn}
          isScreenSharing={isScreenSharing}
          onToggleMute={onToggleMute}
          onToggleCamera={onToggleCamera}
          onToggleScreenShare={onToggleScreenShare}
          onUpgradeToVideo={onUpgradeToVideo}
          onAddParticipant={onAddParticipant}
          availableParticipants={availableParticipants}
          onOpenAddParticipant={onOpenAddParticipant}
          controlsExtras={
            dockAvailable ? (
              <>
                <CallSidePanelToggles
                  tabs={dockTabs}
                  activeTab={activeSidePanelTab}
                  onTabChange={onSidePanelTabChange}
                />
                {controlsExtras}
              </>
            ) : (
              controlsExtras
            )
          }
          onEndCall={onEndCall}
          layoutComponent={layoutComponent}
          callStats={callStats}
        />
      )}
    </>
  );

  return (
    <>
      {isDragging && <SnapZones onSnap={snapToCorner} contained={contained} />}
      <div
        ref={widgetRef}
        data-testid="call-widget"
        data-call-state={state}
        data-call-widget-mode={resolvedMode}
        data-call-widget-mode-legacy={toLegacyMode(resolvedMode)}
        data-call-dock-id={pageDocked ? (activeDockId as string) : undefined}
        className={cn(
          // Docked, the widget is a block in the page's flow — it must not
          // keep floating over the document from a viewport corner.
          pageDocked
            ? 'relative'
            // Above the modal layer (Modal defaults to 10000), not below it.
            //
            // The widget used to sit at 9999 — one under — so ANY dialog in
            // the app buried the live call: the "End call" button was visible
            // through the scrim and refused every click, because the backdrop
            // was taking them. A modal is a task you are doing; a call is a
            // connection you must always be able to end. The overlay half of
            // this widget is pointer-events-none, so being on top costs a
            // dialog nothing but the small square the dock occupies, and the
            // dock can be dragged off it.
            : [contained ? 'absolute z-50' : 'fixed z-[10001]', positionClasses],
          className,
        )}
        style={{
          // Same reason the free-drag is disabled while docked: a leftover
          // offset would push the widget straight back out of its slot.
          transform: pageDocked ? undefined : `translate(${offset.x}px, ${offset.y}px)`,
          transition: isAnimating ? 'transform 0.2s ease-out' : undefined,
          ...style,
        }}
        {...extraDataAttrs}
      >
        <div
          className={cn(
            // `bg-call-chrome`, not `bg-surface-inverse`: the call card is
            // dark in BOTH themes (its children are all white-on-dark), and
            // the inverse token correctly flips to near-white under
            // [data-theme="dark"], which turned the whole widget invisible.
            'bg-call-chrome rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-call-chrome-border overflow-hidden backdrop-blur-sm',
            // Opening the dock WIDENS the card rather than splitting it:
            // the stage has no width to give up (see `sidePanelTabs`), and
            // the stage column ALSO grows (CALL_STAGE_DOCKED_WIDTH) so the
            // self-view is not squeezed by the panel beside it.
            minimized ? 'w-[260px]' : dockOpen ? 'w-auto' : CALL_CARD_WIDTH,
          )}
          data-call-side-panel-open={dockOpen ? 'true' : 'false'}
        >
          {/* Header / drag handle */}
          {!minimized && (
            <div
              className={cn(
                'relative flex items-center justify-between px-3 py-2 border-b border-white/5',
                freeDragEnabled && 'cursor-grab active:cursor-grabbing',
              )}
              onMouseDown={handleMouseDown}
              // Floating, the grip and header share the mouse-drag path that
              // reveals page docks. Once docked, keep native slot-to-slot drag.
              draggable={pageDocked || undefined}
              // Listens for the grip's dragstart too — it bubbles here.
              onDragStart={pageDockAvailable ? handleDockDragStart : undefined}
              data-call-dock-source={pageDockAvailable ? 'true' : undefined}
            >
              <div className="flex items-center gap-2">
                {/* Bubble mousedown to the header while floating: a native
                    grip drag would never reveal the page's ghost targets. */}
                {pageDockAvailable && (
                  <span
                    draggable={pageDocked || undefined}
                    // No onDragStart of its own — the event bubbles to the
                    // header, which is the single place the payload is written.
                    className="flex h-5 w-5 shrink-0 cursor-grab items-center justify-center rounded text-white/60 hover:bg-white/10 hover:text-white active:cursor-grabbing transition-colors"
                    title="Drag the call into the page"
                    data-testid="call-dock-drag-handle"
                    aria-hidden
                  >
                    {icons.grip}
                  </span>
                )}
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-white/80 text-xs font-medium" data-testid="call-widget-title">
                  {mode === 'video' ? 'Video Call' : 'Audio Call'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {/* No "move to…" menu. The places a call can go are on the
                    page; the reader finds one by dragging the widget toward
                    it, and the page shows a ghost of each while the drag is
                    on. A list of destinations named places the reader could
                    not see, and the operator was right to send it back. */}
                {hasMoved && (
                  <button
                    data-ui-part=""
                    type="button"
                    onClick={resetOffset}
                    className="w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors"
                    aria-label="Snap back to corner"
                    title="Snap back to corner"
                  >
                    {icons.snapBack}
                  </button>
                )}
                {onExpand && (
                  <button
                    data-ui-part=""
                    type="button"
                    onClick={onExpand}
                    className="w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors"
                    aria-label="Expand to window"
                    title="Expand"
                    data-testid="call-widget-expand-button"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 5V2h3M12 5V2H9M2 9v3h3M12 9v3H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                )}
                {onMinimize && (
                  <button
                    data-ui-part=""
                    type="button"
                    onClick={onMinimize}
                    className="w-5 h-5 flex items-center justify-center border-none bg-transparent text-white/40 hover:text-white/80 cursor-pointer rounded transition-colors"
                    aria-label="Minimize"
                  >
                    {icons.minimize}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Minimized pill with drag handle */}
          {minimized && (
            <div
              className={cn(freeDragEnabled && 'cursor-grab active:cursor-grabbing')}
              onMouseDown={handleMouseDown}
            >
              <MinimizedPill
                state={state}
                mode={mode}
                duration={duration}
                isMuted={isMuted}
                callerName={callerName}
                onToggleMute={onToggleMute}
                onEndCall={onEndCall}
                onExpand={onMinimize}
              />
            </div>
          )}

          {/* Expanded content — plus, when a destination is open, the
              docked side panel as its flex sibling. Both live INSIDE the
              transformed widget root, so dragging moves them together. */}
          {/* ONE height for both columns. The row is the only element with
              a height; the stage column and the dock both take `h-full` of
              it and distribute their own slack internally (stage grows /
              message list grows). Before this, the panel's content set the
              row height and the stage column's content stopped short —
              leaving a dead dark band under the controls. */}
          {!minimized && (dockOpen ? (
            <div
              className={cn('flex min-h-0 items-stretch', CALL_DOCK_ROW_HEIGHT)}
              data-testid="call-widget-dock-row"
            >
              <div
                className={cn('flex h-full min-h-0 flex-col shrink-0', CALL_STAGE_DOCKED_WIDTH)}
                data-testid="call-widget-stage-column"
              >
                {expandedBody}
              </div>
              <CallSidePanel
                mode={resolvedMode}
                tabs={dockTabs}
                activeTab={activeSidePanelTab}
                onTabChange={onSidePanelTabChange}
                widthClassName={sidePanelWidthClassName}
              />
            </div>
          ) : (
            expandedBody
          ))}
        </div>
      </div>
    </>
  );
}

export default CallWidget;
