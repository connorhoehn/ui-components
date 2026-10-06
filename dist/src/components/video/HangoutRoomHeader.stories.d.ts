import type { StoryObj } from '@storybook/react-vite';
import HangoutRoomHeader, { type HangoutPhase } from './HangoutRoomHeader';
declare const meta: {
    title: string;
    component: typeof HangoutRoomHeader;
    tags: string[];
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        channelName: string;
        subtitle?: import("react").ReactNode;
        recording?: import("./HangoutRoomHeader").HangoutRoomHeaderRecording;
        elapsedLabel?: string;
        phase?: HangoutPhase;
        actions?: import("react").ReactNode;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Just a room name — every other row element is conditional. */
export declare const TitleOnly: Story;
/** A live call: people count, elapsed timer, and the joined phase chip. */
export declare const LiveCall: Story;
/** Recording armed but not yet writing — a static grey dot, because nobody is
 *  publishing yet. */
export declare const RecordingArmed: Story;
/** Recording actively writing — danger tone with a pulsing dot. */
export declare const RecordingActive: Story;
/** The network dropped — reconnecting is the only other pulsing phase. */
export declare const Reconnecting: Story;
/** Every phase chip, for tone comparison. */
export declare const AllPhases: Story;
/** The `actions` slot takes arbitrary right-side content. */
export declare const WithActions: Story;
/** Long room names truncate rather than pushing the chips off the edge. */
export declare const LongChannelName: Story;
//# sourceMappingURL=HangoutRoomHeader.stories.d.ts.map