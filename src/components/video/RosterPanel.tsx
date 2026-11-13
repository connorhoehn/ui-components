// RosterPanel — collapsible roster shown alongside HangoutLayout when
// N≥5. Each row: avatar + display name + mute icon + speaking pulse.
// Pure presentational — caller passes the participant list + mute
// states + active-speaker id; no transport / signaling coupling.
//
// Raised hands (2.460.0): `raisedHandsFirst` orders the list by queue
// position, and an organizer gets Lower per row (`onLowerHand`) and Lower all
// in the header (`onLowerAllHands`) — the People pane's hands queue in Teams.
//
// Per-row actions: `rowMenu` returns the sections of a row's ⋯ menu (the same
// contract as TreeView and PipelinesListView), so a host adds "Make view-only"
// or "Remove" without drawing its own rows. A participant's `access` shows as
// a chip in the row ("View only").
//
// The row gives the name priority. Avatar, "(you)", the chips, the mute mark
// and the ⋯ button never shrink; the name is the one thing that gives way, and
// it does so last: with `accessBadge="auto"` (default) a "View only" chip
// first collapses to its eye (still named "View only") whenever the full chip
// would cut the name, and comes back when the row is wide enough for both.
// A name that is still cut ends with an ellipsis and shows in full as a
// tooltip. The row button clips its own content, so nothing can run under
// the ⋯ button beside it.

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { MoreHorizontalIcon } from './MediaIcons';
import { ParticipantAccessBadge, type ParticipantAccess } from './ParticipantAccessBadge';
import { RaisedHandBadge } from './RaisedHandBadge';
import { Tooltip } from '../shared/Tooltip';
import { BotIcon } from '../ui/Icons';

export interface RosterParticipant {
  id: string;
  displayName: string;
  avatarUrl?: string;
  isMuted?: boolean;
  isLocal?: boolean;
  isScreenSharing?: boolean;
  /** `true`, or the 1-based queue position (shown beside the hand since 2.458.0). */
  handRaised?: boolean | number;
  /** Less than full access, shown as a chip in the row: `view-only` (may not publish). Absent: no chip. */
  access?: ParticipantAccess;
}

/**
 * An entry in the roster that is NOT a media participant: an assistant, a
 * recorder, a bot. Drawn after the people with a square (not round) mark so
 * it never reads as a person, never as a video tile, and never counted unless
 * `countExtraEntries` is set (2.526.0).
 */
