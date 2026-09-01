import { type ChromeTone } from '../lib/chromeTokens';
import type { PaneLeaf } from '../lib/paneTree';
import type { ProjectRollup } from '../hooks/useComputeProjects';
import type { Computer } from '../types';
export type ChooserRow = {
    kind: 'pane';
    id: string;
    pane: PaneLeaf;
    computer: Computer;
} | {
    kind: 'computer';
    id: string;
    computer: Computer;
} | {
    kind: 'project';
    id: string;
    project: ProjectRollup;
};
export interface LabChooserProps {
    open: boolean;
    onClose: () => void;
    computers: Computer[];
    panes: PaneLeaf[];
    /** Jump focus to a pane already on screen. */
    onJumpToPane: (paneId: string) => void;
    /** Bind the focused pane to this computer — the cheap "look at that" move. */
    onRetarget: (computer: Computer) => void;
    /** Open in a new split — the "watch both" move. Bound to ⇧⏎. */
    onOpenInSplit: (computer: Computer) => void;
    /**
     * Projects, so the chooser answers "take me to that project's computers"
     * and not only "take me to that box". Omit where there are none.
     */
    projects?: readonly ProjectRollup[];
    /** Focus a project's first computer, or offer to make one if it has none. */
    onSelectProject?: (project: ProjectRollup) => void;
    /**
     * Which palette the chooser card paints in. `code` (default) keeps the
     * terminal family; `app` re-points it at the host's tokens, the way the
     * lab's own chrome does — see `../lib/chromeTokens`.
     *
     * The scrim is NOT affected either way. It covers the panes as well as the
     * chrome, and a light film over a terminal dims nothing.
     */
    chrome?: ChromeTone;
}
/**
 * Subsequence match, the thing every fuzzy finder actually does.
 *
 * `dba` matches `demo-bravo`. Returns a score where lower is better, so a
 * prefix match beats a match scattered across the whole string — otherwise
 * `demo-alpha` and `demo-bravo` are equally good answers to `da` and the
 * order is whatever the array happened to be in.
 */
export declare function fuzzyScore(text: string, query: string): number | null;
export declare function LabChooser({ open, onClose, computers, panes, onJumpToPane, onRetarget, onOpenInSplit, projects, onSelectProject, chrome: chromeTone, }: LabChooserProps): import("react").JSX.Element | null;
//# sourceMappingURL=LabChooser.d.ts.map