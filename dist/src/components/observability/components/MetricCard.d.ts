import type { ReactNode } from 'react';
export interface MetricCardProps {
    title: string;
    timeRange?: string;
    children: ReactNode;
    onMaximize?: () => void;
    /**
     * Marks THIS card's series as synthesized rather than measured, rendering
     * an amber "sample" chip next to the title.
     *
     * Provenance is per-card, not per-panel: the metrics panel has one live/
     * fixture pill in its toolbar, but only four of its ten charts can be fed
     * by the live series — the other six plot seeded noise unconditionally. A
     * panel-level pill reading "live" therefore vouched for a p99 step-duration
     * curve, a cluster-CPU line and an approval-latency line that no backend
     * had ever produced. Whoever renders the chart knows where its data came
     * from; say so on the chart.
     */
    sample?: boolean;
}
declare function MetricCard({ title, timeRange, children, onMaximize, sample }: MetricCardProps): import("react").JSX.Element;
export default MetricCard;
//# sourceMappingURL=MetricCard.d.ts.map