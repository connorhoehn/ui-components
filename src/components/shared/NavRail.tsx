// NavRail / NavRailStack — vertical navigation that composes to any depth.
//
//   ┌────────┬──────────┬───────────┬──────────────────────────┐
//   │ Build  │ Health   │ Harness   │                          │
//   │ Org    │ Runs   ▸ │ Runs      │        content           │
//   │ Operate│ Harness  │ Compare   │                          │
//   └────────┴──────────┴───────────┴──────────────────────────┘
//     global   section    sub-section
//
// `SubNavLayout` already ships a rail plus ONE optional secondary rail. That
// ceiling is the problem this file exists to remove: apps whose routes nest
// three layouts deep (global shell → section layout → sub-section layout) end
// up with a different component at each level, because the third rail has
// nowhere to go. NavRailStack takes an ARRAY, so depth is data — a route that
// gains a level adds an entry instead of a component.
//
// SubNavLayout is not deprecated and is not changed here: it owns the
// two-level shape several apps already render, and its `renderNavItem`
// contract hands out CSSProperties that consumers have wired to NavLink. Reach
// for NavRail when the depth is variable or when you want the rail without its
// content region.
//
// Active state is computed here from `activeHref` (the TopNav contract) rather
// than delegated to a router's own isActive: rails at different depths need
// DIFFERENT matching — a global rail must stay lit on `/admin/observability`
// while you are five levels inside it, and a leaf rail must not. `match`
// makes that per-rail instead of per-router.

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import {
  RailCaretIcon,
  RAIL_GROUP_LABEL,
  RAIL_GROUP_PAD_Y,
  RAIL_ITEM_COUNT,
  RAIL_ITEM_TEXT,
  RAIL_ROW_PAD_Y,
} from './railType';
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the rail paints in. */
export type NavRailTone = SurfaceTone;

export interface NavRailItem {
  /** Target path. Also the React key unless `id` is given. */
  to?: string;
  /** Renders as a button instead of a link. For in-page verbs (Halt, Reset). */
  onClick?: () => void;
  /** Required when an item has neither `to` nor a unique label. */
  id?: string;
  label: ReactNode;
  /** Small right-aligned count — queue depth, unread, failures. */
  badge?: ReactNode;
  /** One dim line under the label. Say what the page is FOR, not what it is. */
  hint?: string;
  /** Leading glyph. */
  icon?: ReactNode;
  /** Section heading. Items sharing a group render under one collapsible head. */
  group?: string;
  disabled?: boolean;
}

/** How `activeHref` is matched against an item's `to`. */
export type NavRailMatch = 'exact' | 'prefix';

