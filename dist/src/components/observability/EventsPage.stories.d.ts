import type { StoryObj } from '@storybook/react-vite';
import EventsPage from './EventsPage';
declare const meta: {
    title: string;
    component: typeof EventsPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Provider mounted, nothing dispatched — the real first-paint state. */
export declare const NoEventsYet: Story;
/** A short burst of lifecycle events; use the rail to filter by group. */
export declare const WithEvents: Story;
/**
 * Events arriving every 1.5s so the timeline's auto-follow and the Pause
 * control have something to do.
 */
export declare const StreamingLive: Story;
//# sourceMappingURL=EventsPage.stories.d.ts.map