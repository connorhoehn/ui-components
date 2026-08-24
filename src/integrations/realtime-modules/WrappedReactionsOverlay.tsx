// src/integrations/realtime-modules/WrappedReactionsOverlay.tsx
//
// ReactionsOverlay wired directly to a useReactions() hook return from realtime-modules.
// Converts Reaction[] → EphemeralReaction[] with spread positioning.
// Optionally accepts a `ttlMs` to auto-expire each reaction from the visible set.

import { useEffect, useRef, useState } from 'react';
import type { RMUseReactionsReturn, RMReaction } from './types';
import { adaptReaction } from './adapters';
import { ReactionsOverlay } from '../../components/collaboration/ReactionsOverlay';
import type { EphemeralReaction } from '../../hooks/useReactions';

export interface WrappedReactionsOverlayProps {
  /** Return value of useReactions(channel) from realtime-modules */
  reactions: RMUseReactionsReturn;
  /**
   * How long (ms) each reaction remains visible before fading out.
   * Default 2500 matches the CSS animation duration.
   */
  ttlMs?: number;
}

export function WrappedReactionsOverlay({
  reactions: reactionsHook,
  ttlMs = 2500,
}: WrappedReactionsOverlayProps) {
  const [visible, setVisible] = useState<EphemeralReaction[]>([]);
  const rmReactions = reactionsHook.reactions;

  // One pending expiry timer per visible reaction, keyed by reaction id.
  //
  // This used to be a single `const t = setTimeout(...)` returned from the
  // effect's cleanup. Because the effect re-runs on every new reaction, that
  // cleanup cancelled the *previous* reaction's expiry instead of its own: in
  // any burst arriving faster than ttlMs, every reaction but the last stayed
  // in `visible` for the life of the mount, growing state and DOM without
  // bound. Each reaction now owns its own handle, and only unmount clears them.
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Watch for newly appended reactions and schedule their removal.
  useEffect(() => {
    if (rmReactions.length === 0) return;
    const latest = rmReactions[rmReactions.length - 1] as RMReaction;
    const adapted = adaptReaction(latest, rmReactions.length - 1);

    const timers = timersRef.current;
    // Already scheduled — re-render, or a StrictMode double-invoke.
    if (timers.has(adapted.id)) return;

    setVisible((prev) => {
      // Avoid duplicates if the effect fires twice (StrictMode)
      if (prev.some((r) => r.id === adapted.id)) return prev;
      return [...prev, adapted];
    });

    timers.set(
      adapted.id,
      setTimeout(() => {
        timers.delete(adapted.id);
        setVisible((prev) => prev.filter((r) => r.id !== adapted.id));
      }, ttlMs),
    );
  }, [rmReactions, ttlMs]);

  // Unmount: drop every still-pending expiry timer.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  return <ReactionsOverlay reactions={visible} />;
}
