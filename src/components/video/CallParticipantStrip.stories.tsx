import type { Meta, StoryObj } from '@storybook/react-vite';
import { CallParticipantStrip, type CallStripParticipant } from './CallParticipantStrip';

const PEOPLE: CallStripParticipant[] = [
  { id: 'alice', displayName: 'Alice Johnson' },
  { id: 'bob', displayName: 'Bob Smith' },
  { id: 'cai', displayName: 'Cai Lund' },
  { id: 'dee', displayName: 'Dee Okafor' },
  { id: 'eli', displayName: 'Eli Marsh' },
  { id: 'fern', displayName: 'Fern Ortiz' },
];

const meta = {
  title: 'Video/CallParticipantStrip',
  component: CallParticipantStrip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80 rounded-lg bg-surface-inverse">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallParticipantStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three people, all fine. Avatar colour is hashed from the display name, so
 *  the same person is the same colour everywhere in the call surface. */
export const Populated: Story = {
  args: { participants: PEOPLE.slice(0, 3) },
};

/** Speaking gets a green dot bottom-right; muted gets a red mic-slash badge
 *  top-right. Both can be true at once — that's the "talking while muted" case. */
export const SpeakingAndMuted: Story = {
  args: {
    participants: [
      { id: 'alice', displayName: 'Alice Johnson', isSpeaking: true },
      { id: 'bob', displayName: 'Bob Smith', isMuted: true },
      { id: 'cai', displayName: 'Cai Lund', isMuted: true, isSpeaking: true },
    ],
  },
};

/** Past `maxVisible` the strip collapses into a `+N` counter instead of
 *  wrapping to a second row. */
export const Overflow: Story = {
  args: { participants: PEOPLE, maxVisible: 4 },
};

/** Nobody has joined yet — `localFallback` renders your own (slightly larger)
 *  avatar so the strip is never blank while a call is ringing. */
export const LocalFallbackOnly: Story = {
  args: {
    participants: [],
    localFallback: { id: 'me', displayName: 'Morgan Reyes' },
  },
};

/** No participants and no fallback — the strip renders empty padding. */
export const Empty: Story = {
  args: { participants: [] },
};

/** Bigger avatars for a full-screen call surface. */
export const LargeAvatars: Story = {
  args: { participants: PEOPLE.slice(0, 3), avatarSize: 56 },
};
