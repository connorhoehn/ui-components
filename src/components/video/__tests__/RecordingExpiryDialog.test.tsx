import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordingExpiryDialog, resolveExpiryChoice } from '../RecordingExpiryDialog';

afterEach(cleanup);

describe('resolveExpiryChoice', () => {
  const now = Date.parse('2026-09-15T00:00:00Z');
  it('turns presets into instants, never into null, and an empty date into nothing', () => {
    expect(resolveExpiryChoice('30d', '', now)).toBe('2026-10-15T00:00:00.000Z');
    expect(resolveExpiryChoice('never', '', now)).toBeNull();
    expect(resolveExpiryChoice('custom', '', now)).toBeUndefined();
    expect(resolveExpiryChoice('custom', '2027-01-02', now)).toMatch(/^2027-01-0[23]T/);
  });
});

describe('RecordingExpiryDialog', () => {
  it('states the current expiry and saves a preset', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const onClose = vi.fn();
    render(<RecordingExpiryDialog open expiresAt="2026-11-14T00:00:00Z" onSave={onSave} onClose={onClose} />);
    expect(screen.getByTestId('recording-expiry-dialog-current').textContent).toMatch(/Set to expire/);
    fireEvent.click(screen.getByTestId('recording-expiry-dialog-choice-90d-button'));
    fireEvent.click(screen.getByTestId('recording-expiry-dialog-save'));
    await waitFor(() => expect(onSave).toHaveBeenCalled());
    const saved = onSave.mock.calls[0][0] as string;
    expect(Date.parse(saved) - Date.now()).toBeGreaterThan(89 * 24 * 3600 * 1000);
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('saves "never" as null and shows the server\'s refusal', async () => {
    const onSave = vi.fn().mockRejectedValue(new Error('not yours'));
    render(<RecordingExpiryDialog open expiresAt="2026-11-14T00:00:00Z" onSave={onSave} onClose={vi.fn()} />);
    fireEvent.click(screen.getByTestId('recording-expiry-dialog-choice-never-button'));
    fireEvent.click(screen.getByTestId('recording-expiry-dialog-save'));
    await waitFor(() => expect(onSave).toHaveBeenCalledWith(null));
    await waitFor(() => expect(screen.getByTestId('recording-expiry-dialog-error').textContent).toBe('not yours'));
  });

  it('will not save a custom date that is empty', () => {
    render(<RecordingExpiryDialog open expiresAt={undefined} onSave={vi.fn()} onClose={vi.fn()} />);
    fireEvent.click(screen.getByTestId('recording-expiry-dialog-choice-custom-button'));
    expect((screen.getByTestId('recording-expiry-dialog-save') as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('RecordingExpiryDialog rows', () => {
  it('are radios, one checked', () => {
    render(<RecordingExpiryDialog open expiresAt={null} onSave={vi.fn()} onClose={vi.fn()} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(5);
    expect(radios.filter((r) => r.getAttribute('aria-checked') === 'true')).toHaveLength(1);
    expect(screen.getByTestId('recording-expiry-dialog-choice-never-button').getAttribute('aria-checked')).toBe('true');
  });
});
