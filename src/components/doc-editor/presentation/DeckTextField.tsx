// DeckTextField — a slide title or bullet with emphasis (since 2.550.0).
//
// An ordinary `Input` over the field's text, and under it, while the field (or
// its toolbar) has focus, an `EmphasisToolbar`: select words, then press
// Highlight, Accent, Bold, Underline, Outline or Gradient to make them runs
// (`{ text, emphasis }`), or Plain to clear them. The toolbar is a
// `RovingToolbar` — one tab stop, arrow keys inside it — so a keyboard user
// selects with Shift+arrows, presses Tab once, and moves along the group. The
// buttons read the input's selection when pressed (a selection survives the
// field losing focus) and keep the mouse from stealing it.
//
// A plain string stays a string until emphasis is applied, and runs whose
// emphasis is all cleared become a string again (`applyEmphasis`). Typing
// keeps the runs around the edit (`editDeckText`). When the text has runs, a
// one-line preview under the field shows them styled, since an `<input>` can
// only show plain text.

import { forwardRef, useCallback, useRef, useState, type FocusEvent, type InputHTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { Input } from '../../forms/Input';
import { RovingToolbar } from '../../shared/RovingToolbar';
import { Text } from '../../shared/Text';
import { DECK_EMPHASES, type DeckEmphasis, type DeckText } from './deckSpec';
import { applyEmphasis, deckTextValue, editDeckText, emphasisAt } from './deckText';

/** Plain names for the emphases, in the toolbar's order. */
export const DECK_EMPHASIS_LABELS: Record<DeckEmphasis, string> = {
  highlight: 'Highlight',
  accent: 'Accent',
  bold: 'Bold',
  underline: 'Underline',
  outline: 'Outline',
  gradient: 'Gradient',
};

/** How each emphasis reads in the editor's preview (the engine paints the real thing). */
const EMPHASIS_CLASS: Record<DeckEmphasis, string> = {
  highlight: 'rounded-sm bg-primary/20 px-0.5',
  accent: 'text-primary',
  bold: 'font-semibold',
  underline: 'underline underline-offset-2',
  outline: 'font-semibold text-transparent [-webkit-text-stroke:1px_var(--color-text-primary)]',
  gradient: 'bg-gradient-to-r from-primary to-accent bg-clip-text font-semibold text-transparent',
};

export interface EmphasisToolbarProps {
  /** The emphasis the current selection has: pressed on that button. `'mixed'` or undefined presses none. */
  active?: DeckEmphasis | 'mixed';
  /** Called with the emphasis pressed, or `null` for Plain. */
  onApply: (emphasis: DeckEmphasis | null) => void;
  /** Off while there is no selection to apply to. */
  disabled?: boolean;
  /** The group's accessible name. Default "Text emphasis". */
  label?: string;
  className?: string;
  /** Test-id prefix; buttons are `<prefix>-<emphasis>` and `<prefix>-plain`. */
  testIdPrefix?: string;
}

/** The emphasis buttons as one keyboard stop (`RovingToolbar`). Pressing one never takes the field's selection away. */
export function EmphasisToolbar({ active, onApply, disabled = false, label = 'Text emphasis', className, testIdPrefix = 'emphasis' }: EmphasisToolbarProps) {
  return (
    <RovingToolbar label={label} className={cn('flex flex-wrap items-center gap-0.5', className)} data-testid={testIdPrefix}>
      {DECK_EMPHASES.map((emphasis) => (
        <Button
          key={emphasis}
          variant="ghost"
          size="sm"
          aria-pressed={active === emphasis}
          disabled={disabled}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onApply(active === emphasis ? null : emphasis)}
          data-testid={`${testIdPrefix}-${emphasis}`}
        >
          <span className={EMPHASIS_CLASS[emphasis]}>{DECK_EMPHASIS_LABELS[emphasis]}</span>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => onApply(null)}
        data-testid={`${testIdPrefix}-plain`}
      >
        Plain
      </Button>
    </RovingToolbar>
  );
}

/** A DeckText drawn with its emphases, for previews. A plain string renders as itself. */
export function DeckTextPreview({ text, className, testId }: { text: DeckText; className?: string; testId?: string }) {
  return (
    <span className={cn('min-w-0', className)} data-testid={testId}>
      <Text as="span" size="sm">
        {typeof text === 'string'
          ? text
          : text.map((run, index) => (
            <span key={index} className={run.emphasis ? EMPHASIS_CLASS[run.emphasis] : undefined} data-emphasis={run.emphasis}>
              {run.text}
            </span>
          ))}
      </Text>
    </span>
  );
}

export interface DeckTextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size' | 'type' | 'prefix' | 'defaultValue'> {
  value: DeckText;
  onChange: (value: DeckText) => void;
  /** Hide the emphasis toolbar (the field is then a plain `Input` that keeps runs). */
  emphasis?: boolean;
  /** Test-id for the input; the toolbar is `<id>-emphasis`, the preview `<id>-preview`. */
  'data-testid'?: string;
}

/** An `Input` for a title or bullet, with the emphasis toolbar while it has focus. The ref is the input. */
export const DeckTextField = forwardRef<HTMLInputElement, DeckTextFieldProps>(function DeckTextField(
  { value, onChange, emphasis = true, disabled, className, 'data-testid': testId = 'deck-text', 'aria-label': ariaLabel, ...rest },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);
  const [selection, setSelection] = useState<[number, number]>([0, 0]);
  const setRefs = useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  const readSelection = () => {
    const node = inputRef.current;
    if (!node) return;
    setSelection([node.selectionStart ?? 0, node.selectionEnd ?? 0]);
  };
  const onBlurWithin = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };
  const apply = (next: DeckEmphasis | null) => {
    const node = inputRef.current;
    const start = node?.selectionStart ?? selection[0];
    const end = node?.selectionEnd ?? selection[1];
    onChange(applyEmphasis(value, start, end, next));
  };

  const [start, end] = selection;
  const hasSelection = end > start;
  const showToolbar = emphasis && !disabled && focused;

  return (
    <div className={cn('flex min-w-0 flex-1 flex-col gap-1', className)} onFocus={() => setFocused(true)} onBlur={onBlurWithin}>
      <Input
        {...rest}
        ref={setRefs}
        aria-label={ariaLabel}
        value={deckTextValue(value)}
        disabled={disabled}
        onChange={(event) => onChange(editDeckText(value, event.target.value))}
        onSelect={readSelection}
        onKeyUp={readSelection}
        onMouseUp={readSelection}
        data-testid={testId}
      />
      {showToolbar && (
        <EmphasisToolbar
          label={ariaLabel ? `${ariaLabel}: emphasis` : 'Text emphasis'}
          active={hasSelection ? emphasisAt(value, start, end) : undefined}
          disabled={!hasSelection}
          onApply={apply}
          testIdPrefix={`${testId}-emphasis`}
        />
      )}
      {typeof value !== 'string' && (
        <DeckTextPreview text={value} className="block truncate" testId={`${testId}-preview`} />
      )}
    </div>
  );
});

export default DeckTextField;
