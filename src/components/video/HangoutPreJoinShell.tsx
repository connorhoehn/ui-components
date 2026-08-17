// HangoutPreJoinShell — Google Meet-style green room. Renders the camera
// preview, mic/cam pre-flight toggles, "N people are in this call"
// roster, and the Join CTA BEFORE the consumer's publisher starts.
//
// Per the locked v3.1 consumer contract: camera state + readiness are
// CONSUMER-PROVIDED. The shell is purely visual — it doesn't call
// getUserMedia or fetch /ready directly. The reference hook lives at
// live-video-streaming/ui/src/hooks/usePreJoinCamera.ts; lift verbatim
// until it migrates to @connorhoehn/realtime-modules.
//
// State machine for the Join button:
//   permission != 'granted' → disabled, label "Allow camera to join"
//   readyState 'empty'      → enabled, subtitle "You'll be the first…"
//   readyState 'pending'    → enabled, subtitle "Other publishers
//                             connecting…"
//   readyState 'ready'      → enabled, subtitle "N people are in this call"
//
// The component is a controlled-render shell: every state lives on the
// consumer, mirroring the AppShell / ChatPanel ergonomic.

import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import Avatar from '../shared/Avatar';
import Chip from '../shared/Chip';
import Spinner from '../shared/Spinner';
import PermissionDeniedCard, {
  type PermissionState,
} from '../shared/PermissionDeniedCard';
import CircularIconToggle from './CircularIconToggle';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from './MediaIcons';

export type PreJoinPermission =
  | 'pending'
  | 'granted'
  | 'denied'
  | 'blocked'
  | 'no-device'
  | 'unavailable';

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
  /** Channel display name surfaced at the top of the shell. */
  channelName: string;

  // ── Local identity (consumer-provided, optional) ──────────────────────
  /** When set, the camera-off preview renders a Meet/Teams-style identity
   *  tile (avatar + display name) instead of the bare "Camera off" text.
   *  Backward-compatible — omitted = legacy text fallback, so existing
   *  consumers that don't pass identity are unaffected. */
  localIdentity?: PreJoinLocalIdentity;

  // ── Camera state (consumer-provided) ──────────────────────────────────
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

  // ── Readiness (consumer-provided) ─────────────────────────────────────
  participants?: PreJoinRosterEntry[];
  readyState?: PreJoinReadyState;
  /** When true, render a small spinner above the roster instead of the
   *  participant list — for the "/ready not yet fetched" phase. */
  readyLoading?: boolean;

  // ── Actions ───────────────────────────────────────────────────────────
  /** Called when the user clicks Join. Carries the pre-flight intent so
   *  the consumer can spawn the publisher in the desired mute state. */
  onJoin: (intent: { audio: boolean; video: boolean }) => void;
  onCancel: () => void;

  // ── Overrides ─────────────────────────────────────────────────────────
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

function buildPeopleLabel(
  participants: PreJoinRosterEntry[] | undefined,
  readyState: PreJoinReadyState | undefined,
  loading: boolean,
): string {
  if (loading) return 'Checking room…';
  if (!readyState || readyState === 'empty') return "You'll be the first one in this room";
  const count = participants?.length ?? 0;
  if (readyState === 'ready') {
    return count === 1
      ? '1 person is in this call'
      : `${count} people are in this call`;
  }
  // pending
  return count === 1
    ? '1 person is joining (connecting…)'
    : `${count} people are joining (connecting…)`;
}

function permissionToFallbackState(p: PreJoinPermission): PermissionState | null {
  if (p === 'denied') return 'denied';
  if (p === 'blocked') return 'blocked';
  if (p === 'no-device') return 'no-device';
  if (p === 'unavailable') return 'unavailable';
  return null;
}

