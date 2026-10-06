import type { ReactNode } from 'react';
import type { EmptyStateAction } from './EmptyState';
export interface CapabilityDeniedFallbackProps {
    /**
     * Capability name as the user would recognize it (e.g. "Chat",
     * "Recording", "AI Assistant"). Used in the default title.
     */
    capabilityName?: string;
    /** Override the default title entirely. */
    title?: string;
    /** Body copy explaining why the feature is unavailable / how to enable it. */
    description?: ReactNode;
    /**
     * Optional CTA — typically a "Request access" or "Upgrade plan" link.
     * For multiple CTAs use `actions` instead.
     */
    actionLabel?: string;
    onAction?: () => void;
    /** Multi-action variant. Takes precedence over actionLabel/onAction. */
    actions?: EmptyStateAction[];
    /** Override the default lock icon. Pass `null` to remove the icon. */
    icon?: ReactNode | null;
    /** Test id (defaults to `capability-denied-fallback`). */
    testId?: string;
}
export declare function CapabilityDeniedFallback({ capabilityName, title, description, actionLabel, onAction, actions, icon, testId, }: CapabilityDeniedFallbackProps): import("react").JSX.Element;
export default CapabilityDeniedFallback;
//# sourceMappingURL=CapabilityDeniedFallback.d.ts.map