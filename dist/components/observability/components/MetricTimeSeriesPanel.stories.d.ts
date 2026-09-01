import type { StoryObj } from '@storybook/react-vite';
import MetricTimeSeriesPanel from './MetricTimeSeriesPanel';
import type { LineSeries } from '../../shared/Chart';
declare const meta: {
    title: string;
    component: typeof MetricTimeSeriesPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        seeds: {
            runsPerMinute: LineSeries[];
            stepDuration: LineSeries[];
            llmTokens: LineSeries[];
            llmCost: LineSeries[];
            clusterCpu: LineSeries[];
            clusterMemory: LineSeries[];
            eventRate: LineSeries[];
            activeRuns: LineSeries[];
            failureRate: Array<Record<string, unknown>>;
            approvalLatency: LineSeries[];
        };
        liveSeries: null;
        cols: number;
        isLiveData: false;
        failedColor: string;
    };
    argTypes: {
        cols: {
            control: "radio";
            options: number[];
        };
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        seeds: {
            runsPerMinute: LineSeries[];
            stepDuration: LineSeries[];
            llmTokens: LineSeries[];
            llmCost: LineSeries[];
            clusterCpu: LineSeries[];
            clusterMemory: LineSeries[];
            eventRate: LineSeries[];
            activeRuns: LineSeries[];
            failureRate: Array<Record<string, unknown>>;
            approvalLatency: LineSeries[];
        };
        liveSeries: {
            activeRuns: LineSeries[] | null;
            llmTokens: LineSeries[] | null;
            llmCost: LineSeries[] | null;
            runsPerMinute: LineSeries[] | null;
        } | null;
        cols: number;
        isLiveData: boolean;
        failedColor: string;
        onResetZoom?: (() => void) | undefined;
        onExportCsv?: (() => void) | undefined;
        timeRange?: ("15m" | "1h" | "24h" | "7d") | undefined;
        onTimeRangeChange?: ((value: "15m" | "1h" | "24h" | "7d") => void) | undefined;
        refreshInterval?: ("off" | "5s" | "30s" | "60s") | undefined;
        onRefreshIntervalChange?: ((value: "off" | "5s" | "30s" | "60s") => void) | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * Backend unreachable: seeded fixture series, and the header badge says
 * "fixture" so nobody mistakes the shape of the data for real traffic.
 */
export declare const FixtureData: Story;
/**
 * Live overlay — four of the ten panels swap to the streamed series and the
 * badge flips to "live". The other six stay on seeds because the bridge does
 * not expose them yet.
 */
export declare const LiveData: Story;
/** Narrow viewport / sidebar layout. */
export declare const SingleColumn: Story;
/** Both host-wired toolbar buttons present; they render only when passed. */
export declare const WithHostActions: Story;
//# sourceMappingURL=MetricTimeSeriesPanel.stories.d.ts.map