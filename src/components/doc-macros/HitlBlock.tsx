// ui-components/src/components/doc-macros/HitlBlock.tsx
//
// A `macro:hitl` fence, drawn as an agent's question with the state a person
// needs to answer it.
//
// Presentation only — it is handed a callout and three callbacks, and never
// touches the document. Every callback goes back through `HitlMacro`'s node
// view, which turns it into a minimal text edit on the macro's YAML body. Same
// split as `ActionItemsBlock`, for the same reason: no local "answered" state
// here, because the answer is not UI state that later syncs, it IS the
// document read back through the node.
//
// ## What the card must show, and why each part earns its place
//
// A generic markdown callout can carry the QUESTION. That is the part a person
// least needs help with. What they cannot get from prose is the state that
// decides whether to answer at all:
//
//   * **who is being asked** — a question addressed to nobody is a question
//     everybody assumes someone else took
//   * **what is stopped** — an agent parked on this is paying for the delay
//     continuously, and that is the difference between this and a to-do
//   * **the choices, and what each one DOES** — "ship it / hold" is a pair of
//     labels; "ship it → the release train continues" is a decision
//   * **whether the asker is still listening** — see below
//
// ## The one control this file deliberately withholds
//
// An EXPIRED callout draws no answer control. Not a disabled one, not one that
// posts and shows an error: none. The asker has stopped waiting, so an answer
// changes nothing, and a composer that accepts one would tell the person they
// unblocked something they did not. That is the same judgement the cross-
// document inbox makes when it refuses to draw a composer it cannot deliver
// through — `expired` is a state transition nobody performed, and the honest
// rendering of it is an absence.
//
// ## Colours
//
// Chrome tokens (`bg-surface-inset`, `border-border`, `text-text-*`), the
// family `ActionItemsBlock` and `DiagramBlockRenderer` use, NOT the
// theme-invariant `--color-paper-*` family. A macro block is a tool sitting on
// the page, not the page. Status colour is carried by `Chip`'s tones rather
// than by a border this file names, so there is one place that decides what
// "waiting" looks like.

import { useState } from 'react';
import Chip from '../shared/Chip';
import { Button } from '../ui/Button';
import { Textarea } from '../forms/Textarea';
import { Select } from '../forms/Select';
import { hitlExpired, type HitlCallout } from './hitlText';

/** One candidate addressee: the identity the row is keyed on, and its label. */
export interface HitlPerson {
    /** The auth subject written into `assignee:`. */
    id: string;
    /** What a reader sees. Never written into the body — see `hitlMirrorRow`. */
    name: string;
}

export interface HitlBlockProps {
    callout: HitlCallout;
    /** False renders the callout read-only — no answering, no retracting. */
    editable?: boolean;
    /**
     * The clock, for expiry. Injected rather than read from `Date.now()` here
     * so a test can pin it; defaults to now.
     */
    now?: number;
    /** Records an answer. Never called for an expired callout. */
    onAnswer?: (answer: string) => void;
    /** An answer is in flight — the controls are live but must not be re-fired. */
    busy?: boolean;
    /**
     * Why the last answer did not stick.
     *
     * Set when an answer was written into the document and then TAKEN BACK
     * because the mirror write failed. The card must say so: the alternative
     * is a callout that silently returns to `waiting` and a person who
     * believes they unblocked something.
     */
    failure?: string | null;
    /**
     * Who this callout may be addressed to, as identity + label.
     *
     * Empty (or absent) draws no picker at all, which is the honest rendering
     * of "this surface has no directory": a control listing nobody would
     * suggest the addressee is unchangeable when it is only unknown.
     */
    people?: readonly HitlPerson[];
    /**
     * Readdresses the callout. Only ever called with an id from `people`, or
     * `''` to address it to nobody.
     *
     * Load-bearing rather than cosmetic: `assignee` is the ONLY field the
     * cross-document query is keyed on, so a callout stuck on the wrong
     * addressee is invisible to the person who should answer it and answerable
     * by nobody — the answer endpoint refuses everyone but the addressee.
     */
    onAssign?: (assignee: string) => void;
    /** Takes a recorded answer back. Omitted when it cannot be done in one edit. */
    onRetract?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    'data-testid'?: string;
}

type Phase = 'waiting' | 'answered' | 'expired';

/** What the card is, in one word — and the only place that decides it. */
export function hitlPhase(callout: HitlCallout, now?: number): Phase {
    if (callout.answer !== null) return 'answered';
    // Expiry is checked AFTER answered: a callout answered before its deadline
    // is answered, and a clock that later passed does not un-answer it.
    if (hitlExpired(callout, now)) return 'expired';
    return 'waiting';
}

const PHASE_CHIP: Record<Phase, { label: string; tone: 'warning' | 'success' | 'neutral' }> = {
    waiting: { label: 'agent waiting', tone: 'warning' },
    answered: { label: 'answered', tone: 'success' },
    expired: { label: 'expired', tone: 'neutral' },
};

