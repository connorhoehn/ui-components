// Direct coverage of the shared resolver — resolution order (override →
// runtime globalThis env → build-time env), the document-type aliases, and
// that everything resets cleanly between tests.

import { describe, it, expect, afterEach } from 'vitest';
import { setApiBaseUrl, getApiBaseUrl, setDocumentTypeApiBaseUrl, getDocumentTypeApiBaseUrl } from '../apiBaseUrl';

afterEach(() => {
  setApiBaseUrl(null);
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  delete (globalThis as { __UI_COMPONENTS_ENV__?: unknown }).__UI_COMPONENTS_ENV__;
});

describe('getApiBaseUrl resolution order', () => {
  it('defaults to "" when nothing is set', () => {
    expect(getApiBaseUrl()).toBe('');
  });

  it('falls back to the build-time VITE_SOCIAL_API_URL', () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    expect(getApiBaseUrl()).toBe('https://baked-in.example');
  });

  it('falls back to VITE_PLATFORM_API_URL when VITE_SOCIAL_API_URL is unset', () => {
    vi.stubEnv('VITE_PLATFORM_API_URL', 'https://platform-baked.example');
    expect(getApiBaseUrl()).toBe('https://platform-baked.example');
  });

  it('a runtime globalThis.__UI_COMPONENTS_ENV__ wins over the build-time env', () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    (globalThis as { __UI_COMPONENTS_ENV__?: Record<string, string> }).__UI_COMPONENTS_ENV__ = {
      VITE_SOCIAL_API_URL: 'https://runtime-injected.example',
    };
    expect(getApiBaseUrl()).toBe('https://runtime-injected.example');
  });

  it('setApiBaseUrl wins over both the runtime and build-time env', () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    (globalThis as { __UI_COMPONENTS_ENV__?: Record<string, string> }).__UI_COMPONENTS_ENV__ = {
      VITE_SOCIAL_API_URL: 'https://runtime-injected.example',
    };
    setApiBaseUrl('https://consumer.example');
    expect(getApiBaseUrl()).toBe('https://consumer.example');
  });

  it('setApiBaseUrl("") is a deliberate same-origin choice, not "unset"', () => {
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    setApiBaseUrl('');
    expect(getApiBaseUrl()).toBe('');
  });

  it('setApiBaseUrl(null) resets to the env chain', () => {
    setApiBaseUrl('https://consumer.example');
    setApiBaseUrl(null);
    vi.stubEnv('VITE_SOCIAL_API_URL', 'https://baked-in.example');
    expect(getApiBaseUrl()).toBe('https://baked-in.example');
  });
});

describe('setDocumentTypeApiBaseUrl / getDocumentTypeApiBaseUrl aliases', () => {
  it('are the same underlying override as setApiBaseUrl/getApiBaseUrl', () => {
    setDocumentTypeApiBaseUrl('https://alias-set.example');
    expect(getApiBaseUrl()).toBe('https://alias-set.example');
    expect(getDocumentTypeApiBaseUrl()).toBe('https://alias-set.example');

    setApiBaseUrl('https://other-set.example');
    expect(getDocumentTypeApiBaseUrl()).toBe('https://other-set.example');
  });
});
