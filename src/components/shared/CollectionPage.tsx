import { isValidElement, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { type PageHeaderProps } from './PageHeader';
import { CollectionToolbar, type CollectionToolbarProps } from './CollectionToolbar';
import { DataTable, type DataTableProps } from './DataTable';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';
import type { BreadcrumbItem } from './Breadcrumbs';
import type { Density } from './Density';
import { SidePane, SidePaneSplit, useHasSidePaneHost, type SidePaneProps } from '../layout/SidePane';
import { TemplateHeader, scrollBodyClass, type PageGutter } from './pageTemplate';

/** What an empty collection says. A plain node renders as given. */
export interface CollectionEmpty {
  title: string;
  description?: ReactNode;
  /** A button ("New connector"). */
  action?: ReactNode;
}

/** The selected row's pane: a `SidePane` registration plus its body. */
export type CollectionPageDetail = Omit<SidePaneProps, 'children'> & { content: ReactNode };

export interface CollectionPageProps<T = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  title: string;
  description?: string;
  headerActions?: ReactNode;
  toolbar?: CollectionToolbarProps;
  /** Any body. Optional since the template gained `table`; one of the two is expected. */
  children?: ReactNode;
  back?: PageHeaderProps['back'];
  /** The trail as the header's first row. */
  breadcrumbs?: BreadcrumbItem[];
  badge?: ReactNode;
  /** Header density; default `compact`. */
  density?: Density;
  /** The title's heading level (since 2.502.0); default `h1`. */
  titleAs?: 'h1' | 'h2' | 'h3';
  /**
   * The body as a striped `DataTable` (striping on unless the props say otherwise).
   * Wins over `children`. Its `data.length === 0` is the empty state.
   */
  table?: DataTableProps<T>;
  /** Loading: the table's skeleton rows, or a `LoadingState` for a children body. */
  loading?: boolean;
  /** A failed load. A string renders as an `ErrorState` (with Retry when `onRetry`); a node renders as given. */
  error?: ReactNode;
  onRetry?: () => void;
  /** The empty state. Shown when `table.data` is empty, or when `isEmpty` for a children body. */
  empty?: CollectionEmpty | ReactNode;
  /** A children body has no rows (a table body works this out from `table.data`). */
  isEmpty?: boolean;
  /**
   * The selected row, in a `SidePane` beside the collection. `null`: no row selected
   * (pass `null` rather than omitting it, so a page without a shell host keeps its split).
   */
  detail?: CollectionPageDetail | null;
  /**
   * `none` (default, the original contract): the host owns the gutter. `page`:
   * header, toolbar and body sit at `--ui-page-gutter`. New pages want `page`.
   */
  gutter?: PageGutter;
}

function isEmptySpec(value: unknown): value is CollectionEmpty {
  return value != null && typeof value === 'object' && !isValidElement(value) && 'title' in (value as object);
}

/**
 * Use this when a page IS a list of records: header, `CollectionToolbar`, a striped `DataTable` (or any body), built-in loading/empty/error states, and the selected row in a `SidePane`.
 *
 * Fills its parent (`h-full min-h-0`); the body scrolls, the header and toolbar do not.
 * Collection layout policy belongs here: a page supplies content and state, it does not
 * reproduce Stack/PageHeader/Toolbar spacing at each route.
 *
 * @example
 * <CollectionPage gutter="page" title="Connectors" breadcrumbs={trail}
 *   toolbar={{ label: 'Connector filters', search: { value: q, onChange: setQ } }}
 *   table={{ data: rows, columns, keyField: (r) => r.id, onRowClick: (r) => setSelected(r.id) }}
 *   loading={isLoading} error={error?.message} onRetry={refetch}
 *   empty={{ title: 'No connectors yet', action: <Button>New connector</Button> }}
 *   detail={selected ? { title: selected.name, onClose: () => setSelected(null), content: <ConnectorSummary c={selected} /> } : null} />
 */
export function CollectionPage<T>({
  title, description, headerActions, toolbar, back, children, breadcrumbs, badge, density, titleAs,
  table, loading = false, error, onRetry, empty, isEmpty, detail, gutter = 'none', className, ...rest
}: CollectionPageProps<T>) {
  const hosted = useHasSidePaneHost();
  const rows = table ? table.data.length : null;
  const showEmpty = !loading && error == null && (table ? rows === 0 : !!isEmpty) && empty != null;

  let body: ReactNode;
  if (error != null && error !== false) {
    body = typeof error === 'string'
      ? <ErrorState title="Couldn't load this list" description={error} {...(onRetry ? { actionLabel: 'Retry', onAction: onRetry } : {})} />
      : error;
  } else if (showEmpty) {
    body = isEmptySpec(empty)
      ? <EmptyState title={empty.title} {...(empty.description != null ? { description: empty.description } : {})} {...(empty.action != null ? { action: empty.action } : {})} />
      : empty;
  } else if (table) {
    body = <DataTable striped {...table} loading={loading || !!table.loading} />;
  } else if (loading) {
    body = <LoadingState />;
  } else {
    body = children;
  }

  const page = (
    <div
      className={cn('flex h-full min-h-0 min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]', className)}
      data-collection-page
      data-page-template="collection"
      data-page-column=""
      {...rest}
    >
      <TemplateHeader title={title} gutter={gutter} actions={headerActions} density={density ?? 'compact'} {...(titleAs ? { titleAs } : {})}
        {...(description ? { description } : {})} {...(back ? { back } : {})} {...(breadcrumbs ? { breadcrumbs } : {})} {...(badge != null ? { badge } : {})} />
      {toolbar && (gutter === 'page'
        ? <div className="shrink-0 min-w-0 px-[var(--ui-page-gutter,1.5rem)]"><CollectionToolbar {...toolbar} /></div>
        : <CollectionToolbar {...toolbar} />)}
      <div className={scrollBodyClass(gutter)} data-collection-body="" data-state={error != null && error !== false ? 'error' : showEmpty ? 'empty' : loading ? 'loading' : 'ready'}>
        {body}
      </div>
      {detail && (() => {
        const { content, ...pane } = detail;
        return <SidePane {...pane}>{content}</SidePane>;
      })()}
    </div>
  );
  // Under the shell's SidePaneProvider the shell draws the split; alone, the page hosts its own.
  // Passing `detail` at all (even `null`) keeps the split mounted, so selecting a row never remounts the page.
  return detail !== undefined && !hosted ? <SidePaneSplit>{page}</SidePaneSplit> : page;
}
