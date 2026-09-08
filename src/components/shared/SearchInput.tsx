// SearchInput — text input with magnifier icon and clear button.
//
// Controlled component. Calls onChange('') and optional onClear when the
// clear button is clicked. Replaces inline `<input type="search">` patterns
// used across the portal pages.

import React from 'react';
import { cn } from '../../lib/cn';
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
  /** Class for the wrapper. Sizing and positioning; not the field's colours. */
  className?: string;
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
  style,
  autoFocus,
  'aria-label': ariaLabel,
  'data-testid': testId,
}: SearchInputProps) {
  const palette = TONE[tone] ?? TONE.surface;
  return (
    <div
      className={cn('relative inline-flex items-center', className)}
      style={style}
    >
      {/* Search icon — absolutely positioned inside the input gutter. */}
      <svg
        className={cn('absolute left-3 w-3.5 h-3.5 pointer-events-none', palette.icon)}
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
        placeholder={placeholder ?? 'Search…'}
        autoFocus={autoFocus}
        // A placeholder is only a LAST-RESORT accessible name, and it is gone
        // the moment the user types — so a search box mid-query announced as a
        // bare "edit text". Mirroring the placeholder keeps the spoken name
        // identical to the words the user saw, instead of inventing a second
        // wording that can drift from it.
        aria-label={ariaLabel ?? placeholder ?? 'Search'}
        data-testid={testId}
        className={cn(
          'w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors',
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
          }}
          className={cn('absolute right-2 p-0.5 rounded', palette.clear)}
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
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
