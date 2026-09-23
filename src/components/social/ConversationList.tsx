// ConversationList — Slack-style DM inbox rows: avatar (or stacked
// avatars for groups), peer name(s), a truncated last-message preview,
// the message time, and an unread badge. Purely presentational — the
// consumer maps its DM channels + presence roster into items and owns
// selection/navigation via `onSelect`.
//
// Timestamps are day-aware (via conversationStamp): the time for today, the
// word for yesterday, a short weekday inside the week, a date beyond it. A
// bare HH:MM is right in a transcript, where a day separator sits above the
// row, and wrong here, where nothing does — `21:52` on a channel untouched
// since Sunday reads as tonight. The label still changes only at midnight,
// never continuously, so a row does not rerender because time passed.
//
// Both tones: 'light' (default) uses theme tokens; 'dark' swaps to
// white/alpha classes so the list can sit on call chrome (e.g. inside a
// CallSidePanel or the CallSettingsDialog Chat tab).

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { Avatar, AvatarGroup } from '../shared/Avatar';
import { PresenceDot } from '../shared/PresenceDot';
import { DropdownMenu, type DropdownMenuItem } from '../shared/DropdownMenu';
import { BellMutedIcon, EditIcon, FolderIcon, PhoneIcon, PinIcon, VideoCallIcon } from '../ui/Icons';
import { RailSectionHeader, type RailSectionAction } from './RailSectionHeader';
import { conversationStamp, fullTimestampLabel } from './dayBoundary';

/**
 * Most-recent-first, with never-used conversations after every used one.
 *
 * The list used to render in whatever order the caller assembled it, which in
 * the app meant "rooms in whatever order the rooms API returned, then DMs".
 * Measured on a real dev account: forty-two abandoned test rooms
 * (`probe*`, `endaudit*`, `doc-join-*`, `masscast*`) sat above the only
 * conversation with a message in it, and the first DM row was the 90th of 120
 * tab stops on the page.
 *
 * Recency is the ordering a message list actually wants, and it is the one
 * that keeps working as the data changes: a room nobody has spoken in sinks on
 * its own, without anyone having to go and delete it. A row with no
 * `lastMessageAt` is not "oldest" — it has never been used at all — so it
 * sorts below every timestamped row rather than at some arbitrary epoch.
 *
 * Ties keep their incoming order (Array.prototype.sort is stable), so a caller
 * that has its own opinion about two silent rooms still gets it.
 */
function byRecency(a: ConversationItem, b: ConversationItem): number {
    const ta = a.lastMessageAt ? Date.parse(a.lastMessageAt) : NaN;
    const tb = b.lastMessageAt ? Date.parse(b.lastMessageAt) : NaN;
    const va = Number.isNaN(ta) ? null : ta;
    const vb = Number.isNaN(tb) ? null : tb;
    if (va === null && vb === null) return 0;
    if (va === null) return 1;
    if (vb === null) return -1;
    return vb - va;
}

export interface ConversationPeer {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  color?: string;
  /** Presence: true → online dot, false → offline dot, undefined → no dot. */
  online?: boolean;
}

