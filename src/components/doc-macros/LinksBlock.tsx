// ui-components/src/components/doc-macros/LinksBlock.tsx
//
// A `macro:links` fence, drawn as a reference list.
//
// Presentation only — it is handed rows and four callbacks and never touches
// the document, the same separation `ActionItemsBlock` documents. Text is
// committed on blur and on Enter rather than per keystroke, for the same reason
// again: a controlled input re-seeded by our own dispatch jumps the caret
// mid-word, and one commit is one minimal edit the CRDT can merge.
//
// ## No card
//
// A run of links is a list, not a record, so this draws the same small
// bordered panel the checklist does rather than the heavier decision card. The
// reading mode is the one that matters — most people looking at a page of links
// are not editing it — so a read-only row is an anchor and nothing else: no
// chrome, no bullet furniture, just the label people came to click.
//
// ## A row with an unsafe or missing URL is TEXT
//
// `linkHref` decides, not this file (see `linksText.ts`). What this file does
// with a `null` href is show the label as plain text with the raw URL beside
// it — never silently drop the row. The bytes said something and the reader is
// entitled to see what.

import { useEffect, useRef } from 'react';
import { useDraft } from './useDraft';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { cn } from '../../lib/cn';
import { linkHref, type LinkRow } from './linksText';

export interface LinksBlockProps {
    rows: readonly LinkRow[];
    /** False renders the list as anchors only — no editing. */
    editable?: boolean;
    onLabelChange?: (index: number, label: string) => void;
    onUrlChange?: (index: number, url: string) => void;
    onRemoveRow?: (index: number) => void;
    onAddRow?: () => void;
    /** Takes the whole block off the page. Omitted when not editable. */
    onRemove?: () => void;
    'data-testid'?: string;
}

/** Commits on blur and Enter, restores on Escape. */
function CommittingInput({
    value,
    placeholder,
    ariaLabel,
    onCommit,
    testId,
    className,
}: {
    value: string;
    placeholder: string;
    ariaLabel: string;
    onCommit: (next: string) => void;
    testId: string;
    className?: string;
}) {
    const [draft, setDraft, readDraft] = useDraft(value);
    const focused = useRef(false);

    useEffect(() => {
        if (!focused.current) setDraft(value);
    }, [value]);

    // Reads through the ref, not the closure: Escape restores and then blurs,
    // and blur fires SYNCHRONOUSLY — before React has applied the restore — so
    // a closure read here would commit exactly what Escape discarded.
    const commit = () => {
        const current = readDraft();
        if (current !== value) onCommit(current);
    };

    return (
        <Input
            size="sm"
            data-testid={testId}
            value={draft}
            placeholder={placeholder}
            aria-label={ariaLabel}
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
                    setDraft(value);
                    (e.target as HTMLElement).blur();
                }
            }}
            className={cn('border-transparent bg-transparent hover:border-border', className)}
        />
    );
}

/** One row as a reader sees it: an anchor, or text when there is no safe href. */
function ReadRow({ row, testId }: { row: LinkRow; testId: string }) {
    const href = linkHref(row.url);
    const label = row.label || row.url || 'Untitled link';
    if (!href) {
        return (
            <span data-testid={`${testId}-text`} className="text-[13px] leading-5 text-text-primary">
                {label}
                {row.url ? (
                    <span className="ml-1.5 text-[11px] text-text-tertiary">{row.url}</span>
                ) : null}
            </span>
        );
    }
    return (
        <a
            data-testid={`${testId}-anchor`}
            href={href}
            target="_blank"
            // `noopener` is the load-bearing half: without it the opened page
            // gets a handle on this window and can navigate it somewhere else.
            rel="noopener noreferrer"
            className="text-[13px] leading-5 text-info underline decoration-info/40 underline-offset-2 hover:decoration-info"
        >
            {label}
        </a>
    );
}

export function LinksBlock({
    rows,
    editable = false,
    onLabelChange,
    onUrlChange,
    onRemoveRow,
    onAddRow,
    onRemove,
    'data-testid': testId = 'links',
}: LinksBlockProps) {
    return (
        <div data-testid={testId} className="my-3">
            <div className="flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1">
                <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                    Links
                </span>
                {editable && onRemove ? (
                    <Button variant="ghost" size="sm" data-testid={`${testId}-remove`} onClick={onRemove}>
                        Remove
                    </Button>
                ) : null}
            </div>

            <div className="rounded-b-md border border-border bg-surface px-2.5 py-2">
                {rows.length === 0 ? (
                    <p
                        data-testid={`${testId}-empty`}
                        className="px-0.5 py-1 text-[13px] text-text-tertiary"
                    >
                        No links yet.
                    </p>
                ) : (
                    <ul className="m-0 flex list-none flex-col gap-1 p-0">
                        {rows.map((row) => {
                            const rowId = `${testId}-row-${row.index}`;
                            return (
                                <li key={row.index} data-testid={rowId} className="flex items-center gap-2">
                                    {editable ? (
                                        <>
                                            <CommittingInput
                                                value={row.label}
                                                placeholder="Label"
                                                ariaLabel="Link label"
                                                testId={`${rowId}-label`}
                                                onCommit={(next) => onLabelChange?.(row.index, next)}
                                                className="w-[34%] min-w-0"
                                            />
                                            <CommittingInput
                                                value={row.url}
                                                placeholder="https://"
                                                ariaLabel="Link URL"
                                                testId={`${rowId}-url`}
                                                onCommit={(next) => onUrlChange?.(row.index, next)}
                                                className="min-w-0 flex-1 font-mono text-[11px]"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                aria-label="Remove link"
                                                data-testid={`${rowId}-remove`}
                                                onClick={() => onRemoveRow?.(row.index)}
                                            >
                                                ✕
                                            </Button>
                                        </>
                                    ) : (
                                        <ReadRow row={row} testId={rowId} />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}

                {editable ? (
                    <div className="pt-1.5">
                        <Button variant="ghost" size="sm" data-testid={`${testId}-add`} onClick={onAddRow}>
                            + Add link
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default LinksBlock;
