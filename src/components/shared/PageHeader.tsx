// PageHeader — page-level title + description + actions header.
//
// Replaces the ad-hoc `<Heading>Title</Heading><p>Description</p><button>Action</button>`
// pattern repeated across every portal page. Supports an optional back link
// rendered above the title and an optional badge to the right of it.

import React from 'react';
import { cn } from '../../lib/cn';
import { ChevronIcon } from '../ui/Icons';
import { Tooltip } from './Tooltip';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { Tabs } from './Tabs';
import { useDensityForm, type Density } from './Density';
import {
  HeaderCollapseToggle, HeaderDescriptionInfo, HeaderPeople, HeaderTrailFold, visibleHeaderPeople,
  type HeaderPeopleGroup,
} from './headerDensity';

export interface PageHeaderBack {
  label: string;
  to: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/** A view tab under the header (since 2.437.0). */
export interface PageHeaderTab {
  id: string;
  label: string;
  /** Drawn after the label ("Work 11"). */
  count?: number;
  disabled?: boolean;
}

export interface PageHeaderProps {
  title: string;
  /** Semantic heading level for a header embedded under another page title; visual size is unchanged. */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  description?: string;
  /** Right-aligned action area (buttons, menus). */
  actions?: React.ReactNode;
  /** Optional back link rendered above the title. */
  back?: PageHeaderBack;
  /** Badge or status pill rendered to the right of the title. */
  badge?: React.ReactNode;
  /**
   * Title size. `md` (default) is the 20px heading every page has had, in
   * both forms; `lg` is a 28px directory title — a page that IS the list,
   * not a page about one thing (comfortable form only). `sm` (since
   * 2.441.8) is the 14/600 title — the compact form's title before 2.441.8,
   * now only on explicit request. Density is spacing: the compact form folds
   * the header onto one 28px row but keeps the 20/600 page title.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Since 2.437.0 — the trail as the header's first row ("Plan › Initiatives
   * › Observability Platform"). Owned here so a collapsed header can fold the
   * title into it. With a trail the header draws its own top padding (12px
   * comfortable, 8px compact/collapsed); the host keeps the side gutter.
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Since 2.437.0 — the library `Density` (default: the nearest
   * `DensityProvider`, else comfortable). Comfortable: trail, the title row,
   * the description, the people row, the tabs. Compact: trail, ONE 28px row
   * — the title at 14/600, `badge`, `info`, the people as a 24px avatar
   * cluster (names in tooltips), the collapse chevron, `actions` — and the
   * tabs; the description moves into `info` or, without one, the built-in
   * info `HoverCard`. Usually `useHeaderDensity().headerProps`.
   */
  density?: Density;
  /**
   * Since 2.437.0 — a STATE, not a density: the trail row only, the title
   * folded into its last crumb with `badge` and the expand chevron, `actions`
   * on the right, then the tabs. No trail given: the title alone is the row.
   */
  collapsed?: boolean;
  /** Draws the chevron: "Collapse header" on the title row, "Expand header" when collapsed. Since 2.437.0. */
  onToggleCollapsed?: () => void;
  /**
   * Labelled people — `[{ label: 'Owner', people, action }]`. Comfortable:
   * their own row under the description (32px avatar + name). Compact: the
   * avatar cluster on the title row. Since 2.437.0.
   */
  people?: HeaderPeopleGroup[];
  /**
   * The title's info trigger (a details `HoverCard`), after the badge. A host
   * `info` is trusted to show the description, so in compact density the
   * built-in description card is not drawn. Since 2.437.0.
   */
  info?: React.ReactNode;
  /**
   * The header's summary under the people (a stat strip, a certification
   * line). Comfortable only: compact moves it into the built-in description
   * card with the description; collapsed drops it. Since 2.437.0.
   */
  meta?: React.ReactNode;
  /** View tabs under the header, in every density and state. Since 2.437.0. */
  tabs?: PageHeaderTab[];
  /**
   * The tabs' fold (since 2.515.5; `Tabs overflowBelow`): while the header is
   * narrower than this many px, the first tab and the current one stay in
   * the row and the rest move into its `More ▾` menu, so a phone sees every
   * view's name instead of a row cut at the screen's edge. Omitted: the row
   * scrolls sideways (unchanged).
   */
  tabsOverflowBelow?: number;
  activeTab?: string;
  onTabChange?: (id: string) => void;
  className?: string;
  'data-testid'?: string;
}

function PageHeader({
  title,
  as: Heading = 'h1',
  description,
  actions,
  back,
  badge,
  size = 'md',
  breadcrumbs,
  density: densityProp,
  collapsed = false,
  onToggleCollapsed,
  people,
  info,
  meta,
  tabs,
  tabsOverflowBelow,
  activeTab,
  onTabChange,
  className,
  'data-testid': testId = 'page-header',
}: PageHeaderProps) {
  const density = useDensityForm(densityProp);
  const groups = visibleHeaderPeople(people);
  const hasTrail = !!breadcrumbs && breadcrumbs.length > 0;
  const hasTabs = !!tabs && tabs.length > 0;
  const tabStrip = hasTabs ? (
    <Tabs
      items={tabs!.map((tab) => ({
        id: tab.id, label: tab.label, ...(tab.count != null ? { badge: tab.count } : {}), ...(tab.disabled ? { disabled: true } : {}),
        testId: `${testId}-tab-${tab.id}`,
      }))}
      value={activeTab && tabs!.some((t) => t.id === activeTab) ? activeTab : tabs![0]!.id}
      onValueChange={(id) => onTabChange?.(id)}
      variant="underline" size="md" badgeStyle="plain" indicator="bar" indicatorWeight={3}
      aria-label={`${title} views`}
      // Compact/collapsed: the tabs sit right under the row (the stack's 4px
      // gap) so trail + row + tabs is 96px; comfortable keeps 12px.
      className={cn('gap-0', collapsed || density === 'compact' ? 'mt-0' : 'mt-3')}
      {...(tabsOverflowBelow ? { overflowBelow: tabsOverflowBelow } : {})}
      data-testid={`${testId}-tabs`}
    />
  ) : null;
  const trail = hasTrail ? <Breadcrumbs items={breadcrumbs!} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} /> : null;
  const chevron = onToggleCollapsed
    ? <HeaderCollapseToggle collapsed={collapsed} onToggle={onToggleCollapsed} data-testid={`${testId}-collapse-toggle`} />
    : null;