const LABEL =
    'whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none';

/**
 * One declared choice.
 *
 * The consequence sits UNDER the button rather than in a tooltip: it is the
 * part of the ask that is hardest to reconstruct and easiest to hide, and a
 * person choosing between two irreversible branches should not have to hover
 * to find out which is which.
 */
function OptionButton({
    option,
    disabled,
    onPick,
    testId,
}: {
    option: { value: string; then: string };
    disabled: boolean;
    onPick: () => void;
    testId: string;
}) {
    return (
        <div className="flex min-w-0 flex-col gap-0.5">
            <Button
                variant="secondary"
                size="sm"
                data-testid={testId}
                disabled={disabled}
                onClick={onPick}
            >
                {option.value}
            </Button>
            {option.then ? (
                <span
                    data-testid={`${testId}-then`}
                    className="px-0.5 text-[11px] leading-snug text-text-tertiary"
                >
                    → {option.then}
                </span>
            ) : null}
        </div>
    );
}

/**
 * Who is being asked, and how to change it.
 *
 * A `Select` rather than a chip with an edit affordance behind it, because
 * readdressing is the one edit on this card that has to be discoverable
 * WITHOUT the reader knowing it exists: a callout addressed to the wrong
 * person is not visibly wrong from the page — it is wrong in somebody else's
 * inbox, where nobody is looking.
 *
 * "Nobody" is a real option and is offered as one. It is not a null state to
 * be tidied away: an unaddressed callout is refused by the answer endpoint on
 * purpose, and a picker that could not express it would make "addressed to
 * everybody" the only way back out of a mistaken assignment.
 */
function AssigneePicker({
    value,
    people,
    disabled,
    onAssign,
    testId,
}: {
    value: string;
    people: readonly HitlPerson[];
    disabled: boolean;
    onAssign: (assignee: string) => void;
    testId: string;
}) {
    // An addressee the directory has never heard of is kept as an option of
    // its own rather than silently reset to nobody by the first render: the
    // body is the record, and a picker is not entitled to rewrite it just
    // because this client's roster is short.
    const known = people.some((p) => p.id === value);
    return (
        <Select
            size="sm"
            data-testid={`${testId}-assign`}
            aria-label="Who is being asked"
            value={value}
            disabled={disabled}
            onChange={(e) => onAssign(e.target.value)}
            options={[
                { value: '', label: 'unassigned' },
                ...(value && !known ? [{ value, label: `for ${value}` }] : []),
                ...people.map((p) => ({ value: p.id, label: `for ${p.name}` })),
            ]}
        />
    );
}

/** The free-prose composer, for a callout that declared no options. */
function ProseAnswer({
    onAnswer,
    busy,
    testId,
}: {
    onAnswer: (answer: string) => void;
    busy: boolean;
    testId: string;
}) {
    const [draft, setDraft] = useState('');
    const ready = draft.trim().length > 0 && !busy;

    const submit = () => {
        if (!ready) return;
        onAnswer(draft.trim());
        setDraft('');
    };

    return (
        <div className="flex flex-col gap-1.5">
            <Textarea
                data-testid={`${testId}-draft`}
                value={draft}
                rows={2}
                disabled={busy}
                aria-label="Answer the agent"
                placeholder="Answer the agent — it is waiting on this…"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        submit();
                    }
                }}
            />
            <div className="flex items-center justify-end">
                <Button size="sm" data-testid={`${testId}-send`} disabled={!ready} onClick={submit}>
                    {busy ? 'Sending…' : 'Send answer'}
                </Button>
            </div>
        </div>
    );
}

