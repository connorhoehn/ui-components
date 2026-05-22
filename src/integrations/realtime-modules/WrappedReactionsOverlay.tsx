// src/integrations/realtime-modules/WrappedReactionsOverlay.tsx
//
// ReactionsOverlay wired directly to a useReactions() hook return from realtime-modules.
// Converts Reaction[] → EphemeralReaction[] with spread positioning.
// Optionally accepts a `ttlMs` to auto-expire each reaction from the visible set.

import { useEffect, useState } from 'react';
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

  // Watch for newly appended reactions and schedule their removal.
  useEffect(() => {
    if (rmReactions.length === 0) return;
    const latest = rmReactions[rmReactions.length - 1] as RMReaction;
    const adapted = adaptReaction(latest, rmReactions.length - 1);

    setVisible((prev) => {
      // Avoid duplicates if the effect fires twice (StrictMode)
      if (prev.some((r) => r.id === adapted.id)) return prev;
      return [...prev, adapted];
    });

    const t = setTimeout(() => {
      setVisible((prev) => prev.filter((r) => r.id !== adapted.id));
    }, ttlMs);

    return () => clearTimeout(t);
  }, [rmReactions, ttlMs]);

  return <ReactionsOverlay reactions={visible} />;
}
