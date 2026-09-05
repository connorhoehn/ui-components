// ChannelHeader — header bar for a channel / DM / thread view.
//
// Composes Avatar + StatusDot + PageHeader + IconButton into a single
// presentational bar. All state and navigation live in the caller.
//
// ## Why the tabs sit ON this bar and not under it
//
// A channel is not only its messages: the files shared in it, the documents
// bound to it, the calls recorded from it are all the same conversation seen
// from a different angle, and they belong to the channel rather than to some
// other corner of the app. Teams and Slack both put those on the channel's
// own header, which is what keeps them one place instead of a navigation
// errand.
//
// They go INLINE, to the right of the name — not on a second row. A row of
// tabs stacked under a row of identity under a row of app navigation is three
// horizontal bars before any content, and each one is cheap to add and
// expensive to live with.

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
  /**
   * Views of this channel — files, documents, recordings, pinned. Rendered
   * inline beside the name; pass a <Tabs variant="underline" size="sm">.
   * The header owns no tab state: which one is active is the caller's.
   */
  tabs?: ReactNode;
  /** Right-aligned action area */
  actions?: ReactNode;
  /** Avatar URL; falls back to name initials */
  avatarUrl?: string;
  /** Show green online indicator */
  online?: boolean;
  /** Called when member-count area is clicked */
  onMembersClick?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function ChannelHeader({
  name,
  memberCount,
  description,
  tabs,
  actions,
  avatarUrl,
  online,
  onMembersClick,
  className,
  'data-testid': testId,
}: ChannelHeaderProps) {
  return (
    <div
      data-testid={testId}
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
                color={online ? 'var(--color-success)' : 'var(--color-text-tertiary)'}
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

      {/* Middle: the channel's other views. Allowed to shrink and scroll
          rather than push the name or the actions off the bar. */}
      {tabs && (
        <div className="flex min-w-0 flex-1 items-center overflow-x-auto">
          {tabs}
        </div>
      )}

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
