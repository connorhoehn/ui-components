// ui-components/src/components/video/CallPeopleList.tsx
//
// Everyone on (or rung for) a call, one 64px row each: avatar with presence,
// name, one sub-status, their mic state and a ⋯ menu. The sub-status is ONE
// word, chosen by precedence, so a row never stacks three badges:
//
//   in the call:  View only › Presenting › Sharing screen › Camera off › Reconnecting…
//   not in it:    Ringing… (pulsing) · Offline · notified · Didn't answer (+ Ring again) · Declined · Left
//
// and "Host" when nothing else applies (prefixed "Host · " when something
// does). Rows for people who are not in the call are dimmed.
//
// A host adds its own entries to a row's ⋯ menu with `rowMenu` (sections
// after the built-in ones, e.g. "Make view-only"); a person's `access` is the
// "View only" sub-status.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { PresenceDot } from '../shared/PresenceDot';
import { DropdownMenu, type DropdownMenuItem, type DropdownMenuSection } from '../shared/DropdownMenu';
import { Button } from '../ui/Button';
import { EyeIcon } from '../ui/Icons';
import { MicIcon, MicOffIcon, MonitorIcon, MoreHorizontalIcon } from './MediaIcons';
import { participantAccessInfo, type ParticipantAccess } from './ParticipantAccessBadge';

export interface CallPerson {
  userId: string;
  name: string;
  avatarUrl?: string;
  color?: string;
  isLocal: boolean;
  isHost: boolean;
  presence?: 'online' | 'away' | 'offline';
  state: 'in-call' | 'ringing' | 'notified' | 'missed' | 'declined' | 'left' | 'reconnecting';
  audioOn: boolean;
  cameraOn: boolean;
  screenSharing: boolean;
  presenting: boolean;
  /**
   * Less than full access: `view-only` (the host stopped this person
   * publishing). While in the call it is the row's sub-status, "View only",
   * ahead of presenting / sharing / camera off. Absent: may publish.
   */
  access?: ParticipantAccess;
}

export interface CallPeopleListProps {
  people: CallPerson[];
  /** The number in the heading badge (people in the call). */
  count: number;
  followingUserId?: string | null;
  /** Host controls: Mute, Remove from call, Make host. */
  canModerate: boolean;
  onInvite: () => void;
  onFollow: (userId: string | null) => void;
  onMuteForMe: (userId: string) => void;
  onMute?: (userId: string) => void;
  onRemove?: (userId: string) => void;
  onMakeHost?: (userId: string) => void;
  onRingAgain?: (userId: string) => void;
  /** Your own row's ⋯ menu (2.391.1, mockup 06): "Call settings". */
  onOpenSelfSettings?: () => void;
  /** Your own row's ⋯ menu: "Leave call". */
  onLeave?: () => void;
  /** Hide the "People N · Invite…" heading (a host that draws its own). */
  hideHeading?: boolean;
  /**
   * More entries for a row's ⋯ menu, as sections drawn after the built-in
   * items ("Make view-only", "Allow publishing"). Return `null` or an empty
   * array for a row with nothing to add. Same contract as RosterPanel's and
   * TreeView's `rowMenu`. A row whose built-in menu is empty gets the ⋯
   * button when this returns items.
   */
  rowMenu?: (person: CallPerson) => DropdownMenuSection[] | null | undefined;
  className?: string;
  'data-testid'?: string;
}

export interface CallPersonStatus {
  label: string;
  tone: 'accent' | 'muted' | 'warning';
  kind: 'view-only' | 'presenting' | 'sharing' | 'camera-off' | 'reconnecting' | 'ringing' | 'notified' | 'missed' | 'declined' | 'left' | 'host' | 'none';
}

/** The one sub-status a row shows. Exported for hosts and tests. */
export function callPersonStatus(p: CallPerson): CallPersonStatus {
  let base: CallPersonStatus | null = null;
  const access = participantAccessInfo(p.access);
  if (p.state === 'ringing') base = { label: 'Ringing…', tone: 'muted', kind: 'ringing' };
  // Offline when invited: no ring, a notification instead (SPEC §2.6). 2.395.2.
  else if (p.state === 'notified') base = { label: 'Offline · notified', tone: 'muted', kind: 'notified' };
  else if (p.state === 'missed') base = { label: "Didn't answer", tone: 'muted', kind: 'missed' };
  else if (p.state === 'declined') base = { label: 'Declined', tone: 'muted', kind: 'declined' };
  else if (p.state === 'left') base = { label: 'Left', tone: 'muted', kind: 'left' };
  // View only explains the camera, mic and share being off, so it outranks
  // them; a dropped connection (below) still outranks it.
  else if (access) base = { label: access.label, tone: 'muted', kind: 'view-only' };
  else if (p.presenting) base = { label: 'Presenting', tone: 'accent', kind: 'presenting' };
  else if (p.screenSharing) base = { label: 'Sharing screen', tone: 'accent', kind: 'sharing' };
  else if (!p.cameraOn) base = { label: 'Camera off', tone: 'muted', kind: 'camera-off' };
  else if (p.state === 'reconnecting') base = { label: 'Reconnecting…', tone: 'warning', kind: 'reconnecting' };
  // Reconnecting outranks nothing above it but must still show when the
  // camera happens to be off — a dropped connection is the more urgent news.
  if (p.state === 'reconnecting' && (base?.kind === 'camera-off' || base?.kind === 'view-only')) {
    base = { label: 'Reconnecting…', tone: 'warning', kind: 'reconnecting' };
  }
  if (p.isHost) {
    if (!base) return { label: 'Host', tone: 'muted', kind: 'host' };
    return { ...base, label: `Host · ${base.label}` };
  }
  return base ?? { label: '', tone: 'muted', kind: 'none' };
}

