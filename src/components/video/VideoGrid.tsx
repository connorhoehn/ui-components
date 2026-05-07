import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

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

export function VideoGrid({ participants, style }: VideoGridProps) {
  const count = participants.length;
  const cols = count <= 1 ? 1 : count <= 4 ? 2 : count <= 9 ? 3 : 4;

  return (
    <div
      className={cn('grid gap-1 bg-[#0f0f0f] rounded-lg overflow-hidden')}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, ...style }}
    >
      {participants.map(p => (
        <ParticipantTile key={p.id} participant={p} />
      ))}
    </div>
  );
}

function ParticipantTile({ participant }: { participant: Participant }) {
  const { displayName, isSpeaking, isMuted, isLocal, videoElement, avatarUrl } = participant;

  return (
    <div className={cn(
      'relative aspect-video bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2',
      isSpeaking ? 'border-[#22c55e]' : 'border-transparent',
    )}>
      {videoElement ?? (
        <div
          className={cn('w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold')}
          style={{ background: stringToColor(displayName) }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className={cn('w-full h-full rounded-full object-cover')} />
          ) : (
            displayName.charAt(0).toUpperCase()
          )}
        </div>
      )}

      <div className={cn('absolute bottom-1 left-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white')}>
        {isLocal && <span className={cn('text-[#60a5fa]')}>You</span>}
        {!isLocal && <span>{displayName}</span>}
        {isMuted && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M5 1v4.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {isSpeaking && (
        <div className={cn('absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]')} />
      )}
    </div>
  );
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 55%, 45%)`;
}
