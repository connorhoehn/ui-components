import { describe, it, expect } from 'vitest';
import {
  availableContextPaths,
  availableImageRefs,
  contextContributions,
  unresolvedTemplatePaths,
  upstreamNodeIds,
} from '../upstreamContext';
import type { PipelineEdge, PipelineNode } from '../../../../types/pipeline';

const node = (id: string, type: string, data: Record<string, unknown> = {}) =>
  ({ id, type, position: { x: 0, y: 0 }, data: { type, ...data } } as unknown as PipelineNode);

const edge = (source: string, target: string): PipelineEdge =>
  ({ id: `${source}->${target}`, source, target } as PipelineEdge);

describe('upstreamNodeIds', () => {
  const edges = [edge('t', 'a'), edge('a', 'b'), edge('b', 'c')];

  it('returns strict ancestors, nearest first', () => {
    expect(upstreamNodeIds(edges, 'c')).toEqual(['b', 'a', 't']);
  });

  it('excludes the target itself', () => {
    expect(upstreamNodeIds(edges, 'c')).not.toContain('c');
  });

  it('returns nothing for a source node', () => {
    expect(upstreamNodeIds(edges, 't')).toEqual([]);
  });

  it('merges both branches of a diamond without duplicating', () => {
    const diamond = [edge('t', 'l'), edge('t', 'r'), edge('l', 'j'), edge('r', 'j')];
    const up = upstreamNodeIds(diamond, 'j');
    expect(up.sort()).toEqual(['l', 'r', 't']);
    expect(new Set(up).size).toBe(up.length);
  });

  it('terminates on a cycle instead of hanging', () => {
    const cyclic = [edge('a', 'b'), edge('b', 'a'), edge('b', 'target')];
    expect(() => upstreamNodeIds(cyclic, 'target')).not.toThrow();
    expect(upstreamNodeIds(cyclic, 'target').sort()).toEqual(['a', 'b']);
  });
});

describe('contextContributions', () => {
  it('routes a result to outputKey when set, steps.<id>.output otherwise', () => {
    expect(contextContributions(node('x', 'transform')).map((p) => p.path))
      .toEqual(['context.steps.x.output']);
    expect(contextContributions(node('x', 'transform', { outputKey: 'classified' })).map((p) => p.path))
      .toEqual(['context.classified']);
  });

  it('gives vision nodes a structured result plus usage', () => {
    const paths = contextContributions(node('v', 'image:vision-classify')).map((p) => p.path);
    expect(paths).toContain('context.steps.v.output');
    expect(paths).toContain('context.steps.v.usage');
  });

  it('gives image nodes an imageRef', () => {
    expect(contextContributions(node('r', 'image:resize')).map((p) => p.path))
      .toEqual(['context.steps.r.imageRef']);
  });

  it('reports dimensions as two numbers, not one object', () => {
    const paths = contextContributions(node('d', 'image:dimensions'));
    expect(paths.map((p) => p.path)).toEqual(['context.steps.d.width', 'context.steps.d.height']);
    expect(paths.every((p) => p.kind === 'number')).toBe(true);
  });

  it('labels the source from the node label when present', () => {
    const [first] = contextContributions(node('l', 'llm', { label: 'Classify' }));
    expect(first.source).toBe('Classify (llm)');
  });

  it('still contributes a step slot for a type it does not model', () => {
    expect(contextContributions(node('u', 'guardrail')).map((p) => p.path))
      .toEqual(['context.steps.u.output']);
  });
});

