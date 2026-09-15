// ChoiceList — a vertical list of things a person can do next, each a
// full-width row: a glyph, a title, one line saying what it does, and either
// an action or a disclosure that opens a list of targets beneath it.
//
// The shape a narrow column wants. Buttons in a row wrap into a ragged 2+1
// arrangement at 320px and a dropdown opens a popover over the very column it
// belongs to; rows stack, take the width they are given, and open IN PLACE, so
// the reader never loses the choice they are in the middle of making.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ChoiceListProps {
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/** The list. Rows divide themselves; the list draws the outer rule. */
export function ChoiceList({ children, className, 'data-testid': testId = 'choice-list' }: ChoiceListProps) {
  return (
    <div role="list" data-testid={testId} className={cn('flex flex-col divide-y divide-border border-y border-border', className)}>
      {children}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('h-3.5 w-3.5 shrink-0 text-text-tertiary transition-transform', open && 'rotate-90')} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface ChoiceRowProps {
  icon?: ReactNode;
  title: string;
  /** One line: what choosing this does. */
  description?: string;
  /** An action row: pressing it does the thing. */
  onSelect?: () => void;
  /**
   * A disclosure row: pressing it opens `children` beneath. Controlled when
   * `open` is given, otherwise the row keeps its own state.
   */
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /** Why it is disabled, as the row's tooltip. */
  disabledReason?: string;
  /** The row is doing what it was asked; it reads as pressed and takes no more presses. */
  busy?: boolean;
  'data-testid'?: string;
}

export function ChoiceRow({
  icon,
  title,
  description,
  onSelect,
  children,
  open: openProp,
  onOpenChange,
  disabled = false,
  disabledReason,
  busy = false,
  'data-testid': testId = 'choice-row',
}: ChoiceRowProps) {
  const [openState, setOpenState] = useState(false);
  const disclosure = children !== undefined;
  const open = openProp ?? openState;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  };
  const inert = disabled || busy;
  return (
    <div role="listitem" data-testid={testId} data-open={disclosure ? String(open) : undefined}>
      <button
        type="button"
        disabled={inert}
        title={disabled ? disabledReason : undefined}
        aria-expanded={disclosure ? open : undefined}
        aria-busy={busy || undefined}
        onClick={() => (disclosure ? setOpen(!open) : onSelect?.())}
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 border-none bg-transparent px-4 py-3 text-left font-[inherit] transition-colors',
          'hover:bg-surface-hover disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent',
          open && 'bg-surface-hover',
        )}
        data-testid={`${testId}-button`}
      >
        {icon ? <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-panel text-text-secondary ring-1 ring-border" aria-hidden="true">{icon}</span> : null}
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[13px] font-semibold text-text-primary">{title}</span>
          {description ? <span className="truncate text-[12px] text-text-secondary">{description}</span> : null}
        </span>
        {disclosure ? <Chevron open={open} /> : null}
      </button>
      {disclosure && open ? (
        <div className="border-t border-border bg-surface pb-1" data-testid={`${testId}-panel`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export interface ChoiceOptionProps {
  icon?: ReactNode;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  'data-testid'?: string;
}

/** One target inside an open disclosure: indented under the row's glyph. */
export function ChoiceOption({ icon, label, onSelect, disabled = false, 'data-testid': testId = 'choice-option' }: ChoiceOptionProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2.5 border-none bg-transparent py-1.5 pl-[3.75rem] pr-4 text-left font-[inherit] text-[13px] text-text-primary transition-colors',
        'hover:bg-surface-hover disabled:cursor-default disabled:opacity-50',
      )}
      data-testid={testId}
    >
      {icon ? <span className="flex shrink-0 items-center" aria-hidden="true">{icon}</span> : null}
      <span className="truncate">{label}</span>
    </button>
  );
}

export default ChoiceList;
