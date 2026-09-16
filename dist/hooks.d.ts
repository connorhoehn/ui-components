import { Awareness } from 'y-protocols/awareness';
import { Observable } from 'lib0/observable';
import { RefObject } from 'react';
import * as Y from 'yjs';

declare interface ActiveSync {
    sourceId: string;
    sourceName: string;
    fileCount: number;
    filesFetched: number;
    itemsMapped: number;
    itemsMaterialized: number;
    startedAt: string;
}

declare interface ActivityEvent {
    id: string;
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId?: string;
    displayName?: string;
    color?: string;
    source: 'local' | 'remote';
}

declare interface ApiCallState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    execute: (...args: unknown[]) => Promise<void>;
    retry: () => Promise<void>;
    reset: () => void;
}

declare interface ApiHealthCheck {
    status: 'ok' | 'error' | string;
    latencyMs?: number;
    error?: string;
}

declare interface ApiHealthSnapshot {
    status: ApiHealthStatus;
    checks: Record<string, ApiHealthCheck>;
    /** Names of failing dependencies (status !== 'ok'). Empty when healthy or unknown. */
    failing: string[];
}

declare type ApiHealthStatus = 'ok' | 'degraded' | 'unknown';

export declare interface AudioRecorder {
    state: AudioRecorderState;
    /** Wall time recorded so far (live while recording, final once recorded). */
    elapsedMs: number;
    blob: Blob | null;
    /** Object URL for `blob`, for a preview player. Revoked on reset/unmount. */
    url: string | null;
    mimeType: string | null;
    error: string | null;
    start: () => Promise<void>;
    stop: () => void;
    reset: () => void;
}

export declare type AudioRecorderState = 'idle' | 'starting' | 'recording' | 'recorded' | 'error';

declare interface AuditActor {
    type: 'admin' | 'user' | 'system';
    email?: string;
    userId?: string;
    reason?: string;
}

declare interface AuditQueryParams {
    entityType?: string;
    entityId?: string;
    fromTime?: number;
    toTime?: number;
    limit?: number;
    cursor?: string;
}

declare interface AuditRecord {
    timestamp: number;
    actor: AuditActor;
    entityType: string;
    entityId: string;
    operation: string;
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
}

declare interface AuthState {
    status: 'loading' | 'unauthenticated' | 'authenticated';
    idToken: string | null;
    email: string | null;
    error: string | null;
}

declare interface AwarenessFields {
    userId: string;
    displayName: string;
    color: string;
    mode: string;
    currentSectionId: string | null;
    lastSeen: number;
    idle: boolean;
    /** Tiptap cursor display name (may differ from displayName in edge cases). */
    name?: string;
}

declare interface AwarenessUpdaters {
    updateSection: (sectionId: string | null) => void;
    updateMode: (mode: string) => void;
    updateIdle: (idle: boolean) => void;
    /** Merge Tiptap-specific cursor info (name, color) without clobbering other fields. */
    updateCursorInfo: (name: string, color: string) => void;
}

declare type CallState = 'idle' | 'creating' | 'joining' | 'active' | 'error';

declare type CanvasTool = 'brush' | 'pen' | 'eraser' | 'select';

declare interface ChatAttachment {
    /** Correlation id shared with the sender's in-flight transfer. */
    id: string;
    /** Original filename. User content — never used as a path, never trusted. */
    name: string;
    /** Byte length of the stored object. */
    size: number;
    /** Declared MIME type. Advisory: used to pick a layout, never to trust. */
    contentType: string;
    /**
     * Authenticated download URL. Because the download route requires a bearer
     * token, an `<img src>` pointed straight at this will 401 — a resolved
     * object URL should be handed in as `src` by the integration layer.
     */
    url: string;
    /** Intrinsic dimensions when known, so the row reserves space before load. */
    width?: number;
    height?: number;
    /**
     * Tiny inline data-URI placeholder captured by the sender before upload.
     * Lets a recipient see what the image IS while the bytes are still moving.
     */
    preview?: string;
}

export declare interface ChatMessage {
    id?: string;
    clientId: string;
    /**
     * Authenticated sender, stamped server-side. Distinct from `clientId`,
     * which identifies a CONNECTION and changes on every reconnect — which is
     * why "is this mine" keys on this and never on clientId: otherwise your own
     * messages stop being yours partway up the thread.
     */
    userId?: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
    /**
     * Files shared alongside (or instead of) the text.
     *
     * An attachment rides ON a message rather than being its own message kind
     * so that ordering is free: the file lands exactly where the sender put it
     * in the conversation, interleaved correctly with the text around it. A
     * separate "file event" stream would have to be merged back against the
     * message stream at render time, and the merge would be wrong at exactly
     * the moment it matters — when someone is typing while a file uploads.
     *
     * `content` may be empty when a message is nothing but attachments.
     */
    attachments?: ChatAttachment[];
    /**
     * Server-stamped facts about what this message IS, beyond its text.
     *
     * The thread renders some messages as objects rather than sentences — a
     * document that was created, a call that is happening — and this is where
     * the facts for those live: `{ kind: 'document', documentId, title }`,
     * `{ kind: 'call', callId, participants, endedAt }`. The sentence stays in
     * `content` for everywhere that renders plain text (notification previews,
     * the conversation list preview), so a host that does nothing with metadata
     * still shows something true.
     *
     * Deliberately open: the gateway adds event kinds without the library
     * needing a release, and `documentRefFromMetadata` / `callRefFromMetadata`
     * are the readers that turn this back into something typed.
     */
    metadata?: Record<string, unknown>;
    /** ISO: the author changed the text after sending. Rendered as "(edited)". */
    editedAt?: string;
    /** ISO: the author (or a moderator) removed it. The row keeps its place and says so. */
    deletedAt?: string;
}