export function HitlBlock({
    callout,
    editable = false,
    now,
    onAnswer,
    busy = false,
    failure = null,
    people,
    onAssign,
    onRetract,
    onRemove,
    'data-testid': testId = 'hitl',
}: HitlBlockProps) {
    const phase = hitlPhase(callout, now);
    const chip = PHASE_CHIP[phase];
    // The gate, in one place. `onAnswer` alone is not enough: an expired
    // callout must draw nothing even when the host passed a handler.
    const canAnswer = phase === 'waiting' && editable && Boolean(onAnswer);
    // Readdressing is offered only while the callout is still waiting. An
    // answered one is a record — moving its addressee afterwards would make the
    // attribution on screen disagree with who was actually asked — and an
    // expired one is addressed to somebody who stopped waiting, so pointing it
    // at a new person would be handing them a question that reaches nobody.
    const canAssign =
        phase === 'waiting' && editable && Boolean(onAssign) && (people?.length ?? 0) > 0;

    return (
        <div data-testid={testId} data-phase={phase} className="my-3">
            <div className="flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1">
                <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                    Agent asks
                </span>
                <Chip
                    tone={chip.tone}
                    size="xs"
                    uppercase
                    dot={phase === 'waiting' ? 'pulse' : 'static'}
                    data-testid={`${testId}-phase`}
                >
                    {chip.label}
                </Chip>
                <span className="flex-1" />
                {editable && onRemove ? (
                    <Button variant="ghost" size="sm" data-testid={`${testId}-remove`} onClick={onRemove}>
                        Remove
                    </Button>
                ) : null}
            </div>

            <div className="flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2">
                <p
                    data-testid={`${testId}-question`}
                    className="m-0 text-[13.5px] font-medium leading-snug text-text-primary"
                >
                    {callout.question}
                </p>

                {callout.context ? (
                    <p
                        data-testid={`${testId}-context`}
                        className="m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary"
                    >
                        {callout.context}
                    </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary">
                    {callout.askedBy ? (
                        <span data-testid={`${testId}-asked-by`}>{callout.askedBy} asked</span>
                    ) : null}
                    {/* Who is being asked. Named only when the callout names
                        somebody — "addressed to nobody" is a real state and is
                        shown as one rather than as a blank chip. */}
                    {canAssign ? (
                        <AssigneePicker
                            value={callout.assignee}
                            people={people ?? []}
                            disabled={busy}
                            onAssign={(next) => onAssign?.(next)}
                            testId={testId}
                        />
                    ) : callout.assignee ? (
                        <Chip tone="neutral" size="xs" data-testid={`${testId}-assignee`}>
                            for {callout.assignee}
                        </Chip>
                    ) : (
                        <Chip tone="neutral" size="xs" data-testid={`${testId}-unassigned`}>
                            unassigned
                        </Chip>
                    )}
                    {/* Blocking is not decoration: it is the whole difference
                        between this and a to-do, so it is stated in words. */}
                    {callout.blocks ? (
                        <Chip tone="warning" size="xs" data-testid={`${testId}-blocks`}>
                            blocks {callout.blocks}
                        </Chip>
                    ) : null}
                    {callout.expiresAt && phase === 'waiting' ? (
                        <span data-testid={`${testId}-expires`}>until {callout.expiresAt}</span>
                    ) : null}
                </div>

                {phase === 'answered' ? (
                    <div className="flex flex-col gap-1">
                        <span className={LABEL}>
                            Answer
                            {callout.answeredBy ? ` — ${callout.answeredBy}` : ''}
                            {callout.answeredAt ? ` · ${callout.answeredAt}` : ''}
                        </span>
                        <p
                            data-testid={`${testId}-answer`}
                            className="m-0 text-[12.5px] leading-snug text-text-primary"
                        >
                            {callout.answer}
                        </p>
                        {/* Offered only when the answer can be removed in ONE
                            edit — see `retractHitlEdit`. A button that half
                            removes an answer is worse than none. */}
                        {editable && onRetract ? (
                            <div className="flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    data-testid={`${testId}-retract`}
                                    onClick={onRetract}
                                >
                                    Retract answer
                                </Button>
                            </div>
                        ) : null}
                    </div>
                ) : null}

                {phase === 'expired' ? (
                    <p
                        data-testid={`${testId}-expired-note`}
                        className="m-0 text-[11.5px] text-text-tertiary"
                    >
                        Expired unanswered — the agent stopped waiting. Answering here would
                        not reach it.
                    </p>
                ) : null}

                {failure ? (
                    <p
                        data-testid={`${testId}-failure`}
                        role="alert"
                        // `-bg` / `-fg`, not `-subtle`: `--color-danger-subtle`
                        // is defined nowhere in styles.css, so a class built on
                        // it paints nothing at all, silently.
                        className="m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg"
                    >
                        {failure}
                    </p>
                ) : null}

                {canAnswer && callout.options.length > 0 ? (
                    <div
                        data-testid={`${testId}-options`}
                        className="flex flex-wrap items-start gap-2 pt-0.5"
                    >
                        {callout.options.map((option, i) => (
                            <OptionButton
                                key={`${option.value}:${i}`}
                                option={option}
                                disabled={busy}
                                onPick={() => onAnswer?.(option.value)}
                                testId={`${testId}-option-${i}`}
                            />
                        ))}
                    </div>
                ) : null}

                {canAnswer && callout.options.length === 0 ? (
                    <ProseAnswer
                        onAnswer={(answer) => onAnswer?.(answer)}
                        busy={busy}
                        testId={testId}
                    />
                ) : null}

                {/* A waiting callout on a page nobody may edit still says what
                    it is waiting for — it just cannot be answered here. */}
                {phase === 'waiting' && !canAnswer ? (
                    <p
                        data-testid={`${testId}-readonly-note`}
                        className="m-0 text-[11.5px] text-text-tertiary"
                    >
                        {callout.options.length > 0
                            ? `Waiting on one of: ${callout.options.map((o) => o.value).join(', ')}.`
                            : 'Waiting on an answer.'}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default HitlBlock;
