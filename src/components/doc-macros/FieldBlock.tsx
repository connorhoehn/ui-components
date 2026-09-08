// ui-components/src/components/doc-macros/FieldBlock.tsx
//
// A `macro:field` fence, drawn as ONE LINE: a name, and its typed value.
//
// Presentation only — handed a field and some callbacks, never touching the
// document. Every callback goes back through `FieldMacro`'s node view, which
// turns it into a minimal text edit on the macro's own YAML body. Same split
// as `ActionItemsBlock`, `HitlBlock` and `DecisionBlock`, for the same reason:
// there is no local "value" state that later syncs, because the value IS the
// document, read back through the node.
//
// ## Why this is a line and not a card
//
// The other three macro renderers are cards, and copying that here would have
// been the easy thing. They are cards because each carries several facts that
// need arranging — a checklist has rows, a callout has a question and options
// and a deadline, a decision has a claim, a rationale, alternatives and a
// lifecycle. A field carries ONE fact. Wrapping "Owner: Ada" in a bordered
// panel with a header strip is furniture around a single word, and a page with
// six properties at the top would be six panels where the author wanted a
// small table.
//
// So: one row, no border, no header. Consecutive fields then read as a
// property list, because the label reserves a fixed minimum width and the
// values line up into a column. That alignment is the entire visual design and
// it is why the label is not simply inlined into a sentence.
//
// ## Read mode is a different rendering, not a disabled one
//
// `editable=false` on a canvas page means print, review, a finalized document,
// or a reader without write access — and in every one of those a row of form
// controls is noise. So the block collapses to text: "Target date  Nov 1,
// 2026". `DateEditorRenderer` in the section world makes exactly this call
// (it delegates to `DateReaderRenderer` rather than disabling its input), and
// a field on a page should not behave differently from the same field in a
// section.
//
// ## An invalid value is shown, never swallowed
//
// A date field holding "next tuesday" renders the words "next tuesday" with a
// chip saying it is not a date — and, when editable, in a plain text box so it
// can be corrected, sitting next to the type picker that is the OTHER fix.
// `fieldText.ts`'s header argues that at length. What matters here is that the
// text is never hidden and never silently replaced: a `<input type="date">`
// handed "next tuesday" renders EMPTY, which would look to the author like the
// page had eaten their answer.

import { useCallback, useRef, useState } from 'react';
import { useDraft } from './useDraft';
import Chip from '../shared/Chip';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import {
    FIELD_TYPES,
    fieldBoolean,
    fieldDate,
    formatFieldDate,
    formatFieldValue,
    type FieldType,
    type TypedField,
} from './fieldText';

const TYPE_LABELS: Record<FieldType, string> = {
    text: 'Text',
    date: 'Date',
    number: 'Number',
    boolean: 'Yes / no',
};

/** What the chip says when the stored scalar does not fit the declared type. */
const MISMATCH: Record<FieldType, string> = {
    text: 'not text',
    date: 'not a date',
    number: 'not a number',
    boolean: 'not yes / no',
};

/**
 * An in-progress edit of one control, held in BOTH state and a ref.
 *
 * `null` means "follow the document": a draft exists only while somebody is
 * typing into this row and is dropped on commit or cancel, so a value changed
 * by a collaborator lands immediately in every row nobody is holding and never
 * yanks the characters out from under one they are.
 *
 * The ref is not redundant. Escape must cancel, and cancelling is `set(null)`
 * followed by `blur()` — but `blur` fires SYNCHRONOUSLY, before React has
 * re-rendered, so the blur handler's closure still sees the abandoned draft and
 * commits exactly what Escape was pressed to discard. Measured: typing "x" into
 * "Ada" and pressing Escape wrote "Adax". The ref is what the handlers read;
 * the state is only what the input renders.
 */
export interface FieldBlockProps {
    field: TypedField;
    /** False in read/print, and for a reader without write access. */
    editable?: boolean;
    /** `undefined` clears the field — see `setFieldValueEdit`. */
    onValueChange?: (value: string | undefined) => void;
    onLabelChange?: (label: string) => void;
    onTypeChange?: (type: FieldType) => void;
    onRemove?: () => void;
    testId?: string;
}