/** A flat comment as stored in Y.js. */
declare interface CommentData {
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

declare interface CommentItem {
    postId: string;
    commentId: string;
    authorId: string;
    content: string;
    parentCommentId?: string;
    createdAt: string;
    _fadeIn?: boolean;
}

/** A comment with nested replies, assembled client-side. */
declare interface CommentThread extends CommentData {
    replies: CommentThread[];
}

declare interface ConflictField {
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

declare interface ConflictResolution {
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

declare type ConflictSide = 'source' | 'platform' | 'merged';

/** Connection lifecycle states */
declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

declare interface CreateClientInput {
    clientName: string;
    poolId: string;
    redirectUris: string[];
    postLogoutRedirectUris?: string[];
    grantTypes?: string[];
    responseTypes?: string[];
    scope?: string;
}

declare interface CreateClientWithPoolInput {
    clientName: string;
    poolName: string;
    redirectUris: string[];
    grantTypes?: string[];
}

declare interface CreateEmailTemplateInput {
    name: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    variables?: string[];
}

declare interface CreateGroupInput {
    groupName: string;
    description?: string;
    permissions?: string[];
}

declare interface CreatePoolInput {
    poolName: string;
    customAttributes?: Record<string, string>;
    settings?: Partial<PoolSettings>;
}

declare interface CreateUserInput {
    email: string;
    password?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    customAttributes?: Record<string, unknown>;
}

declare type CursorMode = 'freeform' | 'table' | 'text' | 'canvas';

declare interface CustomFieldType {
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
declare interface CustomFieldTypeDisplay {
    /** Does this field appear at all in this view mode? */
    visible: boolean;
    /** Chosen renderer key, e.g. `'rich-text:reader'`. Absent = the base type's first. */
    renderer?: string;
}

declare type DeleteOutcome = {
    status: 'synced';
} | {
    status: 'offline';
    error: string;
} | {
    status: 'rejected';
    error: string;
};

declare interface DiagnosticsInfo {
    node: Record<string, unknown>;
    cluster: Record<string, unknown>;
    resources: Record<string, unknown>;
}

declare interface DlqEntry {
    id: string;
    payload: unknown;
    error: string;
    failedAt: string;
    retryCount: number;
}

declare interface DLQEntryRow {
    /** Envelope id — primary key for replay / purge. */
    id: string;
    /** Failed payload, T-untyped. The page renders a few well-known fields. */
    envelope: {
        id?: string;
        body?: unknown;
    };
    lastError: string;
    failedAtMs: number;
    totalAttempts: number;
}

declare interface DocTypeProposalRow {
    proposalId: string;
    sourceId: string;
    signature: string;
    sampleIngestIds: string[];
    proposedName: string;
    proposedDescription: string;
    proposedFields: ProposedField[];
    reasoning: string;
    status: 'pending' | 'promoted' | 'rejected';
    createdAt: string;
}

declare interface DocumentData {
    meta: DocumentMeta;
    sections: Section[];
}

declare interface DocumentInfo {
    id: string;
    title: string;
    type: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    description?: string;
    activeCallSessionId?: string;
}

declare interface DocumentMeta {
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

declare interface DocumentPresenceUser {
    userId: string;
    displayName: string;
    color: string;
    mode?: string;
    idle?: boolean;
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

declare interface DocumentTypeField {
    id: string;
    name: string;
    sectionType: string;
    required: boolean;
    defaultCollapsed: boolean;
    placeholder: string;
    hiddenInModes: ViewMode[];
    rendererOverrides: Partial<Record<ViewMode, string>>;
}

declare interface DocumentTypePage {
    id: string;
    title?: string;
    sectionIds: string[];
}

declare interface DocumentTypePageConfig {
    showTableOfContents: boolean;
}

declare interface EmailTemplate {
    templateId: string;
    name: string;
    subject: string;
    htmlBody: string;
    textBody: string;
    variables: string[];
}

declare interface EphemeralReaction {
    id: string;
    emoji: string;
    x: number;
    y: number;
    timestamp: string;
}

/** Runtime configuration read from env vars */
declare interface GatewayConfig {
    wsUrl: string;
    cognitoToken: string;
    defaultChannel: string;
}

/** Error received from the gateway (matches server error-codes.js format) */
declare interface GatewayError {
    /** Standardized error code (e.g. AUTH_TOKEN_EXPIRED, AUTHZ_CHANNEL_DENIED) */
    code: string;
    /** Human-readable description for display */
    message: string;
    timestamp: string;
}

/** A raw message received over the WebSocket */
declare interface GatewayMessage {
    type: string;
    action?: string;
    channel?: string;
    error?: GatewayError;
    [key: string]: unknown;
}

declare class GatewayProvider extends Observable<string> {
    readonly doc: Y.Doc;
    readonly channel: string;
    readonly awareness: Awareness;
    private readonly _sendMessage;
    private _synced;
    private _destroyed;
    private _awarenessTimer;
    private readonly _updateHandler;
    constructor(doc: Y.Doc, channel: string, sendMessage: SendMessage);
    /** Whether we have received at least one snapshot from the server. */
    get synced(): boolean;
    /**
     * Apply a remote Y.js document update received from the gateway.
     * Uses `this` as origin so the update handler above skips re-sending it.
     */
    applyRemoteUpdate(b64: string): void;
    /**
     * Apply the initial document snapshot from the server.
     * Functionally identical to applyRemoteUpdate but marks the provider as synced.
     */
    applySnapshot(b64: string): void;
    /**
     * Apply a remote awareness update received from the gateway.
     */
    applyAwarenessUpdate(b64: string): void;
    /**
     * Tell peers this client is gone — synchronously, on the current tick.
     *
     * The awareness sender is debounced by 50ms, which is fatal at teardown:
     * `Awareness.destroy()` clears the local state, our update handler schedules
     * the removal broadcast 50ms in the future, and by then `useYjsDoc` has
     * already sent `unsubscribe` for this channel (a gateway routes crdt
     * messages by subscription, so it drops the late one). On a page unload the
     * timer never runs at all. Either way the departing client lingers in every
     * other participant's avatar list until awareness times it out — or forever,
     * if no other awareness traffic arrives to prompt a re-render.
     */
    private _broadcastDeparture;
    destroy(): void;
}

declare interface GroupItem {
    groupId: string;
    name: string;
    description?: string;
    visibility: 'public' | 'private';
    ownerId: string;
    createdAt: string;
}

export declare const IDENTITY_BASE_URL: string;

export declare function identityApiFetch<T>(path: string, idToken: string | null, options?: RequestInit): Promise<T>;

declare interface IdentityClient {
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

declare interface IdentityGroup {
    groupId: string;
    poolId: string;
    groupName: string;
    description?: string;
    permissions: string[];
    members?: string[];
}

declare interface IdentityPool {
    poolId: string;
    poolName: string;
    clientId: string;
    customAttributes: Record<string, string>;
    settings: PoolSettings;
    createdAt: string;
}

declare interface IdentityUser {
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

declare interface IngestAuditEntry {
    auditId: string;
    createdAt: string;
    actor: string;
    eventType: IngestAuditEventType;
    targetType: 'source' | 'item' | 'document';
    targetId: string;
    summary: string;
    detail: Record<string, unknown>;
}

declare type IngestAuditEventType = 'mapping.decided' | 'source.created' | 'source.updated' | 'source.paused' | 'source.resumed' | 'writeback.attempted' | 'writeback.failed';

declare interface IngestAuditFilters {
    since?: string;
    until?: string;
    actor?: string;
    eventType?: IngestAuditEventType;
    targetId?: string;
    limit?: number;
}

declare interface IngestItem {
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

declare type IngestItemStatus = 'queued' | 'mapping' | 'materializing' | 'triggering' | 'done' | 'failed';

declare type IngestMappingMethod = 'rule' | 'llm-match' | 'llm-generate';

declare interface IngestProgressEvent {
    type: string;
    timestamp: string;
    [key: string]: unknown;
}

declare interface IngestSource {
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

declare type IngestSourceStatus = 'active' | 'paused' | 'error';

declare type IngestSourceType = 'local' | 's3' | 'google-drive' | 'webhook';

declare interface KeyboardShortcut {
    /** Key to match (case-insensitive, e.g., 's', 'Enter', 'Escape') */
    key: string;
    /** Require Cmd/Ctrl modifier */
    meta?: boolean;
    /** Require Shift modifier */
    shift?: boolean;
    /** Require Alt/Option modifier */
    alt?: boolean;
    /** Callback to invoke when shortcut matches */
    handler: (e: KeyboardEvent) => void;
    /** Prevent default browser action (default: true) */
    preventDefault?: boolean;
}

declare interface MappingRule {
    /** Glob or regex pattern matching source file paths. */
    pattern: string;
    /** Document type to assign when pattern matches. */
    documentTypeId: string;
    /** Optional pipeline to trigger on ingest. Overrides source-level default. */
    pipelineId?: string;
    /** Priority when multiple rules match — higher wins. */
    priority: number;
}

export declare interface MediaDeviceOption {
    deviceId: string;
    label: string;
    kind: MediaDeviceKind;
}

declare interface MediaDevices_2 {
    microphones: MediaDeviceOption[];
    cameras: MediaDeviceOption[];
    speakers: MediaDeviceOption[];
    /** True until the first enumeration has answered. */
    loading: boolean;
    /** False where `enumerateDevices` does not exist (insecure context, SSR). */
    supported: boolean;
    /** False where the browser cannot route audio to a chosen output. */
    canSelectSpeaker: boolean;
    /** True when at least one device came back without a label — permission not yet granted. */
    labelsHidden: boolean;
    refresh: () => Promise<void>;
}
export { MediaDevices_2 as MediaDevices }

declare interface MemberItem {
    groupId: string;
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: string;
    displayName?: string;
    status?: string;
}

declare interface MentionItem {
    kind: 'mention';
    sectionId: string;
    sectionTitle: string;
    commentId: string;
    authorName: string;
    authorColor: string;
    commentText: string;
    timestamp: string;
}

declare interface MentionUser {
    userId: string;
    displayName: string;
    color: string;
    online: boolean;
    mode?: string;
    type: 'user' | 'group';
    memberCount?: number;
}

declare interface MfaDevice {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    isVerified: boolean;
    createdAt: string;
    lastUsed?: string;
}

declare interface MfaMetrics {
    totalUsers: number;
    mfaEnabled: number;
    mfaDisabled: number;
    adoptionRate: number;
}

declare interface MfaSetupResult {
    deviceId: string;
    qrCode: string;
    secret: string;
    backupCodes: string[];
}

declare type MyItem = MentionItem | TaskAssignment;

declare type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_2 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_3 = (handler: (msg: GatewayMessage) => void) => () => void;

declare type OnMessageFn_4 = (handler: (msg: GatewayMessage) => void) => () => void;

declare interface Participant {
    clientId: string;
    userId: string;
    displayName: string;
    color: string;
    mode: 'editor' | 'reviewer' | 'reader';
    currentSectionId: string | null;
    lastSeen?: number;
    idle?: boolean;
}

declare interface PasswordPolicy {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
}

/** The first container this browser can record, or `undefined` for its default. */
export declare function pickRecordingMimeType(preferred?: string): string | undefined;

declare interface PipelineDefSummary {
    id: string;
    name: string;
    status?: string;
    icon?: string;
}

declare interface PoolSettings {
    passwordPolicy?: PasswordPolicy;
    mfaConfiguration: 'OFF' | 'OPTIONAL' | 'REQUIRED';
    accountRecovery?: {
        email: boolean;
        sms: boolean;
    };
}

declare interface PoolStats {
    userCount: number;
    poolId: string;
    poolName: string;
}

declare interface PostItem {
    roomId: string;
    postId: string;
    authorId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    _fadeIn?: boolean;
}

declare interface PresenceUser {
    clientId: string;
    status: string;
    metadata: Record<string, unknown>;
}

declare interface ProfileItem {
    userId: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    visibility: 'public' | 'private';
    createdAt: string;
    updatedAt: string;
}

declare interface ProposedField {
    name: string;
    sectionType: string;
    required: boolean;
}

declare interface PublicProfile {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    visibility: 'public' | 'private';
}

declare interface RateInfo {
    [key: string]: unknown;
}

declare interface RemoteCursor {
    clientId: string;
    position: Record<string, unknown>;
    metadata: Record<string, unknown>;
}

declare interface RoomItem {
    roomId: string;
    channelId: string;
    name: string;
    type: 'standalone' | 'group' | 'dm';
    ownerId: string;
    groupId?: string;
    dmPeerUserId?: string;
    createdAt: string;
}

declare interface RoomMemberItem {
    roomId: string;
    userId: string;
    displayName?: string;
    joinedAt: string;
}

declare type SaveOutcome = {
    status: 'synced';
    type: DocumentType_2;
}
/** Server unreachable / 5xx — saved to the local cache, NOT on the server. */
| {
    status: 'offline';
    type: DocumentType_2;
    error: string;
}
/** Server rejected the payload (4xx) — NOTHING was saved. */
| {
    status: 'rejected';
    error: string;
};

declare interface Section {
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
declare interface SectionReview {
    userId: string;
    displayName: string;
    status: 'reviewed' | 'approved' | 'changes_requested';
    timestamp: string;
    comment?: string;
}

declare type SendMessage = (msg: Record<string, unknown>) => void;

declare interface SetupStatus {
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

declare interface SloPoint {
    at: string;
    value: number | null;
}

declare type SloWindow = '15m' | '1h' | '6h' | '24h';

/** Plain-object snapshot of a section for diffing (no Y.js references). */
declare interface SnapshotSection {
    id: string;
    type: string;
    title: string;
    /** Plain text extracted from the section's rich-text content. */
    textContent: string;
    items: Array<{
        id: string;
        text: string;
        status: string;
        assignee: string;
        priority: string;
    }>;
}

declare interface SourceSloMetrics {
    sourceId: string;
    window: string;
    bucketSizeMs: number;
    latencyP95: SloPoint[];
    errorRate: SloPoint[];
    queueDepth: SloPoint[];
}

declare interface SyncConflict {
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

declare type SyncConflictStatus = 'pending' | 'resolved' | 'discarded';

declare interface SyncStats {
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

declare interface TaskAssignment {
    kind: 'task';
    sectionId: string;
    sectionTitle: string;
    itemId: string;
    taskText: string;
    status: string;
    priority: string;
}

declare interface TaskItem {
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

declare interface TextSelectionData {
    start: number;
    end: number;
    text: string;
}

declare interface TypedDocument {
    documentId: string;
    typeId: string;
    values: Record<string, TypedDocumentValue>;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

declare type TypedDocumentValue = string | string[] | number | number[] | boolean;

/** Where the currently rendered list came from. */
declare type TypesSource = 'loading' | 'remote' | 'cache';

declare interface UpdateClientInput {
    clientName?: string;
    redirectUris?: string[];
    postLogoutRedirectUris?: string[];
    grantTypes?: string[];
    responseTypes?: string[];
    scope?: string;
}

declare interface UpdateEmailTemplateInput {
    name?: string;
    subject?: string;
    htmlBody?: string;
    textBody?: string;
    variables?: string[];
}

declare interface UpdateGroupInput {
    groupName?: string;
    description?: string;
    permissions?: string[];
}

declare interface UpdatePoolInput {
    poolName?: string;
    customAttributes?: Record<string, string>;
    settings?: Partial<PoolSettings>;
}

declare interface UpdateUserInput {
    email?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    picture?: string;
    website?: string;
    customAttributes?: Record<string, unknown>;
}

declare interface UrlFilterState<T extends Record<string, string | undefined>> {
    filters: T;
    setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
    clearFilters: () => void;
}

export declare function useActivityBus(options: UseActivityBusOptions): UseActivityBusReturn;

declare interface UseActivityBusOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    connectionState: ConnectionState;
    userId: string;
    displayName: string;
    color?: string;
    maxItems?: number;
}

declare interface UseActivityBusReturn {
    events: ActivityEvent[];
    publish: (eventType: string, detail: Record<string, unknown>) => void;
    isLive: boolean;
}

/**
 * Wrap an async function with loading/error/retry state.
 * Useful for API calls in components that need to show loading spinners,
 * error messages, and retry buttons.
 *
 * @param fn Async function to wrap
 * @returns { data, loading, error, execute, retry, reset }
     *
     * @example
     * const { data, loading, error, execute, retry } = useApiCall(
     *   async (pipelineId: string) => {
     *     const res = await fetch(`/api/pipelines/${pipelineId}`);
     *     return res.json();
     *   }
     * );
     *
     * useEffect(() => { execute(pipelineId); }, [pipelineId]);
     */
 export declare function useApiCall<T>(fn: (...args: unknown[]) => Promise<T>): ApiCallState<T>;

