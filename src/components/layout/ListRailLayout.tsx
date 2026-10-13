// ListRailLayout (2.438.0) — a page whose list is a flush rail beside the
// section rail, then the content column: the pane header (the trail, the
// title), the record, an optional aside and a docked footer.
//
// Upstreamed from two consumer copies of the same `ExplorerLayout`
// configuration (an initiatives explorer and a section-list layout): the
// 264px rail with a caption title and a count chip, its search/filter header,
// its scrolling rows and footer, no pane padding, the aside beside the pane.
// The rail is described by ONE value, `ListRail` — the list rail's half of
// the rail model — so a hook that reads a list can hand its rail over whole.
//
// The rail never floats: no border radius, no gutter box of its own; it is
// flush against whatever is on its left from the content top to the bottom.
import type { ReactNode } from 'react';
import { ExplorerLayout, type ExplorerLayoutProps } from './ExplorerLayout';
import type { WorkspaceRailBack } from './WorkspaceRail';

/** A list rail, as data: what `ListRailLayout` (and an `ExplorerLayout`) draws in its rail. */
export interface ListRail {
  /**
   * Caption title in the rail's head row ("All initiatives", "Pending"). Optional
   * since 2.442.4: a rail whose group headings already name and count its rows
   * omits it, so one rail carries one heading size.
   */
  title?: string;
  /**
   * The count after the title — the rows the host holds. Omit when unknown
   * or capped (a full page has no honest total; say "100+" in the footer).
   */
  count?: number;
  /** Head-row controls (a ⋯ sort/filter menu). */
  actions?: ReactNode;
  /** Under the head row: search, a filter popover, view links. */
  header?: ReactNode;
  /** The scrolling rows (a `GroupedList`, or the loading/empty/error state). */
  body: ReactNode;
  /** The fixed footer: "7 pending", "14 initiatives". */
  footer?: ReactNode;
  /** What the rail holds, for its accessible names ("initiatives"). */
  label: string;
  /** A parent link over the title ("‹ Initiatives"). */
  back?: WorkspaceRailBack | null;
}

export interface ListRailLayoutProps {
  list: ListRail;
  /** The band over the pane: the trail and the title (the content column's first rows). */
  header?: ReactNode;
  /** The record. It scrolls; the header and footer do not. */
  children: ReactNode;
  /** Right of the record (a `ContextColumn`), always beside it. */
  aside?: ReactNode;
  /** Docked under the record — a composer. */
  footer?: ReactNode;
  /**
   * The reader's fold of the list (`useRailFold`). Given, the rail gets a «
   * control and folds to a strip with one » control.
   */
  fold?: { folded: boolean; onToggle: () => void };
  /** Rail width; default `ms` (264px, one-line rows). `md` for a two-line work list. */
  railWidth?: ExplorerLayoutProps['railWidth'];
  /** How the count reads; default `chip`. */
  countStyle?: ExplorerLayoutProps['railCountStyle'];
  className?: string;
  'data-testid'?: string;
}

export function ListRailLayout({
  list, header, children, aside, footer, fold, railWidth = 'ms', countStyle = 'chip', className, 'data-testid': testId,
}: ListRailLayoutProps) {
  return (
    // `data-list-rail` names the composite for layout checks (a page's list rail, not a third navigation column).
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col" data-list-rail="">
    <ExplorerLayout
      className={className ?? 'min-h-0 min-w-0 flex-1'}
      railWidth={railWidth}
      railHeading="caption"
      railCountStyle={countStyle}
      railTitle={list.title}
      {...(list.count != null ? { railCount: list.count } : {})}
      {...(list.back ? { railBack: list.back } : {})}
      railActions={list.actions}
      railHeader={list.header}
      railFooter={list.footer}
      railLabel={list.label}
      rail={list.body}
      {...(fold ? { railCollapsed: fold.folded, onToggleRail: fold.onToggle } : {})}
      panePadding="none"
      asidePlacement="beside"
      aside={aside}
      {...(header != null ? { paneHeader: header } : {})}
      {...(footer != null ? { paneFooter: footer } : {})}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      {children}
    </ExplorerLayout>
    </div>
  );
}

export default ListRailLayout;
