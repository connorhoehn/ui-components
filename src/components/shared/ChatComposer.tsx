import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  /** false: single-line input, true: textarea (default false) */
  multiline?: boolean;
  placeholder?: string;
  /** default '→' */
  submitLabel?: string | ReactNode;
  className?: string;
  style?: CSSProperties;
  autoFocus?: boolean;
  /** for multiline, max rows before scroll (default 4) */
  maxRows?: number;
}

/**
 * Chat input with send button. Stateless — value/onChange controlled by parent.
 *
 * - Enter submits (Shift+Enter inserts newline in multiline mode).
 * - Submit disabled when `disabled` or value is empty/whitespace.
 */
export function ChatComposer({
  value,
  onChange,
  onSubmit,
  disabled = false,
  multiline = false,
  placeholder,
  submitLabel = '→',
  className,
  style,
  autoFocus,
  maxRows = 4,
}: ChatComposerProps) {
  const canSubmit = !disabled && value.trim().length > 0;

  const handleSubmit = () => {
    if (canSubmit) onSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (multiline && e.shiftKey) return; // allow newline
      e.preventDefault();
      handleSubmit();
    }
  };

  const fieldBase = cn(
    'flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--color-border-field,#d1d5db)] bg-white text-[var(--color-text-primary)]',
    'placeholder:text-[var(--color-text-tertiary)]',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent',
    'resize-none',
    disabled && 'opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]',
  );

  return (
    <div
      className={cn(
        'flex items-end gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]',
        className,
      )}
      style={style}
    >
      {multiline ? (
        <textarea
          className={fieldBase}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          rows={2}
          style={{ maxHeight: `${maxRows * 1.5 + 1}rem`, overflowY: 'auto' }}
        />
      ) : (
        <input
          type="text"
          className={fieldBase}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      )}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={cn(
          'px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0',
          canSubmit
            ? 'bg-[var(--color-primary)] text-white hover:opacity-90'
            : 'bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] cursor-not-allowed',
        )}
      >
        {submitLabel}
      </button>
    </div>
  );
}
