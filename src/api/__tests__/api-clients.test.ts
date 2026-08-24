// API client helpers — URL/param assembly, error surfacing, and the
// boundary quirks each one owns (503 tolerance, runId→id mapping,
// required-filter guard). fetch is mocked; the URLs are the contract.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { retryFromNode, forceFail } from '../pipelineRetry';
import { getRunAuditLog, searchAudit } from '../pipelineAudit';
import { listDLQEntries, redriveDLQEntries } from '../pipelineDLQ';
import { listPipelineRuns } from '../pipelineRuns';
import { resumeFromStep } from '../pipelineResume';

function mockFetch(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const { ok = true, status = 200 } = init;
  const fn = vi.fn().mockResolvedValue({
    ok,
    status,
    statusText: ok ? 'OK' : 'ERR',
    json: async () => body,
    text: async () => JSON.stringify(body),
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

beforeEach(() => vi.restoreAllMocks());
afterEach(() => vi.unstubAllGlobals());

describe('pipelineRetry', () => {
  it('POSTs to the retry endpoint with the inputs body', async () => {
    const fetchSpy = mockFetch({ newRunId: 'r2' });
    await retryFromNode('p1', 'r1', 'n3', { seed: 7 });
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('/api/pipelines/p1/runs/r1/retry/n3');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ inputs: { seed: 7 } });
  });

  it('includes snapshotInput only when true', async () => {
    const fetchSpy = mockFetch({ newRunId: 'r2' });
    await retryFromNode('p1', 'r1', 'n3', undefined, true);
    expect(JSON.parse(fetchSpy.mock.calls[0][1].body)).toEqual({ snapshotInput: true });
  });

  it('throws with status + body text on failure', async () => {
    mockFetch({ error: 'nope' }, { ok: false, status: 409 });
    await expect(retryFromNode('p1', 'r1', 'n3')).rejects.toThrow(/409/);
  });

  // Regression: `retryFromNode` was the only client in src/api/ that omitted
  // `credentials: 'include'`. The session cookie is what authenticates the
  // POST, so on a cookie-auth deployment "Retry from this node" answered 401
  // while Force-fail and Resume on the same run page succeeded.
  it('retryFromNode sends the session cookie, like every sibling client', async () => {
    const fetchSpy = mockFetch({ newRunId: 'r2' });
    await retryFromNode('p1', 'r1', 'n3');
    expect(fetchSpy.mock.calls[0][1].credentials).toBe('include');
  });

  it('forceFail POSTs with credentials', async () => {
    const fetchSpy = mockFetch({ runId: 'r1', status: 'failed' });
    await forceFail('p1', 'r1');
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('/api/pipelines/p1/runs/r1/force-fail');
    expect(init.credentials).toBe('include');
  });
});

describe('pipelineAudit', () => {
  it('URL-encodes ids and serializes filters into the query string', async () => {
    const fetchSpy = mockFetch({ items: [] });
    await getRunAuditLog('p/1', 'r 1', { limit: 10, actions: ['patch'] });
    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('/api/pipelines/p%2F1/runs/r%201/audit');
    expect(url).toContain('limit=10');
    expect(url).toContain('actions=patch');
  });

  it('searchAudit refuses to fire without actor or pipelineId', async () => {
    const fetchSpy = mockFetch({ items: [] });
    await expect(searchAudit({})).rejects.toThrow(/actor.*pipelineId|at least one/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe('pipelineDLQ', () => {
  it('builds the query string only from provided options', async () => {
    const fetchSpy = mockFetch({ items: [] });
    await listDLQEntries({ limit: 5, errorKind: 'timeout' });
    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('limit=5');
    expect(url).toContain('errorKind=timeout');
    expect(url).not.toContain('cursor');
  });

  it('treats 503 as "DLQ not provisioned" and returns empty instead of throwing', async () => {
    mockFetch({ error: 'unavailable' }, { ok: false, status: 503 });
    await expect(listDLQEntries()).resolves.toEqual({ items: [] });
  });

  it('redrive POSTs the entry ids', async () => {
    const fetchSpy = mockFetch({ redriven: 1 });
    await redriveDLQEntries(['d1', 'd2']);
    const [, init] = fetchSpy.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toMatchObject({ ids: ['d1', 'd2'] });
  });
});

describe('pipelineRuns', () => {
  it('maps backend runId to frontend id at the boundary', async () => {
    mockFetch({ runs: [{ runId: 'r1', status: 'completed' }] });
    const out = await listPipelineRuns('p1');
    expect(out.runs[0]).toMatchObject({ id: 'r1' });
  });
});

describe('pipelineResume', () => {
  it('POSTs to the resume endpoint', async () => {
    const fetchSpy = mockFetch({ ok: true });
    await resumeFromStep('p1', 'r1', 's2');
    const url = fetchSpy.mock.calls[0][0] as string;
    expect(url).toContain('/api/pipelines/p1/runs/r1');
    expect(url).toContain('s2');
    expect(fetchSpy.mock.calls[0][1].method).toBe('POST');
  });
});
