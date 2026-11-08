// PresenceAvatars — stacked avatar row for online users.
//
// Shows up to `maxVisible` avatars; overflows to a "+N" chip.
// Composes Avatar + StatusDot.
//
// Per-user fields support real-time-collab scenarios:
//   - `color` overrides the auto-computed avatar background so the tile
//     matches a CRDT cursor color elsewhere in the UI.
//   - `idle` dims the avatar and flips the status dot from green → amber,
//     signalling the user is present but away from keyboard.
//   - `mode` renders a small editor/reviewer/reader badge on the avatar.
//   - `onUserClick` makes each avatar a clickable button (e.g. "jump to
//     this collaborator's cursor position").
//
// All four are optional and additive — consumers that don't pass them
// see the original behaviour unchanged.

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Avatar } from './Avatar';
import { StatusDot } from './StatusDot';
import { cn } from '../../lib/cn';

export type PresenceMode = 'editor' | 'reviewer' | 'reader';

/** Internal map: mode → visible glyph + a11y label. Consumers don't
 *  override this today — open a future-extension door for a render-prop
 *  override if a downstream needs to (kept internal for now to avoid
 *  shape churn). */
const MODE_GLYPHS: Record<PresenceMode, { glyph: string; label: string }> = {
  editor:   { glyph: '✏', label: 'Editing' },     // pencil
  reviewer: { glyph: '✔', label: 'Reviewing' },   // check
  reader:   { glyph: '👁', label: 'Viewing' }, // eye
};

export interface PresenceUser {
  /** Unique identifier for the user. Passed back to `onUserClick`. */
  id: string;
  name: string;
  /** Optional avatar image URL. Wins over `color` when present. */
  avatarUrl?: string;
  /** Online flag. Drives the status dot when `idle` is not set:
   *  `undefined`/`true` → green; `false` → gray. */
  online?: boolean;
  /** Override the auto-computed avatar background. Useful when the
   *  user identity needs to match a CRDT cursor color elsewhere. */
  color?: string;
  /** Present but away. Dims the avatar (alpha-blends `color` when
   *  provided, otherwise drops opacity) and flips the status dot to
   *  amber. Wins over `online` for the dot color. */
  idle?: boolean;
  /** Optional editing mode — renders a small mode badge on the
   *  upper-right of the avatar (pencil / check / eye). */
  mode?: PresenceMode;
  /** One status line — "editing", "away · 3m", a status message. Free text
   *  because the library does not know the host's vocabulary. Shown in the
   *  hover card, and appended to the avatar's own tooltip ("Ada — Away: back
   *  at 3") when there is no card. */
  detail?: string;
  /** Where in the surface the user is — a section title, a pane name.
   *  Rendered under the detail line on the hover card. */
  location?: string;
}

export interface PresenceAvatarsProps {
  users: PresenceUser[];
  /** Maximum avatars to render before "+N" chip (default 5) */
  maxVisible?: number;
  /** Avatar diameter in px (default 28) */
  size?: number;
  /** Called when the "+N" overflow chip is clicked */
  onMoreClick?: () => void;
  /** Called with the user's `id` when an avatar is clicked. When set,
   *  each avatar becomes a `<button>` for keyboard + screen-reader
   *  accessibility; when omitted, items render as `<div>` (back-compat
   *  with consumers that just want a static row). */
  onUserClick?: (id: string) => void;
  /**
   * Enables follow mode: each avatar grows a hover/focus card (name, detail,
   * location) with a Follow action. Click stays `onUserClick` — jump once —
   * and follow is the card's explicit verb, because a bubble that follows on
   * bare click turns every glance into a mode change.
   *
   * The card replaces the native `title` tooltip when set; two tooltips
   * fighting over one hover is worse than either.
   */
  onFollowUser?: (id: string) => void;
  /** The user currently being followed, so their card offers Stop instead. */
  followingUserId?: string | null;
  className?: string;
}

/**
 * Status-dot color resolution. `idle` takes precedence over `online`
 * because a user can be "online + away" (we want amber, not green).
 */
function resolveDotColor(user: PresenceUser): string | null {
  if (user.idle === true) return '#f59e0b';     // amber
  if (user.online === false) return 'var(--color-text-tertiary)';  // slate
  if (user.online === true) return '#22c55e';   // green
  return null; // `online` undefined and !idle → no dot rendered
}

/**
 * Dim a color when the user is idle. Hex `#RRGGBB` → `#RRGGBB99` (60%
 * alpha). For non-hex inputs (CSS named colors, rgb(), etc.) just
 * returns the original — the dimming falls back to the wrapper's
 * `opacity` style.
 */
