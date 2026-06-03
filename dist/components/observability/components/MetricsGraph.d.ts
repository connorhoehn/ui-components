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
}
declare function MetricsGraph({ title, data, series, yLabel }: MetricsGraphProps): import("react/jsx-runtime").JSX.Element;
export default MetricsGraph;
//# sourceMappingURL=MetricsGraph.d.ts.map