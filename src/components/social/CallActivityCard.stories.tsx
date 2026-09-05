import type { Meta, StoryObj } from '@storybook/react-vite';
import { CallActivityCard } from './CallActivityCard';

// A call, as it appears in the thread it happened in. The gateway writes the
// ended state; the live state is for a host that genuinely knows a call is
// happening right now (the conversation header usually does).

const HANK = { userId: 'dev-hank', displayName: 'Hank Anderson' };
const BOB = { userId: 'dev-bob', displayName: 'Bob Martinez' };
const NORA = { userId: 'dev-nora', displayName: 'Nora DaSilva' };

const meta: Meta<typeof CallActivityCard> = {
  title: 'Social/CallActivityCard',
  component: CallActivityCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CallActivityCard>;

/** What the gateway writes when a call ends: who started it, how long it ran. */
export const Ended: Story = {
  args: {
    callId: 'c1',
    startedBy: 'Hank Anderson',
    durationMs: 12 * 60_000 + 4_000,
    participants: [HANK, BOB],
  },
};

/**
 * A call still going. The border and the way in are the difference — this is
 * the one row in a transcript worth interrupting for.
 */
export const Live: Story = {
  args: {
    callId: 'c1',
    live: true,
    participants: [HANK, BOB],
    onJoin: (id) => window.alert(`join ${id}`),
  },
};

/**
 * The viewer cannot join — no button at all rather than a greyed one, which
 * would be a promise the product will not keep.
 */
export const LiveButNotJoinable: Story = {
  args: { callId: 'c1', live: true, participants: [HANK, BOB] },
};

/**
 * The kind is UNKNOWN, which is the common case for a server-written record:
 * the invite frame does not carry it. "Call" is the true statement; "Video
 * call" would be a guess.
 */
export const KindUnknown: Story = {
  args: { callId: 'c1', startedBy: 'Hank Anderson', durationMs: 43_000, participants: [HANK, BOB] },
};

export const AudioOnly: Story = {
  args: { callId: 'c1', audioOnly: true, startedBy: 'Hank Anderson', durationMs: 95_000, participants: [HANK, BOB] },
};

/** More people than faces: the sentence counts everyone the row cannot show. */
export const ACrowd: Story = {
  args: {
    callId: 'c1',
    live: true,
    participants: [HANK, BOB, NORA, { userId: 'dev-dave', displayName: 'Dave Williams' }, { userId: 'dev-grace' }],
    onJoin: () => {},
  },
};

/**
 * Nobody the card can name — the ids are never shown, because an avatar
 * reading "6e" names someone by their key.
 */
export const NobodyNamed: Story = {
  args: {
    callId: 'c1',
    startedBy: 'Hank Anderson',
    durationMs: 60_000,
    participants: [{ userId: '6ea7c8fd-1234' }, { userId: 'b21b823d-9999' }],
  },
};

/** A call that rang out — the record still says it happened. */
export const NobodyJoined: Story = {
  args: { callId: 'c1', startedBy: 'Hank Anderson', durationMs: 8_000, participants: [] },
};
