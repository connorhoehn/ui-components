import type { StoryObj } from '@storybook/react-vite';
import MediaControlsBar from './MediaControlsBar';
declare const meta: {
    title: string;
    component: typeof MediaControlsBar;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        audioOn: boolean;
        videoOn: boolean;
        screenSharing?: boolean;
        onToggleAudio: () => void;
        onToggleVideo: () => void;
        onToggleScreenShare?: () => void;
        onLeave: () => void;
        audioDisabled?: boolean;
        videoDisabled?: boolean;
        screenShareDisabled?: boolean;
        extras?: import("react").ReactNode;
        leaveLabel?: string;
        size?: import("./CircularIconToggle").CircularIconToggleSize;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
    args: {
        onToggleAudio: () => void;
        onToggleVideo: () => void;
        onLeave: () => void;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Mic and camera both live. Screen-share is omitted, because
 *  `onToggleScreenShare` was not supplied. */
export declare const AudioAndVideoOn: Story;
/** Muted with the camera off — both toggles in their danger-soft state. */
export declare const MutedAndCameraOff: Story;
/** Actively presenting. Screen-share uses the neutral off-tone, so "on" is the
 *  emphasised state rather than "off" being alarming. */
export declare const ScreenSharing: Story;
/** Devices not yet granted — every toggle is disabled but Leave stays live, so
 *  a user stuck in a broken pre-flight can always get out. */
export declare const DevicesUnavailable: Story;
/** The `extras` slot sits between screen-share and Leave — raise hand,
 *  captions, invite, overflow menu. */
export declare const WithExtras: Story;
/** All three sizes; `size` scales the toggles and the Leave button together. */
export declare const Sizes: Story;
/** Fully wired, so the glyph/label swaps are visible rather than described. */
export declare const Interactive: Story;
//# sourceMappingURL=MediaControlsBar.stories.d.ts.map