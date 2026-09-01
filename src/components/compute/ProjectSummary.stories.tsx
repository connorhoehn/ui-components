import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectSummary } from './components/ProjectSummary';
import { fixtureComputers, fixtureProjects } from './fixtures/computeFixture';
import { rollUpProjects, UNASSIGNED_PROJECT_ID } from './hooks/useComputeProjects';

/**
 * `ProjectSummary` takes a `ProjectRollup` — a project joined to whichever of
 * the live fleet is charged to it — not a bare `ComputeProject`, so the
 * stories build that join the same way `ComputeProvider` does: run
 * `rollUpProjects` once over the fixture projects and the fixture fleet, then
 * pick a specific rollup per story. No provider, no client, no context —
 * this component only ever reads the object it is handed.
 */
const rollups = rollUpProjects(fixtureProjects, fixtureComputers);
const byId = new Map(rollups.map((r) => [r.id, r]));

const AUTH = byId.get('proj-auth')!;
const SEARCH = byId.get('proj-search')!;
const PLATFORM = byId.get('proj-platform')!;
const UNASSIGNED = byId.get(UNASSIGNED_PROJECT_ID)!;

/**
 * The cost-centre line an operator reads before starting a sixth computer:
 * what is allocated, what has actually been spent, how much of that spend was
 * recurring upkeep rather than anything anyone chose this month, and how
 * many of the project's boxes are doing something right now.
 */
const meta = {
  title: 'Compute/ProjectSummary',
  component: ProjectSummary,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[420px] rounded border border-code-border bg-code-panel p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A project comfortably inside its budget — the case where every number is
 * reassuring and the meter alone would say "nothing to see here," which is
 * exactly the point of including it: not every project is a warning.
 */
export const WithinBudget: Story = {
  args: { project: AUTH },
};

/**
 * A project where 80% of the *allocation* has been consumed, and the
 * `% is upkeep` note on the meter is the reason to look twice: most of that
 * spend is recurring maintenance bots, not new work, which "90% spent" alone
 * would not tell you. This is the scenario the note exists to make visible.
 */
export const UpkeepHeavy: Story = {
  args: { project: SEARCH },
};

/**
 * A project with no budget configured at all. There is no meter, no `/ $—`
 * denominator pretending to be a real ceiling — just the raw spend and token
 * count, because a project can exist purely to group computers together
 * without ever being given a dollar limit.
 */
export const NoBudgetSet: Story = {
  args: { project: PLATFORM },
};

/**
 * The synthetic bucket `rollUpProjects` builds for boxes with no `projectId`
 * at all — an anonymous charge against the account rather than a cost
 * centre. The component labels this explicitly ("not charged to any
 * project") so an unassigned box reads as a gap to fix, not as a project
 * that happens to have no budget.
 */
export const Unassigned: Story = {
  args: { project: UNASSIGNED },
};

/**
 * The compact form used in tight spaces — the fuzzy-jump chooser's project
 * rows, for one — where there is room for the numbers but not for a second
 * line of meter.
 */
export const WithoutMeter: Story = {
  args: { project: SEARCH, showMeter: false },
};
