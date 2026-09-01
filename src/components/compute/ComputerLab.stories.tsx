import { useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../shared/Avatar';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import Chip from '../shared/Chip';
import { NavRail } from '../shared/NavRail';
import PageHeader from '../shared/PageHeader';
import { ComputeProvider } from './context/ComputeContext';
import { ComputerLab } from './components/ComputerLab';
import { fixtureComputers, fixtureModels, fixtureRuntimeStatus } from './fixtures/computeFixture';
import { installMockShellSocket, mockShellUrl } from './fixtures/mockShell';
import { installMockTailSource, mockTailUrl } from './fixtures/mockTail';
import type { ComputeClient } from './lib/computeClient';

/**
 * Enough client to keep the surface honest: the fleet is fixtures, and the two
 * methods that do real work hand back simulator URLs — `getShellUrl` a
 * `mock-shell:` for a typeable PTY, `tail` a `mock-tail:` for a bot run
 * streaming into a read-only pane.
 */
const storyClient: ComputeClient = {
  getStatus: async () => fixtureRuntimeStatus,
  listComputers: async () => fixtureComputers,
  createComputer: async () => fixtureComputers[0],
  adoptComputer: async () => {},
  renameComputer: async () => {},
  removeComputer: async () => {},
  stopSession: async () => {},
  runTask: async () => {},
  runCommand: async () => {},
  getShellUrl: async (sessionId, shellId) => mockShellUrl(sessionId, shellId),
  tail: (boxId) => ({ url: mockTailUrl(boxId), withCredentials: false, headers: {} }),
};

/** Uninstalls on unmount so switching stories does not leave a mock global behind. */
function WithMockShell({ children }: { children: ReactNode }) {
  useEffect(() => installMockShellSocket(), []);
  useEffect(() => installMockTailSource(), []);
  return <>{children}</>;
}

/**
 * Driven by fixtures, so there is no backend and no AWS. Layout, rail,
 * splits, zoom, the fuzzy jump, the status lines and the broadcast bar are all
 * live; terminal panes attach to a simulated devbox and really take typing,
 * and tail panes stream a scripted bot run. See the `WatchingABot` story.
 */
const meta = {
  title: 'Compute/ComputerLab',
  component: ComputerLab,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <WithMockShell>
        <ComputeProvider
          client={storyClient}
          computers={fixtureComputers}
          models={fixtureModels}
          canManage
          pollIntervalMs={0}
        >
          <Story />
        </ComputeProvider>
      </WithMockShell>
    ),
  ],
} satisfies Meta<typeof ComputerLab>;

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
export const Playground: Story = {
  args: { open: true, onClose: () => {} },
};

/** Without `ManageDevbox` the panes still render; the mutating controls go. */
export const ReadOnly: Story = {
  args: { open: true, onClose: () => {} },
  decorators: [
    (Story) => (
      <ComputeProvider
        client={storyClient}
        computers={fixtureComputers}
        models={fixtureModels}
        pollIntervalMs={0}
      >
        <Story />
      </ComputeProvider>
    ),
  ],
};

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
export const WatchingABot: Story = {
  args: { open: true, onClose: () => {} },
};

// ── The acceptance test for the inline lab ───────────────────────────────────

/** Enough of an app to judge the lab against. Nothing here is exported. */
const HOST_NAV = [
  { to: '/iq/overview', label: 'Overview', hint: 'Fleet and spend' },
  { to: '/iq/initiatives', label: 'Initiatives', badge: '14' },
  { to: '/iq/work', label: 'Work queue', badge: '7' },
  { to: '/iq/compute', label: 'Computers', hint: 'microVM boxes' },
  { to: '/iq/sprints', label: 'Sprints' },
  { to: '/iq/observability', label: 'Observability', group: 'Operate' },
  { to: '/iq/evaluations', label: 'Evaluations', group: 'Operate' },
];

/**
 * The lab as a PAGE in somebody else's light application.
 *
 * Every other story here renders the lab alone on a fullscreen canvas, which
 * is the one condition under which the surface cannot fail: with nothing to be
 * compared against, a dark slab looks intentional. The complaint this story
 * exists to catch — "it always feels a bit like an iframe and doesn't natively
 * fit in" — is only visible next to a host, so the host is drawn here from the
 * library's own primitives (`PageHeader`, `NavRail`, `Breadcrumbs`, `Chip`,
 * `Avatar`) rather than hand-rolled, and the lab is given the container a real
 * route would give it.
 *
 * What to look at, in the order the eye finds it:
 *
 *  - **The rail seam.** The host's `NavRail` and the lab's own rail are
 *    adjacent light columns. They should read as two panels of one app, not as
 *    a page and a thing embedded in it.
 *  - **The top bar.** LAB, the window tabs and the shell meter sit on the
 *    host's panel colour, one row below the host's own header. The selected
 *    window tab is the app's `info` fill, not Catppuccin's pastel blue on
 *    near-white.
 *  - **The panes.** Still dark, deliberately, and that is the point: the frame
 *    border is the theme boundary. Title row, canvas and status line are all
 *    on the terminal palette; nothing inside a pane changes colour halfway
 *    down. A pane should read the way a code block reads in a light document.
 *  - **The command line.** Click into it — the top rule lights. Arm broadcast
 *    (**⌥⌘B**) and the whole row goes orange. `send` is a filled control, not
 *    a pastel word.
 *  - **The dialogs.** **⌘K** for the jump list and **⌘/** for the shortcut
 *    sheet: both take the host's theme, over a scrim that stays dark because it
 *    is dimming the terminals as well as the chrome.
 *
 * Force dark mode from the toolbar and the same rules should hold with every
 * surface flipped, panes included — they are the only thing that does not move.
 */
export const InlineInLightApp: Story = {
  args: { open: true, onClose: () => {}, variant: 'inline' },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="h-screen flex flex-col bg-surface text-text-primary">
      <header className="h-14 shrink-0 flex items-center gap-4 px-4 border-b border-border bg-surface-panel">
        <span className="text-[15px] font-semibold tracking-tight">OrgIQ</span>
        <Breadcrumbs
          items={[
            { label: 'Operate', href: '#' },
            { label: 'Computers', href: '#' },
            { label: 'Lab' },
          ]}
        />
        <span className="flex-1" />
        <Chip size="xs" tone="success">us-east-1</Chip>
        <Avatar name="Connor Hoehn" size={26} />
      </header>

      <div className="flex flex-1 min-h-0">
        <NavRail
          title="Operate"
          items={HOST_NAV}
          activeHref="/iq/compute"
          width="narrow"
          className="shrink-0"
        />

        {/* A content column, not a full-bleed canvas. The lab has to hold up
            with the page's own padding around it and a header above it —
            which is where the height budget gets tight, and why the inline
            variant runs a denser top bar and gutter than the overlay. */}
        <main className="flex-1 min-w-0 min-h-0 flex flex-col gap-3 p-4">
          <PageHeader
            title="Computer Lab"
            description="Six boxes, one keyboard. Broadcast reaches every pane in the window."
            badge={<Chip size="xs" tone="info">preview</Chip>}
          />
          <div className="flex-1 min-h-0">
            <ComputerLab {...args} />
          </div>
        </main>
      </div>
    </div>
  ),
};
