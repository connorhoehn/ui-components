import { type Tone } from '../shared/tones';
export type RecordResultType = 'person' | 'initiative' | 'work' | 'decision' | 'knowledge' | 'asset';
/** One typed org record, as a search read model returns it. */
export interface RecordResultItem {
    id: string;
    type: RecordResultType;
    title: string;
    description?: string;
    /** The meta line's first half: "Owner · Auth Migration", "Guide · Published". */
    subtitle?: string;
    /** Raw status ("in_progress", "blocked"); drawn as a dot + label. */
    status?: string;
    href: string;
    /** Why the record matched: "Matched through initiative membership". */
    matchReason?: string;
    /** Terms the host wants marked in this row, merged with the list's `highlightTerms`. */
    highlights?: string[];
    avatarUrl?: string;
}
/** The key a selection holds: `${type}:${id}` (the portal's `recordKey`). */
export declare const recordResultKey: (record: Pick<RecordResultItem, 'type' | 'id'>) => string;
/** Plural section labels per type — the default group headings. */
export declare const RECORD_TYPE_LABELS: Record<RecordResultType, string>;
/** blocked → danger, open / in_progress → success, everything else (done, draft…) → neutral. */
export declare function recordStatusTone(status: string | undefined | null): Tone;
/** "in_progress" → "In progress". */
export declare function recordStatusLabel(status: string): string;
/** The row's leading mark. Decorative: the title beside it is the accessible name. */
export declare function RecordMark({ record, size }: {
    record: RecordResultItem;
    size?: number;
}): import("react").JSX.Element;
/** Status dot + label, toned by `recordStatusTone`. */
export declare function RecordStatus({ status, className }: {
    status: string;
    className?: string;
}): import("react").JSX.Element;
//# sourceMappingURL=recordMarks.d.ts.map