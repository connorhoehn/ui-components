import type { StoryObj } from '@storybook/react-vite';
import { MuteWhileTalkingToast } from './MuteWhileTalkingToast';
declare const meta: {
    title: string;
    component: typeof MuteWhileTalkingToast;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        show: boolean;
        label?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The default nag. `role="alert"` and `pointer-events-none`: it announces
 *  itself to screen readers but never intercepts a click on the mic button
 *  it is telling you to press. */
export declare const Nagging: Story;
/** Custom copy — e.g. naming the keyboard shortcut instead of the button. */
export declare const CustomLabel: Story;
/** `show: false` renders nothing. */
export declare const Hidden: Story;
//# sourceMappingURL=MuteWhileTalkingToast.stories.d.ts.map