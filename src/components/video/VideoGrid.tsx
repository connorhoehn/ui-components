import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ParticipantTile } from './ParticipantTile';

export interface Participant {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
  isLocal?: boolean;
  videoElement?: ReactNode;
}

export interface VideoGridProps {
  participants: Participant[];
  style?: CSSProperties;
}

/**
 * Static N-way grid: 1 / 2×2 / 3×3 / 4×4 column count based on participant
 * count. Tiles do NOT reflow on speaker change — speaking is indicated via
 * border highlight on the tile only (see ParticipantTile). For an
 * active-speaker-aware spotlight layout, use `HangoutLayout` instead.
 */
export function VideoGrid({ participants, style }: VideoGridProps) {
  const count = participants.length;
  const cols = count <= 1 ? 1 : count <= 4 ? 2 : count <= 9 ? 3 : 4;

  return (
    <div
      className={cn('grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden')}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, ...style }}
    >
      {participants.map(p => (
        <ParticipantTile
          key={p.id}
          id={p.id}
          displayName={p.displayName}
          avatarUrl={p.avatarUrl}
          isSpeaking={p.isSpeaking}
          isMuted={p.isMuted}
          isLocal={p.isLocal}
          videoElement={p.videoElement}
        />
      ))}
    </div>
  );
}
