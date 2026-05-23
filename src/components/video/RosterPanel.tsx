// RosterPanel — collapsible roster shown alongside HangoutLayout when
// N≥5. Each row: avatar + display name + mute icon + speaking pulse.
// Pure presentational — caller passes the participant list + mute
// states + active-speaker id; no transport / signaling coupling.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RosterParticipant {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isMuted?: boolean;
  isLocal?: boolean;
  isScreenSharing?: boolean;
  handRaised?: boolean;
}

export interface RosterPanelProps {
  participants: RosterParticipant[];
  activeSpeakerId?: string | null;
  /** Click handler per row — e.g. promote to spotlight. */
  onParticipantClick?: (id: string) => void;
  /** Total-participants count shown in header. Defaults to participants.length. */
  count?: number;
  /** Optional header — e.g. "In this call". Default "Participants". */
  title?: string;
  /** Optional footer — e.g. an "+ Add" button. */
  footer?: ReactNode;
  className?: string;
}

function initials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

export function RosterPanel({
  participants,
  activeSpeakerId,
  onParticipantClick,
  count,
  title = 'Participants',
  footer,
  className,
}: RosterPanelProps) {
  const total = count ?? participants.length;
  return (
    <aside
      className={cn(
        'flex flex-col w-64 shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)]',
        className,
      )}
      aria-label="Call participants"
    >
      <header className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
        <span className="text-xs text-[var(--color-text-secondary)] tabular-nums">{total}</span>
      </header>
      <ul className="flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {participants.map((p) => {
          const isSpeaking = p.id === activeSpeakerId;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={onParticipantClick ? () => onParticipantClick(p.id) : undefined}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2 text-left transition-colors',
                  'hover:bg-white/[0.03]',
                  isSpeaking && 'bg-white/[0.04]',
                  onParticipantClick ? 'cursor-pointer' : 'cursor-default',
                )}
                disabled={!onParticipantClick}
              >
                <div
                  className={cn(
                    'relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0',
                    'bg-[var(--color-primary)] text-white',
                    isSpeaking && 'ring-2 ring-green-400 ring-offset-2 ring-offset-[var(--color-surface)]',
                  )}
                >
                  {p.avatarUrl ? (
                    <img src={p.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span>{initials(p.displayName)}</span>
                  )}
                  {p.isScreenSharing && (
                    <span
                      title="Sharing screen"
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border border-[var(--color-surface)]"
                    />
                  )}
                </div>
                <span className="flex-1 truncate text-sm text-[var(--color-text-primary)]">
                  {p.displayName}
                  {p.isLocal && <span className="ml-1 text-xs text-[var(--color-text-secondary)]">(you)</span>}
                </span>
                {p.handRaised && (
                  <span title="Hand raised" aria-label="Hand raised">✋</span>
                )}
                {p.isMuted && (
                  <svg
                    width="14" height="14" viewBox="0 0 16 16"
                    className="text-[var(--color-text-secondary)]" aria-label="Muted"
                  >
                    <path
                      fill="currentColor"
                      d="M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
                    />
                  </svg>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {footer && (
        <div className="border-t border-[var(--color-border)] p-3">
          {footer}
        </div>
      )}
    </aside>
  );
}

export default RosterPanel;
