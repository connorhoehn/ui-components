// src/components/shared/ConfirmButton.tsx
//
// A button that asks before it acts — in place. Pressed, it swaps (same spot,
// same height) for "<question?> [Confirm] [Cancel]": an inline group named by
// the question. Confirm (or Enter, since focus lands on it) fires `onConfirm`;
// Cancel or Escape puts the button back and returns focus to it, and so does
// focus leaving the group.
//
// This is the decision control for a row or a panel. A modal is never the
// right place for a row's own decision: it hides the row being decided about,
// takes the page's focus and asks the reader to re-find their place after.
// `ConfirmDialog` stays for a decision that needs a body or a preview.
//
// `data-confirm-state` reads `idle` / `asking` / `busy`. Busy is the `busy`
// prop, or the promise `onConfirm` returned while it is pending: the button
// shows disabled with `aria-busy`, then returns to idle.

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from '../ui/Button';
import { cn } from '../../lib/cn';

export interface ConfirmButtonProps {
  /** The idle button's label — "Cancel run", "Delete". */
  label: ReactNode;
  /** What the reader is asked; short, ends with "?" — "Cancel this run?". Also the group's accessible name. */
  question: string;
  /** The confirming button's label. Default "Confirm". */
  confirmLabel?: string;
  /** The button that backs out. Default "Cancel". */
  cancelLabel?: string;
  /** `destructive` paints the confirming button `danger-solid`; `default` (default) paints it `primary`. */
  tone?: 'default' | 'destructive';
  /** The idle button's variant. Default `secondary` (`danger` when `tone="destructive"`). */
  variant?: ButtonVariant;
  /** Every button's size, idle and asking. Default `sm`. */
  size?: ButtonSize;
  disabled?: boolean;
  /** The host's own pending state: the button shows disabled and `aria-busy`. */
  busy?: boolean;
  /** Fired on Confirm. A returned promise keeps the control busy until it settles. */
  onConfirm: () => void | Promise<unknown>;
  className?: string;
  'data-testid'?: string;
}

type Phase = 'idle' | 'asking';

export function ConfirmButton({
  label,
  question,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  variant,
  size = 'sm',
  disabled = false,
  busy = false,
  onConfirm,
  className,
  'data-testid': testId = 'confirm-button',
}: ConfirmButtonProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [pending, setPending] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const confirm = useRef<HTMLButtonElement>(null);
  /** Where focus goes after the next render: into the question, or back to the button. */
  const focusNext = useRef<'confirm' | 'trigger' | null>(null);
  const live = useRef(true);
  useEffect(() => {
    live.current = true;
    return () => { live.current = false; };
  }, []);

  useEffect(() => {
    const target = focusNext.current === 'confirm' ? confirm.current : focusNext.current === 'trigger' ? trigger.current : null;
    focusNext.current = null;
    target?.focus();
  });

  const isBusy = busy || pending;
  const state = isBusy ? 'busy' : phase;
  const restore = (refocus: boolean) => {
    focusNext.current = refocus ? 'trigger' : null;
    setPhase('idle');
  };

  const fire = () => {
    focusNext.current = 'trigger';
    setPhase('idle');
    const result: unknown = onConfirm();
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      setPending(true);
      void (result as Promise<unknown>).then(
        () => { if (live.current) setPending(false); },
        () => { if (live.current) setPending(false); },
      );
    }
  };

  if (phase === 'asking' && !isBusy && !disabled) {
    const onKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        restore(true);
      }
    };
    const onBlur = (event: FocusEvent<HTMLSpanElement>) => {
      const next = event.relatedTarget as Node | null;
      if (next && !event.currentTarget.contains(next)) restore(false);
    };
    return (
      <span
        role="group"
        aria-label={question}
        data-ui-confirm-button=""
        data-confirm-state="asking"
        data-testid={testId}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={cn('inline-flex max-w-full items-center gap-1.5', className)}
      >
        <span data-ui-part="" aria-hidden="true" className={cn('truncate text-text-secondary', size === 'sm' ? 'text-xs' : 'text-sm')}>
          {question}
        </span>
        <Button
          ref={confirm}
          size={size}
          variant={tone === 'destructive' ? 'danger-solid' : 'primary'}
          onClick={fire}
          data-testid={`${testId}-confirm`}
        >
          {confirmLabel}
        </Button>
        <Button size={size} variant="ghost" onClick={() => restore(true)} data-testid={`${testId}-cancel`}>
          {cancelLabel}
        </Button>
      </span>
    );
  }

  return (
    <Button
      ref={trigger}
      size={size}
      variant={variant ?? (tone === 'destructive' ? 'danger' : 'secondary')}
      disabled={disabled || isBusy}
      aria-busy={isBusy || undefined}
      data-ui-confirm-button=""
      data-confirm-state={state}
      data-testid={testId}
      className={className}
      onClick={() => {
        focusNext.current = 'confirm';
        setPhase('asking');
      }}
    >
      {label}
    </Button>
  );
}

export default ConfirmButton;
