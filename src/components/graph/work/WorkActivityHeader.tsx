import { cn } from '../../../lib/cn';
import { Tooltip } from '../../shared/Tooltip';
import { IconButton } from '../../ui/IconButton';
import { CloseIcon } from '../../ui/Icons';
import type { WorkActivityHeaderProps } from './types';

/**
 * The one header row an activity panel gets: who and what on the left, the
 * three ways out on the right. Hosts that already sit inside
 * `ChatSidePanelFrame` get the same chrome from the frame and should not
 * render this as well — it exists so a host outside that frame (a standalone
 * route, a popped-out window) has no hand-rolled markup to write.
 */
export function WorkActivityHeader({
  title, subtitle, expanded = false, onExpand, onPopOut, onClose, actions, className, 'data-testid': testId = 'work-activity-header',
}: WorkActivityHeaderProps) {
  return (
    <header data-testid={testId} className={cn('flex shrink-0 items-center justify-between gap-2 border-b border-border bg-surface px-3 py-1.5', className)}>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[12px] font-semibold text-text-secondary" data-testid={`${testId}-title`}>{title}</span>
        {subtitle && <span className="truncate text-[11px] text-text-tertiary" data-testid={`${testId}-subtitle`}>{subtitle}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-1">
        {actions}
        {onExpand && (
          <Tooltip content={expanded ? 'Show chat' : 'Expand activity'} placement="bottom">
            <IconButton size="md" aria-label={expanded ? 'Show chat' : 'Expand activity'} aria-pressed={expanded} onClick={onExpand} data-testid={`${testId}-expand`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {expanded ? <><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M6 2.5v11" /></> : <path d="M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" />}
              </svg>
            </IconButton>
          </Tooltip>
        )}
        {onPopOut && (
          <Tooltip content="Open activity in its own page" placement="bottom">
            <IconButton size="md" aria-label="Open activity in its own page" onClick={onPopOut} data-testid={`${testId}-pop-out`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" />
              </svg>
            </IconButton>
          </Tooltip>
        )}
        {onClose && (
          <Tooltip content="Close activity" placement="bottom">
            <IconButton size="md" aria-label="Close activity" onClick={onClose} data-testid={`${testId}-close`}><CloseIcon /></IconButton>
          </Tooltip>
        )}
      </span>
    </header>
  );
}

export default WorkActivityHeader;
