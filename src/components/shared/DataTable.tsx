// src/components/shared/DataTable.tsx
//
// Generic admin-grade data table: sort, filter, pagination, row actions,
// loading + empty states. Builds on the lower-level Table primitives in
// src/components/ui/Table.tsx.
//
// Designed to replace hand-rolled `<table>` patterns across admin shells
// (RunsTable, ActiveRunsTable, EntityTable, identity list pages, etc).

import { isValidElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CollectionToolbar } from './CollectionToolbar';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import { Tooltip } from './Tooltip';
import { Button } from '../ui/Button';
import InlinePopover from './InlinePopover';
import { KeyValue } from './KeyValue';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
  type TableSize,
} from '../ui/Table';

export interface DataTableColumn<T> {
  /** Stable id for the column. When `accessor` is omitted, used as the data key on T. */
  key: string;
  /** Header label. */
  header: ReactNode;
  /** Optional cell renderer. If absent, the value at `key` is rendered as a string. */
  render?: (row: T, rowIndex: number) => ReactNode;
  /**
   * Optional sort comparator. If absent but `sortable=true`, the default
   * comparator compares numbers/bigints/Dates/booleans by VALUE and everything
   * else by `String(...)`. (It used to stringify unconditionally, which sorted a
   * numeric column lexicographically — 1, 10, 100, 2, 9 — and a Date column by
   * weekday name.)
   */
  compare?: (a: T, b: T) => number;
  /** Optional filter accessor. If absent but `filterable=true`, filters by `String(row[key])`. */
  getFilterText?: (row: T) => string;
  sortable?: boolean;
  /** Include this column's text in the global search box. Default: true if a search box is shown. */
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'right' | 'center';
  /** A number column: right-aligned header and cells, tabular figures. Since 2.434.0. */
  numeric?: boolean;
  /** The label a stacked card (`narrow`) puts before this column's value. Default: `header` when it is a string, else `key`. Since 2.515.3. */
  label?: string;
  /**
   * Cut this column's cells to one line with an ellipsis instead of letting a
   * long value widen the table (since 2.515.12). The cell takes the column's
   * share of the width (`width` when given, else what is left), and the full
   * text is the cell's `title`: the raw value when it is a string or number,
   * else `getFilterText(row)`, else the rendered cell's text. `data-truncate`
   * on the cell.
   *
   * Since 2.518.0 (narrow batch) the full text is a `Tooltip` on hover and on
   * focus (a link in the cell is reachable by keyboard, which a native
   * `title` never was), shown only when the text is actually cut; the cell
   * carries it as `data-full-text` instead of `title`.
   */
  truncate?: boolean;
  /**
   * With `truncate` (since 2.518.0): `two-lines` lets the value wrap onto a
   * second line before it is cut (a line clamp), for titles that are the
   * row's name — a decision, an initiative. Default `one-line`.
   */
  wrap?: 'one-line' | 'two-lines';
  /**
   * With `responsiveColumns` on the table (since 2.516.0): `1` (and the
   * default) is always shown; higher numbers hide first as the table's own
   * width narrows (the highest number first, the rightmost first on a tie).
   */
  priority?: number;
  className?: string;
}

/** Header letter case (since 2.515.12). `upper` (default): caps with wide tracking. `sentence`: the header text as written. */
export type DataTableHeaderCase = 'upper' | 'sentence';

