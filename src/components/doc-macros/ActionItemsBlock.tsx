// ui-components/src/components/doc-macros/ActionItemsBlock.tsx
//
// A `macro:action-items` fence, drawn as a checklist.
//
// Presentation only — it is handed items and four callbacks, and never touches
// the document. Every callback goes back through `ActionItemsMacro`'s node
// view, which turns it into a minimal text edit on the macro's YAML body. That
// separation is what keeps this file testable without a ProseMirror editor,
// and it is why there is no local "checked" state here: the tick is not UI
// state that later syncs, it IS the document, read back through the node.
//
// ## Colours
//
// Chrome tokens (`bg-surface-inset`, `border-border`, `text-text-*`), the same
// family `DiagramBlockRenderer` uses, NOT the `--color-paper-*` family. Both
// halves of a chrome pair flip together in dark mode, so the block stays
// legible; the paper family is theme-INVARIANT white and is reserved for the
// page's own prose surface, where a themed ink would go white-on-white. A macro
// block is a tool sitting on the page, not the page.
//
// ## Item text
//
// Committed on blur and on Enter, never per keystroke. A controlled input fed
// from `node.textContent` would be re-seeded by our own dispatch on every
// character — the caret jumps to the end mid-word, and two people typing in the
// same item fight over the whole scalar instead of merging. On commit it is one
// minimal edit, which is what the CRDT wants and what the suggestion fork
// records as one change.

import { useEffect, useRef, useState } from 'react';
import { Select } from '../forms/Select';
import { useDraft } from './useDraft';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { cn } from '../../lib/cn';
import type { ActionItem } from './actionItemsText';

/**
 * One candidate assignee.
 *
 * Same shape as `HitlPerson`, and for the same load-bearing reason: `id` is
 * the AUTH SUBJECT, because that is what `/api/items/mine` queries on. Writing
 * a display name here is what once left that endpoint unable to find a single
 * assigned item. The name is a label and is never written into the body.
 */
export interface AssignablePerson {
    id: string;
    name: string;
}

export interface ActionItemsBlockProps {
    items: readonly ActionItem[];
    /** False renders the checklist as a read-only list — no ticking, no edits. */
    editable?: boolean;
    onToggle?: (index: number) => void;
    onTextChange?: (index: number, text: string) => void;
    onRemoveItem?: (index: number) => void;
    onAddItem?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    /**
     * Who an item can be assigned to.
     *
     * The format has carried `assignee:` since it was written and this block
     * has always DISPLAYED it — an `@ana` chip — with nothing anywhere able to
     * SET it. So an action item created on a canvas could never be assigned,
     * and the inbox's Tasks lane could never be filled from the document shape
     * this product is moving to. Meanwhile Data Types ships a built-in whose
     * own description is "Task List — ASSIGNABLE action items with status
     * tracking", and the HITL callout next door has had a working picker all
     * along.
     *
     * Omitted renders no picker, which is right for a host with no directory:
     * a control listing nobody is worse than none.
     */
    people?: readonly AssignablePerson[];
    /** Only ever called with an id from `people`, or `''` to unassign. */
    onAssign?: (index: number, assigneeId: string) => void;
    /**
     * Sets `due:` on one item, or clears it with `''`.
     *
     * Same gap the assignee had: the format has always carried `due:` and this
     * block has always drawn the chip, with nothing able to write one. A
     * deadline that can only be typed by hand-editing the fence is a deadline
     * nobody sets, and `ActionItemMirrorRow.dueDate` — already projected into
     * the inbox row — was therefore always null.
     *
     * Omitted renders the chip and no control, which is what a read-only view
     * wants.
     */
    onDue?: (index: number, due: string) => void;
    'data-testid'?: string;
}

/**
 * The tick target.
 *
 * `role="checkbox"` on a button rather than an `<input type="checkbox">`: a
 * form control inside a ProseMirror node view has to fight the editor for its
 * own change events, and this needs none of what a form control brings. The
 * ARIA role and `aria-checked` carry the whole semantic to a screen reader.
 */
function ItemCheckbox({
    item,
    editable,
    onToggle,
    testId,
}: {
    item: ActionItem;
    editable: boolean;
    onToggle?: () => void;
    testId: string;
}) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={item.done}
            aria-label={item.text || 'Untitled action item'}
            disabled={!editable}
            data-testid={testId}
            data-status={item.status || 'none'}
            onClick={onToggle}
            className={cn(
                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] leading-none transition-colors',
                item.done
                    ? 'border-success-border bg-success text-white'
                    : 'border-border-emphasis bg-surface',
                editable ? 'cursor-pointer hover:border-primary' : 'cursor-default',
            )}
        >
            {item.done ? '✓' : ''}
        </button>
    );
}

