// frontend/src/contexts/IdentityContext.tsx
//
// Provides authenticated user identity info to the tree.

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface IdentityContextValue {
  userId: string;
  displayName: string;
  userEmail: string | null;
  idToken: string | null;
  onSignOut: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const IdentityContext = createContext<IdentityContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function IdentityProvider({
  value,
  children,
}: {
  value: IdentityContextValue;
  children: ReactNode;
}) {
  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer hook
// ---------------------------------------------------------------------------

export function useIdentityContext(): IdentityContextValue {
  const ctx = useContext(IdentityContext);
  if (!ctx) {
    throw new Error('useIdentityContext must be used within an <IdentityProvider>');
  }
  return ctx;
}

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
export function useOptionalIdentityContext(): IdentityContextValue | null {
  return useContext(IdentityContext);
}
