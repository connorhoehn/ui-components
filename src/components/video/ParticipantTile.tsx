import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ParticipantTileProps {
  /** Unique identifier for keying / pin actions. */
  id: string;
  /** Name shown in the bottom badge. */
  displayName: string;
  /** Optional avatar URL — used as fallback when no videoElement is provided. */
  avatarUrl?: string;
  /** Whether to render with a speaking-indicator green border + corner dot. */
  isSpeaking?: boolean;
  /** Whether to overlay a muted-mic glyph in the badge. */
  isMuted?: boolean;
  /** Whether this tile represents the local user — replaces the displayName label with "You". */
  isLocal?: boolean;
  /** When true, applies the "main / spotlight" emphasis style (larger border, taller aspect). */
  isSpotlight?: boolean;
  /** A pre-rendered media element (a `<video>` typically) — the consumer manages srcObject. */
  videoElement?: ReactNode;
  /** Click handler — used by HangoutLayout for pin / spotlight selection. */
  onClick?: () => void;
  /** Escape hatches. */
  className?: string;
  style?: CSSProperties;
}

/**
 * Single-participant tile used in `VideoGrid` and `HangoutLayout`. Pure
 * presentational — no media wiring, no signaling — caller owns the `<video>`
 * element via `videoElement` and the speaking/mute booleans.
 *
 * The speaking border is intentionally just a border (no reflow): per industry
 * convention (Meet/Teams/Zoom), reflowing tiles on speaker change is jarring;
 * a green border is the agreed-on cue.
 */
export function ParticipantTile({
  displayName,
  avatarUrl,
  isSpeaking = false,
  isMuted = false,
  isLocal = false,
  isSpotlight = false,
  videoElement,
  onClick,
  className,
  style,
}: ParticipantTileProps) {
  return (
    <div
      className={cn(
        'relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors',
        isSpotlight ? 'aspect-video' : 'aspect-video',
        isSpeaking ? 'border-[#22c55e]' : 'border-transparent',
        onClick && 'cursor-pointer hover:border-white/30',
        className,
      )}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {videoElement ?? (
        <div
          className={cn('rounded-full flex items-center justify-center text-white font-semibold',
            isSpotlight ? 'w-16 h-16 text-2xl' : 'w-10 h-10 text-base')}
          style={{ background: stringToColor(displayName) }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className={cn('w-full h-full rounded-full object-cover')} />
          ) : (
            displayName.charAt(0).toUpperCase()
          )}
        </div>
      )}

      <div className={cn('absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden')}>
        {isLocal && <span className={cn('text-[#60a5fa] truncate')}>You</span>}
        {!isLocal && <span className="truncate">{displayName}</span>}
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
