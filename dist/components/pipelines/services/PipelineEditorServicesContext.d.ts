import { type ReactNode } from 'react';
export interface UploadedImage {
    imageId: string;
    width: number;
    height: number;
    mimeType: string;
    sizeBytes: number;
}
export interface PipelineEditorServices {
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
    }): Promise<UploadedImage>;
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
/** Host declaration of inbound webhook delivery. See `webhookRelay`. */
export interface WebhookRelayStatus {
    /** True ONLY when a delivery to the webhook path actually triggers a run. */
    enabled: boolean;
    /**
     * Public origin the webhook URL is built from, e.g. `https://api.example.com`.
     * Falls back to `VITE_SOCIAL_API_URL`, then to the local dev port.
     */
    publicUrlBase?: string;
}
/** One selectable model. `value` is what gets written to the node's data. */
export interface ModelOption {
    value: string;
    label?: string;
}
/** Per-node-type overrides for config-field wording. */
export interface NodeVocabulary {
    /** Field key -> visible label. */
    labels?: Record<string, string>;
    /** Field key -> help text shown under the control. */
    help?: Record<string, string>;
    /** Field key -> input placeholder. */
    placeholders?: Record<string, string>;
}
export declare function PipelineEditorServicesProvider({ services, children, }: {
    services: PipelineEditorServices;
    children: ReactNode;
}): import("react").JSX.Element;
/**
 * Returns the host-provided `getImageUrl(imageId): string` callback.
 * Throws when called outside a provider — catches the "I forgot to mount
 * the services provider" misuse at first render rather than first
 * thumbnail.
 */
export declare function useImageUrl(): (imageId: string) => string;
export declare function usePipelineEditorServices(): PipelineEditorServices;
/** Resolves a field's wording, falling back to the library's neutral copy. */
export interface NodeVocabularyResolver {
    label(field: string, fallback: string): string;
    help(field: string, fallback?: string): string | undefined;
    placeholder(field: string, fallback?: string): string | undefined;
}
/**
 * Host wording for one node type's config fields.
 *
 * Reads the context directly rather than through `usePipelineEditorServices()`,
 * which throws with no provider: a config panel has to stay renderable in a
 * test, a story, or a standalone settings view, and "no host" simply means
 * "use the neutral copy".
 */
export declare function useNodeVocabulary(nodeType: string): NodeVocabularyResolver;
/**
 * Model choices for a group, falling back to the library's defaults.
 *
 * Reads the context directly so a config panel stays renderable with no
 * services provider mounted.
 */
export declare function useModelOptions(group: string, fallback: readonly ModelOption[]): readonly ModelOption[];
/**
 * Resolver form of {@link useModelOptions}, for callers that need a group they
 * are not currently rendering — e.g. the LLM panel, which must look up the
 * INCOMING provider's models when the provider changes, to decide whether the
 * selected model survives the switch.
 */
export declare function useModelOptionsResolver(): (group: string, fallback: readonly ModelOption[]) => readonly ModelOption[];
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
/**
 * Whether the host's executor can run a given node type.
 *
 * Returns `true` for everything when the host hasn't declared
 * `executableNodeTypes`, so an un-wired host sees no change and the library
 * never asserts capability it cannot know.
 */
export declare function useIsNodeTypeExecutable(): (type: string) => boolean;
//# sourceMappingURL=PipelineEditorServicesContext.d.ts.map