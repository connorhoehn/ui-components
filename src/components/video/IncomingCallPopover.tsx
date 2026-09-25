// ui-components/src/components/video/IncomingCallPopover.tsx
//
// A document-review call ringing you, anchored under the toolbar's Call
// button (not a toast, not a modal): who is calling, the call's title, the
// documents it is about, who is already in it, the mic/camera you will join
// with, and Not now / Join call.
//
// `compact` (05b) folds the caller into one line ("Connor Hoehn invited
// you"), the document count into "+1" and the people into "3 in call" — used
// on narrower windows, when a second invite is queued, and when you are
// already in a call (`busy`: "Switch" instead of "Join call").

import type { RefObject } from 'react';
import { cn } from '../../lib/cn';
import { Avatar, AvatarGroup } from '../shared/Avatar';
import { InlinePopover } from '../shared/InlinePopover';
import { Tooltip } from '../shared/Tooltip';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ArrowRightIcon, CloseIcon, DocumentIcon } from '../ui/Icons';
import { DeviceToggleSelect, type DeviceToggleSelectProps } from './DeviceToggleSelect';
import { PhoneCallIcon, SettingsGearIcon } from './MediaIcons';

export interface IncomingCallPopoverProps {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  compact?: boolean;
  caller: { name: string; avatarUrl?: string; color?: string };
  title: string;
  documents: { id: string; title: string }[];
  /** Opens a document without answering. */
  onOpenDocument: (id: string) => void;
  participants: { id: string; name: string; avatarUrl?: string }[];
  participantCount: number;
  mic: Omit<DeviceToggleSelectProps, 'kind'>;
  camera: Omit<DeviceToggleSelectProps, 'kind'>;
  onOpenSettings: () => void;
  /** Already in a call: the primary action reads "Switch". */
  busy?: boolean;
  onJoin: () => void;
  onSwitch?: () => void;
  /** Not now, the ×, and an outside click. */
  onDecline: () => void;
  /** Close without answering (the invite keeps ringing elsewhere until it expires). */
  onDismiss: () => void;
  /** Pulse the phone while ringing. Default true. */
  ringing?: boolean;
  className?: string;
  'data-testid'?: string;
}

function peopleInCall(n: number, compact: boolean): string {
  if (n === 0) return 'Nobody has joined yet';
  if (compact) return `${n} in call`;
  return n === 1 ? '1 person in the call' : `${n} people in the call`;
}

