// src/integrations/realtime-modules/ReconnectingShim.tsx
//
// Wraps a real-time surface (chat panel, presence list, file uploader, …)
// with a single visual contract for the four connection-lifecycle states.
// Callers pass `connectionState` from their gateway/hook layer; the shim
// owns the rest.
//
//   connecting    → SkeletonCard placeholder
//   reconnecting  → children at 60% opacity + ReconnectingBanner overlay
//   disconnected  → EmptyState with optional retry CTA
//   connected     → children unchanged
//   idle          → children unchanged (parent hasn't initiated)

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ReconnectingBanner } from '../../components/video/ReconnectingBanner';
import EmptyState from '../../components/shared/EmptyState';
import SkeletonCard from '../../components/shared/SkeletonCard';

export type ReconnectingShimConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected';

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

export function ReconnectingShim({
  connectionState,
  children,
  onRetry,
  reconnectingLabel,
  disconnectedTitle = 'Disconnected',
  disconnectedDescription = 'The connection to the server was lost. Check your network and try again.',
  retryLabel = 'Try again',
  connectingPlaceholder,
  disconnectedFallback,
  className,
}: ReconnectingShimProps) {
  if (connectionState === 'connecting') {
    return (
      <div data-testid="reconnecting-shim-connecting" className={className}>
        {connectingPlaceholder ?? <SkeletonCard height={120} />}
      </div>
    );
  }

  if (connectionState === 'disconnected') {
    return (
      <div data-testid="reconnecting-shim-disconnected" className={className}>
        {disconnectedFallback ?? (
          <EmptyState
            icon="📡"
            title={disconnectedTitle}
            description={disconnectedDescription}
            actionLabel={onRetry ? retryLabel : undefined}
            onAction={onRetry}
          />
        )}
      </div>
    );
  }

  if (connectionState === 'reconnecting') {
    return (
      <div
        data-testid="reconnecting-shim-reconnecting"
        className={cn('relative', className)}
      >
        <div className="opacity-60 pointer-events-none">{children}</div>
        <ReconnectingBanner show label={reconnectingLabel} />
      </div>
    );
  }

  // connected | idle → pass through
  return (
    <div data-testid="reconnecting-shim-connected" className={className}>
      {children}
    </div>
  );
}
