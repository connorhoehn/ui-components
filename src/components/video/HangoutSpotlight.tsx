// HangoutSpotlight — spotlight + filmstrip layout for a hangout call.
//
// Renders a large main slot (active speaker or shared screen) plus a
// horizontal filmstrip of the remaining participants. Spotlight slot
// resolves in priority order:
//   1. Explicit `spotlightContent` (e.g. screen share <video>) — wins.
//   2. The first participant exposing a `screenElement` (auto-promoted
//      screen-share). The sharer's CAMERA tile stays visible in the
//      filmstrip so you still see them while they're presenting.
//   3. The stable active-speaker tile, if that pid is in participants.
//   4. The first remote participant (fallback so the slot is never blank).
//
// `useStableActiveSpeaker` debounces `activeSpeakerId` so the spotlight
// only swaps after a new speaker has been talking for at least
// `speakerHysteresisMs` (default 750ms) — prevents flicker on coughs,
// laughs, brief interjections.
//
// Pure presentational. Caller provides `videoElement` (camera) and
// optional `screenElement` (screen-share) per participant. Extracted
// from `HangoutLayout.tsx`.

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ParticipantTile } from './ParticipantTile';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

export interface HangoutSpotlightProps {
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

export function HangoutSpotlight({
  participants,
  localParticipant = null,
  spotlightContent,
  spotlightContentLabel,
  activeSpeakerId = null,
  speakerHysteresisMs = 750,
  onParticipantClick,
  fillParent = false,
  filmstripTileWidth = 128,
  className,
  style,
}: HangoutSpotlightProps) {
  const spotlightParticipantId = useStableActiveSpeaker(activeSpeakerId, speakerHysteresisMs);

  // Resolve who (if anyone) is auto-promoted to the spotlight via
  // their screenElement. Remotes are checked first so a remote share
  // wins over a local one if both are present at the same instant
  // (rare but possible during a hand-off). Explicit spotlightContent
  // still overrides this — that's why this is gated below.
  const screenShareSharer = useMemo<HangoutLayoutParticipant | null>(() => {
    const remoteSharer = participants.find((p) => p.screenElement);
    if (remoteSharer) return remoteSharer;
    if (localParticipant && localParticipant.screenElement) {
      return { ...localParticipant, isLocal: true };
    }
    return null;
  }, [participants, localParticipant]);

  // Filmstrip = everyone except the participant whose CAMERA is currently
  // in the spotlight slot. When auto-promoted by a screen-share, the
  // sharer's camera tile STAYS in the filmstrip — you still want to see
  // the person while they present. Local always appears in the filmstrip.
  const filmstrip = useMemo<HangoutLayoutParticipant[]>(() => {
    // If a screen-share is driving the spotlight, no camera tile is
    // displaced from the filmstrip; everyone gets a strip slot.
    const removedCameraId = (spotlightContent || screenShareSharer)
      ? null
      : spotlightParticipantId;
    const list = participants.filter((p) => p.id !== removedCameraId);
    if (localParticipant) list.push({ ...localParticipant, isLocal: true });
    return list;
  }, [participants, spotlightParticipantId, localParticipant, spotlightContent, screenShareSharer]);

  // Pick the spotlight slot content + the e2e data-* attrs in one place.
  const speaker = spotlightParticipantId
    ? participants.find((x) => x.id === spotlightParticipantId) ?? null
    : null;
  const cameraTileSource = speaker ?? participants[0] ?? localParticipant ?? null;
  let spotlightType: 'screen' | 'camera';
  let spotlightUser: string;
  let spotlightSlot: ReactNode = null;
  if (spotlightContent) {
    spotlightType = 'screen';
    // Prefer the explicit sharer label — the speaking participant and
    // the sharing participant are usually different people.
    spotlightUser = spotlightContentLabel ?? cameraTileSource?.displayName ?? '';
    spotlightSlot = spotlightContent;
  } else if (screenShareSharer) {
    spotlightType = 'screen';
    spotlightUser = screenShareSharer.displayName;
    spotlightSlot = screenShareSharer.screenElement;
  } else if (cameraTileSource) {
    spotlightType = 'camera';
    spotlightUser = cameraTileSource.displayName;
    spotlightSlot = (
      <ParticipantTile
        id={cameraTileSource.id}
        displayName={cameraTileSource.displayName}
        avatarUrl={cameraTileSource.avatarUrl}
        isMuted={cameraTileSource.isMuted}
        handRaised={cameraTileSource.handRaised}
        access={cameraTileSource.access}
        isLocal={cameraTileSource.isLocal}
        isSpotlight
        fillParent
        videoElement={cameraTileSource.videoElement}
        className="w-full h-full"
      />
    );
  } else {
    spotlightType = 'camera';
    spotlightUser = '';
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-1 bg-video-stage rounded-lg overflow-hidden',
        fillParent && 'h-full w-full',
        className,
      )}
      style={style}
    >
      <div
        className={cn(
          'bg-black relative',
          // fillParent: spotlight stretches with flexbox; otherwise it
          // enforces 16:9 against width (the mini-widget case).
          fillParent ? 'flex-1 min-h-0' : 'flex-1 aspect-video',
        )}
        data-testid="hangout-spotlight"
        data-spotlight-type={spotlightType}
        data-spotlight-user={spotlightUser}
      >
        {spotlightSlot}
      </div>

      {filmstrip.length > 0 && (
        <div className="flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] shrink-0">
          {filmstrip.map(p => (
            <div
              key={p.id}
              className="shrink-0"
              style={{ width: filmstripTileWidth }}
            >
              <ParticipantTile
                id={p.id}
                displayName={p.displayName}
                avatarUrl={p.avatarUrl}
                isMuted={p.isMuted}
                handRaised={p.handRaised}
                access={p.access}
                isLocal={p.isLocal}
                videoElement={p.videoElement}
                onClick={onParticipantClick ? () => onParticipantClick(p.id) : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Debounce activeSpeakerId so the spotlight slot only swaps after the new
 * speaker has been talking for at least `hysteresisMs`. Without this,
 * every cough, laugh, or short interjection causes flicker.
 *
 * `hysteresisMs <= 0` bypasses the timer entirely and commits the new id on
 * the next effect flush — the escape hatch tests and stories use so the
 * rendered output tracks the props synchronously.
 */
export function useStableActiveSpeaker(
  activeSpeakerId: string | null | undefined,
  hysteresisMs: number,
): string | null {
  const [stable, setStable] = useState<string | null>(activeSpeakerId ?? null);

  useEffect(() => {
    const next = activeSpeakerId ?? null;
    if (hysteresisMs <= 0) {
      setStable(next);
      return;
    }
    if (next === stable) return;
    const t = setTimeout(() => setStable(next), hysteresisMs);
    return () => clearTimeout(t);
  }, [activeSpeakerId, hysteresisMs, stable]);

  return stable;
}
