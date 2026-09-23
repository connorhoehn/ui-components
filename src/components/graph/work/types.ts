import type { ReactNode } from 'react';

/** Presentation-only work graph contracts. Hosts pass viewer-sanitized data. */
export type WorkGraphNodeKind =
  | 'project'
  | 'terminal'
  | 'agent'
  | 'run'
  | 'document'
  | 'change'
  | 'conversation'
  | 'meeting'
  | 'transcript'
  | 'task';

export type WorkGraphRelation =
  | 'works-on'
  | 'runs-in'
  | 'operates-on'
  | 'produced'
  | 'edited'
  | 'attended'
  | 'discussed'
  | 'derived-from';

export type WorkGraphStatus =
  | 'idle'
  | 'running'
  | 'waiting'
  | 'completed'
  | 'error'
  | 'stopped'
  | 'stale';

export type WorkGraphDisclosure = 'existence' | 'summary' | 'details';

export type WorkGraphCapability =
  | 'message'
  | 'view-document'
  | 'edit-document'
  | 'join-conversation'
  | 'join-meeting'
  | 'observe-terminal'
  | 'control-terminal'
  | 'view-transcript'
  | 'view-run'
  | 'dispatch-run';

export interface WorkGraphNodeData {
  id: string;
  kind: WorkGraphNodeKind;
  title: string;
  description?: string;
  status: WorkGraphStatus;
  disclosure: WorkGraphDisclosure;
  startedAt?: string;
  updatedAt: string;
  endedAt?: string;
  capabilities: WorkGraphCapability[];
  avatarUrl?: string;
  locked?: boolean;
}

export interface WorkGraphEdgeData {
  id: string;
  fromId: string;
  toId: string;
  relation: WorkGraphRelation;
  label?: string;
  status: WorkGraphStatus;
  disclosure: WorkGraphDisclosure;
  startedAt?: string;
  updatedAt: string;
  endedAt?: string;
  capabilities: WorkGraphCapability[];
}

export type WorkGraphSelection =
  | { kind: 'node'; id: string; revisionId?: string; anchorId?: string }
  | { kind: 'edge'; id: string }
  | null;

export interface WorkGraphViewport {
  x: number;
  y: number;
  zoom: number;
}

export interface WorkGraphSourceState {
  source: 'cloud-compute' | 'local-compute' | 'document' | 'pipeline' | 'conversation' | 'meeting';
  health: 'available' | 'delayed' | 'disconnected' | 'authorization-unavailable';
  checkedAt: string;
  message?: string;
}

/**
 * What the activity canvas paints UNDER the graph.
 *
 * `ripple-grid` is the default and the intended look: a pale grey lattice on
 * the near-white surface, rippling slowly outward from the centre and bending
 * toward the pointer. It REPLACES React Flow's dot background rather than
 * layering over it — two grids at once is noise, and the dots were only ever
 * standing in for a surface texture.
 *
 * `plain` is the escape hatch: no canvas, no WebGL context, React Flow's own
 * dots. For a host embedding several graphs on one page, or a test that would
 * rather not stub a GL context.
 */
export type WorkActivityCanvasBackground = 'ripple-grid' | 'plain';

