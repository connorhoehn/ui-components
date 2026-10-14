// src/components/forms/Select.tsx
//
// Select — the library's dropdown (2.445.0: a custom listbox).
//
// Until 2.445.0 this rendered the platform's `<select>`: the closed field was
// styled, but the open list was the operating system's — a grey native menu
// with the system font, no descriptions, no dark theme, and nothing the DOM
// audit could measure. Every dropdown in every tenant looked unfinished the
// moment it opened. It is now a button trigger (`role="combobox"`, the ARIA
// 1.2 select-only combobox) over a styled `role="listbox"` popup rendered in a
// portal and kept inside the viewport (it flips above the trigger when the
// space below is short). The props are the same, so existing call sites keep
// working:
//
//   * `onChange` still receives an event-shaped object whose `target.value`
//     (and `currentTarget.value`) is the chosen value;
//   * `options` / `groups` / `placeholder` / `size` / `variant` / `tone` /
//     `invalid` / `disabled` / `className` / `wrapperClassName` keep their
//     meaning (`className` lands on the trigger, which is the visible field);
//   * `id` and the `aria-*` wiring a `FormField` hands down land on the
//     trigger, so `<label htmlFor>` still names it;
//   * `name` writes a hidden input so a native form submission still carries
//     the value;
//   * a `change` event dispatched on the trigger with a `target.value` commits
//     that value (what `fireEvent.change(el, { target: { value } })` does).
//
// Keyboard: ArrowDown/ArrowUp/Enter/Space/Alt+ArrowDown open; while open the
// arrows, Home and End move the active option (disabled options are skipped),
// typing jumps to the next option starting with the typed text, Enter/Space
// choose, Tab chooses and moves on, Escape closes without changing anything.
// Focus never leaves the trigger, so it is where focus returns.
//
// Options may carry a `description` (a 12/400 second line) and an `icon`.
// `searchable` renders the library `Combobox` instead (a typed filter over the
// same options). `native` is the opt-in escape hatch to the platform element
// (a real need such as a mobile picker); it requires a reason and is marked
// `data-ui-native-select`, which the DOM audit accepts and every other
// `<select>` fails.
//
// Markers: the trigger carries `data-ui-control="select"`, the popup
// `data-ui-listbox="select"`, each option `data-ui-option`.

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { useDensity } from '../shared/Density';
import { CONTROL_HEIGHT } from '../shared/controlMetrics';
import { Combobox } from '../shared/Combobox';
import { cn } from '../../lib/cn';
import { useOverlayLayer } from '../../lib/overlayStack';
import {
  TONE_BG,
  TONE_BORDER,
  TONE_TEXT,
  toneKey,
  type ToneOrAlias,
} from '../shared/tones';

export type SelectSize = 'sm' | 'md';

/**
 * `default` is the boxed field. `pill` is the compact, tone-coloured capsule
 * that status and priority pickers want — a chip you can change. `ghost`
 * (2.385.0) is the value side of a label/value row — no box, the value
 * right-aligned with the chevron after it, a hover tint to say it can be
 * changed ("Model   Haiku ▾" in a run panel).
 */
export type SelectVariant = 'default' | 'pill' | 'ghost';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** A 12/400 second line under the label in the open list. */
  description?: string;
  /** A small leading glyph in the open list (and the closed field). */
  icon?: ReactNode;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

