import type { StoryObj } from '@storybook/react-vite';
import FollowModeBar from './FollowModeBar';
import type { Participant } from '../../types/document';
declare const meta: {
    title: string;
    component: typeof FollowModeBar;
    parameters: {
        layout: string;
    };
    args: {
        followingUserId: string;
        participants: Participant[];
        onStopFollow: () => void;
    };
    decorators: ((S: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        followingUserId: string | null;
        participants: Participant[];
        onStopFollow: () => void;
        location?: string;
        appearance?: 'banner' | 'bar';
        autoStop?: boolean;
        autoStopScope?: import("react").RefObject<HTMLElement | null>;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Banner: Story;
export declare const InCallBar: Story;
export declare const InCallBarDark: Story;
/** Clicks outside the editor (the dock here) keep following; scrolling or typing in the editor stops it. */
export declare const ScopedAutoStop: Story;
export declare const ScopedAutoStopDark: Story;
//# sourceMappingURL=FollowModeBar.stories.d.ts.map