export interface OutlineEntry {
    /** Opaque to this component — an element id, a position, whatever the host resolves. */
    id: string;
    text: string;
    /** 1-6. Drives indentation only; the list is flat and in document order. */
    level: number;
}
export interface DocumentOutlineProps {
    entries: readonly OutlineEntry[];
    /** The entry the reader is currently inside, if the host tracks it. */
    activeId?: string | null;
    onSelect?: (id: string) => void;
    /** Shown when the document has no headings yet. */
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function DocumentOutline({ entries, activeId, onSelect, emptyLabel, className, 'data-testid': testId, }: DocumentOutlineProps): import("react").JSX.Element;
export default DocumentOutline;
//# sourceMappingURL=DocumentOutline.d.ts.map