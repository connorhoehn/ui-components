// HuddleBar — the whole call in one horizontal row, for a shell's footer.
//
//   ● Standup  12:04   3 joined · 1 ringing   [mic ▾] [cam ▾]  [Share page]  [Chat]  [Leave]
//
// Props-driven and presentational: no network, no realtime-modules import. The
// host feeds it from the call hook (`conversationCallDockProps`) and keeps the
// tile shelf wherever it already renders remote media — this is the controls
// row, not a media sink.
//
// Phases: `idle` (no call here: Huddle starts one), `joinable` (a huddle is
// running on this page's context and you are not in it: "Standup huddle live ·
// 3 joined", who is in it, and Join, since 2.480.0), then the call's own
// connecting / ringing / live / reconnecting / ended once you are in it.
//
// Narrow behaviour: labels drop to icons from the bar's own width (a container
// query, not the viewport) — the shell's footer is as wide as the page, but the
// bar may sit in a pane. Status and name never drop; the timer and the
// joined-count fold under 28rem.
//
// One row, always (2.543.0): the bar never wraps and never grows. When the
// controls do not fit beside the name (cut to an ellipsis, never below 6rem
// unless it is shorter), the lowest-priority controls move into a More menu,
// one at a time: the host's `actions` by their `priority`, then the meeting
// items (last first), the media toggle, the share control (with `shareMenu`)
// and the chat toggle. Microphone, camera, Start, Join and Leave never move.

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Tooltip } from '../shared/Tooltip';
import { T } from '../shared/Text';
import { ChatIcon, MoreIcon, PeopleIcon, PhoneIcon } from '../ui/Icons';
import { DropdownMenu, type DropdownMenuItem } from '../shared/DropdownMenu';
import { fitByPriority } from './priorityFit';
import { PresenceAvatars } from '../shared/PresenceAvatars';
import { PresenceDot, type PresenceState } from '../shared/PresenceDot';
import { DeviceToggleSelect, type DeviceOption, type MediaPermission } from './DeviceToggleSelect';
import { PhoneOffIcon } from './MediaIcons';
import { formatCallElapsed } from './CallDock';
import { InlinePopover } from '../shared/InlinePopover';
import type { MeetingToolbarItem } from './MeetingToolbar';
import { useCallNoun } from './callNoun';

export type HuddleBarPhase = 'idle' | 'joinable' | 'live' | 'connecting' | 'ringing' | 'reconnecting' | 'ended';

/** Someone in a huddle you have not joined (`phase="joinable"`). */
export interface HuddleBarLiveParticipant {
  id: string;
  displayName: string;
  avatarUrl?: string;
}

const PHASE_DOT: Record<HuddleBarPhase, PresenceState> = {
  idle: 'offline',
  joinable: 'online',
  live: 'online',
  connecting: 'away',
  ringing: 'away',
  reconnecting: 'away',
  ended: 'offline',
};

const capitalise = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const PHASE_LABEL: Record<HuddleBarPhase, string> = {
  idle: 'No call',
  joinable: 'Huddle live',
  live: 'Live',
  connecting: 'Connecting',
  ringing: 'Ringing',
  reconnecting: 'Reconnecting',
  ended: 'Ended',
};

