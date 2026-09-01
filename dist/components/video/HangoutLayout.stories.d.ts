import type { StoryObj } from '@storybook/react-vite';
import { HangoutLayout } from './HangoutLayout';
import type { HangoutLayoutParticipant } from './HangoutLayoutTypes';
declare const meta: {
    title: string;
    component: typeof HangoutLayout;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        participants: HangoutLayoutParticipant[];
        localParticipant?: (HangoutLayoutParticipant | null) | undefined;
        mode?: import("./HangoutLayoutTypes").HangoutMode | undefined;
        activeSpeakerId?: string | null | undefined;
        speakerHysteresisMs?: number | undefined;
        spotlightContent?: import("react").ReactNode;
        spotlightContentLabel?: string | undefined;
        onParticipantClick?: ((id: string) => void) | undefined;
        fillParent?: boolean | undefined;
        pipWidth?: number | undefined;
        filmstripTileWidth?: number | undefined;
        className?: string | undefined;
        style?: import("react").CSSProperties | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** `mode="auto"` under the auto-spotlight threshold → grid. */
export declare const AutoGrid: Story;
/** One remote — grid mode, local as a PiP overlay. */
export declare const OneToOne: Story;
/** `mode="auto"` flips to spotlight at 10+ total participants: a 4×4 grid is
 *  no longer legible. */
export declare const AutoFlipsToSpotlightAtTen: Story;
/** Any participant exposing a `screenElement` forces spotlight, regardless of
 *  `mode` and regardless of the participant count. */
export declare const ScreenShareForcesSpotlight: Story;
/** Explicitly pinned spotlight mode with a small call. */
export declare const ForcedSpotlight: Story;
/** Nobody has joined yet. */
export declare const Empty: Story;
//# sourceMappingURL=HangoutLayout.stories.d.ts.map