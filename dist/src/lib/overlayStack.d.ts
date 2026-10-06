/** Register a newly-opened overlay as the top layer. Idempotent. */
export declare function pushOverlay(token: symbol): void;
/** Deregister a closed overlay. Safe to call for a token that isn't present. */
export declare function popOverlay(token: symbol): void;
/**
 * Whether `token` is the layer that should consume a dismiss key.
 *
 * Deliberately permissive: an unregistered token counts as topmost. A layer
 * that forgot to register, or one racing its own registration effect, must
 * still respond to Escape — going silent would be a worse bug than the one
 * this module fixes.
 */
export declare function isTopmostOverlay(token: symbol): boolean;
/** Test seam — drops all registrations. Never call from component code. */
export declare function resetOverlayStack(): void;
/**
 * Register an overlay layer for as long as it is open, and get back a
 * predicate telling it whether it currently owns the dismiss key.
 *
 * The return value is a function rather than a boolean on purpose: whether a
 * layer is topmost changes when a layer ABOVE it opens, which does not
 * re-render the layer below. Keydown handlers must therefore ask at event
 * time, not at render time.
 *
 * ```ts
 * const isTopLayer = useOverlayLayer(open);
 * // …inside a keydown handler:
 * if (e.key === 'Escape' && isTopLayer()) onClose();
 * ```
 */
export declare function useOverlayLayer(open: boolean): () => boolean;
//# sourceMappingURL=overlayStack.d.ts.map