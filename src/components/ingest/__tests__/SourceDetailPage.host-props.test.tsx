// Verifies SourceDetailPage is usable by a host that does NOT mount this
// library's <IdentityProvider> — the `idToken`/`baseUrl` props exist for
// exactly that case (2.357.0).
//
// Deliberately does NOT mock IdentityContext, usePipelineDefs, or
// useDocumentTypes: exercises the REAL hooks and the REAL
// useOptionalIdentityContext (which returns `null` outside a provider) to
// prove the actual precedence, not a mocked stand-in.

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import SourceDetailPage from '../SourceDetailPage';
import type { IngestSource } from '../../../types/ingest';

const now = new Date().toISOString();

const SOURCE: IngestSource = {
  sourceId: 'src-drive',
  name: 'Contracts (Google Drive)',
  type: 'google-drive',
  config: {},
  syncSchedule: null,
  mappingRules: [],
  defaultPipelineId: null,
  status: 'active',
  lastSyncAt: null,
  lastSyncStats: null,
  createdAt: now,
  updatedAt: now,
};

function stubFetch(baseUrl: string) {
  return vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (url.includes('/metrics')) {
      return new Response(
        JSON.stringify({ sourceId: 'src-drive', window: '1h', bucketSizeMs: 0, latencyP95: [], errorRate: [], queueDepth: [] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }
    if (url.startsWith(`${baseUrl}/api/ingest/sources/`)) {
      return new Response(JSON.stringify(SOURCE), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ pipelines: [] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('SourceDetailPage — props only, no IdentityProvider mounted', () => {
  it('renders with no provider in the tree and no crash, and uses the given baseUrl/idToken', async () => {
    const baseUrl = 'https://consumer.example';
    const fetchMock = stubFetch(baseUrl);
    vi.stubGlobal('fetch', fetchMock);

    render(
      <MemoryRouter initialEntries={['/ingest/sources/src-drive']}>
        <Routes>
          <Route path="/ingest/sources/:id" element={<SourceDetailPage baseUrl={baseUrl} idToken="host-token" />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText('Contracts (Google Drive)')).toBeInTheDocument());

    const sourceCall = fetchMock.mock.calls.find((c) => (c[0] as string).startsWith(`${baseUrl}/api/ingest/sources/`));
    expect(sourceCall).toBeDefined();
    const init = sourceCall?.[1] as RequestInit | undefined;
    expect((init?.headers as Record<string, string>)?.Authorization).toBe('Bearer host-token');
  });
});
