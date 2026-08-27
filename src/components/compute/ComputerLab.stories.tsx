import { useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputeProvider } from './context/ComputeContext';
import { ComputerLab } from './components/ComputerLab';
import { fixtureComputers, fixtureModels, fixtureRuntimeStatus } from './fixtures/computeFixture';
import { installMockShellSocket, mockShellUrl } from './fixtures/mockShell';
import type { ComputeClient } from './lib/computeClient';

/**
 * Enough client to keep the surface honest: the fleet is fixtures, and the
 * only method that does real work is `getShellUrl`, which hands back a
 * `mock-shell:` URL for the simulator to answer.
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
  tail: (boxId) => ({ url: `/story/${boxId}/tail`, withCredentials: false, headers: {} }),
};

/** Uninstalls on unmount so switching stories does not leave a mock global behind. */
function WithMockShell({ children }: { children: ReactNode }) {
  useEffect(() => installMockShellSocket(), []);
  return <>{children}</>;
}

/**
 * Driven by fixtures, so there is no backend and no AWS. Layout, rail,
 * splits, zoom, the fuzzy jump, the status lines and the broadcast bar are
 * all live; tail panes have nothing to listen to, but terminal panes attach
 * to a simulated devbox and really work.
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
