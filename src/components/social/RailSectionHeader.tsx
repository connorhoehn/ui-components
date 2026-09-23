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
//
// The heading is also where a section FOLDS. A rail that cannot hide Channels
// is a rail whose Direct messages are permanently below the fold once a person
// joins a dozen rooms, and the fix people reach for instead — leaving rooms
// they still want — is not reversible. The whole label is the hit target, not
// just the chevron, because a 12px glyph is a control most people never find.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ChevronIcon, PlusIcon } from '../ui/Icons';

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
   *
   * Ignored once the header is a disclosure: the label is then the control's
   * own name, and a control that is `aria-hidden` cannot be reached or
   * announced at all. See `toggleId` for how the name stays said once.
   */
  presentational?: boolean;
  /**
   * Given together with `onToggleCollapse`, the whole label becomes the
   * disclosure control — a target the width of the heading, the way Teams and
   * Slack fold their rail sections, rather than a 12px chevron people miss.
   *
   * Controlled on purpose. Collapsing a section is a preference, not a
   * transient: the host owns the state so it can persist it and have the rail
   * come back the way it was left.
   */
  collapsed?: boolean;
  /** Fires with the state the host should switch to. */
  onToggleCollapse?: (next: boolean) => void;
  /** Id of the region this header folds away, for `aria-controls`. */
  controls?: string;
  /**
   * Put on the disclosure button itself, so the region it controls can point
   * an `aria-labelledby` back at it instead of repeating the same word in its
   * own `aria-label`. That is what keeps the name said once now that
   * `presentational` can no longer hide the heading.
   */
  toggleId?: string;
  /**
   * Unread hiding under a collapsed section — rendered only while collapsed.
   *
   * Collapsing is only safe to reach for if the rail still tells you when
   * something arrived in what you folded away; without it, hiding a section is
   * the same as muting it by accident.
   */
  collapsedCount?: number;
  /** Light-on-dark, for a rail sitting on call chrome. */
  dark?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function RailSectionHeader({
  label,
  actions = [],
  presentational = true,
  collapsed = false,
  onToggleCollapse,
  controls,
  toggleId,
  collapsedCount = 0,
  dark = false,
  className,
  'data-testid': testId = 'rail-section-header',
}: RailSectionHeaderProps) {
  // A `collapsed` with no handler would be a section nothing can reopen, so
  // the handler alone decides whether this heading is a control.
  const isDisclosure = onToggleCollapse !== undefined;
  const labelClass = cn(
    'min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-wide',
    dark ? 'text-white/40' : 'text-text-tertiary',
  );

  return (
    <div
      data-testid={testId}
      className={cn('flex items-center gap-1 px-2 pb-1 pt-3', className)}
    >
      {isDisclosure ? (
        <button
          type="button"
          id={toggleId}
          aria-expanded={!collapsed}
          aria-controls={controls}
          onClick={() => onToggleCollapse(!collapsed)}
          data-testid={`${testId}-toggle`}
          className={cn(
            'flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded border-none bg-transparent p-0 text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            dark ? 'hover:text-white' : 'hover:text-text-primary',
          )}
        >
          <ChevronIcon
            dir={collapsed ? 'right' : 'down'}
            size={12}
            // Same tone as the label it sits beside — left to inherit, it
            // would take the document's default ink and read as darker than
            // the heading it belongs to.
            className={cn('shrink-0', dark ? 'text-white/40' : 'text-text-tertiary')}
          />
          <span className={labelClass}>{label}</span>
          {collapsed && collapsedCount > 0 && (
            <>
              {/* A real space. Accessible-name computation concatenates
                  element children with nothing between them, so without it
                  the button announces as "Channels7 unread"; flex drops a
                  whitespace-only node, so nothing moves on screen. */}
              {' '}
              <span
                // Carries the count into the button's accessible name, so the
                // fact that something is waiting survives being folded away.
                aria-label={`${collapsedCount} unread`}
                data-testid={`${testId}-collapsed-count`}
                className={cn(
                  'grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none',
                  dark ? 'bg-white/15 text-white' : 'bg-primary text-on-primary',
                )}
              >
                {collapsedCount > 99 ? '99+' : collapsedCount}
              </span>
            </>
          )}
        </button>
      ) : (
        <span aria-hidden={presentational || undefined} className={labelClass}>
          {label}
        </span>
      )}
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          title={action.label}
          aria-label={action.label}
          onClick={(e) => {
            // Creating into a section you cannot see leaves the new thing
            // nowhere: the row appears inside the folded part and the click
            // reads as having done nothing. So + reopens first, then acts.
            // It only ever opens — pressing + on an open section is not a
            // toggle, because nobody reaches for "new channel" meaning "hide
            // the channels".
            if (collapsed) onToggleCollapse?.(false);
            action.onClick(e.currentTarget);
          }}
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
