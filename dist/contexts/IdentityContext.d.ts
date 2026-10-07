import type { ReactNode } from 'react';
export interface IdentityContextValue {
    userId: string;
    displayName: string;
    userEmail: string | null;
    idToken: string | null;
    onSignOut: () => void;
}
export declare function IdentityProvider({ value, children, }: {
    value: IdentityContextValue;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useIdentityContext(): IdentityContextValue;
/**
 * Non-throwing variant: returns `null` when there is no `<IdentityProvider>`
 * above.
 *
 * `useIdentityContext` is the right hook for a component that genuinely
 * cannot work unsigned-in. It is the wrong hook for a component that would
 * merely *like* a token — calling it there turns an optional enhancement
 * into a hard mount-time dependency on the provider. `ObservabilityProvider`
 * is exactly that case: it wants a bearer token when one exists, and must
 * still render (against fixture data) in a backendless demo with no identity
 * in the tree.
 */
export declare function useOptionalIdentityContext(): IdentityContextValue | null;
//# sourceMappingURL=IdentityContext.d.ts.map