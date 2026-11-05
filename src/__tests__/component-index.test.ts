// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error -- a plain .mjs script with no type declarations
import { render, collect, INDEX_PATH } from '../../scripts/generate-component-index.mjs';

/**
 * docs/COMPONENT_INDEX.md is what a consumer's agent reads to find a
 * component before hand-rolling one (it ships in the tarball; the source does
 * not). It is generated from the export surface, so the only way it goes
 * wrong is by being stale: a new export that never reaches the index is
 * invisible to every consumer. Regenerate with `npm run docs:index`.
 */
describe('docs/COMPONENT_INDEX.md', () => {
  it('matches the generator output (run `npm run docs:index` if this fails)', () => {
    expect(existsSync(INDEX_PATH)).toBe(true);
    const committed = readFileSync(INDEX_PATH, 'utf8');
    // Compare line sets first so a failure names the missing/extra rows
    // instead of dumping a 1000-line diff.
    const expected: string = render();
    const want = new Set(expected.split('\n'));
    const have = new Set(committed.split('\n'));
    expect({
      missingFromCommitted: [...want].filter((l) => !have.has(l)).slice(0, 20),
      notInGeneratorOutput: [...have].filter((l) => !want.has(l)).slice(0, 20),
    }).toEqual({ missingFromCommitted: [], notInGeneratorOutput: [] });
    expect(committed).toBe(expected);
  });

  it('indexes the components the canonical-choices table depends on', () => {
    const { rows } = collect() as { rows: Array<{ name: string; subpath: string }> };
    const at = (name: string) => rows.filter((r) => r.name === name).map((r) => r.subpath);
    // Layout is root-only; a regression that routed it to a subpath would
    // re-teach consumers the nonexistent `/layout` import.
    expect(at('AppShell')).toEqual(['']);
    expect(at('DataTable')).toEqual(['']);
    expect(at('PipelineEditorPage')).toEqual(['/pipelines']);
  });
});
