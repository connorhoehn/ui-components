// src/components/pipelines/canvas/paletteRelevance.ts
//
// Which node types are worth offering for the pipeline currently on screen.
//
// The palette's pinned top section was a RECENTLY USED ring buffer in
// localStorage — global, five entries, shared across every pipeline. So opening
// a document-review pipeline offered Crop, Resize and Vision Tag, because those
// were the last things touched in some unrelated image pipeline. That is the
// "it shows all these node types that in most cases are not relevant" complaint
// almost exactly: the one section claiming to be relevant was keyed on the wrong
// thing entirely.
//
// Relevance here is derived from the pipeline you are looking at, not from what
// you did yesterday:
//
//   1. a kind already in this pipeline — pipelines repeat their own steps far
//      more often than they reach for something new
//   2. a kind sharing a NAMESPACE with one that is (`transcript:store` pulls in
//      `transcript:publish`) — the namespace is the domain, and it is already
//      encoded in every server-registered kind
//
// Deliberately not a hand-written taxonomy of which node goes with which. Those
// rot, and they cannot know about the kinds platform-api registers at runtime.
// A namespace is evidence the authors already wrote down.

/** The namespace of a kind: `transcript` from `transcript:store`. Null if unqualified. */
export function namespaceOf(kind: string): string | null {
  const colon = kind.indexOf(':');
  return colon > 0 ? kind.slice(0, colon) : null;
}

export type RelevanceReason = 'in-pipeline' | 'same-namespace';

export interface RelevanceOptions {
  /**
   * Kinds that exist but cannot run — `preview — no executor` in the palette.
   * Never surfaced as relevant: offering a step that cannot execute is worse
   * than offering nothing, because it looks like progress.
   */
  unavailable?: readonly string[];
  /** Cap on the returned list. Default 6 — a section, not a second palette. */
  limit?: number;
}

export interface RankedKind {
  kind: string;
  reason: RelevanceReason;
}

/**
 * Rank `candidates` by how well they fit a pipeline containing `contextKinds`.
 *
 * Returns only kinds with an actual reason to be there — an empty list when the
 * pipeline gives no signal, so the caller can fall back rather than pad the
 * section with arbitrary suggestions.
 *
 * Stable and pure: same inputs, same order. Ties break on the candidate order
 * given, which is the palette's own definition order.
 */
export function rankByRelevance(
  contextKinds: readonly string[],
  candidates: readonly string[],
  options: RelevanceOptions = {},
): RankedKind[] {
  const limit = options.limit ?? 6;
  if (limit <= 0) return [];

  const unavailable = new Set(options.unavailable ?? []);
  const inPipeline = new Set(contextKinds);

  const namespaces = new Set<string>();
  for (const kind of contextKinds) {
    const ns = namespaceOf(kind);
    if (ns) namespaces.add(ns);
  }

  const ranked: RankedKind[] = [];
  const seen = new Set<string>();

  // Pass 1: already here. Pass 2: same domain. Two passes rather than a sort,
  // so within a tier the caller's order survives untouched.
  for (const kind of candidates) {
    if (seen.has(kind) || unavailable.has(kind)) continue;
    if (inPipeline.has(kind)) {
      ranked.push({ kind, reason: 'in-pipeline' });
      seen.add(kind);
    }
  }
  for (const kind of candidates) {
    if (seen.has(kind) || unavailable.has(kind)) continue;
    const ns = namespaceOf(kind);
    if (ns && namespaces.has(ns)) {
      ranked.push({ kind, reason: 'same-namespace' });
      seen.add(kind);
    }
  }

  return ranked.slice(0, limit);
}
