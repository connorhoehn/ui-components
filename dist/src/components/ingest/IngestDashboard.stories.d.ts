import type { StoryObj } from '@storybook/react-vite';
import IngestDashboard from './IngestDashboard';
declare const meta: {
    title: string;
    component: typeof IngestDashboard;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Two sources, four items — one of each interesting item status. */
export declare const Loaded: Story;
/** Nothing configured yet — the first-run state. */
export declare const Empty: Story;
/** Sources configured but nothing has been ingested through them yet. */
export declare const SourcesButNoItems: Story;
/** Both requests in flight — skeleton cards. */
export declare const Loading: Story;
/** Backend unreachable. */
export declare const ApiError: Story;
//# sourceMappingURL=IngestDashboard.stories.d.ts.map