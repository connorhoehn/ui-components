import type { StoryObj } from '@storybook/react-vite';
import SourceDetailPage from './SourceDetailPage';
declare const meta: {
    title: string;
    component: typeof SourceDetailPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Healthy Drive source with two mapping rules and a per-DocType override. */
export declare const Loaded: Story;
/** Freshly created: no schedule, no rules, never synced. */
export declare const NeverSynced: Story;
/** Source in the error state after a run with per-file failures. */
export declare const ErrorStatus: Story;
export declare const Loading: Story;
/** The source id in the URL doesn't exist. */
export declare const NotFound: Story;
//# sourceMappingURL=SourceDetailPage.stories.d.ts.map