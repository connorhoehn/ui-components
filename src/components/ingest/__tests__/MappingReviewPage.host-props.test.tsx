// Verifies MappingReviewPage is usable by a host that does NOT mount this
// library's <IdentityProvider> — the `idToken`/`baseUrl` props exist for
// exactly that case (2.357.0).
//
// Deliberately does NOT vi.mock useMappingReviewQueue/useDocumentTypes/
// IdentityContext: exercises the REAL hooks and the REAL
// useOptionalIdentityContext (which returns `null` outside a provider) to
// prove the actual precedence, not a mocked stand-in.

import { render, screen, waitFor } from '@testing-library/react';
import MappingReviewPage from '../MappingReviewPage';

function stubFetch() {
  return vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ items: [], threshold: 0.7 }),
  } as unknown as Response);
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('MappingReviewPage — props only, no IdentityProvider mounted', () => {
  it('renders with no provider in the tree and no crash', async () => {
    vi.stubGlobal('fetch', stubFetch());
    render(<MappingReviewPage />);
    expect(screen.getByTestId('mapping-review-page')).toBeInTheDocument();
  });

  it('baseUrl prop is used for the review-queue request', async () => {
    const fetchMock = stubFetch();
    vi.stubGlobal('fetch', fetchMock);
    render(<MappingReviewPage baseUrl="https://consumer.example" idToken="host-token" />);

    await waitFor(() =>
      expect(fetchMock.mock.calls.some((c) => (c[0] as string).startsWith('https://consumer.example/api/ingest/mapping/review'))).toBe(true),
    );
  });

  it('idToken prop is sent as the Authorization header', async () => {
    const fetchMock = stubFetch();
    vi.stubGlobal('fetch', fetchMock);
    render(<MappingReviewPage baseUrl="https://consumer.example" idToken="host-token" />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const call = fetchMock.mock.calls.find((c) => (c[0] as string).includes('/api/ingest/mapping/review'));
    expect(call).toBeDefined();
    const init = call?.[1] as RequestInit | undefined;
    expect((init?.headers as Record<string, string>)?.Authorization).toBe('Bearer host-token');
  });
});
