// HuddleBar — the whole call in one horizontal row, for a shell's footer.
//
//   ● Standup  12:04   3 joined · 1 ringing   [mic ▾] [cam ▾]  [Share page]  [Chat]  [Leave]
//
// Props-driven and presentational: no network, no realtime-modules import. The
// host feeds it from the call hook (`conversationCallDockProps`) and keeps the
// tile shelf wherever it already renders remote media — this is the controls
// row, not a media sink.
//
// Narrow behaviour: labels drop to icons from the bar's own width (a container
// query, not the viewport) — the shell's footer is as wide as the page, but the
// bar may sit in a pane. Status and name never drop; the timer and the
// joined-count fold under 28rem.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { T } from '../shared/Text';
import { ChatIcon, PeopleIcon, PhoneIcon } from '../ui/Icons';
import { PresenceDot, type PresenceState } from '../shared/PresenceDot';
import { DeviceToggleSelect, type DeviceOption, type MediaPermission } from './DeviceToggleSelect';
import { PhoneOffIcon } from './MediaIcons';
import { formatCallElapsed } from './CallDock';
import { InlinePopover } from '../shared/InlinePopover';
import type { MeetingToolbarItem } from './MeetingToolbar';

export type HuddleBarPhase = 'idle' | 'live' | 'connecting' | 'ringing' | 'reconnecting' | 'ended';

const PHASE_DOT: Record<HuddleBarPhase, PresenceState> = {
  idle: 'offline',
  live: 'online',
  connecting: 'away',
  ringing: 'away',
  reconnecting: 'away',
  ended: 'offline',
};

const PHASE_LABEL: Record<HuddleBarPhase, string> = {
  idle: 'No call',
  live: 'Live',
  connecting: 'Connecting',
  ringing: 'Ringing',
  reconnecting: 'Reconnecting',
  ended: 'Ended',
};

/** The visible wording beside the name for a phase that is not live. */
const PHASE_TEXT: Record<HuddleBarPhase, string | null> = {
  idle: null,
  live: null,
  connecting: 'Connecting…',
  ringing: 'Ringing…',
  reconnecting: 'Reconnecting…',
  ended: 'Ended',
};

/** One media control: the toggle, and an optional device list behind a caret. */
export interface HuddleBarMedia {
  on: boolean;
  onToggle: () => void;
  permission?: MediaPermission;
  /** With a list (and `onSelectDevice`) the toggle gets its device caret; without, it is a bare icon toggle. */
  devices?: DeviceOption[];
  selectedDeviceId?: string;
  onSelectDevice?: (deviceId: string) => void;
  /** 0..1 input level (microphone). */
  level?: number;
  disabledReason?: string;
}

export interface HuddleBarProps {
  /** The call's name: the place or person it is with. */
  name: string;
  /** Hide the visible context/status cluster while keeping the group name accessible. */
  showContext?: boolean;
  /**
   * Default `live`. `idle` is the pre-call bar: `name` is the page's context,
   * the bar draws `onStart` and the chat button (and no timer, counts, media
   * or Leave). Since 2.416.0.
   */
  phase?: HuddleBarPhase;
  /**
   * Visible wording for the current phase ("Calling Mira…", "Reconnecting…").
   * Default: "Connecting…", "Ringing…", "Reconnecting…" or "Ended" for a phase
   * that is not `live`; nothing while live. Pass `null` to draw none. Since 2.413.0.
   */
  statusLabel?: string | null;
  /** Epoch ms the call went live. Draws a ticking timer while `live`. */
  startedAt?: number | null;
  /** People in the call now. */
  participantCount?: number;
  /** Invitees still ringing, counted apart from `participantCount`. */
  ringingCount?: number;
  mic?: HuddleBarMedia;
  camera?: HuddleBarMedia;
  /** The share-page control (a host's "Share page" button, or a menu). Drawn after the media toggles. */
  shareSlot?: ReactNode;
  /** The chat toggle. Absent: no chat button. */
  onToggleChat?: () => void;
  chatOpen?: boolean;
  /** Unread chat count on the toggle. */
  chatUnread?: number;
  /** Toggles the call's media panel (tiles, roster). Absent: no button. Since 2.413.0. */
  onToggleMedia?: () => void;
  mediaOpen?: boolean;
  /** Accessible name and tooltip of the media toggle. Default "Participants". */
  mediaToggleLabel?: string;
  /** Idle only: the Huddle action that starts the page's call. Absent: no start button. Since 2.416.0. */
  onStart?: () => void;
  /** Idle only: label of the start button. Default "Huddle". */
  startLabel?: string;
  /** Idle only: disables the start button and is its tooltip. */
  startDisabledReason?: string;
  /** Wording of the chat button (the icon alone below the bar's `@lg` width). Default "Chat". Since 2.416.0. */
  chatLabel?: string;
  /** Disables the chat button and is its tooltip. Since 2.416.0. */
  chatDisabledReason?: string;
  /** Not drawn while `idle`. */
  onLeave?: () => void;
  /** Default "Leave". */
  leaveLabel?: string;
  /**
   * Meeting controls (Raise, React, Rooms…) from `meetingToolbarItems`, the
   * same items `MeetingToolbar` draws, as this bar's compact buttons: icon,
   * the label from `@lg`, pressed and active states, badge, and a popover
   * item's panel (React's picker). Not drawn while idle. Since 2.475.0.
   */
  meetingItems?: MeetingToolbarItem[];
  /** Extra controls before Leave. */
  extras?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

function useElapsed(startedAt: number | null | undefined, running: boolean): number | null {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running || startedAt == null) return undefined;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [running, startedAt]);
  return running && startedAt != null ? Math.max(0, now - startedAt) : null;
}

