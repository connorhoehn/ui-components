// PresenceAvatars — stacked avatar row for online users.
//
// Shows up to `maxVisible` avatars; overflows to a "+N" chip.
// Composes Avatar + StatusDot.

import { Avatar } from './Avatar';
import { StatusDot } from './StatusDot';
import { cn } from '../../lib/cn';

export interface PresenceUser {
  /** Unique identifier for the user */
  id: string;
  name: string;
  /** Optional avatar image URL */
  avatarUrl?: string;
  online?: boolean;
}

export interface PresenceAvatarsProps {
  users: PresenceUser[];
  /** Maximum avatars to render before "+N" chip (default 5) */
  maxVisible?: number;
  /** Avatar diameter in px (default 28) */
  size?: number;
  /** Called when the "+N" overflow chip is clicked */
  onMoreClick?: () => void;
  className?: string;
}

export function PresenceAvatars({
  users,
  maxVisible = 5,
  size = 28,
  onMoreClick,
  className,
}: PresenceAvatarsProps) {
  const visible = users.slice(0, maxVisible);
  const overflow = users.length - visible.length;
  const overlap = -(size * 0.3);
  const border = Math.max(1, Math.round(size * 0.07));

  return (
    <div className={cn('inline-flex items-center', className)} role="list" aria-label="Online users">
      {visible.map((user, index) => (
        <div
          key={user.id}
          role="listitem"
          className="relative shrink-0"
          title={user.name}
          // E2E hooks: presence-avatar (testid) + the user identity
          // pair (id + name) so test-driven assertions can find a
          // specific user without scraping aria-labels.
          data-testid="presence-avatar"
          data-presence-user={user.name}
          data-presence-user-id={user.id}
          style={{
            marginLeft: index > 0 ? overlap : 0,
          }}
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="rounded-full object-cover"
              style={{
                width: size,
                height: size,
                border: `${border}px solid white`,
              }}
            />
          ) : (
            <Avatar
              name={user.name}
              size={size}
              style={{ border: `${border}px solid white` }}
            />
          )}
          {user.online !== undefined && (
            <span className="absolute -bottom-0.5 -right-0.5">
              <StatusDot
                color={user.online ? '#22c55e' : '#94a3b8'}
                size="xs"
                aria-label={user.online ? `${user.name} online` : `${user.name} offline`}
              />
            </span>
          )}
        </div>
      ))}

      {overflow > 0 && (
        <button
          type="button"
          onClick={onMoreClick}
          disabled={!onMoreClick}
          aria-label={`${overflow} more users`}
          className={cn(
            'inline-flex items-center justify-center rounded-full shrink-0',
            'font-semibold select-none bg-slate-200 text-slate-600',
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
