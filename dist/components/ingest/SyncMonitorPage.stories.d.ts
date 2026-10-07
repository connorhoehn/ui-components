import type { StoryObj } from '@storybook/react-vite';
import SyncMonitorPage from './SyncMonitorPage';
declare const meta: {
    title: string;
    component: typeof SyncMonitorPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Connected, subscribed, nothing syncing — the resting state. */
export declare const Idle: Story;
/** Two syncs in flight with per-source progress counters. */
export declare const ActiveSyncs: Story;
/** A sync that ran and failed — the event log keeps the trail. */
export declare const FailedSync: Story;
/** Frames arriving every second so the log auto-follows; try Pause. */
export declare const Streaming: Story;
//# sourceMappingURL=SyncMonitorPage.stories.d.ts.map