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
  /** Extra classes for the body region (with `column="centered"`: the centred column inside it). */
  bodyClassName?: string;
  /**
   * `full` (default, unchanged): header and body span the column.
   * `centered` (since 2.537.0): a guest or step page's single centred column —
   * the header, the body's content and the footer sit in one column of
   * `columnWidth`, centred, with the page gutter inside it, so the title lines
   * up with the content. The body still scrolls at the full width (its
   * scrollbar at the window's edge). `data-page-column-width` on the root.
   * Replaces a hand-written `mx-auto max-w-4xl` wrapper.
   */
  column?: PageFrameColumn;
  /** With `column="centered"`: the column's maximum width. Default `4xl` (56rem). Since NEXT. */
  columnWidth?: PageFrameColumnWidth;
}

/** `PageFrame column` (since 2.537.0). */
export type PageFrameColumn = 'full' | 'centered';
/** `PageFrame columnWidth` (since 2.537.0): Tailwind's max-width steps. */
export type PageFrameColumnWidth = 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

// Written out whole so Tailwind's scanner sees each class.
const COLUMN_WIDTH: Record<PageFrameColumnWidth, string> = {
  xl: 'max-w-xl', '2xl': 'max-w-2xl', '3xl': 'max-w-3xl', '4xl': 'max-w-4xl', '5xl': 'max-w-5xl', '6xl': 'max-w-6xl', '7xl': 'max-w-7xl',
};

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
  children, body = 'scroll', dockedBody = 'scroll', footer, gutter = 'page', bodyGutter, bodyClassName,
  column = 'full', columnWidth = '4xl', className, ...rest
}: PageFrameProps) {
  const trailRow = hasTrailRow({ trailControls, trailLink, collapsed, onToggleCollapsed });
  const inset = bodyGutter ?? gutter;
  const centered = column === 'centered';
  // The one centred column: header boxes and the body's inner box share it,
  // each with the gutter inside, so their content edges line up.
  const centre = centered ? cn('mx-auto w-full', COLUMN_WIDTH[columnWidth] ?? COLUMN_WIDTH['4xl']) : undefined;
  const header = { title, description, breadcrumbs, actions, badge, back, density, titleAs, gutter, ...(centre ? { frameClassName: centre } : {}) };
  const content = (fill: boolean) => (
    <div className={cn(centre, 'flex flex-col gap-3', fill && 'min-h-0 flex-1', inset === 'page' && PAGE_GUTTER_X, inset === 'page' && (!fill || footer == null) && PAGE_GUTTER_B, bodyClassName)} data-page-column-content="">
      {children}
    </div>
  );
  return (
    <div
      className={cn('flex h-full min-h-0 min-w-0 flex-col', !trailRow && 'gap-[var(--ui-section-gap,0.75rem)]', className)}
      data-page-template="page-frame"
      data-page-column=""
      data-shell-flush=""
      {...(centered ? { 'data-page-column-width': columnWidth } : {})}
      {...rest}
    >
      {trailRow
        ? <TrailHeader {...header} {...{ trailControls, trailLink, collapsed, onToggleCollapsed }} />
        : <TemplateHeader {...header} />}
      {body === 'docked' ? (
        <DockedColumn
          body={dockedBody}
          bodyClassName={centered ? 'flex flex-col' : cn('flex flex-col gap-3', inset === 'page' && cn(PAGE_GUTTER_X, PAGE_GUTTER_B), bodyClassName)}
          bodyProps={{ 'data-page-body': 'docked' }}
        >
          {centered ? content(dockedBody === 'fill') : children}
          {footer != null && <ColumnDock>{centered ? <div className={centre}>{footer}</div> : footer}</ColumnDock>}
        </DockedColumn>
      ) : centered ? (
        <div
          className={body === 'scroll' ? scrollBodyClass('none', 'flex flex-col') : 'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'}
          data-page-body={body}
        >
          {content(body === 'fill')}
        </div>
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
      {body !== 'docked' && footer != null && <div className="shrink-0 min-w-0" data-page-footer="">{centre ? <div className={centre}>{footer}</div> : footer}</div>}
    </div>
  );
}

export default PageFrame;
