// The document-type adapter reads `import.meta.env.VITE_SOCIAL_API_URL` /
// `VITE_PLATFORM_API_URL`, both of which are replaced at THIS library's build
// time and therefore always empty for a consumer. `setDocumentTypeApiBaseUrl`
// is the override a host calls once at boot.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchDocumentTypesFromServer,
  getDocumentTypeApiBaseUrl,
  setDocumentTypeApiBaseUrl,
} from '../documentTypeApiAdapter';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', '');
  vi.stubEnv('VITE_PLATFORM_API_URL', '');
  setDocumentTypeApiBaseUrl(null);
});
afterEach(() => {
  setDocumentTypeApiBaseUrl(null);
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('setDocumentTypeApiBaseUrl', () => {
  it('sends requests to the configured origin', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    setDocumentTypeApiBaseUrl('https://platform.example');
    await fetchDocumentTypesFromServer('tok');

    expect(fetchMock.mock.calls[0][0]).toBe('https://platform.example/api/document-types');
  });

  it('wins over both build-time env names', async () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    setDocumentTypeApiBaseUrl('https://consumer.example');
    await fetchDocumentTypesFromServer();

    expect(fetchMock.mock.calls[0][0]).toContain('https://consumer.example');
    expect(getDocumentTypeApiBaseUrl()).toBe('https://consumer.example');
  });

  it('null falls back to the env, which is how a suite resets it', async () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://env.example');
    setDocumentTypeApiBaseUrl('https://consumer.example');
    setDocumentTypeApiBaseUrl(null);
    expect(getDocumentTypeApiBaseUrl()).toBe('https://env.example');
  });

  it('accepts an empty string as a deliberate same-origin choice', () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://env.example');
    setDocumentTypeApiBaseUrl('');
    expect(getDocumentTypeApiBaseUrl()).toBe('');
  });
});
