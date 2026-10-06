import type { StoryObj } from '@storybook/react-vite';
import { SuggestionRow } from './SuggestionRow';
declare const meta: {
    title: string;
    component: typeof SuggestionRow;
    tags: string[];
    args: {
        active: false;
        onPick: () => void;
        primary: string;
        secondary: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        active: boolean;
        onHighlight?: () => void;
        onPick: () => void;
        primary: import("react").ReactNode;
        secondary?: import("react").ReactNode;
        leading?: import("react").ReactNode;
        id?: string;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Active: Story;
/** A list where the cursor follows the pointer, as a combobox drives it. */
export declare const List: Story;
//# sourceMappingURL=SuggestionRow.stories.d.ts.map