// ComposerConfirmFlow (2.482.0) — draft → review → done, all inside the one
// response box. No modal, no backdrop, no navigation, no rich-text toolbar.
//
//   ✓ Choose → ② Draft request → ③ Confirm → ④ Done
//   Request more budget                    To Sienna Garcia · ORG-OBS-11
//   Message
//   ┌──────────────────────────────────────────────────────────────────┐
//   │ Sienna, please grant Nora a sprint envelope for ORG-OBS-11…      │
//   └──────────────────────────────────────────────────────────────────┘
//   [Continue] [Back]   Enter to continue · Shift+Enter for a new line
//
// Draft: a prefilled, editable message (`Textarea`) with the title and the
// recipient line; focus lands in the editor and number keys type normally.
// Enter continues to review, Shift+Enter is a newline, an empty message
// cannot advance. Review replaces the editor with the message as edited plus
// Confirm / Back: Enter or Confirm confirms, Escape or Back returns to the
// retained draft. A held Enter (`repeat`) never crosses a stage, and an IME
// composition never confirms. Confirm calls the async `onConfirm(message)`;
// the flow is busy until it resolves, shows "Done" only when it resolved ok,
// and otherwise shows the error inline and stays on review. Done is a heading,
// a status line (the receipt) and one back action.
//
// `ComposerPromptDeck` draws this for a `kind: 'compose'` prompt; a page may
// also use it on its own. Markers: `data-composer-confirm-flow` (the stage) on
// the root, `data-composer-readonly-allow` on the non-mutating buttons.

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Inline, Stack } from '../ui/Stack';
import { Textarea } from '../forms/Textarea';
import { DecisionPath, type DecisionPathState } from '../shared/DecisionPath';
import FormField from '../shared/FormField';
import { Text } from '../shared/Text';

export type ComposerConfirmStage = 'draft' | 'review' | 'done';

/**
 * What `onConfirm` resolves to. Nothing or `{ receipt }`: confirmed — the done
 * stage shows (the receipt as its status line). `{ error }`: not confirmed —
 * the error shows inline and the flow stays on review with the message intact.
 */
export type ComposerConfirmResult = void | undefined | { error: string } | { receipt: string };

export interface ComposerConfirmFlowProps {
  /** The draft's heading ("Request more budget"). Omit when the frame around the flow already names it. */
  title?: string;
  /** "To Sienna Garcia · ORG-OBS-11", shown beside the heading in every stage. */
  recipient?: string;
  /** Uncontrolled: the prefilled message. */
  defaultMessage?: string;
  /** Controlled: the message and its change handler (a host that keeps the draft across its own view switches). */
  message?: string;
  onMessageChange?: (message: string) => void;
  /** The editor's label. Default "Message". */
  messageLabel?: string;
  placeholder?: string;
  /** The review stage's heading ("Confirm budget request"). Default: `title`. */
  reviewTitle?: string;
  /** A small line under the review ("Nothing is sent until you confirm."). */
  note?: ReactNode;
  /** The done stage's heading. Default "Done". */
  doneTitle?: string;
  /** The done stage's status line when `onConfirm` gives no receipt. Default "Confirmed." */
  doneMessage?: string;
  /** Button labels. Defaults: Continue / Confirm / Back / Back. */
  continueLabel?: string;
  confirmLabel?: string;
  backLabel?: string;
  doneActionLabel?: string;
  /** Called with the message as edited. Done shows only after this resolves without an error. */
  onConfirm: (message: string) => ComposerConfirmResult | Promise<ComposerConfirmResult>;
  /** Back from the draft. Without it the draft offers no Back. */
  onCancel?: () => void;
  /** The done stage's action. Without it the done stage offers none. */
  onDone?: () => void;
  onStageChange?: (stage: ComposerConfirmStage) => void;
  /**
   * The decision path above the flow, `current` at the drafting step; review
   * and done advance it by one and two.
   */
  path?: DecisionPathState;
  /** Focus the editor on mount. Default true: the flow replaces the choices that were just answered. */
  autoFocus?: boolean;
  className?: string;
  'data-testid'?: string;
}

function isError(result: ComposerConfirmResult): result is { error: string } {
  return !!result && typeof result === 'object' && 'error' in result && typeof result.error === 'string';
}

function plainEnter(event: KeyboardEvent): boolean {
  return event.key === 'Enter' && !event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey;
}

