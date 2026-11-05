// ActionRowList — a short ruled list of things to open next: "Plan next" on an
// initiative's overview — a title, a one-line description, "Layla Hassan · 5
// points" at the right and a chevron, three rows, then "See all 11 work
// items →".
//
// ## Not a GroupedList, not a table
//
// `GroupedList` is a navigable directory (groups, carets, roving focus, a ⋯
// per row); `DataTable` is columns a reader compares. This is neither: a
// handful of suggestions, each one a single target. So the WHOLE row is one
// button (or one link when it has an `href`) — a reader clicks anywhere on it,
// and a screen reader reads its title, then its description and meta as the
// button's text. Nothing inside a row is separately interactive.
//
// ## Honest rows
//
// No description → no second line (never a placeholder). No meta → nothing at
// the right but the chevron. A `disabled` row stays visible and muted, with
// its `disabledReason` as the tooltip, so "why can't I open this?" has an
// answer. An empty list renders `emptyLabel` when given, else nothing at all.
//
// ## Columns, tone, leading, action (2.392.0)
//
// The Initiatives v2 overview draws each row as a title then a few facts in
// COLUMNS — "(LH) Layla Hassan │ 5 pts ›" — whose edges line up down the list.
// `columns` declares them once on the list (fixed widths from a small scale,
// so every row's cells share edges); each item fills `cells` by column id. A
// missing cell leaves its column blank so the next one still lines up.
// `tone` tints a row ("Needs attention" is `warning`), `accent="bar"` adds a
// 3px tone bar on its left edge, `leading` goes before the title (a "Blocked"
// chip), and `action` replaces the chevron with a worded target ("Open →").
// The row stays ONE target: nothing new is separately interactive.
//
// None of it is required: an item with a `description` and `meta` and no
// columns renders exactly as before, and descriptions still work beside
// columns — both arrangements stay reachable from the same list.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useDensitySize } from '../shared/Density';
import { ArrowRightIcon, ChevronIcon } from '../ui/Icons';
import type { Tone } from '../shared/tones';
import { Avatar } from '../shared/Avatar';

/** Row tint. `neutral` (and absent) draws none. */
export type ActionRowTone = Exclude<Tone, 'neutral'> | 'neutral';

/**
 * A fact column at the row's right. Widths come from a fixed scale so cells
 * line up across rows: xs 64, sm 88, md 120, lg 152, xl 184 (px).
 */
export interface ActionRowColumn {
  id: string;
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Where the cell's content sits inside its width. Default `start`. */
  align?: 'start' | 'end';
  /** A 1px rule before this column. Default: every column after the first. */
  divider?: boolean;
  /** Screen-reader name for the column's cells, e.g. "Assignee". */
  label?: string;
}

const COLUMN_WIDTH: Record<ActionRowColumn['width'], string> = {
  xs: 'w-16',
  sm: 'w-[88px]',
  md: 'w-[120px]',
  lg: 'w-[152px]',
  xl: 'w-[184px]',
};

// The row tint is the tone's pale `-callout` surface (2.393.1), the same one
// `Banner layout="callout"` sits on — not `-bg`, which hosts often push
// saturated so a pill reads at a glance (a portal painting warning-bg #fef3c7
// turned "Needs attention" into a solid yellow slab).
const TONE_ROW: Record<Exclude<ActionRowTone, 'neutral'>, string> = {
  success: 'bg-success-callout hover:bg-success-callout',
  warning: 'bg-warning-callout hover:bg-warning-callout',
  danger: 'bg-danger-callout hover:bg-danger-callout',
  info: 'bg-info-callout hover:bg-info-callout',
  caution: 'bg-caution-callout hover:bg-caution-callout',
  accent: 'bg-accent-callout hover:bg-accent-callout',
};

const TONE_BAR: Record<ActionRowTone, string> = {
  neutral: 'shadow-[inset_3px_0_0_0_var(--color-border-emphasis)]',
  success: 'shadow-[inset_3px_0_0_0_var(--color-success)]',
  warning: 'shadow-[inset_3px_0_0_0_var(--color-warning)]',
  danger: 'shadow-[inset_3px_0_0_0_var(--color-danger)]',
  info: 'shadow-[inset_3px_0_0_0_var(--color-info)]',
  caution: 'shadow-[inset_3px_0_0_0_var(--color-caution)]',
  accent: 'shadow-[inset_3px_0_0_0_var(--color-accent)]',
};

