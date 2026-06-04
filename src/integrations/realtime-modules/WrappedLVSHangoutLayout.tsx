// WrappedLVSHangoutLayout — connects `useLVSHangout` to `<HangoutLayout>`.
//
// Sibling of WrappedHangoutLayout (which wraps the IVS-Stage based
// `useVideoHangout`). The LVS path has a different participant shape
// (`HangoutParticipant.streams[]` and `screenStream?`), so the adapter
// lives in its own file rather than overloading the existing wrapper.
//
// Boundary decisions (locked 2026-06-04 vs websocket-gateway consumer):
//   - Connection-state overlays  → external. Wrapper exposes state via
//     a render-prop `overlay({ connectionState, error, ... })`. Consumer
//     supplies their own reconnecting / failed / empty backdrops.
//   - Recording REC indicator    → consumer-rendered. Wrapper does NOT
//     subscribe to recording lifecycle. Use `spotlightContent`.
//   - Leave-call affordance      → NOT on this wrapper. Lives on the
//     sibling `<MediaControlsBar>` composite.
//   - stageToken renewal         → consumer-managed via `getStageToken`
//     callback. Mirrors the SDK `getAuthToken` pattern.

import type { ReactNode } from 'react';
import { useMemo } from 'react';
// We need the realtime-modules surface to actually wire the hook.
// Lazy-required so consumers that pull this file via subpath without
// the peer dep installed get a clearer error than a deep import fail.
import { useLVSHangout, type HangoutParticipant, type HangoutConnectionState } from '@connorhoehn/realtime-modules/client/video';
import { HangoutLayout, type HangoutLayoutParticipant, type HangoutMode } from '../../components/video/HangoutLayout';
import { Avatar } from '../../components/shared/Avatar';

/**
 * Snapshot of the wrapper's live hangout state, surfaced to the
 * consumer's `overlay` render-prop so they can render reconnecting /
 * failed / empty backdrops without subscribing to useLVSHangout
 * themselves.
 */
export interface WrappedHangoutState {
  connectionState: HangoutConnectionState;
  error: string | null;
  participantCount: number; // includes self
  remoteCount: number;       // excludes self
}

export interface WrappedLVSHangoutLayoutProps {
  /** Participant token from platform-api `/api/video/sessions/:id/join`.
   *  Decoded for the channel ARN claim. */
  stageToken: string;
  /** SFU-issued participant id (per-tab unique). */
  participantId: string;
  /** Display name for the local user. Falls back to participantId.slice(0,8). */
  userId?: string;
  /** Optional override for the local tile's "client id" — most consumers
   *  use the same value as participantId. Reserved for future per-device
   *  multiplexing scenarios. */
  localClientId?: string;

  /**
   * Async callback the wrapper calls when it needs a fresh stage token:
   * on initial connect, after a token-rejected close, and (optionally) on
   * a TTL-based schedule. Mirrors the SDK `getAuthToken` pattern.
   *
   * When omitted, the wrapper uses `stageToken` for the session lifetime
   * and surfaces a token-expired error via the overlay render prop.
   */
  getStageToken?: () => Promise<string>;

  /**
   * Render-prop slot rendered absolute-positioned over the tile grid.
   * Receives the wrapper's live hangout state so the consumer can render
   * reconnecting / failed / empty overlays.
   *
   * Example:
   *   overlay={({ connectionState, error, remoteCount }) => (
   *     <>
   *       {connectionState === 'reconnecting' && <YourReconnectingBanner />}
   *       {error && <YourFailedScreen error={error} />}
   *       {remoteCount === 0 && <YourEmptyBackdrop />}
   *     </>
   *   )}
   */
  overlay?: (state: WrappedHangoutState) => ReactNode;

  /** Forwarded to <HangoutLayout spotlightContent>. */
  spotlightContent?: ReactNode;
  /** Forwarded to <HangoutLayout onParticipantClick>. */
  onParticipantClick?: (participantId: string) => void;
  /** Forwarded to <HangoutLayout mode>. Default 'auto'. */
  mode?: HangoutMode;
  /** Optional active speaker driver. Default 'audio-level' (the layout
   *  computes from MediaStream audio energy). */
  activeSpeakerStrategy?: 'audio-level' | 'producer-state' | 'off';

