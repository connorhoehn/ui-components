import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StatusBadge } from '../StatusBadge';
import { QrCodeDisplay } from '../QrCodeDisplay';
import { CodeInput } from '../CodeInput';

// ---------------------------------------------------------------------------
// StatusBadge
// ---------------------------------------------------------------------------

describe('StatusBadge', () => {
  it('renders the status text', () => {
    render(<StatusBadge status="CONFIRMED" />);
    expect(screen.getByText('CONFIRMED')).toBeInTheDocument();
  });

  it('maps CONFIRMED to the success tone (green class)', () => {
    const { container } = render(<StatusBadge status="CONFIRMED" />);
    expect(container.firstChild as HTMLElement).toHaveClass('text-green-600');
  });

  it('maps DISABLED to the danger tone (red class)', () => {
    const { container } = render(<StatusBadge status="DISABLED" />);
    expect(container.firstChild as HTMLElement).toHaveClass('text-red-600');
  });

  it('falls back to neutral for an unknown status', () => {
    const { container } = render(<StatusBadge status="NOT_A_REAL_STATUS" />);
    expect(container.firstChild as HTMLElement).toHaveClass('text-slate-600');
  });

  it('variant prop overrides the status-based tone', () => {
    // CONFIRMED would normally be success; force danger via variant
    const { container } = render(
      <StatusBadge status="CONFIRMED" variant="danger" />,
    );
    expect(container.firstChild as HTMLElement).toHaveClass('text-red-600');
  });
});

// ---------------------------------------------------------------------------
// QrCodeDisplay
// ---------------------------------------------------------------------------

describe('QrCodeDisplay', () => {
  const DATA_URL = 'data:image/png;base64,iVBORw0KGgo=';

  it('renders an img with the given value as src', () => {
    render(<QrCodeDisplay value={DATA_URL} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', DATA_URL);
  });

  it('honors a custom size on width + height attributes', () => {
    render(<QrCodeDisplay value={DATA_URL} size={120} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '120');
    expect(img).toHaveAttribute('height', '120');
  });

  it('renders a figcaption only when label is provided', () => {
    const { rerender } = render(<QrCodeDisplay value={DATA_URL} />);
    expect(screen.queryByText('Scan me')).not.toBeInTheDocument();

    rerender(<QrCodeDisplay value={DATA_URL} label="Scan me" />);
    expect(screen.getByText('Scan me')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// CodeInput
// ---------------------------------------------------------------------------

describe('CodeInput', () => {
  it('renders length inputs (default 6)', () => {
    render(<CodeInput onComplete={() => {}} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('renders custom length when provided', () => {
    render(<CodeInput length={4} onComplete={() => {}} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('typing a digit advances focus to the next input', () => {
    render(<CodeInput length={4} onComplete={() => {}} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    inputs[0].focus();
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('fires onComplete with the concatenated code when full', async () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<CodeInput length={3} onComplete={onComplete} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });

    // onComplete is deferred via setTimeout(0); advance timers to flush it
    act(() => { vi.runAllTimers(); });

    expect(onComplete).toHaveBeenCalledWith('123');
    vi.useRealTimers();
  });

  it('rejects non-digit input', () => {
    render(<CodeInput length={3} onComplete={() => {}} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: 'a' } });
    expect(inputs[0].value).toBe('');
  });

  it('paste of a full-length numeric string fires onComplete', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<CodeInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => '4321' },
    });

    act(() => { vi.runAllTimers(); });
    expect(onComplete).toHaveBeenCalledWith('4321');
    vi.useRealTimers();
  });

  it('shows the error text in an alert role when provided', () => {
    render(<CodeInput onComplete={() => {}} error="Wrong code" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Wrong code');
  });
});
