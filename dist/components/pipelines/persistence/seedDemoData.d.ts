/**
 * The three template ids we showcase in seed data — chosen to cover a webhook
 * trigger, a fork/join fan-out, and an approval-gated branch so most chart
 * tabs (cost-by-node, cost-by-day, awaiting-approval list, run timeline) have
 * something interesting to render.
 */
export declare const DEMO_TEMPLATE_IDS: readonly ["incident-response", "code-review", "support-triage"];
/**
 * Stable 32-bit seed used by the deterministic PRNG. Bumped intentionally if
 * the data shape changes — testing snapshots key off this value, so it's part
 * of the contract.
 */
export declare const DEMO_SEED = 3237998146;
export interface SeedOptions {
    /** Override the run count per pipeline. Defaults to 15. */
    runsPerPipeline?: number;
    /**
     * If true, wipe all existing pipelines and runs that share our `ws_*`
     * namespace before seeding. Default false — seeded pipelines are added
     * alongside whatever is already there.
     */
    clearExisting?: boolean;
    /**
     * Override the seed (mostly for tests). Production callers should leave
     * this undefined and rely on {@link DEMO_SEED}.
     */
    seed?: number;
    /**
     * Override the wall-clock anchor — handy for snapshot-stable tests. The
     * 30-day window is computed backwards from this value. Defaults to
     * `Date.now()`.
     */
    nowMs?: number;
}
export interface SeedResult {
    pipelines: number;
    runs: number;
}
/**
 * Seed three demo pipelines with synthetic run history.
 *
 * Idempotency: re-running with the same seed AFTER a `clearDemoData()`
 * (or `clearExisting: true`) yields byte-identical pipeline ids, run ids,
 * timestamps relative to the supplied `nowMs`, and token counts.
 */
export declare function seedDemoData(opts?: SeedOptions): SeedResult;
/**
 * Wipe every demo-seeded pipeline (and its run history). We identify demo
 * rows by checking the pipeline definition's `createdBy === 'demo-seeder'`,
 * so a hand-built pipeline named e.g. "Code Review (Demo)" won't be
 * accidentally deleted.
 */
export declare function clearDemoData(): {
    pipelines: number;
    runs: number;
};
//# sourceMappingURL=seedDemoData.d.ts.map