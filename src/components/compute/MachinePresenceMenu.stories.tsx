// MachinePresenceMenu — the top-nav item that says "my machine is in the
// fleet". Presentational: the host polls its presence API and hands the
// nodes in; no provider, no socket, nothing to mock. The stories cover the
// three states the chip must make distinguishable at a glance — working
// (pulse), connected-but-idle (static dot), and degraded (stale/offline) —
// plus the mixed local/platform model case the surface exists for.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { MachinePresenceMenu } from './components/MachinePresenceMenu';
import { fixtureMachines, fixtureModels } from './fixtures/computeFixture';
import type { MachineNode } from './types';

const meta = {
  title: 'Compute/MachinePresenceMenu',
  component: MachinePresenceMenu,
  parameters: { layout: 'centered' },
  args: {
    nodes: fixtureMachines,
    models: fixtureModels,
  },
  decorators: [
    // A slab of header-height chrome so the trigger reads in situ; the panel
    // itself portals to the body, exactly as it does in a real app shell.
    (Story) => (
      <div className="flex items-center justify-end gap-3 w-[560px] rounded-lg border border-border bg-surface px-4 py-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MachinePresenceMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full fixture fleet: a connected MacBook running one Bedrock and one
 * Ollama session, and a stale workstation whose memory sidecar is queuing
 * offline. Click the chip — the panel is the component.
 */
export const TwoMachines: Story = {};

/**
 * One machine, actively working — the everyday state. The dot pulses because
 * a connected machine has live sessions.
 */
export const SingleMachine: Story = {
  args: { nodes: [fixtureMachines[0]] },
};

/**
 * Connected but idle: paired, heartbeating, nothing running. The chip stays
 * (the user asked "is my machine connected?") but the dot goes static and the
 * panel shows the placeholder rather than an empty list pretending to load.
 */
export const ConnectedIdle: Story = {
  args: {
    nodes: [{ ...fixtureMachines[0], sessions: [] } satisfies MachineNode],
  },
};

/**
 * Everything dark: the machine missed its heartbeat horizon. Sessions are
 * gone from the listing — presence a machine can't back is not offered.
 */
export const Offline: Story = {
  args: {
    nodes: [{ ...fixtureMachines[0], status: 'offline', sessions: [] } satisfies MachineNode],
  },
};

/**
 * With the host affordances wired: a lab deep-link and the machines settings
 * surface. Omitting both props omits the footer entirely — a host without a
 * Computer Lab never shows a dead link into one.
 */
export const WithActions: Story = {
  args: {
    onOpenLab: () => {},
    onManage: () => {},
  },
};
