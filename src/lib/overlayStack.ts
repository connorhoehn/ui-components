// src/lib/overlayStack.ts
//
// A process-wide stack of currently-open overlay layers (modals, drawers,
// popovers, lightboxes) so that a dismiss key only reaches the TOP one.
//
// Why this exists: every overlay primitive in this repo binds its Escape
// handler with `window.addEventListener('keydown', …)`. `window` is the last
// node in the propagation path, so when two overlays are open, BOTH handlers
// run for the same keystroke and both call `onClose()`. Pressing Escape to
// back out of the top layer silently tears down the layer underneath it too.
//
// Note the two overlays that tried to defend against this with
// `e.stopPropagation()` (InlinePopover, ImageLightbox): that call cannot
// help. `stopPropagation` stops the event moving to the NEXT node, but every
// one of these listeners is attached to the same node (`window`), and
// same-node listeners are only suppressed by `stopImmediatePropagation`.
// Even that would be a coin flip, since it would hand the win to whichever
// overlay happened to register its listener first — which is the BOTTOM one.
//
// Ordering caveat, stated honestly: registration happens in a `useEffect`,
// and React flushes effects child-first. Two overlays that mount in the SAME
// commit therefore register deepest-first, and this stack will name the outer
// one topmost. Overlays that open in separate commits — which is what a user
// actually does, clicking a button in one layer to open the next — order
// correctly. Fixing the same-commit case would require comparing painted
// z-order, which is not observable in jsdom.
//
// Internal helper: not exported from any public barrel.

import { useCallback, useEffect, useRef } from 'react';

/**
 * Open layers, bottom-most first. Tokens are opaque; a layer only ever
 * compares its own token for identity.
 */
let stack: symbol[] = [];

/** Register a newly-opened overlay as the top layer. Idempotent. */
export function pushOverlay(token: symbol): void {
  // Filter first so a double-invoked effect (React StrictMode mounts every
  // effect twice in development) can't leave two entries for one overlay.
  stack = stack.filter((t) => t !== token);
  stack.push(token);
}

/** Deregister a closed overlay. Safe to call for a token that isn't present. */
export function popOverlay(token: symbol): void {
  stack = stack.filter((t) => t !== token);
}

/**
 * Whether `token` is the layer that should consume a dismiss key.
 *
 * Deliberately permissive: an unregistered token counts as topmost. A layer
 * that forgot to register, or one racing its own registration effect, must
 * still respond to Escape — going silent would be a worse bug than the one
 * this module fixes.
 */
export function isTopmostOverlay(token: symbol): boolean {
  if (stack.length === 0) return true;
  if (!stack.includes(token)) return true;
  return stack[stack.length - 1] === token;
}

/** Test seam — drops all registrations. Never call from component code. */
export function resetOverlayStack(): void {
  stack = [];
}

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
export function useOverlayLayer(open: boolean): () => boolean {
  const tokenRef = useRef<symbol | null>(null);
  if (tokenRef.current === null) tokenRef.current = Symbol('overlay-layer');
  const token = tokenRef.current;

  useEffect(() => {
    if (!open) return;
    pushOverlay(token);
    return () => popOverlay(token);
  }, [open, token]);

  return useCallback(() => isTopmostOverlay(token), [token]);
}
