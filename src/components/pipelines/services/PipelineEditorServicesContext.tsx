// src/components/pipelines/services/PipelineEditorServicesContext.tsx
//
// Injectable services seam for pipeline node UX. Host editors (e.g. wsg
// PipelineEditorPage) mount <PipelineEditorServicesProvider> at the editor
// root and pass their own implementations. Node components call the hooks
// below — they never import from host-specific modules.

import { createContext, useContext, type ReactNode, useMemo } from 'react';

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
  uploadImage?(input: File | { url: string }): Promise<UploadedImage>;

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

const PipelineEditorServicesContext = createContext<PipelineEditorServices | null>(null);

export function PipelineEditorServicesProvider({
  services,
  children,
}: {
  services: PipelineEditorServices;
  children: ReactNode;
}) {
  return (
    <PipelineEditorServicesContext.Provider value={services}>
      {children}
    </PipelineEditorServicesContext.Provider>
  );
}

/**
 * Returns the host-provided `getImageUrl(imageId): string` callback.
 * Throws when called outside a provider — catches the "I forgot to mount
 * the services provider" misuse at first render rather than first
 * thumbnail.
 */
export function useImageUrl(): (imageId: string) => string {
  const svc = useContext(PipelineEditorServicesContext);
  if (!svc) {
    throw new Error(
      'useImageUrl must be called inside <PipelineEditorServicesProvider>. ' +
        'The host editor (e.g. wsg PipelineEditorPage) is responsible for ' +
        'mounting it with its own getImageUrl implementation.',
    );
  }
  return svc.getImageUrl;
}

export function usePipelineEditorServices(): PipelineEditorServices {
  const svc = useContext(PipelineEditorServicesContext);
  if (!svc) {
    throw new Error(
      'usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>.',
    );
  }
  return svc;
}

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
export function useNodeVocabulary(nodeType: string): NodeVocabularyResolver {
  const svc = useContext(PipelineEditorServicesContext);
  const vocab = svc?.nodeVocabulary?.[nodeType];
  return useMemo(
    () => ({
      label: (field, fallback) => vocab?.labels?.[field] ?? fallback,
      help: (field, fallback) => vocab?.help?.[field] ?? fallback,
      placeholder: (field, fallback) => vocab?.placeholders?.[field] ?? fallback,
    }),
    [vocab],
  );
}

/**
 * Whether the host's executor can run a given node type.
 *
 * Returns `true` for everything when the host hasn't declared
 * `executableNodeTypes`, so an un-wired host sees no change and the library
 * never asserts capability it cannot know.
 */
export function useIsNodeTypeExecutable(): (type: string) => boolean {
  const svc = useContext(PipelineEditorServicesContext);
  const declared = svc?.executableNodeTypes;
  return useMemo(() => {
    if (!declared) return () => true;
    const set = new Set(declared);
    return (type: string) => set.has(type);
  }, [declared]);
}
