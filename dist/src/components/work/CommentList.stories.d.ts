import type { StoryObj } from '@storybook/react-vite';
import { CommentList, type CommentListItem } from './CommentList';
declare const meta: {
    title: string;
    component: typeof CommentList;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((S: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        title?: string;
        comments: CommentListItem[];
        total?: number;
        onViewAll?: () => void;
        now?: number;
        emptyLabel?: string;
        max?: number;
        first?: boolean;
        variant?: 'label' | 'heading';
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
/** No role on the profile: the role is left out, not filled in. */
export declare const NoRole: Story;
export declare const Empty: Story;
export declare const Dark: Story;
//# sourceMappingURL=CommentList.stories.d.ts.map