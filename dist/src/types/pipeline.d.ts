import type { PipelineRunSummary } from './pipeline-contracts';
export type NodeType = 'trigger' | 'llm' | 'transform' | 'condition' | 'action' | 'fork' | 'join' | 'approval' | 'agent' | 'mcp-tool' | 'knowledge-base' | 'graph-query' | 'memory' | 'guardrail' | 'policy' | 'ag-ui-output' | 'image-source' | 'image:save' | 'scatter' | 'image:resize' | 'image:transform' | 'image:format-convert' | 'image:sharpen' | 'image:watermark' | 'image:crop' | 'image:adjust-bw' | 'image:adjust-layer' | 'image:dimensions' | 'image:upscale' | 'image:vision-analyze' | 'image:vision-classify' | 'image:vision-describe' | 'image:vision-tag' | 'image:vision-extract-text' | 'image:generate' | 'image:variation' | 'image:edit-prompt';
export type TriggerType = 'manual' | 'document.finalize' | 'document.comment' | 'document.submit' | 'schedule' | 'webhook';
export interface TriggerNodeData {
    type: 'trigger';
    triggerType: TriggerType;
    /** Required for `document.*` triggers. */
    documentTypeId?: string;
    /** Cron expression; required when `triggerType === 'schedule'`. */
    schedule?: string;
    /** Required when `triggerType === 'webhook'`. */
    webhookPath?: string;
}
export type LLMProvider = 'anthropic' | 'bedrock' | 'claude-code';
export interface LLMNodeData {
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
export type TransformType = 'jsonpath' | 'template' | 'javascript';
export interface TransformNodeData {
    type: 'transform';
    transformType: TransformType;
    expression: string;
    /** Where in context to write the result; defaults to merging into root. */
    outputKey?: string;
    /** Marks this node as an intentional terminal/sink — silences DEAD_END lint. */
    terminal?: boolean;
    retryPolicy?: RetryPolicy;
}
export interface ConditionNodeData {
    type: 'condition';
    /** JSONPath or boolean expression evaluated over context. */
    expression: string;
    /** UI label shown on the node. */
    label?: string;
}
export type ActionType = 'update-document' | 'post-comment' | 'notify' | 'webhook' | 'mcp-tool' | 'sync-back';
export interface ActionNodeData {
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
export interface ForkNodeData {
    type: 'fork';
    /** Number of parallel output branches (2..8). */
    branchCount: number;
    branchLabels?: string[];
}
export type JoinMode = 'all' | 'any' | 'n_of_m';
export type JoinMergeStrategy = 'deep-merge' | 'array-collect' | 'last-writer-wins';
export interface JoinNodeData {
    type: 'join';
    mode: JoinMode;
    /** Required when `mode === 'n_of_m'`. */
    n?: number;
    mergeStrategy: JoinMergeStrategy;
}
export interface Approver {
    type: 'user' | 'role';
    value: string;
}
export type ApprovalTimeoutAction = 'reject' | 'approve' | 'escalate';
export interface ApprovalNodeData {
    type: 'approval';
    approvers: Approver[];
    /** n-of-m — how many approvals required to pass. */
    requiredCount: number;
    timeoutMs?: number;
    timeoutAction?: ApprovalTimeoutAction;
    /** Message shown to the approver. */
    message?: string;
}
export interface RetryPolicy {
    maxAttempts: number;
    backoffMs: number;
    backoffMultiplier: number;
}
export type AgentInvokeProtocol = 'a2a' | 'direct';
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
export interface AgentNodeData {
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
export interface AgentToolCall {
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
export type AgentStopReason = 'complete' | 'max_turns' | 'timeout' | 'error' | 'cancelled';
/** `step.output` shape for an `agent` node. */
export interface AgentStepOutput {
    /** Final assistant text. */
    text: string;
    turns: number;
    toolCalls: AgentToolCall[];
    model: string;
    tokensIn: number;
    tokensOut: number;
    stopReason: AgentStopReason;
    /** True when the step ran with no tools allowed (see `allowedTools`). */
    toolless: boolean;
}
export type GuardrailAction = 'block' | 'mask' | 'warn';
export interface GuardrailNodeData {
    type: 'guardrail';
    guardrailId: string;
    guardrailVersion?: string;
    inputField: string;
    action: GuardrailAction;
    label?: string;
}
export interface McpToolNodeData {
    type: 'mcp-tool';
    gatewayUrl: string;
    toolName: string;
    inputTemplate: string;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}
export interface KnowledgeBaseNodeData {
    type: 'knowledge-base';
    knowledgeBaseId: string;
    queryTemplate: string;
    topK: number;
    scoreThreshold?: number;
    outputKey?: string;
    retryPolicy?: RetryPolicy;
}
export interface GraphQueryNodeData {
    type: 'graph-query';
    graphId: string;
    query: string;
    parameters?: Record<string, string>;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}
export type MemoryMode = 'read' | 'write';
export type MemoryScope = 'session' | 'long-term';
export interface MemoryNodeData {
    type: 'memory';
    mode: MemoryMode;
    scope: MemoryScope;
    namespace: string;
    keyExpression: string;
    valueField?: string;
    outputKey?: string;
}
export interface PolicyNodeData {
    type: 'policy';
    policyStoreId: string;
    principal: string;
    action: string;
    resource: string;
    contextEntities?: string;
    label?: string;
}
export type AgUiOutputEventType = 'TEXT_MESSAGE_CONTENT' | 'STATE_DELTA' | 'CUSTOM';
export interface AgUiOutputNodeData {
    type: 'ag-ui-output';
    sourceField: string;
    eventType: AgUiOutputEventType;
    terminal: boolean;
    customEventName?: string;
}
export interface ImageSourceNodeData {
    type: 'image-source';
    /** imageId to inject into the pipeline context. */
    imageId?: string;
    /** Key under which the imageId is written to context. Default: 'imageRef'. */
    outputKey?: string;
}
export interface ImageSaveNodeData {
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
export interface ScatterNodeData {
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
export interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type ResizeFit = 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
export interface ImageResizeNodeData {
    type: 'image:resize';
    sourceImagePath?: string;
    width?: number;
    height?: number;
    fit?: ResizeFit;
    withoutEnlargement?: boolean;
    background?: string;
}
export type GeometricOpRotate = {
    op: 'rotate';
    degrees: number;
    background?: string;
    trimAfter?: boolean;
};
export type GeometricOpFlip = {
    op: 'flip';
};
export type GeometricOpFlop = {
    op: 'flop';
};
export type GeometricOp = GeometricOpRotate | GeometricOpFlip | GeometricOpFlop;
export interface ImageTransformNodeData {
    type: 'image:transform';
    sourceImagePath?: string;
    operations: GeometricOp[];
}
export type ImageFormat = 'jpeg' | 'png' | 'webp' | 'avif';
export interface ImageFormatConvertNodeData {
    type: 'image:format-convert';
    sourceImagePath?: string;
    format: ImageFormat;
    quality?: number;
    lossless?: boolean;
    stripMetadata?: boolean;
}
export interface ImageSharpenNodeData {
    type: 'image:sharpen';
    sourceImagePath?: string;
    sigma?: number;
    m1?: number;
    m2?: number;
}
export type WatermarkGravity = 'northwest' | 'north' | 'northeast' | 'west' | 'center' | 'east' | 'southwest' | 'south' | 'southeast';
export interface ImageWatermarkNodeData {
    type: 'image:watermark';
    sourceImagePath?: string;
    overlayImageId: string;
    gravity?: WatermarkGravity;
    opacity?: number;
    offsetX?: number;
    offsetY?: number;
}
export interface ImageCropNodeData {
    type: 'image:crop';
    sourceImagePath?: string;
    bboxPath?: string;
    bbox?: BBox;
    materialize?: boolean;
}
export interface ImageAdjustBwNodeData {
    type: 'image:adjust-bw';
    sourceImagePath?: string;
    algorithm?: 'luminosity' | 'average' | 'desaturate';
    contrast?: number;
}
export type AdjustLayer = {
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
export interface ImageAdjustLayerNodeData {
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
export interface ImageDimensionsNodeData {
    type: 'image:dimensions';
    sourceImagePath?: string;
    /**
     * Longest-edge target used to derive generation dimensions. The handler
     * reads the source image's natural size and emits width/height/aspectRatio
     * plus genWidth/genHeight scaled to fit within `maxEdge`. Default: 1024.
     */
    maxEdge?: number;
}
export interface ImageUpscaleNodeData {
    type: 'image:upscale';
    sourceImagePath?: string;
    /** Optional prompt forwarded to the self-hosted x4 upscaler. */
    prompt?: string;
    /** Longest-edge cap applied before super-resolution. Default: 1024. */
    maxEdge?: number;
}
/**
 * Authoring bounding-box painted by the user in BBoxAuthoringCanvas.
 * These are forwarded to the vision call as a system-prompt hint.
 */
export interface AuthoringBBox {
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
export interface ImageVisionAnalyzeNodeData {
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
export interface ImageVisionClassifyNodeData {
    type: 'image:vision-classify';
    model?: string;
    imageRefPath: string;
    labels: string[];
    systemPrompt?: string;
    maxOutputTokens?: number;
}
export interface ImageVisionDescribeNodeData {
    type: 'image:vision-describe';
    model?: string;
    imageRefPath: string;
    userPrompt: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}
export interface ImageVisionTagNodeData {
    type: 'image:vision-tag';
    model?: string;
    imageRefPath: string;
    candidateTags?: string[];
    maxTags?: number;
    systemPrompt?: string;
    maxOutputTokens?: number;
}
export interface ImageVisionExtractTextNodeData {
    type: 'image:vision-extract-text';
    model?: string;
    imageRefPath: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}
export interface ImageGenerateNodeData {
    type: 'image:generate';
    prompt: string;
    model?: string;
    width?: number;
    height?: number;
    seed?: number;
    numImages?: number;
}
export interface ImageVariationNodeData {
    type: 'image:variation';
    sourceImagePath?: string;
    numVariations?: number;
    similarity?: number;
    model?: string;
}
export interface ImageEditPromptNodeData {
    type: 'image:edit-prompt';
    sourceImagePath?: string;
    maskImagePath?: string;
    prompt: string;
    model?: string;
}
export type NodeData = TriggerNodeData | LLMNodeData | TransformNodeData | ConditionNodeData | ActionNodeData | ForkNodeData | JoinNodeData | ApprovalNodeData | AgentNodeData | GuardrailNodeData | McpToolNodeData | KnowledgeBaseNodeData | GraphQueryNodeData | MemoryNodeData | PolicyNodeData | AgUiOutputNodeData | ImageSourceNodeData | ImageSaveNodeData | ScatterNodeData | ImageResizeNodeData | ImageTransformNodeData | ImageFormatConvertNodeData | ImageSharpenNodeData | ImageWatermarkNodeData | ImageCropNodeData | ImageAdjustBwNodeData | ImageAdjustLayerNodeData | ImageDimensionsNodeData | ImageUpscaleNodeData | ImageVisionAnalyzeNodeData | ImageVisionClassifyNodeData | ImageVisionDescribeNodeData | ImageVisionTagNodeData | ImageVisionExtractTextNodeData | ImageGenerateNodeData | ImageVariationNodeData | ImageEditPromptNodeData;
export interface PipelineNode {
    id: string;
    type: NodeType;
    position: {
        x: number;
        y: number;
    };
    /** Discriminated union keyed on `data.type`. */
    data: NodeData;
}
export interface PipelineEdge {
    id: string;
    source: string;
    /** 'out', 'true'/'false', 'branch-N', 'approved'/'rejected', 'error'. */
    sourceHandle: string;
    target: string;
    /** 'in' or 'in-N' for Join. */
    targetHandle: string;
}
export interface TriggerBinding {
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
export type PipelineStatus = 'draft' | 'published' | 'archived';
export interface PipelineDefinition {
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
export type RunStatus = 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed'
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
type AssertTrue<T extends true> = T;
export type WireCarriesEveryRunStatus = AssertTrue<[
    RunStatus
] extends [PipelineRunSummary['status']] ? true : false>;
export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'cancelled' | 'awaiting';
export interface ApprovalRecord {
    userId: string;
    decision: 'approve' | 'reject';
    comment?: string;
    at: string;
}
/**
 * One execution attempt of a step. Hub task #1280.
 *
 * `StepExecution` retains its top-level `status`/`error`/`output`/timing fields
 * — they always reflect the LATEST attempt, so existing single-attempt readers
 * are unaffected. `attempts[]` carries the full history for retry-aware UI
 * (history view, compare-attempts diff). See ADR-DURABLE-PIPELINE-EXECUTION.
 */
export interface StepAttempt {
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
export interface StepExecution {
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
 * hub#2226 — single entry in `StepExecution.patches`. Mirrors the
 * distributed-core `PatchEntry` shape but stays decoupled from the
 * type pin (consumers care about `patchId`, `appliedAt`, `revertedAt`,
 * `unvalidated`; `beforeContext`/`patch` are optional bookkeeping the
 * frontend doesn't need today).
 */
export interface PatchEntry {
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
export interface PipelineRunTrigger {
    userId?: string;
    triggerType: string;
    payload: Record<string, unknown>;
}
export type ErrorCategory = 'NetworkError' | 'TimeoutError' | 'ValidationError' | 'LLMError' | 'RegistryConflict'
/** A step looked at the request and said no (constraint not met, forbidden, revision conflict, invalid request): terminal, never retried. */
 | 'Refused'
/** The model could not sign in (missing or expired credentials): terminal until an operator refreshes them. */
 | 'ModelAuth' | 'UnknownError';
/** Whether the platform would retry this failure on its own; a `Refused` run is `terminal`. */
export type ErrorRetryability = 'retryable' | 'terminal' | 'unknown';
export interface PipelineRunError {
    nodeId: string;
    message: string;
    stack?: string;
    errorCategory?: ErrorCategory;
    retryability?: ErrorRetryability;
}
export interface TokenUsageByModel {
    tokensIn: number;
    tokensOut: number;
}
export interface PipelineRun {
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
/** A single resume-from-step entry on a PipelineRun (hub#2223). */
export interface ResumeFromStepEntry {
    fromNodeId: string;
    /** The step that originally failed when this resumption was triggered, if known. */
    originalFailedStepId?: string;
    at: string;
}
export type PipelineEventMap = {
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
/**
 * Wire envelope that wraps every PipelineEventMap event as it crosses the
 * network boundary (mock adapter in Phase 1, WebSocket in Phase 4+). Carries
 * ordering metadata that lets the frontend dedupe replayed events after a
 * ResourceRouter-orphaned run is resumed on a new owner.
 */
export interface PipelineWireEvent<K extends keyof PipelineEventMap = keyof PipelineEventMap> {
    eventType: K;
    payload: PipelineEventMap[K];
    /** Monotonic per-run sequence — starts at 0, increments on each emit. Stable across replays. */
    seq: number;
    /** Node id that emitted the event. For observability + debugging. */
    sourceNodeId: string;
    /** Wall-clock emission time (ms). Re-stamped on replay — NEVER use for dedupe. */
    emittedAt: number;
}
export type ValidationCode = 'NO_TRIGGER' | 'MULTIPLE_TRIGGERS' | 'CYCLE_DETECTED' | 'INVALID_HANDLE' | 'MISSING_CONFIG' | 'APPROVAL_NO_APPROVERS' | 'JOIN_INSUFFICIENT_INPUTS' | 'ORPHAN_NODE' | 'DEAD_END' | 'UNUSED_FORK_BRANCH' | 'UNUSED_CONDITION_BRANCH' | 'NO_ERROR_HANDLER' | 'LLM_NO_MAX_TOKENS' | 'UNGUARDED_APPROVAL_TIMEOUT' | 'LARGE_FORK' | 'DEEP_CHAIN' | 'DUPLICATE_NODE_NAME' | 'LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT' | 'NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED' | 'UNREACHABLE_AFTER_CONDITION_FALSE' | 'FORK_WITHOUT_MATCHING_JOIN';
export interface ValidationIssue {
    code: ValidationCode;
    message: string;
    severity: 'error' | 'warning';
    nodeId?: string;
    edgeId?: string;
    /** For config errors — which field on the node is at fault. */
    field?: string;
}
export interface ValidationResult {
    errors: ValidationIssue[];
    warnings: ValidationIssue[];
    /** `errors.length === 0`. */
    isValid: boolean;
    /** `errors.length === 0` — blocks publish (and therefore run), not save. */
    canPublish: boolean;
}
export {};
//# sourceMappingURL=pipeline.d.ts.map