// persistence/__tests__/pipelineStorageRemote.test.ts
//
// Depth tests for the remote-first storage wrapper. The focus is the
// write-through *cache* contract — what ends up in localStorage, and whether
// the caller's own object survives the round trip — not fetch plumbing.
//
// Regression cluster (v2.90.x): every cache write went through the LOCAL
// `savePipeline`, which bumps `version` and re-stamps `updatedAt`. That made a
// read mutate data:
//   - `loadPipeline` returned the server's definition one version ahead, with
//     `updatedAt = now`, and cached that. Opening a pipeline you never touched
//     re-dated it in the list and mis-labelled the editor's version chip.
//   - `savePipeline` bumped twice (once in the wrapper, once inside the local
//     save) AND mutated the argument, which is the editor's live React state.
//   - `publishPipeline` cached the freshly published definition one version
//     ahead of the version the server actually published.
//   - `createPipeline` declared v1 and PUT v2.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { PipelineDefinition } from '../../../../types/pipeline';
import {
  createPipeline,
  deletePipeline,
  listPipelines,
  loadPipeline,
  publishPipeline,
  savePipeline,
} from '../pipelineStorageRemote';
import { loadPipeline as loadCached, listPipelines as listCached } from '../pipelineStorage';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeDef(over: Partial<PipelineDefinition> = {}): PipelineDefinition {
  return {
    id: 'p1',
    name: 'Pipeline One',
    version: 7,
    status: 'draft',
    nodes: [],
    edges: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
    createdBy: 'tester',
    ...over,
  } as PipelineDefinition;
}

