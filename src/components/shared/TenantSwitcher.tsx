// TenantSwitcher — the shell's brand mark that doubles as the workspace
// switcher: a planet glyph (with a small orbiting "healthy" moon) and the
// current workspace's name; hover (mouse, after a beat) or click opens a small
// dialog listing the other workspaces the viewer may enter, each with its
// unread activity beside it.
//
// Ported from the aws-agentcore portal (2.441.0), where it was hand-rolled
// with a sibling stylesheet. The DOM contract is kept on purpose: the class
// hooks `tenant-switcher`, `tenant-switcher-trigger`, `tenant-brand-planet`,
// `tenant-brand-orbit`, `tenant-brand-label`, `tenant-switcher-panel`,
// `tenant-destination`, `tenant-destination-action`, `tenant-activity`
// (+ `tenant-activity-unread`, `data-status`) and `tenant-unread` stay on the
// same elements so the host's e2e specs keep locating them; styling is now
// Tailwind token classes and needs no host CSS.
//
// Everything the switcher shows is a prop: which workspaces, their unread
// counts, whether live updates are on, why switching is blocked. Switching
// itself is the host's `onSelect`; a rejected promise is shown in the panel
// and leaves every destination enabled for a retry.

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Inline, Stack } from '../ui/Stack';
import { ActivityIcon, InfoIcon } from '../ui/Icons';
import Avatar from './Avatar';
import InlineAlert from './InlineAlert';
import { Tooltip } from './Tooltip';
import { Text } from './Text';

export interface TenantSwitcherDestination {
  /** Stable id handed back to `onSelect`; also written as `data-tenant`. */
  id: string;
  /** The workspace's name ("Assessment"). The button's accessible name. */
  label: string;
  /** Avatar initials. Default: the label's first two characters. */
  initials?: string;
  /** Unread notices for this workspace. Absent or 0 draws the info glyph. */
  unread?: number;
}

export interface TenantSwitcherProps {
  /** The current workspace's name, drawn beside the planet ("Work"). */
  label: string;
  /** Draws the orbiting moon — the shell's "connected and healthy" hint. */
  healthy?: boolean;
  /**
   * Ambient motion. `false` keeps the moon still (no animation at all);
   * `prefers-reduced-motion` stills it regardless. Default true.
   */
  motion?: boolean;
  /** The workspaces the viewer may switch to, in display order. */
  destinations: readonly TenantSwitcherDestination[];
  /**
   * Switch. A rejected promise shows its message in the panel and re-enables
   * the destinations; a resolved one leaves them disabled (the host is
   * navigating) until `resetKey` changes.
   */
  onSelect: (id: string) => void | Promise<unknown>;
  /** Whether live notification updates are available. Shapes each activity hint. */
  live?: boolean;
  /** Omit inbox activity for project/file workspaces without a notification service. */
  showActivity?: boolean;
  /** When set, every destination is disabled and this explains why. */
  blockedReason?: ReactNode;
  /** Shown when `destinations` is empty. */
  emptyMessage?: ReactNode;
  /** Closes the panel and clears its error/busy state when it changes (e.g. user + tenant). */
  resetKey?: string | number;
  /** Destination avatar fill / ink. Default the primary tint tokens. */
  avatarColor?: string;
  avatarForeground?: string;
  /** Trigger's accessible name. Default `"<label>: switch tenant"`. */
  triggerLabel?: string;
  /** The dialog's accessible name. Default "Switch tenant". */
  dialogLabel?: string;
  /** Shown when `onSelect` rejects with something that is not an `Error`. */
  errorFallback?: string;
  className?: string;
  'data-testid'?: string;
}

const OPEN_DELAY_MS = 250;
const CLOSE_DELAY_MS = 300;

function activityText(unread: number, live: boolean): string {
  if (unread > 0) {
    return `${unread} unread ${unread === 1 ? 'notice' : 'notices'} in this inbox.${live ? '' : ' Live updates are currently unavailable.'}`;
  }
  return live ? 'No unread notices in this inbox.' : 'Live notification updates are currently unavailable.';
}

function PlanetGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="size-6">
      <circle cx="12" cy="12" r="6.5" />
      <ellipse cx="12" cy="12" rx="11" ry="3.5" transform="rotate(-22 12 12)" />
    </svg>
  );
}

