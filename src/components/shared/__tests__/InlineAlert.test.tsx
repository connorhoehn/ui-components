import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InlineAlert } from '../InlineAlert';

describe('InlineAlert', () => {
  it('error and warning tones are assertive alerts', () => {
    const { rerender } = render(<InlineAlert tone="error">Sync failed</InlineAlert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Sync failed');
    rerender(<InlineAlert tone="warning">Careful</InlineAlert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Careful');
  });

  it('success and info tones are polite status', () => {
    const { rerender } = render(<InlineAlert tone="success">Saved</InlineAlert>);
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    rerender(<InlineAlert tone="info">FYI</InlineAlert>);
    expect(screen.getByRole('status')).toHaveTextContent('FYI');
  });

  it('shows a dismiss button only when onDismiss is provided', () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<InlineAlert tone="info">m</InlineAlert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).toBeNull();
    rerender(<InlineAlert tone="info" onDismiss={onDismiss}>m</InlineAlert>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  // The testid lands on the alert itself, not a wrapper, so a caller can
  // assert the role and the message on one element.
  it('forwards data-testid to the alert element', () => {
    render(<InlineAlert tone="error" data-testid="save-error">Could not save</InlineAlert>);
    const el = screen.getByTestId('save-error');
    expect(el).toHaveAttribute('role', 'alert');
    expect(el).toHaveTextContent('Could not save');
  });
});