/** The visible wording beside the name for a phase that is not live. */
const PHASE_TEXT: Record<HuddleBarPhase, string | null> = {
  idle: null,
  joinable: null,
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

/** A collapsed control as a row of the More menu. */
export interface HuddleBarActionMenu {
  label: string;
  description?: string;
  icon?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  disabledReason?: string;
  danger?: boolean;
}

/**
 * One of the host's controls on the bar (since 2.543.0). While there is room
 * it is drawn as `node`; when the row is too narrow it moves into the More
 * menu as `menu` (something to press) or `fact` (words to read, e.g. a
 * chip's). With neither it never leaves the row.
 */
export interface HuddleBarAction {
  id: string;
  node: ReactNode;
  /**
   * Higher stays on the row longer. Default 0. The bar's own controls sit at
   * chat 60, share 50, media toggle 40 and meeting items 30 downwards.
   */
  priority?: number;
  menu?: HuddleBarActionMenu;
  fact?: string;
}

/** The built-in controls' places in the collapse order (higher stays longer). */
export const HUDDLE_BAR_PRIORITY = { chat: 60, share: 50, media: 40, meeting: 30 } as const;

/** The bar's menus and panels open over a floating call widget (`FloatingPanel`, z 9999), which sits where a footer's bar ends. */
const BAR_LAYER = 10050;

/** The name is never cut below this many px (unless it is shorter). */
const NAME_MIN_PX = 96;

export interface HuddleBarProps {
  /** The call's name: the place or person it is with. */
  name: string;
  /** Hide the visible context/status cluster while keeping the group name accessible. */
  showContext?: boolean;
  /**
   * Default `live`. `idle` is the pre-call bar: `name` is the page's context,
   * the bar draws `onStart` and the chat button (and no timer, counts, media
   * or Leave). Since 2.416.0. `joinable` (2.480.0): a huddle is live on this
   * context and the viewer is not in it — "<name> huddle live · N joined"
   * (`participantCount`, else the length of `liveParticipants`), an avatar
   * stack of `liveParticipants` and a primary Join (`onJoin`) in place of the
   * Huddle start button; no timer, media or Leave.
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
  /**
   * The word for the call in the bar's accessible names and the Join
   * tooltip ("Design review huddle", "Join Design review huddle", the status
   * dot's "Huddle live"). Default "huddle"; lower case, the bar capitalises
   * it where it starts a phrase.
   */
  callNoun?: string;
  /** Idle only: disables the start button and is its tooltip. */
  startDisabledReason?: string;
  /** Joinable only: who is in the huddle, for the avatar stack. Since 2.480.0. */
  liveParticipants?: HuddleBarLiveParticipant[];
  /** Joinable only: join the running huddle. Absent: no Join button. Since 2.480.0. */
  onJoin?: () => void;
  /** Joinable only: label of the Join button. Default "Join". */
  joinLabel?: string;
  /** Joinable only: disables Join and is its tooltip. */
  joinDisabledReason?: string;
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
  /**
   * The share control as a More-menu row. With it the share slot may collapse
   * (after the media toggle, before chat); without, it stays on the row. Since 2.543.0.
   */
  shareMenu?: HuddleBarActionMenu;
  /**
   * The host's controls before Leave, each with a place in the collapse order
   * and a More-menu form. Since 2.543.0.
   */
  actions?: HuddleBarAction[];
  /** Label of the overflow menu's trigger. Default "More". Since 2.543.0. */
  moreLabel?: string;
  /** Extra controls before Leave. They never collapse: prefer `actions`. */
  extras?: ReactNode;
  /**
   * Icon-only Start and Join (since 2.519.0), for a phone-width footer: the
   * label moves to the button's accessible name and a tooltip, and the bar's
   * own padding and gaps tighten. `data-compact` on the root.
   */
  compact?: boolean;
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
  callNoun: callNounProp,
  startDisabledReason,
  liveParticipants = [],
  onJoin,
  joinLabel = 'Join',
  joinDisabledReason,
  chatLabel = 'Chat',
  chatDisabledReason,
  onLeave,
  leaveLabel = 'Leave',
  meetingItems,
  shareMenu,
  actions,
  moreLabel = 'More',
  extras,
  compact = false,
  className,
  'data-testid': testId = 'huddle-bar',
}: HuddleBarProps) {
  const callNoun = useCallNoun(callNounProp);
  const elapsed = useElapsed(startedAt, phase === 'live');
  const statusText = statusLabel === undefined ? PHASE_TEXT[phase] : statusLabel;
  const joinable = phase === 'joinable';
  // Not in the call: no timer, media, meeting controls or Leave.
  const outside = phase === 'idle' || joinable;
  const joinedCount = participantCount ?? liveParticipants.length;
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

  const barRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<ResizeObserver | null>(null);
  // The controls that have moved into the More menu, by entry id.
  const [collapsed, setCollapsed] = useState<readonly string[]>([]);
  // A collapsed meeting item's panel (React's picker), opened from the menu against the More trigger.
  const [panelItem, setPanelItem] = useState<string | null>(null);

  // What fits is read from the layout, never guessed from a breakpoint: every
  // control stays mounted (a collapsed one is taken out of the flow, unseen),
  // so each has a width whatever the current choice, and the same bar width
  // always gives the same choice.
  const measure = useRef<() => void>(() => {});
  measure.current = () => {
    const bar = barRef.current;
    const controls = controlsRef.current;
    if (!bar || !controls) return;
    const px = (value: string) => parseFloat(value) || 0;
    const widthOf = (el: Element) => el.getBoundingClientRect().width;
    const barStyle = getComputedStyle(bar);
    let available = bar.clientWidth - px(barStyle.paddingLeft) - px(barStyle.paddingRight);
    const status = statusRef.current;
    if (status && status.getClientRects().length > 0) {
      const nameEl = status.querySelector<HTMLElement>('[data-text-truncate]');
      let reserved = 0;
      let count = 0;
      for (const child of Array.from(status.children)) {
        if (child.getClientRects().length === 0) continue;
        count += 1;
        reserved += nameEl && child.contains(nameEl) ? Math.min(nameEl.scrollWidth, NAME_MIN_PX) : widthOf(child);
      }
      available -= reserved + Math.max(0, count - 1) * px(getComputedStyle(status).columnGap) + px(barStyle.columnGap);
    }
    const controlsStyle = getComputedStyle(controls);
    available -= px(controlsStyle.paddingLeft) + px(controlsStyle.paddingRight);
    const items = Array.from(controls.children)
      .filter((el): el is HTMLElement => el instanceof HTMLElement && el.dataset.barItem !== undefined)
      .map((el) => ({ id: el.dataset.barItem!, width: widthOf(el), priority: Number(el.dataset.priority ?? 0), collapsible: el.dataset.collapsible === 'true' }));
    const next = fitByPriority(items, available, px(controlsStyle.columnGap), moreRef.current ? widthOf(moreRef.current) : 0);
    setCollapsed((prev) => (prev.length === next.length && prev.every((id, i) => id === next[i]) ? prev : next));
  };
  useLayoutEffect(() => {
    measure.current();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = (observer.current ??= new ResizeObserver(() => measure.current()));
    ro.disconnect();
    for (const el of [barRef.current, statusRef.current, moreRef.current, ...Array.from(controlsRef.current?.children ?? [])]) if (el) ro.observe(el);
  });
  useEffect(() => () => { observer.current?.disconnect(); observer.current = null; }, []);

  interface Entry { id: string; priority: number | null; node: ReactNode; menu?: DropdownMenuItem; fact?: string }
  const menuRow = (id: string, m: HuddleBarActionMenu): DropdownMenuItem => ({
    label: m.label,
    ...(m.description !== undefined ? { description: m.description } : {}),
    ...(m.icon !== undefined ? { icon: m.icon } : {}),
    ...(m.onSelect ? { onSelect: m.onSelect } : {}),
    ...(m.disabled ? { disabled: true } : {}),
    ...(m.disabledReason !== undefined ? { disabledReason: m.disabledReason } : {}),
    ...(m.danger ? { danger: true } : {}),
    'data-testid': `${testId}-more-${id}`,
  });
  const entries: Entry[] = [];
  if (!joinable && mic) entries.push({ id: 'mic', priority: null, node: media('microphone', mic) });
  if (!joinable && camera) entries.push({ id: 'camera', priority: null, node: media('camera', camera) });
  if (!joinable && shareSlot != null) entries.push({
    id: 'share', priority: shareMenu ? HUDDLE_BAR_PRIORITY.share : null,
    node: <T className="items-center" data-testid={`${testId}-share`}>{shareSlot}</T>,
    ...(shareMenu ? { menu: menuRow('share', shareMenu) } : {}),
  });
  if (!joinable && onToggleMedia) entries.push({
    id: 'media', priority: HUDDLE_BAR_PRIORITY.media,
    node: (
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
    ),
    menu: menuRow('media', { label: mediaToggleLabel, icon: <PeopleIcon size={14} />, onSelect: onToggleMedia }),
  });
  if (phase === 'idle' && onStart) entries.push({
    id: 'start', priority: null,
    node: compact ? (
      <Tooltip content={startDisabledReason ?? startLabel}>
        <IconButton
          variant="outline"
          size="sm"
          onClick={onStart}
          disabled={startDisabledReason !== undefined}
          aria-label={startLabel}
          icon={<PhoneIcon size={16} />}
          data-testid={`${testId}-start`}
        />
      </Tooltip>
    ) : (
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
    ),
  });
  if (joinable && onJoin) entries.push({
    id: 'join', priority: null,
    node: compact ? (
      <Tooltip content={joinDisabledReason ?? `${joinLabel} ${name} ${callNoun}`}>
        <IconButton
          variant="primary"
          size="sm"
          onClick={onJoin}
          disabled={joinDisabledReason !== undefined}
          aria-label={`${joinLabel} ${name} ${callNoun}`}
          icon={<PhoneIcon size={16} />}
          data-testid={`${testId}-join`}
        />
      </Tooltip>
    ) : (
      <Button
        variant="primary"
        size="sm"
        onClick={onJoin}
        disabled={joinDisabledReason !== undefined}
        title={joinDisabledReason}
        aria-label={`${joinLabel} ${name} ${callNoun}`}
        data-testid={`${testId}-join`}
        className="gap-1.5"
      >
        <PhoneIcon size={16} />
        {joinLabel}
      </Button>
    ),
  });
  const unreadText = chatUnread > 99 ? '99+' : String(chatUnread);
  if (onToggleChat) entries.push({
    id: 'chat', priority: HUDDLE_BAR_PRIORITY.chat,
    node: (
      <T className="relative inline-flex">
        <Button
          variant={chatOpen ? 'secondary' : 'ghost'}
          size="sm"
          onClick={onToggleChat}
          aria-pressed={chatOpen}
          aria-label={chatUnread > 0 ? `${chatLabel}, ${unreadText} unread` : chatLabel}
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
            aria-hidden="true"
            data-testid={`${testId}-chat-unread`}
          >
            {unreadText}
          </T>
        )}
      </T>
    ),
    menu: menuRow('chat', {
      label: chatLabel, icon: <ChatIcon size={14} />, onSelect: onToggleChat,
      ...(chatUnread > 0 ? { description: `${unreadText} unread` } : {}),
      ...(chatDisabledReason !== undefined ? { disabled: true, disabledReason: chatDisabledReason } : {}),
    }),
  });
  if (!outside) for (const item of meetingItems ?? []) entries.push({
    id: `meeting:${item.id}`, priority: HUDDLE_BAR_PRIORITY.meeting,
    node: <HuddleMeetingButton item={item} testId={`${testId}-meeting-${item.id}`} />,
    menu: {
      ...menuRow(`meeting-${item.id}`, {
        label: item.count !== undefined ? `${item.label}, ${item.count}` : item.label,
        icon: item.icon,
        ...(item.popover ? { onSelect: () => setPanelItem(item.id) } : item.onClick ? { onSelect: item.onClick } : {}),
        ...(item.disabled ? { disabled: true } : {}),
        ...(item.disabled && item.disabledReason ? { disabledReason: item.disabledReason } : {}),
      }),
      ...(item.menu && !item.popover ? { submenu: item.menu } : {}),
    },
  });
  for (const action of actions ?? []) entries.push({
    id: `action:${action.id}`, priority: action.menu || action.fact ? action.priority ?? 0 : null, node: action.node,
    ...(action.menu ? { menu: menuRow(action.id, action.menu) } : {}),
    ...(action.fact ? { fact: action.fact } : {}),
  });
  if (extras != null && extras !== false) entries.push({ id: 'extras', priority: null, node: extras });
  const leave: Entry | null = !outside && onLeave ? {
    id: 'leave', priority: null,
    node: (
      <Button variant="danger-solid" size="sm" onClick={onLeave} aria-label={leaveLabel} data-testid={`${testId}-leave`} className="gap-1.5">
        <PhoneOffIcon size={16} />
        <T className="hidden @lg:inline">{leaveLabel}</T>
      </Button>
    ),
  } : null;

  const gone = entries.filter((entry) => collapsed.includes(entry.id));
  const goneRows = gone.flatMap((entry) => (entry.menu ? [entry.menu] : []));
  const goneFacts = gone.flatMap((entry) => (entry.fact ? [entry.fact] : []));
  const moreShown = gone.length > 0;
  const moreUnread = chatUnread > 0 && collapsed.includes('chat');
  const panel = panelItem != null && collapsed.includes(`meeting:${panelItem}`) ? meetingItems?.find((item) => item.id === panelItem && item.popover && !item.disabled) ?? null : null;
  const slot = (entry: Entry) => {
    const off = collapsed.includes(entry.id);
    return (
      <div
        key={entry.id}
        data-bar-item={entry.id}
        data-priority={entry.priority ?? undefined}
        data-collapsible={entry.priority !== null}
        data-collapsed={off ? '' : undefined}
        aria-hidden={off || undefined}
        className={cn('flex shrink-0 items-center empty:hidden', entry.id === 'extras' && (compact ? 'gap-1' : 'gap-2'), off && 'pointer-events-none invisible absolute left-0 top-0')}
      >
        {entry.node}
      </div>
    );
  };

  return (
    <div
      ref={barRef}
      role="group"
      aria-label={phase === 'idle' ? name : `${name} ${callNoun}`}
      data-testid={testId}
      data-phase={phase}
      data-compact={compact ? '' : undefined}
      className={cn('@container flex min-w-0 flex-nowrap items-center', compact ? 'gap-1.5 px-1 py-1' : 'gap-3 px-3 py-1.5', className)}
    >
      {showContext && <div ref={statusRef} className="flex min-w-0 shrink items-center gap-2" data-testid={`${testId}-status`}>
        <PresenceDot state={PHASE_DOT[phase]} ariaLabel={phase === 'joinable' ? `${capitalise(callNoun)} live` : PHASE_LABEL[phase]} data-testid={`${testId}-dot`} />
        {/* Cut to an ellipsis when the row is short; the whole name is then the tooltip. */}
        <Tooltip content={name} placement="top" onlyWhenTruncated triggerClassName="block min-w-0">
          <T truncate title="" size="xs" weight={phase === 'idle' ? 'normal' : 'medium'} tone={phase === 'idle' ? 'secondary' : 'primary'} data-testid={`${testId}-name`}>
            {name}
          </T>
        </Tooltip>
        {joinable && (
          <T className="shrink-0 whitespace-nowrap" size="xs" tone="secondary" data-testid={`${testId}-live`}>
            {callNoun} live · {joinedCount} joined
          </T>
        )}
        {joinable && liveParticipants.length > 0 && (
          <T className="hidden shrink-0 @sm:inline-flex" data-testid={`${testId}-avatars`}>
            <PresenceAvatars
              users={liveParticipants.map((p) => ({ id: p.id, name: p.displayName, ...(p.avatarUrl ? { avatarUrl: p.avatarUrl } : {}) }))}
              maxVisible={3}
              size={20}
            />
          </T>
        )}
        {statusText != null && (
          <T className="shrink-0 whitespace-nowrap" size="xs" tone="secondary" data-testid={`${testId}-phase`}>
            {statusText}
          </T>
        )}
        {elapsed !== null && (
          <T className="hidden shrink-0 @md:inline" size="xs" tone="tertiary" tabular data-testid={`${testId}-timer`}>
            {formatCallElapsed(elapsed)}
          </T>
        )}
        {participantCount !== undefined && !joinable && (
          <T className="hidden shrink-0 whitespace-nowrap @md:inline" size="xs" tone="secondary" data-testid={`${testId}-people`}>
            {peopleText(participantCount, ringingCount)}
          </T>
        )}
      </div>}

      <div ref={controlsRef} className={cn('relative ml-auto flex shrink-0 flex-nowrap items-center', compact ? 'gap-1' : 'gap-2')} data-testid={`${testId}-controls`}>
        {entries.map(slot)}
        {/* Always mounted so its width is known before it is needed. */}
        <div
          ref={moreRef}
          aria-hidden={!moreShown || undefined}
          className={cn('relative flex shrink-0 items-center', !moreShown && 'pointer-events-none invisible absolute left-0 top-0')}
        >
          <DropdownMenu
            align="end"
            zIndex={BAR_LAYER}
            buttonVariant="ghost"
            buttonSize="sm"
            trigger={<MoreIcon size={16} />}
            triggerLabel={moreUnread ? `${moreLabel}, ${unreadText} unread` : moreLabel}
            triggerTitle={moreLabel}
            triggerTestId={`${testId}-more`}
            {...(moreShown ? {} : { triggerTabIndex: -1 })}
            data-testid={`${testId}-more-menu`}
            sections={[
              ...(goneFacts.length ? [{ items: [], caption: goneFacts.join(' · '), 'data-testid': `${testId}-more-facts` }] : []),
              ...(goneRows.length ? [{ items: goneRows }] : []),
            ]}
          />
          {moreUnread && (
            <T className="absolute -right-1 -top-1 h-4 min-w-4 justify-center rounded-full bg-danger px-1 text-text-inverse" size="xs" weight="semibold" aria-hidden="true" data-testid={`${testId}-more-unread`}>
              {unreadText}
            </T>
          )}
          <InlinePopover
            trigger={moreRef}
            open={panel != null}
            onClose={() => setPanelItem(null)}
            placement={panel?.popoverPlacement ?? 'bottom-end'}
            aria-label={panel?.popoverLabel ?? panel?.label ?? moreLabel}
            kind="huddle-bar-popover"
            zIndex={BAR_LAYER}
            data-testid={`${testId}-more-popover`}
          >
            {panel?.popover?.(() => setPanelItem(null))}
          </InlinePopover>
        </div>
        {leave && slot(leave)}
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
          zIndex={BAR_LAYER}
          data-testid={`${testId}-popover`}
        >
          {panelOpen && item.popover!(() => setOpen(false))}
        </InlinePopover>
      )}
    </T>
  );
}

export default HuddleBar;
