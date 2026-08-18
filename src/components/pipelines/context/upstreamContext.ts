// upstreamContext.ts
//
// Derives the `{{context.*}}` paths that are ACTUALLY available at a given node,
// by walking the graph backwards from it.
//
// Why: the LLM prompt editor offered a hardcoded list of four invented paths
// (`context.doc.body`, `context.doc.title`, …) with lorem-ipsum sample values,
// regardless of what was upstream. Authoring a prompt against a pipeline of
// `trigger → transform → llm` still suggested `context.doc.body`, which no step
// ever writes. The editor looked capable while its context awareness was
// fiction, and a template referencing a non-existent path fails at run time with
// no authoring-time signal.
//
// This module is pure — no React — so it is testable on its own and reusable by
// any panel (LLM, vision, transform, condition).

import type { NodeType, PipelineNode, PipelineEdge } from '../../../types/pipeline';

/** One `{{context.*}}` path an author can insert, and where it comes from. */
export interface ContextPath {
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

/**
 * What a node writes into the run context.
 *
 * Keyed by node type. `outputKey` on the node's data overrides the default
 * location for the types that support it (transform, action, and the vision
 * family), which is why this takes the node rather than just the type.
 */
export function contextContributions(node: PipelineNode): ContextPath[] {
  const data = (node.data ?? {}) as unknown as Record<string, unknown>;
  const label = typeof data.label === 'string' && data.label ? data.label : node.type;
  const source = `${label} (${node.type})`;
  const at = (p: string, description: string, kind: ContextPath['kind']): ContextPath => ({
    path: p,
    source,
    sourceNodeId: node.id,
    description,
    kind,
  });
  const outputKey = typeof data.outputKey === 'string' && data.outputKey ? data.outputKey : null;
  /** Where a node's result lands: its explicit outputKey, else steps.<id>.output. */
  const out = outputKey ? `context.${outputKey}` : `context.steps.${node.id}.output`;

  switch (node.type as NodeType) {
    case 'trigger':
      return [
        at('context.trigger', 'The full trigger payload.', 'object'),
        at('context.trigger.userId', 'Who initiated the run.', 'string'),
        at('context.trigger.imageRef', 'Image supplied with the trigger, if any.', 'image'),
      ];
    case 'llm':
      return [
        at(out, 'Model completion text.', 'string'),
        at(`context.steps.${node.id}.usage`, 'Token usage for this call.', 'object'),
      ];
    case 'transform':
      return [at(out, 'Result of the transform expression.', 'object')];
    case 'action':
      return [at(out, 'Response returned by the action.', 'object')];
    case 'memory': {
      // Must match what the memory step handler actually returns
      // (platform-api src/pipeline/memory/MemoryStepHandler.ts). It returns an
      // OBJECT, not an array, and the useful value sits at `.value` — an
      // author who is offered only the wrapper cannot reach the thing they
      // stored. A read and a write return different shapes, so they are
      // advertised differently.
      if (data.mode === 'write') {
        return [
          at(out, 'Result of the memory write.', 'object'),
          at(`${out}.written`, 'Whether the value was persisted.', 'boolean'),
          at(`${out}.key`, 'The resolved key that was written.', 'string'),
        ];
      }
      return [
        at(out, 'Result of the memory read.', 'object'),
        at(`${out}.value`, 'The recalled value, or null on a miss.', 'object'),
        at(`${out}.found`, 'Whether a record existed for the key.', 'boolean'),
        at(`${out}.key`, 'The resolved key that was read.', 'string'),
      ];
    }
    case 'scatter':
      return [
        at(`context.steps.${node.id}.items`, 'The fanned-out items.', 'array'),
        at(`context.steps.${node.id}.index`, 'Index of the current item.', 'number'),
      ];
    case 'condition':
      return [at(`context.steps.${node.id}.matched`, 'Whether the condition passed.', 'boolean')];
    case 'image-source':
    case 'image:generate':
    case 'image:variation':
    case 'image:edit-prompt':
    case 'image:resize':
    case 'image:transform':
    case 'image:format-convert':
    case 'image:sharpen':
    case 'image:watermark':
    case 'image:crop':
    case 'image:adjust-bw':
    case 'image:adjust-layer':
    case 'image:upscale':
    case 'image:save':
      return [at(`context.steps.${node.id}.imageRef`, 'Image produced by this step.', 'image')];
    case 'image:dimensions':
      return [
        at(`context.steps.${node.id}.width`, 'Image width in pixels.', 'number'),
        at(`context.steps.${node.id}.height`, 'Image height in pixels.', 'number'),
      ];
    case 'image:vision-analyze':
    case 'image:vision-classify':
    case 'image:vision-describe':
    case 'image:vision-tag':
    case 'image:vision-extract-text':
      return [
        at(out, 'Structured vision result, shaped by the output schema.', 'object'),
        at(`context.steps.${node.id}.usage`, 'Token usage for the vision call.', 'object'),
      ];
    default:
      // Unknown / not-yet-executable types still contribute their step slot,
      // so a prompt can reference them without the editor pretending to know
      // the shape.
      return [at(out, 'Output of this step.', 'object')];
  }
}

/**
 * Node ids strictly upstream of `targetId`, nearest first.
 *
 * Breadth-first over reversed edges. Cycle-safe: a visited set means a loop in
 * the graph terminates instead of hanging the editor.
 */
export function upstreamNodeIds(
  edges: readonly PipelineEdge[],
  targetId: string,
): string[] {
  const incoming = new Map<string, string[]>();
  for (const e of edges) {
    const list = incoming.get(e.target);
    if (list) list.push(e.source);
    else incoming.set(e.target, [e.source]);
  }

  const order: string[] = [];
  const seen = new Set<string>([targetId]);
  let frontier = incoming.get(targetId) ?? [];

  while (frontier.length) {
    const next: string[] = [];
    for (const id of frontier) {
      if (seen.has(id)) continue;
      seen.add(id);
      order.push(id);
      next.push(...(incoming.get(id) ?? []));
    }
    frontier = next;
  }
  return order;
}

/**
 * Every `{{context.*}}` path available at `targetId`, nearest upstream first.
 *
 * `context.trigger` is always included even when the trigger isn't wired yet —
 * the executor always provides it, and omitting it would make a fresh graph
 * look like it has no context at all.
 */
export function availableContextPaths(
  nodes: readonly PipelineNode[],
  edges: readonly PipelineEdge[],
  targetId: string,
): ContextPath[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const paths: ContextPath[] = [];
  const seenPath = new Set<string>();

  const push = (p: ContextPath) => {
    if (seenPath.has(p.path)) return;
    seenPath.add(p.path);
    paths.push(p);
  };

  for (const id of upstreamNodeIds(edges, targetId)) {
    const node = byId.get(id);
    if (node) contextContributions(node).forEach(push);
  }

  if (!seenPath.has('context.trigger')) {
    const trigger = nodes.find((n) => n.type === 'trigger');
    if (trigger) contextContributions(trigger).forEach(push);
  }
  return paths;
}

/**
 * Paths a template references that nothing upstream provides.
 *
 * This is the authoring-time signal that was missing: a typo or a path from a
 * node that isn't wired in yet shows up here instead of failing at run time.
 */
export function unresolvedTemplatePaths(
  template: string,
  available: readonly ContextPath[],
): string[] {
  const known = new Set(available.map((p) => p.path));
  const referenced = new Set<string>();
  for (const m of template.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g)) {
    referenced.add(m[1]);
  }
  return [...referenced].filter((ref) => {
    if (known.has(ref)) return false;
    // `context.trigger.foo` is fine when `context.trigger` is available — the
    // payload shape is caller-defined, so we can't enumerate its leaves.
    return ![...known].some((k) => ref.startsWith(`${k}.`));
  });
}

