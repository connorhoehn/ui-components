// HangoutPreJoinShell — Teams/Zoom-style green room. Renders the camera
// preview with its own on-stage control bar, an optional Device settings
// panel, the "N people are in this call" roster, and the Join CTA BEFORE
// the consumer's publisher starts.
//
// Per the locked v3.1 consumer contract: camera state + readiness are
// CONSUMER-PROVIDED. The shell is purely visual — it doesn't call
// getUserMedia, and it never enumerates devices (the device pickers
// arrive whole, as `devicesSlot`). The reference hook lives at
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
// Layout follows the Teams pre-join screen: ONE centred heading block
// (eyebrow / channel name / a single subtitle line), a 16:9 self-view as
// the hero with the mic, camera and gear sitting on the preview itself,
// and a join column to its right that collapses beneath the stage on
// narrow viewports. The channel name and the subtitle each render exactly
// once — the previous version said the same sentence in three places.
//
// The component is a controlled-render shell: every state lives on the
// consumer, mirroring the AppShell / ChatPanel ergonomic. The one
// exception is the Device settings panel, which self-manages when the
// consumer doesn't pass `devicesOpen` — a disclosure with no consequence
// outside this component isn't worth forcing on every caller.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import Avatar from '../shared/Avatar';
import Chip from '../shared/Chip';
import Spinner from '../shared/Spinner';
import PermissionDeniedCard, {
  type PermissionState,
} from '../shared/PermissionDeniedCard';
import CircularIconToggle from './CircularIconToggle';
import { MicIcon, MicOffIcon, SettingsGearIcon, VideoIcon, VideoOffIcon } from './MediaIcons';

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
  /** Channel display name — the title of the one heading block. */
  channelName: string;
  /** Small uppercase line above the title — "Before you go live". */
  eyebrow?: string;

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

  // ── Slots ─────────────────────────────────────────────────────────────
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
  /** Replace the auto-computed "N people are in this call" subtitle. */
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

// The stage bar floats over near-black video, so its buttons paint in
// white/alpha. `text-text-*` and `bg-surface-*` tokens flip with the host
// theme — in dark mode CircularIconToggle's default "on" palette resolves
// to a slate pill that disappears into the preview behind it.
const STAGE_TOGGLE_ON = 'bg-white/15 text-white hover:bg-white/25';
const STAGE_GEAR_OPEN = 'bg-white text-video-stage hover:bg-white';

