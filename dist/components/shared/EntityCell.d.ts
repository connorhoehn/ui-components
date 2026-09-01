export interface EntityCellProps {
    label: string;
    /** Secondary monospace subline (e.g. ID or slug). */
    id?: string;
    /** Makes the label a link. */
    href?: string;
    /** Extra monospace styling on the ID subline (already monospace by default; this is reserved for callers needing emphasis). */
    mono?: boolean;
    className?: string;
    labelClassName?: string;
}
export declare function EntityCell({ label, id, href, mono, className, labelClassName, }: EntityCellProps): import("react").JSX.Element;
export default EntityCell;
//# sourceMappingURL=EntityCell.d.ts.map