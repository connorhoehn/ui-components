import type { StoryObj } from '@storybook/react-vite';
import { HangoutGrid } from './HangoutGrid';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';
declare const meta: {
    title: string;
    component: typeof HangoutGrid;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        participants: HangoutLayoutParticipant[];
        localParticipant?: (HangoutLayoutParticipant | null) | undefined;
        activeSpeakerId?: string | null | undefined;
        onParticipantClick?: ((id: string) => void) | undefined;
        fillParent?: boolean | undefined;
        pipWidth?: number | undefined;
        className?: string | undefined;
        style?: import("react").CSSProperties | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Nobody at all — the "waiting for others to join" placeholder. */
export declare const Empty: Story;
/** Solo: you joined first, so your tile fills the canvas — no PiP, no grid. */
export declare const LocalSolo: Story;
/** 1:1 — the remote fills the stage and the local user becomes a corner PiP. */
export declare const OneToOneWithPip: Story;
/** A larger PiP for docked/fullscreen widget modes. */
export declare const OneToOneLargePip: Story;
/** 2+ remotes — the local user joins the grid inline as another tile. */
export declare const LocalInline: Story;
/** Clickable tiles — the caller decides what a click means (pin, promote…). */
export declare const Clickable: Story;
//# sourceMappingURL=HangoutGrid.stories.d.ts.map