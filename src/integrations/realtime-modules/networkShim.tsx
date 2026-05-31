// src/integrations/realtime-modules/networkShim.tsx
//
// Shared "wrap with NetworkErrorBoundary + ReconnectingShim" helper used by
// Wrapped* adapters. Callers opt in by passing a NetworkShimOptions object
// on the per-component `wrapWithNetworkShim` prop. When omitted, the helper
// is a no-op and the child renders as-is.

import type { ReactNode } from 'react';
import {
  NetworkErrorBoundary,
  type NetworkErrorBoundaryProps,
} from './NetworkErrorBoundary';
import {
  ReconnectingShim,
  type ReconnectingShimConnectionState,
} from './ReconnectingShim';

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

  // ── ReconnectingShim overrides ────────────────────────────────────────────
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

  // ── NetworkErrorBoundary overrides ───────────────────────────────────────
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
export function applyNetworkShim(
  node: ReactNode,
  opts: NetworkShimOptions | undefined,
): ReactNode {
  if (!opts) return node;

  return (
    <NetworkErrorBoundary
      title={opts.errorTitle}
      description={opts.errorDescription}
      retryLabel={opts.retryLabel}
      onRetry={opts.onRetry}
      onError={opts.onError}
      fallback={opts.errorFallback}
    >
      <ReconnectingShim
        connectionState={opts.connectionState}
        onRetry={opts.onRetry}
        reconnectingLabel={opts.reconnectingLabel}
        disconnectedTitle={opts.disconnectedTitle}
        disconnectedDescription={opts.disconnectedDescription}
        retryLabel={opts.retryLabel}
        connectingPlaceholder={opts.connectingPlaceholder}
        disconnectedFallback={opts.disconnectedFallback}
        className={opts.className}
      >
        {node}
      </ReconnectingShim>
    </NetworkErrorBoundary>
  );
}
