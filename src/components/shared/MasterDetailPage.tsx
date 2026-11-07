// MasterDetailPage — a list rail beside the selected record.
//
// Built on `ListRailLayout`, not `MasterDetail`: ListRailLayout is the rail
// model's list rail (flush 264px rail, caption title + count chip, search
// header, scrolling rows, footer) that the consumer's section layouts already
// draw, and its rail takes any body (a `GroupedList`, a loading or empty
// state). `MasterDetail` is an older items-driven split with px widths and its
// own compact mode; nothing consumes it.
//
// The header is the content column's first rows (trail, then title), right of
// the rail, as SectionContent drew it. The record scrolls; the header does not.
//
// `body="docked"` (since 2.505.0) makes the record column a `DockedColumn`, as
// `PageFrame body="docked"` and `SectionLayout footer` do: the record (or the
// empty-selection overview) scrolls over a dock at the column's bottom, and
// `footer` plus any `ColumnDock` inside the body (an overview's collection
// command composer) render there, spanning the column.
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ColumnDock, DockedColumn } from '../layout/DockedColumn';
import { ListRailLayout, type ListRail, type ListRailLayoutProps } from '../layout/ListRailLayout';
import EmptyState from './EmptyState';
import { PAGE_GUTTER_B, PAGE_GUTTER_X, TemplateHeader, type PageGutter, type PageTemplateHeaderProps } from './pageTemplate';

export interface MasterDetailPageProps extends PageTemplateHeaderProps {
  /** The rail, as data (`ListRail`): title, count, search header, rows body, footer, label. */
  list: ListRail;
  /** The selected record. `null`/`undefined`/`false`: nothing selected, `emptyDetail` shows. */
  children?: ReactNode;
  /** Shown when nothing is selected. Default: an EmptyState "Select an item from the list". */
  emptyDetail?: ReactNode;
  /** Right of the record (a `ContextColumn`). */
  aside?: ReactNode;
  /** Docked under the record (a composer). With `body="docked"` it goes into the column's dock. */
  footer?: ReactNode;
  /**
   * `scroll` (default): the record scrolls; `footer` is a fixed band under it.
   * `docked` (since 2.505.0): the record column is a `DockedColumn` — the record, or `emptyDetail` (an overview), scrolls
   * over a dock at the column's bottom, and `footer` and any `ColumnDock` inside the body render there, spanning the column.
   */
  body?: 'scroll' | 'docked';
  /** With `body="docked"`: `scroll` (default) the body scrolls over the dock; `fill` it is a fixed frame whose panes scroll (a conversation). Since 2.505.0. */
  dockedBody?: 'scroll' | 'fill';
  /** The reader's fold of the rail (`useRailFold`). */
  fold?: ListRailLayoutProps['fold'];
  /** Rail width; default `ms` (264px). */
  railWidth?: ListRailLayoutProps['railWidth'];
  /** Default `page` — the record and header at `--ui-page-gutter`. */
  gutter?: PageGutter;
  className?: string;
  'data-testid'?: string;
  /** Set by `PageFromSpec`: the spec template this page was built from. */
  'data-page-spec'?: string;
}

/**
 * Use this when a page is a list you pick from and the picked record beside it: list rail on the left, header and record on the right, an empty-selection state.
 *
 * Fills its parent (`h-full min-h-0`); the rail rows and the record scroll independently.
 *
 * @example
 * <MasterDetailPage title={selected?.name ?? 'Requests'} breadcrumbs={trail}
 *   list={{ label: 'requests', title: 'Pending', count: rows.length, header: <SearchInput … />, body: <GroupedList … /> }}
 *   emptyDetail={<EmptyState title="Pick a request" />}>
 *   {selected && <RequestRecord request={selected} />}
 * </MasterDetailPage>
 *
 * @example
 * // A catalog: an overview when nothing is selected, its command composer docked at the column's bottom.
 * <MasterDetailPage title={selected?.name ?? 'Designs'} breadcrumbs={trail} list={rail} body="docked"
 *   emptyDetail={<><CatalogOverview /><ColumnDock><CollectionCommandHost inPlace … /></ColumnDock></>}>
 *   {selected && <DesignRecord design={selected} />}
 * </MasterDetailPage>
 */
export function MasterDetailPage({
  title, description, breadcrumbs, actions, badge, back, density, titleAs,
  list, children, emptyDetail, aside, footer, body = 'scroll', dockedBody = 'scroll', fold, railWidth, gutter = 'page', className, 'data-testid': testId, 'data-page-spec': spec,
}: MasterDetailPageProps) {
  const selected = children != null && children !== false;
  const docked = body === 'docked';
  const bodyClass = cn('flex min-w-0 flex-col gap-3 pt-3', gutter === 'page' && cn(PAGE_GUTTER_X, PAGE_GUTTER_B));
  const content = selected ? children : (emptyDetail ?? <EmptyState title="Select an item from the list" />);
  return (
    <div className={cn('flex h-full min-h-0 min-w-0 flex-col', className)} data-page-template="master-detail" data-page-spec={spec} data-testid={testId}>
      <ListRailLayout
        list={list}
        header={<TemplateHeader {...{ title, description, breadcrumbs, actions, badge, back, density, titleAs, gutter }} />}
        {...(aside != null ? { aside } : {})}
        {...(footer != null && !docked ? { footer } : {})}
        {...(fold ? { fold } : {})}
        {...(railWidth ? { railWidth } : {})}
      >
        {docked ? (
          <DockedColumn
            body={dockedBody}
            bodyClassName={bodyClass}
            bodyProps={{ 'data-page-body': 'docked', 'data-master-detail-body': selected ? 'selected' : 'empty' }}
          >
            {content}
            {footer != null && <ColumnDock>{footer}</ColumnDock>}
          </DockedColumn>
        ) : (
          <div className={bodyClass} data-master-detail-body={selected ? 'selected' : 'empty'}>
            {content}
          </div>
        )}
      </ListRailLayout>
    </div>
  );
}

export default MasterDetailPage;
