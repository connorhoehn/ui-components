import type { StoryObj } from '@storybook/react-vite';
import ConflictsPage from './ConflictsPage';
declare const meta: {
    title: string;
    component: typeof ConflictsPage;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Two pending conflicts (one with an auto-merge proposal) plus one resolved. */
export declare const Loaded: Story;
/** The same queue under the dark palette — token pairs must hold in both. */
export declare const LoadedDark: Story;
/** A single multi-field conflict — the field-by-field pick UI. */
export declare const SingleConflict: Story;
/** Write-back is clean — the queue is empty. */
export declare const Empty: Story;
export declare const Loading: Story;
export declare const ApiError: Story;
//# sourceMappingURL=ConflictsPage.stories.d.ts.map