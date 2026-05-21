// SearchInput — text input with magnifier icon and clear button.
//
// Controlled component. Calls onChange('') and optional onClear when the
// clear button is clicked. Replaces inline `<input type="search">` patterns
// used across the portal pages.

import React from 'react';
import { cn } from '../../lib/cn';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Called after the value is cleared via the clear button. */
  onClear?: () => void;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  'aria-label'?: string;
}

function SearchInput({
  value,
  onChange,
  placeholder,
  onClear,
  className,
  style,
  autoFocus,
  'aria-label': ariaLabel,
}: SearchInputProps) {
  return (
    <div
      className={cn('relative inline-flex items-center', className)}
      style={style}
    >
      {/* Search icon — absolutely positioned inside the input gutter. */}
      <svg
        className="absolute left-3 w-3.5 h-3.5 text-[var(--color-text-tertiary)] pointer-events-none"
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
        aria-label={ariaLabel}
        className="w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute right-2 p-0.5 rounded text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
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
