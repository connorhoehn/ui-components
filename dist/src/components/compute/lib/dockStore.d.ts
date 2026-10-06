import type { ShellStatus } from '../types';
/**
 * Layouts, because "several terminals" means different things:
 *   docked   — one pane pinned to the bottom, tabbed. Working in one shell.
 *   floating — a draggable window parked over the page.
 *   grid     — every shell tiled and visible at once, tmux-style. Watching.
 *   stack    — a narrow column down the right, page still usable beside it.
 */
export type DockMode = 'hidden' | 'docked' | 'floating' | 'grid' | 'stack';
export interface DockShell {
    /** Stable per-tab id; also the AgentCore shellId, so reattach works. */
    id: string;
    sessionId: string;
    /**
     * Directory to start in.
     *
     * A PTY opens at `/`, which is right for a bare box and wrong when the
     * shell was opened from a specific file or checkout — landing at the
     * filesystem root is a shell you have to orient yourself in before you can
     * use it.
     */
    cwd?: string;
    /** Computer label for the tab. */
    label: string;
    status: ShellStatus;
    /** Output arrived while you were looking at a different tab. */
    unread: boolean;
}
export interface DockGeometry {
    x: number;
    y: number;
    width: number;
    height: number;
    /** Height of the docked panel; kept separate from the floating window's. */
    dockHeight: number;
}
export interface DockState {
    mode: DockMode;
    shells: DockShell[];
    activeId: string | null;
    geometry: DockGeometry;
}
/** AgentCore allows 10 concurrent shells per runtime; stop short of the wall. */
export declare const MAX_SHELLS = 8;
export declare function subscribeDock(listener: () => void): () => void;
export declare function getDock(): DockState;
/**
 * Drop restored tabs whose computer no longer exists.
 *
 * The store cannot check this itself — it deliberately knows nothing about
 * the fleet — so the provider calls this once the real list arrives. A
 * restored tab pointing at a deleted session can never connect: it sits there
 * failing, indistinguishable from a service problem.
 */
export declare function reconcileDock(liveSessionIds: readonly string[]): void;
export type OpenShellOutcome = {
    ok: true;
    id: string;
} | {
    ok: false;
    reason: 'at-capacity';
};
/**
 * Open a shell for a computer, or focus the one already open for it.
 *
 * Reusing the existing tab rather than stacking duplicates matters: each tab
 * is a real PTY against a quota of ten, and two tabs on one shellId would
 * fight — the second connection kicks the first with close code 4000.
 */
export declare function openShell(box: {
    id: string;
    label: string;
    sessionId: string;
    cwd?: string;
}): OpenShellOutcome;
export declare function closeShell(id: string): void;
export declare function focusShell(id: string): void;
/**
 * Report what a shell is doing.
 *
 * `sawOutput` is true when the call was triggered by bytes arriving, which is
 * what marks an unattended tab unread — so a grid or a stack shows which pane
 * moved while your attention was elsewhere.
 */
export declare function reportShellStatus(id: string, status: ShellStatus, sawOutput?: boolean): void;
/** Cycle tabs, tmux-style. `delta` of 1 is next, -1 is previous. */
export declare function cycleShell(delta: number): void;
export declare function selectShellByIndex(index: number): void;
export declare function setMode(mode: DockMode): void;
/** Show/hide without discarding the shells — the sockets stay attached. */
export declare function setDockVisible(visible: boolean): void;
export declare function toggleFloating(): void;
/** Cycle docked → grid → stack → floating, so one key reaches every layout. */
export declare function cycleLayout(): void;
/** True when every shell is visible at once and tabs are not the navigation. */
export declare function showsAllPanes(mode: DockMode): boolean;
export declare function setGeometry(patch: Partial<DockGeometry>): void;
//# sourceMappingURL=dockStore.d.ts.map