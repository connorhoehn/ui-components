import type { JSX } from 'react';
import { type Tone } from './tones';
export interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
}
export declare function LineChart({ series, height, yFormat, xFormat, }: {
    series: LineSeries[];
    height?: number;
    yFormat?: (v: number) => string;
    xFormat?: (v: number | string) => string;
}): JSX.Element;
export declare function StackedAreaChart({ series, height, }: {
    series: LineSeries[];
    height?: number;
}): JSX.Element;
export interface BarChartDatum extends Record<string, unknown> {
    /**
     * `variant="compact"` only: paints this bar with the tone's solid fill
     * from the shared Tone scale (`../shared/tones`), overriding `color` for
     * this one bar. A row with no `tone` falls back to `color` / primary, same
     * as the default variant.
     */
    tone?: Tone;
}
export declare function BarChart({ data, height, xKey, yKey, color, yFormat, variant, showValues, }: {
    data: BarChartDatum[];
    /** Defaults to 180 for `'default'`, 80 for `'compact'`. */
    height?: number;
    xKey: string;
    yKey: string;
    /** Fallback fill for a bar with no per-row `tone` (compact) or the single
     *  series fill (default). Default: `var(--color-primary)`. */
    color?: string;
    yFormat?: (v: number) => string;
    /**
     * `'compact'` drops the grid, axes and legend and paints each bar from its
     * own `tone` (see `BarChartDatum`) — a metrics tile's small multi-category
     * bar (token in/out, run status counts), not a full chart card. Default:
     * unchanged — grid + axes + legend, single `color` fill.
     */
    variant?: 'default' | 'compact';
    /** `'compact'` only: print each bar's value above it (through `yFormat`
     *  when given). Default: off. */
    showValues?: boolean;
}): JSX.Element;
export default LineChart;
//# sourceMappingURL=Chart.d.ts.map