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
  /** Active speaker id — drives spotlight slot via stabilized hysteresis. */
  activeSpeakerId?: string | null;
  /** Hysteresis window (ms) before the spotlight slot swaps. 0 = immediate. */
  speakerHysteresisMs?: number;
  /** Click handler per filmstrip tile. */
  onParticipantClick?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function HangoutSpotlight({
  participants,
  localParticipant = null,
  spotlightContent,
  activeSpeakerId = null,
  speakerHysteresisMs = 750,
  onParticipantClick,
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
    spotlightUser = cameraTileSource?.displayName ?? '';
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
        isLocal={cameraTileSource.isLocal}
        isSpotlight
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
      className={cn('flex flex-col gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden', className)}
      style={style}
    >
      <div
        className="flex-1 bg-black aspect-video relative"
        data-testid="hangout-spotlight"
        data-spotlight-type={spotlightType}
        data-spotlight-user={spotlightUser}
      >
        {spotlightSlot}
      </div>

      {filmstrip.length > 0 && (
        <div className="flex gap-1 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {filmstrip.map(p => (
            <div key={p.id} className="w-32 shrink-0">
              <ParticipantTile
                id={p.id}
                displayName={p.displayName}
                avatarUrl={p.avatarUrl}
                isMuted={p.isMuted}
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
