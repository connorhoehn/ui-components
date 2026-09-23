// src/components/forms/InlineEditableText.tsx
//
// Text that reads as text until it is clicked, then edits in place.
//
// For a value that belongs in a header line rather than a form — a deck's
// title, a board's name. A labelled `<Input>` in a header turns the header
// into a form, and a form is what people fill in; this keeps the value looking
// like what it is (a title) and makes editing it one click away.
//
// Enter or blur commits; Escape puts the old value back. Only a changed value
// is committed, and an empty one is refused when `required` — a title that
// was cleared by accident should not be the title.

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { Input, type InputSize } from './Input';

export interface InlineEditableTextProps {
  value: string;
  /** Called once per edit, with the committed value (trimmed). */
  onCommit: (value: string) => void;
  /** Accessible name, used as the edit button's and the input's label. */
  label: string;
  /** Shown in place of an empty value, and in the empty input. */
  placeholder?: string;
  maxLength?: number;
  /** An empty value is refused (the old one comes back). Default false. */
  required?: boolean;
  disabled?: boolean;
  size?: InputSize;
  /** `'title'` reads as a heading; `'muted'` as secondary text. */
  tone?: 'title' | 'muted';
  className?: string;
  'data-testid'?: string;
}

const TONE: Record<'title' | 'muted', string> = {
  title: 'text-[14px] font-semibold text-text-primary',
  muted: 'text-[12px] text-text-secondary',
};

export function InlineEditableText({
  value,
  onCommit,
  label,
  placeholder,
  maxLength,
  required = false,
  disabled = false,
  size = 'sm',
  tone = 'title',
  className,
  'data-testid': testId = 'inline-editable-text',
}: InlineEditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const next = draft.trim();
    if (required && !next) { setDraft(value); return; }
    if (next !== value) onCommit(next);
  };

  if (editing) {
    return (
      <Input
        ref={inputRef}
        size={size}
        value={draft}
        aria-label={label}
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') { event.preventDefault(); commit(); }
          if (event.key === 'Escape') { event.preventDefault(); setDraft(value); setEditing(false); }
        }}
        className={cn('min-w-0', className)}
        data-testid={`${testId}-input`}
      />
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setEditing(true)}
      aria-label={`${label}: ${value || placeholder || 'empty'}. Click to edit.`}
      title="Click to edit"
      data-testid={testId}
      className={cn(
        'min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]',
        'hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent',
        TONE[tone],
        !value && 'italic text-text-tertiary',
        className,
      )}
    >
      {value || placeholder}
    </button>
  );
}

export default InlineEditableText;
