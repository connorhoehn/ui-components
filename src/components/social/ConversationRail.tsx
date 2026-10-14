// ConversationRail — the whole left side of a chat app: the shelf of fixed
// destinations, and the conversations that come and go beneath it.
//
// ## Why this exists as one component
//
// The shelf and the list look like two independent widgets, and assembling
// them looks trivial — an <aside>, a <ConversationShelf>, a
// <ConversationList>. It is not trivial, because they share one thing that
// neither of them owns: WHAT THE PANE IS SHOWING. Mentions and #general
// cannot both be open. Every host that wires the two by hand has to remember
// to clear the other one's selection, and the failure when it forgets is not
// a crash — it is a rail with two highlighted rows and a pane showing only
// one of them.
//
// So the rail takes ONE selection and hands back ONE selection:
//
//   { kind: 'shelf', id: 'mentions' } | { kind: 'conversation', channel: 'general' }
//
// The exclusivity is then structural. There is no second state to forget.
//
// ## What stays outside
//
// The rail renders no pane. It reports what was picked and lets the host
// route — because "open the mentions view" and "open a thread" are the
// host's screens, and a rail that owned them could not be dropped into an
// app that already has its own.

import { useRef, useState, type ReactNode } from 'react';
import { WorkspaceRail } from '../layout/WorkspaceRail';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon, MoreIcon, SearchIcon } from '../ui/Icons';
import { SearchInput } from '../shared/SearchInput';
import { DropdownMenu } from '../shared/DropdownMenu';
import { cn } from '../../lib/cn';
import { RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK } from '../shared/railType';
import { RailSectionHeader } from './RailSectionHeader';
import { T } from '../shared/Text';
import { ConversationList, type ConversationItem } from './ConversationList';
import { ConversationShelf, type ConversationShelfItem } from './ConversationShelf';
import type { RailSectionAction } from './RailSectionHeader';

/**
 * The rail's one horizontal inset (2.432.0): every section heading's caret,
 * every row's leading glyph or avatar, the shelf bar's first icon and a host
 * section's own content start 16px from the rail's left edge. Sections sit in
 * an 8px gutter (`RAIL_SECTION_GUTTER`) and draw their own 8px inside it, the
 * way `RailSectionHeader` and the conversation rows already do; a host
 * section that is not built from those (a grid, a note) takes
 * `RAIL_SECTION_CONTENT_INSET` on its content.
 */
export const RAIL_SECTION_GUTTER = 'px-2';
export const RAIL_SECTION_CONTENT_INSET = 'px-2';

/**
 * A host section placed in the rail's arrangeable order (2.432.0).
 *
 * Two forms. DATA (2.438.0, the rail model): give `rows` and the rail draws
 * the heading — its fold (`collapsedSections` / `onToggleSection`, keyed by
 * `label` like the rail's own groups) and its `count` — and the rows, with
 * the open row marked and `emptyLabel` / `note` when there are none; build
 * one with `buildRailSection`. NODE: give `node` for content that is not a
 * conversation list (a people grid, a team tree); with `heading` the rail
 * still draws the heading, its fold and count over it.
 */
export interface ConversationRailSection {
  /** Stable id — what `sectionLayout` stores. `dms` and `channels` are the rail's own. */
  id: string;
  /** The heading it goes by — what "Arrange sections" lists, and its fold key. */
  label: string;
  /** Custom content, drawn as given (under the rail's heading when `heading`). */
  node?: ReactNode;
  /** Draw the rail's heading (fold + count) over `node`. Data sections always have it. */
  heading?: boolean;
  /** The heading's count: the records the host holds, not the rows the find filter left. */
  count?: number;
  /** Data form: the section's rows. */
  rows?: ConversationItem[];
  /** The open row (its `channel` key). */
  activeRow?: string | null;
  /** A row was chosen: its key. */
  onSelectRow?: (key: string) => void;
  /** Shown when `rows` is empty. */
  emptyLabel?: string;
  /** One line instead of the rows (an account that cannot have any). */
  note?: string;
  /** Rows before "Show N more". */
  maxVisible?: number;
  /** Root test id: the section is `<id>-section`, its rows `<id>`, its note `<id>-note`. */
  'data-testid'?: string;
}

/** The rail's own conversation groups, as arrangeable sections. */
export const RAIL_DMS_SECTION = 'dms';
export const RAIL_CHANNELS_SECTION = 'channels';

/**
 * Reconcile a stored order with the sections present now: known ids in the
 * stored order, then any new ones in their default place. Pure, exported for
 * hosts that persist the order.
 */