export default function HangoutPreJoinShell({
  channelName,
  localIdentity,
  previewStream,
  permission,
  permissionMessage,
  audioEnabled,
  videoEnabled,
  onToggleAudio,
  onToggleVideo,
  onRetryPermission,
  participants,
  readyState,
  readyLoading = false,
  onJoin,
  onCancel,
  joinLabel,
  joinDisabled,
  subtitleOverride,
  className,
  'data-testid': testId,
}: HangoutPreJoinShellProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && previewStream) videoRef.current.srcObject = previewStream;
  }, [previewStream]);

  const isCamReady = permission === 'granted';
  const fallbackState = permissionToFallbackState(permission);
  const computedJoinDisabled = joinDisabled ?? !isCamReady;
  const computedJoinLabel = joinLabel ?? (computedJoinDisabled && !isCamReady
    ? 'Allow camera to join'
    : 'Join now');
  const peopleLabel = subtitleOverride
    ?? buildPeopleLabel(participants, readyState, readyLoading);

  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col h-full min-h-0 bg-surface-panel text-text-primary',
        className,
      )}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-white">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold truncate">{channelName}</h1>
          <p className="text-xs text-neutral mt-0.5">{peopleLabel}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
      </header>

      <main className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto w-full">
        {/* Left: live camera preview */}
        <section className="lg:flex-1 min-h-0">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black">
            {previewStream && isCamReady && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={cn(
                  'w-full h-full object-cover scale-x-[-1]',
                  !videoEnabled && 'opacity-0',
                )}
              />
            )}
            {isCamReady && !videoEnabled && (
              localIdentity ? (
                // Meet/Teams-style identity tile: large avatar + display
                // name + "Camera off" subtitle. Avatar falls back to
                // initials when avatarSrc is absent.
                <div
                  data-testid="prejoin-identity-tile"
                  className="absolute inset-0 grid place-items-center bg-surface-inverse/95"
                >
                  <div className="flex flex-col items-center gap-3 px-6 text-center">
                    <Avatar
                      name={localIdentity.displayName}
                      src={localIdentity.avatarSrc}
                      size={96}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-white text-base font-medium truncate max-w-[16rem]">
                        {localIdentity.displayName}
                      </span>
                      <span className="text-text-disabled text-xs">Camera off</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  data-testid="prejoin-camera-off-fallback"
                  className="absolute inset-0 grid place-items-center text-text-disabled text-sm"
                >
                  Camera off
                </div>
              )
            )}
            {permission === 'pending' && (
              <div className="absolute inset-0 grid place-items-center">
                <Spinner size="lg" />
              </div>
            )}
            {fallbackState && (
              <div className="absolute inset-0 grid place-items-center bg-surface-panel/95">
                <PermissionDeniedCard
                  kind="camera"
                  state={fallbackState}
                  message={permissionMessage}
                  onRetry={onRetryPermission}
                  data-testid="prejoin-permission-card"
                />
              </div>
            )}
          </div>

          {/* Pre-flight mic/cam toggles */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <CircularIconToggle
              on={audioEnabled}
              onClick={onToggleAudio}
              disabled={!isCamReady}
              aria-label={audioEnabled ? 'Mute mic before joining' : 'Unmute mic before joining'}
              title={audioEnabled ? 'Mute mic before joining' : 'Unmute mic before joining'}
              iconOn={<MicIcon size={18} />}
              iconOff={<MicOffIcon size={18} />}
              data-testid="prejoin-toggle-audio"
            />
            <CircularIconToggle
              on={videoEnabled}
              onClick={onToggleVideo}
              disabled={!isCamReady}
              aria-label={videoEnabled ? 'Turn camera off before joining' : 'Turn camera on before joining'}
              title={videoEnabled ? 'Turn camera off before joining' : 'Turn camera on before joining'}
              iconOn={<VideoIcon size={18} />}
              iconOff={<VideoOffIcon size={18} />}
              data-testid="prejoin-toggle-video"
            />
          </div>
        </section>

        {/* Right: room status + Join CTA */}
        <section className="lg:w-96 flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Ready to join?</h2>
            <p className="text-sm text-neutral mb-6">{peopleLabel}</p>

            <RosterList participants={participants} loading={readyLoading} />

            {readyState === 'pending' && !readyLoading && (
              <p className="mt-4 text-xs text-warning-fg flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                Other publishers are still connecting — you can join anyway.
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onJoin({ audio: audioEnabled, video: videoEnabled })}
              disabled={computedJoinDisabled}
              data-testid="prejoin-join-button"
            >
              {computedJoinLabel}
            </Button>
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-neutral hover:text-text-primary transition-colors text-center"
            >
              Back to rooms
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function RosterList({
  participants,
  loading,
}: {
  participants?: PreJoinRosterEntry[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-neutral">
        <Spinner size="sm" /> Checking room…
      </div>
    );
  }
  if (!participants || participants.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs uppercase tracking-wide text-neutral">In the room</div>
      <ul className="flex flex-col gap-1.5">
        {participants.slice(0, 8).map((p) => {
          const display = p.displayName ?? p.participantId.slice(0, 8);
          return (
            <li key={p.participantId} className="flex items-center gap-2 text-sm">
              <Avatar name={display} size={24} />
              <span className="font-mono text-xs truncate">{display}</span>
              <Chip
                size="xs"
                tone={p.ready ? 'success' : 'warning'}
                dot={p.ready ? 'static' : 'pulse'}
                uppercase
                className="ml-auto"
              >
                {p.ready ? 'live' : 'connecting'}
              </Chip>
            </li>
          );
        })}
        {participants.length > 8 && (
          <li className="text-xs text-neutral">+{participants.length - 8} more</li>
        )}
      </ul>
    </div>
  );
}