export interface NavRailProps {
  /** Rail heading. Omit for a rail that needs no name (a single leaf list). */
  title?: ReactNode;
  items: NavRailItem[];
  /** Current path. An item lights when it matches per `match`. */
  activeHref?: string;
  /**
   * `prefix` (default) keeps a rail lit while you are anywhere beneath it —
   * what an outer rail wants. `exact` is for the innermost rail, where two
   * items share a prefix and both would otherwise light.
   */
  match?: NavRailMatch;
  /** Element beside the title — a help "?" or a count. */
  titleAction?: ReactNode;
  /** Content above the items — a [+ New] button, a filter. */
  header?: ReactNode;
  /** Content pinned below the items — a status line, a collapse toggle. */
  footer?: ReactNode;
  /**
   * Discrete widths, not a pixel number: a `style={{ width }}` here is an
   * inline style on every rail in the app, and three sizes have covered every
   * rail we have shipped. Use `className` for the genuine exception.
   */
  width?: 'narrow' | 'default' | 'wide';
  /**
   * Persist per-group collapsed state under this key. Omit and groups still
   * collapse — they just forget on reload. Rails at different depths MUST use
   * different keys or they share collapse state.
   */
  storageKey?: string;
  /** Render links with a router's Link/NavLink. Defaults to a plain `<a>`. */
  renderLink?: (
    item: NavRailItem,
    props: AnchorHTMLAttributes<HTMLAnchorElement>,
  ) => ReactNode;
  tone?: NavRailTone;
  /**
   * Layout only, since 2.397.0 — both sizes draw the one shared rail type
   * scale (`railType`: 13px/500 labels on 36px rows, 11px caps group labels,
   * plain counts), the same as SubNavLayout and the explorer rails. `sm`
   * (default) is flush with the rail's edges under a ruled title row; `md` is
   * the Documents surface's Workspace rail (the All documents mockup): items
   * inset under the group's caret, a heading row with no rule under it, and a
   * hairline between groups. Since 2.389.2. (Before 2.397.0 `sm` was a 13px
   * rail and `md` 15px/400 on 36px rows.)
   */
  size?: 'sm' | 'md';
  /** Names the nav landmark. Falls back to the title, then 'Navigation'. */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

const WIDTH = {
  narrow: 'w-44',
  default: 'w-56',
  wide: 'w-64',
} as const;

const TONE = {
  surface: {
    rail: 'bg-surface border-border',
    divider: 'border-border',
    title: 'text-text-tertiary',
    group: 'text-text-tertiary',
    label: 'text-text-secondary',
    labelActive: 'text-text-primary',
    hint: 'text-text-tertiary',
    badge: 'bg-surface-inset text-text-tertiary border-border',
    hover: 'hover:bg-surface-hover',
    active: 'bg-primary/8 border-l-primary',
  },
  code: {
    rail: 'bg-code-panel border-code-border',
    divider: 'border-code-border',
    title: 'text-code-muted',
    group: 'text-code-muted',
    label: 'text-code-subtle',
    labelActive: 'text-code-text',
    hint: 'text-code-muted',
    badge: 'bg-code-surface text-code-subtle border-code-border',
    hover: 'hover:bg-code-surface',
    active: 'bg-code-surface border-l-code-blue',
  },
} as const;

function itemKey(item: NavRailItem, idx: number): string {
  return item.id ?? item.to ?? `item-${idx}`;
}

function isActive(item: NavRailItem, activeHref: string | undefined, match: NavRailMatch): boolean {
  if (!activeHref || !item.to) return false;
  if (activeHref === item.to) return true;
  if (match === 'exact' || item.to === '/') return false;
  // Segment-boundary aware: '/iq/work' must not light for '/iq/workflows'.
  return activeHref.startsWith(item.to.endsWith('/') ? item.to : `${item.to}/`);
}

/** Bucket items by `group`, preserving first-seen group order. Ungrouped first. */
function buildGroups(items: NavRailItem[]): Array<{ name: string | null; items: NavRailItem[] }> {
  const ungrouped: NavRailItem[] = [];
  const named: Array<{ name: string; items: NavRailItem[] }> = [];
  const byName = new Map<string, number>();
  for (const item of items) {
    if (!item.group) {
      ungrouped.push(item);
      continue;
    }
    let idx = byName.get(item.group);
    if (idx === undefined) {
      idx = named.length;
      byName.set(item.group, idx);
      named.push({ name: item.group, items: [] });
    }
    named[idx].items.push(item);
  }
  const out: Array<{ name: string | null; items: NavRailItem[] }> = [];
  if (ungrouped.length > 0) out.push({ name: null, items: ungrouped });
  return out.concat(named);
}

type Palette = (typeof TONE)[NavRailTone];

function RailItem({
  item,
  active,
  palette,
  renderLink,
  size = 'sm',
}: {
  item: NavRailItem;
  active: boolean;
  palette: Palette;
  renderLink?: NavRailProps['renderLink'];
  size?: 'sm' | 'md';
}) {
  const body = (
    <>
      <span className="flex items-center gap-2 min-w-0">
        {item.icon && <span className="flex-none" aria-hidden="true">{item.icon}</span>}
        <span
          className={cn(
            'truncate',
            RAIL_ITEM_TEXT,
            palette.labelActive,
          )}
          data-ui-text="rail-item"
        >
          {item.label}
        </span>
        {item.badge != null && (
          <span className={cn('ml-auto flex-none', RAIL_ITEM_COUNT, palette.label)} data-testid="nav-rail-badge">
            {item.badge}
          </span>
        )}
      </span>
      {item.hint && (
        <span className={cn('mt-0.5 block truncate text-[12px] leading-4', palette.hint)}>{item.hint}</span>
      )}
    </>
  );

  const shell = cn(
    'block w-full border-l-[3px] border-transparent text-left no-underline',
    // md: inset from the rail's edges, the accent under the group's caret and
    // the label under the group's name (the All documents mockup).
    size === 'md' ? 'ml-[18px] w-auto mr-2 rounded-r pl-[15px] pr-2' : 'px-3',
    RAIL_ROW_PAD_Y,
    palette.hover,
    active && palette.active,
    item.disabled && 'pointer-events-none opacity-50',
  );

  if (item.onClick || !item.to) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        disabled={item.disabled}
        aria-current={active ? 'page' : undefined}
        className={cn(shell, 'cursor-pointer bg-transparent font-[inherit]')}
      >
        {body}
      </button>
    );
  }

  const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    href: item.to,
    className: shell,
    'aria-current': active ? 'page' : undefined,
    'aria-disabled': item.disabled || undefined,
    children: body,
  };
  if (renderLink) return <>{renderLink(item, linkProps)}</>;
  return <a {...linkProps} />;
}

