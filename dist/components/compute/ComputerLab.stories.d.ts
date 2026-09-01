import type { StoryObj } from '@storybook/react-vite';
import { ComputerLab } from './components/ComputerLab';
/**
 * Driven by fixtures, so there is no backend and no AWS. Layout, rail,
 * splits, zoom, the fuzzy jump, the status lines and the broadcast bar are all
 * live; terminal panes attach to a simulated devbox and really take typing,
 * and tail panes stream a scripted bot run. See the `WatchingABot` story.
 */
declare const meta: {
    title: string;
    component: typeof ComputerLab;
    parameters: {
        layout: string;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        open: boolean;
        onClose: () => void;
        keymap?: readonly import(".").KeyBinding[] | undefined;
        leader?: (import(".").LeaderConfig | null) | undefined;
        idleWindowMs?: number | undefined;
        focusComputerId?: string | null | undefined;
        variant?: "overlay" | "inline" | undefined;
        chrome?: import("./lib/chromeTokens").ChromeTone | undefined;
        className?: string | undefined;
    }>, context: import("storybook/internal/csf").StoryContext<import("@storybook/react").ReactRenderer, {
        open: boolean;
        onClose: () => void;
        keymap?: readonly import(".").KeyBinding[] | undefined;
        leader?: (import(".").LeaderConfig | null) | undefined;
        idleWindowMs?: number | undefined;
        focusComputerId?: string | null | undefined;
        variant?: "overlay" | "inline" | undefined;
        chrome?: import("./lib/chromeTokens").ChromeTone | undefined;
        className?: string | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * Everything is the leader key, **⌃B**, then one key: `|` split right, `-`
 * split down, `hjkl` / arrows to move, `z` zoom, `x` close, `e` swap the pane
 * between agent and terminal, `w` fuzzy jump, `s` broadcast, `?` for the rest.
 *
 * Swap a pane to a terminal and type `help` — the shell is simulated, the
 * xterm and the wire format are not.
 */
export declare const Playground: Story;
/** Without `ManageDevbox` the panes still render; the mutating controls go. */
export declare const ReadOnly: Story;
/**
 * A bot is running a computer, and you want to watch rather than drive.
 *
 * The scenario the tail pane exists for: a cron bot or a job dispatcher claims
 * an idle box and runs `claude -p "…"` on it, and an SME opens the lab to see
 * what it is doing. Nobody in this browser started the run, and there is
 * nothing to type at it.
 *
 * The rail's lower section is the activity list — the boxes something else is
 * driving, sorted by how much they want your attention (`error`, then
 * `waiting`, then `running`). Hover a row and press **tail** to open a
 * read-only pane on it. That is deliberately a different verb from clicking
 * the row, which retargets a terminal: a tail costs no shell against the
 * runtime's quota of ten, so several can stay open while you work elsewhere.
 *
 * Each box plays a different scripted run, chosen deterministically from its
 * id, so you can open two and watch them interleave:
 *
 *   - `nightly-dependency-audit` — tools, edits, a clean result
 *   - `flaky-test-triage` — ends on a QUESTION, which is what leaves a box
 *     `waiting` rather than `idle`
 *   - `schema-drift-check` — ends in `devbox_error`, so the failure path is
 *     reviewable too
 *
 * The frames are the same vocabulary the reference backend tees into a box's
 * event ring (`job_started`, `task_started`, assistant/tool steps, `result`,
 * `devbox_end`), so this exercises the parsing a deployment does rather than a
 * story-shaped imitation of it.
 */
export declare const WatchingABot: Story;
/**
 * The lab as a page section — just the component, no pretend application.
 *
 * An earlier version wrapped this in a mocked host (nav rail, header,
 * breadcrumbs) to judge the seam against neighbouring chrome. That mock read
 * as an iframe demo and was cut on direct feedback: a story shows the
 * component, and the seam is judged in the app that owns the nav.
 *
 * Day and night: the lab follows the theme toolbar. In light mode the whole
 * surface — chrome AND terminals — is light (the `--color-terminal-*` ramp
 * flips with the theme); switch the toolbar to dark and everything flips
 * together. `chrome="code"` remains the opt-in permanently-dark lab.
 */
export declare const Inline: Story;
//# sourceMappingURL=ComputerLab.stories.d.ts.map