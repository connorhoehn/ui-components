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
import { PAGE_GUTTER_B, PAGE_GUTTER_X, TemplateHeader, scrollBodyClass, type PageGutter, type PageTemplateHeaderProps } from './pageTemplate';

export interface PageFrameProps extends PageTemplateHeaderProps, Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** The page content, at the page gutter. */
  children: ReactNode;
  /** `scroll` (default): the body scrolls. `fill`: the body is a fixed-height flex column whose children scroll themselves. */
  body?: 'scroll' | 'fill';
  /** Docked under the body, full width, never scrolls (a save bar, a composer). */
  footer?: ReactNode;
  /** Default `page` — the `--ui-page-gutter` inset on header and body. */
  gutter?: PageGutter;
  /** Extra classes for the body region. */
  bodyClassName?: string;
}

/**
 * Use this when a page is a form, an overview or any page no other template fits: trail, title/actions, and a body at the page gutter.
 *
 * Fills its parent (`h-full min-h-0`); only the body scrolls.
 *
 * @example
 * <PageFrame title="New connector" breadcrumbs={[{ label: 'Connectors', href: '/connectors' }, { label: 'New' }]}
 *   actions={<Button>Save</Button>}>
 *   <FormField label="Name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
 * </PageFrame>
 */
export function PageFrame({
  title, description, breadcrumbs, actions, badge, back, density,
  children, body = 'scroll', footer, gutter = 'page', bodyClassName, className, ...rest
}: PageFrameProps) {
  return (
    <div
      className={cn('flex h-full min-h-0 min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]', className)}
      data-page-template="page-frame"
      data-shell-flush=""
      {...rest}
    >
      <TemplateHeader {...{ title, description, breadcrumbs, actions, badge, back, density, gutter }} />
      <div
        className={body === 'scroll'
          ? scrollBodyClass(gutter, cn('flex flex-col gap-3', bodyClassName))
          : cn('flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden', gutter === 'page' && cn(PAGE_GUTTER_X, !footer && PAGE_GUTTER_B), bodyClassName)}
        data-page-body={body}
      >
        {children}
      </div>
      {footer != null && <div className="shrink-0 min-w-0" data-page-footer="">{footer}</div>}
    </div>
  );
}

export default PageFrame;
