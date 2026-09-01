export interface ChangeLocationProps {
    /**
     * Breadcrumb from the document root, outermost first —
     * e.g. `['Section 4', 'Payment terms']`. An empty array renders the
     * document-level case rather than an empty strip.
     */
    path: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. Optional. */
    hint?: string | undefined;
    /** Shown when `path` is empty. */
    rootLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function ChangeLocation({ path, hint, rootLabel, className, 'data-testid': testId, }: ChangeLocationProps): import("react").JSX.Element;
export default ChangeLocation;
//# sourceMappingURL=ChangeLocation.d.ts.map