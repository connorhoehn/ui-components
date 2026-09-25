import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import Chip from '../shared/Chip';

export interface WorkspaceRailProps {
  title?: string;
  label?: string;
  actions?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  /** `sm` 240px, `md` 300px, `lg` 368px (a two-line work list with a toolbar). */
  /** sm 240, md 300, ml 320 (the Folders explorer, 2.386.0), lg 368. */
  width?: 'sm' | 'md' | 'ml' | 'lg';
  /**
   * A count beside the title ("Work 11"). Omit for none; zero shows "0" —
   * an empty list is a fact, not a missing number.
   */
  count?: number;
  /**
   * `compact` (default) is the 36px, 12px-title strip a tree rail wears;
   * `prominent` is the column heading a work list wears — an 18px title and
   * count on a 56px row, no rule under it. `label` is the same 56px row with
   * the title as a 15px uppercase label — "DOCUMENTS 137", the All documents
   * mockup (since 2.389.2).
   */
  heading?: 'compact' | 'prominent' | 'label';
  collapsed?: boolean;
  collapsedContent?: ReactNode;
  onToggle?: () => void;
  toggleLabel?: string;
  toggleTestId?: string;
  className?: string;
  'data-testid'?: string;
}

/** Shared document/chat rail: fixed header and footer, one scrollable body. */
export function WorkspaceRail({
  title, label, actions, header, footer, children,
  width = 'md', count, heading = 'compact', collapsed = false, collapsedContent,
  onToggle, toggleLabel, toggleTestId, className,
  'data-testid': testId = 'workspace-rail',
}: WorkspaceRailProps) {
  const toggleName = toggleLabel ?? `${collapsed ? 'Show' : 'Hide'} ${label ?? title ?? 'the list'}`;
  return (
    <nav aria-label={label ?? title ?? 'Workspace'} data-testid={testId} data-collapsed={collapsed}
      className={cn('flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel', collapsed ? 'w-9' : width === 'sm' ? 'w-[240px]' : width === 'lg' ? 'w-[368px]' : width === 'ml' ? 'w-[320px]' : 'w-[300px]', className)}>
      {(title || actions || onToggle) && (
        <div className={cn('flex shrink-0 items-center gap-1', heading !== 'compact' ? 'h-14' : 'h-9 border-b border-border', collapsed ? 'justify-center' : heading !== 'compact' ? 'pl-5 pr-3' : 'pl-3.5 pr-1.5')} data-testid={`${testId}-header`}>
          {!collapsed && (title ? (
            <h2 className={cn('m-0 flex min-w-0 flex-1 items-center gap-2 text-text-primary', heading === 'prominent' ? 'text-[18px] font-semibold' : heading === 'label' ? 'text-[15px] font-semibold uppercase tracking-[0.02em]' : 'text-[12px] font-semibold')} data-testid={`${testId}-title`}>
              <span className="min-w-0 truncate">{title}</span>
              {typeof count === 'number' && (
                <Chip size={heading === 'prominent' ? 'md' : heading === 'label' ? 'sm' : 'xs'} tone="neutral" className="shrink-0" aria-label={`${count} items`} data-testid={`${testId}-count`}>{count}</Chip>
              )}
            </h2>
          ) : <span className="flex-1" />)}
          {!collapsed && actions}
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
