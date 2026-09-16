// TeamChannelTree — the signature Teams rail section: teams as top-level
// disclosures, channels nested underneath. A person does not scan forty
// channels flat; they think "which TEAM, then which channel in it", so the
// rail has to be a tree, not a list with two indent levels bolted on.
//
// Built as a small dedicated WAI-ARIA tree (role="tree"/"treeitem", roving
// tabindex, Arrow/Home/End navigation) rather than reusing the generic
// `TreeView` — a team row carries an avatar and a Teams-specific ⋯ menu that
// a channel row does not, and a channel row carries unread/mention/mute
// badges that a team row does not. Two genuinely different row shapes, one
// level deep, is simpler hand-built than bent out of a generic one.

import { useState, useRef, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import { DropdownMenu, type DropdownMenuItem } from '../shared/DropdownMenu';
import { ChevronIcon, LockIcon, PlusIcon } from '../ui/Icons';
import { RailSectionHeader } from './RailSectionHeader';

export interface TeamChannelItem {
  channel: string;
  name: string;
  unreadCount?: number;
  mentioned?: boolean;
  muted?: boolean;
  private?: boolean;
  live?: boolean;
}

export interface TeamTreeItem {
  teamId: string;
  name: string;
  avatarUrl?: string;
  channels: readonly TeamChannelItem[];
  expanded?: boolean;
}

export interface TeamChannelTreeProps {
  teams: readonly TeamTreeItem[];
  activeChannel?: string | null;
  onSelectChannel: (channel: string) => void;
  /** Controls expansion when given; the tree keeps its own state when absent. */
  onToggleTeam?: (teamId: string, expanded: boolean) => void;
  /**
   * The + on a team row. Receives the button itself so the host can hang the
   * create form off it — beside the team it is creating in, not centred over
   * the whole app.
   */
  onCreateChannel?: (teamId: string, trigger: HTMLElement) => void;
  /** "Manage team" in the team's ⋯ menu. */
  onManageTeam?: (teamId: string) => void;
  /** "Leave team" in the team's ⋯ menu. */
  onLeaveTeam?: (teamId: string) => void;
  /** The + on the "Teams" heading. Receives the button, for the same reason. */
  onCreateTeam?: (trigger: HTMLElement) => void;
  /** Hides the "Teams" heading for a host that draws its own. */
  heading?: string | false;
  className?: string;
  'data-testid'?: string;
}

/** `CSS.escape` where it exists (jsdom has it; older engines do not). */
function cssEscape(value: string): string {
  return typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(value) : value;
}

type Row =
  | { id: string; kind: 'team'; teamId: string }
  | { id: string; kind: 'channel'; teamId: string; channel: string };

export function TeamChannelTree({
  teams,
  activeChannel = null,
  onSelectChannel,
  onToggleTeam,
  onCreateChannel,
  onManageTeam,
  onLeaveTeam,
  onCreateTeam,
  heading = 'Teams',
  className,
  'data-testid': testId = 'team-channel-tree',
}: TeamChannelTreeProps) {
  const isControlled = onToggleTeam !== undefined;
  const [ownExpanded, setOwnExpanded] = useState<Set<string>>(
    () => new Set(teams.filter((t) => t.expanded).map((t) => t.teamId)),
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const isExpanded = (team: TeamTreeItem): boolean =>
    isControlled ? !!team.expanded : ownExpanded.has(team.teamId);

  const setTeamExpanded = (teamId: string, next: boolean) => {
    onToggleTeam?.(teamId, next);
    if (isControlled) return;
    setOwnExpanded((prev) => {
      if (prev.has(teamId) === next) return prev;
      const updated = new Set(prev);
      if (next) updated.add(teamId);
      else updated.delete(teamId);
      return updated;
    });
  };

  const toggleTeam = (teamId: string) => {
    const team = teams.find((t) => t.teamId === teamId);
    if (!team) return;
    setTeamExpanded(teamId, !isExpanded(team));
  };

  // The flat, VISIBLE run of rows — what Up/Down/Home/End walk. Only a
  // team's channels count when that team is expanded.
  const visibleRows: Row[] = [];
  for (const team of teams) {
    visibleRows.push({ id: `team:${team.teamId}`, kind: 'team', teamId: team.teamId });
    if (isExpanded(team)) {
      for (const ch of team.channels) {
        visibleRows.push({ id: `channel:${ch.channel}`, kind: 'channel', teamId: team.teamId, channel: ch.channel });
      }
    }
  }

  const tabTargetId =
    focusedId && visibleRows.some((r) => r.id === focusedId)
      ? focusedId
      : activeChannel && visibleRows.some((r) => r.kind === 'channel' && r.channel === activeChannel)
        ? `channel:${activeChannel}`
        : (visibleRows[0]?.id ?? null);

  const focusRow = (id: string | null) => {
    if (!id) return;
    setFocusedId(id);
    rootRef.current?.querySelector<HTMLElement>(`[data-row-id="${cssEscape(id)}"]`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const rowEl = (event.target as HTMLElement).closest<HTMLElement>('[role="treeitem"]');
    const id = rowEl?.dataset.rowId;
    if (!id) return;
    const index = visibleRows.findIndex((r) => r.id === id);
    if (index < 0) return;
    const row = visibleRows[index];
    const team = teams.find((t) => t.teamId === row.teamId);
    if (!team) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusRow(visibleRows[Math.min(index + 1, visibleRows.length - 1)]?.id ?? null);
        return;
      case 'ArrowUp':
        event.preventDefault();
        focusRow(visibleRows[Math.max(index - 1, 0)]?.id ?? null);
        return;
      case 'Home':
        event.preventDefault();
        focusRow(visibleRows[0]?.id ?? null);
        return;
      case 'End':
        event.preventDefault();
        focusRow(visibleRows[visibleRows.length - 1]?.id ?? null);
        return;
      case 'ArrowRight':
        event.preventDefault();
        if (row.kind === 'team') {
          if (!isExpanded(team)) {
            setTeamExpanded(team.teamId, true);
          } else {
            const next = visibleRows[index + 1];
            if (next && next.kind === 'channel' && next.teamId === team.teamId) focusRow(next.id);
          }
        }
        return;
      case 'ArrowLeft':
        event.preventDefault();
        if (row.kind === 'team') {
          if (isExpanded(team)) setTeamExpanded(team.teamId, false);
        } else {
          setTeamExpanded(row.teamId, false);
          focusRow(`team:${row.teamId}`);
        }
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (row.kind === 'team') toggleTeam(row.teamId);
        else onSelectChannel(row.channel);
        return;
      default:
    }
  };

  // The heading sits OUTSIDE role="tree": a tree's children have to be
  // treeitems, and a stray <div> in there makes a reader announce a phantom
  // item before the first team.
  return (
    <div className={cn('flex flex-col', className)}>
      {heading !== false && (
        <RailSectionHeader
          label={heading}
          presentational={false}
          className="pt-2"
          actions={
            onCreateTeam
              ? [{
                  label: 'Create a team',
                  onClick: (trigger) => onCreateTeam(trigger),
                  'data-testid': `${testId}-create-team`,
                }]
              : []
          }
          data-testid={`${testId}-heading`}
        />
      )}
      <div
        ref={rootRef}
        role="tree"
        aria-label={heading === false ? 'Teams' : undefined}
        aria-labelledby={undefined}
        className="flex flex-col gap-0.5"
        data-testid={testId}
        onKeyDown={onKeyDown}
      >
      {teams.map((team) => {
        const expanded = isExpanded(team);
        const teamRowId = `team:${team.teamId}`;
        const isCursor = tabTargetId === teamRowId;

        // "Add channel" is NOT in here. It used to be, and a create action
        // two clicks deep behind a ⋯ that only appears on hover is one people
        // report as missing — this user did. It is a visible + on the row now.
        const menuItems: DropdownMenuItem[] = [];
        if (onManageTeam) {
          menuItems.push({
            label: 'Manage team',
            onSelect: () => onManageTeam(team.teamId),
            'data-testid': `${testId}-team-${team.teamId}-menu-manage`,
          });
        }
        if (onLeaveTeam) {
          menuItems.push({
            label: 'Leave team',
            onSelect: () => onLeaveTeam(team.teamId),
            'data-testid': `${testId}-team-${team.teamId}-menu-leave`,
          });
        }

        return (
          <div key={team.teamId}>
            <div
              role="treeitem"
              aria-expanded={expanded}
              aria-level={1}
              tabIndex={isCursor ? 0 : -1}
              data-row-id={teamRowId}
              data-testid={`${testId}-team-${team.teamId}`}
              onClick={() => toggleTeam(team.teamId)}
              onFocus={() => setFocusedId(teamRowId)}
              className={cn(
                'group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left',
                'hover:bg-surface-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
              )}
            >
              <ChevronIcon
                dir={expanded ? 'down' : 'right'}
                size={14}
                className="shrink-0 text-text-tertiary transition-transform"
              />
              <Avatar name={team.name} src={team.avatarUrl} size={22} />
              <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary">
                {team.name}
              </span>
              {onCreateChannel && (
                <button
                  type="button"
                  title={`Create a channel in ${team.name}`}
                  aria-label={`Create a channel in ${team.name}`}
                  tabIndex={isCursor ? 0 : -1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateChannel(team.teamId, e.currentTarget);
                  }}
                  data-testid={`${testId}-team-${team.teamId}-add-channel`}
                  className={cn(
                    'grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border-none bg-transparent p-0',
                    'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                    'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
                    '[@media(hover:none)]:opacity-100',
                    'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                >
                  <PlusIcon size={14} />
                </button>
              )}
              {menuItems.length > 0 && (
                <span
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    'shrink-0 opacity-0 transition-opacity',
                    'group-hover:opacity-100 group-focus-within:opacity-100',
                    'has-[[aria-expanded=true]]:opacity-100',
                    '[@media(hover:none)]:opacity-100',
                  )}
                >
                  <DropdownMenu
                    trigger={<span aria-hidden className="leading-none tracking-wide">⋯</span>}
                    triggerLabel={`More options for ${team.name}`}
                    triggerTitle="More options"
                    triggerTabIndex={isCursor ? 0 : -1}
                    triggerTestId={`${testId}-team-${team.teamId}-menu`}
                    triggerClassName="h-6 w-6 rounded-md border-0 p-0 text-[13px] text-text-secondary hover:bg-surface-hover"
                    align="end"
                    sections={[{ items: menuItems }]}
                    data-testid={`${testId}-team-${team.teamId}-menu-panel`}
                  />
                </span>
              )}
            </div>

            {expanded && team.channels.map((ch) => {
              const channelRowId = `channel:${ch.channel}`;
              const isChannelCursor = tabTargetId === channelRowId;
              const isActive = ch.channel === activeChannel;
              const unread = ch.unreadCount ?? 0;
              const muted = !!ch.muted;

              return (
                <div
                  key={ch.channel}
                  role="treeitem"
                  aria-level={2}
                  aria-selected={isActive}
                  tabIndex={isChannelCursor ? 0 : -1}
                  data-row-id={channelRowId}
                  data-testid={`${testId}-channel-${ch.channel}`}
                  data-active={isActive ? 'true' : 'false'}
                  onClick={() => onSelectChannel(ch.channel)}
                  onFocus={() => setFocusedId(channelRowId)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-left text-[13px]',
                    'hover:bg-surface-hover',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                    isActive && 'bg-surface-hover',
                  )}
                >
                  <span
                    aria-hidden={!ch.private}
                    className="flex h-4 w-4 shrink-0 items-center justify-center text-text-tertiary"
                  >
                    {ch.private ? <LockIcon size={12} /> : '#'}
                  </span>
                  <span
                    className={cn(
                      'min-w-0 flex-1 truncate',
                      unread > 0 ? 'font-semibold' : 'font-medium',
                      'text-text-primary',
                    )}
                  >
                    {ch.name}
                  </span>
                  {ch.mentioned && (
                    <span
                      data-testid={`${testId}-channel-${ch.channel}-mention`}
                      aria-label="You were mentioned"
                      title="You were mentioned"
                      className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-danger text-[10px] font-bold leading-none text-white"
                    >
                      @
                    </span>
                  )}
                  {ch.live && (
                    <span
                      data-testid={`${testId}-channel-${ch.channel}-live`}
                      aria-label="Call in progress"
                      title="Call in progress"
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white"
                    >
                      Live
                    </span>
                  )}
                  {unread > 0 && (
                    <span
                      data-testid={`${testId}-channel-${ch.channel}-unread`}
                      data-muted={muted ? 'true' : 'false'}
                      className={cn(
                        'grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none',
                        muted ? 'bg-surface-inset text-text-secondary' : 'bg-primary text-white',
                      )}
                    >
                      {unread > 99 ? '99+' : unread}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      </div>
    </div>
  );
}

export default TeamChannelTree;