function RailGroup({
  name,
  items,
  activeHref,
  match,
  palette,
  storageKey,
  renderLink,
  size = 'sm',
  divided = false,
}: {
  name: string;
  items: NavRailItem[];
  activeHref?: string;
  match: NavRailMatch;
  palette: Palette;
  storageKey?: string;
  renderLink?: NavRailProps['renderLink'];
  size?: 'sm' | 'md';
  /** A hairline above the group — every group after the first, at `md`. */
  divided?: boolean;
}) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (!storageKey || typeof window === 'undefined') return false;
    try {
      return window.localStorage?.getItem(storageKey) === '1';
    } catch {
      // Safari in private mode throws on localStorage access. A rail that
      // cannot remember its state is fine; a rail that crashes is not.
      return false;
    }
  });

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      if (collapsed) window.localStorage?.setItem(storageKey, '1');
      else window.localStorage?.removeItem(storageKey);
    } catch {
      /* see above */
    }
  }, [collapsed, storageKey]);

  const bodyId = useId();
  const headerRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const toggle = useCallback(() => {
    if (!collapsed) {
      // Collapsing unmounts the group's links. If focus is on one, the browser
      // drops it to <body> and the keyboard user's Tab position silently
      // resets to the top of the page. Hand focus up to the header instead.
      const active = typeof document === 'undefined' ? null : document.activeElement;
      if (active && bodyRef.current?.contains(active)) headerRef.current?.focus();
    }
    setCollapsed((v) => !v);
  }, [collapsed]);

  return (
    <section className={cn(size === 'md' && 'pb-1')}>
      {divided && <div aria-hidden="true" className={cn('mx-5 mb-2 mt-1 border-t', palette.divider)} />}
      <button
        ref={headerRef}
        type="button"
        onClick={toggle}
        aria-expanded={!collapsed}
        aria-controls={bodyId}
        className={cn(
          'flex w-full cursor-pointer items-center gap-1.5 border-none bg-transparent text-left',
          RAIL_GROUP_LABEL,
          RAIL_GROUP_PAD_Y,
          size === 'md' ? 'px-3.5' : 'px-2',
          palette.group,
        )}
      >
        <span aria-hidden="true" className="grid h-5 w-5 shrink-0 place-items-center">
          <RailCaretIcon open={!collapsed} />
        </span>
        <span className="flex-1 truncate">{name}</span>
      </button>
      {!collapsed && (
        <div id={bodyId} ref={bodyRef}>
          {items.map((item, idx) => (
            <RailItem
              key={itemKey(item, idx)}
              item={item}
              active={isActive(item, activeHref, match)}
              palette={palette}
              renderLink={renderLink}
              size={size}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function NavRail({
  title,
  items,
  activeHref,
  match = 'prefix',
  titleAction,
  header,
  footer,
  width = 'default',
  storageKey,
  renderLink,
  tone = 'surface',
  size = 'sm',
  'aria-label': ariaLabel,
  className,
  'data-testid': testId,
}: NavRailProps) {
  const palette = TONE[tone];
  const groups = useMemo(() => buildGroups(items), [items]);
  const label = ariaLabel ?? (typeof title === 'string' ? title : undefined) ?? 'Navigation';

  return (
    <nav
      aria-label={label}
      data-testid={testId}
      className={cn(
        'flex flex-none flex-col overflow-hidden border-r',
        WIDTH[width],
        palette.rail,
        className,
      )}
    >
      {(title != null || titleAction) && (
        <div className={cn(
            'flex flex-none items-center justify-between gap-2',
            size === 'md' ? 'h-12 pl-5 pr-3' : 'border-b px-3 py-2.5',
            palette.divider,
          )}>
          <span
            className={cn(
              'truncate text-[11px] font-semibold uppercase tracking-[0.05em]',
              palette.title,
            )}
          >
            {title}
          </span>
          {titleAction}
        </div>
      )}
      {header && (
        <div className={cn('flex-none border-b px-2 py-2', palette.divider)}>{header}</div>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto py-1">
        {groups.map((g, gi) =>
          g.name === null ? (
            <div key="__ungrouped">
              {g.items.map((item, idx) => (
                <RailItem
                  key={itemKey(item, idx)}
                  item={item}
                  active={isActive(item, activeHref, match)}
                  palette={palette}
                  renderLink={renderLink}
                  size={size}
                />
              ))}
            </div>
          ) : (
            <RailGroup
              key={g.name}
              name={g.name}
              items={g.items}
              activeHref={activeHref}
              match={match}
              palette={palette}
              storageKey={storageKey ? `${storageKey}.g${gi}.${g.name}` : undefined}
              renderLink={renderLink}
              size={size}
              divided={size === 'md' && gi > 0}
            />
          ),
        )}
      </div>
      {footer && (
        <div className={cn('flex-none border-t px-2 py-2', palette.divider)}>{footer}</div>
      )}
    </nav>
  );
}

/** One level of the stack. `id` keys the rail and seeds its storage key. */
export interface NavRailSpec extends Omit<NavRailProps, 'storageKey'> {
  id: string;
}

export interface NavRailStackProps {
  /**
   * Outermost rail first. An empty array renders content full-bleed, which is
   * the right answer for a leaf page that wants the width back — a rail with
   * nothing in it is a dead 200px column, not a smaller rail.
   */
  rails: NavRailSpec[];
  /** Applied to every rail that does not set its own. */
  activeHref?: string;
  /** Applied to every rail that does not set its own. */
  renderLink?: NavRailProps['renderLink'];
  /** Applied to every rail that does not set its own. */
  tone?: NavRailTone;
  /** Prefix for each rail's group-collapse persistence, suffixed by rail id. */
  storageKey?: string;
  /** The content region beside the rails. Usually a `WorkArea` or an Outlet. */
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function NavRailStack({
  rails,
  activeHref,
  renderLink,
  tone,
  storageKey,
  children,
  className,
  'data-testid': testId,
}: NavRailStackProps) {
  return (
    <div
      data-testid={testId}
      className={cn('flex h-full min-h-0 w-full', className)}
    >
      {rails.map(({ id, ...rail }) => (
        <NavRail
          key={id}
          {...rail}
          activeHref={rail.activeHref ?? activeHref}
          renderLink={rail.renderLink ?? renderLink}
          tone={rail.tone ?? tone}
          storageKey={storageKey ? `${storageKey}.${id}` : undefined}
        />
      ))}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

export default NavRail;
