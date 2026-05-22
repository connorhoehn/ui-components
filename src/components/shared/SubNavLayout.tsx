import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

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

export interface SubNavItem {
  /** Path relative to the section root, e.g. "summary" or "crawl". For action
   *  items (onClick set), this is just used as a React key — provide something
   *  unique like "halt" or "manual". */
  path: string;
  label: string;
  /** Optional small badge (e.g. live count) shown right-aligned. */
  count?: number | string;
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
   */
  renderNavItem?: (item: SubNavItem, children: ReactNode, baseStyle: CSSProperties) => ReactNode;
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
}: {
  items: SubNavItem[];
  storageKey: string;
  title: string;
  renderNavItem?: SubNavLayoutProps['renderNavItem'];
}) {
  const groups = useMemo(() => buildGroups(items), [items]);
  const isGrouped = groups.some((g) => g.name !== null);
  return (
    <nav className="flex-1 overflow-y-auto py-1">
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
  children,
}: SubNavLayoutProps) {
  const hasSecondary = secondaryItems && secondaryItems.length > 0;

  return (
    <div className="flex h-full min-h-0">
      {/* Primary rail — width is prop-driven, keep inline */}
      <aside
        className="flex-none border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden"
        style={{ width: railWidth }}
      >
        <div className="flex items-center justify-between px-4 py-[14px] border-b border-[var(--color-border)]">
          <span className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.05em]">
            {title}
          </span>
          {titleAction}
        </div>
        {railHeader && (
          <div className="px-3 py-2 border-b border-[var(--color-border)]">
            {railHeader}
          </div>
        )}
        <RailNav items={items} storageKey={storageKey} title={title} renderNavItem={renderNavItem} />
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

      <main className="flex-1 min-w-0 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
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

  // If any item in this group specifies groupScrollAfter, cap the visible
  // height at that many items and make the rest scrollable.
  const scrollAfter = items.find((i) => i.groupScrollAfter)?.groupScrollAfter;
  // scrollAfter * 38px per item — dynamic computed, keep inline
  const listStyle: CSSProperties | undefined = scrollAfter
    ? { maxHeight: scrollAfter * 38, overflowY: 'auto' }
    : undefined;

  return (
    <section className="border-b border-[var(--color-border)]">
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="flex items-center gap-1.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-[var(--color-text-tertiary)] text-[10px] font-bold tracking-[0.05em] uppercase text-left"
        aria-expanded={!collapsed}
      >
        <span className="text-[10px] w-[10px] inline-block" aria-hidden="true">
          {collapsed ? '▸' : '▾'}
        </span>
        <span className="flex-1">{name}</span>
        <span className="text-[9px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-bg)] px-[5px] py-px rounded-[6px] border border-[var(--color-border)]">
          {items.length}
        </span>
      </button>
      {!collapsed && (
        <div style={listStyle}>
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
    item.accent === 'danger' ? '#dc2626'
    : item.accent === 'warning' ? '#d97706'
    : item.accent === 'success' ? '#16a34a'
    : undefined;

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        {/* accent color is runtime-derived, keep inline for the override */}
        <span
          className="text-[13px] font-medium text-[var(--color-text-secondary)]"
          style={accentColor ? { color: accentColor } : undefined}
        >
          {item.label}
        </span>
        {item.count !== undefined && (
          <span className="text-[10px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface)] px-[6px] py-px rounded-[8px] border border-[var(--color-border)]">
            {item.count}
          </span>
        )}
      </div>
      {item.hint && (
        <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">
          {item.hint}
        </div>
      )}
    </>
  );

  // Base inactive style passed to renderNavItem for router consumers (NavLink isActive).
  const baseStyle: CSSProperties = {
    display: 'block',
    padding: '8px 14px',
    borderLeft: '3px solid transparent',
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className="block w-full px-[14px] py-2 border-l-[3px] border-transparent border-t-0 border-r-0 border-b-0 bg-transparent text-[var(--color-text-secondary)] text-left cursor-pointer font-[inherit]"
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
      className="block px-[14px] py-2 border-l-[3px] border-transparent text-[var(--color-text-secondary)] no-underline cursor-pointer"
    >
      {body}
    </a>
  );
}

// Exported for consumers that use renderNavItem and want to apply the active style.
export const activeNavItemStyle: CSSProperties = {
  borderLeft: '3px solid var(--color-primary)',
  background: 'var(--color-surface-hover)',
  color: 'var(--color-text-primary)',
};

export { cn };