export function TenantSwitcher({
  label,
  healthy = false,
  motion = true,
  destinations,
  onSelect,
  live = false,
  showActivity = true,
  blockedReason,
  emptyMessage = 'No other tenants are available for your account.',
  resetKey,
  avatarColor = 'var(--color-primary-bg)',
  avatarForeground = 'var(--color-primary-fg)',
  triggerLabel,
  dialogLabel = 'Switch tenant',
  errorFallback = 'Could not switch workspace. Try again.',
  className,
  'data-testid': testId = 'tenant-switcher',
}: TenantSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  const blocked = blockedReason != null && blockedReason !== false;

  const close = () => {
    clearTimeout(timer.current);
    setOpen(false);
    setError('');
  };

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    close();
    setBusy(false);
  }, [resetKey]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const restore = root.current?.contains(document.activeElement);
      close();
      if (restore) trigger.current?.focus();
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const select = async (destination: string) => {
    if (busy || blocked) return;
    setBusy(true);
    setError('');
    try {
      await onSelect(destination);
    } catch (cause) {
      setError(cause instanceof Error && cause.message ? cause.message : errorFallback);
      setBusy(false);
    }
  };

  return (
    <div
      ref={root}
      className={cn('tenant-switcher relative z-[60] min-w-0 max-w-full shrink-0', className)}
      data-testid={testId}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
      }}
      onPointerLeave={() => {
        clearTimeout(timer.current);
        if (!root.current?.contains(document.activeElement)) timer.current = setTimeout(close, CLOSE_DELAY_MS);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
          trigger.current?.focus();
        }
        if (event.key === 'ArrowDown' && event.target === trigger.current) {
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => root.current?.querySelector<HTMLButtonElement>('[role="dialog"] button')?.focus());
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={cn(
          'tenant-switcher-trigger flex min-w-0 max-w-full cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent px-1 py-0.5 font-[inherit] text-text-primary',
          'hover:bg-surface-hover aria-expanded:bg-surface-hover',
          'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary',
        )}
        aria-label={triggerLabel ?? `${label}: switch tenant`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        data-testid={`${testId}-trigger`}
        onClick={() => {
          clearTimeout(timer.current);
          setOpen(true);
        }}
      >
        <span className="tenant-brand-planet relative grid size-[26px] shrink-0 place-items-center text-text-secondary" aria-hidden="true">
          <PlanetGlyph />
          {healthy && (
            <span
              className={cn(
                'tenant-brand-orbit pointer-events-none absolute inset-0 [transform:rotate(12deg)]',
                motion && 'animate-[tenant-orbit-plane_40s_ease-in-out_infinite] motion-reduce:animate-none',
              )}
              aria-hidden="true"
              data-motion={motion ? 'on' : 'off'}
            >
              <span
                className={cn(
                  'absolute left-[calc(50%-2px)] top-[calc(50%-2px)] size-1 rounded-full bg-success shadow-[0_0_0_1px_var(--color-surface)] [transform:translate(12px,7px)]',
                  motion && 'animate-[tenant-orbit_5s_linear_infinite] motion-reduce:animate-none',
                )}
              />
            </span>
          )}
        </span>
        <Text size="base" weight="bold" className="tenant-brand-label min-w-0 truncate leading-[22px]">{label}</Text>
      </button>
      {open && (
        <div
          id={id}
          role="dialog"
          aria-label={dialogLabel}
          data-testid={`${testId}-panel`}
          className={cn(
            'tenant-switcher-panel absolute left-0 top-[calc(100%+8px)] w-[min(224px,calc(100vw-32px))] rounded-xl border border-border bg-surface p-1.5 shadow-lg',
            // A bridge over the 8px gap, so moving the pointer down from the
            // trigger does not count as leaving the switcher.
            "before:absolute before:inset-x-0 before:-top-2.5 before:h-2.5 before:content-['']",
          )}
        >
          <Stack gap="sm">
            {error && <InlineAlert tone="error">{error}</InlineAlert>}
            {blocked && <Text as="p" size="xs" tone="secondary" className="m-0">{blockedReason}</Text>}
            {destinations.length > 0 && (
              <Stack gap="none" className="tenant-destinations">
                {destinations.map((destination) => {
                  const unread = Math.max(0, destination.unread ?? 0);
                  const activity = activityText(unread, live);
                  return (
                    <Inline
                      key={destination.id}
                      role="group"
                      gap="none"
                      align="center"
                      wrap={false}
                      className="tenant-destination rounded-md hover:bg-surface-hover focus-within:bg-surface-hover"
                      aria-label={unread > 0 ? `${destination.label}, ${unread} unread notifications` : destination.label}
                      data-testid={`${testId}-destination-${destination.id}`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'tenant-destination-action h-[38px] min-w-0 flex-1 justify-start gap-2 border-0 bg-transparent px-2 py-1.5',
                          'enabled:hover:bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
                        )}
                        aria-label={destination.label}
                        disabled={busy || blocked}
                        onClick={() => void select(destination.id)}
                      >
                        <span aria-hidden="true" data-tenant={destination.id}>
                          <Avatar
                            name={destination.label}
                            initials={destination.initials ?? destination.label.slice(0, 2)}
                            size={24}
                            color={avatarColor}
                            foreground={avatarForeground}
                            showTitle={false}
                          />
                        </span>
                        <Text size="sm" weight="semibold">{destination.label}</Text>
                      </Button>
                      {showActivity && <Tooltip content={activity} placement="right">
                        <span
                          tabIndex={0}
                          role="img"
                          aria-label={`${destination.label}: ${activity}`}
                          className={cn(
                            'tenant-activity mr-2 inline-flex h-[30px] min-w-6 items-center justify-end gap-1 rounded-sm px-0.5 text-text-tertiary',
                            'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
                            unread > 0 && 'tenant-activity-unread text-primary',
                          )}
                          data-status={unread > 0 ? 'unread' : live ? 'empty' : 'unavailable'}
                        >
                          {unread > 0 ? (
                            <>
                              <ActivityIcon size={14} aria-hidden="true" />
                              <span className="tenant-unread text-xs font-semibold tabular-nums" aria-hidden="true">{unread}</span>
                            </>
                          ) : (
                            <InfoIcon size={14} aria-hidden="true" />
                          )}
                        </span>
                      </Tooltip>}
                    </Inline>
                  );
                })}
              </Stack>
            )}
            {destinations.length === 0 && (
              <Text as="p" size="sm" tone="secondary" className="m-0" data-testid={`${testId}-empty`}>{emptyMessage}</Text>
            )}
          </Stack>
        </div>
      )}
    </div>
  );
}

export default TenantSwitcher;
