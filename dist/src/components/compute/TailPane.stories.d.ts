import type { StoryObj } from '@storybook/react-vite';
import { TailPane } from './components/TailPane';
/**
 * `TailPane` standalone, outside `ComputerLab`. It is the half of the compute
 * surface that has nothing to type at — a read-only stream of whatever a bot
 * or another operator is doing on a box — and each story plays a different
 * scripted run so the three shapes a run can end in are all reviewable:
 * a clean result, a result that is actually a question, and a mid-run
 * failure. See `fixtures/mockTail.ts` for the frame-by-frame scripts.
 */
declare const meta: {
    title: string;
    component: typeof TailPane;
    parameters: {
        layout: string;
    };
    args: {
        computer: import("./types").Computer;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        computer: import("./types").Computer;
        registerPane?: import(".").PaneKindContext['registerPane'];
        className?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * `nightly-dependency-audit`: reads the lockfile, runs `npm audit`, edits
 * `package.json`, and ends in a normal `result` frame — the shape most tails
 * will show most of the time. Watch the chip in the header flip from
 * `not connected` to `tailing` a beat after mount, matching a real SSE
 * handshake rather than snapping straight to connected.
 */
export declare const CleanRun: Story;
/**
 * `flaky-test-triage`: the run's final `result` frame is phrased as a
 * question ("Want me to pin the clock in the fixtures?"). Nothing in the
 * transcript marks it specially — the pane has no way to know a result is a
 * question — but this is the run that puts a box in `waiting` rather than
 * `idle` in the fleet, so it matters that the transcript alone makes the
 * question legible without that status label attached.
 */
export declare const EndsOnAQuestion: Story;
/**
 * `schema-drift-check`: the run is mid-sentence about what it found when the
 * connection drops with a `devbox_error` frame instead of a `result`. This is
 * the failure path — there is no tidy summary, just the last thing the bot
 * said and an error line — and it is worth reviewing on its own because a
 * tail that only ever demos the happy path never shows what an operator
 * actually sees when a box dies mid-run.
 */
export declare const FailsMidRun: Story;
//# sourceMappingURL=TailPane.stories.d.ts.map