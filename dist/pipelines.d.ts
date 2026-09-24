import { default as default_2 } from 'react';
import { EdgeProps } from '@xyflow/react';
import { JSX } from 'react';
import { Node as Node_2 } from '@xyflow/react';
import { NodeProps } from '@xyflow/react';
import { ReactNode } from 'react';

declare type ActionData = ActionNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type ActionFlowNode = Node_2<ActionData, 'action'>;

export declare function ActionNode(props: NodeProps<ActionFlowNode>): JSX.Element;

declare interface ActionNodeData {
    type: 'action';
    actionType: ActionType;
    /** Shape varies per `actionType`; refined in Phase 2. */
    config: Record<string, unknown>;
    idempotent?: boolean;
    /**
     * Dedup scope when `idempotent: true`.
     * - `per-step` (default): fire at most once per step across all retries.
     * - `per-attempt`: fire once per attempt; retries get a fresh dedup window.
     */
    idempotencyMode?: 'per-attempt' | 'per-step';
    onError?: 'route-error' | 'fail-run';
    retryPolicy?: RetryPolicy;
}

declare type ActionType = 'update-document' | 'post-comment' | 'notify' | 'webhook' | 'mcp-tool' | 'sync-back';

export declare function AdjustBwConfig({ data, onChange, nodeId }: AdjustBwConfigProps): JSX.Element;

