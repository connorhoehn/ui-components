import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import Chip from '../shared/Chip';
import { useReportRailHeader } from '../shared/SubNavLayout';
import { RAIL_CAPTION, RAIL_GROUP_COUNT, RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK } from '../shared/railType';

export interface WorkspaceRailBack {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface WorkspaceRailProps {
  title?: string;
  label?: string;
  actions?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  /**
   * xs 220 (the Org rail's width — SubNavLayout's default — for a documents
   * rail beside it, since 2.407.33), sm 240, ms 264 (a one-line title list — the Initiatives v2 rail, since
   * 2.392.0), md 300, ml 320 (the Folders explorer, 2.386.0), lg 368 (a
   * two-line work list with a toolbar).
   */
  width?: 'xs' | 'sm' | 'ms' | 'md' | 'ml' | 'lg';
  /**
   * A count beside the title ("Work 11"). Omit for none; zero shows "0" —
   * an empty list is a fact, not a missing number.
   */
  count?: number;
  /**
   * `compact` (default) is the 36px, 12px-title strip a tree rail wears;
   * `prominent` is the column heading a work list wears — an 18px title and
   * count on a 56px row, no rule under it. `label` is the same 56px row with
   * the title as the rail group label — "DOCUMENTS 137", the All documents
   * mockup (since 2.389.2). Since 2.407.13 it draws the shared rail scale
   * (`RAIL_GROUP_LABEL`, 11px semibold caps, with its plain 11px
   * `RAIL_GROUP_COUNT`), so the rail matches the Workspace `NavRail` beside it
   * ("WORKSPACE"); it was a 15px label with a count chip. `caption` (since
   * 2.392.0) is the same row with a 12px letter-spaced uppercase label —
   * "INITIATIVES 11", the Initiatives v2 rail.
   */
  heading?: 'compact' | 'prominent' | 'label' | 'caption';
  /**
   * How `count` reads. `chip` (default): a neutral count chip. `plain`: muted
   * text after the title — "Initiatives 11". Since 2.390.0. A `label` heading
   * always draws its count plain (`RAIL_GROUP_COUNT`) — a rail group heading's
   * count is never a pill (railType).
   */
  countStyle?: 'chip' | 'plain';
  /**
   * A back link on its own row ABOVE the title — "‹ Initiatives" over "Work
   * 11", when the rail has drilled into one thing. `href` renders a link,
   * otherwise a button calling `onClick`. Since 2.390.0.
   */
  back?: WorkspaceRailBack | null;
  collapsed?: boolean;
  collapsedContent?: ReactNode;
  onToggle?: () => void;
  toggleLabel?: string;
  toggleTestId?: string;
  className?: string;
  'data-testid'?: string;
}

const BACK_CLASS = cn(
  'inline-flex items-center gap-1 rounded border-0 bg-transparent p-0 text-[13px] font-medium text-primary no-underline',
  'cursor-pointer hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
);

/** Shared document/chat rail: fixed header and footer, one scrollable body. */
export function WorkspaceRail({
  title, label, actions, header, footer, children,
  width = 'md', count, heading = 'compact', countStyle = 'chip', back, collapsed = false, collapsedContent,
  onToggle, toggleLabel, toggleTestId, className,
  'data-testid': testId = 'workspace-rail',
}: WorkspaceRailProps) {
  const plainCount = countStyle === 'plain' || heading === 'label';
  const hasHeader = !!(title || actions || onToggle);
  // A folded shell strip beside this rail aligns its header row with ours (SubNavLayout `collapsed`).
  useReportRailHeader(hasHeader && heading === 'compact');
  const toggleName = toggleLabel ?? `${collapsed ? 'Show' : 'Hide'} ${label ?? title ?? 'the list'}`;
  return (
    <nav aria-label={label ?? title ?? 'Workspace'} data-testid={testId} data-collapsed={collapsed}
      className={cn('flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel', collapsed ? 'w-9' : width === 'xs' ? 'w-[220px]' : width === 'sm' ? 'w-[240px]' : width === 'ms' ? 'w-[264px]' : width === 'lg' ? 'w-[368px]' : width === 'ml' ? 'w-[320px]' : 'w-[300px]', className)}>
      {back && !collapsed && (
        <div className={cn('flex shrink-0 items-center pt-4', heading !== 'compact' ? 'px-5' : 'px-3.5')} data-testid={`${testId}-back-row`}>
          {back.href ? (
            <a href={back.href} onClick={back.onClick} className={BACK_CLASS} data-testid={`${testId}-back`}>
              <ChevronIcon dir="left" size={14} />
              {back.label}
            </a>
          ) : (
            <button data-ui-part="" type="button" onClick={back.onClick} className={BACK_CLASS} data-testid={`${testId}-back`}>
              <ChevronIcon dir="left" size={14} />
              {back.label}
            </button>
          )}
        </div>
      )}
      {hasHeader && (
        <div className={cn('flex shrink-0 items-center gap-1', heading !== 'compact' ? 'h-14' : 'h-9 border-b border-border', collapsed ? 'justify-center' : heading !== 'compact' ? 'pl-5 pr-3' : 'pl-3.5 pr-1.5')} data-testid={`${testId}-header`}>
          {!collapsed && (title ? (
            <h2 className={cn('m-0 flex min-w-0 flex-1 items-center gap-2 text-text-primary', heading === 'prominent' ? 'text-[18px] font-semibold' : heading === 'label' ? cn(RAIL_GROUP_LABEL, RAIL_GROUP_LABEL_INK) : heading === 'caption' ? RAIL_CAPTION : 'text-[12px] font-semibold')} data-testid={`${testId}-title`}>
              <span className="min-w-0 truncate">{title}</span>
              {typeof count === 'number' && plainCount && (
                <span className={cn('shrink-0', heading === 'label' ? RAIL_GROUP_COUNT : 'text-xs font-medium text-text-secondary')} aria-label={`${count} items`} data-testid={`${testId}-count`} data-count-style="plain">{count}</span>
              )}
              {typeof count === 'number' && !plainCount && (
                <Chip size={heading === 'prominent' ? 'md' : heading === 'caption' ? 'sm' : 'xs'} tone="neutral" className="shrink-0" aria-label={`${count} items`} data-testid={`${testId}-count`}>{count}</Chip>
              )}
            </h2>
          ) : <span className="flex-1" />)}
          {/* Actions keep their own width: a full-width control (the Work
              rail's initiative Select) otherwise took the whole row and
              squeezed the title to nothing. */}
          {!collapsed && actions != null && <div className="flex shrink-0 items-center gap-1" data-testid={`${testId}-actions`}>{actions}</div>}
          {onToggle && (
            <IconButton
              size="sm" variant="ghost"
              aria-label={toggleName} title={toggleName}
              aria-expanded={!collapsed} onClick={onToggle}
              icon={<ChevronIcon dir={collapsed ? 'right' : 'left'} size={14} />}
              data-testid={toggleTestId ?? `${testId}-${collapsed ? 'unfold' : 'fold'}`}
            />
          )}
        </div>
      )}
      {!collapsed && header && <div className={cn('shrink-0 py-3', heading !== 'compact' ? 'px-5 pt-0' : 'px-3.5')}>{header}</div>}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden" data-testid={`${testId}-scroll`}>
        {collapsed ? collapsedContent : children}
      </div>
      {!collapsed && footer && <div className="shrink-0 border-t border-border px-3.5 py-2">{footer}</div>}
    </nav>
  );
}
