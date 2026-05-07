import type { CSSProperties, ReactNode } from 'react';

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
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 4,
      background: '#0f0f0f',
      borderRadius: 8,
      overflow: 'hidden',
      ...style,
    }}>
      {participants.map(p => (
        <ParticipantTile key={p.id} participant={p} />
      ))}
    </div>
  );
}

function ParticipantTile({ participant }: { participant: Participant }) {
  const { displayName, isSpeaking, isMuted, isLocal, videoElement, avatarUrl } = participant;

  return (
    <div style={{
      position: 'relative',
      aspectRatio: '16/9',
      background: '#1a1a2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: isSpeaking ? '2px solid #22c55e' : '2px solid transparent',
      borderRadius: 4,
      overflow: 'hidden',
    }}>
      {videoElement ?? (
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: stringToColor(displayName),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: 600,
        }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            displayName.charAt(0).toUpperCase()
          )}
        </div>
      )}

      <div style={{
        position: 'absolute',
        bottom: 4,
        left: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: 'rgba(0,0,0,0.7)',
        borderRadius: 3,
        padding: '2px 6px',
        fontSize: 11,
        color: '#fff',
      }}>
        {isLocal && <span style={{ color: '#60a5fa' }}>You</span>}
        {!isLocal && <span>{displayName}</span>}
        {isMuted && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M5 1v4.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {isSpeaking && (
        <div style={{
          position: 'absolute',
          top: 4,
          right: 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 4px #22c55e',
        }} />
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