/** The platform `<select>`, opt-in, with the reason it is needed (the DOM audit reads it). */
export interface SelectNative {
  reason: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'multiple'> {
  options: SelectOption[];
  /** Optional labelled option groups, rendered after the flat `options`. */
  groups?: SelectOptionGroup[];
  /** Shown in the field when no value is selected (never an option). */
  placeholder?: string;
  size?: SelectSize;
  /** Shape. See `SelectVariant`. Default `default`. */
  variant?: SelectVariant;
  /**
   * Semantic tone for `variant="pill"` — the capsule paints in that tone's
   * soft surface (`-bg` / `-fg` / `-border`). Ignored by the other variants.
   * Default `neutral`.
   */
  tone?: ToneOrAlias;
  /** When true, applies a danger-colored border. */
  invalid?: boolean;
  /** Extra classes for the trigger (kept for call sites that styled the old wrapper). */
  wrapperClassName?: string;
  /**
   * @deprecated since 2.445.0 — the field always draws the library chevron.
   * Accepted and ignored so existing call sites compile.
   */
  chevron?: 'native' | 'custom';
  /**
   * Custom content for the closed field (the trigger), e.g. "Priority: [chip]".
   * Receives the selected option (undefined when none). The open list still
   * draws the options themselves. Default: the selected option's icon + label.
   */
  renderValue?: (selected: SelectOption | undefined) => ReactNode;
  /** Render the library `Combobox`: a typed filter over the same options. */
  searchable?: boolean;
  /** Placeholder for the `searchable` filter. Default "Search". */
  searchPlaceholder?: string;
  /**
   * Render the platform `<select>` instead, with the reason it is needed.
   * Marked `data-ui-native-select` / `data-ui-native-reason`.
   */
  native?: SelectNative;
  'data-testid'?: string;
}

const triggerSize: Record<SelectSize, string> = {
  sm: `${CONTROL_HEIGHT.sm} pl-2 pr-1.5 text-xs`,
  md: `${CONTROL_HEIGHT.md} pl-2.5 pr-2 text-sm`,
};
const pillSize: Record<SelectSize, string> = {
  sm: 'h-6 pl-2 pr-1 text-xs',
  md: 'h-7 pl-2.5 pr-1.5 text-xs',
};
const optionText: Record<SelectSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

type FlatOption = SelectOption & { group?: string; index: number };

/** An event-shaped object for `onChange`, so `e.target.value` keeps working. */
function changeEvent(value: string, name: string | undefined, node: HTMLElement | null): ChangeEvent<HTMLSelectElement> {
  const target = { value, name: name ?? '', id: node?.id ?? '' } as unknown as HTMLSelectElement;
  let defaultPrevented = false;
  return {
    target, currentTarget: target, type: 'change', bubbles: true, cancelable: false,
    defaultPrevented: false, eventPhase: 2, isTrusted: true, timeStamp: Date.now(),
    nativeEvent: new Event('change'),
    preventDefault() { defaultPrevented = true; void defaultPrevented; },
    isDefaultPrevented: () => defaultPrevented,
    stopPropagation() {}, isPropagationStopped: () => false, persist() {},
  } as unknown as ChangeEvent<HTMLSelectElement>;
}

function Chevron({ open, className }: { open?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cn('shrink-0', className)}>
      <path d={open ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'} />
    </svg>
  );
}

const VIEWPORT_MARGIN = 8;
const PANEL_GAP = 4;

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
  const {
    options, groups, placeholder, size: requestedSize, variant = 'default', tone = 'neutral', invalid = false,
    disabled = false, className, wrapperClassName, chevron: _chevron, renderValue, searchable, searchPlaceholder, native,
    'data-testid': testId, 'aria-invalid': ariaInvalidProp, value: valueProp, defaultValue, onChange, name,
    id: idProp, onKeyDown: onKeyDownProp, ...rest
  } = props;
  const density = useDensity();
  const size = requestedSize ?? (density === 'compact' ? 'sm' : 'md');
  const ariaInvalid = ariaInvalidProp ?? (invalid || undefined);
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === 'true';
  const uid = useId();
  const id = idProp ?? `${uid}-select`;
  const listId = `${uid}-listbox`;

  const flat = useMemo<FlatOption[]>(() => {
    const out: FlatOption[] = [];
    for (const o of options) out.push({ ...o, index: out.length });
    for (const g of groups ?? []) for (const o of g.options) out.push({ ...o, group: g.label, index: out.length });
    return out;
  }, [options, groups]);

