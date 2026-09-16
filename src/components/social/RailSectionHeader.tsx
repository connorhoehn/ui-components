// RailSectionHeader — the one heading row every section of the left rail
// uses: Teams, Channels, Direct messages, Active now.
//
// It exists because the alternative kept drifting. Each section grew its own
// heading inline — one at `px-2 pt-3`, one at `px-3 pt-2`, one with its
// "create" affordance parked in a footer button instead of on the heading —
// and a rail whose four headings sit at three different insets reads as a
// broken layout even when every individual section is fine.
//
// The trailing actions are part of the pattern, not an extra. Teams and Slack
// both put "new channel" ON the section that would hold it: the + is where
// you are already looking when you notice the thing you want is missing.
//
// `onClick` hands back the button element so the host can hang an anchored
// popover off it — a create form belongs beside the + that opened it, not in
// the middle of the screen.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { PlusIcon } from '../ui/Icons';

export interface RailSectionAction {
  /** The accessible name and the tooltip — "Create a channel", not "+". */
  label: string;
  /** Defaults to a plus. */
  icon?: ReactNode;
  /** Receives the button itself, so an anchored popover can point at it. */
  onClick: (trigger: HTMLElement) => void;
  'data-testid'?: string;
}

export interface RailSectionHeaderProps {
  label: string;
  /** Right-aligned, in order. Usually one +. */
  actions?: readonly RailSectionAction[];
  /**
   * The heading names the list that follows, and that list already carries
   * the same name — announcing both is the label twice. Sections whose list
   * is NOT separately named should pass false.
   */
  presentational?: boolean;
  /** Light-on-dark, for a rail sitting on call chrome. */
  dark?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function RailSectionHeader({
  label,
  actions = [],
  presentational = true,
  dark = false,
  className,
  'data-testid': testId = 'rail-section-header',
}: RailSectionHeaderProps) {
  return (
    <div
      data-testid={testId}
      className={cn('flex items-center gap-1 px-2 pb-1 pt-3', className)}
    >
      <span
        aria-hidden={presentational || undefined}
        className={cn(
          'min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-wide',
          dark ? 'text-white/40' : 'text-text-tertiary',
        )}
      >
        {label}
      </span>
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          title={action.label}
          aria-label={action.label}
          onClick={(e) => action.onClick(e.currentTarget)}
          data-testid={action['data-testid']}
          className={cn(
            'grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            dark
              ? 'text-white/50 hover:bg-white/10 hover:text-white'
              : 'text-text-tertiary hover:bg-surface-hover hover:text-text-primary',
          )}
        >
          {action.icon ?? <PlusIcon size={13} />}
        </button>
      ))}
    </div>
  );
}

export default RailSectionHeader;