describe('availableContextPaths', () => {
  const nodes = [
    node('t', 'trigger'),
    node('img', 'image:generate'),
    node('vis', 'image:vision-classify'),
    node('llm', 'llm'),
    node('after', 'action'),
  ];
  const edges = [edge('t', 'img'), edge('img', 'vis'), edge('vis', 'llm'), edge('llm', 'after')];

  it('offers everything upstream of the node', () => {
    const paths = availableContextPaths(nodes, edges, 'llm').map((p) => p.path);
    expect(paths).toContain('context.trigger');
    expect(paths).toContain('context.steps.img.imageRef');
    expect(paths).toContain('context.steps.vis.output');
  });

  it('does NOT offer downstream output — that is the bug this replaces', () => {
    const paths = availableContextPaths(nodes, edges, 'llm').map((p) => p.path);
    expect(paths).not.toContain('context.steps.after.output');
    // and never the node's own output
    expect(paths).not.toContain('context.steps.llm.output');
  });

  it('includes the trigger even when nothing is wired yet', () => {
    const paths = availableContextPaths(nodes, [], 'llm').map((p) => p.path);
    expect(paths).toContain('context.trigger');
  });

  it('is empty when there is no trigger and no upstream', () => {
    expect(availableContextPaths([node('solo', 'llm')], [], 'solo')).toEqual([]);
  });

  it('attributes each path to the node that produces it', () => {
    const found = availableContextPaths(nodes, edges, 'llm')
      .find((p) => p.path === 'context.steps.img.imageRef');
    expect(found?.sourceNodeId).toBe('img');
  });
});

describe('unresolvedTemplatePaths', () => {
  const available = availableContextPaths(
    [node('t', 'trigger'), node('v', 'image:vision-tag')],
    [edge('t', 'v')],
    'v',
  );

  it('flags a path nothing upstream provides', () => {
    expect(unresolvedTemplatePaths('{{context.doc.body}}', available))
      .toEqual(['context.doc.body']);
  });

  it('accepts a path that is available', () => {
    expect(unresolvedTemplatePaths('{{context.trigger}}', available)).toEqual([]);
  });

  it('accepts a leaf under an available object — payload shape is caller-defined', () => {
    expect(unresolvedTemplatePaths('{{context.trigger.anything.nested}}', available)).toEqual([]);
  });

  it('tolerates whitespace inside the braces', () => {
    expect(unresolvedTemplatePaths('{{  context.trigger  }}', available)).toEqual([]);
  });

  it('reports each unknown path once', () => {
    const out = unresolvedTemplatePaths('{{context.nope}} and {{context.nope}}', available);
    expect(out).toEqual(['context.nope']);
  });

  it('finds nothing in a template with no interpolation', () => {
    expect(unresolvedTemplatePaths('Summarise the image.', available)).toEqual([]);
  });
});

describe('availableImageRefs', () => {
  const nodes = [
    node('t', 'trigger'),
    node('src', 'image-source', { label: 'Upload' }),
    node('crop', 'image:crop'),
    node('vis', 'image:vision-tag'),
    node('later', 'image:resize'),
  ];
  const edges = [edge('t', 'src'), edge('src', 'crop'), edge('crop', 'vis'), edge('vis', 'later')];

  it('offers each upstream image producer as a JSONPath', () => {
    const paths = availableImageRefs(nodes, edges, 'vis').map((o) => o.path);
    expect(paths).toContain('$.steps.crop.output.imageId');
    expect(paths).toContain('$.steps.src.output.imageId');
  });

  it('does not offer a downstream image producer', () => {
    const paths = availableImageRefs(nodes, edges, 'vis').map((o) => o.path);
    expect(paths).not.toContain('$.steps.later.output.imageId');
  });

  it('always offers the trigger image, which the executor supplies', () => {
    expect(availableImageRefs(nodes, [], 'vis').map((o) => o.path))
      .toContain('$.trigger.imageRef');
  });

  it('ignores upstream nodes that produce no image', () => {
    const paths = availableImageRefs(nodes, edges, 'vis').map((o) => o.path);
    expect(paths).not.toContain('$.steps.t.output.imageId');
  });

  it('offers the scatter parent image only when a scatter is upstream', () => {
    const withScatter = [...nodes, node('sc', 'scatter')];
    const e2 = [edge('src', 'sc'), edge('sc', 'vis')];
    expect(availableImageRefs(withScatter, e2, 'vis').map((o) => o.path))
      .toContain('$.scatter.parentImageId');
    expect(availableImageRefs(nodes, edges, 'vis').map((o) => o.path))
      .not.toContain('$.scatter.parentImageId');
  });

  it('labels the producer so the author knows which step it is', () => {
    const found = availableImageRefs(nodes, edges, 'vis').find((o) => o.sourceNodeId === 'src');
    expect(found?.source).toBe('Upload (image-source)');
  });
});