export interface ActionRowItem {
  id: string;
  title: string;
  /** One line under the title. Truncates; absent, no second line. */
  description?: ReactNode;
  /** Right-aligned facts, already worded — "Layla Hassan · 5 points". */
  meta?: ReactNode;
  /** A link target. Without it the row is a button calling `onOpen`. */
  href?: string;
  disabled?: boolean;
  /** Tooltip on a disabled row: why it cannot be opened. */
  disabledReason?: string;
  /** Content per `ActionRowListProps.columns` id. Since 2.392.0. */
  cells?: Record<string, ReactNode>;
  /** Before the title — a toned `Chip` ("Blocked"). Since 2.392.0. */
  leading?: ReactNode;
  /** This row's tint; overrides the list's `tone`. Since 2.392.0. */
  tone?: ActionRowTone;
  /** This row's edge accent; overrides the list's `accent`. Since 2.392.0. */
  accent?: 'none' | 'bar';
  /**
   * A worded target in place of the chevron — "Open" draws "Open →" in the
   * primary colour. Not a separate control: the whole row is still the
   * target. Overrides the list's `action`. Since 2.392.0.
   */
  action?: string;
}

export interface ActionRowListProps {
  items: ActionRowItem[];
  /** A row was activated (click, Enter, Space). Also called for `href` rows. */
  onOpen?: (item: ActionRowItem) => void;
  /** Under the list — normally a link, "See all 11 work items →". */
  footer?: ReactNode;
  /** Shown instead of the rows when `items` is empty. Absent, nothing renders. */
  emptyLabel?: ReactNode;
  /**
   * Fact columns at every row's right, declared once so their edges line up
   * down the list; each item fills `cells`. Since 2.392.0.
   */
  columns?: ActionRowColumn[];
  /**
   * Tints every row — `warning` for "Needs attention". A toned list drops the
   * grey rules (the tint separates the rows) and rounds the rows' right
   * corners. Default `neutral`: no tint, ruled. Since 2.392.0.
   */
  tone?: ActionRowTone;
  /** `bar`: a 3px bar in the row's tone on its left edge. Default `none`. Since 2.392.0. */
  accent?: 'none' | 'bar';
  /**
   * Alternate neutral row surfaces. Semantic row tones always take precedence.
   * Default `true` since 2.501.0 (was `false`); pass `striped={false}` for a
   * ruled-only list.
   */
  striped?: boolean;
  /** Every row's worded target in place of the chevron ("Open"). Since 2.392.0. */
  action?: string;
  /**
   * Type step. `md` (default): the Initiatives v2 mockup's 15px rows. `sm`
   * (since 2.429.0): the app's body step — 14px medium titles and cells,
   * 12px descriptions and meta, a 14px semibold action (`T size="sm"` /
   * `T size="xs"`) — so a list in a tabbed pane reads like the rails and
   * lists beside it.
   */
  size?: 'md' | 'sm';
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

const ROW_CLASS = cn(
  'group flex w-full min-w-0 items-center gap-4 border-0 bg-transparent px-2.5 py-[7px] text-left [font-family:inherit] no-underline',
  'transition-colors duration-100 hover:bg-surface-hover',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
);

function RowBody({ item, columns, action, size = 'md' }: { item: ActionRowItem; columns?: ActionRowColumn[]; action?: string; size?: 'md' | 'sm' }) {
  const sm = size === 'sm';
  const hasColumns = !!columns && columns.length > 0;
  const hasDescription = item.description != null && item.description !== false;
  return (
    <>
      {item.leading != null && item.leading !== false && (
        <span className="flex shrink-0 items-center" data-testid="action-row-leading">{item.leading}</span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className={cn('truncate text-text-primary', sm ? 'text-sm font-medium leading-5' : cn('text-[15px] leading-6', hasColumns ? (hasDescription ? 'font-semibold' : 'font-normal') : 'font-medium'))} title={hasColumns ? item.title : undefined}>{item.title}</span>
        {hasDescription && (
          <span className={cn('truncate text-text-secondary', sm ? 'text-xs leading-4' : hasColumns ? 'text-[13px] leading-[18px]' : 'text-sm leading-5')} data-testid="action-row-description">{item.description}</span>
        )}
      </span>
      {item.meta != null && item.meta !== false && (
        <span className={cn('shrink-0 whitespace-nowrap text-text-secondary', sm ? 'text-xs' : 'text-[13px]')} data-testid="action-row-meta">{item.meta}</span>
      )}
      {hasColumns && (
        <span className="flex shrink-0 items-center" data-testid="action-row-cells">
          {columns!.map((col, i) => {
            const divider = col.divider ?? i > 0;
            const cell = item.cells?.[col.id];
            return (
              <span key={col.id} className="flex shrink-0 items-center">
                {divider && <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border" data-testid="action-row-divider" />}
                <span
                  className={cn('flex min-w-0 items-center truncate whitespace-nowrap text-text-secondary', sm ? 'text-sm leading-5' : 'text-[15px] leading-6', COLUMN_WIDTH[col.width], divider && 'pl-5', col.align === 'end' && 'justify-end')}
                  data-testid={`action-row-cell-${col.id}`}
                  data-width={col.width}
                >
                  {col.label && cell != null && cell !== false && <span className="sr-only">{col.label}: </span>}
                  {cell}
                </span>
              </span>
            );
          })}
        </span>
      )}
      {action ? (
        <span className={cn('ml-2 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-primary', sm ? 'text-sm font-semibold leading-5' : 'text-[15px] font-medium leading-6')} data-testid="action-row-action">
          {action}
          <ArrowRightIcon size={16} aria-hidden="true" />
        </span>
      ) : (
        <ChevronIcon dir="right" size={16} aria-hidden="true" className="ml-2 shrink-0 text-text-secondary" />
      )}
    </>
  );
}

export interface ActionRowPersonProps {
  name: string;
  /** A photo; initials when absent (or when it fails to load). */
  avatarUrl?: string;
  /** Avatar diameter in px. Default 28. */
  size?: number;
}

/**
 * The person cell of an `ActionRowList` column — a 28px avatar then the name,
 * truncating inside the column's width. Since 2.392.0.
 */
export function ActionRowPerson({ name, avatarUrl, size = 28 }: ActionRowPersonProps) {
  return (
    <span className="flex min-w-0 items-center gap-3" data-testid="action-row-person">
      <Avatar name={name} size={size} {...(avatarUrl ? { src: avatarUrl } : {})} />
      <span className="min-w-0 truncate" title={name}>{name}</span>
    </span>
  );
}

export function ActionRowList({
  items,
  onOpen,
  footer,
  emptyLabel,
  columns,
  tone = 'neutral',
  accent = 'none',
  striped = true,
  action,
  size: sizeProp,
  'aria-label': ariaLabel,
  className,
  'data-testid': testId = 'action-row-list',
}: ActionRowListProps) {
  const size = useDensitySize('ActionRowList', sizeProp, { comfortable: 'md', compact: 'sm' });
  if (items.length === 0 && emptyLabel == null && footer == null) return null;
  const toned = tone !== 'neutral';
  const hasColumns = !!columns && columns.length > 0;
  return (
    <div className={cn('flex min-w-0 flex-col', className)} data-testid={testId} data-striped={striped || undefined} {...(size === 'sm' ? { 'data-size': 'sm' } : {})}>
      {items.length === 0 ? (
        emptyLabel != null && <p className="m-0 py-2 text-sm text-text-tertiary" data-testid={`${testId}-empty`}>{emptyLabel}</p>
      ) : (
        <ul className={cn('m-0 list-none p-0', toned ? 'flex flex-col gap-1' : 'border-t border-border')} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})} {...(toned ? { 'data-tone': tone } : {})}>
          {items.map((item, index) => {
            const rowTone = item.tone ?? tone;
            const rowAccent = item.accent ?? accent;
            const rowAction = item.action ?? action;
            const rowClass = cn(
              ROW_CLASS,
              hasColumns && cn(size === 'sm' ? 'min-h-10' : 'min-h-[45px]', 'py-[3px]'),
              hasColumns && item.leading != null && 'pl-5',
              rowTone !== 'neutral' && cn(TONE_ROW[rowTone], 'rounded-r-md'),
              rowAccent === 'bar' && TONE_BAR[rowTone],
            );
            const body = <RowBody item={item} {...(hasColumns ? { columns } : {})} {...(rowAction ? { action: rowAction } : {})} size={size} />;
            return (
            <li key={item.id} className={cn(!toned && 'border-b border-border', striped && rowTone === 'neutral' && (index % 2 ? 'bg-surface-panel' : 'bg-surface'))} data-testid={`${testId}-row-${item.id}`} {...(rowTone !== 'neutral' ? { 'data-tone': rowTone } : {})} {...(rowAccent === 'bar' ? { 'data-accent': 'bar' } : {})}>
              {item.href && !item.disabled ? (
                <a href={item.href} onClick={() => onOpen?.(item)} className={rowClass} data-testid={`${testId}-open-${item.id}`}>
                  {body}
                </a>
              ) : (
                <button
                  type="button"
                  disabled={item.disabled}
                  title={item.disabled ? item.disabledReason : undefined}
                  onClick={() => {
                    if (!item.disabled) onOpen?.(item);
                  }}
                  className={cn(rowClass, item.disabled ? 'cursor-default opacity-60' : 'cursor-pointer', item.disabled && rowTone === 'neutral' && 'hover:bg-transparent')}
                  data-testid={`${testId}-open-${item.id}`}
                >
                  {body}
                </button>
              )}
            </li>
            );
          })}
        </ul>
      )}
      {footer != null && <div className="mt-2 flex items-center" data-testid={`${testId}-footer`}>{footer}</div>}
    </div>
  );
}

export default ActionRowList;
