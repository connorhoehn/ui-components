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
