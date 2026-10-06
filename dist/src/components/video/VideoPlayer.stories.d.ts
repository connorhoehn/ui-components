import type { StoryObj } from '@storybook/react-vite';
import { VideoPlayer, type PlayerPhase } from './VideoPlayer';
declare const meta: {
    title: string;
    component: typeof VideoPlayer;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        src?: string;
        stream?: MediaStream | null;
        autoPlay?: boolean;
        muted?: boolean;
        loop?: boolean;
        controls?: boolean;
        poster?: string;
        phase?: PlayerPhase;
        className?: string;
        style?: import("react").CSSProperties;
        onPhaseChange?: (phase: PlayerPhase) => void;
        onTimeUpdate?: (currentTime: number, duration: number) => void;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Nothing playing yet — "Ready". */
export declare const Idle: Story;
/** Negotiating the connection. */
export declare const Connecting: Story;
/** Stalled mid-stream: the only phase that also renders a spinner. */
export declare const Buffering: Story;
/** Playing is the one phase with NO overlay — the frame is the UI. Without a
 *  real source this is a black stage, which is the honest rendering. */
export declare const Playing: Story;
/** Terminal playback failure. */
export declare const PlaybackError: Story;
/** Native `<video>` controls, on top of whatever overlay the phase produces. */
export declare const WithNativeControls: Story;
/** Click through every phase — the fastest way to compare overlay copy. */
export declare const PhaseSwitcher: Story;
//# sourceMappingURL=VideoPlayer.stories.d.ts.map