export interface DataTableProps<T> {
  /** Document tables may wrap prose; ordinary collection rows retain their fixed rhythm. */
  rowHeight?: 'fixed' | 'content';
  data: T[];
  columns: DataTableColumn<T>[];
  /** Stable id for each row. Used as React key. */
  keyField: (row: T) => string;
  onRowClick?: (row: T) => void;
  /** Per-row trailing action cell (buttons, menu, etc.). */
  rowActions?: (row: T) => ReactNode;
  /**
   * The actions column's header text (since 2.516.1). Default "Actions"
   * (unchanged). It is also the column's accessible name when
   * `rowActionsHeaderHidden`.
   */
  rowActionsHeader?: ReactNode;
  /**
   * Draw the actions column with an empty visible header (since 2.516.1): the
   * header text stays as screen-reader-only text, so the column keeps its
   * name. Default false (the visible "Actions" header, unchanged). Marker
   * `data-row-actions-header="visible|hidden"` on the header cell.
   */
  rowActionsHeaderHidden?: boolean;
  /** Show a global search input. Default: false. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Page size. Pagination is shown when data.length > pageSize. */
  pageSize?: number;
  emptyMessage?: ReactNode;
  loading?: boolean;
  loadingRows?: number;
  /**
   * Drop the table's own border/rounding so a composite (e.g. a Card-framed
   * table like identity's EntityTable) can provide the frame instead.
   */
  frameless?: boolean;
  /**
   * Tint alternate rows so the eye can track one row across a wide table.
   *
   * `surface-inset` is the tint, at full strength — about 2% off `surface`,
   * which is a reading aid you feel rather than see. Half that (the first
   * attempt) measured ~1% and was simply invisible: a stripe nobody can
   * perceive is not a subtle stripe, it is a no-op with a prop attached.
   *
   * It stays lighter than `surface-panel`, the hover fill, so hover still
   * reads as the darker row — a stripe that fights the hover state is worse
   * than no stripe, because it makes the row under the pointer ambiguous.
   * Both are tokens, so the relationship holds in dark mode too.
   *
   * Default `true` since 2.504.0 (was `false`): an unstriped wide table is
   * the default nobody should get by accident. Pass `striped={false}` to opt
   * out, e.g. for a two-row summary table.
   */
  striped?: boolean;
  /**
   * Row density, forwarded to `Table`. `sm` (since 2.434.0): every row 44px
   * on one line, a 12px semibold caps header — the app's list step.
   */
  size?: TableSize;
  /**
   * Declares that this table's rows open nothing, and why ("Revisions are
   * read-only snapshots of this submission"). Ignored when `onRowClick` is
   * set. Emitted as `data-collection-rows="static"` +
   * `data-collection-rows-reason` so a rendered-UI audit can require every
   * other collection's rows to be activatable. Since 2.442.0.
   */
  staticRows?: string;
  /**
   * The narrow form (since 2.515.3): under 40rem of the table's own width
   * (a container query, like `ListRailLayout narrow`) each row becomes a
   * stacked card of label/value pairs, the label being the column's `label`
   * (else its string `header`, else `key`). Chosen over a sticky-column
   * scroller because a table's first column rarely identifies a row by
   * itself, and a card reads at 390px without a horizontal gesture. The header
   * row is visually hidden there (sorting is unavailable in the card form);
   * the DOM is the same table, so tests, row clicks and keyboard are unchanged.
   * Default `false`: the table keeps scrolling inside its own box.
   */
  narrow?: boolean;
  /**
   * The table's accessible name (since 2.515.10), on the `<table>` element.
   * A page with two tables (Jobs and Workers) needs each named for a screen
   * reader and for `getByRole('table', { name })`.
   */
  'aria-label'?: string;
  /** The id of the visible heading that names the table (since 2.515.10), on the `<table>`. Wins over `aria-label` for assistive tech, as ARIA says. */
  'aria-labelledby'?: string;
  /**
   * The selected row's key (`keyField(row)`) (since 2.515.10): the row the
   * page's inspector shows. It is tinted with the selection token
   * (`bg-primary-bg`, over the stripe), carries `aria-selected="true"` and
   * `data-selected`; while a selection is in use (this or `isRowSelected`
   * given) every other row carries `aria-selected="false"`. `null`: nothing
   * selected. Display only: the host still owns the selection
   * (`onRowClick`).
   */
  selectedKey?: string | null;
  /** The predicate form of `selectedKey`, for more than one selected row (since 2.515.10). `selectedKey` wins when both are given. */
  isRowSelected?: (row: T) => boolean;
  /**
   * Column header letter case (since 2.515.12). `upper` (default, unchanged):
   * 12px semibold caps with wide tracking. `sentence`: the header as written
   * ("Episode", "Outline / Synopsis"), normal tracking, same size and weight.
   * `data-header-case` on the `<thead>`.
   */
  headerCase?: DataTableHeaderCase;
  /**
   * Column priorities (since 2.516.0): as the table's own box narrows, the
   * columns with a `priority` above 1 hide, the highest number first, until
   * the rest fit without a horizontal scroll. Measured with a ResizeObserver
   * on the table's scroller rather than a container query: whether a column
   * fits depends on its content, which a fixed breakpoint cannot know. Each
   * row then gets a "+N columns" button whose popover lists that row's hidden
   * values. Sorting, selection and row clicks are unchanged; the hidden
   * columns' keys are on the root as `data-hidden-columns`. With `narrow`,
   * the stacked card form (under 40rem) shows every column again. Default
   * `false`.
   *
   * Since 2.517.0: the "+N" column has a visible "More" header and a quiet
   * regular-weight control; at most half the columns hide, and a table that
   * would hide more (or still overflows with every hideable column gone)
   * switches to the stacked card form instead (`data-stacked` on the root), so
   * it never overflows its box. The fit starts over from every column shown
   * when the box's width, the shown rows, the columns or the fonts change, so
   * a column hidden for wide content returns when the content narrows.
   */
  responsiveColumns?: boolean;
  className?: string;
  'data-testid'?: string;
}

