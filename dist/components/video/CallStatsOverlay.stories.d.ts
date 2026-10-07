import type { StoryObj } from '@storybook/react-vite';
import { CallStatsOverlay } from './CallStatsOverlay';
declare const meta: {
    title: string;
    component: typeof CallStatsOverlay;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        stats?: import("./CallStatsOverlay").CallStatsOverlayStats;
        position?: import("./CallStatsOverlay").CallStatsOverlayPosition;
        testId?: string;
        className?: string;
        style?: import("react").CSSProperties;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A healthy call: good quality plus the full metric block. */
export declare const Healthy: Story;
/** A degrading call — the badge drops bars and the loss figure climbs. */
export declare const Degraded: Story;
/** Connection lost entirely. */
export declare const Disconnected: Story;
/** Quality only — the metrics block is omitted when no numeric field is set. */
export declare const QualityOnly: Story;
/** Metrics without a quality grade — the badge is omitted instead. */
export declare const MetricsOnly: Story;
/** No stats at all: the component renders `null`, so callers don't need their
 *  own visibility gate. The stage below is intentionally bare. */
export declare const NoStats: Story;
//# sourceMappingURL=CallStatsOverlay.stories.d.ts.map