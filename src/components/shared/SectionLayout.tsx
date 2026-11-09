// SectionLayout — the frame around every page of a sectioned area: the
// section rail, an optional list rail beside it, and the content column.
//
// Upstreamed from the aws-agentcore portal's `BuildSectionLayout` and
// `StackedCatalogLayout` shims (2.504.0). Those composed the same five pieces
// by hand on every sectioned area (Observability, Knowledge, Identity, the
// Design catalogs…): `SubNavLayout` for the section rail, `ListRailLayout`
// for a section page's own list, `ViewportFillRegion` so the frame fills the
// window, and `DockedColumn` so a section's command composer docks at the
// content column's bottom with nothing below it. `MasterDetailPage` covers a
// list and a record, but not a section rail beside them or the rails' folds.
//
// The content column is drawn here when `header` is given: the trail as its
// first row (controls on its right), the view's title band under it, then the
// body over the column's dock. Without `header` the children ARE the column:
// a page template (`PageFrame`, `DetailPage`…) draws its own trail and body.
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import { ScopeHeader } from '../work/ScopeHeader';
import { ColumnDock, DockedColumn } from '../layout/DockedColumn';
import { ListRailLayout, type ListRail, type ListRailLayoutProps } from '../layout/ListRailLayout';
import type { ExplorerNarrow } from '../layout/ExplorerLayout';
import { ViewportFillRegion } from '../layout/ViewportFillRegion';
import { SubNavLayout, type SubNavItem, type SubNavLayoutProps } from './SubNavLayout';
import { PAGE_GUTTER_B, PAGE_GUTTER_X, TrailHeader, type PageGutter, type PageTemplateTrailProps } from './pageTemplate';
import type { BreadcrumbItem } from './Breadcrumbs';
import type { Density } from './Density';

/** A rail's fold, as `useRailFold` returns it. */
export interface SectionLayoutFold {
  folded: boolean;
  onToggle: () => void;
}

/**
 * The narrow form of a sectioned page (since 2.515.5). Under 40rem of the
 * frame's own width the section rail gives the content the whole width and
 * its items become one row of links over it (`SubNavLayout narrow`); with
 * `list`, the list rail and the content column stop sitting side by side as
 * well (`ListRailLayout narrow`): `showing: 'list'` draws the list at the
 * full width, `showing: 'record'` the column under a back control.
 */
export interface SectionLayoutNarrow {
  /** The list rail's narrow form; only with `list`. */
  list?: ExplorerNarrow;
}

/** The content column's header: the trail row, and the view's title band under it. */
export interface SectionLayoutHeader extends PageTemplateTrailProps {
  breadcrumbs?: BreadcrumbItem[];
  /** The view's title (rule: the view's name, not the record's). Omitted: the trail row alone. */
  title?: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  /** Default `h1`. */
  titleAs?: 'h1' | 'h2' | 'h3';
  /** Default `compact`. */
  density?: Density;
}

