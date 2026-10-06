export interface MetricsGraphSeries {
    label: string;
    data: number[];
    color?: string;
}
export interface MetricsGraphProps {
    title: string;
    data?: number[];
    series?: MetricsGraphSeries[];
    yLabel?: string;
    /**
     * Sparkline size. The defaults suit the narrow dashboard card this was
     * built for; a card given a whole page column needs to fill it, and a
     * 180px line stranded in 600px of space reads as a rendering fault rather
     * than a deliberate size.
     */
    sparkWidth?: number;
    sparkHeight?: number;
}
declare function MetricsGraph({ title, data, series, yLabel, sparkWidth, sparkHeight, }: MetricsGraphProps): import("react").JSX.Element;
export default MetricsGraph;
//# sourceMappingURL=MetricsGraph.d.ts.map