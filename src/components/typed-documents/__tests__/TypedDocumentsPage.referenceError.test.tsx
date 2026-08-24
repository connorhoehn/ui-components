// Regression: a reference-option lookup that FAILS must not be spelled
// "No referenceable documents yet for this type."
//
// TypedDocumentsPage resolved `[refTypeId, []]` whenever the lookup answered
// non-2xx, and had no rejection handler at all for a transport failure. Either
// way the picker rendered disabled under the "nothing to reference" hint, so a
// backend outage told the user the target documents did not exist — and left
// them unable to create the link, with nothing to retry.

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../../hooks/useTypedDocuments', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useTypedDocuments: () => ({
    documents: [],
    loading: false,
    error: null,
    createDocument: vi.fn(),
    refresh: vi.fn(),
  }),
}));

import { TypedDocumentsPage } from '../TypedDocumentsPage';

const BASE = 'http://social-api';

const TYPE = {
  typeId: 'dt1', name: 'Meeting Notes', description: '', icon: '📄',
  createdBy: 'u1', createdAt: '', updatedAt: '',
  fields: [{
    fieldId: 'ref', name: 'ref', fieldType: 'reference', widget: 'reference_picker',
    cardinality: 1, required: false, helpText: '', referenceTypeId: 'other',
  }],
};

/**
 * `/api/document-types` always succeeds; the reference lookup behaves per
 * `refBehaviour`. A fresh rejection object per call — one shared instance
 * reused across calls can mask which lookup actually failed.
 */
function stubApi(refBehaviour: 'ok-empty' | 'http-500' | 'network') {
  vi.stubGlobal('fetch', vi.fn((url: string) => {
    if (url.includes('/api/document-types')) {
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ items: [TYPE] }) });
    }
    if (refBehaviour === 'network') return Promise.reject(new Error('connection refused'));
    if (refBehaviour === 'http-500') {
      return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) });
    }
    return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ items: [] }) });
  }));
}

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('TypedDocumentsPage — reference-option lookup failure', () => {
  it('says the lookup failed, not that there is nothing to reference (HTTP 500)', async () => {
    stubApi('http-500');
    render(<TypedDocumentsPage idToken="t" />);

    expect(await screen.findByTestId('reference-error-ref')).toHaveTextContent(/500/);
    expect(screen.queryByTestId('reference-empty-ref')).toBeNull();
  });

  it('says the lookup failed when the request never completes (network error)', async () => {
    stubApi('network');
    render(<TypedDocumentsPage idToken="t" />);

    expect(await screen.findByTestId('reference-error-ref')).toHaveTextContent(/connection refused/);
    expect(screen.queryByTestId('reference-empty-ref')).toBeNull();
  });

  it('keeps the "nothing to reference" hint when the lookup genuinely returns no items', async () => {
    stubApi('ok-empty');
    render(<TypedDocumentsPage idToken="t" />);

    await waitFor(() => {
      expect(screen.getByTestId('reference-empty-ref')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('reference-error-ref')).toBeNull();
  });
});
