// Combobox — searchable select over a still-focused input (ARIA 1.2 combobox
// with a listbox popup). The input keeps focus for its whole open lifetime:
// ArrowDown/ArrowUp move `aria-activedescendant`, Enter picks, Escape closes
// without clearing, Tab is never intercepted, and the panel opens on typing,
// ArrowDown, a pointer click on the field or its chevron — never on bare
// (keyboard Tab) focus. Single or multi-select; `allowCustom` lets Enter commit
// free text that matches no option (suggestions over free text).
//
// 2.445.0 (the form wizard's picker): options carry an optional `meta` tag
// (a workspace, a team) drawn right-aligned beside the title, the default
// filter matches title, description and meta, the description line is 12/400
// (it was 11px, off the app scale), single mode marks the chosen option, and
// the field takes FormField's wiring (`id`, `aria-describedby`,
// `aria-invalid`, `aria-required`) plus `invalid` for the danger border. The
// root carries `data-ui-control="combobox"` so the DOM audit knows the
// control is the library's.
//
// 2.452.0 (PersonPicker): an option may carry `leading` (an avatar) drawn
// before its title, and the field may carry `leading` drawn before the input
// while a single choice is shown idle — the chosen person's avatar.

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from './Chip';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  /** A short right-aligned tag on the option's title line (a workspace, a team). */
  meta?: string;
  /** A small visual drawn before the title (an avatar). Never matched by the filter. */
  leading?: ReactNode;
  disabled?: boolean;
}

interface BaseProps {
  options: readonly ComboboxOption[];
  placeholder?: string;
  'aria-label'?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  /** Commit typed text that matches no option on Enter. */
  allowCustom?: boolean;
  /** Cap on rendered suggestions (default 8). */
  maxOptions?: number;
  emptyMessage?: string;
  /** Custom matcher; default is a case-insensitive substring on label. */
  filter?: (option: ComboboxOption, query: string) => boolean;
  /** Called as the query changes (for hosts that fetch suggestions). */
  onQueryChange?: (query: string) => void;
  className?: string;
  'data-testid'?: string;
  /** The input's id — FormField's `id`, so its `<label htmlFor>` names the field. */
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  /** Danger border (FormField's error state). `aria-invalid` alone also sets it. */
  invalid?: boolean;
  /** Draw the chevron that opens the full list on click. Default true in single mode. */
  showToggle?: boolean;
  /** Single mode: drawn before the input while the chosen option's label is shown (not while typing). */
  leading?: ReactNode;
}
export interface SingleComboboxProps extends BaseProps {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
}
export interface MultiComboboxProps extends BaseProps {
  multiple: true;
  value: readonly string[];
  onChange: (value: string[]) => void;
}
export type ComboboxProps = SingleComboboxProps | MultiComboboxProps;

const SIZE: Record<'sm' | 'md', string> = {
  sm: 'min-h-7 text-xs',
  md: 'min-h-9 text-sm',
};
const OPTION_TITLE: Record<'sm' | 'md', string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

const defaultFilter = (o: ComboboxOption, q: string) =>
  [o.label, o.description, o.meta].some((s) => (s ?? '').toLowerCase().includes(q));

