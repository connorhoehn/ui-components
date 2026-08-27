// Compute — microVM developer boxes, and a multiplexer for a fleet of them.
//
// A "computer" is one agent-runtime session: its own microVM with a
// persistent workspace. This module renders a fleet of them, drives them
// through a swappable `ComputeClient`, and provides `ComputerLab` — a tmux-shaped
// surface for working across many at once.

// Provider
export { ComputeProvider, useCompute, useComputeOptional } from './context/ComputeContext';
export type { ComputeContextValue, ComputeProviderProps, ComputeNotice } from './context/ComputeContext';

// Client
export { createComputeClient } from './lib/computeClient';
export type { ComputeClient, ComputeClientOptions, StreamEvent } from './lib/computeClient';

// Computer Lab
export { ComputerLab } from './components/ComputerLab';
export type { ComputerLabProps } from './components/ComputerLab';
export { LabRail } from './components/LabRail';
export type { LabRailProps } from './components/LabRail';
export { LabChooser, fuzzyScore } from './components/LabChooser';
export type { LabChooserProps, ChooserRow } from './components/LabChooser';
export { PaneTreeView } from './components/PaneTreeView';
export type { PaneTreeViewProps } from './components/PaneTreeView';
export { PaneStatusLine, shortModelName, DEFAULT_IDLE_WINDOW_MS } from './components/PaneStatusLine';
export type { PaneStatusLineProps } from './components/PaneStatusLine';

// Panes
export { ShellTerminal } from './components/ShellTerminal';
export type { ShellTerminalProps, ShellTerminalHandle } from './components/ShellTerminal';
export { AgentPane } from './components/AgentPane';
export type { AgentPaneProps, AgentPaneHandle } from './components/AgentPane';

// Hooks
export { useComputeFleet } from './hooks/useComputeFleet';
export type { UseComputeFleetOptions, UseComputeFleetResult } from './hooks/useComputeFleet';
export { useComputeTask, summarizeTool } from './hooks/useComputeTask';
export type { UseComputeTaskOptions, UseComputeTaskResult, TaskStep, TaskStepKind } from './hooks/useComputeTask';
export { useLabLayout } from './hooks/useLabLayout';
export type { UseLabLayoutResult, LabWindow } from './hooks/useLabLayout';

// Pane tree
export {
  makeLeaf, listLeaves, findLeaf, countPanes, splitPane, closePane, setRatio,
  updateLeaf, layoutRects, neighborPane, cyclePane, enclosingSplit, ratioOf,
  MIN_RATIO, MAX_RATIO,
} from './lib/paneTree';
export type { PaneNode, PaneLeaf, PaneSplit, PaneRect, SplitDirection, Direction } from './lib/paneTree';

// Keyboard — plain Mac chords, fully overridable
export {
  DEFAULT_KEYMAP, TMUX_LEADER, matchBinding, matchLeaderBinding, isLeaderKey,
  groupBindings, labelFor,
} from './lib/keymap';
export type { KeyBinding, LabCommand, LeaderConfig } from './lib/keymap';

// Pane kinds — the open registry that decides what a pane can be. Register
// alongside the built-ins to add a kind of your own.
export { resolveKind, nextKind, quotaUsage } from './lib/paneKinds';
export type { PaneKind, PaneKindContext, PaneKindRegistry, PaneInput, PaneQuota } from './lib/paneKinds';
export { DEFAULT_PANE_KINDS, AGENT_PANE_KIND, SHELL_PANE_KIND } from './components/defaultPaneKinds';

// Dock store
export {
  subscribeDock, getDock, reconcileDock, openShell, closeShell, focusShell,
  reportShellStatus, cycleShell, selectShellByIndex, setMode, setDockVisible,
  toggleFloating, cycleLayout, showsAllPanes, setGeometry, MAX_SHELLS,
} from './lib/dockStore';
export type { DockMode, DockShell, DockGeometry, DockState, OpenShellOutcome } from './lib/dockStore';

// Shell protocol
export {
  SHELL_CHANNEL, MAX_FRAME_BYTES, DETACH_BYTE, HEARTBEAT_MS, MAX_RETRIES,
  encodeFrame, encodeResize, closeAdvice, exhaustedAdvice, exitCodeOf,
} from './lib/shellProtocol';
export type { ShellStatusFrame } from './lib/shellProtocol';

// Workspace
export {
  buildWorkspaceTree, countDescendants, visibleRows,
  WORKSPACE_FIND_COMMAND, WORKSPACE_GIT_COMMAND, WORKSPACE_ENTRY_CAP,
} from './lib/workspaceTree';

// Storage — enumerate these to clear state on a tenant switch
export {
  COMPUTE_STORAGE_KEYS, DOCK_STORAGE_KEY, FLEET_STORAGE_KEY,
  LAB_LAYOUT_STORAGE_KEY, clearComputeStorage,
} from './lib/storage';

// Status vocabulary
export { COMPUTE_STATUS, SHELL_STATUS, statusOf, expiryPressure } from './lib/status';
export type { StatusMeta } from './lib/status';

// Fixtures
export {
  fixtureComputers, fixtureRuntimeStatus, fixtureModels, fixtureWorkspace,
} from './fixtures/computeFixture';

// Types
export type {
  Computer, ComputeStatus, ComputeRunResult, ComputeRuntimeStatus, ComputeModel,
  ComputeSource, ShellStatus, WorkspaceNode, WorkspaceSnapshot,
} from './types';