  // Compact/collapsed headers must retain the route back to their list.
  const compactBack = back ? <Tooltip content={back.label}><a href={back.to} onClick={back.onClick}
    aria-label={back.label} className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">
    <ChevronIcon dir="left" size={16} />
  </a></Tooltip> : null;

  if (collapsed) {
    return (
      <div className={cn('flex min-w-0 flex-col gap-1', hasTrail && 'pt-2', className)} data-testid={testId} data-page-header="" data-density={density} data-collapsed="true">
        <div className="flex min-w-0 items-center gap-2">
          {compactBack}
          <div className="min-w-0 flex-1"><HeaderTrailFold breadcrumbs={breadcrumbs} title={title} badge={badge} actions={actions} data-testid={`${testId}-fold`}
            {...(onToggleCollapsed ? { onExpand: onToggleCollapsed } : {})} /></div>
        </div>
        {tabStrip}
      </div>
    );
  }

  if (density === 'compact') {
    return (
      <div className={cn('flex min-w-0 flex-col gap-1', hasTrail && 'pt-2', className)} data-testid={testId} data-page-header="" data-density="compact" data-collapsed="false">
        {trail}
        {/* The row wraps (since 2.515.7): the title cell is laid out at an
            8rem basis, so when the title's 8rem, the gap and the actions do not
            fit the header's width, the actions take their own row under the
            title instead of squeezing it to nothing (a 302px column with four
            header actions used to lose its h1). Wide headers are unchanged:
            the cell grows to fill the row and the actions stay right. No
            container query: the header's own flex line does it, so it holds
            in any host, including one that sizes the header to its content. */}
        <div className="flex min-h-7 min-w-0 flex-wrap items-center gap-x-3 gap-y-1" data-testid={`${testId}-row`} data-page-header-row="">
          {compactBack}
          <div className="flex min-w-0 flex-1 basis-32 items-center gap-2" data-page-header-title-cell="">
            <Heading className={cn('m-0 min-w-0 truncate font-semibold text-[var(--color-text-primary)]', size === 'sm' ? 'text-sm leading-5' : 'text-xl leading-7')} title={title} data-title-size={size} data-page-header-title="">
              {title}
            </Heading>
            {badge}
            {info ?? (description || meta ? <HeaderDescriptionInfo title={title} width={meta ? 'xl' : 'lg'} description={<>{description}{meta && <div className="mt-2 whitespace-normal">{meta}</div>}</>} data-testid={`${testId}-description`} /> : null)}
            {/* The people give up width before the title does (they clip; each keeps its tooltip). */}
            {groups.length > 0 && <div className="flex min-w-0 shrink-[8] overflow-hidden"><HeaderPeople groups={groups} density="compact" data-testid={`${testId}-people`} /></div>}
            {chevron}
          </div>
          {/* Capped at the row's width and wrapping inside it, so actions on
              their own row never run past the column's edge. */}
          {actions && <div className="flex max-w-full flex-shrink-0 flex-wrap items-center gap-2" data-page-header-actions="">{actions}</div>}
        </div>
        {tabStrip}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-1.5', hasTrail && 'pt-3', className)} data-testid={testId} data-page-header="" data-density="comfortable" data-collapsed="false">
      {trail && <div className="mb-2.5">{trail}</div>}
      {back && (
        <a
          href={back.to}
          onClick={back.onClick}
          className="inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 2L3 6l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {back.label}
        </a>
      )}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {/* The title keeps its line: a badge/info that does not fit beside it
            wraps under it (since 2.446.4) instead of squeezing the title onto
            two lines. */}
        <div className="min-w-0 flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <Heading
            className={cn(
              'font-semibold text-[var(--color-text-primary)] leading-tight',
              size === 'lg' ? 'text-[28px] font-bold tracking-[-0.01em]' : size === 'sm' ? 'text-sm' : 'text-xl',
            )}
          >
            {title}
          </Heading>
          {badge}
          {info}
          {chevron}
        </div>
        {/* Capped at the header's width (since 2.446.4): on a narrow column the
            actions take their own row and wrap inside it rather than run past
            the column's edge. */}
        {actions && (
          <div className="flex max-w-full min-w-0 flex-shrink-0 flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
      )}
      {groups.length > 0 && <div className="mt-1"><HeaderPeople groups={groups} density="comfortable" data-testid={`${testId}-people`} /></div>}
      {meta && <div className="mt-2 min-w-0" data-testid={`${testId}-meta`}>{meta}</div>}
      {tabStrip}
    </div>
  );
}

export { PageHeader };
export default PageHeader;
