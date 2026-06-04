import type { ReactNode } from 'react';
export interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    /** Plain-text body (preferred when no markup is needed). */
    body?: string;
    /** Alias for `body` — accepts any ReactNode for richer copy. */
    description?: ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    /** Custom action node (overrides actionLabel/onAction when present). */
    action?: ReactNode;
    /**
     * Optional testid for the container (defaults to "empty-state").
     * Callers with existing tests targeting a specific id can pass it here.
     */
    testId?: string;
    /**
     * Optional testid for the action button (defaults to "empty-state-action").
     */
    actionTestId?: string;
}
declare function EmptyState({ icon, title, body, description, actionLabel, onAction, action, testId, actionTestId, }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export default EmptyState;
//# sourceMappingURL=EmptyState.d.ts.map