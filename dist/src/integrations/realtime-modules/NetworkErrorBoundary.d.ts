import { Component, type ErrorInfo, type ReactNode } from 'react';
export interface NetworkErrorBoundaryProps {
    children: ReactNode;
    /**
     * Render override. Receives the caught error + a reset callback that
     * resets the boundary state. Use when you want a custom error UI
     * (e.g. inline alert vs. full empty-state card).
     */
    fallback?: (error: Error, reset: () => void) => ReactNode;
    /**
     * Optional callback fired when the caller clicks the retry button.
     * Use to re-run the underlying hook (e.g. gateway.reconnect()) BEFORE
     * the boundary resets so the next render has a fresh attempt.
     */
    onRetry?: () => void;
    /**
     * Logging hook called on caught errors. Defaults to `console.error`.
     * Override to forward to a telemetry sink without losing the stack.
     */
    onError?: (error: Error, info: ErrorInfo) => void;
    /** Title shown in the default fallback. Default: "Something went wrong". */
    title?: string;
    /** Body shown in the default fallback. Defaults to the caught error message. */
    description?: string;
    /** Retry button label. Default: "Retry". */
    retryLabel?: string;
}
interface NetworkErrorBoundaryState {
    error: Error | null;
}
export declare class NetworkErrorBoundary extends Component<NetworkErrorBoundaryProps, NetworkErrorBoundaryState> {
    state: NetworkErrorBoundaryState;
    static getDerivedStateFromError(error: Error): NetworkErrorBoundaryState;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    reset: () => void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=NetworkErrorBoundary.d.ts.map