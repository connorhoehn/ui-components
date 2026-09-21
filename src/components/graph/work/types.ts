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
  /** What the run was given — "Planning sync transcript", "Release plan · rev 6". */
  inputs?: string[];
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
  /** A short verbatim quotation from the source, already viewer-authorized. */
  excerpt?: string;
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
  artifact?: {
    revisions: WorkArtifactRevision[];
    pending?: { id: string; label: string; status: 'generating' | 'failed'; message?: string };
    /** Opens the revision (optionally at one page) at full size. Host-owned. */
    onOpenPreview?: (revisionId: string, anchorId?: string) => void;
  };
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
  className?: string;
  'data-testid'?: string;
}

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

export interface WorkEntityListProps extends WorkInspectorProps {
  heading?: ReactNode;
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
