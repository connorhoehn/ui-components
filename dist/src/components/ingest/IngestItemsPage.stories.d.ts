import type { StoryObj } from '@storybook/react-vite';
import IngestItemsPage from './IngestItemsPage';
declare const meta: {
    title: string;
    component: typeof IngestItemsPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** One row per item status; click a row to open the detail drawer. */
export declare const Loaded: Story;
/** Only failures — the triage view an operator lands on from an alert. */
export declare const AllFailed: Story;
/** Sources exist, no items have arrived. */
export declare const Empty: Story;
export declare const Loading: Story;
//# sourceMappingURL=IngestItemsPage.stories.d.ts.map