const STAGE_OFFSET: Record<ComposerConfirmStage, number> = { draft: 0, review: 1, done: 2 };

export function ComposerConfirmFlow({
  title,
  recipient,
  defaultMessage = '',
  message: messageProp,
  onMessageChange,
  messageLabel = 'Message',
  placeholder,
  reviewTitle,
  note,
  doneTitle = 'Done',
  doneMessage = 'Confirmed.',
  continueLabel = 'Continue',
  confirmLabel = 'Confirm',
  backLabel = 'Back',
  doneActionLabel = 'Back',
  onConfirm,
  onCancel,
  onDone,
  onStageChange,
  path,
  autoFocus = true,
  className,
  'data-testid': testId = 'composer-confirm-flow',
}: ComposerConfirmFlowProps) {
  const [ownMessage, setOwnMessage] = useState(defaultMessage);
  const controlled = messageProp !== undefined;
  const message = controlled ? messageProp : ownMessage;
  const setMessage = useCallback((next: string) => {
    if (!controlled) setOwnMessage(next);
    onMessageChange?.(next);
  }, [controlled, onMessageChange]);

  const [stage, setStage] = useState<ComposerConfirmStage>('draft');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);
  const pending = useRef(false);
  const editor = useRef<HTMLTextAreaElement>(null);
  const review = useRef<HTMLElement>(null);
  const done = useRef<HTMLElement>(null);
  const baseId = useId();
  const canContinue = message.trim().length > 0;

  const go = useCallback((next: ComposerConfirmStage) => {
    setStage(next);
    onStageChange?.(next);
  }, [onStageChange]);

  // Focus follows the stage: the editor, the review region (so Enter / Esc
  // land on it), the done region (so the result is announced).
  const mounted = useRef(false);
  useEffect(() => {
    const first = !mounted.current;
    mounted.current = true;
    if (first && !autoFocus) return;
    const target = stage === 'draft' ? editor.current : stage === 'review' ? review.current : done.current;
    target?.focus({ preventScroll: true });
  }, [stage, autoFocus]);

  const toReview = useCallback(() => {
    if (!canContinue) return;
    setError(null);
    go('review');
  }, [canContinue, go]);

  const confirm = useCallback(async () => {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError(null);
    let result: ComposerConfirmResult;
    try {
      result = await onConfirm(message);
    } catch (err) {
      result = { error: err instanceof Error && err.message ? err.message : 'That could not be confirmed. Try again.' };
    } finally {
      pending.current = false;
      setBusy(false);
    }
    if (isError(result)) {
      setError(result.error);
      return;
    }
    setReceipt(result && 'receipt' in result ? result.receipt : null);
    go('done');
  }, [message, onConfirm, go]);

  const heading = stage === 'review' ? reviewTitle ?? title : stage === 'done' ? doneTitle : title;
  const headingId = `${baseId}-heading`;
  const keysId = `${baseId}-keys`;
  const headRow = (heading || recipient) ? (
    <Inline gap="sm" align="baseline" wrap className="min-w-0">
      {heading && <Text as="p" size="sm" weight="semibold" tone="primary" id={headingId} className="min-w-0">{heading}</Text>}
      {recipient && <Text as="p" size="xs" tone="secondary" wrap className="min-w-0" data-testid={`${testId}-recipient`}>{recipient}</Text>}
    </Inline>
  ) : null;
  const pathRow = path ? <DecisionPath steps={path.steps} current={path.current + STAGE_OFFSET[stage]} data-testid={`${testId}-path`} /> : null;

  if (stage === 'done') {
    return (
      <Stack gap="xs" className={cn('min-w-0', className)} data-composer-confirm-flow="done" data-testid={testId}>
        {pathRow}
        <Stack as="section" gap="xs" ref={done} tabIndex={-1} role="status" aria-labelledby={heading ? headingId : undefined} className="min-w-0 outline-none" data-testid={`${testId}-done`}>
          {headRow}
          <Text as="p" size="xs" tone="secondary" wrap className="min-w-0" data-testid={`${testId}-done-message`}>{receipt ?? doneMessage}</Text>
          {onDone && (
            <Inline gap="sm" align="center" wrap className="min-w-0">
              <Button size="sm" variant="ghost" onClick={onDone} data-composer-readonly-allow="Leaves the confirmed result without changing a record or submitting an answer" data-testid={`${testId}-done-action`}>{doneActionLabel}</Button>
            </Inline>
          )}
        </Stack>
      </Stack>
    );
  }

  if (stage === 'review') {
    return (
      <Stack gap="xs" className={cn('min-w-0', className)} data-composer-confirm-flow="review" data-testid={testId}>
        {pathRow}
        <Stack
          as="section"
          gap="xs"
          ref={review}
          tabIndex={-1}
          role="group"
          aria-labelledby={heading ? headingId : undefined}
          aria-describedby={keysId}
          aria-busy={busy || undefined}
          className="min-w-0 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-info/40"
          data-testid={`${testId}-review`}
          onKeyDownCapture={(event) => {
            // A held key or an IME commit never confirms: swallow it before
            // the region or a focused button can act on it.
            if (event.key === 'Enter' && (event.repeat || event.nativeEvent.isComposing)) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onKeyDown={(event) => {
            if (event.defaultPrevented || busy) return;
            if (event.key === 'Escape') {
              event.preventDefault();
              event.stopPropagation();
              go('draft');
            } else if (plainEnter(event) && event.target === event.currentTarget) {
              event.preventDefault();
              event.stopPropagation();
              void confirm();
            }
          }}
        >
          {headRow}
          <Text as="p" size="sm" tone="primary" wrap className="min-w-0 whitespace-pre-wrap break-words" data-testid={`${testId}-message`}>{message}</Text>
          <Inline gap="sm" align="center" wrap className="min-w-0">
            <Button size="sm" variant="primary" disabled={busy} onClick={() => { void confirm(); }} aria-keyshortcuts="Enter" data-testid={`${testId}-confirm`}>{confirmLabel}</Button>
            <Button size="sm" variant="ghost" disabled={busy} onClick={() => go('draft')} aria-keyshortcuts="Escape" data-composer-readonly-allow="Returns to the retained draft without changing a record or submitting an answer" data-testid={`${testId}-back`}>{backLabel}</Button>
            <Text size="xs" tone="tertiary" wrap id={keysId} className="min-w-0" data-testid={`${testId}-keys`}>Enter to confirm · Esc to edit</Text>
          </Inline>
          {error && <Text as="p" size="xs" wrap role="alert" className="min-w-0 text-danger-fg" data-testid={`${testId}-error`}>{error}</Text>}
          {busy && <Text as="p" size="xs" tone="secondary" role="status" data-testid={`${testId}-busy`}>Working…</Text>}
          {note && <Text as="p" size="xs" tone="secondary" wrap className="min-w-0" data-testid={`${testId}-note`}>{note}</Text>}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack gap="xs" className={cn('min-w-0', className)} data-composer-confirm-flow="draft" data-testid={testId}>
      {pathRow}
      <Stack as="form" gap="xs" className="min-w-0" onSubmit={(event) => { event.preventDefault(); toReview(); }} aria-labelledby={heading ? headingId : undefined} data-testid={`${testId}-draft`}>
        {headRow}
        <FormField label={messageLabel}>
          {(wiring) => (
            <Textarea
              {...wiring}
              ref={editor}
              aria-describedby={[wiring['aria-describedby'], keysId].filter(Boolean).join(' ')}
              autoResize
              minRows={2}
              maxRows={8}
              value={message}
              placeholder={placeholder}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (!plainEnter(event)) return;
                // An IME commit is the editor's: let it land, advance nothing.
                if (event.nativeEvent.isComposing) return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) toReview();
              }}
              data-testid={`${testId}-editor`}
            />
          )}
        </FormField>
        <Inline gap="sm" align="center" wrap className="min-w-0">
          <Button size="sm" type="submit" variant="primary" disabled={!canContinue} aria-keyshortcuts="Enter" data-composer-readonly-allow="Moves the draft to its review without changing a record or submitting an answer" data-testid={`${testId}-continue`}>{continueLabel}</Button>
          {onCancel && <Button size="sm" type="button" variant="ghost" onClick={onCancel} data-composer-readonly-allow="Leaves the draft without changing a record or submitting an answer" data-testid={`${testId}-cancel`}>{backLabel}</Button>}
          <Text size="xs" tone="tertiary" wrap id={keysId} className="min-w-0" data-testid={`${testId}-keys`}>Enter to continue · Shift+Enter for a new line</Text>
        </Inline>
      </Stack>
    </Stack>
  );
}

export default ComposerConfirmFlow;
