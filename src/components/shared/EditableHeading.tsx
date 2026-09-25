// ui-components/src/components/shared/EditableHeading.tsx
//
// A heading you can rename in place: the text with a pencil beside it; the
// pencil (or a click on the text) swaps in an input. Enter or blur commits,
// Escape reverts, and an empty commit reverts to the last value rather than
// saving a blank title. The start-a-call drawer's "Auth architecture review ✎"
// is the first caller; any titled thing a person may rename (a call, a board,
// a saved view) is the same control.

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { EditIcon } from '../ui/Icons';
import { IconButton } from '../ui/IconButton';

export interface EditableHeadingProps {
  value: string;
  /** Called with the trimmed new value. Not called when it is empty or unchanged. */
  onCommit: (next: string) => void;
  /** Shown while editing an empty input. */
  placeholder?: string;
  /** `md` = 16px (drawer title), `lg` = 20px. Default `md`. */
  size?: 'md' | 'lg';
  /** Render as plain text with no pencil (someone who may not rename it). */
  readOnly?: boolean;
  /** Accessible name of the pencil button. Default `Rename`. */
  editLabel?: string;
  className?: string;
  'data-testid'?: string;
}

const SIZE = {
  md: 'text-base',
  lg: 'text-xl',
} as const;

export function EditableHeading({
  value,
  onCommit,
  placeholder,
  size = 'md',
  readOnly = false,
  editLabel = 'Rename',
  className,
  'data-testid': testId = 'editable-heading',
}: EditableHeadingProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    const next = draft.trim();
    setEditing(false);
    if (!next || next === value) {
      setDraft(value);
      return;
    }
    onCommit(next);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setDraft(value);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        placeholder={placeholder}
        aria-label={editLabel}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={onKeyDown}
        data-testid={testId}
        data-editing="true"
        className={cn(
          'w-full min-w-0 rounded-md border border-border-field bg-surface px-2 py-1 font-semibold text-text-primary outline-none',
          'focus:border-primary focus:ring-2 focus:ring-primary/20',
          SIZE[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn('flex min-w-0 items-center gap-1.5', className)}
      data-testid={testId}
      data-editing="false"
    >
      <span
        className={cn('min-w-0 truncate font-semibold text-text-primary', SIZE[size], !readOnly && 'cursor-text')}
        onClick={readOnly ? undefined : () => setEditing(true)}
        title={value}
      >
        {value || placeholder}
      </span>
      {!readOnly && (
        <IconButton
          aria-label={editLabel}
          title={editLabel}
          size="sm"
          onClick={() => setEditing(true)}
          data-testid={`${testId}-edit`}
          className="shrink-0 text-text-secondary hover:text-text-primary"
          icon={<EditIcon size={15} />}
        />
      )}
    </div>
  );
}

export default EditableHeading;
