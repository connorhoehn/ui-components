// PickerDialog — "choose one of these" in a dialog: a folder to move into, a
// workflow to run, a template to start from. Since 2.390.3.
//
// A search box over a single-select list (rows may be indented, so a folder
// tree reads as a tree), then a confirm button. Enter in the search picks the
// selected row; a double-click picks at once. Built on ConfirmDialog so the
// buttons, the backdrop and Escape behave like every other dialog.

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { Input } from '../forms/Input';
import { cn } from '../../lib/cn';

export interface PickerDialogOption {
  id: string;
  label: string;
  /** A quieter second line. */
  description?: string;
  icon?: ReactNode;
  /** Indent level — a folder's depth in its tree. Default 0. */
  depth?: number;
  /** Shown, not choosable ("the folder it is already in"). */
  disabled?: boolean;
  /** Said beside a disabled row. */
  disabledReason?: string;
}

export interface PickerDialogProps {
  open: boolean;
  title: string;
  /** A sentence under the title. */
  body?: string;
  options: readonly PickerDialogOption[];
  /** The confirm button's words ("Move", "Run", "Create"). Default 'Choose'. */
  confirmLabel?: string;
  onPick: (id: string) => void;
  onCancel: () => void;
  /** Search placeholder; the box is shown when there are more than 6 options. */
  searchPlaceholder?: string;
  /** Said when there is nothing to choose (or nothing matches). */
  emptyText?: string;
  /** Said while the options are loading. */
  loading?: boolean;
  /** Preselected row. */
  initialId?: string;
  'data-testid'?: string;
}

export function PickerDialog({
  open,
  title,
  body,
  options,
  confirmLabel = 'Choose',
  onPick,
  onCancel,
  searchPlaceholder = 'Search…',
  emptyText = 'Nothing to choose from.',
  loading = false,
  initialId,
  'data-testid': testId = 'picker-dialog',
}: PickerDialogProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(initialId ?? null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSelected(initialId ?? null);
  }, [open, initialId]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => `${o.label} ${o.description ?? ''}`.toLowerCase().includes(q));
  }, [options, query]);
  const choosable = shown.filter((o) => !o.disabled);
  const current = choosable.find((o) => o.id === selected) ?? null;

  const pick = (id: string | null) => {
    const option = id ? options.find((o) => o.id === id && !o.disabled) : undefined;
    if (option) onPick(option.id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      pick(current?.id ?? (choosable.length === 1 ? choosable[0]!.id : null));
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    if (choosable.length === 0) return;
    const at = current ? choosable.indexOf(current) : -1;
    const next = e.key === 'ArrowDown' ? Math.min(choosable.length - 1, at + 1) : Math.max(0, at - 1);
    const id = choosable[next]!.id;
    setSelected(id);
    listRef.current?.querySelector<HTMLElement>(`[data-option-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'nearest' });
  };

  return (
    <ConfirmDialog
      open={open}
      title={title}
      {...(body ? { body } : {})}
      confirmLabel={confirmLabel}
      confirmDisabled={!current}
      onConfirm={() => pick(current?.id ?? null)}
      onCancel={onCancel}
    >
      <div className="flex flex-col gap-2" data-testid={testId} onKeyDown={onKeyDown}>
        {options.length > 6 && (
          <Input
            autoFocus
            size="md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            data-testid={`${testId}-search`}
          />
        )}
        <div
          ref={listRef}
          role="listbox" data-ui-listbox="picker"
          aria-label={title}
          tabIndex={options.length > 6 ? -1 : 0}
          className="flex max-h-[320px] flex-col overflow-y-auto rounded-md border border-border py-1"
        >
          {loading ? (
            <div className="px-3 py-2 text-[13px] text-text-tertiary">Loading…</div>
          ) : shown.length === 0 ? (
            <div className="px-3 py-2 text-[13px] text-text-tertiary" data-testid={`${testId}-empty`}>{emptyText}</div>
          ) : shown.map((option) => {
            const isSelected = option.id === current?.id;
            return (
              <button
                data-ui-part=""
                key={option.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                title={option.disabled ? option.disabledReason : undefined}
                data-option-id={option.id}
                data-testid={`${testId}-option-${option.id}`}
                onClick={() => { if (!option.disabled) setSelected(option.id); }}
                onDoubleClick={() => pick(option.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 border-none py-1.5 pr-3 text-left text-[13px] font-[inherit]',
                  PAD[Math.min(option.depth ?? 0, PAD.length - 1)],
                  option.disabled
                    ? 'cursor-not-allowed bg-transparent text-text-tertiary'
                    : isSelected
                      ? 'cursor-pointer bg-primary-bg text-primary-fg'
                      : 'cursor-pointer bg-transparent text-text-primary hover:bg-surface-hover',
                )}
              >
                {option.icon && <span className="flex w-4 shrink-0 items-center justify-center" aria-hidden="true">{option.icon}</span>}
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate">{option.label}</span>
                  {(option.description || (option.disabled && option.disabledReason)) && (
                    <span className="truncate text-xs text-text-tertiary">{option.disabled && option.disabledReason ? option.disabledReason : option.description}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </ConfirmDialog>
  );
}

/** Left padding per tree depth (Tailwind needs the literal classes). */
const PAD = ['pl-3', 'pl-7', 'pl-11', 'pl-[3.75rem]', 'pl-[4.75rem]', 'pl-[5.75rem]'];

export default PickerDialog;