export interface WorkGraphProps {
  nodes: WorkGraphNodeData[];
  edges: WorkGraphEdgeData[];
  selection: WorkGraphSelection;
  viewport: WorkGraphViewport;
  /** Calendar day shown by the host, in YYYY-MM-DD form. */
  day?: string;
  /** IANA timezone used to place activity within that day. */
  timezone?: string;
  sources?: WorkGraphSourceState[];
  state?: 'loading' | 'ready' | 'empty' | 'partial' | 'error';
  errorMessage?: string;
  className?: string;
  /** Authorized effort/revision presentation. Omit for the existing v1 view. */
  activity?: WorkActivityPresentation;
  /** Activity-canvas backdrop. Defaults to `'ripple-grid'`. */
  background?: WorkActivityCanvasBackground;
  /**
   * How many activity graphs the canvas may draw at once. Defaults to
   * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2); `WORK_ACTIVITY_ALL_EFFORTS` (0) or
   * a non-finite value means no cap. The newest efforts win, the effort holding
   * the current selection is never dropped, and the ones that are dropped are
   * still counted in the header and footer.
   */
  maxEfforts?: number;
  /**
   * Makes the cap the host's to own. Without it the panel keeps the value in
   * its own state and `maxEfforts` is only the starting point, so a host gets
   * the control working by passing nothing at all.
   */
  onMaxEffortsChange?: (maxEfforts: number) => void;
  onSelectionChange: (selection: WorkGraphSelection) => void;
  onViewportChange: (viewport: WorkGraphViewport) => void;
  onRetry?: () => void;
  onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onRequestCollaboration?: (
    selection: Exclude<WorkGraphSelection, null>,
    capability: WorkGraphCapability,
  ) => void;
}

/** Source-backed membership, already filtered for this viewer by the host. */
export interface WorkActivityEffort {
  id: string;
  title: string;
  /** A second clause under the frame title — "v3 generating · v2 available". */
  subtitle?: string;
  nodeIds: string[];
  edgeIds: string[];
  /** Older context that may be folded. Never a count of inaccessible sources. */
  contextNodeIds?: string[];
}

export interface WorkArtifactSlide {
  id: string;
  /** 1-based position the host prints as "Slide 4 of 12". */
  index: number;
  title: string;
  /** The host resolves protected preview content; the graph does not fetch URLs. */
  preview?: ReactNode;
}

export interface WorkArtifactRevision {
  id: string;
  label: string;
  createdAt: string;
  /** The host resolves protected preview content; the graph does not fetch URLs. */
  preview?: ReactNode;
  anchorId?: string;
  anchorLabel?: string;
  /** Navigable pages of this revision. Omit when the artifact has no pages. */
  slides?: WorkArtifactSlide[];
}

export type WorkActivityBannerTone = 'info' | 'success' | 'error';

/** The one-line state a detail pane opens with. Host-authored, viewer-safe. */
export interface WorkActivityBanner {
  tone: WorkActivityBannerTone;
  title: string;
  description?: string;
}

/** A row that points at another authorized item — a source, a work item. */
export interface WorkActivityReference {
  id: string;
  title: string;
  meta?: string;
  /** Canonical target. Omitted when the viewer may see the row but not open it. */
  selection?: Exclude<WorkGraphSelection, null>;
}

export interface WorkActivityTranscriptSegment {
  id: string;
  /** Already formatted in the host's timezone — the pane does no clock maths. */
  at: string;
  speaker: string;
  text: string;
  anchorId?: string;
}

export interface WorkActivityAskCitation {
  id: string;
  label: string;
  selection?: Exclude<WorkGraphSelection, null>;
}

export interface WorkActivityAskAnswer {
  text: string;
  citations?: WorkActivityAskCitation[];
  /** Provenance footnote. Say where the answer came from; never imply more. */
  note?: string;
}

/**
 * Asking a transcript a question. The graph renders the exchange and nothing
 * else: the host owns the model call, the grounding and the refusal.
 */
export interface WorkActivityAsk {
  enabled: boolean;
  placeholder?: string;
  /** Rendered when `enabled` is false. Never invent an answer in its place. */
  unavailableLabel?: string;
  /** Host-owned. Resolve with a grounded answer or reject to show the error. */
  onAsk: (question: string) => Promise<WorkActivityAskAnswer> | WorkActivityAskAnswer;
}

export interface WorkActivityPaneSections {
  /**
   * What the run was given — "Planning sync transcript", "Release plan · rev 6".
   * Pass references rather than bare strings when two inputs can share a label:
   * the id is what keeps them apart, and what lets the row open its source.
   */
  inputs?: Array<string | WorkActivityReference>;
  /** Tools the run is authorized to use in this attempt. */
  tools?: string[];
  sources?: WorkActivityReference[];
  workItem?: WorkActivityReference;
  /** A prose paragraph under the banner. */
  description?: string;
}

