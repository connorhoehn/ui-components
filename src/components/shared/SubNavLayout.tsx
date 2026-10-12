import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ActivityIcon } from '../ui/Icons';
import {
  RailCaretIcon,
  RAIL_CURRENT_FILL,
  RAIL_GROUP_COUNT,
  RAIL_GROUP_LABEL,
  RAIL_GROUP_LABEL_INK,
  RAIL_GROUP_PAD_Y,
  RAIL_ITEM_COUNT,
  RAIL_ITEM_TEXT,
  RAIL_ROW_PAD_Y,
  RAIL_ROW_PITCH,
} from './railType';

// Shared "section with left-rail" layout. Pattern mirrors the InvokePage
// session sidebar — slim rail, section title at top, NavLink items with
// active highlight, content rendered via children or a router <Outlet />.
//
// If any item has a `group`, the layout renders collapsible group sections
// (state persisted to localStorage). If no items have groups, the layout
// renders as a flat list (backwards-compatible with the existing Ingest,
// Capabilities, and Identity uses).
//
// Router integration: pass a `renderNavItem` prop for full control over
// how each link item is rendered. The default renders a plain <a> tag.
// Portal consumers pass a React Router NavLink that handles isActive styling.
//
// Type scale: every size here comes from ./railType (2.397.0) — the same
// constants the explorer rail (WorkspaceRail, RailNavList, GroupedList plain
// rows) draws from — so a shell rail and the explorer rail beside it read as
// one scale: 15px/500 items on a 40px pitch, 11px uppercase group labels with
// a plain count at the right, a 3px primary bar + pale tint on the current row.

export interface SubNavItem {
  /** Path relative to the section root, e.g. "summary" or "crawl". For action
   *  items (onClick set), this is just used as a React key — provide something
   *  unique like "halt" or "manual". */
  path: string;
  label: string;
  /** Optional small badge (e.g. live count) shown right-aligned. */
  count?: number | string;
  /** Observed activity supplied by the host, never inferred from availability. */
  activity?: { label: string };
  /** Optional dim subtitle below the label. */
  hint?: string;
  /** Optional group heading. When set on any item, the layout renders
   *  collapsible sections by group. Items without a group go into an
   *  un-headered first section. */
  group?: string;
  /** If set, the item renders as a button that calls onClick instead of a
   *  link that navigates. Use for in-page actions like Halt or toggle. */
  onClick?: () => void;
  /** Optional left-side accent color (action items often want danger/warning). */
  accent?: 'default' | 'danger' | 'warning' | 'success';
  /** If any item in a group specifies groupScrollAfter, cap the visible
   *  height at that many items and make the rest scrollable. */
  groupScrollAfter?: number;
}

export interface SubNavLayoutProps {
  /** Section title shown at top of the rail. */
  title: string;
  items: SubNavItem[];
  /** Optional element rendered next to the title (e.g. a help "?" button). */
  titleAction?: ReactNode;
  /** Optional content rendered above the nav items (e.g. a [+ New] button). */
  railHeader?: ReactNode;
  /** Override the default rail width. */
  railWidth?: number;
  /** Storage key prefix for collapsed-section persistence (default 'subnav'). */
  storageKey?: string;
  /** Secondary rail — rendered between the primary rail and main content.
   *  Keeps section-specific items separate from the top-level nav. */
  secondaryTitle?: string;
  secondaryItems?: SubNavItem[];
  secondaryStorageKey?: string;
  secondaryRailWidth?: number;
  /**
   * Custom renderer for navigation link items (items without an onClick).
   * Receives the item, its pre-built body content (label + hint + count), and
   * the base inactive CSSProperties to apply to the link element.
   *
   * Use this to integrate with your router's NavLink (e.g. React Router v7):
   * ```tsx
   * renderNavItem={(item, children, baseStyle) => (
   *   <NavLink
   *     to={item.path}
   *     style={({ isActive }) =>
   *       isActive
   *         ? { ...baseStyle, borderLeft: '3px solid var(--color-primary)', background: 'var(--color-surface-hover)', color: 'var(--color-text-primary)' }
   *         : baseStyle
   *     }
   *   >
   *     {children}
   *   </NavLink>
   * )}
   * ```
   *
   * If not provided, a plain `<a href={item.path}>` is rendered with no
   * active-state detection.
   *
   * `activeNavItemClassName`/`inactiveNavItemClassName` (exported alongside
   * `activeNavItemStyle` below) are the className-based equivalent, for a
   * `NavLink` `className={({isActive}) => ...}` integration that wants no
   * inline `style` prop at all.
   */
  renderNavItem?: (item: SubNavItem, children: ReactNode, baseStyle: CSSProperties) => ReactNode;
  /**
   * `aria-label` for the primary rail's `<nav>`. Undefined (the default)
   * renders today's markup with no label — set it when a page carries more
   * than one nav landmark and a screen reader needs to tell them apart.
   */
  railLabel?: string;
  /**
   * Element for the content pane. Defaults to `'main'` — today's markup.
   * A page that already sits inside its shell's own `<main id="main-content">`
   * should pass `'section'` (with `contentLabel` set, so the region still has
   * a name) to avoid a second `<main>` landmark.
   */
  contentAs?: 'main' | 'section' | 'div';
  /** `aria-label` for the content pane. Only meaningful (and recommended)
   *  when `contentAs` is `'section'`, so the named region reads as one. */
  contentLabel?: string;
  /**
   * The primary rail folded to a 44px strip holding only `titleAction` — the
   * control that brings it back (2.438.0). Controlled: the host decides when
   * (`useRailFold`, docs: the rail model) and owns the toggle. The strip's
   * header row takes the height of the rail beside it, so a compact (36px)
   * section rail's header and the strip's control sit on one row.
   */
  collapsed?: boolean;
  /**
   * The main content area. When used with React Router, omit this and pass an
   * `<Outlet />` as children, or leave empty if the router renders children
   * directly. Defaults to rendering children.
   */
  children?: ReactNode;
}

