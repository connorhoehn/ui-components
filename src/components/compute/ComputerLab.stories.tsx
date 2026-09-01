import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputeProvider } from './context/ComputeContext';
import { ComputerLab } from './components/ComputerLab';
import { fixtureComputers, fixtureModels, fixtureRuntimeStatus } from './fixtures/computeFixture';
import { installMockShellSocket, mockShellUrl } from './fixtures/mockShell';
import { installMockTailSource, mockTailUrl } from './fixtures/mockTail';
import { LAB_LAYOUT_STORAGE_KEY } from './lib/storage';
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

/**
 * Installs the shell + tail simulators, uninstalling on unmount.
 *
 * Installed in a `useState` initializer, NOT an effect: child effects run
 * before parent effects, so a story that mounts a tail pane pre-seeded (see
 * WatchingABot) would open its EventSource against the NATIVE constructor a
 * beat before an effect-time install patched it — two panes stuck on
 * "not connected" with a working simulator arriving just too late. Both
 * installers are refcounted, so the render-time install is safe under strict
 * mode's double-invoke; the effect below exists only for the uninstall.
 */
function WithMockShell({ children }: { children: ReactNode }) {
  const [uninstalls] = useState(() => [installMockShellSocket(), installMockTailSource()]);
  useEffect(() => () => { for (const u of uninstalls) u(); }, [uninstalls]);
  return <>{children}</>;
}

/**
 * Pin the persisted pane layout before the lab mounts.
 *
 * The lab restores its layout from localStorage — right for an app, wrong for
 * a story: whatever splits the LAST viewer left behind became the story, so
 * "Watching a bot" could open on five shell panes somebody built weeks ago.
 * A story is a fixture; it owns its starting state. `useState` initializer
 * rather than an effect because it must run before the lab's own first read.
 */
function FreshLayout({ seed, children }: { seed?: object; children: ReactNode }) {
  useState(() => {
    try {
      if (seed) globalThis.localStorage?.setItem(LAB_LAYOUT_STORAGE_KEY, JSON.stringify(seed));
      else globalThis.localStorage?.removeItem(LAB_LAYOUT_STORAGE_KEY);
    } catch { /* private mode — the lab just seeds its default */ }
    return true;
  });
  return <>{children}</>;
}

/**
 * Two read-only tails, side by side, before a single click.
 *
 * The scenario is "something ELSE is driving these boxes and I want to see
 * what" — so the story must open ON the watching, not on shells with the tail
 * control hidden behind a hover. demo-1 is mid-run and demo-2 ended on a
 * question; each streams its own scripted run from the tail simulator.
 */
const WATCHING_SEED = {
  windows: [{
    id: 'w-watch',
    root: {
      kind: 'split', id: 'watch-split', direction: 'row', ratio: 0.5,
      a: { kind: 'leaf', id: 'watch-a', computerId: 'demo-1', kindId: 'tail' },
      b: { kind: 'leaf', id: 'watch-b', computerId: 'demo-2', kindId: 'tail' },
    },
  }],
  activeWindowId: 'w-watch',
  activePaneId: 'watch-a',
  zoomedPaneId: null,
};

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
    (Story, context) => (
      <WithMockShell>
        {/* Layout seed rides story parameters so one decorator owns the
            localStorage write and no story can forget to reset it. */}
        <FreshLayout seed={context.parameters['labLayout'] as object | undefined}>
          <ComputeProvider
            client={storyClient}
            computers={fixtureComputers}
            models={fixtureModels}
            canManage
            pollIntervalMs={0}
          >
            <Story />
          </ComputeProvider>
        </FreshLayout>
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
  parameters: { labLayout: WATCHING_SEED },
};

// ── The inline lab, bare ────────────────────────────────────────────────────

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
export const Inline: Story = {
  args: { open: true, onClose: () => {}, variant: 'inline' },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div className="h-screen p-4 bg-surface">
      <ComputerLab {...args} />
    </div>
  ),
};
