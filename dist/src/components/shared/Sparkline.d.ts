export interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    /**
     * Where the bottom of the plot sits.
     *
     * - `'min'` (default) — the smallest sample is pinned to the bottom edge, so
     *   the line always fills the box. Best for shape-of-the-change questions
     *   ("is it wobbling?") where the absolute level doesn't matter.
     * - `'zero'` — the bottom edge is 0 (or the series minimum, if any sample is
     *   negative). Small variation around a large value then reads as the nearly
     *   flat line it actually is. Use this for rates, counts and anything else
     *   where magnitude carries meaning, otherwise [100, 101, 102] draws the same
     *   dramatic climb as [0, 50, 100].
     * - a number — pin the bottom edge to that value explicitly.
     */
    baseline?: 'min' | 'zero' | number;
}
declare function Sparkline({ data, width, height, color, baseline, }: SparklineProps): import("react").JSX.Element;
export default Sparkline;
//# sourceMappingURL=Sparkline.d.ts.map