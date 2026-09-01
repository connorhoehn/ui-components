import { useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputeProvider } from './context/ComputeContext';
import { ComputeDock } from './components/ComputeDock';
import { fixtureComputers, fixtureModels, fixtureRuntimeStatus } from './fixtures/computeFixture';
import { installMockShellSocket, mockShellUrl } from './fixtures/mockShell';
import {
  closeShell, getDock, openShell, setMode, type DockMode,
} from './lib/dockStore';
import type { ComputeClient } from './lib/computeClient';
import type { Computer } from './types';

/**
 * The dock's terminals are real `ShellTerminal`s, and `ShellTerminal` reads
 * its client from `useCompute()` — there is no prop for it. So this story
 * needs a `ComputeProvider` above the dock even though the dock itself takes
 * no client prop, purely so its panes can resolve one. `getShellUrl` is the
 * only method that has to do real work here; it hands back a `mock-shell:`
 * URL that the installed simulator answers with a typeable PTY. `tail` is
 * required by the `ComputeClient` type but never called by anything the dock
 * renders, so it is a type-satisfying stub rather than a wired simulator.
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
  tail: () => ({ url: 'mock-tail://unused', withCredentials: false, headers: {} }),
};

/** Uninstalls on unmount so switching stories does not leave a mock global behind. */
function WithMockShell({ children }: { children: ReactNode }) {
  useEffect(() => installMockShellSocket(), []);
  return <>{children}</>;
}

/**
 * Seeds the dock store with one shell per box, then tears every one of them
 * back down on unmount.
 *
 * The store is a module singleton — `lib/dockStore.ts` says so outright, for
 * the same reason there is only one `document.body` — so it persists across
 * story switches inside one Storybook session. A story that opens shells and
 * never closes them leaves the NEXT story's dock pre-populated with stale
 * tabs pointed at boxes that story never asked for. This component is the
 * seed-and-clean-up half of that contract: it clears whatever the previous
 * story left (belt and braces against an interrupted unmount, e.g. Storybook
 * HMR), opens exactly the boxes this story wants, sets the layout, and closes
 * only the shells it opened when the story unmounts.
 */
function SeedDock({ mode, boxes, children }: { mode: DockMode; boxes: readonly Computer[]; children: ReactNode }) {
  useEffect(() => {
    for (const stale of getDock().shells) closeShell(stale.id);

    const opened: string[] = [];
    for (const box of boxes) {
      const outcome = openShell(box);
      if (outcome.ok) opened.push(outcome.id);
    }
    setMode(mode);

    return () => {
      for (const id of opened) closeShell(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, boxes]);

  return <>{children}</>;
}

/** Two boxes in different states, so the tab strip's status dots differ. */
const TWO_BOXES = [fixtureComputers[0], fixtureComputers[1]] as const;
/** A third box added for the tiled layouts, where more panes reads better. */
const THREE_BOXES = [fixtureComputers[0], fixtureComputers[1], fixtureComputers[2]] as const;

/** Stands in for whatever the host application renders behind the dock. */
function AppBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-code-bg text-code-subtle">
      <div className="max-w-2xl p-6 font-mono">
        <h1 className="mb-2 text-sm text-code-text">host application</h1>
        <p className="text-[12px] leading-relaxed">
          This block of text stands in for whatever the rest of the app
          renders — a page, a router outlet, anything at all. `ComputeDock`
          mounts once, above that router, and stays mounted while pages come
          and go beneath it. That placement is the whole point: a shell opened
          here keeps its socket and its scrollback no matter what this
          stand-in page does, because navigating never unmounts the dock.
        </p>
      </div>
      {children}
    </div>
  );
}

/**
 * Every story shares one fleet and one mock shell transport. What differs
 * story to story is which boxes are seeded into the dock and which layout
 * mode it starts in — see the per-story decorator.
 */
const meta = {
  title: 'Compute/ComputeDock',
  component: ComputeDock,
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
          <AppBackdrop>
            <Story />
          </AppBackdrop>
        </ComputeProvider>
      </WithMockShell>
    ),
  ],
} satisfies Meta<typeof ComputeDock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default layout: one strip pinned to the bottom, tabbed, one shell
 * visible at a time. This is "working in one shell" — click a tab, or press
 * `⌥1`/`⌥2` to jump, and type `help` in either; both are simulated PTYs, not
 * static output. Hidden tabs stay mounted (their sockets survive) and are
 * merely styled invisible, which is why switching tabs never shows a
 * reconnect.
 */
export const Docked: Story = {
  decorators: [
    (Story) => (
      <SeedDock mode="docked" boxes={TWO_BOXES}>
        <Story />
      </SeedDock>
    ),
  ],
};

/**
 * Every seeded shell tiled at once, tmux-style — the layout for watching
 * several boxes rather than driving one. Three panes here so the two-column
 * grid actually wraps; each tile carries its own label and close button
 * because with several on screen the tab strip's single active label is no
 * longer enough to say which is which.
 */
export const Grid: Story = {
  decorators: [
    (Story) => (
      <SeedDock mode="grid" boxes={THREE_BOXES}>
        <Story />
      </SeedDock>
    ),
  ],
};

/**
 * The same tiling as Grid, but as a narrow column down the right edge instead
 * of filling the bottom strip — the layout for keeping shells to hand while
 * the page beside them is still usable. Compare against Docked: same two
 * boxes, same shells, only the chrome around them changes.
 */
export const Stack: Story = {
  decorators: [
    (Story) => (
      <SeedDock mode="stack" boxes={TWO_BOXES}>
        <Story />
      </SeedDock>
    ),
  ],
};

/**
 * A draggable window parked over the page rather than docked to an edge.
 * `ComputeDock` hands this layout to `FloatingPanel` for the drag, snap and
 * anchor-persistence behaviour rather than re-solving that itself — this
 * story is what reviews that hand-off actually renders a usable terminal
 * window, not just that the panel opens.
 */
export const Floating: Story = {
  decorators: [
    (Story) => (
      <SeedDock mode="floating" boxes={TWO_BOXES}>
        <Story />
      </SeedDock>
    ),
  ],
};