  const [inner, setInner] = useState<string>(() => (defaultValue == null ? '' : String(defaultValue)));
  const value = valueProp == null ? inner : String(valueProp);
  const selected = flat.find((o) => o.value === value);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [position, setPosition] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);
  const typed = useRef({ text: '', at: 0 });
  const isTopLayer = useOverlayLayer(open);

  const commit = useCallback((next: string) => {
    if (valueProp == null) setInner(next);
    if (next !== value) onChange?.(changeEvent(next, name, triggerRef.current));
  }, [valueProp, value, onChange, name]);

  // `fireEvent.change(trigger, { target: { value } })` and any script that
  // sets the trigger's value and dispatches `change` commit that value.
  const commitRef = useRef(commit);
  commitRef.current = commit;
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return undefined;
    const onNativeChange = () => { commitRef.current(el.value); };
    el.addEventListener('change', onNativeChange);
    return () => el.removeEventListener('change', onNativeChange);
  }, [searchable, native]);

  const enabled = (i: number) => i >= 0 && i < flat.length && !flat[i].disabled;
  const step = (from: number, dir: 1 | -1) => {
    for (let i = from + dir; i >= 0 && i < flat.length; i += dir) if (enabled(i)) return i;
    return from;
  };
  const first = () => step(-1, 1);
  const last = () => step(flat.length, -1);

  const openList = (at?: number) => {
    if (disabled || flat.length === 0) return;
    setOpen(true);
    setActive(at ?? (selected && !selected.disabled ? selected.index : first()));
  };
  const close = () => { setOpen(false); setActive(-1); setPosition(null); typed.current = { text: '', at: 0 }; };

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const panelHeight = panelRef.current?.scrollHeight ?? 240;
    const below = vh - r.bottom - PANEL_GAP - VIEWPORT_MARGIN;
    const above = r.top - PANEL_GAP - VIEWPORT_MARGIN;
    const flip = below < Math.min(panelHeight, 240) && above > below;
    const maxHeight = Math.max(96, Math.min(320, flip ? above : below));
    const height = Math.min(panelHeight, maxHeight);
    const width = Math.min(Math.max(r.width, 160), vw - 2 * VIEWPORT_MARGIN);
    const left = Math.min(Math.max(VIEWPORT_MARGIN, r.left), vw - width - VIEWPORT_MARGIN);
    const top = flip ? r.top - PANEL_GAP - height : r.bottom + PANEL_GAP;
    setPosition({ top, left, width, maxHeight });
  }, []);

  useLayoutEffect(() => { if (open) place(); }, [open, place, flat.length]);
  useEffect(() => {
    if (!open) return undefined;
    const onMove = () => place();
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !panelRef.current?.contains(t)) close();
    };
    window.addEventListener('resize', onMove);
    window.addEventListener('scroll', onMove, true);
    document.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('resize', onMove);
      window.removeEventListener('scroll', onMove, true);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open || active < 0) return;
    const el = panelRef.current?.querySelector<HTMLElement>(`[data-option-index="${active}"]`);
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [open, active]);

  const typeAhead = (key: string): number | null => {
    const now = Date.now();
    const text = (now - typed.current.at > 600 ? '' : typed.current.text) + key.toLowerCase();
    typed.current = { text, at: now };
    const start = open && active >= 0 ? active : selected?.index ?? -1;
    const order = [...flat.slice(start + (text.length === 1 ? 1 : 0)), ...flat.slice(0, start + (text.length === 1 ? 1 : 0))];
    const hit = order.find((o) => !o.disabled && o.label.toLowerCase().startsWith(text));
    return hit ? hit.index : null;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownProp?.(e as unknown as KeyboardEvent<HTMLSelectElement>);
    if (e.defaultPrevented || disabled) return;
    const typing = Date.now() - typed.current.at < 600 && typed.current.text.length > 0;
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || (e.key === ' ' && !typing)) {
        e.preventDefault();
        openList(e.key === 'ArrowUp' && !selected ? last() : undefined);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && e.key !== ' ') {
        const hit = typeAhead(e.key);
        if (hit !== null) openList(hit);
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive((i) => step(i, 1)); break;
      case 'ArrowUp':
        e.preventDefault();
        if (e.altKey) { if (enabled(active)) commit(flat[active].value); close(); } else setActive((i) => step(i, -1));
        break;
      case 'Home': case 'PageUp': e.preventDefault(); setActive(first()); break;
      case 'End': case 'PageDown': e.preventDefault(); setActive(last()); break;
      case 'Enter':
        e.preventDefault();
        if (enabled(active)) commit(flat[active].value);
        close();
        break;
      case ' ':
        if (typing) { const hit = typeAhead(' '); if (hit !== null) setActive(hit); e.preventDefault(); break; }
        e.preventDefault();
        if (enabled(active)) commit(flat[active].value);
        close();
        break;
      case 'Tab':
        if (enabled(active)) commit(flat[active].value);
        close();
        break;
      case 'Escape':
        if (isTopLayer()) { e.preventDefault(); e.stopPropagation(); close(); }
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const hit = typeAhead(e.key);
          if (hit !== null) setActive(hit);
        }
    }
  };

  if (searchable) {
    return (
      <Combobox
        id={id}
        size={size}
        value={value}
        onChange={(v) => commit(v)}
        disabled={disabled}
        invalid={isInvalid}
        aria-label={props['aria-label']}
        aria-describedby={props['aria-describedby']}
        aria-required={props['aria-required'] === true || props['aria-required'] === 'true' || undefined}
        placeholder={placeholder ?? searchPlaceholder ?? 'Search'}
        maxOptions={Math.max(8, flat.length)}
        options={flat.map((o) => ({ value: o.value, label: o.label, description: o.description, meta: o.group, disabled: o.disabled }))}
        className={cn(className, wrapperClassName)}
        data-testid={testId}
      />
    );
  }

  if (native) {
    return (
      <select
        id={id}
        name={name}
        disabled={disabled}
        data-testid={testId}
        data-ui-native-select=""
        data-ui-native-reason={native.reason}
        aria-invalid={ariaInvalid}
        value={value}
        onChange={(e) => commit(e.target.value)}
        className={cn(
          'w-full rounded-md border bg-surface-panel text-text-primary font-inherit outline-none',
          'focus:border-info focus:ring-1 focus:ring-info/40 disabled:cursor-not-allowed disabled:opacity-50',
          isInvalid ? 'border-danger' : 'border-border-emphasis',
          triggerSize[size], className,
        )}
        {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        {groups?.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.options.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
          </optgroup>
        ))}
      </select>
    );
  }

  const pill = variant === 'pill';
  const ghost = variant === 'ghost';
  const key = toneKey(tone);
  const shown = selected?.label ?? placeholder ?? '';
  const isPlaceholder = !selected;

  const trigger = (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      ref={triggerRef}
      id={id}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? listId : undefined}
      aria-activedescendant={open && active >= 0 ? `${listId}-opt-${active}` : undefined}
      aria-invalid={ariaInvalid}
      disabled={disabled}
      value={value}
      data-value={value}
      data-testid={testId}
      data-ui-control="select"
      data-variant={variant}
      onClick={(e) => { (rest.onClick as ((ev: unknown) => void) | undefined)?.(e); if (open) close(); else openList(); }}
      onKeyDown={onKeyDown}
      className={cn(
        'inline-flex min-w-0 items-center gap-1.5 text-left font-inherit outline-none transition-colors duration-150 cursor-pointer',
        'disabled:cursor-not-allowed disabled:opacity-50',
        pill
          ? cn(
              'w-auto max-w-full rounded-full border font-semibold capitalize leading-[1.4] focus-visible:ring-1 focus-visible:ring-info/40',
              isInvalid ? 'border-danger text-danger-fg bg-danger-bg' : cn(TONE_BORDER[key], TONE_BG[key], TONE_TEXT[key]),
              pillSize[size],
            )
          : ghost
          ? cn(
              'w-auto max-w-full justify-end rounded-md border border-transparent bg-transparent font-medium text-text-primary',
              'hover:bg-surface-hover focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40',
              isInvalid && 'border-danger',
              triggerSize[size],
            )
          : cn(
              'w-full justify-between rounded-md border bg-surface-panel text-text-primary',
              'focus-visible:bg-surface focus-visible:border-info focus-visible:ring-1 focus-visible:ring-info/40 disabled:bg-surface-hover',
              open && 'border-info ring-1 ring-info/40',
              isInvalid ? 'border-danger focus-visible:border-danger focus-visible:ring-danger/40' : !open && 'border-border-emphasis',
              triggerSize[size],
            ),
        wrapperClassName,
        className,
      )}
    >
      {renderValue ? (
        <span className={cn('inline-flex min-w-0 items-center gap-2', !ghost && !pill && 'flex-1')}>{renderValue(selected)}</span>
      ) : (
        <>
          {selected?.icon && <span aria-hidden="true" className="inline-flex shrink-0">{selected.icon}</span>}
          <span className={cn('min-w-0 truncate', !ghost && !pill && 'flex-1', isPlaceholder && !pill && 'text-text-tertiary')}>
            {shown || ' '}
          </span>
        </>
      )}
      <Chevron open={open} className={pill ? undefined : 'text-text-secondary'} />
    </button>
  );

  let lastGroup: string | undefined;
  const panel = open && typeof document !== 'undefined' ? createPortal(
    <ul
      ref={panelRef}
      id={listId}
      role="listbox"
      // Named by its trigger (the pattern's convention), never by repeating the
      // field's label: a second element named "Move destination" made every
      // getByLabel('Move destination') ambiguous while the list was open.
      aria-labelledby={props['aria-labelledby'] ?? id}
      data-ui-listbox="select"
      data-testid={testId ? `${testId}-listbox` : undefined}
      tabIndex={-1}
      // Runtime-derived position (fixed to the viewport, flipped and clamped
      // so the panel never leaves it): allowlisted in check-static-styles.
      style={position ? { position: 'fixed', top: position.top, left: position.left, width: position.width, maxHeight: position.maxHeight } : { position: 'fixed', visibility: 'hidden' }}
      className="z-[10100] m-0 list-none overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-lg"
    >
      {flat.map((o) => {
        const header = o.group !== undefined && o.group !== lastGroup ? o.group : null;
        lastGroup = o.group;
        const isSel = o.value === value;
        return [
          header !== null && (
            <li key={`g-${o.index}`} role="presentation" className="px-2 pb-0.5 pt-1.5 text-xs font-semibold leading-4 text-text-tertiary">{header}</li>
          ),
          <li
            key={`o-${o.index}`}
            id={`${listId}-opt-${o.index}`}
            role="option"
            aria-selected={isSel}
            aria-disabled={o.disabled || undefined}
            data-ui-option=""
            data-option-index={o.index}
            data-value={o.value}
            onMouseDown={(e) => { e.preventDefault(); if (!o.disabled) { commit(o.value); close(); triggerRef.current?.focus(); } }}
            onMouseEnter={() => { if (!o.disabled) setActive(o.index); }}
            className={cn(
              'flex cursor-pointer select-none items-start gap-2 rounded px-2 py-1.5',
              optionText[size],
              o.index === active ? 'bg-primary-bg text-primary-fg' : 'text-text-primary',
              o.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <span aria-hidden="true" className={cn('mt-0.5 w-3 shrink-0 text-xs', !isSel && 'invisible')}>✓</span>
            {o.icon && <span aria-hidden="true" className="mt-0.5 inline-flex shrink-0">{o.icon}</span>}
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className={cn('truncate leading-5', isSel ? 'font-semibold' : 'font-normal')}>{o.label}</span>
              {o.description && <span className="text-xs font-normal leading-4 text-text-tertiary">{o.description}</span>}
            </span>
          </li>,
        ];
      })}
    </ul>,
    document.body,
  ) : null;

  return (
    <>
      {trigger}
      {name !== undefined && <input type="hidden" name={name} value={value} />}
      {panel}
    </>
  );
});

export default Select;
