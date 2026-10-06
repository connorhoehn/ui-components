import type { StoryObj } from '@storybook/react-vite';
import { ReactionsBar, type ReactionSummary } from './ReactionsBar';
declare const meta: {
    title: string;
    component: typeof ReactionsBar;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        reactions: ReactionSummary[];
        onReact: (emoji: string) => void;
        disabled?: boolean;
        pickerEmojis?: readonly string[];
        addTriggerLabel?: import("react").ReactNode;
        hideAddTrigger?: boolean;
        className?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Empty: Story;
export declare const Populated: Story;
export declare const Interactive: Story;
export declare const ReadOnly: Story;
export declare const Disabled: Story;
export declare const CustomPickerSet: Story;
//# sourceMappingURL=ReactionsBar.stories.d.ts.map