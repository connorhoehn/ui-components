// useUpstreamContext.ts
//
// Binds upstreamContext.ts to the live editor graph, so a config panel can
// author a template against the paths that actually exist at its node.

import { useMemo } from 'react';
import { usePipelineEditor } from './PipelineEditorContext';
import {
  availableContextPaths,
  availableImageRefs,
  unresolvedTemplatePaths,
  type ContextPath,
  type ImageRefOption,
} from './upstreamContext';

export interface UpstreamContext {
  /** Paths available at this node, nearest upstream first. */
  paths: ContextPath[];
  /** Paths a template references that nothing upstream provides. */
  unresolved: (template: string) => string[];
}

/**
 * Context paths available at `nodeId`, recomputed when the graph changes.
 *
 * Returns an empty set when `nodeId` is null so a panel can call this
 * unconditionally without branching on selection.
 */
export function useUpstreamContext(nodeId: string | null): UpstreamContext {
  const { definition } = usePipelineEditor();
  const nodes = definition?.nodes ?? [];
  const edges = definition?.edges ?? [];

  const paths = useMemo(
    () => (nodeId ? availableContextPaths(nodes, edges, nodeId) : []),
    [nodes, edges, nodeId],
  );

  return useMemo(
    () => ({
      paths,
      unresolved: (template: string) => unresolvedTemplatePaths(template, paths),
    }),
    [paths],
  );
}

/**
 * Image references reachable from `nodeId`, for the `imageRefPath` field on
 * image/vision nodes.
 *
 * Replaces the hardcoded `IMAGE_REF_SAMPLES` lists that 18 config panels
 * carried, which named nodes ("upload", "crop") that need not exist.
 */
export function useUpstreamImageRefs(nodeId: string | null): ImageRefOption[] {
  const { definition } = usePipelineEditor();
  const nodes = definition?.nodes ?? [];
  const edges = definition?.edges ?? [];
  return useMemo(
    () => (nodeId ? availableImageRefs(nodes, edges, nodeId) : []),
    [nodes, edges, nodeId],
  );
}
