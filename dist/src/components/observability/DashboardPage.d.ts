import { type ActiveRunRow } from './components/ActiveRunsTable';
/**
 * Format a millisecond value for the KPI card. Returns the em-dash for
 * `null`/non-finite inputs (FE1 fix pattern) so the UI never shows a stale
 * "0 ms" when the bridge hasn't supplied the field yet.
 *
 * Examples:
 *   formatMs(null)   → "—"
 *   formatMs(0)      → "0 ms"
 *   formatMs(234)    → "234 ms"
 *   formatMs(1234)   → "1.2s"
 *   formatMs(12345)  → "12.3s"
 */
export declare function formatMs(value: number | null | undefined): string;
export interface DashboardPageProps {
    /**
     * Currently-running rows for the "Active runs" table. **Additive, v2.97.0.**
     *
     * The table used to be fed a module-level `const PHASE1_ACTIVE_RUNS = []`,
     * so the section rendered a permanent "Active runs (0)" heading over an
     * empty table — directly beneath a live "Active now: 7" KPI read off the
     * event stream. Operators could see that runs existed and could not reach
     * them. With no host wiring there is no source for this list, so the
     * section now says so instead of asserting zero.
     */
    activeRuns?: ActiveRunRow[];
}
export default function DashboardPage({ activeRuns }?: DashboardPageProps): import("react").JSX.Element;
//# sourceMappingURL=DashboardPage.d.ts.map