/** A JSONPath an image-consuming node can point `imageRefPath` at. */
export interface ImageRefOption {
  /** JSONPath as the executor resolves it, e.g. `$.steps.crop-1.output.imageId`. */
  path: string;
  /** Human label for the producing node. */
  source: string;
  sourceNodeId: string;
}

/** Node types that put an image into the run context. */
const IMAGE_PRODUCERS = new Set<string>([
  'image-source', 'image:generate', 'image:variation', 'image:edit-prompt',
  'image:resize', 'image:transform', 'image:format-convert', 'image:sharpen',
  'image:watermark', 'image:crop', 'image:adjust-bw', 'image:adjust-layer',
  'image:upscale', 'image:save',
]);

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
export function availableImageRefs(
  nodes: readonly PipelineNode[],
  edges: readonly PipelineEdge[],
  targetId: string,
): ImageRefOption[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const out: ImageRefOption[] = [];
  const seen = new Set<string>();

  const push = (o: ImageRefOption) => {
    if (seen.has(o.path)) return;
    seen.add(o.path);
    out.push(o);
  };

  for (const id of upstreamNodeIds(edges, targetId)) {
    const node = byId.get(id);
    if (!node || !IMAGE_PRODUCERS.has(node.type)) continue;
    const data = (node.data ?? {}) as unknown as Record<string, unknown>;
    const label = typeof data.label === 'string' && data.label ? data.label : node.type;
    push({
      path: `$.steps.${node.id}.output.imageId`,
      source: `${label} (${node.type})`,
      sourceNodeId: node.id,
    });
  }

  const trigger = nodes.find((n) => n.type === 'trigger');
  push({
    path: '$.trigger.imageRef',
    source: trigger ? 'Trigger payload' : 'Trigger payload (no trigger node yet)',
    sourceNodeId: trigger?.id ?? '',
  });

  // A scatter upstream fans out per-item images under a distinct path.
  for (const id of upstreamNodeIds(edges, targetId)) {
    if (byId.get(id)?.type === 'scatter') {
      push({ path: '$.scatter.parentImageId', source: 'Scatter (parent image)', sourceNodeId: id });
      break;
    }
  }
  return out;
}
