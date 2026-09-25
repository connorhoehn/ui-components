export declare interface A2AMessage {
    id: string;
    from: string;
    to: string;
    content: string;
    protocol: 'a2a';
    timestamp: string;
    metadata?: Record<string, unknown>;
}

export declare interface A2ASession {
    sessionId: string;
    participants: AgentDefinition[];
    messages: A2AMessage[];
    startedAt: string;
    status: 'active' | 'completed' | 'failed';
}

export declare interface ActionNodeData {
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

export declare type ActionType = 'update-document' | 'post-comment' | 'notify' | 'webhook' | 'mcp-tool' | 'sync-back';

export declare type AdjustLayer = {
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

export declare interface AgentDefinition {
    id: string;
    name: string;
    status: AgentStatus;
    protocol: AgentProtocol;
    model: string;
    tools: string[];
    guardrails: string[];
    endpoint: string;
    description?: string;
    lastInvocation?: string;
    avgLatencyMs?: number;
    invocationsLast24h?: number;
}

export declare type AgentInvokeProtocol = 'a2a' | 'direct';

export declare interface AgentMetrics {
    agentId: string;
    invocationsTotal: number;
    invocationsLast24h: number;
    errorsLast24h: number;
    avgLatencyMs: number;
    p99LatencyMs: number;
    tokensInLast24h: number;
    tokensOutLast24h: number;
    guardrailBlocksLast24h: number;
    asOf: string;
}

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
export declare interface AgentNodeData {
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

export declare type AgentProtocol = 'a2a' | 'direct';

export declare type AgentStatus = 'healthy' | 'degraded' | 'offline' | 'deploying';

/** `step.output` shape for an `agent` node. */
export declare interface AgentStepOutput {
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

export declare type AgentStopReason = 'complete' | 'max_turns' | 'timeout' | 'error' | 'cancelled';

/** One tool invocation inside an agent loop, as persisted on the step output. */
export declare interface AgentToolCall {
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

export declare interface AgUiActivityDeltaEvent extends AgUiEventBase {
    type: 'ACTIVITY_DELTA';
    messageId: string;
    activityType: string;
    patch: JsonPatchOp[];
}

export declare interface AgUiActivitySnapshotEvent extends AgUiEventBase {
    type: 'ACTIVITY_SNAPSHOT';
    messageId: string;
    activityType: string;
    content: unknown;
    replace?: boolean;
}

export declare interface AgUiCustomEvent extends AgUiEventBase {
    type: 'CUSTOM';
    name: string;
    value: unknown;
}

export declare type AgUiEvent = AgUiRunStartedEvent | AgUiRunFinishedEvent | AgUiRunErrorEvent | AgUiStepStartedEvent | AgUiStepFinishedEvent | AgUiTextMessageStartEvent | AgUiTextMessageContentEvent | AgUiTextMessageEndEvent | AgUiTextMessageChunkEvent | AgUiToolCallStartEvent | AgUiToolCallArgsEvent | AgUiToolCallEndEvent | AgUiToolCallResultEvent | AgUiToolCallChunkEvent | AgUiStateSnapshotEvent | AgUiStateDeltaEvent | AgUiMessagesSnapshotEvent | AgUiActivitySnapshotEvent | AgUiActivityDeltaEvent | AgUiReasoningStartEvent | AgUiReasoningMessageStartEvent | AgUiReasoningMessageContentEvent | AgUiReasoningMessageEndEvent | AgUiReasoningMessageChunkEvent | AgUiReasoningEndEvent | AgUiReasoningEncryptedValueEvent | AgUiRawEvent | AgUiCustomEvent | AgUiMetaEvent;

declare interface AgUiEventBase {
    timestamp?: number;
    rawEvent?: unknown;
}

export declare type AgUiEventType = AgUiEvent['type'];

export declare interface AgUiMessage {
    id: string;
    role: AgUiRole;
    content: string;
    isStreaming: boolean;
    toolCalls: AgUiToolCall[];
    reasoning?: string;
}

export declare interface AgUiMessagesSnapshotEvent extends AgUiEventBase {
    type: 'MESSAGES_SNAPSHOT';
    messages: unknown[];
}

export declare interface AgUiMetaEvent extends AgUiEventBase {
    type: 'META_EVENT';
    metaType: string;
    payload: unknown;
}

export declare type AgUiOutputEventType = 'TEXT_MESSAGE_CONTENT' | 'STATE_DELTA' | 'CUSTOM';

export declare interface AgUiOutputNodeData {
    type: 'ag-ui-output';
    sourceField: string;
    eventType: AgUiOutputEventType;
    terminal: boolean;
    customEventName?: string;
}

export declare interface AgUiRawEvent extends AgUiEventBase {
    type: 'RAW';
    event: unknown;
    source?: string;
}

export declare interface AgUiReasoningEncryptedValueEvent extends AgUiEventBase {
    type: 'REASONING_ENCRYPTED_VALUE';
    subtype: 'message' | 'tool-call';
    entityId: string;
    encryptedValue: string;
}

export declare interface AgUiReasoningEndEvent extends AgUiEventBase {
    type: 'REASONING_END';
    messageId: string;
}

export declare interface AgUiReasoningMessageChunkEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CHUNK';
    messageId: string;
    delta?: string;
}

export declare interface AgUiReasoningMessageContentEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}

export declare interface AgUiReasoningMessageEndEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_END';
    messageId: string;
}

export declare interface AgUiReasoningMessageStartEvent extends AgUiEventBase {
    type: 'REASONING_MESSAGE_START';
    messageId: string;
    role: 'reasoning';
}

export declare interface AgUiReasoningStartEvent extends AgUiEventBase {
    type: 'REASONING_START';
    messageId: string;
}

export declare type AgUiRole = 'developer' | 'system' | 'assistant' | 'user' | 'tool';

export declare interface AgUiRunErrorEvent extends AgUiEventBase {
    type: 'RUN_ERROR';
    message: string;
    code?: string;
}

export declare interface AgUiRunFinishedEvent extends AgUiEventBase {
    type: 'RUN_FINISHED';
    outcome?: {
        type: 'success';
    } | {
        type: 'interrupt';
        interrupts: unknown[];
    };
    result?: unknown;
}

export declare interface AgUiRunStartedEvent extends AgUiEventBase {
    type: 'RUN_STARTED';
    threadId: string;
    runId: string;
    parentRunId?: string;
    input?: unknown;
}

export declare interface AgUiSession {
    threadId: string;
    runId: string | null;
    messages: AgUiMessage[];
    state: unknown;
}

export declare interface AgUiStateDeltaEvent extends AgUiEventBase {
    type: 'STATE_DELTA';
    delta: JsonPatchOp[];
}

export declare interface AgUiStateSnapshotEvent extends AgUiEventBase {
    type: 'STATE_SNAPSHOT';
    snapshot: unknown;
}

export declare interface AgUiStepFinishedEvent extends AgUiEventBase {
    type: 'STEP_FINISHED';
    stepName: string;
}

export declare interface AgUiStepStartedEvent extends AgUiEventBase {
    type: 'STEP_STARTED';
    stepName: string;
}

export declare interface AgUiTextMessageChunkEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CHUNK';
    messageId?: string;
    role?: AgUiRole;
    delta?: string;
}

export declare interface AgUiTextMessageContentEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_CONTENT';
    messageId: string;
    delta: string;
}

