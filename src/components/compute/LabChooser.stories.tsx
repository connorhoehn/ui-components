import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabChooser } from './components/LabChooser';
import { fixtureComputers, fixtureProjects } from './fixtures/computeFixture';
import { rollUpProjects } from './hooks/useComputeProjects';
import type { PaneLeaf } from './lib/paneTree';

/**
 * Two panes already on screen, bound to the first two fixture boxes — one a
 * shell, one a tail — so the chooser has something in each of its two rows:
 * panes (free to jump to) and computers not yet open (cost a pane to reach).
 */
const OPEN_PANES: PaneLeaf[] = [
  { kind: 'leaf', id: 'pane-1', computerId: fixtureComputers[0].id, kindId: 'shell' },
  { kind: 'leaf', id: 'pane-2', computerId: fixtureComputers[1].id, kindId: 'tail' },
];

const PROJECTS = rollUpProjects(fixtureProjects, fixtureComputers);

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
const meta = {
  title: 'Compute/LabChooser',
  component: LabChooser,
  parameters: { layout: 'fullscreen' },
  args: {
    open: true,
    onClose: () => {},
    computers: fixtureComputers,
    panes: OPEN_PANES,
    onJumpToPane: () => {},
    onRetarget: () => {},
    onOpenInSplit: () => {},
    projects: PROJECTS,
    onSelectProject: () => {},
  },
  decorators: [
    (Story) => (
      <div className="relative h-[560px] w-full bg-code-bg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LabChooser>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default, empty-query state: `demo-alpha` and `demo-bravo` listed as
 * on-screen panes (tagged `shell` / `tail`), `demo-charlie` and `demo-delta`
 * listed as reachable computers below them, ordered by fuzzy score against
 * nothing — i.e. the array order.
 */
export const Default: Story = {};

/**
 * With no `projects` and no `onSelectProject`, the chooser degrades to just
 * panes and computers — the shape a host with no notion of projects gets,
 * covered separately from `Default` so that omission is exercised on its own
 * rather than assumed to work.
 */
export const WithoutProjects: Story = {
  args: {
    projects: [],
    onSelectProject: undefined,
  },
};