 /**
  * Polls /health every `pollMs`. The first sample lands as soon as the network
  * round-trip completes; the hook starts in `unknown` so callers don't flash
  * "degraded" before the first response.
  */
 export declare function useApiHealth(pollMs?: number): ApiHealthSnapshot;

 export declare function useAudioRecorder({ getStream, maxMs, mimeType, audioBitsPerSecond }: UseAudioRecorderOptions): AudioRecorder;

 export declare interface UseAudioRecorderOptions {
     /** How to get a microphone — the host owns device preferences and constraints. */
     getStream: () => Promise<MediaStream>;
     /** Recording stops itself here. */
     maxMs?: number;
     /** Preferred container; falls back through what the browser can encode. */
     mimeType?: string;
     audioBitsPerSecond?: number;
 }

 export declare function useAuth(): UseAuthReturn;

 declare interface UseAuthReturn extends AuthState {
     signIn: (email: string, password: string) => Promise<void>;
     signUp: (email: string, password: string) => Promise<void>;
     signOut: () => void;
 }

 export declare function useAwareness(provider: GatewayProvider | null, opts: UseAwarenessOptions): UseAwarenessReturn;

 declare interface UseAwarenessOptions {
     userId: string;
     displayName: string;
     color: string;
     mode: ViewMode;
 }