export interface WorkActivityPaneAction {
  id: string;
  label: string;
  /** Selecting this action moves the graph selection; the host owns navigation. */
  selection?: Exclude<WorkGraphSelection, null>;
  onSelect?: () => void;
}

/** Why a waiting run waits: an approval gate, or a breakpoint on `step`. */
export interface WorkActivityPause {
  reason: 'awaiting_approval' | 'paused_at_breakpoint';
  /** The step's display label ("write"), when the source named one. */
  step?: string;
}

export interface WorkActivityNodeDetail {
  emphasis?: 'earlier' | 'input' | 'current';
  /** Fresh process evidence, independent from presence and lifecycle. */
  fresh?: boolean;
  tools?: string[];
  attentionLabel?: string;
  feedbackCount?: number;
  /**
   * Secondary lines under the node title — "Planning sync · 08:30–09:00",
   * "2 speakers · 1 action item". Host-authored and already viewer-safe; when
   * omitted the card falls back to the node's own status wording.
   */
  lines?: string[];
  /** Short state word beside the first secondary line — "Ready", "Tests running". */
  badge?: string;
  /**
   * Why a `waiting` run is waiting — realtime-modules `detail.pause` passed
   * through. The card says "Needs approval" / "Paused at write" instead of a
   * bare "Waiting" (see `workPauseLabel`); ignored unless the node is waiting.
   */
  pause?: WorkActivityPause;
  /** A short verbatim quotation from the source, already viewer-authorized. */
  excerpt?: string;
  /** Who was there. Shown as an avatar row; the host resolves the images. */
  participants?: Array<{ id: string; label: string; avatarUrl?: string }>;
  /** Trailing line: what this is on the left, its sharing clause on the right. */
  footer?: { label: string; note?: string };
  /** Detail-pane subtitle — "Meeting transcript · Shared with you". */
  subtitle?: string;
  /** The state line every detail pane opens with. */
  banner?: WorkActivityBanner;
  sections?: WorkActivityPaneSections;
  /** Transcript rows and the host-owned Ask exchange. */
  transcript?: { segments: WorkActivityTranscriptSegment[]; ask?: WorkActivityAsk };
  /**
   * A closing caveat — what this pane does NOT show, and why. Use it to be
   * honest about a capability the viewer does not hold.
   */
  note?: string;
  /** Buttons under the body — "Inspect available v2", "Inspect run". */
  actions?: WorkActivityPaneAction[];
  /**
   * The compute session this node IS — an agent loop in a cloud box.
   *
   * Present, the pane's body becomes the session: gauges, live tail, shell and
   * plan, in place of the per-kind bodies above. The chrome, the banner and the
   * "Reference in chat" footer are unchanged, and every other field on this
   * detail still renders around it, so a run node that also has sources keeps
   * them.
   */
  compute?: WorkComputeDetail;
  artifact?: {
    revisions: WorkArtifactRevision[];
    pending?: { id: string; label: string; status: 'generating' | 'failed'; message?: string };
    /** Opens the revision (optionally at one page) at full size. Host-owned. */
    onOpenPreview?: (revisionId: string, anchorId?: string) => void;
  };
}

/**
 * Where a compute session is.
 *
 * Deliberately a structural TWIN of `LabStatus` in `social/ChatLabShell`
 * rather than an import of it: the same host value must satisfy both, but the
 * graph entry taking a type dependency on the chat entry would drag the chat
 * module graph into `dist/graph.d.ts` for a union of eight strings. Identical
 * unions are mutually assignable, so a host passes one value to both with no
 * cast; keep the two lists in step.
 */
export type WorkComputeStatus =
  | 'planning'
  | 'starting'
  | 'running'
  | 'waiting'
  | 'done'
  | 'failed'
  | 'stopped'
  | 'budget';

