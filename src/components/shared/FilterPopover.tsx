// FilterPopover — a "Filter" button that opens a panel of the caller's filter
// controls, and says how many are active.
//
// A toolbar that shows every filter chip inline grows a second row the moment
// there are two groups of them (status, health, trigger…). This folds them
// into one button with a count badge: the toolbar stays one line, and the
// count says "something is narrowing this list" without opening anything.
//
// The body is the caller's — normally a few `FilterChip` groups under
// `SectionLabel`s — so the popover knows nothing about what a filter is. It
// owns the button, the badge, the panel (an `InlineMenu`: outside-click and
// Escape dismiss, top-layer aware) and an optional "Clear" row.

import { useId, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button, type ButtonSize } from '../ui/Button';
import { InlineMenu, type InlineMenuPlacement } from './InlineMenu';
import Chip from './Chip';

export interface FilterPopoverProps {
  /** The filter controls. */
  children: ReactNode;
  /** Button text. Default "Filter". */
  label?: string;
  /** How many filters are narrowing the list; `> 0` shows the badge. */
  activeCount?: number;
  /** Renders a "Clear filters" row at the foot of the panel. */
  onClear?: () => void;
  /** Default "Clear filters". */
  clearLabel?: string;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: InlineMenuPlacement;
  size?: ButtonSize;
  /** Accessible name of the panel. Default "Filters". */
  panelLabel?: string;
  className?: string;
  panelClassName?: string;
  'data-testid'?: string;
}

function FunnelIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h12l-4.5 5.5V13l-3-1.5V8.5L2 3Z" />
    </svg>
  );
}

export function FilterPopover({
  children,
  label = 'Filter',
  activeCount = 0,
  onClear,
  clearLabel = 'Clear filters',
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom-start',
  size = 'md',
  panelLabel = 'Filters',
  className,
  panelClassName,
  'data-testid': testId = 'filter-popover',
}: FilterPopoverProps) {
  const [ownOpen, setOwnOpen] = useState(false);
  const open = controlledOpen ?? ownOpen;
  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setOwnOpen(next);
    onOpenChange?.(next);
  };
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelId = useId();
  const active = activeCount > 0;

  return (
    <span className={cn('relative inline-flex shrink-0', className)} data-testid={`${testId}-root`}>
      <Button
        ref={triggerRef}
        type="button"
        variant="secondary"
        size={size}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        data-testid={`${testId}-trigger`}
        data-active={active || undefined}
        onClick={() => setOpen(!open)}
        className={cn('inline-flex items-center gap-2 whitespace-nowrap', active && 'border-primary-border text-primary-fg')}
      >
        <FunnelIcon />
        <span>{label}</span>
        {active && (
          <Chip size="xs" tone="accent" solid data-testid={`${testId}-count`} aria-label={`${activeCount} active filters`}>
            {activeCount}
          </Chip>
        )}
      </Button>
      <InlineMenu
        open={open}
        onClose={() => setOpen(false)}
        trigger={triggerRef}
        placement={placement}
        role="dialog"
        aria-label={panelLabel}
        data-testid={testId}
        className={cn('min-w-[280px] max-w-[420px] p-3', panelClassName)}
      >
        <div id={panelId} className="flex flex-col gap-3">
          {children}
          {onClear && (
            <div className="flex justify-end border-t border-border pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!active}
                data-testid={`${testId}-clear`}
                onClick={() => {
                  onClear();
                }}
              >
                {clearLabel}
              </Button>
            </div>
          )}
        </div>
      </InlineMenu>
    </span>
  );
}

export default FilterPopover;