export function arrangeRailSections(defaultOrder: readonly string[], stored: readonly string[] | null | undefined): string[] {
  const known = new Set(defaultOrder);
  const kept = (stored ?? []).filter((id, i, all) => known.has(id) && all.indexOf(id) === i);
  const missing = defaultOrder.filter((id) => !kept.includes(id));
  // A missing id goes back after the kept id that precedes it by default.
  const out = [...kept];
  for (const id of missing) {
    const before = defaultOrder.slice(0, defaultOrder.indexOf(id)).reverse().find((d) => out.includes(d));
    out.splice(before ? out.indexOf(before) + 1 : 0, 0, id);
  }
  return out;
}

/**
 * What the rail currently points at. One value, because one pane.
 */
export type RailSelection =
  | { kind: 'shelf'; id: string }
  | { kind: 'conversation'; channel: string };

export interface ConversationRailProps {
  /**
   * Persistent destinations — Mentions, Threads, Drafts. Empty renders
   * nothing at all rather than an empty strip.
   */
  shelf?: readonly ConversationShelfItem[];
  conversations: ConversationItem[];
  /** Null when nothing is open — a cold start, or a pane the rail does not model. */
  selected?: RailSelection | null;
  onSelect: (selection: RailSelection) => void;
  /** Renders the "+ New chat" row above the conversations when set. */
  onNewChat?: () => void;
  /**
   * Split conversations into Channels and Direct messages. On by default
   * here — unlike the bare list, which serves compact sidebars too. A rail is
   * the full-height case, where a forty-row flat mix stops being scannable.
   */
  grouped?: boolean;
  /**
   * Which group leads. Forwarded to ConversationList — `'dms-first'` on a
   * surface whose subject is people rather than rooms.
   */
  sectionOrder?: 'channels-first' | 'dms-first';
  /** Trailing buttons on each section heading, keyed by section name. Forwarded to the list. */
  sectionActions?: Readonly<Record<string, readonly RailSectionAction[]>>;
  /**
   * Which conversation sections are folded away, keyed by section name.
   * Forwarded to the list.
   *
   * Nothing to do with `collapsed` below: that shrinks the WHOLE rail to an
   * icon strip, this folds one section inside an otherwise normal rail.
   */
  collapsedSections?: Readonly<Record<string, boolean>>;
  /** Fires with the section's name and the state to switch to. Forwarded to the list. */
  onToggleSection?: (label: string, next: boolean) => void;
  /** "Call" / "Video call" in each row's ⋯ menu. Forwarded to the list. */
  onStartCall?: (channel: string, kind: 'audio' | 'video') => void;
  /** Forwarded to the list: rows per group before a "Show N more" row. */
  maxVisible?: number;
  emptyLabel?: string;
  /** Above the shelf: a workspace switcher, a search field, a title. */
  header?: ReactNode;
  title?: string;
  actions?: ReactNode;
  /** Below the list: a "you" row, a status control. */
  /**
   * Between the shelf and the conversation list — where a team → channel
   * tree goes, so it sits above the flat conversations rather than below
   * them.
   */
  beforeList?: ReactNode;
  footer?: ReactNode;
  /**
   * Per-row actions, forwarded to the list: the ⋯ menu on each conversation.
   * Each item appears only when its handler does.
   */
  onTogglePin?: (channel: string, next: boolean) => void;
  onToggleMute?: (channel: string, next: boolean) => void;
  onMarkUnread?: (channel: string) => void;
  /** "Rename" in each row's ⋯ menu. Forwarded to the list; see its prop docs. */
  onRename?: (channel: string) => void;
  /** Which rows accept a rename. Forwarded to the list. */
  canRename?: (item: ConversationItem) => boolean;
  /** "Move to section…" in each row's ⋯ menu. Forwarded to the list. */
  onSetSection?: (channel: string) => void;
  /**
   * Opts into the Teams/Slack "shrink to an icon strip" toggle. Off by
   * default, so every existing caller keeps its always-expanded rail with no
   * behaviour change.
   */
  collapsible?: boolean;
  /**
   * Whether the rail is currently the narrow icon strip. The rail does not
   * own this — the host decides, typically from a piece of state it
   * persists, and hears about a change through `onToggleCollapse`.
   */
  collapsed?: boolean;
  /** Fires with the state the host should switch to when the toggle is used. */
  onToggleCollapse?: (next: boolean) => void;
  /**
   * `bar` (2.432.0): the shelf as one row of icon buttons with counts under
   * the header, so the conversations are not pushed four rows down. `list`
   * (default) keeps the stacked rows.
   */
  shelfLayout?: 'list' | 'bar';
  /**
   * The rail's find field, behind a search button in the header (2.432.0):
   * the field shows only once toggled (and while it holds text), takes the
   * caret when it opens, and Escape clears and closes it. Prefer this to
   * putting a SearchInput in `header`, which keeps it on screen for good.
   */
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** The button's and the field's name. Default "Find a chat". */
    label?: string;
    'data-testid'?: string;
  };
  /**
   * Host sections placed in an order the reader can change (2.432.0), around
   * the rail's own Direct messages (`dms`) and Channels (`channels`). With
   * this, `beforeList` still renders first, above every arrangeable section.
   */
  sections?: readonly ConversationRailSection[];
  /** The reader's order of section ids (`sections` + `dms` + `channels`); unknown ids are ignored. */
  sectionLayout?: readonly string[] | null;
  /**
   * The reader moved a section. Given, the header's ⋯ offers "Arrange
   * sections" (↑/↓ per section, then Done) and "Reset layout".
   */
  onSectionLayoutChange?: (order: string[] | null) => void;
  /**
   * Which sections to draw, by id — host `sections` ids and the rail's own
   * `dms` / `channels` (2.442.5). Unset (default) draws every section. A page
   * that owns one section (a route per section) passes that id, plus anything
   * it keeps on every page such as presence; the rail then draws nothing else
   * — no other caption, no other rows. The empty label shows only when a shown
   * conversation section has no rows, and "Arrange sections" is not offered,
   * because a partial view has no whole order to arrange. The reader's stored
   * `sectionLayout` still orders what is shown.
   */
  showSections?: readonly string[] | null;
  className?: string;
  'data-testid'?: string;
}

