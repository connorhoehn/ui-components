import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DateTimeField, isoToLocalInput, localInputToIso } from '../DateTimeField';

afterEach(cleanup);

function Controlled({ initial = null, onChange = () => {}, ...rest }: { initial?: string | null; onChange?: (v: string | null) => void } & Partial<React.ComponentProps<typeof DateTimeField>>) {
  const [v, setV] = useState<string | null>(initial);
  return <DateTimeField label="Starts" value={v} onChange={(n) => { setV(n); onChange(n); }} {...rest} />;
}
const input = () => screen.getByLabelText('Starts') as HTMLInputElement;

describe('DateTimeField', () => {
  it('shows a UTC value in the chosen zone and names the zone', () => {
    render(<Controlled initial="2027-01-15T14:00:00.000Z" timeZone="America/New_York" />);
    expect(input().value).toBe('2027-01-15T09:00');
    expect(input()).toHaveAttribute('type', 'datetime-local');
    expect(screen.getByText(/EST/)).toBeInTheDocument();
  });

  it('round-trips a value across zones, including a daylight-saving date', () => {
    for (const tz of ['America/New_York', 'Europe/Berlin', 'Asia/Kolkata', 'Pacific/Auckland']) {
      for (const iso of ['2027-01-15T14:00:00.000Z', '2027-07-04T03:30:00.000Z']) {
        expect(localInputToIso(isoToLocalInput(iso, tz), tz)).toBe(iso);
      }
    }
    expect(localInputToIso('2027-07-04T09:00', 'America/New_York')).toBe('2027-07-04T13:00:00.000Z');
  });

  it('emits an ISO UTC string when the person types a local time', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} timeZone="Europe/Berlin" />);
    fireEvent.change(input(), { target: { value: '2027-03-01T10:15' } });
    expect(onChange).toHaveBeenCalledWith('2027-03-01T09:15:00.000Z');
  });

  it('refuses a time before min and says so', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} timeZone="UTC" min="2027-03-01T12:00:00.000Z" />);
    expect(input()).toHaveAttribute('min', '2027-03-01T12:00');
    fireEvent.change(input(), { target: { value: '2027-03-01T11:00' } });
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('Choose a time that is not in the past.')).toBeInTheDocument();
    fireEvent.change(input(), { target: { value: '2027-03-01T12:30' } });
    expect(onChange).toHaveBeenCalledWith('2027-03-01T12:30:00.000Z');
    expect(screen.queryByText('Choose a time that is not in the past.')).toBeNull();
  });

  it('clears to null', () => {
    const onChange = vi.fn();
    render(<Controlled initial="2027-01-15T14:00:00.000Z" timeZone="UTC" onChange={onChange} />);
    fireEvent.change(input(), { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(null);
    expect(input().value).toBe('');
  });

  it('wires label, hint, error and disabled', () => {
    const { rerender } = render(<DateTimeField label="Starts" value={null} onChange={() => {}} hint="Local time" disabled />);
    expect(input()).toBeDisabled();
    expect(input()).toHaveAccessibleDescription('Local time');
    rerender(<DateTimeField label="Starts" value={null} onChange={() => {}} hint="Local time" error="Pick a time" />);
    expect(input()).toHaveAttribute('aria-invalid', 'true');
    expect(input()).toHaveAccessibleDescription('Pick a time');
  });
});
