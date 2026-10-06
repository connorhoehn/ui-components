/** Dock tabs, layout mode and geometry. */
export declare const DOCK_STORAGE_KEY = "ui-components.computeDock.v1";
/** Mirror of the server-owned fleet, for first paint and re-adoption. */
export declare const FLEET_STORAGE_KEY = "ui-components.computeFleet.v1";
/** Lab windows and their pane trees. */
export declare const LAB_LAYOUT_STORAGE_KEY = "ui-components.computerLab.v1";
/**
 * All of them. Enumerate this rather than listing keys by hand — a key added
 * in a later version is then cleared without the host changing anything.
 */
export declare const COMPUTE_STORAGE_KEYS: readonly string[];
/** Clear everything this module persists. For a tenant or account switch. */
export declare function clearComputeStorage(): void;
//# sourceMappingURL=storage.d.ts.map