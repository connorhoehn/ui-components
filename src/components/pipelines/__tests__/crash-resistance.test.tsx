// Crash resistance for the pipelines domain.
//
// Companion to `src/components/shared/__tests__/crash-resistance.test.tsx`.
// A `PipelineDefinition` and a `PipelineRun` both reach this code from
// localStorage or a host API, and both are `as`-cast on the way in — the
// TypeScript union `NodeType` and the required field `PipelineRun['steps']`
// say nothing about what is actually in the browser's storage or on the wire.
//
// Every case below feeds a shape the types forbid and asserts the GOOD data
// still survives. What was being pinned is not a mislabelled badge: it is a
// throw during a page's render memo, which blanks the page.

import { describe, it, expect, beforeEach } from 'vitest';
import type { NodeType, PipelineDefinition, PipelineRun } from '../../../types/pipeline';
import { isValidHandleConnection } from '../validation/handleCompatibility';
import { validatePipeline } from '../validation/validatePipeline';
import { listRuns, appendRun, clearRuns } from '../persistence/runHistory';

// ---------------------------------------------------------------------------
// handleCompatibility / validatePipeline — a node type outside `NodeType`
//
// `OUTPUT_HANDLES[type]` and `INPUT_HANDLES[type]` are keyed by the union, and
// the result went straight into `spec.includes(handle)`. A pipeline authored
// on a build that knows a type this one doesn't — the normal state of affairs
// for anything stored in localStorage across a deploy — made that `undefined`
// and threw a TypeError.
//
// `PipelineEditorPage` calls `validatePipeline(definition)` from a `useMemo`
// in its render body, so the throw blanked the ENTIRE editor: no canvas, no
// node palette, and no way for the user to see or delete the offending node.
// ---------------------------------------------------------------------------
describe('handleCompatibility — node type outside the union', () => {
  it('reports an unknown source type as an invalid connection instead of throwing', () => {
    expect(() =>
      isValidHandleConnection('image:hologram' as NodeType, 'out', 'llm', 'in'),
    ).not.toThrow();
    expect(isValidHandleConnection('image:hologram' as NodeType, 'out', 'llm', 'in')).toBe(false);
  });

  it('reports an unknown target type as an invalid connection instead of throwing', () => {
    expect(isValidHandleConnection('llm', 'out', 'image:hologram' as NodeType, 'in')).toBe(false);
  });

  it('still validates well-formed edges', () => {
    expect(isValidHandleConnection('trigger', 'out', 'llm', 'in')).toBe(true);
    expect(isValidHandleConnection('fork', 'branch-2', 'llm', 'in')).toBe(true);
  });

  it('validatePipeline surfaces the unknown type as an error rather than crashing', () => {
    const def = {
      id: 'p1',
      name: 'Stored by a newer build',
      status: 'draft',
      version: 1,
      nodes: [
        { id: 'n1', type: 'trigger', position: { x: 0, y: 0 }, data: { type: 'trigger', label: 'Start' } },
        { id: 'n2', type: 'image:hologram', position: { x: 200, y: 0 }, data: { type: 'image:hologram', label: 'Hologram' } },
      ],
      edges: [
        { id: 'e1', source: 'n1', sourceHandle: 'out', target: 'n2', targetHandle: 'in' },
      ],
    } as unknown as PipelineDefinition;

    const result = validatePipeline(def);
    // The bad edge is reported, not swallowed and not fatal.
    expect(result.errors.some((e) => e.code === 'INVALID_HANDLE')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// runHistory.listRuns — a stored run missing `steps` / `startedAt`
//
// Every runs surface does `Object.values(r.steps)` (PipelineRunsPage's cost
// memo, AllRunsPage, PipelineRunDiff, useRunCost) or sorts on
// `a.startedAt.localeCompare(b.startedAt)`. `Object.values(undefined)` and
// `undefined.localeCompare` are both TypeErrors, and both run during render —
// so ONE stored run written by an older build blanked the whole runs page,
// taking the filter bar, the header and the 49 good runs with it.
// ---------------------------------------------------------------------------
describe('runHistory — malformed stored runs', () => {
  const KEY = 'ws_pipeline_runs_v1:p1';

  beforeEach(() => {
    localStorage.clear();
  });

  function goodRun(id: string): PipelineRun {
    return {
      id,
      pipelineId: 'p1',
      status: 'completed',
      startedAt: '2026-01-02T00:00:00.000Z',
      steps: {},
    } as PipelineRun;
  }

  it('returns runs whose `steps` survives Object.values', () => {
    localStorage.setItem(KEY, JSON.stringify([{ id: 'r1', pipelineId: 'p1', status: 'completed' }]));
    const runs = listRuns('p1');
    expect(runs).toHaveLength(1);
    expect(() => Object.values(runs[0].steps)).not.toThrow();
  });

  it('returns runs whose `startedAt` survives localeCompare', () => {
    // Two entries, so the comparator actually runs — a one-element sort never
    // calls it and would pass against the unfixed code.
    localStorage.setItem(
      KEY,
      JSON.stringify([goodRun('r0'), { id: 'r1', pipelineId: 'p1', status: 'completed' }]),
    );
    const runs = listRuns('p1');
    expect(() => [...runs].sort((a, b) => b.startedAt.localeCompare(a.startedAt))).not.toThrow();
  });

  it('keeps the well-formed runs alongside a malformed one', () => {
    localStorage.setItem(
      KEY,
      JSON.stringify([goodRun('r1'), { id: 'r2' }, goodRun('r3')]),
    );
    const runs = listRuns('p1');
    // The malformed run is NOT dropped — it has an id, so it is still a run
    // the user should be able to see. All three come back.
    expect(runs.map((r) => r.id)).toEqual(['r1', 'r2', 'r3']);
    expect(() => runs.map((r) => Object.keys(r.steps).length)).not.toThrow();
  });

  it('drops entries that are not objects at all', () => {
    localStorage.setItem(KEY, JSON.stringify([null, 'nope', 42, goodRun('r1')]));
    expect(listRuns('p1').map((r) => r.id)).toEqual(['r1']);
  });

  it('appendRun does not throw when the in-memory run has no startedAt', () => {
    clearRuns('p1');
    expect(() =>
      appendRun('p1', { id: 'r9', pipelineId: 'p1', status: 'failed' } as unknown as PipelineRun),
    ).not.toThrow();
    expect(listRuns('p1').map((r) => r.id)).toEqual(['r9']);
  });
});