export interface SectionLayoutProps {
  /** The section's name: the section rail's caption and the region names. */
  title: string;
  /** The section rail's items. */
  items: SubNavItem[];
  /** Router integration for the rail's links (a `NavLink`, `activeNavItemClassName`). */
  renderNavItem?: SubNavLayoutProps['renderNavItem'];
  /** Remembered group folds in the rail. */
  storageKey?: string;
  /** Section rail width, px. Default 220. */
  railWidth?: number;
  /** A control in the rail's caption row (kept on the folded strip). */
  titleAction?: ReactNode;
  /** Under the caption row: a scope selector. */
  railHeader?: ReactNode;
  /** Replaces the item list (a combined `RailNavList`, a tree). */
  railContent?: ReactNode;
  /** The rail's accessible name. Default "<title> navigation". */
  railLabel?: string;
  /** The section rail's fold (`useRailFold`): folds to a 44px strip holding its » control. */
  railFold?: SectionLayoutFold;
  /** A second section rail between the first and the content. */
  secondary?: { title?: string; items: SubNavItem[]; storageKey?: string; railWidth?: number };
  /** The section page's own list, as a flush list rail beside the section rail (`ListRailLayout`). */
  list?: ListRail;
  /** The narrow form (since 2.515.5): `{}` for the section rail's one-row form, `{ list }` for the list rail's too. Omitted: unchanged at every width. */
  narrow?: SectionLayoutNarrow;
  /** The list rail's fold («/» on the rail). */
  listFold?: SectionLayoutFold;
  /** List rail width; default `ms` (264px). */
  listRailWidth?: ListRailLayoutProps['railWidth'];
  /** Right of the content column (a `ContextColumn`); list layouts only. */
  aside?: ReactNode;
  /** Given, the layout draws the content column's trail row and title band. Omitted, the children draw their own (a page template). */
  header?: SectionLayoutHeader;
  /** `scroll` (default): the body scrolls over the dock. `fill`: a fixed frame whose panes scroll (a canvas + inspector). */
  body?: 'scroll' | 'fill';
  /** The body's inset. Default `page` (`--ui-page-gutter`); `none` for a canvas or conversation that owns its gutters. */
  gutter?: PageGutter;
  /** Docked at the content column's bottom, spanning it: the section's command composer. A `ColumnDock` in the body lands there too. */
  footer?: ReactNode;
  /** `viewport` (default): the frame fills from its top to the window's bottom (`ViewportFillRegion`). `parent`: `h-full` (an AppShell fill region). */
  fill?: 'viewport' | 'parent';
  /** `fill="viewport"`: space kept under the frame, px. Default 0. */
  bottomGap?: number;
  /** The content region's accessible name. Default "<title> workspace". */
  contentLabel?: string;
  /** Extra classes for the body region. */
  bodyClassName?: string;
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

function foldToggle(fold: SectionLayoutFold, label: string) {
  const name = `${fold.folded ? 'Show' : 'Hide'} ${label}`;
  return (
    <IconButton size="sm" variant="ghost" aria-label={name} title={name} aria-expanded={!fold.folded} onClick={fold.onToggle}
      icon={<ChevronIcon dir={fold.folded ? 'right' : 'left'} size={14} />} data-testid="section-layout-rail-fold" />
  );
}

/**
 * Use this when a page lives in a sectioned area: the section rail on the left, optionally the page's list as a second rail, and the content column (trail row, title band, a body whose command composer docks at the column's bottom), filling the viewport.
 *
 * Without `header`, the children are the column: pass a page template (`PageFrame`, `DetailPage`, `CollectionPage`).
 *
 * @example
 * <SectionLayout title="Observability" items={sectionItems} renderNavItem={navLink}
 *   railFold={{ folded: rail.folded, onToggle: rail.toggle }}
 *   list={{ label: 'runs', title: 'Runs', count: runs.length, body: <GroupedList … /> }}
 *   header={{ breadcrumbs: trail, title: 'Runs', trailControls: <Select … /> }}
 *   footer={<CollectionCommandHost inPlace … />}>
 *   <RunRecord run={run} />
 * </SectionLayout>
 */
export function SectionLayout({
  title, items, renderNavItem, storageKey, railWidth, titleAction, railHeader, railContent, railLabel, railFold, secondary,
  list, listFold, listRailWidth, narrow, aside, header, body = 'scroll', gutter = 'page', footer, fill = 'viewport', bottomGap = 0,
  contentLabel, bodyClassName, children, className, 'data-testid': testId = 'section-layout',
}: SectionLayoutProps) {
  const docked = footer != null ? <ColumnDock>{footer}</ColumnDock> : null;
  let column: ReactNode;
  if (header) {
    const { breadcrumbs, title: viewTitle, description, badge, actions, titleAs, density, trailControls, trailLink, collapsed, onToggleCollapsed } = header;
    column = (
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col" data-page-column="" data-section-layout-column="">
        {viewTitle != null ? (
          <TrailHeader gutter="page" title={viewTitle}
            {...{ breadcrumbs, description, badge, actions, titleAs, density, trailControls, trailLink, collapsed, onToggleCollapsed }} />
        ) : (
          <ScopeHeader variant="crumbs" className="shrink-0" data-testid="page-trail"
            {...(breadcrumbs ? { breadcrumbs } : {})}
            {...(trailControls != null ? { controls: trailControls } : {})}
            {...(trailLink ? { link: trailLink } : {})} />
        )}
        <DockedColumn
          body={body}
          bodyClassName={cn('flex flex-col gap-3', gutter === 'page' && cn(PAGE_GUTTER_X, PAGE_GUTTER_B), viewTitle == null && 'pt-3', bodyClassName)}
          bodyProps={{ 'data-page-body': body }}
        >
          {children}
          {docked}
        </DockedColumn>
      </div>
    );
  } else {
    // The children draw the column; a footer still sits under them, spanning it.
    column = (
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col" data-section-layout-column="">
        <div className={cn('flex min-h-0 min-w-0 flex-1 flex-col', bodyClassName)}>{children}</div>
        {footer != null && <div className="flex min-w-0 shrink-0 flex-col" data-page-footer="">{footer}</div>}
      </div>
    );
  }

  const content = list ? (
    <ListRailLayout list={list} {...(listFold ? { fold: { folded: listFold.folded, onToggle: listFold.onToggle } } : {})}
      {...(listRailWidth ? { railWidth: listRailWidth } : {})} {...(aside != null ? { aside } : {})}
      {...(narrow?.list ? { narrow: narrow.list } : {})}
      data-testid={`${testId}-list`}>
      {column}
    </ListRailLayout>
  ) : column;

  const rail = railFold ? <>{titleAction}{foldToggle(railFold, `${title} navigation`)}</> : titleAction;
  const frame = (
    <div className={cn('flex h-full min-h-0 min-w-0 flex-col bg-surface', className)}
      data-page-template="section-layout" data-shell-flush="" data-section-layout={list ? 'list' : 'section'} data-testid={testId}>
      <SubNavLayout
        title={title}
        items={items}
        contentPadding="none"
        contentAs="section"
        contentLabel={contentLabel ?? `${title} workspace`}
        railLabel={railLabel ?? `${title} navigation`}
        {...(storageKey ? { storageKey } : {})}
        {...(railWidth ? { railWidth } : {})}
        {...(rail != null ? { titleAction: rail } : {})}
        {...(railHeader != null ? { railHeader } : {})}
        {...(railContent != null ? { railContent } : {})}
        {...(renderNavItem ? { renderNavItem } : {})}
        {...(railFold ? { collapsed: railFold.folded } : {})}
        {...(narrow ? { narrow: true } : {})}
        {...(secondary?.items.length ? {
          secondaryItems: secondary.items,
          ...(secondary.title ? { secondaryTitle: secondary.title } : {}),
          ...(secondary.storageKey ? { secondaryStorageKey: secondary.storageKey } : {}),
          ...(secondary.railWidth ? { secondaryRailWidth: secondary.railWidth } : {}),
        } : {})}
      >
        {content}
      </SubNavLayout>
    </div>
  );
  return fill === 'viewport' ? <ViewportFillRegion bottomGap={bottomGap} data-testid={`${testId}-fill`}>{frame}</ViewportFillRegion> : frame;
}

export default SectionLayout;
