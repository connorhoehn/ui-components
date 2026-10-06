import type { StoryObj } from '@storybook/react-vite';
import DocTypeProposalsPage from './DocTypeProposalsPage';
declare const meta: {
    title: string;
    component: typeof DocTypeProposalsPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Two pending proposals plus one already rejected. */
export declare const Loaded: Story;
/** Only high-confidence proposals awaiting a promote/reject decision. */
export declare const PendingOnly: Story;
/** Mapping is keeping up — nothing to review. */
export declare const Empty: Story;
export declare const Loading: Story;
export declare const ApiError: Story;
//# sourceMappingURL=DocTypeProposalsPage.stories.d.ts.map