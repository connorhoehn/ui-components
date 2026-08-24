// persistence/__tests__/runHistory.test.ts
//
// Terminal-run history. This is the only copy of a finished run once the
// in-memory runs map trims it, so the ordering + cap + replace semantics are
// what decide which runs a user can still open.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { PipelineRun } from '../../../../types/pipeline';
import { appendRun, clearRuns, getRun, listRuns } from '../runHistory';

function run(id: string, startedAt: string, over: Partial<PipelineRun> = {}): PipelineRun {
  return {
    id,
    pipelineId: 'p1',
    pipelineVersion: 1,
    status: 'completed',
    triggeredBy: { userId: 'u', triggerType: 'manual' },
    ownerNodeId: 'local',
    startedAt,
    currentStepIds: [],
    steps: {},
    context: {},
    ...over,
  } as PipelineRun;
}

/** 2026-01-01T00:00:00Z + n minutes, so lexical order == chronological order. */
function at(minute: number): string {
  return new Date(Date.UTC(2026, 0, 1, 0, minute)).toISOString();
}

describe('runHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns [] for a pipeline with no history', () => {
    expect(listRuns('p1')).toEqual([]);
  });

  it('stores runs newest-first regardless of insertion order', () => {
    appendRun('p1', run('a', at(1)));
    appendRun('p1', run('c', at(3)));
    appendRun('p1', run('b', at(2)));

    expect(listRuns('p1').map((r) => r.id)).toEqual(['c', 'b', 'a']);
  });

  it('replaces an existing run by id instead of duplicating it', () => {
    appendRun('p1', run('a', at(1), { status: 'running' }));
    appendRun('p1', run('a', at(1), { status: 'completed', durationMs: 42 }));

    const runs = listRuns('p1');
    expect(runs).toHaveLength(1);
    expect(runs[0].status).toBe('completed');
    expect(runs[0].durationMs).toBe(42);
  });

  it('caps history at 50 runs and drops the oldest', () => {
    for (let i = 0; i < 55; i += 1) appendRun('p1', run(`r${i}`, at(i)));

    const runs = listRuns('p1');
    expect(runs).toHaveLength(50);
    expect(runs[0].id).toBe('r54');
    expect(runs.at(-1)!.id).toBe('r5');
    expect(runs.find((r) => r.id === 'r0')).toBeUndefined();
  });

  it('keeps a newly appended older run only when it beats the current oldest', () => {
    for (let i = 10; i < 60; i += 1) appendRun('p1', run(`r${i}`, at(i)));
    // r10 is now the oldest kept entry. Something older must not displace it.
    appendRun('p1', run('ancient', at(0)));

    const ids = listRuns('p1').map((r) => r.id);
    expect(ids).toHaveLength(50);
    expect(ids).not.toContain('ancient');
    expect(ids).toContain('r10');
  });

  it('keeps histories separate per pipeline', () => {
    appendRun('p1', run('a', at(1)));
    appendRun('p2', run('b', at(1), { pipelineId: 'p2' }));

    expect(listRuns('p1').map((r) => r.id)).toEqual(['a']);
    expect(listRuns('p2').map((r) => r.id)).toEqual(['b']);
  });

  it('getRun finds by id and returns null when absent', () => {
    appendRun('p1', run('a', at(1)));
    expect(getRun('p1', 'a')?.id).toBe('a');
    expect(getRun('p1', 'missing')).toBeNull();
    expect(getRun('other-pipeline', 'a')).toBeNull();
  });

  it('clearRuns wipes only the requested pipeline', () => {
    appendRun('p1', run('a', at(1)));
    appendRun('p2', run('b', at(1), { pipelineId: 'p2' }));
    clearRuns('p1');

    expect(listRuns('p1')).toEqual([]);
    expect(listRuns('p2')).toHaveLength(1);
  });

  // -------------------------------------------------------------------------
  // Corruption / quota — reads must degrade to empty, writes must not throw
  // -------------------------------------------------------------------------

  it('returns [] for a corrupt record rather than throwing', () => {
    localStorage.setItem('ws_pipeline_runs_v1:p1', '{not json');
    expect(listRuns('p1')).toEqual([]);
  });

  it('returns [] when the record is valid JSON but not an array', () => {
    localStorage.setItem('ws_pipeline_runs_v1:p1', '{"nope":true}');
    expect(listRuns('p1')).toEqual([]);
  });

  it('appending over a corrupt record recovers rather than compounding it', () => {
    localStorage.setItem('ws_pipeline_runs_v1:p1', '{not json');
    appendRun('p1', run('a', at(1)));
    expect(listRuns('p1').map((r) => r.id)).toEqual(['a']);
  });

  it('swallows a quota-exceeded write', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError');
    });
    expect(() => appendRun('p1', run('a', at(1)))).not.toThrow();
    warn.mockRestore();
  });
});
