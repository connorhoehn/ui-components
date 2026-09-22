// src/components/__tests__/asyncStatusAnnounced.test.tsx
//
// Category D of the focus/announcement audit: an async operation finishes —
// a fetch fails, a stream dies, a playback source won't load — and the result
// appears on screen with no live region, so a screen-reader user gets silence
// and no way to know the operation ended, let alone how.
//
// The repo has been adding error banners faster than it has been announcing
// them: in several files the ACTION-failure banner carries `role="alert"`
// while the LOAD-failure banner three lines away does not.
//
// Convention being pinned (matches shared/Banner.tsx): `role="alert"` for
// failures — it is implicitly assertive — and `role="status"` for progress,
// which is polite and must not interrupt.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { StreamingChatPanel } from '../agents/components/StreamingChatPanel';
import MappingReviewPage from '../ingest/MappingReviewPage';
import DeadLetterQueuePage from '../ingest/DeadLetterQueuePage';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ idToken: 'test-token' }),
  useOptionalIdentityContext: () => ({ idToken: 'test-token' }),
}));

beforeEach(() => {
  vi.restoreAllMocks();
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('StreamingChatPanel — a dead stream is announced', () => {
  it('puts the error banner in an assertive live region', () => {
    render(
      <StreamingChatPanel
        messages={[]}
        isStreaming={false}
        onSend={() => {}}
        error="Model stream closed unexpectedly"
      />,
    );

    // The user is waiting on a streamed reply. When it fails, this banner is
    // the ONLY thing that changes on screen.
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toContain('Model stream closed unexpectedly');
  });
});

describe('ingest load failures are announced, not just drawn', () => {
  it('MappingReviewPage announces a failed queue load', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('gateway down')),
    );

    render(<MappingReviewPage />);

    // The sibling action-error banner in this same file already had
    // role="alert"; the load-error banner did not, so the page could fail to
    // load with nothing announced at all.
    await waitFor(() => {
      const alert = screen.getByTestId('mapping-review-error');
      expect(alert.getAttribute('role')).toBe('alert');
    });
  });

  it('DeadLetterQueuePage announces a failed DLQ load', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('gateway down')),
    );

    render(<DeadLetterQueuePage />);

    await waitFor(() => {
      const alert = screen.getByTestId('ingest-dlq-error');
      expect(alert.getAttribute('role')).toBe('alert');
    });
  });
});