export interface ConversationItem {
  /** Chat channel id — handed back verbatim by `onSelect`. */
  channel: string;
  /**
   * What kind of conversation this is.
   *
   * The server already models all three as ONE thing — a room carries
   * `type: 'standalone' | 'group' | 'dm'` — so they belong in one list rather
   * than three panels with three "new" buttons. This only changes how the row
   * IDENTIFIES itself:
   *
   *   'dm'      → the peer's avatar and name
   *   'group'   → stacked avatars, all the names
   *   'channel' → a # and the channel's own name. A channel is not the sum of
   *               its members; #general does not want forty stacked avatars,
   *               and its identity survives everyone leaving.
   *
   * Defaults to peer-derived ('dm' or 'group' by peer count), so every existing
   * caller keeps the rows it already had.
   */
  kind?: 'dm' | 'group' | 'channel';
  /** Required for `kind: 'channel'` — the channel's name, without the '#'. */
  name?: string;
  /** 1 peer for a 1:1 conversation, N for groups. Empty for a channel. */
  peers: ConversationPeer[];
  lastMessagePreview?: string;
  /** ISO timestamp of the last message. Rendered as HH:MM. */
  lastMessageAt?: string;
  unreadCount?: number;
  /**
   * Somebody named YOU in this conversation.
   *
   * Separate from `unreadCount` because they answer different questions and
   * only one of them is urgent: unread is "there is traffic here", a mention
   * is "someone is waiting on you". Rolling them into one number is how a
   * mention gets lost inside a busy channel's 40 unread.
   */
  mentioned?: boolean;
  /**
   * A call is happening in this conversation RIGHT NOW.
   *
   * Its own signal, for the same reason `mentioned` is: unread says "there is
   * traffic here", a mention says "someone is waiting on you", and this says
   * "something is happening that you can still join". Only the last one
   * expires — a call you learn about afterwards is a fact, not an invitation.
   *
   * Until this existed a call was invisible from the list: the thread posted a
   * card when the call ENDED, so the only way to discover one in progress was
   * to already be looking at the conversation it was in. For a stream meant
   * for an audience that is the whole problem — nobody can watch what nobody
   * can find.
   */
  live?: boolean;
  /**
   * Kept at the top of the rail, above every other row and out of recency's
   * reach — the two or three conversations a person returns to all day.
   *
   * Pinned rows form ONE group regardless of kind: a pin says "I want this
   * where I can find it", and splitting the pins back into Channels and
   * Direct messages puts them back where they were.
   */
  pinned?: boolean;
  /**
   * A heading this person filed the row under — the Slack/Teams "custom
   * section". Absent or blank means the default grouping.
   *
   * Sections sit ABOVE Channels and Direct messages and below Pinned: someone
   * who has made a section has said, in the strongest terms the rail offers,
   * where they want this thread. A pin still outranks it — "keep this in
   * reach" is a stronger statement than "file this under Work", and a pinned
   * row pulled down into a section is a pin that stopped working.
   *
   * Filing is per person and per conversation, so two people in one channel
   * can file it differently and neither sees the other's arrangement.
   */
  section?: string | null;
  /**
   * Muted: traffic here is not worth interrupting for.
   *
   * The row still counts its unread — muting is not hiding — but the badge
   * loses its accent, so a glance down the rail separates "someone is talking"
   * from "someone wants me". A MENTION keeps its full-strength marker even
   * here, because being named is the one thing a mute is not meant to swallow.
   */
  muted?: boolean;
}