// Shared group-bucketing logic used by both primary and secondary rails.
function buildGroups(items: SubNavItem[]) {
  const out: Array<{ name: string | null; items: SubNavItem[] }> = [];
  const byName = new Map<string, number>();
  for (const item of items) {
    const g = item.group ?? null;
    if (g === null) {
      if (out.length === 0 || out[0].name !== null) {
        out.unshift({ name: null, items: [] });
        byName.forEach((v, k) => byName.set(k, v + 1));
      }
      out[0].items.push(item);
      continue;
    }
    let idx = byName.get(g);
    if (idx === undefined) {
      idx = out.length;
      byName.set(g, idx);
      out.push({ name: g, items: [] });
    }
    out[idx].items.push(item);
  }
  return out;
}

function RailNav({
  items,
  storageKey,
  title,
  renderNavItem,
  railLabel,
}: {
  items: SubNavItem[];
  storageKey: string;
  title: string;
  renderNavItem?: SubNavLayoutProps['renderNavItem'];
  railLabel?: string;
}) {
  const groups = useMemo(() => buildGroups(items), [items]);
  const isGrouped = groups.some((g) => g.name !== null);
  return (
    <nav aria-label={railLabel} className="flex-1 overflow-y-auto py-1">
      {isGrouped ? (
        groups.map((g) =>
          g.name === null ? (
            <FlatItems key="__ungrouped" items={g.items} renderNavItem={renderNavItem} />
          ) : (
            <GroupSection
              key={g.name}
              name={g.name}
              items={g.items}
              storageKey={`${storageKey}.${title}.${g.name}`}
              renderNavItem={renderNavItem}
            />
          ),
        )
      ) : (
        <FlatItems items={items} renderNavItem={renderNavItem} />
      )}
    </nav>
  );
}

