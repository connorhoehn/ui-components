import { cn } from '../../../lib/cn';
import { Tabs } from '../../shared/Tabs';
import { Tooltip } from '../../shared/Tooltip';
import { IconButton } from '../../ui/IconButton';
import { CloseIcon } from '../../ui/Icons';
import type { WorkActivityHeaderProps, WorkActivityPanelView } from './types';

const VIEW_TABS = [
  { id: 'activity', label: 'Activity' },
  { id: 'lab', label: 'Computer Lab' },
] as const;

/**
 * The one header row an activity panel gets: who and what on the left, the
 * three ways out on the right. Hosts that already sit inside
 * `ChatSidePanelFrame` get the same chrome from the frame and should not
 * render this as well — it exists so a host outside that frame (a standalone
 * route, a popped-out window) has no hand-rolled markup to write.
 *
 * A host that can show a second body — the person's Computer Lab beside their
 * activity graph — wires `onViewChange` and gets a segmented switch on its own
 * row beneath the title, with a quiet clause saying what the body holds. The
 * row is a SECOND row rather than another control in the title row because it
 * chooses what the panel is, while everything on the title row chooses where
 * the panel is; mixing the two put a body switch next to the close button.
 * Without `onViewChange` nothing about this header changes.
 */
export function WorkActivityHeader({
  title, subtitle, expanded = false, onExpand, onPopOut, onClose, actions,
  view = 'activity', onViewChange, viewNote,
  className, 'data-testid': testId = 'work-activity-header',
}: WorkActivityHeaderProps) {
  const bar = (
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
  if (!onViewChange) return bar;
  return (
    <div className="flex shrink-0 flex-col">
      {bar}
      <div
        data-testid={`${testId}-views`}
        className="flex shrink-0 items-center gap-2.5 border-b border-border bg-surface px-3 py-1.5"
      >
        <Tabs
          items={VIEW_TABS as unknown as Array<{ id: string; label: string }>}
          value={view}
          onValueChange={(id) => onViewChange(id as WorkActivityPanelView)}
          variant="segmented"
          size="sm"
          aria-label="Side panel content"
          idPrefix={`${testId}-view`}
        />
        {viewNote && (
          <span className="min-w-0 truncate text-[11px] text-text-tertiary" data-testid={`${testId}-view-note`}>
            {viewNote}
          </span>
        )}
      </div>
    </div>
  );
}

export default WorkActivityHeader;
