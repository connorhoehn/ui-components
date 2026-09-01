import { useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputeProvider } from './context/ComputeContext';
import { TailPane } from './components/TailPane';
import { fixtureComputers, fixtureModels, fixtureRuntimeStatus } from './fixtures/computeFixture';
import { installMockTailSource, mockTailUrl } from './fixtures/mockTail';
import type { ComputeClient } from './lib/computeClient';

/**
 * A client whose only real job is `tail`: it hands back a `mock-tail:` URL
 * pinned to one of the three scripted runs (`fixtures/mockTail.ts`), which
 * the installed simulator plays back over a fake `EventSource`. Every other
 * method is unreachable from `TailPane` — it never lists, creates or drives
 * anything — so those are stubs only to satisfy the `ComputeClient` type.
 */
function clientForScript(scriptId: string): ComputeClient {
  return {
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fixtureComputers,
    createComputer: async () => fixtureComputers[0],
    adoptComputer: async () => {},
    renameComputer: async () => {},
    removeComputer: async () => {},
    stopSession: async () => {},
    runTask: async () => {},
    runCommand: async () => {},
    getShellUrl: async () => ({ url: 'mock-shell://unused' }),
    tail: (boxId) => ({ url: mockTailUrl(boxId, scriptId), withCredentials: false, headers: {} }),
  };
}

/** Uninstalls the EventSource patch on unmount. */
function WithMockTail({ children }: { children: ReactNode }) {
  useEffect(() => installMockTailSource(), []);
  return <>{children}</>;
}

/** The box each story watches. Its own fixture status is cosmetic here — the script decides what actually streams. */
const WATCHED_COMPUTER = fixtureComputers[1];

/**
 * `TailPane` standalone, outside `ComputerLab`. It is the half of the compute
 * surface that has nothing to type at — a read-only stream of whatever a bot
 * or another operator is doing on a box — and each story plays a different
 * scripted run so the three shapes a run can end in are all reviewable:
 * a clean result, a result that is actually a question, and a mid-run
 * failure. See `fixtures/mockTail.ts` for the frame-by-frame scripts.
 */
const meta = {
  title: 'Compute/TailPane',
  component: TailPane,
  parameters: { layout: 'padded' },
  args: {
    computer: WATCHED_COMPUTER,
  },
  decorators: [
    (Story) => (
      <WithMockTail>
        <div className="h-[420px] w-full max-w-xl overflow-hidden rounded border border-code-border">
          <Story />
        </div>
      </WithMockTail>
    ),
  ],
} satisfies Meta<typeof TailPane>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `nightly-dependency-audit`: reads the lockfile, runs `npm audit`, edits
 * `package.json`, and ends in a normal `result` frame — the shape most tails
 * will show most of the time. Watch the chip in the header flip from
 * `not connected` to `tailing` a beat after mount, matching a real SSE
 * handshake rather than snapping straight to connected.
 */
export const CleanRun: Story = {
  decorators: [
    (Story) => (
      <ComputeProvider
        client={clientForScript('nightly-dependency-audit')}
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
 * `flaky-test-triage`: the run's final `result` frame is phrased as a
 * question ("Want me to pin the clock in the fixtures?"). Nothing in the
 * transcript marks it specially — the pane has no way to know a result is a
 * question — but this is the run that puts a box in `waiting` rather than
 * `idle` in the fleet, so it matters that the transcript alone makes the
 * question legible without that status label attached.
 */
export const EndsOnAQuestion: Story = {
  decorators: [
    (Story) => (
      <ComputeProvider
        client={clientForScript('flaky-test-triage')}
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
 * `schema-drift-check`: the run is mid-sentence about what it found when the
 * connection drops with a `devbox_error` frame instead of a `result`. This is
 * the failure path — there is no tidy summary, just the last thing the bot
 * said and an error line — and it is worth reviewing on its own because a
 * tail that only ever demos the happy path never shows what an operator
 * actually sees when a box dies mid-run.
 */
export const FailsMidRun: Story = {
  decorators: [
    (Story) => (
      <ComputeProvider
        client={clientForScript('schema-drift-check')}
        computers={fixtureComputers}
        models={fixtureModels}
        pollIntervalMs={0}
      >
        <Story />
      </ComputeProvider>
    ),
  ],
};
