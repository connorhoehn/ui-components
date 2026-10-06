import type { StoryObj } from '@storybook/react-vite';
import { CallDock, type CallDockProps } from './CallDock';
declare const meta: {
    title: string;
    component: typeof CallDock;
    parameters: {
        layout: string;
    };
    render: (args: CallDockProps) => import("react").JSX.Element;
};
export default meta;
type Story = StoryObj<typeof meta>;
/** Mockup 02: four people, following Alice (accent ring), Bob camera off and muted. */
export declare const Active: Story;
export declare const ActiveDark: Story;
/** 1280 × 720: 132 × 74 tiles; the doc chips and the Documents button fold away with the width. */
export declare const Compact: Story;
export declare const CompactDark: Story;
export declare const Connecting: Story;
export declare const Reconnecting: Story;
export declare const ReconnectingDark: Story;
export declare const MicOffAndSharing: Story;
export declare const MicBlocked: Story;
/** More than six people: the row ends with a +N tile. */
export declare const Overflow: Story;
/** The host with others present: Leave asks first. */
export declare const HostLeave: Story;
export declare const Ended: Story;
export declare const EndedDark: Story;
export declare const Failed: Story;
/** A join that never connected (2.397.2): the banner and its retry take their own copy. */
export declare const JoinFailed: Story;
export declare const JoinFailedDark: Story;
/**
 * Bob's camera is off but he is still talking: his video element stays
 * mounted (invisible) so the audio on that stream keeps playing, and the
 * tile shows his initials. An explicit `audioElement` sink works too.
 */
export declare const CameraOffRemoteWithAudio: Story;
export declare const CameraOffRemoteWithAudioDark: Story;
/**
 * The live editor column (~780px): the title and "4 people · 09:41" keep
 * their natural width; the document chips and the Documents button fold
 * away, and People/Share drop to icon + count, so nothing truncates.
 */
export declare const EditorColumn780: Story;
export declare const EditorColumn780Dark: Story;
/** 1240px: the chips are back and shrink before the title does. */
export declare const EditorColumn1240: Story;
export declare const Conversation: Story;
export declare const ConversationDark: Story;
/**
 * The chat column at a 1280×720 window (~904px) with a DM's long name and the
 * host's full extras: title + meta + controls do not fit one line, so the
 * controls take their own right-aligned line instead of covering the name
 * and the clock (2.403.2).
 */
export declare const ConversationChatColumn904: Story;
export declare const ConversationChatColumn904Dark: Story;
/**
 * The chat column with a side pane open (~650px at 1280×720) and a phone-ish
 * 520px column, with the host's full extras: the labels are already icons,
 * so the controls wrap onto a second right-aligned line; settings, pop-out
 * and Leave stay together and Leave is last and never clipped.
 */
export declare const ConversationChatColumn640: Story;
export declare const ConversationChatColumn640Dark: Story;
export declare const ConversationChatColumn520: Story;
export declare const ConversationChatColumn520Dark: Story;
/**
 * A 1:1 ring from the DM header before the callee answers: "Calling Frank
 * Davis…", no clock and no head count, mic and camera usable, Share disabled
 * until someone joins, and Leave reads Cancel.
 */
export declare const Calling: Story;
export declare const CallingDark: Story;
export declare const FourPeopleTalking: Story;
//# sourceMappingURL=CallDock.stories.d.ts.map