// src/components/shared/DataTable.tsx
//
// Generic admin-grade data table: sort, filter, pagination, row actions,
// loading + empty states. Builds on the lower-level Table primitives in
// src/components/ui/Table.tsx.
//
// Designed to replace hand-rolled `<table>` patterns across admin shells
// (RunsTable, ActiveRunsTable, EntityTable, identity list pages, etc).

import { isValidElement, useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CollectionToolbar } from './CollectionToolbar';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import { Tooltip } from './Tooltip';
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
  className?: string;
}

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
  className?: string;
  'data-testid'?: string;
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
  searchable = false,
  searchPlaceholder = 'Search…',
  pageSize,
  emptyMessage = 'No records.',
  loading = false,
  loadingRows = 5,
  frameless = false,
  size,
  striped = true,
  className,
  'data-testid': testId,
  staticRows,
}: DataTableProps<T>) {
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

  return (
    <div
      className={cn('flex min-w-0 flex-col gap-3', className)}
      data-testid={testId}
      // The collection composite: an audit reads these to require activatable
      // rows unless the table says, with a reason, that its rows open nothing.
      data-collection-table=""
      data-collection-rows={onRowClick ? 'activatable' : staticRows ? 'static' : undefined}
      data-collection-rows-reason={!onRowClick && staticRows ? staticRows : undefined}
    >
      {searchable && <CollectionToolbar label="Table controls" search={{ value: query, onChange: value => { setQuery(value); setPage(0); }, placeholder: searchPlaceholder, 'aria-label': 'Search', 'data-testid': 'datatable-search' }} />}
      {/* `Table` draws its own horizontal scroller (since 2.446.4), so a wide
          table's spill stays inside the table's box. */}
        <Table data-ui-table-rows={rowHeight} {...(size ? { size } : {})} className={frameless ? undefined : 'border border-border rounded-lg overflow-hidden'}>
        <TableHead>
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
                  className={cn(alignClass(col.align), col.className)}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  data-testid={col.sortable ? `datatable-header-${col.key}` : undefined}
                >
                  {col.header}
                </TableTh>
              );
            })}
            {rowActions && <TableTh className="text-right">Actions</TableTh>}
          </tr>
        </TableHead>
        {/* DataTable stripes its data rows itself (odd index), so skeleton and
            empty-state rows never band; the body-level stripe stays off. */}
        <TableBody striped={false} data-ui-table-striped={striped ? '' : undefined}>
          {loading
            ? Array.from({ length: loadingRows }).map((_, i) => (
                <TableRow key={`skeleton-${i}`} data-testid="datatable-loading-row">
                  {columns.map((col) => (
                    <TableTd key={col.key} numeric={col.numeric} className={alignClass(col.align)}>
                      <div className="h-4 w-3/4 animate-pulse rounded bg-surface-hover" />
                    </TableTd>
                  ))}
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
                    colSpan={columns.length + (rowActions ? 1 : 0)}
                    className="text-center text-text-secondary py-8"
                  >
                    {emptyMessage}
                  </TableTd>
                </TableRow>
              )
              : paged.map((row, rowIndex) => (
                  <TableRow
                    key={keyField(row)}
                    clickable={!!onRowClick}
                    // Striping the ODD rows keeps the first row on the plain
                    // surface, so the table starts flush with the page rather
                    // than opening on a band.
                    className={cn(
                      striped && rowIndex % 2 === 1 ? 'bg-surface-inset' : undefined,
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
                    {columns.map((col) => (
                      <TableTd
                        key={col.key}
                        numeric={col.numeric}
                        className={cn(alignClass(col.align), col.className)}
                      >
                        {col.render
                          ? col.render(row, rowIndex)
                          : String((row as Record<string, unknown>)[col.key] ?? '')}
                      </TableTd>
                    ))}
                    {rowActions && (
                      <TableTd className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {rowActions(row)}
                        </div>
                      </TableTd>
                    )}
                  </TableRow>
                ))}
        </TableBody>
        </Table>
      {pageSize && pageSize > 0 && sorted.length > pageSize && (
        <div className="flex items-center justify-between text-xs text-text-secondary">
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
