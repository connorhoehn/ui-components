// persistence/__tests__/pipelineStorage.test.ts
//
// The localStorage layer under the pipeline editor. Everything here writes or
// reads user data, so the tests focus on what survives a round trip: version /
// timestamp bookkeeping, the index projection, id remapping on duplicate, and
// the corruption paths that must degrade to empty rather than throw.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { PipelineDefinition, PipelineNode } from '../../../../types/pipeline';
import {
  archivePipeline,
  cachePipeline,
  createDemoPipeline,
  createPipeline,
  deletePipeline,
  duplicatePipeline,
  exportPipelineJSON,
  importPipelineJSON,
  listPipelines,
  loadPipeline,
  publishPipeline,
  savePipeline,
  savePipelinePositionsOnly,
} from '../pipelineStorage';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function node(id: string, over: Partial<PipelineNode> = {}): PipelineNode {
  return {
    id,
    type: 'trigger',
    position: { x: 0, y: 0 },
    data: { type: 'trigger', triggerType: 'manual' },
    ...over,
  } as PipelineNode;
}

function makeDef(over: Partial<PipelineDefinition> = {}): PipelineDefinition {
  return {
    id: 'p1',
    name: 'Pipeline One',
    version: 3,
    status: 'draft',
    icon: '🔀',
    tags: ['alpha'],
    nodes: [node('n1')],
    edges: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
    createdBy: 'tester',
    ...over,
  } as PipelineDefinition;
}

