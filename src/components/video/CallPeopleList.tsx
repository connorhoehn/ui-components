// ui-components/src/components/video/CallPeopleList.tsx
//
// Everyone on (or rung for) a call, one 64px row each: avatar with presence,
// name, one sub-status, their mic state and a ⋯ menu. The sub-status is ONE
// word, chosen by precedence, so a row never stacks three badges:
//
//   in the call:  Presenting › Sharing screen › Camera off › Reconnecting…
//   not in it:    Ringing… (pulsing) · Didn't answer (+ Ring again) · Declined · Left
//
// and "Host" when nothing else applies (prefixed "Host · " when something
// does). Rows for people who are not in the call are dimmed.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from '../shared/Avatar';
import { Badge } from '../shared/Badge';
import { PresenceDot } from '../shared/PresenceDot';
import { DropdownMenu, type DropdownMenuItem } from '../shared/DropdownMenu';
import { Button } from '../ui/Button';
import { MicIcon, MicOffIcon, MonitorIcon, MoreHorizontalIcon } from './MediaIcons';

export interface CallPerson {
  userId: string;
  name: string;
  avatarUrl?: string;
  color?: string;
  isLocal: boolean;
  isHost: boolean;
  presence?: 'online' | 'away' | 'offline';
  state: 'in-call' | 'ringing' | 'missed' | 'declined' | 'left' | 'reconnecting';
  audioOn: boolean;
  cameraOn: boolean;
  screenSharing: boolean;
  presenting: boolean;
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
  /** Hide the "People N · Invite…" heading (a host that draws its own). */
  hideHeading?: boolean;
  className?: string;
  'data-testid'?: string;
}

export interface CallPersonStatus {
  label: string;
  tone: 'accent' | 'muted' | 'warning';
  kind: 'presenting' | 'sharing' | 'camera-off' | 'reconnecting' | 'ringing' | 'missed' | 'declined' | 'left' | 'host' | 'none';
}

/** The one sub-status a row shows. Exported for hosts and tests. */
export function callPersonStatus(p: CallPerson): CallPersonStatus {
  let base: CallPersonStatus | null = null;
  if (p.state === 'ringing') base = { label: 'Ringing…', tone: 'muted', kind: 'ringing' };
  else if (p.state === 'missed') base = { label: "Didn't answer", tone: 'muted', kind: 'missed' };
  else if (p.state === 'declined') base = { label: 'Declined', tone: 'muted', kind: 'declined' };
  else if (p.state === 'left') base = { label: 'Left', tone: 'muted', kind: 'left' };
  else if (p.presenting) base = { label: 'Presenting', tone: 'accent', kind: 'presenting' };
  else if (p.screenSharing) base = { label: 'Sharing screen', tone: 'accent', kind: 'sharing' };
  else if (!p.cameraOn) base = { label: 'Camera off', tone: 'muted', kind: 'camera-off' };
  else if (p.state === 'reconnecting') base = { label: 'Reconnecting…', tone: 'warning', kind: 'reconnecting' };
  // Reconnecting outranks nothing above it but must still show when the
  // camera happens to be off — a dropped connection is the more urgent news.
  if (p.state === 'reconnecting' && base?.kind === 'camera-off') {
    base = { label: 'Reconnecting…', tone: 'warning', kind: 'reconnecting' };
  }
  if (p.isHost) {
    if (!base) return { label: 'Host', tone: 'muted', kind: 'host' };
    return { ...base, label: `Host · ${base.label}` };
  }
  return base ?? { label: '', tone: 'muted', kind: 'none' };
}

const INACTIVE = new Set<CallPerson['state']>(['ringing', 'missed', 'declined', 'left']);

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
  hideHeading = false,
  className,
  'data-testid': testId = 'call-people-list',
}: CallPeopleListProps) {
  return (
    <section className={cn('flex flex-col', className)} data-testid={testId} aria-label="People">
      {!hideHeading && (
        <div className="mb-2 flex items-center gap-2">
          <h3 className="m-0 text-base font-semibold text-text-primary">People</h3>
          <Badge variant="count" value={count} color="muted" aria-label={`${count} people`} />
          <Button variant="ghost" size="md" onClick={onInvite} data-testid="call-invite" className="ml-auto font-medium">
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
          if (p.state === 'missed' && onRingAgain) {
            menu.push({ label: 'Ring again', onSelect: () => onRingAgain(p.userId) });
          }
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
              >
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
              {menu.length > 0 ? (
                <DropdownMenu
                  trigger={<MoreHorizontalIcon size={20} />}
                  triggerLabel={`More for ${p.name}`}
                  triggerVariant="link"
                  triggerClassName="h-8 w-8 shrink-0 px-0"
                  triggerTestId={`call-person-menu-${p.userId}`}
                  align="end"
                  sections={[{ items: menu }]}
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
