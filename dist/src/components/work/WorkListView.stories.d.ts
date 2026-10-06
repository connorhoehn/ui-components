import type { StoryObj } from '@storybook/react-vite';
import { WorkListView, type WorkListGroup, type WorkListItem } from './WorkListView';
declare const meta: {
    title: string;
    component: typeof WorkListView;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        groups: WorkListGroup[];
        items: WorkListItem[];
        query: string;
        onQueryChange: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Pane 2 of the mockup at the rail's 368px: tick, open, drag or Alt+arrow to reorder. */
export declare const Default: Story;
export declare const Dark: Story;
/** No work at all: the honest empty state, with every group label gone. */
export declare const Empty: Story;
export declare const Loading: Story;
/** `chrome="embedded"`: the host shows "Work 11" in its own rail header. */
export declare const Embedded: Story;
//# sourceMappingURL=WorkListView.stories.d.ts.map