/**
 * Who this item is for.
 *
 * An assignee the directory has never heard of is kept as an option of its own
 * rather than silently reset to nobody by the first render — the body is the
 * record, and a picker is not entitled to rewrite it because this client's
 * roster happens to be short. Same rule as the HITL callout's picker.
 */
function AssignPicker({
    value,
    people,
    onAssign,
    testId,
}: {
    value: string | null;
    people: readonly AssignablePerson[];
    onAssign: (id: string) => void;
    testId: string;
}) {
    const current = value ?? '';
    const known = people.some((p) => p.id === current);
    return (
        <Select
            size="sm"
            data-testid={`${testId}-assign`}
            aria-label="Assign this action item"
            value={current}
            onChange={(e) => onAssign(e.target.value)}
            options={[
                { value: '', label: 'unassigned' },
                ...(current && !known ? [{ value: current, label: `for ${current}` }] : []),
                ...people.map((p) => ({ value: p.id, label: `for ${p.name}` })),
            ]}
        />
    );
}

/**
 * The date this item is wanted by.
 *
 * Quiet until it is used: an empty `<input type="date">` on every row draws a
 * `mm/dd/yyyy` placeholder next to every unscheduled item, which is most of
 * them, so an unset due date is a small ghost button that becomes the field on
 * click. That is view state, not document state — the value itself is read
 * from the node on every render, like everything else here.
 *
 * A `due` the picker cannot represent (`next friday`, say, written by hand or
 * by some other tool) is left as a chip rather than offered in a date field
 * that would render it blank and then quietly overwrite it on the next change.
 * Same rule as the assignee picker's unknown id: the body is the record.
 */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function DuePicker({
    value,
    onDue,
    testId,
}: {
    value: string;
    onDue: (due: string) => void;
    testId: string;
}) {
    const [open, setOpen] = useState(false);

    if (!value && !open) {
        return (
            <Button
                variant="ghost"
                size="sm"
                aria-label="Set a due date"
                data-testid={`${testId}-due-add`}
                onClick={() => setOpen(true)}
                className="whitespace-nowrap"
            >
                + due
            </Button>
        );
    }

    return (
        <Input
            type="date"
            size="sm"
            autoFocus={open && !value}
            data-testid={`${testId}-due-set`}
            aria-label="Due date"
            value={value}
            onChange={(e) => onDue(e.target.value)}
            onBlur={() => setOpen(false)}
            className="w-[122px] border-transparent bg-transparent tabular-nums hover:border-border"
        />
    );
}

/** `assignee` and `due`, shown only when the payload carries them. */
function ItemMeta({
    item,
    testId,
    hideAssignee = false,
    hideDue = false,
}: { item: ActionItem; testId: string; hideAssignee?: boolean; hideDue?: boolean }) {
    const chip =
        'rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary';
    return (
        <>
            {item.assignee && !hideAssignee ? (
                <span data-testid={`${testId}-assignee`} className={chip}>
                    @{item.assignee}
                </span>
            ) : null}
            {item.due && !hideDue ? (
                <span data-testid={`${testId}-due`} className={chip}>
                    due {item.due}
                </span>
            ) : null}
            {/* A status this package does not know is SHOWN, not normalised —
                the block is a view of the file, and quietly relabelling
                someone's `blocked` as pending would be a lie about it. */}
            {item.status !== '' && item.status !== 'pending' && item.status !== 'done' ? (
                <span data-testid={`${testId}-status`} className={chip}>
                    {item.status}
                </span>
            ) : null}
        </>
    );
}

