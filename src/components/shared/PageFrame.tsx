// PageFrame — the frame for a page that is not a collection, a record, a
// dashboard or settings: a form, a configuration surface, an overview.
//
// Upstreamed from the portal's `FlushPage` / `SectionContent` shims: the trail
// as the first row, the page's one title under it, the body at the page
// gutter, and exactly one scrolling region. The page never scrolls; its body
// does (`body="scroll"`), or the body is a fixed-height frame whose own panes
// scroll (`body="fill"`, a canvas beside an inspector).
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ColumnDock, DockedColumn } from '../layout/DockedColumn';
import {
  PAGE_GUTTER_B, PAGE_GUTTER_X, TemplateHeader, TrailHeader, hasTrailRow, scrollBodyClass,
  type PageGutter, type PageTemplateHeaderProps, type PageTemplateTrailProps,
} from './pageTemplate';

export interface PageFrameProps extends PageTemplateHeaderProps, PageTemplateTrailProps, Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** The page content, at the page gutter. */
  children: ReactNode;
  /**
   * `scroll` (default): the body scrolls. `fill`: the body is a fixed-height flex column whose children scroll themselves.
   * `docked` (since 2.504.0): the body scrolls over a dock at the column's bottom (`DockedColumn`): `footer`, and any
   * `ColumnDock` inside the body (a section's command composer), render there, spanning the column.
   */
  body?: 'scroll' | 'fill' | 'docked';
  /** With `body="docked"`: `scroll` (default) the body scrolls over the dock; `fill` it is a fixed frame whose panes scroll (a conversation). Since 2.504.0. */
  dockedBody?: 'scroll' | 'fill';
  /** Docked under the body, full width, never scrolls (a save bar, a composer). With `body="docked"` it goes into the column's dock. */
  footer?: ReactNode;
  /** Default `page` — the `--ui-page-gutter` inset on header and body. */
  gutter?: PageGutter;
  /** The body's inset when it differs from the header's (since 2.504.0): `none` for a conversation that owns its gutters. Default: `gutter`. */
  bodyGutter?: PageGutter;
  /** Extra classes for the body region. */
  bodyClassName?: string;
}

/**
 * Use this when a page is a form, an overview or any page no other template fits: trail, title/actions, and a body at the page gutter.
 *
 * Fills its parent (`h-full min-h-0`); only the body scrolls. Given `trailControls`, `trailLink`, `collapsed` or
 * `onToggleCollapsed`, the trail is its own row (controls on its right) with the title band under it, or folded into it.
 *
 * @example
 * <PageFrame title="New connector" breadcrumbs={[{ label: 'Connectors', href: '/connectors' }, { label: 'New' }]}
 *   actions={<Button>Save</Button>}>
 *   <FormField label="Name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
 * </PageFrame>
 *
 * @example
 * // A section page: scope selector on the trail row, its command composer docked at the column's bottom.
 * <PageFrame title="Communication" breadcrumbs={trail} trailControls={<Select … />} body="docked"
 *   footer={<CollectionCommandHost inPlace … />}>
 *   <PageSection title="Channels">…</PageSection>
 * </PageFrame>
 */
export function PageFrame({
  title, description, breadcrumbs, actions, badge, back, density, titleAs,
  trailControls, trailLink, collapsed, onToggleCollapsed,
  children, body = 'scroll', dockedBody = 'scroll', footer, gutter = 'page', bodyGutter, bodyClassName, className, ...rest
}: PageFrameProps) {
  const trailRow = hasTrailRow({ trailControls, trailLink, collapsed, onToggleCollapsed });
  const inset = bodyGutter ?? gutter;
  const header = { title, description, breadcrumbs, actions, badge, back, density, titleAs, gutter };
  return (
    <div
      className={cn('flex h-full min-h-0 min-w-0 flex-col', !trailRow && 'gap-[var(--ui-section-gap,0.75rem)]', className)}
      data-page-template="page-frame"
      data-page-column=""
      data-shell-flush=""
      {...rest}
    >
      {trailRow
        ? <TrailHeader {...header} {...{ trailControls, trailLink, collapsed, onToggleCollapsed }} />
        : <TemplateHeader {...header} />}
      {body === 'docked' ? (
        <DockedColumn
          body={dockedBody}
          bodyClassName={cn('flex flex-col gap-3', inset === 'page' && cn(PAGE_GUTTER_X, PAGE_GUTTER_B), bodyClassName)}
          bodyProps={{ 'data-page-body': 'docked' }}
        >
          {children}
          {footer != null && <ColumnDock>{footer}</ColumnDock>}
        </DockedColumn>
      ) : (
        <div
          className={body === 'scroll'
            ? scrollBodyClass(inset, cn('flex flex-col gap-3', bodyClassName))
            : cn('flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden', inset === 'page' && cn(PAGE_GUTTER_X, !footer && PAGE_GUTTER_B), bodyClassName)}
          data-page-body={body}
        >
          {children}
        </div>
      )}
      {body !== 'docked' && footer != null && <div className="shrink-0 min-w-0" data-page-footer="">{footer}</div>}
    </div>
  );
}

export default PageFrame;
