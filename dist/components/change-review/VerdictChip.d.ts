import { type ChangeReviewStatus, type ChangeReviewVerdict } from './types';
export interface VerdictChipProps {
    verdict?: ChangeReviewVerdict | undefined;
    /** How the review itself is going. Defaults to `idle`. */
    status?: ChangeReviewStatus | undefined;
    /** Why the review failed. Shown verbatim when `status` is `failed`. */
    error?: string | undefined;
    /**
     * The change's CURRENT revision. Pass it, or staleness cannot be detected
     * and an out-of-date verdict will render as if it still applies.
     */
    revision?: string | undefined;
    /** Start with the reasoning open. Default false — see the note above. */
    defaultExpanded?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function VerdictChip({ verdict, status, error, revision, defaultExpanded, className, 'data-testid': testId, }: VerdictChipProps): import("react").JSX.Element;
export default VerdictChip;
//# sourceMappingURL=VerdictChip.d.ts.map