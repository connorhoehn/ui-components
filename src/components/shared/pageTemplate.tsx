// Shared parts of the page templates (PageFrame, CollectionPage,
// MasterDetailPage, DetailPage, DashboardPage, SettingsPage).
//
// One gutter, one header, one fill rule: every template is `h-full min-h-0`,
// its header is `shrink-0`, and exactly one region below it scrolls. The
// gutter is `--ui-page-gutter` (1.5rem in styles.css), so a host that tightens
// it tightens every template at once.
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { PageHeader, type PageHeaderBack } from './PageHeader';
import type { BreadcrumbItem } from './Breadcrumbs';
import type { Density } from './Density';

/** `page`: the template draws the `--ui-page-gutter` inset. `none`: the host already did. */
export type PageGutter = 'page' | 'none';

export const PAGE_GUTTER_X = 'px-[var(--ui-page-gutter,1.5rem)]';
export const PAGE_GUTTER_B = 'pb-[var(--ui-page-gutter,1.5rem)]';

/** The header every page template draws: the trail, the title row, the actions. */
export interface PageTemplateHeaderProps {
  title: string;
  /** One line under the title (compact density folds it into the info card). */
  description?: string;
  /** The trail as the header's first row. */
  breadcrumbs?: BreadcrumbItem[];
  /** Right-aligned buttons and menus. */
  actions?: ReactNode;
  /** A status pill beside the title. */
  badge?: ReactNode;
  /** A back link above the title. */
  back?: PageHeaderBack;
  /** Header density; default `compact` (one 28px title row). */
  density?: Density;
}

/** The template header. Rendered as the template root's direct child (no wrapper) so host selectors keep matching. */
export function TemplateHeader({
  title, description, breadcrumbs, actions, badge, back, density = 'compact', gutter,
}: PageTemplateHeaderProps & { gutter: PageGutter }) {
  const trail = !!breadcrumbs && breadcrumbs.length > 0;
  return (
    <PageHeader
      title={title}
      {...(description ? { description } : {})}
      {...(actions != null ? { actions } : {})}
      {...(badge != null ? { badge } : {})}
      {...(back ? { back } : {})}
      {...(trail ? { breadcrumbs } : {})}
      density={density}
      className={cn('shrink-0', gutter === 'page' && PAGE_GUTTER_X, gutter === 'page' && !trail && 'pt-3')}
    />
  );
}

/** Classes for a template's one scrolling body. */
export function scrollBodyClass(gutter: PageGutter, className?: string): string {
  return cn('min-h-0 min-w-0 flex-1 overflow-auto', gutter === 'page' && cn(PAGE_GUTTER_X, PAGE_GUTTER_B), className);
}
