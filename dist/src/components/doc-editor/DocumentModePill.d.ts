export type DocumentModePillMode = 'editing' | 'suggesting' | 'review' | 'read';
export interface DocumentModePillProps {
    mode: DocumentModePillMode;
    /** Why this mode — shown as the tooltip. "Finalized: read only", say. */
    reason?: string;
    className?: string;
    'data-testid'?: string;
}
/** The pill's words per mode, for a host or a menu that states the mode without the pill. Since 2.385.1. */
export declare const DOCUMENT_MODE_LABELS: Record<DocumentModePillMode, string>;
export declare function DocumentModePill({ mode, reason, className, 'data-testid': testId, }: DocumentModePillProps): import("react").JSX.Element;
export default DocumentModePill;
//# sourceMappingURL=DocumentModePill.d.ts.map