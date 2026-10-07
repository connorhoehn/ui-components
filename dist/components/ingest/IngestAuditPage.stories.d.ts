import type { StoryObj } from '@storybook/react-vite';
import IngestAuditPage from './IngestAuditPage';
declare const meta: {
    title: string;
    component: typeof IngestAuditPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Four entries spanning every target type; filters are client-side. */
export declare const Loaded: Story;
/** Only failures — what you filter to after an alert. */
export declare const FailuresOnly: Story;
/** Nothing recorded in the selected window. */
export declare const Empty: Story;
export declare const Loading: Story;
export declare const ApiError: Story;
//# sourceMappingURL=IngestAuditPage.stories.d.ts.map