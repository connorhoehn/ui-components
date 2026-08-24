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
  /**
   * Accessible name for the message field (default "Message").
   *
   * The field is rendered internally, so a host has no way to wrap it in its
   * own `<label>`; without this it had no accessible name at all and announced
   * as a bare "edit text". A `placeholder` is not a substitute — browsers only
   * fall back to it, and it is gone the moment the user types.
   */
  'aria-label'?: string;
  /** Id of an existing visible element naming the field; wins over `aria-label`. */
  'aria-labelledby'?: string;
  /**
   * Accessible name for the send button. Only applied when `submitLabel` has
   * no readable text of its own — the default `'→'` and any icon node. When
   * `submitLabel` IS words ("Send", "Post"), that visible text is the name and
   * this is ignored, so the spoken name can never contradict what is on screen.
   */
  submitAriaLabel?: string;
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
  'aria-label': ariaLabel = 'Message',
  'aria-labelledby': ariaLabelledBy,
  submitAriaLabel = 'Send',
}: ChatComposerProps) {
  const canSubmit = !disabled && value.trim().length > 0;

  // A submitLabel that is words names the button by itself; only a glyph or an
  // icon node needs the override.
  const submitHasText = typeof submitLabel === 'string' && /\p{L}|\p{N}/u.test(submitLabel);
  const submitName = submitHasText ? undefined : submitAriaLabel;
  // aria-labelledby wins over aria-label, so don't emit both.
  const fieldName = ariaLabelledBy ? undefined : ariaLabel;

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
          aria-label={fieldName}
          aria-labelledby={ariaLabelledBy}
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
          aria-label={fieldName}
          aria-labelledby={ariaLabelledBy}
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
        aria-label={submitName}
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
