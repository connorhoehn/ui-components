// src/components/video/CallParticipantStrip.tsx
//
// Compact avatar strip rendering the people currently in a call. Used by
// CallWidget's audio-only mode and by other callers that want a horizontal
// roster (e.g. a screen-share kiosk header). Pure presentational — props
// in, JSX out.
//
// Also owns the small CallAvatar primitive (initial + colour + speaking
// indicator) used by CallWidget's video PiP fallback and CallControls'
// add-participant picker. CallAvatar is exported for cross-file reuse
// inside the call surface but intentionally NOT re-exported from the
// module's index so it stays an internal implementation detail.

import type { CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { ParticipantAccessBadge, type ParticipantAccess } from './ParticipantAccessBadge';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CallStripParticipant {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isMuted?: boolean;
  isSpeaking?: boolean;
  /** Less than full access: `view-only` puts an eye on the avatar, named "View only". */
  access?: ParticipantAccess;
}

export interface CallParticipantStripProps {
  /** Participants in the call. */
  participants: CallStripParticipant[];
  /**
   * Optional fallback shown when `participants` is empty (e.g. the local
   * user before any remote joins). Rendered as a single Avatar tile.
   */
  localFallback?: CallStripParticipant;
  /** Max avatars to render inline before collapsing into a `+N` indicator. */
  maxVisible?: number;
  /** Avatar diameter in px. Defaults to 36. */
  avatarSize?: number;
  /** Stable data-testid (e2e hook). Defaults to `call-participant-strip`. */
  testId?: string;
  className?: string;
  style?: CSSProperties;
}

// ---------------------------------------------------------------------------
// Avatar primitive (shared inside the call surface)
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function stringToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export interface CallAvatarProps {
  participant: CallStripParticipant;
  size?: number;
}

export function CallAvatar({ participant, size = 32 }: CallAvatarProps) {
  const hue = stringToHue(participant.displayName);
  return (
    <div
      data-testid="call-avatar"
      data-speaking={participant.isSpeaking ? 'true' : undefined}
      data-muted={participant.isMuted ? 'true' : undefined}
      data-access={participant.access}
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0 relative"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: participant.avatarUrl ? undefined : `hsl(${hue}, 55%, 45%)`,
      }}
    >
      {participant.avatarUrl ? (
        <img
          src={participant.avatarUrl}
          alt=""
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        getInitials(participant.displayName)
      )}
      {participant.isSpeaking && (
        <span
          data-testid="call-avatar-speaking"
          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-code-border"
        />
      )}
      <ParticipantAccessBadge
        access={participant.access}
        tone="overlay"
        iconOnly
        className="absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 bg-call-chrome [&_svg]:h-2.5 [&_svg]:w-2.5"
        data-testid="call-avatar-access"
      />
      {participant.isMuted && (
        <span
          data-testid="call-avatar-muted"
          aria-label="Microphone muted"
          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-danger/90 flex items-center justify-center text-white"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="3" y1="3" x2="21" y2="21" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
            <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
          </svg>
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CallParticipantStrip
// ---------------------------------------------------------------------------

export function CallParticipantStrip({
  participants,
  localFallback,
  maxVisible = 4,
  avatarSize = 36,
  testId = 'call-participant-strip',
  className,
  style,
}: CallParticipantStripProps) {
  const visible = participants.slice(0, maxVisible);
  const overflow = Math.max(0, participants.length - maxVisible);
  const showFallback = participants.length === 0 && !!localFallback;

  return (
    <div
      data-testid={testId}
      data-count={participants.length}
      className={cn(
        'flex items-center justify-center gap-2 py-4 px-3 flex-wrap',
        className,
      )}
      style={style}
    >
      {visible.map((p) => (
        <CallAvatar key={p.id} participant={p} size={avatarSize} />
      ))}
      {overflow > 0 && (
        <span
          data-testid="call-participant-strip-overflow"
          className="text-white/50 text-xs font-medium"
        >
          +{overflow}
        </span>
      )}
      {showFallback && localFallback && (
        <CallAvatar participant={localFallback} size={avatarSize + 4} />
      )}
    </div>
  );
}
