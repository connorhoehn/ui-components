// DockedColumn + ColumnDock — one composer per column, docked at its bottom.
//
// The house rule (aws-agentcore docs/layout-cascade.md): a page's ONE
// command/conversation composer is docked at the bottom of the content column
// and nothing is laid out below it. A page whose table is one section among
// several used to mount its command composer as that section's last row, so
// the composer sat mid-page on its own inset band with the page's trailing
// links and disclosures after it, then blank space down to the footer.
//
// `DockedColumn` is that column: a scrolling body and, under it, a dock slot
// that does not scroll. `ColumnDock` renders its children into the nearest
// DockedColumn's slot through a portal, so a section deep in the body keeps
// owning (and driving) its composer while the composer lands at the column's
// bottom, spanning it edge to edge. Context still flows through the portal.
//
// Without a DockedColumn ancestor, ColumnDock renders its children in place,
// so a component that docks itself (a collection command host) still works in
// a host that has no dock. Since 2.448.0.

import { createContext, useContext, useState, type HTMLAttributes, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

/** `undefined`: no DockedColumn above; `null`: the slot has not mounted yet. */
const ColumnDockContext = createContext<HTMLElement | null | undefined>(undefined);

export interface DockedColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  /** Classes for the scrolling body (its gutter and padding live here, never on the dock). */
  bodyClassName?: string;
  /** `scroll` (default): the body scrolls above the dock. `fill`: the body is a fixed frame whose panes scroll on their own. */
  body?: 'scroll' | 'fill';
  /** Attributes for the scrolling body (a test id, a semantic marker such as `data-section-body`). */
  bodyProps?: HTMLAttributes<HTMLDivElement> & { [marker: `data-${string}`]: string | undefined };
}

export function DockedColumn({ children, className, bodyClassName, body = 'scroll', bodyProps, ...rest }: DockedColumnProps) {
  const [slot, setSlot] = useState<HTMLDivElement | null>(null);
  return (
    <div className={cn('flex min-h-0 min-w-0 flex-1 flex-col', className)} data-docked-column="" {...rest}>
      <div
        {...bodyProps}
        className={cn('min-h-0 min-w-0 flex-1', body === 'scroll' ? 'overflow-auto' : 'flex flex-col overflow-hidden', bodyClassName, bodyProps?.className)}
        data-docked-column-body=""
      >
        <ColumnDockContext.Provider value={slot}>{children}</ColumnDockContext.Provider>
      </div>
      {/* Empty until a ColumnDock renders into it; `empty:hidden` keeps an unused dock out of the layout. */}
      <div ref={setSlot} className="flex min-w-0 shrink-0 flex-col empty:hidden" data-column-dock="" />
    </div>
  );
}

export interface ColumnDockProps {
  children: ReactNode;
}

/** Render `children` in the nearest DockedColumn's dock (in place when there is none). */
export function ColumnDock({ children }: ColumnDockProps) {
  const slot = useContext(ColumnDockContext);
  if (slot === undefined) return <>{children}</>;
  if (slot === null) return null;
  return createPortal(children, slot);
}

/** Whether a DockedColumn is above this component (its ColumnDock will dock rather than render in place). */
export function useInDockedColumn(): boolean {
  return useContext(ColumnDockContext) !== undefined;
}
