import type { StoryObj } from '@storybook/react-vite';
import { WorkItemMetaBar } from './WorkItemMetaBar';
declare const meta: {
    title: string;
    component: typeof WorkItemMetaBar;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** "Open ▾ · 5 points · (LH) Layla Hassan · Priority: High ▾" — all editable. */
export declare const Default: Story;
/** Every field unset, and every one still editable. */
export declare const Empty: Story;
export declare const ReadOnlyAndPending: Story;
export declare const Dark: Story;
//# sourceMappingURL=WorkItemMetaBar.stories.d.ts.map