/** One planned step of the loop. Twin of `LabStep`, plus a duration. */
export interface WorkComputeStep {
  id: string;
  title: string;
  kind: string;
  status: 'pending' | 'running' | 'done' | 'failed' | 'skipped';
  iterations?: number;
  contextTokens?: number;
  /** Wall clock this step has taken, or took. Rendered as "2m 14s". */
  elapsedMs?: number;
}

/** One frame off the session tail. Twin of `LabEvent`. */
export interface WorkComputeEvent {
  id: string;
  at: string;
  kind: 'command' | 'text' | 'tool' | 'result' | 'error' | 'status' | 'iteration';
  text: string;
  /** Long form — a tool's arguments and output. Collapsed behind a disclosure. */
  detail?: string;
  /** True when the runtime that produced this frame was a mock. Always shown. */
  mock?: boolean;
}

/** A file the session produced, already authorized for this viewer. */
export interface WorkComputeArtifact {
  id: string;
  name: string;
  sizeBytes?: number;
  /** Already formatted by the host — the pane does no clock maths. */
  updatedAt?: string;
  /** Host-owned download through its own authorized route. */
  onDownload?: () => void;
}

/**
 * One line of the terminal digest.
 *
 * The glyph is a KIND, not a character, so the pane owns the alphabet: a host
 * that sent `▶` directly would be drawing the terminal rather than describing
 * what is in it, and could not be restyled.
 */
export interface WorkComputeTerminalLine {
  glyph: 'prompt' | 'step' | 'done' | 'pending' | 'text';
  text: string;
}

/**
 * The compute session behind a work-graph node — an agent loop in a cloud box.
 *
 * Every field is host-resolved from `GET /api/agent-loops/:runId`. Nothing here
 * is fetched, polled or inferred by the pane: it renders the gauges, the tail
 * and the plan it is given, and says so honestly when a field is absent.
 */
export interface WorkComputeDetail {
  /** The box's operator-facing name — `auth-migration-3`. */
  label: string;
  runtime: 'agentcore-microvm' | 'local';
  /** The initiative this box is charged to. Shown in the breadcrumb. */
  project?: string;
  status: WorkComputeStatus;
  owner: { id: string; name: string; avatarUrl?: string };
  /** True when the viewer is not the owner — "Shared with you" vs "Yours". */
  shared: boolean;
  task: {
    title: string;
    description?: string;
    /** Already formatted in the host's timezone — "09:15". */
    startedAt?: string;
    elapsedMs?: number;
    /** What the work runs as — `devbox:task`. */
    environment: string;
  };
  metrics: {
    model: string;
    costUsd?: number;
    contextTokens: number;
    contextBudgetTokens?: number;
  };
  /** The last few tail lines, for the pre-shell digest. */
  terminalPreview: { lines: WorkComputeTerminalLine[]; running: boolean };
  /** The plan, as the planner produced it. */
  progress: WorkComputeStep[];
  artifacts: WorkComputeArtifact[];
  workItem?: { key: string; status: string; title: string; tags: string[]; onOpen?: () => void };
  events: WorkComputeEvent[];
  /**
   * The box behind the loop. Present = a Shell tab exists. `shellUrl` is minted
   * on demand by the host, so its absence is a button, not an error.
   */
  shell?: { sessionId: string; shellUrl?: string };
  /** Milliseconds until the reaper stops this box, when the host knows. */
  stopsInMs?: number;
  /** Denominator for the expiry meter. Defaults to the compute surface's hour. */
  idleWindowMs?: number;
  /** Honest state — "Mock runtime", "Planner unavailable · single step". */
  notice?: string;
  /** Primary action. Mints the shell URL; the pane switches to the Shell tab. */
  onOpenShell?: () => void;
  /** Pops the live tail out of the pane. */
  onOpenInNew?: () => void;
  /** Hands the whole session to the Computer Lab surface. */
  onOpenLab?: () => void;
  /** Rows of the `…` overflow menu beside the primary action. */
  moreActions?: WorkActivityPaneAction[];
}

export interface WorkActivityWindow {
  start: number;
  end: number;
  following: boolean;
}

