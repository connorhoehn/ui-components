// frontend/src/contexts/PresenceContext.tsx
//
// Provides presence user list and typing state to the tree.

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { PresenceUser } from '../hooks/usePresence';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PresenceContextValue {
  presenceUsers: PresenceUser[];
  currentClientId: string | null;
  setTyping: (isTyping: boolean) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const PresenceContext = createContext<PresenceContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function PresenceProvider({
  value,
  children,
}: {
  value: PresenceContextValue;
  children: ReactNode;
}) {
  return (
    <PresenceContext.Provider value={value}>
      {children}
    </PresenceContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer hook
// ---------------------------------------------------------------------------

export function usePresenceContext(): PresenceContextValue {
  const ctx = useContext(PresenceContext);
  if (!ctx) {
    throw new Error('usePresenceContext must be used within a <PresenceProvider>');
  }
  return ctx;
}

/**
 * Non-throwing variant: returns `null` when there is no `<PresenceProvider>`
 * above.
 *
 * `usePresenceContext` is the right hook for a component that genuinely
 * cannot work without presence. It is the wrong hook for a component that
 * would merely *like* presence data when a host doesn't mount this
 * library's provider — calling it there turns an optional enhancement into
 * a hard mount-time dependency. `UserPicker` is exactly that case: it wants
 * live presence when this library's provider is in the tree, and must still
 * work (via its `presenceUsers` prop) for a host running its own presence
 * provider instead.
 */
export function useOptionalPresenceContext(): PresenceContextValue | null {
  return useContext(PresenceContext);
}