export function FieldBlock({
    field,
    editable = false,
    onValueChange,
    onLabelChange,
    onTypeChange,
    onRemove,
    testId = 'field-block',
}: FieldBlockProps) {
    const [labelDraft, setLabelDraft, readLabelDraft] = useDraft<string | null>(null);
    const [valueDraft, setValueDraft, readValueDraft] = useDraft<string | null>(null);

    const state = field.value === undefined ? 'empty' : field.valid ? 'set' : 'invalid';

    // ---------------------------------------------------------------------
    // Reading
    // ---------------------------------------------------------------------

    if (!editable) {
        const shown = formatFieldValue(field);
        return (
            <div
                data-testid={testId}
                data-field-type={field.type}
                data-field-state={state}
                className="my-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
            >
                <span
                    data-testid={`${testId}-label`}
                    className="min-w-[7.5rem] text-[12px] font-medium text-text-secondary"
                >
                    {field.label}
                </span>
                {shown ? (
                    <span
                        data-testid={`${testId}-value`}
                        className="text-[13.5px] leading-snug text-text-primary"
                    >
                        {shown}
                    </span>
                ) : (
                    <span
                        data-testid={`${testId}-empty`}
                        className="text-[12px] italic text-text-tertiary"
                    >
                        Not set
                    </span>
                )}
                {!field.valid && (
                    <Chip tone="warning" size="xs" data-testid={`${testId}-invalid`}>
                        {MISMATCH[field.type]}
                    </Chip>
                )}
            </div>
        );
    }

    // ---------------------------------------------------------------------
    // Editing
    // ---------------------------------------------------------------------

    const commitLabel = () => {
        const next = readLabelDraft();
        setLabelDraft(null);
        // A field with no name is not a field, and `setFieldLabelEdit` refuses
        // one — so reverting here is what the document would do anyway, made
        // visible instead of silently ignored.
        if (next === null || next.trim() === '' || next === field.label) return;
        onLabelChange?.(next);
    };

    const commitValue = () => {
        const next = readValueDraft();
        setValueDraft(null);
        if (next === null || next === (field.value ?? '')) return;
        // Emptying the control means "unanswered", which is stored by removing
        // the key — the same call `DateEditorRenderer` makes with
        // `e.target.value || undefined`. `value: ''` stays READABLE if some
        // other tool writes it, but this UI never produces one.
        onValueChange?.(next === '' ? undefined : next);
    };

    const keys = (commit: () => void, cancel: () => void) => ({
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') { e.preventDefault(); commit(); e.currentTarget.blur(); }
            if (e.key === 'Escape') { e.preventDefault(); cancel(); e.currentTarget.blur(); }
        },
    });

    const draftedValue = valueDraft ?? field.value ?? '';

    /** The typed control, or the raw-text repair box when the value does not fit. */
    const control = () => {
        if (!field.valid) {
            return (
                <Input
                    size="sm"
                    invalid
                    aria-label={`${field.label} (value)`}
                    data-testid={`${testId}-raw-input`}
                    className="w-[11rem]"
                    value={draftedValue}
                    onChange={(e) => setValueDraft(e.target.value)}
                    onBlur={commitValue}
                    {...keys(commitValue, () => setValueDraft(null))}
                />
            );
        }
        if (field.type === 'boolean') {
            const checked = fieldBoolean(field);
            return (
                <span className="flex items-center gap-1.5">
                    <Checkbox
                        // Unanswered is the MIXED state, not unchecked. A plain
                        // unchecked box would tell the reader this field says
                        // "No", which is a different sentence from "nobody has
                        // said" and the only one of the two that is safe to act
                        // on. Clicking a mixed box reports `true`, matching the
                        // native select-all convention.
                        checked={checked === true}
                        indeterminate={checked === undefined}
                        aria-label={field.label}
                        data-testid={`${testId}-checkbox`}
                        onChange={(next) => onValueChange?.(next ? 'true' : 'false')}
                    />
                    <span className="text-[12px] text-text-secondary">
                        {checked === undefined ? 'Not set' : checked ? 'Yes' : 'No'}
                    </span>
                </span>
            );
        }
        if (field.type === 'date') {
            const iso = fieldDate(field);
            return (
                <span className="flex items-center gap-2">
                    <Input
                        size="sm"
                        type="date"
                        aria-label={field.label}
                        data-testid={`${testId}-date-input`}
                        className="w-[9.5rem]"
                        value={iso}
                        // Committed immediately, unlike text and number: a date
                        // picker emits one discrete value with no intermediate
                        // half-typed state worth protecting.
                        onChange={(e) => onValueChange?.(e.target.value || undefined)}
                    />
                    {iso && (
                        <span
                            data-testid={`${testId}-formatted`}
                            className="text-[12px] tabular-nums text-text-tertiary"
                        >
                            {formatFieldDate(iso)}
                        </span>
                    )}
                </span>
            );
        }
        return (
            <Input
                size="sm"
                type={field.type === 'number' ? 'number' : 'text'}
                aria-label={field.label}
                data-testid={`${testId}-input`}
                className={field.type === 'number' ? 'w-[8rem]' : 'w-[13rem]'}
                placeholder="Not set"
                value={draftedValue}
                onChange={(e) => setValueDraft(e.target.value)}
                onBlur={commitValue}
                {...keys(commitValue, () => setValueDraft(null))}
            />
        );
    };

    return (
        <div
            data-testid={testId}
            data-field-type={field.type}
            data-field-state={state}
            className="my-1 flex flex-wrap items-center gap-x-2 gap-y-1"
        >
            <Input
                size="sm"
                aria-label="Field name"
                data-testid={`${testId}-label-input`}
                className="w-[9rem] font-medium"
                value={labelDraft ?? field.label}
                onChange={(e) => setLabelDraft(e.target.value)}
                onBlur={commitLabel}
                {...keys(commitLabel, () => setLabelDraft(null))}
            />

            {control()}

            {!field.valid && (
                <Chip tone="warning" size="xs" data-testid={`${testId}-invalid`}>
                    {MISMATCH[field.type]}
                </Chip>
            )}

            {field.value !== undefined && (
                <button
                    type="button"
                    data-testid={`${testId}-clear`}
                    onClick={() => onValueChange?.(undefined)}
                    className="rounded px-1 text-[12px] text-text-tertiary hover:text-text-primary"
                >
                    Clear
                </button>
            )}

            {/* Always offered, not hidden behind a hover or a "settings" step.
                The type is the one thing about a field that is genuinely hard
                to get right first time, and a field whose type cannot be
                changed is a field you have to delete and recreate — which
                loses the value you already typed. It is also the second repair
                for a flagged value: "this was never a date, it is text". */}
            <Select
                size="sm"
                aria-label="Field type"
                data-testid={`${testId}-type`}
                className="w-[7.5rem]"
                value={field.type}
                options={FIELD_TYPES.map((t) => ({ value: t, label: TYPE_LABELS[t] }))}
                onChange={(e) => onTypeChange?.(e.target.value as FieldType)}
            />

            <span className="flex-1" />

            {onRemove && (
                <button
                    type="button"
                    aria-label="Remove this field"
                    data-testid={`${testId}-remove`}
                    onClick={onRemove}
                    className="rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default FieldBlock;