// The narrow form's classes are written out whole (Tailwind scans source text).
const NARROW_TABLE = '@max-[40rem]:block';
const NARROW_HEAD = '@max-[40rem]:sr-only';
const NARROW_BODY = '@max-[40rem]:block';
const NARROW_ROW = '@max-[40rem]:block @max-[40rem]:px-3 @max-[40rem]:py-2';
const NARROW_CELL = '@max-[40rem]:flex @max-[40rem]:h-auto @max-[40rem]:items-baseline @max-[40rem]:justify-between @max-[40rem]:gap-4 @max-[40rem]:whitespace-normal @max-[40rem]:px-0 @max-[40rem]:py-1 @max-[40rem]:text-right @max-[40rem]:before:shrink-0 @max-[40rem]:before:text-left @max-[40rem]:before:text-xs @max-[40rem]:before:font-semibold @max-[40rem]:before:uppercase @max-[40rem]:before:tracking-wide @max-[40rem]:before:text-text-secondary @max-[40rem]:before:content-[attr(data-label)]';

// `headerCase="sentence"`: drops the caps and the wide tracking (tailwind-merge
// replaces Table's `uppercase tracking-wide`).
const SENTENCE_HEADER = 'normal-case tracking-normal';
// A truncating column: `max-w-0` lets an auto-layout table give the cell the
// column's share instead of its content's width; the inner span cuts the
// text. The narrow (stacked card) form undoes the cap.
const TRUNCATE_CELL = 'max-w-0 overflow-hidden whitespace-nowrap @max-[40rem]:max-w-none';
// Two lines, then the clamp: the cell wraps (no nowrap) and the inner span clamps.
const CLAMP_CELL = 'max-w-0 overflow-hidden @max-[40rem]:max-w-none';
const CLAMP_TEXT = 'line-clamp-2 whitespace-normal break-words';

/** The full text a truncating cell shows as its `title`. */
function truncateTitle<T>(col: DataTableColumn<T>, row: T, content: ReactNode): string {
  const raw = (row as Record<string, unknown>)[col.key];
  if (!col.render && raw != null && typeof raw !== 'object') return String(raw);
  if (typeof content === 'string' || typeof content === 'number') return String(content);
  if (col.getFilterText) return col.getFilterText(row);
  return nodeToFilterText(content).replace(/\s+/g, ' ').trim();
}

function columnLabel<T>(col: DataTableColumn<T>): string {
  return col.label ?? (typeof col.header === 'string' ? col.header : col.key);
}

/** A row's name for the hidden-columns popover: its first shown column's text. */
function rowName<T>(col: DataTableColumn<T> | undefined, row: T, rowIndex: number): string {
  if (!col) return '';
  if (col.getFilterText) return col.getFilterText(row);
  const raw = (row as Record<string, unknown>)[col.key];
  if (raw != null && typeof raw !== 'object') return String(raw);
  return col.render ? nodeToFilterText(col.render(row, rowIndex)).replace(/\s+/g, ' ').trim() : '';
}

/** The order columns hide in: highest `priority` first, the rightmost first on a tie. */
function hideOrder<T>(columns: DataTableColumn<T>[]): string[] {
  return columns
    .map((col, index) => ({ key: col.key, p: col.priority ?? 1, index }))
    .filter((c) => c.p > 1)
    .sort((a, b) => b.p - a.p || b.index - a.index)
    .map((c) => c.key);
}

// A hidden column's cells: gone in the table, back in the stacked card form.
const HIDDEN_COLUMN = 'hidden';
const HIDDEN_COLUMN_NARROW = 'hidden @max-[40rem]:flex';
// The "+N columns" cell has nothing to add in the card form, which shows every column.
const MORE_CELL_NARROW = '@max-[40rem]:hidden';

