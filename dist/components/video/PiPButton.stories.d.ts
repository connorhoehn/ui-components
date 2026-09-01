import type { StoryObj } from '@storybook/react-vite';
import { PiPButton } from './PiPButton';
declare const meta: {
    title: string;
    component: typeof PiPButton;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        getVideoElement: () => HTMLVideoElement | null;
        className?: string | undefined;
        title?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Default chrome. `getVideoElement` is a callback rather than a ref so the
 *  caller can resolve the *currently spotlit* video at click time. */
export declare const Default: Story;
/** With an explicit `title` override, replacing the state-derived tooltip. */
export declare const CustomTitle: Story;
/** Realistic wiring: the button sits in a player's control row and reaches
 *  into that player's `<video>` through a ref. */
export declare const InPlayerControls: Story;
//# sourceMappingURL=PiPButton.stories.d.ts.map