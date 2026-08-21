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
import { CallAvatar, type CallStripParticipant } from './CallParticipantStrip';
import { CallParticipantStrip } from './CallParticipantStrip';
import { CallControls } from './CallControls';
import { CallStatsOverlay, type CallStatsOverlayStats } from './CallStatsOverlay';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CallWidgetState = 'idle' | 'ringing' | 'connecting' | 'active' | 'ended';
export type CallMode = 'audio' | 'video';

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
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onDecline}
          className="w-11 h-11 rounded-full bg-danger text-white border-none cursor-pointer flex items-center justify-center hover:bg-danger transition-colors"
          aria-label="Decline call"
        >
          {icons.phoneEnd}
        </button>
        <button
          type="button"
          onClick={onAnswer}
          className="w-11 h-11 rounded-full bg-success text-white border-none cursor-pointer flex items-center justify-center hover:bg-success transition-colors"
          aria-label="Answer call"
        >
          {icons.phoneAnswer}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Active Call View
// ---------------------------------------------------------------------------

function ActiveCallContent({
  mode,
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
  | 'onEndCall'
  | 'layoutComponent'
  | 'callStats'
>) {
  const showVideo = mode === 'video' && isCameraOn;

  return (
    <div className="flex flex-col">
      {/* Video area — caller-provided layout takes precedence over the
       * default single-PiP layout. Wrap in the same mx-3/mt-3 container so
       * external layouts don't have to know the widget's outer padding. */}
      {mode === 'video' && layoutComponent && (
        <div className="mx-3 mt-3 rounded-lg overflow-hidden relative">
          {layoutComponent}
          <CallStatsOverlay stats={callStats} position="bottom-left" />
        </div>
      )}
      {mode === 'video' && !layoutComponent && (
        <div className="relative bg-black aspect-video rounded-lg overflow-hidden mx-3 mt-3">
          {localParticipant?.videoStream && showVideo ? (
            <VideoTile stream={localParticipant.videoStream} muted />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-inverse">
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
            <div className="absolute top-2 right-2 w-20 aspect-video rounded overflow-hidden border border-white/20 bg-surface-inverse">
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

      {/* Audio-only participant display */}
      {mode === 'audio' && (
        <CallParticipantStrip
          participants={participants}
          localFallback={localParticipant}
          maxVisible={4}
          avatarSize={36}
        />
      )}

      {/* Duration & status */}
      <div className="text-center py-1.5">
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

      {/* Controls */}
      <CallControls
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
        currentParticipantIds={participants.map((p) => p.id)}
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
    <div
      className="flex items-center gap-2 px-3 py-2 cursor-pointer select-none"
      onClick={onExpand}
      role="button"
      tabIndex={0}
      aria-label="Expand call widget"
      onKeyDown={(e) => e.key === 'Enter' && onExpand?.()}
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
        {state === 'active' && (
          <button
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
        <button
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
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Drag logic
// ---------------------------------------------------------------------------

type SnapCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

function useDrag(enabled: boolean) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled) return;
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
    setTimeout(() => setIsAnimating(false), 200);
  }, []);

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
      setTimeout(() => setIsAnimating(false), 200);
    },
    [offset],
  );

  const snapToCornerRef = useRef(snapToCorner);
  snapToCornerRef.current = snapToCorner;

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setOffset({
        x: startOffset.current.x + (e.clientX - startPos.current.x),
        y: startOffset.current.y + (e.clientY - startPos.current.y),
      });
    };

    const handleMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);

      // Auto-snap if released near a corner (within 80px)
      const el = widgetRef.current;
      if (!el) return;
      const container = el.offsetParent as HTMLElement | null;
      const snapThreshold = 80;

      let areaW = window.innerWidth;
      let areaH = window.innerHeight;
      if (container) {
        const cr = container.getBoundingClientRect();
        areaW = cr.width;
        areaH = cr.height;
      }

      const rect = el.getBoundingClientRect();
      const containerRect = container ? container.getBoundingClientRect() : { left: 0, top: 0 };
      const relX = rect.left - containerRect.left;
      const relY = rect.top - containerRect.top;
      const relRight = areaW - (relX + rect.width);
      const relBottom = areaH - (relY + rect.height);

      const nearLeft = relX < snapThreshold;
      const nearRight = relRight < snapThreshold;
      const nearTop = relY < snapThreshold;
      const nearBottom = relBottom < snapThreshold;

      if (nearTop && nearLeft) snapToCornerRef.current('top-left');
      else if (nearTop && nearRight) snapToCornerRef.current('top-right');
      else if (nearBottom && nearLeft) snapToCornerRef.current('bottom-left');
      else if (nearBottom && nearRight) snapToCornerRef.current('bottom-right');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled]);

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
    <div className={cn(contained ? 'absolute z-[49]' : 'fixed z-[9998]', 'inset-0 pointer-events-none')}>
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
  onMinimize,
  onExpand,
  layoutComponent,
  callStats,
  minimized = false,
  position = 'bottom-right',
  contained = false,
  draggable = true,
  className,
  style,
  dataAttrs,
}: CallWidgetProps) {
  const { offset, handleMouseDown, resetOffset, snapToCorner, isDragging, isAnimating, hasMoved, widgetRef } = useDrag(draggable);
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

  return (
    <>
      {isDragging && <SnapZones onSnap={snapToCorner} contained={contained} />}
      <div
        ref={widgetRef}
        data-testid="call-widget"
        data-call-state={state}
        className={cn(
          contained ? 'absolute z-50' : 'fixed z-[9999]',
          positionClasses,
          className,
        )}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: isAnimating ? 'transform 0.2s ease-out' : undefined,
          ...style,
        }}
        {...extraDataAttrs}
      >
        <div
          className={cn(
            'bg-surface-inverse rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden backdrop-blur-sm',
            minimized ? 'w-[260px]' : 'w-[320px]',
          )}
        >
          {/* Header / drag handle */}
          {!minimized && (
            <div
              className={cn(
                'flex items-center justify-between px-3 py-2 border-b border-white/5',
                draggable && 'cursor-grab active:cursor-grabbing',
              )}
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-white/80 text-xs font-medium">
                  {mode === 'video' ? 'Video Call' : 'Audio Call'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {hasMoved && (
                  <button
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
              className={cn(draggable && 'cursor-grab active:cursor-grabbing')}
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

          {/* Expanded content */}
          {!minimized && (
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
                  onEndCall={onEndCall}
                  layoutComponent={layoutComponent}
                  callStats={callStats}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CallWidget;
