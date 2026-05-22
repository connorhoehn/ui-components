// src/integrations/realtime-modules/CapabilityBoundary.tsx
//
// Conditional render boundary based on a useCapability() hook return from
// realtime-modules. Wraps children with a loading / disabled gate so the
// caller never has to manually check isLoading / enabled.

import type { ReactNode } from 'react';
import type { RMCapabilityHookResult } from './types';

export interface CapabilityBoundaryProps {
  /** Return value of useCapability(name) from realtime-modules */
  capability: RMCapabilityHookResult;
  /** Rendered while capability.isLoading is true */
  loading?: ReactNode;
  /** Rendered when capability.enabled is false (and not loading) */
  fallback?: ReactNode;
  /** Rendered when capability.enabled is true */
  children: ReactNode;
}

export function CapabilityBoundary({
  capability,
  loading,
  fallback,
  children,
}: CapabilityBoundaryProps) {
  if (capability.isLoading) return <>{loading ?? null}</>;
  if (!capability.enabled) return <>{fallback ?? null}</>;
  return <>{children}</>;
}
