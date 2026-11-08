import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoiceDock, type VoiceDockProps } from './VoiceDock';
import { VoiceActivityRing } from './VoiceActivityRing';
import { VoiceTurnStrip, VoiceConfirmCard } from './VoiceTurnStrip';
import { VoiceChoiceCard } from './VoiceChoiceCard';
import { VOICE_PHASES, type VoiceChoiceCandidate, type VoicePhase, type VoiceTurn } from './voiceTypes';

const noop = () => {};

const base: VoiceDockProps = {
  phase: 'listening',
  level: 0.5,
  outputLevel: 0,
  elapsedSeconds: 74,
  budget: { usedUsd: 0.18, holdUsd: 1 },
  lastLine: { role: 'you', text: 'Open the Atlas initiative and show last week’s decisions' },
  onStart: noop,
  onStop: noop,
  onMute: noop,
  muted: false,
};

const meta = {
  title: 'Voice/VoiceDock',
  component: VoiceDock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: base,
} satisfies Meta<typeof VoiceDock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { phase: 'off', level: 0, lastLine: null, budget: null } };
export const Connecting: Story = { args: { phase: 'connecting', level: 0, lastLine: null } };
export const Listening: Story = {};
export const Thinking: Story = { args: { phase: 'thinking', level: 0 } };
export const Executing: Story = {
  args: { phase: 'executing', level: 0, lastLine: { role: 'assistant', text: 'Opening the Atlas initiative…' } },
};
export const Speaking: Story = {
  args: { phase: 'speaking', level: 0, outputLevel: 0.7, lastLine: { role: 'assistant', text: 'Three decisions were recorded last week.' } },
};
export const Confirming: Story = {
  args: {
    phase: 'confirming',
    level: 0,
    pending: { title: 'Archive “Atlas” initiative?', detail: 'It disappears from the board; members keep access.', onConfirm: noop, onCancel: noop },
  },
};
export const Ended: Story = { args: { phase: 'ended', level: 0, lastLine: { role: 'assistant', text: 'Done. Session ended.' } } };
export const Unavailable: Story = {
  args: { phase: 'unavailable', level: 0, lastLine: null, budget: null, unavailableReason: 'No voice grant for this tenant' },
};
export const Compact: Story = { args: { compact: true } };
/** `size="footer"`: the footer's metrics (sm ring, xs labels, ghost "Voice" / "End"). */
export const FooterOff: Story = { args: { size: 'footer', phase: 'off', level: 0, lastLine: null, budget: null } };
export const FooterListening: Story = { args: { size: 'footer' } };
export const Muted: Story = { args: { muted: true } };

/** Every phase of the ring, side by side. */
export const RingPhases: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {VOICE_PHASES.map((p: VoicePhase) => (
        <VoiceActivityRing key={p} phase={p} level={0.6} outputLevel={0.6} label={p} />
      ))}
    </div>
  ),
};

const turns: VoiceTurn[] = [
  { id: 't1', role: 'you', text: 'Show me the open access requests for Atlas.', at: '09:41' },
  {
    id: 't2', role: 'assistant', text: 'Two requests are open; one needs your approval.', at: '09:41',
    toolCalls: [
      { name: 'access.list_requests', status: 'done', summary: '2 results' },
      { name: 'access.approve', status: 'refused', summary: 'needs confirmation' },
    ],
  },
  { id: 't3', role: 'you', text: 'Approve the first one.', at: '09:42' },
  {
    id: 't4', role: 'assistant', text: 'Approving now.', at: '09:42',
    toolCalls: [{ name: 'access.approve', status: 'running', summary: 'request 41' }],
  },
];

/** The transcript strip, with a tool failure and the confirmation card. */
export const TurnStrip: Story = {
  render: () => (
    <VoiceTurnStrip
      turns={[...turns, { id: 't5', role: 'assistant', text: 'That failed.', at: '09:43', toolCalls: [{ name: 'access.approve', status: 'failed', summary: 'timeout' }] }]}
      onClear={noop}
      pending={{ title: 'Approve request 41?', detail: 'Grants editor on Atlas to Dana Reyes.', onConfirm: noop, onCancel: noop }}
    />
  ),
};

/** A decision: approve / reject toggle and a one-line note; Confirm carries `{ decision, note }`. */
export const Decide: StoryObj = {
  render: () => (
    <VoiceConfirmCard
      pending={{
        title: 'Decide request 41',
        detail: ['Grants editor on Atlas to Dana Reyes.', 'Requested by Dana Reyes on Monday.'],
        fields: { decision: 'approve', notePlaceholder: 'Why? (optional)' },
        onConfirm: (result) => console.log('confirm', result),
        onCancel: noop,
      }}
    />
  ),
};

const alphas: VoiceChoiceCandidate[] = [
  { title: 'Alpha', subtitle: 'Initiative, owned by Dana Reyes', kind: 'initiative', href: '/iq/projects/alpha' },
  { title: 'Alpha Centauri', subtitle: 'Initiative, owned by Sam Ortiz', kind: 'initiative', href: '/iq/projects/alpha-centauri' },
  { title: 'Alpha Chen', subtitle: 'Platform team', kind: 'person', href: '/people/alpha-chen' },
];
const tenRows: VoiceChoiceCandidate[] = Array.from({ length: 10 }, (_, i) => ({
  title: `Project ${String.fromCharCode(65 + i)}`,
  subtitle: `Updated ${i + 1} day${i === 0 ? '' : 's'} ago`,
  kind: i % 2 ? 'initiative' : 'team',
}));

/** An `ambiguous` result with three candidates; click or press 1-3. */
export const ChoiceThreeRows: StoryObj = {
  render: () => <VoiceChoiceCard choice={{ title: 'Which Alpha?', candidates: alphas, onChoose: noop, onCancel: noop }} />,
};
/** The most it shows: ten rows, digit 0 chooses the tenth. */
export const ChoiceTenRows: StoryObj = {
  render: () => <VoiceChoiceCard choice={{ title: 'Which project?', candidates: tenRows, onChoose: noop, onCancel: noop }} />,
};
/** The host set `ordinal` ("the second one"): that row is selected and chosen. */
export const ChoiceOrdinalPreselected: StoryObj = {
  render: () => <VoiceChoiceCard choice={{ title: 'Which Alpha?', candidates: alphas, ordinal: 2, onChoose: noop, onCancel: noop }} />,
};
/** In the footer dock: the choice card as a popover, compact. */
export const FooterChoosing: Story = {
  args: {
    size: 'footer',
    phase: 'confirming',
    level: 0,
    pendingChoice: { title: 'Which Alpha?', candidates: alphas, onChoose: noop, onCancel: noop },
  },
};
/** Inside the transcript strip. */
export const StripChoosing: StoryObj = {
  render: () => (
    <VoiceTurnStrip turns={turns.slice(0, 1)} pendingChoice={{ title: 'Which Alpha?', candidates: alphas, onChoose: noop, onCancel: noop }} />
  ),
};
