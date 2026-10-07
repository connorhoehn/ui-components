import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputeProvider } from './context/ComputeContext';
import { AgentPane } from './components/WorkspacePanes';
import { fixtureComputers, fixtureRuntimeStatus } from './fixtures/computeFixture';
import { installMockTailSource, mockTailUrl } from './fixtures/mockTail';
import type { ComputeClient } from './lib/computeClient';
import type { Computer } from './types';

/** A client that streams one scripted run from `fixtures/mockTail.ts`. */
function clientForScript(scriptId: string | undefined): ComputeClient {
  return {
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fixtureComputers,
    createComputer: async () => fixtureComputers[0]!,
    adoptComputer: async () => {},
    renameComputer: async () => {},
    removeComputer: async () => {},
    stopSession: async () => {},
    // The reply composer's default route lands here — resumed, on this box.
    runTask: async (sessionId, body) => { console.info('runTask', sessionId, body); },
    runCommand: async () => {},
    getShellUrl: async () => ({ url: 'mock-shell://unused' }),
    tail: (boxId) => ({ url: mockTailUrl(boxId, scriptId), withCredentials: false, headers: {} }),
  };
}

/** Installed at render time so the pane's first EventSource is the simulator's. */
function WithMockTail({ children }: { children: ReactNode }) {
  const [uninstall] = useState(() => installMockTailSource());
  useEffect(() => uninstall, [uninstall]);
  return <>{children}</>;
}

function Scripted({ script, computer }: { script?: string; computer: Computer }) {
  return (
    <WithMockTail>
      <ComputeProvider client={clientForScript(script)} useFixtures={false} pollIntervalMs={0}>
        <div className="h-[460px] w-full max-w-xl overflow-hidden rounded border border-code-border">
          <AgentPane computer={computer} />
        </div>
      </ComputeProvider>
    </WithMockTail>
  );
}

/**
 * The Agent pane reads a box's tail as a story: the latest `TodoWrite` plan
 * as a checklist above the steps, a dispatch held at a budget gate as a
 * warning, a captured change as a success with its PR link, and — when the
 * box is `waiting` — the agent's question with an inline reply that goes
 * the same way a Nudge would.
 */
const meta = {
  title: 'Compute/AgentPane',
  component: AgentPane,
  parameters: { layout: 'padded' },
  args: { computer: fixtureComputers[0]! },
} satisfies Meta<typeof AgentPane>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A plan rewritten three times (each replaces the last), worked to a change posted for review. */
export const PlanToDelivery: Story = {
  render: () => <Scripted script="lab-demo-delivery" computer={{ ...fixtureComputers[0]!, status: 'running' }} />,
};

/** A governed dispatch refused at the envelope gate: nothing ran, and the flag that clears it is named. */
export const HeldAtGate: Story = {
  render: () => <Scripted script="lab-demo-gate-held" computer={{ ...fixtureComputers[2]!, status: 'idle' }} />,
};

/** The run ended on a question: answer it here; the reply is a resumed task on this box. */
export const WaitingForAnswer: Story = {
  render: () => <Scripted script="flaky-test-triage" computer={{ ...fixtureComputers[1]!, status: 'waiting' }} />,
};

/** Minted, microVM not up yet — no steps until its first `task_started`. */
export const Provisioning: Story = {
  render: () => (
    <Scripted
      script="lab-demo-provisioning"
      computer={{ ...fixtureComputers[0]!, id: 'demo-new', status: 'provisioning', currentTask: undefined }}
    />
  ),
};
