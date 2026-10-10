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

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Avatar } from './Avatar';
import { StatusDot } from './StatusDot';
import { cn } from '../../lib/cn';

export interface ChannelHeaderProps {
  /** Display name of the channel or user */
  name: string;
  /**
   * Rename the conversation from its own title: double-click it and the
   * heading becomes an input in place. Enter commits, Escape abandons, and
   * blurring commits too — the same bargain every rename-in-place makes.
   *
   * IN PLACE rather than in a dialog. The thing being renamed is right there
   * and it is one field; a centred modal makes you look away from the title
   * to type its new value and then look back to see whether it took. Omit
   * for a viewer who may not rename this — the affordance should not exist
   * where the action would be refused.
   */
  onRename?: (next: string) => void;
  /** Number of members in the channel */
  memberCount?: number;
  /** Short description shown below the name */
  description?: string;
  /**
   * Views of this channel — files, documents, recordings, pinned. Rendered
   * inline beside the name; pass a <Tabs variant="underline" size="md"> (14px, the app's one tab-row step).
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
  /**
   * `sm` for a narrow column (a conversation beside a document): one row that
   * never wraps, a 28px avatar, the description dropped. The default `md` is
   * the full-width bar over a chat pane.
   */
  size?: 'md' | 'sm';
  /**
   * Element the bar renders as. Defaults to `'div'`. Pass `'header'` when a
   * host uses this as the page's own site header, so it lands as a `banner`
   * landmark instead of an anonymous `div`.
   */
  as?: 'div' | 'header';
  className?: string;
  'data-testid'?: string;
}

export function ChannelHeader({
  name,
  onRename,
  memberCount,
  description,
  tabs,
  actions,
  avatarUrl,
  online,
  onMembersClick,
  size = 'md',
  as = 'div',
  className,
  'data-testid': testId,
}: ChannelHeaderProps) {
  const small = size === 'sm';
  const Root = as;

  // ── Rename in place ──────────────────────────────────────────────────
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const input = useRef<HTMLInputElement>(null);
  // A rename that lands from somewhere else (another tab, the row menu) while
  // this is closed must not be overwritten by a stale draft when it opens.
  useEffect(() => { if (!editing) setDraft(name); }, [name, editing]);
  useEffect(() => {
    if (!editing) return;
    input.current?.focus();
    // Selected, not just focused: double-clicking a title means "replace
    // this", and making someone clear it by hand first is a chore.
    input.current?.select();
  }, [editing]);
  const commit = () => {
    const next = draft.trim();
    setEditing(false);
    // Unchanged or emptied is a no-op, not a rename to "". Nobody double-
    // clicks a title, changes nothing, and means "save that".
    if (!next || next === name) { setDraft(name); return; }
    onRename?.(next);
  };
  const cancel = () => { setDraft(name); setEditing(false); };

  return (
    <Root
      data-testid={testId}
      data-size={size}
      className={cn(
        '@container flex items-center justify-between',
        small ? 'flex-nowrap gap-x-2 px-3 py-2' : 'flex-wrap gap-x-4 gap-y-1 px-6 py-3',
        'border-b border-[var(--color-border)] bg-[var(--color-surface)]',
        className,
      )}
    >
      {/* Left: avatar + name + status */}
      <div className={cn('flex min-w-0 items-center', small ? 'gap-2' : 'gap-3')}>
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className={small ? 'h-7 w-7 rounded-full object-cover' : 'w-9 h-9 rounded-full object-cover'}
            />
          ) : (
            <Avatar name={name} size={small ? 28 : 36} />
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
            {editing ? (
              <input
                ref={input}
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 100))}
                maxLength={100}
                aria-label="Conversation name"
                data-testid={testId ? `${testId}-name-input` : 'channel-header-name-input'}
                // Blur commits. The alternative — blur abandons — loses work
                // for anyone who clicks away expecting a save, and this is one
                // short field whose old value is one Escape away while typing
                // and one more rename away afterwards.
                onBlur={commit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); commit(); }
                  else if (e.key === 'Escape') { e.preventDefault(); cancel(); }
                  // The header sits inside surfaces with their own key
                  // handling; a rename typing "e" should not trigger anything
                  // listening further up.
                  e.stopPropagation();
                }}
                className={cn(
                  'min-w-0 rounded border border-primary bg-surface px-1 py-0 font-semibold text-[var(--color-text-primary)] leading-tight outline-none',
                  small ? 'text-[13px]' : 'text-xl',
                )}
              />
            ) : (
              <h2
                className={cn(
                  'font-semibold text-[var(--color-text-primary)] leading-tight truncate',
                  small ? 'text-[13px]' : 'text-xl',
                  onRename && 'cursor-text',
                )}
                onDoubleClick={onRename ? () => setEditing(true) : undefined}
                title={onRename ? 'Double-click to rename' : undefined}
                data-testid={testId ? `${testId}-name` : undefined}
              >
                {name}
              </h2>
            )}
            {/* A button only when there is somewhere to go.
                Without a handler this rendered a DISABLED button, which a
                screen reader announces as "12 members, button, dimmed" — a
                control that is broken rather than a fact about the channel.
                It is a fact about the channel; static text says so. */}
            {memberCount !== undefined && (
              onMembersClick ? (
                <button
                  type="button"
                  onClick={onMembersClick}
                  data-testid="channel-header-members"
                  aria-label={`${memberCount} ${memberCount === 1 ? 'member' : 'members'} — open the member list`}
                  className={cn(
                    'text-[11px] font-medium text-[var(--color-text-tertiary)]',
                    'bg-transparent border-none p-0 leading-none',
                    'cursor-pointer hover:text-[var(--color-text-secondary)]',
                  )}
                >
                  {memberCount} {memberCount === 1 ? 'member' : 'members'}
                </button>
              ) : (
                <span
                  data-testid="channel-header-members"
                  className="text-[11px] font-medium leading-none text-[var(--color-text-tertiary)]"
                >
                  {memberCount} {memberCount === 1 ? 'member' : 'members'}
                </span>
              )
            )}
          </div>
          {description && !small && (
            <p className="text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Middle: the channel's other views. Never clipped: when the bar is too
          narrow for identity + tabs + actions on one line, the tabs (and the
          actions after them) wrap onto a second line under the name. */}
      {tabs && (
        // Narrow bar (a chat pane beside a document): the tabs take a full row
        // of their own UNDER the name. Scroll within that row when the split
        // is narrower than the tabs; never force the pane beyond its width.
        // Full size: the tabs never shrink below their own width (`flex-[1_0_auto]`);
        // when identity + tabs + actions do not fit, the row wraps and the tabs
        // drop to a line of their own instead of the last one clipping to "Call".
        <div className={cn('flex max-w-full items-center overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full', small ? 'min-w-0 flex-1' : 'flex-[1_0_auto]')}>
          {tabs}
        </div>
      )}

      {/* Right: actions */}
      {actions && (
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </Root>
  );
}

export default ChannelHeader;
