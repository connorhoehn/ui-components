// Parse a bounded `find` into a tree.
//
// The workspace view is collapsible rather than a flat `ls` because once a
// repository is cloned the top level says almost nothing and the structure is
// the interesting part. One `find` at depth 3 feeds the whole tree, so
// expanding a directory is instant — its contents are already here.

import type { WorkspaceNode } from '../types';

/**
 * Depth-3 listing, noise directories pruned but still announced.
 *
 * **Requires `mode: 'full'`.** It uses a pipe, quotes, a subshell and a
 * redirect, every one of which the server's safe mode rejects — and `find` is
 * not on the safe allowlist either way. A deployment can also disable full
 * mode outright, so handle the 400 rather than assuming this always runs.
 */
export const WORKSPACE_FIND_COMMAND = String.raw`find . -maxdepth 3 \( -name .git -o -name node_modules -o -name .venv -o -name __pycache__ -o -name dist \) -prune -printf "p %p\n" -o -printf "%y %p\n" 2>/dev/null | head -400`;

/** Recent history plus short status. Also requires `mode: 'full'` (`;`, `|`). */
export const WORKSPACE_GIT_COMMAND = 'git log --oneline -3 2>/dev/null; git status --short 2>/dev/null | head -5';

/** The cap in `WORKSPACE_FIND_COMMAND`; a full page means the listing was cut. */
export const WORKSPACE_ENTRY_CAP = 400;

/**
 * Build a tree from `find -printf "%y %p"` output.
 *
 * Markers: `d` directory, `f` (and anything else) file, `p` a directory that
 * was pruned. Pruned entries are kept as unexpandable stubs so `node_modules`
 * shows as present-but-not-listed rather than silently vanishing — a missing
 * directory and an unlisted one look identical otherwise.
 */
export function buildWorkspaceTree(lines: string[]): WorkspaceNode[] {
  const roots: WorkspaceNode[] = [];
  const byPath = new Map<string, WorkspaceNode>();

  const ensureDir = (path: string): WorkspaceNode | null => {
    if (!path) return null;
    const existing = byPath.get(path);
    if (existing) return existing;
    const slash = path.lastIndexOf('/');
    const node: WorkspaceNode = { name: path.slice(slash + 1), path, kind: 'dir', children: [] };
    byPath.set(path, node);
    // Parents are created on demand: `find` can print a child before its
    // directory, and a tree that only linked what it had already seen would
    // scatter those children at the root.
    const parent = slash >= 0 ? ensureDir(path.slice(0, slash)) : null;
    (parent ? parent.children : roots).push(node);
    return node;
  };

  for (const line of lines) {
    const space = line.indexOf(' ');
    if (space < 1) continue;
    const marker = line.slice(0, space);
    let path = line.slice(space + 1);
    if (path.startsWith('./')) path = path.slice(2);
    if (!path || path === '.') continue;

    if (marker === 'd' || marker === 'p') {
      const node = ensureDir(path);
      if (node && marker === 'p') node.pruned = true;
      continue;
    }
    const slash = path.lastIndexOf('/');
    const parent = slash >= 0 ? ensureDir(path.slice(0, slash)) : null;
    const node: WorkspaceNode = { name: path.slice(slash + 1), path, kind: 'file', children: [] };
    byPath.set(path, node);
    (parent ? parent.children : roots).push(node);
  }

  sortTree(roots);
  return roots;
}

/** Directories first, then alphabetical — the ordering a file browser uses. */
function sortTree(nodes: WorkspaceNode[]): void {
  nodes.sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'dir' ? -1 : 1));
  for (const node of nodes) sortTree(node.children);
}

/** Total descendants, for the collapsed-directory count. */
export function countDescendants(node: WorkspaceNode): number {
  return node.children.reduce((total, child) => total + 1 + countDescendants(child), 0);
}

/**
 * Flatten to the rows currently visible, so the tree can be a single
 * roving-tabindex list.
 *
 * A nested set of focusable elements is the reason tree widgets are usually
 * unreachable by keyboard: every row becomes its own tab stop. One flat,
 * ordered array of visible rows makes arrow-key navigation a matter of
 * index arithmetic.
 */
export function visibleRows(
  nodes: WorkspaceNode[],
  expanded: ReadonlySet<string>,
  depth = 0,
): Array<{ node: WorkspaceNode; depth: number }> {
  const rows: Array<{ node: WorkspaceNode; depth: number }> = [];
  for (const node of nodes) {
    rows.push({ node, depth });
    if (node.kind === 'dir' && !node.pruned && expanded.has(node.path)) {
      rows.push(...visibleRows(node.children, expanded, depth + 1));
    }
  }
  return rows;
}
