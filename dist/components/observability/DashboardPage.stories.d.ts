import type { StoryObj } from '@storybook/react-vite';
import DashboardPage from './DashboardPage';
declare const meta: {
    title: string;
    component: typeof DashboardPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Everything green, bridge reporting every KPI, no alerts. */
export declare const HealthyCluster: Story;
/** Two nodes down: critical + warning alerts, degrading trend. */
export declare const DegradedCluster: Story;
/**
 * No bridge wired: the backend answers `source: 'stub'`, so the header shows
 * the amber "demo data" pill next to synthesized numbers.
 */
export declare const StubMetrics: Story;
/**
 * No mock backend at all — the real failure path. Every KPI collapses to an
 * em-dash rather than a misleading zero, and the source pill turns red.
 */
export declare const MetricsUnavailable: Story;
/** Provider mounted but the first poll hasn't resolved. */
export declare const NoDashboardYet: Story;
//# sourceMappingURL=DashboardPage.stories.d.ts.map