export function ConversationRail({
  shelf = [],
  conversations,
  selected = null,
  onSelect,
  onNewChat,
  grouped = true,
  sectionOrder = 'channels-first',
  sectionActions,
  collapsedSections,
  onToggleSection,
  onStartCall,
  maxVisible,
  emptyLabel,
  header,
  title,
  actions,
  beforeList,
  footer,
  onTogglePin,
  onToggleMute,
  onMarkUnread,
  onRename,
  canRename,
  onSetSection,
  collapsible = false,
  collapsed = false,
  onToggleCollapse,
  shelfLayout = 'list',
  search,
  sections,
  sectionLayout,
  onSectionLayoutChange,
  showSections,
  className,
  'data-testid': testId = 'conversation-rail',
}: ConversationRailProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [arranging, setArranging] = useState(false);
  const searchToggle = useRef<HTMLButtonElement | null>(null);
  const searchShown = !!search && (searchOpen || search.value !== '');
  const searchLabel = search?.label ?? 'Find a chat';
  const closeSearch = () => { search?.onChange(''); setSearchOpen(false); searchToggle.current?.focus(); };
  // Only collapses when the host both opted in AND set the flag — a
  // `collapsed` passed without `collapsible` is not a valid combination the
  // rail acts on, so a host that forgets the opt-in gets the plain rail
  // rather than a strip nothing can re-expand.
  const isCollapsed = collapsible && collapsed;
  const activeShelfId = selected?.kind === 'shelf' ? selected.id : null;

  const listProps = {
    sectionActions, collapsedSections, onToggleSection, onStartCall, maxVisible,
    // A shelf selection means no conversation is open, so no row is
    // active — passing the last-opened channel here is how a rail ends up
    // highlighting two things at once.
    activeChannel: selected?.kind === 'conversation' ? selected.channel : null,
    onSelect: (channel: string) => onSelect({ kind: 'conversation', channel }),
    onTogglePin, onToggleMute, onMarkUnread, onRename, canRename, onSetSection,
  };

  // ── Arrangeable sections ────────────────────────────────────────────
  const isChannelRow = (i: ConversationItem) => (i.kind ?? (i.peers.length > 1 ? 'group' : 'dm')) === 'channel';
  const builtIn: ConversationRailSection[] = sections ? [
    { id: RAIL_DMS_SECTION, label: 'Direct messages', node: null },
    { id: RAIL_CHANNELS_SECTION, label: 'Channels', node: null },
  ] : [];
  const all = sections ? [...sections, ...(sectionOrder === 'dms-first' ? builtIn : [...builtIn].reverse())] : [];
  const defaultOrder = all.map((x) => x.id);
  const shown = sections && showSections ? new Set(showSections) : null;
  const order = sections ? arrangeRailSections(defaultOrder, sectionLayout).filter((id) => !shown || shown.has(id)) : [];
  const byId = new Map(all.map((x) => [x.id, x]));
  const move = (id: string, by: -1 | 1) => {
    const next = [...order];
    const at = next.indexOf(id), to = at + by;
    if (at < 0 || to < 0 || to >= next.length) return;
    [next[at], next[to]] = [next[to]!, next[at]!];
    onSectionLayoutChange?.(next);
  };
  const dms = conversations.filter((i) => !isChannelRow(i));
  const chans = conversations.filter(isChannelRow);
  // With `showSections`, only the shown conversation groups' rows count toward the empty label.
  const showsConversations = !shown || shown.has(RAIL_DMS_SECTION) || shown.has(RAIL_CHANNELS_SECTION);
  const shownRows = shown ? (shown.has(RAIL_DMS_SECTION) ? dms.length : 0) + (shown.has(RAIL_CHANNELS_SECTION) ? chans.length : 0) : conversations.length;
  const renderSection = (id: string) => {
    if (id === RAIL_DMS_SECTION || id === RAIL_CHANNELS_SECTION) {
      const items = id === RAIL_DMS_SECTION ? dms : chans;
      if (items.length === 0) return null;
      return (
        <ConversationList key={id} items={items} grouped sectionOrder={sectionOrder} {...listProps}
          onNewChat={id === RAIL_DMS_SECTION ? onNewChat : undefined}
          className={cn(RAIL_SECTION_GUTTER, 'pb-2')} data-testid={`${testId}-list-${id}`} />
      );
    }
    const section = byId.get(id);
    if (!section) return null;
    const sectionTestId = section['data-testid'];
    const folded = !!collapsedSections?.[section.label];
    const heading = (section.rows || section.heading) && (
      <RailSectionHeader label={section.label} presentational={false} {...(typeof section.count === 'number' ? { count: section.count } : {})}
        {...(onToggleSection ? { collapsed: folded, onToggleCollapse: (next: boolean) => onToggleSection(section.label, next) } : {})}
        {...(sectionTestId ? { controls: sectionTestId } : {})} />
    );
    const body = section.rows
      ? (section.note
        ? <T as="div" size="xs" tone="tertiary" wrap className={RAIL_SECTION_CONTENT_INSET} {...(sectionTestId ? { 'data-testid': `${sectionTestId}-note` } : {})}>{section.note}</T>
        : <ConversationList items={section.rows} activeChannel={section.activeRow ?? null} onSelect={(key) => section.onSelectRow?.(key)}
            grouped={false} sortByRecency={false} {...(section.maxVisible ? { maxVisible: section.maxVisible } : {})}
            {...(section.emptyLabel ? { emptyLabel: section.emptyLabel } : {})} {...(sectionTestId ? { 'data-testid': sectionTestId } : {})} />)
      : section.node;
    return (
      <div key={id} className={cn('shrink-0', RAIL_SECTION_GUTTER)} data-rail-section={id}
        {...(sectionTestId && heading ? { 'data-testid': `${sectionTestId}-section` } : {})}>
        {heading}
        {heading && onToggleSection && folded ? null : body}
      </div>
    );
  };

  const railActions = (search || (onSectionLayoutChange && !shown) || actions != null) ? (
    <>
      {search && (
        <IconButton ref={searchToggle} size="sm" variant="ghost" aria-label={searchLabel} title={searchLabel}
          aria-pressed={searchShown} aria-expanded={searchShown}
          icon={<SearchIcon size={14} />}
          onClick={() => (searchShown ? closeSearch() : setSearchOpen(true))}
          data-testid={`${testId}-search-toggle`} />
      )}
      {actions}
      {onSectionLayoutChange && sections && !shown && (
        <DropdownMenu trigger={<MoreIcon size={14} />} triggerLabel="Rail options" triggerTitle="Rail options" align="end"
          triggerTestId={`${testId}-options`} triggerClassName="h-7 w-7 border-transparent px-0 py-0 text-text-secondary"
          sections={[{ items: [
            { label: arranging ? 'Done arranging' : 'Arrange sections…', onSelect: () => setArranging((v) => !v), 'data-testid': `${testId}-arrange` },
            { label: 'Reset layout', onSelect: () => { onSectionLayoutChange(null); setArranging(false); }, 'data-testid': `${testId}-reset-layout` },
          ] }]} />
      )}
    </>
  ) : undefined;

  const searchField = searchShown && search ? (
    <SearchInput value={search.value} onChange={search.onChange} placeholder={search.placeholder ?? searchLabel} size="sm"
      className="w-full" aria-label={searchLabel} autoFocus
      onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); closeSearch(); } }}
      data-testid={search['data-testid'] ?? `${testId}-search`} />
  ) : null;
  const headerContent = searchField || header ? <>{searchField}{header}</> : undefined;

  return (
    <WorkspaceRail
      title={title} label="Chat" actions={railActions} header={headerContent} footer={footer}
      collapsed={isCollapsed} onToggle={collapsible ? () => onToggleCollapse?.(!isCollapsed) : undefined}
      toggleLabel={isCollapsed ? 'Expand the sidebar' : 'Collapse the sidebar'}
      toggleTestId={`${testId}-collapse`} data-testid={testId} className={className}
      collapsedContent={isCollapsed && shelf.length > 0 ? (
        <ConversationShelf items={shelf} activeId={activeShelfId} onSelect={(id) => onSelect({ kind: 'shelf', id })} compact iconOnly data-testid={`${testId}-collapsed-shelf`} />
      ) : undefined}
    >
      {!isCollapsed && shelf.length > 0 && (
        <ConversationShelf
          items={shelf}
          activeId={activeShelfId}
          onSelect={(id) => onSelect({ kind: 'shelf', id })}
          compact
          layout={shelfLayout}
          // The bar's first icon sits on the rail's 16px inset (a 32px button, an 18px glyph).
          className={shelfLayout === 'bar' ? 'shrink-0 border-b border-border px-[9px] py-1' : 'shrink-0 px-3.5 pb-2'}
          data-testid={`${testId}-shelf`}
        />
      )}

      {/* Team and conversation sections share the same heading inset. */}
      {!isCollapsed && beforeList && <div className={cn('shrink-0', RAIL_SECTION_GUTTER)}>{beforeList}</div>}

      {!isCollapsed && sections && arranging && (
        <div className={cn('shrink-0 py-2', RAIL_SECTION_GUTTER)} data-testid={`${testId}-arranging`}>
          <ul aria-label="Arrange sections" className="m-0 flex list-none flex-col gap-0.5 p-0">
            {order.map((id, i) => (
              <li key={id} className="flex items-center gap-1 px-2 py-1" data-testid={`${testId}-arrange-${id}`}>
                <span className={cn('min-w-0 flex-1 truncate', RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK)}>{byId.get(id)?.label ?? id}</span>
                <IconButton size="sm" variant="ghost" aria-label={`Move ${byId.get(id)?.label ?? id} up`} disabled={i === 0}
                  icon={<ChevronIcon dir="up" size={14} />} onClick={() => move(id, -1)} data-testid={`${testId}-arrange-${id}-up`} />
                <IconButton size="sm" variant="ghost" aria-label={`Move ${byId.get(id)?.label ?? id} down`} disabled={i === order.length - 1}
                  icon={<ChevronIcon dir="down" size={14} />} onClick={() => move(id, 1)} data-testid={`${testId}-arrange-${id}-down`} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isCollapsed && sections && !arranging && order.map(renderSection)}

      {!isCollapsed && sections && !arranging && showsConversations && shownRows === 0 && (
        <ConversationList items={[]} {...listProps} emptyLabel={emptyLabel} className={cn(RAIL_SECTION_GUTTER, 'pb-2')} data-testid={`${testId}-list`} />
      )}

      {!isCollapsed && !sections && (
        <ConversationList
          items={conversations}
          grouped={grouped}
          sectionOrder={sectionOrder}
          sectionActions={sectionActions}
          collapsedSections={collapsedSections}
          onToggleSection={onToggleSection}
          onStartCall={onStartCall}
          maxVisible={maxVisible}
          // A shelf selection means no conversation is open, so no row is
          // active — passing the last-opened channel here is how a rail ends up
          // highlighting two things at once.
          activeChannel={selected?.kind === 'conversation' ? selected.channel : null}
          onSelect={(channel) => onSelect({ kind: 'conversation', channel })}
          onNewChat={onNewChat}
          emptyLabel={emptyLabel}
          onTogglePin={onTogglePin}
          onToggleMute={onToggleMute}
          onMarkUnread={onMarkUnread}
          onRename={onRename}
          canRename={canRename}
          onSetSection={onSetSection}
          className="px-2 pb-2"
          data-testid={`${testId}-list`}
        />
      )}

    </WorkspaceRail>
  );
}

export default ConversationRail;
