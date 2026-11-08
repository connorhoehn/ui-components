// VoiceChoiceCard — the answer to an `ambiguous` result.
//
// Up to ten candidates, numbered 1..10, each with a title, an optional
// secondary line, an optional kind chip and an optional href. The user picks
// one by click, by pressing its digit (1-9, 0 for ten), or by saying the
// ordinal, which the host passes as `ordinal`. Arrows move the active row,
// Enter chooses it, Escape cancels. `compact` is the footer size.
//
// The rows are a listbox of options (`aria-selected`), not buttons with
// overridden roles. The card remounts per request (keyed on `choice.requestId`,
// else its title), so a second decision starts clean.

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Stack, Inline } from '../ui/Stack';
import { StatusPill } from '../shared/StatusPill';
import { T } from '../shared/Text';
import { VOICE_CHOICE_MAX, type VoicePendingChoice } from './voiceTypes';

export interface VoiceChoiceCardProps {
  choice: VoicePendingChoice;
  /** Handle Escape on the card itself. The dock turns this off: its popover already closes on Escape. Default true. */
  handleEscape?: boolean;
  /** Focus the card when it mounts. Default true. */
  autoFocus?: boolean;
  /** Footer size: tighter padding and xs type. Default false. */
  compact?: boolean;
  className?: string;
  'data-testid'?: string;
}

/** The answer to an `ambiguous` result. Remounts when the request changes (`choice.requestId`, else `choice.title`). */
export function VoiceChoiceCard(props: VoiceChoiceCardProps) {
  const { choice } = props;
  return <VoiceChoiceCardBody key={choice.requestId ?? choice.title} {...props} />;
}

function VoiceChoiceCardBody({
  choice,
  handleEscape = true,
  autoFocus = true,
  compact = false,
  className,
  'data-testid': testId = 'voice-choice-card',
}: VoiceChoiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const candidates = choice.candidates.slice(0, VOICE_CHOICE_MAX);
  const count = candidates.length;
  const validOrdinal = (n: number | undefined): n is number =>
    typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= count;

  const [active, setActive] = useState(validOrdinal(choice.ordinal) ? choice.ordinal - 1 : 0);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  // The voice said "the second one": choose that row, once per ordinal value.
  const chosenFor = useRef<number | undefined>(undefined);
  const onChooseRef = useRef(choice.onChoose);
  onChooseRef.current = choice.onChoose;
  useEffect(() => {
    if (!validOrdinal(choice.ordinal)) {
      chosenFor.current = undefined;
      return;
    }
    setActive(choice.ordinal - 1);
    if (chosenFor.current === choice.ordinal) return;
    chosenFor.current = choice.ordinal;
    onChooseRef.current(choice.ordinal - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choice.ordinal, count]);

  const move = (to: number) => {
    if (count === 0) return;
    const next = ((to % count) + count) % count;
    setActive(next);
    ref.current?.querySelectorAll<HTMLElement>('[data-part="row"]')[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && handleEscape) {
      e.stopPropagation();
      choice.onCancel();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      move(active + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      move(active - 1);
    } else if ((e.key === 'Enter' || e.key === ' ') && e.target instanceof HTMLElement && e.target.dataset.part === 'row') {
      e.preventDefault();
      choice.onChoose(Number(e.target.dataset.ordinal) - 1);
    } else if (/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const n = e.key === '0' ? 10 : Number(e.key);
      if (n <= count) {
        e.preventDefault();
        choice.onChoose(n - 1);
      }
    }
  };

  return (
    <Stack
      ref={ref}
      gap={compact ? 'xs' : 'sm'}
      tabIndex={0}
      role="group"
      aria-label={`Choose: ${choice.title}`}
      onKeyDown={onKeyDown}
      data-testid={testId}
      data-compact={compact ? 'true' : undefined}
      className={cn(
        'rounded-md border border-solid border-warning/40 bg-surface outline-none focus-visible:ring-2 focus-visible:ring-primary',
        compact ? 'p-2' : 'p-3',
        className,
      )}
    >
      <T size={compact ? 'xs' : 'sm'} weight="semibold" tone="primary" as="p">{choice.title}</T>
      <Stack gap="xs" role="listbox" aria-label={choice.title}>
        {candidates.map((c, i) => {
          const selected = i === active;
          return (
            <div
              key={i}
              role="option"
              aria-selected={selected}
              data-part="row"
              data-ordinal={i + 1}
              data-selected={selected ? 'true' : undefined}
              data-href={c.href}
              title={c.href}
              tabIndex={selected ? 0 : -1}
              onClick={() => choice.onChoose(i)}
              onFocus={() => setActive(i)}
              data-testid={`${testId}-row-${i + 1}`}
              className={cn(
                'flex w-full min-w-0 cursor-pointer items-start gap-2 rounded-md border border-solid bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-primary hover:bg-surface-hover',
                compact ? 'px-1.5 py-1' : 'px-2 py-1.5',
                selected ? 'border-primary bg-surface-hover' : 'border-transparent',
              )}
            >
              <T size="xs" weight="semibold" tone="secondary" tabular>{i + 1}</T>
              <Stack gap="xs" className="min-w-0 flex-1">
                <Inline gap="sm" wrap={false} className="min-w-0">
                  <T size={compact ? 'xs' : 'sm'} weight="medium" tone="primary" className="min-w-0 truncate">{c.title}</T>
                  {c.kind ? <StatusPill size="sm" tone="neutral" label={c.kind} /> : null}
                </Inline>
                {c.subtitle ? <T size="xs" tone="tertiary" className="min-w-0 truncate">{c.subtitle}</T> : null}
              </Stack>
            </div>
          );
        })}
      </Stack>
      <Inline gap="sm" justify="end">
        <Button variant="secondary" size="sm" onClick={choice.onCancel} data-testid={`${testId}-cancel`}>Cancel</Button>
      </Inline>
    </Stack>
  );
}

export default VoiceChoiceCard;