describe('pipelineStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // save / load / index
  // -------------------------------------------------------------------------

  describe('savePipeline', () => {
    it('bumps the version, re-stamps updatedAt, and projects an index entry', () => {
      const def = makeDef({ version: 3, updatedAt: '2026-01-02T00:00:00.000Z' });
      savePipeline(def);

      expect(loadPipeline('p1')?.version).toBe(4);
      expect(loadPipeline('p1')?.updatedAt).not.toBe('2026-01-02T00:00:00.000Z');
      expect(listPipelines()).toEqual([
        expect.objectContaining({ id: 'p1', name: 'Pipeline One', status: 'draft', icon: '🔀', tags: ['alpha'] }),
      ]);
    });

    it('treats a missing version as 0', () => {
      const def = makeDef();
      delete (def as { version?: number }).version;
      savePipeline(def);
      expect(loadPipeline('p1')?.version).toBe(1);
    });

    it('keeps the index entry unique per pipeline across repeated saves', () => {
      savePipeline(makeDef());
      savePipeline(makeDef({ name: 'Renamed' }));
      const index = listPipelines();
      expect(index).toHaveLength(1);
      expect(index[0].name).toBe('Renamed');
    });

    it('keeps the existing icon/tags when a later save omits them', () => {
      savePipeline(makeDef({ icon: '🚀', tags: ['keep', 'me'] }));
      const partial = makeDef();
      delete (partial as { icon?: string }).icon;
      delete (partial as { tags?: string[] }).tags;
      savePipeline(partial);

      expect(listPipelines()[0]).toMatchObject({ icon: '🚀', tags: ['keep', 'me'] });
    });

    it('does not alias the index tags array back to the definition', () => {
      const def = makeDef({ tags: ['a'] });
      savePipeline(def);
      def.tags!.push('mutated-after-save');
      expect(listPipelines()[0].tags).toEqual(['a']);
    });

    it('survives a quota-exceeded write without throwing', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('quota', 'QuotaExceededError');
      });
      expect(() => savePipeline(makeDef())).not.toThrow();
      warn.mockRestore();
    });
  });

  describe('cachePipeline', () => {
    it('writes verbatim — no version bump, no updatedAt stamp, no mutation', () => {
      const def = makeDef({ version: 3, updatedAt: '2026-01-02T00:00:00.000Z' });
      cachePipeline(def);

      expect(def.version).toBe(3);
      const stored = loadPipeline('p1')!;
      expect(stored.version).toBe(3);
      expect(stored.updatedAt).toBe('2026-01-02T00:00:00.000Z');
    });

    it('still refreshes the index entry', () => {
      cachePipeline(makeDef({ name: 'From server' }));
      expect(listPipelines()[0]).toMatchObject({ name: 'From server', updatedAt: '2026-01-02T00:00:00.000Z' });
    });
  });

  describe('savePipelinePositionsOnly', () => {
    it('persists the graph without touching the index — a drag must not re-date the list row', () => {
      savePipeline(makeDef());
      const listedAt = listPipelines()[0].updatedAt;
      const versionAfterSave = loadPipeline('p1')!.version;

      const moved = loadPipeline('p1')!;
      moved.nodes[0].position = { x: 500, y: 500 };
      savePipelinePositionsOnly(moved);

      expect(loadPipeline('p1')!.nodes[0].position).toEqual({ x: 500, y: 500 });
      expect(loadPipeline('p1')!.version).toBe(versionAfterSave);
      expect(listPipelines()[0].updatedAt).toBe(listedAt);
    });
  });

  describe('loadPipeline / listPipelines corruption handling', () => {
    it('returns null for a missing pipeline', () => {
      expect(loadPipeline('nope')).toBeNull();
    });

    it('returns null rather than throwing on a corrupt record', () => {
      localStorage.setItem('ws_pipelines_v1:p1', '{not json');
      expect(loadPipeline('p1')).toBeNull();
    });

    it('returns [] for a corrupt index', () => {
      localStorage.setItem('ws_pipelines_v1_index', '{not json');
      expect(listPipelines()).toEqual([]);
    });

    it('returns [] when the index is valid JSON but not an array', () => {
      localStorage.setItem('ws_pipelines_v1_index', '{"nope":true}');
      expect(listPipelines()).toEqual([]);
    });
  });

  describe('deletePipeline', () => {
    it('removes both the record and its index entry', () => {
      savePipeline(makeDef());
      savePipeline(makeDef({ id: 'p2', name: 'Other' }));
      deletePipeline('p1');

      expect(loadPipeline('p1')).toBeNull();
      expect(listPipelines().map((e) => e.id)).toEqual(['p2']);
    });
  });

  // -------------------------------------------------------------------------
  // createPipeline
  // -------------------------------------------------------------------------

  describe('createPipeline', () => {
    it('seeds a manual trigger node and lands at v1 draft', () => {
      const def = createPipeline({ name: 'New', createdBy: 'tester' });
      expect(def.version).toBe(1);
      expect(def.status).toBe('draft');
      expect(def.nodes).toHaveLength(1);
      expect(def.nodes[0].type).toBe('trigger');
      expect(loadPipeline(def.id)?.name).toBe('New');
    });

    it('honours a caller-supplied id and node list', () => {
      const def = createPipeline({
        id: 'fixed',
        name: 'Preset',
        createdBy: 'tester',
        nodes: [node('a'), node('b')],
      });
      expect(def.id).toBe('fixed');
      expect(def.nodes).toHaveLength(2);
    });
  });

  // -------------------------------------------------------------------------
  // publish
  // -------------------------------------------------------------------------

  describe('publishPipeline', () => {
    it('leaves version and publishedVersion in agreement', () => {
      savePipeline(makeDef({ version: 3 })); // stored at v4
      const published = publishPipeline('p1')!;

      expect(published.status).toBe('published');
      expect(published.version).toBe(5);
      expect(published.publishedVersion).toBe(5);
      // The persisted copy must agree — the editor reads
      // version !== publishedVersion as "unpublished changes".
      const stored = loadPipeline('p1')!;
      expect(stored.version).toBe(stored.publishedVersion);
    });

    it('stores a snapshot of the graph that does not nest a previous snapshot', () => {
      savePipeline(makeDef({ nodes: [node('n1'), node('n2')] }));
      publishPipeline('p1');
      publishPipeline('p1');

      const snapshot = loadPipeline('p1')!.publishedSnapshot as PipelineDefinition;
      expect(snapshot.nodes.map((n) => n.id)).toEqual(['n1', 'n2']);
      expect((snapshot as { publishedSnapshot?: unknown }).publishedSnapshot).toBeUndefined();
    });

    it('returns null for an unknown pipeline', () => {
      expect(publishPipeline('missing')).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // archive
  // -------------------------------------------------------------------------

  describe('archivePipeline', () => {
    it('toggles draft → archived → draft', () => {
      savePipeline(makeDef());
      expect(archivePipeline('p1')?.status).toBe('archived');
      expect(archivePipeline('p1')?.status).toBe('draft');
    });

    it('archiving a published pipeline unarchives it as a draft (documented downgrade)', () => {
      savePipeline(makeDef({ status: 'published', publishedVersion: 4 }));
      expect(archivePipeline('p1')?.status).toBe('archived');
      expect(archivePipeline('p1')?.status).toBe('draft');
    });

    it('keeps the record in storage — archive is not delete', () => {
      savePipeline(makeDef());
      archivePipeline('p1');
      expect(loadPipeline('p1')).not.toBeNull();
      expect(listPipelines()[0].status).toBe('archived');
    });

    it('returns null for an unknown pipeline', () => {
      expect(archivePipeline('missing')).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // duplicate
  // -------------------------------------------------------------------------

  describe('duplicatePipeline', () => {
    it('remaps every node id and rewrites the edges to match', () => {
      savePipeline(
        makeDef({
          nodes: [node('a'), node('b', { type: 'llm' })],
          edges: [{ id: 'e1', source: 'a', sourceHandle: 'out', target: 'b', targetHandle: 'in' }],
        }),
      );

      const clone = duplicatePipeline('p1')!;
      const ids = clone.nodes.map((n) => n.id);
      expect(ids).not.toContain('a');
      expect(ids).not.toContain('b');
      expect(clone.edges[0].id).not.toBe('e1');
      expect(ids).toContain(clone.edges[0].source);
      expect(ids).toContain(clone.edges[0].target);
      // Handles are structural — they must survive the remap.
      expect(clone.edges[0].sourceHandle).toBe('out');
      expect(clone.edges[0].targetHandle).toBe('in');
    });

    it('lands as a fresh v1 draft, not a copy of the published state', () => {
      savePipeline(makeDef({ status: 'published', version: 8, publishedVersion: 8 }));
      publishPipeline('p1');

      const clone = duplicatePipeline('p1')!;
      expect(clone.status).toBe('draft');
      expect(clone.publishedVersion).toBeUndefined();
      expect(clone.version).toBe(1); // 0 at construction, bumped by savePipeline
      // Regression: the clone used to inherit the source's "at publish time"
      // snapshot, which describes the SOURCE's node ids — an unpublished draft
      // carrying a foreign published graph.
      expect(clone.publishedSnapshot).toBeUndefined();
      expect(loadPipeline(clone.id)?.publishedSnapshot).toBeUndefined();
    });

    it('names the copy and accepts an override', () => {
      savePipeline(makeDef({ name: 'Base' }));
      expect(duplicatePipeline('p1')?.name).toBe('Base (copy)');
      expect(duplicatePipeline('p1', 'Custom')?.name).toBe('Custom');
    });

    it('does not alias the source tag array', () => {
      const src = makeDef({ tags: ['x'] });
      savePipeline(src);
      const clone = duplicatePipeline('p1')!;
      clone.tags!.push('only-on-clone');
      expect(loadPipeline('p1')!.tags).toEqual(['x']);
    });

    it('leaves an edge pointing at an unknown node untouched rather than dropping it', () => {
      savePipeline(
        makeDef({
          nodes: [node('a')],
          edges: [{ id: 'e1', source: 'a', sourceHandle: 'out', target: 'ghost', targetHandle: 'in' }],
        }),
      );
      const clone = duplicatePipeline('p1')!;
      expect(clone.edges[0].target).toBe('ghost');
    });

    it('returns null for an unknown pipeline', () => {
      expect(duplicatePipeline('missing')).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // export / import
  // -------------------------------------------------------------------------

  describe('export / import', () => {
    it('round-trips a definition under a fresh id', () => {
      savePipeline(makeDef({ nodes: [node('a')], edges: [] }));
      const json = exportPipelineJSON('p1')!;

      const imported = importPipelineJSON(json);
      expect(imported.id).not.toBe('p1');
      expect(imported.name).toBe('Pipeline One');
      expect(imported.nodes.map((n) => n.id)).toEqual(['a']);
      expect(loadPipeline(imported.id)).not.toBeNull();
      expect(listPipelines().map((e) => e.id).sort()).toEqual(['p1', imported.id].sort());
    });

    it('returns null when exporting an unknown pipeline', () => {
      expect(exportPipelineJSON('missing')).toBeNull();
    });

    it('rejects malformed JSON', () => {
      expect(() => importPipelineJSON('{not json')).toThrow(/Invalid pipeline JSON/);
    });

    it('rejects a non-object payload', () => {
      expect(() => importPipelineJSON('42')).toThrow(/Invalid pipeline JSON/);
    });

    it('rejects a payload that fails schema validation, naming the offending path', () => {
      savePipeline(makeDef());
      const parsed = JSON.parse(exportPipelineJSON('p1')!) as Record<string, unknown>;
      delete parsed.nodes;
      expect(() => importPipelineJSON(JSON.stringify(parsed))).toThrow(/Invalid pipeline:/);
    });

    it('does not persist anything when validation fails', () => {
      const before = listPipelines().length;
      expect(() => importPipelineJSON('{"id":"x"}')).toThrow();
      expect(listPipelines()).toHaveLength(before);
    });
  });

  // -------------------------------------------------------------------------
  // demo seed — the lint-clean showcase graph
  // -------------------------------------------------------------------------

  describe('createDemoPipeline', () => {
    it('produces a persisted, fully wired published pipeline', () => {
      const def = createDemoPipeline('tester');
      expect(loadPipeline(def.id)?.nodes).toHaveLength(12);
      expect(def.status).toBe('published');

      // Every edge endpoint must resolve to a real node — a dangling edge here
      // would surface as an INVALID_HANDLE error on the demo pipeline.
      const ids = new Set(def.nodes.map((n) => n.id));
      for (const edge of def.edges) {
        expect(ids.has(edge.source)).toBe(true);
        expect(ids.has(edge.target)).toBe(true);
      }
    });

    it('gives every spawned demo distinct node ids', () => {
      const a = createDemoPipeline('tester');
      const b = createDemoPipeline('tester');
      const overlap = a.nodes.map((n) => n.id).filter((id) => b.nodes.some((n) => n.id === id));
      expect(overlap).toEqual([]);
    });
  });
});
