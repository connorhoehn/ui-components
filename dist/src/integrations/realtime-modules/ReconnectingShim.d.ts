import type { ReactNode } from 'react';
export type ReconnectingShimConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
export interface ReconnectingShimProps {
    /** Current connection lifecycle state from the gateway / hook layer. */
    connectionState: ReconnectingShimConnectionState;
    children: ReactNode;
    /**
     * Invoked when the user clicks the disconnected-state retry button.
     * Omit to hide the button (e.g. when reconnect is automatic-only).
     */
    onRetry?: () => void;
    /** Label override for the reconnecting overlay. Default: "Reconnecting…". */
    reconnectingLabel?: string;
    /** Title shown in the disconnected EmptyState. Default: "Disconnected". */
    disconnectedTitle?: string;
    /** Description shown in the disconnected EmptyState. */
    disconnectedDescription?: string;
    /** Retry button label. Default: "Try again". */
    retryLabel?: string;
    /** Optional override for the connecting-state placeholder (e.g. a custom skeleton). */
    connectingPlaceholder?: ReactNode;
    /**
     * Optional override for the disconnected-state node. When provided,
     * replaces the built-in EmptyState (`disconnectedTitle`/`description`/
     * `retryLabel`/`onRetry` are ignored).
     */
    disconnectedFallback?: ReactNode;
    className?: string;
}
export declare function ReconnectingShim({ connectionState, children, onRetry, reconnectingLabel, disconnectedTitle, disconnectedDescription, retryLabel, connectingPlaceholder, disconnectedFallback, className, }: ReconnectingShimProps): import("react").JSX.Element;
//# sourceMappingURL=ReconnectingShim.d.ts.map