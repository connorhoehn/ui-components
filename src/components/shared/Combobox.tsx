// Combobox — searchable select over a still-focused input (ARIA 1.2 combobox
// with a listbox popup). The input keeps focus for its whole open lifetime:
// ArrowDown/ArrowUp move `aria-activedescendant`, Enter picks, Escape closes
// without clearing, Tab is never intercepted, and the panel opens on typing or
// ArrowDown — never on bare focus. Single or multi-select; `allowCustom` lets
// Enter commit free text that matches no option (suggestions over free text).

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import Chip from './Chip';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
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
  sm: 'min-h-7 text-[12px]',
  md: 'min-h-9 text-[14px]',
};

export function Combobox(props: ComboboxProps) {
  const {
    options, placeholder, size = 'sm', disabled, allowCustom, maxOptions = 8, emptyMessage = 'No matches',
    filter, onQueryChange, className, 'data-testid': testId,
  } = props;
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
    const test = filter ?? ((o: ComboboxOption, s: string) => o.label.toLowerCase().includes(s));
    return options.filter((o) => !q || test(o, q)).slice(0, maxOptions);
  }, [options, query, filter, maxOptions]);

  const showPanel = open && (matches.length > 0 || query.trim().length > 0);

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

  return (
    <div ref={rootRef} className={cn('relative min-w-0', className)} data-testid={testId}>
      <div
        className={cn(
          'flex flex-wrap items-center gap-1 rounded-md border border-border-field bg-surface px-2 py-0.5 focus-within:border-primary',
          SIZE[size], disabled && 'opacity-60',
        )}
      >
        {props.multiple && props.value.map((v) => (
          <Chip key={v} size="xs" tone="accent" onRemove={disabled ? undefined : () => props.onChange(props.value.filter((x) => x !== v))}>
            {labelOf(v)}
          </Chip>
        ))}
        <input
          role="combobox"
          aria-label={props['aria-label']}
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showPanel && active >= 0 ? `${uid}-opt-${active}` : undefined}
          disabled={disabled}
          value={shown}
          placeholder={props.multiple && props.value.length ? undefined : placeholder}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onKeyDown={onKeyDown}
          className="min-w-[4rem] flex-1 border-0 bg-transparent py-0.5 text-text-primary outline-none placeholder:text-text-tertiary"
        />
      </div>
      {showPanel && (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable={props.multiple || undefined}
          className="absolute inset-x-0 top-full z-50 m-0 mt-1 max-h-64 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg"
        >
          {matches.length === 0 ? (
            <li role="presentation" className="px-2 py-1.5 text-[12px] text-text-tertiary">{allowCustom ? `Press Enter to use "${query.trim()}"` : emptyMessage}</li>
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
                  'flex cursor-pointer select-none flex-col rounded px-2 py-1 text-[12px]',
                  i === active ? 'bg-primary-bg text-primary-fg' : isSel ? 'font-semibold text-text-primary' : 'text-text-primary',
                  o.disabled && 'cursor-not-allowed opacity-50',
                )}
              >
                <span>{isSel && props.multiple ? '✓ ' : ''}{o.label}</span>
                {o.description && <span className="text-[11px] text-text-tertiary">{o.description}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Combobox;