export function Combobox(props: ComboboxProps) {
  const {
    options, placeholder, size = 'sm', disabled, allowCustom, maxOptions = 8, emptyMessage = 'No matches',
    filter, onQueryChange, className, 'data-testid': testId, id, invalid,
    'aria-describedby': describedBy, 'aria-invalid': ariaInvalid, 'aria-required': ariaRequired,
  } = props;
  const showToggle = props.showToggle ?? !props.multiple;
  const isInvalid = invalid || ariaInvalid === true;
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const listId = `${uid}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const selected: readonly string[] = props.multiple ? props.value : props.value ? [props.value] : [];
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const test = filter ?? defaultFilter;
    return options.filter((o) => !q || test(o, q)).slice(0, maxOptions);
  }, [options, query, filter, maxOptions]);

  const showPanel = open && (matches.length > 0 || query.trim().length > 0);
  const openAll = () => {
    if (disabled) return;
    const at = selected[0] ? matches.findIndex((o) => o.value === selected[0]) : -1;
    setOpen(true);
    setActive(at >= 0 ? at : matches.length ? 0 : -1);
  };

  const setQ = (q: string) => { setQuery(q); onQueryChange?.(q); };
  const close = () => { setOpen(false); setActive(-1); };

  const commit = (value: string) => {
    if (props.multiple) {
      const next = props.value.includes(value) ? props.value.filter((v) => v !== value) : [...props.value, value];
      props.onChange(next);
      setQ('');
      setActive(-1);
    } else {
      props.onChange(value);
      setQ('');
      close();
    }
  };

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e: MouseEvent) => { if (!rootRef.current?.contains(e.target as Node)) close(); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) { setOpen(true); setActive(matches.length ? 0 : -1); } else if (matches.length) setActive((i) => Math.min(i + 1, matches.length - 1));
        break;
      case 'ArrowUp':
        if (!open) return;
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case 'Enter': {
        const opt = open && active >= 0 ? matches[active] : undefined;
        if (opt && !opt.disabled) { e.preventDefault(); commit(opt.value); }
        else if (allowCustom && query.trim()) { e.preventDefault(); commit(query.trim()); }
        break;
      }
      case 'Escape':
        if (open) { e.stopPropagation(); close(); }
        break;
      case 'Backspace':
        if (props.multiple && !query && props.value.length) props.onChange(props.value.slice(0, -1));
        break;
      default:
    }
  };

  // Single mode shows the chosen label while the field is idle.
  const shown = props.multiple || query || open ? query : selected[0] ? labelOf(selected[0]) : '';
  const fieldLeading = !props.multiple && !query && !open && selected[0] ? props.leading : undefined;

  return (
    <div ref={rootRef} className={cn('relative min-w-0', className)} data-testid={testId} data-ui-control="combobox">
      <div
        className={cn(
          'flex flex-wrap items-center gap-1 rounded-md border bg-surface px-2 py-0.5',
          isInvalid ? 'border-danger focus-within:border-danger' : 'border-border-field focus-within:border-primary',
          SIZE[size], disabled && 'opacity-60',
        )}
      >
        {props.multiple && props.value.map((v) => (
          <Chip key={v} size="xs" tone="accent" onRemove={disabled ? undefined : () => props.onChange(props.value.filter((x) => x !== v))}>
            {labelOf(v)}
          </Chip>
        ))}
        {fieldLeading && <span className="flex shrink-0 items-center" data-combobox-leading="">{fieldLeading}</span>}
        <input
          ref={inputRef}
          id={id}
          role="combobox"
          aria-label={props['aria-label']}
          aria-describedby={describedBy}
          aria-invalid={isInvalid || undefined}
          aria-required={ariaRequired}
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showPanel && active >= 0 ? `${uid}-opt-${active}` : undefined}
          disabled={disabled}
          value={shown}
          placeholder={props.multiple && props.value.length ? undefined : (!props.multiple && open && selected[0] ? labelOf(selected[0]) : placeholder)}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onKeyDown={onKeyDown}
          onClick={() => { if (!open) openAll(); }}
          className="min-w-[4rem] flex-1 border-0 bg-transparent py-0.5 text-text-primary outline-none placeholder:text-text-tertiary"
        />
        {showToggle && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={open ? 'Close options' : 'Show options'}
            disabled={disabled}
            onMouseDown={(e) => { e.preventDefault(); if (open) close(); else { inputRef.current?.focus(); openAll(); } }}
            className="flex shrink-0 items-center justify-center rounded p-0.5 text-text-secondary hover:bg-surface-hover disabled:cursor-not-allowed"
          >
            <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d={open ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'} />
            </svg>
          </button>
        )}
      </div>
      {showPanel && (
        <ul
          id={listId}
          role="listbox" data-ui-listbox="combobox"
          aria-multiselectable={props.multiple || undefined}
          className="absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg"
        >
          {matches.length === 0 ? (
            <li role="presentation" className="px-2 py-1.5 text-xs text-text-tertiary">{allowCustom ? `Press Enter to use "${query.trim()}"` : emptyMessage}</li>
          ) : matches.map((o, i) => {
            const isSel = selected.includes(o.value);
            return (
              <li
                key={o.value}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={isSel}
                aria-disabled={o.disabled || undefined}
                // mousedown + preventDefault so the input never blurs while open.
                onMouseDown={(e) => { e.preventDefault(); if (!o.disabled) commit(o.value); }}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  'flex cursor-pointer select-none flex-col gap-0.5 rounded px-2 py-1.5',
                  OPTION_TITLE[size],
                  i === active ? 'bg-primary-bg text-primary-fg' : isSel ? 'font-semibold text-text-primary' : 'text-text-primary',
                  o.disabled && 'cursor-not-allowed opacity-50',
                )}
              >
                {o.leading ? (
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="flex shrink-0 items-center" aria-hidden="true">{o.leading}</span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="flex min-w-0 items-baseline gap-2">
                        <span className="min-w-0 flex-1 truncate">{isSel ? '✓ ' : ''}{o.label}</span>
                        {o.meta && <span className="shrink-0 text-xs font-normal text-text-secondary">{o.meta}</span>}
                      </span>
                      {o.description && <span className="text-xs font-normal leading-4 text-text-tertiary">{o.description}</span>}
                    </span>
                  </span>
                ) : (
                  <>
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="min-w-0 flex-1 truncate">{isSel ? '✓ ' : ''}{o.label}</span>
                      {o.meta && <span className="shrink-0 text-xs font-normal text-text-secondary">{o.meta}</span>}
                    </span>
                    {o.description && <span className="text-xs font-normal leading-4 text-text-tertiary">{o.description}</span>}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Combobox;
