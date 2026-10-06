/** A page of revisions is not the whole history: how many more exist, and how to ask for them. */
export interface OlderRevisions {
    /** Revisions older than the oldest one in hand. */
    count: number;
    /** The next page is on its way. */
    loading?: boolean;
    /** Ask the host for the next older page. */
    onLoad: () => void;
}
/** The option value that stands for "the next older page", never a revision id. */
export declare const OLDER_REVISIONS_VALUE = "__older-revisions__";
export declare function revisionPickerOptions(revisions: readonly {
    id: string;
    label: string;
}[], older?: OlderRevisions): Array<{
    value: string;
    label: string;
    disabled?: boolean;
}>;
/** A pick from the picker: the older-page entry loads, anything else selects. */
export declare function pickRevision(value: string, onSelect: ((revisionId: string) => void) | undefined, older?: OlderRevisions): void;
//# sourceMappingURL=revisionPicker.d.ts.map