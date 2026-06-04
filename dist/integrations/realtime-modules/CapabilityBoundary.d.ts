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
export declare function CapabilityBoundary({ capability, loading, fallback, children, }: CapabilityBoundaryProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CapabilityBoundary.d.ts.map