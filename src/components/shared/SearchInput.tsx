// SearchInput — text input with magnifier icon and clear button.
//
// Controlled component. Calls onChange('') and optional onClear when the
// clear button is clicked. Replaces inline `<input type="search">` patterns
// used across the portal pages.

import React, { useEffect, useRef, useState } from 'react';
import { CONTROL_HEIGHT } from './controlMetrics';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { SearchIcon } from '../ui/Icons';
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the field paints in. */
export type SearchInputTone = SurfaceTone;

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Called after the value is cleared via the clear button. */
  onClear?: () => void;
  /**
   * Colour family. `surface` (default) follows the host theme; `code` paints
   * in the permanently-dark terminal palette.
   *
   * This prop exists because `className` lands on the WRAPPER — the input is
   * a child, so no caller-supplied class could ever reach the field itself,
   * and a SearchInput dropped into a dark panel stayed a white box.
   */
  tone?: SearchInputTone;
  /** Class for the wrapper. Sizing and positioning; not the field's colours. A collapsed `collapsible` field (the icon) ignores it. */
  className?: string;
  /**
   * `sm` (default) is the 13px field. `md` (2.386.3) is the Documents
   * explorer's: a 36px field, 14px text (15px until 2.407.18 — off the type scale) and an 18px glass. `lg` (2.389.6) is
   * a page's primary search: a 44px field, 16px text, a 20px glass and a
   * larger clear ×.
   */
  size?: 'sm' | 'md' | 'lg';
  /** Keys on the field — e.g. ArrowDown into a result list. Since 2.389.6. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Class for the `<input>` itself — the one `className` cannot reach. */
  inputClassName?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  'aria-label'?: string;
  /**
   * Addresses the `<input>` itself, not the wrapper.
   *
   * Without it a caller who needs to drive this field from a test had no way
   * to name it: `className` lands on the wrapper, and the accessible name is
   * the placeholder, which changes whenever the copy does. The app's document
   * list ended up wrapping SearchInput in a bare div purely to hang a testid
   * on it — a hand-rolled element around a library component, which is the
   * shape this library exists to remove.
   */
  'data-testid'?: string;
  /**
   * Since 2.503.0 — a toolbar search. While collapsed the field is a search
   * `IconButton` (named by `aria-label`/`placeholder`); a click, or the
   * `shortcut` key anywhere outside a text field, expands it and focuses the
   * input. It collapses again on Escape or blur while empty, and never while
   * it holds a value — a filtered list must always show what filters it.
   */
  collapsible?: boolean;
  /** Start expanded (collapsible only). The field still collapses on Escape/blur when empty. */
  defaultExpanded?: boolean;
  /** The key that expands a collapsed field. Default `/`; `false` disables it. */
  shortcut?: string | false;
  /** Told when a collapsible field expands or collapses. */
  onExpandedChange?: (expanded: boolean) => void;
}

/** A key event aimed at something that takes text should never be hijacked by a shortcut. */
function isEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  return el.isContentEditable || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT';
}

const TONE = {
  surface: {
    icon: 'text-[var(--color-text-tertiary)]',
    field:
      'border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]',
    clear:
      'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
  },
  code: {
    icon: 'text-code-muted',
    field:
      'border-code-border bg-code-surface text-code-text placeholder:text-code-muted focus:ring-code-blue focus:border-code-blue',
    clear: 'text-code-muted hover:text-code-text hover:bg-code-raised',
  },
} as const;

