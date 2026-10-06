import type { StoryObj } from '@storybook/react-vite';
import { RecordResultList } from './RecordResultList';
import { type RecordResultItem } from './recordMarks';
declare const meta: {
    title: string;
    component: typeof RecordResultList;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        groups: ({
            id: string;
            label: string;
            count: number;
            records: RecordResultItem[];
            seeAllHref?: undefined;
            collapsed?: undefined;
            onSeeAll?: undefined;
        } | {
            id: string;
            label: string;
            count: number;
            records: RecordResultItem[];
            seeAllHref: string;
            collapsed?: undefined;
            onSeeAll?: undefined;
        } | {
            seeAllHref?: undefined;
            id: string;
            label: string;
            count: number;
            records: never[];
            collapsed: boolean;
            onSeeAll: () => void;
        })[];
        selectedKeys: never[];
        onToggleSelect: () => void;
        onOpen: () => void;
        hint: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The Results tab: grouped by type, selectable, with See all where the host holds more. */
export declare const Default: Story;
/** Entered from an initiative: matched terms marked, labelled open links, a scope footer. */
export declare const ScopedWithHighlights: Story;
export declare const Loading: Story;
export declare const FailedRead: Story;
export declare const Empty: Story;
export declare const CollapsedGroup: Story;
export declare const Dark: Story;
//# sourceMappingURL=RecordResultList.stories.d.ts.map