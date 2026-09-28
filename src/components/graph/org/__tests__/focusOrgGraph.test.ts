import { describe, expect, it } from 'vitest';
import { focusOrgGraph } from '../focusOrgGraph';
import { people, relationships } from './fixtures';

const ids = (xs: { id: string }[]) => xs.map((x) => x.id);

describe('focusOrgGraph', () => {
  it('keeps the focus and its direct neighbours, and the lines among them', () => {
    const out = focusOrgGraph(people, relationships, ['p-2']);
    expect(ids(out.people)).toEqual(['p-1', 'p-2']);
    expect(out.relationships.map((r) => r.type)).toEqual(['reports_to', 'mentors']);
  });

  it('drops strangers: Aisha is two hops from Nora', () => {
    expect(ids(focusOrgGraph(people, relationships, new Set(['p-2'])).people)).not.toContain('p-4');
    expect(ids(focusOrgGraph(people, relationships, ['p-2'], { hops: 2 }).people)).toEqual(['p-1', 'p-2', 'p-3']);
  });

  it('an empty or unknown focus is the whole graph', () => {
    for (const focus of [[], new Set<string>(), undefined, ['nobody']]) {
      const out = focusOrgGraph(people, relationships, focus);
      expect(out.people).toEqual(people);
      expect(out.relationships).toEqual(relationships);
    }
  });

  it('minStrength and topK gate the edges before the walk', () => {
    // Vera's edges: reports_to 1, mentors 0.8, collaborates 0.6. Cap at 1 per person: mentors (both ends already at 1) goes.
    expect(ids(focusOrgGraph(people, relationships, ['p-1'], { minStrength: 0.7 }).people)).toEqual(['p-1', 'p-2']);
    const capped = focusOrgGraph(people, relationships, [], { topK: 1 });
    expect(capped.relationships.map((r) => r.strength)).toEqual([1, 0.6, 0.3]);
  });
});
