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

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { ChatIcon, PeopleIcon } from '../ui/Icons';
import { PresenceDot, type PresenceState } from '../shared/PresenceDot';
import { DeviceToggleSelect, type DeviceOption, type MediaPermission } from './DeviceToggleSelect';
import { PhoneOffIcon } from './MediaIcons';
import { formatCallElapsed } from './CallDock';

export type HuddleBarPhase = 'live' | 'connecting' | 'ringing' | 'reconnecting' | 'ended';

const PHASE_DOT: Record<HuddleBarPhase, PresenceState> = {
  live: 'online',
  connecting: 'away',
  ringing: 'away',
  reconnecting: 'away',
  ended: 'offline',
};

const PHASE_LABEL: Record<HuddleBarPhase, string> = {
  live: 'Live',
  connecting: 'Connecting',
  ringing: 'Ringing',
  reconnecting: 'Reconnecting',
  ended: 'Ended',
};

/** The visible wording beside the name for a phase that is not live. */
const PHASE_TEXT: Record<HuddleBarPhase, string | null> = {
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
  /** Default `live`. */
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
  onLeave: () => void;
  /** Default "Leave". */
  leaveLabel?: string;
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
  onLeave,
  leaveLabel = 'Leave',
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
      aria-label={`${name} huddle`}
      data-testid={testId}
      data-phase={phase}
      className={cn('@container flex min-w-0 items-center gap-3 px-3 py-1.5', className)}
    >
      <div className="flex min-w-0 items-center gap-2" data-testid={`${testId}-status`}>
        <PresenceDot state={PHASE_DOT[phase]} ariaLabel={PHASE_LABEL[phase]} data-testid={`${testId}-dot`} />
        <span className="min-w-0 truncate text-sm font-semibold text-text-primary" title={name} data-testid={`${testId}-name`}>
          {name}
        </span>
        {statusText != null && (
          <span className="shrink-0 text-xs text-text-secondary" data-testid={`${testId}-phase`}>
            {statusText}
          </span>
        )}
        {elapsed !== null && (
          <span className="hidden shrink-0 text-xs tabular-nums text-text-tertiary @md:inline" data-testid={`${testId}-timer`}>
            {formatCallElapsed(elapsed)}
          </span>
        )}
        {participantCount !== undefined && (
          <span className="hidden shrink-0 text-xs text-text-secondary @md:inline" data-testid={`${testId}-people`}>
            {peopleText(participantCount, ringingCount)}
          </span>
        )}
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        {mic && media('microphone', mic)}
        {camera && media('camera', camera)}
        {shareSlot != null && <span className="flex items-center" data-testid={`${testId}-share`}>{shareSlot}</span>}
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
            <PeopleIcon size={14} />
            {participantCount !== undefined && <span className="tabular-nums">{participantCount}</span>}
          </Button>
        )}
        {onToggleChat && (
          <span className="relative inline-flex">
            <Button
              variant={chatOpen ? 'secondary' : 'ghost'}
              size="sm"
              onClick={onToggleChat}
              aria-pressed={chatOpen}
              aria-label="Chat"
              data-testid={`${testId}-chat`}
              className="gap-1.5"
            >
              <ChatIcon size={14} />
              <span className="hidden @lg:inline">Chat</span>
            </Button>
            {chatUnread > 0 && (
              <span
                className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white"
                data-testid={`${testId}-chat-unread`}
              >
                {chatUnread > 99 ? '99+' : chatUnread}
              </span>
            )}
          </span>
        )}
        {extras}
        <Button variant="danger-solid" size="sm" onClick={onLeave} aria-label={leaveLabel} data-testid={`${testId}-leave`} className="gap-1.5">
          <PhoneOffIcon size={14} />
          <span className="hidden @lg:inline">{leaveLabel}</span>
        </Button>
      </div>
    </div>
  );
}

export default HuddleBar;
