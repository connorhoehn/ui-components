// PopoverForm — a small form that opens AT the control that asked for it.
//
// The alternative, and what this replaces, is a centred modal: a dimmed
// screen and a wide white slab for three fields. Teams and Slack put these
// next to the thing you clicked, keep them narrow, and let the page stay
// visible behind — creating a channel is a small act and should not feel
// like leaving the room.
//
// The shell owns the chrome (header, error line, footer, submit-on-Enter,
// Escape-to-close) so every one of these reads the same; callers bring only
// their fields.

import { useEffect, useRef, type FormEvent, type ReactNode, type RefObject } from 'react';
import { InlinePopover, type InlinePopoverPlacement } from './InlinePopover';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

export type PopoverFormWidth = 'sm' | 'md' | 'lg';

const WIDTH_CLASS: Record<PopoverFormWidth, string> = {
  sm: 'w-[264px]',
  md: 'w-[320px]',
  lg: 'w-[380px]',
};

export interface PopoverFormProps {
  open: boolean;
  /** What it opens beside. Without one it centres, which is the fallback, not the intent. */
  anchor?: RefObject<HTMLElement | null> | null;
  placement?: InlinePopoverPlacement;
  /** A word or two. "Create a channel", not "Create a new channel in this team". */
  title: string;
  /** The context line under it — the team a channel is going into, say. */
  subtitle?: string;
  /** A small mark to the left of the title: a team avatar, a glyph. */
  icon?: ReactNode;
  submitLabel: string;
  /** Overrides the submit button's testid, for hosts whose suites name it. */
  submitTestId?: string;
  submitDisabled?: boolean;
  busy?: boolean;
  /** The server's refusal, shown in place. The footer does not move when it appears. */
  error?: string | null;
  onSubmit: () => void;
  onClose: () => void;
  /** How wide the panel sits. 'md' (320px) by default — a name fits, a paragraph does not. */
  width?: PopoverFormWidth;
  children: ReactNode;
  'data-testid'?: string;
}

export function PopoverForm({
  open,
  anchor,
  placement = 'bottom-start',
  title,
  subtitle,
  icon,
  submitLabel,
  submitTestId,
  submitDisabled = false,
  busy = false,
  error = null,
  onSubmit,
  onClose,
  width = 'md',
  children,
  'data-testid': testId = 'popover-form',
}: PopoverFormProps) {
  const fallback = useRef<HTMLElement | null>(null);
  const firstFieldRef = useRef<HTMLDivElement | null>(null);

  // The first field takes focus, the way a menu's first item does — the form
  // opened because someone chose to fill it in.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      firstFieldRef.current?.querySelector<HTMLElement>('input, textarea, select')?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  const body = (
    <form
      className={cn('flex flex-col', WIDTH_CLASS[width])}
      data-testid={testId}
      onSubmit={(e: FormEvent) => { e.preventDefault(); if (!submitDisabled && !busy) onSubmit(); }}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        {icon && <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg" aria-hidden="true">{icon}</span>}
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[13px] font-semibold leading-tight text-text-primary" data-testid={`${testId}-title`}>{title}</span>
          {subtitle && <span className="truncate text-[11px] leading-tight text-text-tertiary">{subtitle}</span>}
        </span>
      </div>

      <div ref={firstFieldRef} className="flex flex-col gap-2.5 px-3 py-2.5">
        {children}
      </div>

      {/* Reserved, so a refusal never moves the buttons out from under the cursor. */}
      <div className={cn('min-h-[1.125rem] px-3', error && 'pb-1')} aria-live="polite">
        {error && <span className="text-[11px] leading-tight text-danger-fg" role="alert" data-testid={`${testId}-error`}>{error}</span>}
      </div>

      <div className="flex items-center justify-end gap-1.5 border-t border-border px-3 py-2">
        <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={busy} data-testid={`${testId}-cancel`}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm" disabled={submitDisabled || busy} data-testid={submitTestId ?? `${testId}-submit`}>
          {busy ? 'Working…' : submitLabel}
        </Button>
      </div>
    </form>
  );

  // Anchored is the point. Centred is what happens when a caller has no
  // element to point at — still narrow, still the same chrome.
  if (!anchor) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24" onMouseDown={onClose} data-testid={`${testId}-backdrop`}>
        <div className="rounded-lg border border-border bg-surface shadow-lg" onMouseDown={(e) => e.stopPropagation()}>
          {body}
        </div>
      </div>
    );
  }

  return (
    <InlinePopover
      trigger={anchor ?? fallback}
      open={open}
      onClose={onClose}
      placement={placement}
      offset={6}
      className="p-0"
      data-testid={`${testId}-popover`}
    >
      {body}
    </InlinePopover>
  );
}

/** A field in a PopoverForm: a small label over its control, tightly. */
export function PopoverField({
  label,
  hint,
  children,
  'data-testid': testId,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  'data-testid'?: string;
}) {
  return (
    <label className="flex flex-col gap-1" data-testid={testId}>
      <span className="text-[11px] font-medium leading-none text-text-secondary">{label}</span>
      {children}
      {hint && <span className="text-[11px] leading-tight text-text-tertiary">{hint}</span>}
    </label>
  );
}

export default PopoverForm;
