export interface ChangeDiffPair {
    before: string;
    after: string;
}
export interface ChangeDiffProps {
    pairs: readonly ChangeDiffPair[];
    /** Label for the current value. */
    beforeLabel?: string;
    /** Label for the value being proposed. */
    afterLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function ChangeDiff({ pairs, beforeLabel, afterLabel, className, 'data-testid': testId, }: ChangeDiffProps): import("react").JSX.Element | null;
export default ChangeDiff;
//# sourceMappingURL=ChangeDiff.d.ts.map