export function IncomingCallPopover({
  open,
  anchorRef,
  compact = false,
  caller,
  title,
  documents,
  onOpenDocument,
  participants,
  participantCount,
  mic,
  camera,
  onOpenSettings,
  busy = false,
  onJoin,
  onSwitch,
  onDecline,
  onDismiss,
  ringing = true,
  className,
  'data-testid': testId = 'incoming-call-popover',
}: IncomingCallPopoverProps) {
  const [first, ...rest] = documents;
  const restLabel = rest.length ? (compact ? `+${rest.length}` : `+${rest.length} ${rest.length === 1 ? 'document' : 'documents'}`) : null;
  const primaryIsSwitch = busy && Boolean(onSwitch);

  return (
    <InlinePopover
      trigger={anchorRef}
      open={open}
      onClose={onDismiss}
      placement="bottom-end"
      offset={8}
      aria-label={`Incoming call from ${caller.name}`}
      data-testid={testId}
      className={cn(
        'rounded-xl p-0 shadow-xl',
        compact ? 'w-[375px]' : 'w-[407px]',
        className,
      )}
    >
      <div className={cn('flex flex-col', compact ? 'gap-2.5 px-4 pt-3 pb-4' : 'gap-3.5 px-5 pt-4 pb-4')} data-compact={compact ? 'true' : 'false'}>
        <div className="flex items-center gap-3">
          <PhoneCallIcon size={20} className={cn('shrink-0 text-success', ringing && 'motion-safe:animate-pulse')} />
          <span className="flex-1 text-[15px] font-semibold text-text-primary">Incoming call</span>
          <IconButton
            aria-label="Not now"
            title="Not now"
            size="sm"
            icon={<CloseIcon size={16} />}
            onClick={onDecline}
            data-testid="incoming-call-close"
            className="text-text-secondary"
          />
        </div>

        {compact ? (
          <div className="flex items-center gap-3">
            <Avatar name={caller.name} size={36} {...(caller.avatarUrl ? { src: caller.avatarUrl } : {})} {...(caller.color ? { color: caller.color } : {})} showTitle={false} />
            <span className="min-w-0 truncate text-[15px] text-text-primary" data-testid="incoming-call-caller">
              <span className="font-medium">{caller.name}</span> <span className="text-text-secondary">invited you</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar name={caller.name} size={44} {...(caller.avatarUrl ? { src: caller.avatarUrl } : {})} {...(caller.color ? { color: caller.color } : {})} showTitle={false} />
            <span className="flex min-w-0 flex-col" data-testid="incoming-call-caller">
              <span className="truncate text-[15px] font-semibold text-text-primary">{caller.name}</span>
              <span className="truncate text-sm text-text-secondary">invited you to a review</span>
            </span>
          </div>
        )}

        <h3 className={cn('m-0 font-semibold text-text-primary', compact ? 'text-lg' : 'text-xl')} data-testid="incoming-call-title">
          {title}
        </h3>

        {first && (
          <div className="flex min-w-0 items-center gap-3 text-sm">
            <DocumentIcon size={compact ? 20 : 22} className="shrink-0 text-primary" />
            <Button
              variant="link"
              onClick={() => onOpenDocument(first.id)}
              data-testid={`incoming-call-document-${first.id}`}
              className="min-w-0 truncate text-[15px] underline"
            >
              {first.title}
            </Button>
            {restLabel && (
              <>
                <span aria-hidden="true" className="h-4 w-px shrink-0 bg-border" />
                <Tooltip content={rest.map((d) => d.title).join(', ')}>
                  <Button
                    variant="link"
                    onClick={() => onOpenDocument(rest[0]!.id)}
                    data-testid="incoming-call-more"
                    className="shrink-0 text-[15px] underline"
                  >
                    {restLabel}
                  </Button>
                </Tooltip>
              </>
            )}
            {compact && (
              <span className="ml-auto shrink-0 text-text-secondary" data-testid="incoming-call-participants">
                {peopleInCall(participantCount, true)}
              </span>
            )}
          </div>
        )}

        {!compact && (
          <div className="flex items-center gap-3" data-testid="incoming-call-participants">
            {participants.length > 0 && (
              <AvatarGroup
                items={participants.slice(0, 3).map((p) => ({ name: p.name, ...(p.avatarUrl ? { src: p.avatarUrl } : {}) }))}
                maxVisible={3}
                size={34}
                className="[&>*]:!border-surface"
              />
            )}
            <span className="text-sm text-text-secondary">{peopleInCall(participantCount, false)}</span>
          </div>
        )}

        {!compact && <div className="h-px bg-border" aria-hidden="true" />}

        <div className="flex items-center gap-2">
          <DeviceToggleSelect
            kind="microphone"
            size="md"
            showLabel
            {...mic}
            className={cn('min-w-0 flex-1 shrink justify-between', mic.className)}
            data-testid="incoming-call-mic"
          />
          <DeviceToggleSelect
            kind="camera"
            size="md"
            showLabel
            {...camera}
            className={cn('min-w-0 flex-1 shrink justify-between', camera.className)}
            data-testid="incoming-call-camera"
          />
          <IconButton
            aria-label="Call settings"
            title="Call settings"
            variant="outline"
            size="lg"
            icon={<SettingsGearIcon size={18} />}
            onClick={onOpenSettings}
            data-testid="incoming-call-settings"
            className="shrink-0"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onDecline} data-testid="incoming-call-decline" className="border-transparent font-medium">
            Not now
          </Button>
          {primaryIsSwitch ? (
            <Button onClick={onSwitch} data-testid="incoming-call-switch" className="inline-flex h-10 items-center gap-2 px-4">
              Switch
              <ArrowRightIcon size={16} />
            </Button>
          ) : (
            <Button onClick={onJoin} data-testid="incoming-call-join" className="inline-flex h-10 items-center gap-2 px-4">
              Join call
              <ArrowRightIcon size={16} />
            </Button>
          )}
        </div>
      </div>
    </InlinePopover>
  );
}

export default IncomingCallPopover;
