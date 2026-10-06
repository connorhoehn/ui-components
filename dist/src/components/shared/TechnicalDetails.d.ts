export interface TechnicalDetailsProps {
    /** The raw text. Rendered verbatim. Nothing renders when empty. */
    text?: string | null;
    /** Trigger copy, collapsed state. Default "Show technical details". */
    label?: string;
    /** Trigger copy, expanded state. Default "Hide technical details". */
    hideLabel?: string;
    /** Start expanded. Default false — the point is that it stays out of the way. */
    defaultOpen?: boolean;
    className?: string;
    testId?: string;
}
declare function TechnicalDetails({ text, label, hideLabel, defaultOpen, className, testId, }: TechnicalDetailsProps): import("react").JSX.Element | null;
export default TechnicalDetails;
//# sourceMappingURL=TechnicalDetails.d.ts.map