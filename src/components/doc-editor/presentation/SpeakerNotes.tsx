// Speaker notes, under the stage.
//
// The DeckSpec already has the field — `DeckSlide.notes`, capped at 2000
// characters and written into the `.pptx` notes pane — so this is only a
// better place to edit it than the fourteenth field of a slide form: directly
// under the slide it belongs to, the way every presentation tool puts it.
//
// An emptied box writes `undefined`, not `''`: the generator treats an absent
// field and an empty one the same, and an absent one keeps the saved spec
// clean.

import { useId } from 'react';
import { cn } from '../../../lib/cn';
import { Textarea } from '../../forms/Textarea';
import { Text } from '../../shared/Text';
import { MAX_NOTES_CHARS } from './deckSpec';

export interface SpeakerNotesProps {
  value: string | undefined;
  /** `undefined` when the box is emptied. */
  onChange: (notes: string | undefined) => void;
  readOnly?: boolean;
  /** Default `MAX_NOTES_CHARS` (2000), the generator's cap. */
  maxLength?: number;
  placeholder?: string;
  className?: string;
  /** Test id of the textarea. Default `speaker-notes`; the pane is `<id>-pane`. */
  'data-testid'?: string;
}

export function SpeakerNotes({
  value,
  onChange,
  readOnly = false,
  maxLength = MAX_NOTES_CHARS,
  placeholder = 'Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.',
  className,
  'data-testid': testId = 'speaker-notes',
}: SpeakerNotesProps) {
  const labelId = useId();
  const counterId = useId();
  const length = value?.length ?? 0;
  const near = length >= maxLength * 0.9;
  return (
    <section
      aria-labelledby={labelId}
      className={cn('flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2', className)}
      data-testid={`${testId}-pane`}
    >
      <div className="flex items-center justify-between gap-2">
        <Text as="span" id={labelId} className="text-[12px] font-semibold text-text-primary">
          Speaker notes
        </Text>
        <Text
          as="span"
          id={counterId}
          className={cn('text-[11px] tabular-nums', near ? 'text-warning-fg' : 'text-text-tertiary')}
          data-testid={`${testId}-count`}
        >
          {`${length} / ${maxLength}`}
        </Text>
      </div>
      <Textarea
        aria-labelledby={labelId}
        aria-describedby={counterId}
        autoResize
        minRows={2}
        maxRows={8}
        maxLength={maxLength}
        value={value ?? ''}
        disabled={readOnly}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value.slice(0, maxLength) || undefined)}
        className="border-transparent bg-transparent px-0 focus:border-transparent"
        data-testid={testId}
      />
    </section>
  );
}

export default SpeakerNotes;
