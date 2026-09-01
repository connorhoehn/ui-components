import type { StoryObj } from '@storybook/react-vite';
import SourcesPage from './SourcesPage';
declare const meta: {
    title: string;
    component: typeof SourcesPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Three sources, one per status: active, error, paused. */
export declare const Loaded: Story;
/** First run — the empty state carries the "add a source" call to action. */
export declare const NoSources: Story;
/** Skeletons while the first request is in flight. */
export declare const Loading: Story;
/** Backend down: the page surfaces the HTTP status rather than an empty list. */
export declare const ApiError: Story;
//# sourceMappingURL=SourcesPage.stories.d.ts.map