// The stacked form forced by `responsiveColumns` (since 2.517.0): the narrow
// form's classes without the container query, for a table whose columns no
// longer fit even with the hideable ones gone.
const STACK_TABLE = 'block';
const STACK_HEAD = 'sr-only';
const STACK_BODY = 'block';
const STACK_ROW = 'block px-3 py-2';
const STACK_CELL = 'flex h-auto max-w-none items-baseline justify-between gap-4 whitespace-normal px-0 py-1 text-right before:shrink-0 before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-text-secondary before:content-[attr(data-label)]';

interface ResponsiveColumnsState {
  /** How many of the hide-order columns are hidden (0 while stacked). */
  hidden: number;
  /** The table shows as stacked cards: more than half its columns would hide, or it overflows with every hideable column gone. */
  stacked: boolean;
}

/**
 * Fits the table to its box. Starting from every column shown, it hides one
 * hide-order column per pass while the scroller overflows (its scrollWidth
 * already counts the "+N" column, the cell padding and the table's border),
 * at most half the columns; one more pass switches to the stacked form. The
 * passes run in layout effects, so the reader never sees the intermediate
 * states. It starts over from every column shown whenever the box's width,
 * the rows (data, sort, search, page), the columns, the cells' text or the
 * loaded fonts change,
 * so a column hidden for wide content comes back once the content narrows.
 */
function useResponsiveColumns(
  enabled: boolean,
  candidates: number,
  total: number,
  rootRef: React.RefObject<HTMLDivElement | null>,
  contentKey: unknown,
): ResponsiveColumnsState {
  const maxHide = Math.min(candidates, Math.floor(total / 2));
  const [step, setStep] = useState(0);
  const [tick, setTick] = useState(0);
  const pendingReset = useRef(false);
  const lastKey = useRef<unknown>(contentKey);

  useEffect(() => {
    if (!enabled) return undefined;
    let live = true;
    const remeasure = () => {
      if (!live) return;
      pendingReset.current = true;
      setTick((t) => t + 1);
    };
    // Web fonts landing after the first pass change every cell's width.
    if (typeof document !== 'undefined' && document.fonts?.ready) void document.fonts.ready.then(remeasure, () => undefined);
    if (typeof ResizeObserver === 'undefined') return () => { live = false; };
    const scroller = rootRef.current?.querySelector<HTMLElement>('[data-table-scroller]');
    if (!scroller) return () => { live = false; };
    // Width only: hiding a column changes the rows' height, which must not restart the fit.
    let lastWidth = -1;
    const ro = new ResizeObserver(() => {
      const w = scroller.clientWidth;
      if (!live || w === lastWidth) return;
      lastWidth = w;
      remeasure();
    });
    ro.observe(scroller);
    // A cell's content can change with the same rows: a render that reads the
    // host's other state (an initiative's name arriving after the rows). The
    // data cells' text is the signature, the "+N" cells left out and hidden
    // cells kept in, so the fit's own passes never look like a change.
    let lastText: string | null = null;
    let frame = 0;
    const cellText = () => Array.from(scroller.querySelectorAll('tbody td:not([data-column-more])'), (td) => td.textContent ?? '').join('\u0001');
    const mo = typeof MutationObserver === 'undefined' ? null : new MutationObserver(() => {
      if (frame || typeof requestAnimationFrame === 'undefined') return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!live) return;
        const text = cellText();
        if (lastText !== null && text !== lastText) remeasure();
        lastText = text;
      });
    });
    lastText = cellText();
    mo?.observe(scroller, { subtree: true, childList: true, characterData: true });
    return () => { live = false; ro.disconnect(); mo?.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, [enabled, rootRef]);

  useLayoutEffect(() => {
    if (!enabled) return;
    if (lastKey.current !== contentKey) {
      lastKey.current = contentKey;
      pendingReset.current = true;
    }
    if (pendingReset.current) {
      pendingReset.current = false;
      if (step !== 0) {
        setStep(0);
        return;
      }
    }
    const scroller = rootRef.current?.querySelector<HTMLElement>('[data-table-scroller]');
    if (!scroller) return;
    const avail = scroller.clientWidth;
    if (avail <= 0) return;
    if (scroller.scrollWidth > avail + 1 && step <= maxHide) setStep(step + 1);
  });
  // `tick` only re-renders so the layout effect above measures again.
  void tick;
  if (!enabled) return { hidden: 0, stacked: false };
  const stacked = step > maxHide;
  return { hidden: stacked ? 0 : step, stacked };
}

interface HiddenColumnsCellProps {
  count: number;
  items: { label: string; value: ReactNode }[];
  rowLabel: string;
  testId: string;
}

