import { default as default_2 } from 'react';
import { JSX } from 'react/jsx-runtime';
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

declare type AgentData = AgentNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type AgentFlowNode = Node_2<AgentData, 'agent'>;

declare type AgentInvokeProtocol = 'a2a' | 'direct';

declare function AgentNode({ id, data, selected }: NodeProps<AgentFlowNode>): JSX.Element;

declare interface AgentNodeData {
    type: 'agent';
    agentId: string;
    agentName?: string;
    protocol: AgentInvokeProtocol;
    inputTemplate: string;
    streaming: boolean;
    timeoutMs?: number;
    outputKey?: string;
    retryPolicy?: RetryPolicy;
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

declare function AgUiOutputNode({ id, data, selected }: NodeProps<AgUiFlowNode>): JSX.Element;

declare interface AgUiOutputNodeData {
    type: 'ag-ui-output';
    sourceField: string;
    eventType: AgUiOutputEventType;
    terminal: boolean;
    customEventName?: string;
}

export declare function AllRunsPage(): JSX.Element;

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
    children?: ReactNode;
}

/**
 * Caption + scene metadata header.
 */
export declare function CaptionPanel({ result, className }: CaptionPanelProps): JSX.Element | null;

export declare interface CaptionPanelProps {
    result: Pick<VisionResult, 'caption' | 'setting' | 'location' | 'timeOfDay' | 'mood' | 'colors'>;
    className?: string;
}

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

declare type ErrorCategory = 'NetworkError' | 'TimeoutError' | 'ValidationError' | 'LLMError' | 'RegistryConflict' | 'UnknownError';

export declare function EventStreamProvider({ children, }: EventStreamProviderProps): JSX.Element;

