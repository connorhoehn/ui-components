// Every localStorage key this module owns, in one place.
//
// A host that scopes storage per tenant has to clear these on a switch, and
// the alternative to exporting them is the host hardcoding the strings —
// which then drifts silently the first time a key is renamed here. Exporting
// the list makes the coupling explicit and un-driftable: the host enumerates
// `COMPUTE_STORAGE_KEYS` and can never miss one that is added later.

/** Dock tabs, layout mode and geometry. */
export const DOCK_STORAGE_KEY = 'ui-components.computeDock.v1';

/** Mirror of the server-owned fleet, for first paint and re-adoption. */
export const FLEET_STORAGE_KEY = 'ui-components.computeFleet.v1';

/** Lab windows and their pane trees. */
export const LAB_LAYOUT_STORAGE_KEY = 'ui-components.computerLab.v1';

/**
 * All of them. Enumerate this rather than listing keys by hand — a key added
 * in a later version is then cleared without the host changing anything.
 */
export const COMPUTE_STORAGE_KEYS: readonly string[] = [
  DOCK_STORAGE_KEY,
  FLEET_STORAGE_KEY,
  LAB_LAYOUT_STORAGE_KEY,
];

/** Clear everything this module persists. For a tenant or account switch. */
export function clearComputeStorage(): void {
  for (const key of COMPUTE_STORAGE_KEYS) {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch {
      /* private mode — nothing was stored to clear */
    }
  }
}