export interface WorkActivityView {
  focusedEffortId: string | null;
  expandedSourceEfforts: string[];
  overviewViewport?: WorkGraphViewport;
  canvasInitialized?: boolean;
}

export interface WorkActivityPresentation {
  efforts: WorkActivityEffort[];
  details?: Record<string, WorkActivityNodeDetail>;
  /** Only fresh, running operations in a live query; never inferred from a neighbor. */
  activeEdgeIds: string[];
  /** Operations whose latest attempt failed. Drawn in the danger tone with a label. */
  failedEdgeIds?: string[];
  /** Pill wording per canonical edge id — "generating", "failed". Overrides `label`. */
  edgeLabels?: Record<string, string>;
  /** Canonical edges retain identity even when their visual input arrow reverses. */
  reversedEdgeIds?: string[];
  mode: 'split' | 'full';
  window: WorkActivityWindow;
  bounds: { start: number; end: number };
  /** v1 latest-state data must be described as recent work, not historical replay. */
  temporalMode: 'recent' | 'as-of';
  events?: Array<{ at: number; count: number }>;
  /**
   * The wall clock, in UTC epoch milliseconds. The ruler stops here rather
   * than at the day's end, so "Now" lands where now actually is. Omit and the
   * strip follows the live window, or the browser clock when it is not.
   */
  now?: number;
  view: WorkActivityView;
  /**
   * Where the selected node's detail pane goes.
   * `column` (the default) makes it a sibling column of the canvas — the host's
   * fourth pane, laid out by this component so the activity header spans both.
   * `overlay` lays it over the canvas, which is right only when the pane is too
   * narrow to split. `auto` picks between them from the measured width.
   * `none` renders no pane here: the host places `WorkNodePane` in its own grid.
   */
  detailsPlacement?: 'auto' | 'column' | 'overlay' | 'none';
  /** Panel title. When supplied the renderer draws its own header row. */
  title?: string;
  /** A second clause under the title — "Working now · Sharing with you". */
  subtitle?: string;
  /** Whether the panel currently occupies the conversation area. */
  expanded?: boolean;
  /** Offers the expand/restore control. The host owns the layout change. */
  onExpand?: () => void;
  /** Offers the pop-out control. The host owns the standalone route. */
  onPopOut?: () => void;
  /** Offers the close control. The host owns dismissal. */
  onClose?: () => void;
  /**
   * "← Earlier work". The host shifts the window earlier; without it the
   * renderer steps the current window back by its own duration.
   */
  onEarlier?: () => void;
  onWindowChange: (window: WorkActivityWindow) => void;
  onViewChange: (view: WorkActivityView) => void;
  onFeedback?: (selection: Exclude<WorkGraphSelection, null>) => void;
}

export interface WorkActivityHeaderProps {
  title: string;
  /** A second clause under the title — "Working now · Sharing with you". */
  subtitle?: string;
  /** Whether the panel currently occupies the conversation area. */
  expanded?: boolean;
  onExpand?: () => void;
  onPopOut?: () => void;
  onClose?: () => void;
  /** Extra controls between the title and the close button. */
  actions?: ReactNode;
  /**
   * Which body the panel is showing: the activity graph, or the person's
   * Computer Lab. The switch itself only appears when `onViewChange` is wired
   * — a host with one body renders exactly the header it rendered before.
   */
  view?: WorkActivityPanelView;
  onViewChange?: (view: WorkActivityPanelView) => void;
  /**
   * The quiet clause beside the switch — "Shared work · newest first",
   * "2 working · 4 dispatched from this chat". Host-authored, because only the
   * host knows what the body it is about to render actually contains.
   */
  viewNote?: ReactNode;
  /**
   * Total parallel efforts the panel has, INCLUDING the ones the cap is
   * hiding. It is the denominator of "Show 2 of 9 activities", so it must be
   * the real count or the sentence lies about what is being withheld.
   */
  effortCount?: number;
  /**
   * How many of them the canvas is drawing. `WORK_ACTIVITY_ALL_EFFORTS` (0),
   * or any value at or above `effortCount`, reads as "All N activities".
   */
  maxEfforts?: number;
  /**
   * The opt-in for the "Show N activities" control, exactly as `onViewChange`
   * is the opt-in for the body switch: without it the header renders no such
   * control, because a picker nothing listens to is a lie. Fires with the
   * chosen number, or `WORK_ACTIVITY_ALL_EFFORTS` (0) for "All".
   */
  onMaxEffortsChange?: (maxEfforts: number) => void;
  className?: string;
  'data-testid'?: string;
}

