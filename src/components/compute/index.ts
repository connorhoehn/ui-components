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
export type { ComputeClient, ComputeClientOptions, CreateComputerInput, StreamEvent } from './lib/computeClient';

// Computer Lab
export { ComputerLab } from './components/ComputerLab';
export type {
  ComputerLabProps, LabInstruction, LabInstructionOutcome, LabInstructionScope,
} from './components/ComputerLab';
export { LabFleetRail, groupQuickLine } from './components/LabFleetRail';
export type { LabFleetRailProps, LabFleetTab } from './components/LabFleetRail';
export { LabHeader, LabPaneToolbar, WorkspacePane } from './components/LabWorkspaceChrome';
export type { LabHeaderProps, LabPaneToolbarProps, WorkspacePaneProps } from './components/LabWorkspaceChrome';
export {
  LogsPane, AgentPane, byteRate, formatRate, stepLevel, stepSource, currentRun, clockTime, elapsed,
  latestPlan, pendingQuestion,
} from './components/WorkspacePanes';
export {
  LabInstructContext, useLabInstruct, runInstructionAsTasks,
} from './context/LabInstructContext';
export type { LabInstructRoute } from './context/LabInstructContext';
export type { LogsPaneProps, AgentPaneProps } from './components/WorkspacePanes';
export {
  summarizeFleet, hasAgent, matchesQuery, byAttention, isLocalComputer, AGENT_STATUSES, ATTENTION_ORDER,
} from './lib/fleetSummary';
export type { FleetSummary } from './lib/fleetSummary';
export { LabRail } from './components/LabRail';
export type { LabRailProps } from './components/LabRail';
export { LabChooser, fuzzyScore } from './components/LabChooser';
export type { LabChooserProps, ChooserRow } from './components/LabChooser';
export { PaneTreeView } from './components/PaneTreeView';
export type { PaneTreeViewProps } from './components/PaneTreeView';
export { PaneStatusLine, shortModelName, DEFAULT_IDLE_WINDOW_MS } from './components/PaneStatusLine';
export { ProjectSummary } from './components/ProjectSummary';
export type { ProjectSummaryProps } from './components/ProjectSummary';
export type { PaneStatusLineProps } from './components/PaneStatusLine';

// Machine presence — the user's own machine as a fleet participant
export {
  MachinePresenceMenu, memorySummary, providerSummary,
} from './components/MachinePresenceMenu';
export type { MachinePresenceMenuProps } from './components/MachinePresenceMenu';

// Panes
export { ComputeDock } from './components/ComputeDock';
export type { ComputeDockProps } from './components/ComputeDock';
export { ShellTerminal } from './components/ShellTerminal';
export type { ShellTerminalProps, ShellTerminalHandle } from './components/ShellTerminal';
export { TailPane } from './components/TailPane';
export type { TailPaneProps } from './components/TailPane';

// Hooks
export { useComputeFleet } from './hooks/useComputeFleet';
export type { UseComputeFleetOptions, UseComputeFleetResult } from './hooks/useComputeFleet';
export {
  useComputeTask, summarizeTool, parsePlan, toolStep, gateStep, deliveryStep,
} from './hooks/useComputeTask';
export { useComputeTail, reduceTailFrame } from './hooks/useComputeTail';
export {
  useComputeProjects, useProjectRollups, rollUpProjects, formatTokens,
  UNASSIGNED_PROJECT_ID,
} from './hooks/useComputeProjects';
export type {
  UseComputeProjectsOptions, UseComputeProjectsResult, ProjectRollup,
} from './hooks/useComputeProjects';
export type { UseComputeTailOptions, UseComputeTailResult } from './hooks/useComputeTail';
export type {
  UseComputeTaskOptions, UseComputeTaskResult, TaskStep, TaskStepKind, PlanItem, GateRefusal, RunDelivery,
} from './hooks/useComputeTask';
export { useLabLayout } from './hooks/useLabLayout';
export type { UseLabLayoutResult, LabWindow } from './hooks/useLabLayout';

// Pane tree
export {
  makeLeaf, listLeaves, findLeaf, countPanes, splitPane, closePane, setRatio,
  updateLeaf, layoutRects, neighborPane, cyclePane, enclosingSplit, ratioOf, arrangePanes,
  MIN_RATIO, MAX_RATIO,
} from './lib/paneTree';
export type { PaneNode, PaneLeaf, PaneSplit, PaneRect, SplitDirection, Direction, PaneArrangement } from './lib/paneTree';

// Keyboard — plain Mac chords, fully overridable
export {
  DEFAULT_KEYMAP, TMUX_LEADER, matchBinding, matchLeaderBinding, isLeaderKey,
  groupBindings, labelFor,
} from './lib/keymap';
export type { KeyBinding, LabCommand, LeaderConfig } from './lib/keymap';

// Pane kinds — the open registry that decides what a pane can be. Register
// alongside the built-ins to add a kind of your own.
export { resolveKind, nextKind, quotaUsage, kindsFor, defaultKindFor } from './lib/paneKinds';
export type { PaneKind, PaneKindContext, PaneKindRegistry, PaneHandle, PaneInput, PaneQuota } from './lib/paneKinds';
export {
  DEFAULT_PANE_KINDS, SHELL_PANE_KIND, TAIL_PANE_KIND, LOGS_PANE_KIND, AGENT_PANE_KIND,
} from './components/defaultPaneKinds';

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
  fixtureMachines,
} from './fixtures/computeFixture';
export { installMockShellSocket, mockShellUrl, MOCK_SHELL_SCHEME } from './fixtures/mockShell';
export {
  installMockTailSource, mockTailUrl, MOCK_TAIL_SCHEME, MOCK_TAIL_SCRIPTS, MOCK_TAIL_DEMO_SCRIPTS,
} from './fixtures/mockTail';
export type { MockTailOptions, MockTailScript } from './fixtures/mockTail';
export type { MockShellOptions } from './fixtures/mockShell';

// Types
export type {
  Computer, ComputerKind, ComputeStatus, ComputeRunResult, ComputeRuntimeStatus, ComputeModel, ComputeProject,
  ComputeSource, ShellStatus, WorkspaceNode, WorkspaceSnapshot,
  MachineNode, MachineSession, MachineMemoryState, MachineMemoryMode, MachinePresenceStatus,
} from './types';