declare interface AdjustBwConfigProps {
    data: ImageAdjustBwNodeData;
    onChange: (patch: Partial<ImageAdjustBwNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type AdjustBwData = ImageAdjustBwNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type AdjustBwFlowNode = Node_2<AdjustBwData, 'image:adjust-bw'>;

export declare function AdjustBwNode(props: NodeProps<AdjustBwFlowNode>): JSX.Element;

declare type AdjustLayer = {
    kind: 'brightness';
    value: number;
} | {
    kind: 'contrast';
    value: number;
} | {
    kind: 'saturation';
    value: number;
} | {
    kind: 'hue';
    degrees: number;
} | {
    kind: 'blur';
    radiusPx: number;
};

/**
 * Outer config component. Reads selectedNodeId from the editor context so
 * AdjustLayerConfigInner can call the upstream-image hook.
 */
export declare function AdjustLayerConfig(props: AdjustLayerConfigProps): JSX.Element;

declare interface AdjustLayerConfigProps {
    data: ImageAdjustLayerNodeData;
    onChange: (patch: Partial<ImageAdjustLayerNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type AdjustLayerData = ImageAdjustLayerNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type AdjustLayerFlowNode = Node_2<AdjustLayerData, 'image:adjust-layer'>;

export declare function AdjustLayerNode(props: NodeProps<AdjustLayerFlowNode>): JSX.Element;

declare type AgentData = AgentNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type AgentFlowNode = Node_2<AgentData, 'agent'>;

export declare function AgentNode({ id, data, selected }: NodeProps<AgentFlowNode>): JSX.Element;

/**
 * `agent` node config — agent-step contract v1.
 *
 * BREAKING CHANGE in 2.96.0. This interface previously described an
 * aspirational "invoke a registered Strands agent over A2A" node
 * (`agentId` / `protocol` / `inputTemplate` / `streaming`). That node was
 * never executable by any host: no config panel ever shipped for it, no
 * executor ever handled it, and `AgentNode` crashed on
 * `data.protocol.toUpperCase()` for any host that dropped one on a canvas.
 *
 * It is replaced by the real thing: a Claude agent loop (multi-turn, tool
 * use) run via `claude -p`, whose contract is shared with the backend
 * (platform-api) and the executor (distributed-core). If you need the old
 * A2A-invoke semantics back, they belong on a distinct node type — not on
 * this one.
 */
declare interface AgentNodeData {
    type: 'agent';
    /** The task. Supports the same {{ context.x }} interpolation as `llm`. */
    prompt: string;
    systemPrompt?: string;
    /** Friendly alias ('sonnet' | 'opus' | 'haiku') or an explicit model id. */
    model?: string;
    /**
     * Tools the agent may use. DEFAULT-DENY: absent or empty means the agent
     * runs with NO tools and is equivalent to a plain `llm` step. Never widen
     * this implicitly — hosts must make the empty case visible to authors.
     */
    allowedTools?: string[];
    /** Hard ceiling on agent turns. Default 8. */
    maxTurns?: number;
    /** Wall-clock ceiling for the whole step. Default 120_000. */
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

/** One tool invocation inside an agent loop, as persisted on the step output. */
declare interface AgentToolCall {
    name: string;
    input?: unknown;
    output?: unknown;
    ok: boolean;
    /** ISO timestamp. */
    startedAt: string;
    /** ISO timestamp; absent while the call is still in flight. */
    endedAt?: string;
    /** Present when `ok === false`. */
    error?: string;
}

/**
 * One day's rollup for a (pipelineId, rubricId) pair. Mirrors the row
 * shape platform-api's JudgmentAggregateRepository emits over
 * `GET /api/judgments/aggregates`. UI consumers MUST NOT depend on
 * fields outside this contract — the trend chart degrades when fields
 * are absent (e.g. min/max may be undefined on rows written before the
 * extremum tracker landed).
 */
export declare interface AggregateRow {
    aggregateKey: string;
    pipelineId: string;
    rubricId: string;
    /** yyyy-mm-dd UTC. */
    dayBucket: string;
    numJudgments: number;
    numPassed: number;
    numFailed: number;
    sumOverallScore: number;
    sumTokensIn: number;
    sumTokensOut: number;
    sumCostUsd: number;
    minOverallScore?: number;
    maxOverallScore?: number;
    firstJudgedAt: string;
    lastJudgedAt: string;
}

/**
 * Single-row summary card for one day's rollup. Pass-rate as a gauge,
 * verdict tone derived from numPassed/numJudgments, totals on the right.
 *
 * No fetch. No URL knowledge. Renders whatever `aggregate` it receives.
 */
export declare function AggregateSummaryCard({ aggregate, className }: AggregateSummaryCardProps): JSX.Element;

export declare interface AggregateSummaryCardProps {
    aggregate: AggregateRow;
    className?: string;
}

declare type AgUiData = AgUiOutputNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type AgUiFlowNode = Node_2<AgUiData, 'ag-ui-output'>;

declare type AgUiOutputEventType = 'TEXT_MESSAGE_CONTENT' | 'STATE_DELTA' | 'CUSTOM';

export declare function AgUiOutputNode({ id, data, selected }: NodeProps<AgUiFlowNode>): JSX.Element;

declare interface AgUiOutputNodeData {
    type: 'ag-ui-output';
    sourceField: string;
    eventType: AgUiOutputEventType;
    terminal: boolean;
    customEventName?: string;
}

/** The id of the one group `groupBy: 'none'` produces. */
export declare const ALL_GROUP_ID = "all";

export declare function AllRunsPage(): JSX.Element;

export declare function AnimatedEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd, selected, }: EdgeProps): JSX.Element;

export declare interface AnimatedEdgeData {
    state?: EdgeState;
    label?: string;
    /** Payload type carried over this edge. 'text'/'data'/unset → no change. */
    payload?: EdgePayload;
    /** Fan-out multiplicity; >= 2 scales width and shows a ×N midpoint pill. */
    volume?: number;
}

declare type ApprovalData = ApprovalNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type ApprovalFlowNode = Node_2<ApprovalData, 'approval'>;

export declare function ApprovalNode(props: NodeProps<ApprovalFlowNode>): JSX.Element;

declare interface ApprovalNodeData {
    type: 'approval';
    approvers: Approver[];
    /** n-of-m — how many approvals required to pass. */
    requiredCount: number;
    timeoutMs?: number;
    timeoutAction?: ApprovalTimeoutAction;
    /** Message shown to the approver. */
    message?: string;
}

declare interface ApprovalRecord {
    userId: string;
    decision: 'approve' | 'reject';
    comment?: string;
    at: string;
}

declare type ApprovalTimeoutAction = 'reject' | 'approve' | 'escalate';

declare interface Approver {
    type: 'user' | 'role';
    value: string;
}

/**
 * Authoring bounding-box painted by the user in BBoxAuthoringCanvas.
 * These are forwarded to the vision call as a system-prompt hint.
 */
declare interface AuthoringBBox {
    /** Stable client-side id (uuid). */
    id: string;
    /** Pixel x of the box origin (post-resize). */
    x: number;
    /** Pixel y of the box origin (post-resize). */
    y: number;
    width: number;
    height: number;
    /** Free-form label entered by the author. */
    label?: string;
}

/**
 * Every `{{context.*}}` path available at `targetId`, nearest upstream first.
 *
 * `context.trigger` is always included even when the trigger isn't wired yet —
 * the executor always provides it, and omitting it would make a fresh graph
 * look like it has no context at all.
 */
export declare function availableContextPaths(nodes: readonly PipelineNode[], edges: readonly PipelineEdge[], targetId: string): ContextPath[];

/**
 * Image references actually reachable from `targetId`, nearest upstream first.
 *
 * Replaces the hardcoded sample lists that 18 image/vision config panels
 * carried (`$.steps.upload.output.imageId`, `$.steps.crop.output.imageId`) —
 * paths naming nodes that need not exist in the user's graph. An author picking
 * one got a reference that silently resolved to nothing at run time.
 *
 * `$.trigger.imageRef` is always offered: the executor supplies it whenever a
 * run is started with an image, independent of the graph.
 */
export declare function availableImageRefs(nodes: readonly PipelineNode[], edges: readonly PipelineEdge[], targetId: string): ImageRefOption[];

export declare function BaseNode(props: BaseNodeProps): JSX.Element;

declare interface BaseNodeProps {
    icon: string;
    subtitle?: string;
    state: NodeExecutionState;
    body?: ReactNode;
    footer?: ReactNode;
    selected?: boolean;
    /**
     * When provided AND `state === 'failed'`, renders a small "⟳ Retry from
     * here" pill inline below the header. The click handler is invoked with
     * propagation stopped so the canvas doesn't also receive a node-select.
     * Per PIPELINES_PLAN.md §18.4.4 / §17.6.
     */
    onRetry?: () => void;
    /**
     * The node's type, so the card can mark itself when the host's executor has
     * no handler for it. Optional: without it the card simply isn't marked.
     */
    nodeType?: string;
    /** Show a red breakpoint dot in the top-left corner of the card. */
    hasBreakpoint?: boolean;
    /** Highlight the card with an orange border/glow (run is paused here). */
    pausedAtBreakpoint?: boolean;
    /**
     * Optional override for the accessible name. When omitted we synthesize one
     * from `subtitle` + `state`. Callers (per node-type) can pass a richer
     * string (e.g. "LLM node, Claude Opus 4, system prompt: …") for screen
     * reader users.
     */
    ariaLabel?: string;
    /**
     * Node-category visual channel (NODE-VISUALS-AUDIT §3.1). When provided,
     * renders a 3px category-colored left accent bar plus a shaped/tinted
     * 20px icon chip in the header. Orthogonal to `state`, which keeps sole
     * ownership of the card border + background. When omitted, rendering is
     * byte-for-byte identical to the pre-category BaseNode.
     */
    category?: NodeCategory;
    children?: ReactNode;
}

declare interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Caption + scene metadata header.
 */
export declare function CaptionPanel({ result, className }: CaptionPanelProps): JSX.Element | null;

export declare interface CaptionPanelProps {
    result: Pick<VisionResult, 'caption' | 'setting' | 'location' | 'timeOfDay' | 'mood' | 'colors'>;
    className?: string;
}

/** Look up the category for a node type; undefined for unknown types. */
export declare function categoryFor(nodeType: string): NodeCategory | undefined;

export declare function clearImageLineageCache(): void;

declare type ConditionData = ConditionNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type ConditionFlowNode = Node_2<ConditionData, 'condition'>;

export declare function ConditionNode(props: NodeProps<ConditionFlowNode>): JSX.Element;

declare interface ConditionNodeData {
    type: 'condition';
    /** JSONPath or boolean expression evaluated over context. */
    expression: string;
    /** UI label shown on the node. */
    label?: string;
}

export declare function ConfigField({ label, required, help, error, controlId, render, children, className, }: ConfigFieldProps): JSX.Element;

export declare interface ConfigFieldProps {
    label: string;
    required?: boolean;
    help?: string;
    error?: string;
    /**
     * Id of the control this field labels. Set the same value as the control's
     * `id` and the `<label htmlFor>` association becomes explicit.
     */
    controlId?: string;
    /**
     * Render-prop escape hatch: receives the id of the help/error text so the
     * control can point `aria-describedby` at it. Use INSTEAD of `children`.
     */
    render?: (wiring: {
        describedById?: string;
        controlId?: string;
        /** Id of the rendered `<label>`, for `aria-labelledby` on a `role="group"`. */
        labelId: string;
    }) => ReactNode;
    children?: ReactNode;
    className?: string;
}

export declare function ConfigSection({ title, defaultCollapsed, children, className }: ConfigSectionProps): JSX.Element;

declare interface ConfigSectionProps {
    title: string;
    defaultCollapsed?: boolean;
    children: ReactNode;
    className?: string;
}

/**
 * What a node writes into the run context.
 *
 * Keyed by node type. `outputKey` on the node's data overrides the default
 * location for the types that support it (transform, action, and the vision
 * family), which is why this takes the node rather than just the type.
 */
export declare function contextContributions(node: PipelineNode): ContextPath[];

/** One `{{context.*}}` path an author can insert, and where it comes from. */
export declare interface ContextPath {
    /** Template path WITHOUT braces, e.g. `context.steps.step-2.output`. */
    path: string;
    /** Human label for the contributing node, e.g. "Classify (llm)". */
    source: string;
    /** Node id that contributes it, for click-to-reveal in the canvas. */
    sourceNodeId: string;
    /** What the value is, shown as help text next to the pill. */
    description: string;
    /** Rough shape, so a panel can hint at usage without executing anything. */
    kind: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'image';
}

export declare function ContextVariablePicker({ paths, unresolved, onInsert, onRevealNode, className, }: ContextVariablePickerProps): JSX.Element;

export declare interface ContextVariablePickerProps {
    /** Paths available at this node, from `availableContextPaths`. */
    paths: readonly ContextPath[];
    /** Referenced but unavailable, from `unresolvedTemplatePaths`. */
    unresolved?: readonly string[];
    /** Called with the `{{path}}` text to insert at the cursor. */
    onInsert: (token: string) => void;
    /** Reveal the contributing node on the canvas. */
    onRevealNode?: (nodeId: string) => void;
    className?: string;
}

/**
 * Per-criterion rows: id + raw score + verdict chip + 0..1 gauge +
 * rationale. The rubric prompt sits inline so users can see the question
 * the model was answering without flipping tabs.
 */
export declare function CriteriaPanel({ result, className }: CriteriaPanelProps): JSX.Element | null;

export declare interface CriteriaPanelProps {
    /** Subset of JudgmentResult — pass `result` directly OR pluck just what you need. */
    result: Pick<JudgmentResult, 'criteria' | 'rubricSnapshot'>;
    className?: string;
}

export declare interface CriterionScore {
    criterionId: string;
    /** Normalized 0..1 for display. */
    score: number;
    /** Verbatim score from the model (might be 1-5, "pass", etc.). */
    rawScore: number | string;
    rationale: string;
    passed: boolean;
}

export declare function CropConfig(props: CropConfigProps): JSX.Element;

declare interface CropConfigProps {
    data: ImageCropNodeData;
    onChange: (patch: Partial<ImageCropNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type CropData = ImageCropNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type CropFlowNode = Node_2<CropData, 'image:crop'>;

export declare function CropNode(props: NodeProps<CropFlowNode>): JSX.Element;

export declare function DimensionsConfig({ data, onChange, nodeId }: DimensionsConfigProps): JSX.Element;

export declare interface DimensionsConfigProps {
    data: ImageDimensionsNodeData;
    onChange: (patch: Partial<ImageDimensionsNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type DimensionsData = ImageDimensionsNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type DimensionsFlowNode = Node_2<DimensionsData, 'image:dimensions'>;

export declare function DimensionsNode(props: NodeProps<DimensionsFlowNode>): JSX.Element;

declare interface DropdownMenuItem {
    /** Visible item label. */
    label: string;
    /** Optional leading icon / glyph. */
    icon?: ReactNode;
    /** Highlight this item as the currently-active selection. */
    active?: boolean;
    /** Style this item as destructive. */
    danger?: boolean;
    /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
    onSelect?: () => void;
    /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
    trailing?: ReactNode;
    /** A second, quieter line under the label. */
    description?: string;
    /** A setting that is on: a check leads the row (menuitemcheckbox). */
    checked?: boolean;
    /**
     * A flyout of further choices, opened from this row — "Share to ›",
     * "Download as ›". Opens on hover, click or ArrowRight; the row itself
     * runs no `onSelect`.
     */
    submenu?: DropdownMenuSection[];
    /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
    'data-testid'?: string;
}

declare interface DropdownMenuSection {
    /** Optional uppercase section heading. */
    label?: string;
    items: DropdownMenuItem[];
    /**
     * The group scrolls in place (`uic-menu-group-scroll`) so the sections
     * after it stay put. For a generated list — one row per room — that would
     * otherwise push the fixed actions below the fold.
     */
    scroll?: boolean;
    'data-testid'?: string;
}

export declare type EdgePayload = 'image' | 'text' | 'data' | 'control';

export declare type EdgeState = 'default' | 'active' | 'traversed-success' | 'traversed-failure';

export declare function EditPromptConfig({ data, onChange, nodeId }: EditPromptConfigProps): JSX.Element;

declare interface EditPromptConfigProps {
    data: ImageEditPromptNodeData;
    onChange: (patch: Partial<ImageEditPromptNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type EditPromptData = ImageEditPromptNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type EditPromptFlowNode = Node_2<EditPromptData, 'image:edit-prompt'>;

export declare function EditPromptNode(props: NodeProps<EditPromptFlowNode>): JSX.Element;

export declare function EditRecommendationsPanel({ exposure, whiteBalance, contrast, composition, edits, onApplyEdit, className, }: EditRecommendationsPanelProps): JSX.Element | null;

export declare interface EditRecommendationsPanelProps {
    exposure?: VisionResult['exposure'];
    whiteBalance?: VisionResult['whiteBalance'];
    contrast?: VisionResult['contrast'];
    composition?: VisionResult['composition'];
    edits?: VisionResult['edits'];
    onApplyEdit?: (edit: string) => void;
    className?: string;
}

export declare function entryKind(entry: Pick<PipelinesListEntry, 'kind'>): PipelineKind;

export declare function entryWorkType(entry: Pick<PipelinesListEntry, 'kind' | 'workType'>): WorkType;

declare type ErrorCategory = 'NetworkError' | 'TimeoutError' | 'ValidationError' | 'LLMError' | 'RegistryConflict'
/** A step looked at the request and said no (constraint not met, forbidden, revision conflict, invalid request): terminal, never retried. */
| 'Refused'
/** The model could not sign in (missing or expired credentials): terminal until an operator refreshes them. */
| 'ModelAuth' | 'UnknownError';

/** Whether the platform would retry this failure on its own; a `Refused` run is `terminal`. */
declare type ErrorRetryability = 'retryable' | 'terminal' | 'unknown';

/**
 * Host seam for gateway channel subscription.
 *
 * `EventStreamProvider` is a pure in-memory dispatcher: it has no WebSocket,
 * and deliberately doesn't take a hard dependency on `WebSocketContext` so it
 * stays mountable in tests, Storybook and the backendless demo. But
 * `subscribeToRun` / `subscribeToAll` / `subscribeToApprovals` are, by name,
 * promises to open a *gateway* channel — something only the host can do.
 *
 * Until v2.90 those three methods were unconditional `return () => {}` stubs
 * with a comment claiming "WebSocketEventAdapter provides real subscriptions".
 * It doesn't and it can't: the adapter is a sibling hook, not a wrapper, so
 * nothing ever replaced the stub. Callers (`usePipelineRunAuditLog`,
 * `usePendingApprovals`, `ObservabilityContext`) held an unsubscribe handle
 * for a channel that had never been opened.
 *
 * Implement this with `usePipelineWsCommands()` from `WebSocketEventAdapter`
 * — its `subscribe`/`unsubscribe` frames use exactly these channel names. See
 * `AppLayout` for the reference wiring.
 *
 * **Pass a stable (memoized) object.** Its identity is part of the context
 * value, so a new object every render re-runs every subscriber's effect.
 * Changing identity on purpose (e.g. when the socket reconnects) is how
 * re-subscription after a reconnect happens.
 */
declare interface EventStreamChannelTransport {
    subscribe(channel: string): void;
    unsubscribe(channel: string): void;
}

export declare function EventStreamProvider({ children, channelTransport, }: EventStreamProviderProps): default_2.JSX.Element;

export declare interface EventStreamProviderProps {
    children: default_2.ReactNode;
    /**
     * Gateway channel transport. Omit it and `subscribeToRun` /
     * `subscribeToAll` / `subscribeToApprovals` open nothing — correct for
     * tests, Storybook and the backendless demo, which drive the dispatcher
     * directly via `dispatch` / `dispatchEnvelope`. Any deployment with a real
     * gateway must pass one. See `EventStreamChannelTransport`.
     */
    channelTransport?: EventStreamChannelTransport;
}

export declare interface EventStreamValue {
    subscribe<K extends keyof PipelineEventMap>(type: K | '*', handler: (payload: PipelineEventMap[K] | WildcardEvent) => void): () => void;
    /**
     * Convenience shim for tests / synthetic event sources. Synthesizes a
     * `PipelineWireEvent` (auto-incrementing local `seq`, `sourceNodeId =
     * 'local'`, `emittedAt = Date.now()`) and forwards to `dispatchEnvelope`
     * so synthetic and WS-sourced events share the exact same dedupe +
     * fan-out pipeline.
     */
    dispatch<K extends keyof PipelineEventMap>(type: K, payload: PipelineEventMap[K]): void;
    /**
     * Primary entry point for any envelope-aware producer. Used by the
     * WebSocket adapter to forward server-supplied envelopes verbatim. Dedupes
     * on `(runId, stepId, seq)` so replays after a ResourceRouter-orphaned run
     * is resumed on a new owner don't double-count. Timestamps are re-stamped
     * on replay — never use them for dedupe.
     */
    dispatchEnvelope<K extends keyof PipelineEventMap>(envelope: PipelineWireEvent<K>): void;
    /**
     * Ask the gateway to start streaming the per-run channel
     * `pipeline:run:{runId}`, and return a function that unsubscribes it.
     *
     * **This only does anything when the host wired `channelTransport` on
     * `<EventStreamProvider>`.** The provider owns no socket of its own — see
     * the `EventStreamChannelTransport` docs below. With no transport the
     * returned function is a no-op and a dev-mode warning names the channel
     * that was requested but never opened.
     */
    subscribeToRun(runId: string): () => void;
    /** Same contract as `subscribeToRun`, for the `pipeline:all` firehose. */
    subscribeToAll(): () => void;
    /** Same contract as `subscribeToRun`, for the `pipeline:approvals` channel. */
    subscribeToApprovals(): () => void;
}

export declare function ExecutorLog({ pipelineId, runId, onStepClick, }: ExecutorLogProps): default_2.JSX.Element;

export declare interface ExecutorLogProps {
    pipelineId: string;
    runId: string;
    /**
     * Called when an operator clicks a `pipeline.step.*` row. Receives the
     * stepId pulled from the audit row's `details.stepId` / `trace.stepId`.
     * Optional — when omitted the rows are still expandable but the click
     * is a no-op.
     */
    onStepClick?: (stepId: string) => void;
}

/** Query options for the aggregate-list fetcher. */
export declare interface FetchAggregatesParams {
    /** Exactly one of pipelineId / rubricId must be present. */
    pipelineId?: string;
    rubricId?: string;
    /** yyyy-mm-dd inclusive bounds. */
    since?: string;
    until?: string;
    /** Page size cap. Default + max enforced server-side. */
    limit?: number;
}

/** Response envelope for the aggregate-list fetcher. */
export declare interface FetchAggregatesResult {
    items: AggregateRow[];
    nextCursor?: string;
}

declare type FileKind = 'page' | 'presentation' | 'recording' | 'transcript' | 'diagram' | 'folder' | 'agent' | 'experiment' | 'call' | 'conversation' | 'media' | 'workflow';

declare type ForkData = ForkNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type ForkFlowNode = Node_2<ForkData, 'fork'>;

export declare function ForkNode(props: NodeProps<ForkFlowNode>): JSX.Element;

declare interface ForkNodeData {
    type: 'fork';
    /** Number of parallel output branches (2..8). */
    branchCount: number;
    branchLabels?: string[];
}

export declare function FormatConvertConfig({ data, onChange, nodeId, }: FormatConvertConfigProps): JSX.Element;

declare interface FormatConvertConfigProps {
    data: ImageFormatConvertNodeData;
    onChange: (patch: Partial<ImageFormatConvertNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type FormatConvertData = ImageFormatConvertNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type FormatConvertFlowNode = Node_2<FormatConvertData, 'image:format-convert'>;

export declare function FormatConvertNode(props: NodeProps<FormatConvertFlowNode>): JSX.Element;

export declare function GenerateConfig({ data, onChange }: GenerateConfigProps): JSX.Element;

declare interface GenerateConfigProps {
    data: ImageGenerateNodeData;
    onChange: (patch: Partial<ImageGenerateNodeData>) => void;
}

declare type GenerateData = ImageGenerateNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type GenerateFlowNode = Node_2<GenerateData, 'image:generate'>;

export declare function GenerateNode(props: NodeProps<GenerateFlowNode>): JSX.Element;

declare type GeometricOp = GeometricOpRotate | GeometricOpFlip | GeometricOpFlop;

declare type GeometricOpFlip = {
    op: 'flip';
};

declare type GeometricOpFlop = {
    op: 'flop';
};

declare type GeometricOpRotate = {
    op: 'rotate';
    degrees: number;
    background?: string;
    trimAfter?: boolean;
};

declare type GraphData = GraphQueryNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type GraphFlowNode = Node_2<GraphData, 'graph-query'>;

export declare function GraphQueryNode({ id, data, selected }: NodeProps<GraphFlowNode>): JSX.Element;

declare interface GraphQueryNodeData {
    type: 'graph-query';
    graphId: string;
    query: string;
    parameters?: Record<string, string>;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

export declare const GROUP_BY_LABEL: Record<PipelinesGroupBy, string>;

export declare const GROUP_BY_ORDER: PipelinesGroupBy[];

export declare interface GroupedEntries {
    groups: Array<{
        id: string;
        title: string;
        count: number;
    }>;
    /** Group id per entry id. */
    groupOf: Map<string, string>;
}

declare interface GroupedListGroup {
    id: string;
    title: string;
    /** Shown as a count chip after the title. Omit for no chip. */
    count?: number;
    /** Leading mark after the caret — normally a `FileKindMark kind="folder"`. */
    icon?: ReactNode;
    /** Open on first render. Default `true`. Ignored when `openGroups` is controlled. */
    defaultOpen?: boolean;
    /** What an open group with no rows says. Default "Nothing here". */
    emptyLabel?: string;
}

declare interface GroupedListRow {
    id: string;
    groupId: string;
    /** Leading kind mark — normally a `FileKindMark`. */
    icon?: ReactNode;
    title: string;
    /** Beside the title on the first line — normally a `StatusPill`. */
    pill?: ReactNode;
    /** The second line at rest. */
    subline?: ReactNode;
    /** The second line while hovered, focused or `current`. Falls back to `subline`. */
    hoverSubline?: ReactNode;
    /** Trailing content that is always visible — a "View run" link. */
    trailing?: ReactNode;
    /** Trailing content revealed on hover / focus / `current` — an "Open" button. */
    hoverActions?: ReactNode;
    /** The row the reader is "at": last opened, just created. Tinted; wears its hover line. */
    current?: boolean;
    /** Muted and inert; the menu still opens so a reader can see why. */
    disabled?: boolean;
    /** Optional accessible name override — default is the title. */
    ariaLabel?: string;
    /**
     * A control in the caret column — normally a `Checkbox`. Rendered OUTSIDE the
     * row's button, so pressing it never opens the row.
     */
    leading?: ReactNode;
    /**
     * A second line inside the row's button, above `subline` — avatar, points,
     * owner. Non-interactive by contract (it is inside a button).
     */
    meta?: ReactNode;
}

/**
 * Buckets entries by the chosen axis, in the vocabulary's order, dropping
 * groups with nothing in them. `none` yields the single `all` group.
 */
export declare function groupEntries(entries: PipelinesListEntry[], groupBy: PipelinesGroupBy): GroupedEntries;

declare type GuardrailAction = 'block' | 'mask' | 'warn';

declare type GuardrailData = GuardrailNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type GuardrailFlowNode = Node_2<GuardrailData, 'guardrail'>;

export declare function GuardrailNode({ id, data, selected }: NodeProps<GuardrailFlowNode>): JSX.Element;

declare interface GuardrailNodeData {
    type: 'guardrail';
    guardrailId: string;
    guardrailVersion?: string;
    inputField: string;
    action: GuardrailAction;
    label?: string;
}

declare interface ImageAdjustBwNodeData {
    type: 'image:adjust-bw';
    sourceImagePath?: string;
    algorithm?: 'luminosity' | 'average' | 'desaturate';
    contrast?: number;
}

declare interface ImageAdjustLayerNodeData {
    type: 'image:adjust-layer';
    sourceImagePath?: string;
    layers: AdjustLayer[];
    /**
     * Optional manual override for the live-preview source. When set, this
     * pinned imageId wins over the auto-wired upstream-run image resolved by
     * `useLatestStepForNode`. Cleared via the caption "x" affordance.
     */
    previewSourceImageId?: string;
}

declare interface ImageCropNodeData {
    type: 'image:crop';
    sourceImagePath?: string;
    bboxPath?: string;
    bbox?: BBox;
    materialize?: boolean;
}

declare interface ImageDimensionsNodeData {
    type: 'image:dimensions';
    sourceImagePath?: string;
    /**
     * Longest-edge target used to derive generation dimensions. The handler
     * reads the source image's natural size and emits width/height/aspectRatio
     * plus genWidth/genHeight scaled to fit within `maxEdge`. Default: 1024.
     */
    maxEdge?: number;
}

declare interface ImageEditPromptNodeData {
    type: 'image:edit-prompt';
    sourceImagePath?: string;
    maskImagePath?: string;
    prompt: string;
    model?: string;
}

declare type ImageFormat = 'jpeg' | 'png' | 'webp' | 'avif';

declare interface ImageFormatConvertNodeData {
    type: 'image:format-convert';
    sourceImagePath?: string;
    format: ImageFormat;
    quality?: number;
    lossless?: boolean;
    stripMetadata?: boolean;
}

declare interface ImageGenerateNodeData {
    type: 'image:generate';
    prompt: string;
    model?: string;
    width?: number;
    height?: number;
    seed?: number;
    numImages?: number;
}

export declare interface ImageLineageEntry {
    imageId: string;
    producedByStepId: string;
    producedByNodeKind: string;
    parentImageId?: string;
    width: number;
    height: number;
    mimeType: string;
    bbox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    at: string;
}

export declare function ImageLineageGraph({ entries, selectedImageId, onSelect, maxRenderedNodes, }: ImageLineageGraphProps): JSX.Element;

export declare interface ImageLineageGraphProps {
    entries: ImageLineageEntry[];
    selectedImageId?: string;
    onSelect?: (imageId: string) => void;
    /**
     * Maximum number of nodes to render initially. When `entries.length`
     * exceeds this, only the most-recent-first window is rendered and a
     * banner offers "Show all". Defaults to 100.
     */
    maxRenderedNodes?: number;
}

/** Convenience: pull all the bbox-related props out of a `VisionResult`. */
export declare function imageOverlayPropsFrom(result: VisionResult): {
    imageUrl: string | undefined;
    imageDataUrl: string | undefined;
    imageWidth: number | undefined;
    imageHeight: number | undefined;
    people: VisionPerson[] | undefined;
    objects: VisionObject[] | undefined;
};

/** A JSONPath an image-consuming node can point `imageRefPath` at. */
export declare interface ImageRefOption {
    /** JSONPath as the executor resolves it, e.g. `$.steps.crop-1.output.imageId`. */
    path: string;
    /** Human label for the producing node. */
    source: string;
    sourceNodeId: string;
}

declare interface ImageResizeNodeData {
    type: 'image:resize';
    sourceImagePath?: string;
    width?: number;
    height?: number;
    fit?: ResizeFit;
    withoutEnlargement?: boolean;
    background?: string;
}

declare interface ImageSaveNodeData {
    type: 'image:save';
    /** JSONPath to the source imageId in context. */
    sourceImagePath?: string;
    /**
     * Output filename template. Supports `{{scatter.item.label}}`,
     * `{{scatter.index}}`, and `{{scatter.parentImageId}}` substitutions.
     * Default: 'crop-{{scatter.index}}.png'.
     */
    filenameTemplate?: string;
}

declare interface ImageSharpenNodeData {
    type: 'image:sharpen';
    sourceImagePath?: string;
    sigma?: number;
    m1?: number;
    m2?: number;
}

export declare function ImageSourceConfig({ data, onChange }: ImageSourceConfigProps): JSX.Element;

export declare interface ImageSourceConfigProps {
    data: ImageSourceNodeData;
    onChange: (patch: Partial<ImageSourceNodeData>) => void;
}

declare type ImageSourceData = ImageSourceNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type ImageSourceFlowNode = Node_2<ImageSourceData, 'image-source'>;

export declare function ImageSourceNode(props: NodeProps<ImageSourceFlowNode>): JSX.Element;

declare interface ImageSourceNodeData {
    type: 'image-source';
    /** imageId to inject into the pipeline context. */
    imageId?: string;
    /** Key under which the imageId is written to context. Default: 'imageRef'. */
    outputKey?: string;
}

declare interface ImageTransformNodeData {
    type: 'image:transform';
    sourceImagePath?: string;
    operations: GeometricOp[];
}

declare interface ImageUpscaleNodeData {
    type: 'image:upscale';
    sourceImagePath?: string;
    /** Optional prompt forwarded to the self-hosted x4 upscaler. */
    prompt?: string;
    /** Longest-edge cap applied before super-resolution. Default: 1024. */
    maxEdge?: number;
}

declare interface ImageVariationNodeData {
    type: 'image:variation';
    sourceImagePath?: string;
    numVariations?: number;
    similarity?: number;
    model?: string;
}

declare interface ImageVisionAnalyzeNodeData {
    type: 'image:vision-analyze';
    model?: string;
    systemPrompt?: string;
    userPrompt: string;
    imageRefPath: string;
    outputSchema?: Record<string, unknown>;
    maxOutputTokens?: number;
    /**
     * Optional seed regions painted by the user in the BBoxAuthoringCanvas.
     * Rendered when outputSchema matches the 'detection-regions' preset.
     * Forwarded to platform-api's vision handler as focus hints.
     */
    seedRegions?: AuthoringBBox[];
}

declare interface ImageVisionClassifyNodeData {
    type: 'image:vision-classify';
    model?: string;
    imageRefPath: string;
    labels: string[];
    systemPrompt?: string;
    maxOutputTokens?: number;
}

declare interface ImageVisionDescribeNodeData {
    type: 'image:vision-describe';
    model?: string;
    imageRefPath: string;
    userPrompt: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

declare interface ImageVisionExtractTextNodeData {
    type: 'image:vision-extract-text';
    model?: string;
    imageRefPath: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

declare interface ImageVisionTagNodeData {
    type: 'image:vision-tag';
    model?: string;
    imageRefPath: string;
    candidateTags?: string[];
    maxTags?: number;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

declare interface ImageWatermarkNodeData {
    type: 'image:watermark';
    sourceImagePath?: string;
    overlayImageId: string;
    gravity?: WatermarkGravity;
    opacity?: number;
    offsetX?: number;
    offsetY?: number;
}

/**
 * Renders a source image with overlaid bounding boxes for detected people
 * (indigo) and objects (amber). Boxes scale with the rendered image size
 * via percentage-based positioning, so the component is responsive without
 * needing a canvas. Hovering a box surfaces the label tooltip.
 */
export declare function ImageWithBBoxOverlay({ imageUrl, imageDataUrl, imageWidth, imageHeight, people, objects, show, onSelectPerson, onSelectObject, className, alt, }: ImageWithBBoxOverlayProps): JSX.Element;

export declare interface ImageWithBBoxOverlayProps {
    imageUrl?: string;
    imageDataUrl?: string;
    /** Pixel dimensions of the source image. Required for bbox scaling. If
     *  omitted, the component infers them from the natural image size on load. */
    imageWidth?: number;
    imageHeight?: number;
    people?: VisionPerson[];
    objects?: VisionObject[];
    /** Whether to render people, objects, or both. Default: both. */
    show?: 'people' | 'objects' | 'both';
    /** Called when the user clicks a person box. */
    onSelectPerson?: (person: VisionPerson) => void;
    /** Called when the user clicks an object box. */
    onSelectObject?: (object: VisionObject) => void;
    className?: string;
    alt?: string;
}

declare type JoinData = JoinNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type JoinFlowNode = Node_2<JoinData, 'join'>;

declare type JoinMergeStrategy = 'deep-merge' | 'array-collect' | 'last-writer-wins';

declare type JoinMode = 'all' | 'any' | 'n_of_m';

export declare function JoinNode(props: NodeProps<JoinFlowNode>): JSX.Element;

declare interface JoinNodeData {
    type: 'join';
    mode: JoinMode;
    /** Required when `mode === 'n_of_m'`. */
    n?: number;
    mergeStrategy: JoinMergeStrategy;
}

/** Failure-mode tag for `useJudgmentResults` records. */
export declare type JudgeFailureReason = 'input-resolution' | 'malformed' | 'aborted' | 'budget-exhausted' | 'unknown';

export declare type JudgeMode = 'absolute' | 'comparison';

export declare type JudgeScale = 'binary' | '1-5' | '1-10' | 'pass-fail';

export declare type JudgmentAggregation = 'weighted-mean' | 'min' | 'all-pass';

/**
 * The judge data-fetcher contract. Implementations live in the consumer
 * (gateway frontend has `src/api/judgments.ts`); the UI is fully
 * decoupled from URL conventions, auth headers, retry semantics, etc.
 */
export declare interface JudgmentApi {
    /**
     * Lazy-fetches the full rawModelText for a judgment. Returns null
     * when the body is unavailable (404 from the server, S3 spillover not
     * configured, network error — the impl normalizes all 3).
     */
    fetchRawText(judgmentId: string): Promise<string | null>;
    /**
     * Lists per-day aggregate rollups. Throws on validation errors
     * (missing partition key, malformed date). Returns an empty `items`
     * array when there's no data in range.
     */
    fetchAggregates(params: FetchAggregatesParams): Promise<FetchAggregatesResult>;
}

export declare function JudgmentApiProvider({ value, children }: JudgmentApiProviderProps): JSX.Element;

export declare interface JudgmentApiProviderProps {
    value: JudgmentApi;
    children: ReactNode;
}

export declare interface JudgmentCriterion {
    id: string;
    prompt: string;
    scale: JudgeScale;
    weight?: number;
    failThreshold?: number;
    anchors?: string[];
}

/** The structured judgment payload — top-level render shape. */
export declare interface JudgmentResult {
    judgmentId: string;
    runId: string;
    stepId: string;
    pipelineId: string;
    rubricId: string;
    rubricVersion: number;
    /** Pinned rubric snapshot — historical record never reinterprets when rubric edits later. */
    rubricSnapshot: JudgmentRubric;
    mode: JudgeMode;
    overallScore: number;
    overallVerdict: JudgmentVerdict;
    overallPassed: boolean;
    confidence?: number;
    criteria: CriterionScore[];
    rawModelText?: string;
    /**
     * True when `rawModelText` was stripped at persist time for being
     * ≥ the inline cap (32KB). The full body is recoverable via
     * `JudgmentApi.fetchRawText(judgmentId)` when configured server-side.
     */
    rawTextTruncated?: boolean;
    model: string;
    tokensIn: number;
    tokensOut: number;
    cacheReadTokens?: number;
    cacheCreationTokens?: number;
    latencyMs: number;
    costUsd: number;
    cacheHit: boolean;
    /** ISO-8601 wall-clock for the judge call. */
    judgedAt: string;
}

/**
 * Top-level composite for a `JudgmentResult` — verdict header + per-criterion
 * scores + cost/latency/model footer. Drop into a
 * `pipeline.judge.scored` step's expanded view OR render standalone for
 * direct judgment exploration.
 *
 * Raw text resolution order (when `showRawText` is true):
 *   1. `result.rawModelText` (inline body) — shown immediately
 *   2. `result.rawTextTruncated && <JudgmentApiProvider>` is mounted —
 *      "Show raw" triggers a lazy fetch via `api.fetchRawText(judgmentId)`
 *   3. Neither — show "raw output unavailable" message
 *
 * The viewer never knows about URLs or fetch impls; the provider does.
 */
export declare function JudgmentResultViewer({ result, showVerdict, showCriteria, showMetadata, showRawText, className, }: JudgmentResultViewerProps): JSX.Element;

export declare interface JudgmentResultViewerProps {
    result: JudgmentResult;
    /** Render the top-level verdict header. Default true. */
    showVerdict?: boolean;
    /** Render the per-criterion section. Default true. */
    showCriteria?: boolean;
    /** Render the model / token / cost footer. Default true. */
    showMetadata?: boolean;
    /** Render an expandable raw-model-text section. Default false. */
    showRawText?: boolean;
    className?: string;
}

export declare interface JudgmentRubric {
    id: string;
    version: number;
    criteria: JudgmentCriterion[];
    overall: JudgmentAggregation;
    passThreshold?: number;
}

export declare interface JudgmentStepRecord {
    runId: string;
    stepId: string;
    pipelineId?: string;
    status: JudgmentStepStatus;
    result?: JudgmentResult;
    error?: string;
    failureReason?: JudgeFailureReason;
    /** Wall-clock ms since the step's `started` event. */
    elapsedMs?: number;
    /** Rubric id from the started event. */
    rubricId?: string;
    /** Model id from the started or scored event. */
    judgeModel?: string;
    startedAt?: number;
    completedAt?: number;
    costUsd?: number;
    tokensIn?: number;
    tokensOut?: number;
}

export declare type JudgmentStepStatus = 'running' | 'scored' | 'failed' | 'budget-exceeded';

/**
 * Trend visualization for per-day judgment rollups:
 *   - top: sparkline of pass-rate per day
 *   - bottom: per-day table — date, pass-rate, mean score, cost
 *
 * Pure rendering — accepts `aggregates` as a prop, no fetch. Pair with
 * `useJudgmentAggregates({ pipelineId | rubricId })` at the call site
 * for live data; the hook lives in this folder for symmetry but isn't
 * required to render the chart.
 *
 * The chart works equally well for per-pipeline trends and per-rubric
 * trends — it doesn't know which axis the caller used.
 */
export declare function JudgmentTrendChart({ aggregates, sortOrder, caption, loading, className, }: JudgmentTrendChartProps): JSX.Element;

export declare interface JudgmentTrendChartProps {
    aggregates: AggregateRow[];
    /**
     * Sort direction for the table view. Default 'desc' (newest first).
     */
    sortOrder?: 'asc' | 'desc';
    /** Caption — defaults to `${count} days` if omitted. */
    caption?: string;
    /** Optional loading hint shown when aggregates is empty AND `loading=true`. */
    loading?: boolean;
    className?: string;
}

export declare type JudgmentVerdict = 'pass' | 'fail' | 'inconclusive';

declare type KBData = KnowledgeBaseNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type KBFlowNode = Node_2<KBData, 'knowledge-base'>;

export declare const KIND_LABEL: Record<PipelineKind, string>;

export declare const KIND_MARK: Record<PipelineKind, FileKind>;

export declare const KIND_ORDER: PipelineKind[];

export declare const KIND_WORK_TYPE: Record<PipelineKind, WorkType>;

export declare function KnowledgeBaseNode({ id, data, selected }: NodeProps<KBFlowNode>): JSX.Element;

declare interface KnowledgeBaseNodeData {
    type: 'knowledge-base';
    knowledgeBaseId: string;
    queryTemplate: string;
    topK: number;
    scoreThreshold?: number;
    outputKey?: string;
    retryPolicy?: RetryPolicy;
}

declare type LLMData = LLMNodeData & {
    _state?: NodeExecutionState;
    _llmResponse?: LLMResponseInfo;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type LLMFlowNode = Node_2<LLMData, 'llm'>;

export declare function LLMNode(props: NodeProps<LLMFlowNode>): JSX.Element;

declare interface LLMNodeData {
    type: 'llm';
    provider: LLMProvider;
    /** Model identifier, e.g. 'claude-sonnet-4-6'. */
    model: string;
    systemPrompt: string;
    /** Supports `{{context.foo}}` substitution. */
    userPromptTemplate: string;
    temperature?: number;
    maxTokens?: number;
    streaming: boolean;
    retryPolicy?: RetryPolicy;
}

declare type LLMProvider = 'anthropic' | 'bedrock' | 'claude-code';

declare interface LLMResponseInfo {
    response: string;
    tokensIn?: number;
    tokensOut?: number;
    /** True while tokens are actively arriving (tokensOut > 0 and step still running). */
    streaming?: boolean;
    /**
     * True between `pipeline.llm.stream.opened` and the first token. Distinct
     * from `streaming` — this is the open-but-no-tokens window and is the
     * visual signal that latency is being measured. Cleared as soon as the
     * first token lands.
     */
    streamOpening?: boolean;
}

/** Case-insensitive match on name, description, route and tags. */
export declare function matchesQuery(entry: PipelinesListEntry, query: string): boolean;

declare type McpToolData = McpToolNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type McpToolFlowNode = Node_2<McpToolData, 'mcp-tool'>;

export declare function McpToolNode({ id, data, selected }: NodeProps<McpToolFlowNode>): JSX.Element;

declare interface McpToolNodeData {
    type: 'mcp-tool';
    gatewayUrl: string;
    toolName: string;
    inputTemplate: string;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

declare type MemData = MemoryNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type MemFlowNode = Node_2<MemData, 'memory'>;

declare type MemoryMode = 'read' | 'write';

export declare function MemoryNode({ id, data, selected }: NodeProps<MemFlowNode>): JSX.Element;

declare interface MemoryNodeData {
    type: 'memory';
    mode: MemoryMode;
    scope: MemoryScope;
    namespace: string;
    keyExpression: string;
    valueField?: string;
    outputKey?: string;
}

declare type MemoryScope = 'session' | 'long-term';

/** Why the run page offers no retry or resume for a model sign-in failure. */
export declare const MODEL_AUTH_NOT_RETRYABLE = "The model could not sign in \u2014 its credentials are missing or expired. Retrying fails the same way until an operator refreshes them; then start the run again.";

/** One selectable model. `value` is what gets written to the node's data. */
declare interface ModelOption {
    value: string;
    label?: string;
}

/**
 * Category assignment for every node type registered in `nodeTypes`
 * (see ./index.ts). Keys are the exact React Flow type strings.
 */
export declare const NODE_CATEGORIES: Record<string, NodeCategory>;

/**
 * Node types with no settings UI. Exported so a palette or canvas can say so up
 * front rather than letting the author find out after placing the node.
 */
export declare const NODE_TYPES_WITHOUT_CONFIG: readonly NodeType[];

export declare type NodeCategory = 'source' | 'transform' | 'ai' | 'control' | 'sink' | 'human';

export declare function NodeConfigShell({ children, className }: NodeConfigShellProps): JSX.Element;

declare interface NodeConfigShellProps {
    children: ReactNode;
    className?: string;
}

declare type NodeData = TriggerNodeData | LLMNodeData | TransformNodeData | ConditionNodeData | ActionNodeData | ForkNodeData | JoinNodeData | ApprovalNodeData | AgentNodeData | GuardrailNodeData | McpToolNodeData | KnowledgeBaseNodeData | GraphQueryNodeData | MemoryNodeData | PolicyNodeData | AgUiOutputNodeData | ImageSourceNodeData | ImageSaveNodeData | ScatterNodeData | ImageResizeNodeData | ImageTransformNodeData | ImageFormatConvertNodeData | ImageSharpenNodeData | ImageWatermarkNodeData | ImageCropNodeData | ImageAdjustBwNodeData | ImageAdjustLayerNodeData | ImageDimensionsNodeData | ImageUpscaleNodeData | ImageVisionAnalyzeNodeData | ImageVisionClassifyNodeData | ImageVisionDescribeNodeData | ImageVisionTagNodeData | ImageVisionExtractTextNodeData | ImageGenerateNodeData | ImageVariationNodeData | ImageEditPromptNodeData;

export declare type NodeExecutionState = 'idle' | 'pending' | 'running' | 'awaiting' | 'completed' | 'failed' | 'skipped';

export declare function NodePalette({ disabledTypes, contextTypes, serverKinds, }: NodePaletteProps): JSX.Element;

export declare interface NodePaletteProps {
    /** Types that already exist once and cannot be added again (e.g. Trigger). */
    disabledTypes?: NodeType[];
    /**
     * The kinds in the pipeline currently open. When given, the pinned top
     * section becomes "Relevant here" — computed from THIS pipeline — instead of
     * the global recently-used list, which is shared across every pipeline and so
     * offered a document review pipeline the image nodes last touched somewhere
     * else. Omit it and the recents behaviour is unchanged.
     */
    contextTypes?: readonly string[];
    /**
     * Step kinds the SERVER can execute that are not built-in node types —
     * `transcript:store`, `media:classify`, and the other ~50 platform-api
     * registers. The palette's own catalog is the library's types only, so
     * without these it lists mostly things a document or transcript pipeline
     * never uses while omitting everything it is actually built from.
     *
     * Grouped into one section per namespace, after the built-in categories.
     */
    serverKinds?: readonly string[];
}

export declare function NodeThumbStrip({ images, max, 'data-testid': testId, }: NodeThumbStripProps): JSX.Element | null;

export declare interface NodeThumbStripImage {
    imageId: string;
    alt?: string;
}

export declare interface NodeThumbStripProps {
    images: NodeThumbStripImage[];
    /** Maximum tiles in the row (including the "+N" tile). Default 4. */
    max?: number;
    'data-testid'?: string;
}

declare type NodeType = 'trigger' | 'llm' | 'transform' | 'condition' | 'action' | 'fork' | 'join' | 'approval' | 'agent' | 'mcp-tool' | 'knowledge-base' | 'graph-query' | 'memory' | 'guardrail' | 'policy' | 'ag-ui-output' | 'image-source' | 'image:save' | 'scatter' | 'image:resize' | 'image:transform' | 'image:format-convert' | 'image:sharpen' | 'image:watermark' | 'image:crop' | 'image:adjust-bw' | 'image:adjust-layer' | 'image:dimensions' | 'image:upscale' | 'image:vision-analyze' | 'image:vision-classify' | 'image:vision-describe' | 'image:vision-tag' | 'image:vision-extract-text' | 'image:generate' | 'image:variation' | 'image:edit-prompt';

export declare const nodeTypes: {
    readonly trigger: typeof TriggerNode;
    readonly llm: typeof LLMNode;
    readonly transform: typeof TransformNode;
    readonly condition: typeof ConditionNode;
    readonly action: typeof ActionNode;
    readonly fork: typeof ForkNode;
    readonly join: typeof JoinNode;
    readonly approval: typeof ApprovalNode;
    readonly agent: typeof AgentNode;
    readonly 'mcp-tool': typeof McpToolNode;
    readonly 'knowledge-base': typeof KnowledgeBaseNode;
    readonly 'graph-query': typeof GraphQueryNode;
    readonly memory: typeof MemoryNode;
    readonly guardrail: typeof GuardrailNode;
    readonly policy: typeof PolicyNode;
    readonly 'ag-ui-output': typeof AgUiOutputNode;
    readonly 'image-source': typeof ImageSourceNode;
    readonly 'image:save': typeof SaveNode;
    readonly scatter: typeof ScatterNode;
    readonly 'image:resize': typeof ResizeNode;
    readonly 'image:transform': typeof TransformGeoNode;
    readonly 'image:format-convert': typeof FormatConvertNode;
    readonly 'image:sharpen': typeof SharpenNode;
    readonly 'image:watermark': typeof WatermarkNode;
    readonly 'image:crop': typeof CropNode;
    readonly 'image:adjust-bw': typeof AdjustBwNode;
    readonly 'image:adjust-layer': typeof AdjustLayerNode;
    readonly 'image:dimensions': typeof DimensionsNode;
    readonly 'image:upscale': typeof UpscaleNode;
    readonly 'image:vision-analyze': typeof VisionNode;
    readonly 'image:vision-classify': typeof VisionClassifyNode;
    readonly 'image:vision-describe': typeof VisionDescribeNode;
    readonly 'image:vision-tag': typeof VisionTagNode;
    readonly 'image:vision-extract-text': typeof VisionExtractTextNode;
    readonly 'image:generate': typeof GenerateNode;
    readonly 'image:variation': typeof VariationNode;
    readonly 'image:edit-prompt': typeof EditPromptNode;
};

/** Per-node-type overrides for config-field wording. */
declare interface NodeVocabulary {
    /** Field key -> visible label. */
    labels?: Record<string, string>;
    /** Field key -> help text shown under the control. */
    help?: Record<string, string>;
    /** Field key -> input placeholder. */
    placeholders?: Record<string, string>;
}

/**
 * Compact 2-column list of detected objects with bbox preview chips.
 */
export declare function ObjectsPanel({ objects, onSelect, className }: ObjectsPanelProps): JSX.Element | null;

export declare interface ObjectsPanelProps {
    objects: VisionObject[];
    onSelect?: (object: VisionObject) => void;
    className?: string;
}

export declare const PALETTE_ITEMS: ReadonlyArray<{
    type: NodeType;
    name: string;
}>;

export declare interface PaletteItem {
    type: NodeType;
    icon: string;
    name: string;
    description: string;
    /** Category key, used for filter chip matching. */
    category: string;
    /** Node-category key from NODE_CATEGORIES (drives the accent color). */
    nodeCategory?: NodeCategory;
}

/**
 * hub#2226 — single entry in `StepExecution.patches`. Mirrors the
 * distributed-core `PatchEntry` shape but stays decoupled from the
 * type pin (consumers care about `patchId`, `appliedAt`, `revertedAt`,
 * `unvalidated`; `beforeContext`/`patch` are optional bookkeeping the
 * frontend doesn't need today).
 */
declare interface PatchEntry {
    patchId: string;
    appliedAt: string;
    appliedBy?: string;
    /** Mirror of `ContextPatch['mode']`. */
    mode?: 'merge' | 'jsonPatch';
    /** Set on a successful revert. */
    revertedAt?: string;
    /** True when no validator was registered for the paused step's node type. */
    unvalidated?: boolean;
}

export declare function PendingApprovalsPage(): JSX.Element;

/**
 * Per-person detail rows.
 */
export declare function PeoplePanel({ people, highlightedIndex, onSelect, className }: PeoplePanelProps): JSX.Element | null;

export declare interface PeoplePanelProps {
    people: VisionPerson[];
    /** Highlight a specific person (from a click on the image overlay). */
    highlightedIndex?: number;
    onSelect?: (person: VisionPerson) => void;
    className?: string;
}

/** What `statusPillFor` returns — spread it straight into a `StatusPill`. */
export declare interface PillSpec {
    tone: StatusPillTone;
    label: string;
    meta?: string;
}

export declare function PipelineCanvas({ onFilterLog, errorNodeId, onErrorNodePosition, replayEdgeStates, replayNodeClasses, breakpoints, onToggleBreakpoint, pausedAtNodeId }?: PipelineCanvasProps): JSX.Element;

export declare interface PipelineCanvasProps {
    onFilterLog?: (nodeId: string) => void;
    errorNodeId?: string | null;
    onErrorNodePosition?: (pos: {
        x: number;
        y: number;
    } | null) => void;
    replayEdgeStates?: Record<string, string>;
    replayNodeClasses?: Record<string, string>;
    breakpoints?: Set<string>;
    onToggleBreakpoint?: (nodeId: string) => void;
    pausedAtNodeId?: string | null;
}

declare interface PipelineDefinition {
    id: string;
    name: string;
    description?: string;
    /** Free-form labels for filtering / grouping in the list view. Stored normalized (lowercase, trimmed). */
    tags?: string[];
    icon?: string;
    /** Bumped on each save. */
    version: number;
    status: PipelineStatus;
    /** Snapshot of `version` at last publish; runs trigger on this version. */
    publishedVersion?: number;
    /**
     * Deep clone of the definition as it existed at the last `publishPipeline`
     * call (minus this field, to avoid recursion). Enables the VersionDiffModal
     * to show real per-node/edge differences between the current draft and the
     * last-published state. Populated by `publishPipeline`.
     */
    publishedSnapshot?: Omit<PipelineDefinition, 'publishedSnapshot'>;
    /** Cached for fast lookup by trigger dispatch. */
    triggerBinding?: TriggerBinding;
    nodes: PipelineNode[];
    edges: PipelineEdge[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export declare type PipelineDefinitionStatus = 'draft' | 'published' | 'archived';

declare interface PipelineEdge {
    id: string;
    source: string;
    /** 'out', 'true'/'false', 'branch-N', 'approved'/'rejected', 'error'. */
    sourceHandle: string;
    target: string;
    /** 'in' or 'in-N' for Join. */
    targetHandle: string;
}

export declare const PipelineEditorContext: default_2.Context<PipelineEditorValue | null>;

export declare function PipelineEditorPage(): JSX.Element;

export declare function PipelineEditorProvider({ pipelineId, children, }: PipelineEditorProviderProps): default_2.JSX.Element;

export declare interface PipelineEditorProviderProps {
    pipelineId: string;
    children: default_2.ReactNode;
}

export declare interface PipelineEditorServices {
    /**
     * Resolve an imageId to a browser-loadable URL. Used by every node body
     * that renders `<img src=...>` for a produced image (crop, adjust, save,
     * generate, etc.). The host is responsible for any auth wrangling — the
     * URL must work with a bare `<img>` tag (cookie session, signed URL,
     * permissive route, etc.).
     */
    getImageUrl(imageId: string): string;
    /**
     * Optional upload helper used by image-source / image picker primitives.
     * Hosts that mount an upload UI implement this against their backend.
     * Nodes that just render produced images do NOT need this method.
     */
    uploadImage?(input: File | {
        url: string;
    }): Promise<PipelineUploadedImage>;
    /**
     * Node types this host's executor can actually run.
     *
     * The palette ships more node types than any given backend implements — a
     * survey against platform-api found 11 of 37 with no discoverable handler
     * (agent, approval, policy, guardrail, graph-query, ag-ui-output, mcp-tool,
     * knowledge-base, and the control-flow trio). An author could drag one on,
     * wire it up, and get a pipeline that silently never runs that step.
     *
     * The library deliberately does NOT hardcode this: which types execute is a
     * property of the HOST's deployment, not of the component library, and
     * baking in a guess would go stale the moment a handler ships. Declare the
     * set here and the palette marks everything else as preview.
     *
     * Omit it entirely and nothing is marked — the pre-2.44 behaviour, for hosts
     * that haven't wired this up yet.
     */
    executableNodeTypes?: readonly string[];
    /**
     * Host-supplied vocabulary for node config fields, keyed by node type.
     *
     * The library ships VENDOR-NEUTRAL copy: a retrieval node asks for a
     * "Knowledge base ID", a graph node asks for a "Graph ID" and a "Graph
     * query". It deliberately does not say "Bedrock" or "Neptune" or
     * "openCypher", for the same reason it does not hardcode
     * `executableNodeTypes`: which backend stands behind a node type is a
     * property of the HOST's deployment, not of the component library. Baking a
     * vendor's name into a shared primitive makes the library wrong for every
     * host that uses a different one, and it cannot be corrected without a
     * breaking change to a frozen surface.
     *
     * A host that IS running a specific backend supplies its own words here and
     * gets the vendor-accurate UI it wants:
     *
     * ```ts
     * nodeVocabulary: {
     *   'knowledge-base': {
     *     labels: { knowledgeBaseId: 'Bedrock KB ID' },
     *     help: { knowledgeBaseId: 'The Bedrock Knowledge Base to retrieve from.' },
     *     placeholders: { knowledgeBaseId: 'kb-3f9c1a2b' },
     *   },
     *   'graph-query': { labels: { query: 'openCypher query' } },
     * }
     * ```
     *
     * Omit it and every field keeps its neutral wording.
     */
    nodeVocabulary?: Record<string, NodeVocabulary>;
    /**
     * Host-supplied model choices, keyed by model GROUP.
     *
     * The library ships a small default list per group so the editor is usable
     * out of the box, but a hardcoded list is wrong the moment a host runs a
     * different backend — or the same backend a version later. Which models a
     * deployment can actually call is a property of the HOST, exactly like
     * `executableNodeTypes` and `nodeVocabulary`.
     *
     * Group names the library asks for:
     *   - `image:generate`  — image generation models
     *   - `llm:<provider>`  — chat models for an LLM node's selected provider,
     *                         e.g. `llm:anthropic`, `llm:bedrock`
     *
     * Supplying a group REPLACES the default list for it; groups you omit keep
     * their defaults, so a host can override one without restating the rest.
     */
    modelOptions?: Record<string, readonly ModelOption[]>;
    /**
     * Whether this deployment has an inbound webhook relay that actually starts
     * runs — and where its public origin is.
     *
     * ADDITIVE and **defaults to disabled**, which is the honest default: the
     * library ships the trigger UI, not the relay. The `/hooks/pipeline/:path`
     * route on the reference backend logs the delivery and answers 202; the
     * bridge that would forward it onto the pipeline event source is not wired,
     * so `useWebhookTriggers` is a dormant subscriber and a correctly-signed
     * POST runs nothing. The editor nonetheless rendered an invokable-looking
     * URL, a Copy button, and a reveal/copy pair for the signing secret —
     * everything an integrator needs to build against an endpoint that is
     * silently inert, and to blame their own HMAC when nothing happens.
     *
     * Declare `{ enabled: true }` once your host forwards those deliveries; the
     * panel then offers the URL and secret as before. Until then it says the
     * endpoint is not active and withholds the copy affordances.
     */
    webhookRelay?: WebhookRelayStatus;
}

export declare function PipelineEditorServicesProvider({ services, children, }: {
    services: PipelineEditorServices;
    children: ReactNode;
}): JSX.Element;

export declare interface PipelineEditorValue {
    definition: PipelineDefinition | null;
    dirty: boolean;
    selectedNodeId: string | null;
    setSelectedNodeId: (id: string | null) => void;
    addNode: (type: NodeType, position: {
        x: number;
        y: number;
    }) => string;
    updateNode: (id: string, patch: Partial<PipelineNode>) => void;
    updateNodeData: (id: string, patch: Partial<NodeData>) => void;
    removeNode: (id: string) => void;
    duplicateNodes: (ids: string[]) => string[];
    addEdge: (edge: Omit<PipelineEdge, 'id'>) => string;
    removeEdge: (id: string) => void;
    setPositions: (updates: Array<{
        id: string;
        position: {
            x: number;
            y: number;
        };
    }>) => void;
    save: () => void;
    publish: () => void;
    revert: () => void;
    /**
     * Reason the most recent remote persist failed, or `null` when the last
     * write succeeded. Additive — a rejected `savePipeline` used to be an
     * unhandled promise rejection with no user-visible trace, so the editor
     * showed "Saving…" forever while the server had refused the write.
     * `dirty` stays set while this is non-null: nothing is discarded, and the
     * next edit (or teardown) retries exactly once. Never retried on a timer —
     * a 403 would spin against the server forever.
     */
    saveError: string | null;
    /** Dismiss `saveError`. Does not clear `dirty` and does not retry. */
    clearSaveError: () => void;
    /**
     * Why the last `publish()` failed, or `null`. Additive (v2.95.0).
     *
     * `publish()` returns `void` and used to swallow its outcome entirely, so
     * `PipelineEditorPage` fired an unconditional green "Pipeline published"
     * toast — including when the POST never landed and the pipeline was still
     * a draft. A caller cannot act on an outcome it is never told about.
     */
    publishError: string | null;
    /** Dismiss `publishError`. Additive (v2.95.0). */
    clearPublishError: () => void;
    /**
     * ISO timestamp of the last SUCCESSFUL publish, or `null`. Changes on every
     * success so a caller can confirm one actually happened. Additive (v2.95.0).
     */
    publishedAt: string | null;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    /**
     * Rename the pipeline. Metadata-only mutation — not tracked by undo/redo
     * (consistent with the top-level contract that history covers nodes/edges).
     */
    rename: (name: string) => void;
    /** Set the pipeline icon (emoji). Metadata-only, not tracked by undo/redo. */
    setIcon: (icon: string) => void;
    /** Replace the pipeline's tag list. Metadata-only, not tracked by undo/redo. */
    setTags: (tags: string[]) => void;
}

declare type PipelineEventMap = {
    'pipeline.run.started': {
        runId: string;
        pipelineId: string;
        triggeredBy: PipelineRunTrigger;
        at: string;
    };
    'pipeline.run.completed': {
        runId: string;
        durationMs: number;
        at: string;
    };
    'pipeline.run.failed': {
        runId: string;
        error: PipelineRunError;
        at: string;
    };
    'pipeline.run.cancelled': {
        runId: string;
        at: string;
    };
    'pipeline.run.orphaned': {
        runId: string;
        previousOwner: string;
        at: string;
    };
    'pipeline.run.reassigned': {
        runId: string;
        from: string;
        to: string;
        at: string;
    };
    'pipeline.step.started': {
        runId: string;
        stepId: string;
        nodeType: NodeType;
        at: string;
    };
    'pipeline.step.completed': {
        runId: string;
        stepId: string;
        durationMs: number;
        output?: unknown;
        at: string;
    };
    'pipeline.step.failed': {
        runId: string;
        stepId: string;
        error: string;
        at: string;
    };
    'pipeline.step.skipped': {
        runId: string;
        stepId: string;
        reason: string;
        at: string;
    };
    'pipeline.step.cancelled': {
        runId: string;
        stepId: string;
        at: string;
    };
    'pipeline.step.breakpoint': {
        runId: string;
        stepId: string;
        at: string;
    };
    /** Patch was applied AND validated by a registered ContextValidator. */
    'pipeline.step.context.patched': {
        runId: string;
        stepId: string;
        patchId: string;
        /** Mirror of `ContextPatch['mode']`. */
        mode: 'merge' | 'jsonPatch';
        at: string;
    };
    /** Patch was applied but no validator was registered for this step's node type. */
    'pipeline.step.context.patched-unvalidated': {
        runId: string;
        stepId: string;
        patchId: string;
        mode: 'merge' | 'jsonPatch';
        at: string;
    };
    /** A previously-applied patch was reverted while still paused at the same step. */
    'pipeline.step.context.patch-reverted': {
        runId: string;
        stepId: string;
        patchId: string;
        at: string;
    };
    'pipeline.llm.prompt': {
        runId: string;
        stepId: string;
        model: string;
        prompt: string;
        at: string;
    };
    'pipeline.llm.stream.opened': {
        runId: string;
        stepId: string;
        model: string;
        openedAt: string;
    };
    'pipeline.llm.token': {
        runId: string;
        stepId: string;
        token: string;
        at: string;
    };
    'pipeline.llm.response': {
        runId: string;
        stepId: string;
        response: string;
        tokensIn: number;
        tokensOut: number;
        at: string;
    };
    'pipeline.approval.requested': {
        runId: string;
        stepId: string;
        approvers: ApprovalNodeData['approvers'];
        at: string;
    };
    'pipeline.approval.recorded': {
        runId: string;
        stepId: string;
        userId: string;
        decision: 'approve' | 'reject';
        at: string;
    };
    'pipeline.run.paused': {
        runId: string;
        atStepIds: string[];
        at: string;
    };
    'pipeline.run.resumed': {
        runId: string;
        at: string;
    };
    /**
     * hub#2223: emitted by the executor when a previously-failed run is
     * restarted from `fromNodeId` via `PipelineModule.resumeFromStep`. The
     * canonical wire name is `pipeline:run:resumed-from-step` (DC source);
     * after the gateway's `:` → `.` mapping that becomes
     * `pipeline.run.resumed-from-step`. The legacy alias
     * `pipeline.run.resumeFromStep` (camelCase) was a placeholder for the
     * pre-producer Phase 5 stub and has no producer; the past-tense kebab
     * form is the one consumers should key on.
     */
    'pipeline.run.resumed-from-step': {
        runId: string;
        fromNodeId: string;
        /** The stepId that originally failed and triggered this resumption, if known. */
        originalFailedStepId?: string;
        at: string;
    };
    /**
     * Canonical colon-form request event emitted by the gateway's local fallback
     * when no PipelineModule is wired. Wire name: `pipeline:run:resumeFromStep`.
     * The past-tense `pipeline.run.resumed-from-step` (DC-sourced) is the
     * producer-backed form; this key covers the gateway-local stub path.
     */
    'pipeline:run:resumeFromStep': {
        runId: string;
        fromNodeId: string;
        at: string;
    };
    'pipeline.run.retry': {
        newRunId: string;
        previousRunId: string;
        at: string;
    };
    'pipeline.webhook.triggered': {
        webhookPath: string;
        body: unknown;
        headers: Record<string, string>;
        at: string;
    };
    'pipeline.join.waiting': {
        runId: string;
        stepId: string;
        received: number;
        required: number;
        at: string;
    };
    'pipeline.join.fired': {
        runId: string;
        stepId: string;
        inputs: string[];
        at: string;
    };
};

export declare interface PipelineImageVisionCompletedPayload {
    runId: string;
    stepId: string;
    result: VisionResult;
    at?: number;
}

export declare interface PipelineImageVisionFailedPayload {
    runId: string;
    stepId: string;
    error: string;
    at?: number;
}

/**
 * Wire-event payload contract for the vision-step events the platform-api
 * `image:vision-analyze` handler emits. Mirrors the `event-catalog`
 * declarations (see platform-api/src/types/image-pipeline.ts).
 *
 * We use a permissive shape so this hook stays useful even if the catalog
 * adds optional fields. The hook only requires `runId`, `stepId`, and on
 * completed events, the `result` payload.
 */
export declare interface PipelineImageVisionStartedPayload {
    runId: string;
    stepId: string;
    endpointId?: string;
    at?: number;
}

export declare interface PipelineJudgeBudgetExceededPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    at?: number | string;
}

export declare interface PipelineJudgeFailedPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    reason: JudgeFailureReason;
    error: string;
    costUsd?: number;
    latencyMs?: number;
    tokensIn?: number;
    tokensOut?: number;
    at?: number | string;
}

export declare interface PipelineJudgeScoredPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    judgmentId?: string;
    rubricId?: string;
    judgeModel?: string;
    result: JudgmentResult;
    costUsd?: number;
    latencyMs?: number;
    usage?: {
        inputTokens?: number;
        outputTokens?: number;
    };
    at?: number | string;
}

/**
 * Wire-event payload contract for the four `pipeline.judge.*` events. The
 * gateway delivers colon-form (`pipeline:judge:scored`) over the WS bus;
 * the EventStreamContext normalizes to dot-form (`pipeline.judge.scored`)
 * before delivery, matching the existing vision-hook convention.
 *
 * Permissive shapes — only the required envelope fields are typed; the
 * payload otherwise matches platform-api's JudgeStepHandler emits +
 * event-catalog's pipeline-judge schema.
 */
export declare interface PipelineJudgeStartedPayload {
    runId: string;
    stepId: string;
    pipelineId?: string;
    rubricId?: string;
    judgeModel?: string;
    at?: number | string;
}

export declare type PipelineKind = 'document' | 'presentation' | 'diagram' | 'agent' | 'experiment' | 'recording' | 'call' | 'conversation' | 'media' | 'workflow';

declare interface PipelineNode {
    id: string;
    type: NodeType;
    position: {
        x: number;
        y: number;
    };
    /** Discriminated union keyed on `data.type`. */
    data: NodeData;
}

/**
 * Mount around any subtree containing ui-components pipeline nodes to feed
 * them live run state from a host-owned store, without mounting the bundled
 * `PipelineRunsProvider` (and its WebSocketProvider / social-api stack).
 */
export declare function PipelineNodeRuntimeProvider({ value, children, }: PipelineNodeRuntimeProviderProps): default_2.JSX.Element;

export declare interface PipelineNodeRuntimeProviderProps {
    value: PipelineNodeRuntimeValue;
    children: ReactNode;
}

/**
 * Value the host supplies to drive node-level live state.
 */
export declare interface PipelineNodeRuntimeValue {
    /**
     * Resolve the most recent `StepExecution` observed for a node, or null when
     * the node has never run. MUST be re-created (new identity) whenever the
     * host's runs store changes — consumers memoize on this function's identity.
     */
    getLatestStepForNode: (nodeId: string) => StepExecution | null;
    /**
     * Optional retry handler. When provided, `useRetryFromStep()` returns a
     * wrapper around this instead of the bundled retry path. May be sync or
     * async; the hook normalizes the return to a Promise.
     */
    retryFromStep?: (nodeId: string) => void | Promise<void>;
    /**
     * Headers that authenticate a node panel's own request to the host's API
     * (e.g. `{ Authorization: 'Bearer …' }`), read at request time so a
     * refreshed token is used. Panels that call a protected route — the
     * adjust-layer preview — send these; without them the route answers 401.
     */
    authHeaders?: () => Record<string, string>;
}

declare interface PipelineRun {
    id: string;
    pipelineId: string;
    pipelineVersion: number;
    status: RunStatus;
    triggeredBy: PipelineRunTrigger;
    /** Distributed-core ResourceRouter owner. */
    ownerNodeId: string;
    startedAt: string;
    completedAt?: string;
    durationMs?: number;
    /** Active frontier — can be > 1 with Fork. */
    currentStepIds: string[];
    steps: Record<string, StepExecution>;
    /** Accumulated as the run progresses. */
    context: Record<string, unknown>;
    error?: PipelineRunError;
    /** Per-model token usage accumulated during the run. */
    tokenUsage?: Record<string, TokenUsageByModel>;
    /** Estimated total cost in USD for this run. */
    estimatedCostUsd?: number;
    /** ISO timestamp set by StuckRunDetector when the run hasn't emitted events past the threshold. */
    stuckAt?: string;
    /**
     * hub#2223: monotonic count of `resumeFromStep` invocations against this
     * run. Defaults to undefined / 0 on a fresh run; the executor increments
     * it each time the run is restarted from a specific step. Surfaces in the
     * run-detail page so operators can see at a glance that a run was replayed.
     */
    replayAttempts?: number;
    /**
     * hub#2223: history of resume-from-step invocations on this run. Populated
     * by the `pipeline:run:resumed-from-step` event handler in
     * PipelineRunsContext so the run-detail banner can render an at-a-glance
     * timeline of replays.
     */
    resumeHistory?: ResumeFromStepEntry[];
}

declare interface PipelineRunError {
    nodeId: string;
    message: string;
    stack?: string;
    errorCategory?: ErrorCategory;
    retryability?: ErrorRetryability;
}

/** A run's terminal or in-flight state, as the platform's run list names them. */
export declare type PipelineRunItemStatus = 'running' | 'awaiting_approval' | 'completed' | 'failed' | 'cancelled' | 'interrupted' | 'rejected' | 'stuck';

export declare function PipelineRunReplayPage(): default_2.JSX.Element;

/** The last-run read model: one row per pipeline, kept fresh by run events. */
export declare interface PipelineRunRollup {
    pipelineId: string;
    lastRunId: string;
    /** `startedAt` of the newest run. Empty string on the "no runs yet" sentinel. */
    lastRunAt: string;
    lastRunStatus: PipelineRunItemStatus;
    /** Newest first, at most five. */
    recent: Array<{
        runId: string;
        status: PipelineRunItemStatus;
        startedAt: string;
        completedAt?: string;
    }>;
    /** `recent` rows that failed, were interrupted or stuck. */
    failedOfRecent: number;
    /** `recent` rows still running or awaiting approval. */
    runningCount: number;
    updatedAt: string;
}

export declare function PipelineRunsPage(): JSX.Element;

export declare function PipelineRunsProvider({ children }: PipelineRunsProviderProps): default_2.JSX.Element;

export declare interface PipelineRunsProviderProps {
    children: default_2.ReactNode;
}

declare interface PipelineRunsValue {
    runs: Record<string, PipelineRun>;
    activeRunIds: string[];
    triggerRun: (pipelineId: string, payload?: Record<string, unknown>) => Promise<string>;
    /**
     * Trigger a run with debug breakpoints. Passes `breakpoints` as node IDs
     * where execution should pause for inspection before proceeding.
     */
    triggerDebugRun: (pipelineId: string, breakpoints: string[], payload?: Record<string, unknown>) => Promise<string>;
    cancelRun: (runId: string) => void;
    resolveApproval: (runId: string, stepId: string, decision: 'approve' | 'reject', comment?: string) => void;
    /**
     * Resolve a debug breakpoint, resuming execution from the paused node.
     * @param action  — 'continue' resumes to the next breakpoint;
     *                  'resume_all' ignores all remaining breakpoints
     */
    resolveBreakpoint: (runId: string, stepId: string, action?: 'continue' | 'resume_all') => void;
    /**
     * hub#2226 — edit-and-continue: apply a paused-context patch via
     * social-api. Resolves the executor's `PatchResult` (`{ patchId, before,
     * after, validation }`); on a 422 the resolved value's
     * `validation.ok === false` and the caller can show the rejection reason.
     * Throws on non-2xx/422 transport / 404 / 409 errors.
     */
    applyContextPatch: (runId: string, stepId: string, patch: {
        mode: 'merge';
        values: Record<string, unknown>;
    }, appliedBy?: string) => Promise<{
        patchId: string;
        before: Record<string, unknown>;
        after: Record<string, unknown>;
        validation: {
            ok: true;
        } | {
            ok: false;
            reason: string;
        };
    }>;
    /**
     * hub#2226 — revert a paused-context patch by id. Throws if the run has
     * already resumed past `pausedAtNodeId` (server returns 409).
     */
    revertContextPatch: (runId: string, stepId: string, patchId: string) => Promise<void>;
    /**
     * Retry the most recent failed run from a specific step (per §18.4.4 / §17.6).
     * Finds the newest run that contained `nodeId` AND ended in `failed` AND had
     * `nodeId` itself fail; calls the backend retry-from-node API to spawn a new
     * run that resumes traversal at `nodeId` and skips upstream nodes.
     *
     * Always resolves — never rejects. When no eligible run is found, or the
     * API refuses, the reason lands on `retryError` (below) rather than in the
     * returned promise.
     */
    retryFromStep: (nodeId: string) => Promise<void>;
    /**
     * Why the most recent `retryFromStep` did not start a run, or `null` when
     * the last attempt succeeded (or none has been made). Additive field.
     *
     * `retryFromStep` is frozen at `Promise<void>` and deliberately still
     * resolves on failure — making it reject would break every existing
     * `onClick={() => retryFromStep(id)}` call site with an unhandled
     * rejection. Until this field existed, both failure modes (the API
     * rejecting, and no eligible failed run being found) were a `console`
     * line and nothing else: the user clicked "Retry from here" and the UI
     * did not move, which is indistinguishable from a retry that silently
     * worked. `reason` separates the two so a host can word them differently.
     */
    retryError: {
        nodeId: string;
        message: string;
        reason: 'no-failed-run' | 'request-failed';
    } | null;
    /** Dismiss `retryError`. Also cleared automatically by the next retry. */
    clearRetryError: () => void;
    /**
     * Merge a polled PipelineRun into the in-memory runs map. Used by the
     * poll-based live status visualizer to inject fresh run data fetched from
     * the API. Safe to call repeatedly — newer step data wins.
     */
    ingestRun: (run: PipelineRun) => void;
}

declare interface PipelineRunTrigger {
    userId?: string;
    triggerType: string;
    payload: Record<string, unknown>;
}

export declare type PipelinesGroupBy = 'worktype' | 'status' | 'kind' | 'none';

/** One pipeline as the directory lists it. */
export declare interface PipelinesListEntry {
    id: string;
    name: string;
    description?: string;
    /** Short step labels in order: `['/doc', 'Read', 'Plan', 'Approval', 'Suggestions']`. */
    route?: string[];
    kind?: PipelineKind;
    workType?: WorkType;
    status: PipelineDefinitionStatus;
    /** A system pipeline the reader cannot edit. */
    readOnly?: boolean;
    rollup?: PipelineRunRollup | null;
    updatedAt?: string;
    tags?: string[];
}

export declare function PipelinesListView({ entries, loading, error, onRetry, query, onQueryChange, searchPlaceholder, groupBy, onGroupByChange, filters, activeFilterCount, onClearFilters, title, count, headerMenu, onTemplates, onStartBlank, headerActions, currentId, onOpen, onRun, onViewRun, rowMenu, rowTrailing, storageKey, emptyState, footer, now, frame, className, 'data-testid': testId, }: PipelinesListViewProps): JSX.Element;

export declare interface PipelinesListViewProps {
    entries: PipelinesListEntry[];
    /** The list is being fetched for the first time. */
    loading?: boolean;
    /** The fetch failed; shown as a banner above whatever is cached. */
    error?: string | null;
    onRetry?: () => void;
    /** Free-text search, applied by the view (`matchesQuery`). */
    query: string;
    onQueryChange: (query: string) => void;
    /** Search placeholder. Default "Search pipelines…". */
    searchPlaceholder?: string;
    groupBy: PipelinesGroupBy;
    onGroupByChange: (groupBy: PipelinesGroupBy) => void;
    /** The filter controls inside the Filter popover — `FilterChip` groups. */
    filters?: ReactNode;
    /** How many filters are narrowing the list; drives the badge on the button. */
    activeFilterCount?: number;
    onClearFilters?: () => void;
    /** Page title. Default "Pipelines". */
    title?: string;
    /** The count chip beside the title. Default: the number of entries shown. */
    count?: number;
    /** The header's ⋯ menu — Metrics, Dead letters, All runs, Import JSON. */
    headerMenu?: DropdownMenuSection[];
    onTemplates?: () => void;
    onStartBlank?: () => void;
    /** Extra header actions, after the built-in ones. */
    headerActions?: ReactNode;
    /** The row the reader is "at" — last opened, just created. Tinted. */
    currentId?: string | null;
    onOpen: (entry: PipelinesListEntry) => void;
    /** Shows a run button in the row's hover actions on published pipelines. */
    onRun?: (entry: PipelinesListEntry) => void;
    /** Shows "View run" on a row whose last run failed (or partly failed). */
    onViewRun?: (entry: PipelinesListEntry, runId: string) => void;
    /** The row's ⋯ menu. */
    rowMenu?: (entry: PipelinesListEntry) => DropdownMenuSection[] | null | undefined;
    /** Extra always-visible trailing content per row. */
    rowTrailing?: (entry: PipelinesListEntry) => ReactNode;
    /** Remember collapsed groups under this `localStorage` key. */
    storageKey?: string;
    /** What an empty catalog says. */
    emptyState?: {
        title?: string;
        body?: string;
        actionLabel?: string;
        onAction?: () => void;
    };
    /** The docked composer. */
    footer?: ReactNode;
    /** A fixed clock for the pills' "· 29m ago" — tests and stories. Default `Date.now()`. */
    now?: number;
    /**
     * `card` draws the mockup's frame — a border and radius around the toolbar
     * and the groups together, the toolbar ruled off from the list. The header
     * and the docked composer stay outside it. Default `none`: the current look.
     */
    frame?: 'card' | 'none';
    className?: string;
    'data-testid'?: string;
}

export declare function PipelinesPage({ userId: userIdProp, idToken, baseUrl }?: PipelinesPageProps): JSX.Element;

declare interface PipelinesPageProps {
    /**
     * Author id for pipelines created from this page (demo pipeline, template
     * picks). Wins over this library's `useIdentityContext().userId`.
     * Defaults to the context's `userId` (or `''` when no `<IdentityProvider>`
     * is mounted) via the non-throwing `useOptionalIdentityContext`.
     */
    userId?: string;
    /** Bearer token for the trigger-run request. Wins over this library's `useIdentityContext().idToken`. */
    idToken?: string | null;
    /** Origin for the trigger-run request. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
    baseUrl?: string;
}

export declare function PipelineStatsPage(): JSX.Element;

declare type PipelineStatus = 'draft' | 'published' | 'archived';

export declare interface PipelineUploadedImage {
    imageId: string;
    width: number;
    height: number;
    mimeType: string;
    sizeBytes: number;
}

/**
 * Wire envelope that wraps every PipelineEventMap event as it crosses the
 * network boundary (mock adapter in Phase 1, WebSocket in Phase 4+). Carries
 * ordering metadata that lets the frontend dedupe replayed events after a
 * ResourceRouter-orphaned run is resumed on a new owner.
 */
declare interface PipelineWireEvent<K extends keyof PipelineEventMap = keyof PipelineEventMap> {
    eventType: K;
    payload: PipelineEventMap[K];
    /** Monotonic per-run sequence — starts at 0, increments on each emit. Stable across replays. */
    seq: number;
    /** Node id that emitted the event. For observability + debugging. */
    sourceNodeId: string;
    /** Wall-clock emission time (ms). Re-stamped on replay — NEVER use for dedupe. */
    emittedAt: number;
}

declare type PolicyData = PolicyNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type PolicyFlowNode = Node_2<PolicyData, 'policy'>;

export declare function PolicyNode({ id, data, selected }: NodeProps<PolicyFlowNode>): JSX.Element;

declare interface PolicyNodeData {
    type: 'policy';
    policyStoreId: string;
    principal: string;
    action: string;
    resource: string;
    contextEntities?: string;
    label?: string;
}

export declare const PORT_CLS: Record<PortPayload, string>;

export declare function portCls(payload: PortPayload): string;

export declare type PortPayload = 'image' | 'text' | 'data' | 'control' | 'error';

/**
 * Record that a node of `type` was added. Prepends to the ring buffer (max 5,
 * MRU order, no duplicates). Call this from the consumer's addNode handler.
 */
export declare function recordRecentType(type: NodeType): void;

/**
 * A run (or step) that was REFUSED — a step looked at the request and said
 * no — as opposed to one that broke. The platform spells a refusal
 * `<step> <code>: <reason>` (`deck-revise constraint-not-met: Title has 2
 * words; it must have exactly 0. …`) and classifies it `Refused`,
 * retryability `terminal` (platform `error-classification.ts`).
 *
 * A refusal is a decision about inputs the run already holds: the recorded
 * proposal, the requester, the base revision. Retrying or resuming re-runs
 * the same step over the same inputs and decides the same way, so the run
 * page offers neither; the person changes the ask and starts a new run. An
 * outage (model unavailable, timeout, network) stays retryable.
 */
export declare const REFUSAL_CODES: readonly ["constraint-not-met", "forbidden", "revision-conflict", "invalid-request"];

export declare type RefusalCode = (typeof REFUSAL_CODES)[number];

/** The refusal code in a failure message, or null: `403 Forbidden` mid-sentence is not one. */
export declare function refusalCodeOf(message: string | null | undefined): RefusalCode | null;

/** Why the run page offers no retry or resume for a refused run. */
export declare function refusalNotRetryableReason(refusal: RunRefusal): string;

/** "just now", "29m ago", "10h ago", "3d ago", else a short date. */
export declare function relativeAgo(iso: string | undefined, now?: number): string | undefined;

export declare function ResizeConfig({ data, onChange, nodeId }: ResizeConfigProps): JSX.Element;

declare interface ResizeConfigProps {
    data: ImageResizeNodeData;
    onChange: (patch: Partial<ImageResizeNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type ResizeData = ImageResizeNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type ResizeFit = 'cover' | 'contain' | 'fill' | 'inside' | 'outside';

declare type ResizeFlowNode = Node_2<ResizeData, 'image:resize'>;

export declare function ResizeNode(props: NodeProps<ResizeFlowNode>): JSX.Element;

/** A single resume-from-step entry on a PipelineRun (hub#2223). */
declare interface ResumeFromStepEntry {
    fromNodeId: string;
    /** The step that originally failed when this resumption was triggered, if known. */
    originalFailedStepId?: string;
    at: string;
}

declare interface RetryPolicy {
    maxAttempts: number;
    backoffMs: number;
    backoffMultiplier: number;
}

/** The route as one line: "/doc → Read → Plan → Approval → Suggestions". */
export declare function routeLine(route: string[] | undefined): string | undefined;

/**
 * A run that failed because the model could not sign in (the platform's
 * `ModelAuth`: missing or expired credentials). Terminal like a refusal —
 * retrying fails the same way — but nothing about the request was wrong.
 */
export declare function runModelAuth(run: Pick<PipelineRun, 'status' | 'error'> | null | undefined): boolean;

export declare interface RunRefusal {
    /** The code the step refused with; `refused` when the platform said Refused without a code we know. */
    code: RefusalCode | 'refused';
    /** The refusal, verbatim, as the step wrote it. */
    message: string;
    /** The step that refused, when known. */
    nodeId?: string;
}

/**
 * The refusal a failed run ended with, or null when it failed some other
 * way (or did not fail). Reads the platform's category first, then its
 * retryability, then the message — a row written before the category
 * existed still reads right.
 */
export declare function runRefusal(run: Pick<PipelineRun, 'status' | 'error'> | null | undefined): RunRefusal | null;

/**
 * The status vocabulary every UI comparison site keys off. Canonical — it
 * matches distributed-core's `RunStatus` and the backend's shared
 * `PipelineRunStatus`.
 *
 * Remaining gap: `interrupted` (platform-api's orphan scan / force-fail
 * outcome) is still not modelled here. It is spelled out on the wire union in
 * `pipeline-contracts.ts` instead, because it is a platform-api lifecycle
 * state the executor kernel never produces.
 */
declare type RunStatus = 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed'
/**
* Terminal: an approval gate on the run was rejected. Distinct from
* `completed` on purpose — a rejected run used to be listed as a success,
* which made approve and reject look identical in the Runs list.
*/
| 'rejected' | 'failed' | 'cancelled'
/**
* NOT terminal: the run is still open, it has just stopped reporting
* progress. `StuckRunDetector` in distributed-core watches every run in
* `running` / `awaiting_approval` and, after `intervalMs × stuckMultiplier`
* (30 s by default) with no `pipeline:step:heartbeat` and no
* `pipeline:llm:token`, publishes `pipeline:run:stuck` carrying the last
* heartbeat time (`StuckRunDetector.ts`, `scan()`). The kernel does not stop
* the run — it keeps executing and may still finish by itself — so this
* means "nobody has heard from this run", not "this run has ended".
* `PipelineRun.stuckAt` carries the timestamp.
*
* Terminal-ness matters here: the `completed` / `failed` / `cancelled` that
* eventually arrives has to be allowed to overwrite it, and a late heartbeat
* may simply resume progress. An operator who decides it will never recover
* uses force-fail, which moves the run to the platform-api-only
* `interrupted` state.
*
* NOTE for future editors: no straight quotes inside this comment. The
* `unionMembers` reader in `scripts/check-types-sync.mjs` scrapes quoted
* literals off the raw union text without stripping comments, so a quoted
* word here is read as a bogus `RunStatus` member. Backticks only.
*/
| 'stuck';

export declare function SamplePills({ samples, onSelect, 'aria-label': ariaLabel, className, }: SamplePillsProps): JSX.Element | null;

export declare interface SamplePillsProps {
    /** Suggestions to offer. Renders nothing when empty. */
    samples: readonly string[];
    onSelect: (value: string) => void;
    /** Accessible name for the group, e.g. "Upstream image refs". */
    'aria-label'?: string;
    className?: string;
}

export declare function SaveConfig({ data, onChange, nodeId }: SaveConfigProps): JSX.Element;

export declare interface SaveConfigProps {
    data: ImageSaveNodeData;
    onChange: (patch: Partial<ImageSaveNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type SaveData = ImageSaveNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type SaveFlowNode = Node_2<SaveData, 'image:save'>;

export declare function SaveNode(props: NodeProps<SaveFlowNode>): JSX.Element;

export declare function ScatterConfig({ data, onChange }: ScatterConfigProps): JSX.Element;

declare interface ScatterConfigProps {
    data: ScatterNodeData;
    onChange: (patch: Partial<ScatterNodeData>) => void;
}

declare type ScatterData = ScatterNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type ScatterFlowNode = Node_2<ScatterData, 'scatter'>;

export declare function ScatterNode(props: NodeProps<ScatterFlowNode>): JSX.Element;

declare interface ScatterNodeData {
    type: 'scatter';
    /**
     * JSONPath into pipeline context that resolves to an array. Each element
     * becomes one scatter arm. E.g. `$.steps.visionAnalyze.output.regions`.
     */
    itemsPath: string;
    /**
     * Key written to each per-arm context (default: 'item'). Downstream nodes
     * read `$.scatter.<itemAlias>` to get the per-arm payload.
     */
    itemAlias?: string;
    /**
     * Maximum number of arms executing concurrently (default: 4). Guards
     * against saturating Anthropic rate limits or the Sharp thread pool.
     */
    maxConcurrency?: number;
}

declare type ServerStepFlowNode = Node_2<ServerStepNodeData, string>;

export declare function ServerStepNode(props: NodeProps<ServerStepFlowNode>): JSX.Element;

declare interface ServerStepNodeData extends Record<string, unknown> {
    /** The consumer-registered kind, e.g. `transcription:transcribe`. */
    type?: string;
    /** The canvas's copy of the kind; read when `type` is absent. */
    nodeType?: string;
    label?: string;
    /** A step the executor may skip without failing the run. */
    optional?: boolean;
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
}

export declare function SharpenConfig({ data, onChange, nodeId }: SharpenConfigProps): JSX.Element;

declare interface SharpenConfigProps {
    data: ImageSharpenNodeData;
    onChange: (patch: Partial<ImageSharpenNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type SharpenData = ImageSharpenNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type SharpenFlowNode = Node_2<SharpenData, 'image:sharpen'>;

export declare function SharpenNode(props: NodeProps<SharpenFlowNode>): JSX.Element;

export declare function SourceImagePathField({ value, onChange, nodeId, label, help, placeholder, }: SourceImagePathFieldProps): JSX.Element;

export declare interface SourceImagePathFieldProps {
    value: string | undefined;
    onChange: (next: string | undefined) => void;
    /** Node being edited; drives the real upstream image-ref suggestions. */
    nodeId?: string;
    label?: string;
    help?: string;
    placeholder?: string;
}

export declare const STATUS_LABEL: Record<PipelineDefinitionStatus, string>;

export declare const STATUS_ORDER: PipelineDefinitionStatus[];

/**
 * What the row's pill says, from the rollup first and the definition status
 * otherwise:
 * - last run failed → danger "Failed · 10h ago"
 * - some of the recent runs failed → warning "1 of 5 failed · 29m ago"
 * - a run is live → info "Running" / "Awaiting approval"
 * - else the definition status: "Published" (success), "Draft" (neutral),
 *   "Archived" (neutral).
 */
export declare function statusPillFor(entry: PipelinesListEntry, now?: number): PillSpec;

declare type StatusPillState = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'pending';

/**
 * What `state` accepts: a `StatusPillState`, or `danger` — the same tokens as
 * `error`, in the library's tone spelling (success / warning / danger /
 * neutral). Kept out of `StatusPillState` so a `Record<StatusPillState, …>`
 * elsewhere does not have to grow a duplicate key.
 */
declare type StatusPillTone = StatusPillState | 'danger';

/**
 * One execution attempt of a step. Hub task #1280.
 *
 * `StepExecution` retains its top-level `status`/`error`/`output`/timing fields
 * — they always reflect the LATEST attempt, so existing single-attempt readers
 * are unaffected. `attempts[]` carries the full history for retry-aware UI
 * (history view, compare-attempts diff). See ADR-DURABLE-PIPELINE-EXECUTION.
 */
declare interface StepAttempt {
    attemptNumber: number;
    startedAt: string;
    completedAt?: string;
    durationMs?: number;
    input?: unknown;
    output?: unknown;
    error?: string;
    errorCategory?: ErrorCategory;
    /** Backoff delay applied before the next attempt; only set on retryable failures. */
    retryAfterMs?: number;
    /** `${runId}:${nodeId}:${attemptNumber}` (per-attempt) or `${runId}:${nodeId}` (per-step idempotent). */
    idempotencyKey: string;
}

export declare function StepAttempts({ attempts, className }: StepAttemptsProps): JSX.Element | null;

export declare interface StepAttemptsProps {
    attempts: StepAttempt[];
    className?: string;
}

declare interface StepExecution {
    nodeId: string;
    status: StepStatus;
    startedAt?: string;
    completedAt?: string;
    durationMs?: number;
    input?: unknown;
    output?: unknown;
    error?: string;
    /** Full per-attempt history. Absent on rows persisted before hub#1280. */
    attempts?: StepAttempt[];
    llm?: {
        prompt: string;
        response: string;
        tokensIn: number;
        tokensOut: number;
        /** True between `pipeline.llm.stream.opened` and the first token; cleared when tokensOut > 0. */
        streamOpened?: boolean;
        /** Wall-clock ms from stream open to first token (DC v0.3.7+). */
        firstTokenLatencyMs?: number;
    };
    agentLive?: {
        toolCalls: AgentToolCall[];
    };
    /**
     * Image previews produced by steps that emit `pipeline:step:image:produced`
     * events (e.g. CropNode, SaveNode). Each entry carries an imageId that
     * resolves through the host's `getImageUrl` service.
     */
    images?: Array<{
        imageId: string;
        width: number;
        height: number;
        mimeType: string;
        bbox?: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    }>;
    approvals?: ApprovalRecord[];
    /**
     * Vision-specific streaming data — populated as `image:vision-analyze`
     * events arrive (pipeline:step:vision:*). `analyzed` flips to true once
     * the model has finished outputting tokens.
     */
    vision?: {
        response: string;
        tokensIn?: number;
        tokensOut?: number;
        tokensSeen: number;
        /**
         * True once `pipeline:image:vision:analyzed` lands.
         *
         * OPTIONAL, deliberately. This was `analyzed: boolean` — required — which
         * described the end state rather than the stream: a reducer folding
         * `pipeline:image:vision:*` events has a `vision` slot from the first
         * token delta, long before it knows whether the step finished. Demanding
         * the field meant a host with a truthful, incrementally-built run store
         * could not hand its steps to these components at all. Every read here is
         * already a truthiness check, so absent and false behave alike.
         */
        analyzed?: boolean;
        failure?: {
            reason: string;
            error: string;
        };
        imageId?: string;
        costUsd?: number;
        /** Model that produced the analysis, when the host records it. */
        visionModel?: string;
        /** Whether the step requested structured extraction against a schema. */
        hasSchema?: boolean;
        /** Final VisionResult payload (caption + extracted JSON + cost/usage). */
        result?: unknown;
    };
    /**
     * hub#2226: edit-and-continue patch history applied while the run was
     * paused at this step's breakpoint. Append-only at apply time;
     * `revertedAt` is set when a patch is undone via `revertContextPatch`.
     * Empty/undefined for steps that were never paused-and-patched.
     */
    patches?: PatchEntry[];
}

/**
 * The refusal a failed STEP ended with, or null. A step carries its
 * category per attempt (`attempts[].errorCategory`), so the latest attempt
 * decides; the step's own `error` string is read for a refusal code the
 * same way a run's message is.
 */
export declare function stepRefusal(step: Pick<StepExecution, 'nodeId' | 'status' | 'error' | 'attempts'> | null | undefined): RunRefusal | null;

export declare function StepSection({ title, children }: StepSectionProps): default_2.JSX.Element;

export declare interface StepSectionProps {
    title: string;
    children: default_2.ReactNode;
}

declare type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'cancelled' | 'awaiting';

export declare function StepThread({ stepId, step, index, nodeType, nodeConfig, onRetryFromStep, onResumeFromStep, onArtifactClick, renderStepDetail }: StepThreadProps): default_2.JSX.Element;

export declare interface StepThreadProps {
    stepId: string;
    step: StepExecution;
    index: number;
    nodeType: string;
    nodeConfig?: Record<string, unknown>;
    onRetryFromStep?: (stepId: string) => void;
    onResumeFromStep?: (stepId: string) => void;
    /**
     * Called when the operator clicks a produced artifact. Hosts that own an
     * artifact route (a lineage graph, an asset page) wire this to navigate
     * there. Without it the thumbnail is still a link — it opens the resolved
     * artifact URL in a new tab — because a produced artifact you cannot open
     * is just a picture of your data.
     */
    onArtifactClick?: (imageId: string) => void;
    /**
     * Extra content for this step, rendered in the row directly under its
     * summary — and outside the disclosure, so it is visible without expanding.
     *
     * For the thing a step PRODUCED: a deck, a meeting, an agenda. Hosts were
     * rendering those in a separate section above the tree, which put the
     * output of step 4 above step 1 and left the row that made it showing only
     * a duration. Returning `null` renders nothing, so a host can supply a
     * card for the one step that has one.
     */
    renderStepDetail?: (step: StepExecution, stepId: string) => ReactNode;
}

export declare function StepTree({ steps, nodeDataMap, edges, onRetryFromStep, onResumeFromStep, onArtifactClick, renderStepDetail }: StepTreeProps): default_2.JSX.Element;

export declare interface StepTreeProps {
    steps: Record<string, StepExecution>;
    nodeDataMap: Record<string, {
        type: NodeType;
        data: Record<string, unknown>;
    }>;
    edges?: PipelineEdge[];
    onRetryFromStep?: (stepId: string) => void;
    onResumeFromStep?: (stepId: string) => void;
    /** Forwarded to every step: click-through for the artifacts a step produced. */
    onArtifactClick?: (imageId: string) => void;
    /**
     * Extra content for a step, rendered in its row under the summary and
     * outside the disclosure — the thing that step PRODUCED (a deck, a meeting,
     * an agenda). Called for every step; return `null` for the ones with
     * nothing to show.
     *
     * Hosts were rendering those cards in a section above the tree, which put
     * the output of step 4 above step 1 and left the row that made it showing
     * only a duration.
     */
    renderStepDetail?: (step: StepExecution, stepId: string) => ReactNode;
}

/**
 * Wrap-flow chip cloud for vision tags.
 */
export declare function TagsPanel({ tags, onTagClick, className }: TagsPanelProps): JSX.Element | null;

export declare interface TagsPanelProps {
    tags: string[];
    onTagClick?: (tag: string) => void;
    className?: string;
}

export declare function ToggleField({ label, checked, onChange, help, disabled, 'data-testid': testId, }: ToggleFieldProps): JSX.Element;

export declare interface ToggleFieldProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    help?: string;
    disabled?: boolean;
    'data-testid'?: string;
}

/**
 * The rows and groups `PipelinesListView` draws for these entries. The second
 * line is the description at rest and the route on hover / when current; a
 * pipeline with no description shows its route all the time.
 */
export declare function toGroupedRows(entries: PipelinesListEntry[], groupBy: PipelinesGroupBy, options?: ToGroupedRowsOptions): {
    groups: GroupedListGroup[];
    rows: GroupedListRow[];
};

export declare interface ToGroupedRowsOptions {
    currentId?: string | null;
    now?: number;
    onOpen?: (entry: PipelinesListEntry) => void;
    onRun?: (entry: PipelinesListEntry) => void;
    onViewRun?: (entry: PipelinesListEntry, runId: string) => void;
    rowTrailing?: (entry: PipelinesListEntry) => ReactNode;
    testId?: string;
}

declare interface TokenUsageByModel {
    tokensIn: number;
    tokensOut: number;
}

declare type TransformData = TransformNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type TransformFlowNode = Node_2<TransformData, 'transform'>;

export declare function TransformGeoConfig({ data, onChange, nodeId, }: TransformGeoConfigProps): JSX.Element;

declare interface TransformGeoConfigProps {
    data: ImageTransformNodeData;
    onChange: (patch: Partial<ImageTransformNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type TransformGeoData = ImageTransformNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type TransformGeoFlowNode = Node_2<TransformGeoData, 'image:transform'>;

export declare function TransformGeoNode(props: NodeProps<TransformGeoFlowNode>): JSX.Element;

export declare function TransformNode(props: NodeProps<TransformFlowNode>): JSX.Element;

declare interface TransformNodeData {
    type: 'transform';
    transformType: TransformType;
    expression: string;
    /** Where in context to write the result; defaults to merging into root. */
    outputKey?: string;
    /** Marks this node as an intentional terminal/sink — silences DEAD_END lint. */
    terminal?: boolean;
    retryPolicy?: RetryPolicy;
}

declare type TransformType = 'jsonpath' | 'template' | 'javascript';

declare interface TriggerBinding {
    event: TriggerType;
    documentTypeId?: string;
    schedule?: string;
    webhookPath?: string;
    /**
     * 32-byte hex secret used to verify HMAC-SHA256 signatures on incoming
     * webhook payloads. Generated server-side by social-api the first time a
     * webhook trigger binding is saved (see
     * `social-api/src/routes/pipelineDefinitions.ts`). The frontend never
     * mints this — it only displays it so the user can copy it into the
     * external webhook source's "secret" field. Absent → the route falls
     * back to Phase-1 unsigned-OK behavior.
     */
    webhookSecret?: string;
}

declare type TriggerData = TriggerNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type TriggerFlowNode = Node_2<TriggerData, 'trigger'>;

export declare function TriggerNode(props: NodeProps<TriggerFlowNode>): JSX.Element;

declare interface TriggerNodeData {
    type: 'trigger';
    triggerType: TriggerType;
    /** Required for `document.*` triggers. */
    documentTypeId?: string;
    /** Cron expression; required when `triggerType === 'schedule'`. */
    schedule?: string;
    /** Required when `triggerType === 'webhook'`. */
    webhookPath?: string;
}

declare type TriggerType = 'manual' | 'document.finalize' | 'document.comment' | 'document.submit' | 'schedule' | 'webhook';

/**
 * Paths a template references that nothing upstream provides.
 *
 * This is the authoring-time signal that was missing: a typo or a path from a
 * node that isn't wired in yet shows up here instead of failing at run time.
 */
export declare function unresolvedTemplatePaths(template: string, available: readonly ContextPath[]): string[];

export declare function UpscaleConfig({ data, onChange, nodeId }: UpscaleConfigProps): JSX.Element;

export declare interface UpscaleConfigProps {
    data: ImageUpscaleNodeData;
    onChange: (patch: Partial<ImageUpscaleNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type UpscaleData = ImageUpscaleNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type UpscaleFlowNode = Node_2<UpscaleData, 'image:upscale'>;

export declare function UpscaleNode(props: NodeProps<UpscaleFlowNode>): JSX.Element;

export declare interface UpstreamContext {
    /** Paths available at this node, nearest upstream first. */
    paths: ContextPath[];
    /** Paths a template references that nothing upstream provides. */
    unresolved: (template: string) => string[];
}

/**
 * Node ids strictly upstream of `targetId`, nearest first.
 *
 * Breadth-first over reversed edges. Cycle-safe: a visited set means a loop in
 * the graph terminates instead of hanging the editor.
 */
export declare function upstreamNodeIds(edges: readonly PipelineEdge[], targetId: string): string[];

/**
 * Lifecycle-safe subscription. The `handler` ref is kept latest so callers
 * can use inline closures without re-subscribing on every render. Cleanup
 * removes the listener when the component unmounts or `type` changes.
 */
export declare function useEventStream<K extends keyof PipelineEventMap>(type: K | '*', handler: (payload: PipelineEventMap[K] | WildcardEvent) => void): void;

/**
 * Access the raw EventStream context. Throws if used outside a provider.
 * Prefer `useEventStream(type, handler)` for subscription use cases.
 */
export declare function useEventStreamContext(): EventStreamValue;

export declare function useImageLineage(runId: string | null | undefined, pipelineId: string | null | undefined): UseImageLineageResult;

export declare interface UseImageLineageResult {
    entries: ImageLineageEntry[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Returns the host-provided `getImageUrl(imageId): string` callback.
 * Throws when called outside a provider — catches the "I forgot to mount
 * the services provider" misuse at first render rather than first
 * thumbnail.
 */
export declare function useImageUrl(): (imageId: string) => string;

/**
 * Optional form of {@link useImageUrl}: the host's `getImageUrl` when a
 * provider is mounted, `null` when there is none.
 *
 * For consumers that render produced images as an OPTIONAL section rather than
 * as their reason for existing — the run-detail step panel is the case this
 * exists for. It is rendered by hosts that never mount
 * <PipelineEditorServicesProvider> (it is a read-only run view, not the
 * editor), and a step that happens to have produced images should simply not
 * show that section there. With `useImageUrl` the same page throws on first
 * render and the operator loses the whole run detail — every log line, every
 * error message — because the library could not resolve a thumbnail.
 *
 * `useImageUrl` stays the right hook inside the editor: there a missing
 * provider is a genuine wiring bug, and failing loudly at first render beats
 * shipping an editor whose image nodes are quietly blank.
 */
export declare function useImageUrlOptional(): ((imageId: string) => string) | null;

/**
 * Whether the host's executor can run a given node type.
 *
 * Returns `true` for everything when the host hasn't declared
 * `executableNodeTypes`, so an un-wired host sees no change and the library
 * never asserts capability it cannot know.
 */
export declare function useIsNodeTypeExecutable(): (type: string) => boolean;

/**
 * Fetches per-day judgment-aggregate rows via the `JudgmentApi` injected
 * via context. Pure data hook — does no rendering.
 *
 * Lifecycle:
 *   - On mount, fires one fetch with the given params.
 *   - On params change (deep-equal-ish via JSON.stringify), re-fetches.
 *   - When `refreshIntervalMs > 0`, polls on a setInterval.
 *   - On unmount, in-flight updates are dropped (mountedRef pattern).
 *
 * Without a provider, returns `{ aggregates: [], loading: false, error: null, reload: noop }`.
 */
export declare function useJudgmentAggregates(options: UseJudgmentAggregatesOptions): UseJudgmentAggregatesReturn;

export declare interface UseJudgmentAggregatesOptions extends FetchAggregatesParams {
    /**
     * Auto-refresh interval in ms. Default 0 (no polling). When set, the
     * hook re-fetches at this cadence after the initial load lands.
     * Useful for live trend panels; consumers that ALSO render
     * `useJudgmentResults` (event-stream) can leave this 0 since the
     * aggregator subscriber writes happen in-process and would be
     * eventually-consistent within seconds.
     */
    refreshIntervalMs?: number;
    /**
     * When true, skip fetching entirely. Useful for conditional
     * mounting / hidden panels. Default false.
     */
    paused?: boolean;
}

export declare interface UseJudgmentAggregatesReturn {
    aggregates: AggregateRow[];
    loading: boolean;
    error: Error | null;
    /** Trigger a fresh fetch on demand (e.g. after a manual refresh button). */
    reload: () => void;
}

/**
 * Hook for components that REQUIRE the API to function (the trend chart
 * + hooks). Returns `null` when no provider is mounted; callers should
 * render an empty state in that case rather than throwing.
 */
export declare function useJudgmentApi(): JudgmentApi | null;

/**
 * Hook that subscribes to the pipeline event stream and folds the four
 * `pipeline.judge.*` events into a per-step record map. Stable identity
 * per (runId, stepId) — `scored`/`failed`/`budget-exceeded` mutate the
 * existing record rather than creating a new one, so a downstream card
 * smoothly transitions running → scored without unmounting.
 *
 * Pure observer: never publishes, never owns state outside React. Designed
 * to be embedded in the existing PipelinesPage / PipelineRunsPanel without
 * disturbing their context tree. Mirrors useVisionResults' shape so
 * consumers can fold both into one activity stream component.
 */
export declare function useJudgmentResults(opts?: UseJudgmentResultsOptions): JudgmentStepRecord[];

export declare interface UseJudgmentResultsOptions {
    /** Limit accumulated records to the most recent N. Default 50. */
    maxRecords?: number;
    /** When set, only records for this runId are kept. */
    runId?: string;
}

/**
 * Lookup the most recent run that contains a step matching `nodeId`, and
 * return that step. Used by per-node visuals (LLMNode etc.) to surface live
 * runtime state on the canvas without each node having to fold over all
 * runs itself.
 *
 * "Most recent" is defined as max(run.startedAt). Active runs are NOT
 * preferred over completed — the visual is the *latest observed* state of
 * this node, regardless of whether the run is still running. The streaming
 * indicators rely on freshness anyway: streamOpened is cleared on the
 * first token and never re-set, so a stale streamOpened from a completed
 * run would imply the run never received its first token (which is
 * accurate state to render).
 *
 * Returns null when no run has executed this node yet (the common case
 * for nodes that haven't run, or for the editor view when no run has been
 * triggered).
 *
 * Host seam: when a `PipelineNodeRuntimeProvider` is mounted, its
 * `getLatestStepForNode` is consulted INSTEAD of the bundled runs store —
 * even if a `PipelineRunsProvider` is also in scope. The host lookup is
 * memoized on the function's identity, so hosts must hand us a fresh
 * function whenever their store changes (see PipelineNodeRuntimeContext).
 */
export declare function useLatestStepForNode(nodeId: string): StepExecution | null;

export declare function usePipelineEditor(): PipelineEditorValue;

export declare function usePipelineEditorServices(): PipelineEditorServices;

/**
 * Accessor for the host seam. Returns null when no host runtime provider is
 * mounted (the common case inside apps that use the bundled runs store).
 */
export declare function usePipelineNodeRuntime(): PipelineNodeRuntimeValue | null;

export declare function usePipelineRuns(): PipelineRunsValue;

/**
 * Ergonomic shortcut: returns just the `retryFromStep` callback so per-node
 * components don't have to destructure the whole runs value. See §17.6.
 *
 * Graceful when no `PipelineRunsProvider` is in scope — returns a no-op so
 * standalone visual renders (storybook, isolated unit tests) don't throw just
 * for asking for the retry handler. **Callers that render a control from this
 * must use `useRetryFromStepIfWired` instead**, or they will render a live
 * button backed by the no-op.
 *
 * Host seam: when a `PipelineNodeRuntimeProvider` is mounted AND its value
 * supplies `retryFromStep`, that handler wins over the bundled one (wrapped
 * so callers always get a Promise back). A mounted seam WITHOUT a
 * `retryFromStep` falls through to the bundled handler / no-op as before.
 */
export declare function useRetryFromStep(): (nodeId: string) => Promise<void>;

/**
 * Like `useRetryFromStep`, but returns `undefined` when nothing can actually
 * perform a retry — no `PipelineRunsProvider` and no host seam that supplies
 * `retryFromStep`.
 *
 * This is what the node components use. `useRetryFromStep` below always hands
 * back a callable, and its no-op fallback silently defeated BaseNode's
 * `typeof onRetry === 'function'` guard: a node in the failed state rendered
 * its Retry pill, the click resolved into the void, and the node stayed
 * failed with no run started and no error shown. That is reachable in normal
 * use — `state` also comes from `data._state`, so replay/host-driven canvases
 * hit it without any provider at all, as does a `PipelineNodeRuntimeProvider`
 * mounted without `retryFromStep`.
 *
 * Deliberately NOT re-exported from `src/components/pipelines/index.ts`: the
 * frozen public surface keeps `useRetryFromStep` with its existing signature.
 */
export declare function useRetryFromStepIfWired(): ((nodeId: string) => Promise<void>) | undefined;

/**
 * Context paths available at `nodeId`, recomputed when the graph changes.
 *
 * Returns an empty set when `nodeId` is null so a panel can call this
 * unconditionally without branching on selection.
 */
export declare function useUpstreamContext(nodeId: string | null): UpstreamContext;

/**
 * Image references reachable from `nodeId`, for the `imageRefPath` field on
 * image/vision nodes.
 *
 * Replaces the hardcoded `IMAGE_REF_SAMPLES` lists that 18 config panels
 * carried, which named nodes ("upload", "crop") that need not exist.
 */
export declare function useUpstreamImageRefs(nodeId: string | null): ImageRefOption[];

/**
 * Hook that subscribes to the pipeline event stream (the same stream the
 * existing runs page consumes) and folds `pipeline.image.vision.*` events
 * into a per-step record map. Stable record identity per (runId, stepId)
 * — completion mutates the existing record rather than creating a new one,
 * so a downstream `<VisionRunCard>` smoothly transitions running → completed
 * without unmounting.
 *
 * Pure observer: never publishes, never owns state outside React. Designed
 * to be embedded in the existing PipelinesPage / PipelineRunsPanel without
 * disturbing their context tree.
 */
export declare function useVisionResults(opts?: UseVisionResultsOptions): VisionStepRecord[];

export declare interface UseVisionResultsOptions {
    /** Limit accumulated records to the most recent N. Default: 50. */
    maxRecords?: number;
    /** When set, only records for this runId are kept. */
    runId?: string;
}

/**
 * The host's inbound-webhook declaration.
 *
 * Reads the context directly rather than through `usePipelineEditorServices()`,
 * which throws with no provider: a config panel has to stay renderable in a
 * test, a story, or a standalone settings view. "No host" resolves to
 * `{ enabled: false }` — never claim an endpoint is live because nobody said
 * otherwise.
 */
export declare function useWebhookRelay(): WebhookRelayStatus;

export declare function VariationConfig({ data, onChange, nodeId }: VariationConfigProps): JSX.Element;

declare interface VariationConfigProps {
    data: ImageVariationNodeData;
    onChange: (patch: Partial<ImageVariationNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type VariationData = ImageVariationNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type VariationFlowNode = Node_2<VariationData, 'image:variation'>;

export declare function VariationNode(props: NodeProps<VariationFlowNode>): JSX.Element;

/**
 * The header card for a `JudgmentResult` — overall score gauge + verdict
 * chip + rubric + model + mode metadata. Drop at the top of a
 * `JudgmentResultViewer` or use standalone alongside a CriteriaPanel.
 *
 * Label-prefix verdict tones ("PASS · …") follow the same color-blind-safe
 * convention the vision audit established for EditRecommendationsPanel.
 */
export declare function VerdictPanel({ result, className }: VerdictPanelProps): JSX.Element;

export declare interface VerdictPanelProps {
    /** Subset of JudgmentResult — pass `result` directly OR pluck just what you need. */
    result: Pick<JudgmentResult, 'overallScore' | 'overallVerdict' | 'overallPassed' | 'confidence' | 'rubricSnapshot' | 'model' | 'mode'>;
    className?: string;
}

export declare type VisionAgeBucket = 'infant' | 'child' | 'teen' | 'young_adult' | 'adult' | 'senior';

export declare interface VisionBBox {
    /** Pixel coordinates relative to the source image. */
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export declare function VisionClassifyConfig({ data, onChange, nodeId, }: VisionClassifyConfigProps): JSX.Element;

declare interface VisionClassifyConfigProps {
    data: ImageVisionClassifyNodeData;
    onChange: (patch: Partial<ImageVisionClassifyNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}

declare type VisionClassifyData = ImageVisionClassifyNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type VisionClassifyFlowNode = Node_2<VisionClassifyData, 'image:vision-classify'>;

export declare function VisionClassifyNode(props: NodeProps<VisionClassifyFlowNode>): JSX.Element;

export declare function VisionConfig({ data, onChange, nodeId }: VisionConfigProps): JSX.Element;

declare interface VisionConfigProps {
    data: ImageVisionAnalyzeNodeData;
    onChange: (patch: Partial<ImageVisionAnalyzeNodeData>) => void;
    /** Node being edited; enables real upstream-context pills. */
    nodeId?: string;
}

export declare type VisionContrastVerdict = 'low' | 'normal' | 'high';

declare type VisionData = ImageVisionAnalyzeNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

export declare function VisionDescribeConfig({ data, onChange, nodeId, }: VisionDescribeConfigProps): JSX.Element;

declare interface VisionDescribeConfigProps {
    data: ImageVisionDescribeNodeData;
    onChange: (patch: Partial<ImageVisionDescribeNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}

declare type VisionDescribeData = ImageVisionDescribeNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type VisionDescribeFlowNode = Node_2<VisionDescribeData, 'image:vision-describe'>;

export declare function VisionDescribeNode(props: NodeProps<VisionDescribeFlowNode>): JSX.Element;

export declare interface VisionExposure {
    verdict: 'underexposed' | 'correct' | 'overexposed' | string;
    evAdjustment: number;
    rationale: string;
}

export declare function VisionExtractTextConfig({ data, onChange, nodeId, }: VisionExtractTextConfigProps): JSX.Element;

declare interface VisionExtractTextConfigProps {
    data: ImageVisionExtractTextNodeData;
    onChange: (patch: Partial<ImageVisionExtractTextNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}

declare type VisionExtractTextData = ImageVisionExtractTextNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type VisionExtractTextFlowNode = Node_2<VisionExtractTextData, 'image:vision-extract-text'>;

export declare function VisionExtractTextNode(props: NodeProps<VisionExtractTextFlowNode>): JSX.Element;

declare type VisionFlowNode = Node_2<VisionData, 'image:vision-analyze'>;

export declare function VisionNode(props: NodeProps<VisionFlowNode>): JSX.Element;

export declare interface VisionObject {
    label: string;
    bbox: VisionBBox;
    confidence?: number;
}

export declare interface VisionPerson {
    /** 1-based index within the PEOPLE list. Used as the badge label. */
    index: number;
    bbox: VisionBBox;
    ageBucket?: VisionAgeBucket;
    gender?: string;
    /** 'toward_camera' / 'profile_left' / 'away' / etc. — free string. */
    faceOrientation?: string;
    /** 'smiling' / 'neutral' / 'concentrating' / etc. */
    expression?: string;
    /** ':: walking on the beach' — a short verb phrase. */
    activity?: string;
    /** Comma-separated free description of clothing. */
    clothing?: string;
}

/**
 * Full structured result of a single vision-step run. Every section is
 * optional — different model endpoints fill different subsets. The
 * `imageUrl` (or `imageDataUrl`) is required for any panel that overlays
 * bounding boxes on the source image.
 */
export declare interface VisionResult {
    /** Source image used during analysis. Either a URL or a data: URI. */
    imageUrl?: string;
    imageDataUrl?: string;
    /** Pixel dimensions of the source image. Required for bbox scaling. */
    imageWidth?: number;
    imageHeight?: number;
    caption?: string;
    setting?: string;
    location?: string;
    timeOfDay?: string;
    mood?: string;
    colors?: string[];
    people?: VisionPerson[];
    objects?: VisionObject[];
    text?: string[];
    tags?: string[];
    exposure?: VisionExposure;
    whiteBalance?: VisionWhiteBalance;
    contrast?: VisionContrastVerdict;
    composition?: string;
    edits?: string[];
    /** Free-form raw text returned by the model. Useful for re-parse on
     *  schema bumps and for replay/debug views. */
    rawText?: string;
    model?: {
        endpointId: string;
        latencyMs: number;
        tokensIn?: number;
        tokensOut?: number;
    };
}

/**
 * Top-level vision-result composite. Renders every populated section of a
 * `VisionResult`, gracefully omitting sections the model didn't emit.
 */
export declare function VisionResultViewer({ result, showImage, showCaption, showPeople, showObjects, showTags, showEdits, showRawText, onTagClick, onApplyEdit, className, }: VisionResultViewerProps): JSX.Element;

export declare interface VisionResultViewerProps {
    result: VisionResult;
    /** Whether to render the image overlay + per-section panels. Default: true. */
    showImage?: boolean;
    showCaption?: boolean;
    showPeople?: boolean;
    showObjects?: boolean;
    showTags?: boolean;
    showEdits?: boolean;
    showRawText?: boolean;
    /** Fires when a tag is clicked (e.g. to filter the activity stream). */
    onTagClick?: (tag: string) => void;
    /** Fires when "Apply" is clicked on an edit recommendation. */
    onApplyEdit?: (edit: string) => void;
    className?: string;
}

/**
 * Compact summary card for the activity stream. Shows endpoint + status +
 * a caption snippet + 3-4 top tags. Click to expand into the full
 * VisionResultViewer.
 */
export declare function VisionRunCard({ status, result, runId, endpointLabel, error, latencyMs, onOpen, className, }: VisionRunCardProps): JSX.Element;

export declare interface VisionRunCardProps {
    status: VisionRunStatus;
    /** Required when status === 'completed'. */
    result?: VisionResult;
    /** Optional run identifier displayed in the header. */
    runId?: string;
    /** Optional model / endpoint name override (falls back to result.model.endpointId). */
    endpointLabel?: string;
    error?: string;
    /** Latency in ms — shown in the header. Derived from result.model if absent. */
    latencyMs?: number;
    /** Click handler to expand into the full VisionResultViewer. */
    onOpen?: () => void;
    className?: string;
}

export declare type VisionRunStatus = 'running' | 'completed' | 'failed';

export declare interface VisionStepRecord {
    runId: string;
    stepId: string;
    status: VisionStepStatus;
    result?: VisionResult;
    error?: string;
    /** Wall-clock ms since the step's `started` event. */
    elapsedMs?: number;
    /** Endpoint id reported by the started event (e.g. 'ec2-vision-qwen'). */
    endpointId?: string;
    startedAt?: number;
    completedAt?: number;
}

export declare type VisionStepStatus = 'running' | 'completed' | 'failed';

export declare function VisionTagConfig({ data, onChange, nodeId }: VisionTagConfigProps): JSX.Element;

declare interface VisionTagConfigProps {
    data: ImageVisionTagNodeData;
    onChange: (patch: Partial<ImageVisionTagNodeData>) => void;
    /** Node being edited; enables real upstream image refs. */
    nodeId?: string;
}

declare type VisionTagData = ImageVisionTagNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type VisionTagFlowNode = Node_2<VisionTagData, 'image:vision-tag'>;

export declare function VisionTagNode(props: NodeProps<VisionTagFlowNode>): JSX.Element;

export declare interface VisionWhiteBalance {
    verdict: 'cool' | 'neutral' | 'warm' | string;
    kelvinShift: number;
    rationale: string;
}

export declare function WatermarkConfig({ data, onChange, nodeId }: WatermarkConfigProps): JSX.Element;

declare interface WatermarkConfigProps {
    data: ImageWatermarkNodeData;
    onChange: (patch: Partial<ImageWatermarkNodeData>) => void;
    /** Node being edited; derives real upstream image refs. */
    nodeId?: string;
}

declare type WatermarkData = ImageWatermarkNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type WatermarkFlowNode = Node_2<WatermarkData, 'image:watermark'>;

declare type WatermarkGravity = 'northwest' | 'north' | 'northeast' | 'west' | 'center' | 'east' | 'southwest' | 'south' | 'southeast';

export declare function WatermarkNode(props: NodeProps<WatermarkFlowNode>): JSX.Element;

/** Host declaration of inbound webhook delivery. See `webhookRelay`. */
export declare interface WebhookRelayStatus {
    /** True ONLY when a delivery to the webhook path actually triggers a run. */
    enabled: boolean;
    /**
     * Public origin the webhook URL is built from, e.g. `https://api.example.com`.
     * Falls back to `VITE_SOCIAL_API_URL`, then to the local dev port.
     */
    publicUrlBase?: string;
}

declare type WildcardEvent = {
    eventType: string;
    payload: unknown;
};

export declare const WORK_TYPE_LABEL: Record<WorkType, string>;

export declare const WORK_TYPE_ORDER: WorkType[];

export declare type WorkType = 'documents' | 'agents' | 'conversations' | 'other';

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
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
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
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
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
