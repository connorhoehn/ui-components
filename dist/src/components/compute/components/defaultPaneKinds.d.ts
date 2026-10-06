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
/**
 * The box's output as timestamped log lines — follow or pause, filter by
 * source, search, live byte rate. Free: it reads the same tail stream.
 */
export declare const LOGS_PANE_KIND: PaneKind;
/**
 * The agent's current run as a checklist — done, in flight, elapsed. Free:
 * it reads the same tail stream.
 */
export declare const AGENT_PANE_KIND: PaneKind;
/**
 * Terminal first (the default for a new pane), then the classic activity tail,
 * then the workspace lab's two readings of the same stream. Appended rather
 * than reordered so a saved layout and the toggle's first step are unchanged.
 */
export declare const DEFAULT_PANE_KINDS: readonly PaneKind[];
//# sourceMappingURL=defaultPaneKinds.d.ts.map