export interface RosterExtraEntry {
  id: string;
  name: string;
  /** Small kind label beside the name, e.g. "Assistant". */
  label?: string;
  /** Status text under the name, e.g. "listening". */
  status?: string;
  /** The mark. Default: the bot glyph. */
  icon?: ReactNode;
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
  /**
   * The row's ⋯ menu — "Make view-only", "Remove from call". Return `null` or
   * an empty array for a row that has none; with no `rowMenu` no row has a
   * menu button. Same contract as TreeView's and PipelinesListView's `rowMenu`.
   */
  rowMenu?: (participant: RosterParticipant) => DropdownMenuSection[] | null | undefined;
  /** Accessible name of each row's menu button. Default `Actions for <displayName>`. */
  rowMenuLabel?: (participant: RosterParticipant) => string;
  /**
   * How a row draws its access chip. `auto` (default): the eye and "View
   * only", collapsing to the eye alone whenever the label would cut the
   * person's name (measured per row, so a narrow panel or a long name both
   * fold it). `label`: always the eye and the label. `icon`: always the eye
   * alone. The collapsed eye keeps "View only" as its accessible name.
   */
  accessBadge?: 'auto' | 'label' | 'icon';
  /** Non-media entries listed after the people (an assistant, a recorder). */
  extraEntries?: RosterExtraEntry[];
  /** Add `extraEntries.length` to the header count when `count` is not given. Default false. */
  countExtraEntries?: boolean;
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
  rowMenu,
  rowMenuLabel,
  accessBadge = 'auto',
  extraEntries,
  countExtraEntries = false,
  className,
}: RosterPanelProps) {
  const dark = tone === 'dark';
  const total = count ?? participants.length + (countExtraEntries ? (extraEntries?.length ?? 0) : 0);
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
          const menuSections = rowMenu?.(p)?.filter((section) => section.items.length > 0) ?? [];
          return (
            <li key={p.id} className="flex items-center" data-testid="roster-row" data-user-id={p.id}>
              <RosterRowButton
                participant={p}
                speaking={isSpeaking}
                dark={dark}
                accessBadge={accessBadge}
                trailing={menuSections.length > 0 || Boolean(onLowerHand && p.handRaised)}
                {...(onParticipantClick ? { onClick: () => onParticipantClick(p.id) } : {})}
              />
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
              {menuSections.length > 0 && (
                <DropdownMenu
                  trigger={<MoreHorizontalIcon size={18} />}
                  triggerLabel={rowMenuLabel ? rowMenuLabel(p) : `Actions for ${p.displayName}`}
                  triggerVariant="link"
                  triggerClassName={cn(
                    'mr-2 h-7 w-7 shrink-0 justify-center px-0',
                    dark && 'text-white/70 hover:bg-white/10 hover:text-white',
                  )}
                  triggerTestId="roster-row-menu"
                  align="end"
                  sections={menuSections}
                  data-testid={`roster-row-menu-panel-${p.id}`}
                />
              )}
            </li>
          );
        })}
        {extraEntries?.map((e) => (
          <li key={e.id} className="flex items-center gap-2.5 py-2 pl-4 pr-4" data-testid="roster-extra-entry" data-entry-id={e.id}>
            <span
              aria-hidden
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border',
                dark ? 'border-white/20 bg-white/10 text-white/80' : 'border-border bg-surface-inset text-text-secondary',
              )}
            >
              {e.icon ?? <BotIcon size={16} />}
            </span>
            <span className="flex min-w-0 flex-1 flex-col text-sm">
              <span className="flex min-w-0 items-baseline gap-1.5">
                <span className={cn('min-w-0 truncate', dark ? 'text-white/90' : 'text-text-primary')}>{e.name}</span>
                {e.label && (
                  <span className={cn('shrink-0 text-xs', dark ? 'text-white/50' : 'text-text-secondary')} data-testid="roster-extra-label">{e.label}</span>
                )}
              </span>
              {e.status && (
                <span className={cn('truncate text-xs', dark ? 'text-white/50' : 'text-text-tertiary')} data-testid="roster-extra-status">{e.status}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      {footer && (
        <div className="border-t border-[var(--color-border)] p-3">
          {footer}
        </div>
      )}
    </aside>
  );
}

interface RosterRowButtonProps {
  participant: RosterParticipant;
  speaking: boolean;
  dark: boolean;
  accessBadge: 'auto' | 'label' | 'icon';
  /** A Lower button or ⋯ menu follows the row button: tighter right padding. */
  trailing: boolean;
  onClick?: () => void;
}

/** True when the element's text runs past its box. */
function cutText(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth + 1;
}

/**
 * The row's main button: avatar, name (+ "(you)"), the access chip, a raised
 * hand and the mute mark. In `auto` the access chip folds to its eye while
 * the full chip would cut the name. The rule has hysteresis: it folds when
 * the name is cut, and unfolds only when the name block has spare room for
 * the label it would gain back, so the row never flips back and forth.
 */
function RosterRowButton({ participant: p, speaking, dark, accessBadge, trailing, onClick }: RosterRowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const blockRef = useRef<HTMLSpanElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);
  const youRef = useRef<HTMLSpanElement | null>(null);
  const chipRef = useRef<HTMLSpanElement | null>(null);
  const labelChipWidth = useRef(0);
  const [folded, setFolded] = useState(false);
  const measured = accessBadge === 'auto' && p.access != null;

  useLayoutEffect(() => {
    if (!measured) { setFolded(false); return; }
    const button = buttonRef.current;
    const fit = () => {
      const block = blockRef.current, name = nameRef.current, chip = chipRef.current;
      // Zero on the BUTTON means not laid out (a hidden subtree); zero on the
      // name block is real (the label squeezed it away) and must fold.
      if (!button || !block || !name || !chip || button.clientWidth === 0) return;
      if (!folded) {
        labelChipWidth.current = chip.offsetWidth;
        if (cutText(name)) setFolded(true);
        return;
      }
      const gained = labelChipWidth.current - chip.offsetWidth;
      const used = name.scrollWidth + (youRef.current ? youRef.current.offsetWidth + 4 : 0);
      if (block.clientWidth - used >= gained) setFolded(false);
    };
    fit();
    if (!button || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(fit);
    observer.observe(button);
    return () => observer.disconnect();
  }, [measured, folded, p.displayName, p.isLocal, p.access]);

  const iconOnly = accessBadge === 'icon' || (measured && folded);
  return (
    <button
      ref={buttonRef}
      data-ui-part=""
      type="button"
      onClick={onClick}
      className={cn(
        // overflow-hidden: whatever happens inside, nothing paints under the
        // ⋯ button that follows. The focus outline is inset for the same reason.
        'min-w-0 flex-1 flex items-center gap-2.5 overflow-hidden py-2 pl-4 text-left transition-colors',
        trailing ? 'pr-1' : 'pr-4',
        'hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
        speaking && 'bg-white/[0.04]',
        onClick ? 'cursor-pointer' : 'cursor-default',
      )}
      disabled={!onClick}
      data-access-badge={p.access ? (iconOnly ? 'icon' : 'label') : undefined}
    >
      <div
        className={cn(
          'relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0',
          'bg-[var(--color-primary)] text-white',
          speaking && 'ring-2 ring-success ring-offset-2 ring-offset-[var(--color-surface)]',
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
      {/* The block shrinks (min-w-0) and clips (overflow-hidden), so "(you)"
          never paints under the chips; inside it only the name gives way. */}
      <span ref={blockRef} className={cn('flex min-w-0 flex-1 items-baseline gap-1 overflow-hidden text-sm', dark ? 'text-white/90' : 'text-[var(--color-text-primary)]')} data-testid="roster-name">
        <Tooltip content={p.displayName} onlyWhenTruncated triggerClassName="flex min-w-0" data-testid="roster-name-tooltip">
          <span ref={nameRef} className="min-w-0 truncate">{p.displayName}</span>
        </Tooltip>
        {p.isLocal && (
          <span ref={youRef} className={cn('shrink-0 text-xs', dark ? 'text-white/50' : 'text-[var(--color-text-secondary)]')} data-testid="roster-you">(you)</span>
        )}
      </span>
      {p.access && (
        <span ref={chipRef} className="inline-flex shrink-0">
          <ParticipantAccessBadge access={p.access} tone={dark ? 'overlay' : 'chip'} iconOnly={iconOnly} data-testid="roster-access" />
        </span>
      )}
      <RaisedHandBadge raised={p.handRaised} tone={dark ? 'overlay' : 'chip'} data-testid="roster-raised-hand" />
      {p.isMuted && (
        <svg
          width="14" height="14" viewBox="0 0 16 16"
          className={cn('shrink-0', dark ? 'text-white/50' : 'text-[var(--color-text-secondary)]')} aria-label="Muted"
        >
          <path
            fill="currentColor"
            d="M8 1a3 3 0 00-3 3v4a3 3 0 006 0V4a3 3 0 00-3-3zM3 9a5 5 0 0010 0h-1a4 4 0 01-8 0H3zm5 4a3 3 0 01-3-3H4a4 4 0 008 0h-1a3 3 0 01-3 3zm4-13l-12 12 0.7 0.7 12-12L12 0z"
          />
        </svg>
      )}
    </button>
  );
}

export default RosterPanel;
