import type { ReactNode } from 'react';
import { type NetworkErrorBoundaryProps } from './NetworkErrorBoundary';
import { type ReconnectingShimConnectionState } from './ReconnectingShim';
export interface NetworkShimOptions {
    /** Current connection lifecycle state from the caller's gateway/hook layer. */
    connectionState: ReconnectingShimConnectionState;
    /**
     * Single retry callback re-used by:
     *   - ReconnectingShim's "Try again" CTA when disconnected
     *   - NetworkErrorBoundary's retry CTA when a hook throws
     * Omit if reconnect is fully automatic — both CTAs hide instead of showing.
     */
    onRetry?: () => void;
    reconnectingLabel?: string;
    disconnectedTitle?: string;
    disconnectedDescription?: string;
    /** Label for the retry CTA (used in both ReconnectingShim + boundary). */
    retryLabel?: string;
    /** Override for the connecting-state placeholder. */
    connectingPlaceholder?: ReactNode;
    /**
     * Replace the disconnected-state node entirely. When provided,
     * `disconnectedTitle`/`description`/`retryLabel` are ignored.
     */
    disconnectedFallback?: ReactNode;
    /** Title shown in the boundary's default fallback. */
    errorTitle?: string;
    /** Body shown in the boundary's default fallback. */
    errorDescription?: string;
    /** Forwarded to NetworkErrorBoundary.onError. */
    onError?: NetworkErrorBoundaryProps['onError'];
    /**
     * Custom render override for the boundary fallback. When provided,
     * `errorTitle`/`errorDescription`/`retryLabel` are ignored.
     */
    errorFallback?: NetworkErrorBoundaryProps['fallback'];
    /** className forwarded to ReconnectingShim's outer wrapper. */
    className?: string;
}
/**
 * Wrap `node` in NetworkErrorBoundary + ReconnectingShim when `opts` is
 * provided; otherwise return `node` unchanged. Used by Wrapped* adapters
 * as a one-line opt-in for the standard connection-resiliency UI.
 */
export declare function applyNetworkShim(node: ReactNode, opts: NetworkShimOptions | undefined): ReactNode;
//# sourceMappingURL=networkShim.d.ts.map