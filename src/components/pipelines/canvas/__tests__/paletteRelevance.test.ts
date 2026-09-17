// Tests for palette relevance ranking.
//
// The behaviour being replaced was a global recently-used list, so the point of
// most of these is that the answer depends on the PIPELINE and nothing else.

import { describe, it, expect } from 'vitest';
import { rankByRelevance, namespaceOf } from '../paletteRelevance';

const catalog = [
  'transcript:store',
  'transcript:publish',
  'transcript:merge-reactions',
  'document:apply',
  'document:read',
  'image:crop',
  'image:resize',
  'llm',
  'agent',
];

describe('namespaceOf', () => {
  it('reads the namespace off a qualified kind', () => {
    expect(namespaceOf('transcript:store')).toBe('transcript');
  });

  it('returns null for a bare built-in type', () => {
    expect(namespaceOf('llm')).toBeNull();
  });

  it('returns null rather than an empty namespace', () => {
    expect(namespaceOf(':orphan')).toBeNull();
  });

  it('keeps only the first segment', () => {
    expect(namespaceOf('doc-auto:a:b')).toBe('doc-auto');
  });
});

describe('rankByRelevance', () => {
  it('offers nothing when the pipeline gives no signal', () => {
    // The caller falls back rather than padding with arbitrary suggestions.
    expect(rankByRelevance([], catalog)).toEqual([]);
  });

  it('leads with kinds already in the pipeline', () => {
    const ranked = rankByRelevance(['transcript:store'], catalog);
    expect(ranked[0]).toEqual({ kind: 'transcript:store', reason: 'in-pipeline' });
  });

  it('then offers the rest of that namespace', () => {
    const ranked = rankByRelevance(['transcript:store'], catalog).map((r) => r.kind);
    expect(ranked).toContain('transcript:publish');
    expect(ranked).toContain('transcript:merge-reactions');
  });

  it('does not offer an unrelated domain', () => {
    // The actual complaint: a document pipeline offered Crop and Resize.
    const ranked = rankByRelevance(['document:apply'], catalog).map((r) => r.kind);
    expect(ranked).not.toContain('image:crop');
    expect(ranked).not.toContain('image:resize');
  });

  it('spans several namespaces when the pipeline does', () => {
    const ranked = rankByRelevance(['document:apply', 'image:crop'], catalog).map((r) => r.kind);
    expect(ranked).toContain('document:read');
    expect(ranked).toContain('image:resize');
  });

  it('never offers a kind that cannot run', () => {
    const ranked = rankByRelevance(['transcript:store'], catalog, {
      unavailable: ['transcript:publish'],
    }).map((r) => r.kind);
    expect(ranked).not.toContain('transcript:publish');
    expect(ranked).toContain('transcript:merge-reactions');
  });

  it('ignores a context kind that is not in the catalog', () => {
    const ranked = rankByRelevance(['nothing:here'], catalog);
    expect(ranked).toEqual([]);
  });

  it('counts a bare built-in already in the pipeline, but pulls in no others', () => {
    // A pipeline with an LLM plausibly wants another. What it does NOT imply is
    // any other bare type — there is no namespace to generalise from, so
    // `agent` stays in its normal category rather than being called relevant.
    const ranked = rankByRelevance(['llm'], catalog);
    expect(ranked).toEqual([{ kind: 'llm', reason: 'in-pipeline' }]);
  });

  it('honours the limit', () => {
    const ranked = rankByRelevance(['transcript:store'], catalog, { limit: 2 });
    expect(ranked).toHaveLength(2);
  });

  it('returns nothing for a non-positive limit', () => {
    expect(rankByRelevance(['transcript:store'], catalog, { limit: 0 })).toEqual([]);
  });

  it('never repeats a kind', () => {
    const ranked = rankByRelevance(['transcript:store', 'transcript:store'], catalog);
    expect(new Set(ranked.map((r) => r.kind)).size).toBe(ranked.length);
  });

  it('is stable across calls', () => {
    const a = rankByRelevance(['document:apply'], catalog);
    const b = rankByRelevance(['document:apply'], catalog);
    expect(a).toEqual(b);
  });
});
