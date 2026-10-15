// ConsultCard — an agent's question, waiting on a person.
//
// The human half of a consult loop: somewhere a machine is BLOCKED on this
// card. That inverts the usual review posture — most queues hold finished
// work that can wait; this holds a running worker that cannot. The design
// choices follow from that:
//
//   * the question leads, full-width and readable — the card exists to be
//     answered, not triaged
//   * context (what the agent was doing) sits under it, because the answer
//     is usually obvious once you know the situation
//   * the answer is free prose in a composer ON the card. Navigating away to
//     answer would double the latency the agent is already paying.
//
// An answered card stays renderable — the queue's history should show what
// was asked and what was said, with attribution.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from './Chip';
import { Button } from '../ui/Button';
import { Textarea } from '../forms/Textarea';

export interface ConsultCardProps {
  /** The agent's question. */
  question: string;
  /** What the agent was doing when it asked. */
  context?: string;
  /** Where it came from — repo, box, session. Rendered as quiet chips. */
  origin?: readonly string[];
  /** ISO timestamp or preformatted "asked 4m ago" string. */
  askedAt?: string;
  status: 'pending' | 'answered' | 'expired' | 'withdrawn';
  answer?: string;
  answeredBy?: string;
  /** Submit an answer. Only rendered while status is 'pending'. */
  onAnswer?: (answer: string) => void;
  answerPlaceholder?: string;
  busy?: boolean;
  /**
   * Extra footer content, e.g. a link to the session. Rendered in EVERY
   * state: beside the send button while answerable, on its own row when the
   * card is pending but has no `onAnswer` — the one state where this is the
   * card's only affordance, and the one state where it used to be dropped.
   */
  footer?: ReactNode;
  /**
   * Draw no frame of its own — no border, radius, padding or background — for
   * a card sitting inside a list group that already supplies them. The
   * pending signal stays on the "agent waiting" chip.
   */
  flush?: boolean;
  className?: string;
  'data-testid'?: string;
}

const STATUS_TONE = {
  pending: 'warning',
  answered: 'success',
  expired: 'neutral',
  withdrawn: 'neutral',
} as const;

export function ConsultCard({
  question,
  context,
  origin = [],
  askedAt,
  status,
  answer,
  answeredBy,
  onAnswer,
  answerPlaceholder = 'Answer the agent — it is waiting on this…',
  busy = false,
  footer,
  flush = false,
  className,
  'data-testid': testId,
}: ConsultCardProps) {
  const [draft, setDraft] = useState('');
  const ready = draft.trim().length > 0 && !busy;

  function submit() {
    if (!ready || !onAnswer) return;
    onAnswer(draft.trim());
    setDraft('');
  }

  return (
    <section
      data-testid={testId}
      className={cn(
        'flex flex-col gap-2.5 min-w-0',
        // A pending consult is a blocked machine; the border says so quietly.
        !flush && 'rounded-lg border bg-surface p-3.5',
        !flush && (status === 'pending' ? 'border-warning/50' : 'border-border'),
        className,
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <Chip tone={STATUS_TONE[status]} size="xs" dot={status === 'pending' ? 'pulse' : 'static'} uppercase>
          {status === 'pending' ? 'agent waiting' : status}
        </Chip>
        {origin.map((o) => <Chip key={o} tone="neutral" size="xs" mono>{o}</Chip>)}
        <span className="flex-1" />
        {askedAt && <span className="text-xs text-text-tertiary whitespace-nowrap">{askedAt}</span>}
      </div>

      <p className="m-0 text-[13.5px] font-medium text-text-primary leading-snug">{question}</p>

      {context && (
        <p className="m-0 text-[12px] text-text-secondary leading-snug border-l-2 border-border pl-2.5">
          {context}
        </p>
      )}

      {status === 'answered' && answer && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-tertiary select-none">
            Answer{answeredBy ? ` — ${answeredBy}` : ''}
          </span>
          <p className="m-0 text-[12.5px] text-text-primary leading-snug">{answer}</p>
        </div>
      )}

      {status === 'expired' && (
        <p className="m-0 text-[11.5px] text-text-tertiary">
          Expired unanswered — the agent stopped waiting.
        </p>
      )}

      {status === 'pending' && onAnswer && (
        <div className="flex flex-col gap-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={answerPlaceholder}
            rows={2}
            disabled={busy}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit(); }
            }}
          />
          <div className="flex items-center gap-2">
            {footer}
            <span className="flex-1" />
            <Button size="sm" onClick={submit} disabled={!ready}>
              {busy ? 'Sending…' : 'Send answer'}
            </Button>
          </div>
        </div>
      )}

      {(status !== 'pending' || !onAnswer) && footer && (
        <div className="flex items-center gap-2">{footer}</div>
      )}
    </section>
  );
}

export default ConsultCard;
