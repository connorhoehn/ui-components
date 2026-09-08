// approvalSync — the best-effort mirror from the decisions renderer to the
// server approval log. Must never throw (the CRDT stays source of truth),
// must map only terminal statuses, and must scope to the document in the URL.

import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  mapStatusToDecision,
  readDocumentIdFromUrl,
  postApproval,
  setApprovalApiBase,
  getApprovalApiBase,
} from '../approvalSync';

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, '', '/');
  setApprovalApiBase(null);
});

describe('mapStatusToDecision', () => {
  it('maps terminal statuses and refuses non-terminal ones', () => {
    expect(mapStatusToDecision('acked')).toBe('approved');
    expect(mapStatusToDecision('done')).toBe('approved');
    expect(mapStatusToDecision('rejected')).toBe('rejected');
    expect(mapStatusToDecision('pending')).toBeNull();
    expect(mapStatusToDecision('')).toBeNull();
  });
});

describe('readDocumentIdFromUrl', () => {
  it('parses /documents/<id> and ignores other paths', () => {
    window.history.replaceState(null, '', '/documents/doc-42?tab=review');
    expect(readDocumentIdFromUrl()).toBe('doc-42');
    window.history.replaceState(null, '', '/pipelines/p1');
    expect(readDocumentIdFromUrl()).toBeNull();
  });
});

describe('postApproval', () => {
  const okFetch = () =>
    vi.fn().mockResolvedValue({ ok: true, status: 200 });

  it('POSTs the approval with the bearer token and optional fields', async () => {
    const f = okFetch();
    vi.stubGlobal('fetch', f);
    const out = await postApproval({
      sectionId: 's1',
      decision: 'approved',
      documentId: 'doc-1',
      reviewerName: 'Ada',
      idToken: 'tok',
    });
    expect(out.ok).toBe(true);
    const [url, init] = f.mock.calls[0];
    expect(String(url)).toContain('/api/approvals');
    expect(init.headers.Authorization).toBe('Bearer tok');
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      documentId: 'doc-1', sectionId: 's1', decision: 'approved', reviewerName: 'Ada',
    });
    expect(body).not.toHaveProperty('comment');
  });

  it('falls back to the URL for the documentId', async () => {
    const f = okFetch();
    vi.stubGlobal('fetch', f);
    window.history.replaceState(null, '', '/documents/doc-77');
    const out = await postApproval({ sectionId: 's1', decision: 'rejected' });
    expect(out.ok).toBe(true);
    expect(JSON.parse(f.mock.calls[0][1].body).documentId).toBe('doc-77');
  });

  it('skips cleanly when no documentId is resolvable', async () => {
    const f = okFetch();
    vi.stubGlobal('fetch', f);
    const out = await postApproval({ sectionId: 's1', decision: 'approved' });
    expect(out).toEqual({ ok: false, error: 'no documentId in URL' });
    expect(f).not.toHaveBeenCalled();
  });

  it('reports HTTP failures without throwing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const out = await postApproval({ sectionId: 's1', decision: 'approved', documentId: 'd' });
    expect(out.ok).toBe(false);
    expect(out.error).toContain('500');
  });

  it('swallows network errors into the result', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const out = await postApproval({ sectionId: 's1', decision: 'approved', documentId: 'd' });
    expect(out).toEqual({ ok: false, error: 'offline' });
  });
});


// Where the request goes.
//
// This module used to bake in ONE env var name, `VITE_SOCIAL_API_URL`. A host
// whose backend is configured under any other name resolved an empty base and
// posted to its own origin, where nothing answers — and `postApproval`
// swallows failures by design, so the only symptom was an approval log that
// never filled up. That was one of the four differences keeping a consumer on
// its own copy of this directory.
describe('approval API base', () => {
  it('is same-origin when nothing is configured', () => {
    expect(getApprovalApiBase()).toBe('');
  });

  it('takes an explicit override from the host', () => {
    setApprovalApiBase('https://api.example.test');
    expect(getApprovalApiBase()).toBe('https://api.example.test');
  });

  it('accepts a getter, for a host that resolves its base lazily', () => {
    let current = 'https://one.test';
    setApprovalApiBase(() => current);
    expect(getApprovalApiBase()).toBe('https://one.test');
    current = 'https://two.test';
    expect(getApprovalApiBase()).toBe('https://two.test');
  });

  it('falls back to the environment when the override is cleared', () => {
    setApprovalApiBase('https://api.example.test');
    setApprovalApiBase(null);
    expect(getApprovalApiBase()).toBe('');
  });

  it('prefixes the POST with the configured base', async () => {
    const f = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', f);
    setApprovalApiBase('https://api.example.test');
    await postApproval({ sectionId: 's1', decision: 'approved', documentId: 'd' });
    expect(String(f.mock.calls[0][0])).toBe('https://api.example.test/api/approvals');
  });

  it('lets a single call override the configured base', async () => {
    const f = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', f);
    setApprovalApiBase('https://api.example.test');
    await postApproval({
      sectionId: 's1', decision: 'approved', documentId: 'd',
      baseUrl: 'https://other.test',
    });
    expect(String(f.mock.calls[0][0])).toBe('https://other.test/api/approvals');
  });
});