function ItemText({
    item,
    editable,
    onTextChange,
    testId,
}: {
    item: ActionItem;
    editable: boolean;
    onTextChange?: (text: string) => void;
    testId: string;
}) {
    const [draft, setDraft, readDraft] = useDraft(item.text);
    const focused = useRef(false);

    // Re-seed from the document, but never while the user is in the field —
    // that is the caret-jump this component exists to avoid. A remote edit to
    // an item somebody is typing in lands when they leave it.
    useEffect(() => {
        if (!focused.current) setDraft(item.text);
    }, [item.text]);

    if (!editable) {
        return (
            <span
                data-testid={`${testId}-text`}
                className={cn(
                    'min-w-0 flex-1 text-[13px] leading-5',
                    item.done ? 'text-text-tertiary line-through' : 'text-text-primary',
                )}
            >
                {item.text || <span className="text-text-tertiary">Untitled action item</span>}
            </span>
        );
    }

    // Reads the draft through the ref, not the closure. Escape restores the
    // original and then blurs, and blur fires SYNCHRONOUSLY — before React has
    // applied the restore — so a closure read here commits exactly what Escape
    // discarded. Measured: typing `x` into `Ada` and pressing Escape wrote
    // `Adax`. See `useDraft`.
    const commit = () => {
        const current = readDraft();
        if (current !== item.text) onTextChange?.(current);
    };

    return (
        <Input
            size="sm"
            data-testid={`${testId}-text`}
            value={draft}
            placeholder="Untitled action item"
            aria-label="Action item text"
            onChange={(e) => setDraft(e.target.value)}
            onFocus={() => {
                focused.current = true;
            }}
            onBlur={() => {
                focused.current = false;
                commit();
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    commit();
                    (e.target as HTMLElement).blur();
                } else if (e.key === 'Escape') {
                    setDraft(item.text);
                    (e.target as HTMLElement).blur();
                }
            }}
            className={cn(
                'min-w-0 flex-1 border-transparent bg-transparent hover:border-border',
                item.done && 'text-text-tertiary line-through',
            )}
        />
    );
}

export function ActionItemsBlock({
    items,
    editable = false,
    onToggle,
    onTextChange,
    onRemoveItem,
    onAddItem,
    onRemove,
    people,
    onAssign,
    onDue,
    'data-testid': testId = 'action-items',
}: ActionItemsBlockProps) {
    const done = items.filter((i) => i.done).length;

    return (
        <div data-testid={testId} className="my-3">
            <div className="flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1">
                <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                    Action items
                </span>
                <div className="flex shrink-0 items-center gap-2">
                    <span
                        data-testid={`${testId}-progress`}
                        className="text-[11px] tabular-nums text-text-tertiary"
                    >
                        {done} of {items.length} done
                    </span>
                    {editable && onRemove ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            data-testid={`${testId}-remove`}
                            onClick={onRemove}
                        >
                            Remove
                        </Button>
                    ) : null}
                </div>
            </div>

            <div className="rounded-b-md border border-border bg-surface px-2.5 py-2">
                {items.length === 0 ? (
                    <p
                        data-testid={`${testId}-empty`}
                        className="px-0.5 py-1 text-[13px] text-text-tertiary"
                    >
                        No action items yet.
                    </p>
                ) : (
                    <ul className="m-0 flex list-none flex-col gap-1 p-0">
                        {items.map((item) => {
                            const rowId = `${testId}-item-${item.index}`;
                            return (
                                <li
                                    key={item.index}
                                    data-testid={rowId}
                                    data-done={String(item.done)}
                                    className="flex items-start gap-2"
                                >
                                    <ItemCheckbox
                                        item={item}
                                        editable={editable}
                                        onToggle={() => onToggle?.(item.index)}
                                        testId={`${rowId}-toggle`}
                                    />
                                    <ItemText
                                        item={item}
                                        editable={editable}
                                        onTextChange={(text) => onTextChange?.(item.index, text)}
                                        testId={rowId}
                                    />
                                    <div className="flex shrink-0 items-center gap-1 pt-0.5">
                                        {/* The picker replaces the static chip
                                            while editing — two controls for one
                                            fact would be a choice nobody should
                                            have to make. */}
                                        {editable && people && onAssign ? (
                                            <AssignPicker
                                                value={item.assignee}
                                                people={people}
                                                onAssign={(id) => onAssign(item.index, id)}
                                                testId={rowId}
                                            />
                                        ) : null}
                                        {editable && onDue && (item.due === null || ISO_DATE.test(item.due)) ? (
                                            <DuePicker
                                                value={item.due ?? ''}
                                                onDue={(due) => onDue(item.index, due)}
                                                testId={rowId}
                                            />
                                        ) : null}
                                        <ItemMeta
                                            item={item}
                                            testId={rowId}
                                            hideAssignee={Boolean(editable && people && onAssign)}
                                            hideDue={Boolean(
                                                editable &&
                                                    onDue &&
                                                    (item.due === null || ISO_DATE.test(item.due)),
                                            )}
                                        />
                                        {editable ? (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                aria-label="Remove action item"
                                                data-testid={`${rowId}-remove`}
                                                onClick={() => onRemoveItem?.(item.index)}
                                            >
                                                ✕
                                            </Button>
                                        ) : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {editable ? (
                    <div className="pt-1.5">
                        <Button
                            variant="ghost"
                            size="sm"
                            data-testid={`${testId}-add`}
                            onClick={onAddItem}
                        >
                            + Add item
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ActionItemsBlock;