export declare interface AgUiTextMessageEndEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_END';
    messageId: string;
}

export declare interface AgUiTextMessageStartEvent extends AgUiEventBase {
    type: 'TEXT_MESSAGE_START';
    messageId: string;
    role: AgUiRole;
}

export declare interface AgUiToolCall {
    id: string;
    name: string;
    args: string;
    result?: unknown;
    status: 'streaming' | 'completed' | 'error';
    startedAt: number;
    endedAt?: number;
    parentMessageId?: string;
}

export declare interface AgUiToolCallArgsEvent extends AgUiEventBase {
    type: 'TOOL_CALL_ARGS';
    toolCallId: string;
    delta: string;
}

export declare interface AgUiToolCallChunkEvent extends AgUiEventBase {
    type: 'TOOL_CALL_CHUNK';
    toolCallId?: string;
    toolCallName?: string;
    parentMessageId?: string;
    delta?: string;
}

export declare interface AgUiToolCallEndEvent extends AgUiEventBase {
    type: 'TOOL_CALL_END';
    toolCallId: string;
}

export declare interface AgUiToolCallResultEvent extends AgUiEventBase {
    type: 'TOOL_CALL_RESULT';
    messageId: string;
    toolCallId: string;
    content: unknown;
    role?: string;
}

export declare interface AgUiToolCallStartEvent extends AgUiEventBase {
    type: 'TOOL_CALL_START';
    toolCallId: string;
    toolCallName: string;
    parentMessageId?: string;
}

export declare interface ApprovalNodeData {
    type: 'approval';
    approvers: Approver[];
    /** n-of-m — how many approvals required to pass. */
    requiredCount: number;
    timeoutMs?: number;
    timeoutAction?: ApprovalTimeoutAction;
    /** Message shown to the approver. */
    message?: string;
}

export declare interface ApprovalRecord {
    userId: string;
    decision: 'approve' | 'reject';
    comment?: string;
    at: string;
}

export declare type ApprovalTimeoutAction = 'reject' | 'approve' | 'escalate';

export declare interface Approver {
    type: 'user' | 'role';
    value: string;
}

declare type AssertTrue<T extends true> = T;

export declare interface AuditActor {
    type: 'admin' | 'user' | 'system';
    email?: string;
    userId?: string;
    reason?: string;
}

export declare interface AuditQueryParams {
    entityType?: string;
    entityId?: string;
    fromTime?: number;
    toTime?: number;
    limit?: number;
    cursor?: string;
}

export declare interface AuditRecord {
    timestamp: number;
    actor: AuditActor;
    entityType: string;
    entityId: string;
    operation: string;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
}

/**
 * Identity attached to every request handled by the pipeline router. The
 * host (platform-api today, distributed-core later) populates this from its
 * own auth middleware and injects a getter into the router factory; the
 * route handlers themselves never speak to Cognito / IAM / etc.
 *
 * `userId` is a stable opaque identifier — no assumption about format.
 * `scopes` is an optional capability list; routes that need fine-grained
 * authorization should check membership rather than guess from `userId`.
 */
export declare interface AuthContext {
    userId: string;
    scopes?: readonly string[];
}

/**
 * Authoring bounding-box painted by the user in BBoxAuthoringCanvas.
 * These are forwarded to the vision call as a system-prompt hint.
 */
