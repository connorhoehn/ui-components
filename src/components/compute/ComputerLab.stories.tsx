import { useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
