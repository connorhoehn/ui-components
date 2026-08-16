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
export default function DashboardPage(): import("react").JSX.Element;
//# sourceMappingURL=DashboardPage.d.ts.map