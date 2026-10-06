import type { StoryObj } from '@storybook/react-vite';
import { CallingStatusPill } from './CallingStatusPill';
declare const meta: {
    title: string;
    component: typeof CallingStatusPill;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        show: boolean;
        label: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** A 1:1 call. */
export declare const SingleCallee: Story;
/** The label is free text, so the caller decides how to phrase a group ring. */
export declare const TwoCallees: Story;
/** Beyond a couple of names, a count reads better than a list. */
export declare const ManyCallees: Story;
/** An empty label degrades to "Calling user…" rather than "Calling …". */
export declare const MissingLabel: Story;
/** `show: false` renders nothing. */
export declare const Hidden: Story;
//# sourceMappingURL=CallingStatusPill.stories.d.ts.map