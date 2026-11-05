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
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
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
  /** Docked under the record (a composer). */
  footer?: ReactNode;
  /** The reader's fold of the rail (`useRailFold`). */
  fold?: ListRailLayoutProps['fold'];
  /** Rail width; default `ms` (264px). */
  railWidth?: ListRailLayoutProps['railWidth'];
  /** Default `page` — the record and header at `--ui-page-gutter`. */
  gutter?: PageGutter;
  className?: string;
  'data-testid'?: string;
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
 */
export function MasterDetailPage({
  title, description, breadcrumbs, actions, badge, back, density, titleAs,
  list, children, emptyDetail, aside, footer, fold, railWidth, gutter = 'page', className, 'data-testid': testId,
}: MasterDetailPageProps) {
  const selected = children != null && children !== false;
  return (
    <div className={cn('flex h-full min-h-0 min-w-0 flex-col', className)} data-page-template="master-detail" data-testid={testId}>
      <ListRailLayout
        list={list}
        header={<TemplateHeader {...{ title, description, breadcrumbs, actions, badge, back, density, titleAs, gutter }} />}
        {...(aside != null ? { aside } : {})}
        {...(footer != null ? { footer } : {})}
        {...(fold ? { fold } : {})}
        {...(railWidth ? { railWidth } : {})}
      >
        <div
          className={cn('flex min-w-0 flex-col gap-3 pt-3', gutter === 'page' && cn(PAGE_GUTTER_X, PAGE_GUTTER_B))}
          data-master-detail-body={selected ? 'selected' : 'empty'}
        >
          {selected ? children : (emptyDetail ?? <EmptyState title="Select an item from the list" />)}
        </div>
      </ListRailLayout>
    </div>
  );
}

export default MasterDetailPage;