/** MediaIcons carries no gear, and this shell is the only caller that wants one. */
export default function HangoutPreJoinShell({
  channelName,
  eyebrow,
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
  effectsSlot,
  devicesSlot,
  devicesOpen,
  onToggleDevices,
  secondaryActions,
  onJoin,
  onCancel,
  joinLabel,
  joinDisabled,
  subtitleOverride,
  className,
  'data-testid': testId,
}: HangoutPreJoinShellProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selfManagedDevicesOpen, setSelfManagedDevicesOpen] = useState(false);

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

  // No slot, no panel — a gear that opens an empty drawer is worse than
  // no gear. `devicesOpen` wins whenever the consumer passes it.
  const hasDevices = Boolean(devicesSlot);
  const devicesPanelOpen = hasDevices && (devicesOpen ?? selfManagedDevicesOpen);

  function requestDevices(next: boolean) {
    if (devicesOpen === undefined) setSelfManagedDevicesOpen(next);
    onToggleDevices?.(next);
  }

  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col h-full min-h-0 overflow-y-auto bg-surface-panel text-text-primary',
        className,
      )}
    >
      {/* The heading used to be a full-width CENTRED row above everything,
          which bought a line of text about 90px of vertical space and left
          the two columns beneath it stranded in air. It lives at the top of
          the side column now, left-aligned, so the stage starts at the top
          of the surface and the text sits beside it rather than above it. */}
      <div className="mx-auto w-full max-w-5xl flex flex-col gap-4 px-4 py-4 sm:px-5">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* Left: the self-view IS the screen, Teams/Zoom-style. */}
          <section className="w-full min-w-0 lg:flex-1 flex flex-col gap-4">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-video-stage">
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
                    // A video-stage placeholder, not an inverse panel: it
                    // covers the camera preview, so it stays near-black in
                    // both themes like the stage beneath it.
                    className="absolute inset-0 grid place-items-center bg-video-stage/95"
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
                        {/* Always over the near-black preview, so white/alpha
                            rather than `text-text-disabled` — that token flips
                            to #475569 in dark mode and vanishes here. */}
                        <span className="text-white/60 text-xs">Camera off</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    data-testid="prejoin-camera-off-fallback"
                    className="absolute inset-0 grid place-items-center text-white/60 text-sm"
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

              {/* A vertical rail on the RIGHT EDGE, not a bar across the
                  bottom centre. The controls stay on the preview — they
                  belong to it, and detaching them reads as page furniture —
                  but a centred bottom bar sits exactly where a face is when
                  someone frames themselves normally, so it covered the one
                  thing the preview exists to show. Faces are centre-frame;
                  the right edge is the empty part of almost every webcam
                  shot. */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-3">
                <div className="flex flex-col items-center gap-2 rounded-full bg-black/55 p-2 backdrop-blur-sm">
                  <CircularIconToggle
                    on={audioEnabled}
                    onClick={onToggleAudio}
                    disabled={!isCamReady}
                    aria-label={audioEnabled ? 'Mute mic before joining' : 'Unmute mic before joining'}
                    title={audioEnabled ? 'Mute mic before joining' : 'Unmute mic before joining'}
                    iconOn={<MicIcon size={18} />}
                    iconOff={<MicOffIcon size={18} />}
                    className={cn(audioEnabled && STAGE_TOGGLE_ON)}
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
                    className={cn(videoEnabled && STAGE_TOGGLE_ON)}
                    data-testid="prejoin-toggle-video"
                  />
                  {hasDevices && (
                    <>
                      <span aria-hidden="true" className="h-px w-6 bg-white/20" />
                      <CircularIconToggle
                        on={devicesPanelOpen}
                        onClick={() => requestDevices(!devicesPanelOpen)}
                        aria-label={devicesPanelOpen ? 'Close device settings' : 'Open device settings'}
                        title={devicesPanelOpen ? 'Close device settings' : 'Open device settings'}
                        iconOn={<SettingsGearIcon size={18} />}
                        iconOff={<SettingsGearIcon size={18} />}
                        className={devicesPanelOpen ? STAGE_GEAR_OPEN : STAGE_TOGGLE_ON}
                        data-testid="prejoin-devices-toggle"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Effects slot — sits between the stage and the Join
                controls. Consumers drop a <MediaEffectsTray> here. */}
            {effectsSlot && (
              <div data-testid="prejoin-effects-slot">{effectsSlot}</div>
            )}
          </section>

          {/* Right: who's already here, then the commitment. Stacks under
              the stage below `lg`. */}
          {/* `lg:self-stretch` + `justify-between` puts the commitment at the
              BOTTOM of the column, level with the bottom of the stage. The
              column is shorter than the 16:9 preview, so left to itself it
              ended at Cancel with ~100px of nothing under it — the same dead
              space as the old centred header, just rotated. */}
          <section className="w-full lg:w-72 xl:w-80 lg:shrink-0 lg:self-stretch flex flex-col gap-3 lg:justify-between">
            {/* Where the centred header row used to be. Left-aligned and
                beside the stage, it costs no vertical space of its own. */}
            <div className="min-w-0">
              {eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral">
                  {eyebrow}
                </p>
              )}
              <h1
                data-testid="prejoin-title"
                className="text-lg font-semibold leading-tight truncate"
              >
                {channelName}
              </h1>
              <p data-testid="prejoin-subtitle" className="mt-0.5 text-xs text-neutral">
                {peopleLabel}
              </p>
            </div>

            <div className="flex flex-col gap-3 min-h-0">
            {devicesPanelOpen ? (
              <div
                data-testid="prejoin-devices-panel"
                className="rounded-xl border border-border bg-surface p-3"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h2 className="text-sm font-semibold">Device settings</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => requestDevices(false)}
                    data-testid="prejoin-devices-close"
                  >
                    Close
                  </Button>
                </div>
                {devicesSlot}
              </div>
            ) : (
              <div
                className={cn(
                  // No card when there is nobody to list: one line of grey
                  // text inside a bordered box reads as an empty input field,
                  // which is furniture pretending to be a control.
                  (readyLoading || (participants && participants.length > 0))
                    ? 'rounded-xl border border-border bg-surface p-3'
                    : 'px-0.5',
                )}
              >
                <RosterList participants={participants} loading={readyLoading} />

                {readyState === 'pending' && !readyLoading && (
                  <p className="mt-3 text-xs text-warning-fg flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                    Other publishers are still connecting — you can join anyway.
                  </p>
                )}
              </div>
            )}

            </div>

            {/* Always rendered after the panel, never inside it, so opening
                Device settings can't push Join off the viewport. */}
            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => onJoin({ audio: audioEnabled, video: videoEnabled })}
                disabled={computedJoinDisabled}
                data-testid="prejoin-join-button"
              >
                {computedJoinLabel}
              </Button>
              {secondaryActions && (
                <div data-testid="prejoin-secondary-actions">{secondaryActions}</div>
              )}
              <button
                type="button"
                onClick={onCancel}
                data-testid="prejoin-cancel"
                className="text-xs text-neutral hover:text-text-primary transition-colors text-center cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </section>
        </div>
      </div>
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
    // Deliberately NOT the subtitle's "Checking room…" — the heading block
    // owns that sentence and nothing else on screen may echo it.
    return (
      <div className="flex items-center gap-2 text-xs text-neutral">
        <Spinner size="sm" /> Finding people…
      </div>
    );
  }
  if (!participants || participants.length === 0) {
    return <div className="text-xs text-neutral">Nobody here yet.</div>;
  }
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
