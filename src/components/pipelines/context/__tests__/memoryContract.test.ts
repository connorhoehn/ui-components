// Bidirectional contract for the `memory` node.
//
// This node is authored in ui-components and executed in platform-api
// (src/pipeline/memory/MemoryStepHandler.ts). Testing only one direction —
// "the editor writes a config the handler can read" — leaves the other half
// unguarded, and that half fails silently: the editor's variable picker offers
// downstream authors a path, the handler never puts anything there, and the
// author gets an empty value at run time with no error anywhere.
//
// Both directions are asserted against ONE fixture, mirrored by a matching
// test in platform-api. When the shape changes, both sides fail together
// instead of drifting apart.
//
//   UI -> executor : the config shape the panel produces is exactly the set of
//                    fields the handler reads.
//   executor -> UI : every path the handler's output makes reachable is
//                    advertised by contextContributions, and everything
//                    advertised actually exists in that output.

import { describe, it, expect } from 'vitest';
import { contextContributions } from '../upstreamContext';
import type { MemoryNodeData, PipelineNode } from '../../../../types/pipeline';

// ---------------------------------------------------------------------------
// The shared fixture. Keep in sync with platform-api's
// src/pipeline/memory/__tests__/uiContract.test.ts
// ---------------------------------------------------------------------------

/** Every field MemoryConfig can write. */
export const MEMORY_CONFIG_FIELDS = [
  'type',
  'mode',
  'scope',
  'namespace',
  'keyExpression',
  'valueField',
  'outputKey',
] as const;

/** What the handler returns for `mode: 'read'`. */
export const MEMORY_READ_OUTPUT_KEYS = [
  'found',
  'value',
  'namespace',
  'key',
  'scope',
] as const;

/** What the handler returns for `mode: 'write'`. */
export const MEMORY_WRITE_OUTPUT_KEYS = [
  'written',
  'namespace',
  'key',
  'scope',
] as const;

const node = (data: Partial<MemoryNodeData>): PipelineNode =>
  ({
    id: 'm1',
    type: 'memory',
    position: { x: 0, y: 0 },
    data: {
      type: 'memory',
      mode: 'read',
      scope: 'session',
      namespace: 'ns',
      keyExpression: 'k',
      ...data,
    },
  }) as unknown as PipelineNode;

describe('memory node: UI -> executor', () => {
  it('the config type carries exactly the fields the handler reads', () => {
    // A field the panel writes but the handler ignores is dead config the
    // author believes is doing something.
    const data: Required<MemoryNodeData> = {
      type: 'memory',
      mode: 'write',
      scope: 'long-term',
      namespace: 'ns',
      keyExpression: '{{context.trigger.userId}}',
      valueField: 'context.steps.llm-1.output',
      outputKey: 'recalled',
    };
    expect(Object.keys(data).sort()).toEqual([...MEMORY_CONFIG_FIELDS].sort());
  });

  it('uses the {{context.*}} convention the executor resolves', () => {
    // distributed-core's interpolate() matches /\{\{\s*context\.([\w.]+)\s*\}\}/
    // and strips the leading `context.`. A path written any other way resolves
    // to nothing at run time.
    const EXECUTOR_TOKEN_RE = /\{\{\s*context\.([\w.]+)\s*\}\}/;
    const advertised = contextContributions(node({}))
      .map((c) => c.path)
      .filter((p) => p.startsWith('context.'));

    expect(advertised.length).toBeGreaterThan(0);
    for (const path of advertised) {
      expect(`{{${path}}}`).toMatch(EXECUTOR_TOKEN_RE);
    }
  });
});

describe('memory node: executor -> UI', () => {
  /** Paths reachable in a run context, given the handler's output object. */
  const reachable = (root: string, output: Record<string, unknown>) => [
    root,
    ...Object.keys(output).map((k) => `${root}.${k}`),
  ];

  it('advertises only paths the read output actually contains', () => {
    const paths = contextContributions(node({ mode: 'read' })).map((c) => c.path);
    const output = Object.fromEntries(
      MEMORY_READ_OUTPUT_KEYS.map((k) => [k, null]),
    );
    const valid = new Set(reachable('context.steps.m1.output', output));

    for (const p of paths) expect(valid).toContain(p);
  });

  it('advertises only paths the write output actually contains', () => {
    const paths = contextContributions(node({ mode: 'write' })).map((c) => c.path);
    const output = Object.fromEntries(
      MEMORY_WRITE_OUTPUT_KEYS.map((k) => [k, null]),
    );
    const valid = new Set(reachable('context.steps.m1.output', output));

    for (const p of paths) expect(valid).toContain(p);
  });

  it('offers the recalled value, not just the wrapper', () => {
    // The whole point of a read is the value. Advertising only
    // `steps.<id>.output` leaves the author unable to pick it.
    const paths = contextContributions(node({ mode: 'read' })).map((c) => c.path);
    expect(paths).toContain('context.steps.m1.output.value');
  });

  it('does not offer `.value` on a write, which never returns one', () => {
    const paths = contextContributions(node({ mode: 'write' })).map((c) => c.path);
    expect(paths).not.toContain('context.steps.m1.output.value');
    expect(paths).toContain('context.steps.m1.output.written');
  });

  it('describes the output as an object, matching what the handler returns', () => {
    // It was previously advertised as an `array` ("Records read from memory"),
    // which is not what the handler returns at all.
    const root = contextContributions(node({ mode: 'read' })).find(
      (c) => c.path === 'context.steps.m1.output',
    );
    expect(root?.kind).toBe('object');
  });

  it('honours outputKey, which the EXECUTOR applies (context[outputKey] = output)', () => {
    const paths = contextContributions(node({ mode: 'read', outputKey: 'recalled' })).map(
      (c) => c.path,
    );
    expect(paths).toContain('context.recalled');
    expect(paths).toContain('context.recalled.value');
    expect(paths.every((p) => !p.startsWith('context.steps.'))).toBe(true);
  });
});
