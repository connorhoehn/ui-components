import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { useContainerDensity } from './ContainerDensity';
import { DropdownMenu } from './DropdownMenu';

export type TabsVariant = 'underline' | 'pill' | 'segmented';

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  /** data-testid rendered on this tab's trigger button. Overrides Tabs' `getItemTestId` for this item. */
  testId?: string;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (id: string) => void;
  variant?: TabsVariant;
  size?: 'sm' | 'md';
  /**
   * `chip` (default): a count sits in a small grey pill. `plain`: muted
   * numerals after the label, no box — "Decisions  2".
   */
  badgeStyle?: 'chip' | 'plain';
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  /** Shared id used to wire <TabPanel> regions to their <tab> triggers. Auto-generated if omitted. */
  idPrefix?: string;
  /** Derives a data-testid per item when the item itself has no `testId`. */
  getItemTestId?: (item: TabItem) => string;
  /**
   * Every tab grows to fill equal width of the tablist (`flex-1`) instead of
   * sizing to its own label — a tab bar that spans a fixed-width container
   * (a modal header, a narrow side panel) where uneven tab widths leave a
   * ragged edge. Default: unchanged, each tab sized to its content.
   */
  stretch?: boolean;
  /** Extra classes merged onto every tab trigger `<button>`. */
  itemClassName?: string;
  /**
   * `data-testid` on the tablist container. The per-item hook (`getItemTestId`,
   * 2.350.0) covered the triggers but left the bar itself unaddressable, so a
   * spec that scopes its queries to the tab bar — or just asserts the bar
   * exists before any tab does — still had to hand-roll the whole `role=
   * "tablist"` element to hang one attribute on it.
   */
  'data-testid'?: string;
  /**
   * How the `underline` variant marks the selected tab. `border` (default):
   * the tab's own 2px bottom border, hung 1px (`-mb-px`) over the tablist's
   * rule — as before.
   *
   * `bar` (since 2.396.0): an absolutely positioned bar at the bottom of the
   * tab, on `z-[1]`, and the rule drawn as the tablist's own `after:` line.
   * Both sit INSIDE the tablist's box, so nothing hangs past it for the next
   * element (a scrolling pane body with its own background) to paint over —
   * the bug that left a 2px border reading as 1px under `ScopeHeader` in an
   * `ExplorerLayout.paneHeader`. Hide the rule with `after:hidden` when a
   * host draws its own. Other variants ignore this.
   */
  indicator?: 'border' | 'bar';
  /** The `bar` indicator's thickness in px. Default 2. Since 2.396.0. */
  indicatorWeight?: 2 | 3;
  /**
   * Container-driven fold (since 2.431.0): while the element the tab bar
   * sits in is narrower than this many px, only the first tab and the
   * selected one stay in the bar and the rest move into a `More ▾` menu at
   * its end (each row keeps the tab's `testId`; the trigger is
   * `<data-testid>-more`, or `tabs-more`). Measured on the PARENT, not the
   * viewport — a conversation pane beside a page folds while the window is
   * wide. Default: never folds.
   */
  overflowBelow?: number;
}

const SIZE: Record<'sm' | 'md', string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

function variantContainerClasses(variant: TabsVariant, bar: boolean): string {
  switch (variant) {
    case 'underline':
      return bar
        ? "relative inline-flex items-center gap-1 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--color-border)] after:content-['']"
        : 'inline-flex items-center gap-1 border-b border-[var(--color-border)]';
    case 'pill':
      return 'inline-flex items-center gap-1';
    case 'segmented':
      return 'inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5';
  }
}