function dimColor(color: string | undefined): string | undefined {
  if (!color) return undefined;
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return `${color}99`;
  if (/^#[0-9a-fA-F]{8}$/.test(color)) return color; // already alpha
  return color; // non-hex — caller's responsibility
}

/**
 * The box a card must stay inside: the viewport, narrowed by every ancestor
 * that clips (overflow other than visible) — a byline at the left edge of a
 * pane is clipped by the PANE, not the window.
 */
export function clippingBounds(el: HTMLElement): { left: number; right: number; top: number; bottom: number } {
  const view = el.ownerDocument.defaultView;
  const bounds = { left: 0, top: 0, right: view?.innerWidth ?? Infinity, bottom: view?.innerHeight ?? Infinity };
  for (let node = el.parentElement; node && node !== el.ownerDocument.body; node = node.parentElement) {
    const style = view?.getComputedStyle(node);
    if (!style) break;
    const clips = (value: string) => value !== '' && value !== 'visible';
    const clipsX = clips(style.overflowX || style.overflow);
    const clipsY = clips(style.overflowY || style.overflow);
    if (!clipsX && !clipsY) continue;
    const r = node.getBoundingClientRect();
    if (clipsX) { bounds.left = Math.max(bounds.left, r.left); bounds.right = Math.min(bounds.right, r.right); }
    if (clipsY) { bounds.top = Math.max(bounds.top, r.top); bounds.bottom = Math.min(bounds.bottom, r.bottom); }
  }
  return bounds;
}

/** Keeps a card this far inside its clipping box. */
const CARD_EDGE = 8;

/**
 * The hover/focus card behind an avatar when follow mode is on.
 *
 * A separate component because it owns hover state with a leave grace: the
 * card sits below the avatar with a gap, and a tooltip that vanishes the
 * moment the pointer crosses that gap has an unreachable button in it.
 */
function AvatarWithCard({ user, isFollowing, onFollow, children }: {
  user: PresenceUser;
  isFollowing: boolean;
  onFollow: (id: string) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // Collision-aware placement: centred under the avatar, then SHIFTED to stay
  // inside whatever clips it, and flipped above when there is no room below.
  // Measured once per opening, from the unshifted position.
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [place, setPlace] = useState<{ shift: number; above: boolean }>({ shift: 0, above: false });
  useLayoutEffect(() => {
    if (!open) { setPlace({ shift: 0, above: false }); return; }
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return; // no layout (tests, hidden tab)
    const b = clippingBounds(card);
    let shift = 0;
    if (r.left < b.left + CARD_EDGE) shift = b.left + CARD_EDGE - r.left;
    else if (r.right > b.right - CARD_EDGE) shift = b.right - CARD_EDGE - r.right;
    const anchor = card.parentElement?.getBoundingClientRect();
    const roomAbove = anchor ? anchor.top - b.top : 0;
    const above = r.bottom > b.bottom - CARD_EDGE && roomAbove > r.height + CARD_EDGE;
    setPlace({ shift: Math.round(shift), above });
  }, [open]);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => {
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
    setOpen(true);
  };
  const hide = () => { hideTimer.current = setTimeout(() => setOpen(false), 150); };
  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
    >
      {children}
      {open && (
        <div
          ref={cardRef}
          role="tooltip"
          data-testid="presence-card"
          data-placement={place.above ? 'top' : 'bottom'}
          onMouseEnter={show}
          onMouseLeave={hide}
          // Only a custom property: the measured shift, read by the class below.
          style={{ '--presence-card-shift': `${place.shift}px` } as CSSProperties}
          className={cn(
            'absolute left-1/2 z-50 min-w-[140px] translate-x-[calc(-50%+var(--presence-card-shift,0px))] rounded-md border border-border bg-surface px-2.5 py-2 text-left shadow-lg',
            place.above ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
          )}
        >
          <div className="text-[12px] font-semibold text-text-primary whitespace-nowrap">{user.name}</div>
          {user.detail && (
            <div className="text-xs text-text-tertiary whitespace-nowrap">{user.detail}</div>
          )}
          {user.location && (
            <div className="text-xs text-text-tertiary whitespace-nowrap mt-0.5">§ {user.location}</div>
          )}
          <button
            data-ui-part=""
            type="button"
            onClick={(e) => { e.stopPropagation(); onFollow(user.id); }}
            className={cn(
              'mt-1.5 text-[11px] font-semibold bg-transparent border-0 p-0 cursor-pointer',
              isFollowing ? 'text-warning' : 'text-info',
            )}
          >
            {isFollowing ? 'Stop following' : 'Follow'}
          </button>
        </div>
      )}
    </span>
  );
}

export function PresenceAvatars({
  users,
  maxVisible = 5,
  size = 28,
  onMoreClick,
  onUserClick,
  onFollowUser,
  followingUserId = null,
  className,
}: PresenceAvatarsProps) {
  const visible = users.slice(0, maxVisible);
  const overflow = users.length - visible.length;
  const overlap = -(size * 0.3);
  const border = Math.max(1, Math.round(size * 0.07));
  const modeBadgeSize = Math.max(10, Math.round(size * 0.42));

  return (
    <div className={cn('inline-flex items-center', className)} role="list" aria-label="Online users">
      {visible.map((user, index) => {
        const dotColor = resolveDotColor(user);
        const isIdle = user.idle === true;
        const effectiveColor = isIdle ? dimColor(user.color) : user.color;
        // Wrapper opacity is the idle fallback when no explicit color
        // is provided (Avatar derives its own background from name).
        const wrapperOpacity = isIdle && !user.color ? 0.6 : undefined;
        const modeInfo = user.mode ? MODE_GLYPHS[user.mode] : null;
        const titleParts = [user.name];
        if (isIdle) titleParts.push('Away');
        else if (modeInfo) titleParts.push(modeInfo.label);
        // The status message rides in the same tooltip, after the name and
        // state: "Ada — Away: back at 3". Without `detail` the title is
        // unchanged.
        const title = titleParts.join(' — ') + (user.detail ? `: ${user.detail}` : '');

        // E2E hooks shared across both rendered shapes (button + div).
        const dataAttrs = {
          'data-testid': 'presence-avatar',
          'data-presence-user': user.name,
          'data-presence-user-id': user.id,
          ...(isIdle ? { 'data-presence-idle': 'true' } : {}),
          ...(user.mode ? { 'data-presence-mode': user.mode } : {}),
          ...(user.detail ? { 'data-presence-detail': user.detail } : {}),
        };

        const inner = (
          <>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="rounded-full object-cover"
                style={{
                  width: size,
                  height: size,
                  border: `${border}px solid white`,
                  opacity: wrapperOpacity,
                }}
              />
            ) : (
              <Avatar
                name={user.name}
                size={size}
                color={effectiveColor}
                style={{
                  border: `${border}px solid white`,
                  opacity: wrapperOpacity,
                }}
              />
            )}
            {dotColor && (
              <span className="absolute -bottom-0.5 -right-0.5">
                <StatusDot
                  color={dotColor}
                  size="xs"
                  aria-label={
                    isIdle ? `${user.name} away`
                    : user.online === false ? `${user.name} offline`
                    : `${user.name} online`
                  }
                />
              </span>
            )}
            {modeInfo && (
              <span
                className="absolute flex items-center justify-center rounded-full bg-surface border border-border select-none"
                style={{
                  top: -border,
                  right: -border,
                  width: modeBadgeSize,
                  height: modeBadgeSize,
                  fontSize: modeBadgeSize * 0.6,
                  lineHeight: 1,
                }}
                data-testid="presence-mode-badge"
                aria-label={modeInfo.label}
              >
                {modeInfo.glyph}
              </span>
            )}
          </>
        );

        // If onUserClick is provided, render as a button for keyboard
        // + screen-reader accessibility. Otherwise stay as a div (no
        // unnecessary focusable element, back-compat with consumers
        // that want a static row).
        const sharedStyle: React.CSSProperties = {
          marginLeft: index > 0 ? overlap : 0,
        };
        // The follow card replaces the native title — two tooltips fighting
        // over one hover is worse than either. The card is a SIBLING of the
        // avatar button, never a child: a follow <button> inside the avatar
        // <button> is invalid HTML and unreachable by keyboard.
        const wrap = (node: ReactNode) =>
          onFollowUser ? (
            <AvatarWithCard
              key={user.id}
              user={user}
              isFollowing={followingUserId === user.id}
              onFollow={onFollowUser}
            >
              {node}
            </AvatarWithCard>
          ) : node;

        if (onUserClick) {
          return wrap(
            <button
              data-ui-part=""
              key={user.id}
              type="button"
              role="listitem"
              onClick={(e) => {
                e.stopPropagation();
                onUserClick(user.id);
              }}
              className="relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full"
              {...(onFollowUser ? {} : { title })}
              aria-label={title}
              {...dataAttrs}
              style={sharedStyle}
            >
              {inner}
            </button>,
          );
        }
        return wrap(
          <div
            key={user.id}
            role="listitem"
            className="relative shrink-0"
            {...(onFollowUser ? {} : { title })}
            {...dataAttrs}
            style={sharedStyle}
          >
            {inner}
          </div>,
        );
      })}

      {overflow > 0 && (
        <button
          data-ui-part=""
          type="button"
          onClick={onMoreClick}
          disabled={!onMoreClick}
          aria-label={`${overflow} more users`}
          data-ui-text="avatar"
          className={cn(
            'inline-flex items-center justify-center rounded-full shrink-0',
            'font-semibold select-none bg-surface-emphasis text-text-secondary',
            onMoreClick && 'cursor-pointer hover:bg-surface-emphasis',
            !onMoreClick && 'cursor-default',
            'border-white',
          )}
          style={{
            width: size,
            height: size,
            fontSize: Math.max(10, size * 0.34),
            marginLeft: overlap,
            border: `${border}px solid white`,
          }}
        >
          +{overflow}
        </button>
      )}
    </div>
  );
}

export default PresenceAvatars;