  /** Override the local tile's display name. Default: "You". */
  localTileLabel?: string;
  /** When false, the local user does NOT appear as a tile (e.g. they
   *  only host the call). Default true (Meet-style). */
  showLocalAsTile?: boolean;

  className?: string;
  'data-testid'?: string;
}

function avatarUrl(displayName: string): string | undefined {
  if (!displayName) return undefined;
  // Avatar component already does palette+initials internally; we don't
  // need to provide a URL. The hangout participant shape just doesn't
  // currently carry one. Keeping this hook so a future iteration can
  // resolve from a profile-resolver prop without an API break.
  return undefined;
}

function projectToLayoutShape(
  p: HangoutParticipant,
  localTileLabel: string | undefined,
): HangoutLayoutParticipant {
  const isLocal = p.isLocal;
  const displayName = isLocal
    ? (localTileLabel ?? p.displayName ?? 'You')
    : (p.displayName || p.participantId.slice(0, 8));
  // Map streams[0] → camera tile videoElement. Map screenStream →
  // screenElement; HangoutLayout will auto-promote it to spotlight and
  // keep the camera tile in the filmstrip so you still see the sharer.
  const stream = p.streams[0];
  const screen = p.screenStream;
  return {
    id: p.participantId,
    displayName,
    isLocal,
    isMuted: !p.hasAudio,
    videoElement: stream ? (
      <video
        autoPlay
        playsInline
        muted={isLocal}
        ref={(el) => { if (el && el.srcObject !== stream) el.srcObject = stream; }}
        className={`w-full h-full object-cover ${isLocal ? 'scale-x-[-1]' : ''}`}
      />
    ) : (
      <div className="w-full h-full grid place-items-center bg-slate-200">
        <Avatar name={displayName} size={64} src={avatarUrl(displayName)} />
      </div>
    ),
    // Screens are never mirrored — that would flip the content. Local
    // screen output is muted to prevent echo on shares that include
    // system audio; remotes play at normal volume.
    screenElement: screen ? (
      <video
        autoPlay
        playsInline
        muted={isLocal}
        ref={(el) => { if (el && el.srcObject !== screen) el.srcObject = screen; }}
        className="w-full h-full object-contain bg-black"
      />
    ) : undefined,
  };
}

export function WrappedLVSHangoutLayout({
  stageToken,
  participantId,
  userId,
  localClientId,
  getStageToken,
  overlay,
  spotlightContent,
  onParticipantClick,
  mode = 'auto',
  activeSpeakerStrategy: _activeSpeakerStrategy = 'audio-level',
  localTileLabel,
  showLocalAsTile = true,
  className,
  'data-testid': testId,
}: WrappedLVSHangoutLayoutProps) {
  // localClientId reserved for a future iteration; reference once to
  // satisfy lint while the prop is exposed in the public contract.
  void localClientId;

  const hangout = useLVSHangout({
    stageToken,
    participantId,
    userId: userId ?? participantId.slice(0, 8),
    getAuthToken: getStageToken,
  });

  const tiles = useMemo<HangoutLayoutParticipant[]>(() => {
    const list = hangout.participants
      .filter((p) => showLocalAsTile || !p.isLocal)
      .map((p) => projectToLayoutShape(p, localTileLabel));
    return list;
  }, [hangout.participants, showLocalAsTile, localTileLabel]);

  const remoteCount = hangout.participants.filter((p) => !p.isLocal).length;
  const overlayState: WrappedHangoutState = {
    connectionState: hangout.connectionState,
    error: hangout.error,
    participantCount: hangout.participants.length,
    remoteCount,
  };

  return (
    <div
      data-testid={testId}
      className={`relative flex-1 min-h-0 ${className ?? ''}`}
    >
      <HangoutLayout
        participants={tiles}
        localParticipant={null}
        mode={mode}
        spotlightContent={spotlightContent}
        onParticipantClick={onParticipantClick}
        className="h-full"
      />
      {overlay && (
        <div className="absolute inset-0 pointer-events-none z-10" data-testid="wrapped-overlay-slot">
          <div className="pointer-events-auto">{overlay(overlayState)}</div>
        </div>
      )}
    </div>
  );
}

export default WrappedLVSHangoutLayout;
