// Density (2.437.0, the one system since 2.440.0) — the library's ONE density
// vocabulary and the one place a composite learns how dense to draw.
//
// `Density` is the single value: `comfortable` is the full form, `compact`
// the tight one. It answers two questions, and the provider carries both:
//
// - **The scale** (`useDensity`) — the type step, row height and control
//   height every composite draws at. Compact is the app's one scale: 20/600
//   page title, 14/600 headings, 14/400 body, 12/400 meta, 44px table rows,
//   26–28px small controls. A shell sets it once with
//   `<DensityProvider density="compact">` and no call site restates it:
//   `StatStrip`, `PageSection`, `DetailSection`, `ActionRowList`, `Table` /
//   `DataTable`, `EmptyState`, `ChatSidePanelFrame`, `SegmentedControl` and
//   `WorkflowStepper` draw their compact form under it. Their old per-call
//   `size="sm"` is a deprecated override for one release (a dev warning) —
//   see `useDensitySize`.
// - **The form** (`useDensityForm`) — whether a region's chrome folds: a
//   header to ONE row (`PageHeader`, `ScopeHeader`), a composer to its pane
//   form (`ConversationComposer`). A side pane or a canvas column asks for it
//   with `<DensityProvider value="compact">` (the 2.437 form, which sets the
//   scale too). The shell's `density` never folds a header: that is the
//   page's choice (`useHeaderDensity`), not the app's.
//
// Collapsing is NOT a density: a header that folds away on scroll or under a
// chevron is a state (`collapsed: boolean`) a component keeps alongside its
// density (see `PageHeader`, `useHeaderDensity`). How wide a container is
// becomes a density through ONE rule, `containerDensity` (ContainerDensity.ts).
import { createContext, useContext, type ReactNode } from 'react';

export type Density = 'comfortable' | 'compact';

export const DENSITIES: readonly Density[] = ['comfortable', 'compact'];

interface DensityState {
  scale: Density;
  form: Density;
}

const DensityContext = createContext<DensityState>({ scale: 'comfortable', form: 'comfortable' });

export interface DensityProviderProps {
  /**
   * The scale for everything under it (since 2.440.0): the type step, row and
   * control heights. What an app shell sets once. Leaves the form inherited.
   */
  density?: Density;
  /**
   * The scale AND the form (2.437.0): a region whose chrome folds — a side
   * pane, a canvas column. Wins over `density` when both are given.
   */
  value?: Density;
  children: ReactNode;
}

/** Sets the density for everything under it. See the module comment. */
export function DensityProvider({ density, value, children }: DensityProviderProps) {
  const parent = useContext(DensityContext);
  const scale = value ?? density ?? parent.scale;
  const form = value ?? parent.form;
  const next = scale === parent.scale && form === parent.form ? parent : { scale, form };
  return <DensityContext.Provider value={next}>{children}</DensityContext.Provider>;
}

/** The scale to draw at: `override` when given, else the provider's, else `comfortable`. */
export function useDensity(override?: Density | null): Density {
  const inherited = useContext(DensityContext);
  return override ?? inherited.scale;
}

/**
 * The form to draw at (since 2.440.0): `override` when given, else the
 * nearest `DensityProvider value`, else `comfortable`. Read by chrome that
 * folds (a header's one row, a composer's pane form) — never by the shell's
 * `density` alone.
 */
export function useDensityForm(override?: Density | null): Density {
  const inherited = useContext(DensityContext);
  return override ?? inherited.form;
}

// Module-scoped on purpose: a consumer type-checking this source without
// @types/node still compiles, and bundlers still replace `process.env.NODE_ENV`.
declare const process: { env: { NODE_ENV?: string } };

const warnedSizes = new Set<string>();

/**
 * Dev-only, once per component: an explicit `size` that the density already
 * names is deprecated. Exported for the composites and their tests.
 */
export function warnDeprecatedSize(component: string, size: string): void {
  if (process.env.NODE_ENV === 'production') return;
  if (warnedSizes.has(component)) return;
  warnedSizes.add(component);
  // eslint-disable-next-line no-console
  console.warn(
    `[${component}] \`size="${size}"\` is deprecated (2.440.0): the compact density draws it. ` +
    'Set `<DensityProvider density="compact">` once at the shell and drop the prop; ' +
    'the explicit size stays an override until 2.441.',
  );
}

/** Test hook: forget which components have warned. */
export function resetDensityWarnings(): void {
  warnedSizes.clear();
}

/**
 * The size a composite draws at. An explicit `size` wins (an override); when
 * it is the size the compact density names, it is deprecated and warns once
 * in development. Otherwise the scale picks `sizes.compact` or
 * `sizes.comfortable`.
 */
export function useDensitySize<S extends string>(
  component: string,
  size: S | undefined,
  sizes: { comfortable: S; compact: S },
): S {
  const density = useDensity();
  if (size !== undefined) {
    if (size === sizes.compact && sizes.compact !== sizes.comfortable) warnDeprecatedSize(component, size);
    return size;
  }
  return sizes[density];
}
