import type { StoryObj } from '@storybook/react-vite';
import { HangoutSpotlight } from './HangoutSpotlight';
declare const meta: {
    title: string;
    component: typeof HangoutSpotlight;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        className: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Active speaker drives the main slot; everyone else lands in the filmstrip.
 *  Hysteresis is disabled here so the story renders its final state at once. */
export declare const ActiveSpeaker: Story;
/** No active speaker yet — the first remote fills the slot so it is never blank. */
export declare const NoActiveSpeaker: Story;
/** A participant's `screenElement` is auto-promoted to the main slot, and the
 *  sharer's camera tile *stays* in the filmstrip so you still see them. */
export declare const AutoPromotedScreenShare: Story;
/** Explicit `spotlightContent` wins over everything. Pass
 *  `spotlightContentLabel` — otherwise attribution falls back to the active
 *  speaker, who is usually not the person sharing. */
export declare const ExplicitSpotlightContent: Story;
/** Only the local user is present — the filmstrip still renders their tile. */
export declare const LocalOnly: Story;
/** Wider filmstrip thumbs, for docked / fullscreen widget modes. */
export declare const WideFilmstrip: Story;
//# sourceMappingURL=HangoutSpotlight.stories.d.ts.map