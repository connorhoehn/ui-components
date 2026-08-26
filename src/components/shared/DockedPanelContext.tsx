// DockedPanelContext — "you are rendering inside a panel dock".
//
// A dock (today: <CallSidePanel>) owns the chrome around whatever body it
// is given: it already draws the header (the tab bar), the surface, the
// border and the scroll container, and it already has a definite height.
// A body that ALSO draws its own header/card/fixed-height list produces
// the two bugs the 2.108 layout pass fixed: the word "Chat" twice, ~40px
// apart, and a body that stops short of the dock's bottom edge.
//
// Rather than making every consumer remember to pass
// `showHeader={false} fill` on the component it drops into a tab, the
// dock announces itself through this context and the panel bodies that
// know about it adapt. Explicit props still win — a body can opt back
// into its own header inside a dock, or fill outside of one.
//
// Purely presentational metadata; no state, no effects.

import { createContext, useContext, type ReactNode } from 'react';

export interface DockedPanelContextValue {
  /** The dock's own header already names the region — bodies should not
   *  repeat it. */
  hasHeader: boolean;
  /** The dock gives its body a definite height; bodies should fill it and
   *  let their own scrollable region absorb the slack. */
  fillsHeight: boolean;
}

const DockedPanelContext = createContext<DockedPanelContextValue | null>(null);

/**
 * Read the surrounding dock, if any. `null` means "standalone" — the body
 * owns its own header and sizing.
 */
export function useDockedPanel(): DockedPanelContextValue | null {
  return useContext(DockedPanelContext);
}

export interface DockedPanelProviderProps extends Partial<DockedPanelContextValue> {
  children: ReactNode;
}

/** Wraps a dock's body slot. Docks render this; consumers rarely do. */
export function DockedPanelProvider({
  hasHeader = true,
  fillsHeight = true,
  children,
}: DockedPanelProviderProps) {
  // Stable identity is not worth a useMemo here: the dock re-renders only
  // when its tab or open state changes, and the value is two booleans.
  return (
    <DockedPanelContext.Provider value={{ hasHeader, fillsHeight }}>
      {children}
    </DockedPanelContext.Provider>
  );
}

export default DockedPanelProvider;
