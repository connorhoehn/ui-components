export declare const COMMENT_MARGIN_STORAGE_KEY = "doc-editor:canvas:gutter-visible";
export interface CommentMarginPreferenceOptions {
    /** Where the choice is remembered. */
    storageKey?: string;
    /** What a reader who never chose sees. Default false (closed). */
    defaultVisible?: boolean;
}
export interface CommentMarginPreference {
    visible: boolean;
    /** Flips the margin and remembers the choice. */
    toggle: () => void;
    /** Opens the margin (a thread was opened) and remembers it. */
    show: () => void;
}
/** The stored choice, or `fallback` when there is none (or storage is unavailable). */
export declare function readCommentMarginPreference(storageKey?: string, fallback?: boolean): boolean;
export declare function useCommentMarginPreference({ storageKey, defaultVisible, }?: CommentMarginPreferenceOptions): CommentMarginPreference;
//# sourceMappingURL=useCommentMarginPreference.d.ts.map