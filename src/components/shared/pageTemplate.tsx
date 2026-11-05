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
import { ScopeHeader } from '../work/ScopeHeader';
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
  /**
   * The title's heading level (since 2.502.0). Default `h1`; `h2`/`h3` when a
   * host above the template already draws the page heading. Size is unchanged.
   */
  titleAs?: 'h1' | 'h2' | 'h3';
}

/**
 * The trail row as its own band (since 2.502.0): right-hand controls on the
 * crumb line, and the title that can fold into it. Given any of these, a
 * template draws `TrailHeader` instead of `TemplateHeader`.
 */
export interface PageTemplateTrailProps {
  /** Right of the trail, on the crumb row: a scope selector, a filter. */
  trailControls?: ReactNode;
  /** Right of the trail: an outbound link ("Agent library ↗"). */
  trailLink?: { label: string; href: string; icon?: ReactNode } | null;
  /** The title folds into the trail's last crumb (a conversation view); no title band is drawn. */
  collapsed?: boolean;
  /** Draws the collapse/expand chevron. */
  onToggleCollapsed?: () => void;
}

/** Whether a template's header is the trail-row form. */
export function hasTrailRow(p: PageTemplateTrailProps): boolean {
  return p.trailControls != null || p.trailLink != null || p.collapsed != null || p.onToggleCollapsed != null;
}

/** The template header. Rendered as the template root's direct child (no wrapper) so host selectors keep matching. */
export function TemplateHeader({
  title, description, breadcrumbs, actions, badge, back, density = 'compact', titleAs, gutter,
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
      {...(titleAs ? { as: titleAs } : {})}
      className={cn('shrink-0', gutter === 'page' && PAGE_GUTTER_X, gutter === 'page' && !trail && 'pt-3')}
    />
  );
}

/**
 * The trail-row header (since 2.502.0): the trail as its own row at the page
 * gutter (`ScopeHeader variant="crumbs"`, marked `data-page-trail`) with the
 * controls and link on its right, then the title band (`data-page-title`)
 * under it — or, collapsed, the title folded into the trail and no band.
 * Rendered as two direct children of the template root.
 */
export function TrailHeader({
  title, description, breadcrumbs, actions, badge, back, density = 'compact', titleAs,
  trailControls, trailLink, collapsed = false, onToggleCollapsed, gutter,
}: PageTemplateHeaderProps & PageTemplateTrailProps & { gutter: PageGutter }) {
  const hangs = trailControls != null || !!trailLink;
  return (
    <>
      <ScopeHeader
        variant="crumbs"
        {...(breadcrumbs ? { breadcrumbs } : {})}
        title={title}
        collapsed={collapsed}
        {...(onToggleCollapsed ? { onToggleCollapsed } : {})}
        {...(trailControls != null ? { controls: trailControls } : {})}
        {...(trailLink ? { link: trailLink } : {})}
        className={cn('shrink-0', gutter === 'none' && 'px-0')}
        data-testid="page-trail"
      />
      {!collapsed && (
        <div
          className={cn('shrink-0 min-w-0', gutter === 'page' && PAGE_GUTTER_X, density === 'compact' ? 'pb-2 pt-1' : cn('pb-4', hangs ? 'pt-1' : 'pt-3'))}
          data-page-title=""
        >
          <PageHeader
            title={title}
            density={density}
            {...(titleAs ? { as: titleAs } : {})}
            {...(description ? { description } : {})}
            {...(actions != null ? { actions } : {})}
            {...(badge != null ? { badge } : {})}
            {...(back ? { back } : {})}
            {...(onToggleCollapsed ? { onToggleCollapsed } : {})}
          />
        </div>
      )}
    </>
  );
}

/** Classes for a template's one scrolling body. */
export function scrollBodyClass(gutter: PageGutter, className?: string): string {
  return cn('min-h-0 min-w-0 flex-1 overflow-auto', gutter === 'page' && cn(PAGE_GUTTER_X, PAGE_GUTTER_B), className);
}