/** The "+N columns" button and its popover of this row's hidden values. */
function HiddenColumnsButton({ count, items, rowLabel, testId }: HiddenColumnsCellProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        data-testid={testId}
        // Quieter than the row's own values: regular weight, secondary ink.
        className="whitespace-nowrap font-normal text-text-secondary"
      >
        {`+${count} ${count === 1 ? 'column' : 'columns'}`}
      </Button>
      <InlinePopover
        trigger={ref}
        open={open}
        onClose={close}
        placement="bottom-end"
        aria-label={`Hidden columns for ${rowLabel}`}
        kind="datatable-hidden-columns"
        data-testid={`${testId}-popover`}
        className="max-w-80 p-3"
      >
        <KeyValue items={items} layout="row" data-testid={`${testId}-values`} />
      </InlinePopover>
    </>
  );
}

const NESTED_CONTROL = 'a[href], button, input, select, textarea, label, summary, [role="button"], [role="checkbox"], [role="link"], [role="menuitem"], [role="switch"], [contenteditable="true"]';

/** True when a row event started on a control inside the row rather than the row itself. */
function fromNestedControl(target: EventTarget | null, row: Element): boolean {
  if (!(target instanceof Element)) return false;
  const control = target.closest(NESTED_CONTROL);
  return !!control && control !== row && row.contains(control);
}

/**
 * Default cell comparator. Values that carry an intrinsic order (number,
 * bigint, Date, boolean) are compared by VALUE; everything else falls back to
 * `localeCompare` on its string form.
 *
 * Stringifying unconditionally is the classic quietly-wrong sort: `String(10)`
 * collates before `String(9)`, so a "failures" column sorted descending puts 9
 * above 100. `NaN`/invalid Dates are treated as equal to each other and sorted
 * after real values so they can't make the comparator return NaN (which leaves
 * the engine free to emit an arbitrary order).
 */
function defaultCellCompare(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') {
    const aBad = Number.isNaN(a);
    const bBad = Number.isNaN(b);
    if (aBad || bBad) return aBad && bBad ? 0 : aBad ? 1 : -1;
    return a < b ? -1 : a > b ? 1 : 0;
  }
  if (typeof a === 'bigint' && typeof b === 'bigint') {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  if (a instanceof Date && b instanceof Date) {
    const at = a.getTime();
    const bt = b.getTime();
    const aBad = Number.isNaN(at);
    const bBad = Number.isNaN(bt);
    if (aBad || bBad) return aBad && bBad ? 0 : aBad ? 1 : -1;
    return at < bt ? -1 : at > bt ? 1 : 0;
  }
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return a === b ? 0 : a ? 1 : -1;
  }
  return String(a ?? '').localeCompare(String(b ?? ''));
}

/**
 * Cheap ReactNode → text walker used only for the search fallback below. Not
 * a general renderer: it never invokes components, just concatenates string/
 * number leaves and recurses into `props.children`, which is enough to
 * extract the visible text of the common "wrap a formatted value in a span"
 * render function without pulling in `react-dom/server`.
 */
function nodeToFilterText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToFilterText).join(' ');
  if (isValidElement(node)) {
    const children = (node.props as { children?: ReactNode } | null)?.children;
    return children === undefined ? '' : nodeToFilterText(children);
  }
  return '';
}

// Column keys we've already warned about — module-scoped so the warning
// fires once per column per page load, not once per keystroke.
const warnedSearchColumns = new Set<string>();

/**
 * Text a row contributes to the global search for one column. Priority:
 * `getFilterText` > a primitive `row[key]` > the rendered cell's text (when
 * `render` is set) > `String(value ?? '')` with a one-time dev warning,
 * because at that point the column has no way to be searched at all and a
 * search box that silently matches nothing looks like a bug in the data, not
 * the table.
 */
function filterTextForColumn<T>(col: DataTableColumn<T>, row: T, rowIndex: number): string {
  if (col.getFilterText) return col.getFilterText(row);
  const raw = (row as Record<string, unknown>)[col.key];
  const isPrimitive =
    raw !== null && raw !== undefined && typeof raw !== 'object' && typeof raw !== 'function';
  if (isPrimitive) return String(raw);
  if (col.render) return nodeToFilterText(col.render(row, rowIndex));
  if (process.env.NODE_ENV !== 'production' && !warnedSearchColumns.has(col.key)) {
    warnedSearchColumns.add(col.key);
    console.warn(
      `[DataTable] Column "${col.key}" is searchable but its value lives ` +
        'in neither a primitive row value nor getFilterText, and it has no ' +
        'render function to fall back on — it will never match a search ' +
        'query. Add getFilterText, add render, or set filterable={false}.',
    );
  }
  return String(raw ?? '');
}

