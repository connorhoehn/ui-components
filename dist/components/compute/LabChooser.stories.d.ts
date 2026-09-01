import type { StoryObj } from '@storybook/react-vite';
import { LabChooser } from './components/LabChooser';
import type { PaneLeaf } from './lib/paneTree';
/**
 * The fuzzy jump: `⌃B w` in the lab, typing-shaped navigation across panes,
 * computers and projects at once. This story mounts it already open with two
 * panes on screen and two more boxes not yet reached, which is what the
 * empty-query view looks like — panes sort first because jumping to one is
 * free, computers second because reaching one costs a pane. Type a project
 * name (e.g. "search") to see the third kind of row: projects only appear
 * once there is a query, so an unfiltered list is never pushed below the
 * fold by them.
 */
declare const meta: {
    title: string;
    component: typeof LabChooser;
    parameters: {
        layout: string;
    };
    args: {
        open: true;
        onClose: () => void;
        computers: import("./types").Computer[];
        panes: PaneLeaf[];
        onJumpToPane: () => void;
        onRetarget: () => void;
        onOpenInSplit: () => void;
        projects: import(".").ProjectRollup[];
        onSelectProject: () => void;
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        open: boolean;
        onClose: () => void;
        computers: import("./types").Computer[];
        panes: PaneLeaf[];
        onJumpToPane: (paneId: string) => void;
        onRetarget: (computer: import("./types").Computer) => void;
        onOpenInSplit: (computer: import("./types").Computer) => void;
        projects?: readonly import(".").ProjectRollup[] | undefined;
        onSelectProject?: ((project: import(".").ProjectRollup) => void) | undefined;
        chrome?: import("./lib/chromeTokens").ChromeTone | undefined;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The default, empty-query state: `demo-alpha` and `demo-bravo` listed as
 * on-screen panes (tagged `shell` / `tail`), `demo-charlie` and `demo-delta`
 * listed as reachable computers below them, ordered by fuzzy score against
 * nothing — i.e. the array order.
 */
export declare const Default: Story;
/**
 * With no `projects` and no `onSelectProject`, the chooser degrades to just
 * panes and computers — the shape a host with no notion of projects gets,
 * covered separately from `Default` so that omission is exercised on its own
 * rather than assumed to work.
 */
export declare const WithoutProjects: Story;
//# sourceMappingURL=LabChooser.stories.d.ts.map