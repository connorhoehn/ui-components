import { type ReactNode } from 'react';
export interface EmptyStateAction {
    /** Visible label on the action button or link. */
    label: string;
    /** Click handler — required when `href` is not set. */
    onClick?: () => void;
    /** External / internal link — required when `onClick` is not set. */
    href?: string;
    /**
     * Visual variant.
     * `primary`   — solid indigo, used for the first/most important step
     * `secondary` — outlined, used for additional steps
     * Defaults to `primary` for the first action, `secondary` for the rest.
     */
    variant?: 'primary' | 'secondary';
    /**
     * When true (and `href` is set), opens in a new tab with
     * `target=_blank rel=noopener noreferrer` and an sr-only
     * "(opens in new tab)" hint.
     */
    external?: boolean;
    /**
     * Optional copy-to-clipboard CLI snippet rendered in a monospaced
     * `<pre>` underneath the action button.
     */
    code?: string;
}
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
     * Multi-action "what to do next" list. When provided, takes precedence
     * over `action` / `actionLabel`+`onAction`. Each entry renders a
     * button or link, with an optional copyable code snippet underneath.
     */
    actions?: EmptyStateAction[];
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
declare function EmptyState({ icon, title, body, description, actionLabel, onAction, action, actions, testId, actionTestId, }: EmptyStateProps): import("react").JSX.Element;
export default EmptyState;
//# sourceMappingURL=EmptyState.d.ts.map