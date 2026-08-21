// frontend/src/components/doc-editor/ParticipantAvatars.tsx
//
// Interactive presence strip with clickable avatars, online dots, mode badges,
// section indicators, and tooltips.

import { useState, useRef } from 'react';
import type { Participant } from '../../types/document';
import { cn } from '../../lib/cn';

interface ParticipantAvatarsProps {
  participants: Participant[];
  sections?: { id: string; title: string }[];
  onJumpToUser?: (participant: Participant) => void;
  onFollowUser?: (participant: Participant) => void;
  followingUserId?: string | null;
}

/* ---- helpers ------------------------------------------------------------ */

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function darkenColor(hex: string, amount = 0.2): string {
  const h = hex.replace('#', '');
  const num = parseInt(h, 16);
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - amount));
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - amount));
  const b = Math.max(0, (num & 0xff) * (1 - amount));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function modeText(mode: Participant['mode']): string {
  switch (mode) {
    case 'editor':
      return 'editing';
    case 'reviewer':
      return 'reviewing';
    case 'reader':
      return 'reading';
    default:
      return '';
  }
}

function lastSeenText(lastSeen?: number): string {
  if (!lastSeen) return '';
  const diff = Math.floor((Date.now() - lastSeen) / 1000);
  if (diff < 5) return '';  // Active right now — don't show timer
  if (diff < 60) return `, ${diff}s`;
  if (diff < 3600) return `, ${Math.floor(diff / 60)}m`;
  return `, ${Math.floor(diff / 3600)}h`;
}

function modeBadgeColor(mode: Participant['mode']): { bg: string; text: string } {
  switch (mode) {
    case 'editor':
      return { bg: '#dbeafe', text: '#1d4ed8' };
    case 'reviewer':
      return { bg: '#fef3c7', text: '#92400e' };
    case 'reader':
      return { bg: '#f1f5f9', text: '#64748b' };
    default:
      return { bg: '#f1f5f9', text: '#64748b' };
  }
}

/* ---- component ---------------------------------------------------------- */

function AvatarItem({
  participant,
  sectionTitle,
  onJumpToUser,
  onFollowUser,
  isFollowing,
}: {
  participant: Participant;
  sectionTitle?: string;
  onJumpToUser?: (p: Participant) => void;
  onFollowUser?: (p: Participant) => void;
  isFollowing?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
    setHovered(true);
  };
  const hideTooltip = () => {
    hideTimer.current = setTimeout(() => setHovered(false), 150);
  };

  const badge = modeBadgeColor(participant.mode);
  const baseColor = participant.color || '#3b82f6';

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center gap-[3px] relative cursor-pointer animate-[presenceFadeIn_0.3s_ease]')}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={() => onJumpToUser?.(participant)}
    >
      {/* Tooltip */}
      {hovered && (
        <div
          className={cn('absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#1e293b] text-white py-2 px-3 rounded-md text-xs whitespace-nowrap z-[100] pointer-events-auto shadow-[0_4px_12px_rgba(0,0,0,0.15)] leading-snug')}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          <div className={cn('font-semibold mb-0.5')}>{participant.displayName}</div>
          <div className={cn('text-text-tertiary text-[11px]')}>
            {participant.idle ? 'away' : modeText(participant.mode)}{lastSeenText(participant.lastSeen)}
          </div>
          {sectionTitle && (
            <div className={cn('text-text-tertiary text-[11px] mt-0.5')}>
              &sect; {sectionTitle}
            </div>
          )}
          {onFollowUser && (
            <div
              role="button"
              onClick={(e) => { e.stopPropagation(); onFollowUser(participant); }}
              className={cn('mt-1 text-[11px] font-semibold cursor-pointer', isFollowing ? 'text-warning-fg' : 'text-info-fg')}
            >
              {isFollowing ? 'Stop following' : 'Follow'}
            </div>
          )}
        </div>
      )}

      {/* Avatar circle with gradient + online dot */}
      <div className={cn('relative inline-block')}>
        <div
          className={cn('w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-semibold transition-[transform,box-shadow] duration-200 ease-in-out', hovered ? 'scale-110' : 'scale-100')}
          style={{
            background: `linear-gradient(135deg, ${baseColor}, ${darkenColor(baseColor, 0.2)})`,
            boxShadow: hovered ? `0 0 0 2px ${baseColor}40` : 'none',
          }}
        >
          {getInitials(participant.displayName)}
        </div>

        {/* Status dot: green = active, yellow = away/idle */}
        <div
          className={cn('absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white', participant.idle ? 'bg-warning' : 'bg-success [animation:presencePulse_2s_infinite]')}
        />
      </div>

      {/* Mode badge */}
      <span
        className={cn('text-[11px] font-semibold px-2 py-px rounded-full leading-4')}
        style={{
          background: participant.idle ? '#fef3c7' : badge.bg,
          color: participant.idle ? '#92400e' : badge.text,
        }}
      >
        {participant.idle ? 'away' : modeText(participant.mode)}{lastSeenText(participant.lastSeen)}
      </span>

      {/* Following indicator */}
      {isFollowing && (
        <span className={cn('text-[10px] font-semibold text-[#3b82f6]')}>
          following
        </span>
      )}

      {/* Section indicator */}
      {sectionTitle && (
        <span className={cn('text-[10px] text-neutral max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-center')}>
          &sect; {sectionTitle}
        </span>
      )}
    </div>
  );
}

export default function ParticipantAvatars({
  participants,
  sections,
  onJumpToUser,
  onFollowUser,
  followingUserId,
}: ParticipantAvatarsProps) {

  const sectionMap = new Map<string, string>();
  if (sections) {
    for (const s of sections) {
      sectionMap.set(s.id, s.title);
    }
  }

  if (participants.length === 0) return null;

  return (
    <div data-testid="participant-avatars" className={cn('flex items-center gap-0')}>
      <div className={cn('flex gap-2.5 items-start py-1')}>
        {participants.filter((p, i, arr) => arr.findIndex(x => (x.userId || x.clientId) === (p.userId || p.clientId)) === i).map((p) => (
          <AvatarItem
            key={p.clientId}
            participant={p}
            sectionTitle={p.currentSectionId ? sectionMap.get(p.currentSectionId) : undefined}
            onJumpToUser={onJumpToUser}
            onFollowUser={onFollowUser}
            isFollowing={followingUserId === (p.userId || p.clientId)}
          />
        ))}
      </div>
      <div className={cn('w-px h-9 bg-border mx-1 self-center')} />
    </div>
  );
}
