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
}): import("react/jsx-runtime").JSX.Element;
export declare function useIdentityContext(): IdentityContextValue;
//# sourceMappingURL=IdentityContext.d.ts.map