function res(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/** Records every PUT/POST body so tests can assert on what hit the wire. */
function stubFetch(handler: (url: string, init?: RequestInit) => Response | Promise<Response>) {
  const fn = vi.fn(async (url: string, init?: RequestInit) => handler(url, init));
  vi.stubGlobal('fetch', fn);
  return fn;
}

describe('pipelineStorageRemote', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // loadPipeline — a read must not mutate
  // -------------------------------------------------------------------------

  describe('loadPipeline', () => {
    it('caches the server copy verbatim — a read never bumps version or updatedAt', async () => {
      const server = makeDef({ version: 7, updatedAt: '2026-01-02T00:00:00.000Z' });
      stubFetch(() => res(server));

      const got = await loadPipeline('p1');

      expect(got?.version).toBe(7);
      expect(got?.updatedAt).toBe('2026-01-02T00:00:00.000Z');
      const cached = loadCached('p1');
      expect(cached?.version).toBe(7);
      expect(cached?.updatedAt).toBe('2026-01-02T00:00:00.000Z');
    });

    it('mirrors the loaded pipeline into the list index', async () => {
      stubFetch(() => res(makeDef({ name: 'Indexed', icon: '🚀', tags: ['a'] })));

      await loadPipeline('p1');

      expect(listCached()).toEqual([
        expect.objectContaining({ id: 'p1', name: 'Indexed', icon: '🚀', tags: ['a'] }),
      ]);
    });

    it('falls back to the cached copy on a transport failure', async () => {
      stubFetch(() => res(makeDef({ name: 'Cached' })));
      await loadPipeline('p1');

      stubFetch(() => {
        throw new TypeError('Failed to fetch');
      });
      const got = await loadPipeline('p1');
      expect(got?.name).toBe('Cached');
    });

    it('falls back to the cached copy when the host answers index.html (non-JSON)', async () => {
      stubFetch(() => res(makeDef({ name: 'Cached' })));
      await loadPipeline('p1');

      stubFetch(
        () =>
          ({
            ok: true,
            status: 200,
            json: async () => {
              throw new SyntaxError('Unexpected token < in JSON');
            },
          }) as unknown as Response,
      );
      const got = await loadPipeline('p1');
      expect(got?.name).toBe('Cached');
    });

    it('rethrows an auth failure rather than silently serving stale data', async () => {
      stubFetch(() => res({ error: 'nope' }, 401));
      await expect(loadPipeline('p1')).rejects.toThrow(/401/);
    });

    it('returns the cached copy when the server 404s', async () => {
      stubFetch(() => res(makeDef({ name: 'Only local' })));
      await loadPipeline('p1');

      stubFetch(() => res({}, 404));
      const got = await loadPipeline('p1');
      expect(got?.name).toBe('Only local');
    });
  });

  // -------------------------------------------------------------------------
  // savePipeline — bump exactly once, on a copy
  // -------------------------------------------------------------------------

  describe('savePipeline', () => {
    it('bumps the version exactly once', async () => {
      const fetchMock = stubFetch((_url, init) => res(JSON.parse(String(init?.body))));

      const saved = await savePipeline(makeDef({ version: 3 }));

      expect(saved.version).toBe(4);
      expect(loadCached('p1')?.version).toBe(4);
      const sent = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
      expect(sent.version).toBe(4);
    });

    it('does not mutate the caller definition (it is the editor React state object)', async () => {
      stubFetch((_url, init) => res(JSON.parse(String(init?.body))));
      const mine = makeDef({ version: 3, updatedAt: '2026-01-02T00:00:00.000Z' });

      await savePipeline(mine);

      expect(mine.version).toBe(3);
      expect(mine.updatedAt).toBe('2026-01-02T00:00:00.000Z');
    });

    it('advances the version by one per save across a sequence', async () => {
      stubFetch((_url, init) => res(JSON.parse(String(init?.body))));

      let def = makeDef({ version: 1 });
      def = await savePipeline(def);
      def = await savePipeline(def);
      def = await savePipeline(def);

      expect(def.version).toBe(4);
      expect(loadCached('p1')?.version).toBe(4);
    });

    // INVERTED (was: "keeps the offline copy (bumped, cached) when the
    // network is down", asserting the promise RESOLVED). Half of that was
    // right and is kept: the local cache write must survive, so no work is
    // lost. The resolve was the bug — `PipelineEditorContext.persist` reads a
    // fulfilled promise as "the server has it", clears `dirty`, and the
    // editor flashes "Saved". The user then closes the tab believing the
    // pipeline is on the server when it exists only in that browser.
    it('caches the bumped copy AND rejects when the network is down', async () => {
      stubFetch(() => {
        throw new TypeError('Failed to fetch');
      });

      await expect(savePipeline(makeDef({ version: 3 }))).rejects.toThrow(
        /Failed to fetch/,
      );

      // Nothing lost: the bumped definition is still in the local cache.
      expect(loadCached('p1')?.version).toBe(4);
    });

    it('rejects on a 5xx rather than resolving like a successful write', async () => {
      stubFetch(() => res({ error: 'boom' }, 503));
      await expect(savePipeline(makeDef())).rejects.toThrow(/503/);
    });

    // The one case that still resolves quietly: an SPA-fallback host answers
    // an unknown /api/* path with index.html and HTTP 200. That is the
    // backendless demo, not an outage, and must not toast on every keystroke.
    it('resolves the local copy when there is no API at this origin', async () => {
      stubFetch(() => ({
        ok: true,
        status: 200,
        json: () => Promise.reject(new SyntaxError('Unexpected token < in JSON')),
      }) as unknown as Response);

      const saved = await savePipeline(makeDef({ version: 3 }));
      expect(saved.version).toBe(4);
      expect(loadCached('p1')?.version).toBe(4);
    });

    it('rethrows a non-transport failure so the caller can surface it', async () => {
      stubFetch(() => res({ error: 'bad' }, 400));
      await expect(savePipeline(makeDef())).rejects.toThrow(/400/);
    });
  });

  // -------------------------------------------------------------------------
  // publishPipeline
  // -------------------------------------------------------------------------

  describe('publishPipeline', () => {
    it('caches exactly the version the server published', async () => {
      const published = makeDef({ status: 'published', version: 9, publishedVersion: 9 });
      stubFetch(() => res(published));

      const got = await publishPipeline('p1');

      expect(got?.version).toBe(9);
      const cached = loadCached('p1');
      expect(cached?.version).toBe(9);
      expect(cached?.publishedVersion).toBe(9);
      // v === publishedVersion is what the editor reads as "no unpublished
      // changes"; a bumped cache made a just-published pipeline look dirty.
      expect(cached?.version).toBe(cached?.publishedVersion);
    });

    it('returns null when the pipeline is gone', async () => {
      stubFetch(() => res({}, 404));
      await expect(publishPipeline('p1')).resolves.toBeNull();
    });

    // Regression (null-conflation): `null` used to mean BOTH "the server has
    // no such pipeline" and "the publish failed", and PipelineEditorPage
    // toasted a green "Pipeline published" over either.
    it('REJECTS (does not resolve null) when the network is down', async () => {
      stubFetch(() => {
        throw new TypeError('Failed to fetch');
      });
      await expect(publishPipeline('p1')).rejects.toThrow(/Failed to fetch/);
    });

    it('REJECTS (does not resolve null) on a 500', async () => {
      stubFetch(() => res({ error: 'boom' }, 500));
      await expect(publishPipeline('p1')).rejects.toThrow(/500/);
    });
  });

  // -------------------------------------------------------------------------
  // createPipeline / deletePipeline / listPipelines
  // -------------------------------------------------------------------------

  describe('createPipeline', () => {
    it('caches and PUTs v1 — the declared version', async () => {
      const fetchMock = stubFetch((_url, init) => res(JSON.parse(String(init?.body))));

      const def = await createPipeline({ name: 'Fresh', createdBy: 'tester' });

      expect(def.version).toBe(1);
      expect(loadCached(def.id)?.version).toBe(1);
      const sent = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
      expect(sent.version).toBe(1);
    });

    it('still returns a usable definition when the API is unreachable', async () => {
      stubFetch(() => {
        throw new TypeError('Failed to fetch');
      });
      const def = await createPipeline({ name: 'Offline', createdBy: 'tester' });
      expect(loadCached(def.id)?.name).toBe('Offline');
    });
  });

  describe('deletePipeline', () => {
    it('removes the cached copy and its index entry even when the API is down', async () => {
      stubFetch((_url, init) => res(init?.body ? JSON.parse(String(init.body)) : {}));
      await savePipeline(makeDef());
      expect(listCached()).toHaveLength(1);

      stubFetch(() => {
        throw new TypeError('Failed to fetch');
      });
      await deletePipeline('p1');

      expect(loadCached('p1')).toBeNull();
      expect(listCached()).toHaveLength(0);
    });
  });

  describe('listPipelines', () => {
    it('projects the server definitions into index entries', async () => {
      stubFetch(() =>
        res({ pipelines: [makeDef({ id: 'a', icon: '🎯', tags: ['x', 'y'] })] }),
      );
      await expect(listPipelines()).resolves.toEqual([
        { id: 'a', name: 'Pipeline One', status: 'draft', updatedAt: '2026-01-02T00:00:00.000Z', icon: '🎯', tags: ['x', 'y'] },
      ]);
    });

    it('tolerates a body with no `pipelines` key', async () => {
      stubFetch(() => res({}));
      await expect(listPipelines()).resolves.toEqual([]);
    });

    it('falls back to the local index when the API is unreachable', async () => {
      stubFetch((_url, init) => res(init?.body ? JSON.parse(String(init.body)) : {}));
      await savePipeline(makeDef({ name: 'Local only' }));

      stubFetch(() => {
        throw new TypeError('Failed to fetch');
      });
      await expect(listPipelines()).resolves.toEqual([
        expect.objectContaining({ id: 'p1', name: 'Local only' }),
      ]);
    });
  });
});
