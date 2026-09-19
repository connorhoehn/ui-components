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
  | { kind: 'node'; id: string }
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
  sources?: WorkGraphSourceState[];
  state?: 'loading' | 'ready' | 'empty' | 'partial' | 'error';
  errorMessage?: string;
  className?: string;
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