 declare interface UseAwarenessReturn {
     awareness: AwarenessUpdaters;
     participants: Participant[];
 }

 export declare function useAwarenessState(provider: GatewayProvider | null, initial: Omit<AwarenessFields, 'lastSeen' | 'idle'>): AwarenessUpdaters;

 export declare function useChat(options: UseChatOptions): UseChatReturn;

 declare interface UseChatOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
     displayName: string;
 }

 declare interface UseChatReturn {
     messages: ChatMessage[];
     send: (content: string) => void;
 }

 /**
  * Invoke `onClickOutside` when a mousedown occurs outside the ref element.
  * Useful for closing popovers, dropdowns, and modals on outside click.
  *
  * @param ref React ref to the element that should not trigger the callback.
  *   Accepts a nullable ref — under React 19's types `useRef<HTMLDivElement>(null)`
  *   yields `RefObject<HTMLDivElement | null>`, so the previous non-null
  *   `RefObject<T>` signature rejected every ref a component can actually
  *   create (including this hook's own example below). Widening is
  *   source-compatible for existing callers.
  * @param onClickOutside Callback invoked on outside click
  * @param enabled Enable/disable the listener (default: true)
  *
  * @example
  * const menuRef = useRef<HTMLDivElement>(null);
  * useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
  */
 export declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, onClickOutside: () => void, enabled?: boolean): void;

 export declare function useCollaborativeDoc(options: UseCollaborativeDocOptions): UseCollaborativeDocReturn;

 declare interface UseCollaborativeDocOptions {
     documentId: string;
     mode: ViewMode;
     ws: UseWebSocketReturn;
     userId: string;
     displayName: string;
     color: string;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
 }

 declare interface UseCollaborativeDocReturn {
     meta: DocumentMeta | null;
     sections: Section[];
     synced: boolean;
     updateMeta: (partial: Partial<DocumentMeta>) => void;
     addSection: (section: Section) => void;
     updateSection: (sectionId: string, partial: Partial<Section>) => void;
     removeSection: (sectionId: string) => void;
     addItem: (sectionId: string, item: TaskItem) => void;
     updateItem: (sectionId: string, itemId: string, partial: Partial<TaskItem>) => void;
     ackItem: (sectionId: string, itemId: string, userId: string) => void;
     rejectItem: (sectionId: string, itemId: string, userId: string) => void;
     removeItem: (sectionId: string, itemId: string) => void;
     getSectionFragment: (sectionId: string) => Y.XmlFragment | null;
     ydoc: Y.Doc | null;
     provider: GatewayProvider | null;
     /**
      * @deprecated NOT IMPLEMENTED. Calling this logs a warning and does
      * nothing — it does not load anything into the document. It is retained
      * only because it is part of this hook's published return shape; removing
      * it is a breaking change. Do not call it expecting an effect.
      */
     loadFromMarkdown: (markdown: string) => void;
     exportJSON: () => DocumentData | null;
     participants: Participant[];
     comments: Record<string, CommentThread[]>;
     addComment: (sectionId: string, opts: {
         text: string;
         userId: string;
         displayName: string;
         color: string;
         parentCommentId?: string | null;
     }) => void;
     resolveThread: (sectionId: string, commentId: string, resolverDisplayName: string) => void;
     unresolveThread: (sectionId: string, commentId: string) => void;
     sectionReviews: Record<string, SectionReview[]>;
     reviewSection: (sectionId: string, status: SectionReview['status'], comment?: string) => void;
     awareness: AwarenessUpdaters;
 }

 export declare function useComments({ idToken, roomId, postId, onMessage }: UseCommentsOptions): UseCommentsReturn;

 declare interface UseCommentsOptions {
     idToken: string | null;
     roomId: string | null;
     postId: string | null;
     onMessage: OnMessageFn;
 }

 declare interface UseCommentsReturn {
     comments: CommentItem[];
     createComment: (content: string, parentCommentId?: string) => Promise<void>;
     deleteComment: (commentId: string) => Promise<void>;
     /** True only while the thread itself is being fetched. */
     loading: boolean;
     /**
      * True while `createComment` is posting. Separate from `loading` because
      * `CommentThread` swaps the whole list out for "Loading comments…" when
      * `loading` is true — so sharing one flag made every existing comment
      * disappear for the duration of posting a reply.
      */
     submitting: boolean;
     error: string | null;
 }

 export declare function useCRDT(options: UseCRDTOptions): UseCRDTReturn;

 declare interface UseCRDTOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
 }

 declare interface UseCRDTReturn {
     content: string;
     applyLocalEdit: (newText: string) => void;
     hasConflict: boolean;
     dismissConflict: () => void;
 }

 export declare function useCursors(options: UseCursorsOptions): UseCursorsReturn;

 declare interface UseCursorsOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
     clientId: string | null;
     displayName: string;
 }

 declare interface UseCursorsReturn {
     cursors: Map<string, RemoteCursor>;
     localCursor: RemoteCursor | null;
     activeMode: CursorMode;
     sendFreeformUpdate: (x: number, y: number) => void;
     sendTableUpdate: (row: number, col: number) => void;
     sendTextUpdate: (position: number, selectionData: TextSelectionData | null, hasSelection: boolean) => void;
     sendCanvasUpdate: (x: number, y: number, tool: CanvasTool, color: string, size: number) => void;
     switchMode: (mode: CursorMode) => void;
 }

 export declare function useCustomFieldTypes(): UseCustomFieldTypesReturn;

 declare interface UseCustomFieldTypesReturn {
     types: CustomFieldType[];
     createType: (draft: Omit<CustomFieldType, 'id' | 'createdAt' | 'updatedAt'>) => CustomFieldType;
     updateType: (id: string, patch: Partial<Omit<CustomFieldType, 'id' | 'createdAt'>>) => void;
     deleteType: (id: string) => void;
 }

 export declare function useDocTypeProposals(): UseDocTypeProposalsResult;

 declare interface UseDocTypeProposalsResult {
     proposals: DocTypeProposalRow[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     promote: (proposalId: string) => Promise<void>;
     reject: (proposalId: string) => Promise<void>;
 }

