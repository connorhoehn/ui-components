// src/components/shared/RowActions.tsx
//
// The end of a table row: up to three icon-only buttons for the usual
// actions, then a "…" menu with the rest. Fixed order, right-aligned, one
// line. Every click and key stays here, so pressing an action never also
// opens the row (a `DataTable` `onRowClick`, a clickable `TableRow`).

import type { KeyboardEvent, ReactNode, SyntheticEvent } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { MoreIcon } from '../ui/Icons';
import { Tooltip } from './Tooltip';
import { DropdownMenu, type DropdownMenuConfirm } from './DropdownMenu';

export interface RowAction {
  icon: ReactNode;
  /** The tooltip, and (with the row's `name`) the accessible name. */
  label: string;
  onClick: () => void;
  /** The row's main action: drawn filled. */
  primary?: boolean;
  disabled?: boolean;
  /** A toggle's state (`aria-pressed`). */
  pressed?: boolean;
}

export interface RowActionsMenuItem {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  /** Why it is disabled: the item's second line and tooltip, announced as its description. */
  disabledReason?: string;
  /** Ask in place before `onSelect` runs: `{ question, confirmLabel?, tone? }`. */
  confirm?: DropdownMenuConfirm;
  /** Paint the item as destructive. */
  danger?: boolean;
}

export interface RowActionsProps {
  /** The row's name: "Approve, Take 2a"; "More actions for Take 2a". */
  name?: string;
  /** Zero to three icon buttons, in this order. Falsy entries are skipped. */
  actions?: ReadonlyArray<RowAction | null | undefined | false>;
  /** The "…" menu's items; with none, no menu is drawn. */
  menu?: ReadonlyArray<RowActionsMenuItem | null | undefined | false>;
  className?: string;
  'data-testid'?: string;
}

/** The most icon buttons a row carries before its "…" menu. */
export const ROW_ACTIONS_MAX = 3;

const stop = (e: SyntheticEvent) => e.stopPropagation();
// Only the keys that activate a row stop here: Escape must still reach the
// menu's window listener, and Tab the page.
const stopActivation = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); };

/** A table row's end: icon buttons for the usual actions, then a "…" menu. */
export function RowActions({ name, actions, menu, className, 'data-testid': testId = 'row-actions' }: RowActionsProps) {
  const shown = (actions ?? []).filter((a): a is RowAction => !!a).slice(0, ROW_ACTIONS_MAX);
  const items = (menu ?? []).filter((m): m is RowActionsMenuItem => !!m);
  const suffix = name ? `, ${name}` : '';
  return (
    <div
      // Fills its cell and right-aligns its buttons by justification, never by
      // an auto margin (an audit reads a computed auto margin as page spacing).
      className={cn('flex w-full shrink-0 flex-nowrap items-center justify-end gap-1 whitespace-nowrap', className)}
      onClick={stop}
      onKeyDown={stopActivation}
      data-ui-part="row-actions"
      data-testid={testId}
    >
      {shown.map((a, i) => (
        <Tooltip key={`${a.label}-${i}`} content={a.label}>
          <IconButton
            size="sm"
            variant={a.primary ? 'primary' : 'ghost'}
            aria-label={a.label + suffix}
            icon={a.icon}
            disabled={a.disabled}
            aria-pressed={a.pressed}
            onClick={() => a.onClick()}
            data-testid={`${testId}-action-${i}`}
          />
        </Tooltip>
      ))}
      {items.length > 0 && (
        <DropdownMenu
          trigger={<MoreIcon />}
          triggerLabel={`More actions${name ? ` for ${name}` : ''}`}
          triggerVariant="link"
          align="end"
          triggerTestId={`${testId}-more`}
          sections={[{ items: items.map((m, i) => ({
            label: m.label,
            onSelect: m.onSelect,
            disabled: m.disabled,
            disabledReason: m.disabledReason,
            confirm: m.confirm,
            danger: m.danger,
            'data-testid': `${testId}-item-${i}`,
          })) }]}
        />
      )}
    </div>
  );
}

export default RowActions;
