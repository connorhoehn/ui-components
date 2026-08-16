import type { StoryObj } from '@storybook/react-vite';
import { RecordingList, type RecordingListItem } from './RecordingList';
declare const meta: {
    title: string;
    component: typeof RecordingList;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        recordings: RecordingListItem[];
        selectedId?: string | undefined;
        onSelect: (id: string) => void;
        loading?: boolean | undefined;
        emptyState?: import("react").ReactNode;
        renderActions?: ((item: RecordingListItem) => import("react").ReactNode) | undefined;
        className?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Populated: Story;
export declare const PopulatedWithSelection: Story;
export declare const WithRowActions: Story;
export declare const ProcessingAndFailed: Story;
export declare const Loading: Story;
export declare const Empty: Story;
export declare const EmptyCustom: Story;
//# sourceMappingURL=RecordingList.stories.d.ts.map