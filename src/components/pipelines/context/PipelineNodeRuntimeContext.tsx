// context/PipelineNodeRuntimeContext.tsx
//
// Host-injection seam for live pipeline-node runtime state.
//
// Node components (VisionNode, GenerateNode, LLMNode, …) read live execution
// state via `useLatestStepForNode(nodeId)` / `useRetryFromStep()`. By default
// those hooks fold over the bundled `PipelineRunsProvider` runs store — but
// that provider hard-requires this library's WebSocketProvider + the
// VITE_SOCIAL_API_URL HTTP seam, which host apps that maintain their OWN runs
// store (e.g. websocket-gateway) cannot mount. Without a seam, every node
// imported from ui-components renders with `liveStep = null` in those hosts:
// no live thumbnails, no streaming footers.
//
// `PipelineNodeRuntimeProvider` is that seam. When mounted, the node-facing
// hooks consult THIS context FIRST and read host state instead of the bundled
// runs store (the bundled provider, if also mounted, is ignored for these two
// hooks while the seam is in scope).
//
// Host contract: re-create `getLatestStepForNode` (a NEW function identity)
// whenever the host runs store changes. Consumers memoize on the function
// identity, so a stable identity over a mutating store would serve stale
// steps; a fresh identity per store version makes memoized consumers re-read.

import React, { createContext, useContext, type ReactNode } from 'react';
import type { StepExecution } from '../../../types/pipeline';

/**
 * Value the host supplies to drive node-level live state.
 */
export interface PipelineNodeRuntimeValue {
  /**
   * Resolve the most recent `StepExecution` observed for a node, or null when
   * the node has never run. MUST be re-created (new identity) whenever the
   * host's runs store changes — consumers memoize on this function's identity.
   */
  getLatestStepForNode: (nodeId: string) => StepExecution | null;
  /**
   * Optional retry handler. When provided, `useRetryFromStep()` returns a
   * wrapper around this instead of the bundled retry path. May be sync or
   * async; the hook normalizes the return to a Promise.
   */
  retryFromStep?: (nodeId: string) => void | Promise<void>;
  /**
   * Headers that authenticate a node panel's own request to the host's API
   * (e.g. `{ Authorization: 'Bearer …' }`), read at request time so a
   * refreshed token is used. Panels that call a protected route — the
   * adjust-layer preview — send these; without them the route answers 401.
   */
  authHeaders?: () => Record<string, string>;
}

export const PipelineNodeRuntimeContext =
  createContext<PipelineNodeRuntimeValue | null>(null);

export interface PipelineNodeRuntimeProviderProps {
  value: PipelineNodeRuntimeValue;
  children: ReactNode;
}

/**
 * Mount around any subtree containing ui-components pipeline nodes to feed
 * them live run state from a host-owned store, without mounting the bundled
 * `PipelineRunsProvider` (and its WebSocketProvider / social-api stack).
 */
export function PipelineNodeRuntimeProvider({
  value,
  children,
}: PipelineNodeRuntimeProviderProps) {
  return (
    <PipelineNodeRuntimeContext.Provider value={value}>
      {children}
    </PipelineNodeRuntimeContext.Provider>
  );
}

/**
 * Accessor for the host seam. Returns null when no host runtime provider is
 * mounted (the common case inside apps that use the bundled runs store).
 */
export function usePipelineNodeRuntime(): PipelineNodeRuntimeValue | null {
  return useContext(PipelineNodeRuntimeContext);
}