 export declare function useDocumentComments(options: UseDocumentCommentsOptions): UseDocumentCommentsReturn;

 declare interface UseDocumentCommentsOptions {
     documentId: string;
     idToken: string | null;
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: string;
 }

 declare interface UseDocumentCommentsReturn {
     comments: Record<string, CommentThread[]>;
     addComment: (sectionId: string, text: string, parentCommentId?: string | null) => Promise<void>;
     resolveThread: (sectionId: string, commentId: string) => Promise<void>;
     unresolveThread: (sectionId: string, commentId: string) => Promise<void>;
     loading: boolean;
 }

 export declare function useDocumentExport(ydoc: Y.Doc | null): UseDocumentExportReturn;

 declare interface UseDocumentExportReturn {
     exportJSON: () => DocumentData | null;
 }

 export declare function useDocumentItems(options: UseDocumentItemsOptions): UseDocumentItemsReturn;

 declare interface UseDocumentItemsOptions {
     documentId: string;
     /** Section IDs to load items for. Items are fetched per-section. */
     sectionIds: string[];
     idToken: string | null;
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: string;
 }

 declare interface UseDocumentItemsReturn {
     items: Record<string, TaskItem[]>;
     addItem: (sectionId: string, item: Partial<TaskItem>) => Promise<void>;
     updateItem: (sectionId: string, itemId: string, updates: Partial<TaskItem>) => Promise<void>;
     removeItem: (sectionId: string, itemId: string) => Promise<void>;
     ackItem: (sectionId: string, itemId: string) => Promise<void>;
     loading: boolean;
     /**
      * Per-section load failures, keyed by sectionId. A section present here
      * failed to load — which is NOT the same as having no items, and the two
      * used to be indistinguishable (see the catch in the load effect).
      * Sections that loaded fine are absent from this map.
      */
     itemErrors: Record<string, string>;
 }

 export declare function useDocumentMetadata(ydoc: Y.Doc | null): UseDocumentMetadataReturn;

 declare interface UseDocumentMetadataReturn {
     meta: DocumentMeta | null;
     updateMeta: (partial: Partial<DocumentMeta>) => void;
 }

 export declare function useDocumentReviews(options: UseDocumentReviewsOptions): UseDocumentReviewsReturn;

 declare interface UseDocumentReviewsOptions {
     documentId: string;
     idToken: string | null;
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: string;
 }

 declare interface UseDocumentReviewsReturn {
     sectionReviews: Record<string, SectionReview[]>;
     reviewSection: (sectionId: string, status: string, comment?: string) => Promise<void>;
     loading: boolean;
 }

 export declare function useDocuments(options: UseDocumentsOptions): UseDocumentsReturn;

 declare interface UseDocumentsOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     connectionState: ConnectionState;
 }

 declare interface UseDocumentsReturn {
     documents: DocumentInfo[];
     presence: Record<string, DocumentPresenceUser[]>;
     loading: boolean;
     createDocument: (meta: {
         title: string;
         type: string;
         description?: string;
     }) => void;
     deleteDocument: (documentId: string) => void;
     updateDocumentMeta: (documentId: string, meta: Partial<DocumentInfo>) => void;
     refreshDocuments: () => void;
     refreshPresence: () => void;
 }

 export declare function useDocumentTypes(options?: UseDocumentTypesOptions): UseDocumentTypesReturn;

 declare interface UseDocumentTypesOptions {
     /** Cognito ID token. Attached to every server call when present. */
     idToken?: string | null;
 }

 declare interface UseDocumentTypesReturn {
     types: DocumentType_2[];
     /** True while the initial server fetch (or a refresh) is in flight. */
     loading: boolean;
     /** 'remote' = list reflects the server; 'cache' = offline fallback. */
     source: TypesSource;
     /** Last fetch error (when source === 'cache'), else null. */
     error: string | null;
     /** Re-fetch from the server. */
     refresh: () => Promise<void>;
     createType: (data: Omit<DocumentType_2, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SaveOutcome>;
     updateType: (id: string, patch: Partial<Omit<DocumentType_2, 'id' | 'createdAt'>>) => Promise<SaveOutcome>;
     deleteType: (id: string) => Promise<DeleteOutcome>;
     getType: (id: string) => DocumentType_2 | undefined;
 }

 export declare function useEventCallback<A extends any[], R>(fn: ((...args: A) => R) | undefined): (...args: A) => R | undefined;

 export declare function useFriends({ idToken }: UseFriendsOptions): UseFriendsReturn;

 declare interface UseFriendsOptions {
     idToken: string | null;
 }

 declare interface UseFriendsReturn {
     followers: PublicProfile[];
     following: PublicProfile[];
     friends: PublicProfile[];
     follow: (userId: string) => Promise<void>;
     unfollow: (userId: string) => Promise<void>;
     loading: boolean;
     error: string | null;
     /**
      * Failure of the three list loads specifically. Kept separate from `error`,
      * which is whatever the last follow/unfollow reported.
      *
      * A caller cannot use `error` to decide between "you follow nobody" and "we
      * never managed to read your graph": a refused *follow* also sets `error`,
      * so keying an error state off it made a rejected button click claim the
      * whole graph had failed to load. Only `loadError` means the lists below are
      * empty because we do not know, not because they are empty.
      */
     loadError: string | null;
 }

 export declare function useGroups({ idToken }: UseGroupsOptions): UseGroupsReturn;

 declare interface UseGroupsOptions {
     idToken: string | null;
 }

 declare interface UseGroupsReturn {
     groups: GroupItem[];
     /**
      * Re-run `GET /api/groups`. Called once on mount (and on every `idToken`
      * change); exposed so a failed load can be retried without a remount.
      */
     refresh: () => Promise<void>;
     /**
      * `false` until the first `GET /api/groups` has settled. Distinguishes
      * "the server says you have no groups" from "we have not asked yet" —
      * without it an empty `groups` array renders the same "No groups yet"
      * empty state in both cases.
      */
     loaded: boolean;
     /**
      * Failure of the list load specifically. Kept separate from `error`, which
      * is whatever the last create/join/invite/… attempt reported: a refused
      * invite must not blank out a list that loaded perfectly well.
      */
     loadError: string | null;
     createGroup: (name: string, description?: string, visibility?: 'public' | 'private') => Promise<void>;
     deleteGroup: (groupId: string) => Promise<void>;
     joinGroup: (groupId: string) => Promise<void>;
     leaveGroup: (groupId: string) => Promise<void>;
     inviteUser: (groupId: string, userId: string) => Promise<void>;
     acceptInvite: (groupId: string, accept: boolean) => Promise<void>;
     loadMembers: (groupId: string) => Promise<void>;
     members: MemberItem[];
     loading: boolean;
     error: string | null;
 }

 export declare function useIdentityAdmin(): UseIdentityAdminReturn;

 declare interface UseIdentityAdminReturn {
     authenticated: boolean;
     loading: boolean;
     error: string | null;
     login: (email: string, password: string) => Promise<void>;
     logout: () => Promise<void>;
     checkSession: () => Promise<void>;
 }

 export declare function useIdentityAudit(): UseIdentityAuditReturn;

 declare interface UseIdentityAuditReturn {
     records: AuditRecord[];
     loading: boolean;
     error: string | null;
     query: (params: AuditQueryParams) => Promise<void>;
     getEntityHistory: (entityType: string, entityId: string) => Promise<AuditRecord[]>;
     getStateAtTime: (entityId: string, timestamp: number) => Promise<Record<string, unknown> | null>;
 }

 export declare function useIdentityClients(): UseIdentityClientsReturn;

