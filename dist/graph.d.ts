import { JSX } from 'react';
import { ReactNode } from 'react';

declare interface ChatSidePanelApi {
    close: () => void;
    /** Present when the host gave the panel a full-page destination. */
    openFullPage?: () => void;
    /** Replaces the frame's title once the body knows the real one (the live document title). */
    setTitle: (title: string | null) => void;
}

/**
 * Something open BESIDE the conversation — a document, a search-result graph,
 * a run's trace. `kind` selects a renderer (see ChatSidePanelRegistry); `id`
 * is what that renderer opens. The library reserves `kind: 'document'` for the
 * `?doc=` URL form; every other kind is the host's.
 */
declare interface ChatSidePanelRef {
    kind: string;
    id: string;
    /** A first guess at the header; a renderer may replace it once it knows more. */
    title?: string;
    /** Extra state the renderer needs — a query, a tab. Round-trips through the URL. */
    params?: Record<string, string>;
}

declare type ChatSidePanelRenderer = (panel: ChatSidePanelRef, api: ChatSidePanelApi) => ReactNode;

/** One line for an embedder: `renderers={{ graph: createGraphPanelRenderer({ load }) }}`. */
export declare function createGraphPanelRenderer(options: CreateGraphPanelRendererOptions): ChatSidePanelRenderer;

