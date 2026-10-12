import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { PageHeader, type PageHeaderProps } from './PageHeader';
import { CollectionToolbar, type CollectionToolbarProps } from './CollectionToolbar';

export interface CollectionPageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  title: string;
  description?: string;
  headerActions?: ReactNode;
  toolbar?: CollectionToolbarProps;
  children: ReactNode;
  back?: PageHeaderProps['back'];
}
/** Collection layout policy belongs here. A page supplies content and state;
 * it does not reproduce Stack/PageHeader/Toolbar spacing at each route. */
export function CollectionPage({ title, description, headerActions, toolbar, back, children, className, ...rest }: CollectionPageProps) {
  return <div className={cn('flex min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]', className)} data-collection-page {...rest}>
    <PageHeader title={title} description={description} actions={headerActions} back={back} density="compact" />
    {toolbar && <CollectionToolbar {...toolbar} />}
    {children}
  </div>;
}
