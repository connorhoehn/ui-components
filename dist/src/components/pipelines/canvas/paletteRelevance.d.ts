/** The namespace of a kind: `transcript` from `transcript:store`. Null if unqualified. */
export declare function namespaceOf(kind: string): string | null;
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
export declare function rankByRelevance(contextKinds: readonly string[], candidates: readonly string[], options?: RelevanceOptions): RankedKind[];
//# sourceMappingURL=paletteRelevance.d.ts.map