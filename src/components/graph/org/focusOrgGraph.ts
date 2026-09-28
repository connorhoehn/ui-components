// focusOrgGraph — the org graph narrowed to a focus set and its neighbourhood.
//
// "Focused on Vera" means Vera, the people she is directly connected to, and
// the lines among them — not the whole org with Vera somewhere in it. The
// portal's old Explore page did this in-page (`filterToSelection`, plus a
// strongest-K-per-person edge cap so the canvas stayed readable); this is that
// logic as a pure function, so `OrgGraph`'s `focusIds` and a host computing its
// own subset (a count, a "Show whole org" toggle) agree.

import type { GraphPerson, GraphRelationship } from './types';

export interface FocusOrgGraphOptions {
  /** How far out from the focus set to keep people. Default 1 (direct neighbours). */
  hops?: number;
  /** Drop relationships weaker than this before anything else. Default 0 (keep all). */
  minStrength?: number;
  /**
   * Keep at most this many relationships per person, strongest first (an edge
   * stays while either end is under the cap). Applied BEFORE the neighbourhood
   * walk, so a focused person's neighbours are their strongest K. Default: no cap.
   */
  topK?: number;
}

export interface FocusedOrgGraph {
  people: GraphPerson[];
  relationships: GraphRelationship[];
}

/** Strongest-K-per-person edge cap (the old Explore page's `filterEdges`). */
function capEdges(edges: readonly GraphRelationship[], topK: number): GraphRelationship[] {
  const sorted = [...edges].sort((a, b) => b.strength - a.strength);
  const count = new Map<string, number>();
  const kept: GraphRelationship[] = [];
  for (const e of sorted) {
    const s = count.get(e.source) ?? 0;
    const t = count.get(e.target) ?? 0;
    if (s >= topK && t >= topK) continue;
    kept.push(e);
    count.set(e.source, s + 1);
    count.set(e.target, t + 1);
  }
  return kept;
}

/**
 * The people within `hops` of `focusIds` over `relationships`, and the
 * relationships among them. Focus ids that name no one in `people` are
 * ignored; an empty (or wholly unknown) focus returns the whole graph, with
 * `minStrength`/`topK` still applied. Input order is preserved.
 */
export function focusOrgGraph(
  people: readonly GraphPerson[],
  relationships: readonly GraphRelationship[],
  focusIds: ReadonlySet<string> | readonly string[] | null | undefined,
  { hops = 1, minStrength = 0, topK }: FocusOrgGraphOptions = {},
): FocusedOrgGraph {
  const known = new Set(people.map((p) => p.id));
  let edges = relationships.filter((r) => r.strength >= minStrength && known.has(r.source) && known.has(r.target));
  if (topK !== undefined) edges = capEdges(edges, topK);

  const focus = [...(focusIds ?? [])].filter((id) => known.has(id));
  if (focus.length === 0) {
    const kept = new Set(edges);
    return { people: [...people], relationships: relationships.filter((r) => kept.has(r)) };
  }

  const keep = new Set(focus);
  let frontier = new Set(focus);
  for (let hop = 0; hop < hops && frontier.size > 0; hop++) {
    const next = new Set<string>();
    for (const e of edges) {
      if (frontier.has(e.source) && !keep.has(e.target)) next.add(e.target);
      if (frontier.has(e.target) && !keep.has(e.source)) next.add(e.source);
    }
    next.forEach((id) => keep.add(id));
    frontier = next;
  }
  const keptEdges = new Set(edges.filter((e) => keep.has(e.source) && keep.has(e.target)));
  return {
    people: people.filter((p) => keep.has(p.id)),
    relationships: relationships.filter((r) => keptEdges.has(r)),
  };
}
