import type { StoryObj } from '@storybook/react-vite';
import { FollowBanner } from './FollowBanner';
declare const meta: {
    title: string;
    component: typeof FollowBanner;
    parameters: {
        layout: string;
    };
    args: {
        name: string;
        onStop: () => void;
        autoStopOnInteract: false;
    };
    decorators: ((S: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        name: string | null;
        onStop: () => void;
        autoStopOnInteract?: boolean;
        autoStop?: boolean;
        autoStopScope?: import("react").RefObject<HTMLElement | null>;
        location?: string;
        appearance?: 'banner' | 'bar';
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Banner: Story;
export declare const BannerWithLocation: Story;
export declare const Bar: Story;
export declare const BarNoLocation: Story;
export declare const BarDark: Story;
/** 2.393.0: `autoStop={false}` — the host ends follow itself. */
export declare const AutoStopOff: Story;
//# sourceMappingURL=FollowBanner.stories.d.ts.map