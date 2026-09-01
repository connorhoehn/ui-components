import type { StoryObj } from '@storybook/react-vite';
import { StatsCard } from './StatsCard';
declare const meta: {
    title: string;
    component: typeof StatsCard;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        className: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** `metrics: null` is the documented empty state — no stream is publishing. */
export declare const NoData: Story;
/** A healthy 1080p60 publish. */
export declare const Healthy: Story;
/** Jitter is optional — supplying it adds a fifth row. */
export declare const WithJitter: Story;
/** A struggling connection: sub-Mbps bitrate falls back to Kbps formatting and
 *  the packet-loss count is climbing. */
export declare const Degraded: Story;
//# sourceMappingURL=StatsCard.stories.d.ts.map