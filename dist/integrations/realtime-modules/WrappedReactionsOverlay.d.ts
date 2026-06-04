import type { RMUseReactionsReturn } from './types';
export interface WrappedReactionsOverlayProps {
    /** Return value of useReactions(channel) from realtime-modules */
    reactions: RMUseReactionsReturn;
    /**
     * How long (ms) each reaction remains visible before fading out.
     * Default 2500 matches the CSS animation duration.
     */
    ttlMs?: number;
}
export declare function WrappedReactionsOverlay({ reactions: reactionsHook, ttlMs, }: WrappedReactionsOverlayProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WrappedReactionsOverlay.d.ts.map