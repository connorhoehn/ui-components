import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaneStatusLine } from './components/PaneStatusLine';
import { fixtureComputers, fixtureModels } from './fixtures/computeFixture';
import type { Computer } from './types';

/**
 * A box actively running, plenty of runway left before the reaper takes it,
 * and no result yet to show a cost for.
 */
const RUNNING = fixtureComputers[0];

/**
 * A box that just finished a run and is waiting on an answer, with well
 * under five minutes left before it stops — the case the expiry meter's
 * `warnAbove` threshold exists for. Watch the meter render amber rather than
 * the neutral tone `WithPlentyOfRunway` gets.
 */
const EXPIRING_SOON = fixtureComputers[1];

/**
 * `contextUsed` and `activeModel` are not in the base fixtures — no story
 * elsewhere needed a box mid-way through filling its context window — so this
 * is assembled here rather than by editing `computeFixture.ts`. A dollar
 * figure well under budget can sit right next to a context meter about to
 * run out, and that is precisely the pairing this status line has to say
 * something honest about in one dense line.
 */
const NEAR_CONTEXT_LIMIT: Computer = {
  ...fixtureComputers[2],
  activeModel: 'us.anthropic.claude-opus-4-8',
  contextUsed: 0.92,
  currentTask: 'Summarizing 900k tokens of prior search-relevance findings',
};

/**
 * The dense, single-line status a terminal multiplexer puts at the foot of
 * an unfocused pane — what model it is on, how full its context window is,
 * what the last run cost, and how long before the reaper stops it. This is
 * the surface you read about a box you are NOT currently looking at, so
 * every story here is deliberately a different pane at a glance rather than
 * a wall of identical rows.
 */
const meta = {
  title: 'Compute/PaneStatusLine',
  component: PaneStatusLine,
  parameters: { layout: 'centered' },
  args: {
    models: fixtureModels,
  },
  decorators: [
    (Story) => (
      <div className="w-[420px] rounded border border-code-border bg-code-bg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaneStatusLine>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A healthy pane: running, project named, expiry meter reads mid-scale and neutral. */
export const WithPlentyOfRunway: Story = {
  args: { computer: RUNNING },
};

/**
 * Under five minutes to reap. The meter crosses `warnAbove` here and paints
 * amber — the one thing on this line that changes while your eyes are on a
 * different pane, which is the reason the meter exists instead of just the
 * `stops in 4m` text next to it.
 */
export const ExpiringSoon: Story = {
  args: { computer: EXPIRING_SOON },
};

/** Context usage above 85% switches the `ctx N%` figure to the caution colour. */
export const NearContextLimit: Story = {
  args: { computer: NEAR_CONTEXT_LIMIT },
};

/** The broadcast flag adds a chip saying the prompt bar reaches this pane too. */
export const Broadcasting: Story = {
  args: { computer: RUNNING, broadcasting: true, mode: 'resume on' },
};
