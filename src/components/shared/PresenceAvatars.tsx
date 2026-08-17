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
  className?: string;
}

/**
 * Status-dot color resolution. `idle` takes precedence over `online`
 * because a user can be "online + away" (we want amber, not green).
 */
function resolveDotColor(user: PresenceUser): string | null {
  if (user.idle === true) return '#f59e0b';     // amber
  if (user.online === false) return '#94a3b8';  // slate
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

export function PresenceAvatars({
  users,
  maxVisible = 5,
  size = 28,
  onMoreClick,
  onUserClick,
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
        const title = titleParts.join(' — ');

        // E2E hooks shared across both rendered shapes (button + div).
        const dataAttrs = {
          'data-testid': 'presence-avatar',
          'data-presence-user': user.name,
          'data-presence-user-id': user.id,
          ...(isIdle ? { 'data-presence-idle': 'true' } : {}),
          ...(user.mode ? { 'data-presence-mode': user.mode } : {}),
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
                className="absolute flex items-center justify-center rounded-full bg-white border border-border select-none"
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
        if (onUserClick) {
          return (
            <button
              key={user.id}
              type="button"
              role="listitem"
              onClick={(e) => {
                e.stopPropagation();
                onUserClick(user.id);
              }}
              className="relative shrink-0 p-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info rounded-full"
              title={title}
              aria-label={title}
              {...dataAttrs}
              style={sharedStyle}
            >
              {inner}
            </button>
          );
        }
        return (
          <div
            key={user.id}
            role="listitem"
            className="relative shrink-0"
            title={title}
            {...dataAttrs}
            style={sharedStyle}
          >
            {inner}
          </div>
        );
      })}

      {overflow > 0 && (
        <button
          type="button"
          onClick={onMoreClick}
          disabled={!onMoreClick}
          aria-label={`${overflow} more users`}
          className={cn(
            'inline-flex items-center justify-center rounded-full shrink-0',
            'font-semibold select-none bg-slate-200 text-text-secondary',
            onMoreClick && 'cursor-pointer hover:bg-slate-300',
            !onMoreClick && 'cursor-default',
            'border-white',
          )}
          style={{
            width: size,
            height: size,
            fontSize: size * 0.34,
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