export function SubNavLayout({
  title,
  items,
  titleAction,
  railHeader,
  railWidth = 220,
  storageKey = 'subnav',
  secondaryTitle,
  secondaryItems,
  secondaryStorageKey,
  secondaryRailWidth = 200,
  renderNavItem,
  railLabel,
  contentAs = 'main',
  contentLabel,
  collapsed = false,
  children,
}: SubNavLayoutProps) {
  const Content = contentAs;
  const hasSecondary = secondaryItems && secondaryItems.length > 0;
  // How many compact (36px-header) rails sit in the content beside this rail.
  const [compactNeighbours, setCompactNeighbours] = useState(0);
  const report = useCallback((compact: boolean) => {
    if (!compact) return () => {};
    setCompactNeighbours((n) => n + 1);
    return () => setCompactNeighbours((n) => n - 1);
  }, []);
  const alignHeader = collapsed && compactNeighbours > 0;

  return (
    <div className="flex h-full min-h-0">
      {/* Primary rail — width is prop-driven, keep inline (the folded strip is a fixed 44px) */}
      <aside
        className={cn('flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden', collapsed && 'w-11 min-w-11')}
        style={collapsed ? undefined : { width: railWidth }}
        data-collapsed={collapsed ? 'true' : undefined}
      >
        <div className={cn('flex items-center border-b border-[var(--color-border)]',
          collapsed ? 'justify-center px-0' : 'justify-between px-4',
          alignHeader ? 'h-9 py-0' : 'py-[14px]')}>
          {!collapsed && (
            <span className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]">
              {title}
            </span>
          )}
          {titleAction}
        </div>
        {railHeader && !collapsed && (
          <div className="px-3 py-2 border-b border-[var(--color-border)]">
            {railHeader}
          </div>
        )}
        {!collapsed && <RailNav items={items} storageKey={storageKey} title={title} renderNavItem={renderNavItem} railLabel={railLabel} />}
      </aside>

      {/* Secondary rail — width is prop-driven, keep inline */}
      {hasSecondary && (
        <aside
          className="flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden"
          style={{ width: secondaryRailWidth }}
        >
          <div className="flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]">
            <span className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]">
              {secondaryTitle ?? ''}
            </span>
          </div>
          <RailNav
            items={secondaryItems}
            storageKey={secondaryStorageKey ?? `${storageKey}.secondary`}
            title={secondaryTitle ?? 'secondary'}
            renderNavItem={renderNavItem}
          />
        </aside>
      )}

      <Content aria-label={contentLabel} data-subnav-content className="flex-1 min-w-0 overflow-auto p-[var(--ui-page-gutter,1.5rem)]">
        <RailHeaderAlignContext.Provider value={report}>{children}</RailHeaderAlignContext.Provider>
      </Content>
    </div>
  );
}

// A rail in the content reports whether its header row is the compact 36px
// one, so a folded SubNavLayout strip can put its control on the same row.
const RailHeaderAlignContext = createContext<((compact: boolean) => () => void) | null>(null);

/**
 * Called by a rail drawn inside a `SubNavLayout`'s content (`WorkspaceRail`):
 * a compact (36px) header row makes the folded strip's header the same height.
 */
export function useReportRailHeader(compact: boolean): void {
  const report = useContext(RailHeaderAlignContext);
  useLayoutEffect(() => (report ? report(compact) : undefined), [report, compact]);
}

function FlatItems({
  items,
  renderNavItem,
}: {
  items: SubNavItem[];
  renderNavItem?: SubNavLayoutProps['renderNavItem'];
}) {
  return (
    <>
      {items.map((item) => (
        <ItemLink key={item.path} item={item} renderNavItem={renderNavItem} />
      ))}
    </>
  );
}

function GroupSection({
  name,
  items,
  storageKey,
  renderNavItem,
}: {
  name: string;
  items: SubNavItem[];
  storageKey: string;
  renderNavItem?: SubNavLayoutProps['renderNavItem'];
}) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage?.getItem(storageKey) === '1';
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (collapsed) window.localStorage?.setItem(storageKey, '1');
    else window.localStorage?.removeItem(storageKey);
  }, [collapsed, storageKey]);

  const bodyId = useId();
  const headerRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!collapsed) {
      // Collapsing unmounts the group's links. If focus is on one of them the
      // browser drops it to <body>, so the keyboard user's Tab position
      // silently resets to the top of the page. Hand focus up to the header.
      const active = typeof document === 'undefined' ? null : document.activeElement;
      if (active && bodyRef.current?.contains(active)) {
        headerRef.current?.focus();
      }
    }
    setCollapsed((v) => !v);
  };

  // If any item in this group specifies groupScrollAfter, cap the visible
  // height at that many items and make the rest scrollable.
  const scrollAfter = items.find((i) => i.groupScrollAfter)?.groupScrollAfter;
  // scrollAfter * one rail row per item — dynamic computed, keep inline
  const listStyle: CSSProperties | undefined = scrollAfter
    ? { maxHeight: scrollAfter * RAIL_ROW_PITCH, overflowY: 'auto' }
    : undefined;

  return (
    <section className="border-b border-[var(--color-border)]">
      <button
        type="button"
        ref={headerRef}
        onClick={toggle}
        className={cn(
          'flex items-center gap-1.5 w-full px-2 bg-transparent border-none cursor-pointer text-left hover:bg-surface-hover',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
          RAIL_GROUP_PAD_Y,
          RAIL_GROUP_LABEL,
          RAIL_GROUP_LABEL_INK,
        )}
        aria-expanded={!collapsed}
        aria-controls={bodyId}
        data-testid="subnav-group-header"
      >
        <span className="grid h-5 w-5 shrink-0 place-items-center" aria-hidden="true">
          <RailCaretIcon open={!collapsed} />
        </span>
        <span className="min-w-0 flex-1 truncate">{name}</span>
        <span className={cn('shrink-0 pr-1', RAIL_GROUP_COUNT)} aria-label={`${items.length} items`} data-testid="subnav-group-count">
          {items.length}
        </span>
      </button>
      {!collapsed && (
        <div id={bodyId} ref={bodyRef} style={listStyle}>
          {items.map((item) => (
            <ItemLink key={item.path} item={item} renderNavItem={renderNavItem} />
          ))}
        </div>
      )}
    </section>
  );
}

