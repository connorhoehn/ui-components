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
  nodeIds: string[];
  edgeIds: string[];
  /** Older context that may be folded. Never a count of inaccessible sources. */
  contextNodeIds?: string[];
}

export interface WorkArtifactRevision {
  id: string;
  label: string;
  createdAt: string;
  /** The host resolves protected preview content; the graph does not fetch URLs. */
  preview?: ReactNode;
  anchorId?: string;
  anchorLabel?: string;
}

export interface WorkActivityNodeDetail {
  emphasis?: 'earlier' | 'input' | 'current';
  /** Fresh process evidence, independent from presence and lifecycle. */
  fresh?: boolean;
  tools?: string[];
  attentionLabel?: string;
  feedbackCount?: number;
  artifact?: {
    revisions: WorkArtifactRevision[];
    pending?: { id: string; label: string; status: 'generating' | 'failed'; message?: string };
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
  /** Canonical edges retain identity even when their visual input arrow reverses. */
  reversedEdgeIds?: string[];
  mode: 'split' | 'full';
  window: WorkActivityWindow;
  bounds: { start: number; end: number };
  /** v1 latest-state data must be described as recent work, not historical replay. */
  temporalMode: 'recent' | 'as-of';
  events?: Array<{ at: number; count: number }>;
  view: WorkActivityView;
  onWindowChange: (window: WorkActivityWindow) => void;
  onViewChange: (view: WorkActivityView) => void;
  onFeedback?: (selection: Exclude<WorkGraphSelection, null>) => void;
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