export declare interface AuthoringBBox {
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

export declare interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** A flat comment as stored in Y.js. */
export declare interface CommentData {
    id: string;
    text: string;
    userId: string;
    displayName: string;
    color: string;
    timestamp: string;
    parentCommentId: string | null;
    resolved?: boolean;
    resolvedBy?: string;
    resolvedAt?: string;
}

/** A comment with nested replies, assembled client-side. */
export declare interface CommentThread extends CommentData {
    replies: CommentThread[];
}

export declare interface ConditionNodeData {
    type: 'condition';
    /** JSONPath or boolean expression evaluated over context. */
    expression: string;
    /** UI label shown on the node. */
    label?: string;
}

export declare interface ConflictField {
    /** Field key (path within the typed document — e.g. "title", "body.text"). */
    field: string;
    /** Value as it currently exists in the source system. */
    sourceValue: unknown;
    /** Value as it currently exists in the platform CRDT. */
    platformValue: unknown;
    /** Optional auto-merge proposal (if the engine produced one). */
    mergedValue?: unknown;
    /**
     * Who made the source-side edit, when the connector can tell us.
     *
     * Additive and optional because most connectors CANNOT tell us: a Drive
     * revision carries an editor, an S3 object generally does not. Absent means
     * "unattributed", and the review UI says exactly that rather than crediting
     * the change to the source system — "Contracts (Google Drive)" is where the
     * change came from, not who made it, and showing a system where a person
     * belongs is what made this queue unreadable.
     */
    changedBy?: string;
    /**
     * Human-readable location of this field in the document, outermost first —
     * e.g. `['Payment terms']`. The `field` path above is a machine key; this is
     * where a reader would look on the page. Optional: connectors that only know
     * the field path omit it, and the UI falls back to showing the path.
     */
    path?: string[];
}

export declare interface ConflictResolution {
    /** Which side wins as a whole — used when fieldChoices is empty. */
    pick: ConflictSide;
    /**
     * Optional per-field override map. Keys are field paths matching
     * ConflictField.field; values are 'source' | 'platform' | 'merged' or a
     * literal value supplied by the operator.
     */
    fieldChoices?: Record<string, ConflictSide | {
        custom: unknown;
    }>;
    /** Operator note explaining the pick. */
    note?: string;
}

export declare type ConflictSide = 'source' | 'platform' | 'merged';

/** Connection lifecycle states */
export declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export declare interface CreateClientInput {
    clientName: string;
    poolId: string;
    redirectUris: string[];
    postLogoutRedirectUris?: string[];
    grantTypes?: string[];
    responseTypes?: string[];
    scope?: string;
}

export declare interface CreateClientWithPoolInput {
    clientName: string;
    poolName: string;
    redirectUris: string[];
    grantTypes?: string[];
}

export declare interface CreateEmailTemplateInput {
    name: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    variables?: string[];
}

export declare interface CreateGroupInput {
    groupName: string;
    description?: string;
    permissions?: string[];
}

export declare interface CreatePoolInput {
    poolName: string;
    customAttributes?: Record<string, string>;
    settings?: Partial<PoolSettings>;
}

export declare interface CreateUserInput {
    email: string;
    password?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    customAttributes?: Record<string, unknown>;
}

export declare const CUSTOM_FIELD_TYPE_STORAGE_KEY = "ws_field_types_v1";

export declare interface CustomFieldType {
    id: string;
    name: string;
    icon: string;
    description: string;
    /**
     * Primitive storage type — e.g. 'long_text_and_summary', 'list_text'.
     * Identifies the Drupal-style data storage class the user selected.
     * Optional for backward-compat with records persisted before this field was added.
     */
    primitiveType?: string;
    /**
     * Which built-in renderer to delegate to for display.
     * Derived from primitiveType at creation time.
     */
    baseType: string;
    /**
     * Per-view-mode visibility + renderer choice from step 2 of the wizard.
     * Optional for backward-compat with records persisted before it existed;
     * absent means "visible everywhere, base type's default renderer".
     */
    display?: Partial<Record<ViewMode, CustomFieldTypeDisplay>>;
    createdAt: string;
    updatedAt: string;
}

/**
 * Step 2 ("Display") of the Data Types wizard, for one view mode.
 *
 * ADDITIVE, optional. Before this existed, `FieldTypesPage.handleSave` sent
 * only `{name, icon, description, primitiveType, baseType}` — the Visible
 * checkboxes and the renderer pickers had nowhere to be written, so every
 * step-2 choice was discarded the moment the user pressed Save and reopening
 * the type for edit showed all three modes visible with the default renderer.
 */
export declare interface CustomFieldTypeDisplay {
    /** Does this field appear at all in this view mode? */
    visible: boolean;
    /** Chosen renderer key, e.g. `'rich-text:reader'`. Absent = the base type's first. */
    renderer?: string;
}

export declare interface DiagnosticsInfo {
    node: Record<string, unknown>;
    cluster: Record<string, unknown>;
    resources: Record<string, unknown>;
}

export declare interface DlqEntry {
    id: string;
    payload: unknown;
    error: string;
    failedAt: string;
    retryCount: number;
}

export declare const DOCUMENT_TYPE_ICONS: string[];

export declare interface DocumentData {
    meta: DocumentMeta;
    sections: Section[];
}

export declare interface DocumentMeta {
    id: string;
    title: string;
    sourceType: 'transcript' | 'meeting' | 'notes' | 'custom';
    sourceId: string;
    createdBy: string;
    createdByName?: string;
    createdAt: string;
    aiModel: string;
    status: 'draft' | 'review' | 'final';
    documentType?: string;
    updatedAt?: string;
    activeCallSessionId?: string;
}

declare interface DocumentType_2 {
    id: string;
    name: string;
    description: string;
    icon: string;
    fields: DocumentTypeField[];
    /** Phase 51 / hub#66 — multi-page layout. Optional; absent = single-page (legacy). */
    pages?: DocumentTypePage[];
    /** Phase 51 / hub#66 — page-level configuration. Only meaningful when pages.length > 1. */
    pageConfig?: DocumentTypePageConfig;
    /**
     * Remote-first (2026-08): the server row this type is stored under.
     * Stamped on every server hydration and successful create. Its ABSENCE is
     * what marks a type as genuinely local (pre-remote-era or created offline)
     * and therefore eligible for the one-time upload migration — without it, a
     * cache entry of a server-DELETED type is indistinguishable from a local
     * type and gets resurrected onto the server forever.
     */
    serverTypeId?: string;
    createdAt: string;
    updatedAt: string;
}
export { DocumentType_2 as DocumentType }

export declare interface DocumentTypeField {
    id: string;
    name: string;
    sectionType: string;
    required: boolean;
    defaultCollapsed: boolean;
    placeholder: string;
    hiddenInModes: ViewMode[];
    rendererOverrides: Partial<Record<ViewMode, string>>;
}

export declare interface DocumentTypePage {
    id: string;
    title?: string;
    sectionIds: string[];
}

export declare interface DocumentTypePageConfig {
    showTableOfContents: boolean;
}

export declare interface EmailTemplate {
    templateId: string;
    name: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    variables: string[];
}

export declare type ErrorCategory = 'NetworkError' | 'TimeoutError' | 'ValidationError' | 'LLMError' | 'RegistryConflict'
/** A step looked at the request and said no (constraint not met, forbidden, revision conflict, invalid request): terminal, never retried. */
| 'Refused'
/** The model could not sign in (missing or expired credentials): terminal until an operator refreshes them. */
| 'ModelAuth' | 'UnknownError';

/** Whether the platform would retry this failure on its own; a `Refused` run is `terminal`. */
export declare type ErrorRetryability = 'retryable' | 'terminal' | 'unknown';

export declare interface ForkNodeData {
    type: 'fork';
    /** Number of parallel output branches (2..8). */
    branchCount: number;
    branchLabels?: string[];
}

/** Runtime configuration read from env vars */
export declare interface GatewayConfig {
    wsUrl: string;
    cognitoToken: string;
    defaultChannel: string;
}

/** Error received from the gateway (matches server error-codes.js format) */
export declare interface GatewayError {
    /** Standardized error code (e.g. AUTH_TOKEN_EXPIRED, AUTHZ_CHANNEL_DENIED) */
    code: string;
    /** Human-readable description for display */
    message: string;
    timestamp: string;
}

/** A raw message received over the WebSocket */
export declare interface GatewayMessage {
    type: string;
    action?: string;
    channel?: string;
    error?: GatewayError;
    [key: string]: unknown;
}

export declare type GeometricOp = GeometricOpRotate | GeometricOpFlip | GeometricOpFlop;

export declare type GeometricOpFlip = {
    op: 'flip';
};

export declare type GeometricOpFlop = {
    op: 'flop';
};

export declare type GeometricOpRotate = {
    op: 'rotate';
    degrees: number;
    background?: string;
    trimAfter?: boolean;
};

/**
 * Returns a fresh page-config (with safe defaults) when the stored
 * config is undefined. Used by the wizard so toggles always have a
 * value to bind to.
 */
export declare function getPageConfig(type: DocumentType_2): DocumentTypePageConfig;

/**
 * Migration helper. Returns the type's `pages` if present, otherwise
 * derives a single page that wraps every field. Pure function — does
 * NOT mutate the input. Existing code paths that don't know about
 * pages can keep reading `fields`; the wizard reads via this helper.
 */
export declare function getPagesView(type: DocumentType_2): DocumentTypePage[];

export declare interface GraphQueryNodeData {
    type: 'graph-query';
    graphId: string;
    query: string;
    parameters?: Record<string, string>;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

export declare type GuardrailAction = 'block' | 'mask' | 'warn';

export declare interface GuardrailNodeData {
    type: 'guardrail';
    guardrailId: string;
    guardrailVersion?: string;
    inputField: string;
    action: GuardrailAction;
    label?: string;
}

export declare interface IdentityClient {
    clientId: string;
    clientName: string;
    clientSecret?: string;
    poolId: string;
    poolName?: string;
    redirectUris: string[];
    postLogoutRedirectUris?: string[];
    grantTypes: string[];
    responseTypes?: string[];
    scope?: string;
}

export declare interface IdentityGroup {
    groupId: string;
    poolId: string;
    groupName: string;
    description?: string;
    permissions: string[];
    members?: string[];
}

export declare interface IdentityPool {
    poolId: string;
    poolName: string;
    clientId: string;
    customAttributes: Record<string, string>;
    settings: PoolSettings;
    createdAt: string;
}

export declare interface IdentityUser {
    userId: string;
    poolId: string;
    email: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    picture?: string;
    website?: string;
    status: 'CONFIRMED' | 'UNCONFIRMED' | 'FORCE_CHANGE_PASSWORD' | 'ARCHIVED' | 'COMPROMISED' | 'UNKNOWN';
    emailVerified?: boolean;
    mfaEnabled: boolean;
    groups: string[];
    customAttributes: Record<string, unknown>;
    createdAt: string;
    updatedAt?: string;
}

export declare interface ImageAdjustBwNodeData {
    type: 'image:adjust-bw';
    sourceImagePath?: string;
    algorithm?: 'luminosity' | 'average' | 'desaturate';
    contrast?: number;
}

export declare interface ImageAdjustLayerNodeData {
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

export declare interface ImageCropNodeData {
    type: 'image:crop';
    sourceImagePath?: string;
    bboxPath?: string;
    bbox?: BBox;
    materialize?: boolean;
}

export declare interface ImageDimensionsNodeData {
    type: 'image:dimensions';
    sourceImagePath?: string;
    /**
     * Longest-edge target used to derive generation dimensions. The handler
     * reads the source image's natural size and emits width/height/aspectRatio
     * plus genWidth/genHeight scaled to fit within `maxEdge`. Default: 1024.
     */
    maxEdge?: number;
}

export declare interface ImageEditPromptNodeData {
    type: 'image:edit-prompt';
    sourceImagePath?: string;
    maskImagePath?: string;
    prompt: string;
    model?: string;
}

export declare type ImageFormat = 'jpeg' | 'png' | 'webp' | 'avif';

export declare interface ImageFormatConvertNodeData {
    type: 'image:format-convert';
    sourceImagePath?: string;
    format: ImageFormat;
    quality?: number;
    lossless?: boolean;
    stripMetadata?: boolean;
}

export declare interface ImageGenerateNodeData {
    type: 'image:generate';
    prompt: string;
    model?: string;
    width?: number;
    height?: number;
    seed?: number;
    numImages?: number;
}

export declare interface ImageResizeNodeData {
    type: 'image:resize';
    sourceImagePath?: string;
    width?: number;
    height?: number;
    fit?: ResizeFit;
    withoutEnlargement?: boolean;
    background?: string;
}

export declare interface ImageSaveNodeData {
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

export declare interface ImageSharpenNodeData {
    type: 'image:sharpen';
    sourceImagePath?: string;
    sigma?: number;
    m1?: number;
    m2?: number;
}

export declare interface ImageSourceNodeData {
    type: 'image-source';
    /** imageId to inject into the pipeline context. */
    imageId?: string;
    /** Key under which the imageId is written to context. Default: 'imageRef'. */
    outputKey?: string;
}

export declare interface ImageTransformNodeData {
    type: 'image:transform';
    sourceImagePath?: string;
    operations: GeometricOp[];
}

export declare interface ImageUpscaleNodeData {
    type: 'image:upscale';
    sourceImagePath?: string;
    /** Optional prompt forwarded to the self-hosted x4 upscaler. */
    prompt?: string;
    /** Longest-edge cap applied before super-resolution. Default: 1024. */
    maxEdge?: number;
}

export declare interface ImageVariationNodeData {
    type: 'image:variation';
    sourceImagePath?: string;
    numVariations?: number;
    similarity?: number;
    model?: string;
}

export declare interface ImageVisionAnalyzeNodeData {
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

export declare interface ImageVisionClassifyNodeData {
    type: 'image:vision-classify';
    model?: string;
    imageRefPath: string;
    labels: string[];
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageVisionDescribeNodeData {
    type: 'image:vision-describe';
    model?: string;
    imageRefPath: string;
    userPrompt: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageVisionExtractTextNodeData {
    type: 'image:vision-extract-text';
    model?: string;
    imageRefPath: string;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageVisionTagNodeData {
    type: 'image:vision-tag';
    model?: string;
    imageRefPath: string;
    candidateTags?: string[];
    maxTags?: number;
    systemPrompt?: string;
    maxOutputTokens?: number;
}

export declare interface ImageWatermarkNodeData {
    type: 'image:watermark';
    sourceImagePath?: string;
    overlayImageId: string;
    gravity?: WatermarkGravity;
    opacity?: number;
    offsetX?: number;
    offsetY?: number;
}

export declare interface IngestItem {
    itemId: string;
    sourceId: string;
    sourcePath: string;
    status: IngestItemStatus;
    documentTypeId: string | null;
    documentId: string | null;
    pipelineRunId: string | null;
    mappingMethod: IngestMappingMethod | null;
    /** Confidence in the mapping decision (0..1). Null when no mapping attempted. */
    mappingConfidence?: number | null;
    /** Retry attempts so far. Optional — backend may omit. */
    attempts?: number;
    error: string | null;
    createdAt: string;
    updatedAt: string;
}

export declare type IngestItemStatus = 'queued' | 'mapping' | 'materializing' | 'triggering' | 'done' | 'failed';

export declare type IngestMappingMethod = 'rule' | 'llm-match' | 'llm-generate';

export declare interface IngestSource {
    sourceId: string;
    name: string;
    type: IngestSourceType;
    config: Record<string, unknown>;
    syncSchedule: string | null;
    mappingRules: MappingRule[];
    defaultPipelineId: string | null;
    /**
     * Per-DocType pipeline override. Keys are `targetTypeId` (the DocType id
     * a mapping rule resolved to); values are pipeline ids that should run
     * instead of `defaultPipelineId` for items of that type. Absent / empty
     * map ⇒ use defaultPipelineId for everything. AGENTIC_ETL_VISION §C.
     */
    pipelineByDocType?: Record<string, string>;
    status: IngestSourceStatus;
    lastSyncAt: string | null;
    lastSyncStats: SyncStats | null;
    createdAt: string;
    updatedAt: string;
}

export declare type IngestSourceStatus = 'active' | 'paused' | 'error';

export declare type IngestSourceType = 'local' | 's3' | 'google-drive' | 'webhook';

/**
 * Inline pipeline definition shipped on a trigger request. Optional: when
 * absent, the server resolves the definition from its persistent store.
 *
 * Carrying the full definition is keyed by `id`; everything else is
 * adapter-/version-specific and stays opaque from the contracts layer.
 */
export declare interface InlinePipelineDefinition {
    id: string;
    [key: string]: unknown;
}

export declare function isValidCustomFieldType(x: unknown): x is CustomFieldType;

export declare type JoinMergeStrategy = 'deep-merge' | 'array-collect' | 'last-writer-wins';

export declare type JoinMode = 'all' | 'any' | 'n_of_m';

export declare interface JoinNodeData {
    type: 'join';
    mode: JoinMode;
    /** Required when `mode === 'n_of_m'`. */
    n?: number;
    mergeStrategy: JoinMergeStrategy;
}

export declare interface JsonPatchOp {
    op: string;
    path: string;
    value?: unknown;
    from?: string;
}

export declare interface KnowledgeBaseNodeData {
    type: 'knowledge-base';
    knowledgeBaseId: string;
    queryTemplate: string;
    topK: number;
    scoreThreshold?: number;
    outputKey?: string;
    retryPolicy?: RetryPolicy;
}

export declare interface LLMNodeData {
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

export declare type LLMProvider = 'anthropic' | 'bedrock' | 'claude-code';

export declare function makeEmptyField(sectionType: string): DocumentTypeField;

export declare interface MappingRule {
    /** Glob or regex pattern matching source file paths. */
    pattern: string;
    /** Document type to assign when pattern matches. */
    documentTypeId: string;
    /** Optional pipeline to trigger on ingest. Overrides source-level default. */
    pipelineId?: string;
    /** Priority when multiple rules match — higher wins. */
    priority: number;
}

export declare interface McpToolNodeData {
    type: 'mcp-tool';
    gatewayUrl: string;
    toolName: string;
    inputTemplate: string;
    outputKey?: string;
    timeoutMs?: number;
    retryPolicy?: RetryPolicy;
}

export declare type MemoryMode = 'read' | 'write';

export declare interface MemoryNodeData {
    type: 'memory';
    mode: MemoryMode;
    scope: MemoryScope;
    namespace: string;
    keyExpression: string;
    valueField?: string;
    outputKey?: string;
}

export declare type MemoryScope = 'session' | 'long-term';

export declare interface MfaDevice {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    isVerified: boolean;
    createdAt: string;
    lastUsed?: string;
}

export declare interface MfaMetrics {
    totalUsers: number;
    mfaEnabled: number;
    mfaDisabled: number;
    adoptionRate: number;
}

export declare interface MfaSetupResult {
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
}

export declare type NodeData = TriggerNodeData | LLMNodeData | TransformNodeData | ConditionNodeData | ActionNodeData | ForkNodeData | JoinNodeData | ApprovalNodeData | AgentNodeData | GuardrailNodeData | McpToolNodeData | KnowledgeBaseNodeData | GraphQueryNodeData | MemoryNodeData | PolicyNodeData | AgUiOutputNodeData | ImageSourceNodeData | ImageSaveNodeData | ScatterNodeData | ImageResizeNodeData | ImageTransformNodeData | ImageFormatConvertNodeData | ImageSharpenNodeData | ImageWatermarkNodeData | ImageCropNodeData | ImageAdjustBwNodeData | ImageAdjustLayerNodeData | ImageDimensionsNodeData | ImageUpscaleNodeData | ImageVisionAnalyzeNodeData | ImageVisionClassifyNodeData | ImageVisionDescribeNodeData | ImageVisionTagNodeData | ImageVisionExtractTextNodeData | ImageGenerateNodeData | ImageVariationNodeData | ImageEditPromptNodeData;

export declare type NodeType = 'trigger' | 'llm' | 'transform' | 'condition' | 'action' | 'fork' | 'join' | 'approval' | 'agent' | 'mcp-tool' | 'knowledge-base' | 'graph-query' | 'memory' | 'guardrail' | 'policy' | 'ag-ui-output' | 'image-source' | 'image:save' | 'scatter' | 'image:resize' | 'image:transform' | 'image:format-convert' | 'image:sharpen' | 'image:watermark' | 'image:crop' | 'image:adjust-bw' | 'image:adjust-layer' | 'image:dimensions' | 'image:upscale' | 'image:vision-analyze' | 'image:vision-classify' | 'image:vision-describe' | 'image:vision-tag' | 'image:vision-extract-text' | 'image:generate' | 'image:variation' | 'image:edit-prompt';

export declare interface Participant {
    clientId: string;
    userId: string;
    displayName: string;
    color: string;
    mode: 'editor' | 'reviewer' | 'reader';
    currentSectionId: string | null;
    lastSeen?: number;
    idle?: boolean;
}

export declare interface PasswordPolicy {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
}

/**
 * hub#2226 — single entry in `StepExecution.patches`. Mirrors the
 * distributed-core `PatchEntry` shape but stays decoupled from the
 * type pin (consumers care about `patchId`, `appliedAt`, `revertedAt`,
 * `unvalidated`; `beforeContext`/`patch` are optional bookkeeping the
 * frontend doesn't need today).
 */
export declare interface PatchEntry {
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

export declare interface PipelineApprovalResolveRequest {
    stepId: string;
    decision: 'approve' | 'reject';
    /** Optional free-form note recorded alongside the decision. */
    comment?: string;
}

/** 204 No Content on success. No structured response body. */
export declare type PipelineApprovalResolveResponse = void;

export declare interface PipelineCancelRequest {
    /** Optional reason recorded in the audit log. */
    reason?: string;
}

/** 204 No Content on success. */
export declare type PipelineCancelResponse = void;

export declare interface PipelineDefinition {
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

export declare interface PipelineEdge {
    id: string;
    source: string;
    /** 'out', 'true'/'false', 'branch-N', 'approved'/'rejected', 'error'. */
    sourceHandle: string;
    target: string;
    /** 'in' or 'in-N' for Join. */
    targetHandle: string;
}

/** Structured error body returned on bridge / framework failures. */
export declare interface PipelineErrorBody {
    error: string;
    /** Logical action attempted ("trigger", "cancel", "resolveApproval", ...). */
    action: string;
}

/** Pipeline event frame received via WebSocket (type === 'pipeline:event') */
export declare interface PipelineEventFrame extends GatewayMessage {
    type: 'pipeline:event';
    eventType: PipelineWireEventType;
    payload: unknown;
    seq?: number;
    sourceNodeId?: string;
    emittedAt?: number;
    channel?: string;
}

export declare type PipelineEventMap = {
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

export declare interface PipelineNode {
    id: string;
    type: NodeType;
    position: {
        x: number;
        y: number;
    };
    /** Discriminated union keyed on `data.type`. */
    data: NodeData;
}

export declare interface PipelinePendingApproval {
    runId: string;
    pipelineId: string;
    stepId: string;
    approvers: readonly PipelinePendingApprover[];
    /** Display message authored on the approval node. */
    message?: string;
    /** ISO 8601 of the first request. */
    requestedAt: string;
    /** Number of approvals required to advance the step. Default 1. */
    requiredCount?: number;
    /** Approvals already recorded against the step. */
    recordedCount?: number;
}

export declare interface PipelinePendingApprovalsResponse {
    approvals: readonly PipelinePendingApproval[];
}

export declare interface PipelinePendingApprover {
    type: 'role' | 'user';
    value: string;
}

export declare interface PipelineRun {
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

/**
 * Full run snapshot. Same shape as `PipelineRunSummary` today; kept as a
 * distinct alias because the detail endpoint may grow fields that aren't
 * meaningful in list responses (full step input/output, attempt history,
 * audit trail) without churning the list shape.
 */
export declare type PipelineRunDetailResponse = PipelineRunSummary;

export declare interface PipelineRunError {
    nodeId: string;
    message: string;
    stack?: string;
    errorCategory?: ErrorCategory;
    retryability?: ErrorRetryability;
}

export declare interface PipelineRunsListQuery {
    /** Page size, clamped server-side to [1, 100]. */
    limit?: number;
    /** Opaque cursor returned by a prior page. */
    cursor?: string;
}

export declare interface PipelineRunsListResponse {
    runs: readonly PipelineRunSummary[];
    /** Present when more pages exist; pass to the next call as `cursor`. */
    nextCursor?: string;
}

export declare interface PipelineRunSummary {
    runId: string;
    pipelineId: string;
    /**
     * Canonical run status — the same vocabulary as `RunStatus` in
     * `./pipeline.ts`, which every comparison site in this library already
     * uses.
     *
     * This used to read `'running' | 'succeeded' | 'failed' | 'canceled' |
     * 'interrupted'`, a second dialect that no component ever compared
     * against. The runs list endpoint really did serve `succeeded` while the
     * detail endpoint served `completed` for the same run, and because
     * `src/api/pipelineRuns.ts` casts the wire shape straight to `PipelineRun`
     * without translating status, that alias reached the UI — where the status
     * filter (`components/pipelines/runsUtils.ts`) silently dropped it and the
     * stats page never counted it. Backend now serves canonical spellings from
     * both endpoints.
     *
     * `interrupted` is a platform-api-only lifecycle state (orphan scan /
     * force-fail outcome) that is not part of `RunStatus`, so it stays spelled
     * out here.
     *
     * `stuck` IS part of `RunStatus` (distributed-core's StuckRunDetector emits
     * `pipeline:run:stuck` for a run that has gone quiet); it must appear here
     * too or `WireCarriesEveryRunStatus` in `pipeline.ts` fails to compile.
     */
    status: 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed' | 'rejected' | 'failed' | 'cancelled' | 'stuck' | 'interrupted';
    startedAt: string;
    completedAt?: string;
    triggeredBy: {
        userId?: string;
        triggerType: string;
        payload?: Record<string, unknown>;
    };
    triggerType?: string;
    /** Per-step state map. Keyed by node ID; shape evolves with the framework. */
    steps?: Record<string, unknown>;
    /** Structured terminal-error envelope. Absent on non-failed runs. */
    error?: {
        nodeId: string;
        message: string;
        errorCategory?: string;
        retryability?: string;
        [key: string]: unknown;
    };
}

export declare interface PipelineRunTrigger {
    userId?: string;
    triggerType: string;
    payload: Record<string, unknown>;
}

export declare type PipelineStatus = 'draft' | 'published' | 'archived';

export declare interface PipelineTriggerRequest {
    /** Optional inline definition. When absent, server reads from store. */
    definition?: InlinePipelineDefinition;
    /** Free-form key/value passed to the trigger node's evaluation context. */
    triggerPayload?: Record<string, unknown>;
    /** Node IDs at which the run should pause for step-by-step debugging. */
    breakpoints?: readonly string[];
}

export declare interface PipelineTriggerResponse {
    runId: string;
    pipelineId: string;
    triggeredBy: {
        userId: string;
        triggerType: string;
    };
    /** ISO 8601 timestamp the server stamped the trigger acknowledgement. */
    at: string;
}

/**
 * Wire envelope that wraps every PipelineEventMap event as it crosses the
 * network boundary (mock adapter in Phase 1, WebSocket in Phase 4+). Carries
 * ordering metadata that lets the frontend dedupe replayed events after a
 * ResourceRouter-orphaned run is resumed on a new owner.
 */
export declare interface PipelineWireEvent<K extends keyof PipelineEventMap = keyof PipelineEventMap> {
    eventType: K;
    payload: PipelineEventMap[K];
    /** Monotonic per-run sequence — starts at 0, increments on each emit. Stable across replays. */
    seq: number;
    /** Node id that emitted the event. For observability + debugging. */
    sourceNodeId: string;
    /** Wall-clock emission time (ms). Re-stamped on replay — NEVER use for dedupe. */
    emittedAt: number;
}

/**
 * Wire-form event type carried on the gateway's `pipeline:event` frame.
 *
 * Most events use the same name on the wire as in `PipelineEventMap` (the
 * gateway bridge canonicalises distributed-core's colon-form `:` to dot-form
 * `.` to align with the in-app map keys). Known divergences:
 *
 *  - `pipeline.run.resume-from-step` (wire, kebab) ↔
 *    `pipeline:run:resumeFromStep` (in-app, colon-form)
 *
 * The kebab form is the canonical wire name from DC post-deprecation-window
 * (hub#2209). `WebSocketEventAdapter` normalises it before dispatch, so
 * subscribers key on `PipelineEventMap`. The type below admits both shapes so
 * that frame decoders don't fail typecheck on receipt of the kebab form.
 */
export declare type PipelineWireEventType = keyof PipelineEventMap | 'pipeline.run.resume-from-step';

export declare interface PolicyNodeData {
    type: 'policy';
    policyStoreId: string;
    principal: string;
    action: string;
    resource: string;
    contextEntities?: string;
    label?: string;
}

export declare interface PoolSettings {
    passwordPolicy?: PasswordPolicy;
    mfaConfiguration: 'OFF' | 'OPTIONAL' | 'REQUIRED';
    accountRecovery?: {
        email: boolean;
        sms: boolean;
    };
}

export declare interface PoolStats {
    userCount: number;
    poolId: string;
    poolName: string;
}

export declare interface RateInfo {
    [key: string]: unknown;
}

export declare type ResizeFit = 'cover' | 'contain' | 'fill' | 'inside' | 'outside';

/** A single resume-from-step entry on a PipelineRun (hub#2223). */
export declare interface ResumeFromStepEntry {
    fromNodeId: string;
    /** The step that originally failed when this resumption was triggered, if known. */
    originalFailedStepId?: string;
    at: string;
}

export declare interface RetryPolicy {
    maxAttempts: number;
    backoffMs: number;
    backoffMultiplier: number;
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
export declare type RunStatus = 'pending' | 'running' | 'awaiting_approval' | 'paused_at_breakpoint' | 'completed'
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

export declare interface ScatterNodeData {
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

export declare interface Section {
    id: string;
    type: 'summary' | 'tasks' | 'decisions' | 'notes' | 'custom';
    title: string;
    collapsed: boolean;
    items: TaskItem[];
    sectionType?: string;
    metadata?: Record<string, unknown>;
    placeholder?: string;
}

/** Per-section review status (DocuSign-style acknowledgement). */
export declare interface SectionReview {
    userId: string;
    displayName: string;
    status: 'reviewed' | 'approved' | 'changes_requested';
    timestamp: string;
    comment?: string;
}

/** Specialized section renderer type — extends beyond the base `type` for richer UIs. */
export declare type SectionType = 'tasks' | 'rich-text' | 'decisions' | 'timeline' | 'checklist' | 'rating' | 'voting';

/** Server welcome message (type === 'session') */
export declare interface SessionMessage extends GatewayMessage {
    type: 'session';
    clientId: string;
    sessionToken: string;
    restored: boolean;
}

export declare interface SetupStatus {
    hasUserPools: boolean;
    poolCount: number;
    hasClients: boolean;
    clientCount: number;
    hasAdminUser: boolean;
    totalUsers: number;
    adminEmails: string[];
    firstPoolId?: string;
    smtpConfigured: boolean;
    smtpHost?: string;
    smtpPort?: string;
    smtpFrom?: string;
    issuer: string;
    externalIssuer?: string;
    issuerIsCustom: boolean;
    issuerConfigured: boolean;
    wellKnownUrl?: string;
    firstClientId?: string;
}

export declare type SpanKind = 'agent' | 'tool' | 'llm' | 'retrieval' | 'guardrail' | 'internal';

export declare type SpanStatus = 'ok' | 'error' | 'unset';

/**
 * One execution attempt of a step. Hub task #1280.
 *
 * `StepExecution` retains its top-level `status`/`error`/`output`/timing fields
 * — they always reflect the LATEST attempt, so existing single-attempt readers
 * are unaffected. `attempts[]` carries the full history for retry-aware UI
 * (history view, compare-attempts diff). See ADR-DURABLE-PIPELINE-EXECUTION.
 */
export declare interface StepAttempt {
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

export declare interface StepExecution {
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

export declare type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'cancelled' | 'awaiting';

export declare interface SyncConflict {
    conflictId: string;
    sourceId: string;
    documentId: string;
    /**
     * The document's human name.
     *
     * Additive and optional. The review surface leads with the DOCUMENT, and
     * until now the only document identity in this payload was `documentId` — so
     * the page could not name the thing it was asking the operator to change.
     * Absent falls back to `documentId`.
     */
    documentTitle?: string;
    documentTypeId: string | null;
    /** Stable identity in the source system (e.g. Drive file id). */
    sourceRef: string;
    /** Free-form short summary, e.g. "title and body changed remotely". */
    summary: string;
    fields: ConflictField[];
    status: SyncConflictStatus;
    /** Last edit time from the platform side. */
    platformUpdatedAt: string;
    /** Last edit time from the source side. */
    sourceUpdatedAt: string;
    detectedAt: string;
    resolvedAt?: string | null;
}

export declare type SyncConflictStatus = 'pending' | 'resolved' | 'discarded';

export declare interface SyncStats {
    /** Total files the adapter saw on the source. */
    filesFound: number;
    /** Newly-ingested files (not seen before). */
    filesNew: number;
    /** Existing files whose hash changed since last sync. */
    filesUpdated: number;
    /** Files skipped (already-seen + unchanged). */
    filesSkipped: number;
    /** Errors during this sync (per-file failures). */
    errors: number;
    /** Sync duration in ms. */
    durationMs: number;
}

export declare interface TaskItem {
    id: string;
    text: string;
    status: 'pending' | 'acked' | 'done' | 'rejected';
    assignee: string;
    ackedBy: string;
    ackedAt: string;
    priority: 'low' | 'medium' | 'high';
    notes: string;
    dueDate?: string;
    category?: string;
}

export declare interface TokenUsageByModel {
    tokensIn: number;
    tokensOut: number;
}

export declare interface TraceSpan {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    name: string;
    kind: SpanKind;
    startTime: string;
    endTime: string;
    durationMs: number;
    status: SpanStatus;
    attributes: Record<string, string | number | boolean>;
}

export declare interface TraceTimeline {
    traceId: string;
    rootSpanId: string;
    spans: TraceSpan[];
    totalDurationMs: number;
    agentId: string;
    startedAt: string;
}

export declare interface TransformNodeData {
    type: 'transform';
    transformType: TransformType;
    expression: string;
    /** Where in context to write the result; defaults to merging into root. */
    outputKey?: string;
    /** Marks this node as an intentional terminal/sink — silences DEAD_END lint. */
    terminal?: boolean;
    retryPolicy?: RetryPolicy;
}

export declare type TransformType = 'jsonpath' | 'template' | 'javascript';

export declare interface TriggerBinding {
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

export declare interface TriggerNodeData {
    type: 'trigger';
    triggerType: TriggerType;
    /** Required for `document.*` triggers. */
    documentTypeId?: string;
    /** Cron expression; required when `triggerType === 'schedule'`. */
    schedule?: string;
    /** Required when `triggerType === 'webhook'`. */
    webhookPath?: string;
}

export declare type TriggerType = 'manual' | 'document.finalize' | 'document.comment' | 'document.submit' | 'schedule' | 'webhook';

export declare interface UpdateClientInput {
    clientName?: string;
    redirectUris?: string[];
    postLogoutRedirectUris?: string[];
    grantTypes?: string[];
    responseTypes?: string[];
    scope?: string;
}

export declare interface UpdateEmailTemplateInput {
    name?: string;
    subject?: string;
    htmlBody?: string;
    textBody?: string;
    variables?: string[];
}

export declare interface UpdateGroupInput {
    groupName?: string;
    description?: string;
    permissions?: string[];
}

export declare interface UpdatePoolInput {
    poolName?: string;
    customAttributes?: Record<string, string>;
    settings?: Partial<PoolSettings>;
}

export declare interface UpdateUserInput {
    email?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    picture?: string;
    website?: string;
    customAttributes?: Record<string, unknown>;
}

export declare type ValidationCode = 'NO_TRIGGER' | 'MULTIPLE_TRIGGERS' | 'CYCLE_DETECTED' | 'INVALID_HANDLE' | 'MISSING_CONFIG' | 'APPROVAL_NO_APPROVERS' | 'JOIN_INSUFFICIENT_INPUTS' | 'ORPHAN_NODE' | 'DEAD_END' | 'UNUSED_FORK_BRANCH' | 'UNUSED_CONDITION_BRANCH' | 'NO_ERROR_HANDLER' | 'LLM_NO_MAX_TOKENS' | 'UNGUARDED_APPROVAL_TIMEOUT' | 'LARGE_FORK' | 'DEEP_CHAIN' | 'DUPLICATE_NODE_NAME' | 'LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT' | 'NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED' | 'UNREACHABLE_AFTER_CONDITION_FALSE' | 'FORK_WITHOUT_MATCHING_JOIN';

export declare interface ValidationIssue {
    code: ValidationCode;
    message: string;
    severity: 'error' | 'warning';
    nodeId?: string;
    edgeId?: string;
    /** For config errors — which field on the node is at fault. */
    field?: string;
}

export declare interface ValidationResult {
    errors: ValidationIssue[];
    warnings: ValidationIssue[];
    /** `errors.length === 0`. */
    isValid: boolean;
    /** `errors.length === 0` — blocks publish (and therefore run), not save. */
    canPublish: boolean;
}

export declare type ViewMode = 'editor' | 'ack' | 'reader';

export declare type WatermarkGravity = 'northwest' | 'north' | 'northeast' | 'west' | 'center' | 'east' | 'southwest' | 'south' | 'southeast';

export declare type WireCarriesEveryRunStatus = AssertTrue<[
RunStatus
] extends [PipelineRunSummary['status']] ? true : false>;

export { }


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
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
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
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
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