function ItemLink({
  item,
  renderNavItem,
}: {
  item: SubNavItem;
  renderNavItem?: SubNavLayoutProps['renderNavItem'];
}) {
  const accentColor =
    item.accent === 'danger' ? 'var(--color-danger)'
    : item.accent === 'warning' ? 'var(--color-warning)'
    : item.accent === 'success' ? 'var(--color-success)'
    : undefined;

  const body = (
    <>
      <div className="flex min-w-0 items-center justify-between gap-2">
        {/* Ink comes from the link (inactive/active class), so the current
            item reads darker without a second rule. accent color is
            runtime-derived, keep inline for the override. */}
        <span
          className={cn('min-w-0 truncate', RAIL_ITEM_TEXT)}
          style={accentColor ? { color: accentColor } : undefined}
          data-testid="subnav-item-label"
        >
          {item.label}
        </span>
        {item.activity && <span className="ml-auto shrink-0 text-primary" role="img" aria-label={item.activity.label} title={item.activity.label} data-testid="subnav-item-activity"><ActivityIcon size={13} /></span>}
        {item.count !== undefined && (
          <span className={cn('shrink-0', RAIL_ITEM_COUNT)} data-testid="subnav-item-count">
            {item.count}
          </span>
        )}
      </div>
      {item.hint && (
        <div className="text-[12px] leading-4 text-[var(--color-text-tertiary)] mt-0.5">
          {item.hint}
        </div>
      )}
    </>
  );

  // Base inactive style passed to renderNavItem for router consumers (NavLink isActive).
  const baseStyle: CSSProperties = {
    display: 'block',
    padding: '9px 14px',
    borderLeft: '3px solid transparent',
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={cn('block w-full px-[14px] border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-text-primary text-left cursor-pointer font-[inherit] hover:bg-surface-hover', RAIL_ROW_PAD_Y)}
      >
        {body}
      </button>
    );
  }

  // If a custom renderer is provided, use it. The base style passed is the
  // "inactive" navItemStyle — the renderer is responsible for toggling active
  // state (e.g. via NavLink's isActive callback). The pre-built body (label +
  // hint + count) is passed as children so the renderer doesn't have to
  // reconstruct it.
  if (renderNavItem) {
    return <>{renderNavItem(item, body, baseStyle)}</>;
  }

  // Default: plain anchor, no active-state detection.
  return (
    <a
      href={item.path}
      className={inactiveNavItemClassName}
    >
      {body}
    </a>
  );
}

// Exported for consumers that use renderNavItem and want to apply the active style.
export const activeNavItemStyle: CSSProperties = {
  borderLeft: '3px solid var(--color-primary)',
  background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
  color: 'var(--color-text-primary)',
};

/**
 * className-based equivalents of `baseStyle` (the item's default look, passed
 * as `renderNavItem`'s third argument) and `activeNavItemStyle` above — for a
 * router integration that wants `NavLink`'s `className={({ isActive }) => ...}`
 * form instead of its `style={({ isActive }) => ...}` form, so hooking up
 * real active-link routing needs no inline `style` prop at all:
 *
 * ```tsx
 * renderNavItem={(item, children) => (
 *   <NavLink
 *     to={item.path}
 *     className={({ isActive }) =>
 *       isActive ? activeNavItemClassName : inactiveNavItemClassName
 *     }
 *   >
 *     {children}
 *   </NavLink>
 * )}
 * ```
 */
//
// Since 2.397.0 both come from the shared rail scale (./railType): a 40px row
// (RAIL_ROW_PAD_Y), primary ink on every item, a hover fill on inactive
// items, and the current item marked the way GroupedList marks its current
// rail row — the 3px primary edge plus RAIL_CURRENT_FILL (primary at 8%).
// Before, the current item filled with `bg-surface-hover`, i.e. it looked
// exactly like a hovered item.
export const inactiveNavItemClassName =
  `block px-[14px] ${RAIL_ROW_PAD_Y} border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover`;
export const activeNavItemClassName =
  `block px-[14px] ${RAIL_ROW_PAD_Y} border-l-[3px] border-primary ${RAIL_CURRENT_FILL} text-text-primary no-underline cursor-pointer`;

export { cn };
