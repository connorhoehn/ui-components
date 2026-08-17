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
  /** When true, the tile fills its parent (`w-full h-full`) instead of
   *  enforcing its own `aspect-video`. Used by ExpandableCallWidget's
   *  docked + fullscreen modes where the parent owns dimensions. */
  fillParent?: boolean;
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
  id,
  displayName,
  avatarUrl,
  isSpeaking = false,
  isMuted = false,
  isLocal = false,
  isSpotlight = false,
  videoElement,
  onClick,
  fillParent = false,
  className,
  style,
}: ParticipantTileProps) {
  // E2E hook: `remote-tile` for non-local tiles, `local-tile` for self.
  // `data-peer-name` carries the resolved display name (NOT the raw msid /
  // dev-sub) so dm-invite-accept can assert tile labels are human-readable.
  // `data-peer-id` keeps the SFU participantId for de-duplication.
  const testId = isLocal ? 'local-tile' : 'remote-tile';
  return (
    <div
      className={cn(
        'relative bg-[#1a1a2e] flex items-center justify-center rounded overflow-hidden border-2 transition-colors',
        // fillParent: defer sizing to the parent grid cell. Default:
        // enforce 16:9 so the tile renders correctly even in a parent
        // with no explicit height (the mini-widget case).
        fillParent ? 'w-full h-full' : 'aspect-video',
        isSpeaking ? 'border-[#22c55e]' : 'border-transparent',
        onClick && 'cursor-pointer hover:border-white/30',
        className,
      )}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      data-testid={testId}
      data-peer-id={id}
      data-peer-name={displayName}
      data-is-local={isLocal ? 'true' : 'false'}
      data-is-spotlight={isSpotlight ? 'true' : 'false'}
      data-is-muted={isMuted ? 'true' : 'false'}
      data-track-kind={videoElement ? 'camera' : 'avatar'}
    >
      {videoElement ?? (
        // Avatar fallback. Fills the tile with the deterministic name-hashed
        // color so even when the consumer passes a null/undefined videoElement
        // (e.g. peer toggled camera off) the participant is unambiguously
        // present — never an empty black square. The colored backdrop spans
        // the whole tile; the initials chip sits centered on top.
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: stringToColor(displayName) }}
        >
          <div
            className={cn(
              'rounded-full flex items-center justify-center text-white font-semibold bg-black/25 backdrop-blur-sm shadow-inner',
              isSpotlight ? 'w-24 h-24 text-4xl' : 'w-14 h-14 text-xl',
            )}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className={cn('w-full h-full rounded-full object-cover')} />
            ) : (
              getInitials(displayName)
            )}
          </div>
        </div>
      )}

      {/* Bottom name badge — opaque-ish background + drop-shadow text so the
       * label stays legible against either the colored Avatar backdrop or
       * a noisy video frame. */}
      <div className={cn('absolute bottom-1 left-1 right-1 flex items-center gap-1 bg-black/70 rounded-[3px] px-1.5 py-0.5 text-[11px] text-white overflow-hidden drop-shadow')}>
        {isLocal && <span className={cn('text-[#60a5fa] truncate font-medium')}>You</span>}
        {!isLocal && <span className="truncate font-medium">{displayName}</span>}
        {isMuted && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M1 1l8 8M5 1v4.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Muted corner badge — a clearer red mic-with-slash circle in the
       * top-left so the mute state is recognizable even when the bottom
       * name strip is hidden (small filmstrip tiles) or competing with a
       * busy video frame. Complements the inline glyph in the name badge. */}
      {isMuted && (
        <div
          className={cn(
            'absolute top-1 left-1 flex items-center justify-center rounded-full bg-danger/90 text-white shadow-md',
            isSpotlight ? 'w-7 h-7' : 'w-5 h-5',
          )}
          aria-label="Microphone muted"
        >
          <svg width={isSpotlight ? 16 : 12} height={isSpotlight ? 16 : 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="3" y1="3" x2="21" y2="21" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
            <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
            <path d="M19 10v2a7 7 0 0 1-.11 1.23" />
            <path d="M5 10v2a7 7 0 0 0 12 5.29" />
          </svg>
        </div>
      )}

      {isSpeaking && (
        <div className={cn('absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]')} />
      )}
    </div>
  );
}

/**
 * Two-letter initials from a display name. "Alice Smith" → "AS",
 * "alice" → "A", "alice smith jones" → "AS" (first + last bucket).
 * Empty input returns "?" so an empty Avatar never silently renders.
 */
function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  const words = trimmed.split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 55%, 45%)`;
}
