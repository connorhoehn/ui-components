export interface PromptContextItem {
    id: string;
    title: string;
    /** 'page' | 'presentation' | 'diagram' | … — drives the chip's glyph. */
    kind?: string;
}
export interface PromptContext {
    items: readonly PromptContextItem[];
    /** False when the set is full (the item is refused). An item already present only has its title refreshed. */
    add: (item: PromptContextItem) => boolean;
    remove: (id: string) => void;
    has: (id: string) => boolean;
    /** Add when absent, remove when present. Returns whether it is now present. */
    toggle: (item: PromptContextItem) => boolean;
    clear: () => void;
}
/** The most documents one prompt carries (the deck pipeline reads at most 6; room for a picker to show "full"). */
export declare const PROMPT_CONTEXT_LIMIT = 10;
/** The drag payload a result row sets and the composer accepts: a JSON array of `PromptContextItem`. */
export declare const PROMPT_CONTEXT_DRAG_TYPE = "application/x-uic-prompt-context";
/** The store's operations without React — for a drop handler or a test. */
export declare function promptContextStore(scope?: string): Omit<PromptContext, 'items'> & {
    get: () => readonly PromptContextItem[];
};
/** Tests: forget every scope's in-memory copy (storage is left alone). */
export declare function resetPromptContextStores(): void;
export declare function usePromptContext(scope?: string): PromptContext;
/** Sets a drag's payload: the prompt-context MIME (JSON) plus the titles as plain text. */
export declare function writePromptContextDrag(dataTransfer: DataTransfer, items: readonly PromptContextItem[]): void;
/** True while a drag carries a prompt-context payload (types are readable during dragover; data is not). */
export declare function isPromptContextDrag(dataTransfer: DataTransfer | null | undefined): boolean;
/** The items a drop carried, cleaned; [] for any other drop. */
export declare function readPromptContextDrag(dataTransfer: DataTransfer | null | undefined): PromptContextItem[];
//# sourceMappingURL=usePromptContext.d.ts.map