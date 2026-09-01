import type { PaneKind } from '../lib/paneKinds';
/**
 * A real terminal. Costs one of the runtime's ten shell slots, which is why
 * the lab meters them and refuses the ninth.
 */
export declare const SHELL_PANE_KIND: PaneKind;
/**
 * Read-only stream of whatever is running on the box. Free — it is an SSE
 * tail — so a window full of these costs nothing and watches everything.
 */
export declare const TAIL_PANE_KIND: PaneKind;
export declare const DEFAULT_PANE_KINDS: readonly PaneKind[];
//# sourceMappingURL=defaultPaneKinds.d.ts.map