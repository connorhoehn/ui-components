// ChannelHeader — header bar for a channel / DM / thread view.
//
// Composes Avatar + StatusDot + PageHeader + IconButton into a single
// presentational bar. All state and navigation live in the caller.

import type { ReactNode } from 'react';
import { Avatar } from './Avatar';
import { StatusDot } from './StatusDot';
import { cn } from '../../lib/cn';

export interface ChannelHeaderProps {
  /** Display name of the channel or user */
  name: string;
  /** Number of members in the channel */
  memberCount?: number;
  /** Short description shown below the name */
  description?: string;
  /** Right-aligned action area */
  actions?: ReactNode;
  /** Avatar URL; falls back to name initials */
  avatarUrl?: string;
  /** Show green online indicator */
  online?: boolean;
  /** Called when member-count area is clicked */
  onMembersClick?: () => void;
  className?: string;
}

export function ChannelHeader({
  name,
  memberCount,
  description,
  actions,
  avatarUrl,
  online,
  onMembersClick,
  className,
}: ChannelHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 px-6 py-3',
        'border-b border-[var(--color-border)] bg-[var(--color-surface)]',
        className,
      )}
    >
      {/* Left: avatar + name + status */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <Avatar name={name} size={36} />
          )}
          {online !== undefined && (
            <span className="absolute -bottom-0.5 -right-0.5">
              <StatusDot
                color={online ? '#22c55e' : '#94a3b8'}
                size="sm"
                aria-label={online ? 'Online' : 'Offline'}
              />
            </span>
          )}
        </div>

        <div className="min-w-0 flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate">
              {name}
            </h2>
            {memberCount !== undefined && (
              <button
                type="button"
                onClick={onMembersClick}
                disabled={!onMembersClick}
                className={cn(
                  'text-[11px] font-medium text-[var(--color-text-tertiary)]',
                  'bg-transparent border-none p-0 leading-none',
                  onMembersClick && 'cursor-pointer hover:text-[var(--color-text-secondary)]',
                  !onMembersClick && 'cursor-default',
                )}
              >
                {memberCount} {memberCount === 1 ? 'member' : 'members'}
              </button>
            )}
          </div>
          {description && (
            <p className="text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Right: actions */}
      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export default ChannelHeader;
