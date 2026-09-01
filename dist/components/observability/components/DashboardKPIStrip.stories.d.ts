import type { StoryObj } from '@storybook/react-vite';
import DashboardKPIStrip from './DashboardKPIStrip';
declare const meta: {
    title: string;
    component: typeof DashboardKPIStrip;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        runsToday: number;
        runsSparkline: number[];
        activeNow: number;
        pendingApprovals: number;
        failed24h: number;
        avgFirstTokenLatency: string;
        onScrollToActive: () => void;
        onGoToPipelines: () => void;
        onGoToFailedEvents: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Bridge is wired and reporting every field. */
export declare const LiveNumbers: Story;
/**
 * Bridge reachable but the fields aren't exposed yet — every KPI collapses to
 * an em-dash and the deltas suppress themselves rather than showing a stale
 * "▲ 12%" beside a dash.
 */
export declare const NoDataFromBridge: Story;
/** A genuinely idle cluster: real zeroes, not unknowns. */
export declare const IdleCluster: Story;
/** Mixed: run counters live, latency still unavailable. */
export declare const PartialBridge: Story;
//# sourceMappingURL=DashboardKPIStrip.stories.d.ts.map