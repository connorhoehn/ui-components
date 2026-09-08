// ui-components/src/components/doc-macros/DecisionBlock.tsx
//
// A `macro:decision` fence, drawn as the record of a choice.
//
// Presentation only — handed a decision and some callbacks, never touching the
// document. Every callback goes back through `DecisionMacro`'s node view,
// which turns it into a minimal text edit on the macro's own YAML body. Same
// split as `ActionItemsBlock` and `HitlBlock`, for the same reason: there is
// no local "accepted" state here, because the status is not UI state that
// later syncs — it IS the document, read back through the node.
//
// ## What this shows that prose cannot
//
// A markdown callout carries the DECISION, which is the part a writer least
// needs help with. What a reader cannot get from prose is the state that tells
// them whether to trust it:
//
//   * **is it in force** — the single most common question asked of a document
//     six months old, and the one prose answers worst, because a paragraph
//     written in the present tense reads as current forever
//   * **what it replaced it with** — a superseded decision that does not name
//     its successor sends the reader searching, and they usually stop looking
//     before they find it
//   * **what else was weighed** — the alternatives are what make the rationale
//     checkable rather than merely stated
//
// ## Superseded is not rejected, and the card must not blur them
//
// A rejected decision was never in force. A superseded one WAS, and everything
// built while it held still makes sense against it. So a superseded card keeps
// full contrast on its claim and its rationale and marks only its STATUS as
// historical — it is not greyed out, because the text is still the true
// explanation of why the system looks the way it does. A rejected card is the
// one that recedes.

import { useState } from 'react';
import Chip from '../shared/Chip';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import {
    DECISION_STATUSES,
    type Decision,
    type DecisionStatus,
} from './decisionText';

type ChipTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'purple';

const STATUS_META: Record<DecisionStatus, { label: string; tone: ChipTone; hint: string }> = {
    proposed: { label: 'Proposed', tone: 'info', hint: 'Not decided yet' },
    accepted: { label: 'Accepted', tone: 'success', hint: 'In force' },
    rejected: { label: 'Rejected', tone: 'danger', hint: 'Never adopted' },
    superseded: { label: 'Superseded', tone: 'neutral', hint: 'Was in force, replaced' },
};

export interface DecisionBlockProps {
    decision: Decision;
    /** False in read/print, and for a reader without write access. */
    editable?: boolean;
    onStatusChange?: (status: DecisionStatus) => void;
    onSupersededBy?: (ref: string) => void;
    onRemove?: () => void;
    testId?: string;
}

export function DecisionBlock({
    decision,
    editable = false,
    onStatusChange,
    onSupersededBy,
    onRemove,
    testId = 'decision-block',
}: DecisionBlockProps) {
    const [refDraft, setRefDraft] = useState('');
    const meta = STATUS_META[decision.status];
    // Only rejected recedes. See the header — a superseded decision's text is
    // still the true explanation of why things are the way they are.
    const faded = decision.status === 'rejected';

    return (
        <div data-testid={testId} data-status={decision.status} className="my-3">
            <div className="flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                    Decision
                </span>
                <Chip tone={meta.tone} size="sm" data-testid={`${testId}-status`}>
                    {meta.label}
                </Chip>
                <span className="text-[11px] text-text-tertiary">{meta.hint}</span>
                <span className="flex-1" />
                {editable && onRemove && (
                    <button
                        type="button"
                        aria-label="Remove this decision"
                        onClick={onRemove}
                        className="rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2">
                <p
                    data-testid={`${testId}-claim`}
                    className={
                        faded
                            ? 'm-0 text-[13.5px] font-medium leading-snug text-text-tertiary line-through'
                            : 'm-0 text-[13.5px] font-medium leading-snug text-text-primary'
                    }
                >
                    {decision.decision}
                </p>

                {decision.rationale && (
                    <p className="m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary">
                        {decision.rationale}
                    </p>
                )}

                {decision.alternatives.length > 0 && (
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                            Also considered
                        </span>
                        <ul className="m-0 list-disc pl-4 text-[12px] leading-snug text-text-secondary">
                            {decision.alternatives.map((a, i) => (
                                <li key={`${a}-${i}`}>{a}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {(decision.decidedBy || decision.decidedAt) && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary">
                        {decision.decidedBy && <span>{decision.decidedBy}</span>}
                        {decision.decidedBy && decision.decidedAt && <span>·</span>}
                        {decision.decidedAt && <span>{decision.decidedAt}</span>}
                    </div>
                )}

                {/* A superseded decision that does not name its successor sends
                    the reader searching, and they usually give up first. When
                    the reference is known it is the most useful line on the
                    card; when it is not, and the page is editable, ask. */}
                {decision.status === 'superseded' && decision.supersededBy && (
                    <p
                        data-testid={`${testId}-superseded-by`}
                        className="m-0 text-[12px] leading-snug text-text-secondary"
                    >
                        Replaced by <span className="font-medium">{decision.supersededBy}</span>
                    </p>
                )}
                {editable && onSupersededBy && decision.status === 'superseded'
                    && !decision.supersededBy && (
                    <div className="flex items-center gap-1.5">
                        <Input
                            aria-label="What replaced this decision"
                            placeholder="Replaced by…"
                            value={refDraft}
                            onChange={(e) => setRefDraft(e.target.value)}
                            data-testid={`${testId}-superseded-input`}
                        />
                        <Button
                            size="sm"
                            variant="secondary"
                            disabled={refDraft.trim() === ''}
                            onClick={() => { onSupersededBy(refDraft.trim()); setRefDraft(''); }}
                        >
                            Record
                        </Button>
                    </div>
                )}

                {editable && onStatusChange && (
                    <div
                        role="group"
                        aria-label="Decision status"
                        className="flex flex-wrap items-center gap-1 border-t border-border pt-2"
                    >
                        {DECISION_STATUSES.map((s) => (
                            <Button
                                key={s}
                                size="sm"
                                variant={s === decision.status ? 'primary' : 'secondary'}
                                aria-pressed={s === decision.status}
                                disabled={s === decision.status}
                                onClick={() => onStatusChange(s)}
                                data-testid={`${testId}-set-${s}`}
                            >
                                {STATUS_META[s].label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DecisionBlock;
