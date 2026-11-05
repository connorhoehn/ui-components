import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { PageHeader, type PageHeaderProps } from './PageHeader';
import { CollectionToolbar, collectionToolbarFitsHeader, type CollectionToolbarProps } from './CollectionToolbar';

export interface CollectionPageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  title: string;
  description?: string;
  headerActions?: ReactNode;
  /** Beside the title (a scope chip such as the episode the page is filtered to). Since 2.503.0. */
  badge?: ReactNode;
  toolbar?: CollectionToolbarProps;
  /**
   * Where the toolbar draws (since 2.503.0). `auto` (default) puts its
   * search, filters and count in the header's actions row — before
   * `headerActions` — whenever nothing in it needs a full row (no active
   * `selection` prop, no `children`), so a collection page has no separate
   * search band. `band` keeps the toolbar's own row under the header;
   * `header` forces the header row.
   */
  toolbarPlacement?: 'auto' | 'header' | 'band';
  children: ReactNode;
  back?: PageHeaderProps['back'];
}
/** Collection layout policy belongs here. A page supplies content and state;
 * it does not reproduce Stack/PageHeader/Toolbar spacing at each route. */
export function CollectionPage({ title, description, headerActions, badge, toolbar, toolbarPlacement = 'auto', back, children, className, ...rest }: CollectionPageProps) {
  const inHeader = !!toolbar && (toolbarPlacement === 'header' || (toolbarPlacement === 'auto' && collectionToolbarFitsHeader(toolbar)));
  const actions = inHeader
    ? <><CollectionToolbar {...toolbar} placement="header" />{headerActions}</>
    : headerActions;
  return <div className={cn('flex min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]', className)} data-collection-page {...rest}>
    <PageHeader title={title} description={description} badge={badge} actions={actions} back={back} density="compact" />
    {toolbar && !inHeader && <CollectionToolbar {...toolbar} />}
    {children}
  </div>;
}