function peopleText(joined: number, ringing: number): string {
  const base = `${joined} joined`;
  return ringing > 0 ? `${base} · ${ringing} ringing` : base;
}

export function HuddleBar({
  name,
  showContext = true,
  phase = 'live',
  statusLabel,
  startedAt,
  participantCount,
  ringingCount = 0,
  mic,
  camera,
  shareSlot,
  onToggleChat,
  chatOpen = false,
  chatUnread = 0,
  onToggleMedia,
  mediaOpen = false,
  mediaToggleLabel = 'Participants',
  onStart,
  startLabel = 'Huddle',
  startDisabledReason,
  chatLabel = 'Chat',
  chatDisabledReason,
  onLeave,
  leaveLabel = 'Leave',
  meetingItems,
  extras,
  className,
  'data-testid': testId = 'huddle-bar',
}: HuddleBarProps) {
  const elapsed = useElapsed(startedAt, phase === 'live');
  const statusText = statusLabel === undefined ? PHASE_TEXT[phase] : statusLabel;
  const media = (kind: 'microphone' | 'camera', m: HuddleBarMedia) => (
    <DeviceToggleSelect
      kind={kind}
      on={m.on}
      onToggle={m.onToggle}
      devices={m.devices ?? []}
      onSelectDevice={m.onSelectDevice ?? (() => {})}
      permission={m.permission ?? 'granted'}
      deviceMenu={Boolean(m.devices && m.onSelectDevice)}
      {...(m.selectedDeviceId !== undefined ? { selectedDeviceId: m.selectedDeviceId } : {})}
      {...(m.level !== undefined ? { level: m.level } : {})}
      {...(m.disabledReason !== undefined ? { disabledReason: m.disabledReason } : {})}
      data-testid={`${testId}-${kind === 'microphone' ? 'mic' : 'camera'}`}
    />
  );

  return (
    <div
      role="group"
      aria-label={phase === 'idle' ? name : `${name} huddle`}
      data-testid={testId}
      data-phase={phase}
      className={cn('@container flex min-w-0 items-center gap-3 px-3 py-1.5', className)}
    >
      {showContext && <div className="flex min-w-0 items-center gap-2" data-testid={`${testId}-status`}>
        <PresenceDot state={PHASE_DOT[phase]} ariaLabel={PHASE_LABEL[phase]} data-testid={`${testId}-dot`} />
        <T className="min-w-0 truncate" size="xs" weight={phase === 'idle' ? 'normal' : 'medium'} tone={phase === 'idle' ? 'secondary' : 'primary'} title={name} data-testid={`${testId}-name`}>
          {name}
        </T>
        {statusText != null && (
          <T className="shrink-0" size="xs" tone="secondary" data-testid={`${testId}-phase`}>
            {statusText}
          </T>
        )}
        {elapsed !== null && (
          <T className="hidden shrink-0 @md:inline" size="xs" tone="tertiary" tabular data-testid={`${testId}-timer`}>
            {formatCallElapsed(elapsed)}
          </T>
        )}
        {participantCount !== undefined && (
          <T className="hidden shrink-0 @md:inline" size="xs" tone="secondary" data-testid={`${testId}-people`}>
            {peopleText(participantCount, ringingCount)}
          </T>
        )}
      </div>}

      <div className="ml-auto flex shrink-0 items-center gap-2">
        {mic && media('microphone', mic)}
        {camera && media('camera', camera)}
        {shareSlot != null && <T className="items-center" data-testid={`${testId}-share`}>{shareSlot}</T>}
        {onToggleMedia && (
          <Button
            variant={mediaOpen ? 'secondary' : 'ghost'}
            size="sm"
            onClick={onToggleMedia}
            aria-pressed={mediaOpen}
            aria-expanded={mediaOpen}
            aria-label={mediaToggleLabel}
            title={mediaToggleLabel}
            data-testid={`${testId}-media`}
            className="gap-1.5"
          >
            <PeopleIcon size={16} />
            {participantCount !== undefined && <T tabular>{participantCount}</T>}
          </Button>
        )}
        {phase === 'idle' && onStart && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onStart}
            disabled={startDisabledReason !== undefined}
            title={startDisabledReason}
            data-testid={`${testId}-start`}
            className="gap-1.5"
          >
            <PhoneIcon size={16} />
            {startLabel}
          </Button>
        )}
        {onToggleChat && (
          <T className="relative inline-flex">
            <Button
              variant={chatOpen ? 'secondary' : 'ghost'}
              size="sm"
              onClick={onToggleChat}
              aria-pressed={chatOpen}
              aria-label={chatLabel}
              disabled={chatDisabledReason !== undefined}
              title={chatDisabledReason}
              data-testid={`${testId}-chat`}
              className="gap-1.5"
            >
              <ChatIcon size={16} />
              <T className="hidden @lg:inline">{chatLabel}</T>
            </Button>
            {chatUnread > 0 && (
              <T
                className="absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-[10px] leading-none text-white"
                weight="semibold"
                data-testid={`${testId}-chat-unread`}
              >
                {chatUnread > 99 ? '99+' : chatUnread}
              </T>
            )}
          </T>
        )}
        {phase !== 'idle' && meetingItems?.map((item) => (
          <HuddleMeetingButton key={item.id} item={item} testId={`${testId}-meeting-${item.id}`} />
        ))}
        {extras}
        {phase !== 'idle' && onLeave && <Button variant="danger-solid" size="sm" onClick={onLeave} aria-label={leaveLabel} data-testid={`${testId}-leave`} className="gap-1.5">
          <PhoneOffIcon size={16} />
          <T className="hidden @lg:inline">{leaveLabel}</T>
        </Button>}
      </div>
    </div>
  );
}

