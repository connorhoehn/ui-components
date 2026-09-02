// PersonHoverCard — the Outlook/Teams "people card": hover a name, get the
// person.
//
// ## Why hover needs its own timing rules
//
// A hover card that opens instantly is a card that opens every time the pointer
// crosses a name on its way somewhere else. A hover card that closes instantly
// is one you cannot reach: the gap between the name and the panel is enough to
// dismiss it mid-travel, so any button inside is unclickable.
//
// Both delays therefore exist and are NOT the same value:
//
//   openDelay  — long enough that passing over a name does nothing (~450ms).
//   closeDelay — long enough to cross the gap into the panel (~250ms), and the
//                panel itself cancels the pending close while the pointer is
//                inside it. Without that second half the card is decorative:
//                you can see "Message" but never click it.
//
// ## Focus opens it too
//
// The trigger is focusable and Enter/Space toggles it, so the card is reachable
// without a pointer. A card that only exists on hover is invisible to keyboard
// and touch users, which for a control carrying someone's contact actions is
// not an acceptable place to leave them.

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as KeyboardEvent_,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from './Avatar';
import { PresenceDot } from './PresenceDot';
import InlinePopover from './InlinePopover';

export interface PersonCardData {
  userId?: string;
  displayName: string;
  /** Job title / role, e.g. "Staff Engineer". */
  title?: string;
  email?: string;
  /** Team or department. */
  department?: string;
  /** Local time where they are, already formatted, e.g. "3:42 PM". */
  localTime?: string;
  avatarUrl?: string;
  color?: string;
  /** true → online, false → offline, undefined → unknown (no dot). */
  online?: boolean;
  /** Free-text status, e.g. "In a meeting". */
  statusText?: string;
}

export interface PersonHoverCardProps {
  person: PersonCardData;
  /** The inline element that opens the card — usually the person's name. */
  children: ReactNode;
  /** Actions rendered at the foot of the card (Message, Call, …). */
  actions?: ReactNode;
  /**
   * Extra content between the identity block and the actions — skills,
   * a score, recent work. Domain-shaped detail the card itself should not
   * try to model, since every product means something different by it.
   */
  details?: ReactNode;
  /**
   * Set when `children` is ITSELF interactive — a link or a button.
   *
   * The trigger is normally a `role="button"` span so the card is reachable
   * without a pointer. But wrapping a link in that produces a link inside a
   * button: two nested activation targets with different destinations, which
   * assistive tech announces as one confused control and which swallows the
   * link's own Enter behaviour. With this set the wrapper keeps only the
   * pointer handlers and lets the child own focus and activation — hover
   * still opens the card, and focusing the link still opens it, because
   * React's onFocus is focusin and bubbles from the child.
   */
  interactiveChild?: boolean;
  /** ms before hover opens the card. */
  openDelay?: number;
  /** ms before leaving closes it. Must outlast the trigger→panel pointer trip. */
  closeDelay?: number;
  className?: string;
  'data-testid'?: string;
}

export function PersonHoverCard({
  person,
  children,
  actions,
  details,
  interactiveChild = false,
  openDelay = 450,
  closeDelay = 250,
  className,
  'data-testid': testId = 'person-hover-card',
}: PersonHoverCardProps) {
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  // A pending open must be cancelled on unmount, or a list that re-renders
  // under the pointer opens a card for a row that no longer exists.
  useEffect(() => clear, [clear]);

  const scheduleOpen = useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpen(true), openDelay);
  }, [clear, openDelay]);

  const scheduleClose = useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clear, closeDelay]);

  return (
    <>
      <span
        ref={triggerRef}
        // Focusable and keyboard-operable: a card that only exists on hover is
        // unreachable by keyboard and touch. Unless the child already is —
        // see `interactiveChild`.
        {...(interactiveChild
          ? {}
          : {
            tabIndex: 0,
            role: 'button',
            'aria-haspopup': 'dialog' as const,
            onKeyDown: (e: KeyboardEvent_) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen((v) => !v);
              }
              if (e.key === 'Escape') setOpen(false);
            },
          })}
        aria-expanded={open}
        data-testid={`${testId}-trigger`}
        className={cn(
          'rounded-sm underline-offset-2',
          // An interactive child brings its own affordance; adding the span's
          // underline on top double-decorates a link that already underlines.
          interactiveChild ? 'inline-flex' : 'cursor-default hover:underline',
          className,
        )}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
        onFocus={() => setOpen(true)}
      >
        {children}
      </span>

      <InlinePopover
        trigger={triggerRef}
        open={open}
        onClose={() => {
          clear();
          setOpen(false);
        }}
        placement="bottom-start"
        aria-label={`About ${person.displayName}`}
        data-testid={testId}
      >
        {/* Cancels the pending close: without this the card dismisses the
            moment the pointer crosses the gap, and nothing in it is clickable. */}
        <div
          className="w-72 p-3"
          onMouseEnter={clear}
          onMouseLeave={scheduleClose}
        >
          <div className="flex items-start gap-3">
            <Avatar name={person.displayName} src={person.avatarUrl} color={person.color} size={40} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-semibold text-text-primary">
                  {person.displayName}
                </span>
                {person.online !== undefined && (
                  <PresenceDot state={person.online ? 'online' : 'offline'} />
                )}
              </div>
              {person.title && (
                <div className="truncate text-xs text-text-secondary">{person.title}</div>
              )}
              {person.department && (
                <div className="truncate text-xs text-text-tertiary">{person.department}</div>
              )}
            </div>
          </div>

          {person.statusText && (
            <div className="mt-2 truncate text-xs italic text-text-secondary">
              {person.statusText}
            </div>
          )}

          {(person.email || person.localTime) && (
            <div className="mt-2 space-y-0.5 border-t border-border pt-2">
              {person.email && (
                <div className="truncate text-xs text-text-secondary">{person.email}</div>
              )}
              {person.localTime && (
                <div className="text-xs text-text-tertiary">{person.localTime} local time</div>
              )}
            </div>
          )}

          {details && <div className="mt-2 border-t border-border pt-2">{details}</div>}

          {actions && <div className="mt-3 flex items-center gap-2">{actions}</div>}
        </div>
      </InlinePopover>
    </>
  );
}

export default PersonHoverCard;
