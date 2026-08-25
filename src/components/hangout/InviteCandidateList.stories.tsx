import type { Meta, StoryObj } from '@storybook/react-vite';

import { InviteCandidateList, type InviteCandidate } from './InviteCandidateList';

// The v2 people-picker surface: search, Online/Offline grouping, and
// single-select. All rosters are static — the invite/pick wire calls
// live in the consumer. No external avatar URLs; initials carry it.

const ROSTER: InviteCandidate[] = [
  { userId: 'u-alice', name: 'Alice Chen', online: true },
  { userId: 'u-dan', name: 'Dan Okafor', online: true, pending: true },
  { userId: 'u-bob', name: 'Bob Martinez', online: true, alreadyInCall: true },
  { userId: 'u-grace', name: 'Grace Wilson', online: false, lastSeenLabel: 'Last seen 2h ago' },
  { userId: 'u-eve', name: 'Eve Larsen', online: false, lastSeenLabel: 'Last seen yesterday' },
  { userId: 'u-frank', name: 'Frank Idowu' },
];

const meta = {
  title: 'Hangout/InviteCandidateList',
  component: InviteCandidateList,
  tags: ['autodocs'],
  args: {
    candidates: ROSTER,
    onInvite: () => {},
  },
} satisfies Meta<typeof InviteCandidateList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The pre-v2 default: flat multi-select with checkboxes + confirm. */
export const MultiSelect: Story = {
  render: (args) => (
    <div className="max-w-sm rounded-lg border border-border bg-surface p-3">
      <InviteCandidateList {...args} />
    </div>
  ),
};

/** Search + presence grouping — offline people stay pickable. */
export const SearchableGrouped: Story = {
  render: (args) => (
    <div className="max-w-sm rounded-lg border border-border bg-surface p-3">
      <InviteCandidateList {...args} searchable grouped />
    </div>
  ),
};

/** Single-select: click a row to fire onPick — no checkboxes, no confirm. */
export const SinglePick: Story = {
  render: (args) => (
    <div className="max-w-sm rounded-lg border border-border bg-surface p-3">
      <InviteCandidateList
        {...args}
        searchable
        grouped
        selectMode="single"
        onPick={(userId) => console.info('pick', userId)}
      />
    </div>
  ),
};

/** Dark call chrome (the CallSettingsDialog People-tab surface). */
export const DarkTone: Story = {
  render: (args) => (
    <div className="max-w-sm rounded-lg bg-surface-inverse p-3">
      <InviteCandidateList {...args} tone="dark" searchable grouped />
    </div>
  ),
};

/** Grouped empty state — copy that doesn't claim "nobody is online". */
export const GroupedEmpty: Story = {
  render: (args) => (
    <div className="max-w-sm rounded-lg border border-border bg-surface p-3">
      <InviteCandidateList {...args} candidates={[]} grouped />
    </div>
  ),
};
