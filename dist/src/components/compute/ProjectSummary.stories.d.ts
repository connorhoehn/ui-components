import type { StoryObj } from '@storybook/react-vite';
import { ProjectSummary } from './components/ProjectSummary';
/**
 * The cost-centre line an operator reads before starting a sixth computer:
 * what is allocated, what has actually been spent, how much of that spend was
 * recurring upkeep rather than anything anyone chose this month, and how
 * many of the project's boxes are doing something right now.
 */
declare const meta: {
    title: string;
    component: typeof ProjectSummary;
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        project: import(".").ProjectRollup;
        showMeter?: boolean;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * A project comfortably inside its budget — the case where every number is
 * reassuring and the meter alone would say "nothing to see here," which is
 * exactly the point of including it: not every project is a warning.
 */
export declare const WithinBudget: Story;
/**
 * A project where 80% of the *allocation* has been consumed, and the
 * `% is upkeep` note on the meter is the reason to look twice: most of that
 * spend is recurring maintenance bots, not new work, which "90% spent" alone
 * would not tell you. This is the scenario the note exists to make visible.
 */
export declare const UpkeepHeavy: Story;
/**
 * A project with no budget configured at all. There is no meter, no `/ $—`
 * denominator pretending to be a real ceiling — just the raw spend and token
 * count, because a project can exist purely to group computers together
 * without ever being given a dollar limit.
 */
export declare const NoBudgetSet: Story;
/**
 * The synthetic bucket `rollUpProjects` builds for boxes with no `projectId`
 * at all — an anonymous charge against the account rather than a cost
 * centre. The component labels this explicitly ("not charged to any
 * project") so an unassigned box reads as a gap to fix, not as a project
 * that happens to have no budget.
 */
export declare const Unassigned: Story;
/**
 * The compact form used in tight spaces — the fuzzy-jump chooser's project
 * rows, for one — where there is room for the numbers but not for a second
 * line of meter.
 */
export declare const WithoutMeter: Story;
//# sourceMappingURL=ProjectSummary.stories.d.ts.map