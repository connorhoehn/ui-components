// HangoutGrid — auto-grid layout for a hangout call.
//
// Renders remote participants in a tile grid sized by count
// (1=full, 2=1×2, 3-4=2×2, 5-9=3×3, 10+=4×4). The local participant
// is placed by the call's participant count:
//   N=0 remotes → local fills the canvas (solo, no PiP, no grid).
//   N=1 remote  → local renders as a small PiP overlay (1:1 call convention).
//   N>=2 remotes → local joins the grid inline as another tile (Meet/Teams).
//
// Pure presentational. Caller provides `videoElement` per participant.
// Extracted from `HangoutLayout.tsx`.

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { ParticipantTile } from './ParticipantTile';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';

export interface HangoutGridProps {
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

export function HangoutGrid({
  participants,
  localParticipant = null,
  activeSpeakerId = null,
  onParticipantClick,
  fillParent = false,
  pipWidth = 96,
  className,
  style,
}: HangoutGridProps) {
  const remoteCount = participants.length;
  const showLocalSolo = !!localParticipant && remoteCount === 0;
  const showLocalInline = !!localParticipant && remoteCount >= 2;
  const showLocalPip = !!localParticipant && remoteCount === 1;

  const inlineParticipants = useMemo<HangoutLayoutParticipant[]>(() => {
    if (showLocalSolo && localParticipant) return [{ ...localParticipant, isLocal: true }];
    const list = [...participants];
    if (showLocalInline && localParticipant) list.push({ ...localParticipant, isLocal: true });
    return list;
  }, [participants, showLocalSolo, showLocalInline, localParticipant]);

  const cols = gridCols(inlineParticipants.length);
  // When fillParent, also constrain rows so tiles share height equally.
  const rows = Math.max(1, Math.ceil(inlineParticipants.length / cols));

  return (
    <div
      className={cn(
        'relative grid gap-1 bg-video-stage rounded-lg overflow-hidden',
        fillParent && 'h-full w-full',
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        ...(fillParent ? { gridTemplateRows: `repeat(${rows}, 1fr)` } : {}),
        ...style,
      }}
    >
      {inlineParticipants.map((p) => (
        <ParticipantTile
          key={p.id}
          id={p.id}
          displayName={p.displayName}
          avatarUrl={p.avatarUrl}
          isSpeaking={p.id === activeSpeakerId}
          isMuted={p.isMuted}
          handRaised={p.handRaised}
          isLocal={p.isLocal}
          videoElement={p.videoElement}
          fillParent={fillParent}
          onClick={onParticipantClick ? () => onParticipantClick(p.id) : undefined}
        />
      ))}

      {inlineParticipants.length === 0 && (
        <div className={cn(
          'flex items-center justify-center text-white/40 text-sm',
          fillParent ? 'h-full w-full' : 'aspect-video',
        )}>
          Waiting for others to join…
        </div>
      )}

      {showLocalPip && localParticipant && (
        <div
          className="absolute bottom-2 right-2 aspect-video rounded overflow-hidden border border-white/20 shadow-lg z-10"
          style={{ width: pipWidth }}
        >
          <ParticipantTile
            id={localParticipant.id}
            displayName={localParticipant.displayName}
            avatarUrl={localParticipant.avatarUrl}
            isMuted={localParticipant.isMuted}
            handRaised={localParticipant.handRaised}
            isLocal
            videoElement={localParticipant.videoElement}
          />
        </div>
      )}
    </div>
  );
}

export function gridCols(count: number): number {
  if (count <= 1) return 1;
  if (count === 2) return 2; // 1x2 horizontal (most common)
  if (count <= 4) return 2; // 2x2
  if (count <= 9) return 3; // 3x3
  return 4; // 4x4 (paginate beyond 16 — TODO)
}