/** One meeting item as a HuddleBar button; a popover item opens its panel above the bar. */
function HuddleMeetingButton({ item, testId }: { item: MeetingToolbarItem; testId: string }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const hasPanel = !!item.popover;
  const panelOpen = hasPanel && open && !item.disabled;
  const on = item.pressed || item.active || panelOpen;
  const name = item.count !== undefined ? `${item.label}, ${item.count}` : item.label;
  return (
    <T className="relative inline-flex">
      <Button
        ref={ref}
        variant={on ? 'secondary' : 'ghost'}
        size="sm"
        onClick={hasPanel ? () => setOpen((v) => !v) : item.onClick}
        disabled={item.disabled}
        title={item.disabled && item.disabledReason ? item.disabledReason : item.title ?? item.label}
        aria-label={name}
        aria-pressed={item.pressed === undefined ? undefined : item.pressed}
        aria-expanded={hasPanel ? panelOpen : item.active === undefined ? undefined : item.active}
        aria-haspopup={hasPanel ? 'dialog' : undefined}
        data-testid={testId}
        className="gap-1.5 [&_svg]:size-4"
      >
        {item.icon}
        {item.count !== undefined && <T tabular>{item.count}</T>}
        <T className="hidden @lg:inline">{item.label}</T>
      </Button>
      {!!item.badge && (
        <T
          className="absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-text-inverse"
          size="xs"
          weight="semibold"
          data-testid={`${testId}-badge`}
        >
          {item.badge > 99 ? '99+' : item.badge}
        </T>
      )}
      {hasPanel && (
        <InlinePopover
          trigger={ref}
          open={panelOpen}
          onClose={() => setOpen(false)}
          placement={item.popoverPlacement ?? 'bottom-end'}
          aria-label={item.popoverLabel ?? item.label}
          kind="huddle-bar-popover"
          data-testid={`${testId}-popover`}
        >
          {panelOpen && item.popover!(() => setOpen(false))}
        </InlinePopover>
      )}
    </T>
  );
}

export default HuddleBar;
