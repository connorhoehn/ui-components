import type { Meta, StoryObj } from '@storybook/react-vite';
import { CallActivityCard } from './CallActivityCard';
declare const meta: Meta<typeof CallActivityCard>;
export default meta;
type Story = StoryObj<typeof CallActivityCard>;
/** What the gateway writes when a call ends: who started it, how long it ran. */
export declare const Ended: Story;
/**
 * A call still going. The border and the way in are the difference — this is
 * the one row in a transcript worth interrupting for.
 */
export declare const Live: Story;
/**
 * The viewer cannot join — no button at all rather than a greyed one, which
 * would be a promise the product will not keep.
 */
export declare const LiveButNotJoinable: Story;
/**
 * The kind is UNKNOWN, which is the common case for a server-written record:
 * the invite frame does not carry it. "Call" is the true statement; "Video
 * call" would be a guess.
 */
export declare const KindUnknown: Story;
export declare const AudioOnly: Story;
/** More people than faces: the sentence counts everyone the row cannot show. */
export declare const ACrowd: Story;
/**
 * Nobody the card can name — the ids are never shown, because an avatar
 * reading "6e" names someone by their key.
 */
export declare const NobodyNamed: Story;
/** A call that rang out — the record still says it happened. */
export declare const NobodyJoined: Story;
//# sourceMappingURL=CallActivityCard.stories.d.ts.map