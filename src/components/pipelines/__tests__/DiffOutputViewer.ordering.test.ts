import { computeJsonDiff } from '../DiffOutputViewer';

// `flattenJson` writes array indices as bare numeric path segments
// (`results.0` … `results.11`). The tie-break comparator used to be
// `a.key.localeCompare(b.key)`, which collates those as text: "results.10"
// sorts between "results.1" and "results.2". Inputs below have 12 elements
// precisely so the two orders differ — a 3-element array would sort the same
// either way.
describe('computeJsonDiff key ordering', () => {
  const twelve = (mutate?: (arr: string[]) => void) => {
    const arr = Array.from({ length: 12 }, (_, i) => `v${i}`);
    mutate?.(arr);
    return { results: arr };
  };

  it('orders array indices numerically, not lexicographically', () => {
    const entries = computeJsonDiff(twelve(), twelve());
    expect(entries.map((e) => e.key)).toEqual([
      'results.0',
      'results.1',
      'results.2',
      'results.3',
      'results.4',
      'results.5',
      'results.6',
      'results.7',
      'results.8',
      'results.9',
      'results.10',
      'results.11',
    ]);
  });

  it('keeps the changed-first grouping while ordering within a group', () => {
    const a = twelve();
    const b = twelve((arr) => {
      arr[2] = 'CHANGED';
      arr[10] = 'CHANGED';
    });
    const entries = computeJsonDiff(a, b);
    const changed = entries.filter((e) => e.type === 'changed').map((e) => e.key);
    expect(changed).toEqual(['results.2', 'results.10']);
    // …and the changed rows still lead the list.
    expect(entries.slice(0, 2).map((e) => e.key)).toEqual([
      'results.2',
      'results.10',
    ]);
  });

  it('sorts numeric object keys numerically too', () => {
    const a = { byRunId: { 2: 'a', 20: 'b', 100: 'c' } };
    const b = { byRunId: { 2: 'a', 20: 'b', 100: 'c' } };
    expect(computeJsonDiff(a, b).map((e) => e.key)).toEqual([
      'byRunId.2',
      'byRunId.20',
      'byRunId.100',
    ]);
  });

  it('leaves named object keys alphabetical', () => {
    const shape = { z: 1, a: 2, m: 3 };
    expect(computeJsonDiff(shape, shape).map((e) => e.key)).toEqual([
      'a',
      'm',
      'z',
    ]);
  });

  it('groups array indices ahead of named siblings at the same depth', () => {
    const shape = { mixed: { 0: 'x', 1: 'y', alpha: 'z' } };
    expect(computeJsonDiff(shape, shape).map((e) => e.key)).toEqual([
      'mixed.0',
      'mixed.1',
      'mixed.alpha',
    ]);
  });
});