export declare interface CreateGraphPanelRendererOptions {
    /** Fetches what the panel shows. Called once per panel (kind + id); a throw becomes the error state. */
    load: (panel: ChatSidePanelRef) => Promise<GraphPanelData>;
    onOpenPerson?: (id: string, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    onMessagePerson?: (id: string, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    /** Node picked in a raw nodes/edges graph. */
    onSelectNode?: (node: GraphNode, ctx: {
        panel: ChatSidePanelRef;
        api: ChatSidePanelApi;
    }) => void;
    /** Pixel height of the graph area. */
    graphHeight?: number;
    'data-testid'?: string;
}

/**
 * The node the radial layout puts in the middle: the one whose `group` is
 * `'center'`, else the node with the strictly highest weight, else none.
 * "Strictly" matters: a graph with no weights has no centre rather than an
 * arbitrary one.
 */
export declare function graphCenterNode(nodes: GraphNode[]): GraphNode | null;

export declare interface GraphEdge {
    from: string;
    to: string;
    label?: string;
    /** Scales the stroke width. */
    weight?: number;
}

/** The token classes for a group, by its legend position. Exported so PeopleGraph's list can match the graph. */
export declare function graphGroupPalette(group: string | undefined, groups: string[]): {
    fill: string;
    bg: string;
};

/** Groups in first-appearance order, the centre bucket excluded; undefined groups collapse to ''. */
export declare function graphGroups(nodes: GraphNode[]): string[];

export declare type GraphLayout = 'radial' | 'grid' | 'force';

export declare interface GraphLayoutSize {
    width: number;
    height: number;
    /** Space kept clear of the edges so a node's circle and label fit. */
    padding?: number;
}

export declare interface GraphNode {
    id: string;
    label: string;
    /** Shown on hover (`<title>`) and, for the centre node, under the label. */
    sublabel?: string;
    /**
     * Colour / legend bucket. `'center'` is special: the radial layout puts that
     * node in the middle and the legend leaves it out.
     */
    group?: string;
    /** Relative importance; scales the node radius and picks the radial centre when no node is `'center'`. */
    weight?: number;
    avatarUrl?: string;
    /** Overrides the group colour with any CSS colour. */
    color?: string;
}

export declare function GraphPanelBody({ panel, api, options }: GraphPanelBodyProps): ReactNode;

declare interface GraphPanelBodyProps {
    panel: ChatSidePanelRef;
    api: ChatSidePanelApi;
    options: CreateGraphPanelRendererOptions;
}

export declare type GraphPanelData = GraphPanelNodesData | GraphPanelPeopleData;

export declare interface GraphPanelNodesData {
    title?: string;
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
}

export declare interface GraphPanelPeopleData {
    title?: string;
    people: GraphPerson[];
    query?: string;
}

export declare interface GraphPerson {
    id: string;
    name: string;
    title?: string;
    avatarUrl?: string;
    tags?: string[];
    /** Relevance to the query; scales the node. */
    score?: number;
}

export declare interface GraphPoint {
    x: number;
    y: number;
}

export declare type GraphPositions = Map<string, GraphPoint>;

export declare function isPeopleGraphData(data: GraphPanelData): data is GraphPanelPeopleData;

export declare function layoutGraph(nodes: GraphNode[], edges: GraphEdge[], layout: GraphLayout, size: GraphLayoutSize): GraphPositions;

/**
 * The tag that explains why this person is here: the first tag the query
 * mentions (or that mentions the query), else the person's first tag.
 */
export declare function matchingTag(person: GraphPerson, query: string | undefined): string | undefined;

/** The logical drawing width; the SVG scales it to whatever width it is given. */
export declare const NODE_GRAPH_VIEW_WIDTH = 480;

export declare function NodeGraph({ nodes, edges, layout, selectedId, onSelect, height, className, 'data-testid': testId, }: NodeGraphProps): JSX.Element;

export declare interface NodeGraphProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
    layout?: GraphLayout;
    selectedId?: string | null;
    onSelect?: (node: GraphNode) => void;
    /** Pixel height of the drawing; the width follows the container. */
    height?: number;
    className?: string;
    'data-testid'?: string;
}

export declare const PEOPLE_GRAPH_QUERY_NODE_ID = "__query__";

export declare function PeopleGraph({ people, query, onOpenPerson, onMessagePerson, graphHeight, className, 'data-testid': testId, }: PeopleGraphProps): JSX.Element;

export declare interface PeopleGraphProps {
    people: GraphPerson[];
    /** What the people were found for; becomes the centre node. */
    query?: string;
    onOpenPerson?: (id: string) => void;
    onMessagePerson?: (id: string) => void;
    /** Pixel height of the graph area. */
    graphHeight?: number;
    className?: string;
    'data-testid'?: string;
}

/** The nodes and edges PeopleGraph draws; exported so a host can test or reuse the mapping. */
export declare function peopleToGraph(people: GraphPerson[], query: string | undefined): {
    nodes: GraphNode[];
    edges: GraphEdge[];
};

/** Source-backed membership, already filtered for this viewer by the host. */
export declare interface WorkActivityEffort {
    id: string;
    title: string;
    nodeIds: string[];
    edgeIds: string[];
    /** Older context that may be folded. Never a count of inaccessible sources. */
    contextNodeIds?: string[];
}

export declare interface WorkActivityNodeDetail {
    emphasis?: 'earlier' | 'input' | 'current';
    /** Fresh process evidence, independent from presence and lifecycle. */
    fresh?: boolean;
    tools?: string[];
    attentionLabel?: string;
    feedbackCount?: number;
    artifact?: {
        revisions: WorkArtifactRevision[];
        pending?: {
            id: string;
            label: string;
            status: 'generating' | 'failed';
            message?: string;
        };
    };
}

export declare interface WorkActivityPresentation {
    efforts: WorkActivityEffort[];
    details?: Record<string, WorkActivityNodeDetail>;
    /** Only fresh, running operations in a live query; never inferred from a neighbor. */
    activeEdgeIds: string[];
    /** Canonical edges retain identity even when their visual input arrow reverses. */
    reversedEdgeIds?: string[];
    mode: 'split' | 'full';
    window: WorkActivityWindow;
    bounds: {
        start: number;
        end: number;
    };
    /** v1 latest-state data must be described as recent work, not historical replay. */
    temporalMode: 'recent' | 'as-of';
    events?: Array<{
        at: number;
        count: number;
    }>;
    view: WorkActivityView;
    onWindowChange: (window: WorkActivityWindow) => void;
    onViewChange: (view: WorkActivityView) => void;
    onFeedback?: (selection: Exclude<WorkGraphSelection, null>) => void;
}

export declare interface WorkActivityView {
    focusedEffortId: string | null;
    expandedSourceEfforts: string[];
    overviewViewport?: WorkGraphViewport;
    canvasInitialized?: boolean;
}

export declare interface WorkActivityWindow {
    start: number;
    end: number;
    following: boolean;
}

export declare interface WorkArtifactRevision {
    id: string;
    label: string;
    createdAt: string;
    /** The host resolves protected preview content; the graph does not fetch URLs. */
    preview?: ReactNode;
    anchorId?: string;
    anchorLabel?: string;
}

/**
 * Presentation-only selectable edge. All labels and disclosure decisions must
 * already be viewer-safe when they reach this component.
 */
export declare function WorkEdge({ edge, selected, reducedMotion, fromLabel, toLabel, onSelect, }: WorkEdgeProps): JSX.Element;

export declare interface WorkEdgeProps {
    edge: WorkGraphEdgeData;
    selected?: boolean;
    reducedMotion?: boolean;
    fromLabel: string;
    toLabel: string;
    onSelect?: (id: string) => void;
}

export declare function WorkEntityList({ nodes, edges, selection, onSelectionChange, heading }: WorkEntityListProps): JSX.Element;

export declare interface WorkEntityListProps extends WorkInspectorProps {
    heading?: ReactNode;
}

export declare function WorkGraph(props: WorkGraphProps): JSX.Element;

export declare type WorkGraphCapability = 'message' | 'view-document' | 'edit-document' | 'join-conversation' | 'join-meeting' | 'observe-terminal' | 'control-terminal' | 'view-transcript' | 'view-run' | 'dispatch-run';

/** Frozen import names for the component implementation wave. */
export declare type WorkGraphComponentName = 'WorkGraph' | 'WorkNode' | 'WorkEdge' | 'WorkStatus' | 'WorkInspector' | 'WorkEntityList' | 'WorkSharingControls' | 'WorkReferenceCard';

export declare type WorkGraphDisclosure = 'existence' | 'summary' | 'details';

export declare interface WorkGraphEdgeData {
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

export declare interface WorkGraphNodeData {
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

/** Presentation-only work graph contracts. Hosts pass viewer-sanitized data. */
export declare type WorkGraphNodeKind = 'project' | 'terminal' | 'agent' | 'run' | 'document' | 'change' | 'conversation' | 'meeting' | 'transcript' | 'task';

export declare interface WorkGraphProps {
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
    onRequestCollaboration?: (selection: Exclude<WorkGraphSelection, null>, capability: WorkGraphCapability) => void;
}

export declare type WorkGraphRelation = 'works-on' | 'runs-in' | 'operates-on' | 'produced' | 'edited' | 'attended' | 'discussed' | 'derived-from';

export declare type WorkGraphSelection = {
    kind: 'node';
    id: string;
    revisionId?: string;
    anchorId?: string;
} | {
    kind: 'edge';
    id: string;
} | null;

export declare interface WorkGraphSourceState {
    source: 'cloud-compute' | 'local-compute' | 'document' | 'pipeline' | 'conversation' | 'meeting';
    health: 'available' | 'delayed' | 'disconnected' | 'authorization-unavailable';
    checkedAt: string;
    message?: string;
}

export declare type WorkGraphStatus = 'idle' | 'running' | 'waiting' | 'completed' | 'error' | 'stopped' | 'stale';

export declare interface WorkGraphViewport {
    x: number;
    y: number;
    zoom: number;
}

export declare function WorkInspector({ nodes, edges, selection, onSelectionChange, onOpen, onReference, onRequestCollaboration }: WorkInspectorProps): JSX.Element;

export declare interface WorkInspectorProps {
    nodes: WorkGraphNodeData[];
    edges: WorkGraphEdgeData[];
    selection: WorkGraphSelection;
    onSelectionChange: (selection: WorkGraphSelection) => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onRequestCollaboration?: (selection: Exclude<WorkGraphSelection, null>, capability: WorkGraphCapability) => void;
}

export declare function WorkNode({ node, selected, sharingFresh, onSelect, onOpen }: WorkNodeProps): JSX.Element;

export declare interface WorkNodeProps {
    node: WorkGraphNodeData;
    selected?: boolean;
    /** Sharing heartbeat freshness; independent from the node's work status. */
    sharingFresh?: boolean;
    onSelect?: (id: string) => void;
    onOpen?: (id: string) => void;
}

export declare function WorkReferenceCard({ target, state, node, edge, unavailableLabel, onSelect, onOpen }: WorkReferenceCardProps): JSX.Element;

export declare interface WorkReferenceCardProps {
    target: WorkGraphSelection;
    state: 'loading' | 'available' | 'unavailable';
    node?: WorkGraphNodeData;
    edge?: WorkGraphEdgeData;
    unavailableLabel?: string;
    onSelect?: (selection: Exclude<WorkGraphSelection, null>) => void;
    onOpen?: (selection: Exclude<WorkGraphSelection, null>) => void;
}

export declare type WorkSharingAudience = {
    kind: 'people';
    personIds: string[];
} | {
    kind: 'conversation';
    conversationIds: string[];
} | {
    kind: 'organization';
};

export declare function WorkSharingControls({ state, value, availableNodes, availableEdges, saving, error, conflict, onChange, onStart, onPause, onResume, onStop, }: WorkSharingControlsProps): JSX.Element;

export declare interface WorkSharingControlsProps {
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

export declare interface WorkSharingFormValue {
    audience: WorkSharingAudience;
    selectedNodeIds: string[];
    selectedEdgeIds: string[];
    disclosure: WorkGraphDisclosure;
    expiresAt: string;
    history?: {
        dayFrom: string;
        dayThrough: string;
        expiresAt: string;
    };
}

/**
 * Compact, text-labelled status indicator for work graph nodes and edges.
 *
 * The animated marker is deliberately restricted to fresh, currently
 * running work. The status word and glyph remain present so state is never
 * conveyed by colour or motion alone.
 */
export declare function WorkStatus({ status, sharingFresh, label, className, }: WorkStatusProps): JSX.Element;

export declare interface WorkStatusProps {
    status: WorkGraphStatus;
    sharingFresh?: boolean;
    label?: string;
    className?: string;
}

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}
