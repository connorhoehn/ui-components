// RosterPanel — collapsible roster shown alongside HangoutLayout when
// N≥5. Each row: avatar + display name + mute icon + speaking pulse.
// Pure presentational — caller passes the participant list + mute
// states + active-speaker id; no transport / signaling coupling.
//
// Raised hands (2.460.0): `raisedHandsFirst` orders the list by queue
// position, and an organizer gets Lower per row (`onLowerHand`) and Lower all
// in the header (`onLowerAllHands`) — the People pane's hands queue in Teams.

import { useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { RaisedHandBadge } from './RaisedHandBadge';

export interface RosterParticipant {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isMuted?: boolean;
  isLocal?: boolean;
  isScreenSharing?: boolean;
  /** `true`, or the 1-based queue position (shown beside the hand since 2.458.0). */
  handRaised?: boolean | number;
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
  /** 'dark' renders on black call chrome (the shipped token palette is
   *  light-only, so the default is a white slab inside the dark call
   *  widget — 2026-08-25 audit P0-3). */
  tone?: 'light' | 'dark';
  /**
   * Put raised hands at the top in queue order (numbered positions first,
   * then unnumbered hands), everyone else after in the given order. Default
   * false: the list keeps the caller's order.
   */
  raisedHandsFirst?: boolean;
  /** Organizer: lower one person's hand. Shown as Lower on rows with a hand up. */
  onLowerHand?: (id: string) => void;
  /** Organizer: lower every hand. Shown in the header while any hand is up. */
  onLowerAllHands?: () => void;
  className?: string;
}

function handRank(raised: RosterParticipant['handRaised']): number {
  if (typeof raised === 'number') return raised;
  return raised ? Number.MAX_SAFE_INTEGER - 1 : Number.MAX_SAFE_INTEGER;
}

/** Raised hands first in queue order; a stable sort, so ties keep the caller's order. */
export function orderRosterByHands(participants: readonly RosterParticipant[]): RosterParticipant[] {
  return participants
    .map((p, i) => ({ p, i, rank: handRank(p.handRaised) }))
    .sort((a, b) => a.rank - b.rank || a.i - b.i)
    .map((x) => x.p);
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
  tone = 'light',
  raisedHandsFirst = false,
  onLowerHand,
  onLowerAllHands,
  className,
}: RosterPanelProps) {
  const dark = tone === 'dark';
  const total = count ?? participants.length;
  const rows = raisedHandsFirst ? orderRosterByHands(participants) : participants;
  const handsUp = participants.filter((p) => p.handRaised).length;
  const panelRef = useRef<HTMLElement>(null);
  // A Lower button disappears with the hand it lowers. Move focus first — to
  // the next Lower in the list, else the previous one, else the panel — so a
  // keyboard user is not dropped onto <body>.
  const keepFocus = (from: HTMLElement | null) => {
    const all = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('[data-testid="roster-lower-hand"]') ?? []);
    const at = from ? all.indexOf(from) : -1;
    const next = at >= 0 ? all[at + 1] ?? all[at - 1] : undefined;
    (next ?? panelRef.current)?.focus();
  };
  return (
    <aside
      className={cn(
        'flex flex-col w-64 shrink-0 focus:outline-none',
        dark
          // tone="dark" is call chrome (all its text is white/alpha), so it
          // takes the theme-invariant token — `bg-surface-inverse` flipped
          // to near-white under [data-theme="dark"]. See --color-call-chrome.
          ? 'bg-call-chrome border-l border-call-chrome-border'
          : 'bg-[var(--color-surface)] border-l border-[var(--color-border)]',
        className,
      )}
      aria-label="Call participants"
      ref={panelRef}
      tabIndex={-1}
    >
      <header className={cn('px-4 py-3 border-b flex items-center justify-between', dark ? 'border-white/10' : 'border-[var(--color-border)]')}>
        <h3 className={cn('text-sm font-semibold', dark ? 'text-white' : 'text-[var(--color-text-primary)]')}>{title}</h3>
        <span className="flex items-center gap-2">
          {onLowerAllHands && handsUp > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { keepFocus(null); onLowerAllHands(); }}
              className={dark ? 'text-white/80 hover:text-white' : undefined}
              data-testid="roster-lower-all"
            >
              Lower all hands
            </Button>
          )}
          <span className={cn('text-xs tabular-nums', dark ? 'text-white/50' : 'text-[var(--color-text-secondary)]')}>{total}</span>
        </span>
      </header>
      <ul className="flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {rows.map((p) => {
          const isSpeaking = p.id === activeSpeakerId;
          return (
            <li key={p.id} className="flex items-center" data-testid="roster-row" data-user-id={p.id}>
              <button
                data-ui-part=""
                type="button"
                onClick={onParticipantClick ? () => onParticipantClick(p.id) : undefined}
                className={cn(
                  'min-w-0 flex-1 flex items-center gap-3 px-4 py-2 text-left transition-colors',
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
                    isSpeaking && 'ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]',
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
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-info border border-[var(--color-surface)]"
                    />
                  )}
                </div>
                <span className={cn('flex-1 truncate text-sm', dark ? 'text-white/90' : 'text-[var(--color-text-primary)]')}>
                  {p.displayName}
                  {p.isLocal && <span className={cn('ml-1 text-xs', dark ? 'text-white/50' : 'text-[var(--color-text-secondary)]')}>(you)</span>}
                </span>
                <RaisedHandBadge raised={p.handRaised} tone={dark ? 'overlay' : 'chip'} data-testid="roster-raised-hand" />
                {p.isMuted && (
                  <svg
                    width="14" height="14" viewBox="0 0 16 16"
                    className={dark ? 'text-white/50' : 'text-[var(--color-text-secondary)]'} aria-label="Muted"
                  >
                    <path
                      fill="currentColor"
                      d="M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
                    />
                  </svg>
                )}
              </button>
              {onLowerHand && p.handRaised && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { keepFocus(e.currentTarget); onLowerHand(p.id); }}
                  aria-label={`Lower ${p.displayName}'s hand`}
                  className={cn('mr-2 shrink-0', dark && 'text-white/80 hover:text-white')}
                  data-testid="roster-lower-hand"
                >
                  Lower
                </Button>
              )}
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
