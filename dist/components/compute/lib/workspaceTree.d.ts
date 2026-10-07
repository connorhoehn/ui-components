import type { WorkspaceNode } from '../types';
/**
 * Depth-3 listing, noise directories pruned but still announced.
 *
 * **Requires `mode: 'full'`.** It uses a pipe, quotes, a subshell and a
 * redirect, every one of which the server's safe mode rejects — and `find` is
 * not on the safe allowlist either way. A deployment can also disable full
 * mode outright, so handle the 400 rather than assuming this always runs.
 */
export declare const WORKSPACE_FIND_COMMAND: string;
/** Recent history plus short status. Also requires `mode: 'full'` (`;`, `|`). */
export declare const WORKSPACE_GIT_COMMAND = "git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5";
/** The cap in `WORKSPACE_FIND_COMMAND`; a full page means the listing was cut. */
export declare const WORKSPACE_ENTRY_CAP = 400;
/**
 * Build a tree from `find -printf "%y %p"` output.
 *
 * Markers: `d` directory, `f` (and anything else) file, `p` a directory that
 * was pruned. Pruned entries are kept as unexpandable stubs so `node_modules`
 * shows as present-but-not-listed rather than silently vanishing — a missing
 * directory and an unlisted one look identical otherwise.
 */
export declare function buildWorkspaceTree(lines: string[]): WorkspaceNode[];
/** Total descendants, for the collapsed-directory count. */
export declare function countDescendants(node: WorkspaceNode): number;
/**
 * Flatten to the rows currently visible, so the tree can be a single
 * roving-tabindex list.
 *
 * A nested set of focusable elements is the reason tree widgets are usually
 * unreachable by keyboard: every row becomes its own tab stop. One flat,
 * ordered array of visible rows makes arrow-key navigation a matter of
 * index arithmetic.
 */
export declare function visibleRows(nodes: WorkspaceNode[], expanded: ReadonlySet<string>, depth?: number): Array<{
    node: WorkspaceNode;
    depth: number;
}>;
//# sourceMappingURL=workspaceTree.d.ts.map