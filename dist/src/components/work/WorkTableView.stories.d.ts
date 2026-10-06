import type { StoryObj } from '@storybook/react-vite';
import { WorkTableView } from './WorkTableView';
import type { WorkListItem } from './WorkListView';
declare const meta: {
    title: string;
    component: typeof WorkTableView;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        items: WorkListItem[];
        groups: ({
            id: string;
            title: string;
            defaultOpen?: undefined;
        } | {
            id: string;
            title: string;
            defaultOpen: boolean;
        })[];
        query: string;
        onQueryChange: () => void;
        onOpenItem: () => void;
        groupColors: {
            done: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Full-width counterpart to WorkListView. Data, filtering, sorting and writes
 * stay in the host; grouping and row disclosures stay in the component. */
export declare const Default: Story;
export declare const Narrow: Story;
export declare const Dark: Story;
export declare const Loading: Story;
export declare const FailedRead: Story;
export declare const Empty: Story;
export declare const Editable: Story;
//# sourceMappingURL=WorkTableView.stories.d.ts.map