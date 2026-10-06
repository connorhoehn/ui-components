import type { Meta, StoryObj } from '@storybook/react-vite';
import { StreamStage } from './StreamStage';
declare const meta: Meta<typeof StreamStage>;
export default meta;
type Story = StoryObj<typeof StreamStage>;
/** Before a broadcast starts — the normal state, not an error. */
export declare const WaitingForStream: Story;
export declare const LiveWithChat: Story;
/** A silent stream carries no empty chat frame. */
export declare const LiveNoChat: Story;
/** Rotation off pins the newest messages — useful for screenshots and tests. */
export declare const ChatPinned: Story;
/**
 * AUDIO-ONLY — the common case, not an edge one. A call published from a
 * machine whose camera is busy carries audio and no video, and the stage used
 * to render that literally.
 */
export declare const AudioOnly: Story;
/** The same broadcast while the viewer is still muted: the fix gets named. */
export declare const AudioOnlyMuted: Story;
/**
 * NOTHING IS BEING BROADCAST. Where every "waiting" road ends — with or
 * without a playlist. A stage that can sit on "Waiting for the stream…" with
 * no exit is the failure this component keeps having to unlearn.
 */
export declare const NothingBeingBroadcast: Story;
/** Wording the host owns, on the same bounded promise. */
export declare const NotStartedHostWording: Story;
/**
 * A LEAVE control, on a stage with nothing on it.
 *
 * `controls` is the host's, and it is where the way out lives. It used to be
 * hidden together with the stage's own chrome on every message state, so a
 * broadcast that ended took the Leave button with it and left the viewer
 * looking at "The broadcast has ended." with nothing to press. The stage's
 * own chrome still stays away — a Full screen button on an apology is an
 * offer to enlarge it.
 */
export declare const NothingBeingBroadcastWithAWayOut: Story;
//# sourceMappingURL=StreamStage.stories.d.ts.map