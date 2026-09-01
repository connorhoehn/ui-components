import type { StoryObj } from '@storybook/react-vite';
import DeadLetterQueuePage from './DeadLetterQueuePage';
declare const meta: {
    title: string;
    component: typeof DeadLetterQueuePage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Three dead envelopes, each with a different failure category. */
export declare const Loaded: Story;
/** The state you want: nothing has permanently failed. */
export declare const Empty: Story;
export declare const Loading: Story;
export declare const ApiError: Story;
//# sourceMappingURL=DeadLetterQueuePage.stories.d.ts.map