 declare interface UseIdentityClientsReturn {
     clients: IdentityClient[];
     loading: boolean;
     error: string | null;
     createClient: (input: CreateClientInput) => Promise<IdentityClient | null>;
     updateClient: (clientId: string, input: UpdateClientInput) => Promise<IdentityClient | null>;
     deleteClient: (clientId: string) => Promise<void>;
     createWithPool: (input: CreateClientWithPoolInput) => Promise<IdentityClient | null>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityDiagnostics(): UseIdentityDiagnosticsReturn;

 declare interface UseIdentityDiagnosticsReturn {
     diagnostics: DiagnosticsInfo | null;
     rates: RateInfo | null;
     dlq: DlqEntry[];
     loading: boolean;
     error: string | null;
     redriveDlq: (id: string) => Promise<void>;
     purgeDlq: (id: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityEmailTemplates(): UseIdentityEmailTemplatesReturn;

 declare interface UseIdentityEmailTemplatesReturn {
     templates: EmailTemplate[];
     loading: boolean;
     error: string | null;
     createTemplate: (input: CreateEmailTemplateInput) => Promise<EmailTemplate | null>;
     updateTemplate: (templateId: string, input: UpdateEmailTemplateInput) => Promise<EmailTemplate | null>;
     deleteTemplate: (templateId: string) => Promise<void>;
     testSend: (templateId: string, recipientEmail: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityGroups(poolId: string | null): UseIdentityGroupsReturn;

 declare interface UseIdentityGroupsReturn {
     groups: IdentityGroup[];
     loading: boolean;
     error: string | null;
     createGroup: (input: CreateGroupInput) => Promise<IdentityGroup | null>;
     updateGroup: (groupId: string, input: UpdateGroupInput) => Promise<IdentityGroup | null>;
     deleteGroup: (groupId: string) => Promise<void>;
     addMember: (groupId: string, userId: string) => Promise<void>;
     removeMember: (groupId: string, userId: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityMfa(): UseIdentityMfaReturn;

 export declare function useIdentityMfaAdmin(): UseIdentityMfaAdminReturn;

 declare interface UseIdentityMfaAdminReturn {
     metrics: MfaMetrics | null;
     users: IdentityUser[];
     pools: IdentityPool[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 declare interface UseIdentityMfaReturn {
     devices: MfaDevice[];
     loading: boolean;
     error: string | null;
     setupDevice: (poolId: string, userId: string, deviceName: string) => Promise<MfaSetupResult | null>;
     verifySetup: (poolId: string, userId: string, deviceId: string, code: string) => Promise<boolean>;
     renameDevice: (poolId: string, userId: string, deviceId: string, newName: string) => Promise<void>;
     removeDevice: (poolId: string, userId: string, deviceId: string) => Promise<void>;
     refresh: (poolId: string, userId: string) => Promise<void>;
 }

 export declare function useIdentityPools(): UseIdentityPoolsReturn;

 declare interface UseIdentityPoolsReturn {
     pools: IdentityPool[];
     loading: boolean;
     error: string | null;
     createPool: (input: CreatePoolInput) => Promise<IdentityPool | null>;
     updatePool: (poolId: string, input: UpdatePoolInput) => Promise<IdentityPool | null>;
     deletePool: (poolId: string) => Promise<void>;
     getStats: () => Promise<PoolStats[]>;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityResource<T>(initialData: T, opts: UseIdentityResourceOptions): UseIdentityResourceReturn<T>;

 declare interface UseIdentityResourceOptions {
     url: string | null;
     fetchOnMount?: boolean;
 }

 declare interface UseIdentityResourceReturn<T> {
     data: T;
     loading: boolean;
     error: string | null;
     setData: React.Dispatch<React.SetStateAction<T>>;
     refresh: () => Promise<void>;
     mutate: <R>(url: string, options?: RequestInit) => Promise<R | null>;
 }

 export declare function useIdentitySetupStatus(): UseIdentitySetupStatusReturn;

 declare interface UseIdentitySetupStatusReturn {
     status: SetupStatus | null;
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 export declare function useIdentityUsers(poolId: string | null): UseIdentityUsersReturn;

 declare interface UseIdentityUsersReturn {
     users: IdentityUser[];
     loading: boolean;
     error: string | null;
     createUser: (input: CreateUserInput) => Promise<IdentityUser | null>;
     updateUser: (userId: string, input: UpdateUserInput) => Promise<IdentityUser | null>;
     deleteUser: (userId: string) => Promise<void>;
     refresh: () => Promise<void>;
 }

 export declare function useIdleDetector(options?: UseIdleDetectorOptions): UseIdleDetectorReturn;

 declare interface UseIdleDetectorOptions {
     /** Idle timeout in milliseconds (default: 120000 = 2 minutes). */
     timeoutMs?: number;
 }

 declare interface UseIdleDetectorReturn {
     isIdle: boolean;
 }

 export declare function useIngestAudit(filters?: IngestAuditFilters): UseIngestAuditResult;

 declare interface UseIngestAuditResult {
     entries: IngestAuditEntry[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 export declare function useIngestDLQ(): UseIngestDLQResult;

 declare interface UseIngestDLQResult {
     entries: DLQEntryRow[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     replay: (id: string) => Promise<void>;
     drop: (id: string) => Promise<void>;
 }

 export declare function useIngestItems(options?: UseIngestItemsOptions): UseIngestItemsReturn;

 declare interface UseIngestItemsOptions {
     sourceId?: string | null;
     status?: IngestItemStatus | null;
 }

 declare interface UseIngestItemsReturn {
     items: IngestItem[];
     loading: boolean;
     /** Why the LIST fetch failed. Never set by retry/skip — see `actionError`. */
     error: string | null;
     refresh: () => Promise<void>;
     retryItem: (itemId: string) => Promise<boolean>;
     skipItem: (itemId: string) => Promise<boolean>;
     /**
      * Why the last `retryItem`/`skipItem` failed, or `null`. Additive
      * (v2.95.0).
      *
      * These used to write into `error`, the same state the list loader owns.
      * A failed Skip therefore made `IngestItemsPage` hide the entire,
      * correctly-loaded table behind a banner reading "Failed to load ingest
      * items." — a statement that was simply false — whose Retry button
      * re-fetched the list rather than re-trying the skip. The next refresh
      * cleared `error`, everything reappeared, and the operator concluded the
      * skip had worked. It had not.
      */
     actionError: string | null;
     /** Dismiss `actionError`. Additive (v2.95.0). */
     clearActionError: () => void;
 }

 export declare function useIngestProgress(): UseIngestProgressResult;

 declare interface UseIngestProgressResult {
     events: IngestProgressEvent[];
     activeSyncs: Map<string, ActiveSync>;
     clearEvents: () => void;
 }

 export declare function useIngestSources(): UseIngestSourcesReturn;

 declare interface UseIngestSourcesReturn {
     sources: IngestSource[];
     loading: boolean;
     /** Why the LIST fetch failed. Never set by the mutations — see `actionError`. */
     error: string | null;
     refresh: () => Promise<void>;
     createSource: (data: Omit<IngestSource, 'sourceId' | 'createdAt' | 'updatedAt' | 'lastSyncAt' | 'lastSyncStats'>) => Promise<IngestSource | null>;
     deleteSource: (sourceId: string) => Promise<boolean>;
     triggerSync: (sourceId: string) => Promise<boolean>;
     /**
      * Why the last create/delete/sync failed, or `null`. Additive (v2.95.0).
      *
      * These used to write into `error`, which `SourcesPage` renders as the
      * hard-coded "Failed to load sources." — blaming the wrong operation — and
      * which `refresh()` clears unconditionally. A failed "Sync now" was
      * therefore erased before it could be rendered at all: the spinner stopped
      * and nothing else happened, exactly like a successful trigger, and the
      * operator walked away believing a sync was running.
      */
     actionError: string | null;
     /** Dismiss `actionError`. Additive (v2.95.0). */
     clearActionError: () => void;
 }

 /**
  * Register keyboard shortcuts with automatic cleanup.
  * Shortcuts are skipped when typing in input/textarea/contentEditable elements.
  *
  * @example
  * useKeyboardShortcuts([
  *   { key: 's', meta: true, handler: save },
  *   { key: 'Enter', meta: true, handler: run },
  *   { key: 'Escape', handler: clearSelection, preventDefault: false },
  * ]);
  */
 export declare function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void;

 export declare function useLikes({ idToken, roomId, postId, commentId, onMessage }: UseLikesOptions): UseLikesReturn;

 declare interface UseLikesOptions {
     idToken: string | null;
     roomId: string | null;
     postId: string | null;
     commentId?: string | null;
     onMessage: OnMessageFn_2;
 }

 declare interface UseLikesReturn {
     isLiked: boolean;
     likeCount: number;
     whoLiked: PublicProfile[];
     toggle: () => Promise<void>;
     reactWithEmoji: (emoji: string) => Promise<void>;
     loading: boolean;
     error: string | null;
 }

 export declare function useMappingReviewQueue(): UseMappingReviewQueueResult;

 declare interface UseMappingReviewQueueResult {
     items: IngestItem[];
     threshold: number;
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
     remap: (itemId: string, typeId: string) => Promise<void>;
     skip: (itemId: string) => Promise<void>;
 }

 export declare function useMediaDevices(): MediaDevices_2;

 /**
  * Aggregate mention-able users from awareness (online) + user directory (offline) + groups.
  * Online users appear first, then offline users, then groups.
  */
 export declare function useMentionUsers(participants: Participant[]): MentionUser[];

 export declare function useMyMentionsAndTasks({ sections, comments, displayName, userId, }: UseMyMentionsAndTasksArgs): MyItem[];

 declare interface UseMyMentionsAndTasksArgs {
     sections: Section[];
     comments: Record<string, CommentThread[]>;
     displayName: string;
     userId: string;
 }

 export declare function usePipelineDefs(): UsePipelineDefsReturn;

 declare interface UsePipelineDefsReturn {
     pipelines: PipelineDefSummary[];
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 export declare function usePosts({ idToken, roomId, onMessage }: UsePostsOptions): UsePostsReturn;

 declare interface UsePostsOptions {
     idToken: string | null;
     roomId: string | null;
     onMessage: OnMessageFn_3;
 }

 declare interface UsePostsReturn {
     posts: PostItem[];
     createPost: (content: string) => Promise<void>;
     editPost: (postId: string, content: string) => Promise<void>;
     deletePost: (postId: string) => Promise<void>;
     getUserPosts: (userId: string) => Promise<PostItem[]>;
     /** True during the initial fetch and `loadMore`. NOT set by mutations. */
     loading: boolean;
     /**
      * True while `createPost` / `editPost` / `deletePost` is in flight.
      *
      * Kept separate from `loading` on purpose — a mutation must not drop the
      * feed back into its "Loading…" skeleton. But the flag was computed into an
      * unread `_mutating` and never returned, so the composer's only busy signal
      * was `loading`, which goes false once the first page resolves and never
      * moves again. The submit button stayed enabled and labelled "Post" for the
      * whole request, and a second click created the post twice.
      */
     mutating: boolean;
     error: string | null;
     /**
      * Failure of the feed LOAD specifically (initial fetch + `loadMore`). Kept
      * separate from `error`, which is also set by `createPost`/`editPost`/
      * `deletePost`.
      *
      * Callers use it to tell "this room has no posts" from "we never managed to
      * read this room". Keying that off `error` made a rejected *send* in an
      * empty room replace the "No posts yet" empty state with "Couldn't load
      * posts" — blaming the read for a write that failed, next to a composer that
      * was already reporting the real reason.
      */
     loadError: string | null;
     hasMore: boolean;
     loadMore: () => Promise<void>;
 }

 export declare function usePrefersReducedMotion(): boolean;

 export declare function usePresence(options: UsePresenceOptions): UsePresenceReturn;

 declare interface UsePresenceOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
     displayName: string;
 }

 declare interface UsePresenceReturn {
     users: PresenceUser[];
     setTyping: (isTyping: boolean) => void;
 }

 export declare function useReactions(options: UseReactionsOptions): UseReactionsReturn;

 declare interface UseReactionsOptions {
     sendMessage: (msg: Record<string, unknown>) => void;
     onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
     currentChannel: string;
     connectionState: ConnectionState;
 }

 declare interface UseReactionsReturn {
     activeReactions: EphemeralReaction[];
     react: (emoji: string) => void;
 }

 export declare function useRooms({ idToken, onMessage }: UseRoomsOptions): UseRoomsReturn;

 declare interface UseRoomsOptions {
     idToken: string | null;
     onMessage: OnMessageFn_4;
 }

 declare interface UseRoomsReturn {
     rooms: RoomItem[];
     activeRoom: RoomItem | null;
     setActiveRoom: (room: RoomItem | null) => void;
     createRoom: (name: string) => Promise<void>;
     createDM: (peerId: string) => Promise<void>;
     createGroupRoom: (groupId: string, name: string) => Promise<void>;
     joinRoom: (roomId: string) => Promise<void>;
     leaveRoom: (roomId: string) => Promise<void>;
     loadMembers: (roomId: string) => Promise<void>;
     members: RoomMemberItem[];
     loading: boolean;
     error: string | null;
     /**
      * Failure of the `GET /api/rooms` hydrate specifically. Kept separate from
      * `error`, which is also set by create/join/leave/loadMembers.
      *
      * `RoomList` renders "Couldn't load rooms" + Retry whenever the `error` prop
      * it is given is set and the list is empty — so wiring `error` straight
      * through made a refused *createRoom* by a user with no rooms yet blame the
      * read: the panel claimed the room list had failed to load and offered to
      * re-fetch it, while the create form beside it showed the real reason.
      * Pass this to `RoomList`'s `error` prop; use `error` for mutation feedback.
      */
     loadError: string | null;
     /** Retry the GET /api/rooms hydrate after a fetch failure. */
     retry: () => void;
 }

 export declare function useSectionList(ydoc: Y.Doc | null): UseSectionListReturn;

 declare interface UseSectionListReturn {
     sections: Section[];
     comments: Record<string, CommentThread[]>;
     addSection: (section: Section) => void;
     updateSection: (sectionId: string, partial: Partial<Section>) => void;
     removeSection: (sectionId: string) => void;
     addItem: (sectionId: string, item: TaskItem) => void;
     updateItem: (sectionId: string, itemId: string, partial: Partial<TaskItem>) => void;
     removeItem: (sectionId: string, itemId: string) => void;
     ackItem: (sectionId: string, itemId: string, userId: string) => void;
     rejectItem: (sectionId: string, itemId: string, userId: string) => void;
     getSectionFragment: (sectionId: string) => Y.XmlFragment | null;
     addComment: (sectionId: string, opts: {
         text: string;
         userId: string;
         displayName: string;
         color: string;
         parentCommentId?: string | null;
     }) => void;
     resolveThread: (sectionId: string, commentId: string, resolverDisplayName: string) => void;
     unresolveThread: (sectionId: string, commentId: string) => void;
 }

 export declare function useSocialProfile({ idToken }: UseSocialProfileOptions): UseSocialProfileReturn;

 declare interface UseSocialProfileOptions {
     idToken: string | null;
 }

 declare interface UseSocialProfileReturn {
     profile: ProfileItem | null;
     loading: boolean;
     error: string | null;
     updateProfile: (updates: Partial<ProfileItem>) => Promise<void>;
     viewProfile: (userId: string) => Promise<ProfileItem | null>;
 }

 export declare function useSourceSloMetrics(sourceId: string | undefined, window?: SloWindow): UseSourceSloMetricsResult;

 declare interface UseSourceSloMetricsResult {
     metrics: SourceSloMetrics | null;
     loading: boolean;
     error: string | null;
     refresh: () => Promise<void>;
 }

 export declare function useSyncConflicts(): UseSyncConflictsReturn;

 declare interface UseSyncConflictsReturn {
     conflicts: SyncConflict[];
     loading: boolean;
     /** Why the LIST fetch failed. Never set by resolve/discard — see `actionError`. */
     error: string | null;
     /** True when the data came from the local mock fallback. */
     usingMock: boolean;
     refresh: () => Promise<void>;
     resolveConflict: (id: string, resolution: ConflictResolution) => Promise<boolean>;
     discardConflict: (id: string) => Promise<boolean>;
     /**
      * Why the last `resolveConflict` / `discardConflict` failed, or `null`.
      * Additive.
      *
      * These used to write into `error`, which `ConflictsPage` renders as
      * "Failed to load conflicts: …". A rejected Resolve therefore reported a
      * load failure for a queue that had loaded perfectly and was still on
      * screen, while the conflict itself stayed pending — and the next poll
      * cleared `error`, so the operator was left believing the resolve landed.
      */
     actionError: string | null;
     /** Dismiss `actionError`. Additive. */
     clearActionError: () => void;
 }

 export declare function useTypedDocuments({ idToken, typeId }: UseTypedDocumentsOptions): UseTypedDocumentsReturn;

 declare interface UseTypedDocumentsOptions {
     idToken: string | null;
     typeId: string | null;
 }

 declare interface UseTypedDocumentsReturn {
     documents: TypedDocument[];
     loading: boolean;
     error: string | null;
     createDocument: (values: Record<string, TypedDocumentValue>) => Promise<TypedDocument>;
     refresh: () => void;
 }

 /**
  * Sync filter state with URL search params for shareable filter links.
  * Each filter key maps to a query param; undefined values are omitted.
  *
  * @param defaults Default filter values (used when param is missing)
  * @returns { filters, setFilter, clearFilters }
      *
      * @example
      * const { filters, setFilter } = useUrlFilterState({
      *   status: 'all',
      *   search: undefined,
      * });
      *
      * // URL: /pipelines?status=running&search=test
      * // filters = { status: 'running', search: 'test' }
      */
  export declare function useUrlFilterState<T extends Record<string, string | undefined>>(defaults: T): UrlFilterState<T>;

  export declare function useVersionHistory(options: UseVersionHistoryOptions): UseVersionHistoryReturn;

  declare interface UseVersionHistoryOptions {
      channel: string;
      sendMessage: (msg: Record<string, unknown>) => void;
      onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
  }

  declare interface UseVersionHistoryReturn {
      versions: VersionEntry[];
      loading: boolean;
      fetchVersions: () => void;
      previewVersion: (timestamp: number) => void;
      restoreVersion: (timestamp: number) => void;
      previewDoc: Y.Doc | null;
      previewTimestamp: number | null;
      clearPreview: () => void;
      /** Save a named version snapshot. */
      saveVersion: (name: string) => void;
      /** Extract sections as plain JSON from a Y.Doc (live or preview). */
      extractSections: (doc: Y.Doc) => SnapshotSection[];
      /** Compare sections: load preview for a given timestamp, returns sections via callback. */
      compareSections: SnapshotSection[] | null;
      compareTimestamp: number | null;
      compareVersion: (timestamp: number) => void;
      clearCompare: () => void;
  }

  export declare function useVideoCall(options: UseVideoCallOptions): UseVideoCallReturn;

  declare interface UseVideoCallOptions {
      documentId: string;
      idToken: string | null;
      /** Current document meta (from Y.js). */
      meta: DocumentMeta | null;
      /** Update document meta (writes to Y.js). */
      updateMeta: (partial: Partial<DocumentMeta>) => void;
      /** Send WebSocket message to gateway (for document list metadata sync). */
      sendMessage: (msg: Record<string, unknown>) => void;
      /** Display name for participant tracking. */
      displayName?: string;
  }

  declare interface UseVideoCallReturn {
      callState: CallState;
      sessionId: string | null;
      stageToken: string | null;
      participantId: string | null;
      userId: string | null;
      error: string | null;
      /** Whether another user started a call (detected via Y.js meta). */
      hasActiveCall: boolean;
      /** Start a new call (creates session + joins). */
      startCall: () => Promise<void>;
      /** Join an existing call by sessionId. */
      joinCall: (sessionId: string) => Promise<void>;
      /** End/leave the call. */
      endCall: () => Promise<void>;
  }

  export declare function useVideoSessions(documentId: string, idToken: string | null): {
      sessions: VideoSession[];
      loading: boolean;
      fetchSessions: () => Promise<void>;
  };

  export declare function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn;

  declare interface UseWebSocketOptions {
      config: GatewayConfig;
      onMessage?: (msg: GatewayMessage) => void;
  }

  declare interface UseWebSocketReturn {
      connectionState: ConnectionState;
      lastError: GatewayError | null;
      sessionToken: string | null;
      clientId: string | null;
      currentChannel: string;
      switchChannel: (channel: string) => void;
      sendMessage: (msg: Record<string, unknown>) => void;
      disconnect: () => void;
      reconnect: () => void;
  }

  export declare function useYjsDoc(options: UseYjsDocOptions): UseYjsDocReturn;

  declare interface UseYjsDocOptions {
      documentId: string;
      ws: UseWebSocketReturn;
      onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
      /**
       * Optional callback fired when the server replaces the document
       * (e.g. via version restore) and we rebuild the Y.Doc + provider.
       * Consumers (observers in sibling hooks) can use it to re-attach.
       */
      onDocReplaced?: (ydoc: Y.Doc, provider: GatewayProvider) => void;
  }

  declare interface UseYjsDocReturn {
      ydoc: Y.Doc | null;
      provider: GatewayProvider | null;
      synced: boolean;
      /**
       * Bumped every time the underlying Y.Doc / provider is recreated
       * (initial mount counts as 0). Sibling hooks can depend on this
       * to re-run their observer setup.
       */
      docVersion: number;
  }

  declare interface VersionEntry {
      timestamp: number;
      age: number;
      name?: string;
      author?: string;
      type?: 'manual' | 'auto' | 'pre-restore';
  }

  declare interface VideoSession {
      documentId: string;
      sessionId: string;
      vnlSessionId: string;
      status: 'active' | 'ended';
      startedAt: string;
      endedAt?: string;
      startedBy: string;
      participants: VideoSessionParticipant[];
      transcriptStatus?: 'pending' | 'processing' | 'available' | 'failed';
      transcript?: string;
      aiSummary?: string;
  }

  declare interface VideoSessionParticipant {
      userId: string;
      displayName: string;
      joinedAt: string;
  }

  declare type ViewMode = 'editor' | 'ack' | 'reader';

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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
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