function variantItemClasses(variant: TabsVariant, active: boolean, disabled: boolean, bar = false): string {
  if (variant === 'underline') {
    return cn(
      bar ? 'relative rounded-none' : '-mb-px border-b-2 rounded-none',
      active
        ? cn(!bar && 'border-[var(--color-primary)]', 'text-[var(--color-text-primary)]')
        : cn(!bar && 'border-transparent', 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'),
      disabled && 'opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]',
    );
  }
  if (variant === 'pill') {
    return cn(
      'rounded-full',
      active
        ? 'bg-[var(--color-primary)] text-white'
        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
    );
  }
  return cn(
    'rounded-md',
    active
      ? 'bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]'
      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
    disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
  );
}

export function Tabs({
  items,
  value,
  onValueChange,
  variant = 'underline',
  size = 'md',
  badgeStyle = 'chip',
  className,
  style,
  'aria-label': ariaLabel,
  idPrefix: idPrefixProp,
  getItemTestId,
  stretch = false,
  itemClassName,
  'data-testid': testId,
  indicator = 'border',
  indicatorWeight = 2,
  overflowBelow,
}: TabsProps) {
  const bar = variant === 'underline' && indicator === 'bar';
  // The fold is the container's density (`useContainerDensity`, 2.440.0):
  // the parent's border-box width under `overflowBelow` is compact. Zero is
  // "not laid out" (a detached or hidden subtree), not "very narrow".
  const room = useContainerDensity<HTMLDivElement>({ compactBelow: overflowBelow ?? null, of: 'parent', box: 'border', enabled: !!overflowBelow });
  const folded = !!overflowBelow && room.density === 'compact';
  const shownItems = folded ? items.filter((item, i) => i === 0 || item.id === value) : items;
  const foldedItems = folded ? items.filter((item) => !shownItems.includes(item)) : [];
  const autoPrefix = useId();
  const idPrefix = idPrefixProp ?? autoPrefix;
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const pendingFocus = useRef<{ id: string; origin: Element | null } | null>(null);

  const enabledIds = useMemo(() => items.filter((i) => !i.disabled).map((i) => i.id), [items]);

  const focusTab = useCallback((id: string) => {
    const el = tabRefs.current.get(id);
    el?.focus();
  }, []);

  // Folded keyboard navigation can select a tab that is not mounted yet.
  // Focus after the controlled selection commits, without stealing focus
  // when a caller delays the update and the user has moved elsewhere.
  useLayoutEffect(() => {
    const pending = pendingFocus.current;
    pendingFocus.current = null;
    if (pending?.id === value && (document.activeElement === pending.origin || document.activeElement === document.body)) focusTab(value);
  }, [value, folded, focusTab]);

  // Keep the selected tab inside a row that scrolls (a narrow column):
  // scroll only the row itself, never the page around it.
  useLayoutEffect(() => {
    const tab = tabRefs.current.get(value);
    const row = tab?.parentElement;
    if (!tab || !row || row.scrollWidth <= row.clientWidth) return;
    const t = tab.getBoundingClientRect(), r = row.getBoundingClientRect();
    const start = t.left - r.left + row.scrollLeft, end = start + t.width;
    if (start < row.scrollLeft) row.scrollLeft = start;
    else if (end > row.scrollLeft + row.clientWidth) row.scrollLeft = end - row.clientWidth;
  }, [value, folded]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, currentId: string) => {
      if (enabledIds.length === 0) return;
      const idx = enabledIds.indexOf(currentId);
      let nextIdx: number | null = null;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIdx = idx === -1 ? 0 : (idx + 1) % enabledIds.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIdx = idx === -1 ? enabledIds.length - 1 : (idx - 1 + enabledIds.length) % enabledIds.length;
          break;
        case 'Home':
          nextIdx = 0;
          break;
        case 'End':
          nextIdx = enabledIds.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onValueChange(currentId);
          return;
        default:
          return;
      }
      if (nextIdx !== null) {
        e.preventDefault();
        const nextId = enabledIds[nextIdx];
        pendingFocus.current = tabRefs.current.has(nextId) ? null : { id: nextId, origin: document.activeElement };
        onValueChange(nextId);
        focusTab(nextId);
      }
    },
    [enabledIds, onValueChange, focusTab],
  );

  return (
    <div
      ref={room.ref}
      role="tablist"
      aria-label={ariaLabel}
      data-testid={testId}
      data-folded={overflowBelow ? (folded ? 'true' : 'false') : undefined}
      {...(bar ? { 'data-indicator': 'bar' } : {})}
      // A tab row never runs past its column (since 2.446.4): it is capped at
      // the column's width and scrolls inside itself (no scrollbar drawn —
      // the selected tab is kept in view, and the row still scrolls by
      // trackpad, wheel and keyboard focus). `overflowBelow` folds instead.
      className={cn(variantContainerClasses(variant, bar), 'min-w-0 max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
      data-tab-scroller=""
      style={style}
    >
      {shownItems.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) tabRefs.current.set(item.id, el);
              else tabRefs.current.delete(item.id);
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.id}`}
            aria-controls={`${idPrefix}-panel-${item.id}`}
            data-testid={item.testId ?? getItemTestId?.(item)}
            aria-selected={active}
            aria-disabled={item.disabled || undefined}
            tabIndex={active ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && onValueChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            className={cn(
              // shrink-0: in a scrolling row a tab keeps its width; the inset
              // focus ring stays inside the row's clip.
              'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary)]',
              stretch && 'flex-1 justify-center',
              SIZE[size],
              variantItemClasses(variant, active, !!item.disabled, bar),
              itemClassName,
            )}
          >
            {item.icon}
            <span>{item.label}</span>
            {bar && active && (
              <span
                aria-hidden="true"
                data-tab-indicator=""
                className={cn(
                  'pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[var(--color-primary)]',
                  indicatorWeight === 3 ? 'h-[3px]' : 'h-0.5',
                )}
              />
            )}
            {item.badge !== undefined && item.badge !== null && (
              <span
                className={badgeStyle === 'plain' ? 'ml-2.5 inline-flex items-center text-[14px] font-medium tabular-nums text-[var(--color-text-tertiary)]' : cn(
                  'ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold',
                  active && variant === 'pill'
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]',
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
      {foldedItems.length > 0 && (
        <DropdownMenu
          trigger={<span className={cn('inline-flex items-center gap-1 font-medium', size === 'sm' ? 'text-xs' : 'text-sm')}>More<span aria-hidden="true" className="text-[10px] leading-none">▾</span></span>}
          triggerLabel={`More views: ${foldedItems.map((item) => (typeof item.label === 'string' ? item.label : item.id)).join(', ')}`}
          triggerTestId={`${testId ?? 'tabs'}-more`}
          triggerClassName={cn('border-0 bg-transparent', SIZE[size], 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]')}
          align="end"
          data-testid={`${testId ?? 'tabs'}-more-menu`}
          sections={[{
            items: foldedItems.map((item) => ({
              label: typeof item.label === 'string' ? item.label : item.id,
              ...(item.badge !== undefined && item.badge !== null ? { trailing: item.badge } : {}),
              ...(item.disabled ? { disabled: true } : {}),
              onSelect: () => onValueChange(item.id),
              ...((item.testId ?? getItemTestId?.(item)) ? { 'data-testid': item.testId ?? getItemTestId?.(item) } : {}),
            })),
          }]}
        />
      )}
    </div>
  );
}

export interface TabPanelProps {
  /** The tab id this panel is associated with. */
  id: string;
  /** Currently-active tab id. Panel renders only when these match. */
  when: string;
  /** Must match the Tabs `idPrefix` for accessibility wiring. Auto-generated tabs without an idPrefix should pass it through. */
  idPrefix?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function TabPanel({ id, when, idPrefix, className, style, children }: TabPanelProps) {
  if (id !== when) return null;
  return (
    <div
      role="tabpanel"
      id={idPrefix ? `${idPrefix}-panel-${id}` : undefined}
      data-testid={idPrefix ? `${idPrefix}-panel-${id}` : undefined}
      aria-labelledby={idPrefix ? `${idPrefix}-tab-${id}` : undefined}
      tabIndex={0}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

export default Tabs;
