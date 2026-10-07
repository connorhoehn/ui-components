import type { StoryObj } from '@storybook/react-vite';
import { ReactionOverlay } from './ReactionOverlay';
declare const meta: {
    title: string;
    component: typeof ReactionOverlay;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/** The real pairing: a ReactionPicker feeding the overlay. Click an emoji and
 *  it floats up from a random horizontal offset, fading out over 3s. */
export declare const Interactive: Story;
/** A burst driven programmatically, the way an incoming websocket feed would:
 *  each push animates exactly one floater, so rapid pushes stack up. */
export declare const IncomingBurst: Story;
/** Steady state with no traffic: the overlay is an inert, pointer-events-none
 *  layer, so the stage underneath stays fully interactive. */
export declare const Idle: Story;
/** ReactionPickerButton — the compact control-bar trigger. It sits in a dark
 *  control row (like CallControls' 36px round buttons) and opens the emoji
 *  row as an absolute popover above itself: never position:fixed, so it
 *  stays anchored inside CallWidget's transformed root. */
export declare const ControlBarTrigger: Story;
//# sourceMappingURL=ReactionOverlay.stories.d.ts.map