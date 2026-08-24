// DiagnosticsPage DLQ actions — failure surface.
//
// Redrive and Purge were bare pass-throughs (`await onRedrive(id)` and
// nothing else), so a rejected call became an unhandled promise rejection and
// the page did not move. Purge is the dangerous half: an admin who purges a
// poison message, sees no error and no row disappear, reads that as a stale
// list — and walks away believing the queue is clean when the message is
// still in it.
//
// Same treatment the six sibling admin pages got in v2.91.0: keep the row,
// name the reason, announce it via role="alert".

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DiagnosticsPage } from '../DiagnosticsPage';

const BOOM = 'Refused: queue is locked by an in-flight redrive';

const DLQ = [
  {
    id: 'dlq-abcdef123456789',
    payload: { hello: 'world' },
    error: 'HandlerTimeout',
    failedAt: '2026-02-01T10:00:00.000Z',
    retryCount: 3,
  },
];

function renderPage(over: Partial<React.ComponentProps<typeof DiagnosticsPage>> = {}) {
  const props = {
    dlq: DLQ,
    onRedrive: vi.fn().mockResolvedValue(undefined),
    onPurge: vi.fn().mockResolvedValue(undefined),
    onRefresh: vi.fn(),
    ...over,
  };
  render(<DiagnosticsPage {...props} />);
  return props;
}

describe('DiagnosticsPage DLQ actions', () => {
  it('says why a purge failed instead of failing silently', async () => {
    const onPurge = vi.fn().mockRejectedValue(new Error(BOOM));
    renderPage({ onPurge });

    fireEvent.click(screen.getByRole('button', { name: 'Purge' }));
    await waitFor(() => expect(onPurge).toHaveBeenCalledWith('dlq-abcdef123456789'));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(BOOM);
    // Named so the admin knows WHICH action and WHICH entry failed — the DLQ
    // table can carry many rows and both buttons live on every one.
    expect(alert).toHaveTextContent(/Purge failed/);
    expect(alert).toHaveTextContent('dlq-abcdef123456789');
    // The entry is still listed; nothing pretended to have been removed.
    expect(screen.getByText('HandlerTimeout')).toBeInTheDocument();
  });

  it('says why a redrive failed', async () => {
    const onRedrive = vi.fn().mockRejectedValue(new Error(BOOM));
    renderPage({ onRedrive });

    fireEvent.click(screen.getByRole('button', { name: 'Redrive' }));
    await waitFor(() => expect(onRedrive).toHaveBeenCalled());

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/Redrive failed/);
  });

  it('shows nothing when the action succeeds', async () => {
    const onPurge = vi.fn().mockResolvedValue(undefined);
    renderPage({ onPurge });

    fireEvent.click(screen.getByRole('button', { name: 'Purge' }));
    await waitFor(() => expect(onPurge).toHaveBeenCalled());

    // Give any state update a tick to land before asserting the absence.
    await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
  });

  it('clears a stale failure when the action is retried successfully', async () => {
    const onPurge = vi
      .fn()
      .mockRejectedValueOnce(new Error(BOOM))
      .mockResolvedValueOnce(undefined);
    renderPage({ onPurge });

    fireEvent.click(screen.getByRole('button', { name: 'Purge' }));
    await screen.findByRole('alert');

    fireEvent.click(screen.getByRole('button', { name: 'Purge' }));
    await waitFor(() => expect(onPurge).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
  });

  it('handles a non-Error rejection without rendering "undefined"', async () => {
    const onPurge = vi.fn().mockRejectedValue('nope');
    renderPage({ onPurge });

    fireEvent.click(screen.getByRole('button', { name: 'Purge' }));
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).not.toMatch(/undefined/);
    expect(alert).toHaveTextContent(/Purge failed/);
  });

  it('the banner is dismissible', async () => {
    const onPurge = vi.fn().mockRejectedValue(new Error(BOOM));
    renderPage({ onPurge });

    fireEvent.click(screen.getByRole('button', { name: 'Purge' }));
    await screen.findByRole('alert');

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
