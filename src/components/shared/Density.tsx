// Density (2.437.0) — the library's ONE density vocabulary.
//
// Before this the library spoke three (`full|compact`, `default|compact`,
// `comfortable|compact`) and seven components each restated "smaller" with
// their own `size="sm"`. `Density` is the single value: `comfortable` is the
// full form, `compact` the tight one. A component that has a denser form
// reads it with `useDensity(prop)` — its own prop when the host passes one,
// else the nearest `DensityProvider`, else `comfortable`.
//
// Collapsing is NOT a density: a header that folds away on scroll or under a
// chevron is a state (`collapsed: boolean`) a component keeps alongside its
// density (see `PageHeader`, `useHeaderDensity`).
//
// The first consumers are `PageHeader` and `ScopeHeader`. Folding the other
// per-component `size` props into this is the density-system lane's work.
import { createContext, useContext, type ReactNode } from 'react';

export type Density = 'comfortable' | 'compact';

export const DENSITIES: readonly Density[] = ['comfortable', 'compact'];

const DensityContext = createContext<Density>('comfortable');

export interface DensityProviderProps {
  value: Density;
  children: ReactNode;
}

/** Sets the density for everything under it that reads `useDensity()`. */
export function DensityProvider({ value, children }: DensityProviderProps) {
  return <DensityContext.Provider value={value}>{children}</DensityContext.Provider>;
}

/** The density to draw at: `override` when given, else the provider's, else `comfortable`. */
export function useDensity(override?: Density | null): Density {
  const inherited = useContext(DensityContext);
  return override ?? inherited;
}