export interface ConversationListProps {
  items: ConversationItem[];
  /** Channel of the conversation currently open — its row highlights. */
  activeChannel?: string | null;
  onSelect: (channel: string) => void;
  /** Renders a "+ New chat" affordance above the rows when set. */
  onNewChat?: () => void;
  /** Empty-state text. Defaults to "No conversations yet". */
  emptyLabel?: string;
  /**
   * Split the list into Channels and Direct messages, the way Slack and Teams
   * do.
   *
   * A flat list mixing the two is scannable at four rows and not at forty: a
   * channel and a person are different kinds of destination, and the eye
   * looks for them in different places. Off by default so existing callers —
   * a compact sidebar, a call's people list — keep the single run they were
   * designed around.
   */
  grouped?: boolean;
  /**
   * Which group leads when `grouped`.
   *
   * `'channels-first'` (the default, and what every existing caller keeps) is
   * the Slack shape and is right when channels are things you deliberately
   * joined. `'dms-first'` is right on a surface whose subject is people: a DM
   * is addressed to you personally and a channel is not, and on a rail with
   * forty rooms in it that difference is the only thing keeping a new message
   * from a colleague above the fold.
   */
  sectionOrder?: 'channels-first' | 'dms-first';
  /**
   * Trailing buttons on a section's heading, keyed by the section's name —
   * 'Channels', 'Direct messages', 'Pinned'. A + on the Channels heading is
   * where people look for "make a new one"; a "new" button parked somewhere
   * else is a button nobody finds.
   */
  sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
  /**
   * Which sections are folded away, keyed by the section's name the way
   * `sectionActions` is — 'Pinned', 'Channels', 'Direct messages'.
   *
   * Controlled, and only live once `onToggleSection` is given: a collapsed
   * section with no handler is one nothing can reopen. The host owns the state
   * because this is a preference worth persisting — a rail that forgets which
   * sections you folded is one you refold every morning.
   *
   * Not to be confused with the "Show N more" cap (`maxVisible`), which is
   * this component's own state and a different idea: the cap trims a long
   * section down to its top rows, this hides the section outright. Neither
   * resets the other, so reopening a section brings back exactly the rows it
   * had.
   */
  collapsedSections?: Readonly<Record<string, boolean>>;
  /** Fires with the section's name and the state the host should switch to. */
  onToggleSection?: (label: string, next: boolean) => void;
  /**
   * Start a call in a conversation from the rail — the row's ⋯ gains "Call"
   * and "Video call". A conversation you can open is one you can call into,
   * and making people open it first to find the call button is a step for
   * nothing.
   */
  onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
  /**
   * Sort rows most-recent-first within each group. Default TRUE.
   *
   * Off for a caller whose order already means something — a call's people
   * list is in join order, and re-sorting it by "last message" would shuffle
   * the participants of a live call every time somebody spoke.
   */
  sortByRecency?: boolean;
  /**
   * Show at most this many rows per group, with a "Show N more" row after
   * them that expands the group in place (and "Show less" to fold it back).
   *
   * A rail is a place to find the conversation you want, and past a handful
   * of rows the eye stops scanning and starts reading. With recency sorting
   * on, the cut keeps the most recent; the open conversation is always kept
   * visible so the highlight never sits inside the folded part. Unset shows
   * everything, which is what every existing caller gets.
   */
  maxVisible?: number;
  /**
   * Per-row actions, the way Teams and Slack hang them off a conversation:
   * a ⋯ button revealed on hover or focus, never a second permanent control
   * competing with the row itself. Each is optional and its menu row appears
   * only when the handler does — a rail that cannot mute should not offer to.
   *
   * `next` is the state being asked for, not the state now, so a host never
   * has to re-derive the flip.
   */
  onTogglePin?: (channel: string, next: boolean) => void;
  onToggleMute?: (channel: string, next: boolean) => void;
  /** Absent from a row that is already unread — there is nothing to mark. */
  onMarkUnread?: (channel: string) => void;
  /**
   * Rename this conversation — the Teams/Slack "Rename channel" row.
   *
   * Offered per row rather than per list because renaming is a permission:
   * the host knows which conversations this reader owns, and a row that
   * cannot be renamed should not say it can. Pass a handler only for rows
   * where it is allowed (see `canRename`).
   */
  onRename?: (channel: string) => void;
  /**
   * "Move to section…" — file this row under one of the person's own
   * headings. The host owns the picker; this only reports the intent.
   *
   * Offered on every row when given, unlike Rename: filing is the reader's
   * own arrangement of their own rail, so it needs no permission from anyone
   * and applies as well to a DM as to a channel.
   */
  onSetSection?: (channel: string) => void;
  /**
   * Which rows accept a rename. Defaults to "all of them" when `onRename` is
   * given. A DM has no name of its own — it is named by the people in it — so
   * a host will typically answer false for those.
   */
  canRename?: (item: ConversationItem) => boolean;
  tone?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

export function ConversationList({
  items,
  grouped = false,
  sectionOrder = 'channels-first',
  sectionActions,
  collapsedSections,
  onToggleSection,
  onStartCall,
  sortByRecency = true,
  maxVisible,
  activeChannel,
  onSelect,
  onNewChat,
  emptyLabel = 'No conversations yet',
  onTogglePin,
  onToggleMute,
  onMarkUnread,
  onRename,
  canRename,
  onSetSection,
  tone = 'light',
  className,
  'data-testid': testId,
}: ConversationListProps) {
  const dark = tone === 'dark';
  // Derived testids need a base even when the caller passed none, or every
  // hook below reads `undefined-row-menu-general`.
  const idBase = testId ?? 'conversation';
  // A collapsed section the host cannot hear about is one nothing reopens, so
  // the handler — not the map — is what turns the headings into controls.
  const sectionsCollapsible = onToggleSection !== undefined;
  // Two rails on one page (a sidebar and a dialog) would otherwise mint the
  // same "channels" id twice and cross-wire each other's aria-controls.
  const uid = useId();
  const sectionDomId = (label: string, part: 'content' | 'toggle') =>
    `${uid}${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${part}`;

  // One SCROLL container holding one <ul> per group, rather than one <ul>
  // with headings interleaved as `aria-hidden` list items.
  //
  // The old shape hid the headings from assistive technology on the grounds
  // that "the rows carry the semantics", and the rows do — but the BOUNDARY
  // was then carried by nothing at all: a screen-reader user got one
  // undifferentiated run of forty-odd buttons with no way to tell a room from
  // a person. A list per group puts that fact where AT already looks for it
  // (`<ul aria-label="Direct messages">` announces the name and the count on
  // entry), and the visible heading stays presentational because it would
  // otherwise be read out twice.
  //
  // Scrolling and tab order are unchanged: the wrapper below is the single
  // scroll container, and DOM order across the lists is still one sequence.
  const ordered = sortByRecency ? [...items].sort(byRecency) : items;
  const sections: Array<{ heading?: string; label: string; items: ConversationItem[] }> = [];
  // Pins come out first and stay together: a pinned channel and a pinned DM
  // are both "the ones I keep", and sorting them back into their kinds is the
  // thing a pin was pressed to undo. Recency still orders them among
  // themselves. Everything else groups exactly as it did before.
  const pinnedRows = ordered.filter((i) => i.pinned);
  const unpinned = pinnedRows.length > 0 ? ordered.filter((i) => !i.pinned) : ordered;
  if (pinnedRows.length > 0) {
    sections.push({ heading: 'Pinned', label: 'Pinned', items: pinnedRows });
  }
  // Custom sections, between the pins and the built-in groups. Ordered by
  // NAME rather than by recency: a person's own headings are a filing system,
  // and a filing system whose drawers move around defeats the point of having
  // made it. Rows inside a section are still ordered by recency.
  const sectionName = (i: ConversationItem) => (i.section ?? '').trim();
  const filed = unpinned.filter((i) => sectionName(i) !== '');
  const unfiled = filed.length > 0 ? unpinned.filter((i) => sectionName(i) === '') : unpinned;
  if (filed.length > 0) {
    const byName = new Map<string, ConversationItem[]>();
    for (const item of filed) {
      const name = sectionName(item);
      const bucket = byName.get(name);
      if (bucket) bucket.push(item);
      else byName.set(name, [item]);
    }
    for (const name of [...byName.keys()].sort((a2, b2) => a2.localeCompare(b2))) {
      sections.push({ heading: name, label: name, items: byName.get(name)! });
    }
  }
  if (grouped) {
    const isChannelRow = (i: ConversationItem) =>
      (i.kind ?? (i.peers.length > 1 ? 'group' : 'dm')) === 'channel';
    const channels = unfiled.filter(isChannelRow);
    const directs = unfiled.filter((i) => !isChannelRow(i));
    // A heading with nothing under it is a promise of content that is not
    // there, so each one appears only when its group does.
    const channelSection = { heading: 'Channels', label: 'Channels', items: channels };
    const directSection = { heading: 'Direct messages', label: 'Direct messages', items: directs };
    const inOrder = sectionOrder === 'dms-first'
      ? [directSection, channelSection]
      : [channelSection, directSection];
    for (const section of inOrder) if (section.items.length > 0) sections.push(section);
  } else if (unfiled.length > 0) {
    sections.push({ label: 'Conversations', items: unfiled });
  }

  // ── Roving focus ───────────────────────────────────────────────────
  // Every row is a real <button>, so before this each one was its own tab
  // stop: a rail with 43 rows cost 43 Tab presses to cross, and everything
  // after it — the transcript, the composer — sat behind all of them.
  //
  // The rows keep their button semantics (Enter and Space still activate,
  // which is what a list of destinations should do); what changes is that
  // only ONE of them is in the tab order at a time and Up/Down move between
  // them. Tab now enters the list once and leaves once.
  // Top-k per group. Lifting the cap is per section and lives here: the caller
  // asked for a cap, not for a second piece of state to carry around.
  //
  // Deliberately NOT the same set as `collapsedSections`. "Show the rest of
  // this section" and "hide this section" are two different questions about
  // one heading, and folding them together would mean reopening a section
  // silently re-trimmed it — the rows you had expanded gone, with nothing on
  // screen explaining why.
  const [uncappedSections, setUncappedSections] = useState<ReadonlySet<string>>(() => new Set());
  const visibleSections = sections.map((section) => {
    // Only a section with a heading can be folded — the heading is the
    // control, and the ungrouped single run has none.
    const collapsible = sectionsCollapsible && section.heading !== undefined;
    const collapsed = collapsible && collapsedSections?.[section.label] === true;
    const capped = maxVisible !== undefined && maxVisible >= 0 && section.items.length > maxVisible;
    const base = { ...section, collapsible, collapsed, capped };
    if (!capped || uncappedSections.has(section.label)) {
      return { ...base, shown: section.items, hidden: 0 };
    }
    let shown = section.items.slice(0, maxVisible);
    const active = activeChannel ? section.items.find((i) => i.channel === activeChannel) : undefined;
    if (active && !shown.includes(active)) {
      shown = maxVisible === 0 ? [active] : [...shown.slice(0, -1), active];
    }
    return { ...base, shown, hidden: section.items.length - shown.length };
  });
  const toggleCap = (label: string) =>
    setUncappedSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  // A collapsed section's rows leave the roving rotation with the same
  // expression that stops them rendering. Arrow-reaching a row that is not on
  // screen moves focus to nothing a sighted keyboard user can follow, and the
  // cursor below is derived from exactly this array.
  const rows = visibleSections.flatMap((section) => (section.collapsed ? [] : section.shown));
  const listRef = useRef<HTMLDivElement>(null);
  const [rovingChannel, setRovingChannel] = useState<string | null>(null);
  // The cursor starts on the OPEN conversation, so tabbing into the rail lands
  // on where you already are rather than at the top of a list you have to
  // walk back down. It follows `activeChannel` for the same reason.
  const cursorChannel =
    (rovingChannel && rows.some((r) => r.channel === rovingChannel) ? rovingChannel : null)
    ?? (activeChannel && rows.some((r) => r.channel === activeChannel) ? activeChannel : null)
    ?? rows[0]?.channel
    ?? null;

  // Focus follows the cursor only when the move came from a key press inside
  // the list. Without this guard the list would steal focus whenever the
  // active conversation changed for any other reason — a notification, a
  // deep link — and yank the caret out of whatever the user was typing.
  const pendingFocusRef = useRef<string | null>(null);
  useEffect(() => {
    const channel = pendingFocusRef.current;
    if (!channel) return;
    pendingFocusRef.current = null;
    const el = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-testid="conversation-row"][data-channel="${CSS.escape(channel)}"]`,
    );
    el?.focus();
    // Keep the newly focused row on screen in a long list. `nearest` so a row
    // that is already visible does not scroll the rail out from under the eye.
    el?.scrollIntoView({ block: 'nearest' });
  });

  function moveCursor(to: number) {
    const clamped = Math.max(0, Math.min(rows.length - 1, to));
    const next = rows[clamped];
    // Nothing to do at either end of the list — and doing nothing has to mean
    // NOTHING. Setting `pendingFocusRef` for a move that does not change the
    // cursor leaves it armed: `setRovingChannel` with the same value does not
    // re-render, so the effect that consumes the ref never runs, and the
    // request sits there until some UNRELATED render fires it. Observed in
    // the browser as focus jumping to a conversation row several actions
    // later — pressing ArrowDown on the last row, then reacting to a message,
    // moved focus into the rail.
    if (!next || next.channel === cursorChannel) return;
    pendingFocusRef.current = next.channel;
    setRovingChannel(next.channel);
  }

  function handleListKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (rows.length === 0) return;
    const at = rows.findIndex((r) => r.channel === cursorChannel);
    const from = at < 0 ? 0 : at;
    switch (e.key) {
      case 'ArrowDown': moveCursor(from + 1); break;
      case 'ArrowUp': moveCursor(from - 1); break;
      case 'Home': moveCursor(0); break;
      case 'End': moveCursor(rows.length - 1); break;
      default: return;
    }
    // Only after a handled key: PageUp and friends still scroll the rail, and
    // Home/End inside a row's own text field are not ours to intercept.
    e.preventDefault();
  }

  return (
    <div className={cn('flex min-h-0 flex-col gap-1', className)} data-testid={testId}>
      {onNewChat && (
        <button
          type="button"
          onClick={onNewChat}
          data-testid="conversation-new-chat"
          className={cn(
            'flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
            dark
              ? 'text-white/80 hover:bg-white/10 hover:text-white'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'grid h-6 w-6 place-items-center rounded-full border border-dashed text-sm leading-none',
              dark ? 'border-white/30' : 'border-border',
            )}
          >
            +
          </span>
          New chat
        </button>
      )}

      {items.length === 0 ? (
        <p
          className={cn('m-0 px-2 py-1.5 text-[13px]', dark ? 'text-white/60' : 'text-text-secondary')}
          data-testid="conversation-empty"
        >
          {emptyLabel}
        </p>
      ) : (
        <div
          ref={listRef}
          onKeyDown={handleListKeyDown}
          className="m-0 flex min-h-0 flex-col overflow-y-auto p-0"
        >
          {visibleSections.map((section) => {
            const contentId = sectionDomId(section.label, 'content');
            const toggleId = sectionDomId(section.label, 'toggle');
            const sectionContent = section.collapsed ? null : (
              <>
              <ul
                className="m-0 flex list-none flex-col gap-0.5 p-0"
                // While the heading is a control it IS the section's name, and
                // the list points at it rather than repeating the same word in
                // an aria-label of its own — otherwise entering the section
                // announces "Channels" twice.
                aria-label={section.collapsible ? undefined : section.label}
                aria-labelledby={section.collapsible ? toggleId : undefined}
              >
          {section.shown.map((item) => {
            const isActive = item.channel === activeChannel;
            const isCursor = item.channel === cursorChannel;
            const kind = item.kind ?? (item.peers.length > 1 ? 'group' : 'dm');
            const isChannel = kind === 'channel';
            const isGroup = kind === 'group';
            const primary = item.peers[0];
            // A channel is named, not enumerated. Falling back to the channel
            // id keeps a mislabelled row readable instead of blank.
            const names = isChannel
              ? (item.name ?? item.channel)
              : item.peers.map((p) => p.displayName).join(', ');
            // Day-aware, because a rail row has no day separator above it to
            // lend the bare HH:MM a date. See `conversationStamp`.
            const time = item.lastMessageAt ? conversationStamp(item.lastMessageAt) : '';
            const timeTitle = item.lastMessageAt ? fullTimestampLabel(item.lastMessageAt) : '';
            const unread = item.unreadCount ?? 0;
            const mentioned = !!item.mentioned;
            const live = !!item.live;
            const muted = !!item.muted;
            const menuTestId = `${idBase}-row-menu-${item.channel}`;
            const menuItems: DropdownMenuItem[] = [];
            if (onStartCall) {
              menuItems.push({
                label: 'Call',
                icon: <PhoneIcon size={14} />,
                onSelect: () => onStartCall(item.channel, 'audio'),
                'data-testid': `${menuTestId}-call`,
              });
              menuItems.push({
                label: 'Video call',
                icon: <VideoCallIcon size={14} />,
                onSelect: () => onStartCall(item.channel, 'video'),
                'data-testid': `${menuTestId}-video-call`,
              });
            }
            if (onTogglePin) {
              menuItems.push({
                label: item.pinned ? 'Unpin' : 'Pin',
                icon: <PinIcon size={14} />,
                onSelect: () => onTogglePin(item.channel, !item.pinned),
                'data-testid': `${menuTestId}-pin`,
              });
            }
            if (onToggleMute) {
              menuItems.push({
                label: muted ? 'Unmute' : 'Mute',
                icon: <BellMutedIcon size={14} />,
                onSelect: () => onToggleMute(item.channel, !muted),
                'data-testid': `${menuTestId}-mute`,
              });
            }
            if (onRename && (canRename ? canRename(item) : true)) {
              menuItems.push({
                label: 'Rename',
                icon: <EditIcon size={14} />,
                onSelect: () => onRename(item.channel),
                'data-testid': `${menuTestId}-rename`,
              });
            }
            if (onSetSection) {
              menuItems.push({
                label: sectionName(item) ? `Move from ${sectionName(item)}\u2026` : 'Move to section\u2026',
                icon: <FolderIcon size={14} />,
                onSelect: () => onSetSection(item.channel),
                'data-testid': `${menuTestId}-section`,
              });
            }
            // Nothing to mark on a row that already carries unread.
            if (onMarkUnread && unread === 0) {
              menuItems.push({
                label: 'Mark as unread',
                onSelect: () => onMarkUnread(item.channel),
                'data-testid': `${menuTestId}-unread`,
              });
            }
            return (
              <li key={item.channel} className={cn('relative', menuItems.length > 0 && 'group')}>
                <button
                  type="button"
                  onClick={() => onSelect(item.channel)}
                  // A click moves the roving cursor too, so a subsequent
                  // ArrowDown continues from the row you just used rather
                  // than from wherever the keyboard last was.
                  onFocus={() => setRovingChannel(item.channel)}
                  data-testid="conversation-row"
                  data-channel={item.channel}
                  data-active={isActive ? 'true' : 'false'}
                  aria-current={isActive ? 'true' : undefined}
                  // Roving: exactly one row is in the tab order. See the
                  // cursor block above for why.
                  tabIndex={isCursor ? 0 : -1}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left',
                    // The ⋯ gets a lane of its own rather than sitting on top
                    // of the badges: an unread count covered by a menu button
                    // on hover is a number that disappears when you reach for
                    // it. Reserved only where a menu exists at all.
                    menuItems.length > 0 && 'pr-8',
                    // The rail is the page's primary navigation and had no
                    // focus style of its own — only the UA outline, which
                    // several surrounding surfaces suppress.
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                    dark ? 'hover:bg-white/10' : 'hover:bg-surface-hover',
                    isActive && (dark ? 'bg-white/10' : 'bg-surface-hover'),
                  )}
                >
                  {/* Avatar (1:1) or stacked avatars (group), with a
                      presence dot only when the peer's presence is known. */}
                  {isChannel ? (
                    <span
                      aria-hidden="true"
                      data-testid="conversation-channel-glyph"
                      className={cn(
                        'grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none',
                        dark ? 'bg-white/10 text-white/70' : 'bg-surface-inset text-text-secondary',
                      )}
                    >
                      #
                    </span>
                  ) : isGroup ? (
                    <AvatarGroup
                      size={28}
                      maxVisible={2}
                      items={item.peers.map((p) => ({
                        name: p.displayName,
                        color: p.color,
                        src: p.avatarUrl,
                      }))}
                    />
                  ) : primary ? (
                    <span className="relative inline-flex shrink-0">
                      <Avatar
                        name={primary.displayName}
                        color={primary.color}
                        src={primary.avatarUrl}
                        size={28}
                      />
                      {primary.online !== undefined && (
                        <PresenceDot
                          state={primary.online ? 'online' : 'offline'}
                          pulse={false}
                          className={cn(
                            'absolute -bottom-0.5 -right-0.5 rounded-full ring-2',
                            dark ? 'ring-call-chrome' : 'ring-surface',
                          )}
                        />
                      )}
                    </span>
                  ) : null}

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-baseline gap-2">
                      <span
                        className={cn(
                          'min-w-0 flex-1 truncate text-[13px]',
                          unread > 0 ? 'font-semibold' : 'font-medium',
                          dark ? 'text-white' : 'text-text-primary',
                        )}
                      >
                        {names}
                      </span>
                      {item.pinned && (
                        <span
                          data-testid={`${idBase}-pinned`}
                          title="Pinned"
                          className={cn('shrink-0', dark ? 'text-white/50' : 'text-text-tertiary')}
                        >
                          <PinIcon size={12} />
                        </span>
                      )}
                      {muted && (
                        <span
                          data-testid={`${idBase}-muted`}
                          title="Muted"
                          className={cn('shrink-0', dark ? 'text-white/50' : 'text-text-tertiary')}
                        >
                          <BellMutedIcon size={12} />
                        </span>
                      )}
                      {time && (
                        <time
                          dateTime={item.lastMessageAt}
                          title={timeTitle}
                          className={cn('shrink-0 text-[11px] tabular-nums', dark ? 'text-white/50' : 'text-text-tertiary')}
                          data-testid="conversation-time"
                        >
                          {time}
                        </time>
                      )}
                    </span>
                    {item.lastMessagePreview && (
                      <span
                        className={cn('truncate text-[12px]', dark ? 'text-white/60' : 'text-text-secondary')}
                        data-testid="conversation-preview"
                      >
                        {item.lastMessagePreview}
                      </span>
                    )}
                  </span>

                  {/* Shown ALONGSIDE the unread count, never instead of it.
                      "40 unread" and "one of them is about you" are different
                      facts, and collapsing them is how a mention gets lost
                      inside a busy channel. */}
                  {/* First in the row: it is the only one of these badges
                      that is time-limited. */}
                  {live && (
                    <span
                      data-testid="conversation-live"
                      aria-label="Call in progress"
                      title="Call in progress"
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
                      Live
                    </span>
                  )}
                  {mentioned && (
                    <span
                      data-testid="conversation-mention"
                      aria-label="You were mentioned"
                      title="You were mentioned"
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger text-[11px] font-bold leading-none text-white"
                    >
                      @
                    </span>
                  )}
                  {unread > 0 && (
                    <span
                      data-testid="conversation-unread"
                      data-muted={muted ? 'true' : 'false'}
                      className={cn(
                        'grid h-5 min-w-5 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-semibold leading-none',
                        // Muted keeps the count and drops the accent: the
                        // traffic is still worth knowing about, just not worth
                        // pulling the eye across the rail for.
                        muted
                          ? (dark ? 'bg-white/15 text-white/70' : 'bg-surface-inset text-text-secondary')
                          : 'bg-primary text-on-primary',
                      )}
                    >
                      {unread > 99 ? '99+' : unread}
                    </span>
                  )}
                </button>
                {menuItems.length > 0 && (
                  <span
                    className={cn(
                      'absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity',
                      'group-hover:opacity-100 group-focus-within:opacity-100',
                      // While its own menu is open, and on a touch screen,
                      // where there is no hover to reveal it with.
                      'has-[[aria-expanded=true]]:opacity-100',
                      '[@media(hover:none)]:opacity-100',
                    )}
                  >
                    <DropdownMenu
                      trigger={<span aria-hidden className="leading-none tracking-wide">⋯</span>}
                      triggerLabel={`More options for ${names}`}
                      triggerTitle="More options"
                      // Only the row the roving cursor is on is tabbable, so
                      // the list still costs one Tab to enter and one to
                      // leave; Tab from that row reaches its menu.
                      triggerTabIndex={isCursor ? 0 : -1}
                      triggerTestId={menuTestId}
                      triggerClassName={cn(
                        'h-6 w-6 rounded-md border-0 p-0 text-[13px]',
                        dark
                          ? 'text-white/70 hover:bg-white/15'
                          : 'text-text-secondary hover:bg-surface-hover',
                      )}
                      align="end"
                      sections={[{ items: menuItems }]}
                      data-testid={`${menuTestId}-panel`}
                    />
                  </span>
                )}
              </li>
            );
          })}
              </ul>
              {section.capped && (
                <button
                  type="button"
                  onClick={() => toggleCap(section.label)}
                  aria-expanded={section.hidden === 0}
                  data-testid="conversation-show-more"
                  className={cn(
                    'mt-0.5 flex w-full cursor-pointer items-center rounded-lg px-2 py-1 text-left text-[12px] font-medium',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                    dark
                      ? 'text-white/60 hover:bg-white/10 hover:text-white'
                      : 'text-text-tertiary hover:bg-surface-hover hover:text-text-primary',
                  )}
                >
                  {section.hidden > 0 ? `Show ${section.hidden} more` : 'Show less'}
                </button>
              )}
              </>
            );
            return (
            <div key={section.label}>
              {section.heading && (
                <RailSectionHeader
                  label={section.heading}
                  dark={dark}
                  actions={sectionActions?.[section.label] ?? []}
                  {...(section.collapsible
                    ? {
                        collapsed: section.collapsed,
                        onToggleCollapse: (next: boolean) => onToggleSection?.(section.label, next),
                        controls: contentId,
                        toggleId,
                        // The data is already in hand — every row carries its
                        // own unread — so a folded section can say what is
                        // waiting in it instead of going silent.
                        collapsedCount: section.items.reduce((n, i) => n + (i.unreadCount ?? 0), 0),
                      }
                    : {})}
                  data-testid="conversation-section"
                />
              )}
              {/* The wrapper exists only to give `aria-controls` something
                  that survives collapsing; a caller with no collapse props
                  gets the same DOM it always had. */}
              {section.collapsible ? <div id={contentId}>{sectionContent}</div> : sectionContent}
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ConversationList;
