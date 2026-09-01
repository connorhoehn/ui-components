import type { StoryObj } from '@storybook/react-vite';
import SourceSloPanel from './SourceSloPanel';
declare const meta: {
    title: string;
    component: typeof SourceSloPanel;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        sourceId: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Steady state: flat p95, zero errors, shallow queue. */
export declare const Healthy: Story;
/** Latency climbing, errors appearing, queue backing up. */
export declare const Degrading: Story;
/** Mostly-idle source — null buckets are gaps, not zeroes. */
export declare const SparseData: Story;
export declare const Loading: Story;
export declare const ApiError: Story;
//# sourceMappingURL=SourceSloPanel.stories.d.ts.map