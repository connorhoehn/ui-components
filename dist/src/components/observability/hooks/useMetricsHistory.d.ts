import { ClusterDashboard } from '../context/ObservabilityContext';
/**
 * Rolling ring buffer of recent dashboard snapshots, used by MetricsPage for
 * time-series rendering. Grows up to `windowSize` entries, then discards the
 * oldest.
 */
export declare function useMetricsHistory(windowSize?: number): ClusterDashboard[];
export default useMetricsHistory;
//# sourceMappingURL=useMetricsHistory.d.ts.map