function alignClass(a?: 'left' | 'right' | 'center'): string | undefined {
  if (a === 'right') return 'text-right';
  if (a === 'center') return 'text-center';
  return undefined;
}

export function DataTable<T>({
  rowHeight = 'fixed',
  data: dataProp,
  columns: columnsProp,
  keyField,
  onRowClick,
  rowActions,
  rowActionsHeader = 'Actions',
  rowActionsHeaderHidden = false,
  searchable = false,
  searchPlaceholder = 'Search…',
  pageSize,
  emptyMessage = 'No records.',
  loading = false,
  loadingRows = 5,
  frameless = false,
  size,
  striped = true,
  narrow = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  selectedKey,
  isRowSelected,
  headerCase = 'upper',
  responsiveColumns = false,
  className,
  'data-testid': testId,
  staticRows,
}: DataTableProps<T>) {
  const sentenceHeaders = headerCase === 'sentence';
  const selection = selectedKey !== undefined || !!isRowSelected;
  const selectedRow = (row: T): boolean =>
    selectedKey !== undefined ? selectedKey !== null && keyField(row) === selectedKey : !!isRowSelected?.(row);
  // A library's props cross a trust boundary: the types are erased at runtime,
  // and a host that hands us `undefined` (an in-flight fetch, a response shape
  // that changed) used to take down the whole page with a TypeError from
  // `data.filter`, not just this table. Normalising here means a missing prop
  // renders the empty state — which is what the caller almost certainly meant
  // — while the surrounding chrome survives.
  const data = Array.isArray(dataProp) ? dataProp : [];
  const columns = Array.isArray(columnsProp) ? columnsProp : [];
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const order = useMemo(() => (responsiveColumns ? hideOrder(columns) : []), [responsiveColumns, columns]);
  const columnKeys = columns.map((c) => c.key).join('|');

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    if (!searchable || query.trim() === '') return data;
    const q = query.trim().toLowerCase();
    return data.filter((row, rowIndex) =>
      columns.some((col) => {
        if (col.filterable === false) return false;
        return filterTextForColumn(col, row, rowIndex).toLowerCase().includes(q);
      }),
    );
  }, [data, columns, query, searchable]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.sortable) return filtered;
    const cmp =
      col.compare ??
      ((a: T, b: T) =>
        defaultCellCompare(
          (a as Record<string, unknown>)[col.key],
          (b as Record<string, unknown>)[col.key],
        ));
    const copy = [...filtered];
    copy.sort((a, b) => (sortDir === 'asc' ? cmp(a, b) : -cmp(a, b)));
    return copy;
  }, [filtered, columns, sortKey, sortDir]);

  const totalPages = pageSize && pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const safePage = Math.min(page, totalPages - 1);
  const paged = useMemo(() => {
    if (!pageSize || pageSize <= 0) return sorted;
    const start = safePage * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, pageSize, safePage]);

  // A new identity whenever the shown rows or the columns change: the fit starts over.
  const contentKey = useMemo(() => ({ paged, columnKeys }), [paged, columnKeys]);
  const fit = useResponsiveColumns(responsiveColumns, order.length, columns.length, rootRef, contentKey);
  const stacked = fit.stacked;
  const hidden = useMemo(() => new Set(order.slice(0, fit.hidden)), [order, fit.hidden]);
  const hiddenCols = columns.filter((c) => hidden.has(c.key));
  const hideClass = narrow ? HIDDEN_COLUMN_NARROW : HIDDEN_COLUMN;
  const moreColumn = hiddenCols.length > 0;
  const labelled = narrow || stacked;

  return (
    <div
      ref={rootRef}
      className={cn('flex min-w-0 flex-col gap-3', narrow && '@container', className)}
      data-testid={testId}
      data-responsive-columns={responsiveColumns ? '' : undefined}
      data-hidden-columns={responsiveColumns ? hiddenCols.map((c) => c.key).join(' ') : undefined}
      data-stacked={stacked ? '' : undefined}
      // The collection composite: an audit reads these to require activatable
      // rows unless the table says, with a reason, that its rows open nothing.
      data-collection-table=""
      data-collection-rows={onRowClick ? 'activatable' : staticRows ? 'static' : undefined}
      data-collection-rows-reason={!onRowClick && staticRows ? staticRows : undefined}
    >
      {searchable && <CollectionToolbar label="Table controls" search={{ value: query, onChange: value => { setQuery(value); setPage(0); }, placeholder: searchPlaceholder, 'aria-label': 'Search', 'data-testid': 'datatable-search' }} />}
      {/* `Table` draws its own horizontal scroller (since 2.446.4), so a wide
          table's spill stays inside the table's box. */}
        <Table data-ui-table-rows={rowHeight} {...(size ? { size } : {})} className={cn(!frameless && 'border border-border rounded-lg overflow-hidden', narrow && NARROW_TABLE, stacked && STACK_TABLE)}
          {...(ariaLabel ? { 'aria-label': ariaLabel } : {})} {...(ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : {})}>
        <TableHead className={cn(narrow && NARROW_HEAD, stacked && STACK_HEAD)} data-header-case={headerCase}>
          <tr>
            {columns.map((col) => {
              const isSorted = col.sortable && sortKey === col.key;
              return (
                <TableTh
                  key={col.key}
                  sortable={col.sortable}
                  sortDirection={isSorted ? sortDir : null}
                  style={col.width ? { width: col.width } : undefined}
                  numeric={col.numeric}
                  className={cn(sentenceHeaders && SENTENCE_HEADER, alignClass(col.align), col.className, hidden.has(col.key) && HIDDEN_COLUMN)}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  data-testid={col.sortable ? `datatable-header-${col.key}` : undefined}
                  data-column={responsiveColumns ? col.key : undefined}
                  {...(hidden.has(col.key) ? { 'data-column-hidden': '' } : {})}
                >
                  {col.header}
                </TableTh>
              );
            })}
            {moreColumn && (
              <TableTh className={cn(sentenceHeaders && SENTENCE_HEADER, 'w-px whitespace-nowrap text-right')} data-testid="datatable-more-header" data-column-more="">
                More
              </TableTh>
            )}
            {rowActions && (
              <TableTh className={cn(sentenceHeaders && SENTENCE_HEADER, 'text-right')} data-testid="datatable-actions-header" data-row-actions-header={rowActionsHeaderHidden ? 'hidden' : 'visible'}>
                {rowActionsHeaderHidden ? <span className="sr-only">{rowActionsHeader}</span> : rowActionsHeader}
              </TableTh>
            )}
          </tr>
        </TableHead>
        {/* DataTable stripes its data rows itself (odd index), so skeleton and
            empty-state rows never band; the body-level stripe stays off. */}
        <TableBody striped={false} className={cn(narrow && NARROW_BODY, stacked && STACK_BODY)} data-ui-table-striped={striped ? '' : undefined}>
          {loading
            ? Array.from({ length: loadingRows }).map((_, i) => (
                <TableRow key={`skeleton-${i}`} data-testid="datatable-loading-row">
                  {columns.map((col) => (
                    <TableTd key={col.key} numeric={col.numeric} className={cn(alignClass(col.align), hidden.has(col.key) && HIDDEN_COLUMN)}>
                      <div className="h-4 w-3/4 animate-pulse rounded bg-surface-hover" />
                    </TableTd>
                  ))}
                  {moreColumn && <TableTd data-column-more="" />}
                  {rowActions && (
                    <TableTd className="text-right">
                      <div className="ml-auto h-4 w-16 animate-pulse rounded bg-surface-hover" />
                    </TableTd>
                  )}
                </TableRow>
              ))
            : paged.length === 0
              ? (
                <TableRow>
                  <TableTd
                    colSpan={columns.length - hiddenCols.length + (moreColumn ? 1 : 0) + (rowActions ? 1 : 0)}
                    className="text-center text-text-secondary py-8"
                  >
                    {emptyMessage}
                  </TableTd>
                </TableRow>
              )
              : paged.map((row, rowIndex) => {
                  const selected = selection && selectedRow(row);
                  return (
                  <TableRow
                    key={keyField(row)}
                    clickable={!!onRowClick}
                    {...(selection ? { 'aria-selected': selected } : {})}
                    {...(selected ? { 'data-selected': '' } : {})}
                    // Striping the ODD rows keeps the first row on the plain
                    // surface, so the table starts flush with the page rather
                    // than opening on a band.
                    className={cn(
                      narrow && NARROW_ROW,
                      stacked && STACK_ROW,
                      // The selection tint wins over the stripe (one background).
                      selected ? 'bg-primary-bg hover:bg-primary-bg' : striped && rowIndex % 2 === 1 ? 'bg-surface-inset' : undefined,
                      // Only a clickable row joins the tab order — a plain
                      // display table has nothing to activate, and adding a
                      // stop with no effect would be a worse keyboard
                      // experience than no stop at all.
                      onRowClick &&
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                    )}
                    tabIndex={onRowClick ? 0 : undefined}
                    // +2, not +1: row 1 of the ARIA table model is the header
                    // row, so the first body row is row 2.
                    aria-rowindex={onRowClick ? rowIndex + 2 : undefined}
                    // A control inside the row (a selection checkbox, a link, a
                    // menu) owns its own click and keys: it must not also open
                    // the row, and Space on a focused checkbox must still tick it.
                    onClick={onRowClick ? (e) => { if (!fromNestedControl(e.target, e.currentTarget)) onRowClick(row); } : undefined}
                    onKeyDown={
                      onRowClick
                        ? (e) => {
                            if (e.target !== e.currentTarget) return;
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onRowClick(row);
                            }
                          }
                        : undefined
                    }
                  >
                    {columns.map((col) => {
                      const content = col.render
                        ? col.render(row, rowIndex)
                        : String((row as Record<string, unknown>)[col.key] ?? '');
                      const fullText = col.truncate ? truncateTitle(col, row, content) : '';
                      return (
                      <TableTd
                        key={col.key}
                        numeric={col.numeric}
                        className={cn(alignClass(col.align), col.truncate && (col.wrap === 'two-lines' ? CLAMP_CELL : TRUNCATE_CELL), narrow && NARROW_CELL, col.className, stacked && STACK_CELL, hidden.has(col.key) && hideClass)}
                        {...(labelled ? { 'data-label': columnLabel(col) } : {})}
                        {...(col.truncate ? { 'data-truncate': col.wrap === 'two-lines' ? 'two-lines' : '' } : {})}
                        {...(fullText ? { 'data-full-text': fullText } : {})}
                      >
                        {col.truncate ? (
                          <Tooltip content={fullText} disabled={!fullText} onlyWhenTruncated triggerClassName="block min-w-0" data-testid="datatable-cell-tooltip">
                            <span className={cn('block min-w-0', col.wrap === 'two-lines' ? CLAMP_TEXT : 'truncate')}>{content}</span>
                          </Tooltip>
                        ) : content}
                      </TableTd>
                      );
                    })}
                    {moreColumn && (
                      // The popover is portalled, but its clicks still bubble
                      // through React to this row; they must not open it.
                      <TableTd data-column-more="" className={cn('w-px whitespace-nowrap text-right', narrow && MORE_CELL_NARROW)} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                        <HiddenColumnsButton
                          count={hiddenCols.length}
                          rowLabel={rowName(columns.find((c) => !hidden.has(c.key)), row, rowIndex) || keyField(row)}
                          testId={`datatable-more-${keyField(row)}`}
                          items={hiddenCols.map((col) => ({
                            label: columnLabel(col),
                            value: col.render ? col.render(row, rowIndex) : String((row as Record<string, unknown>)[col.key] ?? ''),
                          }))}
                        />
                      </TableTd>
                    )}
                    {rowActions && (
                      <TableTd className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {rowActions(row)}
                        </div>
                      </TableTd>
                    )}
                  </TableRow>
                  );
                })}
        </TableBody>
        </Table>
      {pageSize && pageSize > 0 && sorted.length > pageSize && (
        <div className="flex items-center justify-between text-xs text-text-secondary" data-collection-pager>
          <span data-testid="datatable-page-summary">
            Page {safePage + 1} of {totalPages} · {sorted.length} total
          </span>
          <div className="flex gap-1" role="group" aria-label="Pagination">
            <Tooltip content="Previous page"><IconButton size="sm" aria-label="Previous page" icon={<ChevronIcon dir="left" />}
              onClick={() => setPage(Math.max(0, safePage - 1))} disabled={safePage === 0} data-testid="datatable-prev" /></Tooltip>
            <Tooltip content="Next page"><IconButton size="sm" aria-label="Next page" icon={<ChevronIcon dir="right" />}
              onClick={() => setPage(Math.min(totalPages - 1, safePage + 1))} disabled={safePage >= totalPages - 1} data-testid="datatable-next" /></Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
