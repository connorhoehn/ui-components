import { type EmptyStateSize } from './EmptyState';
export interface NoAccessStateProps {
    /** What they tried to open, as a noun phrase: "this presentation". */
    resource: string;
    /** Who can share it. Omitted → "its owner". */
    ownerName?: string | null;
    /** Optional way back ("Back to documents"). */
    actionLabel?: string;
    onAction?: () => void;
    size?: EmptyStateSize;
    className?: string;
    testId?: string;
}
/** "You don't have access to <resource> — ask <owner> to share it." */
export declare function noAccessMessage(resource: string, ownerName?: string | null): string;
export declare function NoAccessState({ resource, ownerName, actionLabel, onAction, size, className, testId }: NoAccessStateProps): import("react").JSX.Element;
export default NoAccessState;
//# sourceMappingURL=NoAccessState.d.ts.map