function SearchInput({
  value,
  onChange,
  placeholder,
  onClear,
  tone = 'surface',
  className,
  inputClassName,
  size = 'sm',
  onKeyDown,
  style,
  autoFocus,
  'aria-label': ariaLabel,
  'data-testid': testId,
  collapsible = false,
  defaultExpanded = false,
  shortcut = '/',
  onExpandedChange,
}: SearchInputProps) {
  const palette = TONE[tone] ?? TONE.surface;
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(defaultExpanded);
  // A value keeps the field open no matter what: a collapsed icon cannot say
  // that the list under it is filtered.
  const expanded = !collapsible || open || value !== '';
  const focusOnOpen = useRef(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const focusToggle = useRef(false);
  const setExpanded = (next: boolean, focus = false) => {
    focusOnOpen.current = focus;
    if (next !== open) { setOpen(next); onExpandedChange?.(next); }
    else if (next && focus) inputRef.current?.focus();
  };

  // A field that has held a value stays open after it is cleared, until the
  // user leaves it — clearing is not a request to fold the field away.
  useEffect(() => { if (collapsible && value !== '' && !open) setOpen(true); }, [collapsible, value, open]);

  useEffect(() => {
    if (expanded && focusOnOpen.current) { focusOnOpen.current = false; inputRef.current?.focus(); }
    // Escape folds the field under the keyboard user's focus; hand focus to
    // the icon that replaced it rather than dropping it on <body>.
    if (!expanded && focusToggle.current) { focusToggle.current = false; toggleRef.current?.focus(); }
  }, [expanded]);

  useEffect(() => {
    if (!collapsible || expanded || shortcut === false) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== shortcut || event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      setExpanded(true, true);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const label = ariaLabel ?? placeholder ?? 'Search';
  if (!expanded) {
    return (
      <IconButton
        ref={toggleRef}
        aria-label={label}
        aria-expanded={false}
        aria-keyshortcuts={shortcut === false ? undefined : shortcut}
        title={shortcut === false ? label : `${label} (${shortcut})`}
        icon={<SearchIcon />}
        size={size}
        tone={tone}
        // `className` sizes the open field (a toolbar passes `w-56`); the
        // folded icon keeps its own square, or it sat in a 224px-wide gap.
        data-search-collapsed=""
        data-testid={testId ? `${testId}-toggle` : undefined}
        onClick={() => setExpanded(true, true)}
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={cn('relative inline-flex items-center', className)}
      style={style}
      data-search-collapsible={collapsible ? '' : undefined}
      onBlur={collapsible ? (event) => {
        if (wrapperRef.current?.contains(event.relatedTarget as Node | null)) return;
        if (value === '') setExpanded(false);
      } : undefined}
    >
      {/* Search icon — absolutely positioned inside the input gutter. */}
      <svg
        className={cn('absolute pointer-events-none', size === 'lg' ? 'left-4 h-5 w-5' : size === 'md' ? 'left-3 h-[18px] w-[18px]' : 'left-3 w-3.5 h-3.5', palette.icon)}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="7"
          cy="7"
          r="4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10.5 10.5L14 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        ref={inputRef}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (collapsible && !event.defaultPrevented && event.key === 'Escape' && value === '') {
            event.preventDefault();
            focusToggle.current = true;
            setExpanded(false);
          }
        }}
        placeholder={placeholder ?? 'Search…'}
        autoFocus={autoFocus}
        // A placeholder is only a LAST-RESORT accessible name, and it is gone
        // the moment the user types — so a search box mid-query announced as a
        // bare "edit text". Mirroring the placeholder keeps the spoken name
        // identical to the words the user saw, instead of inventing a second
        // wording that can drift from it.
        aria-label={label}
        data-testid={testId}
        className={cn(
          'w-full border focus:outline-none focus:ring-2 transition-colors',
          size === 'lg' ? `${CONTROL_HEIGHT.lg} pl-12 pr-11 text-sm rounded-lg` : size === 'md' ? `${CONTROL_HEIGHT.md} pl-10 pr-7 text-sm rounded-md` : `${CONTROL_HEIGHT.sm} pl-8 pr-7 text-xs rounded-md`,
          palette.field,
          inputClassName,
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
            // Back to the field, so the next blur (not this click) decides
            // whether a collapsible search folds away.
            if (collapsible) inputRef.current?.focus();
          }}
          className={cn('absolute rounded', size === 'lg' ? 'right-3 p-1' : 'right-2 p-0.5', palette.clear)}
          aria-label="Clear search"
        >
          <svg width={size === 'lg' ? 16 : 12} height={size === 'lg' ? 16 : 12} viewBox="0 0 12 12" fill="none">
            <path
              d="M2 2l8 8M10 2l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export { SearchInput };
export default SearchInput;