/** The two bodies an activity panel can hold. */
export type WorkActivityPanelView = 'activity' | 'lab';

export interface WorkStatusProps {
  status: WorkGraphStatus;
  sharingFresh?: boolean;
  label?: string;
  className?: string;
}

export interface WorkNodeProps {
  node: WorkGraphNodeData;
  selected?: boolean;
  /** Sharing heartbeat freshness; independent from the node's work status. */
  sharingFresh?: boolean;
  onSelect?: (id: string) => void;
  onOpen?: (id: string) => void;
}

export interface WorkEdgeProps {
  edge: WorkGraphEdgeData;
  selected?: boolean;
  reducedMotion?: boolean;
  fromLabel: string;
  toLabel: string;
  onSelect?: (id: string) => void;
}

export interface WorkInspectorProps {
  nodes: WorkGraphNodeData[];
  edges: WorkGraphEdgeData[];
  selection: WorkGraphSelection;
  onSelectionChange: (selection: WorkGraphSelection) => void;
  onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onRequestCollaboration?: (
    selection: Exclude<WorkGraphSelection, null>,
    capability: WorkGraphCapability,
  ) => void;
}

export type WorkSharingAudience =
  | { kind: 'people'; personIds: string[] }
  | { kind: 'conversation'; conversationIds: string[] }
  | { kind: 'organization' };

export interface WorkSharingFormValue {
  audience: WorkSharingAudience;
  selectedNodeIds: string[];
  selectedEdgeIds: string[];
  disclosure: WorkGraphDisclosure;
  expiresAt: string;
  history?: { dayFrom: string; dayThrough: string; expiresAt: string };
}

export interface WorkSharingControlsProps {
  state: 'off' | 'active' | 'paused' | 'stopped' | 'expired';
  value: WorkSharingFormValue;
  availableNodes: WorkGraphNodeData[];
  availableEdges: WorkGraphEdgeData[];
  saving?: boolean;
  error?: string;
  conflict?: boolean;
  onChange: (value: WorkSharingFormValue) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export interface WorkReferenceCardProps {
  target: WorkGraphSelection;
  state: 'loading' | 'available' | 'unavailable';
  node?: WorkGraphNodeData;
  edge?: WorkGraphEdgeData;
  unavailableLabel?: string;
  onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
  onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
}

/** One activity's items in the accessible list, in the canvas's order. */
export interface WorkEntityListGroup {
  id: string;
  title: string;
  subtitle?: string;
  nodeIds: string[];
}

export interface WorkEntityListProps extends WorkInspectorProps {
  heading?: ReactNode;
  /**
   * When given, the list shows only these groups' items, under their titles,
   * in this order — the activities the canvas is showing. Omitted: every node.
   */
  groups?: WorkEntityListGroup[];
  /** Rendered under the items, e.g. "Show all N activities". */
  footer?: ReactNode;
  /**
   * A status word for a node in place of its raw status — "Paused at write"
   * for a waiting run (NFR #126, `workPauseLabel`). Undefined keeps the status.
   */
  statusLabelOf?: (node: WorkGraphNodeData) => string | undefined;
}

/** Frozen import names for the component implementation wave. */
export type WorkGraphComponentName =
  | 'WorkGraph'
  | 'WorkNode'
  | 'WorkEdge'
  | 'WorkStatus'
  | 'WorkInspector'
  | 'WorkEntityList'
  | 'WorkSharingControls'
  | 'WorkReferenceCard';
