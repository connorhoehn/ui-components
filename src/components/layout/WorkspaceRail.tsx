import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';

export interface WorkspaceRailProps {
  title?: string;
  label?: string;
  actions?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  width?: 'sm' | 'md';
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
  width = 'md', collapsed = false, collapsedContent,
  onToggle, toggleLabel, toggleTestId, className,
  'data-testid': testId = 'workspace-rail',
}: WorkspaceRailProps) {
  const toggleName = toggleLabel ?? `${collapsed ? 'Show' : 'Hide'} ${label ?? title ?? 'the list'}`;
  return (
    <nav aria-label={label ?? title ?? 'Workspace'} data-testid={testId} data-collapsed={collapsed}
      className={cn('flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-surface-panel', collapsed ? 'w-9' : width === 'sm' ? 'w-[240px]' : 'w-[300px]', className)}>
      {(title || actions || onToggle) && (
        <div className={cn('flex h-9 shrink-0 items-center gap-1 border-b border-border', collapsed ? 'justify-center' : 'pl-3.5 pr-1.5')} data-testid={`${testId}-header`}>
          {!collapsed && (title ? <h2 className="m-0 min-w-0 flex-1 truncate text-[12px] font-semibold text-text-primary" data-testid={`${testId}-title`}>{title}</h2> : <span className="flex-1" />)}
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
      {!collapsed && header && <div className="shrink-0 px-3.5 py-3">{header}</div>}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden" data-testid={`${testId}-scroll`}>
        {collapsed ? collapsedContent : children}
      </div>
      {!collapsed && footer && <div className="shrink-0 border-t border-border px-3.5 py-2">{footer}</div>}
    </nav>
  );
}
