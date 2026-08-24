// frontend/src/components/pipelines/persistence/pipelineStorageRemote.ts
//
// DynamoDB-backed pipeline storage via social-api REST endpoints.
// Primary source of truth — localStorage is used only as a write-through
// cache for instant page loads (stale-while-revalidate pattern).
//
// Backend contract:
//   social-api/src/routes/pipelineDefinitions.ts
//   mounted at `/api/pipelines/defs`
//
// With SKIP_AUTH=true the backend sets req.user = { sub: 'dev-user' }
// automatically — no Authorization header needed for local dev.

import type { PipelineDefinition } from '../../../types/pipeline';
import {
  cachePipeline,
  deletePipeline as deletePipelineLocal,
  listPipelines as listPipelinesLocal,
  loadPipeline as loadPipelineLocal,
  type PipelineIndexEntry,
} from './pipelineStorage';

// ---------------------------------------------------------------------------
// Base URL
// ---------------------------------------------------------------------------

function defsUrl(path = ''): string {
  const base = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';
  return `${base}/api/pipelines/defs${path}`;
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

// ---------------------------------------------------------------------------
// Core API calls (no auth token needed with SKIP_AUTH=true)
// ---------------------------------------------------------------------------

export async function listPipelinesRemote(): Promise<PipelineIndexEntry[]> {
  const res = await fetch(defsUrl('/'), { credentials: 'include' });
  if (!res.ok) throw new Error(`listPipelinesRemote failed (${res.status})`);
  const body = (await res.json()) as { pipelines: PipelineDefinition[] };
  return (body.pipelines ?? []).map((def): PipelineIndexEntry => ({
    id: def.id,
    name: def.name,
    status: def.status,
    updatedAt: def.updatedAt,
    ...(def.icon ? { icon: def.icon } : {}),
    ...(def.tags && def.tags.length > 0 ? { tags: [...def.tags] } : {}),
  }));
}

export async function loadPipelineRemote(id: string): Promise<PipelineDefinition | null> {
  const res = await fetch(defsUrl(`/${encodeURIComponent(id)}`), {
    credentials: 'include',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`loadPipelineRemote failed (${res.status})`);
  return (await res.json()) as PipelineDefinition;
}

export async function savePipelineRemote(def: PipelineDefinition): Promise<PipelineDefinition> {
  const res = await fetch(defsUrl(`/${encodeURIComponent(def.id)}`), {
    method: 'PUT',
    headers: JSON_HEADERS,
    credentials: 'include',
    body: JSON.stringify(def),
  });
  if (!res.ok) throw new Error(`savePipelineRemote failed (${res.status})`);
  return (await res.json()) as PipelineDefinition;
}

export async function deletePipelineRemote(id: string): Promise<void> {
  const res = await fetch(defsUrl(`/${encodeURIComponent(id)}`), {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(`deletePipelineRemote failed (${res.status})`);
  }
}

export async function publishPipelineRemote(id: string): Promise<PipelineDefinition | null> {
  const res = await fetch(defsUrl(`/${encodeURIComponent(id)}/publish`), {
    method: 'POST',
    credentials: 'include',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`publishPipelineRemote failed (${res.status})`);
  return (await res.json()) as PipelineDefinition;
}

// ---------------------------------------------------------------------------
// Public API — remote-first with localStorage fallback
//
// These are the functions the UI should call. They write through to
// localStorage for instant reads on next page load, but the API is the
// source of truth.
// ---------------------------------------------------------------------------

/**
 * True when the pipelines API is not usably present, so the caller should fall
 * back to localStorage rather than surfacing an error.
 *
 * Covers the obvious transport failures AND a response that is not JSON. That
 * second case is not exotic: any SPA-fallback deployment answers an unknown
 * path with index.html and HTTP 200, so `res.json()` throws a parse error
 * rather than a network error. Classifying that as a hard failure left the
 * editor stuck on "Loading pipeline…" forever instead of opening the locally
 * stored copy — which is exactly what happens in the demo, and in any app
 * whose static host serves index.html for /api/*.
 */
/**
 * True when the failure means "there is no pipelines API at this origin",
 * as opposed to "the API is there and the write did not land".
 *
 * That distinction only matters for WRITES. `isNetworkError` below folds
 * both into one bucket, which is right for reads (falling back to the cache
 * shows more data, never a false emptiness) and wrong for writes: it made a
 * rejected PUT resolve exactly like a persisted one, so the editor flashed
 * "Saved", cleared `dirty`, and the user closed the tab believing the
 * pipeline was on the server when it existed only in that browser's
 * localStorage.
 *
 * A non-JSON body and a 404 stay in the "no API here" bucket on purpose: any
 * SPA-fallback host answers an unknown /api/* path with index.html and HTTP
 * 200, which is the backendless demo, not an outage. A genuine transport
 * failure or a 5xx is a real, reportable write failure.
 */
function isApiAbsent(err: unknown): boolean {
  if (err instanceof SyntaxError) return true; // response body was not JSON
  const msg = (err as Error).message || String(err);
  return (
    msg.includes('Unexpected token') ||
    msg.includes('not valid JSON') ||
    msg.includes('(404)')
  );
}

function isNetworkError(err: unknown): boolean {
  if (err instanceof SyntaxError) return true; // response body was not JSON
  const msg = (err as Error).message || String(err);
  return (
    msg.includes('NetworkError') ||
    msg.includes('Failed to fetch') ||
    msg.includes('network') ||
    msg.includes('ECONNREFUSED') ||
    msg.includes('Unexpected token') ||
    msg.includes('not valid JSON') ||
    msg.includes('500') ||
    msg.includes('502') ||
    msg.includes('503') ||
    msg.includes('504')
  );
}

export async function listPipelines(): Promise<PipelineIndexEntry[]> {
  try {
    return await listPipelinesRemote();
  } catch (err) {
    if (isNetworkError(err)) return listPipelinesLocal();
    throw err;
  }
}

export async function loadPipeline(id: string): Promise<PipelineDefinition | null> {
  try {
    const remote = await loadPipelineRemote(id);
    if (remote) {
      // Cache verbatim: this is a READ. Writing it back through `savePipeline`
      // bumped `version` and re-stamped `updatedAt`, so simply opening a
      // pipeline made the cached copy — and the definition handed to the
      // editor, which is this same object — drift ahead of the server.
      cachePipeline(remote);
    }
    return remote ?? loadPipelineLocal(id);
  } catch (err) {
    if (isNetworkError(err)) return loadPipelineLocal(id);
    throw err;
  }
}

export async function savePipeline(def: PipelineDefinition): Promise<PipelineDefinition> {
  // Bump on a COPY. Mutating the argument reached into the editor's live React
  // state object, and delegating the cache write to the local `savePipeline`
  // (which bumps again) advanced the version by two on every save.
  const next: PipelineDefinition = {
    ...def,
    version: (def.version ?? 0) + 1,
    updatedAt: new Date().toISOString(),
  };
  cachePipeline(next);
  try {
    return await savePipelineRemote(next);
  } catch (err) {
    // The local cache write above already happened, so nothing is lost — but
    // a write the server refused must NOT resolve like one it accepted.
    // Returning `next` here meant the caller cleared `dirty`, showed the
    // "Saved" flash, and never queued a retry. Only "there is no API here"
    // (demo / SPA-fallback host) resolves quietly; a real failure propagates
    // so `PipelineEditorContext.persist` can re-queue it and toast.
    if (isApiAbsent(err)) return next;
    throw err;
  }
}

export async function deletePipeline(id: string): Promise<void> {
  deletePipelineLocal(id);
  try {
    await deletePipelineRemote(id);
  } catch (err) {
    if (isNetworkError(err)) return;
    throw err;
  }
}

export async function publishPipeline(id: string): Promise<PipelineDefinition | null> {
  try {
    const published = await publishPipelineRemote(id);
    if (published) {
      // Verbatim — the server just decided `version` / `publishedVersion`.
      // Bumping here made the cached copy look like an unpublished draft one
      // version ahead of what was actually published.
      cachePipeline(published);
    }
    return published;
  } catch (err) {
    // `null` means "the server has no such pipeline" (the 404 above). It used
    // to ALSO mean "the publish failed", which is how `PipelineEditorPage`
    // ended up firing a green "Pipeline published" toast over a pipeline that
    // was still a draft.
    if (isApiAbsent(err)) return null;
    throw err;
  }
}

export async function createPipeline(
  partial: Partial<PipelineDefinition> & { name: string; createdBy: string },
): Promise<PipelineDefinition> {
  const now = new Date().toISOString();
  const triggerNode = {
    id: crypto.randomUUID(),
    type: 'trigger' as const,
    position: { x: 40, y: 120 },
    data: { type: 'trigger' as const, triggerType: 'manual' as const },
  };

  const def: PipelineDefinition = {
    id: partial.id ?? crypto.randomUUID(),
    name: partial.name,
    description: partial.description,
    tags: partial.tags ?? [],
    icon: partial.icon ?? '🔀',
    version: 1,
    status: 'draft',
    publishedVersion: partial.publishedVersion,
    triggerBinding: partial.triggerBinding,
    nodes: partial.nodes ?? [triggerNode],
    edges: partial.edges ?? [],
    createdAt: partial.createdAt ?? now,
    updatedAt: now,
    createdBy: partial.createdBy,
  };

  // Verbatim — `def.version` is 1 by construction above; the old
  // `savePipelineLocal` bumped it to 2 before the PUT, so a brand-new
  // pipeline was born at v2.
  cachePipeline(def);
  try {
    await savePipelineRemote(def);
  } catch (err) {
    if (!isNetworkError(err)) throw err;
  }
  return def;
}