const INACTIVE = new Set<CallPerson['state']>(['ringing', 'notified', 'missed', 'declined', 'left']);

export function CallPeopleList({
  people,
  count,
  followingUserId,
  canModerate,
  onInvite,
  onFollow,
  onMuteForMe,
  onMute,
  onRemove,
  onMakeHost,
  onRingAgain,
  onOpenSelfSettings,
  onLeave,
  hideHeading = false,
  rowMenu,
  className,
  'data-testid': testId = 'call-people-list',
}: CallPeopleListProps) {
  return (
    <section data-ui-part="" className={cn('flex flex-col', className)} data-testid={testId} aria-label="People">
      {!hideHeading && (
        <div className="mb-2 flex items-center gap-2">
          <h3 className="m-0 text-base font-semibold text-text-primary">People</h3>
          <Badge variant="count" value={count} color="muted" aria-label={`${count} people`} />
          <Button variant="ghost" size="md" onClick={onInvite} data-testid="call-invite" className="ml-auto">
            Invite...
          </Button>
        </div>
      )}
      <ul className="m-0 flex list-none flex-col p-0">
        {people.map((p) => {
          const status = callPersonStatus(p);
          const inactive = INACTIVE.has(p.state);
          const menu: DropdownMenuItem[] = [];
          if (!p.isLocal && !inactive) {
            const following = followingUserId === p.userId;
            menu.push({
              label: following ? 'Stop following' : 'Follow',
              onSelect: () => onFollow(following ? null : p.userId),
              'data-testid': `call-person-follow-${p.userId}`,
            });
            menu.push({ label: 'Mute for me', onSelect: () => onMuteForMe(p.userId) });
          }
          if (canModerate && !p.isLocal && !inactive) {
            if (onMute) menu.push({ label: 'Mute', onSelect: () => onMute(p.userId), disabled: !p.audioOn });
            if (onMakeHost && !p.isHost) menu.push({ label: 'Make host', onSelect: () => onMakeHost(p.userId) });
            if (onRemove) menu.push({ label: 'Remove from call', danger: true, onSelect: () => onRemove(p.userId) });
          }
          if (p.isLocal) {
            if (onOpenSelfSettings) menu.push({ label: 'Call settings', onSelect: onOpenSelfSettings, 'data-testid': 'call-person-self-settings' });
            if (onLeave) menu.push({ label: 'Leave call', danger: true, onSelect: onLeave, 'data-testid': 'call-person-self-leave' });
          }
          if (p.state === 'missed' && onRingAgain) {
            menu.push({ label: 'Ring again', onSelect: () => onRingAgain(p.userId) });
          }
          const sections: DropdownMenuSection[] = [
            ...(menu.length > 0 ? [{ items: menu }] : []),
            ...(rowMenu?.(p)?.filter((section) => section.items.length > 0) ?? []),
          ];
          let statusNode: ReactNode = null;
          if (status.label) {
            statusNode = (
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 truncate text-sm',
                  status.tone === 'accent' && 'text-primary',
                  status.tone === 'muted' && 'text-text-tertiary',
                  status.tone === 'warning' && 'text-warning-fg',
                )}
                data-testid={`call-person-status-${p.userId}`}
                data-status={status.kind}
                {...(status.kind === 'view-only' ? { title: participantAccessInfo(p.access)?.description } : {})}
              >
                {status.kind === 'view-only' && <EyeIcon size={14} className="shrink-0" />}
                {status.kind === 'ringing' && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                )}
                {status.label}
                {status.kind === 'presenting' && <MonitorIcon size={16} className="ml-1" />}
              </span>
            );
          }
          return (
            <li
              key={p.userId}
              className={cn('flex min-h-16 items-center gap-3', inactive && 'opacity-60')}
              data-testid={`call-person-${p.userId}`}
              data-state={p.state}
            >
              <span className="relative inline-flex shrink-0">
                <Avatar
                  name={p.name}
                  size={46}
                  {...(p.avatarUrl ? { src: p.avatarUrl } : {})}
                  {...(p.color ? { color: p.color } : {})}
                  showTitle={false}
                />
                {p.presence && p.state === 'in-call' && !p.isLocal && (
                  <PresenceDot
                    state={p.presence}
                    pulse={false}
                    className="absolute bottom-0 right-0 rounded-full ring-2 ring-surface"
                  />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[15px] text-text-primary">
                  {p.name}
                  {p.isLocal && <span className="text-text-secondary"> (you)</span>}
                </span>
                {statusNode}
              </span>
              {p.state === 'missed' && onRingAgain ? (
                <Button variant="link" onClick={() => onRingAgain(p.userId)} className="shrink-0 text-sm" data-testid={`call-person-ring-${p.userId}`}>
                  Ring again
                </Button>
              ) : (
                !inactive && (
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-text-secondary"
                    aria-label={p.audioOn ? 'Microphone on' : 'Microphone muted'}
                    role="img"
                    data-testid={`call-person-mic-${p.userId}`}
                    data-audio={p.audioOn ? 'on' : 'off'}
                  >
                    {p.audioOn ? <MicIcon size={20} /> : <MicOffIcon size={20} />}
                  </span>
                )
              )}
              {sections.length > 0 ? (
                <DropdownMenu
                  trigger={<MoreHorizontalIcon size={20} />}
                  triggerLabel={`More for ${p.name}`}
                  triggerVariant="link"
                  triggerClassName="h-8 w-8 shrink-0 px-0"
                  triggerTestId={`call-person-menu-${p.userId}`}
                  align="end"
                  sections={sections}
                  data-testid={`call-person-menu-panel-${p.userId}`}
                />
              ) : (
                <span className="h-8 w-8 shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CallPeopleList;