export declare interface EventStreamProviderProps {
    children: default_2.ReactNode;
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
    subscribeToRun(runId: string): () => void;
    subscribeToAll(): () => void;
    subscribeToApprovals(): () => void;
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

declare type GraphData = GraphQueryNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type GraphFlowNode = Node_2<GraphData, 'graph-query'>;

declare function GraphQueryNode({ id, data, selected }: NodeProps<GraphFlowNode>): JSX.Element;

declare interface GraphQueryNodeData {
    type: 'graph-query';
    graphId: string;
    query: string;
    parameters?: Record<string, string>;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

declare type GuardrailAction = 'block' | 'mask' | 'warn';

declare type GuardrailData = GuardrailNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type GuardrailFlowNode = Node_2<GuardrailData, 'guardrail'>;

declare function GuardrailNode({ id, data, selected }: NodeProps<GuardrailFlowNode>): JSX.Element;

declare interface GuardrailNodeData {
    type: 'guardrail';
    guardrailId: string;
    guardrailVersion?: string;
    inputField: string;
    action: GuardrailAction;
    label?: string;
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

declare function KnowledgeBaseNode({ id, data, selected }: NodeProps<KBFlowNode>): JSX.Element;

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

declare type McpToolData = McpToolNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type McpToolFlowNode = Node_2<McpToolData, 'mcp-tool'>;

declare function McpToolNode({ id, data, selected }: NodeProps<McpToolFlowNode>): JSX.Element;

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

declare function MemoryNode({ id, data, selected }: NodeProps<MemFlowNode>): JSX.Element;

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

declare type NodeData = TriggerNodeData | LLMNodeData | TransformNodeData | ConditionNodeData | ActionNodeData | ForkNodeData | JoinNodeData | ApprovalNodeData | AgentNodeData | GuardrailNodeData | McpToolNodeData | KnowledgeBaseNodeData | GraphQueryNodeData | MemoryNodeData | PolicyNodeData | AgUiOutputNodeData | ImageSourceNodeData | ImageSaveNodeData | ScatterNodeData;

export declare type NodeExecutionState = 'idle' | 'pending' | 'running' | 'awaiting' | 'completed' | 'failed' | 'skipped';

declare type NodeType = 'trigger' | 'llm' | 'transform' | 'condition' | 'action' | 'fork' | 'join' | 'approval' | 'agent' | 'mcp-tool' | 'knowledge-base' | 'graph-query' | 'memory' | 'guardrail' | 'policy' | 'ag-ui-output' | 'image-source' | 'image:save' | 'scatter';

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
};

/**
 * Compact 2-column list of detected objects with bbox preview chips.
 */
export declare function ObjectsPanel({ objects, onSelect, className }: ObjectsPanelProps): JSX.Element | null;

export declare interface ObjectsPanelProps {
    objects: VisionObject[];
    onSelect?: (object: VisionObject) => void;
    className?: string;
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

export declare function PipelineEditorProvider({ pipelineId, children, }: PipelineEditorProviderProps): JSX.Element;

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

export declare function PipelineRunComparePage(): JSX.Element;

export declare function PipelineRunDiff(): JSX.Element;

declare interface PipelineRunError {
    nodeId: string;
    message: string;
    stack?: string;
    errorCategory?: ErrorCategory;
}

export declare function PipelineRunReplayPage(): JSX.Element;

export declare function PipelineRunsPage(): JSX.Element;

export declare function PipelineRunsProvider({ children }: PipelineRunsProviderProps): JSX.Element;

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
     * run that resumes traversal at `nodeId` and skips upstream nodes. No-op +
     * console.warn when no eligible run is found.
     */
    retryFromStep: (nodeId: string) => Promise<void>;
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

export declare function PipelinesPage(): JSX.Element;

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

declare function PolicyNode({ id, data, selected }: NodeProps<PolicyFlowNode>): JSX.Element;

declare interface PolicyNodeData {
    type: 'policy';
    policyStoreId: string;
    principal: string;
    action: string;
    resource: string;
    contextEntities?: string;
    label?: string;
}

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

declare type RunStatus = 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed' | 'failed' | 'cancelled';

export declare function SaveConfig({ data, onChange }: SaveConfigProps): JSX.Element;

export declare interface SaveConfigProps {
    data: ImageSaveNodeData;
    onChange: (patch: Partial<ImageSaveNodeData>) => void;
}

declare type SaveData = ImageSaveNodeData & {
    _state?: NodeExecutionState;
    _hasBreakpoint?: boolean;
    _pausedAtBreakpoint?: boolean;
} & Record<string, unknown>;

declare type SaveFlowNode = Node_2<SaveData, 'image:save'>;

export declare function SaveNode(props: NodeProps<SaveFlowNode>): JSX.Element;

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
     * hub#2226: edit-and-continue patch history applied while the run was
     * paused at this step's breakpoint. Append-only at apply time;
     * `revertedAt` is set when a patch is undone via `revertContextPatch`.
     * Empty/undefined for steps that were never paused-and-patched.
     */
    patches?: PatchEntry[];
}

declare type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'cancelled' | 'awaiting';

/**
 * Wrap-flow chip cloud for vision tags.
 */
export declare function TagsPanel({ tags, onTagClick, className }: TagsPanelProps): JSX.Element | null;

export declare interface TagsPanelProps {
    tags: string[];
    onTagClick?: (tag: string) => void;
    className?: string;
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

/**
 * Returns the host-provided `getImageUrl(imageId): string` callback.
 * Throws when called outside a provider — catches the "I forgot to mount
 * the services provider" misuse at first render rather than first
 * thumbnail.
 */
export declare function useImageUrl(): (imageId: string) => string;

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
 */
export declare function useLatestStepForNode(nodeId: string): StepExecution | null;

export declare function usePipelineEditor(): PipelineEditorValue;

export declare function usePipelineEditorServices(): PipelineEditorServices;

export declare function usePipelineRuns(): PipelineRunsValue;

/**
 * Ergonomic shortcut: returns just the `retryFromStep` callback so per-node
 * components don't have to destructure the whole runs value. See §17.6.
 *
 * Graceful when no `PipelineRunsProvider` is in scope — returns a no-op so
 * standalone visual renders (storybook, isolated unit tests) don't throw just
 * for asking for the retry handler.
 */
export declare function useRetryFromStep(): (nodeId: string) => Promise<void>;

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

export declare type VisionContrastVerdict = 'low' | 'normal' | 'high';

export declare interface VisionExposure {
    verdict: 'underexposed' | 'correct' | 'overexposed' | string;
    evAdjustment: number;
    rationale: string;
}

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

export declare interface VisionWhiteBalance {
    verdict: 'cool' | 'neutral' | 'warm' | string;
    kelvinShift: number;
    rationale: string;
}

declare type WildcardEvent = {
    eventType: string;
    payload: unknown;
};

export { }
